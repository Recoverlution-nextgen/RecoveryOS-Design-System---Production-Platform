const TARGET_FILES = ["Trace", "Seal", "Toast", "Player", "Overlay"];

module.exports = {
  meta: { type: "problem", docs: { description: "Ensure reduced motion is handled in motion-heavy modules." }, schema: [] },
  create(context) {
    const filename = context.getFilename();
    if (!TARGET_FILES.some(k => filename.includes(k))) return {};

    return {
      Program(node) {
        const src = context.getSourceCode().getText(node);
        const hasReducedMotion =
          src.includes("prefers-reduced-motion") ||
          src.includes("useReducedMotion") ||
          src.includes("reducedMotion");

        if (!hasReducedMotion) {
          context.report({
            node,
            message: "Motion-heavy module must respect reduced motion (prefers-reduced-motion / useReducedMotion)."
          });
        }
      }
    };
  }
};