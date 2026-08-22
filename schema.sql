-- ==============================================================================
-- MYNTRA WISHLIST DISCOVERY ENGINE - SUPABASE DATABASE SCHEMA
-- ==============================================================================

-- 1. Enable UUID Extension (standard in PostgreSQL / Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- TABLE 1: raw_feedback
-- Stores every scraped review, Reddit post, or App Store comment in raw format.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.raw_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    external_id TEXT UNIQUE NOT NULL,                -- Unique ID from platform to prevent duplicate entries on rerun
    platform TEXT NOT NULL CHECK (platform IN ('playstore', 'reddit', 'appstore')),
    text TEXT NOT NULL,                              -- Original review / comment content
    url TEXT,                                        -- Source URL link to post/review
    author TEXT,                                     -- Author username / handle (if public)
    rating NUMERIC,                                  -- Star rating (e.g. 1-5, nullable for Reddit)
    keyword_matched TEXT,                            -- Keyword that triggered inclusion (e.g. "wishlist")
    is_processed BOOLEAN DEFAULT FALSE,              -- Flag for AI batch processor
    scraped_at TIMESTAMPTZ DEFAULT NOW(),            -- Timestamp when record was scraped
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_raw_feedback_platform ON public.raw_feedback(platform);
CREATE INDEX IF NOT EXISTS idx_raw_feedback_is_processed ON public.raw_feedback(is_processed);
CREATE INDEX IF NOT EXISTS idx_raw_feedback_scraped_at ON public.raw_feedback(scraped_at DESC);

-- ==============================================================================
-- TABLE 2: insights
-- Stores aggregated, AI-normalized opportunity themes that power the public dashboard.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    theme TEXT UNIQUE NOT NULL,                      -- Machine slug e.g. 'fit_uncertainty', 'price_wait'
    theme_label TEXT NOT NULL,                       -- Human readable title e.g. 'Size & Fit Anxiety'
    description TEXT,                                -- Brief summary of why users stall under this theme
    mention_count INTEGER DEFAULT 0,                 -- Number of raw feedback mentions
    pct_of_total NUMERIC(5,2) DEFAULT 0.00,          -- Percentage of total analyzed mentions
    sample_quotes JSONB DEFAULT '[]'::jsonb,         -- Array of real verbatim quotes supporting this theme
    segment_breakdown JSONB DEFAULT '{}'::jsonb,     -- Category breakdown e.g. {"western": 40, "ethnic": 35}
    trend TEXT DEFAULT 'stable',                     -- 'rising', 'stable', 'high_urgency'
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for dashboard queries
CREATE INDEX IF NOT EXISTS idx_insights_mention_count ON public.insights(mention_count DESC);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on both tables
ALTER TABLE public.raw_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;

-- raw_feedback policies:
-- Service role (our backend scripts) has full access; Public cannot view raw unsanitized reviews.
CREATE POLICY "Service role full access to raw_feedback"
    ON public.raw_feedback
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- insights policies:
-- Public can READ insights (so the Next.js website works without backend proxy).
-- Only Service role can INSERT/UPDATE insights.
CREATE POLICY "Public read access for insights"
    ON public.insights
    FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Service role full access to insights"
    ON public.insights
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ==============================================================================
-- SEED / PLACEHOLDER DATA (Optional initial rows to test UI immediately)
-- ==============================================================================
INSERT INTO public.insights (theme, theme_label, description, mention_count, pct_of_total, sample_quotes, segment_breakdown, trend)
VALUES
(
    'fit_uncertainty',
    'Size & Fit Anxiety',
    'Users hesitate to checkout due to fear of incorrect sizing across different third-party brands.',
    42,
    38.5,
    '["Saved 3 dresses in wishlist because I am unsure if M will be too tight in the bust", "Size chart on Myntra is inconsistent for Western tops so I just keep them saved"]'::jsonb,
    '{"Women Western": 55, "Footwear": 25, "Ethnic Wear": 20}'::jsonb,
    'rising'
),
(
    'price_wait',
    'Sale Speculation & Price Waiting',
    'Users actively hold items in wishlist waiting for the next Big Fashion Festival or sudden price drop.',
    31,
    28.4,
    '["Kept these sneakers in my wishlist waiting for EORS sale price drop", "Price keeps changing every 2 days so I am waiting for minimum price"]'::jsonb,
    '{"Footwear": 40, "Men Casual": 35, "Accessories": 25}'::jsonb,
    'high_urgency'
),
(
    'wishlist_bookmark',
    'Wishlist as Passive Moodboard',
    'Users treat the wishlist as an aspirational bookmark rather than an active cart.',
    21,
    19.3,
    '["I have 100 items saved just for outfit inspiration", "Using wishlist like Pinterest to save looks for weddings"]'::jsonb,
    '{"Ethnic Wear": 50, "Luxury": 30, "Women Western": 20}'::jsonb,
    'stable'
),
(
    'social_validation',
    'Need for External Validation',
    'Shoppers stall checkout while waiting for opinions from friends or family.',
    15,
    13.8,
    '["Shared screenshot with my friend to ask if it looks good before buying", "Waiting to show my mom before placing order"]'::jsonb,
    '{"Ethnic Wear": 45, "Occasion Wear": 40, "Western": 15}'::jsonb,
    'stable'
)
ON CONFLICT (theme) DO NOTHING;
