"use client";

import React, { useEffect, useState } from "react";
import { supabase, InsightTheme, RawFeedback } from "@/lib/supabase";
import { Navbar, DiscoveryTab } from "@/components/Navbar";
import { DiscoveryFunnel } from "@/components/DiscoveryFunnel";
import { MetricsCards } from "@/components/MetricsCards";
import { WishlistMotivations } from "@/components/WishlistMotivations";
import { BehavioralSegments } from "@/components/BehavioralSegments";
import { WishlistJourney } from "@/components/WishlistJourney";
import { PurchasePostponement } from "@/components/PurchasePostponement";
import { OpportunityPrioritization } from "@/components/OpportunityPrioritization";
import { EvidenceExplorer } from "@/components/EvidenceExplorer";
import { AiCopilot } from "@/components/AiCopilot";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DiscoveryTab>("overview");
  const [insights, setInsights] = useState<InsightTheme[]>([]);
  const [reviews, setReviews] = useState<RawFeedback[]>([]);
  const [totalCount, setTotalCount] = useState<number>(3026);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsRefreshing(true);

      // 1. Fetch insights
      const { data: insightsData } = await supabase
        .from("insights")
        .select("*")
        .order("mention_count", { ascending: false });

      if (insightsData && insightsData.length > 0) {
        setInsights(insightsData as InsightTheme[]);
      }

      // 2. Fetch raw reviews
      const { data: reviewsData, count } = await supabase
        .from("raw_feedback")
        .select("*", { count: "exact" })
        .order("scraped_at", { ascending: false })
        .limit(100);

      if (reviewsData) {
        setReviews(reviewsData as RawFeedback[]);
      }
      if (count) {
        setTotalCount(count);
      }
    } catch (err) {
      console.error("Error fetching data from Supabase:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-pink-500 selection:text-white font-sans antialiased">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onRefresh={fetchData}
        isRefreshing={isRefreshing}
        totalFeedbackCount={totalCount}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        {/* Module 1: Overview & AI Copilot */}
        {activeTab === "overview" && (
          <div className="space-y-10">
            <MetricsCards insights={insights} totalFeedback={totalCount} />
            <AiCopilot />
            <DiscoveryFunnel />
          </div>
        )}

        {/* Module 2: Motivations */}
        {activeTab === "motivations" && <WishlistMotivations />}

        {/* Module 3: User Personas */}
        {activeTab === "personas" && <BehavioralSegments />}

        {/* Module 4: Journey & Intent Spectrum */}
        {activeTab === "journey" && <WishlistJourney />}

        {/* Module 5: Purchase Postponement */}
        {activeTab === "postponement" && <PurchasePostponement />}

        {/* Module 6: Opportunity Prioritization & Unmet Needs */}
        {activeTab === "opportunities" && <OpportunityPrioritization />}

        {/* Module 7: Traceable Evidence Explorer */}
        {activeTab === "evidence" && (
          <EvidenceExplorer initialReviews={reviews} />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Myntra Wishlist Purchase Discovery Engine</p>
          <div className="flex items-center space-x-3 text-slate-400">
            <span>Supabase PostgreSQL</span>
            <span>•</span>
            <span>Groq Llama 3.3 RAG</span>
            <span>•</span>
            <span>GitHub Actions</span>
            <span>•</span>
            <span>Vercel Edge</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
