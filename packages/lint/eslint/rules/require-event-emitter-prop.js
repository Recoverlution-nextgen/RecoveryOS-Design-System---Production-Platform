module.exports = {
  meta: { type: "problem", docs: { description: "Require onEmit prop in exported Props interfaces." }, schema: [] },
  create(context) {
    return {
      TSInterfaceDeclaration(node) {
        const name = node.id && node.id.name;
        if (!name || !name.endsWith("Props")) return;

        const members = node.body.body || [];
        const hasOnEmit = members.some(m => m.key && m.key.name === "onEmit");
        if (!hasOnEmit) {
          context.report({
            node,
            message: `${name} must include onEmit?: (event) => void to support governed telemetry.`
          });
        }
      }
    };
  }
};