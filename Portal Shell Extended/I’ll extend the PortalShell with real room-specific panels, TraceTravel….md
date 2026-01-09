I’ll extend the PortalShell with real room-specific panels, TraceTravel lens rendering, and a first-pass SpineAtlas mini (zoomable-ish, node-based) — all still paste-and-go and using your existing tokens/components.  
```
Rolling the 3 upgrades as paste-and-go additions:

1) Room-specific center panels:
   - MomentPanel (NaviCue simulator)
   - WeekPanel (Journey install simulator)
   - OrchestrationPanel (feed-with-spine preview)
   - IntegrationsPanel (signals-in overlay preview)
   - TrustPanel (rails + governance preview)
   - SpinePanel (SpineAtlas mini)

2) TraceTravel:
   - same trace, three interpretations (Me / Care / System)
   - toggle in-place via LensControl

3) SpineAtlas mini:
   - node map by Pillar (6)
   - click node -> “Run now” or “Install week”
   - depth dial changes detail (glance/seed/thread/journey)

Everything uses your CSS vars + existing components.

```
  
## A) Add new folders  
```
/src/ui
  /PortalShell
    PortalShell.tsx
    PortalShell.css
    portalTypes.ts
    panels/
      MomentPanel.tsx
      WeekPanel.tsx
      SpinePanel.tsx
      OrchestrationPanel.tsx
      IntegrationsPanel.tsx
      TrustPanel.tsx
    traceTravel.ts
  /SpineAtlasMini
    SpineAtlasMini.tsx
    SpineAtlasMini.css
  /TraceTravelCard
    TraceTravelCard.tsx
    TraceTravelCard.css

```
  
## B) TraceTravel (same artifact, 3 lenses)  
## 1) TraceTravel mapping helper  
```
/* src/ui/PortalShell/traceTravel.ts */
import type { Lens } from "./portalTypes";
import type { Trace } from "./portalTypes";

export type TravelView = {
  title: string;
  subtitle: string;
  body: string;
  badges: string[];
};

export function renderTrace(trace: Trace, lens: Lens): TravelView {
  // Keep it calm: interpret without “clinical dumping” in Individual lens.
  if (lens === "individual") {
    return {
      title: trace.title,
      subtitle: "Your proof. Your thread.",
      body: trace.body ?? "A small receipt you can trust.",
      badges: ["Receipt", trace.pillar ?? "—", trace.sealed ? "Sealed" : "Draft"],
    };
  }

  if (lens === "professional") {
    return {
      title: "Signal",
      subtitle: "Clean, coherent, usable.",
      body: [
        "What happened:",
        trace.title,
        "",
        "What held:",
        trace.body ?? "A small move held under load.",
      ].join("\n"),
      badges: ["Signal", trace.pillar ?? "Avoid archaeology", "Next move-ready"],
    };
  }

  // organisation
  return {
    title: "Integrity",
    subtitle: "Defensible continuity.",
    body: [
      "Delivery: SUCCESS",
      `Seal: ${trace.sealed ? "SEALED" : "DRAFT"}`,
      `Pillar: ${trace.pillar ?? "UNSPECIFIED"}`,
      "Consent: BY DESIGN",
      "Logs: AUDITABLE",
    ].join("\n"),
    badges: ["Audit", "Governed", "Portable"],
  };
}

```
## 2) TraceTravelCard component  
```
/* src/ui/TraceTravelCard/TraceTravelCard.css */
.ro-travel {
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: var(--r-xl);
  padding: 16px;
  box-shadow: var(--e1);
  display: grid;
  gap: 10px;
}

.ro-travel__top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: baseline;
}

.ro-travel__title {
  font-family: var(--font-heading);
  letter-spacing: var(--tracking-heading-tight);
  font-weight: 750;
}

.ro-travel__sub {
  font-size: 12px;
  color: var(--ink-secondary);
}

.ro-travel__body {
  white-space: pre-wrap;
  font-size: 13px;
  color: var(--ink-secondary);
  line-height: var(--lh-body);
}

.ro-travel__badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.ro-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  padding: 6px 10px;
  background: rgba(233,231,255,0.30);
  border: 1px solid var(--surface-border);
  font-size: 12px;
  color: var(--ink-primary);
}
[data-theme="dark"] .ro-badge {
  background: rgba(233,231,255,0.08);
}

.ro-badge::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--badge-dot, var(--c-cyan-500));
}
/* src/ui/TraceTravelCard/TraceTravelCard.tsx */
import React from "react";
import "./TraceTravelCard.css";

export function TraceTravelCard(props: {
  title: string;
  subtitle: string;
  body: string;
  badges: string[];
  dot?: string; // css color
}) {
  const { title, subtitle, body, badges, dot = "var(--c-cyan-500)" } = props;

  return (
    <section
      className="ro-travel"
      aria-label="Trace travel card"
      style={
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ["--badge-dot" as any]: dot,
        } as React.CSSProperties
      }
    >
      <div className="ro-travel__top">
        <div>
          <div className="ro-travel__title">{title}</div>
          <div className="ro-travel__sub">{subtitle}</div>
        </div>
      </div>

      <div className="ro-travel__body">{body}</div>

      <div className="ro-travel__badges">
        {badges.map((b) => (
          <span key={b} className="ro-badge">
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}

```
  
