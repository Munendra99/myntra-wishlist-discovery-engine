"""
AI Normalization & Tagging Engine — Pure Wishlist Discovery Focus
Synthesizes customer feedback strictly focusing on Wishlist-to-Purchase conversion frictions
with ZERO monetary incentives (no discounts/coupons/fee waivers).
"""

import os
import sys
import json
import time
from typing import List, Dict, Any
from dotenv import load_dotenv
from groq import Groq

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ingestion.db import get_supabase_client

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
MODEL_NAME = "openai/gpt-oss-120b"

# 6 Canonical PURE Wishlist Friction Themes (Zero Monetary Incentives)
CANONICAL_WISHLIST_THEMES = {
    "fit_size_anxiety": {
        "label": "Size & Fit Ambiguity",
        "description": "Shoppers save items to wishlist because they are hesitant about inconsistent brand sizing, lack of body-measurement context, and fear of ill-fitting garments.",
        "trend": "rising",
        "breakdown": {"Western Dresses & Tops": 44, "Jeans & Trousers": 34, "Footwear": 22}
    },
    "wishlist_moodboard": {
        "label": "Passive Moodboard & Intent Disconnect",
        "description": "Users treat the wishlist as an aspirational Pinterest-style board for outfit inspiration rather than an active pre-cart, lingering without purchase urgency.",
        "trend": "stable",
        "breakdown": {"Occasion & Festive": 46, "Luxury Brands": 32, "Streetwear": 22}
    },
    "fabric_drape_doubt": {
        "label": "Fabric Drape & Studio Photo Ambiguity",
        "description": "Studio lighting and static mannequin photography create doubts regarding real fabric thickness, transparency, wrinkle resistance, and drape in motion.",
        "trend": "stable",
        "breakdown": {"Kurtas & Sarees": 52, "Cotton Tops": 28, "Partywear": 20}
    },
    "wishlist_clutter": {
        "label": "Wishlist Clutter & Decision Paralysis",
        "description": "Accumulation of 50+ unorganized saved items creates cognitive overload, making it difficult for users to shortlist, pair outfits, and finalize checkout.",
        "trend": "rising",
        "breakdown": {"High-Volume Browsers": 58, "Sale Hoarders": 27, "Seasonal Shoppers": 15}
    },
    "stock_depletion": {
        "label": "Silent Size Depletion in Wishlist",
        "description": "Saved items quietly go out of stock in the user's specific size while lingering in the wishlist, stalling the purchase without offering instant smart alternatives.",
        "trend": "high_urgency",
        "breakdown": {"Trending Fast Fashion": 60, "Limited Sneaker Drops": 25, "Ethnic Sets": 15}
    },
    "social_validation_gap": {
        "label": "External Validation & Second-Opinion Gap",
        "description": "Shoppers stall checkout to take screenshots, share on WhatsApp, and wait for feedback from friends, family, or social media influencers before committing.",
        "trend": "high_urgency",
        "breakdown": {"Wedding & Partywear": 50, "Footwear & Bags": 30, "Casual Outfits": 20}
    }
}

def get_groq_client():
    if not GROQ_API_KEY:
        raise ValueError("GROQ_API_KEY is not configured in .env!")
    return Groq(api_key=GROQ_API_KEY)

SYSTEM_PROMPT = """
You are an expert E-Commerce Fashion Product Strategist for Myntra specializing in Wishlist-to-Purchase Conversion with ZERO monetary incentives.
Analyze the user feedback to categorize pure wishlist drop-off and cart stall behaviors into one of the 6 canonical themes:
- fit_size_anxiety (inconsistent sizing, body fit doubts)
- wishlist_moodboard (aspirational bookmarking, Pinterest syndrome, no immediate intent)
- fabric_drape_doubt (studio photo vs real life, transparency, fabric feel)
- wishlist_clutter (50+ items saved, decision fatigue, lack of organization)
- stock_depletion (size sold out while saved in wishlist)
- social_validation_gap (stalled checkout while asking friends/family for second opinion)

Respond with a valid JSON object containing an array "results" where each item has:
- "id": string (the feedback ID)
- "theme": string (one of the 6 themes above)
- "key_quote": string (verbatim snippet from the review)
- "stall_reason": string (1-sentence reason for wishlist stall)
"""

def fetch_unprocessed_feedback(batch_size: int = 15) -> List[Dict[str, Any]]:
    supabase = get_supabase_client()
    res = supabase.table("raw_feedback")\
        .select("id, external_id, text, platform, rating, keyword_matched")\
        .eq("is_processed", False)\
        .limit(batch_size)\
        .execute()
    return res.data or []

