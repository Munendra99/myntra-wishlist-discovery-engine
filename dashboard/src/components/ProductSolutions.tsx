"use client";

import React from "react";
import {
  Sparkles,
  Layers,
  Video,
  Users,
  Shuffle,
  FolderKanban,
  Ruler,
  CheckCircle2,
  Lock,
} from "lucide-react";

export const ProductSolutions: React.FC = () => {
  const roadmaps = [
    {
      title: "Interactive Wishlist Outfit Builder & Look Stacker",
      targetFriction: "Passive Moodboarding & Clutter (46.9% Stalls)",
      impact: "High Purchase Velocity (Zero-Discount)",
      color: "from-pink-500/20 to-rose-500/10 border-pink-500/30",
      badgeColor: "text-pink-400 bg-pink-500/10 border-pink-500/20",
      icon: <Layers className="w-5 h-5 text-pink-400" />,
      features: [
        "AI groups disparate saved items (e.g. kurti + jhumkas + heels) into complete occasion-ready outfits.",
        "Interactive 'Style Canvas' allowing users to drag and match saved garments together.",
        "1-Click 'Move Entire Look to Bag' eliminating single-item decision paralysis.",
      ],
      expectedOutcome: "+31% higher cart-completion rate by transforming passive moodboards into complete outfits.",
    },
    {
      title: "Collaborative 'Ask a Friend' Social Wishlist Polling",
      targetFriction: "External Validation & Second-Opinion Gap (15.9% Stalls)",
      impact: "Social Decision Acceleration",
      color: "from-indigo-500/20 to-purple-500/10 border-indigo-500/30",
      badgeColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      icon: <Users className="w-5 h-5 text-indigo-400" />,
      features: [
        "Generates a frictionless 1-click private polling link for WhatsApp / Instagram / iMessage.",
        "Friends can vote ('Love it / Skip it') and leave quick comments without downloading the app.",
        "Live vote tally displayed directly on the user's wishlist card to trigger instant purchase confidence.",
      ],
      expectedOutcome: "Eliminates 72-hour checkout stall caused by manual screenshot sharing.",
    },
    {
      title: "Intelligent In-Stock Alternative Auto-Swapper",
      targetFriction: "Silent Size Depletion in Wishlist",
      impact: "Zero Lost Demand",
      color: "from-amber-500/20 to-orange-500/10 border-amber-500/30",
      badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      icon: <Shuffle className="w-5 h-5 text-amber-400" />,
      features: [
        "Detects when a saved size goes out of stock and dynamically suggests visually identical in-stock alternatives.",
        "Compares brand sizing, fabric blend, and color tone with a single-tap 'Swap & Buy' option.",
        "Automated back-in-stock priority reservation queue for high-intent wishlisters.",
      ],
      expectedOutcome: "Recovers 84% of abandonments caused by out-of-stock sizes.",
    },
    {
      title: "Real-Motion Fabric Drape & Customer Video Hauls",
      targetFriction: "Fabric & Studio Photo Ambiguity (24.9% Stalls)",
      impact: "Authentic Quality Assurance",
      color: "from-sky-500/20 to-cyan-500/10 border-sky-500/30",
      badgeColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
      icon: <Video className="w-5 h-5 text-sky-400" />,
      features: [
        "5-to-10 second unedited customer video clips showing fabric drape, flow, and transparency in natural daylight.",
        "Standardized Fabric Weight & Transparency Badges (e.g. 'Opaque Cotton 180 GSM', 'Sheer Chiffon').",
        "360-degree fabric stretch and wrinkle-recovery visual indicators.",
      ],
      expectedOutcome: "+26% checkout confidence on ethnic and occasion wear without discounting.",
    },
    {
      title: "Dynamic Fit & Measurement Benchmark Matrix",
      targetFriction: "Size & Fit Ambiguity (9.0% Stalls)",
      impact: "Confidence-First Sizing",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30",
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      icon: <Ruler className="w-5 h-5 text-emerald-400" />,
      features: [
        "Crowdsourced fit feedback matrix: 'Runs 0.5 size small on shoulders, true-to-size on waist'.",
        "Photo review filtering by user's exact height and body type.",
        "Cross-brand sizing normalization (e.g. 'Your usual H&M size M is identical to Vero Moda size L').",
      ],
      expectedOutcome: "-38% fit-related return anxiety, unlocking instant first-time brand purchases.",
    },
    {
      title: "Wishlist Smart Auto-Organizer & Occasion Clusters",
      targetFriction: "Wishlist Clutter & Decision Fatigue (46.9% Stalls)",
      impact: "Cognitive Load Reduction",
      color: "from-violet-500/20 to-fuchsia-500/10 border-violet-500/30",
      badgeColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
      icon: <FolderKanban className="w-5 h-5 text-violet-400" />,
      features: [
        "Auto-sorts 50+ saved items into smart thematic boards: 'Workwear Staples', 'Wedding Season', 'Vacation Fits'.",
        "Smart 'Stale Item Archiver' separating active shortlist items from passive bookmarks.",
        "Side-by-side comparison matrix for shortlisted items in the same sub-category.",
      ],
      expectedOutcome: "Reduces wishlist dwell time from 14 days down to 48 hours.",
    },
  ];

  return (
    <section className="mb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
        <div>
          <div className="flex items-center space-x-2 text-pink-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>Zero-Discount Product Interventions</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Myntra Product & UX Roadmap Solutions
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Non-monetary behavioral, visual, and social product interventions designed to convert saved wishlist items into checkouts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {roadmaps.map((r, index) => (
          <div
            key={index}
            className={`rounded-2xl bg-gradient-to-br ${r.color} bg-slate-900/90 border p-5 flex flex-col justify-between shadow-xl backdrop-blur-sm group hover:border-slate-600 transition-all`}
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 shadow-inner">
                  {r.icon}
                </div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${r.badgeColor}`}
                >
                  {r.impact}
                </span>
              </div>

              <h3 className="font-bold text-white text-base tracking-tight mb-1">
                {r.title}
              </h3>
              <p className="text-xs text-slate-400 font-medium mb-3">
                Target: {r.targetFriction}
              </p>

              {/* Feature Points */}
              <div className="space-y-2 my-3">
                {r.features.map((feat, fidx) => (
                  <div key={fidx} className="flex items-start space-x-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expected Outcome */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block mb-0.5">
                Target Metric Impact:
              </span>
              <span className="text-emerald-300 font-bold font-mono text-[11px] leading-tight block">
                {r.expectedOutcome}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
