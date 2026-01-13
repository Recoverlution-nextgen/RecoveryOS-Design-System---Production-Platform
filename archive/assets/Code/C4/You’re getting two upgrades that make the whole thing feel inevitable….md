  
You’re getting two upgrades that make the whole thing feel *inevitable*:  
1. **Orchestration Timeline Stream** (routed → delivered → sealed → reviewed)  
2. **SpineAtlas Thread Overlay** (a living continuity line that updates as you click)  
Still paste-and-go. Still token-bound. Still no warm danger colors.  
  
## 1) Orchestration Timeline Stream  
## A) Add files  
```
/src/ui
  /OrchestrationStream
    OrchestrationStream.tsx
    OrchestrationStream.css

```
## OrchestrationStream.css  
```
/* src/ui/OrchestrationStream/OrchestrationStream.css */
.ro-stream {
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: var(--r-xl);
  padding: 16px;
  box-shadow: var(--e1);
  display: grid;
  gap: 12px;
}

.ro-stream__top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
}

.ro-stream__title {
  font-family: var(--font-heading);
  letter-spacing: var(--tracking-heading-tight);
  font-weight: 850;
}

.ro-stream__sub {
  font-size: 12px;
  color: var(--ink-secondary);
}

.ro-stream__list {
  display: grid;
  gap: 10px;
}

.ro-step {
  border: 1px solid var(--surface-border);
  background: rgba(233,231,255,0.18);
  border-radius: var(--r-xl);
  padding: 14px;
  position: relative;
  overflow: hidden;
}

[data-theme="dark"] .ro-step {
  background: rgba(233,231,255,0.06);
}

.ro-step__rail {
  position: absolute;
  left: 0;
  top: 12px;
  bottom: 12px;
  width: 3px;
  border-radius: 999px;
  background: var(--rail, var(--c-cyan-500));
}

.ro-step__head {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: baseline;
}

.ro-step__name {
  font-family: var(--font-heading);
  letter-spacing: var(--tracking-heading-tight);
  font-weight: 800;
  font-size: 13px;
}

.ro-step__time {
  font-size: 12px;
  color: var(--ink-secondary);
}

.ro-step__body {
  margin-top: 8px;
  font-size: 13px;
  line-height: var(--lh-body);
  color: var(--ink-secondary);
  white-space: pre-wrap;
}

.ro-step__chips {
  margin-top: 10px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.ro-stepChip {
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

[data-theme="dark"] .ro-stepChip {
  background: rgba(233,231,255,0.08);
}

.ro-stepChip::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--dot, var(--c-cyan-500));
}

```
## OrchestrationStream.tsx  
```
/* src/ui/OrchestrationStream/OrchestrationStream.tsx */
import React, { useMemo } from "react";
import "./OrchestrationStream.css";
import type { Lens, OneMoveContract, Trace } from "../PortalShell/portalTypes";

type Step = {
  name: "Routed" | "Delivered" | "Sealed" | "Reviewed";
  time: string;
  body: string;
  chips: string[];
  rail: string;
  dot: string;
};

function lensRail(lens: Lens) {
  return lens === "individual" ? "var(--c-purple-500)" : lens === "professional" ? "var(--c-cyan-500)" : "var(--c-neutral-700)";
}

export function OrchestrationStream(props: {
  lens: Lens;
  contract: OneMoveContract | null;
  latestTrace?: Trace | null;
}) {
  const { lens, contract, latestTrace } = props;

  const steps = useMemo<Step[]>(() => {
    const rail = lensRail(lens);
    const base = contract
      ? {
          intent: contract.intent,
          tempo: contract.tempo,
          primitive: contract.primitive,
          proof: contract.proofRequest,
        }
      : null;

    const routedBody = base
      ? [
          `Intent: ${base.intent}`,
          `Tempo: ${base.tempo}`,
          `Primitive: ${base.primitive}`,
          `Proof: ${base.proof}`,
        ].join("\n")
      : "Run a move to see routing.";

    const deliveredBody = base
      ? base.tempo === "week"
        ? "A baseline install was queued into the week."
        : "A right-sized move was delivered into the moment."
      : "Nothing delivered yet.";

    const sealedBody = latestTrace
      ? `Trace: ${latestTrace.title}\nSeal: ${latestTrace.sealed ? "SEALED" : "DRAFT"}\nPillar: ${latestTrace.pillar ?? "—"}`
      : "No trace sealed yet.";

    const reviewedBody =
      lens === "individual"
        ? "You can review when you want.\nProof stays quiet until it helps."
        : lens === "professional"
        ? "Review is signal-first:\nwhat held, what didn’t, what’s next."
        : "Review is integrity-first:\nreliability, adherence, defensibility.";

    return [
      {
        name: "Routed",
        time: "Now",
        body: routedBody,
        chips: ["Spine", "Coherent", "Right dose"],
        rail,
        dot: "var(--c-cyan-500)",
      },
      {
        name: "Delivered",
        time: "Now",
        body: deliveredBody,
        chips: ["In flow", "Small", "Repeatable"],
        rail: "var(--c-purple-700)",
        dot: "var(--c-purple-500)",
      },
      {
        name: "Sealed",
        time: "Now",
        body: sealedBody,
        chips: ["Proof", "Receipt", "Portable"],
        rail: "var(--c-cyan-500)",
        dot: "var(--c-cyan-500)",
      },
      {
        name: "Reviewed",
        time: "Later",
        body: reviewedBody,
        chips: ["Compounds", "Updates identity", "Stays humane"],
        rail: "var(--c-green-500)",
        dot: "var(--c-green-500)",
      },
    ];
  }, [lens, contract, latestTrace]);

  return (
    <section className="ro-stream" aria-label="Orchestration stream">
      <div className="ro-stream__top">
        <div>
          <div className="ro-stream__title">Continuity Stream</div>
          <div className="ro-stream__sub">Routed → Delivered → Sealed → Reviewed</div>
        </div>
        <div className="ro-stream__sub">Lens: <strong style={{ color: "var(--ink-primary)" }}>{lens}</strong></div>
      </div>

      <div className="ro-stream__list">
        {steps.map((s) => (
          <div key={s.name} className="ro-step" style={{ ["--rail" as any]: s.rail } as React.CSSProperties}>
            <span className="ro-step__rail" aria-hidden="true" />
            <div className="ro-step__head">
              <div className="ro-step__name">{s.name}</div>
              <div className="ro-step__time">{s.time}</div>
            </div>
            <div className="ro-step__body">{s.body}</div>
            <div className="ro-step__chips">
              {s.chips.map((c) => (
                <span key={c} className="ro-stepChip" style={{ ["--dot" as any]: s.dot } as React.CSSProperties}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

```
  
