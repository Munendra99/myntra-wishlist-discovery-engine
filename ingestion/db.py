import os
import re
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

# Target keywords that identify wishlist/pre-purchase hesitation/sizing/fabric behavior
WISHLIST_KEYWORDS = [
    r"\bwishlist\b",
    r"\bwish\s*list\b",
    r"\bsave\s*for\s*later\b",
    r"\bsaved\s*item\b",
    r"\bsaved\s*items\b",
    r"\bsaved\b",
    r"\bbookmark\b",
    r"\bcart\b",
    r"\bbag\b",
    r"\bbuy\s*later\b",
    r"\bshortlist\b",
    r"\badd\s*to\s*cart\b",
    r"\badd\s*to\s*bag\b",
    r"\bsaved\s*in\s*cart\b",
    r"\bwaiting\s*to\s*buy\b",
    r"\bdelay\b",
    r"\bhesitat\w*\b",
    r"\bsize\s*chart\b",
    r"\bfit\b",
    r"\bfabric\b",
    r"\bcloth\s*quality\b",
    r"\bmaterial\b",
    r"\btransparen\w*\b",
    r"\bsee\s*through\b",
    r"\bexchang\w*\b",
    r"\breturn\w*\b",
    r"\bout\s*of\s*stock\b",
    r"\brestock\b"
]

_keyword_regex = re.compile("|".join(WISHLIST_KEYWORDS), re.IGNORECASE)

def get_supabase_client() -> Client:
    """Initializes and returns a Supabase client using the service role key."""
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        raise ValueError(
            "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in your environment or .env file."
        )
    return create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

def matches_wishlist_keywords(text: str) -> Optional[str]:
    """
    Checks if the text contains any wishlist-related keywords.
    Returns the first matched keyword (normalized) or None if no match.
    """
    if not text:
        return None
    match = _keyword_regex.search(text)
    if match:
        return match.group(0).lower()
    return None

def upsert_raw_feedback(records: List[Dict[str, Any]]) -> int:
    """
    Upserts feedback records into Supabase raw_feedback table on_conflict of external_id in batches.
    Ensures zero duplicates when scrapers re-run.
    Returns the number of rows submitted.
    """
    if not records:
        print("[DB] No matching records to upsert.")
        return 0

    supabase = get_supabase_client()
    total_upserted = 0
    batch_size = 100

    try:
        for i in range(0, len(records), batch_size):
            batch = records[i:i + batch_size]
            response = supabase.table("raw_feedback").upsert(
                batch,
                on_conflict="external_id"
            ).execute()
            count = len(response.data) if response.data else len(batch)
            total_upserted += count
            print(f"[DB] Upserted batch {i // batch_size + 1}: {count} rows.")
        
        print(f"[DB] Successfully upserted total {total_upserted} rows into raw_feedback.")
        return total_upserted
    except Exception as e:
        print(f"[DB Error] Failed to upsert records into Supabase: {e}")
        raise e
