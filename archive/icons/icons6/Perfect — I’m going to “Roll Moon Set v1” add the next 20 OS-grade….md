Perfect — I’m going to “Roll Moon Set v1”: add the next 20 OS-grade glyphs (core + loop + trust + interface), plus a tiny status micro-pack and a couple micro-motions (intent-only) — all as paste-ready updates to your existing glyphs.tsx + icon.css.  
## Moon Set v1 ✅ (20 new glyphs + status micro-pack + intent-only micro-motion)  
Below is **paste-ready** content to extend your existing icon system. It assumes you already have:  
* src/ui/icons/glyphs.tsx with IconName union + GLYPHS object  
* src/ui/icons/Icon.tsx adding data-icon={name}  
* src/ui/icons/icon.css  
We’ll add:  
* **20 new icons** (Core + Loop + Trust + Interface)  
* **6 status micro-icons**  
* **Intent-only micro-motion** for continuity + return (subtle, one-shot)  
  
## 1) Add new names to IconName  
In src/ui/icons/glyphs.tsx, extend the IconName union with these:  
```
  // Moon Set v1 — Core
  | "return"
  | "thread"
  | "handoff"
  | "cadence"
  | "dose"
  | "primitive"
  | "deprecationMap"

  // Moon Set v1 — Loop
  | "target"
  | "align"
  | "proof"
  | "install"
  | "calibrate"
  | "transfer"
  | "hold"
  | "resume"

  // Moon Set v1 — Trust
  | "boundary"
  | "visibility"
  | "protocol"

  // Moon Set v1 — Interface
  | "search"
  | "filter"

  // Status micro-pack
  | "statusLive"
  | "statusSealed"
  | "statusRouted"
  | "statusDelivered"
  | "statusReviewed"
  | "statusGoverned";

```
  
