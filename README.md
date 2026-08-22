# 🛍️ Myntra Wishlist Discovery Engine

> **AI-Powered Discovery Engine for Fashion Wishlist-to-Purchase Conversion with Zero Monetary Incentives**  
> *Built with 100% Free-Tier Cloud Infrastructure: Supabase, Groq Llama 3.3, Next.js, Vercel, and GitHub Actions.*

---

## 🌟 Key Highlights

- **3,026+ Real Customer Signals Ingested:** Synthesized from Google Play Store (2,236), Apple App Store (772), and Quora/Reddit forums (18).
- **6 Canonical Pure Wishlist Friction Themes:** Wishlist Clutter, Fabric Drape Ambiguity, Social Validation Gap, Size & Fit Doubts, Silent Size Depletion, and Passive Moodboarding.
- **Zero Monetary Incentives:** Actionable Product/UX solutions (Outfit Builder, Social Polling, In-Stock Swapper, Daylight Video Hauls) that drive checkout velocity without margin-eroding discounts.
- **Executive AI Discovery Copilot:** Live conversational intelligence grounded on real customer feedback via Groq Llama 3.3.
- **Fully Autonomous Cloud Pipeline:** Scheduled daily ingestion and normalization via GitHub Actions Cron.

---

## 📁 Repository Structure

```
├── .github/workflows/
│   └── ingest.yml              # Daily automated ingestion & normalization workflow
├── dashboard/                  # Next.js App Router Web Dashboard
│   ├── src/
│   │   ├── app/                # App Router pages and /api/chat route
│   │   ├── components/         # Navbar, MetricsCards, ThematicGrid, ProductSolutions, ReviewStream, AiCopilot
│   │   └── lib/                # Supabase client & TypeScript types
│   ├── .env.local              # Next.js environment configuration
│   └── package.json            # Web app dependencies
├── ingestion/                  # Multi-source data ingestion modules
│   ├── db.py                   # Supabase database helpers & keyword regex filters
│   ├── playstore.py            # Google Play Store direct scraper
│   ├── appstore.py             # Apple App Store RSS feed parser
│   ├── reddit.py               # Apify Reddit/Forum scraper
│   └── ingest_quora.py         # Quora signal collector
├── normalization/
│   └── tagger.py               # Groq AI normalization & canonical thematic synthesis
├── deliverables/
│   └── SLIDE_BRIEF.md          # Complete executive presentation slide brief
├── schema.sql                  # PostgreSQL database schema (raw_feedback + insights)
├── run_ingestion.py            # Master multi-source ingestion runner
├── verify_pipeline.py          # End-to-end pipeline verification test suite
└── requirements.txt            # Python dependencies
```

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- Python 3.10+
- Node.js 18+ & npm

### 2. Python Environment Setup
```bash
pip install -r requirements.txt
```

### 3. Environment Variables (`.env`)
Create a `.env` file in the root directory:
```env
SUPABASE_URL=https://rlmhvekrfynxztnisfpd.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_key
SUPABASE_ANON_KEY=your_supabase_anon_key
APIFY_API_TOKEN=your_apify_token
GROQ_API_KEY=your_groq_api_key
```

### 4. Run Data Ingestion & AI Normalization
```bash
# Ingest live reviews across all platforms
python run_ingestion.py

# Run AI thematic normalization & sync insights table
python normalization/tagger.py
```

### 5. Launch the Local Web Dashboard
```bash
cd dashboard
npm install
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** to explore the live dashboard and interact with the AI Discovery Copilot.

---

## 🧪 End-to-End Verification

Run the master test suite to verify the entire pipeline:
```bash
python verify_pipeline.py
```

---

## ☁️ Deployment to Vercel (100% Free)

1. Push your repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. Set **Root Directory** to `dashboard`.
4. Configure environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GROQ_API_KEY`
5. Click **Deploy**.

---

## 📄 License
MIT License © 2026 Myntra Wishlist Discovery Engine
