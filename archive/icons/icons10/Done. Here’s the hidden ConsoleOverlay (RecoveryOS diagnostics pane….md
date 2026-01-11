Done. Here’s the **hidden ConsoleOverlay** (RecoveryOS diagnostics pane) that slides up from the keynote footer when you press ****.**** — and closes on **Esc**. It uses the **same console language** (cards, chips, signal strip) so it feels native, not bolted on.  
You’ll add **1 component + 1 CSS file + 6–10 lines in WalkthroughPresenter**.  
You’ll add **1 component + 1 CSS file + 6–10 lines in WalkthroughPresenter**.  
  
## 1) Add CSS for the overlay  
```
src/ui/console/overlay.css
.ro-overlay {
  position: fixed;
  inset: 0;
  z-index: 80;
  pointer-events: none;
}

.ro-overlay__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.35);
  opacity: 0;
  transition: opacity 220ms var(--ease-regulate, cubic-bezier(.2,.8,.2,1));
}

.ro-overlay__sheet {
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 18px;
  border-radius: 22px;
  border: 1px solid rgba(233,231,255,0.14);
  background: rgba(21,20,42,0.62);
  box-shadow: 0 30px 120px rgba(0,0,0,0.55);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  transform: translateY(18px);
  opacity: 0;
  transition:
    transform 260ms var(--ease-regulate, cubic-bezier(.2,.8,.2,1)),
    opacity 260ms var(--ease-regulate, cubic-bezier(.2,.8,.2,1));
  pointer-events: auto;
  overflow: hidden;
}

.ro-overlay__topbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 16px 16px 12px 16px;
  border-bottom: 1px solid rgba(233,231,255,0.10);
}

.ro-overlay__titleBlock {
  display: grid;
  gap: 6px;
}

.ro-overlay__kicker {
  font-size: 12px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  opacity: 0.72;
  display: inline-flex;
  gap: 8px;
  align-items: center;
}

.ro-overlay__title {
  margin: 0;
  font-family: "Plus Jakarta Sans", Inter, system-ui;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.15;
}

.ro-overlay__sub {
  margin: 0;
  font-size: 13px;
  opacity: 0.72;
}

.ro-overlay__close {
  border: 1px solid rgba(233,231,255,0.14);
  background: rgba(124,103,255,0.10);
  color: var(--ink-primary);
  border-radius: 999px;
  padding: 8px 10px;
  cursor: pointer;
}

.ro-overlay__close:focus-visible {
  outline: 2px solid rgba(64,224,208,0.65);
  outline-offset: 2px;
}

.ro-overlay__body {
  padding: 14px 16px 16px 16px;
  display: grid;
  gap: 14px;
}

.ro-overlay__grid {
  display: grid;
  gap: 14px;
}

@media (min-width: 900px) {
  .ro-overlay__sheet {
    left: 50%;
    right: auto;
    width: min(980px, calc(100vw - 48px));
    transform: translate(-50%, 18px);
  }
  .ro-overlay__grid {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}

/* OPEN STATE */
.ro-overlay[data-open="true"] .ro-overlay__backdrop {
  opacity: 1;
  pointer-events: auto;
}
.ro-overlay[data-open="true"] .ro-overlay__sheet {
  opacity: 1;
  transform: translateY(0);
}
@media (min-width: 900px) {
  .ro-overlay[data-open="true"] .ro-overlay__sheet {
    transform: translate(-50%, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ro-overlay__backdrop,
  .ro-overlay__sheet {
    transition: none;
  }
}

```
Make sure console.css + chips.css are already globally available (from the prior roll).  
  
## 2) Add the overlay component  
```
src/ui/console/ConsoleOverlay.tsx
import React, { useEffect, useMemo, useRef } from "react";
import { Icon } from "../icons";
import { ConsoleCard } from "./ConsoleCard";
import { SignalStrip, type SignalStripModel } from "./SignalStrip";
import { Chip } from "../chips/Chip";
import "./overlay.css";

function isTypingTarget(el: Element | null) {
  if (!el) return false;
  const tag = (el as HTMLElement).tagName?.toLowerCase();
  const editable = (el as HTMLElement).isContentEditable;
  return editable || tag === "input" || tag === "textarea" || tag === "select";
}

export function ConsoleOverlay(props: {
  open: boolean;
  onClose: () => void;

  // context from WalkthroughPresenter
  lens: "individual" | "professional" | "organisation";
  sceneId: string;
  sceneTitle: string;

  // optional: current signals
  signals?: SignalStripModel;

  // optional: trust rails state (display only)
  rails?: {
    consent: string;
    quiet: string;
    escalation: string;
    governance: string;
  };

  // optional: last route snapshot (display only)
  lastRoute?: {
    target?: string;
    primitive?: string;
    receipt?: string;
    stage?: "Routed" | "Delivered" | "Sealed" | "Reviewed";
  };
}) {
  const { open, onClose, lens, sceneId, sceneTitle } = props;

  const lastActiveRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const signals = props.signals ?? {
    readiness: { value: "steady" },
    window: { value: "medium" },
    cost: { value: "low" },
    drift: { value: "none" },
    trajectory: { value: "flat" },
    noise: { value: "clean" },
  };

  const windowBand = signals.window?.value ?? "medium";
  const density = windowBand === "narrow" ? "high" : windowBand === "wide" ? "low" : "mid";

  const rails = props.rails ?? {
    consent: "enforced",
    quiet: "active",
    escalation: "protocol-bound",
    governance: "visible",
  };

  const lastRoute = props.lastRoute ?? {
    target: "one move",
    primitive: "glance",
    receipt: "tiny",
    stage: "Routed",
  };

  const lensLabel =
    lens === "individual" ? "Individual" : lens === "professional" ? "Professional" : "Organisation";

  // Keyboard: '.' toggling is handled upstream in WalkthroughPresenter.
  // Here we only handle Esc and focus management.
  useEffect(() => {
    if (!open) return;

    lastActiveRef.current = document.activeElement as HTMLElement | null;

    // Focus close for accessibility
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      // restore focus
      lastActiveRef.current?.focus?.();
    };
  }, [open, onClose]);

  // Click backdrop closes
  const onBackdrop = () => onClose();

  return (
    <div className="ro-overlay" data-open={open ? "true" : "false"} aria-hidden={!open}>
      <div className="ro-overlay__backdrop" onMouseDown={onBackdrop} />

      <div
        className="ro-overlay__sheet"
        role="dialog"
        aria-modal="true"
        aria-label="RecoveryOS Console Overlay"
        data-window={windowBand}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="ro-overlay__topbar">
          <div className="ro-overlay__titleBlock">
            <div className="ro-overlay__kicker">
              <Icon name="orchestrate" size={16} tone="muted" />
              <span>Console Overlay</span>
              <span style={{ opacity: 0.5 }}>·</span>
              <span>{lensLabel} Lens</span>
            </div>

            <h3 className="ro-overlay__title">{sceneTitle}</h3>
            <p className="ro-overlay__sub">
              Scene ID: <span style={{ opacity: 0.9 }}>{sceneId}</span>
            </p>
          </div>

          <button ref={closeBtnRef} className="ro-overlay__close" onClick={onClose}>
            <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
              <Icon name="close" size={16} tone="muted" />
              Close
            </span>
          </button>
        </div>

        <div className="ro-overlay__body">
          {/* Strip first: instant “OS telemetry” */}
          <SignalStrip model={signals} />

          <div className="ro-overlay__grid">
            <ConsoleCard
              kicker="Now"
              icon="target"
              title="Current route snapshot"
              body="This is the last routed contract the system would stand behind: one target, one primitive, one receipt request."
              density={density}
              footer={
                <>
                  <Chip icon="statusRouted" label="Stage" meta={lastRoute.stage ?? "Routed"} />
                  <Chip icon="target" label="Target" meta={lastRoute.target ?? "one move"} />
                  <Chip icon="primitive" label="Primitive" meta={lastRoute.primitive ?? "glance"} />
                  <Chip icon="receipt" label="Receipt" meta={lastRoute.receipt ?? "tiny"} />
                </>
              }
            />

            <ConsoleCard
              kicker="Rails"
              icon="boundary"
              title="Trust rails (always on)"
              body="Trust is a system property. These rails are enforced at runtime—quietly, continuously."
              density={density}
              footer={
                <>
                  <Chip icon="consentMap" label="Consent" meta={rails.consent} />
                  <Chip icon="quietHours" label="Quiet" meta={rails.quiet} />
                  <Chip icon="protocol" label="Escalation" meta={rails.escalation} />
                  <Chip icon="statusGoverned" label="Governance" meta={rails.governance} />
                </>
              }
            />
          </div>

          <ConsoleCard
            kicker="Trace"
            icon="traceTravel"
            title="Trace travel preview"
            body="Same receipt. Three meanings. Toggle lens to see how the artifact refracts across altitude—without changing the underlying truth."
            density={density}
            footer={
              <>
                <Chip icon="lens" label="Lens" meta={lensLabel} />
                <Chip icon="altitude" label="Altitude" meta="mapped" />
                <Chip icon="integrityLog" label="Integrity" meta="sealed" />
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}

```
  
## 3) Wire the overlay toggle into WalkthroughPresenter  
You asked for: press . to open/close. We’ll also ignore keypress if the user is typing into an input/textarea/contenteditable.  
Inside WalkthroughPresenter.tsx:  
## A) Imports  
```
import React, { useEffect, useMemo, useState } from "react";
import { ConsoleOverlay } from "@/ui/console/ConsoleOverlay"; // adjust path

```
## B) State  
```
const [consoleOpen, setConsoleOpen] = useState(false);

```
## C) Key binding (add once)  
```
useEffect(() => {
  const onKey = (e: KeyboardEvent) => {
    // ignore modifiers + typing contexts
    const el = document.activeElement as HTMLElement | null;
    const tag = el?.tagName?.toLowerCase();
    const typing = el?.isContentEditable || tag === "input" || tag === "textarea" || tag === "select";
    if (typing) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    if (e.key === ".") {
      e.preventDefault();
      setConsoleOpen((v) => !v);
    }
  };

  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, []);

```
## D) Render the overlay (near root return)  
You already have current scene and lens. Use them:  
```
const scene = scenes[i]; // or however you reference current scene
const signals = SIGNALS_BY_SCENE[scene.id]; // from earlier mapping (or your own)

<ConsoleOverlay
  open={consoleOpen}
  onClose={() => setConsoleOpen(false)}
  lens={lens}                  // "individual" | "professional" | "organisation"
  sceneId={scene.id}
  sceneTitle={scene.title ?? scene.heading ?? "Keynote"}
  signals={signals}
  rails={{
    consent: "enforced",
    quiet: "active",
    escalation: "protocol-bound",
    governance: "visible",
  }}
  lastRoute={{
    target: "one move",
    primitive: "glance",
    receipt: "tiny",
    stage: "Routed",
  }}
/>

```
That’s the wiring.  
  
## 4) Make it feel “Apple-hidden” (optional, but very you)  
Add a tiny hint in your keynote footer (only on desktop):  
```
<div style={{ fontSize: 12, opacity: 0.45 }}>
  Press <span style={{ opacity: 0.8 }}>.</span> for Console
</div>

```
Or don’t. The best Apple stuff is discovered.  
  
## 5) What this unlocks immediately  
* A **diagnostics pane** that sells “OS, not app” without more copy  
* A place to demo:  
    * signal without noise  
    * governance without bureaucracy  
    * trace travel without explanation  
* A single overlay you can later reuse in **Portal Shell** as the “system drawer”  
  
If you want, next we can hook lastRoute to real runtime data from the keynote interactions (scene change, CTA click, lens toggle) so the overlay updates live. That’s a 10-line event model, and it’ll feel *insane*.  
If you want, next we can hook lastRoute to real runtime data from the keynote interactions (scene change, CTA click, lens toggle) so the overlay updates live. That’s a 10-line event model, and it’ll feel *insane*.  
