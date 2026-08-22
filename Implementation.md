# Master Build Plan: Myntra Wishlist Discovery Engine

## Project Context
Building an AI-powered discovery engine that analyzes public feedback (Google Play Store, Reddit, Apple App Store) to understand why users add fashion items to their Myntra wishlist but don't purchase them. The system runs live and automatically end-to-end, using 100% free-tier infrastructure.

### Constraints & Stack:
- **Free-Tier Infrastructure:** GitHub (Actions), Supabase (Postgres Database), Apify (Reddit & App Store scrapers), Vercel (Next.js hosting), Groq (Fast Llama 3.3 API for normalization and chat).
- **Dual-Method Scraping:** Direct scraping for Google Play Store (`google-play-scraper`), Apify actors for Reddit and App Store (to bypass anti-bot protections).
- **Automation:** GitHub Actions running daily automated pipelines.
- **Frontend & AI Chat:** Next.js on Vercel with a live analytics dashboard and Groq-powered Q&A assistant.

---

## Phase Breakdown:
1. **Phase 1 — Accounts & Foundation (No code yet)**
2. **Phase 2 — Database Schema (Supabase)**
3. **Phase 3 — Ingestion Layer (3 sources, 2 methods)**
4. **Phase 4 — Automation (GitHub Actions daily cron)**
5. **Phase 5 — AI Normalization & Tagging (Groq Llama 3.3)**
6. **Phase 6 — Live Website (Next.js Dashboard + Chat Panel)**
7. **Phase 7 — End-to-End Verification**
8. **Phase 8 — Deliverable Packaging & Slide Brief**
