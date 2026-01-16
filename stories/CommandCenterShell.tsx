import React from "react";
import { Table } from "@recoverlution/ui";

import "../apps/command-center/app/globals.css";

type FeedItem = {
  id: string;
  item_kind: string;
  content_type: string;
  content_ref?: string | null;
  content_id?: string | null;
  score?: number | null;
  priority?: number | null;
  context_tags?: string[] | null;
};

type Signal = { title: string; detail: string; time: string; tone?: "neutral" | "success" | "warn" };

type CommandCenterShellProps = {
  feed: FeedItem[];
  signals: Signal[];
  source: "Live" | "Demo";
};

export function CommandCenterShell({ feed, signals, source }: CommandCenterShellProps) {
  return (
    <div className="cc-body" style={{ minHeight: "100vh" }}>
      <div className="cc-backdrop" aria-hidden />
      <main className="cc-shell">
        <aside className="cc-rail">
          <div className="cc-panel">
            <div className="cc-brand">RecoveryOS</div>
            <h2>Command Center</h2>
            <p>Studios, governance, and preview surfaces in one place.</p>

            <div className="cc-ribbon" style={{ marginTop: 14 }}>
              <span className="cc-pill">
                <span className={`cc-dot ${source === "Live" ? "live" : "demo"}`} />
                {source === "Live" ? "Supabase Live" : "Supabase Demo"}
              </span>
              <span className="cc-pill subtle">RLS enforced</span>
              <span className="cc-pill subtle">Preview runtime linked</span>
            </div>
          </div>

          <div className="cc-panel cc-group">
            <div className="cc-label">Quick actions</div>
            <button className="cc-ghost-btn">New journey</button>
            <button className="cc-ghost-btn">Author NaviCue</button>
            <button className="cc-ghost-btn">Content assembly</button>
            <button className="cc-ghost-btn">Safety review</button>
          </div>

          <div className="cc-panel cc-group">
            <div className="cc-label">Safety posture</div>
            <div className="cc-tag-stack">
              <span className="cc-tag">Consent cadence: 7d</span>
              <span className="cc-tag">Publish gate: dual</span>
              <span className="cc-tag">Trace: green</span>
            </div>
          </div>
        </aside>

        <div className="cc-main">
          <section className="cc-panel cc-hero">
            <div className="cc-ribbon" style={{ marginBottom: 10 }}>
              <span className="cc-pill">
                <span className="cc-dot live" /> Studios + Governance
              </span>
              <span className="cc-pill subtle">Author → Preview → Seal</span>
            </div>
            <h1>Apple-grade command, with a heart.</h1>
            <p>
              Author journeys, NaviCues, components, and content with RLS-enforced roles, built-in safety rhythms,
              and previews in the same runtime you ship.
            </p>
            <div className="cc-ribbon" style={{ marginTop: 16 }}>
              <span className="cc-pill">Universal Player ready</span>
              <span className="cc-pill subtle">Supabase feed wired</span>
            </div>
          </section>

          <section className="cc-grid">
            <MetricCard title="Studios" body="Journey Studio, NaviCue Studio, Content Assembly Lab." metricLabel="Journeys" metricValue="48" />
            <MetricCard title="Safety" body="RLS roles, cadence/consent guardrails, publish workflow." metricLabel="Guardrails" metricValue="9" />
            <MetricCard title="Preview" body="Preview in the Universal Player runtime before shipping." metricLabel="Build" metricValue="0.12.4" />
            <MetricCard title="Signals" body="Trace pipeline, alerts, and system prompts in one lane." metricLabel="Latency" metricValue="62ms" />
          </section>

          <section className="cc-grid-two">
            <div className="cc-panel">
              <div className="cc-section-title">
                <strong>Signals</strong>
                <span>Live governance + runtime notes</span>
              </div>
              <div className="cc-signals">
                {signals.map((signal) => (
                  <div key={signal.title} className="cc-signal-row">
                    <span className={`cc-dot ${signal.tone === "warn" ? "demo" : signal.tone === "success" ? "live" : ""}`} />
                    <div>
                      <div style={{ color: "var(--cc-text)", fontWeight: 600 }}>{signal.title}</div>
                      <div style={{ color: "var(--cc-subtle)", fontSize: "0.95rem" }}>{signal.detail}</div>
                    </div>
                    <small>{signal.time}</small>
                  </div>
                ))}
              </div>
            </div>

            <div className="cc-feed-card">
              <div className="cc-feed-meta">
                <div>
                  <div className="cc-label">Feed queue</div>
                  <h2 style={{ marginTop: 6 }}>Supabase demo/live data</h2>
                  <p>Live if env is set, otherwise seeded demo rows.</p>
                </div>
                <div className="cc-legend">
                  <span><span className="swatch" style={{ background: "var(--cc-emerald)" }} />High priority</span>
                  <span><span className="swatch" style={{ background: "var(--cc-amber)" }} />Medium</span>
                </div>
              </div>

              <Table
                caption="Feed queue"
                zebra
                columns={[
                  { key: "item", label: "Item" },
                  { key: "content", label: "Content" },
                  { key: "score", label: "Score", align: "right" },
                  { key: "priority", label: "Priority", align: "right" },
                  { key: "tags", label: "Tags" },
                  { key: "state", label: "State", align: "right" },
                ]}
                rows={feed.map((item) => {
                  const priority = item.priority ?? 0;
                  const priorityClass = priority >= 8 ? "cc-priority-high" : priority >= 6 ? "cc-priority-medium" : "cc-priority-low";
                  const priorityLabel = priority >= 8 ? "High" : priority >= 6 ? "Med" : "Low";
                  const stateLabel = source === "Live" ? "Ready" : "Preview";

                  return {
                    item: (
                      <div>
                        <div style={{ fontWeight: 700, color: "var(--cc-text)" }}>{item.item_kind}</div>
                        <div style={{ fontSize: 12, color: "var(--cc-muted)" }}>{item.id}</div>
                      </div>
                    ),
                    content: (
                      <div>
                        <div style={{ color: "var(--cc-text)" }}>{item.content_type}</div>
                        <div style={{ fontSize: 12, color: "var(--cc-muted)" }}>{item.content_ref || item.content_id || "—"}</div>
                      </div>
                    ),
                    score: item.score?.toFixed(2) ?? "—",
                    priority: <span className={priorityClass}>{priority ? `${priority} · ${priorityLabel}` : "—"}</span>,
                    tags: (
                      <div className="cc-tag-stack">
                        {(item.context_tags || []).map((tag) => (
                          <span key={tag} className="cc-tag" style={{ borderColor: "var(--cc-border-strong)" }}>
                            {tag}
                          </span>
                        ))}
                        {(item.context_tags || []).length === 0 && <span className="cc-tag">—</span>}
                      </div>
                    ),
                    state: <span className="cc-pill subtle" style={{ padding: "4px 10px" }}>{stateLabel}</span>,
                  };
                })}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ title, body, metricLabel, metricValue }: { title: string; body: string; metricLabel: string; metricValue: string }) {
  return (
    <div className="cc-card">
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="cc-metric">
        <span>{metricLabel}</span>
        <strong>{metricValue}</strong>
      </div>
    </div>
  );
}
