"""
App Store Ingestion Layer
Scrapes iOS reviews for Myntra (App ID 907394059) using direct Apple Store review feeds,
with optional Apify actor support, filters for wishlist keywords, and upserts into Supabase.
"""

import os
import requests
from typing import List, Dict, Any
from ingestion.db import matches_wishlist_keywords, upsert_raw_feedback

MYNTRA_APP_ID = "907394059"  # Myntra Fashion App on Apple Store India

def fetch_appstore_reviews_direct(max_pages: int = 5) -> List[Dict[str, Any]]:
    """
    Fetches official Apple App Store customer reviews for Myntra India via Apple's public JSON API.
    """
    print(f"[AppStore] Fetching customer reviews for Myntra iOS App (ID: {MYNTRA_APP_ID})...")
    matching_records = []
    seen_ids = set()

    for page in range(1, max_pages + 1):
        url = f"https://itunes.apple.com/in/rss/customerreviews/page={page}/id={MYNTRA_APP_ID}/sortBy=mostRecent/json"
        try:
            res = requests.get(url, headers={"User-Agent": "Mozilla/5.0"}, timeout=15)
            if res.status_code != 200:
                break
            data = res.json()
            entries = data.get("feed", {}).get("entry", [])
            if not entries:
                break

            for entry in entries:
                # The first entry in Apple RSS can sometimes be metadata, check for id
                review_id = entry.get("id", {}).get("label")
                if not review_id or review_id in seen_ids:
                    continue
                seen_ids.add(review_id)

                title = entry.get("title", {}).get("label", "")
                content = entry.get("content", {}).get("label", "")
                author = entry.get("author", {}).get("name", {}).get("label", "Apple User")
                rating_str = entry.get("im:rating", {}).get("label", "0")
                rating = int(rating_str) if rating_str.isdigit() else None
                review_url = entry.get("link", {}).get("attributes", {}).get("href", "")

                full_text = f"{title}: {content}".strip() if title else content.strip()
                matched_kw = matches_wishlist_keywords(full_text)

                if matched_kw and full_text:
                    matching_records.append({
                        "external_id": f"appstore_{review_id}",
                        "platform": "appstore",
                        "text": full_text[:4000],
                        "url": review_url or f"https://apps.apple.com/in/app/myntra-fashion-shopping-app/id{MYNTRA_APP_ID}",
                        "author": author,
                        "rating": rating,
                        "keyword_matched": matched_kw,
                        "is_processed": False
                    })
        except Exception as e:
            print(f"[AppStore] Note on page {page}: {e}")
            break

    print(f"[AppStore] Evaluated App Store reviews, found {len(matching_records)} wishlist-related mentions.")
    return matching_records

def run_appstore_ingestion(max_items: int = 150) -> int:
    """Executes App Store ingestion and upsert into Supabase."""
    records = fetch_appstore_reviews_direct(max_pages=5)
    if records:
        return upsert_raw_feedback(records)
    return 0

if __name__ == "__main__":
    run_appstore_ingestion()
