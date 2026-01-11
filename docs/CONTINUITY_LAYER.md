# Continuity Layer — Public Language Architecture

## Overview

The **Continuity Layer** is RecoveryOS's public-facing vocabulary and component system. Built on the anchor documents (Overview, kit, brand kit), it transforms internal recovery science framework into Apple-grade, dignity-first experience language.

## Core Principle

**"One language, three dialects"**
- **Individual**: Ease + dignity (You language, short sentences, felt not explained)
- **Professional**: Continuity + clarity (Person language, pattern awareness)
- **Organisation**: Reliability + governance (System language, infrastructure focus)

---

## Public Vocabulary (Anchor Points)

### Primary Actions
- **Return** — The universal action. Small help, always there.
- **Grip** — Micro-experience (10s–2m). Three types: Anchor | Compass | Handrail
- **Trace** — Proof made tangible. Glass object with etched copy.
- **Thread** — Continuity line. Your traces over time.

### Infrastructure
- **Handrail** — Safety layer (quiet hours, consent, escalation)
- **Lens** — Altitude toggle (Individual | Professional | Organisation)
- **Drift** — Off-course state (low | medium | high)

### Supporting
- **Compass** — Find direction
- **Anchor** — Settle, ground
- **Carry** — Sustained continuity
- **Bridge** — Connection between experiences

---

## Components Built

### 1. **ReturnButton**
**Path**: `packages/ui/src/components/return/ReturnButton.tsx`

**Purpose**: Universal action surface. The entry point.

**Interaction**:
- **Tap** → Quick grip (default: Anchor 10s)
- **Long-press** → GripGenerator (choose direction + time)

**States**: Idle → Hover → Press → Active → Confirm → Hold

**Props**:
- `lens`: individual | professional | organisation
- `drift`: low | medium | high (visual urgency)
- `attention`: calm (spacious) | focus (compact)
- `onTap`, `onLongPress`

**Copy per lens**:
- Individual: "Return"
- Professional: "Initiate"
- Organisation: "Activate"

**Features**:
- Glow effect on press
- Hold indicator (progress bar)
- Drift-aware pulse animation (high drift)
- Reduced motion support

---

### 2. **TraceObject**
**Path**: `packages/ui/src/components/trace/TraceObject.tsx`

**Purpose**: Proof made tangible. Glass finish with etched copy.

**States**: Draft → Sealed → Carried → Shared

**Props**:
- `id`, `state`, `copy` (etched text)
- `timestamp`, `metadata` (gripType, duration, driftLevel)
- `lens`, `onClick`

**Visual**:
- Translucent glass surface
- Copy text with shadow (etched appearance)
- Seal badge (star icon) when sealed
- Grip badge (anchor/compass/handrail)
- Duration label

**Lens variants**:
- Individual: Spacious, full timestamp
- Professional: Balanced, detailed timestamp
- Organisation: Dense, ISO timestamp

---

### 3. **ThreadView**
**Path**: `packages/ui/src/components/thread/ThreadView.tsx`

**Purpose**: Continuity line. Vertical timeline with connected traces.

**States**: New → Growing → Reviewable → Shareable

**Props**:
- `traces`: Array of TraceObjectProps
- `state`, `lens`, `title`, `week`

**Visual**:
- Vertical gradient line (continuity spine)
- Trace nodes with circular dots
- Staggered entrance animation
- Empty state with lens-specific copy

**Copy per lens**:
- Individual: "Your thread"
- Professional: "Continuity line"
- Organisation: "Thread archive"

---

### 4. **GripGenerator**
**Path**: `packages/ui/src/components/grip/GripGenerator.tsx`

**Purpose**: Intent + time picker. Launched from ReturnButton long-press.

**Flow**: Choose direction → Pick duration → Confirm → Launch grip

**Direction options**:
- **Anchor**: Settle, ground (green accent)
- **Compass**: Orient, find direction (blue accent)
- **Handrail**: Hold steady (amber accent)

**Duration options**: 10s | 30s | 2m

**Props**:
- `lens`, `onConfirm`, `onCancel`

**Copy per lens**:
- Individual: "What kind of help?", "Settle", "Orient", "Hold on"
- Professional: "Select grip type", "Anchor", "Compass", "Handrail"
- Organisation: "Grip type", "ANCHOR", "COMPASS", "HANDRAIL"

**Features**:
- Two-step flow with back navigation
- Direction-specific hover colors
- Selected state for duration
- Smooth step transitions

---

### 5. **LensControl**
**Path**: `packages/ui/src/components/lens/LensControl.tsx`

**Purpose**: Altitude toggle. Changes tone, density, emphasis across entire UI.

**Options**: Individual (●) | Professional (◆) | Organisation (■)

