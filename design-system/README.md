# RecoveryOS Design System

**Single Source of Truth** - Last updated: January 2026 - MAJOR EXPANSION: Consolidated 25+ core design documents from archive/ and docs/

## Overview

RecoveryOS is a continuity layer for human change. This document serves as the authoritative blueprint for the design system, maintained and evolved as the product develops.

---

## Core Principles

### Experience Pillars
- **Continuity**: Journeys install baseline; NaviCues steer the moment
- **Proof-first**: Every move captures a receipt; receipts travel up the spine
- **Safety by design**: Consent, appropriateness, quiet hours, escalation protocols
- **State-first**: Body before story; interfaces respect biological load
- **Orchestrated simplicity**: A feed with a spine; one universal player

### Brand Voice
- **Tone**: Quietly competent, clinical without sterility, soulful without fluff
- **Patterns**: State → intent → move → receipt
- **Microcopy**: Reassure, reduce pressure, celebrate micro-wins

---

## Design Tokens

### Color System
```css
--c-purple-900: #3E2BB8;  /* Primary */
--c-cyan-500: #40E0D0;    /* Live states */
--c-green-500: #2FE6A6;   /* Growth */
--c-neutral-100: #FBFAFF; /* Surfaces */
```

### Typography
```css
--font-heading: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;
--font-body: "Inter", ui-sans-serif, system-ui, sans-serif;
--font-mono: "IBM Plex Mono", ui-monospace, monospace;
```

### Spacing & Layout
```css
--space-1: 4px;   /* xs */
--space-2: 8px;   /* sm */
--space-3: 12px;  /* md */
--space-4: 16px;  /* lg */
--space-5: 24px;  /* xl */
```

### Motion
```css
--duration-arrive: 420ms;
--duration-glide: 520ms;
--duration-settle: 680ms;
--easing-regulate: cubic-bezier(0.2, 0.8, 0.2, 1);
```

---

## Component Architecture

### Core Components

#### ReturnButton
**Purpose**: Universal action surface - the entry point to RecoveryOS
**States**: Idle, Hover, Press, Active, Confirm, Hold
**Variants**: Default (Anchor 10s), Custom (GripGenerator)

#### GripGenerator
**Purpose**: Choose direction and duration for micro-experience
**Options**:
- Direction: Anchor | Compass | Handrail
- Duration: 10s | 30s | 2m

#### TraceTile
**Purpose**: Tangible proof object with etched copy
**Features**: Seal animation, travel capability, lens transformation

#### ThreadView
**Purpose**: Continuity line showing traces over time
**Display**: Weekly rhythm, node connections, milestone markers

### UI Patterns

#### Universal Player
- Runs Journeys and NaviCues
- Shows contract (target, mechanism, primitive, heat band, proof request)
- One touch to start, one to log proof

#### Proof Stack
- Chronological receipts with identity tags
- Filters by state/aim/dose/target
- Exportable for clinician view

#### State Rail
- Energy, Clarity, Anchorage chips
- Editable signals with data pull on demand

---

## Lens System

### Three Altitudes
1. **Individual**: Ease + dignity focus
2. **Professional**: Continuity + clarity focus
3. **Organisation**: Reliability + governance focus

### Lens Behavior
- Same content, different priority
- Individual: Return → Grip → Trace → Thread
- Professional: Trace → Thread → Lens (Care view)
- Organisation: Trust → Integrity → Lens (System view)

---

## Implementation Guidelines

### File Structure
```
design-system/
├── README.md (this file)
├── tokens.json
├── components/
│   ├── ReturnButton.md
│   ├── GripGenerator.md
│   └── ...
├── patterns/
│   ├── UniversalPlayer.md
│   └── ProofStack.md
└── guidelines/
    ├── accessibility.md
    ├── motion.md
    └── voice.md
```

### Maintenance Process
1. **Proposals**: New changes proposed as PRs with design rationale
2. **Review**: Cross-functional review (design + engineering + clinical)
3. **Versioning**: Semantic versioning for breaking changes
4. **Deprecation**: Clear migration paths for component changes

### Quality Gates
- Contrast ratios ≥ 4.5:1
- Touch targets ≥ 48px
- Motion respects user preferences
- Consent mechanisms are clear and accessible

---

## Version History

- **v1.0** (Jan 2026): Initial consolidation from scattered docs
- **v0.9** (Dec 2025): Core component definitions
- **v0.8** (Nov 2025): Token system establishment

---

## Reference Documents

**Historical/Archive** (for context, not active reference):
- `docs/infinitely, exponential, next-generation apple-grade...`
- `archive/kit/Got it. I'll curate the whole kit map...`
- `archive/recoveryos.tokens.css/`

**Active Development**:
- Component specifications in `packages/ui/`
- Token implementations in `packages/ui/src/tokens/`
- Storybook for component documentation</content>
<parameter name="filePath">/Users/danielfincham/recoverlution-platform/design-system/README.md