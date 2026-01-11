# RecoveryOS Component Evolution Plan
## Integrating Component Registry v1 + Component Ideas

This document maps the Component Registry anchor points to the existing Continuity Layer architecture, identifying what to evolve, what to build next, and how components mature into the full RecoveryOS reveal.

---

## Architectural Foundation

### The Four Realities (from Component Registry)
1. **It runs as a loop** — Sense → Route → Deliver → Seal
2. **It has rooms and tempos** — Journeys (baseline) + NaviCues (moments)
3. **It produces proof as objects** — Receipts stack, identity follows, proof travels
4. **It is safe at scale** — Consent by design, escalation protocols, integrity logs

### Component Tiers
- **Tier A (Iconic OS Objects)** — ReturnButton, TraceTile, ThreadLine, Handrail, LensControl
- **Tier B (Belief Machines)** — LoopRunner, ReceiptForge, TraceTravel, ConductorView, SpineAtlas
- **Tier C (Trust Surfaces)** — ConsentMap, IntegrityLogPreview, EscalationRail, GovernanceLockMap
- **Tier D (Immersive Explorers)** — RecoveryOS Portal (website-within-website)

---

## Mapping Existing → Registry Components

### ✅ Already Built (Continuity Layer v1)

| Existing Component | Registry Equivalent | Status | Evolution Needed |
|--------------------|---------------------|--------|------------------|
| ReturnButton | ReturnButton (Tier A) | ✅ Built | Add intentDefault + holdOptions |
| TraceObject | TraceTile (Tier A) | ✅ Built | Add view modes (me/care/system) |
| ThreadView | ThreadLine (Tier A) | ✅ Built | Add clusters (weekly installs) |
| GripGenerator | Part of ReturnButton hold | ✅ Built | Wire into LoopRunner flow |
| LensControl | LensControl (Tier A) | ✅ Built | Add sticky mode |

### 🟡 Partially Built (Legacy Components)

| Existing Component | Registry Equivalent | Status | Evolution Needed |
|--------------------|---------------------|--------|------------------|
| UniversalPlayer | LoopRunner (Tier B) | 🟡 Partial | Evolve to 4-beat ring UI |
| ProofPill | TraceTile variant | 🟡 Partial | Merge into TraceObject views |
| ProofStack | ThreadView variant | 🟡 Partial | Merge into ThreadView clusters |
| ConsentSheet | ConsentMap (Tier C) | 🟡 Partial | Evolve to "what system can see/do/ask" |
| EscalationChooser | EscalationRail (Tier C) | 🟡 Partial | Add handoff types + consent gate |
| Console | Part of Portal (Tier D) | 🟡 Partial | Integrate as Care lens view |
| CommandCenter | Part of Portal (Tier D) | 🟡 Partial | Integrate as Org lens view |

### ❌ Not Yet Built (Registry Priority)

| Component | Tier | Priority | Description |
|-----------|------|----------|-------------|
| LoopRunner | B | 🔴 Critical | Demonstrate OS loop without teaching it |
| ReceiptForge | B | 🔴 Critical | Make proof tangible, sacred, non-performative |
| TraceTravel | B | 🔴 Critical | Same trace → three altitudes (me/care/system) |
| RecoveryOS Portal | D | 🟠 High | Flagship immersive explorer (website-within-website) |
| ConductorView | B | 🟠 High | LUMA as orchestrator (feed with spine) |
| SpineAtlas | B | 🟡 Medium | Framework explorer (Pillars → Mindblocks) |
| RoomSwitcher | B | 🟡 Medium | Journeys / NaviCues / Toolkit / Wellbeing / State |
| NaviCueGallery | X | 🟡 Medium | Mini-apps catalog with one-move contracts |
| JourneyStudio | X | 🟡 Medium | Weekly install simulator (ERA cadence) |
| IntegrityLogPreview | C | 🟡 Medium | Make auditable logs readable, not bureaucratic |
| GovernanceLockMap | C | 🟡 Medium | LOCKED / CONTROLLED / EXPANDABLE visualization |
| Handrail | A | 🔵 Low | Safety infrastructure component |

---

## Evolution Roadmap

### Phase 1: Evolve Existing Components (Week 1)

#### 1.1 ReturnButton Enhancement
**Current State**: Tap for quick grip, long-press for GripGenerator
**Evolution**:
- Add `intentDefault` prop (anchor | clarity | connection | direction)
- Add `holdOptions` array for intent chooser
- Wire to LoopRunner flow instead of standalone grip

