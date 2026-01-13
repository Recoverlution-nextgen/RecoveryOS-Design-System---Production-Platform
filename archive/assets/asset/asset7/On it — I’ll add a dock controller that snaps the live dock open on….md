On it — I’ll add a dock controller that snaps the live dock open on first demo, auto-collapses after a few seconds, and emits clean OS-style system messages (“Receipt sealed”, “Continuity updated”, “Trace traveled”) tied to the continuity stages.  
Perfect. Here’s **Dock Snap + System Messages** — keynote-grade, OS-calm.  
You’ll get:  
* Dock **snaps open** on first demo action  
* Dock **auto-collapses** after inactivity (but stays “armed”)  
* **System messages** (toast-style) fire by stage:  
    * Routed → “Routed.”  
    * Delivered → “Delivered.”  
    * Sealed → “Receipt sealed.”  
    * Reviewed → “Review ready.”  
    * Plus: “Trace traveled.”  
All without adding noise.  
  
## 0) Files touched  
```
/src/ui/KeynoteLiveDock
  KeynoteLiveDock.tsx   (update)
  KeynoteLiveDock.css   (update)
  SystemMessage.tsx     (new)
  SystemMessage.css     (new)

/src/ui/WalkthroughMode
  WalkthroughPresenter.tsx (update)
  WalkthroughPresenter.css (tiny update)

```
  
## 1) Add SystemMessage component  
```
SystemMessage.tsx
// src/ui/KeynoteLiveDock/SystemMessage.tsx
import React from "react";
import "./SystemMessage.css";

export type SystemMsg = {
  id: string;
  text: string;
};

export function SystemMessage(props: {
  msg: SystemMsg | null;
  onDismiss?: () => void;
}) {
  const { msg, onDismiss } = props;
  if (!msg) return null;

  return (
    <div className="ro-sysmsg" role="status" aria-live="polite">
      <div className="ro-sysmsg__glow" aria-hidden="true" />
      <div className="ro-sysmsg__row">
        <span className="ro-sysmsg__dot" aria-hidden="true" />
        <span className="ro-sysmsg__text">{msg.text}</span>
        <button className="ro-sysmsg__x" type="button" onClick={onDismiss} aria-label="Dismiss">
          ×
        </button>
      </div>
    </div>
  );
}
SystemMessage.css
/* src/ui/KeynoteLiveDock/SystemMessage.css */

.ro-sysmsg {
  position: absolute;
  left: 18px;
  top: 64px;
  z-index: 5;

  width: min(320px, calc(100vw - 52px));
  border-radius: 999px;
  border: 1px solid rgba(233,231,255,0.18);
  background: rgba(21,20,42,0.80);
  box-shadow: var(--e2);
  overflow: hidden;

  transform: translateY(-6px);
  opacity: 0;
  animation: roSysIn calc(var(--dur-glide) * var(--motion-multiplier, 1)) var(--ease-regulate) forwards;
}

[data-theme="light"] .ro-sysmsg {
  background: rgba(251,250,255,0.90);
  border-color: rgba(42,41,66,0.10);
}

@keyframes roSysIn {
  to { transform: translateY(0); opacity: 1; }
}

.ro-sysmsg__glow {
  position: absolute;
  inset: -120px;
  background:
    radial-gradient(420px 280px at 25% 30%, rgba(124,103,255,0.20), rgba(0,0,0,0)),
    radial-gradient(420px 280px at 85% 30%, rgba(64,224,208,0.14), rgba(0,0,0,0)),
    radial-gradient(420px 280px at 60% 85%, rgba(47,230,166,0.10), rgba(0,0,0,0));
  pointer-events: none;
}

.ro-sysmsg__row {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 12px 1fr 28px;
  align-items: center;
  gap: 10px;
  padding: 10px 10px 10px 12px;
}

.ro-sysmsg__dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--c-cyan-500);
  box-shadow: 0 0 0 9px rgba(64,224,208,0.10);
}

.ro-sysmsg__text {
  font-size: 13px;
  color: var(--ink-primary);
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ro-sysmsg__x {
  border: 1px solid rgba(233,231,255,0.18);
  background: rgba(233,231,255,0.08);
  color: var(--ink-primary);
  border-radius: 999px;
  width: 26px;
  height: 26px;
  cursor: pointer;
}

[data-theme="light"] .ro-sysmsg__x {
  border-color: rgba(42,41,66,0.10);
  background: rgba(233,231,255,0.45);
}

.ro-sysmsg__x:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px var(--focus-ring-subtle);
  border-color: var(--focus-ring);
}

@media (prefers-reduced-motion: reduce) {
  .ro-sysmsg { animation: none; transform: none; opacity: 1; }
}

```
  
