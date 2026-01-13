const PX_RE = /(-?\d+(\.\d+)?)px\b/;

module.exports = {
  meta: {
    type: "problem",
    docs: { description: "Disallow literal px spacing; use tokens." },
    schema: [{
      type: "object",
      properties: {
        allow: { type: "array", items: { type: "string" } } // e.g. ["0px","1px"]
      },
      additionalProperties: false
    }]
  },
  create(context) {
    const opts = context.options[0] || {};
    const allow = new Set(opts.allow || ["0px", "1px"]);

    function check(str, node) {
      const m = str.match(PX_RE);
      if (!m) return;
      const raw = m[0];
      if (allow.has(raw)) return;
      context.report({ node, message: `Literal spacing "${raw}" detected. Use tokens (var(--space-*), var(--radius-*), etc.).` });
    }

    return {
      Literal(node) {
        if (typeof node.value === "string") check(node.value, node);
      },
      TemplateElement(node) {
        if (node.value && typeof node.value.raw === "string") check(node.value.raw, node);
      }
    };
  }
};