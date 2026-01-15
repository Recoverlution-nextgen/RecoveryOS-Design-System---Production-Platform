#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const schema = require("../schema.schema.json");

const TOKENS_SRC = path.resolve(__dirname, "../tokens.source.json");
const OUT_DIR = path.resolve(__dirname, "../dist");

function loadJSON(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function validate(tokens) {
  // Minimal validation according to schema.schema.json: ensure color and spacing exist and colors are hex
  if (!tokens.color || !tokens.spacing) {
    throw new Error("tokens must include `color` and `spacing` top-level keys");
  }
  const hexRe = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  for (const [k, v] of Object.entries(tokens.color)) {
    if (typeof v !== "string" || !hexRe.test(v)) {
      throw new Error(`color.${k} must be a hex color string, got: ${v}`);
    }
  }
  return true;
}

function ensureOutDir() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
}

function generateCSS(tokens) {
  const lines = [":root {"];
  for (const [k, v] of Object.entries(tokens.color)) {
    lines.push(`  --color-${k}: ${v};`);
  }
  for (const [k, v] of Object.entries(tokens.spacing)) {
    lines.push(`  --spacing-${k}: ${v};`);
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
