  
Below is the “roll” for both:  
1. **Orchestration Feed** (why routed, cadence rules, what held, what’s next — without dumping internals)  
2. **SpineAtlas zoom interaction** (glance ⇄ thread) with real motion + layout change (not just copy)  
Everything is still **paste-and-go**, token-driven, no warm danger colors.  
  
# 1) Orchestration Feed (paste-and-go)  
## A) New component  
```
/src/ui
  /OrchestrationFeed
    OrchestrationFeed.tsx
    OrchestrationFeed.css

```
## OrchestrationFeed.css  
```
/* src/ui/OrchestrationFeed/OrchestrationFeed.css */
.ro-orch {
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: var(--r-xl);
  padding: 16px;
  box-shadow: var(--e1);
  display: grid;
  gap: 12px;
}

.ro-orch__top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.ro-orch__title {
  font-family: var(--font-heading);
  letter-spacing: var(--tracking-heading-tight);
  font-weight: 800;
}

.ro-orch__sub {
  font-size: 12px;
  color: var(--ink-secondary);
}

.ro-orch__cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

@media (max-width: 900px) {
  .ro-orch__cards { grid-template-columns: 1fr; }
}

.ro-orchCard {
  border: 1px solid var(--surface-border);
  background: rgba(233,231,255,0.22);
  border-radius: var(--r-xl);
  padding: 14px;
  display: grid;
  gap: 10px;
  position: relative;
  overflow: hidden;
}

[data-theme="dark"] .ro-orchCard {
  background: rgba(233,231,255,0.08);
}

.ro-orchCard__rail {
  position: absolute;
  left: 0;
  top: 12px;
  bottom: 12px;
  width: 3px;
  background: var(--rail, var(--c-cyan-500));
  border-radius: 999px;
  opacity: 0.9;
}

.ro-orchCard__label {
  font-size: 12px;
  color: var(--ink-secondary);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.ro-orchCard__headline {
  font-family: var(--font-heading);
  letter-spacing: var(--tracking-heading-tight);
  font-weight: 750;
  font-size: 13px;
  color: var(--ink-primary);
}

.ro-orchCard__body {
  font-size: 13px;
  line-height: var(--lh-body);
  color: var(--ink-secondary);
  white-space: pre-wrap;
}

.ro-orch__timeline {
  border: 1px solid var(--surface-border);
  background: rgba(233,231,255,0.16);
  border-radius: var(--r-xl);
  padding: 14px;
  display: grid;
  gap: 10px;
}

[data-theme="dark"] .ro-orch__timeline {
  background: rgba(233,231,255,0.06);
}

.ro-row {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 10px;
  align-items: baseline;
}

.ro-row__k {
  font-size: 12px;
  color: var(--ink-tertiary);
}

.ro-row__v {
  font-size: 13px;
  color: var(--ink-secondary);
}

.ro-chipline {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.ro-chip {
  border: 1px solid var(--surface-border);
  background: rgba(233,231,255,0.30);
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 12px;
  color: var(--ink-primary);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

[data-theme="dark"] .ro-chip {
  background: rgba(233,231,255,0.08);
}

.ro-chip::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--dot, var(--c-cyan-500));
}

.ro-orch__foot {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  font-size: 12px;
  color: var(--ink-secondary);
}

```
## OrchestrationFeed.tsx  
```
/* src/ui/OrchestrationFeed/OrchestrationFeed.tsx */
import React, { useMemo } from "react";
import "./OrchestrationFeed.css";
import type { Lens, OneMoveContract, Trace } from "../PortalShell/portalTypes";

function railFor(lens: Lens) {
  return lens === "individual" ? "var(--c-purple-500)" : lens === "professional" ? "var(--c-cyan-500)" : "var(--c-neutral-700)";
}

export function OrchestrationFeed(props: {
  lens: Lens;
  room: string;
  contract: OneMoveContract | null;
  latestTrace?: Trace | null;
}) {
  const { lens, room, contract, latestTrace } = props;

  const cadence = useMemo(() => {
    if (lens === "individual") return ["Quiet by default", "You choose when it speaks", "No flood"];
    if (lens === "professional") return ["Signal-first", "Closed-loop between sessions", "No admin drag"];
    return ["Governed delivery", "Auditable logs", "Defensible continuity"];
  }, [lens]);

  const why = useMemo(() => {
    if (!contract) return "Run a move to see routing rationale.";
    const intentLine =
      contract.intent === "anchor"
        ? "Stability first. The system prioritised a return-to-ground primitive."
        : contract.intent === "clarity"
        ? "Choice space first. The system prioritised a clean cognitive move."
        : contract.intent === "connection"
        ? "Repair first. The system prioritised a relational micro-act."
        : "Direction first. The system prioritised a values-aligned move.";
    return [
      intentLine,
      "",
      "Why this dose:",
      contract.tempo === "week" ? "Baseline installation needs a longer window." : "Moments demand right-sized, repeatable moves.",
    ].join("\n");
  }, [contract]);

  const whatHeld = useMemo(() => {
    if (!latestTrace) return "No trace yet.";
    if (lens === "individual") return "A small proof landed. Enough to keep motion.";
    if (lens === "professional") return `Held: ${latestTrace.title}\nProof: ${latestTrace.sealed ? "Sealed" : "Draft"}\nTarget: ${latestTrace.pillar ?? "—"}`;
    return `Integrity: ${latestTrace.sealed ? "SEALED" : "DRAFT"}\nDelivery: SUCCESS\nTarget: ${latestTrace.pillar ?? "UNSPECIFIED"}`;
  }, [latestTrace, lens]);

  const next = useMemo(() => {
    if (!contract) return "The next move appears after the first proof.";
    if (contract.tempo === "week") return "Schedule the first real-world test. Seal the first receipt.";
    return "Repeat once. Then transfer into a real condition (tiny).";
  }, [contract]);

  return (
    <section className="ro-orch" aria-label="Orchestration feed">
      <div className="ro-orch__top">
        <div>
          <div className="ro-orch__title">Orchestration</div>
          <div className="ro-orch__sub">A feed with a spine — {room}</div>
        </div>

        <div className="ro-chipline" aria-label="Cadence chips">
          {cadence.map((c) => (
            <span
              key={c}
              className="ro-chip"
              style={
                {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ["--dot" as any]: railFor(lens),
                } as React.CSSProperties
              }
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="ro-orch__cards">
        <div className="ro-orchCard" style={{ ["--rail" as any]: railFor(lens) }}>
          <span className="ro-orchCard__rail" aria-hidden="true" />
          <div className="ro-orchCard__label">Why this was routed</div>
          <div className="ro-orchCard__headline">Rationale (human-readable)</div>
          <div className="ro-orchCard__body">{why}</div>
        </div>

        <div className="ro-orchCard" style={{ ["--rail" as any]: "var(--c-green-500)" }}>
          <span className="ro-orchCard__rail" aria-hidden="true" />
          <div className="ro-orchCard__label">What held</div>
          <div className="ro-orchCard__headline">Outcome signal</div>
          <div className="ro-orchCard__body">{whatHeld}</div>
        </div>
      </div>

      <div className="ro-orch__timeline" aria-label="Routing timeline">
        <div className="ro-row">
          <div className="ro-row__k">Cadence</div>
          <div className="ro-row__v">{lens === "individual" ? "Quiet • chosen • supportive" : lens === "professional" ? "Signal • coherence • continuity" : "Governed • auditable • defensible"}</div>
        </div>
        <div className="ro-row">
          <div className="ro-row__k">Next</div>
          <div className="ro-row__v">{next}</div>
        </div>
      </div>

      <div className="ro-orch__foot">
        <span>Not engagement. Signal.</span>
        <span>Boundaries first.</span>
      </div>
    </section>
  );
}

```
  
