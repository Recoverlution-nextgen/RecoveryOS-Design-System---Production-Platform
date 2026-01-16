import { NextResponse } from "next/server";
import { supabaseClient } from "designsystem/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const object: string | undefined = body?.object;
    if (!object) {
      return NextResponse.json(
        { ok: false, error: "object is required" },
        { status: 400 }
      );
    }
    await supabaseClient.deleteUserAudio({ object });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
