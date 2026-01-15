TASK_TEMPLATES — repeatable agent PR template

Task template (agent-generated PR must include):

- Title: [agent] <short task summary>
- Branch: ai/<task>-<timestamp>
- Description:

  - What changed
  - Files touched
  - Commands run
  - CI status summary
  - How to review (manual checks)

- Checklist (agent ensures before opening PR):
  - [ ] lint passed
  - [ ] typecheck passed
  - [ ] storybook builds
  - [ ] a11y checks passed
  - [ ] snapshots updated/validated
  - [ ] changeset added (if package changes)

Use this as the PR body every time.
