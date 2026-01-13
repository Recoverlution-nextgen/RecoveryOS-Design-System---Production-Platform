Let’s go. 🟣🟦🟢  
Here’s the **iOS keynote moment** layer — paste-and-go:  
1. **Feature Walkthrough Mode** (cinematic, auto-advancing “scenes”, one CTA per scene)  
2. **Spine Spotlight** (dims everything except the selected pillar + drops a 10–20s Spark overlay inside the portal)  
No fluff. No danger colors. Pure RecoveryOS energy.  
  
# 1) Feature Walkthrough Mode (Keynote Scenes)  
## A) Add files  
```
/src/ui
  /WalkthroughMode
    WalkthroughMode.tsx
    WalkthroughMode.css

```
## WalkthroughMode.css  
```
/* src/ui/WalkthroughMode/WalkthroughMode.css */
.ro-walk {
  background: rgba(233,231,255,0.18);
  border: 1px solid var(--surface-border);
  border-radius: var(--r-xl);
  padding: 16px;
  box-shadow: var(--e1);
  position: relative;
  overflow: hidden;
}

[data-theme="dark"] .ro-walk {
  background: rgba(233,231,255,0.06);
}

.ro-walk__glow {
  position: absolute;
  inset: -120px;
  background:
    radial-gradient(600px 420px at 20% 20%, rgba(124,103,255,0.18), rgba(0,0,0,0)),
    radial-gradient(520px 380px at 80% 30%, rgba(64,224,208,0.12), rgba(0,0,0,0)),
    radial-gradient(520px 380px at 60% 80%, rgba(47,230,166,0.10), rgba(0,0,0,0));
  pointer-events: none;
  filter: blur(0px);
}

.ro-walk__top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  position: relative;
  z-index: 1;
}

.ro-walk__title {
  font-family: var(--font-heading);
  letter-spacing: var(--tracking-heading-tight);
  font-weight: 900;
}

.ro-walk__sub {
  font-size: 12px;
  color: var(--ink-secondary);
}

.ro-walk__body {
  margin-top: 12px;
  position: relative;
  z-index: 1;
  display: grid;
  gap: 10px;
}

.ro-scene {
  border: 1px solid var(--surface-border);
  background: rgba(251,250,255,0.65);
  border-radius: var(--r-xl);
  padding: 14px;
  box-shadow: var(--e0);
}

[data-theme="dark"] .ro-scene {
  background: rgba(21,20,42,0.60);
}

.ro-scene__eyebrow {
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-secondary);
}

.ro-scene__headline {
  margin-top: 6px;
  font-family: var(--font-heading);
  letter-spacing: var(--tracking-heading-tight);
  font-weight: 850;
  font-size: 15px;
}

.ro-scene__line {
  margin-top: 8px;
  font-size: 13px;
  color: var(--ink-secondary);
  line-height: var(--lh-body);
}

.ro-walk__ctaRow {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.ro-walk__dots {
  display: flex;
  gap: 6px;
}

.ro-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: rgba(62,43,184,0.22);
  border: 1px solid rgba(62,43,184,0.18);
}

.ro-dot.is-on {
  background: var(--c-cyan-500);
  border-color: rgba(64,224,208,0.55);
  box-shadow: 0 0 0 6px rgba(64,224,208,0.10);
}

.ro-walk__btn {
  border: 1px solid var(--surface-border);
  background: rgba(233,231,255,0.30);
  border-radius: 999px;
  padding: 10px 12px;
  cursor: pointer;
  color: var(--ink-primary);
}

[data-theme="dark"] .ro-walk__btn {
  background: rgba(233,231,255,0.08);
}

.ro-walk__btnPrimary {
  background: var(--return-surface);
  color: var(--return-ink);
  border-color: rgba(233,231,255,0.22);
}

.ro-walk__btnPrimary:hover { background: var(--return-surface-hover); }

.ro-walk__btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px var(--focus-ring-subtle);
  border-color: var(--focus-ring);
}

```
## WalkthroughMode.tsx  
```
/* src/ui/WalkthroughMode/WalkthroughMode.tsx */
import React, { useEffect, useMemo, useState } from "react";
import "./WalkthroughMode.css";
import type { Lens, Room } from "../PortalShell/portalTypes";

type Scene = {
  id: string;
  eyebrow: string;
  headline: string;
  line: string;
  cta: { label: string; goRoom: Room };
};

export function WalkthroughMode(props: {
  lens: Lens;
  onGoRoom: (r: Room) => void;
  autoplay?: boolean;
  intervalMs?: number;
}) {
  const { lens, onGoRoom, autoplay = true, intervalMs = 4200 } = props;
  const [i, setI] = useState(0);

  const scenes = useMemo<Scene[]>(() => {
    // Lens tweaks: less words for Individual, more signal for Pro/Org
    const isInd = lens === "individual";
    return [
      {
        id: "s1",
        eyebrow: "RecoveryOS",
        headline: "Recovery that runs in real life.",
        line: isInd
          ? "Small moves. Real conditions. A system you can return to."
          : "The operating truth expressed as delivery: coherent, governed, repeatable.",
        cta: { label: "Run a Moment", goRoom: "moment" },
      },
      {
        id: "s2",
        eyebrow: "Continuity",
        headline: "A feed with a spine.",
        line: isInd
          ? "Not noise. Not pressure. Just what helps, when it helps."
          : "Rationale, cadence, what held, what’s next — without archaeology.",
        cta: { label: "See Orchestration", goRoom: "orchestration" },
      },
      {
        id: "s3",
        eyebrow: "Proof",
        headline: "Receipts that update identity.",
        line: isInd
          ? "Not gamified. Not performative. Believable proof."
          : "Sealed traces become signal (professional) and defensibility (organisation).",
        cta: { label: "Open Trust & Rails", goRoom: "trust" },
      },
      {
        id: "s4",
        eyebrow: "Spine",
        headline: "Depth without drowning.",
        line: isInd
          ? "Explore. Click. Run now. Install a week."
          : "Stable pillars, controlled expansion, portable IDs — scale without drift.",
        cta: { label: "Explore the Spine", goRoom: "spine" },
      },
    ];
  }, [lens]);

  useEffect(() => {
    if (!autoplay) return;
    const t = window.setInterval(() => setI((x) => (x + 1) % scenes.length), intervalMs);
    return () => window.clearInterval(t);
  }, [autoplay, intervalMs, scenes.length]);

  const s = scenes[i];

  return (
    <section className="ro-walk" aria-label="Feature walkthrough">
      <div className="ro-walk__glow" aria-hidden="true" />
      <div className="ro-walk__top">
        <div>
          <div className="ro-walk__title">Keynote Mode</div>
          <div className="ro-walk__sub">One scene. One point. One move.</div>
        </div>
        <div className="ro-walk__sub">Lens: <strong style={{ color: "var(--ink-primary)" }}>{lens}</strong></div>
      </div>

      <div className="ro-walk__body">
        <div className="ro-scene" aria-label="Scene">
          <div className="ro-scene__eyebrow">{s.eyebrow}</div>
          <div className="ro-scene__headline">{s.headline}</div>
          <div className="ro-scene__line">{s.line}</div>
        </div>
      </div>

      <div className="ro-walk__ctaRow">
        <div className="ro-walk__dots" aria-label="Progress dots">
          {scenes.map((_, idx) => (
            <span key={idx} className={`ro-dot ${idx === i ? "is-on" : ""}`} />
          ))}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button className="ro-walk__btn" type="button" onClick={() => setI((x) => (x - 1 + scenes.length) % scenes.length)}>
            Back
          </button>
          <button className="ro-walk__btn ro-walk__btnPrimary" type="button" onClick={() => onGoRoom(s.cta.goRoom)}>
            {s.cta.label}
          </button>
          <button className="ro-walk__btn" type="button" onClick={() => setI((x) => (x + 1) % scenes.length)}>
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

```
  
