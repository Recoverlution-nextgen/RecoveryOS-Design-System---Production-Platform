# 🎨 RecoveryOS Asset Organization Guide

## 📁 Asset Archive Structure

This guide defines how RecoveryOS assets should be organized within the context archive. Assets are categorized by type, purpose, and lifecycle stage.

## 🗂️ Asset Categories

### `context/assets/design-assets/`
**Purpose**: Original design files and creative assets
**Contents**:
- `asset/` → General design assets
- `asset2/`, `asset3/`, etc. → Versioned design iterations
- `Asset Json/` → Design system JSON exports
- Raw design files (PSD, AI, Figma, etc.)

### `context/assets/ui-assets/`
**Purpose**: User interface components and screens
**Contents**:
- `C+F/` → Component and feature assets
- `C3/`, `C4/`, `C5/`, etc. → Component variations
- UI mockups, wireframes, prototypes
- Interface design files

### `context/assets/icon-assets/`
**Purpose**: Icon libraries and symbol collections
**Contents**:
- `icons/` → Main icon library
- `icons2/`, `icons3/`, etc. → Icon variations/sets
- `icon3/`, `Icon4/`, etc. → Versioned icon collections
- SVG, PNG, and vector icon files

### `context/assets/component-assets/`
**Purpose**: Reusable component libraries and assets
**Contents**:
- `Components Ideas/` → Component concepts and explorations
- `Component Registry/` → Official component documentation
- `components/` → Implementation assets
- Component design tokens and specifications

### `context/assets/brand-assets/`
**Purpose**: Brand identity and marketing materials
**Contents**:
- `brand kit/` → Brand guidelines and assets
- `kit/` → Design system kits
- Logo files, brand colors, typography specs
- Marketing collateral and templates

### `context/assets/archived-assets/`
**Purpose**: Deprecated and historical assets
**Contents**:
- Old design files no longer in use
- Abandoned component explorations
- Previous brand iterations
- Legacy asset versions

## 📋 Organization Rules

### Naming Conventions
- Use lowercase with hyphens: `hero-icons`, `button-components`
- Include version numbers: `icons-v2`, `components-2024`
- Prefix with category: `ui-buttons`, `brand-logos`

### File Structure Within Categories
```
context/assets/[category]/
├── [asset-collection-1]/
│   ├── assets/
│   ├── documentation/
│   └── metadata.json
├── [asset-collection-2]/
│   └── ...
└── README.md
```

### Metadata Requirements
Each asset collection should include:
- `README.md`: Description, usage, version history
- `metadata.json`: Technical specs, dependencies, licensing
- Organized subfolders for different file types

## 🔄 Migration Process

### Step 1: Identify Assets
Locate all scattered asset folders in the workspace:
```bash
find . -name "asset*" -o -name "C+F" -o -name "C[0-9]*" -o -name "icons*" -o -name "Icon*"
```

### Step 2: Categorize
Sort assets into appropriate categories:
- Design files → `design-assets/`
- UI components → `ui-assets/`
- Icons → `icon-assets/`
- Components → `component-assets/`
- Brand → `brand-assets/`

### Step 3: Move and Document
```bash
# Example migration
mv asset/ context/assets/design-assets/
mv icons/ context/assets/icon-assets/
mv C+F/ context/assets/ui-assets/

# Create documentation
echo "# Asset Collection Name" > context/assets/design-assets/asset/README.md
```

### Step 4: Update Archive
Add new assets to `CONTEXT_ARCHIVE.md` with proper categorization.

## 📊 Asset Inventory Template

Use this template for each asset collection:

```json
{
  "name": "Asset Collection Name",
  "category": "design-assets",
  "version": "1.0.0",
  "description": "Brief description of the asset collection",
  "fileTypes": ["PNG", "SVG", "JPG"],
  "fileCount": 25,
  "totalSize": "2.3MB",
  "created": "2024-01-11",
  "lastModified": "2024-01-11",
  "dependencies": [],
  "usage": "Where and how these assets are used",
  "license": "MIT",
  "tags": ["ui", "components", "recoveryos"]
}
```

## ✅ Quality Standards

### Required for All Assets
- [ ] Organized file structure
- [ ] README.md documentation
- [ ] metadata.json file
- [ ] Consistent naming conventions
- [ ] Appropriate categorization
- [ ] Version control history

### File Organization
- [ ] Group by file type (PNG/, SVG/, etc.)
- [ ] Use descriptive filenames
- [ ] Include size variants (_sm, _md, _lg)
- [ ] Separate source files from exports

## 🔍 Maintenance

### Regular Audits
- Monthly: Check for uncategorized assets
- Quarterly: Review asset usage and relevance
- Annually: Archive outdated assets

### Cleanup Process
1. Identify unused assets
2. Move to `archived-assets/`
3. Update documentation
4. Remove from active categories

## 📞 Support

- **Asset Organization**: Follow this guide
- **New Categories**: Propose additions to this document
- **Archive Updates**: Update `CONTEXT_ARCHIVE.md` when adding assets

---

**Status**: 🟢 Ready for asset organization
**Last Updated**: January 11, 2026</content>
<parameter name="filePath">/Users/danielfincham/recoverlution-platform/context/assets/ASSET_ORGANIZATION_GUIDE.md