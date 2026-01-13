const noHardcodedColors = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow hardcoded color values in JSX',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.name === 'style' || node.name.name === 'className') {
          // Skip className attributes, focus on inline styles
          if (node.name.name === 'className') return;

          // Check for hardcoded color values in style objects
          if (node.value.type === 'JSXExpressionContainer') {
            const expression = node.value.expression;
            if (expression.type === 'ObjectExpression') {
              expression.properties.forEach(prop => {
                if (prop.key.name && ['color', 'backgroundColor', 'borderColor'].includes(prop.key.name)) {
                  if (prop.value.type === 'Literal' && typeof prop.value.value === 'string') {
                    const colorValue = prop.value.value;
                    // Check if it's a hardcoded color (not a CSS variable)
                    if (!colorValue.startsWith('var(--') && !colorValue.startsWith('--')) {
                      context.report({
                        node: prop.value,
                        message: `Hardcoded color "${colorValue}" found. Use semantic tokens from @recoveryos/tokens instead.`,
                      });
                    }
                  }
                }
              });
            }
          }
        }
      },
    };
  },
};

const noHardcodedSpacing = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow hardcoded spacing values in JSX',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.name === 'style') {
          if (node.value.type === 'JSXExpressionContainer') {
            const expression = node.value.expression;
            if (expression.type === 'ObjectExpression') {
              expression.properties.forEach(prop => {
                if (prop.key.name && ['margin', 'padding', 'gap', 'width', 'height'].includes(prop.key.name)) {
                  if (prop.value.type === 'Literal' && typeof prop.value.value === 'string') {
                    const spacingValue = prop.value.value;
                    // Check if it's a hardcoded spacing value (not a CSS variable)
                    if (!spacingValue.startsWith('var(--') && !spacingValue.startsWith('--')) {
                      context.report({
                        node: prop.value,
                        message: `Hardcoded spacing "${spacingValue}" found. Use semantic spacing tokens instead.`,
                      });
                    }
                  }
                }
              });
            }
          }
        }
      },
    };
  },
};

const noInternalEngineTerms = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow internal engine terminology in user-facing copy',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [],
  },
  create(context) {
    const forbiddenTerms = [
      'heat band',
      'arousal band',
      'amber',
      'red',
      'green',
      'yellow',
      'traffic light',
      'color-coded'
    ];

    return {
      Literal(node) {
        if (typeof node.value === 'string') {
          const lowerText = node.value.toLowerCase();
          forbiddenTerms.forEach(term => {
            if (lowerText.includes(term)) {
              context.report({
                node,
                message: `Internal engine term "${term}" found in user-facing copy. Use public language only.`,
              });
            }
          });
        }
      },
      JSXText(node) {
        const lowerText = node.value.toLowerCase();
        forbiddenTerms.forEach(term => {
          if (lowerText.includes(term)) {
            context.report({
              node,
              message: `Internal engine term "${term}" found in user-facing copy. Use public language only.`,
            });
          }
        });
      },
    };
  },
};

const requireEventEmission = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require RecoveryOS objects to emit structured events',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [],
  },
  create(context) {
    return {
      FunctionDeclaration(node) {
        // Check if this is a RecoveryOS component (has onEmit prop)
        const params = node.params;
        const hasOnEmit = params.some(param => {
          return param.type === 'Identifier' && param.name === 'onEmit';
        });

        if (hasOnEmit) {
          // This is likely a RecoveryOS component, check for event emission
          let hasEventEmission = false;

          // Simple check: look for onEmit calls in the function body
          function checkForEventEmission(node) {
            if (node.type === 'CallExpression' &&
                node.callee.type === 'Identifier' &&
                node.callee.name === 'onEmit') {
              hasEventEmission = true;
            }
            if (node.type === 'MemberExpression' &&
                node.object.type === 'Identifier' &&
                node.object.name === 'onEmit') {
              hasEventEmission = true;
            }
            for (const key in node) {
              if (node[key] && typeof node[key] === 'object') {
                checkForEventEmission(node[key]);
              }
            }
          }

          checkForEventEmission(node.body);

          if (!hasEventEmission) {
            context.report({
              node,
              message: 'RecoveryOS component must emit structured events via onEmit prop.',
            });
          }
        }
      },
    };
  },
};

module.exports = {
  rules: {
    'no-hardcoded-colors': noHardcodedColors,
    'no-hardcoded-spacing': noHardcodedSpacing,
    'no-internal-engine-terms': noInternalEngineTerms,
    'require-event-emission': requireEventEmission,
  },
};