## C) SpineAtlas Mini (node map + actions)  
```
/* src/ui/SpineAtlasMini/SpineAtlasMini.css */
.ro-atlas {
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: var(--r-xl);
  padding: 16px;
  box-shadow: var(--e1);
  display: grid;
  gap: 12px;
}

.ro-atlas__top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.ro-atlas__title {
  font-family: var(--font-heading);
  letter-spacing: var(--tracking-heading-tight);
  font-weight: 750;
}

.ro-atlas__sub {
  font-size: 12px;
  color: var(--ink-secondary);
}

.ro-atlas__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.ro-node {
  border: 1px solid var(--surface-border);
  background: rgba(233,231,255,0.22);
  border-radius: var(--r-lg);
  padding: 12px;
  cursor: pointer;
  text-align: left;
  position: relative;
  overflow: hidden;
}

[data-theme="dark"] .ro-node {
  background: rgba(233,231,255,0.08);
}

.ro-node:hover {
  border-color: rgba(64,224,208,0.45);
}

.ro-node:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px var(--focus-ring-subtle);
  border-color: var(--focus-ring);
}

.ro-node__pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--ink-primary);
  border-radius: 999px;
  padding: 6px 10px;
  border: 1px solid var(--p-tint);
  background: var(--p-soft);
}

.ro-node__pill::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--p-base);
}

.ro-node__name {
  margin-top: 10px;
  font-family: var(--font-heading);
  letter-spacing: var(--tracking-heading-tight);
  font-weight: 700;
  font-size: 13px;
}

.ro-node__desc {
  margin-top: 4px;
  font-size: 12px;
  color: var(--ink-secondary);
  line-height: 1.4;
}

.ro-atlas__actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.ro-atlas__btn {
  border: 1px solid var(--surface-border);
  background: rgba(233,231,255,0.30);
  color: var(--ink-primary);
  border-radius: 999px;
  padding: 10px 12px;
  cursor: pointer;
}
[data-theme="dark"] .ro-atlas__btn { background: rgba(233,231,255,0.08); }

.ro-atlas__btn.is-primary {
  background: var(--return-surface);
  color: var(--return-ink);
  border-color: rgba(233,231,255,0.22);
}
.ro-atlas__btn.is-primary:hover { background: var(--return-surface-hover); }
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

  return (
    <section className="ro-atlas" aria-label="Spine atlas mini">
      <div className="ro-atlas__top">
        <div>
          <div className="ro-atlas__title">Spine Atlas</div>
          <div className="ro-atlas__sub">{subtitle}</div>
        </div>
        <div className="ro-atlas__sub">Depth: <strong style={{ color: "var(--ink-primary)" }}>{depth}</strong></div>
      </div>

      <div className="ro-atlas__grid">
        {NODES.map((n) => (
          <button
            key={n.id}
            type="button"
            className="ro-node pillar"
            data-pillar={n.pillar}
            style={pillarStyle(n.pillar)}
            onClick={() => setSelected(n)}
            aria-pressed={selected.id === n.id}
            title={`${PILLAR_NAMES[n.pillar]} • ${n.name}`}
          >
            <span className="ro-node__pill">{PILLAR_NAMES[n.pillar]}</span>
            <div className="ro-node__name">{n.name}</div>
            <div className="ro-node__desc">{n.desc[depth]}</div>
          </button>
        ))}
      </div>

      <div className="ro-atlas__actions">
        <button
          type="button"
          className="ro-atlas__btn is-primary"
          onClick={() => onRunNow(selected.pillar, selected.id)}
        >
          Run now
        </button>
        <button
          type="button"
          className="ro-atlas__btn"
          onClick={() => onInstallWeek(selected.pillar, selected.id)}
        >
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
  
## D) Room panels  
## 1) MomentPanel  
```
/* src/ui/PortalShell/panels/MomentPanel.tsx */
import React from "react";
import type { Intent, OneMoveContract } from "../portalTypes";