# 2) Spine Spotlight + Spark overlay (10–20s)  
## A) Add files  
```
/src/ui
  /SpineSpotlight
    SpineSpotlight.tsx
    SpineSpotlight.css

```
## SpineSpotlight.css  
```
/* src/ui/SpineSpotlight/SpineSpotlight.css */
.ro-spot {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: grid;
  place-items: center;
}

.ro-spot__veil {
  position: absolute;
  inset: 0;
  background: rgba(11,10,20,0.52);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.ro-spot__card {
  width: min(760px, calc(100vw - 24px));
  background: rgba(251,250,255,0.86);
  border: 1px solid var(--surface-border);
  border-radius: var(--r-xl);
  box-shadow: var(--e2);
  padding: 18px;
  position: relative;
  overflow: hidden;
}

[data-theme="dark"] .ro-spot__card {
  background: rgba(21,20,42,0.86);
}

.ro-spot__glow {
  position: absolute;
  inset: -120px;
  background:
    radial-gradient(600px 420px at 20% 20%, rgba(124,103,255,0.18), rgba(0,0,0,0)),
    radial-gradient(520px 380px at 80% 30%, rgba(64,224,208,0.14), rgba(0,0,0,0)),
    radial-gradient(520px 380px at 60% 80%, rgba(47,230,166,0.10), rgba(0,0,0,0));
  pointer-events: none;
}

.ro-spot__top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  position: relative;
  z-index: 1;
}

.ro-spot__pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  padding: 6px 10px;
  border: 1px solid var(--p-tint);
  background: var(--p-soft);
  font-size: 12px;
}

.ro-spot__pill::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--p-base);
}

.ro-spot__title {
  font-family: var(--font-heading);
  letter-spacing: var(--tracking-heading-tight);
  font-weight: 900;
  margin-top: 10px;
  position: relative;
  z-index: 1;
}

.ro-spot__spark {
  margin-top: 10px;
  position: relative;
  z-index: 1;
  border: 1px solid var(--surface-border);
  border-radius: var(--r-xl);
  padding: 14px;
  background: rgba(233,231,255,0.22);
  color: var(--ink-secondary);
  line-height: var(--lh-body);
}

[data-theme="dark"] .ro-spot__spark {
  background: rgba(233,231,255,0.08);
}

.ro-spot__actions {
  margin-top: 14px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.ro-spot__btn {
  border: 1px solid var(--surface-border);
  background: rgba(233,231,255,0.30);
  border-radius: 999px;
  padding: 10px 12px;
  cursor: pointer;
  color: var(--ink-primary);
}

[data-theme="dark"] .ro-spot__btn { background: rgba(233,231,255,0.08); }

.ro-spot__btnPrimary {
  background: var(--return-surface);
  color: var(--return-ink);
  border-color: rgba(233,231,255,0.22);
}
.ro-spot__btnPrimary:hover { background: var(--return-surface-hover); }

.ro-spot__btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px var(--focus-ring-subtle);
  border-color: var(--focus-ring);
}

```
## SpineSpotlight.tsx  
```
/* src/ui/SpineSpotlight/SpineSpotlight.tsx */
import React, { useEffect } from "react";
import "./SpineSpotlight.css";
import type { Pillar } from "../tokens";
import { pillarStyle, PILLAR_NAMES } from "../tokens";

const SPARKS: Record<Pillar, string[]> = {
  ER: [
    "Regulation isn’t a mindset.",
    "It’s a nervous system decision.",
    "So we start where change actually enters: the body.",
  ],
  SR: [
    "Resilience isn’t toughness.",
    "It’s repeatable holding patterns — installed over time.",
    "Small enough to run when it matters.",
  ],
  SC: [
    "Connection isn’t a concept.",
    "It’s repair in the moment — done cleanly.",
    "Trust returns by micro-acts, not speeches.",
  ],
  CR: [
    "Reframing isn’t positive thinking.",
    "It’s creating choice space while the pattern is live.",
    "Recognition becomes steering.",
  ],
  II: [
    "Identity doesn’t change by promise.",
    "It changes by receipts the brain believes.",
    "Proof stacks. Story follows.",
  ],
  DM: [
    "Decision isn’t willpower.",
    "It’s direction — chosen earlier.",
    "One aligned move beats ten intentions.",
  ],
};

export function SpineSpotlight(props: {
  open: boolean;
  pillar: Pillar;
  onClose: () => void;
  onRunNow?: () => void;
  autoCloseMs?: number; // 10–20 seconds default
}) {
  const { open, pillar, onClose, onRunNow, autoCloseMs = 14000 } = props;

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => onClose(), autoCloseMs);
    return () => window.clearTimeout(t);
  }, [open, autoCloseMs, onClose]);

  if (!open) return null;

  const lines = SPARKS[pillar] ?? ["A spark. A shift. A move."];

  return (
    <div className="ro-spot" role="dialog" aria-modal="true" aria-label="Spine spotlight">
      <div className="ro-spot__veil" onClick={onClose} aria-hidden="true" />
      <div className="ro-spot__card classNameFix pillar" data-pillar={pillar} style={pillarStyle(pillar)}>
        <div className="ro-spot__glow" aria-hidden="true" />

        <div className="ro-spot__top">
          <span className="ro-spot__pill">{PILLAR_NAMES[pillar]}</span>
          <span style={{ fontSize: 12, color: "var(--ink-secondary)" }}>Spark • 10–20s</span>
        </div>

        <div className="ro-spot__title">Spine Spotlight</div>

        <div className="ro-spot__spark">
          {lines.map((l, idx) => (
            <div key={idx} style={{ marginTop: idx === 0 ? 0 : 8 }}>
              {l}
            </div>
          ))}
        </div>

        <div className="ro-spot__actions">
          <button className="ro-spot__btn" type="button" onClick={onClose}>
            Close
          </button>
          <button className="ro-spot__btn ro-spot__btnPrimary" type="button" onClick={() => onRunNow?.()}>
            Run now
          </button>
        </div>
      </div>
    </div>
  );
}

```
  
