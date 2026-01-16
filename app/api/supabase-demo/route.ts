import { NextResponse } from "next/server";
import { supabaseClient } from "designsystem/supabase";

// Simple demo endpoint to prove Supabase wiring.
// Returns the first few soundbite tracks from v_soundbite_tracks_frontend.
export async function GET() {
  try {
    const tracks = await supabaseClient.fetchSoundbiteTracksFrontend(5);
    return NextResponse.json({ ok: true, count: tracks.length, tracks });
  } catch (error: any) {
    const message = error?.message || "Unknown error";
    const hint =
      message.includes("v_soundbite_tracks_frontend") ||
      message.includes("schema cache")
        ? "View not found. Create v_soundbite_tracks_frontend (see Supabase brief)."
        : undefined;
    return NextResponse.json(
      { ok: false, error: message, hint },
      { status: 500 }
    );
  }
}