**Props**:
- `value`, `onChange`, `size` (compact | comfortable)

**Visual**:
- Segmented control with sliding active indicator
- Icon + label per lens
- Backdrop blur, translucent background
- Shared layout animation (Framer Motion layoutId)

**Behavior**:
- Mobile: Hide labels, show icons only
- Reduced motion: Disable transitions

---

## Token System

### Public Language Tokens
**Path**: `packages/tokens/public-language-tokens.ts`

**Token families**:
- **return**: surface, ink, focusRing, press, glow, hover
- **thread**: line, node, pulse, depth, active, dormant
- **trace**: surface, border, stamp, seal, vaultSurface, draft, sealed
- **handrail**: surface, border, callout, escalate, quiet
- **drift**: low, medium, high, indicator
- **lens**: individual, professional, organisation, active, inactive
- **motion**: arrive, glide, settle, confirm, carry (spring + duration)
- **grip**: anchor, compass, handrail (surface, border, icon)

**Mode tokens**:
- **appearance**: light | dark
- **attention**: calm (spacious, slow) | focus (compact, snappy)
- **accessibility**: reduceMotion, increaseContrast

---

## Demo

### ContinuityDemo
**Path**: `packages/ui/src/demos/ContinuityDemo.tsx`

**Purpose**: Full-featured showcase of Continuity Layer components.

**Features**:
- LensControl (top right, persistent)
- Hero section with lens-aware copy
- ReturnButton with tap/long-press
- GripGenerator modal overlay
- ThreadView with real trace data
- Dynamic trace generation based on grip config

**Flow**:
1. User taps ReturnButton → Quick grip (Anchor 10s) → New trace appears in ThreadView
2. User long-presses ReturnButton → GripGenerator modal → Choose direction + time → Confirm → New trace
3. User switches lens → All copy and formatting updates across components

**Copy generation**:
- Anchor: "Found my footing again", "Settled into the moment"
- Compass: "Checked my bearing", "Oriented toward what matters"
- Handrail: "Held steady through it", "Made it through"

---

## Integration

### App.tsx
**Path**: `apps/web/src/App.tsx`

**Changes**:
- Added "Continuity" view button
- Imported ContinuityDemo
- View toggle: Companion | Console | Command | **Continuity**

**Route**: http://localhost:5174/ → Click "Continuity" button

---

## Storybook Stories

**Created 5 story files** in `packages/ui/src/stories/`:

1. **ReturnButton.stories.tsx**
   - Individual, Professional, Organisation lenses
   - MediumDrift, HighDrift states
   - FocusMode variant

2. **TraceObject.stories.tsx**
   - Draft, Sealed, Carried, Shared states
   - Anchor, Compass, Handrail grip types
   - Individual, Professional, Organisation lenses

3. **ThreadView.stories.tsx**
   - Empty, SingleTrace, Growing, Reviewable, Shareable states
   - All three lenses
   - Mock trace data

4. **GripGenerator.stories.tsx**
   - All three lenses
   - Interactive direction + duration selection

5. **LensControl.stories.tsx**
   - Interactive state with hooks
   - Compact vs Comfortable sizes
   - All three active states

**Run Storybook**: `npm run storybook`

---

## Naming Conventions

### Component Names
- **Objects**: PascalCase (ReturnButton, TraceObject, ThreadView)
- **Actions**: VerbNoun (SaveTrace, RunGrip)
- **Spaces**: *Room (ThreadRoom, VaultRoom)
- **Controls**: *Control (LensControl, DoseControl)
- **Panels**: *Panel (ConsentPanel, HandrailPanel)
- **Overlays**: *Overlay (DayOverlay, ContinuityOverlay)

### Forbidden Language
❌ Don't use internally:
- "schema", "heat band", "mindblock", "relapse", "compliance"
- "Sense→Route→Deliver→Seal", "ERA Cadence"

✅ Use publicly:
- "Return Loop", "Weekly Rhythm", "Drift Level", "Trace Object", "Grip", "Thread"

---

## Translation Map

| Internal (RecoveryOS) | Public (Continuity Layer) |
|-----------------------|---------------------------|
| Sense→Route→Deliver→Seal | Return Loop |
| ERA Cadence | Weekly Rhythm |
| Heat Band | Drift Level |
| Proof Receipt | Trace |
| Delivery | Grip |
| Proof Capture | Save as Trace |
| Mindblock | Off-course moment |
| Relapse | Drift episode |

---

## Tone Guidelines

### Physical, not academic
❌ "Utilize cognitive reframing"
✅ "Notice the pattern. Breathe through it."

### Felt, not explained
❌ "This intervention targets arousal dysregulation"
✅ "Settle the wave. Find your footing."

### Timeless, not trendy
❌ "Optimize your wellness journey"
✅ "Return when you need it."

