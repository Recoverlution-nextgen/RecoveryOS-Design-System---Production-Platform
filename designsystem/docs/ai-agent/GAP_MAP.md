GAP_MAP — known gaps the agent must hunt

P0

- package manager standardization (remove package-lock.json and use pnpm)
- snapshot artifacts committed to repo
- token build scripts depending on TS runtime without runner

P1

- packages/ui missing a robust build/publish pipeline
- packages/schema referencing missing schema files
- nested legacy `design-system/` duplication

P2

- CODEOWNERS and governance missing
- documented snapshot policy absent
- reference apps missing or not canonical

Agent actions: for each gap, create a decision entry, propose fix, implement small PR, and update THREAD.
