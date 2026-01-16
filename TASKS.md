# RecoveryOS Delivery Stack (Epics → Stories)

Single-source backlog for agents to execute without Jira UI.

## Build Order (phases)
1) Platform shell + Universal Player core + LUMA summon/feed + STATE + Receipts baseline.
2) Journey Room + Navicues stream + Toolkit/Bag.
3) Navigate/SOS + Integrations framework + Command Center MVP.
4) Marketing site + demos.

## Epics and Stories

### Epic 0 — Operating Truth & Governance
- Define presence states (Ambient/Focused/Immersive/Regulate/Support) with UI + Player rules and logging.
- Define Cue + Receipt taxonomy (cue: type/intent/payload/inputs/constraints/routingRules; receipt: proof/signal/delta/tags/privacy).

### Epic 1 — Platform Shell UI/UX
- LUMA-first bottom nav (LUMA/Rooms/Momentum/Navigate), smooth transitions, deep links, a11y.
- Supabase auth skeleton (login/create, sessions, protected routes, profile/permissions in context).
- Global UI primitives (layout, type scale, spacing, dark mode) via tokens.
- Notification/reminder framework (local); created by Player/LUMA; history + snooze/dismiss.

### Epic 2 — Universal Player Runtime
- State machine: Cue → Input → Route → Receipt; linear + stream; interrupts; persistence.
- Cue registry + renderer (schema-driven; graceful unknowns; animation hooks).
- Inputs: text, voice capture stub + transcription hook, swipe/tap/hold events.
- Receipt generator (micro + sprint); Bag save; Momentum queries.
- Audio engine (queue, intent/mood/tempo, resume, beat stub); Video playback (series) with completion receipts.
- Dose grader/routing policy (intensity gating; "why this cue" metadata).

### Epic 3 — LUMA (Conductor Layer)
- Summon mechanics (orb/pill/sheet): tap→feed, hold→voice, swipe→quick navicue; consistent motion.
- LUMA Feed spine (cue cards, infinite scroll, explainability optional).
- LUMA Talk (prompt-led corridor → signals + receipts; room handoff).
- LUMA Voice (drop-in capture; voice receipt + transcript placeholder).
- LUMA Play (audio UI: queue, intent selector, save/share-to-self).

### Epic 4 — Journey Room
- Sprint template schema (13+ cues; E/R/A phases; inserts; wrap receipt).
- Immersive player UI (presence-progress; pause/finish/reroute; wrap receipt + next action).
- Introspection modules (text/voice with prompts) saved to Momentum.

### Epic 5 — NaviCues Stream
- Just-in-time navicue stream; selection respects dose + presence; offline fallback.
- Card interactions (swipe/tap/hold → micro-receipts).
- Navicue variety pack (10–15 types: Mirror, Probe, Somatic Scan, Myth Buster, Paradox Key, Proof Stamp, Witness Window, Value Thread, Pattern Bridge, Story Seed).

### Epic 6 — Wellbeing Studio
- Series library + filters; save to Bag.
- Scheduling flow (morning/evening/custom) → reminders + LUMA feed surfacing.

### Epic 7 — Toolkit + Bag
- Content types: Article/Insight/Practice/Soundbite renderable by Player; audio mode where applicable.
- Bag: save-from-anywhere, tags/folders, queue into LUMA Play.

### Epic 8 — STATE
- 5–10s check-in (Energy/Clarity/Anchorage) with gestures; creates state receipt; can shift presence state.
- State history/trends (light) with correlation hooks.

### Epic 9 — Momentum
- Momentum home: receipts + curves; integrity logs; filters.
- Mindblock traffic light (rules-based; can suggest Regulate state).

### Epic 10 — Navigate
- Support network (contacts + roles + escalation tiers).
- SOS flow (gesture from LUMA; templates; logs).
- Meetings/events adapters stub (AA/SMART/Meetup) with routing placeholders.

### Epic 11 — Settings/Integrations
- Connector framework; permissions/revoke; events to signals.
- Wearables ingestion schema stub (sleep/HRV/steps); minimal UI "connected" state.

### Epic 12 — Command Center
- Component playground (Storybook-like) for cue components with sample payloads.
- Content Assembly Lab (cue definitions, sprint templates, preview in embedded Player).
- Data console (view receipts/state/cue engagement; filter/export; role-based).

### Epic 13 — Marketing Site
- Foundations: Next + CMS, perf budgets, shared motion language.
- Interactive demos (simulated Player + LUMA feed; CTA tracking).

### Cross-cutting (X1–X3)
- X1 Design System + Motion System: tokens, motion primitives, reduced-motion variants; all surfaces use them.
- X2 Telemetry + Explainability: log cue show/interact/complete/receipt/route; "why this cue" metadata.
- X3 Performance + Offline: cache cue packs; offline capture for text/voice; fast resume.

## Ready artifacts
- Vercel setup: VERCEL_SETUP.md (projects/roots/build command/envs).
- Jira-style CSVs (if desired): jira/jira_epics.csv, jira/jira_stories.csv.
- Monorepo scaffold: apps (marketing/platform/command-center/storybook); shared packages (ui, player, luma, content, data, observability, config); shared configs (TS/ESLint/Prettier/Tailwind) under packages/config.

## Suggested immediate actions (unattended)
- pnpm install (refresh lockfiles).
- Create Vercel projects per VERCEL_SETUP.md and add env vars.
- If issue tracking is needed, run the provided Python importer with your Jira env vars (optional).