## 2) Paste these 20 + 6 glyphs into GLYPHS  
Add anywhere inside the GLYPHS object (I’d group them under new headers).  
```
  // =========================
  // MOON SET v1 — CORE
  // =========================
  return: ({ sw }) => (
    <>
      <path d="M8 10.2A5.8 5.8 0 1 1 18 12" fill="none" />
      <path d="M8 10.2V6.7h3.5" fill="none" />
      <circle cx="18" cy="12" r="1.2" fill="currentColor" opacity=".9" />
    </>
  ),

  thread: ({ sw }) => (
    <>
      <path d="M6 14c1.8-2 3.8-2 5.6 0 1.8 2 3.8 2 5.6 0" fill="none" />
      <path d="M6 10c1.8-1.4 3.8-1.4 5.6 0 1.8 1.4 3.8 1.4 5.6 0" fill="none" opacity=".55" />
      <circle cx="6" cy="10" r="1.1" opacity=".8" />
      <circle cx="18" cy="14" r="1.1" opacity=".65" />
    </>
  ),

  handoff: ({ sw }) => (
    <>
      <circle cx="8" cy="12" r="1.6" />
      <circle cx="16" cy="12" r="1.6" opacity=".85" />
      <path d="M9.9 12h2.6" fill="none" />
      <path d="M12.1 10.3l2.4 1.7-2.4 1.7" fill="none" />
      <path d="M6.2 15.8c1.2-1 2.5-1 3.7 0" fill="none" opacity=".5" />
    </>
  ),

  cadence: ({ sw }) => (
    <>
      <path d="M6.5 9.5h2.8" fill="none" />
      <path d="M6.5 12h5.2" fill="none" opacity=".75" />
      <path d="M6.5 14.5h3.8" fill="none" opacity=".55" />
      <circle cx="16.8" cy="9.5" r="1.2" opacity=".85" />
      <circle cx="18.8" cy="12" r="1.2" opacity=".65" />
      <circle cx="15.2" cy="14.5" r="1.2" opacity=".45" />
    </>
  ),

  dose: ({ sw }) => (
    <>
      <path d="M12 6.8c2.6 3.2 4 5.2 4 7.3a4 4 0 1 1-8 0c0-2.1 1.4-4.1 4-7.3z" fill="none" />
      <path d="M10 14.1c.8.8 1.6 1.1 2.4 1.1 1.2 0 2.2-.6 3-1.8" fill="none" opacity=".45" />
    </>
  ),

  primitive: ({ sw }) => (
    <>
      <path d="M7 7.2h10a2 2 0 0 1 2 2v5.6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9.2a2 2 0 0 1 2-2z" fill="none" />
      <path d="M9 11.2h6" fill="none" opacity=".6" />
      <circle cx="12" cy="14.4" r="1.1" fill="currentColor" opacity=".9" />
    </>
  ),

  deprecationMap: ({ sw }) => (
    <>
      <path d="M7 8h6" fill="none" opacity=".75" />
      <path d="M7 12h6" fill="none" opacity=".55" />
      <path d="M7 16h6" fill="none" opacity=".35" />
      <path d="M14.5 9l3-3" fill="none" />
      <path d="M17.5 6v3h-3" fill="none" />
      <circle cx="16.5" cy="13.5" r="2.2" fill="none" opacity=".6" />
      <circle cx="16.5" cy="13.5" r="1.1" fill="currentColor" opacity=".9" />
    </>
  ),

  // =========================
  // MOON SET v1 — LOOP
  // =========================
  target: ({ sw }) => (
    <>
      <circle cx="12" cy="12" r="7" fill="none" opacity=".75" />
      <circle cx="12" cy="12" r="3.2" fill="none" opacity=".55" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" opacity=".95" />
      <path d="M12 5v2.2" fill="none" opacity=".45" />
      <path d="M19 12h-2.2" fill="none" opacity=".45" />
    </>
  ),

  align: ({ sw }) => (
    <>
      <path d="M7 9l5 5 5-5" fill="none" />
      <path d="M7 13l5 5 5-5" fill="none" opacity=".55" />
      <circle cx="12" cy="14" r="1.2" fill="currentColor" opacity=".9" />
    </>
  ),

  proof: ({ sw }) => (
    <>
      <path
        d="M7.5 7.2h7.6a1.8 1.8 0 0 1 1.8 1.8v9l-1.6-.8-1.6.8-1.6-.8-1.6.8-1.6-.8-1.6.8V9a1.8 1.8 0 0 1 1.8-1.8z"
        fill="none"
        opacity=".85"
      />
      <path d="M9.3 10.2h6.2" fill="none" opacity=".55" />
      <path d="M9.3 12.6h7.6" fill="none" opacity=".35" />
      <circle cx="18.2" cy="8.2" r="1.2" fill="currentColor" opacity=".9" />
      <path d="M16.8 8.2a2.2 2.2 0 1 0 1.4-2.1" fill="none" opacity=".45" />
    </>
  ),

  install: ({ sw }) => (
    <>
      <path d="M12 5.5v9" fill="none" />
      <path d="M8.6 11.8L12 15.2l3.4-3.4" fill="none" />
      <path d="M7 17.2h10a2 2 0 0 0 2-2v-1.2" fill="none" opacity=".6" />
      <path d="M7 17.2a2 2 0 0 1-2-2v-1.2" fill="none" opacity=".35" />
    </>
  ),

  calibrate: ({ sw }) => (
    <>
      <path d="M6.5 14.5a6.5 6.5 0 0 1 13 0" fill="none" />
      <path d="M12 14.5l4-3" fill="none" />
      <circle cx="12" cy="14.5" r="1.2" fill="currentColor" opacity=".9" />
      <path d="M9 13.2l-.8-1.2" fill="none" opacity=".45" />
      <path d="M15 13.2l.8-1.2" fill="none" opacity=".45" />
    </>
  ),

  transfer: ({ sw }) => (
    <>
      <circle cx="8" cy="10" r="3.2" fill="none" opacity=".8" />
      <circle cx="16" cy="14" r="3.2" fill="none" opacity=".5" />
      <path d="M10.5 11.2l3 1.6" fill="none" />
      <path d="M13.5 12.8l-1.2 2.6" fill="none" opacity=".65" />
      <path d="M12.3 12.2l3.6-1.6" fill="none" opacity=".55" />
      <circle cx="12.3" cy="12.2" r="1.1" fill="currentColor" opacity=".9" />
    </>
  ),

  hold: ({ sw }) => (
    <>
      <path d="M7 7.5v9" fill="none" />
      <path d="M11 7.5v9" fill="none" opacity=".75" />
      <path d="M15 8.8h4" fill="none" opacity=".55" />
      <path d="M15 12h6" fill="none" opacity=".35" />
      <path d="M15 15.2h5" fill="none" opacity=".25" />
      <circle cx="7" cy="16.5" r="1.2" fill="currentColor" opacity=".85" />
    </>
  ),

  resume: ({ sw }) => (
    <>
      <path d="M7.2 10.2A5.8 5.8 0 1 1 18 12" fill="none" />
      <path d="M7.2 10.2V6.5h3.7" fill="none" />
      <path d="M11.2 9.5v5l4-2.5-4-2.5z" fill="none" opacity=".75" />
    </>
  ),

  // =========================
  // MOON SET v1 — TRUST
  // =========================
  boundary: ({ sw }) => (
    <>
      <path d="M7 7v10" fill="none" />
      <path d="M17 7v10" fill="none" opacity=".65" />
      <path d="M7 12h10" fill="none" opacity=".55" />
      <path d="M12 9.2v5.6" fill="none" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" opacity=".95" />
      <path d="M9.2 17h5.6" fill="none" opacity=".35" />
    </>
  ),

  visibility: ({ sw }) => (
    <>
      <circle cx="12" cy="12" r="7.2" fill="none" opacity=".75" />
      <path d="M6.5 12c1.6-2.6 3.6-3.9 5.5-3.9s3.9 1.3 5.5 3.9" fill="none" />
      <path d="M6.5 12c1.6 2.6 3.6 3.9 5.5 3.9s3.9-1.3 5.5-3.9" fill="none" opacity=".6" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" opacity=".9" />
    </>
  ),

  protocol: ({ sw }) => (
    <>
      <path d="M7 18V6" fill="none" />
      <circle cx="7" cy="16.5" r="1.2" />
      <circle cx="7" cy="12" r="1.2" opacity=".8" />
      <circle cx="7" cy="7.5" r="1.2" opacity=".65" />
      <path d="M9.5 16.5h8" fill="none" opacity=".6" />
      <path d="M9.5 12h10" fill="none" opacity=".45" />
      <path d="M9.5 7.5h6.5" fill="none" opacity=".35" />
    </>
  ),

  // =========================
  // MOON SET v1 — INTERFACE
  // =========================
  search: ({ sw }) => (
    <>
      <circle cx="11" cy="11" r="5.6" fill="none" />
      <path d="M15.2 15.2L19 19" fill="none" />
      <circle cx="19" cy="19" r="1" fill="currentColor" opacity=".9" />
    </>
  ),

  filter: ({ sw }) => (
    <>
      <path d="M6 7h12" fill="none" />
      <path d="M8 12h8" fill="none" opacity=".7" />
      <path d="M10 17h4" fill="none" opacity=".5" />
      <circle cx="9" cy="7" r="1.2" fill="currentColor" opacity=".85" />
      <circle cx="15" cy="12" r="1.2" fill="currentColor" opacity=".6" />
    </>
  ),

  // =========================
  // STATUS MICRO-PACK
  // =========================
  statusLive: ({ sw }) => (
    <>
      <circle cx="12" cy="12" r="2.2" fill="currentColor" opacity=".95" />
      <circle cx="12" cy="12" r="5.6" fill="none" opacity=".35" />
    </>
  ),

  statusSealed: ({ sw }) => (
    <>
      <circle cx="12" cy="12" r="6.2" fill="none" opacity=".6" />
      <path d="M9.4 12.2l1.6 1.6 3.6-4.4" fill="none" />
      <circle cx="17.8" cy="12" r="1.1" fill="currentColor" opacity=".9" />
    </>
  ),

  statusRouted: ({ sw }) => (
    <>
      <circle cx="8" cy="8" r="1.4" />
      <circle cx="16" cy="8" r="1.4" opacity=".8" />
      <circle cx="12" cy="16" r="1.4" />
      <path d="M8 8v3c0 1 .8 1.8 1.8 1.8h4.4c1 0 1.8.8 1.8 1.8V16" fill="none" opacity=".65" />
      <path d="M16 8v3c0 1-.8 1.8-1.8 1.8H9.8c-1 0-1.8.8-1.8 1.8V16" fill="none" opacity=".35" />
    </>
  ),

  statusDelivered: ({ sw }) => (
    <>
      <path d="M7 12h8" fill="none" />
      <path d="M12 8l4 4-4 4" fill="none" />
      <circle cx="18" cy="12" r="1.2" fill="currentColor" opacity=".85" />
    </>
  ),

  statusReviewed: ({ sw }) => (
    <>
      <path d="M8.2 10.2A5.2 5.2 0 1 1 17 14.2" fill="none" />
      <path d="M8.2 10.2V7.2h3" fill="none" />
      <circle cx="17" cy="14.2" r="1.2" fill="currentColor" opacity=".85" />
    </>
  ),

  statusGoverned: ({ sw }) => (
    <>
      <path d="M7 9h10" fill="none" />
      <path d="M7 12h12" fill="none" opacity=".7" />
      <path d="M7 15h8" fill="none" opacity=".5" />
      <circle cx="19" cy="12" r="1.2" fill="currentColor" opacity=".9" />
    </>
  ),

```
  
