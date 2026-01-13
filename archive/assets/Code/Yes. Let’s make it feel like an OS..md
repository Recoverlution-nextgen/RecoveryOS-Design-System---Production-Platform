Yes. Let’s make it **feel like an OS**.  
You’ll get:  
* **Portal Transition**: open/close morph (sheet lift, glass, blur, parallax glow)  
* **Lens Morph**: flipping Individual → Professional → Organisation instantly changes density, rails, verbosity, chrome weight — *without duplicating UI*  
All paste-and-go.  
  
# 1) Portal Transition  
## A) Add these styles (append to src/ui/PortalShell/PortalShell.css)  
```
/* ============================================================
   PORTAL TRANSITION (OS sheet morph)
   ============================================================ */

.ro-portalStage {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: stretch;
}

/* Backdrop */
.ro-portalBackdrop {
  position: absolute;
  inset: 0;
  background: rgba(11,10,20,0.35);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  opacity: 0;
  transition: opacity calc(var(--dur-glide) * var(--motion-multiplier, 1)) var(--ease-regulate);
}

[data-theme="dark"] .ro-portalBackdrop {
  background: rgba(0,0,0,0.55);
}

/* The sheet */
.ro-portalSheet {
  position: relative;
  width: 100%;
  height: 100%;
  transform-origin: 50% 60%;
  transform: translate3d(0, 18px, 0) scale(0.985);
  opacity: 0;
  transition:
    transform calc(var(--dur-settle) * var(--motion-multiplier, 1)) var(--ease-regulate),
    opacity calc(var(--dur-glide) * var(--motion-multiplier, 1)) var(--ease-regulate);
}

/* Enter */
.ro-portalStage[data-state="enter"] .ro-portalBackdrop { opacity: 1; }
.ro-portalStage[data-state="enter"] .ro-portalSheet {
  transform: translate3d(0, 0px, 0) scale(1);
  opacity: 1;
}

/* Exit */
.ro-portalStage[data-state="exit"] .ro-portalBackdrop { opacity: 0; }
.ro-portalStage[data-state="exit"] .ro-portalSheet {
  transform: translate3d(0, 18px, 0) scale(0.985);
  opacity: 0;
}

/* Reduce motion */
@media (prefers-reduced-motion: reduce) {
  .ro-portalBackdrop,
  .ro-portalSheet { transition: none; }
}

```
  
## B) Add a tiny “presence” hook  
```
/* src/ui/PortalShell/usePresence.ts */
import { useEffect, useState } from "react";

export function usePresence(open: boolean, exitMs: number) {
  const [present, setPresent] = useState(open);
  const [state, setState] = useState<"enter" | "exit">(open ? "enter" : "exit");

  useEffect(() => {
    if (open) {
      setPresent(true);
      // next tick: ensure CSS transitions kick in
      requestAnimationFrame(() => setState("enter"));
      return;
    }
    // begin exit animation
    setState("exit");
    const t = window.setTimeout(() => setPresent(false), exitMs);
    return () => window.clearTimeout(t);
  }, [open, exitMs]);

  return { present, state };
}

```
  
## C) Wrap your Portal in the stage/backdrop/sheet  
Update your PortalShell.tsx like this (only structural changes shown — keep your existing logic inside the sheet):  
```
/* src/ui/PortalShell/PortalShell.tsx */
import React, { useEffect, useMemo, useState } from "react";
import "./PortalShell.css";
import { usePresence } from "./usePresence";

/* ...your existing imports... */

export function PortalShell(props: {
  open: boolean;
  onClose: () => void;
  initialLens?: Lens;
  initialRoom?: Room;
}) {
  const { open, onClose, initialLens = "individual", initialRoom = "moment" } = props;

  // presence handles exit animation while parent flips open=false
  const { present, state } = usePresence(open, 520);
  if (!present) return null;

  // optional: lock scroll while present
  useEffect(() => {
    document.documentElement.setAttribute("data-portal-open", "true");
    return () => document.documentElement.removeAttribute("data-portal-open");
  }, []);

  // ...your existing state + logic...
  const [lens, setLens] = useState<Lens>(initialLens);
  const [depth, setDepth] = useState<Depth>("glance");
  const [room, setRoom] = useState<Room>(initialRoom);

  // everything else stays the same…

  return (
    <div className="ro-portalStage" data-state={state} data-lens={lens}>
      <div className="ro-portalBackdrop" onClick={onClose} aria-hidden="true" />
      <div className="ro-portalSheet">
        {/* Your existing .ro-portal root goes here */}
        <div className="ro-portal" role="dialog" aria-modal="true" aria-label="RecoveryOS Portal">
          <div className="ro-portal__ambient" aria-hidden="true" />
          <div className="ro-portal__glass" aria-hidden="true" />

          {/* ...left / center / right exactly as before... */}
        </div>
      </div>
    </div>
  );
}

```
Tip: clicking backdrop closes. If you don’t want that, remove the onClick.  
  
