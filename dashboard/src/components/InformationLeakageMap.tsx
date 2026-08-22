"use client";

import React from "react";
import {
  ExternalLink,
  MessageSquare,
  Video,
  Share2,
  HelpCircle,
  Sliders,
  Scale,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import {
  INFORMATION_LEAKAGE_MAP,
  COMPARISON_FACTORS,
} from "@/lib/discoveryData";
import { EpistemicBadge } from "./DiscoveryFunnel";

export const InformationLeakageMap: React.FC = () => {
  return (
    <section className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
          <ExternalLink className="w-4 h-4 text-indigo-400" />
          <span>External Research & Off-Platform Behavior</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Information Leakage Map & Comparison Intelligence
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Where users abandon the Myntra checkout funnel to hunt for information elsewhere, and the exact dimensional weights they use to make final purchase decisions.
        </p>
      </div>

      {/* Part 1: Information Leakage Map */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-0.5">
              Funnel Abandonment Channels
            </span>
            <h3 className="text-xl font-bold text-white">
              Where Do Users Go Outside Myntra?
            </h3>
          </div>
          <EpistemicBadge status="OBSERVED" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {INFORMATION_LEAKAGE_MAP.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-950/80 border border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400">
                      {item.channel.includes("WhatsApp") ? (
                        <Share2 className="w-4 h-4" />
                      ) : item.channel.includes("YouTube") ? (
                        <Video className="w-4 h-4" />
                      ) : item.channel.includes("Reddit") ? (
                        <HelpCircle className="w-4 h-4" />
                      ) : (
                        <ExternalLink className="w-4 h-4" />
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-white">
                      {item.channel}
                    </h4>
                  </div>
                  <span className="text-xs font-bold font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                    {item.sharePct}% leakage share
                  </span>
                </div>

                {/* Information Sought */}
                <div className="space-y-2 mb-4">
                  <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 text-xs">
                    <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block mb-1">
                      Information Sought:
                    </span>
                    <p className="text-slate-200 leading-relaxed font-medium">
                      {item.informationSought}
                    </p>
                  </div>

                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 text-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Current Workaround:
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {item.workaroundBehavior}
                    </p>
                  </div>
                </div>

                {/* Verbatim Quote */}
                <div className="text-[11px] text-slate-400 italic bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 mb-3">
                  "{item.sampleQuote}"
                </div>
              </div>

              {/* Myntra Opportunity */}
              <div className="pt-3 border-t border-slate-800/80 text-xs">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-0.5">
                  Myntra UX Gap:
                </span>
                <span className="text-slate-300 font-medium">
                  {item.myntraDeficiency}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Product Comparison Factor Weights */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div>
            <div className="flex items-center space-x-2 text-pink-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Scale className="w-4 h-4" />
              <span>Multi-Factor Decision Matrix</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              How Users Compare & Make the Final Decision
            </h3>
          </div>
          <EpistemicBadge status="OBSERVED" />
        </div>

        <div className="space-y-4">
          {COMPARISON_FACTORS.map((factor) => (
            <div
              key={factor.rank}
              className="rounded-2xl bg-slate-950/80 border border-slate-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-3.5 sm:w-2/3">
                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-mono font-bold text-xs text-pink-400 shrink-0">
                  #{factor.rank}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">
                    {factor.factor}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {factor.description}
                  </p>
                </div>
              </div>

              <div className="sm:w-1/3 flex items-center justify-between sm:justify-end space-x-4 pl-11 sm:pl-0">
                <div className="text-right">
                  <span className="text-base font-bold font-mono text-pink-400">
                    {factor.weightPct}%
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    Decision Weight
                  </span>
                </div>
                <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full"
                    style={{ width: `${factor.weightPct * 2.8}%` }}
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
