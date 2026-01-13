# RecoveryOS Design System — Decision Ledger

## Template
- Date:
- Decision:
- Why:
- Impacts:
- Replaces:
- Migration notes:

---

## Decisions

### [YYYY-MM-DD] Focus ring rule
- Decision: Focus ring is universal token `--semantic-focus-ring` across all objects.
- Why: Muscle memory + accessibility consistency.
- Impacts: ReturnButton, Rails, Player, Toast, Receipts, Overlays.
- Replaces: Component-scoped focus colors.
- Migration notes: Remove any component-specific focus tokens.