import os
import glob
from ingest_offline_data import ingest_from_json, ingest_from_csv

user_uploads_dir = r"C:\Users\Muni Chandu\.gemini\antigravity-ide\brain\3bb12bf7-7a88-424a-ad75-a27d8806f233\.user_uploaded"

if os.path.exists(user_uploads_dir):
    for fpath in glob.glob(os.path.join(user_uploads_dir, "*")):
        if fpath.endswith(".json"):
            print(f"Processing user JSON: {fpath}")
            ingest_from_json(fpath)
        elif fpath.endswith(".csv"):
            print(f"Processing user CSV: {fpath}")
            ingest_from_csv(fpath)
