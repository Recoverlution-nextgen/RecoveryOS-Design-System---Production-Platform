infinitely, exponential, next-generation apple-grade but always our way

# Apple-grade system kit (anchored to RecoveryOS)

## North star
- Build a neuroadaptive, consent-native experience that feels inevitable, not busy; quiet by default, precise under heat.
- Every surface routes the user to the next right move (Sense → Route → Deliver → Seal) and returns a receipt that stacks identity.
- Protect dignity and stability: right dose, right tone, right time; human handoff is clean and auditable.

## Experience pillars (mapped to RecoveryOS)
- **Continuity:** Journeys install baseline; NaviCues steer the moment; same OS, two tempos.
- **Proof-first:** Every move captures a receipt; receipts travel up the spine (person → clinician → org).
- **Safety by design:** Consent, appropriateness, quiet hours, escalation protocols; trust is verifiable.
- **State-first:** Body before story; interfaces respect biological load and heat bands.
- **Orchestrated simplicity:** A feed with a spine; one universal player; LUMA conducts, user doesn’t hunt.

## Brand voice & copy
- Tone: quietly competent, clinical without sterility, soulful without fluff. Short lines, active voice.
- Patterns: state → intent → move → receipt. Avoid abstract advice; anchor in the moment.
- Microcopy defaults: reassure, reduce pressure, celebrate micro-wins; avoid performance framing.

