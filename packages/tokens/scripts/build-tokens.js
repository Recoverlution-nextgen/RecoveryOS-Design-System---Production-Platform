#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const TOKENS_SRC = path.resolve(__dirname, "../tokens.source.json");
const OUT_DIR = path.resolve(__dirname, "../dist");
const ROOT = path.resolve(__dirname, "../../..");
const SYNC_TARGETS = [
  path.join(ROOT, "packages/ui/src/tokens.css"),
  path.join(ROOT, "lib/design-system/tokens.css"),
];

function loadJSON(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function toKebab(key) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase();
}

function flattenTokens(value, prefix = [], acc = []) {
  if (typeof value === "string" || typeof value === "number") {
    acc.push({ name: `--${prefix.join("-")}`, value });
    return acc;
  }
  if (Array.isArray(value)) {
    throw new Error(`Tokens should be objects, not arrays at ${prefix.join(".")}`);
  }
  if (value && typeof value === "object") {
    for (const [key, nested] of Object.entries(value)) {
      flattenTokens(nested, [...prefix, toKebab(key)], acc);
    }
    return acc;
  }
  throw new Error(`Unsupported token shape at ${prefix.join(".")}`);
}

function hasPath(obj, pathSegments) {
  let current = obj;
  for (const segment of pathSegments) {
    if (!current || typeof current !== "object" || !(segment in current)) return false;
    current = current[segment];
  }
  return true;
}

function validate(tokens) {
  const requiredPaths = [
    ["primitive", "colors"],
    ["primitive", "spacing"],
    ["semantic", "colors"],
    ["semantic", "spacing"],
    ["motion"],
  ];
  for (const pathSegments of requiredPaths) {
    if (!hasPath(tokens, pathSegments)) {
      throw new Error(`Missing required token path: ${pathSegments.join(".")}`);
    }
  }
  return true;
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function ensureOutDir() {
  ensureDir(path.join(OUT_DIR, "placeholder"));
}

function generateCSS(tokens) {
  const pairs = flattenTokens(tokens);
  const lines = [":root {"];
  for (const { name, value } of pairs) {
    lines.push(`  ${name}: ${value};`);
  }
  lines.push("}");
  return lines.join("\n");
}

function generateJS(tokens) {
  return `module.exports = ${JSON.stringify(tokens, null, 2)};\n`;
}

function writeOutputs(tokens) {
  ensureOutDir();
  const css = generateCSS(tokens);
  const js = generateJS(tokens);
  fs.writeFileSync(path.join(OUT_DIR, "tokens.css"), css, "utf8");
  fs.writeFileSync(path.join(OUT_DIR, "index.js"), js, "utf8");
  fs.writeFileSync(
    path.join(OUT_DIR, "index.d.ts"),
    `declare const tokens: any; export = tokens;\n`,
    "utf8"
  );

  for (const target of SYNC_TARGETS) {
    ensureDir(target);
    fs.writeFileSync(target, css, "utf8");
  }
}

function main() {
  const args = process.argv.slice(2);
  const validateOnly = args.includes("--validate-only");
  if (!fs.existsSync(TOKENS_SRC)) {
    console.error("tokens.source.json not found at", TOKENS_SRC);
    process.exit(1);
  }
  const tokens = loadJSON(TOKENS_SRC);
  try {
    validate(tokens);
  } catch (err) {
    console.error("Token validation failed:", err.message);
    process.exit(2);
  }
  if (validateOnly) {
    console.log("Validation passed");
    process.exit(0);
  }
  writeOutputs(tokens);
  console.log("Tokens built to", OUT_DIR);
}

if (require.main === module) main();
