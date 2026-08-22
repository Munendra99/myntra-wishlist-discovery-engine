import os
import csv
import json
import hashlib
from dotenv import load_dotenv
from ingestion.db import matches_wishlist_keywords, upsert_raw_feedback, get_supabase_client

load_dotenv()

def ingest_from_csv(csv_path: str):
    """Parses exported CSV feedback and upserts into raw_feedback."""
    if not os.path.exists(csv_path):
        print(f"[CSV Ingest] File not found: {csv_path}")
        return 0

    print(f"[CSV Ingest] Reading from {csv_path}...")
    records = []
    with open(csv_path, mode="r", encoding="utf-8", errors="ignore") as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader):
            text = row.get("text") or ""
            source = (row.get("source") or "Play Store").strip().lower()
            platform = "playstore" if "play" in source else ("appstore" if "app" in source else "reddit")
            author = row.get("author") or "Anonymous User"
            rating = row.get("rating")
            try:
                rating_num = float(rating) if rating else None
            except:
                rating_num = None

            matched_kw = matches_wishlist_keywords(text)
            # Include records matching keywords, or if rating is low (friction points)
            if matched_kw or (rating_num and rating_num <= 2 and len(text) > 30):
                kw = matched_kw if matched_kw else "review_friction"
                content_hash = hashlib.md5(f"{platform}_{author}_{text[:100]}".encode('utf-8')).hexdigest()[:16]
                records.append({
                    "external_id": f"{platform}_csv_{content_hash}",
                    "platform": platform,
                    "text": text[:4000],
                    "url": f"https://myntra.com/reviews/{content_hash}",
                    "author": author,
                    "rating": rating_num,
                    "keyword_matched": kw,
                    "is_processed": False
                })

    print(f"[CSV Ingest] Filtered {len(records)} relevant feedback items.")
    return upsert_raw_feedback(records)

def ingest_from_json(json_path: str):
    """Parses exported JSON review feed and upserts into raw_feedback."""
    if not os.path.exists(json_path):
        print(f"[JSON Ingest] File not found: {json_path}")
        return 0

    print(f"[JSON Ingest] Reading from {json_path}...")
    records = []
    with open(json_path, mode="r", encoding="utf-8", errors="ignore") as f:
        data = json.load(f)

    for item in data:
        title = item.get("title") or ""
        body = item.get("text") or ""
        full_text = f"{title}\n{body}".strip() if title else body.strip()
        review_id = str(item.get("id") or hash(full_text))
        author = item.get("author") or "Apple User"
        score = item.get("score")
        country = item.get("country") or "global"

        matched_kw = matches_wishlist_keywords(full_text)
        if matched_kw or (score and score <= 2 and len(full_text) > 30):
            kw = matched_kw if matched_kw else "review_friction"
            records.append({
                "external_id": f"appstore_json_{review_id}",
                "platform": "appstore",
                "text": full_text[:4000],
                "url": f"https://apps.apple.com/{country}/app/myntra/id907394059",
                "author": f"{author} ({country.upper()})",
                "rating": score,
                "keyword_matched": kw,
                "is_processed": False
            })

    print(f"[JSON Ingest] Filtered {len(records)} relevant feedback items.")
    return upsert_raw_feedback(records)

if __name__ == "__main__":
    csv_file = os.path.join(os.path.dirname(__file__), "data", "reviews_export.csv")
    json_file = os.path.join(os.path.dirname(__file__), "data", "appstore_export.json")
    
    c_count = ingest_from_csv(csv_file)
    j_count = ingest_from_json(json_file)
    print(f"Ingestion complete: {c_count + j_count} total records upserted.")
