AGENT_OPERATING_SYSTEM — rules & hygiene

1. Read before write: always load `AI_SYSTEM_MAP.md`, `THREAD.md`, and `DECISIONS.md`.
2. Small, deterministic diffs: prefer many small PRs with clear intent over giant refactors.
3. Non-negotiable checks: do not open PRs that fail local gates.
4. Audit trail: every change must update THREAD and, if policy-changing, DECISIONS.
5. Safe-mode: if >2 CI failures across consecutive runs for same task, escalate to a human and create an issue.
