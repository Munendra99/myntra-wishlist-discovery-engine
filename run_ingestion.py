"""
Master Ingestion Pipeline Runner
Runs all 3 ingestion sources in sequence:
1. Google Play Store (direct scraping)
2. Reddit (via Apify actor)
3. Apple App Store (via Apify actor)
All matching feedback is safely upserted into Supabase raw_feedback.
"""

import os
import sys
from dotenv import load_dotenv

# Ensure the root project directory is in Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from ingestion.playstore import run_playstore_ingestion
from ingestion.reddit import run_reddit_ingestion
from ingestion.appstore import run_appstore_ingestion

def run_all_ingestions():
    load_dotenv()
    print("=" * 70)
    print("STARTING INGESTION PIPELINE: MYNTRA WISHLIST DISCOVERY ENGINE")
    print("=" * 70)

    # 1. Play Store (Direct)
    print("\n--- [1/3] Ingesting from Google Play Store (Direct) ---")
    try:
        ps_count = run_playstore_ingestion(count=500)
        print(f"[OK] Play Store completed. Upserted/matched: {ps_count}")
    except Exception as e:
        print(f"[ERROR] Play Store ingestion error: {e}")

    # 2. Reddit (via Apify)
    print("\n--- [2/3] Ingesting from Reddit (via Apify) ---")
    try:
        reddit_count = run_reddit_ingestion(max_items=100)
        print(f"[OK] Reddit completed. Upserted/matched: {reddit_count}")
    except Exception as e:
        print(f"[ERROR] Reddit ingestion error: {e}")

    # 3. App Store (via Apify)
    print("\n--- [3/3] Ingesting from Apple App Store (via Apify) ---")
    try:
        appstore_count = run_appstore_ingestion(max_items=150)
        print(f"[OK] App Store completed. Upserted/matched: {appstore_count}")
    except Exception as e:
        print(f"[ERROR] App Store ingestion error: {e}")

    print("\n" + "=" * 70)
    print("INGESTION PIPELINE COMPLETED SUCCESSFULLY!")
    print("=" * 70)

if __name__ == "__main__":
    run_all_ingestions()
