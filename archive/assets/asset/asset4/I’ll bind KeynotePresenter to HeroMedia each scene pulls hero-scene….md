I’ll bind KeynotePresenter to HeroMedia: each scene pulls hero-scene-0X, preloads the next poster/loop, honors reduced-motion, and keeps the single-CTA scene transitions feeling OS-smooth.  
Absolutely — here’s **KeynotePresenter asset binding**: it uses HeroMedia per scene, preloads the next scene’s poster/loop, honors reduced motion, and keeps transitions calm + OS-smooth.  
Absolutely — here’s **KeynotePresenter asset binding**: it uses HeroMedia per scene, preloads the next scene’s poster/loop, honors reduced motion, and keeps transitions calm + OS-smooth.  
  
## 0) Files touched  
```
/src/ui/WalkthroughMode
  WalkthroughPresenter.tsx   (update)
  WalkthroughPresenter.css   (update)

```
(Assumes you already have HeroMedia, AssetProvider, resolver, manifest.)  
  
## 1) Update WalkthroughPresenter.css (hero media integration)  
Append / merge these rules into your existing presenter CSS (this replaces any older background glow-only approach).  
```
/* --- Presenter now uses HeroMedia as the stage --- */

.ro-presenter__sheet {
  /* keep your existing sizing/radius/shadows */
  position: relative;
}

/* Make stage fill the sheet */
.ro-presenter__stage {
  position: absolute;
  inset: 0;
  border-radius: 28px;
  overflow: hidden;
}

/* Content sits above media */
.ro-presenter__top,
.ro-presenter__main,
.ro-presenter__foot {
  position: relative;
  z-index: 2;
}

/* Subtle readability glaze (Apple keynote trick) */
.ro-presenter__readability {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    radial-gradient(900px 600px at 20% 30%, rgba(11,10,20,0.40), rgba(0,0,0,0)),
    radial-gradient(900px 600px at 70% 70%, rgba(11,10,20,0.38), rgba(0,0,0,0)),
    linear-gradient(180deg, rgba(11,10,20,0.38), rgba(11,10,20,0.18));
  pointer-events: none;
}

[data-theme="light"] .ro-presenter__readability {
  background:
    radial-gradient(900px 600px at 20% 30%, rgba(251,250,255,0.55), rgba(0,0,0,0)),
    radial-gradient(900px 600px at 70% 70%, rgba(251,250,255,0.48), rgba(0,0,0,0)),
    linear-gradient(180deg, rgba(251,250,255,0.55), rgba(251,250,255,0.22));
}

/* Scene transition: crossfade text gently */
.ro-presenter__main {
  transition: opacity calc(var(--dur-glide) * var(--motion-multiplier, 1)) var(--ease-regulate),
              transform calc(var(--dur-glide) * var(--motion-multiplier, 1)) var(--ease-regulate);
}

.ro-presenter[data-tx="out"] .ro-presenter__main {
  opacity: 0;
  transform: translateY(4px);
}

.ro-presenter[data-tx="in"] .ro-presenter__main {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .ro-presenter__main { transition: none; }
}

```
  
## 2) Update WalkthroughPresenter.tsx (bind scenes → assets + preload next)  
This version:  
* Uses HeroMedia with scene IDs: hero-scene-01..04  
* Preloads next scene’s poster (and loop when allowed)  
* Keyboard arrows / Enter / Esc  
* Keeps 1 CTA per scene  
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

type Scene = {
  id: string;         // hero asset id, e.g. "hero-scene-01"
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

  // Simple text transition state
  const [tx, setTx] = useState<"in" | "out">("in");
  const txTimer = useRef<number | null>(null);

  const reducedMotion = useReducedMotion();
  const { manifest, theme, pillar } = useAssets(); // lens comes from props, but provider lens may match

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
        cta: { label: "Run a Moment", goRoom: "moment" },
      },
      {
        id: "hero-scene-02",
        eyebrow: "Continuity",
        headline: "A feed with a spine.",
        line: isInd
          ? "No noise. No pressure. Just what helps."
          : "Rationale + cadence + what held + what’s next — clean signal.",
        cta: { label: "See Orchestration", goRoom: "orchestration" },
      },
      {
        id: "hero-scene-03",
        eyebrow: "Proof",
        headline: "Receipts that update identity.",
        line: isInd
          ? "Believable proof. Not performance."
          : "Same trace travels: identity reinforcement → clinical signal → defensible continuity.",
        cta: { label: "Open Trust & Rails", goRoom: "trust" },
      },
      {
        id: "hero-scene-04",
        eyebrow: "One OS",
        headline: "Three worlds. One truth.",
        line: isInd
          ? "One system that holds across real life."
          : "Same spine. Same receipt. Different altitude.",
        cta: { label: "Three Worlds", goRoom: "threeWorlds" },
      },
    ];
  }, [lens]);

  // Reset index when opening
  useEffect(() => {
    if (!open) return;
    setI(0);
    setTx("in");
  }, [open]);

  // Keyboard controls
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Enter") onGoRoom(scenes[i].cta.goRoom);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, i, scenes, onClose, onGoRoom]);

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
    // fade out quickly, swap index, fade in
    setTx("out");
    txTimer.current = window.setTimeout(() => {
      setI(toIndex);
      setTx("in");
    }, 140);
  }

  function next() {
    const to = (i + 1) % scenes.length;
    animateSwap(to);
  }

  function prev() {
    const to = (i - 1 + scenes.length) % scenes.length;
    animateSwap(to);
  }

  if (!open) return null;
  const s = scenes[i];

  return (
    <div className="ro-presenter" data-tx={tx} role="dialog" aria-modal="true" aria-label="Keynote presenter">
      <div className="ro-presenter__veil" onClick={onClose} aria-hidden="true" />

      <div className="ro-presenter__sheet">
        {/* Cinematic stage (assets) */}
        <div className="ro-presenter__stage" aria-hidden="true">
          <HeroMedia sceneId={s.id} priority="eager" overlay="none" />
          <div className="ro-presenter__readability" />
        </div>

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
            <button className="ro-presenter__cta" type="button" onClick={prev}>
              Back
            </button>
            <button className="ro-presenter__cta ro-presenter__ctaPrimary" type="button" onClick={() => onGoRoom(s.cta.goRoom)}>
              {s.cta.label}
            </button>
            <button className="ro-presenter__cta" type="button" onClick={next}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

```
  
## 3) One tiny integration note  
Because WalkthroughPresenter now calls useAssets(), make sure the site/page is wrapped in:  
```
<AssetProvider lens={lens} theme={theme}>
  {/* pages */}
</AssetProvider>

```
So it can access manifest, theme, pillar.  
  
## 4) Optional: scene-specific pillar tint (if you want it)  
If you want each scene to lean into a pillar field (without changing copy), add pillar per scene and pass it down to HeroMedia via a temporary provider override OR simply set a data-pillar attribute and let CSS shift readability overlay. Keep it subtle.  
  
If you want the *final keynote flex*: I’ll add **autoplay with “hold to pause”** (spacebar pauses, or hovering pauses), plus an **on-scene CTA micro-demo** that seals a trace live while the keynote is on screen.  