# 2) Lens Morph (same UI, different gravity)  
Lens morph is **CSS-variable driven** so the UI changes shape/weight instantly — and nothing drifts.  
## A) Add these rules (append to PortalShell.css)  
```
/* ============================================================
   LENS MORPH (same UI, different gravity)
   ============================================================ */

.ro-portalStage[data-lens="individual"] {
  --lens-density: 1;
  --lens-copy: 1;
  --lens-rails: 0;
  --lens-mono: 0;
}

.ro-portalStage[data-lens="professional"] {
  --lens-density: 0.92;
  --lens-copy: 0.92;
  --lens-rails: 1;
  --lens-mono: 0;
}

.ro-portalStage[data-lens="organisation"] {
  --lens-density: 0.88;
  --lens-copy: 0.86;
  --lens-rails: 1;
  --lens-mono: 1;
}

/* Density affects paddings + gaps */
.ro-portalStage .ro-portal__chrome {
  padding: calc(14px * var(--lens-density)) calc(16px * var(--lens-density));
}
.ro-portalStage .ro-portal__main {
  padding: calc(18px * var(--lens-density)) calc(16px * var(--lens-density));
}
.ro-portalStage .ro-portal__footer {
  padding: calc(14px * var(--lens-density)) calc(16px * var(--lens-density));
}
.ro-portalStage .ro-portal__roomList {
  padding: calc(14px * var(--lens-density));
  gap: calc(8px * var(--lens-density));
}

/* Copy compression */
.ro-portalStage[data-lens="individual"] .ro-room__sub { display: none; } /* more calm */
.ro-portalStage[data-lens="organisation"] .ro-room__sub { display: block; } /* more context */

/* Rails visibility: hide right rail for Individual, keep for Pro/Org */
.ro-portalStage[data-lens="individual"] .ro-portal__right { display: none; }
.ro-portalStage[data-lens="individual"] .ro-portal { grid-template-columns: 340px 1fr; }
@media (max-width: 1100px) {
  .ro-portalStage[data-lens="individual"] .ro-portal { grid-template-columns: 1fr; }
}

/* Make organisation feel more "system-grade" */
.ro-portalStage[data-lens="organisation"] .ro-contract,
.ro-portalStage[data-lens="organisation"] .ro-travel__body,
.ro-portalStage[data-lens="organisation"] .ro-orchCard__body {
  font-family: var(--font-mono);
  letter-spacing: 0.01em;
}

/* Chrome weight morph */
.ro-portalStage[data-lens="individual"] .ro-portal__brandSub { opacity: 0.75; }
.ro-portalStage[data-lens="professional"] .ro-portal__brandSub { opacity: 0.9; }
.ro-portalStage[data-lens="organisation"] .ro-portal__brandSub { opacity: 1; }

/* Subtle lens transition */
.ro-portalStage .ro-portal,
.ro-portalStage .ro-portal__left,
.ro-portalStage .ro-portal__right {
  transition:
    background calc(var(--dur-glide) * var(--motion-multiplier, 1)) var(--ease-regulate),
    border-color calc(var(--dur-glide) * var(--motion-multiplier, 1)) var(--ease-regulate);
}

```
  
## B) Make LensControl *actually morph the system*  
You already store lens state. Now lens flip automatically changes:  
* Right rail visibility (CSS handles)  
* Verbosity (CSS hides some lines)  
* Tone (TraceTravel already changes content)  
* System “feel” (mono in org)  
No extra JS needed.  
  
# 3) Optional: “Lens Flip = Depth Suggestion”  
If you want it to feel even more “OS-smart”, add this tiny behaviour inside PortalShell.tsx:  
```
// When lens changes, nudge default depth (optional)
useEffect(() => {
  if (lens === "individual" && depth !== "glance") setDepth("glance");
  if (lens === "professional" && depth === "glance") setDepth("thread");
  if (lens === "organisation" && depth !== "thread" && depth !== "journey") setDepth("thread");
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [lens]);

```
  
# 4) Export the hook (if you want)  
```
/* src/ui/index.ts */
export { usePresence } from "./PortalShell/usePresence";

```
  
## What you’ll feel immediately  
* Portal opens like a **system sheet**, not a modal.  
* Lens flip changes **gravity**: calm → signal → integrity.  
* Same components. Same spine. Same OS. Different altitude.  
If you want the next “iOS keynote moment”: I’ll add a **Portal “Feature Walkthrough Mode”** (auto-advancing cinematic scenes with a single CTA each) and a **“Spine Spotlight”** interaction that dims everything except the selected pillar and shows a 10–20s spark inside the portal.  
