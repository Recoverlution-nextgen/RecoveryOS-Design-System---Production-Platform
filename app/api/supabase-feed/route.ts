import { NextResponse } from "next/server";
import { supabaseClient } from "designsystem/supabase";

// Returns a small sample feed payload using v1_feed_pull (if available) or direct table fallback.
export async function GET() {
  try {
    // Try edge function first
    const items = await supabaseClient.feedPull({ limit: 5 });
    return NextResponse.json({
      ok: true,
      source: "v1_feed_pull",
      count: items.length,
      items,
    });
  } catch (fnError: any) {
    try {
      // Fallback to direct table read if function not present
      const fallback = await supabaseClient.fetchFeedQueue(5);
      return NextResponse.json({
        ok: true,
        source: "user_feed_queue_v2",
        count: fallback.length,
        items: fallback,
      });
    } catch (tbError: any) {
      return NextResponse.json(
        {
          ok: false,
          error: fnError?.message || tbError?.message || "Unknown error",
          hint: "Ensure v1_feed_pull function or user_feed_queue_v2 table exists and RLS permits access.",
        },
        { status: 500 }
      );
    }
  }
}
