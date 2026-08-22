"""
Play Store Scraper (Direct Method - Comprehensive Multi-Segment Scraping)
Scrapes extensive reviews for Myntra (com.myntra.android) from Google Play Store
across Most Relevant, Newest, and 1-4 Star ratings to harvest genuine wishlist,
shortlisting, sizing, and purchase hesitation signals.
"""

from typing import List, Dict, Any
from google_play_scraper import reviews, Sort
from ingestion.db import matches_wishlist_keywords, upsert_raw_feedback

MYNTRA_PACKAGE_NAME = "com.myntra.android"

def fetch_playstore_reviews(count_per_batch: int = 1500) -> List[Dict[str, Any]]:
    """
    Fetches multi-segmented reviews from Google Play Store across relevance, recency, and ratings.
    """
    print(f"[PlayStore] Starting comprehensive review harvesting for {MYNTRA_PACKAGE_NAME}...")
    
    all_reviews = []
    
    # 1. Fetch most relevant reviews
    try:
        rel_reviews, _ = reviews(
            MYNTRA_PACKAGE_NAME,
            lang="en",
            country="in",
            sort=Sort.MOST_RELEVANT,
            count=count_per_batch
        )
        all_reviews.extend(rel_reviews)
        print(f"[PlayStore] Retrieved {len(rel_reviews)} most relevant reviews.")
    except Exception as e:
        print(f"[PlayStore] Note on relevant reviews: {e}")

    # 2. Fetch newest reviews
    try:
        new_reviews, _ = reviews(
            MYNTRA_PACKAGE_NAME,
            lang="en",
            country="in",
            sort=Sort.NEWEST,
            count=count_per_batch
        )
        all_reviews.extend(new_reviews)
        print(f"[PlayStore] Retrieved {len(new_reviews)} newest reviews.")
    except Exception as e:
        print(f"[PlayStore] Note on newest reviews: {e}")

    # 3. Fetch rated reviews (1-star, 2-star, 3-star, 4-star) for specific hesitation nuances
    for star in [1, 2, 3, 4]:
        try:
            star_reviews, _ = reviews(
                MYNTRA_PACKAGE_NAME,
                lang="en",
                country="in",
                sort=Sort.NEWEST,
                filter_score_with=star,
                count=800
            )
            all_reviews.extend(star_reviews)
            print(f"[PlayStore] Retrieved {len(star_reviews)} reviews with {star}-star rating.")
        except Exception as e:
            print(f"[PlayStore] Note on {star}-star reviews: {e}")
    
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
            
    print(f"[PlayStore] Evaluated {len(seen_ids)} unique reviews, extracted {len(matching_records)} wishlist/hesitation signals.")
    return matching_records

def run_playstore_ingestion(count_per_batch: int = 1500) -> int:
    """Executes the Play Store scraping and upsert pipeline."""
    records = fetch_playstore_reviews(count_per_batch=count_per_batch)
    if records:
        return upsert_raw_feedback(records)
    return 0

if __name__ == "__main__":
    run_playstore_ingestion()