**New Props**:
```typescript
interface ReturnButtonProps {
  intentDefault: 'anchor' | 'clarity' | 'connection' | 'direction';
  holdOptions?: Array<'anchor' | 'clarity' | 'connection' | 'direction'>;
  onLoopStart?: (config: LoopConfig) => void; // replaces onTap/onLongPress
  // ... existing props
}
```

#### 1.2 TraceObject → TraceTile
**Current State**: Single-view trace with grip metadata
**Evolution**:
- Add view modes: `me` (identity) | `care` (signal) | `system` (integrity)
- Same traceId, different altitude renderings
- Wire into TraceTravel for transformation demo

**New Props**:
```typescript
interface TraceTileProps {
  traceId: string;
  view: 'me' | 'care' | 'system';
  density?: 'airy' | 'compact';
  // ... existing props
}
```

**View Renderings**:
- **Me view**: "Breathed through it. Stayed present." (identity reinforcement)
- **Care view**: "Arousal regulation protocol executed. Target: settle wave. Duration: 10s. Drift: low." (signal)
- **System view**: "Consent: granted. Escalation: none. Reliability: 100%. Logged at [timestamp]." (integrity)

#### 1.3 ThreadView Enhancement
**Current State**: Continuity line with individual traces
**Evolution**:
- Add `showClusters` prop for weekly installs (Journey grouping)
- Add range presets (7d | 30d | 90d)
- Add grouping (daily | weekly)

**New Props**:
```typescript
interface ThreadViewProps {
  range?: '7d' | '30d' | '90d';
  grouping?: 'daily' | 'weekly';
  showClusters?: boolean; // Journey = weekly install clusters
  // ... existing props
}
```

#### 1.4 GripGenerator → Intent Chooser
**Current State**: Direction + Duration picker
**Evolution**:
- Rename directions to intents: anchor | clarity | connection | direction
- Add "Why this?" drawer (shows target + mechanism)
- Wire into LoopRunner routing

**Updated Copy**:
- Anchor → "Settle the wave"
- Clarity → "Steady your mind"
- Connection → "Repair/relate"
- Direction → "Find your next move"

#### 1.5 LensControl Enhancement
**Current State**: Altitude toggle (Individual | Professional | Organisation)
**Evolution**:
- Add `sticky` mode (persists across page scrolls)
- Add URL param sync (`?lens=professional`)
- Add keyboard shortcuts (1/2/3)

---

### Phase 2: Build Critical Tier B Components (Week 2)

#### 2.1 LoopRunner (Belief Machine)
**Purpose**: Demonstrate OS loop without teaching it
**Story Job**: Show Sense → Route → Deliver → Seal as experience

**Component Anatomy**:
```typescript
interface LoopRunnerProps {
  tempo: 'moment' | 'week';
  depth: 'glance' | 'seed' | 'thread' | 'journey';
  intent: 'anchor' | 'clarity' | 'connection' | 'direction';
  onReceiptCreate?: (trace: TraceObject) => void;
}
```

**UI Structure**:
- 4-beat ring (subtle, peripheral)
- Center: one move (UniversalPlayer-style)
- Bottom: seal animation → produces TraceTile
- Right rail: artifact appears

**Motion Sequence**:
1. **Sense** (120ms): Input signals fade in
2. **Route** (300ms): Conductor animation (why this move)
3. **Deliver** (variable): Move executes (breath, orient, etc.)
4. **Seal** (600ms): Receipt forge animation → TraceTile appears

**States**:
- sensing → routing → delivering → sealing → sealed

#### 2.2 ReceiptForge (Object Creator)
**Purpose**: Make proof tangible, sacred, non-performative
**Story Job**: Turn moment into Trace with dignity

**Component Anatomy**:
```typescript
interface ReceiptForgeProps {
  preState?: string;
  postState?: string;
  note?: string; // one line max
  targetMeta?: object; // hidden by default
  onSeal: (trace: TraceObject) => void;
}
```

**UI Flow**:
1. **Draft state**: Translucent card, dashed border
2. **Seal prompt**: "Save this as a Trace?" (optional, one-tap)
3. **Seal animation**: Glass solidifies, stamp appears
4. **Sealed state**: Trace appears in ThreadView + Vault

**Copy Rules**:
- Individual: "Breathed through it" (felt, physical)
- Professional: "Arousal regulation maintained" (pattern language)
- Organisation: "Protocol executed, logged" (infrastructure)

**No Celebration**:
- No confetti, no "streak" language
- Only: "Sealed." with subtle stamp animation
- Trace appears quietly in thread

