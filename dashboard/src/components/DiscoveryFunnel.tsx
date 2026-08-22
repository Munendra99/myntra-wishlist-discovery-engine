"use client";

import React from "react";
import {
  Filter,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Database,
  Sparkles,
  ArrowDown,
  Target,
  Compass,
  Layers,
  ShieldCheck,
  Search,
} from "lucide-react";
import { DISCOVERY_FUNNEL, EpistemicStatus } from "@/lib/discoveryData";

export const EpistemicBadge: React.FC<{ status: EpistemicStatus }> = ({
  status,
}) => {
  switch (status) {
    case "OBSERVED":
      return (
        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>OBSERVED</span>
        </span>
      );
    case "INFERRED":
      return (
        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
          <span>INFERRED</span>
        </span>
      );
    case "HYPOTHESIS":
      return (
        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>HYPOTHESIS</span>
        </span>
      );
    case "UNKNOWN":
      return (
        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-700/50 text-slate-300 border border-slate-600/40">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
          <span>UNKNOWN</span>
        </span>
      );
  }
};

export const DiscoveryFunnel: React.FC = () => {
  return (
    <section className="space-y-8 animate-fadeIn">
      {/* 1. Executive Discovery Synthesis Box */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
            <div className="flex items-center space-x-2 text-pink-400 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-4 h-4 text-pink-400" />
              <span>Customer Discovery Intelligence</span>
            </div>
            <div className="flex items-center space-x-2">
              <EpistemicBadge status="INFERRED" />
              <span className="text-[11px] text-slate-400 font-mono">
                Grounded on 2,435 Multi-Source Public Signals
              </span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-6">
            Why Fashion Shoppers Stall on the Myntra Wishlist
          </h2>

          {/* Core Discovery Snapshot Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Dominant Behavioral Persona
              </span>
              <div className="text-sm font-bold text-white mb-1 flex items-center justify-between">
                <span>Power Shortlisters</span>
                <span className="text-xs text-pink-400 font-mono">32.1%</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Hoard 50+ unorganized saved items; stall under choice overload.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                #1 Purchase Blocker
              </span>
              <div className="text-sm font-bold text-white mb-1 flex items-center justify-between">
                <span>Decision Paralysis & Fit</span>
                <span className="text-xs text-amber-400 font-mono">47.1%</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Fear of ill-fitting cuts + struggle to compare 6 similar saved tops.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* 2. Epistemic Data Honesty Guide */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Analytical Data Honesty & Epistemic Framework</span>
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every metric in this intelligence engine is rigorously labeled according to evidence strength. No synthetic or unverified conversion lift numbers are claimed.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <div className="flex items-center space-x-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            <EpistemicBadge status="OBSERVED" />
            <span className="text-[11px] text-slate-400">Explicit in raw user text</span>
          </div>
          <div className="flex items-center space-x-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            <EpistemicBadge status="INFERRED" />
            <span className="text-[11px] text-slate-400">Multi-signal synthesis</span>
          </div>
          <div className="flex items-center space-x-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            <EpistemicBadge status="HYPOTHESIS" />
            <span className="text-[11px] text-slate-400">Product solution to test</span>
          </div>
          <div className="flex items-center space-x-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            <EpistemicBadge status="UNKNOWN" />
            <span className="text-[11px] text-slate-400">Requires 1st-party event data</span>
          </div>
        </div>
      </div>

      {/* 3. The End-to-End Discovery Funnel */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Filter className="w-4 h-4" />
              <span>Data Quality & Signal Filtration Hierarchy</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Customer Discovery Evidence Funnel
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          {DISCOVERY_FUNNEL.map((step, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-4 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start sm:items-center space-x-3.5">
                <div className="w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center font-mono font-bold text-xs text-pink-400 shrink-0 mt-0.5 sm:mt-0">
                  0{idx + 1}
                </div>
                <div>
                  <div className="flex items-center space-x-2 flex-wrap gap-1 mb-0.5">
                    <h4 className="text-sm font-bold text-white">{step.stage}</h4>
                    <EpistemicBadge status={step.epistemicStatus} />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 shrink-0 sm:text-right pl-11 sm:pl-0">
                <div>
                  <div className="text-base font-extrabold text-white font-mono">
                    {step.count.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {step.pctOfTotal}% of pipeline
                  </div>
                </div>
                <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden hidden sm:block">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full"
                    style={{ width: `${step.pctOfTotal}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
