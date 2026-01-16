import { NextResponse } from "next/server";
import { supabaseClient } from "designsystem/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const type: string | undefined = body?.type;
    const payload: Record<string, any> = body?.payload || {};
    if (!type) {
      return NextResponse.json(
        { ok: false, error: "type is required" },
        { status: 400 }
      );
    }
    await supabaseClient.logEvent({ type, payload });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