# 3) Wire both into the Portal  
## A) Export  
```
/* src/ui/index.ts */
export { WalkthroughMode } from "./WalkthroughMode/WalkthroughMode";
export { SpineSpotlight } from "./SpineSpotlight/SpineSpotlight";

```
## B) Add Walkthrough + Spotlight inside PortalShell.tsx  
Inside your PortalShell.tsx imports:  
```
import { WalkthroughMode } from "../WalkthroughMode/WalkthroughMode";
import { SpineSpotlight } from "../SpineSpotlight/SpineSpotlight";

```
Add state inside PortalShell:  
```
const [spotOpen, setSpotOpen] = useState(false);
const [spotPillar, setSpotPillar] = useState<Pillar>("ER");

```
In your SpinePanel call, change onRunNow / onInstallWeek to also open spotlight when you click a node (optional but 🔥):  
```
const runFromAtlas = (pillar: Pillar, nodeId: string) => {
  setSpotPillar(pillar);
  setSpotOpen(true);
  // Optionally also deliver immediately:
  // deliver(mappedIntent);
  console.log("Atlas run:", pillar, nodeId);
};

```
Or, keep atlas clicks as-is and add a “Spotlight” button — your call.  
Now, drop **WalkthroughMode** near the top of the corridor stack (I like it above room panels in Individual lens, below in Pro/Org, but here’s simple):  
```
<WalkthroughMode lens={lens} onGoRoom={(r) => setRoom(r)} />

```
Finally, add **Spotlight overlay** at the end of the return:  
```
<SpineSpotlight
  open={spotOpen}
  pillar={spotPillar}
  onClose={() => setSpotOpen(false)}
  onRunNow={() => {
    // Run a move aligned to the pillar as a default:
    const intent: Intent =
      spotPillar === "SC" ? "connection" : spotPillar === "DM" ? "direction" : spotPillar === "CR" ? "clarity" : "anchor";
    deliver(intent);
    setSpotOpen(false);
  }}
/>

```
  
## What you’ve just created  
* A portal that can switch into **Keynote Mode** (scene → point → CTA)  
* A pillar spotlight that creates **instant “aha” moments** without lectures  
* A Spark that **auto-closes** (10–20s) so it stays *cinematic*, not sticky  
When you say “roll again”, I’ll add:  
* **Walkthrough “Presenter Mode”** (full-screen cinematic, hides rails, big typography, one CTA, keyboard arrows)  
* **Spine Spotlight → Trace Seal chain** (Spotlight “Run now” generates a Trace + triggers TraceTravel instantly)  
