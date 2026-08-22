"""
Reddit Ingestion Layer (via Apify)
Runs an Apify Reddit scraper actor to collect posts and comments discussing Myntra wishlist, shortlist, and sizing behavior,
filters by keywords, and upserts into Supabase raw_feedback with platform = 'reddit'.
"""

import os
from typing import List, Dict, Any
from apify_client import ApifyClient
from ingestion.db import matches_wishlist_keywords, upsert_raw_feedback

DEFAULT_REDDIT_ACTOR = "trudax/reddit-scraper-lite"

def fetch_reddit_posts(apify_token: str, max_items: int = 60) -> List[Dict[str, Any]]:
    """
    Triggers the Apify Reddit Scraper actor, retrieves matching submissions/comments.
    """
    if not apify_token:
        print("[Reddit] No APIFY_API_TOKEN provided. Skipping Reddit ingestion.")
        return []

    print("[Reddit] Connecting to Apify and running Reddit scraper actor...")
    client = ApifyClient(apify_token)

    run_input = {
        "searches": [
            "myntra wishlist",
            "myntra saved items",
            "myntra shortlist",
            "myntra cart delay",
            "myntra size chart fit",
            "myntra fabric quality review"
        ],
        "sort": "relevance",
        "maxItems": max_items
    }

    try:
        run = client.actor(DEFAULT_REDDIT_ACTOR).call(run_input=run_input, timeout_secs=120)
        dataset_id = run["defaultDatasetId"]
        print(f"[Reddit] Apify run completed. Dataset ID: {dataset_id}. Fetching results...")

        dataset_items = client.dataset(dataset_id).list_items().items
        matching_records = []
        
        for item in dataset_items:
            title = item.get("title") or ""
            body = item.get("body") or item.get("text") or item.get("selftext") or item.get("description") or ""
            full_text = f"{title}\n{body}".strip() if title else body.strip()

            matched_kw = matches_wishlist_keywords(full_text)
            if matched_kw and full_text:
                post_id = str(item.get("id") or hash(full_text))
                matching_records.append({
                    "external_id": f"reddit_{post_id}",
                    "platform": "reddit",
                    "text": full_text[:4000],
                    "url": item.get("url") or item.get("permalink") or f"https://reddit.com/{post_id}",
                    "author": item.get("author") or "Reddit User",
                    "rating": None,
                    "keyword_matched": matched_kw,
                    "is_processed": False
                })

        print(f"[Reddit] Scraped {len(dataset_items)} items from Reddit, found {len(matching_records)} wishlist-related mentions.")
        return matching_records

    except Exception as e:
        print(f"[Reddit Note] Apify Reddit Scraper: {e}")
        return []

def run_reddit_ingestion(max_items: int = 60) -> int:
    """Executes Reddit scraping via Apify and upsert into Supabase."""
    token = os.getenv("APIFY_API_TOKEN")
    records = fetch_reddit_posts(apify_token=token, max_items=max_items)
    if records:
        return upsert_raw_feedback(records)
    return 0

if __name__ == "__main__":
    run_reddit_ingestion()
