#!/usr/bin/env node

/**
 * Token Build Script
 * Generates CSS variables and TypeScript types from tokens.json
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface TokenGroup {
  [key: string]: any;
}

interface Tokens {
  [group: string]: TokenGroup;
}

// Load tokens
const tokensPath = join(dirname(__filename), '../tokens.json');
const tokens: Tokens = JSON.parse(readFileSync(tokensPath, 'utf8'));

function resolveRefs(tokens: Tokens): Map<string, any> {
  const resolved = new Map<string, any>();

  function resolveValue(value: any): any {
    if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
      const ref = value.slice(1, -1);
      if (resolved.has(ref)) {
        return resolved.get(ref);
      }

      const refValue = getTokenValue(ref);
      if (refValue !== undefined) {
        resolved.set(ref, refValue);
        return refValue;
      }
      throw new Error(`Unresolved reference: ${ref}`);
    }
    return value;
  }

  function getTokenValue(path: string): any {
    const parts = path.split('.');
    let current: any = tokens;

    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return undefined;
      }
    }

    return current;
  }

  // Resolve all token values
  for (const [groupName, group] of Object.entries(tokens)) {
    for (const [tokenName, tokenValue] of Object.entries(group)) {
      const fullPath = `${groupName}.${tokenName}`;
      resolved.set(fullPath, resolveValue(tokenValue));
    }
  }

  return resolved;
}

function generateCSSVariables(resolved: Map<string, any>): string {
  let css = ':root {\n';

  for (const [path, value] of resolved) {
    const cssVarName = `--${path.replace(/\./g, '-')}`;
    css += `  ${cssVarName}: ${value};\n`;
  }

  css += '}\n';
  return css;
}

function generateTypeScriptTypes(tokens: Tokens): string {
  let types = '// Auto-generated RecoveryOS token types\n\n';

  // Generate type for each group
  for (const [groupName, group] of Object.entries(tokens)) {
    types += `export interface ${capitalize(groupName)}Tokens {\n`;
    for (const tokenName of Object.keys(group)) {
      const quotedName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(tokenName) ? tokenName : `"${tokenName}"`;
      types += `  ${quotedName}: string;\n`;
    }
    types += '}\n\n';
  }

  // Generate main Tokens interface
  types += 'export interface RecoveryOSTokens {\n';
  for (const groupName of Object.keys(tokens)) {
    const quotedName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(groupName) ? groupName : `"${groupName}"`;
    types += `  ${quotedName}: ${capitalize(groupName)}Tokens;\n`;
  }
  types += '}\n\n';

  // Generate utility types
  types += '// Utility types for token references\nexport type TokenReference = `{${string}}`;\n';
  types += 'export type ResolvedTokenValue = string | number;\n';

  return types;
}

function capitalize(str: string): string {
  return str.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
}

function main() {
  console.log('🔨 Building RecoveryOS tokens...\n');

  try {
    // Resolve references
    console.log('🔗 Resolving token references...');
    const resolved = resolveRefs(tokens);
    console.log(`✅ Resolved ${resolved.size} tokens`);

    // Generate CSS
    console.log('🎨 Generating CSS variables...');
    const css = generateCSSVariables(resolved);
    const cssPath = join(dirname(__filename), '../dist/tokens.css');
    mkdirSync(dirname(cssPath), { recursive: true });
    writeFileSync(cssPath, css);
    console.log(`✅ Generated ${cssPath}`);

    // Generate TypeScript types
    console.log('📝 Generating TypeScript types...');
    const types = generateTypeScriptTypes(tokens);
    const typesPath = join(dirname(__filename), '../dist/index.d.ts');
    writeFileSync(typesPath, types);
    console.log(`✅ Generated ${typesPath}`);

    // Copy resolved tokens as JSON
    const resolvedTokens = Object.fromEntries(resolved);
    const jsonPath = join(dirname(__filename), '../dist/tokens.json');
    writeFileSync(jsonPath, JSON.stringify(resolvedTokens, null, 2));
    console.log(`✅ Generated ${jsonPath}`);

    console.log('\n🎉 Token build complete!');

  } catch (error) {
    console.error('❌ Token build failed:', error.message);
    process.exit(1);
  }
}

main();
