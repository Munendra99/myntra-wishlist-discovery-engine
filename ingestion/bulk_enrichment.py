"""
Bulk Ingestion & Enrichment Script
Pulls high-volume reviews directly from Google Play Store across all sort modes
and populates the raw_feedback table with hundreds of authentic customer reviews.
"""

import os
import sys
from dotenv import load_dotenv

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from google_play_scraper import reviews, Sort
from ingestion.db import matches_wishlist_keywords, upsert_raw_feedback

load_dotenv()

MYNTRA_PKG = "com.myntra.android"

def run_bulk_playstore_ingest(target_count: int = 1500):
    print(f"[*] Starting bulk Play Store fetch for {MYNTRA_PKG} (target: {target_count})...")
    
    all_raw = []
    
    # 1. Most Relevant
    try:
        r1, _ = reviews(MYNTRA_PKG, lang='en', country='in', sort=Sort.MOST_RELEVANT, count=target_count)
        all_raw.extend(r1)
        print(f"[PlayStore] Fetched {len(r1)} relevant reviews.")
    except Exception as e:
        print(f"[PlayStore Error 1]: {e}")

    # 2. Newest
    try:
        r2, _ = reviews(MYNTRA_PKG, lang='en', country='in', sort=Sort.NEWEST, count=target_count)
        all_raw.extend(r2)
        print(f"[PlayStore] Fetched {len(r2)} newest reviews.")
    except Exception as e:
        print(f"[PlayStore Error 2]: {e}")

    seen = set()
    filtered_records = []
    
    for item in all_raw:
        rid = str(item.get("reviewId") or item.get("at"))
        if rid in seen:
            continue
        seen.add(rid)
        
        content = item.get("content") or ""
        score = item.get("score")
        matched_kw = matches_wishlist_keywords(content)
        
        # Include if keyword matches OR if 1-2 star friction comment with meaningful length
        if matched_kw or (score and score <= 2 and len(content) > 35):
            kw = matched_kw if matched_kw else "purchase_friction"
            filtered_records.append({
                "external_id": f"playstore_{rid}",
                "platform": "playstore",
                "text": content[:4000],
                "url": f"https://play.google.com/store/apps/details?id={MYNTRA_PKG}&reviewId={rid}",
                "author": item.get("userName") or "PlayStore User",
                "rating": score,
                "keyword_matched": kw,
                "is_processed": False
            })

    print(f"[*] Total unique matching reviews prepared: {len(filtered_records)}")
    if filtered_records:
        # Upsert in chunks of 100 to stay within payload limits
        chunk_size = 100
        total_inserted = 0
        for i in range(0, len(filtered_records), chunk_size):
            chunk = filtered_records[i:i+chunk_size]
            count = upsert_raw_feedback(chunk)
            total_inserted += count
        print(f"[SUCCESS] Bulk Ingestion finished: {total_inserted} rows upserted into raw_feedback.")
        return total_inserted
    return 0

if __name__ == "__main__":
    run_bulk_playstore_ingest()
