# 📚 RecoveryOS Context Archive

## 🗂️ Archive Overview

This archive contains all RecoveryOS project context, documentation, and planning materials organized by category. The archive helps maintain project history while keeping the main workspace clean.

## 📁 Archive Structure

```
context/
├── 📁 asset-processing/     # Asset management system docs
├── 📁 assets/              # 🆕 Organized asset collections
│   ├── 📁 design-assets/   # Original design files
│   ├── 📁 ui-assets/       # UI components and screens
│   ├── 📁 icon-assets/     # Icon libraries and symbols
│   ├── 📁 component-assets/# Component libraries
│   ├── 📁 brand-assets/    # Brand identity materials
│   └── 📁 archived-assets/ # Deprecated assets
├── 📁 canva-setup/         # Canva workspace configuration
├── 📁 project-docs/        # General project documentation
└── 📁 archive/             # Archived/deprecated content
```

---

## 🎯 Asset Processing Context

### 📋 Files in `context/asset-processing/`

#### `ASSET_PROCESSING_README.md`
- **Purpose**: Core asset processing system documentation
- **Content**: Architecture, components, workflow overview
- **Status**: Active reference material

#### `ASSET_PROCESSING_IMPLEMENTATION_COMPLETE.md`
- **Purpose**: Implementation completion report
- **Content**: Build summary, validation results, system capabilities
- **Status**: Historical record of implementation

#### `ASSET_PROCESSING_DEPLOYMENT_GUIDE.md`
- **Purpose**: Production deployment instructions
- **Content**: Setup steps, configuration, troubleshooting
- **Status**: Active deployment guide

### 🔗 Key Asset Processing Features
- ✅ Automated image optimization (AVIF/WebP)
- ✅ AI-powered therapeutic content tagging
- ✅ Context-aware asset selection
- ✅ Governance rule engine
- ✅ Supabase storage integration
- ✅ Processing job queues

---

## 🎨 Asset Collections Context

### 📋 Structure in `context/assets/`

#### `ASSET_ORGANIZATION_GUIDE.md`
- **Purpose**: Complete asset organization framework
- **Content**: Categorization rules, migration process, quality standards
- **Status**: Active organizational guide

### 📁 Asset Categories (6 categories)

#### `design-assets/` - Original Design Files
**Purpose**: Raw creative assets and design sources
**Expected Contents**:
- `asset/`, `asset2/`, `asset3/`, etc. → Versioned design collections
- `Asset Json/` → Design system exports
- Raw files: PSD, AI, Figma, Sketch

#### `ui-assets/` - User Interface Assets
**Purpose**: UI components, screens, and interface elements
**Expected Contents**:
- `C+F/` → Component and feature assets
- `C3/`, `C4/`, `C5/`, etc. → Component variations
- UI mockups, wireframes, prototypes

#### `icon-assets/` - Icon Libraries
**Purpose**: Icon collections and symbol libraries
**Expected Contents**:
- `icons/`, `icons2/`, `icons3/`, etc. → Icon sets
- `icon3/`, `Icon4/`, etc. → Versioned collections
- SVG, PNG, and vector formats

#### `component-assets/` - Component Libraries
**Purpose**: Reusable component assets and documentation
**Expected Contents**:
- `Components Ideas/` → Component explorations
- `Component Registry/` → Official components
- `components/` → Implementation assets

#### `brand-assets/` - Brand Identity
**Purpose**: Brand guidelines and identity materials
**Expected Contents**:
- `brand kit/` → Brand assets and guidelines
- `kit/` → Design system kits
- Logos, colors, typography specifications

#### `archived-assets/` - Deprecated Assets
**Purpose**: Historical and unused assets
**Expected Contents**:
- Old design files
- Abandoned explorations
- Previous brand iterations

### 📊 Asset Organization Standards
- **Metadata**: Each collection needs `README.md` and `metadata.json`
- **Naming**: Consistent lowercase with hyphens
- **Structure**: Organized by file type and purpose
- **Versioning**: Clear version numbers and history

