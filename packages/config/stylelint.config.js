module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier'
  ],
  rules: {
    // Design system specific rules
    'color-no-invalid-hex': true,
    'color-named': 'never',
    'unit-allowed-list': ['px', 'rem', '%', 'em', 'vh', 'vw', 'vmin', 'vmax', 'deg', 'ms', 's'],
    'property-no-unknown': [true, {
      ignoreProperties: [
        // CSS custom properties for design tokens
        /^--/
      ]
    }],
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]+$',
      {
        message: 'Class names must be lowercase and contain only letters and numbers'
      }
    ],
    'max-nesting-depth': 3,
    'no-descending-specificity': null // Allow CSS cascade for component styling
  }
};