```
Rolling “Presenter Mode” + “Spotlight → Trace Seal → TraceTravel” chain.

You’ll add:
1) Walkthrough Presenter (full-screen, cinematic, keyboard arrows, one CTA)
2) Seal chain + micro-animations:
   - Spotlight “Run now” seals a trace
   - Artifact rail pulses the new trace
   - TraceTravel pulses instantly (identity receipt feel)

```
  
# 1) Walkthrough Presenter Mode (full-screen keynote)  
## A) Add files  
```
/src/ui/WalkthroughMode
  WalkthroughPresenter.tsx
  WalkthroughPresenter.css

```
## WalkthroughPresenter.css  
```
/* src/ui/WalkthroughMode/WalkthroughPresenter.css */
.ro-presenter {
  position: fixed;
  inset: 0;
  z-index: 140;
  display: grid;
  place-items: center;
}

.ro-presenter__veil {
  position: absolute;
  inset: 0;
  background: rgba(11,10,20,0.58);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.ro-presenter__sheet {
  width: min(980px, calc(100vw - 28px));
  height: min(620px, calc(100vh - 28px));
  border-radius: 28px;
  border: 1px solid rgba(233,231,255,0.18);
  background: rgba(21,20,42,0.86);
  box-shadow: var(--e2);
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

[data-theme="light"] .ro-presenter__sheet {
  background: rgba(251,250,255,0.90);
  border: 1px solid rgba(42,41,66,0.10);
}

.ro-presenter__glow {
  position: absolute;
  inset: -160px;
  background:
    radial-gradient(760px 520px at 20% 20%, rgba(124,103,255,0.24), rgba(0,0,0,0)),
    radial-gradient(700px 520px at 85% 30%, rgba(64,224,208,0.16), rgba(0,0,0,0)),
    radial-gradient(700px 520px at 60% 85%, rgba(47,230,166,0.12), rgba(0,0,0,0));
  pointer-events: none;
  opacity: 0.95;
}

.ro-presenter__top {
  position: relative;
  z-index: 1;
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

.ro-presenter__brand {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.ro-presenter__brandName {
  font-family: var(--font-heading);
  letter-spacing: var(--tracking-heading-tight);
  font-weight: 900;
  font-size: 14px;
  color: var(--ink-primary);
}

.ro-presenter__brandSub {
  font-size: 12px;
  color: var(--ink-secondary);
}

.ro-presenter__btn {
  border: 1px solid rgba(233,231,255,0.18);
  background: rgba(233,231,255,0.10);
  color: var(--ink-primary);
  border-radius: 999px;
  padding: 10px 12px;
  cursor: pointer;
}

[data-theme="light"] .ro-presenter__btn {
  border: 1px solid rgba(42,41,66,0.12);
  background: rgba(233,231,255,0.45);
}

.ro-presenter__btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px var(--focus-ring-subtle);
  border-color: var(--focus-ring);
}

.ro-presenter__main {
  position: relative;
  z-index: 1;
  padding: 22px 22px 6px;
  display: grid;
  align-content: center;
  gap: 14px;
}

.ro-presenter__eyebrow {
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-secondary);
}

.ro-presenter__headline {
  font-family: var(--font-heading);
  letter-spacing: var(--tracking-heading-tight);
  font-weight: 950;
  font-size: clamp(28px, 3.6vw, 46px);
  line-height: 1.05;
  color: var(--ink-primary);
}

.ro-presenter__line {
  font-size: clamp(14px, 1.4vw, 16px);
  line-height: 1.55;
  color: var(--ink-secondary);
  max-width: 62ch;
}

.ro-presenter__foot {
  position: relative;
  z-index: 1;
  padding: 14px 20px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  border-top: 1px solid rgba(233,231,255,0.12);
}

[data-theme="light"] .ro-presenter__foot {
  border-top: 1px solid rgba(42,41,66,0.10);
}

.ro-presenter__dots {
  display: flex;
  gap: 8px;
}

.ro-presenter__dot {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: rgba(124,103,255,0.24);
  border: 1px solid rgba(124,103,255,0.18);
}

.ro-presenter__dot.is-on {
  background: var(--c-cyan-500);
  border-color: rgba(64,224,208,0.55);
  box-shadow: 0 0 0 7px rgba(64,224,208,0.10);
}

.ro-presenter__ctaRow {
  display: flex;
  gap: 10px;
  align-items: center;
}

.ro-presenter__cta {
  border: 1px solid rgba(233,231,255,0.18);
  background: rgba(233,231,255,0.10);
  color: var(--ink-primary);
  border-radius: 999px;
  padding: 10px 12px;
  cursor: pointer;
}

.ro-presenter__ctaPrimary {
  background: var(--return-surface);
  color: var(--return-ink);
  border-color: rgba(233,231,255,0.22);
}

.ro-presenter__ctaPrimary:hover { background: var(--return-surface-hover); }

@media (prefers-reduced-motion: reduce) {
  .ro-presenter__dot.is-on { box-shadow: none; }
}

```
## WalkthroughPresenter.tsx  
```
/* src/ui/WalkthroughMode/WalkthroughPresenter.tsx */
import React, { useEffect, useMemo, useState } from "react";
import "./WalkthroughPresenter.css";
import type { Lens, Room } from "../PortalShell/portalTypes";

type Scene = {
  id: string;
  eyebrow: string;
  headline: string;
  line: string;
  cta: { label: string; goRoom: Room };
};

export function WalkthroughPresenter(props: {
  open: boolean;
  lens: Lens;
  onClose: () => void;
  onGoRoom: (r: Room) => void;
}) {
  const { open, lens, onClose, onGoRoom } = props;
  const [i, setI] = useState(0);

  const scenes = useMemo<Scene[]>(() => {
    const isInd = lens === "individual";
    return [
      {
        id: "p1",
        eyebrow: "RecoveryOS",
        headline: "Recovery that runs in real life.",
        line: isInd
          ? "A system you can return to — quietly — whenever you need it."
          : "Delivery, not content. The OS routes what works into the flow of life.",
        cta: { label: "Run a Moment", goRoom: "moment" },
      },
      {
        id: "p2",
        eyebrow: "Continuity",
        headline: "A feed with a spine.",
        line: isInd
          ? "No noise. No pressure. Just what helps."
          : "Rationale + cadence + what held + what’s next — clean signal.",
        cta: { label: "See Orchestration", goRoom: "orchestration" },
      },
      {
        id: "p3",
        eyebrow: "Proof",
        headline: "Receipts that update identity.",
        line: isInd
          ? "Believable proof. Not performance."
          : "Same trace travels: identity reinforcement → clinical signal → defensible continuity.",
        cta: { label: "Open Trust & Rails", goRoom: "trust" },
      },
      {
        id: "p4",
        eyebrow: "Spine",
        headline: "Depth without drowning.",
        line: isInd
          ? "Explore. Click. Run now. Install a week."
          : "Stable pillars. Controlled expansion. Scale without drift.",
        cta: { label: "Explore the Spine", goRoom: "spine" },
      },
    ];
  }, [lens]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((x) => (x + 1) % scenes.length);
      if (e.key === "ArrowLeft") setI((x) => (x - 1 + scenes.length) % scenes.length);
      if (e.key === "Enter") onGoRoom(scenes[i].cta.goRoom);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onGoRoom, scenes, i]);

  useEffect(() => {
    if (!open) return;
    setI(0);
  }, [open]);

  if (!open) return null;
  const s = scenes[i];

  return (
    <div className="ro-presenter" role="dialog" aria-modal="true" aria-label="Keynote presenter">
      <div className="ro-presenter__veil" onClick={onClose} aria-hidden="true" />
      <div className="ro-presenter__sheet">
        <div className="ro-presenter__glow" aria-hidden="true" />

        <div className="ro-presenter__top">
          <div className="ro-presenter__brand">
            <div className="ro-presenter__brandName">RecoveryOS</div>
            <div className="ro-presenter__brandSub">Keynote Mode • ← → • Enter • Esc</div>
          </div>

          <button className="ro-presenter__btn" type="button" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="ro-presenter__main">
          <div className="ro-presenter__eyebrow">{s.eyebrow}</div>
          <div className="ro-presenter__headline">{s.headline}</div>
          <div className="ro-presenter__line">{s.line}</div>
        </div>

        <div className="ro-presenter__foot">
          <div className="ro-presenter__dots" aria-label="Progress">
            {scenes.map((_, idx) => (
              <span key={idx} className={`ro-presenter__dot ${idx === i ? "is-on" : ""}`} />
            ))}
          </div>

          <div className="ro-presenter__ctaRow">
            <button className="ro-presenter__cta" type="button" onClick={() => setI((x) => (x - 1 + scenes.length) % scenes.length)}>
              Back
            </button>
            <button className="ro-presenter__cta ro-presenter__ctaPrimary" type="button" onClick={() => onGoRoom(s.cta.goRoom)}>
              {s.cta.label}
            </button>
            <button className="ro-presenter__cta" type="button" onClick={() => setI((x) => (x + 1) % scenes.length)}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

```
  