## 2) Update the dock to support “snap open / collapse”  
## Update KeynoteLiveDock.tsx  
Replace the component signature and wrapper logic with this version (same inner content as before, but now controlled by mode + armed):  
```
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
  travel: {
    individual: string;
    professional: string;
    organisation: string;
  };
};

export function KeynoteLiveDock(props: {
  state: LiveDemoState | null;
  mode: "closed" | "peek" | "open";
  armed?: boolean; // stays true after first open
  onToggle?: () => void;
}) {
  const { state, mode, armed = false, onToggle } = props;

  // If nothing armed and no state, show nothing.
  if (!armed && !state?.on) return null;

  const isOpen = mode === "open";
  const isPeek = mode === "peek";

  // In peek mode, show minimal shell even if state exists.
  const showBody = isOpen && !!state?.on;

  return (
    <aside
      className={`ro-liveDock ${isOpen ? "is-open" : isPeek ? "is-peek" : "is-closed"} ${state?.on ? "is-on" : ""} pillar`}
      data-pillar={state?.pillar ?? "NONE"}
      style={state?.pillar ? pillarStyle(state.pillar as any) : undefined}
      aria-label="Live system preview"
    >
      <div className="ro-liveDock__glow" aria-hidden="true" />

      {/* Header always visible (peek/open) */}
      <div className="ro-liveDock__top" onClick={onToggle} role="button" tabIndex={0}>
        <span className="ro-liveDock__pill">
          {state?.pillar ? PILLAR_NAMES[state.pillar as any] : "RecoveryOS"}
        </span>
        <span className="ro-liveDock__tiny">{state?.on ? "LIVE" : "READY"}</span>
      </div>

      {/* Body only when open + state */}
      {showBody ? (
        <>
          <div className="ro-liveDock__receipt">
            <div className="ro-liveDock__sealRow">
              <span className="ro-liveDock__sealDot" aria-hidden="true" />
              <span className="ro-liveDock__sealText">Receipt</span>
              <span className="ro-liveDock__time">{formatTime(state.timestampISO)}</span>
            </div>
            <div className="ro-liveDock__title">{state.traceTitle}</div>
            <div className="ro-liveDock__line">{state.traceLine}</div>
          </div>

          <div className="ro-liveDock__sectionTitle">Continuity</div>
          <div className="ro-liveDock__timeline" aria-label="Continuity stages">
            {(["ROUTED", "DELIVERED", "SEALED", "REVIEWED"] as ContinuityStage[]).map((s, idx) => {
              const idxNow = stageIndex(state.stage);
              return (
                <div key={s} className={`ro-liveDock__step ${idx <= idxNow ? "is-on" : ""} ${idx === idxNow ? "is-now" : ""}`}>
                  <span className="ro-liveDock__stepDot" />
                  <span className="ro-liveDock__stepLabel">{labelStage(s)}</span>
                </div>
              );
            })}
            <div className="ro-liveDock__rail" aria-hidden="true" />
          </div>

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
        </>
      ) : null}
    </aside>
  );
}

function stageIndex(s: ContinuityStage) {
  if (s === "ROUTED") return 0;
  if (s === "DELIVERED") return 1;
  if (s === "SEALED") return 2;
  return 3;
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

```
## Update KeynoteLiveDock.css for snap/collapse  
Append these at the bottom:  
```
/* ============================================================
   SNAP OPEN / PEEK / CLOSED STATES
   ============================================================ */

.ro-liveDock {
  transform-origin: bottom right;
  transition:
    transform calc(var(--dur-glide) * var(--motion-multiplier, 1)) var(--ease-regulate),
    opacity calc(var(--dur-glide) * var(--motion-multiplier, 1)) var(--ease-regulate),
    filter calc(var(--dur-glide) * var(--motion-multiplier, 1)) var(--ease-regulate);
}

.ro-liveDock.is-closed {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
  pointer-events: none;
}

.ro-liveDock.is-peek {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: saturate(1.02);
}

.ro-liveDock.is-open {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.ro-liveDock.is-peek .ro-liveDock__receipt,
.ro-liveDock.is-peek .ro-liveDock__sectionTitle,
.ro-liveDock.is-peek .ro-liveDock__timeline,
.ro-liveDock.is-peek .ro-liveDock__travel {
  display: none;
}

/* Make header feel clickable */
.ro-liveDock__top {
  cursor: pointer;
  user-select: none;
}

```
  
