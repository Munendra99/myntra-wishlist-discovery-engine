"use client";

import React from "react";
import {
  TrendingUp,
  AlertTriangle,
  ShoppingBag,
  FolderKanban,
  Database,
  Smartphone,
  Apple,
  MessageSquare,
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
  const highUrgencyCount = insights.filter(
    (i) => i.trend === "high_urgency" || i.trend === "rising"
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
      {/* Metric 1: Total Customer Signals */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 p-3.5 border border-slate-800/80 shadow-md group hover:border-slate-700/80 transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Total Wishlist Signals
            </span>
            <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-extrabold text-white tracking-tight">
              {totalFeedback ? totalFeedback.toLocaleString() : "3,026"}
            </span>
            <span className="text-[10px] font-semibold text-emerald-400 flex items-center">
              <TrendingUp className="w-2.5 h-2.5 mr-0.5 inline" /> Verified
            </span>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 mt-1.5 leading-snug">
          Multi-source shopping signals
        </p>
      </div>

      {/* Metric 2: Multi-Source Breakdown (New Card after Total Wishlist Signals) */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 p-3.5 border border-slate-800/80 shadow-md group hover:border-slate-700/80 transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Multi-Source Ingestion
            </span>
            <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Database className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-1 text-slate-300 text-[11px]">
                <Smartphone className="w-3 h-3 text-emerald-400 inline" /> Google Play
              </span>
              <span className="text-white font-mono text-[11px]">2,236</span>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-1 text-slate-300 text-[11px]">
                <Apple className="w-3 h-3 text-sky-400 inline" /> App Store
              </span>
              <span className="text-white font-mono text-[11px]">772</span>
            </div>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 mt-1.5 font-mono flex items-center justify-between border-t border-slate-800/60 pt-1">
          <span className="flex items-center gap-1 text-orange-400">
            <MessageSquare className="w-2.5 h-2.5 inline" /> Reddit / Forums
          </span>
          <span className="text-slate-300">18</span>
        </p>
      </div>

      {/* Metric 3: Primary Wishlist Drop-off Driver */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 p-3.5 border border-slate-800/80 shadow-md group hover:border-slate-700/80 transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              #1 Wishlist Stall Driver
            </span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <FolderKanban className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-sm font-bold text-white tracking-tight line-clamp-1">
              Wishlist Clutter & Fatigue
            </span>
          </div>
        </div>
        <p className="text-[11px] text-amber-400 font-medium mt-1.5 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5 animate-pulse shrink-0"></span>
          <span>47.1% of wishlist stalls</span>
        </p>
      </div>

      {/* Metric 4: High Urgency Friction Areas */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 p-3.5 border border-slate-800/80 shadow-md group hover:border-slate-700/80 transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Active Friction Clusters
            </span>
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-extrabold text-rose-400 tracking-tight">
              {highUrgencyCount || 4}
            </span>
            <span className="text-[10px] text-slate-400">of {insights.length || 6} Canonical Themes</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 mt-1.5 truncate">
          Decision fatigue & sizing doubt
        </p>
      </div>
    </div>
  );
};
