"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  HelpCircle,
  Eye,
  Ruler,
  Sparkles,
  Layers,
  Users,
  ShieldAlert,
  Flame,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { EpistemicBadge } from "./DiscoveryFunnel";

interface BlockerItem {
  id: string;
  category: string;
  sharePct: number;
  urgency: "HIGH" | "MEDIUM" | "CRITICAL";
  problemStatement: string;
  rootUncertainty: string;
  whatCustomerDoesntKnow: string[];
  affectedCategories: string[];
  sampleQuote: string;
}

const BLOCKER_TAXONOMY: BlockerItem[] = [
  {
    id: "fit_anxiety",
    category: "Size & Fit Ambiguity",
    sharePct: 34.8,
    urgency: "CRITICAL",
    problemStatement: "Inconsistent sizing across 3rd-party brands and absence of body-measurement calibrated reviews.",
    rootUncertainty: "Fit & Silhouette Uncertainty",
    whatCustomerDoesntKnow: [
      "Will this brand's M be too tight on the bust or shoulders?",
      "Does the fabric shrink after the first cold wash?",
      "Is the waist measurement high-rise or mid-rise on a 5'4\" frame?",
    ],
    affectedCategories: ["Western Dresses", "Jeans & Trousers", "Footwear"],
    sampleQuote: "I saved 3 dresses in my wishlist because I am unsure if size M will be too tight in the bust. Size chart is inconsistent for Western tops.",
  },
  {
    id: "fabric_doubt",
    category: "Fabric Drape & Studio Photo Ambiguity",
    sharePct: 24.9,
    urgency: "HIGH",
    problemStatement: "Studio lighting and mannequin pinning mask real fabric weight, transparency, and wrinkling.",
    rootUncertainty: "Material & Quality Uncertainty",
    whatCustomerDoesntKnow: [
      "Is the white cotton kurta see-through in natural daylight?",
      "How heavy is the fabric GSM (breathable summer vs heavy partywear)?",
      "Does the fabric drape softly or look stiff and boxy in motion?",
    ],
    affectedCategories: ["Kurtas & Sarees", "Linen Shirts", "Partywear"],
    sampleQuote: "Saved this kurta set but the studio photos look edited. I can't tell if the material is see-through or thick cotton, so I haven't ordered yet.",
  },
  {
    id: "decision_paralysis",
    category: "Wishlist Clutter & Decision Paralysis",
    sharePct: 21.6,
    urgency: "HIGH",
    problemStatement: "Accumulation of 50+ unorganized saved items creates cognitive overload and abandonment.",
    rootUncertainty: "Choice Paralysis & Ensemble Uncertainty",
    whatCustomerDoesntKnow: [
      "Which of these 6 shortlisted black tops has the best value/quality ratio?",
      "How do these separate saved items look together as a complete look?",
      "Which items are active shortlists vs stale bookmarks from 6 months ago?",
    ],
    affectedCategories: ["Tops & T-Shirts", "Accessories", "Casual Wear"],
    sampleQuote: "My wishlist has over 80 items saved. Whenever I open it to buy, I get overwhelmed trying to decide which top looks best.",
  },
  {
    id: "social_validation",
    category: "External Validation & Second-Opinion Lag",
    sharePct: 15.8,
    urgency: "CRITICAL",
    problemStatement: "Shoppers delay checkout for 48–72 hours while waiting for feedback from friends or family.",
    rootUncertainty: "Social & Styling Suitability Uncertainty",
    whatCustomerDoesntKnow: [
      "Does this color suit my skin tone in the eyes of my peers?",
      "Is this dress appropriate for my cousin's cocktail reception?",
      "What do my friends think between Option A vs Option B?",
    ],
    affectedCategories: ["Festive Wear", "Cocktail Dresses", "Outerwear"],
    sampleQuote: "Shared screenshot with my friend on WhatsApp to ask if it looks good before buying. Waiting for her reply.",
  },
  {
    id: "stock_depletion",
    category: "Silent Size Depletion in Wishlist",
    sharePct: 2.9,
    urgency: "HIGH",
    problemStatement: "Saved sizes quietly go out of stock during the hesitation period without proactive alternatives.",
    rootUncertainty: "Availability & Alternative Uncertainty",
    whatCustomerDoesntKnow: [
      "When will size L be restocked by this specific brand?",
      "Is there a 95% visually identical alternative available right now in my size?",
    ],
    affectedCategories: ["Trending Drops", "Sneakers", "Ethnic Sets"],
    sampleQuote: "Kept this top in my wishlist for a week, and when I finally went to buy it today, my size was sold out without any alert.",
  },
];

