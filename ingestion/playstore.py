"""
Play Store Scraper (Direct Method - No Apify needed)
Scrapes recent reviews for Myntra (com.myntra.android) from Google Play Store,
filters by wishlist/cart keywords, and upserts them into Supabase raw_feedback.
"""

from typing import List, Dict, Any
from google_play_scraper import reviews, Sort
from ingestion.db import matches_wishlist_keywords, upsert_raw_feedback

MYNTRA_PACKAGE_NAME = "com.myntra.android"

def fetch_playstore_reviews(count: int = 500) -> List[Dict[str, Any]]:
    """
    Fetches both most relevant and newest reviews from Google Play Store directly.
    """
    print(f"[PlayStore] Fetching reviews for {MYNTRA_PACKAGE_NAME}...")
    
    all_reviews = []
    # 1. Fetch most relevant reviews
    try:
        rel_reviews, _ = reviews(
            MYNTRA_PACKAGE_NAME,
            lang="en",
            country="in",
            sort=Sort.MOST_RELEVANT,
            count=count
        )
        all_reviews.extend(rel_reviews)
    except Exception as e:
        print(f"[PlayStore] Note on relevant reviews: {e}")

    # 2. Fetch newest reviews
    try:
        new_reviews, _ = reviews(
            MYNTRA_PACKAGE_NAME,
            lang="en",
            country="in",
            sort=Sort.NEWEST,
            count=count
        )
        all_reviews.extend(new_reviews)
    except Exception as e:
        print(f"[PlayStore] Note on newest reviews: {e}")
    
    matching_records = []
    seen_ids = set()
    
    for item in all_reviews:
        review_id = str(item.get("reviewId") or item.get("at"))
        if review_id in seen_ids:
            continue
        seen_ids.add(review_id)
        
        content = item.get("content") or ""
        matched_kw = matches_wishlist_keywords(content)
        
        if matched_kw:
            matching_records.append({
                "external_id": f"playstore_{review_id}",
                "platform": "playstore",
                "text": content,
                "url": f"https://play.google.com/store/apps/details?id={MYNTRA_PACKAGE_NAME}&reviewId={review_id}",
                "author": item.get("userName") or "Anonymous User",
                "rating": item.get("score"),
                "keyword_matched": matched_kw,
                "is_processed": False
            })
            
    print(f"[PlayStore] Evaluated {len(all_reviews)} reviews, found {len(matching_records)} wishlist-related mentions.")
    return matching_records

def run_playstore_ingestion(count: int = 300) -> int:
    """Executes the Play Store scraping and upsert pipeline."""
    records = fetch_playstore_reviews(count=count)
    if records:
        return upsert_raw_feedback(records)
    return 0

if __name__ == "__main__":
    run_playstore_ingestion()