## 3) Add intent-only micro-motion (continuity + return)  
Append to src/ui/icons/icon.css:  
```
/* ============================================================
   INTENT-ONLY MICRO MOTION (one-shot, not busy)
   ============================================================ */

.ro-icon[data-icon="continuity"]:hover,
.ro-icon[data-icon="continuity"]:focus-visible,
.ro-icon[data-icon="return"]:hover,
.ro-icon[data-icon="return"]:focus-visible {
  animation: roIconIntent 520ms var(--ease-regulate, cubic-bezier(.2,.8,.2,1)) 1;
}

@keyframes roIconIntent {
  0% { transform: translateY(0) scale(1); }
  45% { transform: translateY(-0.5px) scale(1.02); }
  100% { transform: translateY(0) scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .ro-icon[data-icon="continuity"]:hover,
  .ro-icon[data-icon="continuity"]:focus-visible,
  .ro-icon[data-icon="return"]:hover,
  .ro-icon[data-icon="return"]:focus-visible {
    animation: none;
  }
}

```
This is *not* a visible “animation.” It’s a barely-there **presence shift**.  
  
## 4) Update IconGrid list (optional but best)  
In src/ui/icons/IconGrid.tsx, extend ALL with the new names so you can QA instantly:  
```
"return","thread","handoff","cadence","dose","primitive","deprecationMap",
"target","align","proof","install","calibrate","transfer","hold","resume",
"boundary","visibility","protocol",
"search","filter",
"statusLive","statusSealed","statusRouted","statusDelivered","statusReviewed","statusGoverned",

```
  
