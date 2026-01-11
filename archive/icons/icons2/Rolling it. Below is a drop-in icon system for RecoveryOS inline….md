Rolling it. Below is a **drop-in icon system** for RecoveryOS: **inline SVG**, **token-driven**, **Apple-calm**, built for **16/20/24/32** sizes, with tones + pillar inheritance.  
  
## 0) Add these files  
```
src/ui/icons/
  Icon.tsx
  glyphs.tsx
  icon.css
  index.ts

```
  
## 1) src/ui/icons/icon.css  
```
.ro-icon {
  display: inline-block;
  vertical-align: middle;
  color: var(--ink-primary);
}

.ro-icon svg {
  display: block;
}

.ro-icon--muted { color: var(--ink-secondary); }
.ro-icon--ink { color: var(--ink-primary); }
.ro-icon--cyan { color: var(--c-cyan-500); }
.ro-icon--purple { color: var(--c-purple-500); }

/* Pillar tone: inherits from pillar tokens if parent sets --p-base */
.ro-icon--pillar { color: var(--p-base, var(--c-purple-500)); }

/* For tiny status dots */
.ro-icon--live { color: var(--c-cyan-500); }

/* Optional: impact pulse (for "seal" moments) */
.ro-icon--pulse {
  animation: roIconPulse 520ms var(--ease-regulate, cubic-bezier(.2,.8,.2,1)) 1;
}
@keyframes roIconPulse {
  0% { transform: scale(1); filter: blur(0); }
  35% { transform: scale(1.03); filter: blur(0); }
  100% { transform: scale(1); filter: blur(0); }
}

@media (prefers-reduced-motion: reduce) {
  .ro-icon--pulse { animation: none; }
}

```
  
