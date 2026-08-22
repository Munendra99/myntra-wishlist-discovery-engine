"use client";

import React, { useState } from "react";
import {
  Target,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Layers,
  Scale,
  Compass,
} from "lucide-react";
import {
  OPPORTUNITY_MATRIX,
  UNMET_NEED_CARDS,
  OpportunityScoreItem,
} from "@/lib/discoveryData";
import { EpistemicBadge } from "./DiscoveryFunnel";

export const OpportunityPrioritization: React.FC = () => {
  const [selectedOpp, setSelectedOpp] = useState<OpportunityScoreItem>(
    OPPORTUNITY_MATRIX[0]
  );

  return (
    <section className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Target className="w-4 h-4 text-emerald-400" />
          <span>Product Opportunity Prioritization & Unmet Needs</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Opportunity Prioritization Matrix & Unmet Need Generator
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Transparent multi-factor ranking based on observable friction frequency, severity, high-intent relevance, evidence confidence, and strategic fit without monetary incentives.
        </p>
      </div>

      {/* Part 1: Transparent Opportunity Scoring Matrix */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">
              Prioritization Formula
            </span>
            <h3 className="text-xl font-bold text-white">
              Multi-Factor Opportunity Scoring (0–100 Normalized)
            </h3>
          </div>
          <div className="bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
            <span className="text-pink-400">Score</span> = (Freq × Sev × Intent × Conf × Fit) / 100
          </div>
        </div>

        {/* Table / List of Opportunities */}
        <div className="space-y-4 mb-6">
          {OPPORTUNITY_MATRIX.map((opp, idx) => {
            const isSelected = selectedOpp.id === opp.id;

            return (
              <div
                key={opp.id}
                onClick={() => setSelectedOpp(opp)}
                className={`rounded-2xl p-5 cursor-pointer transition-all border flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                  isSelected
                    ? "bg-slate-950 border-emerald-500 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/50"
                    : "bg-slate-950/70 border-slate-800/80 hover:border-slate-700"
                }`}
              >
                <div className="lg:w-1/3">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-mono font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      Rank 0{idx + 1}
                    </span>
                    <EpistemicBadge status={opp.epistemicStatus} />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-0.5">
                    {opp.opportunityName}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Target: {opp.targetFriction}
                  </p>
                </div>

                {/* Sub-scores */}
                <div className="grid grid-cols-5 gap-2 text-center text-xs lg:w-1/3">
                  <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800/60">
                    <span className="text-[10px] text-slate-400 block">Freq</span>
                    <span className="font-mono font-bold text-slate-200">{opp.frequencyScore}</span>
                  </div>
                  <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800/60">
                    <span className="text-[10px] text-slate-400 block">Sev</span>
                    <span className="font-mono font-bold text-slate-200">{opp.severityScore}</span>
                  </div>
                  <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800/60">
                    <span className="text-[10px] text-slate-400 block">Intent</span>
                    <span className="font-mono font-bold text-slate-200">{opp.intentRelevanceScore}</span>
                  </div>
                  <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800/60">
                    <span className="text-[10px] text-slate-400 block">Conf</span>
                    <span className="font-mono font-bold text-slate-200">{opp.evidenceConfidenceScore}</span>
                  </div>
                  <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800/60">
                    <span className="text-[10px] text-slate-400 block">Fit</span>
                    <span className="font-mono font-bold text-slate-200">{opp.strategicFitScore}</span>
                  </div>
                </div>

                {/* Final Composite Score & Evidence count */}
                <div className="lg:w-1/4 flex items-center justify-between lg:justify-end space-x-4">
                  <div className="text-right">
                    <div className="text-xl font-extrabold font-mono text-emerald-400">
                      {opp.compositeScore}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {opp.supportingSignalCount} verified signals
                    </div>
                  </div>
                  <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                      style={{ width: `${opp.compositeScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Opportunity Unmet Need Card */}
        <div className="rounded-2xl bg-slate-950 p-6 border border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 via-slate-950 to-slate-950">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
              Core Unmet Need Statement (Grounded):
            </span>
            <span className="text-xs font-mono text-slate-400">
              Counter-evidence: {selectedOpp.counterEvidenceCount} signals (
              {Math.round(
                (selectedOpp.counterEvidenceCount /
                  (selectedOpp.supportingSignalCount +
                    selectedOpp.counterEvidenceCount)) *
                  100
              )}
              %)
            </span>
          </div>
          <p className="text-base sm:text-lg font-bold text-white italic leading-relaxed">
            "{selectedOpp.unmetNeedSummary}"
          </p>
        </div>
      </div>

      {/* Part 2: Unmet Need Generator Cards (From Behavior to Opportunity) */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div>
            <div className="flex items-center space-x-2 text-pink-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Problem-First Product Discovery Framework</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Unmet Need Synthesis Pipeline
            </h3>
          </div>
          <EpistemicBadge status="OBSERVED" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {UNMET_NEED_CARDS.map((need, idx) => (
            <div
              key={need.id}
              className="rounded-2xl bg-slate-950/80 border border-slate-800 p-6 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-pink-400 bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/20">
                    Discovery Path 0{idx + 1}
                  </span>
                  <EpistemicBadge status={need.epistemicStatus} />
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      1. Observed Behavior:
                    </span>
                    <p className="text-slate-200 mt-0.5 leading-relaxed font-medium">
                      {need.observedBehavior}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
                      2. User Friction:
                    </span>
                    <p className="text-slate-300 mt-0.5 leading-relaxed">
                      {need.userFriction}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                      3. Root Psychological Uncertainty:
                    </span>
                    <p className="text-slate-300 mt-0.5 leading-relaxed italic">
                      {need.rootUncertainty}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                      4. Current Customer Workaround:
                    </span>
                    <p className="text-slate-300 mt-0.5 leading-relaxed">
                      {need.existingWorkaround}
                    </p>
                  </div>
                </div>
              </div>

              {/* Unmet Need & Opportunity */}
              <div className="pt-4 border-t border-slate-800/80 space-y-2">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-0.5">
                    Synthesized Unmet Need:
                  </span>
                  <p className="text-xs text-emerald-200 font-bold leading-relaxed">
                    {need.unmetNeed}
                  </p>
                </div>

                <div className="bg-pink-500/10 p-3 rounded-xl border border-pink-500/20 text-xs">
                  <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider block mb-0.5">
                    Product Opportunity Direction:
                  </span>
                  <p className="text-xs text-pink-200 font-medium leading-relaxed">
                    ✨ {need.strategicOpportunity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
