module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    // Disallow hardcoded colors
    'color-no-hex': true,
    'color-named': 'never',
    'color-no-invalid-hex': true,

    // Disallow hardcoded spacing values
    'declaration-property-value-disallowed-list': [
      {
        'margin': [/^\d+(px|rem|em|vh|vw|%)$/],
        'padding': [/^\d+(px|rem|em|vh|vw|%)$/],
        'gap': [/^\d+(px|rem|em|vh|vw|%)$/],
        'width': [/^\d+(px|rem|em|vh|vw|%)$/],
        'height': [/^\d+(px|rem|em|vh|vw|%)$/],
        'top': [/^\d+(px|rem|em|vh|vw|%)$/],
        'right': [/^\d+(px|rem|em|vh|vw|%)$/],
        'bottom': [/^\d+(px|rem|em|vh|vw|%)$/],
        'left': [/^\d+(px|rem|em|vh|vw|%)$/],
      },
      {
        message: 'Hardcoded spacing values are not allowed. Use semantic spacing tokens (--semantic-space-*) instead.',
      },
    ],

    // Enforce semantic token naming pattern
    'custom-property-pattern': [
      '^--semantic-',
      {
        message: 'Custom properties must follow semantic naming pattern (--semantic-*)',
      },
    ],

    // Allow CSS variables but enforce semantic usage
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['/var\\(--semantic-.*/'],
      },
    ],
  },
};