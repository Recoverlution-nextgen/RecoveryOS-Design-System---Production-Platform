import { NextResponse } from "next/server";
import { supabaseClient } from "designsystem/supabase";

export async function GET() {
  try {
    const tracks = await supabaseClient.fetchSoundbiteTracksFrontend(1);
    const track = tracks?.[0];
    if (!track) {
      return NextResponse.json(
        { ok: false, error: "No catalog tracks available" },
        { status: 404 }
      );
    }
    const signed = await supabaseClient.signDownloadUrl({
      bucket: track.bucket,
      object: track.object,
    });
    return NextResponse.json({ ok: true, track, signed });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
