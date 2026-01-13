#!/usr/bin/env node

/**
 * Token Build Script
 * Generates CSS variables and TypeScript types from tokens.json
 */

import fs from "node:fs";
import path from "node:path";

type TokenLeaf = { value: any; type?: string; description?: string };
type AnyObj = Record<string, any>;

const TOKENS_PATH = path.resolve(process.cwd(), "tokens.json");
const OUT_CSS = path.resolve(process.cwd(), "dist/tokens.css");
const OUT_DTS = path.resolve(process.cwd(), "dist/tokens.d.ts");

function loadJson(p: string) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function isLeaf(x: any): x is TokenLeaf {
  return x && typeof x === "object" && "value" in x;
}

function isPrimitiveValue(x: any): x is string | number {
  return typeof x === "string" || typeof x === "number";
}

function flattenTokens(root: AnyObj, prefix: string[] = []) {
  const out: Array<{ path: string; cssVar: string; value: any }> = [];
  for (const [k, v] of Object.entries(root)) {
    const kp = [...prefix, k];
    if (isLeaf(v)) {
      const tokenPath = kp.join(".");
      const cssVar = "--" + kp.join("-"); // primitive-colors-black etc
      out.push({ path: tokenPath, cssVar, value: v.value });
    } else if (isPrimitiveValue(v)) {
      const tokenPath = kp.join(".");
      const cssVar = "--" + kp.join("-");
      out.push({ path: tokenPath, cssVar, value: v });
    } else if (v && typeof v === "object") {
      out.push(...flattenTokens(v as AnyObj, kp));
    }
  }
  return out;
}

function resolveValue(tokens: AnyObj, v: any): any {
  if (typeof v === "string" && /^\{[a-zA-Z0-9_.-]+\}$/.test(v)) {
    const ref = v.slice(1, -1);
    const parts = ref.split(".");
    let cur: any = tokens;
    for (const p of parts) cur = cur?.[p];
    if (cur && typeof cur === "object" && "value" in cur) return resolveValue(tokens, cur.value);
    return v;
  }
  return v;
}

function main() {
  fs.mkdirSync(path.resolve(process.cwd(), "dist"), { recursive: true });

  const tokens = loadJson(TOKENS_PATH);
  const flat = [];

  // Flatten all top-level groups
  for (const [groupName, group] of Object.entries(tokens)) {
    if (groupName === "$schema") continue; // Skip schema reference
    if (group && typeof group === "object") {
      flat.push(...flattenTokens(group as AnyObj, [groupName]));
    }
  }

  const lines: string[] = [];
  lines.push("/* Generated. Do not edit by hand. */");
  lines.push(":root {");
  for (const t of flat) {
    const val = resolveValue(tokens, t.value);
    // Values can be numbers or strings; stringify safely
    lines.push(`  ${t.cssVar}: ${typeof val === "number" ? String(val) : String(val)};`);
  }
  lines.push("}");

  fs.writeFileSync(OUT_CSS, lines.join("\n"), "utf8");

  // Typings: export union of token paths and css vars
  const dts = `
/* Generated. Do not edit by hand. */
export type TokenPath =
${flat.map(t => `  | "${t.path}"`).join("\n")};

export type CssVar =
${flat.map(t => `  | "${t.cssVar}"`).join("\n")};
`;
  fs.writeFileSync(OUT_DTS, dts.trim() + "\n", "utf8");

  console.log("✅ Built dist/tokens.css and dist/tokens.d.ts");
}

main();