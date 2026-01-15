WORKFLOW — Threadkeeper operating workflow

Load → Plan → Execute → Verify → Close loop

Load

- Read `AI_SYSTEM_MAP.md`, `designsystem/docs/ai-agent/THREAD.md`, `DECISIONS.md`, `QUALITY_GATES.md`.

Plan

- Produce a small plan (3–6 steps). Each plan item must list the exact shell command(s) the agent will run and expected artifacts.

Execute

- Create feature branch named `ai/<task>-<timestamp>`
- Make code changes
- Run: lint, typecheck, token build, UI build, storybook build, snapshot tests, a11y checks

Verify

- Collate results. If any gate fails, stop and create a remediation task/PR. If all pass, proceed.

Close loop

- Add changeset entry
- Update `designsystem/docs/ai-agent/THREAD.md` and `DECISIONS.md` as needed
- Open PR with description, changelog entry and test artifacts
