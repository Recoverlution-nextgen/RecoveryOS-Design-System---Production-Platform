import fs from "node:fs";
import path from "node:path";

type Issue = { assetId?: string; field?: string; message: string; file?: string };

const ROOT = process.cwd();

const PATHS = {
  manifest: path.join(ROOT, "assets/00_system/tokens/asset-manifest.json"),
  frameworkTaxonomy: path.join(ROOT, "assets/taxonomy.framework.json")
};

const ASSOCIATIONS = new Set([
  "brand_hero",
  "journey",
  "navicue",
  "baseline",
  "sentient_baseline",
  "proof_receipt",
  "system_diagram",
  "cover",
  "icon",
  "motion",
]);

const WORLDS = new Set(["companion", "console", "command_centre", "neutral"]);

const STATES = new Set(["energy", "clarity", "anchorage", "neutral"]);

const CONTENT_TYPES = new Set([
  "navicue",
  "journey",
  "article",
  "insight",
  "practice",
  "audio",
  "series",
  "proof",
  "neutral",
]);

const FORMATS = new Set([
  "hero_wide",
  "card",
  "square",
  "tile",
  "diagram",
  "stamp",
  "timeline",
  "icon_16",
  "icon_24",
  "lottie",
]);

function readJson<T = any>(filePath: string): T {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing file: ${filePath}`);
  }
  const raw = fs.readFileSync(filePath, "utf8");
  try {
    return JSON.parse(raw) as T;
  } catch (e) {
    throw new Error(`Invalid JSON in ${filePath}: ${(e as Error).message}`);
  }
}

function isString(x: unknown): x is string {
  return typeof x === "string" && x.trim().length > 0;
}

function push(issues: Issue[], issue: Issue) {
  issues.push(issue);
}

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

type FrameworkTaxonomy = {
  pillars: Array<{ id: string }>;
  concepts: Array<{ id: string }>;
  themes: Array<{ id: string }>;
};

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
  assets: Asset[];
};

function main() {
  const issues: Issue[] = [];

  try {
    const manifest = readJson<Manifest>(PATHS.manifest);
    const framework = readJson<FrameworkTaxonomy>(PATHS.frameworkTaxonomy);

    const pillarIds = new Set(framework.pillars.map((x) => x.id));
    const conceptIds = new Set(framework.concepts.map((x) => x.id));
    const themeIds = new Set(framework.themes.map((x) => x.id));

    // Manifest-level checks
    if (!isString(manifest.version)) {
      push(issues, { message: "Manifest missing valid top-level `version`.", file: PATHS.manifest });
    }
    if (!Array.isArray(manifest.assets)) {
      push(issues, { message: "Manifest missing valid `assets` array.", file: PATHS.manifest });
    }

    const ids = manifest.assets?.map((a) => a?.id).filter(Boolean) ?? [];
    const dupes = ids.filter((id, idx) => ids.indexOf(id) !== idx);
    if (dupes.length) {
      push(issues, {
        message: "Duplicate asset IDs found: " + uniq(dupes).join(", "),
        file: PATHS.manifest,
      });
    }

    // Asset-level checks
    for (const asset of manifest.assets ?? []) {
      const aid = asset?.id;

      if (!isString(aid)) {
        push(issues, { message: "Asset is missing a valid `id`.", file: PATHS.manifest });
        continue;
      }

      // Required fields
      if (!isString(asset.association) || !ASSOCIATIONS.has(asset.association)) {
        push(issues, {
          assetId: aid,
          field: "association",
          message: "Invalid association. Allowed: " + Array.from(ASSOCIATIONS).join(", "),
        });
      }

      if (!isString(asset.world) || !WORLDS.has(asset.world)) {
        push(issues, {
          assetId: aid,
          field: "world",
          message: "Invalid world. Allowed: " + Array.from(WORLDS).join(", "),
        });
      }

      if (!isString(asset.state) || !STATES.has(asset.state)) {
        push(issues, {
          assetId: aid,
          field: "state",
          message: "Invalid state. Allowed: " + Array.from(STATES).join(", "),
        });
      }

      if (asset.contentType !== undefined) {
        if (!isString(asset.contentType) || !CONTENT_TYPES.has(asset.contentType)) {
          push(issues, {
            assetId: aid,
            field: "contentType",
            message: "Invalid contentType. Allowed: " + Array.from(CONTENT_TYPES).join(", "),
          });
        }
      }

      if (!isString(asset.format) || !FORMATS.has(asset.format)) {
        push(issues, {
          assetId: aid,
          field: "format",
          message: "Invalid format. Allowed: " + Array.from(FORMATS).join(", "),
        });
      }

      if (!isString(asset.version)) {
        push(issues, { assetId: aid, field: "version", message: "Missing valid `version`." });
      }

      // Files
      if (!asset.files || typeof asset.files !== "object") {
        push(issues, { assetId: aid, field: "files", message: "Missing `files` object." });
      } else {
        const fileVals = Object.values(asset.files).filter((v) => isString(v));
        if (fileVals.length === 0) {
          push(issues, { assetId: aid, field: "files", message: "No usable file paths found in `files`." });
        }
        // Validate strings
        for (const [k, v] of Object.entries(asset.files)) {
          if (v !== undefined && !isString(v)) {
            push(issues, { assetId: aid, field: "files." + k, message: "File path must be a non-empty string." });
          }
        }
      }

      // Priority range (optional)
      if (asset.priority !== undefined) {
        if (typeof asset.priority !== "number" || asset.priority < 0 || asset.priority > 100) {
          push(issues, { assetId: aid, field: "priority", message: "priority must be a number 0–100." });
        }
      }

      // Tags
      const tags = asset.tags ?? {};
      const pillars = tags.pillars ?? [];
      const concepts = tags.concepts ?? [];
      const themes = tags.themes ?? [];

      if (pillars.length > 1) push(issues, { assetId: aid, field: "tags.pillars", message: "Max 1 pillar per asset." });
      if (concepts.length > 3) push(issues, { assetId: aid, field: "tags.concepts", message: "Max 3 concepts per asset." });
      if (themes.length > 3) push(issues, { assetId: aid, field: "tags.themes", message: "Max 3 themes per asset." });

      // Validate tag IDs exist in registries
      for (const p of pillars) {
        if (!pillarIds.has(p)) {
          push(issues, { assetId: aid, field: "tags.pillars", message: "Unknown pillar id: " + p });
        }
      }
      for (const c of concepts) {
        if (!conceptIds.has(c)) {
          push(issues, { assetId: aid, field: "tags.concepts", message: "Unknown concept id: " + c });
        }
      }
      for (const t of themes) {
        if (!themeIds.has(t)) {
          push(issues, { assetId: aid, field: "tags.themes", message: "Unknown theme id: " + t });
        }
      }
    }

    // Print + exit
    if (issues.length) {
      console.error("\n❌ Asset manifest validation failed (" + issues.length + " issues)\n");
      for (const it of issues) {
        const loc = it.assetId ? "asset:" + it.assetId : (it.file ? it.file : "manifest");
        const field = it.field ? " (" + it.field + ")" : "";
        console.error("- " + loc + field + ": " + it.message);
      }
      process.exit(1);
    }

    console.log("✅ Asset manifest validation passed");
    console.log("Checked " + manifest.assets.length + " assets.");
  } catch (e) {
    console.error("❌ Validation failed:", (e as Error).message);
    process.exit(1);
  }
}

main();
