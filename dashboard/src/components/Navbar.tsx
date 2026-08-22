"use client";

import React from "react";
import {
  Sparkles,
  RefreshCw,
  Layers,
  Users,
  Compass,
  Target,
  FileText,
  Heart,
  Clock,
  Bot,
} from "lucide-react";

export type DiscoveryTab =
  | "overview"
  | "motivations"
  | "personas"
  | "journey"
  | "postponement"
  | "opportunities"
  | "evidence";

interface NavbarProps {
  activeTab: DiscoveryTab;
  onSelectTab: (tab: DiscoveryTab) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  totalFeedbackCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onRefresh,
  isRefreshing,
  totalFeedbackCount,
}) => {
  const tabs: { id: DiscoveryTab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview & Copilot", icon: <Bot className="w-3.5 h-3.5" /> },
    { id: "motivations", label: "Motivations", icon: <Heart className="w-3.5 h-3.5" /> },
    { id: "personas", label: "User Personas", icon: <Users className="w-3.5 h-3.5" /> },
    { id: "journey", label: "Journey & Intent", icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "postponement", label: "Postponement", icon: <Clock className="w-3.5 h-3.5" /> },
    { id: "opportunities", label: "Unmet Needs & Opportunities", icon: <Target className="w-3.5 h-3.5" /> },
    { id: "evidence", label: "Evidence Explorer", icon: <FileText className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Row */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 p-0.5 shadow-lg shadow-pink-500/20">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                <Sparkles className="h-4 w-4 text-pink-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white tracking-tight text-sm sm:text-base">
                  Myntra <span className="text-pink-400">Customer Discovery Engine</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                AI-Powered Customer Discovery & Behavioral Intelligence
              </p>
            </div>
          </div>

          {/* Right Action Items */}
          <div className="flex items-center space-x-3">
            {/* Live Count Badge */}
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-white">
                {totalFeedbackCount.toLocaleString()}
              </span>
              <span className="text-slate-400 hidden sm:inline">Verified Signals</span>
            </div>

            {/* Live Sync Button */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-pink-400" : ""}`}
              />
              <span className="hidden sm:inline">Sync Data</span>
            </button>
          </div>
        </div>

        {/* Bottom Tab Navigation Row */}
        <div className="flex items-center space-x-1 overflow-x-auto py-2 border-t border-slate-800/60 custom-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/25"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
