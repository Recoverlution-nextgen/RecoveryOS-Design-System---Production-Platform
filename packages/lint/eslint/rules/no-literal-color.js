const COLOR_PATTERNS = [
  /#[0-9a-fA-F]{3,8}\b/,
  /\brgb(a)?\s*\(/,
  /\bhsl(a)?\s*\(/
];

module.exports = {
  meta: {
    type: "problem",
    docs: { description: "Disallow literal colors; use CSS variables (tokens)." },
    schema: []
  },
  create(context) {
    function checkLiteral(str, node) {
      for (const re of COLOR_PATTERNS) {
        if (re.test(str)) {
          context.report({
            node,
            message: "Literal color detected. Use token CSS vars (e.g., var(--semantic-...))."
          });
          return;
        }
      }
    }

    return {
      Literal(node) {
        if (typeof node.value === "string") checkLiteral(node.value, node);
      },
      TemplateElement(node) {
        if (node.value && typeof node.value.raw === "string") checkLiteral(node.value.raw, node);
      }
    };
  }
};