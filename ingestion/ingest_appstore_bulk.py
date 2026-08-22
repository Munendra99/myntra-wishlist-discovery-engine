"""
Bulk Ingest Apple App Store Reviews from multiple RSS regional feeds
and parse user-provided App Store JSON records into Supabase raw_feedback.
"""

import os
import sys
import json
import urllib.request
from dotenv import load_dotenv

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ingestion.db import matches_wishlist_keywords, upsert_raw_feedback

load_dotenv()

APP_ID = "907394059" # Myntra App Store ID

def fetch_appstore_rss(country="in"):
    url = f"https://itunes.apple.com/{country}/rss/customerreviews/id={APP_ID}/sortBy=mostRecent/json"
    headers = {"User-Agent": "Mozilla/5.0"}
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            data = json.loads(response.read().decode('utf-8'))
            entries = data.get("feed", {}).get("entry", [])
            return entries[1:] if len(entries) > 1 else []
    except Exception as e:
        print(f"[AppStore RSS Error for {country}]: {e}")
        return []

def run_bulk_appstore_ingest():
    print("[*] Starting bulk App Store review ingestion across regions...")
    all_records = []
    
    for country in ["in", "us", "gb", "ae", "sg"]:
        entries = fetch_appstore_rss(country)
        print(f"[AppStore] Fetched {len(entries)} reviews for region '{country}'.")
        for entry in entries:
            try:
                external_id = f"appstore_{country}_" + entry.get("id", {}).get("label", "")
                author = entry.get("author", {}).get("name", {}).get("label", "Anonymous")
                title = entry.get("title", {}).get("label", "")
                content = entry.get("content", {}).get("label", "")
                full_text = f"{title}\n{content}".strip()
                rating_str = entry.get("im:rating", {}).get("label", "0")
                rating = int(rating_str) if rating_str.isdigit() else 0
                app_url = entry.get("link", {}).get("attributes", {}).get("href", "")
                
                kw_match = matches_wishlist_keywords(full_text)
                if kw_match or (rating <= 3 and len(full_text) > 25):
                    all_records.append({
                        "external_id": external_id,
                        "platform": "appstore",
                        "text": full_text[:4000],
                        "url": app_url,
                        "author": author,
                        "rating": rating,
                        "keyword_matched": kw_match if kw_match else "purchase_friction",
                        "is_processed": False
                    })
            except Exception as ex:
                continue

    print(f"[*] Total filtered App Store reviews: {len(all_records)}")
    if all_records:
        total = upsert_raw_feedback(all_records)
        print(f"[SUCCESS] App Store ingestion finished: {total} rows upserted.")
        return total
    return 0

if __name__ == "__main__":
    run_bulk_appstore_ingest()
