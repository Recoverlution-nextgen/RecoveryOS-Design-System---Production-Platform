/* scripts/asset-lint.js
   Run: node scripts/asset-lint.js
   Checks asset governance compliance
*/

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const ASSETS_DIR = path.join(ROOT, "assets");

// Load taxonomy
let TAXONOMY = null;
try {
  TAXONOMY = JSON.parse(fs.readFileSync(path.join(ASSETS_DIR, "taxonomy.framework.json"), "utf8"));
} catch (e) {
  console.error("❌ Failed to load taxonomy:", e.message);
  process.exit(1);
}

// Required files for each asset
const REQUIRED_FILES = [
  "spec.md",
  "exports"
];

// Asset ID pattern
const ASSET_ID_PATTERN = /^[A-Z]+_[A-Z_]+_[A-Z_]+$/;

// Export naming pattern
const EXPORT_PATTERN = /^(.+)__(anchorage|clarity|energy|neutral)?__(companion|console|command_centre|neutral)?__(hero-wide|card|square|tile|diagram|icon-16|icon-24|stamp|timeline|lottie)?__(light|dark)?__v\d+\.(webp|png|svg|lottie|pdf|mp4|webm)$/;

function walk(dir, acc = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith("__")) continue; // Skip __exports, __archive
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      // Check if this is an asset folder (has spec.md)
      const specPath = path.join(full, "spec.md");
      if (fs.existsSync(specPath)) {
        acc.push(full);
      } else {
        // Recurse into subdirs
        walk(full, acc);
      }
    }
  }
  return acc;
}

function validateAsset(assetDir) {
  const issues = [];
  const assetId = path.basename(assetDir).toUpperCase();

  // Check asset ID format
  if (!ASSET_ID_PATTERN.test(assetId)) {
    issues.push(`Invalid asset ID format: ${assetId} (expected: CATEGORY_SUBJECT_VARIANT)`);
  }

  // Check required files
  for (const req of REQUIRED_FILES) {
    const reqPath = path.join(assetDir, req);
    if (!fs.existsSync(reqPath)) {
      issues.push(`Missing required file: ${req}`);
    }
  }

  // Check exports directory
  const exportsDir = path.join(assetDir, "exports");
  if (fs.existsSync(exportsDir)) {
    const exports = fs.readdirSync(exportsDir);
    for (const exp of exports) {
      if (!EXPORT_PATTERN.test(exp)) {
        issues.push(`Invalid export filename: ${exp}`);
      }
    }
  }

  // Check asset.meta.json
  const metaPath = path.join(assetDir, "asset.meta.json");
  if (fs.existsSync(metaPath)) {
    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
      
      // Validate framework tags
      if (meta.tags) {
        const pillars = meta.tags.pillars || [];
        const concepts = meta.tags.concepts || [];
        const themes = meta.tags.themes || [];
        
        if (pillars.length > 1) issues.push("Max 1 pillar per asset");
        if (concepts.length > 3) issues.push("Max 3 concepts per asset");
        if (themes.length > 3) issues.push("Max 3 themes per asset");
        
        // Check tag IDs exist in taxonomy
        for (const p of pillars) {
          if (!TAXONOMY.pillars.some(t => t.id === p)) {
            issues.push(`Unknown pillar: ${p}`);
          }
        }
        for (const c of concepts) {
          if (!TAXONOMY.concepts.some(t => t.id === c)) {
            issues.push(`Unknown concept: ${c}`);
          }
        }
        for (const t of themes) {
          if (!TAXONOMY.themes.some(t => t.id === t)) {
            issues.push(`Unknown theme: ${t}`);
          }
        }
      }
    } catch (e) {
      issues.push(`Invalid asset.meta.json: ${e.message}`);
    }
  } else {
    issues.push("Missing asset.meta.json");
  }

  return issues;
}

function main() {
  const assetDirs = walk(ASSETS_DIR);
  let totalIssues = 0;

  console.log(`Checking ${assetDirs.length} assets...\n`);

  for (const dir of assetDirs) {
    const issues = validateAsset(dir);
    if (issues.length > 0) {
      console.log(`❌ ${path.basename(dir)}`);
      for (const issue of issues) {
        console.log(`  - ${issue}`);
      }
      totalIssues += issues.length;
    } else {
      console.log(`✅ ${path.basename(dir)}`);
    }
  }

  console.log(`\n${totalIssues} issues found.`);
  if (totalIssues > 0) {
    process.exit(1);
  } else {
    console.log("✅ Asset lint passed");
  }
}

main();
