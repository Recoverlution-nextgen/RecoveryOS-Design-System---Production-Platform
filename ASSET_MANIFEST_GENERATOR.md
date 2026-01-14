# Asset Manifest Generator (v1 — Locked)

Goal:
Designers create assets.
Metadata lives beside the asset.
CI generates a single manifest for the frontend.

No manual editing of asset-manifest.json.

---

## 1) Source of truth per asset
Each asset folder must include:

asset.meta.json  (machine-readable, required)
<ASSET_ID>.spec.md (human spec sheet, required)
exports/ (required)

Example:
assets/02_worlds/companion/kvs/KV_COMPANION_RETURN_MOMENT/
  asset.meta.json
  KV_COMPANION_RETURN_MOMENT.spec.md
  exports/
    KV_COMPANION_RETURN_MOMENT__anchorage__companion__hero-wide__light__v1.webp
    ...

---

## 2) Generator behavior
- scans `/assets` recursively
- finds every `asset.meta.json`
- validates basic shape (required fields)
- writes:
  /assets/00_system/tokens/asset-manifest.json

Sorting:
- priority DESC
- id ASC

---

## 3) CI contract
Run:
- npm run generate:assets
- npm run validate:assets

Optional "one command":
- npm run build:assets  (generate then validate)

---

## 4) Hard rules
- `id` in meta must match the asset folder name (last folder segment)
- tags must be registry IDs (framework + universal)
- max tags:
  pillars<=1, concepts<=3, themes<=3, universal<=5
- if universal tags exist, must include at least one intent.*
- max one context.* tag

---

## 5) Why this works
Spec sheets are for humans.
Meta is for machines.
The manifest is always derived.
So the frontend can reliably query assets by metadata.