### Dignity-first
❌ "Compliance adherence protocol"
✅ "Small help, always there."

---

## Build Status

✅ **All components built and typed**
✅ **Build succeeds**: 306.61 KB | gzip: 96.68 KB
✅ **Dev server running**: http://localhost:5174/
✅ **Storybook stories created** (5 files)
✅ **Exports added to packages/ui/src/index.ts**
✅ **Demo integrated into App.tsx**

---

## Next Steps (Future Phases)

### Pending Components
1. **GripPlayer** — Runs micro-experience, ends with optional Trace
2. **TraceVault** — Archive of sealed traces
3. **HandrailPanel** — Safety infrastructure (quiet hours, consent, hand-off)
4. **DayOverlay** — Translucent layer over normal day
5. **WeeklyRhythm** — ERA Cadence renamed

### Pending Features
1. **Keynote website** — 8-scene scroll-driven reveal
2. **Lens-aware rendering** — Dynamic copy/density across all components
3. **Semantic token integration** — Wire public-language-tokens.ts into CSS
4. **Motion refinement** — Grip-specific spring physics
5. **Accessibility** — Full WCAG 2.1 AA compliance

### Component Refactoring
1. Rename legacy components:
   - UniversalPlayer → (kept as legacy)
   - ProofPill → (kept, TraceObject is successor)
   - ProofStack → (kept, ThreadView is successor)
2. Update all copy to use public language
3. Remove internal terminology from UI strings

---

## Architecture Principles

### 1. **Lens-First Design**
Every component accepts `lens` prop. Copy, tone, density, emphasis change per altitude.

### 2. **State-Driven Visuals**
- ReturnButton: Idle → Hover → Press → Hold
- TraceObject: Draft → Sealed → Carried → Shared
- ThreadView: New → Growing → Reviewable → Shareable

### 3. **Motion as Language**
- Arrive: 300ms gentle spring
- Glide: 180ms fast ease-out
- Settle: 600ms slow spring
- Confirm: 400ms bouncy spring
- Carry: 1200ms ceremony spring

### 4. **Glass Aesthetic**
- Translucent surfaces
- Backdrop blur (12px)
- Subtle borders (hsla)
- Text shadow (etched appearance)
- Minimal depth (no heavy shadows)

### 5. **Dignity Infrastructure**
- Consent-first (HandrailPanel)
- Quiet hours respect
- No gamification
- No coercion
- Proof ≠ performance

---

## File Structure

```
packages/
├── tokens/
│   └── public-language-tokens.ts     # Public language token system
├── ui/
│   ├── src/
│   │   ├── components/
│   │   │   ├── return/
│   │   │   │   ├── ReturnButton.tsx
│   │   │   │   └── ReturnButton.css
│   │   │   ├── trace/
│   │   │   │   ├── TraceObject.tsx
│   │   │   │   └── TraceObject.css
│   │   │   ├── thread/
│   │   │   │   ├── ThreadView.tsx
│   │   │   │   └── ThreadView.css
│   │   │   ├── grip/
│   │   │   │   ├── GripGenerator.tsx
│   │   │   │   └── GripGenerator.css
│   │   │   └── lens/
│   │   │       ├── LensControl.tsx
│   │   │       └── LensControl.css
│   │   ├── demos/
│   │   │   ├── ContinuityDemo.tsx
│   │   │   └── ContinuityDemo.css
│   │   ├── stories/
│   │   │   ├── ReturnButton.stories.tsx
│   │   │   ├── TraceObject.stories.tsx
│   │   │   ├── ThreadView.stories.tsx
│   │   │   ├── GripGenerator.stories.tsx
│   │   │   └── LensControl.stories.tsx
│   │   └── index.ts                  # Exports
apps/
└── web/
    └── src/
        └── App.tsx                    # Continuity view integrated
```

---

## Summary

The **Continuity Layer** represents the public-facing evolution of RecoveryOS, built on the anchor documents (Overview, kit, brand kit). It introduces:

- **Public vocabulary** (Return, Grip, Trace, Thread, Handrail, Lens)
- **Three dialects** (Individual, Professional, Organisation)
- **5 signature components** (ReturnButton, TraceObject, ThreadView, GripGenerator, LensControl)
- **Full demo** (ContinuityDemo with interactive grip flow)
- **Storybook documentation** (5 story files with variants)
- **Token system** (public-language-tokens.ts)
- **Naming conventions** (Objects, Actions, Spaces, Controls, Panels)

All components are **lens-aware**, **state-driven**, **motion-choreographed**, and built with **dignity-first** principles. The system successfully transforms internal recovery science framework into Apple-grade, public-facing experience language.

**Build succeeds**. Dev server running. Ready for next phase.