## 2) src/ui/icons/glyphs.tsx  
All glyphs are **geometry-first**, no brains/hearts/shields, and they’re readable at 16px.  
```
import React from "react";

export type IconName =
  // Core
  | "spine"
  | "lens"
  | "altitude"
  | "trace"
  | "receipt"
  // Loop / system behavior
  | "sense"
  | "route"
  | "deliver"
  | "seal"
  | "review"
  | "continuity"
  | "orchestrate"
  // Trust
  | "consentMap"
  | "quietHours"
  | "escalation"
  | "governance"
  | "integrityLog"
  // Utility
  | "play"
  | "pause"
  | "next"
  | "back"
  | "close"
  | "info"
  | "external"
  | "chevronDown"
  // Pillars
  | "pillarER"
  | "pillarSR"
  | "pillarSC"
  | "pillarCR"
  | "pillarII"
  | "pillarDM";

type GlyphProps = {
  sw: number; // strokeWidth
  r: number;  // corner radius helper (not required)
};

export const GLYPHS: Record<IconName, (p: GlyphProps) => React.ReactNode> = {
  // =========================
  // CORE
  // =========================
  spine: ({ sw }) => (
    <>
      <path d="M12 4v16" fill="none" />
      <circle cx="12" cy="6.5" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="12" cy="17.5" r="1.6" />
      <path d="M12 6.5h6" fill="none" opacity=".55" />
      <path d="M12 12h6" fill="none" opacity=".35" />
      <path d="M12 17.5h6" fill="none" opacity=".25" />
    </>
  ),

  lens: ({ sw }) => (
    <>
      <circle cx="12" cy="12" r="7.5" fill="none" />
      <circle cx="12" cy="12" r="3.2" fill="none" opacity=".6" />
      <path d="M16.8 7.2l2.2-2.2" fill="none" opacity=".55" />
      <circle cx="19.2" cy="4.8" r="1" fill="currentColor" opacity=".9" />
    </>
  ),

  altitude: ({ sw }) => (
    <>
      <path d="M5 7h14" fill="none" />
      <path d="M7 12h12" fill="none" opacity=".75" />
      <path d="M9 17h10" fill="none" opacity=".55" />
      <circle cx="5" cy="7" r="1.4" />
    </>
  ),

  trace: ({ sw }) => (
    <>
      <path
        d="M5 16c2.6-6 6.2-2.2 8.2-6.8 1.1-2.6 3-3.2 5.8-2.2"
        fill="none"
        strokeDasharray="3.2 3.2"
      />
      <circle cx="5" cy="16" r="1.4" />
      <circle cx="19" cy="7" r="1.4" opacity=".8" />
    </>
  ),

  receipt: ({ sw }) => (
    <>
      <path
        d="M7 6.5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2V18l-2-1-2 1-2-1-2 1-2-1-2 1V6.5z"
        fill="none"
      />
      <path d="M9.5 8.7h5" fill="none" opacity=".7" />
      <path d="M9.5 11.2h7" fill="none" opacity=".45" />
      <path d="M9.5 13.7h6.2" fill="none" opacity=".35" />
    </>
  ),

  // =========================
  // LOOP / BEHAVIOR
  // =========================
  sense: ({ sw }) => (
    <>
      <path d="M5 14a7 7 0 0 1 14 0" fill="none" />
      <path d="M7 14a5 5 0 0 1 10 0" fill="none" opacity=".7" />
      <path d="M12 14l4.6-3.6" fill="none" opacity=".7" />
      <circle cx="12" cy="14" r="1.3" />
    </>
  ),

  route: ({ sw }) => (
    <>
      <path d="M7 6v4c0 1.1.9 2 2 2h6c1.1 0 2 .9 2 2v2" fill="none" />
      <path d="M17 6v4c0 1.1-.9 2-2 2H9c-1.1 0-2 .9-2 2v2" fill="none" opacity=".55" />
      <circle cx="7" cy="6" r="1.4" />
      <circle cx="17" cy="6" r="1.4" opacity=".8" />
      <circle cx="12" cy="12" r="1.2" opacity=".75" />
      <circle cx="12" cy="18" r="1.4" />
    </>
  ),

  deliver: ({ sw }) => (
    <>
      <path d="M6 12h8" fill="none" />
      <path d="M12 8l4 4-4 4" fill="none" />
      <path d="M16.5 7.5h2.5v9h-2.5" fill="none" opacity=".6" />
    </>
  ),

  seal: ({ sw }) => (
    <>
      <path d="M12 4.8a7.2 7.2 0 1 1-5.1 2.1" fill="none" />
      <path d="M6.9 6.9l-1.6-1.6" fill="none" opacity=".7" />
      <circle cx="18.2" cy="12" r="1.2" fill="currentColor" opacity=".95" />
      <path d="M9 12.8l2 2 4-5.2" fill="none" opacity=".6" />
    </>
  ),

  review: ({ sw }) => (
    <>
      <path d="M7.2 10.2A5.8 5.8 0 0 1 18 12a5.8 5.8 0 0 1-10.8 1.8" fill="none" />
      <path d="M7.2 10.2V6.5h3.7" fill="none" />
      <path d="M16.8 13.8V17.5h-3.7" fill="none" opacity=".6" />
    </>
  ),

  continuity: ({ sw }) => (
    <>
      <circle cx="7" cy="12" r="1.5" />
      <circle cx="12" cy="7" r="1.5" opacity=".85" />
      <circle cx="17" cy="12" r="1.5" opacity=".7" />
      <path d="M8.4 11.2l2.8-2.8" fill="none" />
      <path d="M13 8.4l2.8 2.8" fill="none" opacity=".7" />
      <path d="M8.6 12h6.8" fill="none" opacity=".45" />
    </>
  ),

  orchestrate: ({ sw }) => (
    <>
      <path d="M6 8h10" fill="none" />
      <path d="M6 12h12" fill="none" opacity=".75" />
      <path d="M6 16h8" fill="none" opacity=".55" />
      <circle cx="18" cy="12" r="1.5" />
      <path d="M18 12l-2.4-1.8" fill="none" opacity=".7" />
    </>
  ),

  // =========================
  // TRUST
  // =========================
  consentMap: ({ sw }) => (
    <>
      <path d="M6.5 6.5h11v11h-11z" fill="none" />
      <path d="M10.2 6.5v11" fill="none" opacity=".55" />
      <path d="M13.8 6.5v11" fill="none" opacity=".35" />
      <path d="M6.5 10.2h11" fill="none" opacity=".55" />
      <path d="M6.5 13.8h11" fill="none" opacity=".35" />
      <circle cx="15.6" cy="9.2" r="1.3" fill="currentColor" opacity=".9" />
    </>
  ),

  quietHours: ({ sw }) => (
    <>
      <path d="M14.8 6.4a5.2 5.2 0 1 0 2.8 9.2 4.6 4.6 0 0 1-2.8-9.2z" fill="none" />
      <path d="M6 16c1.8-1.4 3.8-1.4 5.6 0 1.8 1.4 3.8 1.4 5.6 0" fill="none" opacity=".6" />
      <path d="M6 18c1.8-1.1 3.8-1.1 5.6 0 1.8 1.1 3.8 1.1 5.6 0" fill="none" opacity=".35" />
    </>
  ),

  escalation: ({ sw }) => (
    <>
      <path d="M7 18V6" fill="none" />
      <path d="M7 14h6" fill="none" />
      <path d="M7 10h8" fill="none" opacity=".7" />
      <path d="M7 6h10" fill="none" opacity=".45" />
      <path d="M15 14l3-3" fill="none" />
      <path d="M18 11v3h-3" fill="none" />
      <circle cx="7" cy="18" r="1.3" />
    </>
  ),

  governance: ({ sw }) => (
    <>
      <circle cx="9" cy="10" r="3.2" fill="none" />
      <circle cx="15" cy="10" r="3.2" fill="none" opacity=".7" />
      <circle cx="12" cy="14.5" r="3.2" fill="none" opacity=".45" />
      <path d="M12 8.2v3.6" fill="none" opacity=".55" />
      <circle cx="12" cy="8.2" r="1.1" fill="currentColor" opacity=".9" />
    </>
  ),

  integrityLog: ({ sw }) => (
    <>
      <path d="M7 6.5h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z" fill="none" />
      <path d="M8.8 9h6.5" fill="none" opacity=".7" />
      <path d="M8.8 11.6h7.8" fill="none" opacity=".45" />
      <path d="M8.8 14.2h5.4" fill="none" opacity=".35" />
      <circle cx="17.2" cy="15.8" r="1.2" fill="currentColor" opacity=".95" />
      <path d="M15.8 15.8a2.2 2.2 0 1 0 1.4-2.1" fill="none" opacity=".6" />
    </>
  ),

  // =========================
  // UTILITY
  // =========================
  play: ({ sw }) => (
    <>
      <path d="M9 7.5v9l7-4.5-7-4.5z" fill="none" />
    </>
  ),

  pause: ({ sw }) => (
    <>
      <path d="M9 7.5v9" fill="none" />
      <path d="M15 7.5v9" fill="none" />
    </>
  ),

  next: ({ sw }) => (
    <>
      <path d="M9 7.5v9l6-4.5-6-4.5z" fill="none" />
      <path d="M16.5 7.5v9" fill="none" opacity=".7" />
    </>
  ),

  back: ({ sw }) => (
    <>
      <path d="M15 7.5v9l-6-4.5 6-4.5z" fill="none" />
      <path d="M7.5 7.5v9" fill="none" opacity=".7" />
    </>
  ),

  close: ({ sw }) => (
    <>
      <path d="M7.5 7.5l9 9" fill="none" />
      <path d="M16.5 7.5l-9 9" fill="none" />
    </>
  ),

  info: ({ sw }) => (
    <>
      <circle cx="12" cy="12" r="7.5" fill="none" />
      <path d="M12 10.8v5" fill="none" />
      <circle cx="12" cy="8.4" r="1" fill="currentColor" opacity=".95" />
    </>
  ),

  external: ({ sw }) => (
    <>
      <path d="M10 8h-3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-3" fill="none" opacity=".7" />
      <path d="M13 6h5v5" fill="none" />
      <path d="M18 6l-8 8" fill="none" />
    </>
  ),

  chevronDown: ({ sw }) => (
    <>
      <path d="M7.5 10l4.5 4.5L16.5 10" fill="none" />
    </>
  ),

  // =========================
  // PILLARS (abstract variants)
  // =========================
  pillarER: ({ sw }) => (
    <>
      <path d="M6.5 14.5c2.2-5 6.2-6.4 11-5.2" fill="none" />
      <path d="M8 17.2c1.6-2.6 3.4-3.8 6-3.8h3" fill="none" opacity=".55" />
      <circle cx="7.2" cy="17.2" r="1.4" />
      <circle cx="17.5" cy="9.3" r="1.4" opacity=".8" />
    </>
  ),

  pillarSR: ({ sw }) => (
    <>
      <path d="M6 12h4" fill="none" />
      <path d="M14 12h4" fill="none" />
      <path d="M10 12c1.4-2.2 2.6-2.2 4 0" fill="none" />
      <circle cx="6" cy="12" r="1.4" />
      <circle cx="18" cy="12" r="1.4" opacity=".8" />
    </>
  ),

  pillarSC: ({ sw }) => (
    <>
      <circle cx="8" cy="12" r="1.6" />
      <circle cx="16" cy="12" r="1.6" opacity=".85" />
      <path d="M9.8 12h4.4" fill="none" />
      <path d="M10.2 9.2c1.8-1.6 3.8-1.6 5.6 0" fill="none" opacity=".55" />
    </>
  ),

  pillarCR: ({ sw }) => (
    <>
      <circle cx="7" cy="7" r="1.4" />
      <circle cx="17" cy="7" r="1.4" opacity=".8" />
      <circle cx="12" cy="17" r="1.4" />
      <path d="M7 7v4c0 1.1.9 2 2 2h6c1.1 0 2 .9 2 2v0" fill="none" />
      <path d="M17 7v4c0 1.1-.9 2-2 2H9c-1.1 0-2 .9-2 2v0" fill="none" opacity=".55" />
      <path d="M12 13v2.6" fill="none" opacity=".7" />
    </>
  ),

  pillarII: ({ sw }) => (
    <>
      <path d="M12 5v14" fill="none" />
      <circle cx="12" cy="6.8" r="1.4" />
      <circle cx="12" cy="17.2" r="1.4" opacity=".85" />
      <path d="M15.5 12a3.5 3.5 0 1 1-2.5-3.3" fill="none" opacity=".65" />
      <circle cx="15.5" cy="12" r="1.1" fill="currentColor" opacity=".95" />
    </>
  ),

  pillarDM: ({ sw }) => (
    <>
      <path d="M6 14c1.8-1.6 3.8-1.6 5.6 0 1.8 1.6 3.8 1.6 5.6 0" fill="none" />
      <path d="M6 11.2c1.8-1.1 3.8-1.1 5.6 0 1.8 1.1 3.8 1.1 5.6 0" fill="none" opacity=".55" />
      <circle cx="18" cy="10.8" r="1.4" />
      <path d="M18 10.8v-4" fill="none" opacity=".55" />
    </>
  ),
};

```
  
