import { NextResponse } from "next/server";
import { supabaseClient } from "designsystem/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const object: string | undefined = body?.object;
    const contentType: string | undefined = body?.contentType;
    const bucket: string = body?.bucket || "user-uploads";
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
    return NextResponse.json({ ok: true, upload: signed, bucket, object });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
