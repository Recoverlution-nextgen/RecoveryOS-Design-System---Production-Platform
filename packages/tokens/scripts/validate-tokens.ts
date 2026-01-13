import fs from "node:fs";
import path from "node:path";
import Ajv from "ajv";
import addFormats from "ajv-formats";

type AnyObj = Record<string, any>;

const TOKENS_PATH = path.resolve(process.cwd(), "tokens.json");
const SCHEMA_PATH = path.resolve(process.cwd(), "schema/tokens.schema.json");

function loadJson(p: string) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function walk(obj: any, fn: (node: any, keyPath: string[]) => void, keyPath: string[] = []) {
  if (!obj || typeof obj !== "object") return;
  fn(obj, keyPath);
  for (const k of Object.keys(obj)) walk(obj[k], fn, [...keyPath, k]);
}

function isRef(v: any): v is string {
  return typeof v === "string" && /^\{[a-zA-Z0-9_.-]+\}$/.test(v);
}

function getByPath(root: AnyObj, dotted: string): any {
  const parts = dotted.split(".");
  let cur: any = root;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  return cur;
}

function resolveRefs(tokens: AnyObj) {
  const missing: string[] = [];
  const cycles: string[] = [];
  const visiting = new Set<string>();
  const visited = new Set<string>();

  function resolveValue(v: any, atPath: string): any {
    if (!isRef(v)) return v;
    const refPath = v.slice(1, -1); // strip {}
    if (visiting.has(refPath)) {
      cycles.push(`${atPath} -> ${refPath}`);
      return v;
    }
    if (visited.has(refPath)) return v;

    visiting.add(refPath);
    const refNode = getByPath(tokens, refPath);
    if (!refNode) missing.push(`${atPath} -> ${refPath}`);
    else {
      // Only enforce that referenced leaf contains value
      if (typeof refNode === "object" && "value" in refNode) {
        resolveValue(refNode.value, refPath + ".value");
      }
    }
    visiting.delete(refPath);
    visited.add(refPath);
    return v;
  }

  walk(tokens, (node, kp) => {
    if (node && typeof node === "object" && "value" in node) {
      const at = kp.join(".");
      resolveValue(node.value, at + ".value");
    }
  });

  return { missing, cycles };
}

/** Optional: enforce that semantic tokens do NOT point into component tokens (reverse dependency) */
function enforceLayering(tokens: AnyObj) {
  const violations: string[] = [];
  walk(tokens.semantic, (node, kp) => {
    if (node && typeof node === "object" && "value" in node && isRef(node.value)) {
      const refPath = node.value.slice(1, -1);
      if (refPath.startsWith("component.")) {
        violations.push(`semantic.${kp.join(".")} references ${refPath}`);
      }
    }
  });
  return violations;
}

function main() {
  const schema = loadJson(SCHEMA_PATH);
  const tokens = loadJson(TOKENS_PATH);

  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  const validate = ajv.compile(schema);
  const ok = validate(tokens);

  if (!ok) {
    console.error("❌ tokens.json failed schema validation");
    console.error(validate.errors);
    process.exit(1);
  }

  const { missing, cycles } = resolveRefs(tokens);
  if (missing.length) {
    console.error("❌ Missing token references:");
    for (const m of missing) console.error(" - " + m);
    process.exit(1);
  }
  if (cycles.length) {
    console.error("❌ Cyclic token references:");
    for (const c of cycles) console.error(" - " + c);
    process.exit(1);
  }

  const layering = enforceLayering(tokens);
  if (layering.length) {
    console.error("❌ Layering violations:");
    for (const v of layering) console.error(" - " + v);
    process.exit(1);
  }

  console.log("✅ tokens.json validated (schema + refs + layering)");
}

main();