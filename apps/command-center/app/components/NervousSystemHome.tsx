import { Panel, Pill, SectionHeader, Table } from "@recoverlution/ui";

export type Signal = { title: string; detail: string; time: string; tone?: "neutral" | "success" | "warn" };

export type FeedItem = {
  id?: string | null;
  item_kind?: string | null;
  content_type?: string | null;
  content_ref?: string | null;
  content_id?: string | null;
  score?: number | null;
  priority?: number | null;
  context_tags?: string[] | null;
};

type NervousSystemHomeProps = {
  feed: FeedItem[];
  source: "Live" | "Demo";
  signals: Signal[];
};

export function NervousSystemHome({ feed, source, signals }: NervousSystemHomeProps) {
  return (
    <>
      <Panel>
        <SectionHeader
          eyebrow="Nervous System"
          title="Living map + truth stream"
          subtitle="Answer instantly: what happened, why, and whether it held"
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
          <Pill label={source === "Live" ? "Supabase Live" : "Supabase Demo"} dotTone={source === "Live" ? "success" : "warning"} />
          <Pill label="RLS enforced" tone="muted" />
          <Pill label="Preview runtime linked" tone="muted" />
        </div>
      </Panel>

      <div className="ui-grid">
        <Panel>
          <SectionHeader eyebrow="System Map" title="Signal → LUMA → Player → Receipt" subtitle="Graph canvas" />
          <div className="ui-placeholder" style={{ marginTop: 12 }} />
        </Panel>
        <Panel>
          <SectionHeader eyebrow="Mindblocks" title="Traffic lights" subtitle="Top patterns + resolution heat" />
          <div className="ui-heat-strip" style={{ marginTop: 12 }}>
            <div className="ui-heat-bar" />
            <div className="ui-truth-meta">Peak window · 18:00–22:00</div>
          </div>
        </Panel>
        <Panel>
          <SectionHeader eyebrow="Impact" title="Energy · Clarity · Anchorage" subtitle="Proof, not vanity" />
          <div className="ui-trident" style={{ marginTop: 12 }}>
            <div className="ui-trident-item">
              <strong>Energy</strong>
              <span>+0.42</span>
              <div className="ui-truth-meta">p50 32m</div>
            </div>
            <div className="ui-trident-item">
              <strong>Clarity</strong>
              <span>+0.28</span>
              <div className="ui-truth-meta">p50 41m</div>
            </div>
            <div className="ui-trident-item">
              <strong>Anchorage</strong>
              <span>+0.35</span>
              <div className="ui-truth-meta">p50 29m</div>
            </div>
          </div>
        </Panel>
      </div>

      <div className="ui-grid-2">
        <Panel>
          <SectionHeader eyebrow="Truth Feed" title="Narrative events" subtitle="Why it happened + receipts" />
          <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
            {signals.map((signal) => (
              <div key={signal.title} className="ui-truth-card">
                <div style={{ fontWeight: 600 }}>{signal.title}</div>
                <div>{signal.detail}</div>
                <div className="ui-truth-meta">
                  <span>{signal.time}</span>
                  <span>•</span>
                  <span>{signal.tone === "warn" ? "Guardrail" : signal.tone === "success" ? "Resolved" : "Info"}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <SectionHeader eyebrow="Feed Queue" title="Delivery pipeline" subtitle="Live if env is set, else demo" />
          <Table
            caption="Feed queue"
            columns={[
              { key: "item", label: "Item" },
              { key: "content", label: "Content" },
              { key: "score", label: "Score", align: "right" },
              { key: "priority", label: "Priority", align: "right" },
              { key: "tags", label: "Tags" },
            ]}
            rows={feed.map((item) => {
              const priority = typeof item?.priority === "number" ? item.priority : 0;
              const tags = Array.isArray(item?.context_tags) ? item.context_tags : [];
              const itemId = (item?.id ?? "—").toString();

              return {
                item: (
                  <div>
                    <div style={{ fontWeight: 700 }}>{item?.item_kind ?? "—"}</div>
                    <div style={{ fontSize: 12, color: "var(--semantic-colors-ink-tertiary, #A89FB8)" }}>{itemId}</div>
                  </div>
                ),
                content: (
                  <div>
                    <div>{item?.content_type ?? "—"}</div>
                    <div style={{ fontSize: 12, color: "var(--semantic-colors-ink-tertiary, #A89FB8)" }}>{item?.content_ref || item?.content_id || "—"}</div>
                  </div>
                ),
                score: typeof item?.score === "number" ? item.score.toFixed(2) : "—",
                priority: priority ? priority.toString() : "—",
                tags: tags.length ? tags.join(", ") : "—",
              };
            })}
          />
        </Panel>
      </div>
    </>
  );
}