export function MomentPanel(props: {
  onRun: (intent: Intent) => void;
  contract: OneMoveContract | null;
}) {
  const { onRun, contract } = props;

  return (
    <div className="ro-corridor__card">
      <div className="ro-corridor__prompt">Run a Moment.</div>
      <div className="ro-choiceGrid">
        <button className="ro-choice" onClick={() => onRun("anchor")}>
          <div className="ro-choice__title">Anchor</div>
          <div className="ro-choice__sub">Return to ground. Make the next 30 seconds doable.</div>
        </button>
        <button className="ro-choice" onClick={() => onRun("clarity")}>
          <div className="ro-choice__title">Clarity</div>
          <div className="ro-choice__sub">Name what’s happening. Choose cleanly.</div>
        </button>
        <button className="ro-choice" onClick={() => onRun("connection")}>
          <div className="ro-choice__title">Connection</div>
          <div className="ro-choice__sub">Repair the moment. Rejoin the thread.</div>
        </button>
        <button className="ro-choice" onClick={() => onRun("direction")}>
          <div className="ro-choice__title">Direction</div>
          <div className="ro-choice__sub">Values forward. One aligned move.</div>
        </button>
      </div>

      {contract ? (
        <>
          <div className="ro-divider" />
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>Delivered</div>
          <div style={{ fontSize: 12, color: "var(--ink-secondary)" }}>
            One move contract created. A trace sealed.
          </div>
        </>
      ) : null}
    </div>
  );
}

```
## 2) WeekPanel  
```
/* src/ui/PortalShell/panels/WeekPanel.tsx */
import React from "react";
import type { Intent, OneMoveContract } from "../portalTypes";

