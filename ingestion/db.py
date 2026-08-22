import os
import re
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

# Target keywords that identify wishlist/pre-purchase hesitation behavior
WISHLIST_KEYWORDS = [
    r"\bwishlist\b",
    r"\bwish\s*list\b",
    r"\bsave\s*for\s*later\b",
    r"\bsaved\s*item\b",
    r"\bsaved\s*items\b",
    r"\bbookmark\b",
    r"\bcart\b",
    r"\bbag\b",
    r"\bbuy\s*later\b",
    r"\bshortlist\b",
    r"\badd\s*to\s*cart\b",
    r"\bsaved\s*in\s*cart\b"
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
    Upserts feedback records into Supabase raw_feedback table on_conflict of external_id.
    Ensures zero duplicates when scrapers re-run.
    Returns the number of rows submitted.
    """
    if not records:
        print("[DB] No matching records to upsert.")
        return 0

    supabase = get_supabase_client()
    try:
        # Upsert with on_conflict='external_id'
        response = supabase.table("raw_feedback").upsert(
            records,
            on_conflict="external_id"
        ).execute()
        
        inserted_count = len(response.data) if response.data else len(records)
        print(f"[DB] Successfully upserted {inserted_count} rows into raw_feedback.")
        return inserted_count
    except Exception as e:
        print(f"[DB Error] Failed to upsert records into Supabase: {e}")
        raise e