## 3) Presenter: add a dock controller + stage-based messages  
We’ll implement:  
* dockMode: "closed" | "peek" | "open"  
* armed: boolean (once true, dock can peek even if not currently on)  
* collapseTimer: auto-collapse after inactivity  
* systemMsg: a single message that replaces/augments your old toast  
## A) In WalkthroughPresenter.tsx imports  
Add:  
```
import { SystemMessage, type SystemMsg } from "../KeynoteLiveDock/SystemMessage";

```
(You already import KeynoteLiveDock.)  
## B) Add state + timers  
Inside component:  
```
const [dockMode, setDockMode] = useState<"closed" | "peek" | "open">("closed");
const [dockArmed, setDockArmed] = useState(false);
const collapseTimer = useRef<number | null>(null);

const [sys, setSys] = useState<SystemMsg | null>(null);
const sysTimer = useRef<number | null>(null);

```
## C) Helpers: message + collapse scheduling  
Add inside component:  
```
function showSystem(text: string) {
  if (sysTimer.current) window.clearTimeout(sysTimer.current);
  const msg = { id: `${Date.now()}`, text };
  setSys(msg);
  sysTimer.current = window.setTimeout(() => setSys(null), 1500);
}

function scheduleCollapse(ms = 3600) {
  if (collapseTimer.current) window.clearTimeout(collapseTimer.current);
  collapseTimer.current = window.setTimeout(() => {
    setDockMode("peek");
  }, ms);
}

function snapOpen() {
  setDockArmed(true);
  setDockMode("open");
  scheduleCollapse();
}

function toggleDock() {
  setDockArmed(true);
  setDockMode((m) => (m === "open" ? "peek" : "open"));
  scheduleCollapse();
}

```
Also add cleanup in your existing effect cleanup (or in the cleanup effect you already have):  
```
if (collapseTimer.current) window.clearTimeout(collapseTimer.current);
if (sysTimer.current) window.clearTimeout(sysTimer.current);

```
## D) Modify runCTA() to snap dock + emit messages by stage  
Replace your existing runCTA() demo block with this:  
```
if (s.demo) {
  const now = new Date().toISOString();

  // Snap dock open on first action
  snapOpen();

  setLive((prev) => {
    const prevStage = prev?.stage ?? "ROUTED";
    const nextStage = prev ? advance(prevStage) : "ROUTED";

    // Stage-based system messages (quiet, OS-style)
    if (nextStage === "ROUTED") showSystem("Routed.");
    if (nextStage === "DELIVERED") showSystem("Delivered.");
    if (nextStage === "SEALED") showSystem("Receipt sealed.");
    if (nextStage === "REVIEWED") showSystem("Review ready.");
    // Travel message (always, but only once per click)
    showSystem("Trace traveled.");

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

  onDemoSeal?.(s.demo);
  return;
}

```
Note: This emits two messages back-to-back; if you want only one, keep only the stage message OR the travel message. If you want both, stagger them (I can roll stagger timing). For “quiet Apple,” I recommend **one message per click**. If so: keep stage message and drop “Trace traveled” unless stage is SEALED/REVIEWED.  
Here’s the **one-message-per-click** version (recommended):  
Here’s the **one-message-per-click** version (recommended):  
```
const msg =
  nextStage === "ROUTED" ? "Routed." :
  nextStage === "DELIVERED" ? "Delivered." :
  nextStage === "SEALED" ? "Receipt sealed." :
  "Review ready.";
showSystem(msg);

```
## E) Render SystemMessage + Dock (inside presenter)  
In the presenter JSX, inside .ro-presenter__sheet, render:  
```
<SystemMessage msg={sys} onDismiss={() => setSys(null)} />

<KeynoteLiveDock
  state={live}
  mode={dockMode}
  armed={dockArmed}
  onToggle={toggleDock}
/>

```
  
## 4) Tiny presenter CSS tweak (dock + message harmony)  
In WalkthroughPresenter.css, ensure the dock and message aren’t hidden by other z-index layers. If you have a stage overlay, keep it lower than z=4/5 (we already did).  
If needed, add:  
```
.ro-presenter__sheet { isolation: isolate; }

```
This keeps stacking clean.  
  
## 5) Result (behavior summary)  
* First demo click:  
    * dock **snaps open**  
    * message appears (e.g., “Receipt sealed.”)  
    * dock remains open for ~3.6s then collapses to **peek**  
* Subsequent demo clicks:  
    * dock re-opens (if peek)  
    * message updates stage  
* User can click dock header to toggle open/peek  
It feels like an OS: subtle, immediate, undeniable.  
  
If you want the absolute final polish: I’ll roll **staggered messages** (single queue, no overlaps) + a micro **haptic-like animation** (tiny scale + blur pulse) when “Receipt sealed.” lands.  
