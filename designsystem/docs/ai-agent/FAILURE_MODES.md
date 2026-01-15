FAILURE_MODES — common rot patterns and detection

1. Token Drift

- Symptoms: two token sources, inconsistent variable names, visual mismatch across apps.
- Detection: token source-of-truth mismatch check; CI step to compare generated artifacts hash.

2. Snapshot rot

- Symptoms: committed large test artifacts, noisy snapshot diffs, flaky tests.
- Detection: snapshot size growth metric, CI flakiness tracker.

3. Over-abstraction

- Symptoms: components with 100+ props or forks for special cases.
- Detection: component complexity metric (lines + prop count) and codeowner review.

4. Entropy from legacy nests

- Symptoms: nested `design-system/` being edited; duplicate packages published.
- Detection: a pre-merge check forbidding edits to legacy unless DECISIONS.md entry exists.
