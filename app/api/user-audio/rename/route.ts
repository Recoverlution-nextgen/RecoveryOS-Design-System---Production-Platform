import { NextResponse } from "next/server";
import { supabaseClient } from "designsystem/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const from: string | undefined = body?.from;
    const to: string | undefined = body?.to;
    if (!from || !to) {
      return NextResponse.json(
        { ok: false, error: "from and to are required" },
        { status: 400 }
      );
    }
    await supabaseClient.renameUserAudio({ from, to });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
