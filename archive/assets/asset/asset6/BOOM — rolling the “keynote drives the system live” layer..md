BOOM — rolling the **“keynote drives the system live”** layer.  
This makes the presenter feel like an Apple demo where the OS is *actually running* behind the story:  
* Click CTA in the keynote  
* **Continuity updates** (Routed → Delivered → Sealed → Reviewed)  
* **Receipt appears** (Trace)  
* **Receipt travels** (same thing, three meanings)  
* All **without leaving** the presenter  
  
# 0) Add files  
```
/src/ui/KeynoteLiveDock
  KeynoteLiveDock.tsx
  KeynoteLiveDock.css

```
And we’ll update:  
```
/src/ui/WalkthroughMode/WalkthroughPresenter.tsx
/src/ui/WalkthroughMode/WalkthroughPresenter.css

```
  
# 1) KeynoteLiveDock (the live system preview)  
```
KeynoteLiveDock.tsx
// src/ui/KeynoteLiveDock/KeynoteLiveDock.tsx
import React from "react";
import "./KeynoteLiveDock.css";

import { pillarStyle, PILLAR_NAMES } from "../tokens";
import type { Pillar } from "../../lib/assets/types";

export type ContinuityStage = "ROUTED" | "DELIVERED" | "SEALED" | "REVIEWED";

export type LiveDemoState = {
  on: boolean;
  pillar: Exclude<Pillar, "NONE">;
  stage: ContinuityStage;
  traceTitle: string;
  traceLine: string;
  timestampISO: string;
  // “travel” meanings (same receipt, three altitudes)
  travel: {
    individual: string;
    professional: string;
    organisation: string;
  };
};

export function KeynoteLiveDock(props: {
  state: LiveDemoState | null;
}) {
  const { state } = props;
  if (!state?.on) return null;

  const stageIdx = stageIndex(state.stage);

  return (
    <aside
      className="ro-liveDock pillar"
      data-pillar={state.pillar}
      style={pillarStyle(state.pillar as any)}
      aria-label="Live system preview"
    >
      <div className="ro-liveDock__glow" aria-hidden="true" />

      {/* Top row */}
      <div className="ro-liveDock__top">
        <span className="ro-liveDock__pill">{PILLAR_NAMES[state.pillar as any]}</span>
        <span className="ro-liveDock__tiny">LIVE</span>
      </div>

      {/* Receipt */}
      <div className="ro-liveDock__receipt">
        <div className="ro-liveDock__sealRow">
          <span className="ro-liveDock__sealDot" aria-hidden="true" />
          <span className="ro-liveDock__sealText">Receipt</span>
          <span className="ro-liveDock__time">{formatTime(state.timestampISO)}</span>
        </div>
        <div className="ro-liveDock__title">{state.traceTitle}</div>
        <div className="ro-liveDock__line">{state.traceLine}</div>
      </div>

      {/* Continuity */}
      <div className="ro-liveDock__sectionTitle">Continuity</div>
      <div className="ro-liveDock__timeline" aria-label="Continuity stages">
        {(["ROUTED", "DELIVERED", "SEALED", "REVIEWED"] as ContinuityStage[]).map((s, idx) => (
          <div key={s} className={`ro-liveDock__step ${idx <= stageIdx ? "is-on" : ""} ${idx === stageIdx ? "is-now" : ""}`}>
            <span className="ro-liveDock__stepDot" />
            <span className="ro-liveDock__stepLabel">{labelStage(s)}</span>
          </div>
        ))}
        <div className="ro-liveDock__rail" aria-hidden="true" />
      </div>

      {/* Travel */}
      <div className="ro-liveDock__sectionTitle">Trace travel</div>
      <div className="ro-liveDock__travel" aria-label="Trace travel">
        <div className="ro-liveDock__travelRow">
          <span className="ro-liveDock__travelTag">Individual</span>
          <span className="ro-liveDock__travelText">{state.travel.individual}</span>
        </div>
        <div className="ro-liveDock__travelRow">
          <span className="ro-liveDock__travelTag">Professional</span>
          <span className="ro-liveDock__travelText">{state.travel.professional}</span>
        </div>
        <div className="ro-liveDock__travelRow">
          <span className="ro-liveDock__travelTag">Organisation</span>
          <span className="ro-liveDock__travelText">{state.travel.organisation}</span>
        </div>
      </div>
    </aside>
  );
}

function stageIndex(s: ContinuityStage) {
  if (s === "ROUTED") return 0;
  if (s === "DELIVERED") return 1;
  if (s === "SEALED") return 2;
  return 3; // REVIEWED
}

function labelStage(s: ContinuityStage) {
  if (s === "ROUTED") return "Routed";
  if (s === "DELIVERED") return "Delivered";
  if (s === "SEALED") return "Sealed";
  return "Reviewed";
}

function formatTime(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}
KeynoteLiveDock.css
/* src/ui/KeynoteLiveDock/KeynoteLiveDock.css */

.ro-liveDock {
  position: absolute;
  right: 18px;
  bottom: 18px;
  z-index: 4;

  width: min(420px, calc(100vw - 52px));
  border-radius: 22px;
  border: 1px solid rgba(233,231,255,0.18);
  background: rgba(21,20,42,0.78);
  box-shadow: var(--e2);
  overflow: hidden;
  padding: 12px;
}

[data-theme="light"] .ro-liveDock {
  background: rgba(251,250,255,0.88);
  border-color: rgba(42,41,66,0.10);
}

.ro-liveDock__glow {
  position: absolute;
  inset: -140px;
  background:
    radial-gradient(520px 380px at 18% 18%, rgba(124,103,255,0.18), rgba(0,0,0,0)),
    radial-gradient(520px 380px at 88% 30%, rgba(64,224,208,0.14), rgba(0,0,0,0)),
    radial-gradient(520px 380px at 55% 88%, rgba(47,230,166,0.10), rgba(0,0,0,0));
  pointer-events: none;
}

.ro-liveDock__top {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.ro-liveDock__pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 12px;
  border: 1px solid var(--p-tint);
  background: var(--p-soft);
}

.ro-liveDock__pill::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--p-base);
  box-shadow: 0 0 0 9px rgba(64,224,208,0.10);
}

.ro-liveDock__tiny {
  font-size: 12px;
  color: var(--ink-secondary);
  letter-spacing: 0.12em;
}

.ro-liveDock__receipt {
  position: relative;
  z-index: 1;
  margin-top: 10px;
  border-radius: 18px;
  border: 1px solid rgba(233,231,255,0.14);
  background: rgba(233,231,255,0.08);
  padding: 10px;
}

[data-theme="light"] .ro-liveDock__receipt {
  background: rgba(233,231,255,0.38);
  border-color: rgba(42,41,66,0.10);
}

.ro-liveDock__sealRow {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ro-liveDock__sealDot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--c-cyan-500);
  box-shadow: 0 0 0 10px rgba(64,224,208,0.10);
  animation: roPulse 1.2s ease-in-out 1;
}

@keyframes roPulse {
  0% { box-shadow: 0 0 0 4px rgba(64,224,208,0.08); }
  60% { box-shadow: 0 0 0 12px rgba(64,224,208,0.14); }
  100% { box-shadow: 0 0 0 10px rgba(64,224,208,0.10); }
}

.ro-liveDock__sealText {
  font-size: 12px;
  color: var(--ink-secondary);
}

.ro-liveDock__time {
  margin-left: auto;
  font-size: 12px;
  color: var(--ink-secondary);
}

.ro-liveDock__title {
  margin-top: 8px;
  font-family: var(--font-heading);
  letter-spacing: var(--tracking-heading-tight);
  font-weight: 900;
  font-size: 13px;
  color: var(--ink-primary);
}

.ro-liveDock__line {
  margin-top: 6px;
  font-size: 13px;
  color: var(--ink-secondary);
  line-height: var(--lh-body);
}

.ro-liveDock__sectionTitle {
  position: relative;
  z-index: 1;
  margin-top: 10px;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-secondary);
}

/* Continuity timeline */
.ro-liveDock__timeline {
  position: relative;
  z-index: 1;
  margin-top: 8px;
  padding: 8px 10px;
  border-radius: 18px;
  border: 1px solid rgba(233,231,255,0.14);
  background: rgba(233,231,255,0.06);
}

[data-theme="light"] .ro-liveDock__timeline {
  background: rgba(233,231,255,0.30);
  border-color: rgba(42,41,66,0.10);
}

.ro-liveDock__rail {
  position: absolute;
  left: 18px;
  right: 18px;
  top: 50%;
  height: 2px;
  border-radius: 999px;
  background: rgba(233,231,255,0.12);
  transform: translateY(-50%);
  pointer-events: none;
}

.ro-liveDock__step {
  display: grid;
  grid-template-columns: 14px 1fr;
  align-items: center;
  gap: 10px;
  padding: 5px 0;
  position: relative;
}

.ro-liveDock__stepDot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: rgba(124,103,255,0.28);
  border: 1px solid rgba(124,103,255,0.18);
}

.ro-liveDock__stepLabel {
  font-size: 13px;
  color: var(--ink-secondary);
}

.ro-liveDock__step.is-on .ro-liveDock__stepDot {
  background: var(--c-cyan-500);
  border-color: rgba(64,224,208,0.55);
}

.ro-liveDock__step.is-on .ro-liveDock__stepLabel {
  color: var(--ink-primary);
}

.ro-liveDock__step.is-now .ro-liveDock__stepDot {
  box-shadow: 0 0 0 10px rgba(64,224,208,0.10);
}

/* Trace travel */
.ro-liveDock__travel {
  position: relative;
  z-index: 1;
  margin-top: 8px;
  padding: 10px;
  border-radius: 18px;
  border: 1px solid rgba(233,231,255,0.14);
  background: rgba(233,231,255,0.06);
  display: grid;
  gap: 8px;
}

[data-theme="light"] .ro-liveDock__travel {
  background: rgba(233,231,255,0.30);
  border-color: rgba(42,41,66,0.10);
}

.ro-liveDock__travelRow {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 10px;
  align-items: baseline;
}

.ro-liveDock__travelTag {
  font-size: 12px;
  color: var(--ink-secondary);
  border: 1px solid rgba(233,231,255,0.14);
  background: rgba(233,231,255,0.06);
  border-radius: 999px;
  padding: 5px 8px;
  width: fit-content;
}

[data-theme="light"] .ro-liveDock__travelTag {
  background: rgba(233,231,255,0.35);
  border-color: rgba(42,41,66,0.10);
}

.ro-liveDock__travelText {
  font-size: 13px;
  color: var(--ink-secondary);
  line-height: var(--lh-body);
}

/* Mobile safety */
@media (max-width: 520px) {
  .ro-liveDock {
    right: 10px;
    bottom: 10px;
  }
  .ro-liveDock__travelRow {
    grid-template-columns: 1fr;
  }
}

```
  
