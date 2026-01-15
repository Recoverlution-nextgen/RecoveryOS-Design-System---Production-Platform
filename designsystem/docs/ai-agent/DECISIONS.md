DECISIONS — persistent decision ledger

Template for recording human or agent decisions that change repo policy or canonical structure.

Each entry format:

- id: YYYYMMDD-<short>
- author: <human or agent-id>
- date: YYYY-MM-DDThh:mm:ssZ
- summary: short description
- rationale: why
- files_changed: [list of files]
- action: what was done (moved/archived/merged)

Example:

- id: 2026-01-15-archive-legacy
- author: alice@example.com
- date: 2026-01-15T12:00:00Z
- summary: Archive nested `design-system/` legacy repo
- rationale: duplicate tokens and UI cause drift; canonical root is top-level
- files_changed: ["design-system/*"]
- action: moved to `/archive/design-system-legacy`