## Visual language
- **Palette:** Obsidian (#0C0D0F), Graphite (#1A1C1F), Mist (#E9ECF1), Bone (#F7F7F5), Accent Pulse (#4FB3FF), Warm Signal (#FFB677). High contrast, minimal accents.
- **Typography:** SF Pro (Display for headings, Text for body). Tracking slightly tight on headings (-1%), generous line-height on body (1.5). Numerics tabular for receipts.
- **Grid & spacing:** 8px base, 12-column fluid grid; density increases under heat-aware modes. Safe gutters for touch (min 48px targets).
- **Imagery:** Human, candid, low-drama; soft side-light, shallow depth of field. Avoid stock tropes; show hands, breath, environment. No voyeurism.
- **Iconography:** 1.5px strokes, rounded joins, geometric primitives; never decorative. Icons indicate state or action only.
- **Motion:** Purposeful, not bouncy. Enter/exit 160–220ms, micro-feedback 120ms, easing (0.19, 0.8, 0.2, 1). Under high-heat, reduce motion by 50% or disable.

## Core UI patterns (mapped to OS primitives)
- **Universal Player:** Runs Journeys and NaviCues; shows contract (target, mechanism, primitive, heat band, proof request). One touch to start, one to log proof.
- **NaviCue card:** Compact, single move, shows suitability band, intent, expected receipt. Primary action is “Place move”; secondary is “Later”.
- **Journey lane:** Weekly ERA loop (Experience → Recognise → Align) shown as three beats; each beat shows last receipt and next suggested primitive.
- **Proof stack:** Chronological receipts with identity tags; filters by state/aim/dose/target. Exportable for clinician view.
- **State rail:** Lightweight chips for Energy, Clarity, Anchorage; editable signals pull data only when needed.
- **Support lane:** SOS and human escalation surfaces are first-class; display consent scope and protocol chosen.

## Interaction principles
- Always default to the smallest possible move that can generate proof.
- Pre-commitment: show what will happen (dose, time, proof capture) before the user consents.
- Under heat: simplify UI, increase size/contrast, constrain choices to one.
- Under calm: expand context, allow exploration (Toolkit, Insights).
- Receipts are tangible: brief haptic/motion confirmation and a visible “stacked” receipt badge.

## Design tokens (draft)
```
Color
	surface/base: #0C0D0F
	surface/elevated: #1A1C1F
	text/primary: #F7F7F5
	text/secondary: #B7BCC6
	accent/primary: #4FB3FF
	accent/warm: #FFB677
	border/subtle: #2A2D33
	state/safe: #7EE0A3
	state/caution: #F6D365
	state/alert: #FF6F61

Typography
	display/1: 44/52 sf-pro-display semibold
	title/2: 28/34 sf-pro-display semibold
	body/1: 16/24 sf-pro-text regular
	body/2: 14/22 sf-pro-text regular
	mono/1: 13/20 sf-mono medium (for IDs, receipts)

Radius
	xs: 6px
	sm: 10px
	md: 14px
	lg: 18px

Elevation (overlay-safe)
	0: none
	1: 0 6px 20px rgba(0,0,0,0.18)
	2: 0 10px 30px rgba(0,0,0,0.22)

Motion
	duration/fast: 120ms
	duration/base: 180ms
	duration/slow: 240ms
	easing/base: cubic-bezier(0.19, 0.8, 0.2, 1)
```

## Components to define (system-first)
- **Atoms:** buttons (primary/quiet/destructive), chips (state, aim, dose), toggles (consent scopes), inputs with inline consent hints, timers.
- **Molecules:** NaviCue card, Journey beat, Proof pill, State chip trio, Consent sheet, Escalation chooser, Identity tag, Voice selector (Sparks/Flames/Embers).
- **Organisms:** Universal Player, Proof stack, State rail, Support lane, Toolkit library grid, Console view (clinician signal), Command Center integrity log.
- **Layouts:** Feed with spine (orchestrated list with section anchors), Dual-pane (Play + Proof), Calm canvas (Toolkit reading), Heat canvas (single-move focus).

## Asset strategy
- **Illustration:** Minimal lines + grain, 2–3 color bands; show motion arcs and breath traces; avoid caricatures.
- **Video:** Portrait micro-clips (10–20s), centered on body cues; optional subtitles on by default; soft vignettes to focus.
- **Audio:** Warm, close, low noise floor; haptics aligned to proof confirmation; decibel-safe defaults.
- **Photography:** Real environments; hands, breath, grounding objects; no clinical fluorescence.

## Accessibility & safety
- Color contrast ≥ 4.5:1 on actionable surfaces; provide high-contrast mode with accent swap to pure white/black.
- Motion-reduced mode uses fade/scale only; disable parallax.
- Touch targets ≥ 48px; voice control affordances; captions always available.
- Consent sheets are plain language; every integration lists what is pulled, when, and why. Users can revoke per-integration.

## Data, consent, defensibility
- Each action carries metadata: state, aim, dose, target, primitive, timestamp, consent scope, delivery ID.
- Delivery IDs immutable; labels can evolve; deprecation maps maintained (per Governance section).
- Integrity log: quiet hours adherence, consent adherence, escalation protocol, delivery reliability; exportable for audit.

## Build architecture (front-end)
- **Tokens:** store in a platform-agnostic JSON; generate CSS variables, iOS/Android assets, Figma styles.
- **Styles:** CSS variables per theme, layered with utility tokens; prefer container queries over breakpoint sprawl.
- **Components:** build as headless logic + presentational skin; ensure heat-mode variants. Consider React + TypeScript + Storybook for governance.
- **State:** event-driven; receipts and cues as immutable events; optimistic UI for proof capture with retry and integrity log.
- **Instrumentation:** capture proof success/fail, drop-off, motion preference, consent toggles; tie back to Governance metrics.

## Rollout sequence (practical)
1) Lock tokens + typography + palette; ship Storybook with tokens and 3 key molecules (NaviCue card, Proof pill, State chip).
2) Build Universal Player (headless + skinned) and Proof stack; wire ERA loop view.
3) Implement consent sheet + quiet hours + escalation chooser; integrate integrity log capture.
4) Launch feed-with-spine layout: orchestrated list with LUMA sections (Journeys, NaviCues, Toolkit inserts, State rails).
5) Add Toolkit calm mode and heat-mode UI variant; add motion-reduced and high-contrast themes.
6) Ship Console/Command views after event schema is stable; ensure deprecation maps and ID stability.

## Governance & QA
- Locked layers: pillars, primitives, KBE, Sparks/Flames/Embers formats. Controlled: concepts, themes, schemas. Expandable: families, mindblocks, voice variants.
- Component change process: proposal → prototype in Storybook → neuro/clinical review → consent/safety review → release with versioned contract.
- QA gates: contrast, motion-reduced, offline/poor-network proof capture, escalation flow, consent revocation, integrity log completeness.

## What I need to align next
- List of installed extensions/tooling (linters, formatters, Storybook, design-token pipelines) to wire into this plan.
- Preferred front-end stack (React/Next, mobile targets) and hosting of design tokens.
- Any existing assets (logos, photography) to map into the palette and motion rules.
