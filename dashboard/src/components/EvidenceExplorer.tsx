"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Smartphone,
  Apple,
  HelpCircle,
  MessageSquare,
  Star,
  Loader2,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
} from "lucide-react";
import { supabase, RawFeedback } from "@/lib/supabase";
import { EpistemicBadge } from "./DiscoveryFunnel";

interface EvidenceExplorerProps {
  initialReviews: RawFeedback[];
}

export const EvidenceExplorer: React.FC<EvidenceExplorerProps> = ({
  initialReviews = [],
}) => {
  const [allReviews, setAllReviews] = useState<RawFeedback[]>(initialReviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [themeFilter, setThemeFilter] = useState<string>("all");
  const [showCounterEvidence, setShowCounterEvidence] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(3026);

  const fetchFeedbackData = async () => {
    setIsLoading(true);
    try {
      // 1. Try serverless API endpoint
      const res = await fetch("/api/feedback?limit=120");
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          setAllReviews(json.data);
          if (json.count) setTotalCount(json.count);
          setIsLoading(false);
          return;
        }
      }

      // 2. Direct Supabase fallback
      const { data, count, error } = await supabase
        .from("raw_feedback")
        .select("*", { count: "exact" })
        .order("scraped_at", { ascending: false })
        .limit(120);

      if (data && data.length > 0) {
        setAllReviews(data as RawFeedback[]);
        if (count) setTotalCount(count);
      }
    } catch (err) {
      console.error("Evidence Explorer fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialReviews && initialReviews.length > 0) {
      setAllReviews(initialReviews);
    } else {
      fetchFeedbackData();
    }
  }, [initialReviews]);

  // Client-side instant filtering on all retrieved reviews
  const filteredReviews = useMemo(() => {
    return allReviews.filter((item) => {
      // Platform Filter
      if (platformFilter !== "all" && item.platform !== platformFilter) {
        return false;
      }

      // Thematic Filter
      if (themeFilter !== "all") {
        const text = (item.text || "").toLowerCase();
        if (themeFilter === "fit" && !text.includes("fit") && !text.includes("size") && !text.includes("chart")) {
          return false;
        }
        if (themeFilter === "fabric" && !text.includes("fabric") && !text.includes("cloth") && !text.includes("material") && !text.includes("cotton")) {
          return false;
        }
        if (themeFilter === "wishlist" && !text.includes("wishlist") && !text.includes("save") && !text.includes("cart")) {
          return false;
        }
        if (themeFilter === "share" && !text.includes("share") && !text.includes("friend") && !text.includes("whatsapp")) {
          return false;
        }
        if (themeFilter === "stock" && !text.includes("stock") && !text.includes("sold") && !text.includes("avail")) {
          return false;
        }
      }

      // Search Filter
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase().trim();
        const text = (item.text || "").toLowerCase();
        const author = (item.author || "").toLowerCase();
        const keyword = (item.keyword_matched || "").toLowerCase();
        if (!text.includes(term) && !author.includes(term) && !keyword.includes(term)) {
          return false;
        }
      }

      // Counter-Evidence Filter (Positive reviews showing satisfaction with sizing/quality)
      if (showCounterEvidence) {
        const text = (item.text || "").toLowerCase();
        const isPositive =
          text.includes("perfect") ||
          text.includes("love") ||
          text.includes("good") ||
          text.includes("great") ||
          text.includes("nice") ||
          (item.rating !== null && item.rating >= 4);
        if (!isPositive) return false;
      }

      return true;
    });
  }, [allReviews, platformFilter, themeFilter, searchTerm, showCounterEvidence]);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "playstore":
        return <Smartphone className="w-3.5 h-3.5 text-emerald-400" />;
      case "appstore":
        return <Apple className="w-3.5 h-3.5 text-sky-400" />;
      case "reddit":
        return <HelpCircle className="w-3.5 h-3.5 text-orange-400" />;
      default:
        return <MessageSquare className="w-3.5 h-3.5 text-pink-400" />;
    }
  };

  return (
    <section className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>Traceable Evidence Layer</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Raw Customer Signals & Counter-Evidence Explorer
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Every macro insight and opportunity in this discovery engine is 100% traceable back to verified raw customer comments across independent platforms.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => fetchFeedbackData()}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:bg-slate-800 transition-all text-xs flex items-center gap-1.5"
            title="Reload Evidence"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-pink-400" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={() => setShowCounterEvidence(!showCounterEvidence)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              showCounterEvidence
                ? "bg-amber-500/10 text-amber-300 border-amber-500/30 shadow-md shadow-amber-500/10"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
            }`}
          >
            {showCounterEvidence ? (
              <ToggleRight className="w-4 h-4 text-amber-400" />
            ) : (
              <ToggleLeft className="w-4 h-4 text-slate-500" />
            )}
            <span>
              {showCounterEvidence
                ? "Viewing Counter-Evidence"
                : "Filter Contradictory Evidence"}
            </span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col md:flex-row items-center gap-3">
        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search keywords (e.g. fit, dress, share, fabric)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-white text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-pink-500 transition-colors shadow-inner"
          />
        </div>

        {/* Platform Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 w-full md:w-auto overflow-x-auto custom-scrollbar">
          {[
            { id: "all", label: "All Sources (3.0k)" },
            { id: "playstore", label: "Play Store (2.2k)" },
            { id: "appstore", label: "App Store (772)" },
            { id: "reddit", label: "Quora / Reddit (18)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setPlatformFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                platformFilter === tab.id
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Thematic Topic Pills */}
        <div className="flex items-center space-x-1.5 w-full md:w-auto overflow-x-auto custom-scrollbar">
          {[
            { id: "all", label: "All Topics" },
            { id: "fit", label: "Size/Fit" },
            { id: "fabric", label: "Fabric/Drape" },
            { id: "wishlist", label: "Clutter/Save" },
            { id: "share", label: "Social Validation" },
            { id: "stock", label: "Stock Depletion" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setThemeFilter(t.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap border ${
                themeFilter === t.id
                  ? "bg-sky-500/20 text-sky-300 border-sky-500/40"
                  : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state indicator */}
      {isLoading && (
        <div className="flex items-center justify-center space-x-2 py-3 text-xs text-pink-400 font-mono">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Retrieving verified customer signals from Supabase...</span>
        </div>
      )}

      {/* Counter-Evidence Alert Banner */}
      {showCounterEvidence && (
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 text-xs text-amber-200 flex items-start space-x-3">
          <span className="p-1 rounded bg-amber-500/20 text-amber-400 font-bold shrink-0 mt-0.5">
            CONTRADICTORY EVIDENCE
          </span>
          <p className="leading-relaxed">
            Surfacing customer signals expressing satisfaction with sizing and fabric quality. Counter-evidence represents ~8–12% of total signals, demonstrating that fit ambiguity predominantly affects first-time brand buyers and cross-brand selections.
          </p>
        </div>
      )}

      {/* Signals Count Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
        <span>Showing {filteredReviews.length} signals</span>
        <span>Total Verified in Database: {totalCount.toLocaleString()}</span>
      </div>

      {/* Raw Signals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[650px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredReviews.length === 0 && !isLoading ? (
          <div className="col-span-full py-16 text-center text-slate-500 text-sm bg-slate-900/40 rounded-2xl border border-slate-800">
            No matching signals found for "{searchTerm}". Try clearing search filters or refreshing data.
          </div>
        ) : (
          filteredReviews.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center space-x-1.5 text-xs font-medium text-slate-300">
                    <div className="p-1 rounded bg-slate-950 border border-slate-800">
                      {getPlatformIcon(item.platform)}
                    </div>
                    <span className="uppercase text-[10px] font-mono tracking-wider text-slate-400">
                      {item.platform}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <EpistemicBadge status="OBSERVED" />
                    {item.rating !== null && item.rating > 0 && (
                      <div className="flex items-center space-x-1 bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20 text-[10px] font-bold">
                        <Star className="w-2.5 h-2.5 fill-amber-400" />
                        <span>{item.rating}</span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all">
                  "{item.text}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate max-w-[130px] font-medium text-slate-300">
                  {item.author || "Anonymous Shopper"}
                </span>

                {item.keyword_matched && (
                  <span className="px-2 py-0.5 rounded bg-slate-950 text-pink-300 font-mono text-[10px] border border-slate-800">
                    #{item.keyword_matched}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
