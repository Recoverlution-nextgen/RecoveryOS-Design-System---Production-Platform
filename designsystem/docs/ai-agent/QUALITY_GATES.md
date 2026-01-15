QUALITY_GATES — Apple-grade+ definition of done

Mandatory CI gates (all must pass):

- lint (eslint + stylelint where applicable)
- typecheck (tsc)
- unit tests (vitest)
- storybook build
- a11y checks (axe / storybook-a11y)
- visual regression snapshots (Playwright or Chromatic)
- changeset present for package-affecting changes

Pre-merge checks:

- no package-lock.json in repository root
- tokens build runs and generated artifacts hash-verified
- CODEOWNERS reviewers assigned for tokens/ui

Release gates:

- auto-generated changelog
- publish only via automation with provenance stamp
