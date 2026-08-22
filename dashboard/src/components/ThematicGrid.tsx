"use client";

import React, { useState } from "react";
import {
  Ruler,
  Tag,
  Sparkles,
  Truck,
  Layers,
  RotateCcw,
  Quote,
  ChevronDown,
  ChevronUp,
  Flame,
  TrendingUp,
  Activity,
} from "lucide-react";
import { InsightTheme } from "@/lib/supabase";

interface ThematicGridProps {
  insights: InsightTheme[];
}

const getThemeIcon = (theme: string) => {
  switch (theme) {
    case "fit_uncertainty":
      return <Ruler className="w-5 h-5 text-indigo-400" />;
    case "price_wait":
      return <Tag className="w-5 h-5 text-amber-400" />;
    case "fabric_trust":
      return <Sparkles className="w-5 h-5 text-pink-400" />;
    case "delivery_delay":
      return <Truck className="w-5 h-5 text-sky-400" />;
    case "out_of_stock":
      return <Layers className="w-5 h-5 text-orange-400" />;
    case "service_friction":
      return <RotateCcw className="w-5 h-5 text-rose-400" />;
    default:
      return <Activity className="w-5 h-5 text-emerald-400" />;
  }
};

const getTrendBadge = (trend: string) => {
  switch (trend) {
    case "high_urgency":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <Flame className="w-3 h-3 mr-1" /> High Urgency
        </span>
      );
    case "rising":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <TrendingUp className="w-3 h-3 mr-1" /> Rising Trend
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
          Stable Trend
        </span>
      );
  }
};

export const ThematicGrid: React.FC<ThematicGridProps> = ({ insights }) => {
  const [expandedTheme, setExpandedTheme] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedTheme(expandedTheme === id ? null : id);
  };

  return (
    <section className="mb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
        <div>
          <div className="flex items-center space-x-2 text-pink-400 text-xs font-bold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-pink-400"></span>
            <span>Synthesized Drop-off Architecture</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Canonical Wishlist Friction Breakdown
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Why customers hesitate, save items for later, and abandon checkout.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {insights.map((item) => {
          const isExpanded = expandedTheme === item.id;
          const quotes = Array.isArray(item.sample_quotes)
            ? item.sample_quotes
            : [];
          const breakdown = item.segment_breakdown || {};

          return (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700/90 transition-all p-5 shadow-lg group hover:shadow-pink-500/5"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700/80 shadow-inner">
                      {getThemeIcon(item.theme)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base tracking-tight leading-snug">
                        {item.theme_label}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        {item.mention_count} signals detected
                      </p>
                    </div>
                  </div>
                  {getTrendBadge(item.trend)}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Progress Metric Bar */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">Friction Share</span>
                    <span className="text-pink-400 font-bold">
                      {item.pct_of_total}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full transition-all duration-700"
                      style={{ width: `${Math.max(item.pct_of_total, 4)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Sub-Category Distribution */}
                {Object.keys(breakdown).length > 0 && (
                  <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/60 mb-4">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                      Top Impacted Categories
                    </span>
                    <div className="space-y-1.5">
                      {Object.entries(breakdown).map(([category, share]) => (
                        <div
                          key={category}
                          className="flex items-center justify-between text-xs"
                        >
                          <span className="text-slate-300">{category}</span>
                          <span className="text-slate-400 font-mono font-medium">
                            {share}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expandable Direct Quotes */}
                {isExpanded && quotes.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-800 space-y-2 animate-fadeIn">
                    <span className="text-[11px] font-semibold text-pink-400 uppercase tracking-wider flex items-center gap-1">
                      <Quote className="w-3 h-3" /> Verbatim Customer Voices
                    </span>
                    <div className="space-y-2">
                      {quotes.slice(0, 3).map((q, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/90 text-[11px] text-slate-300 italic leading-relaxed"
                        >
                          "{q}"
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Toggle Quotes Button */}
              {quotes.length > 0 && (
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-center space-x-1 text-xs font-semibold text-pink-400 hover:text-pink-300 transition-colors w-full"
                >
                  <span>
                    {isExpanded
                      ? "Hide Customer Quotes"
                      : `View ${quotes.length} Verbatim Quotes`}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
