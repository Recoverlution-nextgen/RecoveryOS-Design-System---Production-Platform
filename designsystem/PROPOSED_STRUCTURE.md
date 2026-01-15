PROPOSED_CANONICAL_STRUCTURE

Top-level proposal (canonical):

- apps/

  - web/ # Next.js docs / showcase
  - snapshots/ # visual regression harness

- packages/

  - tokens/ # single source-of-truth tokens + build
  - ui/ # React component library + stories
  - contracts/ # type contracts
  - schema/ # token/schema validation
  - copy/ # copy/content utilities
  - config/ # shared configs (eslint/prettier/stylelint)

- assets/ # binaries (icons, fonts)
- .github/ # workflows + CODEOWNERS
- designsystem/ # governance + ai agent docs (non-code artifacts)
- archive/ # legacy repositories (move nested design-system here)

Rules:

- Do not keep multiple token sources. Keep `packages/tokens/` as canonical.
- Move any Next.js docs inside `apps/docs` if needed.
- Archive nested `design-system/` to `archive/design-system-legacy`.