## B) Add stream to OrchestrationPanel  
Update src/ui/PortalShell/panels/OrchestrationPanel.tsx again:  
```
import React from "react";
import type { Lens, OneMoveContract, Trace } from "../portalTypes";
import { OrchestrationFeed } from "../../OrchestrationFeed/OrchestrationFeed";
import { OrchestrationStream } from "../../OrchestrationStream/OrchestrationStream";

export function OrchestrationPanel(props: {
  lens: Lens;
  roomName: string;
  contract: OneMoveContract | null;
  latestTrace?: Trace | null;
}) {
  const { lens, roomName, contract, latestTrace } = props;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <OrchestrationFeed lens={lens} room={roomName} contract={contract} latestTrace={latestTrace} />
      <OrchestrationStream lens={lens} contract={contract} latestTrace={latestTrace} />
    </div>
  );
}

```
  
## 2) SpineAtlas Thread Overlay (living continuity line)  
We’ll draw a subtle line overlay *over the grid* that:  
* connects pillar nodes in an OS-like “thread”  
* updates its emphasis based on **selected node**  
* changes intensity by **depth** (thread/journey feel more “wired”)  
No canvas. No SVG dependencies. Just CSS + absolutely positioned overlay.  
## A) Update SpineAtlasMini.css (overlay)  
Append:  
```
/* --- Thread Overlay --- */
.ro-atlas__wrap {
  position: relative;
}

.ro-threadOverlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.9;
}

.ro-threadOverlay__line {
  position: absolute;
  left: 8%;
  right: 8%;
  top: 52%;
  height: 10px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--thread-g0), var(--thread-g1), var(--thread-g2));
  filter: blur(0px);
  opacity: 0.55;
  transform: translateY(-50%);
  transition:
    opacity calc(var(--dur-glide) * var(--motion-multiplier, 1)) var(--ease-regulate),
    filter calc(var(--dur-glide) * var(--motion-multiplier, 1)) var(--ease-regulate);
}

.ro-atlas[data-zoom="thread"] .ro-threadOverlay__line,
.ro-atlas[data-zoom="journey"] .ro-threadOverlay__line {
  opacity: 0.85;
  filter: blur(0.5px);
}

/* Highlight pulse that moves per-selection (6 positions) */
.ro-threadOverlay__pulse {
  position: absolute;
  top: 52%;
  width: 220px;
  height: 220px;
  border-radius: 999px;
  background: radial-gradient(closest-side, rgba(64,224,208,0.18), rgba(0,0,0,0));
  transform: translate(-50%, -50%);
  transition:
    left calc(var(--dur-settle) * var(--motion-multiplier, 1)) var(--ease-regulate),
    opacity calc(var(--dur-glide) * var(--motion-multiplier, 1)) var(--ease-regulate);
  opacity: 0.55;
}

/* Selected index → left position */
.ro-threadOverlay[data-i="0"] .ro-threadOverlay__pulse { left: 18%; }
.ro-threadOverlay[data-i="1"] .ro-threadOverlay__pulse { left: 34%; }
.ro-threadOverlay[data-i="2"] .ro-threadOverlay__pulse { left: 50%; }
.ro-threadOverlay[data-i="3"] .ro-threadOverlay__pulse { left: 66%; }
.ro-threadOverlay[data-i="4"] .ro-threadOverlay__pulse { left: 82%; }
.ro-threadOverlay[data-i="5"] .ro-threadOverlay__pulse { left: 50%; }

/* Put grid above overlay */
.ro-atlas__grid {
  position: relative;
  z-index: 1;
}

@media (prefers-reduced-motion: reduce) {
  .ro-threadOverlay__pulse { transition: none; }
}

```
## B) Update SpineAtlasMini.tsx (wrap grid + overlay)  
In SpineAtlasMini.tsx, replace the grid block with this (keep your node mapping as-is):  
```
      <div className="ro-atlas__wrap">
        <div className="ro-threadOverlay" data-i={Math.min(NODES.findIndex(n => n.id === selected.id), 5)}>
          <div className="ro-threadOverlay__line" aria-hidden="true" />
          <div className="ro-threadOverlay__pulse" aria-hidden="true" />
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
      </div>

```
That’s it. Overlay is live.  
  
## 3) Exports  
```
/* src/ui/index.ts */
export { OrchestrationStream } from "./OrchestrationStream/OrchestrationStream";

```
  
## What you’ll feel now  
* Orchestration is no longer “explained.” It’s **shown as a system**.  
* The timeline makes continuity **visceral**: routed → delivered → sealed → reviewed.  
* The atlas now has a **living thread** — you’re not clicking a grid, you’re moving along a line.  
If you want the *final jump* in “Apple-grade” energy: next I’ll add a **Portal Transition** (open/close morph that feels like an OS sheet) and a **Lens Morph** (UI changes weight, verbosity, and rail visibility instantly when you flip Individual → Professional → Organisation).  