# 2) Spotlight → Trace Seal → TraceTravel (instant chain + pulse)  
We’ll add:  
* lastSealId state in PortalShell  
* a quick pulse on the newest TraceTile + TraceTravelCard  
## A) Update TraceTile to support “highlight”  
## TraceTile.css (append)  
```
/* src/ui/TraceTile/TraceTile.css (append) */
.ro-trace.is-new {
  box-shadow:
    0 0 0 5px rgba(64,224,208,0.14),
    var(--e2);
  border-color: rgba(64,224,208,0.45);
}

.ro-trace.is-new .ro-trace__sealDot {
  box-shadow: 0 0 0 10px rgba(64,224,208,0.14);
}

```
## TraceTile.tsx (small edit)  
```
/* src/ui/TraceTile/TraceTile.tsx (edit) */
export function TraceTile(props: {
  title: string;
  body?: string;
  sealed?: boolean;
  pillar?: Pillar;
  timestamp?: string;
  onOpen?: () => void;
  highlight?: boolean;              // <-- add
}) {
  const { title, body, sealed = true, pillar, timestamp, onOpen, highlight = false } = props;

  return (
    <article
      className={`ro-trace ${sealed ? "is-sealed" : "is-draft"} ${highlight ? "is-new" : ""}`}
      /* ...rest unchanged... */

```
  
