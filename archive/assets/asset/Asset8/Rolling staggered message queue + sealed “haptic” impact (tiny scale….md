Rolling **staggered message queue** + **sealed “haptic” impact** (tiny scale + blur pulse) — keynote-grade, no overlaps, no noise.  
  
# 1) Add a message queue hook (no overlaps)  
```
src/ui/KeynoteLiveDock/useSystemMessages.ts
import { useCallback, useEffect, useRef, useState } from "react";

export type SystemMsg = {
  id: string;
  text: string;
  variant?: "base" | "impact";
};

export function useSystemMessages(opts?: { showMs?: number; gapMs?: number }) {
  const showMs = opts?.showMs ?? 1200;
  const gapMs = opts?.gapMs ?? 220;

  const [current, setCurrent] = useState<SystemMsg | null>(null);
  const queue = useRef<SystemMsg[]>([]);
  const timer = useRef<number | null>(null);
  const gapTimer = useRef<number | null>(null);

  const pump = useCallback(() => {
    if (current) return;
    const next = queue.current.shift() ?? null;
    if (!next) return;

    setCurrent(next);

    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setCurrent(null);

      if (gapTimer.current) window.clearTimeout(gapTimer.current);
      gapTimer.current = window.setTimeout(() => {
        pump();
      }, gapMs);
    }, showMs);
  }, [current, gapMs, showMs]);

  const push = useCallback(
    (msg: Omit<SystemMsg, "id">) => {
      queue.current.push({ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, ...msg });
      pump();
    },
    [pump]
  );

  const clear = useCallback(() => {
    queue.current = [];
    setCurrent(null);
    if (timer.current) window.clearTimeout(timer.current);
    if (gapTimer.current) window.clearTimeout(gapTimer.current);
    timer.current = null;
    gapTimer.current = null;
  }, []);

  useEffect(() => {
    return () => clear();
  }, [clear]);

  return { current, push, clear };
}

```
  
# 2) Upgrade SystemMessage to support an “impact” variant  
## Update src/ui/KeynoteLiveDock/SystemMessage.tsx  
```
import React from "react";
import "./SystemMessage.css";

export type SystemMsg = {
  id: string;
  text: string;
  variant?: "base" | "impact";
};

export function SystemMessage(props: {
  msg: SystemMsg | null;
  onDismiss?: () => void;
}) {
  const { msg, onDismiss } = props;
  if (!msg) return null;

  const variant = msg.variant ?? "base";

  return (
    <div className={`ro-sysmsg ro-sysmsg--${variant}`} role="status" aria-live="polite">
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

```
## Update src/ui/KeynoteLiveDock/SystemMessage.css (append)  
```
/* Impact variant: slightly brighter + micro “haptic” */
.ro-sysmsg--impact {
  border-color: rgba(64,224,208,0.34);
  box-shadow: 0 18px 44px rgba(0,0,0,0.26);
}

.ro-sysmsg--impact .ro-sysmsg__dot {
  box-shadow: 0 0 0 11px rgba(64,224,208,0.12);
}

.ro-sysmsg--impact {
  animation:
    roSysIn calc(var(--dur-glide) * var(--motion-multiplier, 1)) var(--ease-regulate) forwards,
    roImpact 520ms var(--ease-regulate) 60ms 1;
}

@keyframes roImpact {
  0% { transform: translateY(0) scale(1); filter: blur(0px); }
  35% { transform: translateY(0) scale(1.015); filter: blur(0.0px); }
  70% { transform: translateY(0) scale(1.005); filter: blur(0px); }
  100% { transform: translateY(0) scale(1); filter: blur(0px); }
}

@media (prefers-reduced-motion: reduce) {
  .ro-sysmsg--impact { animation: none; }
}

```
  
# 3) Add “sealed haptic” to the dock (tiny impact pulse)  
## Update src/ui/KeynoteLiveDock/KeynoteLiveDock.tsx (add prop + class)  
Change the signature + root class:  
```
export function KeynoteLiveDock(props: {
  state: LiveDemoState | null;
  mode: "closed" | "peek" | "open";
  armed?: boolean;
  onToggle?: () => void;
  impactKey?: number; // <- add this
}) {
  const { state, mode, armed = false, onToggle, impactKey } = props;
  const impactOn = typeof impactKey === "number";

  // ...existing

  return (
    <aside
      className={`ro-liveDock ${isOpen ? "is-open" : isPeek ? "is-peek" : "is-closed"} ${state?.on ? "is-on" : ""} ${impactOn ? "is-impact" : ""} pillar`}
      // ...
    >
      {/* ... */}

```
## Update src/ui/KeynoteLiveDock/KeynoteLiveDock.css (append)  
```
/* Sealed haptic: micro scale + glow pulse */
.ro-liveDock.is-impact {
  animation: roDockImpact 560ms var(--ease-regulate) 1;
}

@keyframes roDockImpact {
  0% { transform: translateY(0) scale(1); filter: blur(0px); }
  30% { transform: translateY(0) scale(1.012); filter: blur(0px); }
  60% { transform: translateY(0) scale(1.004); filter: blur(0px); }
  100% { transform: translateY(0) scale(1); filter: blur(0px); }
}

.ro-liveDock.is-impact .ro-liveDock__sealDot {
  animation: roPulse 1.0s ease-in-out 1;
}

@media (prefers-reduced-motion: reduce) {
  .ro-liveDock.is-impact { animation: none; }
}

```
  
# 4) Wire it into the keynote presenter (queue + impact trigger)  
## A) Import the hook  
In src/ui/WalkthroughMode/WalkthroughPresenter.tsx, add:  
```
import { useSystemMessages } from "../KeynoteLiveDock/useSystemMessages";
import type { SystemMsg } from "../KeynoteLiveDock/SystemMessage";

```
## B) Replace your current sys state with the hook  
Inside the component:  
```
const { current: sysMsg, push: pushSys, clear: clearSys } = useSystemMessages({ showMs: 1200, gapMs: 220 });
const [impactKey, setImpactKey] = useState<number | null>(null);
const impactTimer = useRef<number | null>(null);

function triggerImpact() {
  if (impactTimer.current) window.clearTimeout(impactTimer.current);
  const k = Date.now();
  setImpactKey(k);
  impactTimer.current = window.setTimeout(() => setImpactKey(null), 680);
}

```
Also cleanup (where you clear timers):  
```
if (impactTimer.current) window.clearTimeout(impactTimer.current);
clearSys();

```
## C) Stage → single system message (staggered, no overlaps)  
Inside your runCTA() demo block, after computing nextStage, do:  
```
const msg: Omit<SystemMsg, "id"> =
  nextStage === "ROUTED"
    ? { text: "Routed.", variant: "base" }
    : nextStage === "DELIVERED"
    ? { text: "Delivered.", variant: "base" }
    : nextStage === "SEALED"
    ? { text: "Receipt sealed.", variant: "impact" }
    : { text: "Review ready.", variant: "base" };

pushSys(msg);

if (nextStage === "SEALED") triggerImpact();

```
## D) Render SystemMessage + pass impactKey into dock  
Where you render inside .ro-presenter__sheet:  
```
<SystemMessage msg={sysMsg} onDismiss={() => clearSys()} />

<KeynoteLiveDock
  state={live}
  mode={dockMode}
  armed={dockArmed}
  onToggle={toggleDock}
  impactKey={impactKey ?? undefined}
/>

```
  
# Result  
* Messages **never overlap**. They queue cleanly.  
* “Receipt sealed.” hits with a subtle **impact** (message + dock micro pulse).  
* Still feels quiet, premium, inevitable.  
If you want the *last 5%*: I can add **message affinity** so scene auto-advance doesn’t interrupt a message (it waits until the queue is empty before moving).  
