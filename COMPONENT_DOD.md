# Component Definition of Done (RecoveryOS)

A component is not "done" until it is governed.

## 1) Contract
- [ ] Props typed
- [ ] `onEmit?: (event) => void` included (governed telemetry)
- [ ] No internal engine terms in UI strings (diagnostics-only)
- [ ] Lens + stateBand support if applicable

## 2) Tokens
- [ ] No literal colors, spacing, radii, shadows, durations
- [ ] Focus styles come from base CSS layer (token-driven)
- [ ] Motion uses motion tokens + respects reduced motion

## 3) Accessibility
- [ ] Keyboard works (roving tabindex where needed)
- [ ] Labels/roles correct (aria-live for toasts, etc.)
- [ ] Axe passes on snapshot routes

## 4) Visual regression
- [ ] Snapshot routes added
- [ ] Baselines updated intentionally (with Decision entry)

## 5) Docs
- [ ] Component spec updated (purpose, states, variants)
- [ ] Registry page exists under /__snapshots
- [ ] Migration note if replacing legacy component

## 6) Decisions
- [ ] If feel changed: DECISIONS.md entry (why + impact + migration)