import { NextResponse } from "next/server";
import { supabaseClient } from "designsystem/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prefix = searchParams.get("prefix");
  if (!prefix) {
    return NextResponse.json(
      { ok: false, error: "prefix is required" },
      { status: 400 }
    );
  }
  try {
    const items = await supabaseClient.listUserAudio(prefix);
    return NextResponse.json({ ok: true, count: items.length, items });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
