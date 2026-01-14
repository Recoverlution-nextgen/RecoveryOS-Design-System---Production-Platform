/* scripts/color-lint.js
   Run: node scripts/color-lint.js
   (CommonJS version for direct execution)
*/

const fs = require("fs");
const path = require("path");

/**
 * @typedef {Object} Violation
 * @property {string} file
 * @property {number} line
 * @property {string} rule
 * @property {string} detail
 */

const ROOT = process.cwd();

// Configure globs by simple path heuristics (no external deps)
const INCLUDE_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".mdx"]);
const EXCLUDE_DIRS = new Set(["node_modules", ".next", "dist", "build", "out", ".git"]);

// Token source exceptions
const TOKEN_FILES_ALLOW_HEX = [
  "COLOR_TOKENS.css",
  "tokens.css",
  "tokens.scss"
];

// Snapshot exceptions (optional)
const SNAPSHOT_ALLOW_HEX_DIR = "__snapshots";

const HEX_REGEX = /#[0-9a-fA-F]{3,8}\b/g;

// ===== TOKEN TIER SYSTEM (from TOKEN_USAGE.md) =====

// Tier A — Raw palette (never in components)
const FORBIDDEN_TIER_A = [
  "var(--neutral-",
  "var(--purple-",
  "var(--cyan-",
  "var(--green-"
];

// Tier B — Brand semantics (design system only, rare)
const FORBIDDEN_TIER_B = [
  "var(--semantic-identity",
  "var(--semantic-precision",
  "var(--semantic-growth"
];

// Tier D — Axis overlays (meaning layer components only)
const TIER_D_TOKENS = [
  "var(--state-",
  "var(--tint-",
  "var(--world-tint"
];

// Component type detection (from TOKEN_USAGE.md)
function getComponentType(filePath) {
  const p = filePath.replaceAll("\\", "/").toLowerCase();

  // Interaction Primitives (Tier C ONLY)
  if (
    p.includes("/button") ||
    p.includes("/link") ||
    p.includes("/toggle") ||
    p.includes("/switch") ||
    p.includes("/tabs") ||
    p.includes("/input") ||
    p.includes("/select") ||
    p.includes("/checkbox") ||
    p.includes("/radio") ||
    p.includes("/nav") ||
    p.includes("/rail") ||
    p.includes("/dialog")
  ) {
    return "interaction";
  }

  // Meaning Layer Components (Tier C + D allowed)
  if (
    p.includes("/chip") ||
    p.includes("/tag") ||
    p.includes("/badge") ||
    p.includes("/toast") ||
    p.includes("/checkpoint") ||
    p.includes("/chart") ||
    p.includes("/graph") ||
    p.includes("/sparkline") ||
    p.includes("/progress") ||
    p.includes("/meter") ||
    p.includes("/receipt") ||
    p.includes("/stamp")
  ) {
    return "meaning";
  }

  // Layout Surfaces (Tier C ONLY) - default for most components
  return "layout";
}

function shouldSkip(filePath) {
  const base = path.basename(filePath);
  if (TOKEN_FILES_ALLOW_HEX.includes(base)) return true;
  if (filePath.includes(`${path.sep}${SNAPSHOT_ALLOW_HEX_DIR}${path.sep}`)) return false; // snapshots still checked unless you change this
  return false;
}

function walk(dir, acc = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (EXCLUDE_DIRS.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, acc);
    else {
      const ext = path.extname(full);
      if (INCLUDE_EXT.has(ext)) acc.push(full);
    }
  }
  return acc;
}

function lintFile(file) {
  const rel = path.relative(ROOT, file);
  const text = fs.readFileSync(file, "utf8");
  const lines = text.split(/\r?\n/);

  const violations = [];
  const componentType = getComponentType(rel);


  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Rule: no hex in components (except token sources)
    if (!shouldSkip(rel)) {
      const hex = line.match(HEX_REGEX);
      if (hex) {
        violations.push({
          file: rel,
          line: i + 1,
          rule: "TOKEN_USAGE.md — No raw hex in components",
          detail: `Found hex color(s): ${hex.join(", ")} (use RecoveryOS tokens)`
        });
      }
    }

    // ===== TOKEN TIER ENFORCEMENT =====

    // Tier A (Raw palette) - NEVER in components
    for (const forbidden of FORBIDDEN_TIER_A) {
      if (line.includes(forbidden)) {
        violations.push({
          file: rel,
          line: i + 1,
          rule: "TOKEN_USAGE.md — Tier A forbidden in components",
          detail: `Found palette token: ${forbidden} (only allowed in token source files)`
        });
      }
    }

    // Tier B (Brand semantics) - Design system only, rare
    for (const forbidden of FORBIDDEN_TIER_B) {
      if (line.includes(forbidden)) {
        violations.push({
          file: rel,
          line: i + 1,
          rule: "TOKEN_USAGE.md — Tier B restricted",
          detail: `Found brand semantic: ${forbidden} (design system only, rare usage)`
        });
      }
    }

    // Tier D (Axis overlays) - Only in meaning layer components
    if (componentType !== "meaning") {
      for (const tierD of TIER_D_TOKENS) {
        if (line.includes(tierD)) {
          const componentDesc = componentType === "interaction" ?
            "Interaction primitives" : "Layout surfaces";
          violations.push({
            file: rel,
            line: i + 1,
            rule: `TOKEN_USAGE.md — Tier D restricted to meaning layer`,
            detail: `Found axis overlay token: ${tierD} (${componentDesc} must use Tier C only)`
          });
        }
      }
    }
  }

  return violations;
}

function main() {
  const files = walk(ROOT).filter((f) => !f.includes(`${path.sep}node_modules${path.sep}`));
  const all = [];

  for (const f of files) {
    all.push(...lintFile(f));
  }

  if (all.length) {
    // Pretty print
    console.error(`\n❌ Color lint failed (${all.length} issues)\n`);
    for (const v of all) {
      console.error(`${v.file}:${v.line}`);
      console.error(`  ${v.rule}`);
      console.error(`  ${v.detail}\n`);
    }
    process.exit(1);
  } else {
    console.log("✅ Color lint passed");
  }
}

main();
