Rolling the **final keynote flex**:  
* **Autoplay** (scene advances on a cadence)  
* **Hold-to-pause** (Space held down pauses; hover pauses; resumes on release/leave)  
* **Live micro-demo** (CTA seals a “receipt” *inside the keynote*, with an OS pulse toast)  
Below are drop-in updates to your existing WalkthroughPresenter.tsx/.css.  
  
## 1) Update WalkthroughPresenter.css  
Append these at the bottom (or merge cleanly):  
```
/* ============================================================
   KEYNOTE AUTOPLAY + PROGRESS + DEMO TOAST
   ============================================================ */

.ro-presenter__foot {
  gap: 14px;
}

/* Progress bar (subtle, OS-grade) */
.ro-presenter__progress {
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 60px;
  height: 2px;
  border-radius: 999px;
  background: rgba(233,231,255,0.14);
  overflow: hidden;
}

[data-theme="light"] .ro-presenter__progress {
  background: rgba(42,41,66,0.12);
}

.ro-presenter__progressFill {
  height: 100%;
  width: var(--p, 0%);
  background: rgba(64,224,208,0.88);
  border-radius: 999px;
  box-shadow: 0 0 0 6px rgba(64,224,208,0.10);
  transition: width 80ms linear;
}

/* “Paused” hint */
.ro-presenter__paused {
  font-size: 12px;
  color: var(--ink-secondary);
  opacity: 0.9;
}

/* Demo toast (receipt pulse) */
.ro-presenter__toast {
  position: absolute;
  right: 18px;
  top: 64px;
  z-index: 3;
  width: min(360px, calc(100vw - 48px));
  border-radius: 18px;
  border: 1px solid rgba(233,231,255,0.18);
  background: rgba(21,20,42,0.80);
  box-shadow: var(--e2);
  overflow: hidden;
}

[data-theme="light"] .ro-presenter__toast {
  background: rgba(251,250,255,0.88);
  border-color: rgba(42,41,66,0.10);
}

.ro-presenter__toastGlow {
  position: absolute;
  inset: -120px;
  background:
    radial-gradient(420px 280px at 25% 30%, rgba(124,103,255,0.22), rgba(0,0,0,0)),
    radial-gradient(420px 280px at 85% 30%, rgba(64,224,208,0.16), rgba(0,0,0,0)),
    radial-gradient(420px 280px at 60% 85%, rgba(47,230,166,0.12), rgba(0,0,0,0));
  pointer-events: none;
}

.ro-presenter__toastBody {
  position: relative;
  z-index: 1;
  padding: 12px 12px 12px 12px;
  display: grid;
  gap: 8px;
}

.ro-presenter__toastTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.ro-presenter__toastPill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 12px;
  border: 1px solid var(--p-tint);
  background: var(--p-soft);
}

.ro-presenter__toastPill::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--p-base);
  box-shadow: 0 0 0 8px rgba(64,224,208,0.10);
}

.ro-presenter__toastSeal {
  font-size: 12px;
  color: var(--ink-secondary);
}

.ro-presenter__toastTitle {
  font-family: var(--font-heading);
  letter-spacing: var(--tracking-heading-tight);
  font-weight: 900;
  font-size: 13px;
}

.ro-presenter__toastLine {
  font-size: 13px;
  line-height: var(--lh-body);
  color: var(--ink-secondary);
}

/* Toast enter/exit */
.ro-presenter__toast {
  transform: translateY(-6px);
  opacity: 0;
  transition:
    transform calc(var(--dur-glide) * var(--motion-multiplier, 1)) var(--ease-regulate),
    opacity calc(var(--dur-glide) * var(--motion-multiplier, 1)) var(--ease-regulate);
}

.ro-presenter[data-toast="on"] .ro-presenter__toast {
  transform: translateY(0px);
  opacity: 1;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .ro-presenter__progressFill { transition: none; }
  .ro-presenter__toast { transition: none; }
}

```
  
