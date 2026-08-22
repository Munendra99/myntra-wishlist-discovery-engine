import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rlmhvekrfynxztnisfpd.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface InsightTheme {
  id: string;
  theme: string;
  theme_label: string;
  description: string;
  mention_count: number;
  pct_of_total: number;
  sample_quotes: string[];
  segment_breakdown: Record<string, number>;
  trend: "rising" | "stable" | "high_urgency";
  updated_at: string;
}

export interface RawFeedback {
  id: string;
  external_id: string;
  platform: "playstore" | "reddit" | "appstore";
  text: string;
  url: string;
  author: string;
  rating: number | null;
  keyword_matched: string;
  scraped_at: string;
}