## B) Update TraceTravelCard to support “highlight”  
## TraceTravelCard.css (append)  
```
/* src/ui/TraceTravelCard/TraceTravelCard.css (append) */
.ro-travel.is-new {
  box-shadow:
    0 0 0 5px rgba(124,103,255,0.14),
    var(--e2);
  border-color: rgba(124,103,255,0.35);
}

```
## TraceTravelCard.tsx (small edit)  
```
/* src/ui/TraceTravelCard/TraceTravelCard.tsx (edit) */
export function TraceTravelCard(props: {
  title: string;
  subtitle: string;
  body: string;
  badges: string[];
  dot?: string;
  highlight?: boolean;            // <-- add
}) {
  const { title, subtitle, body, badges, dot = "var(--c-cyan-500)", highlight = false } = props;

  return (
    <section
      className={`ro-travel ${highlight ? "is-new" : ""}`}
      /* ...rest unchanged... */

```
  
## C) PortalShell: track lastSealId + pulse it  
In PortalShell.tsx, add state:  
```
const [lastSealId, setLastSealId] = useState<string | null>(null);

```
Then update your deliver() function to capture the new trace id and pulse it:  
```
const deliver = (intent: Intent) => {
  const c = routeMock(room, intent);
  setContract(c);

  const t = traceFromContract(c);                 // <- keep local
  setTraces((prev) => [t, ...prev].slice(0, 12));

  setLastSealId(t.id);                            // <- pulse
  window.setTimeout(() => setLastSealId(null), 900);
};

```
Now, when you render **TraceTravelCard**, pass highlight if the latest trace is the last sealed:  
```
{travel && latestTrace && (
  <TraceTravelCard
    title={travel.title}
    subtitle={travel.subtitle}
    body={travel.body}
    badges={travel.badges}
    dot={lens === "individual" ? "var(--c-purple-500)" : lens === "professional" ? "var(--c-cyan-500)" : "var(--c-neutral-700)"}
    highlight={latestTrace.id === lastSealId}
  />
)}

```
And in the **artifact rail**, highlight the new tile:  
```
{traces.map((t) => (
  <TraceTile
    key={t.id}
    title={t.title}
    body={t.body}
    sealed={t.sealed}
    pillar={t.pillar}
    timestamp={t.timestamp}
    highlight={t.id === lastSealId}
    onOpen={() => console.log("open trace", t.id)}
  />
))}

```
  
## D) Make Spotlight “Run now” chain into a real seal  
Your Spotlight already calls deliver(intent) — that’s the seal.  
To make it feel “OS-smart”, also snap to the right room/tempo:  
Inside the Spotlight onRunNow handler in PortalShell.tsx:  
Inside the Spotlight onRunNow handler in PortalShell.tsx:  
```
<SpineSpotlight
  open={spotOpen}
  pillar={spotPillar}
  onClose={() => setSpotOpen(false)}
  onRunNow={() => {
    const intent: Intent =
      spotPillar === "SC" ? "connection" : spotPillar === "DM" ? "direction" : spotPillar === "CR" ? "clarity" : "anchor";

    setRoom("moment");       // <- makes it feel intentional
    deliver(intent);         // <- seals trace + pulses rail + pulses travel
    setSpotOpen(false);
  }}
/>

```
  
# 3) Wire Presenter Mode into PortalShell (one button, full-screen)  
## A) Export Presenter  
```
/* src/ui/index.ts */
export { WalkthroughPresenter } from "./WalkthroughMode/WalkthroughPresenter";

```
## B) Add to PortalShell imports  
```
import { WalkthroughPresenter } from "../WalkthroughMode/WalkthroughPresenter";

```
## C) Add state + button in chrome  
Add state:  
```
const [presenterOpen, setPresenterOpen] = useState(false);

```
Add a button in .ro-portal__chromeRight:  
```
<button className="ro-portal__btn" type="button" onClick={() => setPresenterOpen(true)}>
  Keynote
</button>

```
Add overlay near the end of PortalShell render (inside the portal stage, after the portal DOM is fine):  
```
<WalkthroughPresenter
  open={presenterOpen}
  lens={lens}
  onClose={() => setPresenterOpen(false)}
  onGoRoom={(r) => {
    setPresenterOpen(false);
    setRoom(r);
  }}
/>

```
  
## What’s now “keynote-grade”  
* You can hit **Keynote** and it becomes a *presentation*, not a web page.  
* Spotlight “Run now” becomes a **sealed receipt** with an OS-style pulse:  
    * the rail lights up,  
    * TraceTravel lights up,  
    * identity feels updated, not “told”.  
If you want the *final* flex: I’ll add **Presenter “Scene Actions”** that actually *runs* a demo trace live on stage (so the keynote shows the system sealing proof in real time).  