export function WeekPanel(props: {
  onInstall: (intent: Intent) => void;
  contract: OneMoveContract | null;
}) {
  const { onInstall, contract } = props;

  return (
    <div className="ro-corridor__card">
      <div className="ro-corridor__prompt">Install a Week.</div>

      <div className="ro-choiceGrid">
        <button className="ro-choice" onClick={() => onInstall("anchor")}>
          <div className="ro-choice__title">Baseline Regulation</div>
          <div className="ro-choice__sub">Familiarity. Safety. Repeatability.</div>
        </button>
        <button className="ro-choice" onClick={() => onInstall("clarity")}>
          <div className="ro-choice__title">Pattern Map</div>
          <div className="ro-choice__sub">Recognition that shows up mid-life.</div>
        </button>
        <button className="ro-choice" onClick={() => onInstall("connection")}>
          <div className="ro-choice__title">Repair Reps</div>
          <div className="ro-choice__sub">Micro-repair that restores trust.</div>
        </button>
        <button className="ro-choice" onClick={() => onInstall("direction")}>
          <div className="ro-choice__title">Decision Ritual</div>
          <div className="ro-choice__sub">Values-aligned moves that steer the week.</div>
        </button>
      </div>

      {contract ? (
        <>
          <div className="ro-divider" />
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>Installed</div>
          <div style={{ fontSize: 12, color: "var(--ink-secondary)" }}>
            Weekly cadence created. First receipt ready.
          </div>
        </>
      ) : null}
    </div>
  );
}

```
## 3) OrchestrationPanel  
```
/* src/ui/PortalShell/panels/OrchestrationPanel.tsx */
import React from "react";

export function OrchestrationPanel() {
  return (
    <div className="ro-corridor__card">
      <div className="ro-corridor__prompt">Orchestration.</div>
      <div style={{ fontSize: 13, color: "var(--ink-secondary)", lineHeight: "var(--lh-body)" }}>
        A feed with a spine. Not noise. Not random.
        <br />
        <br />
        This panel becomes: routing rationale, cadence rules, what was delivered, what held, what’s next —
        without archaeology.
      </div>

      <div className="ro-contract" style={{ borderStyle: "solid" }}>
        <div className="ro-contract__row">
          <span className="ro-contract__key">Cadence</span>
          <span className="ro-contract__val">Quiet by default</span>
        </div>
        <div className="ro-contract__row">
          <span className="ro-contract__key">Integrity</span>
          <span className="ro-contract__val">Governed delivery</span>
        </div>
        <div className="ro-contract__row">
          <span className="ro-contract__key">Goal</span>
          <span className="ro-contract__val">Fewer missed moments</span>
        </div>
      </div>
    </div>
  );
}

```
## 4) IntegrationsPanel  
```
/* src/ui/PortalShell/panels/IntegrationsPanel.tsx */
import React from "react";

export function IntegrationsPanel() {
  return (
    <div className="ro-corridor__card">
      <div className="ro-corridor__prompt">Integrations.</div>

      <div style={{ fontSize: 13, color: "var(--ink-secondary)", lineHeight: "var(--lh-body)" }}>
        Signals in. Missed moments out.
        <br />
        <br />
        Wearables / sleep / schedule / people — not as surveillance.
        As context — only when needed — by consent.
      </div>

      <div className="ro-choiceGrid" style={{ marginTop: 12 }}>
        <div className="ro-choice" style={{ cursor: "default" as any }}>
          <div className="ro-choice__title">Readiness</div>
          <div className="ro-choice__sub">Grades timing. Keeps delivery humane.</div>
        </div>
        <div className="ro-choice" style={{ cursor: "default" as any }}>
          <div className="ro-choice__title">Rhythm</div>
          <div className="ro-choice__sub">Quiet hours. Cadence rules.</div>
        </div>
        <div className="ro-choice" style={{ cursor: "default" as any }}>
          <div className="ro-choice__title">People</div>
          <div className="ro-choice__sub">Support graph. Clean escalation.</div>
        </div>
        <div className="ro-choice" style={{ cursor: "default" as any }}>
          <div className="ro-choice__title">Context</div>
          <div className="ro-choice__sub">Fewer missed moments. More continuity.</div>
        </div>
      </div>
    </div>
  );
}

```
## 5) TrustPanel  
```
/* src/ui/PortalShell/panels/TrustPanel.tsx */
import React from "react";
import { HandrailPanel } from "../../HandrailPanel/HandrailPanel";

