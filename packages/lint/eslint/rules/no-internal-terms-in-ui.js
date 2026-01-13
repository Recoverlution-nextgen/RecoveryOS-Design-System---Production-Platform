const FORBIDDEN = [
  "heat",
  "arousal_band",
  "amber",
  "red",
  "green",
  "traffic light",
  "deployment",
  "route_decision"
];

module.exports = {
  meta: {
    type: "problem",
    docs: { description: "Disallow internal engine terms in UI strings." },
    schema: []
  },
  create(context) {
    function check(str, node) {
      const s = str.toLowerCase();
      for (const w of FORBIDDEN) {
        if (s.includes(w)) {
          context.report({
            node,
            message: `Internal term "${w}" found in UI string. Use public language (Load/Drift/etc.) or move to Diagnostics-only.`
          });
          return;
        }
      }
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