"use client";

import React, { useState } from "react";
import {
  Layers,
  Filter,
  Users,
  Compass,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { CROSS_ANALYSIS_DATA, CrossAnalysisRow } from "@/lib/discoveryData";
import { EpistemicBadge } from "./DiscoveryFunnel";

export const CrossAnalysisMatrix: React.FC = () => {
  const [selectedCategoryFilter, setSelectedCategoryFilter] =
    useState<string>("all");

  const categories = [
    "all",
    "Western Dresses & Tops",
    "Footwear & Boots",
    "Casual Tops & T-Shirts",
    "Kurtas & Ethnic Sets",
    "Festive & Wedding Wear",
    "Outerwear & Jackets",
    "Designer & Luxury Wear",
  ];

  const filteredData =
    selectedCategoryFilter === "all"
      ? CROSS_ANALYSIS_DATA
      : CROSS_ANALYSIS_DATA.filter((row) =>
          row.category.toLowerCase().includes(selectedCategoryFilter.toLowerCase())
        );

  return (
    <section className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-pink-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Layers className="w-4 h-4 text-pink-400" />
          <span>Multi-Dimensional Cross-Segmentation</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Cross-Segment & Cross-Category Friction Matrix
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Analyzing how purchase friction, dominant intent, and external information seeking vary across specific fashion categories and behavioral cohorts.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto py-2 custom-scrollbar">
        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-pink-400" /> Category:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap border ${
              selectedCategoryFilter === cat
                ? "bg-pink-500 text-white border-pink-500 shadow-md shadow-pink-500/20"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
            }`}
          >
            {cat === "all" ? "All Categories (7)" : cat}
          </button>
        ))}
      </div>

      {/* Cross-Analysis Table / Grid */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3 pr-4">Behavioral Segment</th>
                <th className="pb-3 px-4">Fashion Category</th>
                <th className="pb-3 px-4">Dominant Intent</th>
                <th className="pb-3 px-4">Primary Blocker / Uncertainty</th>
                <th className="pb-3 px-4">Off-Platform Leakage</th>
                <th className="pb-3 pl-4 text-right">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredData.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-950/60 transition-colors group"
                >
                  {/* Segment */}
                  <td className="py-4 pr-4 font-bold text-white whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                      <span>{row.segment}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-4 font-medium text-pink-300 whitespace-nowrap">
                    {row.category}
                  </td>

                  {/* Dominant Intent */}
                  <td className="py-4 px-4 text-slate-300">
                    <span className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 font-medium">
                      {row.dominantIntent}
                    </span>
                  </td>

                  {/* Blocker */}
                  <td className="py-4 px-4 text-slate-200 leading-relaxed max-w-xs">
                    {row.primaryBlocker}
                  </td>

                  {/* Info Leakage */}
                  <td className="py-4 px-4 text-indigo-300 text-[11px] font-medium whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <ExternalLink className="w-3 h-3 text-indigo-400 shrink-0" />
                      <span>{row.informationLeakageChannel}</span>
                    </div>
                  </td>

                  {/* Confidence Score */}
                  <td className="py-4 pl-4 text-right font-mono font-bold text-emerald-400">
                    {row.evidenceConfidence}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
