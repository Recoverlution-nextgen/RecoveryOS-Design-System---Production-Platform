COMPONENT_DEFINITION_OF_DONE

Each component must satisfy the following before merging:

- Storybook story with examples and edge cases
- Unit tests covering behaviour
- Type-safe props and exported types
- Accessibility: keyboard nav + ARIA labels + color contrast
- Visual snapshot in the snapshots harness
- Documentation: usage, props, do/don't, rationale

If any item fails, the agent must open a remediation PR and not merge.
