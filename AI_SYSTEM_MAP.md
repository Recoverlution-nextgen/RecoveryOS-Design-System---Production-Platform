AI SYSTEM MAP — canonical layers

Canonical layers (agent-readable)

1. tokens (source-of-truth)

- location: `packages/tokens/`
- artifacts: tokens.json → generated CSS vars / TS exports

2. ui (components)

- location: `packages/ui/`
- consumes tokens via CSS variables

3. apps (clients / demos / docs)

- location: `apps/` (apps/web, apps/snapshots)
- must not define new tokens or core components

4. contracts & schema

- location: `packages/contracts` and `packages/schema`
- define typed interfaces and token/schema validation

Legacy: `design-system/` is archived or read-only unless DECISIONS.md authorizes changes.

Agent rules

- Respect tokens as single source-of-truth
- Refuse to modify nested legacy `design-system/` unless a decision exists
