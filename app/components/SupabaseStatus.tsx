"use client";

import { useEffect, useState } from "react";

type DemoResult = {
  ok: boolean;
  count?: number;
  error?: string;
  hint?: string;
};

type FeedResult = {
  ok: boolean;
  count?: number;
  source?: string;
  error?: string;
  hint?: string;
};

export function SupabaseStatus() {
  const [demo, setDemo] = useState<DemoResult | null>(null);
  const [feed, setFeed] = useState<FeedResult | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const r = await fetch("/api/supabase-demo");
        setDemo(await r.json());
      } catch (e: any) {
        setDemo({ ok: false, error: e?.message || "fetch failed" });
      }
      try {
        const r = await fetch("/api/supabase-feed");
        setFeed(await r.json());
      } catch (e: any) {
        setFeed({ ok: false, error: e?.message || "fetch failed" });
      }
    };
    run();
  }, []);

  const badge = (ok: boolean | undefined) => (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 999,
        background: ok ? "#DCFCE7" : "#FEE2E2",
        color: ok ? "#166534" : "#991B1B",
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {ok ? "OK" : "FAIL"}
    </span>
  );

  return (
    <div
      style={{
        marginTop: 32,
        padding: 16,
        border: "1px solid #eee",
        borderRadius: 12,
        background: "#fff",
      }}
    >
      <h3 style={{ marginBottom: 12 }}>Supabase Wiring Check</h3>
      <div style={{ display: "grid", gap: 12 }}>
        <div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <strong>/api/supabase-demo</strong> {badge(demo?.ok)}
          </div>
          <div style={{ fontSize: 13, color: "#475467" }}>
            {demo?.ok
              ? `Fetched ${demo.count ?? 0} track rows`
              : demo?.error || "Pending..."}
            {demo?.hint ? ` — ${demo.hint}` : ""}
          </div>
        </div>
        <div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <strong>/api/supabase-feed</strong> {badge(feed?.ok)}
          </div>
          <div style={{ fontSize: 13, color: "#475467" }}>
            {feed?.ok
              ? `Fetched ${feed.count ?? 0} items via ${feed.source}`
              : feed?.error || "Pending..."}
            {feed?.hint ? ` — ${feed.hint}` : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
