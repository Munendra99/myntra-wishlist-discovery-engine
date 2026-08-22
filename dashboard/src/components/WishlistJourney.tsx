"use client";

import React, { useState } from "react";
import {
  Compass,
  ArrowRight,
  AlertOctagon,
  CheckCircle2,
  Code2,
  HelpCircle,
  TrendingDown,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  WISHLIST_JOURNEY_STAGES,
  WISHLIST_INTENT_SPECTRUM,
  FIRST_PARTY_EVENT_SCHEMA,
  JourneyStep,
} from "@/lib/discoveryData";
import { EpistemicBadge } from "./DiscoveryFunnel";

export const WishlistJourney: React.FC = () => {
  const [showSchema, setShowSchema] = useState(false);
  const [selectedStep, setSelectedStep] = useState<JourneyStep>(
    WISHLIST_JOURNEY_STAGES[3]
  );

  return (
    <section className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Compass className="w-4 h-4 text-sky-400" />
          <span>Post-Wishlist Behavioral Dynamics</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          The 9-Stage Wishlist Journey & Intent Spectrum
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Tracing how shoppers move from initial discovery to cart completion, pinpointing the exact cognitive friction triggers where conversion momentum is lost.
        </p>
      </div>

      {/* Part 1: Visual 9-Stage Journey Map */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Customer Journey & Drop-Off Architecture</span>
            <EpistemicBadge status="OBSERVED" />
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            Click any step to inspect cognitive friction & drop-off branch
          </span>
        </div>

        {/* Journey Timeline Horizontal Scroller */}
        <div className="overflow-x-auto pb-4 custom-scrollbar mb-6">
          <div className="flex items-center space-x-3 min-w-[900px]">
            {WISHLIST_JOURNEY_STAGES.map((step, idx) => {
              const isSelected = selectedStep.stepNumber === step.stepNumber;

              return (
                <React.Fragment key={step.stepNumber}>
                  <button
                    onClick={() => setSelectedStep(step)}
                    className={`rounded-2xl p-4 text-left transition-all border shrink-0 w-52 flex flex-col justify-between h-36 ${
                      isSelected
                        ? "bg-gradient-to-b from-pink-500/20 to-slate-900 border-pink-500 shadow-lg shadow-pink-500/10 ring-1 ring-pink-500"
                        : "bg-slate-950/80 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-400">
                          Step 0{step.stepNumber}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">
                        {step.name}
                      </h4>
                      <span className="text-[10px] text-pink-300 font-medium block mt-0.5">
                        {step.stageCategory}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
                      {step.userAction}
                    </p>
                  </button>

                  {idx < WISHLIST_JOURNEY_STAGES.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Selected Step Inspector Box */}
        <div className="rounded-2xl bg-slate-950 p-6 border border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Step 0{selectedStep.stepNumber} Focus
              </span>
              <EpistemicBadge status={selectedStep.epistemicStatus} />
            </div>
            <h4 className="text-xl font-extrabold text-white mb-2">
              {selectedStep.name}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedStep.userAction}
            </p>
          </div>

          <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
              <AlertOctagon className="w-3.5 h-3.5" /> Cognitive Friction
            </span>
            <p className="text-xs text-slate-200 leading-relaxed">
              "{selectedStep.cognitiveFriction}"
            </p>
          </div>

          <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5" /> Drop-Off / Alternative Branch
              </span>
              <p className="text-xs text-rose-200 leading-relaxed font-medium">
                {selectedStep.alternativeBranch}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Buyer vs. Bookmarker Intent Spectrum */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div>
            <div className="flex items-center space-x-2 text-pink-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>Purchase-Intent Distinction Engine</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Buyer vs. Bookmarker: The Wishlist Intent Spectrum
            </h3>
          </div>
          <EpistemicBadge status="OBSERVED" />
        </div>

        <div className="space-y-4">
          {WISHLIST_INTENT_SPECTRUM.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-950/80 border border-slate-800 p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div className="lg:w-1/4">
                <div className="flex items-center space-x-2 mb-1">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      item.stageType === "High Intent"
                        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                        : item.stageType === "Medium Intent"
                        ? "text-sky-400 bg-sky-500/10 border-sky-500/20"
                        : "text-slate-400 bg-slate-800 border-slate-700"
                    }`}
                  >
                    {item.stageType}
                  </span>
                  <span className="text-xs text-pink-400 font-mono font-bold">
                    {item.sharePct}% share
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">{item.intent}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                  {item.definition}
                </p>
              </div>

              <div className="lg:w-2/5 space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Identifiable Behavioral Signals:
                </span>
                {item.behavioralSignals.map((sig, sidx) => (
                  <div
                    key={sidx}
                    className="flex items-center space-x-1.5 text-xs text-slate-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{sig}</span>
                  </div>
                ))}
              </div>

              <div className="lg:w-1/3 bg-pink-500/5 p-3 rounded-xl border border-pink-500/20">
                <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider block mb-1">
                  Conversion Transition Trigger:
                </span>
                <p className="text-xs text-pink-200 leading-relaxed font-medium">
                  {item.transitionTrigger}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 3: Wishlist Depth & First-Party Event Schema (Data Honesty Box) */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Wishlist Depth Metric Integrity
              </span>
              <EpistemicBadge status="UNKNOWN" />
            </div>
            <h4 className="text-base font-bold text-white">
              Why Exact Wishlist Size per User Cannot Be Claimed from Public Data
            </h4>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Public reviews provide qualitative signals (*"I have 80 items saved"*), but precise median wishlist size and P90 distributions require internal clickstream event logs.
            </p>
          </div>

          <button
            onClick={() => setShowSchema(!showSchema)}
            className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-semibold text-pink-400 border border-slate-800 transition-all flex items-center space-x-2 shrink-0 self-start sm:self-auto"
          >
            <Code2 className="w-4 h-4" />
            <span>{showSchema ? "Hide Event Schema" : "View Recommended Event Schema"}</span>
          </button>
        </div>

        {showSchema && (
          <div className="mt-4 pt-4 border-t border-slate-800 animate-fadeIn">
            <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-2 font-mono">
              Recommended First-Party Clickstream Tracking Schema:
            </span>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-pink-300 overflow-x-auto custom-scrollbar">
              {FIRST_PARTY_EVENT_SCHEMA.trim()}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
};