#### 2.3 TraceTravel (Ecosystem Reveal)
**Purpose**: Same trace → three altitude renderings
**Story Job**: Show "receipt travels up the spine"

**Component Anatomy**:
```typescript
interface TraceTravelProps {
  traceId: string;
  trigger: 'toggle' | 'scroll' | 'auto';
  defaultViewByLens?: boolean;
}
```

**Interaction**:
- **Toggle**: LensControl switches view
- **Scroll**: Scroll position triggers transformation
- **Auto**: Animates through all three views on mount

**UI Structure**:
- Three stacked TraceTiles (same ID, different altitude)
- Smooth transform animation between views
- Labels evolve, IDs don't

**Example Flow**:
```
Me view:
"Noticed the pattern. Breathed through it."
[anchor badge] [10s] [1 hour ago]

↓ (lens switch to Professional)

Care view:
Target: Arousal regulation
Mechanism: Breath + orient
Primitive: Box breath 4x
Dose: 10s
Drift: Low → Stable
[Signal ready for review]

↓ (lens switch to Organisation)

System view:
Trace ID: 7f8e9a12
Consent: Granted (full scope)
Escalation: None required
Reliability: 100% delivery
Logged: 2026-01-09T14:32:18Z
[Audit trail complete]
```

---

### Phase 3: Build Portal (Website-Within-Website) (Week 3-4)

#### 3.1 RecoveryOS Portal Architecture
**Purpose**: Flagship immersive explorer
**Story Job**: Let people explore, run, and see RecoveryOS without leaving the page

**Component Anatomy**:
```typescript
interface PortalProps {
  defaultLens?: 'individual' | 'professional' | 'organisation';
  mode?: 'calm' | 'focus';
  embedded?: boolean; // true = section, false = full-screen
}
```

**UI Structure**:
```
┌─────────────────────────────────────────┐
│ [Spine Rail]  [Prompt Corridor]  [Artifacts] │
│                                         │
│  Rooms:       What do you want?         TraceTiles │
│  • Moment     ├─ Settle the wave        appear here │
│  • Week       ├─ Steady your mind       as portal  │
│  • Explore    ├─ Repair/relate          generates  │
│  • Trust      └─ Find direction         proof      │
│                                         │
│               [LoopRunner executes]     │
│                                         │
│               [ReceiptForge seals]      │
└─────────────────────────────────────────┘
```

**Portal Prompt Tree**:
```typescript
interface PortalFlow {
  step: 'lens' | 'tempo' | 'depth' | 'intent' | 'route' | 'move' | 'receipt';
  prompts: {
    lens: ['Individual', 'Professional', 'Organisation'];
    tempo: ['Moment (NaviCue)', 'Week (Journey)'];
    depth: ['Glance', 'Seed', 'Thread', 'Journey'];
    intent: ['Anchor', 'Clarity', 'Connection', 'Direction'];
  };
}
```

**Portal Rooms** (selectable tiles):
1. **Run a Moment** → NaviCue simulator → LoopRunner
2. **Install a Week** → Journey simulator → ERA cadence preview
3. **Explore the Spine** → SpineAtlas → zoom map
4. **See Orchestration** → ConductorView → feed with spine
5. **Trust & Rails** → ConsentMap + EscalationRail + IntegrityLog

**Motion States**:
- idle (cinematic ambient field)
- prompting (choices fade in)
- routing (conductor animation)
- running (LoopRunner executes)
- sealing (ReceiptForge)
- elevating (TraceTravel across lenses)

**Accessibility**:
- Keyboard-first navigation (arrow keys, Enter, Escape)
- "Skip experience" always available
- Reduced motion mode (instant transitions)
- Privacy copy visible when rails are visible

#### 3.2 Portal Integration Points
**Keynote Page**:
- Section 05 (after Grip demo): "Try it now" → opens Portal in-place
- Sticky footer: "Explore RecoveryOS" → Portal toggle

**Standalone Page**:
- `/studio` → Full-screen Portal experience
- `/explore` → Alias to studio

**Floating Mini-Portal**:
- OS dock-style persistent access
- Minimizes to corner icon
- Reopens from any page

---

### Phase 4: Build Supporting Tier B Components (Week 5)

#### 4.1 ConductorView (LUMA Orchestrator)
**Purpose**: Show "feed with spine" — why this move, right now
**Story Job**: Orchestration without AI hype

**Component Anatomy**:
```typescript
interface ConductorViewProps {
  inputsVisible: 'minimal' | 'expanded';
  whyDrawer?: boolean;
  governanceOverlay?: boolean;
}
```

