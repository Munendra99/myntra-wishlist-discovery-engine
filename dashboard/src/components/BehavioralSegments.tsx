"use client";

import React, { useState } from "react";
import {
  Users,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Flame,
  Quote,
  Compass,
} from "lucide-react";
import { BEHAVIORAL_SEGMENTS, BehavioralSegment } from "@/lib/discoveryData";
import { EpistemicBadge } from "./DiscoveryFunnel";

export const BehavioralSegments: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<BehavioralSegment>(
    BEHAVIORAL_SEGMENTS[0]
  );

  return (
    <section className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-pink-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Users className="w-4 h-4 text-pink-400" />
          <span>Behavioral Segmentation Engine (Zero Demographic Assumptions)</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          WHO Uses the Wishlist? — 6 Behavioral Personas
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Clustered directly from observable user behaviors (revisit patterns, shortlist volume, sizing queries, and external validation sharing).
        </p>
      </div>

      {/* Grid of 6 Segment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {BEHAVIORAL_SEGMENTS.map((seg) => {
          const isSelected = selectedSegment.id === seg.id;

          return (
            <div
              key={seg.id}
              onClick={() => setSelectedSegment(seg)}
              className={`rounded-2xl p-5 cursor-pointer transition-all border flex flex-col justify-between ${
                isSelected
                  ? "bg-slate-900 border-pink-500/80 shadow-xl shadow-pink-500/10 ring-1 ring-pink-500/50"
                  : "bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl font-extrabold text-white font-mono">
                    {seg.sharePct}%
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <EpistemicBadge status={seg.epistemicStatus} />
                    <span className="text-[10px] font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-400">
                      {seg.signalCount} signals
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-1 tracking-tight flex items-center justify-between">
                  <span>{seg.name}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
                  )}
                </h3>
                <p className="text-xs text-pink-300 font-medium mb-3">
                  "{seg.tagline}"
                </p>

                {/* Behavioral Signals */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Observed Behavioral Signals:
                  </span>
                  {seg.behavioralSignals.slice(0, 3).map((sig, sidx) => (
                    <div
                      key={sidx}
                      className="flex items-start space-x-1.5 text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed line-clamp-2">{sig}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer / Blocker */}
              <div className="pt-3 border-t border-slate-800/80 mt-2">
                <div className="text-[11px] text-slate-400 flex items-start space-x-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-tight">
                    <strong className="text-slate-200">Blocker:</strong>{" "}
                    {seg.primaryBlocker}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Segment Deep Dive */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-400">
                Deep Dive Profile
              </span>
              <EpistemicBadge status={selectedSegment.epistemicStatus} />
            </div>
            <h3 className="text-2xl font-extrabold text-white">
              {selectedSegment.name} ({selectedSegment.sharePct}% of Wishlist Cohort)
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              {selectedSegment.tagline}
            </p>
          </div>

          <div className="bg-slate-950 px-4 py-3 rounded-2xl border border-slate-800 text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Confidence Score
            </span>
            <span className="text-xl font-bold font-mono text-emerald-400">
              {selectedSegment.confidenceScore}% Validated
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 1. All Behavioral Signals */}
          <div className="bg-slate-950/70 rounded-2xl p-5 border border-slate-800/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Observable Digital Footprint</span>
            </h4>
            <div className="space-y-2.5">
              {selectedSegment.behavioralSignals.map((sig, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0 mt-1.5"></span>
                  <span className="leading-relaxed">{sig}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Intent Distribution */}
          <div className="bg-slate-950/70 rounded-2xl p-5 border border-slate-800/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-sky-400" />
              <span>Intent Breakdown</span>
            </h4>
            <div className="space-y-3">
              {Object.entries(selectedSegment.intentProfile).map(([intent, share]) => (
                <div key={intent}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">{intent}</span>
                    <span className="text-sky-400 font-mono font-bold">{share}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                      style={{ width: `${share}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Verbatim Customer Voice & Solution */}
          <div className="bg-slate-950/70 rounded-2xl p-5 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                <Quote className="w-4 h-4 text-pink-400" />
                <span>Verbatim Customer Signal</span>
              </h4>
              <p className="text-xs text-slate-300 italic bg-slate-900/90 p-3 rounded-xl border border-slate-800 leading-relaxed mb-4">
                "{selectedSegment.sampleQuote}"
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Recommended Opportunity Direction:
              </span>
              <span className="text-xs font-bold text-pink-400 bg-pink-500/10 px-3 py-1.5 rounded-xl border border-pink-500/20 block">
                ✨ {selectedSegment.opportunityDirection}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