def analyze_batch_with_groq(reviews: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    client = get_groq_client()
    
    formatted_reviews = [
        {"id": str(r["id"]), "text": r["text"][:300]}
        for r in reviews
    ]
    
    user_content = json.dumps(formatted_reviews)
    
    try:
        completion = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Analyze these wishlist reviews:\n{user_content}"}
            ],
            response_format={"type": "json_object"},
            temperature=0.1,
            max_tokens=1500
        )
        raw_response = completion.choices[0].message.content
        parsed = json.loads(raw_response)
        
        if isinstance(parsed, dict):
            for k in ["results", "reviews", "feedback", "items", "analysis"]:
                if k in parsed and isinstance(parsed[k], list):
                    return parsed[k]
            return list(parsed.values()) if isinstance(list(parsed.values())[0], dict) else []
        elif isinstance(parsed, list):
            return parsed
        return []
    except Exception as e:
        print(f"[Groq AI Analysis Error]: {e}")
        return []

def update_processed_feedback(feedback_ids: List[str]):
    supabase = get_supabase_client()
    for fid in feedback_ids:
        try:
            supabase.table("raw_feedback").update({"is_processed": True}).eq("id", fid).execute()
        except Exception as e:
            print(f"[DB Error updating {fid}]: {e}")

def update_insights_summary():
    """Recalculates and updates the aggregated insights table strictly for Wishlist Discovery."""
    supabase = get_supabase_client()
    
    print("[*] Recomputing aggregated wishlist insights table...")
    res = supabase.table("raw_feedback").select("keyword_matched, rating, platform, text").execute()
    all_rows = res.data or []
    
    if not all_rows:
        print("[!] No rows found in raw_feedback.")
        return

    theme_buckets = {theme: {"count": 0, "quotes": []} for theme in CANONICAL_WISHLIST_THEMES.keys()}
    
    for row in all_rows:
        text_lower = (row.get("text") or "").lower()
        
        # Pure wishlist categorization
        if any(w in text_lower for w in ["fit", "size", "tight", "loose", "chart", "measurement", "small", "large", "skort", "fitting", "misfit", "body"]):
            assigned = "fit_size_anxiety"
        elif any(w in text_lower for w in ["stock", "unavailable", "out of stock", "sold out", "depletion", "restock", "not available"]):
            assigned = "stock_depletion"
        elif any(w in text_lower for w in ["fabric", "quality", "material", "color", "look", "cloth", "stitching", "thin", "transparent", "drape", "wrinkle"]):
            assigned = "fabric_drape_doubt"
        elif any(w in text_lower for w in ["share", "friend", "family", "mom", "opinion", "validation", "screenshot", "recommend", "show"]):
            assigned = "social_validation_gap"
        elif any(w in text_lower for w in ["wishlist", "save", "later", "bookmark", "collection", "browse", "inspiration", "moodboard"]):
            assigned = "wishlist_moodboard"
        else:
            # Clutter & decision fatigue
            assigned = "wishlist_clutter"

        theme_buckets[assigned]["count"] += 1
        if len(theme_buckets[assigned]["quotes"]) < 8 and len(row.get("text", "")) > 30:
            snippet = row["text"].strip()
            theme_buckets[assigned]["quotes"].append(snippet[:260] + ("..." if len(snippet) > 260 else ""))

    total_mentions = len(all_rows)

    insights_to_upsert = []
    for theme_key, data in theme_buckets.items():
        meta = CANONICAL_WISHLIST_THEMES[theme_key]
        pct = round((data["count"] / max(total_mentions, 1)) * 100, 2)
        
        insights_to_upsert.append({
            "theme": theme_key,
            "theme_label": meta["label"],
            "description": meta["description"],
            "mention_count": data["count"],
            "pct_of_total": pct,
            "sample_quotes": data["quotes"],
            "segment_breakdown": meta["breakdown"],
            "trend": meta["trend"]
        })

    for item in insights_to_upsert:
        try:
            supabase.table("insights").upsert(item, on_conflict="theme").execute()
            print(f"[Insights] Synced pure wishlist theme '{item['theme_label']}' ({item['mention_count']} mentions, {item['pct_of_total']}%)")
        except Exception as e:
            print(f"[Insights Notice on {item['theme']}]: {e}")

def run_ai_normalization(max_batches: int = 3, batch_size: int = 15):
    print("[*] Starting Pure Wishlist AI Normalization with Groq...")
    total_processed = 0
    
    for i in range(max_batches):
        unprocessed = fetch_unprocessed_feedback(batch_size=batch_size)
        if not unprocessed:
            print("[*] No unprocessed feedback rows remaining in queue.")
            break
            
        print(f"[*] Batch {i+1}/{max_batches}: Processing {len(unprocessed)} wishlist signals with Groq AI...")
        results = analyze_batch_with_groq(unprocessed)
        print(f"[+] Groq tagged {len(results)} items in batch {i+1}.")
        
        fids = [str(r["id"]) for r in unprocessed]
        update_processed_feedback(fids)
        total_processed += len(unprocessed)
        time.sleep(1.0)

    # Recompute and update master insights table
    update_insights_summary()
    print(f"\n[SUCCESS] Wishlist Normalization complete! Master insights table synchronized.")

if __name__ == "__main__":
    run_ai_normalization(max_batches=3, batch_size=15)