export const FrictionTaxonomy: React.FC = () => {
  const [selectedBlocker, setSelectedBlocker] = useState<BlockerItem>(
    BLOCKER_TAXONOMY[0]
  );

  return (
    <section className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <span>Root-Cause Friction & Uncertainty Engine</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          WHY Don't They Buy? — Purchase Blockers & Uncertainty Analysis
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Distinguishing between the surface-level symptom (*"I'll buy later"*) and the underlying psychological uncertainty (*"I don't know if this fabric will be see-through"*).
        </p>
      </div>

      {/* Grid of Blockers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {BLOCKER_TAXONOMY.map((b) => {
          const isSelected = selectedBlocker.id === b.id;

          return (
            <div
              key={b.id}
              onClick={() => setSelectedBlocker(b)}
              className={`rounded-2xl p-5 cursor-pointer transition-all border flex flex-col justify-between ${
                isSelected
                  ? "bg-slate-900 border-rose-500 shadow-xl shadow-rose-500/10 ring-1 ring-rose-500/60"
                  : "bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-white font-mono">
                    {b.sharePct}% share
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      b.urgency === "CRITICAL"
                        ? "text-rose-400 bg-rose-500/10 border-rose-500/20"
                        : "text-amber-400 bg-amber-500/10 border-amber-500/20"
                    }`}
                  >
                    {b.urgency} Urgency
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1.5 flex items-center justify-between">
                  <span>{b.category}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                  )}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {b.problemStatement}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-pink-300 font-medium">
                Root: {b.rootUncertainty}
              </div>
            </div>
          );
        })}
      </div>

      {/* Uncertainty Deep-Dive: "What does the user still not know?" */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Cognitive Uncertainty Anatomy
              </span>
              <EpistemicBadge status="OBSERVED" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">
              {selectedBlocker.category} — What Does the User Still NOT Know?
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Underlying psychological hesitation behind the wishlist stall.
            </p>
          </div>

          <div className="bg-slate-950 px-4 py-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Affected Segments
            </span>
            <span className="text-xs font-bold text-pink-300">
              {selectedBlocker.affectedCategories.join(" • ")}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Missing Information Points */}
          <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" />
              <span>Unresolved Pre-Purchase Questions</span>
            </h4>
            <div className="space-y-3">
              {selectedBlocker.whatCustomerDoesntKnow.map((q, qidx) => (
                <div
                  key={qidx}
                  className="bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 flex items-start space-x-2 text-xs text-slate-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5"></span>
                  <span className="leading-relaxed font-medium">"{q}"</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verbatim Supporting Evidence */}
          <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-pink-400 mb-3 flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                <span>Verbatim Customer Voice & Behavioral Impact</span>
              </h4>
              <p className="text-xs text-slate-300 italic bg-slate-900/90 p-4 rounded-xl border border-slate-800 leading-relaxed mb-4">
                "{selectedBlocker.sampleQuote}"
              </p>
            </div>

            <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-xs">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-0.5">
                Non-Monetary Resolution Path:
              </span>
              <span className="text-emerald-200 font-medium">
                Provide structured, self-service information on the wishlist card (daylight videos, body-metric reviews, or peer polling).
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
