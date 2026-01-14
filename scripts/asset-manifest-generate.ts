// scripts/asset-manifest-generate.ts
// Generates asset-manifest.json by scanning assets/**/asset.meta.json

// Run:
//   node scripts/asset-manifest-generate.ts

// Output:
//   assets/00_system/tokens/asset-manifest.json

import fs from "node:fs";
import path from "node:path";

type Asset = {
  id: string;
  association: string;
  world: string;
  state: string;
  contentType?: string;
  format: string;
  brush?: string;
  tags?: {
    pillars?: string[];
    concepts?: string[];
    themes?: string[];
  };
  intent?: string;
  files: Record<string, string | undefined>;
  version: string;
  priority?: number;
};

type Manifest = {
  version: string;
  generatedAt: string;
  assets: Asset[];
};

const ROOT = process.cwd();

const ASSETS_ROOT = path.join(ROOT, "assets");
const OUTPUT_MANIFEST = path.join(ROOT, "assets/00_system/tokens/asset-manifest.json");

// Directories we never scan for meta
const EXCLUDE_DIRS = new Set([
  "node_modules",
  ".git",
  "__exports",
  "__archive",
  "00_system", // meta lives in asset folders; tokens live here, but we exclude from scan
]);

const META_FILENAME = "asset.meta.json";

function readJson<T = any>(p: string): T {
  const raw = fs.readFileSync(p, "utf8");
  return JSON.parse(raw) as T;
}

function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true });
}

function walk(dir: string, found: string[] = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.isDirectory()) {
      if (EXCLUDE_DIRS.has(e.name)) continue;
      walk(path.join(dir, e.name), found);
      continue;
    }
    if (e.isFile() && e.name === META_FILENAME) {
      found.push(path.join(dir, e.name));
    }
  }
  return found;
}

function basenameFolder(p: string) {
  // folder containing the meta file
  return path.basename(path.dirname(p));
}

function normalizeAsset(a: Asset): Asset {
  return {
    ...a,
    contentType: a.contentType ?? "neutral",
    priority: typeof a.priority === "number" ? a.priority : 50,
    tags: a.tags ?? {},
  };
}

function generate() {
  if (!fs.existsSync(ASSETS_ROOT)) {
    throw new Error(`Missing assets root: ${ASSETS_ROOT}`);
  }

  const metaFiles = walk(ASSETS_ROOT);

  const assets: Asset[] = [];
  const seen = new Set<string>();

  for (const metaPath of metaFiles) {
    const folderId = basenameFolder(metaPath);
    const meta = readJson<Asset>(metaPath);

    if (!meta || typeof meta !== "object") {
      throw new Error(`Invalid meta JSON: ${metaPath}`);
    }
    if (!meta.id || typeof meta.id !== "string") {
      throw new Error(`Meta missing id: ${metaPath}`);
    }
    if (meta.id !== folderId) {
      throw new Error(
        `Meta id does not match folder name.\n  meta.id: ${meta.id}\n  folder: ${folderId}\n  file: ${metaPath}`
      );
    }
    if (seen.has(meta.id)) {
      throw new Error(`Duplicate asset id found: ${meta.id}`);
    }
    seen.add(meta.id);

    // Ensure required fields exist (basic guard; full validation happens in validate step)
    if (!meta.association || !meta.world || !meta.state || !meta.format || !meta.files || !meta.version) {
      throw new Error(`Meta missing required fields for asset ${meta.id} (${metaPath})`);
    }

    const normalized = normalizeAsset(meta);

    // Ensure at least one file path exists
    const fileVals = Object.values(normalized.files ?? {}).filter((v) => typeof v === "string" && v.trim().length > 0);
    if (fileVals.length === 0) {
      throw new Error(`Asset ${normalized.id} has no file paths in files{} (${metaPath})`);
    }

    assets.push(normalized);
  }

  // Sort: priority desc, then id asc
  assets.sort((a, b) => {
    const pa = a.priority ?? 50;
    const pb = b.priority ?? 50;
    if (pb !== pa) return pb - pa;
    return a.id.localeCompare(b.id);
  });

  const manifest: Manifest = {
    version: "v1",
    generatedAt: new Date().toISOString(),
    assets,
  };

  ensureDir(path.dirname(OUTPUT_MANIFEST));
  fs.writeFileSync(OUTPUT_MANIFEST, JSON.stringify(manifest, null, 2) + "\n", "utf8");

  console.log(`✅ Generated manifest with ${assets.length} assets`);
  console.log(`→ ${path.relative(ROOT, OUTPUT_MANIFEST)}`);
}

generate();