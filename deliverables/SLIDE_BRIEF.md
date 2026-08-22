# 🛍️ Myntra Wishlist Discovery Engine — Executive Slide Brief

> **Decoding the Wishlist-to-Purchase Conversion Gap with Zero Monetary Incentives**  
> *Production System Powered by Free-Tier Cloud Infrastructure (Supabase, Groq Llama 3.3, Vercel, GitHub Actions)*

---

## 📌 Slide 1: Title & Executive Overview

### **Project Title:**
**Myntra Wishlist Discovery Engine: AI-Powered Purchase Drop-Off Intelligence**

### **Core Problem:**
Over **68% of fashion e-commerce users** add items to their Myntra wishlist but never convert to checkout. Traditional e-commerce platforms default to discounting and coupon bribes, which erode gross margins without solving the underlying psychological and behavioral hesitations.

### **Core Objective:**
Build a live, autonomous AI discovery pipeline that synthesizes public feedback across Google Play Store, Apple App Store, and Quora/Reddit to identify **pure wishlist drop-off drivers** and unlock checkout conversions using **zero monetary incentives**.

---

## 🔍 Slide 2: The 6 Canonical Wishlist Friction Drivers (Quantified)

Based on live synthesis of **2,435+ authentic customer reviews & signals**:

| # | Friction Area | Share | Urgency | Root Cause & Behavioral Pattern |
|---|---|---|---|---|
| **1** | **Wishlist Clutter & Decision Paralysis** | **47.1%** | 📈 *Rising* | Users hoard 50+ unorganized saved items. Cognitive overload and lack of curation prevent final selection. |
| **2** | **Fabric Drape & Studio Photo Ambiguity** | **24.9%** | ⚖️ *Stable* | Studio lighting and static mannequin photos fail to convey real fabric weight, transparency, and drape in motion. |
| **3** | **External Validation & Second-Opinion Gap** | **15.8%** | 🔥 *High Urgency* | Checkout stalls for 48–72 hours while users take screenshots to ask friends or family on WhatsApp. |
| **4** | **Size & Fit Ambiguity** | **8.9%** | 📈 *Rising* | Inconsistent brand measurements and fear of return hassles create hesitation before purchasing. |
| **5** | **Silent Size Depletion in Wishlist** | **1.8%** | 🔥 *High Urgency* | Saved size silently goes out of stock without offering intelligent visual alternatives. |
| **6** | **Passive Moodboard & Intent Disconnect** | **1.5%** | ⚖️ *Stable* | Wishlist is used as an aspirational Pinterest board with no immediate purchase urgency. |

---

## 🏗️ Slide 3: End-to-End Autonomous System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        1. MULTI-SOURCE INGESTION                       │
│  • Google Play Store Scraper (2000+ reviews, Direct)                   │
│  • Apple App Store Feed (Customer Reviews JSON Feed)                   │
│  • Apify Reddit Actor / Quora Signal Collector                         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Idempotent Upsert (external_id)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    2. SUPABASE POSTGRESQL CLOUD DATABASE               │
│  • raw_feedback Table (2,435+ rows, Row-Level Security)                │
│  • insights Table (Aggregated themes, statistics, sample quotes)       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Batch Pipeline
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   3. AI NORMALIZATION ENGINE (GROQ API)                │
│  • Model: Llama 3.3 / GPT-OSS on Groq Ultra-Fast Inference             │
│  • Thematic Classification, Quote Extraction & Sentiment Scoring       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Live Sync
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                4. NEXT.JS EXECUTIVE DASHBOARD & AI COPILOT             │
│  • Metric Cards, Interactive Thematic Grid & Verbatim Review Stream    │
│  • Grounded AI Copilot for CPO / Growth Leadership Strategy Queries    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Daily Automation
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│               5. GITHUB ACTIONS SCHEDULED CLOUD WORKFLOW               │
│  • Daily Cron at 04:00 UTC (09:30 AM IST) + Manual Workflow Trigger    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 💡 Slide 4: Zero-Monetary Product Solutions Matrix (Myntra-Native)

| Proposed Feature | Target Friction | Mechanism (Zero Discounts) | Target Impact |
|---|---|---|---|
| **1. Interactive Wishlist Outfit Builder** | Wishlist Clutter & Moodboard | AI pairs saved tops, bottoms, and footwear into complete looks with 1-click *"Move Entire Look to Bag"*. | **+31% Checkout Velocity** |
| **2. Collaborative 'Ask a Friend' Polling** | External Validation Gap | 1-click private WhatsApp / Instagram voting link (*"Love it / Skip it"*) with live vote tally on wishlist card. | **Eliminates 72h Stall** |
| **3. Similar In-Stock Auto-Swapper** | Silent Size Depletion | Detects out-of-stock sizes and dynamically suggests visually identical in-stock alternatives with 1-tap swap. | **Recovers 84% Lost Demand** |
| **4. Real-Motion Drape Video Hauls** | Fabric & Drape Ambiguity | 5–10s user video clips in daylight + standardized **GSM & Transparency Badges** on ethnic wear. | **+26% Confidence Lift** |
| **5. Dynamic Fit Benchmark Matrix** | Size & Fit Ambiguity | Photo reviews filtered by user's exact height/weight + cross-brand sizing normalization. | **-38% Return Anxiety** |
| **6. Wishlist Auto-Organizer** | Decision Paralysis | Auto-clusters saved items into thematic occasion boards (*"Workwear"*, *"Weddings"*, *"Vacation"*). | **-60% Dwell Time** |

---

## 💰 Slide 5: Free-Tier Production Infrastructure Audit

| Infrastructure Layer | Tool / Platform | Usage Limits / Tier | Monthly Operating Cost |
|---|---|---|---|
| **Database & Auth** | Supabase | Free Tier (500 MB DB, 50k monthly active users) | **$0.00 / month** |
| **Scraping & Ingestion** | google-play-scraper + Apple RSS + Apify Lite | 100% Free / Direct HTTP API | **$0.00 / month** |
| **AI LLM Inference** | Groq Cloud API (Llama 3.3) | Free Developer Tier (30 req/min, 8k tokens/min) | **$0.00 / month** |
| **Automation & Cron** | GitHub Actions | 2,000 free minutes/month (Pipeline uses < 30 min/mo) | **$0.00 / month** |
| **Web Hosting & Edge** | Vercel | Free Hobby Tier (Edge network, unlimited static) | **$0.00 / month** |
| **TOTAL** | — | **Full Autonomous End-to-End Stack** | **$0.00 / MONTH (100% FREE)** |

---

## 🏆 Slide 6: Summary & Business Impact

1. **Autonomous Operation:** Scrapes, categorizes, normalizes, and aggregates customer intelligence automatically every day without human intervention.
2. **Margin Protection:** Drives purchase completion through UX clarity, outfit synthesis, and social validation without giving away margin in discounts.
3. **Executive Copilot:** Allows product leaders to query raw customer feedback and generate strategic roadmap interventions in seconds.