export function TrustPanel(props: {
  consentVisible: boolean;
  setConsentVisible: (v: boolean) => void;
  quietHours: boolean;
  setQuietHours: (v: boolean) => void;
  escalation: boolean;
  setEscalation: (v: boolean) => void;
}) {
  const { consentVisible, setConsentVisible, quietHours, setQuietHours, escalation, setEscalation } = props;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <HandrailPanel
        title="Trust Rails"
        consentVisible={consentVisible}
        onConsentVisibleChange={setConsentVisible}
        quietHours={quietHours}
        onQuietHoursChange={setQuietHours}
        escalation={escalation}
        onEscalationChange={setEscalation}
      />

      <div className="ro-corridor__card">
        <div className="ro-corridor__prompt">Governance.</div>
        <div style={{ fontSize: 13, color: "var(--ink-secondary)", lineHeight: "var(--lh-body)" }}>
          Locked spine. Controlled expansion. Labels evolve — IDs don’t.
          <br />
          <br />
          This is how continuity stays defensible at scale.
        </div>

        <div className="ro-contract" style={{ borderStyle: "solid" }}>
          <div className="ro-contract__row">
            <span className="ro-contract__key">LOCKED</span>
            <span className="ro-contract__val">pillars • primitives • KBE</span>
          </div>
          <div className="ro-contract__row">
            <span className="ro-contract__key">CONTROLLED</span>
            <span className="ro-contract__val">concepts • themes • schemas</span>
          </div>
          <div className="ro-contract__row">
            <span className="ro-contract__key">EXPANDABLE</span>
            <span className="ro-contract__val">mindblocks • voice</span>
          </div>
        </div>
      </div>
    </div>
  );
}

```
## 6) SpinePanel (Atlas mini + actions)  
```
/* src/ui/PortalShell/panels/SpinePanel.tsx */
import React from "react";
import type { Depth } from "../../DepthDial/DepthDial";
import { SpineAtlasMini } from "../../SpineAtlasMini/SpineAtlasMini";
import type { Pillar } from "../../tokens";

export function SpinePanel(props: {
  depth: Depth;
  onRunNow: (pillar: Pillar, nodeId: string) => void;
  onInstallWeek: (pillar: Pillar, nodeId: string) => void;
}) {
  const { depth, onRunNow, onInstallWeek } = props;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <SpineAtlasMini depth={depth} onRunNow={onRunNow} onInstallWeek={onInstallWeek} />
      <div className="ro-corridor__card">
        <div className="ro-corridor__prompt">How to read it.</div>
        <div style={{ fontSize: 13, color: "var(--ink-secondary)", lineHeight: "var(--lh-body)" }}>
          This isn’t a library. It’s a routing surface.
          <br />
          Click a node — run now or install week — and the system seals proof into a trace.
        </div>
      </div>
    </div>
  );
}

```
  
## E) Update PortalShell to use room panels + TraceTravel  
Replace the center section in your existing PortalShell.tsx with this version (full file below for copy/paste).  
```
/* src/ui/PortalShell/PortalShell.tsx */
import React, { useMemo, useState } from "react";
import "./PortalShell.css";

import { LensControl } from "../LensControl/LensControl";
import { DepthDial, Depth } from "../DepthDial/DepthDial";
import { TraceTile } from "../TraceTile/TraceTile";

import type { Lens, Room, Intent, Trace, OneMoveContract } from "./portalTypes";
import { routeMock, traceFromContract } from "./portalTypes";
import { renderTrace } from "./traceTravel";
import { TraceTravelCard } from "../TraceTravelCard/TraceTravelCard";

import { MomentPanel } from "./panels/MomentPanel";
import { WeekPanel } from "./panels/WeekPanel";
import { SpinePanel } from "./panels/SpinePanel";
import { OrchestrationPanel } from "./panels/OrchestrationPanel";
import { IntegrationsPanel } from "./panels/IntegrationsPanel";
import { TrustPanel } from "./panels/TrustPanel";