# 2) Presenter integration (runs behind the keynote)  
Now we wire this dock into the keynote so each CTA **updates continuity + receipt + travel** live.  
## Update WalkthroughPresenter.tsx (add state + render dock)  
## A) Import the dock  
Add at top:  
```
import { KeynoteLiveDock, type LiveDemoState, type ContinuityStage } from "../KeynoteLiveDock/KeynoteLiveDock";

```
## B) Add live demo state  
Inside the component, add:  
```
const [live, setLive] = useState<LiveDemoState | null>(null);

```
## C) Add a helper to “advance continuity”  
Add this helper function inside the component:  
```
function advance(stage: ContinuityStage): ContinuityStage {
  if (stage === "ROUTED") return "DELIVERED";
  if (stage === "DELIVERED") return "SEALED";
  if (stage === "SEALED") return "REVIEWED";
  return "REVIEWED";
}

```
## D) Replace / update your runCTA() to drive LIVE state  
Find your runCTA() and replace it with this version:  
```
function runCTA() {
  const s = scenes[i];

  // If scene defines a micro demo, run it LIVE (receipt + continuity + travel)
  if (s.demo) {
    const now = new Date().toISOString();

    setLive((prev) => {
      const prevStage = prev?.stage ?? "ROUTED";
      // Each click moves the system forward one notch
      const nextStage = prev ? advance(prevStage) : "ROUTED";

      return {
        on: true,
        pillar: s.demo!.pillar,
        stage: nextStage,
        traceTitle: s.demo!.title,
        traceLine: s.demo!.line,
        timestampISO: now,
        travel: {
          individual: "Identity reinforcement (I do this now).",
          professional: "Clean signal (what held under pressure).",
          organisation: "Defensible continuity (auditable integrity)."
        }
      };
    });

    // Optional: also tell your outer app to create a real trace
    onDemoSeal?.(s.demo);
    // Keep the toast you already have (if you kept it) — or remove it now
    showToast(s.demo);

    return;
  }

  // Otherwise navigate
  if (s.cta.goRoom) onGoRoom(s.cta.goRoom);
}

```
## E) Render the dock inside the presenter sheet  
Inside the JSX for .ro-presenter__sheet, **add this right before the closing </div> of the sheet**:  
```
<KeynoteLiveDock state={live} />

```
That’s it. Now the keynote is *actually* driving a mini ContinuityStream + TraceTravel preview in real time.  
  
# 3) Tiny CSS hook (make room for dock)  
If the dock overlaps your footer on small screens, add this:  
```
/* Give the footer breathing room when live dock is on */
.ro-presenter[data-toast="on"] .ro-presenter__foot,
.ro-presenter .ro-presenter__foot {
  padding-bottom: 18px;
}

```
(If you want it perfect, we can conditionally add a data-live="on" attribute and pad only then.)  
  
# 4) Why this is the right “Apple move”  
Because it turns the keynote into **proof**:  
* the keynote isn’t explaining the OS  
* it’s **running** it  
* quietly  
* with receipts  
* with continuity  
* with travel across altitudes  
That’s exactly the “holy shit” moment Apple always engineers.  
  
## Next roll (if you want it even more keynote)  
I can make the dock:  
* **snap open only on first demo click**  
* **auto-collapse after 4 seconds**  
* show a one-line “system message” like iOS (but ours):  
    * “Receipt sealed.”  
    * “Continuity updated.”  
    * “Trace traveled.”  
Say: **“roll dock snap + system messages.”**  
