import { NextResponse } from "next/server";
import { supabaseClient } from "designsystem/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const bucket = body.bucket || "user-uploads";
    const object = body.object as string | undefined;
    const contentType = body.contentType as string | undefined;
    if (!object || !contentType) {
      return NextResponse.json(
        { ok: false, error: "object and contentType are required" },
        { status: 400 }
      );
    }
    const signed = await supabaseClient.generateUploadUrl({
      bucket,
      object,
      contentType,
    });
    return NextResponse.json({ ok: true, signed });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
