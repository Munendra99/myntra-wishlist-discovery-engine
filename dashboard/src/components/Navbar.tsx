"use client";

import React from "react";
import { Sparkles, RefreshCw, Layers, ShieldCheck } from "lucide-react";

interface NavbarProps {
  onRefresh: () => void;
  isRefreshing: boolean;
  totalFeedbackCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onRefresh,
  isRefreshing,
  totalFeedbackCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600 via-rose-500 to-orange-400 p-[2px] shadow-lg shadow-pink-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Layers className="w-5 h-5 text-pink-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                Myntra <span className="bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent">Wishlist Intelligence</span>
              </h1>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
                Live Engine
              </span>
            </div>
            <p className="text-xs text-slate-400">
              AI-Powered Drop-off & Cart Stall Analytics
            </p>
          </div>
        </div>

        {/* Live Status & Actions */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 text-xs text-slate-400 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-slate-300">
              {totalFeedbackCount.toLocaleString()}
            </span>
            <span>Signals Ingested</span>
          </div>

          <div className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-400 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
            <span>Groq AI + Supabase Cloud</span>
          </div>

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-1.5 text-xs font-medium bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white px-3.5 py-1.5 rounded-lg transition-all shadow-md shadow-pink-500/25 active:scale-95 disabled:opacity-50"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">Sync Data</span>
          </button>
        </div>
      </div>
    </header>
  );
};