## 3) src/ui/icons/Icon.tsx  
A single, clean <Icon /> component that uses the glyph map and supports tone, size, and pulse.  
```
import React from "react";
import { GLYPHS, type IconName } from "./glyphs";
import "./icon.css";

export type IconTone = "ink" | "muted" | "cyan" | "purple" | "pillar" | "live";

export function Icon(props: {
  name: IconName;
  size?: 16 | 20 | 24 | 32 | 40 | 48;
  tone?: IconTone;
  title?: string;
  className?: string;
  pulse?: boolean;
}) {
  const {
    name,
    size = 24,
    tone = "ink",
    title,
    className = "",
    pulse = false,
  } = props;

  // Stroke scales gently. We keep it calm and consistent across sizes.
  const sw = size <= 16 ? 1.6 : size <= 20 ? 1.7 : size <= 24 ? 1.75 : 1.9;

  const cn =
    `ro-icon ro-icon--${tone} ${pulse ? "ro-icon--pulse" : ""} ${className}`.trim();

  const glyph = GLYPHS[name];
  if (!glyph) return null;

  return (
    <span className={cn} aria-hidden={title ? undefined : true}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
        role={title ? "img" : "presentation"}
        aria-label={title}
      >
        {title ? <title>{title}</title> : null}
        {glyph({ sw, r: 12 })}
      </svg>
    </span>
  );
}

export type { IconName };

```
  
