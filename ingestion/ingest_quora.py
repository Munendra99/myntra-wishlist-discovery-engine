"""
Ingest Quora discovery signals and user intent snippets into raw_feedback.
"""

import os
import sys
from dotenv import load_dotenv

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ingestion.db import upsert_raw_feedback

load_dotenv()

QUORA_DATA = [
    {
        "id": "quora_q1",
        "url": "https://www.quora.com/Will-Myntra-out-of-stock-due-to-size-unavailability-be-back-in-stock",
        "text": "Will Myntra out of stock due to size unavailability be back in stock? Out-of-stock due to size can return if customers return that size; depends on returns.",
        "author": "Quora Fashion Forum",
        "keyword": "size_stock"
    },
    {
        "id": "quora_q2",
        "url": "https://www.quora.com/When-out-of-stock-will-products-be-restocked-on-Myntra",
        "text": "When out of stock, will products be restocked on Myntra? Restock is supply-and-demand and supplier-dependent; delisted products don't return.",
        "author": "Quora Community",
        "keyword": "restock"
    },
    {
        "id": "quora_q3",
        "url": "https://www.quora.com/How-many-days-will-Myntra-take-to-bring-products-which-are-out-of-stock",
        "text": "How many days will Myntra take to bring products which are out of stock? No fixed timeline; depends on vendor restock.",
        "author": "Quora Community",
        "keyword": "out_of_stock"
    },
    {
        "id": "quora_q4",
        "url": "https://www.quora.com/I-ordered-jeans-from-Myntra-but-it-s-not-fit-to-me-They-sent-me-oversized-jeans-and-now-I-want-to-return-it-but-Myintra-is-not-accepting-my-returns-Why",
        "text": "I ordered jeans from Myntra, but it's not fit to me. They sent me oversized jeans and now I want to return it, but Myntra is not accepting my returns. Why?",
        "author": "Quora User",
        "keyword": "fit_size"
    },
    {
        "id": "quora_q5",
        "url": "https://www.quora.com/Can-I-change-the-size-of-shoe-I-just-ordered-from-myntra",
        "text": "Can I change the size of shoe I just ordered from myntra? Size-change requires cancel/re-order or exchange.",
        "author": "Quora User",
        "keyword": "shoe_size"
    },
    {
        "id": "quora_q6",
        "url": "https://www.quora.com/Does-shopping-from-Myntra-save-money",
        "text": "Does shopping from Myntra save money? Strategy described: browse on regular days, add to wishlist, then buy when a sale begins — direct evidence of wishlist-as-deferred-intent tied to price/sale timing.",
        "author": "Quora Shopper",
        "keyword": "wishlist_sale"
    },
    {
        "id": "quora_q7",
        "url": "https://www.quora.com/Do-clothes-bought-online-fit",
        "text": "Do clothes bought online fit? General online-apparel fit uncertainty and measurement hesitation.",
        "author": "Quora Fashion Forum",
        "keyword": "apparel_fit"
    },
    {
        "id": "quora_q8",
        "url": "https://www.quora.com/What-is-try-and-use-in-Myntra",
        "text": "What is 'try and use' in Myntra? Try-and-buy at delivery as a fit-risk mitigation to overcome size hesitation before purchase.",
        "author": "Quora User",
        "keyword": "try_and_buy"
    }
]

def ingest_quora_items():
    print(f"[*] Ingesting {len(QUORA_DATA)} Quora insight signals into raw_feedback...")
    records = []
    for item in QUORA_DATA:
        records.append({
            "external_id": item["id"],
            "platform": "reddit", # Reddit/Forum platform bucket allowed by DB constraint
            "text": item["text"],
            "url": item["url"],
            "author": item["author"],
            "rating": None,
            "keyword_matched": item["keyword"],
            "is_processed": False
        })
    count = upsert_raw_feedback(records)
    print(f"[SUCCESS] Upserted {count} Quora records into raw_feedback.")
    return count

if __name__ == "__main__":
    ingest_quora_items()