### ✅ Asset Organization Status
**Status**: 🟢 **COMPLETE - Workspace Clean**
- **Migration Script**: `migrate_assets.sh` - Automated organization tool
- **Current State**: No scattered asset folders detected in workspace
- **Organization Ready**: Framework prepared for future asset collections
- **Maintenance**: Automated scanning available via migration script

---

## �️ Workspace Organization Context

### 📋 Major Reorganization (January 11, 2026)
**Status**: 🟢 **COMPLETE - Clean Workspace Structure**

#### Changes Made
- **Moved 23 files** out of `src/` directory to proper locations
- **Created organized `docs/` structure** with 3 categories (17 files total)
- **Updated root-level configuration** files and documentation
- **Consolidated duplicate files** (README.md, CONTRIBUTING.md)
- **Clean `src/` directory** now contains only source code

#### New Documentation Structure
```
docs/
├── migration/     # 7 migration-related docs
├── github/        # 2 GitHub-related docs  
└── project/       # 5 project documentation files
```

#### File Movements
- **Config Files**: `package.json`, `tsconfig.node.json`, `index.html` → Root level
- **Documentation**: 17 .md files → Organized in `docs/` subdirectories
- **Styles**: `index.css` → `src/styles/`
- **Project Docs**: `CLEANUP-COMPLETE.md` → `context/project-docs/`
- **Attributions**: `Attributions.md` → `docs/`

