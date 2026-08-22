"use client";

import React, { useEffect, useState } from "react";
import { supabase, InsightTheme, RawFeedback } from "@/lib/supabase";
import { Navbar } from "@/components/Navbar";
import { MetricsCards } from "@/components/MetricsCards";
import { ThematicGrid } from "@/components/ThematicGrid";
import { ProductSolutions } from "@/components/ProductSolutions";
import { ReviewStream } from "@/components/ReviewStream";
import { AiCopilot } from "@/components/AiCopilot";
import { Sparkles, Layers, ShieldCheck, Database, RefreshCw, ArrowUpRight } from "lucide-react";

export default function DashboardPage() {
  const [insights, setInsights] = useState<InsightTheme[]>([]);
  const [reviews, setReviews] = useState<RawFeedback[]>([]);
  const [totalCount, setTotalCount] = useState<number>(2427);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsRefreshing(true);

      // 1. Fetch insights
      const { data: insightsData, error: insError } = await supabase
        .from("insights")
        .select("*")
        .order("mention_count", { ascending: false });

      if (insightsData && insightsData.length > 0) {
        setInsights(insightsData as InsightTheme[]);
      }

      // 2. Fetch raw reviews
      const { data: reviewsData, count, error: revError } = await supabase
        .from("raw_feedback")
        .select("*", { count: "exact" })
        .order("scraped_at", { ascending: false })
        .limit(150);

      if (reviewsData) {
        setReviews(reviewsData as RawFeedback[]);
      }
      if (count) {
        setTotalCount(count);
      }
    } catch (err) {
      console.error("Error fetching data from Supabase:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-pink-500 selection:text-white font-sans antialiased">
      {/* Navbar */}
      <Navbar
        onRefresh={fetchData}
        isRefreshing={isRefreshing}
        totalFeedbackCount={totalCount}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-pink-950/40 border border-slate-800 p-8 sm:p-10 mb-8 shadow-2xl overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time E-Commerce Intelligence</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Decoding the{" "}
              <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
                Wishlist-to-Cart Drop-off
              </span>{" "}
              Friction
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              An automated, AI-driven discovery engine synthesizing public feedback
              from Google Play Store, Apple App Store, and Fashion Forums to pinpoint
              why shoppers save items but stall before purchase.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-slate-400">
              <div className="flex items-center space-x-1.5 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
                <Database className="w-3.5 h-3.5 text-pink-400" />
                <span>Supabase PostgreSQL Backend</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
                <Layers className="w-3.5 h-3.5 text-rose-400" />
                <span>Groq Llama 3.3 Normalization</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Daily GitHub Actions Automation</span>
              </div>
            </div>
          </div>

          {/* Decorative Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* 1. Executive Metrics Cards */}
        <MetricsCards insights={insights} totalFeedback={totalCount} />

        {/* 2. Interactive AI Discovery Copilot */}
        <AiCopilot />

        {/* 3. Thematic Friction Grid */}
        <ThematicGrid insights={insights} />

        {/* 4. Strategic Product Roadmap Solutions */}
        <ProductSolutions />

        {/* 5. Live Verbatim Reviews Stream */}
        <ReviewStream initialReviews={reviews} />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Myntra Wishlist Discovery Engine — Free-Tier Production Architecture</p>
          <div className="flex items-center space-x-4 text-slate-400">
            <span>Supabase</span>
            <span>•</span>
            <span>Groq AI</span>
            <span>•</span>
            <span>GitHub Actions</span>
            <span>•</span>
            <span>Vercel</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
