import { fetchFeedPreview } from "../lib/supabase";
import { Table } from "@recoverlution/ui";

type Signal = { title: string; detail: string; time: string; tone?: "neutral" | "success" | "warn" };

export const dynamic = "force-dynamic";

export default async function Page() {
  let feed = await fetchFeedPreview(7);
  if (!Array.isArray(feed)) feed = [];
  const source = feed.some((item) => (item?.id ?? "").toString().startsWith("demo-") === false) ? "Live" : "Demo";

  const signals: Signal[] = [
    { title: "RLS policy updated", detail: "Journey Studio editors: publish window locked to 7d.", time: "2m", tone: "success" },
    { title: "Consent cadence", detail: "NaviCue Studio flagged 2 journeys needing fresh consent copy.", time: "18m", tone: "warn" },
    { title: "Preview runtime", detail: "Universal Player build 0.12.4 promoted to staging.", time: "42m" },
    { title: "Signals", detail: "Trace pipeline backpressure eased after limiter tweak.", time: "1h" },
  ];

  return (
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
          <Card title="Studios" body="Journey Studio, NaviCue Studio, Content Assembly Lab." metricLabel="Journeys" metricValue="48" />
          <Card title="Safety" body="RLS roles, cadence/consent guardrails, publish workflow." metricLabel="Guardrails" metricValue="9" />
          <Card title="Preview" body="Preview in the Universal Player runtime before shipping." metricLabel="Build" metricValue="0.12.4" />
          <Card title="Signals" body="Trace pipeline, alerts, and system prompts in one lane." metricLabel="Latency" metricValue="62ms" />
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
              columns={[
                { key: "item", label: "Item" },
                { key: "content", label: "Content" },
                { key: "score", label: "Score", align: "right" },
                { key: "priority", label: "Priority", align: "right" },
                { key: "tags", label: "Tags" },
                { key: "state", label: "State", align: "right" },
              ]}
              rows={feed.map((item) => {
                const priority = typeof item?.priority === "number" ? item.priority : 0;
                const priorityClass = priority >= 8 ? "cc-priority-high" : priority >= 6 ? "cc-priority-medium" : "cc-priority-low";
                const priorityLabel = priority >= 8 ? "High" : priority >= 6 ? "Med" : "Low";
                const stateLabel = source === "Live" ? "Ready" : "Preview";
                const tags = Array.isArray(item?.context_tags) ? item.context_tags : [];
                const itemId = (item?.id ?? "—").toString();

                return {
                  item: (
                    <div>
                      <div style={{ fontWeight: 700, color: "var(--cc-text)" }}>{item?.item_kind ?? "—"}</div>
                      <div style={{ fontSize: 12, color: "var(--cc-muted)" }}>{itemId}</div>
                    </div>
                  ),
                  content: (
                    <div>
                      <div style={{ color: "var(--cc-text)" }}>{item?.content_type ?? "—"}</div>
                      <div style={{ fontSize: 12, color: "var(--cc-muted)" }}>{item?.content_ref || item?.content_id || "—"}</div>
                    </div>
                  ),
                  score: typeof item?.score === "number" ? item.score.toFixed(2) : "—",
                  priority: <span className={priorityClass}>{priority ? `${priority} · ${priorityLabel}` : "—"}</span>,
                  tags: (
                    <div className="cc-tag-stack">
                      {tags.map((tag) => (
                        <span key={tag} className="cc-tag" style={{ borderColor: "var(--cc-border-strong)" }}>
                          {tag}
                        </span>
                      ))}
                      {tags.length === 0 && <span className="cc-tag">—</span>}
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
  );
}

type CardProps = { title: string; body: string; metricLabel: string; metricValue: string };

function Card({ title, body, metricLabel, metricValue }: CardProps) {
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