**UI Structure**:
- **Input signals** (minimal): Energy, Clarity, Anchorage (chips)
- **Governance rails**: Consent boundaries, quiet hours, escalation readiness
- **Routed move**: Target + mechanism + primitive + dose
- **"Why this" drawer**: Always available, never mandatory

**States**:
- listening → routing → delivering → logging

#### 4.2 SpineAtlas (Framework Explorer)
**Purpose**: Explore Pillars → Concepts → Themes → Schema → Mindblocks
**Story Job**: Depth without drowning

**Component Anatomy**:
```typescript
interface SpineAtlasProps {
  level: 'pillars' | 'concepts' | 'themes' | 'schema' | 'mindblocks';
  nodeId?: string;
  depth: 'glance' | 'seed' | 'thread' | 'journey';
  showRunThis?: boolean;
}
```

**Interaction**:
- Zoom in/out across levels
- Each node reveals 3 things:
  1. What it changes (human language)
  2. How it runs (loop primitive)
  3. What proof looks like (trace archetype)

**Every Node Offers**:
- "Run a Moment" (NaviCue)
- "Install a Week" (Journey)
- "See Proof" (example TraceTile)

#### 4.3 RoomSwitcher
**Purpose**: Modules as rooms (Journeys / NaviCues / Toolkit / Wellbeing / State)
**Story Job**: Explain purpose without feature lists

**Component Anatomy**:
```typescript
interface RoomSwitcherProps {
  room: 'journeys' | 'navicues' | 'toolkit' | 'wellbeing' | 'state';
  entryDepth?: 'glance' | 'seed' | 'thread' | 'journey';
  lens: 'individual' | 'professional' | 'organisation';
}
```

**Room Cards**:
- **Journeys**: Baseline install cycles (weekly rhythm)
- **NaviCues**: Moment steering, mini-apps (micro-interventions)
- **Toolkit**: Meaning on demand (library, not engine)
- **Wellbeing**: Nervous system first (arousal regulation)
- **State**: Heartbeat used to route, not track

---

### Phase 5: Build Trust Surfaces (Tier C) (Week 6)

#### 5.1 ConsentMap
**Purpose**: Consent as first-class UI
**Story Job**: Make "what system can see/do/ask" readable

**Component Anatomy**:
```typescript
interface ConsentMapProps {
  visibilityLevels: Array<{ label: string; granted: boolean }>;
  sharingOptions: Array<{ label: string; enabled: boolean }>;
  defaultsByLens?: boolean;
}
```

**UI Grid**:
```
What the system can see:
☑ State signals (Energy, Clarity, Anchorage)
☐ Location data
☐ Calendar integration

When it asks:
☑ Before routing a move
☑ Before saving a Trace
☐ Before sharing with care team

What it never touches:
✓ Content of private notes (sealed)
✓ Device data beyond app
✓ Contacts or messages
```

#### 5.2 EscalationRail
**Purpose**: Clean handoff under drift
**Story Job**: Show human boundary with dignity

**Component Anatomy**:
```typescript
interface EscalationRailProps {
  supportGraphEnabled?: boolean;
  handoffTypes: Array<'peer' | 'clinician' | 'crisis'>;
  consentGate?: boolean;
}
```

**States**:
- self-route (tighten dose, switch primitive)
- tighten dose (increase frequency)
- switch primitive (different mechanism)
- handoff (consent gate) → brings in human

#### 5.3 IntegrityLogPreview
**Purpose**: Make auditable logs readable
**Story Job**: Defensibility without bureaucracy

**Component Anatomy**:
```typescript
interface IntegrityLogPreviewProps {
  detail: 'summary' | 'expanded';
  filters?: { consent?: boolean; escalation?: boolean; reliability?: boolean };
}
```

**Shows**:
- Routed action (what was delivered)
- Consent state (was permission granted?)
- Escalation adherence (did handoff follow protocol?)
- Delivery reliability (was it delivered as routed?)

#### 5.4 GovernanceLockMap
**Purpose**: Show stability contract (LOCKED / CONTROLLED / EXPANDABLE)
**Story Job**: Prove system won't drift

**Component Anatomy**:
```typescript
interface GovernanceLockMapProps {
  showExamples?: boolean;
  showIdStability?: boolean;
}
```

**UI**:
- Three concentric rings:
  - **LOCKED** (core): Loop structure, consent model, escalation protocols
  - **CONTROLLED** (middle): Primitives, targeting, routing logic
  - **EXPANDABLE** (edge): Labels, copy, UI themes
- Hover reveals examples
- "Labels evolve. IDs don't." principle shown

