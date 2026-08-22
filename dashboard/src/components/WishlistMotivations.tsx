"use client";

import React, { useState } from "react";
import {
  Heart,
  TrendingUp,
  Quote,
  Share2,
  Bookmark,
  Layers,
  Sparkles,
  Tag,
  Compass,
} from "lucide-react";
import {
  WISHLIST_MOTIVATIONS,
  WishlistMotivation,
} from "@/lib/discoveryData";
import { EpistemicBadge } from "./DiscoveryFunnel";

export const WishlistMotivations: React.FC = () => {
  const [selectedMotivation, setSelectedMotivation] =
    useState<WishlistMotivation>(WISHLIST_MOTIVATIONS[0]);

  return (
    <section className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-pink-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Heart className="w-4 h-4 text-pink-400" />
          <span>Underlying User Psychology</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          WHY Do Users Wishlist? — 7 Core Motivations
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Classifying the primary psychological driver behind the initial tap of the heart icon—distinguishing active purchase shortlists from passive inspiration.
        </p>
      </div>

      {/* Motivations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {WISHLIST_MOTIVATIONS.map((m) => {
          const isSelected = selectedMotivation.id === m.id;

          return (
            <div
              key={m.id}
              onClick={() => setSelectedMotivation(m)}
              className={`rounded-2xl p-5 cursor-pointer transition-all border flex flex-col justify-between ${
                isSelected
                  ? "bg-slate-900 border-pink-500 shadow-xl shadow-pink-500/10 ring-1 ring-pink-500/50"
                  : "bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-extrabold text-white font-mono">
                    {m.sharePct}%
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <EpistemicBadge status={m.epistemicStatus} />
                    <span className="text-[10px] font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-400">
                      {m.signalCount} signals
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white mb-1.5 flex items-center justify-between">
                  <span>{m.motivation}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
                  )}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {m.description}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full"
                  style={{ width: `${m.sharePct * 2.5}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Motivation Deep Dive & Verbatim Voice */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-400">
                Motivation Profile
              </span>
              <EpistemicBadge status={selectedMotivation.epistemicStatus} />
            </div>
            <h3 className="text-2xl font-extrabold text-white">
              {selectedMotivation.motivation} ({selectedMotivation.sharePct}% Share)
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              {selectedMotivation.description}
            </p>
          </div>

          <div className="bg-slate-950 px-4 py-3 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">
              Multi-Source Signal Distribution
            </span>
            <div className="flex items-center space-x-3 mt-1">
              <span className="text-emerald-400">Play: {selectedMotivation.sources.playstore}</span>
              <span>•</span>
              <span className="text-sky-400">App Store: {selectedMotivation.sources.appstore}</span>
              <span>•</span>
              <span className="text-orange-400">Reddit: {selectedMotivation.sources.reddit}</span>
            </div>
          </div>
        </div>

        {/* Verbatim Supporting Evidence */}
        <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-pink-400 mb-2 flex items-center gap-1.5">
            <Quote className="w-4 h-4" />
            <span>Representative Customer Statement</span>
          </h4>
          <p className="text-sm text-slate-200 italic font-medium leading-relaxed">
            "{selectedMotivation.sampleQuote}"
          </p>
        </div>
      </div>
    </section>
  );
};
