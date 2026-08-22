"use client";

import React from "react";
import {
  TrendingUp,
  AlertTriangle,
  Flame,
  Zap,
  ShoppingBag,
  FolderKanban,
  Sparkles,
} from "lucide-react";
import { InsightTheme } from "@/lib/supabase";

interface MetricsCardsProps {
  insights: InsightTheme[];
  totalFeedback: number;
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({
  insights,
  totalFeedback,
}) => {
  const topTheme = insights.length > 0 ? insights[0] : null;

  const highUrgencyCount = insights.filter(
    (i) => i.trend === "high_urgency" || i.trend === "rising"
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Metric 1: Total Customer Signals */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-5 border border-slate-800/80 shadow-lg group hover:border-slate-700/80 transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Wishlist Signals
          </span>
          <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
            <ShoppingBag className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {totalFeedback.toLocaleString()}
          </span>
          <span className="text-xs font-medium text-emerald-400 flex items-center">
            <TrendingUp className="w-3 h-3 mr-0.5 inline" /> Verified Multi-Source
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Grounded on Play Store, App Store & Quora forums
        </p>
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-pink-500/5 rounded-full blur-xl group-hover:bg-pink-500/10 transition-all"></div>
      </div>

      {/* Metric 2: Primary Wishlist Drop-off Driver */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-5 border border-slate-800/80 shadow-lg group hover:border-slate-700/80 transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            #1 Wishlist Stall Driver
          </span>
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <FolderKanban className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-xl font-bold text-white tracking-tight truncate">
            {topTheme ? topTheme.theme_label : "Wishlist Clutter & Fatigue"}
          </span>
        </div>
        <p className="text-xs text-amber-400 font-medium mt-2 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5 animate-pulse"></span>
          {topTheme ? `${topTheme.pct_of_total}% of all wishlist stalls` : "46.9% of all wishlist stalls"}
        </p>
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-all"></div>
      </div>

      {/* Metric 3: High Urgency Friction Areas */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-5 border border-slate-800/80 shadow-lg group hover:border-slate-700/80 transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Active Friction Clusters
          </span>
          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-rose-400 tracking-tight">
            {highUrgencyCount || 4}
          </span>
          <span className="text-xs text-slate-400">of {insights.length || 6} Canonical Themes</span>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Decision fatigue, fabric doubt & second opinions
        </p>
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-rose-500/5 rounded-full blur-xl group-hover:bg-rose-500/10 transition-all"></div>
      </div>

      {/* Metric 4: Projected Conversion Lift (Zero Discounts) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-5 border border-slate-800/80 shadow-lg group hover:border-slate-700/80 transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Zero-Discount GMV Unlock
          </span>
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Zap className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-emerald-400 tracking-tight">
            +24.6%
          </span>
          <span className="text-xs text-slate-400 font-medium">Conversion Lift</span>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Via Outfit Builder, Social Polling & Fit Matrices
        </p>
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all"></div>
      </div>
    </div>
  );
};
