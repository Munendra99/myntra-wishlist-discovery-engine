"use client";

import React, { useState } from "react";
import {
  Clock,
  Calendar,
  AlertTriangle,
  TrendingDown,
  Quote,
  CheckCircle2,
  Users,
  Compass,
} from "lucide-react";
import {
  PURCHASE_POSTPONEMENTS,
  PostponementReason,
} from "@/lib/discoveryData";
import { EpistemicBadge } from "./DiscoveryFunnel";

export const PurchasePostponement: React.FC = () => {
  const [selectedReason, setSelectedReason] = useState<PostponementReason>(
    PURCHASE_POSTPONEMENTS[0]
  );

  return (
    <section className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Postponement Language & Delay Behavior</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          WHY Do Users Postpone Purchase?
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Analyzing natural language delay signals (*"I will decide later"*, *"waiting for salary"*, *"asking my friend"*) to detect why cart momentum stalls.
        </p>
      </div>

      {/* Postponement Reasons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PURCHASE_POSTPONEMENTS.map((p) => {
          const isSelected = selectedReason.id === p.id;

          return (
            <div
              key={p.id}
              onClick={() => setSelectedReason(p)}
              className={`rounded-2xl p-5 cursor-pointer transition-all border flex flex-col justify-between ${
                isSelected
                  ? "bg-slate-900 border-amber-500 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/50"
                  : "bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-extrabold text-white font-mono">
                    {p.sharePct}%
                  </span>
                  <EpistemicBadge status={p.epistemicStatus} />
                </div>

                <h3 className="text-sm font-bold text-white mb-1.5 flex items-center justify-between">
                  <span>{p.reason}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                  )}
                </h3>
                <p className="text-xs text-amber-300/80 font-medium mb-3">
                  Trigger: {p.triggerCategory}
                </p>

                {/* Observable linguistic triggers */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.observableLanguage.map((lang, lidx) => (
                    <span
                      key={lidx}
                      className="text-[10px] font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-300"
                    >
                      "{lang}"
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                Primary Cohort: <strong className="text-slate-200">{p.affectedSegment}</strong>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Reason Deep Dive */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Postponement Mechanism
              </span>
              <EpistemicBadge status={selectedReason.epistemicStatus} />
            </div>
            <h3 className="text-2xl font-extrabold text-white">
              {selectedReason.reason} ({selectedReason.sharePct}% of Delays)
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Primary Affected Segment: {selectedReason.affectedSegment}
            </p>
          </div>

          <div className="bg-slate-950 px-4 py-3 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">
              Linguistic Detection Markers
            </span>
            <div className="text-pink-400 font-bold mt-0.5">
              {selectedReason.observableLanguage.join(" • ")}
            </div>
          </div>
        </div>

        {/* Verbatim Supporting Evidence */}
        <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-pink-400 mb-2 flex items-center gap-1.5">
            <Quote className="w-4 h-4" />
            <span>Verbatim Customer Postponement Statement</span>
          </h4>
          <p className="text-sm text-slate-200 italic font-medium leading-relaxed">
            "{selectedReason.sampleQuote}"
          </p>
        </div>
      </div>
    </section>
  );
};
