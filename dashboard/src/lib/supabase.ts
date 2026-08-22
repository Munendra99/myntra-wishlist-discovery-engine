import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "https://rlmhvekrfynxztnisfpd.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsbWh2ZWtyZnlueHp0bmlzZnBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNjk5MDEsImV4cCI6MjEwMjc0NTkwMX0.IlM7ZGdS_g5uSbR85xtoahPcugvqWihpmQ4CVOxbb6E";

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