## B) Use it inside OrchestrationPanel  
Replace your OrchestrationPanel.tsx with this:  
```
/* src/ui/PortalShell/panels/OrchestrationPanel.tsx */
import React from "react";
import type { Lens, OneMoveContract, Trace } from "../portalTypes";
import { OrchestrationFeed } from "../../OrchestrationFeed/OrchestrationFeed";

export function OrchestrationPanel(props: {
  lens: Lens;
  roomName: string;
  contract: OneMoveContract | null;
  latestTrace?: Trace | null;
}) {
  const { lens, roomName, contract, latestTrace } = props;
  return <OrchestrationFeed lens={lens} room={roomName} contract={contract} latestTrace={latestTrace} />;
}

```
  
# 2) SpineAtlas “real zoom” (layout + motion)  
We’ll do **two things**:  
* **Scale + spacing** changes by depth (glance → thread)  
* **Node detail reveal** with animated max-height + opacity  
* Optional “pan” feel via subtle translate of the grid  
No external animation libs needed.  
## A) Update SpineAtlasMini.css  
Append this to src/ui/SpineAtlasMini/SpineAtlasMini.css:  
```
/* --- Zoom Modes --- */
.ro-atlas[data-zoom="glance"] .ro-atlas__grid {
  gap: 10px;
  transform: translate3d(0, 0, 0);
}

.ro-atlas[data-zoom="seed"] .ro-atlas__grid {
  gap: 12px;
  transform: translate3d(0, -2px, 0);
}

.ro-atlas[data-zoom="thread"] .ro-atlas__grid {
  gap: 14px;
  transform: translate3d(0, -4px, 0);
}

.ro-atlas[data-zoom="journey"] .ro-atlas__grid {
  gap: 14px;
  transform: translate3d(0, -6px, 0);
}

.ro-atlas__grid {
  transition:
    transform calc(var(--dur-glide) * var(--motion-multiplier, 1)) var(--ease-regulate),
    gap calc(var(--dur-glide) * var(--motion-multiplier, 1)) var(--ease-regulate);
}

/* Node detail reveal */
.ro-node__detail {
  margin-top: 10px;
  border-top: 1px solid rgba(233,231,255,0.55);
  padding-top: 10px;
  color: var(--ink-secondary);
  font-size: 12px;
  line-height: 1.45;

  max-height: 0px;
  opacity: 0;
  overflow: hidden;

  transition:
    max-height calc(var(--dur-settle) * var(--motion-multiplier, 1)) var(--ease-regulate),
    opacity calc(var(--dur-glide) * var(--motion-multiplier, 1)) var(--ease-regulate);
}

[data-theme="dark"] .ro-node__detail {
  border-top: 1px solid rgba(233,231,255,0.14);
}

.ro-atlas[data-zoom="thread"] .ro-node__detail,
.ro-atlas[data-zoom="journey"] .ro-node__detail {
  max-height: 120px;
  opacity: 1;
}

/* In journey mode, make nodes feel more "installable" */
.ro-atlas[data-zoom="journey"] .ro-node {
  background: linear-gradient(180deg, rgba(233,231,255,0.26), rgba(233,231,255,0.12));
}
[data-theme="dark"] .ro-atlas[data-zoom="journey"] .ro-node {
  background: linear-gradient(180deg, rgba(233,231,255,0.10), rgba(233,231,255,0.06));
}

@media (prefers-reduced-motion: reduce) {
  .ro-atlas__grid,
  .ro-node__detail { transition: none; }
}

```
## B) Update SpineAtlasMini.tsx (render detail block + data-zoom)  
Replace your SpineAtlasMini.tsx with this version:  
```
/* src/ui/SpineAtlasMini/SpineAtlasMini.tsx */
import React, { useMemo, useState } from "react";
import "./SpineAtlasMini.css";
import type { Depth } from "../DepthDial/DepthDial";
import type { Pillar } from "../tokens";
import { pillarStyle, PILLAR_NAMES } from "../tokens";

type Node = {
  id: string;
  pillar: Pillar;
  name: string;
  desc: {
    glance: string;
    seed: string;
    thread: string;
    journey: string;
  };
  detail: {
    thread: string;
    journey: string;
  };
};

const NODES: Node[] = [
  {
    id: "n1",
    pillar: "ER",
    name: "Downshift",
    desc: {
      glance: "Return to ground.",
      seed: "Settle the system in 30 seconds.",
      thread: "Install a repeatable downshift under pressure.",
      journey: "Build a baseline regulation circuit for the week.",
    },
    detail: {
      thread: "Mechanism: regulation • Primitive: somatic • Proof: micro",
      journey: "Cadence: 3×/week • Proof: scene capture • Review: weekly",
    },
  },
  {
    id: "n2",
    pillar: "CR",
    name: "Choice Space",
    desc: {
      glance: "Create room.",
      seed: "Name the pattern without judgement.",
      thread: "Turn recognition into a clean next move.",
      journey: "Install a weekly reframe practice that transfers.",
    },
    detail: {
      thread: "Mechanism: defusion • Primitive: cognitive • Proof: choice",
      journey: "Cadence: 2×/week • Proof: pre/post • Review: weekly",
    },
  },
  {
    id: "n3",
    pillar: "SC",
    name: "Reconnect",
    desc: {
      glance: "Repair the moment.",
      seed: "One clean message. One micro-act.",
      thread: "Rebuild trust through repeatable repair.",
      journey: "Install connection reps that become default.",
    },
    detail: {
      thread: "Mechanism: co-regulation • Primitive: relational • Proof: micro",
      journey: "Cadence: 2×/week • Proof: clean apology • Review: weekly",
    },
  },
  {
    id: "n4",
    pillar: "II",
    name: "Identity Proof",
    desc: {
      glance: "Receipts stack.",
      seed: "Capture the smallest believable proof.",
      thread: "Let proof update the story without force.",
      journey: "Build a weekly receipt ritual that changes identity.",
    },
    detail: {
      thread: "Mechanism: integration • Primitive: proof • Proof: note",
      journey: "Cadence: weekly • Proof: vault entry • Review: timeline",
    },
  },
  {
    id: "n5",
    pillar: "SR",
    name: "Resilience",
    desc: {
      glance: "Hold your line.",
      seed: "Stabilise before the spiral.",
      thread: "Train repeatable holding patterns under load.",
      journey: "Install a resilience cadence that compounds.",
    },
    detail: {
      thread: "Mechanism: inhibitory control • Primitive: mechanics • Proof: micro",
      journey: "Cadence: 3×/week • Proof: transfer test • Review: weekly",
    },
  },
  {
    id: "n6",
    pillar: "DM",
    name: "Decision",
    desc: {
      glance: "Choose direction.",
      seed: "One move aligned to values.",
      thread: "Reduce drift by choosing earlier.",
      journey: "Install weekly decisions that steer the whole system.",
    },
    detail: {
      thread: "Mechanism: time horizon • Primitive: values • Proof: choice",
      journey: "Cadence: weekly • Proof: decision receipt • Review: weekly",
    },
  },
];

export function SpineAtlasMini(props: {
  depth: Depth;
  onRunNow: (pillar: Pillar, nodeId: string) => void;
  onInstallWeek: (pillar: Pillar, nodeId: string) => void;
}) {
  const { depth, onRunNow, onInstallWeek } = props;
  const [selected, setSelected] = useState<Node>(NODES[0]);

  const subtitle = useMemo(() => {
    return depth === "glance"
      ? "A map you can actually use."
      : depth === "seed"
      ? "Enough detail to spark the click."
      : depth === "thread"
      ? "Depth without drowning."
      : "Installation view.";
  }, [depth]);

  const zoom = depth; // use depth as zoom mode

  return (
    <section className="ro-atlas" data-zoom={zoom} aria-label="Spine atlas mini">
      <div className="ro-atlas__top">
        <div>
          <div className="ro-atlas__title">Spine Atlas</div>
          <div className="ro-atlas__sub">{subtitle}</div>
        </div>
        <div className="ro-atlas__sub">
          Depth: <strong style={{ color: "var(--ink-primary)" }}>{depth}</strong>
        </div>
      </div>

      <div className="ro-atlas__grid">
        {NODES.map((n) => {
          const isSel = selected.id === n.id;
          return (
            <button
              key={n.id}
              type="button"
              className="ro-node pillar"
              data-pillar={n.pillar}
              style={pillarStyle(n.pillar)}
              onClick={() => setSelected(n)}
              aria-pressed={isSel}
              title={`${PILLAR_NAMES[n.pillar]} • ${n.name}`}
            >
              <span className="ro-node__pill">{PILLAR_NAMES[n.pillar]}</span>
              <div className="ro-node__name">{n.name}</div>
              <div className="ro-node__desc">{n.desc[depth]}</div>

              <div className="ro-node__detail" aria-hidden={depth === "glance" || depth === "seed"}>
                {depth === "journey" ? n.detail.journey : n.detail.thread}
              </div>
            </button>
          );
        })}
      </div>

      <div className="ro-atlas__actions">
        <button type="button" className="ro-atlas__btn is-primary" onClick={() => onRunNow(selected.pillar, selected.id)}>
          Run now
        </button>
        <button type="button" className="ro-atlas__btn" onClick={() => onInstallWeek(selected.pillar, selected.id)}>
          Install week
        </button>

        <span style={{ fontSize: 12, color: "var(--ink-secondary)" }}>
          Selected: <strong style={{ color: "var(--ink-primary)" }}>{selected.name}</strong>
        </span>
      </div>
    </section>
  );
}

```
  
# 3) Wire OrchestrationFeed into PortalShell  
In PortalShell.tsx, update the orchestration render line to pass props:  
Replace:  
```
{room === "orchestration" ? <OrchestrationPanel /> : null}

```
With:  
```
{room === "orchestration" ? (
  <OrchestrationPanel
    lens={lens}
    roomName={roomMeta.title}
    contract={contract}
    latestTrace={latestTrace ?? null}
  />
) : null}

```
Make sure your OrchestrationPanel.tsx is the updated version from above.  
  
# 4) Exports (add OrchestrationFeed)  
```
/* src/ui/index.ts */
export { OrchestrationFeed } from "./OrchestrationFeed/OrchestrationFeed";

```
  
## What changed in feel (immediately)  
* **Orchestration isn’t a concept panel anymore** — it behaves like the “governed conductor” UI.  
* The “why” is readable at all three altitudes **without dumping clinical internals**.  
* SpineAtlas now **moves** with depth: spacing shifts + detail reveals with motion, so “zoom” is felt.  
If you want the next layer: I’ll add a **mini Orchestration timeline stream** (3–6 cards: routed → delivered → sealed → reviewed) and a **SpineAtlas “thread line” overlay** that visually connects the 6 pillars into a continuity path that updates as you click nodes.  
