"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  ExternalLink,
  Star,
  MessageSquare,
  Smartphone,
  Apple,
  HelpCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { supabase, RawFeedback } from "@/lib/supabase";

interface ReviewStreamProps {
  initialReviews: RawFeedback[];
}

export const ReviewStream: React.FC<ReviewStreamProps> = ({
  initialReviews,
}) => {
  const [reviews, setReviews] = useState<RawFeedback[]>(initialReviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchPlatformReviews = async (platform: string, query: string) => {
    setIsLoading(true);
    try {
      let req = supabase
        .from("raw_feedback")
        .select("*", { count: "exact" })
        .order("scraped_at", { ascending: false })
        .limit(100);

      if (platform !== "all") {
        req = req.eq("platform", platform);
      }

      if (query.trim()) {
        req = req.ilike("text", `%${query.trim()}%`);
      }

      const { data, count, error } = await req;
      if (data) {
        setReviews(data as RawFeedback[]);
        if (count !== null) setTotalCount(count);
      }
    } catch (err) {
      console.error("Error fetching filtered reviews:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger fetch when platform tab changes or user stops typing in search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPlatformReviews(platformFilter, searchTerm);
    }, 250);

    return () => clearTimeout(timer);
  }, [platformFilter, searchTerm]);

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

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case "playstore":
        return "Google Play (1,709 signals)";
      case "appstore":
        return "Apple App Store (708 signals)";
      case "reddit":
        return "Quora / Reddit (18 signals)";
      default:
        return platform;
    }
  };

  return (
    <section className="mb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
        <div>
          <div className="flex items-center space-x-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
            <MessageSquare className="w-4 h-4 text-sky-400" />
            <span>Raw Verbatim Customer Intelligence</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Live Customer Review Stream
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Real verbatim customer reviews ingested across Google Play Store, App Store & Forums.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sizes, refunds, fees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 bg-slate-900 border border-slate-800 text-white text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-pink-500 transition-colors shadow-inner"
            />
          </div>

          {/* Platform Filter Buttons */}
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            {[
              { id: "all", label: "All (2,435)" },
              { id: "playstore", label: "Play Store (1.7k)" },
              { id: "appstore", label: "App Store (708)" },
              { id: "reddit", label: "Quora/Forums (18)" },
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
        </div>
      </div>

      {/* Loading state indicator */}
      {isLoading && (
        <div className="flex items-center justify-center space-x-2 py-4 text-xs text-pink-400 font-mono">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Fetching live signals from Supabase...</span>
        </div>
      )}

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {reviews.length === 0 && !isLoading ? (
          <div className="col-span-full py-16 text-center text-slate-500 text-sm bg-slate-900/40 rounded-2xl border border-slate-800">
            No matching reviews found for "{searchTerm}" on {platformFilter}.
          </div>
        ) : (
          reviews.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md group"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center space-x-1.5 text-xs font-medium text-slate-300">
                    <div className="p-1 rounded bg-slate-950 border border-slate-800">
                      {getPlatformIcon(item.platform)}
                    </div>
                    <span className="truncate max-w-[170px]">
                      {getPlatformName(item.platform)}
                    </span>
                  </div>

                  {item.rating !== null && item.rating > 0 && (
                    <div className="flex items-center space-x-1 bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-md border border-amber-500/20 text-[11px] font-bold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{item.rating}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <p className="text-xs text-slate-200 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all">
                  "{item.text}"
                </p>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate max-w-[140px] font-medium text-slate-300">
                  {item.author || "Anonymous"}
                </span>

                {item.keyword_matched && (
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
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