## 2) Update WalkthroughPresenter.tsx  
This version adds:  
* autoplay interval + progress fill  
* pause on hover + hold Space  
* CTA triggers **demo seal** (toast) when a scene has a demo payload  
* still supports arrows/enter/esc  
```
/* src/ui/WalkthroughMode/WalkthroughPresenter.tsx */
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./WalkthroughPresenter.css";
import type { Lens, Room } from "../PortalShell/portalTypes";

import { HeroMedia } from "../HeroMedia/HeroMedia";
import { useAssets } from "../../lib/assets/useAssets";
import { useReducedMotion } from "../../lib/assets/useReducedMotion";
import { resolveHeroScene } from "../../lib/assets/resolve";
import { preload } from "../../lib/assets/preload";
import type { Pillar } from "../../lib/assets/types";
import { pillarStyle, PILLAR_NAMES } from "../tokens";

type DemoSeal = {
  pillar: Exclude<Pillar, "NONE">;
  title: string;
  line: string;
};

type Scene = {
  id: string; // hero asset id, e.g. "hero-scene-01"
  eyebrow: string;
  headline: string;
  line: string;
  cta: { label: string; goRoom?: Room }; // goRoom optional if CTA is demo-only
  demo?: DemoSeal; // if present, CTA seals a receipt live
};

export function WalkthroughPresenter(props: {
  open: boolean;
  lens: Lens;
  onClose: () => void;
  onGoRoom: (r: Room) => void;

  /** Optional hook: if you want the keynote demo to also add a trace into your site state */
  onDemoSeal?: (demo: DemoSeal) => void;

  /** Autoplay control */
  autoplay?: boolean;
  intervalMs?: number;
}) {
  const {
    open,
    lens,
    onClose,
    onGoRoom,
    onDemoSeal,
    autoplay = true,
    intervalMs = 5200,
  } = props;

  const [i, setI] = useState(0);

  // text transition state (kept from prior roll)
  const [tx, setTx] = useState<"in" | "out">("in");
  const txTimer = useRef<number | null>(null);

  // autoplay + progress
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const raf = useRef<number | null>(null);
  const tickStart = useRef<number>(0);

  // toast demo
  const [toast, setToast] = useState<DemoSeal | null>(null);
  const toastTimer = useRef<number | null>(null);

  const { manifest, theme, pillar } = useAssets();

  const scenes = useMemo<Scene[]>(() => {
    const isInd = lens === "individual";
    return [
      {
        id: "hero-scene-01",
        eyebrow: "RecoveryOS",
        headline: "Recovery that runs in real life.",
        line: isInd
          ? "A system you can return to — quietly — whenever you need it."
          : "Delivery, not content. The OS routes what works into the flow of life.",
        cta: {
          label: "Seal a receipt",
          goRoom: "moment",
        },
        demo: {
          pillar: "II",
          title: "Receipt sealed",
          line: "A tiny proof the brain trusts — stored quietly, ready to travel.",
        },
      },
      {
        id: "hero-scene-02",
        eyebrow: "Continuity",
        headline: "A feed with a spine.",
        line: isInd
          ? "No noise. No pressure. Just what helps."
          : "Rationale + cadence + what held + what’s next — clean signal.",
        cta: {
          label: "Run the system",
          goRoom: "orchestration",
        },
        demo: {
          pillar: "CR",
          title: "Routed → Delivered",
          line: "One move, right-sized — delivered into the flow.",
        },
      },
      {
        id: "hero-scene-03",
        eyebrow: "Trust",
        headline: "Safety as design.",
        line: isInd
          ? "Quiet by default. Consent-bound. Dignity first."
          : "Appropriate dose, auditable rails, human boundary when it matters.",
        cta: {
          label: "Prove the boundary",
          goRoom: "trust",
        },
        demo: {
          pillar: "ER",
          title: "Rail engaged",
          line: "The system tightens delivery — not your freedom.",
        },
      },
      {
        id: "hero-scene-04",
        eyebrow: "One OS",
        headline: "Three worlds. One truth.",
        line: isInd
          ? "One system that holds across real life."
          : "Same spine. Same receipt. Different altitude.",
        cta: {
          label: "Make it travel",
          goRoom: "threeWorlds",
        },
        demo: {
          pillar: "SC",
          title: "Trace travels",
          line: "Same receipt → identity reinforcement → clinical signal → defensible continuity.",
        },
      },
    ];
  }, [lens]);

  // Reset on open
  useEffect(() => {
    if (!open) return;
    setI(0);
    setTx("in");
    setPaused(false);
    setProgress(0);
    setToast(null);
  }, [open]);

  // Clean timers on unmount/close
  useEffect(() => {
    return () => {
      if (txTimer.current) window.clearTimeout(txTimer.current);
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  // Keyboard controls + hold space to pause
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Enter") runCTA();
      if (e.key === " ") setPaused(true); // hold-to-pause
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === " ") setPaused(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, i, scenes]);

  // Preload next scene poster/loop
  useEffect(() => {
    if (!open) return;
    const nextIndex = (i + 1) % scenes.length;
    const nextScene = scenes[nextIndex];

    const resolved = resolveHeroScene(manifest, nextScene.id, {
      lens,
      theme,
      pillar,
      reducedMotion,
    });

    const cleanups: Array<() => void> = [];
    if (resolved.posterSrc) cleanups.push(preload(resolved.posterSrc, "image"));
    if (!reducedMotion && resolved.videoSrc) cleanups.push(preload(resolved.videoSrc, "video"));

    return () => cleanups.forEach((fn) => fn());
  }, [open, i, scenes, manifest, lens, theme, pillar, reducedMotion]);

  function animateSwap(toIndex: number) {
    if (txTimer.current) window.clearTimeout(txTimer.current);
    setTx("out");
    txTimer.current = window.setTimeout(() => {
      setI(toIndex);
      setTx("in");
      // reset progress on scene change
      tickStart.current = performance.now();
      setProgress(0);
    }, 140);
  }

  function next() {
    animateSwap((i + 1) % scenes.length);
  }

  function prev() {
    animateSwap((i - 1 + scenes.length) % scenes.length);
  }

  function showToast(d: DemoSeal) {
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    setToast(d);
    // hide after short, keynote-grade time
    toastTimer.current = window.setTimeout(() => setToast(null), 1600);
  }

  function runCTA() {
    const s = scenes[i];

    // If scene defines a micro demo, run it LIVE (toast + optional external hook)
    if (s.demo) {
      showToast(s.demo);
      onDemoSeal?.(s.demo);
      return;
    }

    // Otherwise navigate
    if (s.cta.goRoom) onGoRoom(s.cta.goRoom);
  }

  // Autoplay engine + progress fill
  useEffect(() => {
    if (!open) return;
    if (!autoplay) return;
    if (reducedMotion) return; // respect reduced-motion by disabling autoplay

    // Initialize start time when scene (re)enters
    tickStart.current = performance.now();

    const loop = () => {
      const now = performance.now();
      const elapsed = now - tickStart.current;

      if (!paused) {
        const p = Math.min(1, elapsed / intervalMs);
        setProgress(p);

        if (p >= 1) {
          // advance
          tickStart.current = performance.now();
          animateSwap((i + 1) % scenes.length);
          return; // animateSwap will reset progress
        }
      }
      raf.current = requestAnimationFrame(loop);
    };

    raf.current = requestAnimationFrame(loop);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = null;
    };
  }, [open, autoplay, intervalMs, paused, i, reducedMotion]); // keep i in deps for proper advance

  if (!open) return null;
  const s = scenes[i];

  return (
    <div
      className="ro-presenter"
      data-tx={tx}
      data-toast={toast ? "on" : "off"}
      role="dialog"
      aria-modal="true"
      aria-label="Keynote presenter"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="ro-presenter__veil" onClick={onClose} aria-hidden="true" />

      <div className="ro-presenter__sheet">
        {/* Cinematic stage (assets) */}
        <div className="ro-presenter__stage" aria-hidden="true">
          <HeroMedia sceneId={s.id} priority="eager" overlay="none" />
          <div className="ro-presenter__readability" />
        </div>

        {/* Progress bar */}
        {!reducedMotion && autoplay ? (
          <div className="ro-presenter__progress" aria-hidden="true">
            <div
              className="ro-presenter__progressFill"
              style={{ ["--p" as any]: `${Math.round(progress * 100)}%` } as React.CSSProperties}
            />
          </div>
        ) : null}

        {/* Demo toast */}
        {toast ? (
          <div
            className="ro-presenter__toast pillar"
            data-pillar={toast.pillar}
            style={pillarStyle(toast.pillar as any)}
            aria-live="polite"
          >
            <div className="ro-presenter__toastGlow" aria-hidden="true" />
            <div className="ro-presenter__toastBody">
              <div className="ro-presenter__toastTop">
                <span className="ro-presenter__toastPill">{PILLAR_NAMES[toast.pillar as any]}</span>
                <span className="ro-presenter__toastSeal">SEALED</span>
              </div>
              <div className="ro-presenter__toastTitle">{toast.title}</div>
              <div className="ro-presenter__toastLine">{toast.line}</div>
            </div>
          </div>
        ) : null}

        <div className="ro-presenter__top">
          <div className="ro-presenter__brand">
            <div className="ro-presenter__brandName">RecoveryOS</div>
            <div className="ro-presenter__brandSub">
              Keynote Mode • ← → • Enter • Hold Space to pause
            </div>
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
          <div className="ro-presenter__dots" aria-label="Progress dots">
            {scenes.map((_, idx) => (
              <span key={idx} className={`ro-presenter__dot ${idx === i ? "is-on" : ""}`} />
            ))}
          </div>

          <div className="ro-presenter__ctaRow">
            <button className="ro-presenter__cta" type="button" onClick={prev}>
              Back
            </button>

            <button
              className="ro-presenter__cta ro-presenter__ctaPrimary"
              type="button"
              onClick={runCTA}
              title={s.demo ? "Seals a live receipt" : "Go"}
            >
              {s.cta.label}
            </button>

            <button className="ro-presenter__cta" type="button" onClick={next}>
              Next
            </button>
          </div>

          {!reducedMotion && autoplay ? (
            <div className="ro-presenter__paused" aria-hidden="true">
              {paused ? "Paused" : ""}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

```
## What changed in behavior (exactly)  
* **Autoplay** advances every intervalMs (default 5200ms)  
* **Hover pauses**; **holding Space pauses**; release resumes  
* CTA now **seals a receipt live** (toast) when scene.demo exists  
* Reduced motion automatically disables autoplay + video loops  
  
## 3) Wiring the “demo seal” into the rest of the site (optional, but 🔥)  
If you want that keynote toast to also create a real “Trace” in your home page rail / stream, pass onDemoSeal from your page:  
```
<WalkthroughPresenter
  open={presenterOpen}
  lens={lens}
  onClose={() => setPresenterOpen(false)}
  onGoRoom={(r) => { setPresenterOpen(false); setRoom(r); }}
  onDemoSeal={(demo) => {
    // hook into your site state: create a trace, trigger pulses, etc.
    // e.g. addTrace({ title: demo.title, pillar: demo.pillar, sealed: true, ... })
  }}
/>

```
  
If you want the *real keynote magic*, next roll is: **“Live demo drives the actual ContinuityStream + TraceTravel in the background while the keynote is still open.”** So people see: *seal → stream updates → receipt travels* without leaving the presenter.  
If you want the *real keynote magic*, next roll is: **“Live demo drives the actual ContinuityStream + TraceTravel in the background while the keynote is still open.”** So people see: *seal → stream updates → receipt travels* without leaving the presenter.  