---

## Component Dependencies & Build Order

### Sprint 1: Evolve Existing (5 days)
1. ReturnButton → add intentDefault + holdOptions
2. TraceObject → add view modes (me/care/system)
3. ThreadView → add clusters + range/grouping
4. GripGenerator → rename to IntentChooser, update copy
5. LensControl → add sticky mode

### Sprint 2: Critical Tier B (10 days)
1. LoopRunner (foundation for everything)
2. ReceiptForge (proof creation)
3. TraceTravel (altitude transformation)

### Sprint 3: Portal Foundation (10 days)
1. Portal shell (routing, state management)
2. Prompt corridor (guided flow)
3. Artifact rail (trace generation)
4. Room integration (Moment/Week/Explore/Trust)

### Sprint 4: Portal Rooms (10 days)
1. Moment room → LoopRunner integration
2. Week room → ERA cadence preview
3. Explore room → SpineAtlas
4. Trust room → ConsentMap + EscalationRail

### Sprint 5: Trust Surfaces (5 days)
1. ConsentMap
2. EscalationRail
3. IntegrityLogPreview
4. GovernanceLockMap

### Sprint 6: Polish & Integration (5 days)
1. Portal animations (arrive/glide/settle/carry)
2. Accessibility audit
3. Reduced motion support
4. Keyboard navigation
5. Story coverage validation

---

## Narrative Mechanics (How Components Tell the Story)

### Mechanic 1: Objects Are the Story
Visitor doesn't learn by reading. They watch objects appear:
- Tap ReturnButton → LoopRunner routes → Move executes → ReceiptForge seals → TraceTile appears in ThreadView
- This mirrors: delivery → proof → transfer spine

### Mechanic 2: Depth Is a Dial, Not a Page
Glance/Seed/Thread/Journey becomes universal UI control. Anyone can go deeper without leaving scene.

### Mechanic 3: Lens Changes Interpretation, Not Structure
Same component tree. Different defaults:
- Individual → felt relief + identity
- Professional → signal + coherence
- Organisation → rails + integrity

### Mechanic 4: No Dead Zones
Every component maps to one of the four realities:
- **Loop** → LoopRunner, ReturnButton, ReceiptForge
- **Rooms/Tempos** → RoomSwitcher, NaviCueGallery, JourneyStudio
- **Proof Objects** → TraceTile, TraceTravel, ThreadView
- **Safe at Scale** → ConsentMap, EscalationRail, IntegrityLog, GovernanceLockMap

---

## Implementation Checklist

### MVP (Minimum Viable Portal)
- [ ] LoopRunner (Sense → Route → Deliver → Seal visualization)
- [ ] ReceiptForge (proof creation)
- [ ] TraceTravel (me/care/system transformation)
- [ ] Portal shell (prompt corridor + artifact rail)
- [ ] Moment room (NaviCue simulator)

### V1 (Full Story Coverage)
- [ ] All Tier A components evolved
- [ ] All Tier B belief machines built
- [ ] Portal with 5 rooms (Moment/Week/Explore/Orchestration/Trust)
- [ ] SpineAtlas (framework explorer)
- [ ] ConductorView (LUMA orchestrator)

### V2 (Trust & Scale)
- [ ] All Tier C trust surfaces
- [ ] IntegrityLogPreview
- [ ] GovernanceLockMap
- [ ] EscalationRail with consent gates
- [ ] Full accessibility audit

---

## Key Principles from Registry

1. **No celebration, only inevitability** — Proof is sealed, not "achieved"
2. **No streak language, ever** — ThreadView shows continuity, not performance
3. **Depth is a dial** — Glance/Seed/Thread/Journey across all components
4. **Labels evolve, IDs don't** — Governance stability built into component contracts
5. **Consent by design** — Not compliance theater, actual first-class UI
6. **Feed with spine** — LUMA orchestration shows *why*, not just *what*
7. **Dignity-first** — No shaming states, no "you failed" copy
8. **One OS, three altitudes** — Same component tree, lens changes interpretation

---

## Next Actions

1. **Read Component Ideas document** (already in workspace) for additional patterns
2. **Create LoopRunner component** (critical path, unblocks everything)
3. **Evolve TraceObject to support view modes** (me/care/system)
4. **Build TraceTravel transformation** (altitude reveal)
5. **Scaffold Portal shell** (routing + state management)

This evolution plan transforms the existing Continuity Layer into the full RecoveryOS reveal architecture outlined in the Component Registry, maintaining all existing work while maturing components toward the "OS reveal: feel → understand → trust → scale" narrative.