## 4) src/ui/icons/index.ts  
```
export { Icon } from "./Icon";
export type { IconName, IconTone } from "./Icon";

```
  
## 5) Usage examples (wired to your system)  
## A) Pillar badge (inherits pillar color)  
```
<div className="pillar" data-pillar="ER" style={pillarStyle("ER")}>
  <Icon name="pillarER" tone="pillar" />
  <span>Emotional Regulation</span>
</div>

```
## B) Continuity stages  
```
<Icon name="route" tone="muted" />
<Icon name="deliver" tone="muted" />
<Icon name="seal" tone="cyan" pulse />
<Icon name="review" tone="muted" />

```
## C) Trust rails  
```
<Icon name="consentMap" tone="ink" />
<Icon name="quietHours" tone="ink" />
<Icon name="escalation" tone="ink" />
<Icon name="governance" tone="ink" />

```
## D) Lens toggle labels  
```
<Icon name="lens" tone="muted" />
<Icon name="altitude" tone="muted" />

```
  
## 6) What you now have (website-ready)  
* **26 icons** (Core 12 + Trust + Loop + Utility + 6 Pillars)  
* Token-driven coloring (ink, muted, cyan, pillar)  
* Animation hook for “sealed” impact (pulse)  
* Works in every component: Keynote, SpineExplorer, TrustRails, Specs glossary headers, Demo.  
If you want next: I can add a **tiny “IconGrid” dev page** that renders all icons at 16/20/24/32 for instant QA + visual tuning.  