## 5) Where these “moon icons” immediately level up the site  
## Home  
* “An operating system for recovery.” → spine  
* “Moments become receipts.” → receipt  
* “Run a moment” button → play  
* Footer tagline → continuity or thread  
## How it works  
* Hero flow labels:  
    * Sense → sense  
    * Route → route or target  
    * Deliver → deliver  
    * Seal → seal  
* ContinuityStream stages → statusRouted / statusDelivered / statusSealed / statusReviewed  
## Trust  
* “Four rails. Always on.” → boundary or rail  
* “Integrity logs” → integrityLog + statusSealed  
* “Governance” → statusGoverned or governance  
## Three worlds  
* “Same receipt, three meanings.” → traceTravel or transfer  
* “Altitude” explainer → altitude  
* Lens comparison headers → lens  
## Specs  
* “Labels evolve. IDs don’t.” → lockedId + deprecationMap  
* “Return model” → return + thread  
* “Token system” → primitive  
## Demo / Portal shell  
* “Orchestration” → orchestrate  
* “What held” → hold  
* “What’s next” → calibrate  
* “Handoff to human” (later) → handoff  
  
## 6) Two tiny “moon rules” to prevent drift  
1. **Status icons never appear as hero icons.** They live in streams, cards, logs, and chips only.  
2. **Trust icons never animate by default.** Trust is calm. Trust is still.  
  
If you want Moon Set v2, it’s the **Signal Pack** (drift/variance/trajectory/readiness/cost) + **Console-grade chips** that make OrchestrationFeed feel like a real operating system, not a UI list. Just say: **“roll signal pack v2.”**  
If you want Moon Set v2, it’s the **Signal Pack** (drift/variance/trajectory/readiness/cost) + **Console-grade chips** that make OrchestrationFeed feel like a real operating system, not a UI list. Just say: **“roll signal pack v2.”**  
