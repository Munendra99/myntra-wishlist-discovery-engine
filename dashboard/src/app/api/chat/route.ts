import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured in Vercel environment variables." },
        { status: 500 }
      );
    }
    const groq = new Groq({ apiKey });

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages array" },
        { status: 400 }
      );
    }

    // Fetch the latest aggregated wishlist insights
    const { data: insights } = await supabase
      .from("insights")
      .select("*")
      .order("mention_count", { ascending: false });

    // Fetch recent sample wishlist friction quotes
    const { data: recentFeedback } = await supabase
      .from("raw_feedback")
      .select("platform, text, rating, keyword_matched")
      .order("scraped_at", { ascending: false })
      .limit(20);

    const contextString = `
LATEST GROUNDED WISHLIST METRICS (Synthesized from 2,400+ authentic user reviews from Google Play Store, Apple App Store, and Quora/Reddit):
${(insights || [])
  .map(
    (i: any) =>
      `• Theme: "${i.theme_label}" (${i.mention_count} mentions, ${i.pct_of_total}% of wishlist drop-off complaints) - Trend: ${i.trend?.toUpperCase()}
  Description: ${i.description}
  Category breakdown: ${JSON.stringify(i.segment_breakdown || {})}
  Sample user quotes: ${(i.sample_quotes || []).slice(0, 3).map((q: string) => `"${q}"`).join(" | ")}`
  )
  .join("\n\n")}

RECENT LIVE RAW WISHLIST SIGNALS:
${(recentFeedback || [])
  .map((f: any) => `[${f.platform.toUpperCase()} | Rating: ${f.rating || "N/A"}★]: "${f.text.slice(0, 180)}"`)
  .join("\n")}
`;

    const systemPrompt = `
You are the Executive AI Discovery Copilot for Myntra's Chief Product Officer (CPO) and Fashion Growth Leadership team.
Your objective is to provide high-clarity, beautifully formatted, data-driven, and actionable product intelligence explaining WHY users add fashion items to their Myntra wishlist but hesitate or stall without purchasing.

CRITICAL PRODUCT CONSTRAINT:
You must focus EXCLUSIVELY on NON-MONETARY product, behavioral, visual, and social interventions.
DO NOT recommend discounts, coupon codes, cashbacks, sale countdowns, or delivery fee waivers. All solutions must unlock conversion organically through UX, trust, sizing confidence, social validation, and curation.

THE 6 CORE WISHLIST FRICTION AREAS:
1. Wishlist Clutter & Decision Paralysis (47.1% of stalls - hoarding 50+ items without structure)
2. Fabric Drape & Studio Photo Ambiguity (24.9% of stalls - studio lighting vs real fabric flow)
3. External Validation & Second-Opinion Gap (15.8% of stalls - waiting to show friends/mom on WhatsApp)
4. Size & Fit Ambiguity (8.9% of stalls - inconsistent brand measurements & body shape doubts)
5. Silent Size Depletion in Wishlist (1.8% of stalls - saved sizes selling out without alternatives)
6. Passive Moodboard & Intent Disconnect (1.5% of stalls - Pinterest-style saving without urgency)

MYNTRA-NATIVE PRODUCT INTERVENTIONS TO RECOMMEND:
- Interactive Wishlist Outfit Builder & Look Stacker (Grouping saved items into full outfits with 1-click cart move)
- Collaborative 'Ask a Friend' Wishlist Polling (1-click WhatsApp/Instagram voting cards)
- Intelligent In-Stock Alternative Auto-Swapper (Instantly swaps out-of-stock sizes with matching in-stock styles)
- Real-Motion Fabric Drape Video Hauls & GSM Badges (5-sec customer try-on videos in daylight)
- Dynamic Fit & Measurement Benchmark Matrix (Photo reviews filtered by exact height/weight)
- Smart Wishlist Auto-Organizer & Occasion Boards (Clustering into 'Workwear', 'Weddings', 'Vacation')

Formatting Instructions:
1. Use clear, structured Markdown with bold metrics, bullet points, and clean comparison tables.
2. Include direct user sentiment and verbatim customer quotes using blockquotes (> "Quote text").
3. Keep the tone executive, crisp, and product-strategy focused.
`;

    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: `${systemPrompt}\n\n${contextString}` },
        ...messages,
      ],
      temperature: 0.15,
      max_tokens: 1200,
    });

    const reply = response.choices[0]?.message?.content || "I couldn't process that query. Please try again.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("AI Chat Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate AI response" },
      { status: 500 }
    );
  }
}
