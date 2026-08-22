import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get("platform") || "all";
    const theme = searchParams.get("theme") || "all";
    const search = searchParams.get("search") || "";
    const counterEvidence = searchParams.get("counter") === "true";
    const limit = parseInt(searchParams.get("limit") || "60", 10);

    let query = supabase
      .from("raw_feedback")
      .select("*", { count: "exact" })
      .order("scraped_at", { ascending: false })
      .limit(limit);

    if (platform !== "all") {
      query = query.eq("platform", platform);
    }

    if (theme !== "all") {
      query = query.ilike("text", `%${theme}%`);
    }

    if (search.trim()) {
      query = query.ilike("text", `%${search.trim()}%`);
    }

    if (counterEvidence) {
      query = query.or(
        "text.ilike.%perfect fit%,text.ilike.%love the dress%,text.ilike.%good material%,text.ilike.%great quality%"
      );
    }

    const { data, count, error } = await query;

    if (error) {
      console.error("Supabase feedback query error:", error);
      return NextResponse.json({ data: [], count: 0, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data || [], count: count || 0 });
  } catch (err: any) {
    console.error("API /api/feedback handler error:", err);
    return NextResponse.json({ data: [], count: 0, error: err.message }, { status: 500 });
  }
}
