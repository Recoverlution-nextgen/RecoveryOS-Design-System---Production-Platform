/**
 * @fileoverview Disallow literal motion values; use motion tokens
 * @author RecoveryOS Team
 */

const DUR_RE = /\b\d{2,4}ms\b/;
const EASE_RE = /cubic-bezier\s*\(/;

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow literal motion values; use motion tokens.',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      noLiteralMotion: 'Literal motion detected. Use tokens (var(--motion-dur-*), var(--motion-ease-*)).',
    },
    schema: [],
  },
  create(context) {
    const filename = context.getFilename();
    // Allow in motion-specific files and tests/docs
    if (!filename.includes('/motion/') &&
        !filename.includes('/objects/') &&
        !filename.includes('/tests/') &&
        !filename.includes('/docs/')) {
      return {};
    }

    function check(str, node) {
      if (DUR_RE.test(str) || EASE_RE.test(str)) {
        context.report({
          node,
          messageId: 'noLiteralMotion',
        });
      }
    }

    return {
      Literal(node) {
        if (typeof node.value === 'string') {
          check(node.value, node);
        }
      },

      TemplateElement(node) {
        if (node.value?.raw) {
          check(node.value.raw, node);
        }
      },

      // Also check CSS-in-JS template literals
      TemplateLiteral(node) {
        const sourceCode = context.getSourceCode();
        const text = sourceCode.getText(node);
        check(text, node);
      },
    };
  },
};