### 📊 Current Workspace Standards
- **Root Level**: Configuration files, main README, package manifests
- **src/**: Source code only (components, pages, services, etc.)
- **docs/**: Organized documentation by category
- **context/**: Archived context, guides, and historical materials

---
## 🌐 Live Version Context

### 📋 Live Implementation Reference
**Status**: 🟢 **ACTIVE - Currently Live and Serving Users**

#### `context/live-version/`
**Purpose**: Reference copy of current live RecoveryOS implementation
**Source**: `develop` branch from GitHub repository
**Status**: Read-only reference for architecture analysis

#### Live Version Details
- **Frontend**: FigmaMake-based implementation
- **Backend**: Supabase database and services
- **Status**: Currently deployed and serving users
- **Branch**: `develop` (protected - do not modify)

#### Reference Structure
```
context/live-version/
├── README.md              # Live version documentation
└── reference/             # Complete codebase copy
    ├── src/              # FigmaMake frontend code
    ├── package.json      # Live dependencies
    └── [config files]    # Build configurations
```

#### Migration Context
- **Current**: Live FigmaMake implementation (develop branch)
- **Future**: Clean rebuild in main branch (this workspace)
- **Strategy**: Reference-only - don't modify live version
- **Planning**: Use for architecture analysis and feature planning

#### Dual-Version Workspace
- ✅ **Live Reference**: `context/live-version/reference/` (read-only)
- ✅ **New Development**: `src/` (active development)
- ✅ **Comparison Guide**: `COMPARISON_GUIDE.md` (development workflow)
- ✅ **Safe Separation**: Live and new versions isolated

---
## �🎨 Canva Setup Context

### 📋 Files in `context/canva-setup/`

#### `CANVA_WORKSPACE_SETUP.md`
- **Purpose**: Complete Canva workspace organization guide
- **Content**: 30-folder structure, template creation, workflow
- **Status**: Active setup instructions

#### `CANVA_SETUP_CHECKLIST.md`
- **Purpose**: Trackable progress checklist
- **Content**: Folder creation tracking, template status, verification steps
- **Status**: Active project management tool

#### `CANVA_QUICK_REFERENCE.md`
- **Purpose**: Daily reference guide for Canva work
- **Content**: Naming conventions, folder guide, export workflow
- **Status**: Active working reference

### 🗂️ Canva Folder Structure (30 folders total)
```
RecoveryOS_Assets/
├── 01_Design_Sources/ (5 subfolders)
├── 02_By_Surface/ (6 subfolders)
├── 03_Export_Queue/ (3 subfolders)
├── 04_Work_In_Progress/ (3 subfolders)
├── 05_Templates/ (3 subfolders)
└── 06_Deprecated/ (2 subfolders)
```

---

## 📖 Project Documentation Context

### 📋 Files in `context/project-docs/`
*Currently empty - general project docs stay at root level*

**Root Level Documentation:**
- `README.md` - Project overview and getting started
- `CONTRIBUTING.md` - Development guidelines and processes

---

## 🗄️ Archive Context

### 📋 Files in `context/archive/`
*Currently empty - for future archived content*

**Archive Purpose:**
- Deprecated features and implementations
- Historical project phases
- Abandoned experiments
- Legacy documentation

---

## 🔍 Quick Navigation Index

### By Topic
- **Asset Processing**: See `context/asset-processing/`
- **Asset Organization**: See `context/assets/`
- **Canva Integration**: See `context/canva-setup/`
- **Project Setup**: See root level `README.md`
- **Development**: See root level `CONTRIBUTING.md`

### By Activity
- **New Setup**: `CANVA_WORKSPACE_SETUP.md` + `CANVA_SETUP_CHECKLIST.md`
- **Daily Work**: `CANVA_QUICK_REFERENCE.md`
- **Deployment**: `ASSET_PROCESSING_DEPLOYMENT_GUIDE.md`
- **Architecture**: `ASSET_PROCESSING_README.md`

### By Status
- **Active Working**: `CANVA_QUICK_REFERENCE.md`, `CANVA_SETUP_CHECKLIST.md`
- **Reference**: `ASSET_PROCESSING_README.md`, `CANVA_WORKSPACE_SETUP.md`
- **Historical**: `ASSET_PROCESSING_IMPLEMENTATION_COMPLETE.md`

---

## 📊 Archive Statistics

- **Total Context Files**: 11
- **Asset Processing**: 3 files
- **Assets**: 2 files (organization guide + migration script)
- **Canva Setup**: 3 files
- **Project Docs**: 1 file (cleanup complete)
- **Live Version**: 1 file (reference documentation)
- **Archive**: 0 files
- **Total Categories**: 6

**Asset Organization**: ✅ Complete - Workspace clean and framework ready
**Workspace Organization**: ✅ Complete - 23 files reorganized, clean src/ directory
**Live Version Reference**: ✅ Complete - FigmaMake implementation archived for analysis

---

## 🔄 Maintenance Guidelines

### Adding New Context
1. **Identify Category**: asset-processing, assets, canva-setup, project-docs, or archive
2. **Create/Update Files**: Add to appropriate subdirectory
3. **Update Index**: Add entry to this archive file
4. **Update Statistics**: Keep counts current

### Archiving Content
1. **Move to Archive**: Use `context/archive/` for deprecated content
2. **Update References**: Change links in other docs
3. **Document Changes**: Note archival reason in this file

### Cleaning Up
- **Regular Review**: Quarterly review of context relevance
- **Consolidation**: Merge similar documents when appropriate
- **Archive Old**: Move outdated content to archive folder

---

## 📞 Contact & Support

- **Asset Processing**: See `ASSET_PROCESSING_DEPLOYMENT_GUIDE.md`
- **Asset Organization**: See `context/assets/ASSET_ORGANIZATION_GUIDE.md`
- **Canva Setup**: See `CANVA_WORKSPACE_SETUP.md`
- **General Development**: See root `CONTRIBUTING.md`

---

**Last Updated**: January 11, 2026
**Archive Version**: 1.3
**Status**: 🟢 Active and Current
**Asset Organization**: ✅ Complete - Clean workspace with automated tools ready
**Workspace Organization**: ✅ Complete - Major reorganization finished
**Live Version Reference**: ✅ Complete - FigmaMake implementation archived</content>
<parameter name="filePath">/Users/danielfincham/recoverlution-platform/context/CONTEXT_ARCHIVE.md