import type { Pillar } from "../tokens";

const ROOMS: Array<{ id: Room; title: string; sub: string; accentVar: string }> = [
  { id: "moment", title: "Run a Moment", sub: "One move. One receipt.", accentVar: "var(--c-cyan-500)" },
  { id: "week", title: "Install a Week", sub: "Baseline. Then proof.", accentVar: "var(--c-purple-500)" },
  { id: "spine", title: "Explore the Spine", sub: "Depth without drowning.", accentVar: "var(--c-purple-900)" },
  { id: "orchestration", title: "See Orchestration", sub: "A feed with a spine.", accentVar: "var(--c-cyan-500)" },
  { id: "trust", title: "Trust & Rails", sub: "Consent. Boundaries.", accentVar: "var(--c-neutral-700)" },
  { id: "integrations", title: "Integrations", sub: "Runs inside the day.", accentVar: "var(--c-green-500)" },
];

export function PortalShell(props: {
  open: boolean;
  onClose: () => void;
  initialLens?: Lens;
  initialRoom?: Room;
}) {
  const { open, onClose, initialLens = "individual", initialRoom = "moment" } = props;

  const [lens, setLens] = useState<Lens>(initialLens);
  const [depth, setDepth] = useState<Depth>("glance");
  const [room, setRoom] = useState<Room>(initialRoom);

  const [traces, setTraces] = useState<Trace[]>([
    { id: "seed", title: "A small return held.", body: "Enough to keep motion.", sealed: true, pillar: "DM", timestamp: "Earlier" },
  ]);

  const [contract, setContract] = useState<OneMoveContract | null>(null);

  // Trust toggles
  const [consentVisible, setConsentVisible] = useState(true);
  const [quietHours, setQuietHours] = useState(true);
  const [escalation, setEscalation] = useState(false);

  const roomMeta = useMemo(() => ROOMS.find((r) => r.id === room)!, [room]);
  const latestTrace = traces[0];

  if (!open) return null;

  const deliver = (intent: Intent) => {
    const c = routeMock(room, intent);
    setContract(c);
    const t = traceFromContract(c);
    setTraces((prev) => [t, ...prev].slice(0, 12));
  };

  const runFromAtlas = (pillar: Pillar, nodeId: string) => {
    // We map atlas actions into intents in a simple way for now.
    const intent: Intent = pillar === "SC" ? "connection" : pillar === "DM" ? "direction" : pillar === "CR" ? "clarity" : "anchor";
    deliver(intent);
    console.log("Atlas run:", pillar, nodeId);
  };

  const installFromAtlas = (pillar: Pillar, nodeId: string) => {
    setRoom("week");
    const intent: Intent = pillar === "SC" ? "connection" : pillar === "DM" ? "direction" : pillar === "CR" ? "clarity" : "anchor";
    deliver(intent);
    console.log("Atlas install:", pillar, nodeId);
  };

  const travel = latestTrace ? renderTrace(latestTrace, lens) : null;

  return (
    <div className="ro-portal" role="dialog" aria-modal="true" aria-label="RecoveryOS Portal">
      <div className="ro-portal__ambient" aria-hidden="true" />
      <div className="ro-portal__glass" aria-hidden="true" />

      {/* LEFT: Rooms */}
      <aside className="ro-portal__left" aria-label="Rooms">
        <div className="ro-portal__roomList">
          {ROOMS.map((r) => (
            <button
              key={r.id}
              type="button"
              className="ro-room"
              aria-current={room === r.id}
              onClick={() => setRoom(r.id)}
              style={
                {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ["--room-accent" as any]: r.accentVar,
                } as React.CSSProperties
              }
            >
              <span className="ro-room__left">
                <span className="ro-room__dot" aria-hidden="true" />
                <span>
                  <div className="ro-room__title">{r.title}</div>
                  <div className="ro-room__sub">{r.sub}</div>
                </span>
              </span>

              <span aria-hidden="true" style={{ color: "var(--ink-tertiary)" }}>
                →
              </span>
            </button>
          ))}
        </div>
      </aside>

      {/* CENTER */}
      <main className="ro-portal__center" aria-label="Portal center">
        <header className="ro-portal__chrome">
          <div className="ro-portal__chromeLeft">
            <div className="ro-portal__brand">
              <div className="ro-portal__brandName">RecoveryOS Portal</div>
              <div className="ro-portal__brandSub">{roomMeta.title}</div>
            </div>
          </div>

          <div className="ro-portal__chromeRight">
            <LensControl value={lens} onChange={setLens} />
            <DepthDial value={depth} onChange={setDepth} />
            <button className="ro-portal__btn" type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </header>

        <section className="ro-portal__main">
          <div className="ro-corridor">
            {/* Room-specific center panel */}
            {room === "moment" ? <MomentPanel onRun={deliver} contract={contract} /> : null}
            {room === "week" ? <WeekPanel onInstall={deliver} contract={contract} /> : null}
            {room === "spine" ? <SpinePanel depth={depth} onRunNow={runFromAtlas} onInstallWeek={installFromAtlas} /> : null}
            {room === "orchestration" ? <OrchestrationPanel /> : null}
            {room === "integrations" ? <IntegrationsPanel /> : null}
            {room === "trust" ? (
              <TrustPanel
                consentVisible={consentVisible}
                setConsentVisible={setConsentVisible}
                quietHours={quietHours}
                setQuietHours={setQuietHours}
                escalation={escalation}
                setEscalation={setEscalation}
              />
            ) : null}

            {/* TraceTravel (always present, always interprets latest trace) */}
            {travel && (
              <TraceTravelCard
                title={travel.title}
                subtitle={travel.subtitle}
                body={travel.body}
                badges={travel.badges}
                dot={lens === "individual" ? "var(--c-purple-500)" : lens === "professional" ? "var(--c-cyan-500)" : "var(--c-neutral-700)"}
              />
            )}
          </div>
        </section>

        <footer className="ro-portal__footer">
          <div style={{ fontSize: 12, color: "var(--ink-secondary)" }}>Quiet • Safe • Provable</div>
          <div style={{ fontSize: 12, color: "var(--ink-secondary)" }}>
            Room: <strong style={{ color: "var(--ink-primary)" }}>{room}</strong> • Traces:{" "}
            <strong style={{ color: "var(--ink-primary)" }}>{traces.length}</strong>
          </div>
        </footer>
      </main>

      {/* RIGHT: Artifact Rail */}
      <aside className="ro-portal__right" aria-label="Artifact rail">
        <div className="ro-portal__rightInner">
          <div className="ro-portal__railHeader">
            <div className="ro-portal__railTitle">Artifact Rail</div>
            <div className="ro-portal__railSub">Traces seal proof into continuity.</div>
          </div>

          {traces.map((t) => (
            <TraceTile
              key={t.id}
              title={t.title}
              body={t.body}
              sealed={t.sealed}
              pillar={t.pillar}
              timestamp={t.timestamp}
              onOpen={() => console.log("open trace", t.id)}
            />
          ))}
        </div>
      </aside>
    </div>
  );
}

```
  
## F) Exports  
```
/* src/ui/index.ts */
export { PortalShell } from "./PortalShell/PortalShell";
export { SpineAtlasMini } from "./SpineAtlasMini/SpineAtlasMini";
export { TraceTravelCard } from "./TraceTravelCard/TraceTravelCard";

```
  
## G) Final: what’s now “real”  
* **Room-specific** portal experience (it feels like multiple “rooms” not one page)  
* **TraceTravel** proves the “one OS, three worlds” concept in UI (same object, different altitude)  
* **SpineAtlas** is now a usable routing surface: click → run now / install week → trace seals → travel view updates  
  
