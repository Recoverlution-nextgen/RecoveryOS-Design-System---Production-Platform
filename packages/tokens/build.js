const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'src.json');
const outDir = path.join(__dirname, 'dist');

if (!fs.existsSync(sourcePath)) {
  throw new Error('Missing tokens source at packages/tokens/src.json');
}

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const tokens = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

const kebab = (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/_/g, '-').toLowerCase();

const toCssVars = (obj, prefix = []) => {
  const entries = [];
  Object.entries(obj).forEach(([key, value]) => {
    const next = [...prefix, kebab(key)];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      entries.push(...toCssVars(value, next));
    } else {
      const varName = `--${next.join('-')}`;
      entries.push({ name: varName, value });
    }
  });
  return entries;
};

const cssEntries = toCssVars(tokens);
const cssBody = cssEntries.map((e) => `  ${e.name}: ${e.value};`).join('\n');
const cssOutput = `:root {\n${cssBody}\n}\n`;
fs.writeFileSync(path.join(outDir, 'tokens.css'), cssOutput);

const themeTs = `export const tokens = ${JSON.stringify(tokens, null, 2)} as const;\n\nexport type Tokens = typeof tokens;\n`;
fs.writeFileSync(path.join(outDir, 'theme.ts'), themeTs);
fs.writeFileSync(path.join(outDir, 'tokens.ios.json'), JSON.stringify(tokens, null, 2));
fs.writeFileSync(
  path.join(outDir, 'tokens.android.json'),
  JSON.stringify(tokens, null, 2)
);

console.log('Generated tokens to dist/ (css, ts, ios.json, android.json)');
