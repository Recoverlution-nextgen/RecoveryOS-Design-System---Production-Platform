# RecoveryOS Notion Workspace Structure

## 🏠 Home Dashboard

**Welcome to RecoveryOS Development**

Quick Links:
- 📊 [Asset Library Status](#asset-library-database)
- 📝 [Component Documentation](#component-docs)
- ✍️ [Copy & Content](#copy-repository)
- 🎨 [Design System](#design-system-guide)
- 🔗 [External Links](#external-links)

**Current Status:**
- ✅ Phase 0: Asset System Complete
- ✅ Phase 1: Infrastructure Complete  
- 🔄 Phase 2A: Core 12 Asset Conversion (IN PROGRESS)
- 📋 Phase 2B-E: Narrative Components (NEXT)

**This Week:**
- [ ] Finish Core 12 asset conversion
- [ ] Upload assets to Supabase
- [ ] Test asset governance system
- [ ] Integrate WalkthroughPresenter

---

## 📊 Asset Library Database

**View Types:**
- Gallery View (visual preview)
- Table View (detailed metadata)
- Board View (by status: To Convert / Converting / Done / Uploaded)

### Database Schema:

| Property | Type | Options/Formula |
|----------|------|-----------------|
| **Name** | Title | e.g., "Hero Scene 01 Poster" |
| **Asset Class** | Select | atmosphere / hero / system / icon / proof |
| **Type** | Select | hero-poster / hero-loop / noise-texture / thread-texture / seal-pulse / receipt-object |
| **Scene ID** | Select | scene-01 / scene-02 / scene-03 / scene-04 |
| **Pillar** | Select | pillar_ER / pillar_SR / pillar_SC / pillar_CR / pillar_II / pillar_DM |
| **Format** | Select | AVIF / WebP / WebM / MP4 / PNG / SVG |
| **Primary Format** | Checkbox | ✓ if this is the primary format (AVIF/WebM) |
| **Fallback Format** | Checkbox | ✓ if this is the fallback (WebP/MP4) |
| **File Size (KB)** | Number | Actual file size |
| **Budget (KB)** | Formula | `if(contains(prop("Type"), "poster"), 400, if(contains(prop("Type"), "loop"), 1800, 200))` |
| **Within Budget** | Formula | `prop("File Size (KB)") <= prop("Budget (KB)")` ✅/❌ |
| **Width** | Number | px |
| **Height** | Number | px |
| **Duration (s)** | Number | For video only, target 8-12s |
| **Tags** | Multi-select | journeys / navicues / wellbeing / state / library / dashboard / schema_proof_capture / etc. |
| **Status** | Select | 🔴 To Convert / 🟡 Converting / 🟢 Done / 🔵 Uploaded to Supabase |
| **Source File** | Files & media | Original asset file |
| **Converted File** | Files & media | Web-optimized version |
| **Supabase URL** | URL | Link after upload |
| **Notes** | Text | Conversion notes, optimization settings |
| **Created** | Created time | Auto |
| **Last Edited** | Last edited time | Auto |

### Pre-populated Rows (Core 12):

1. **Hero Scene 01 Poster**
   - Asset Class: hero
   - Type: hero-poster
   - Scene ID: scene-01
   - Format: AVIF (primary) + WebP (fallback)
   - Budget: 400KB
   - Status: 🟡 Converting

2. **Hero Scene 01 Loop**
   - Asset Class: hero
   - Type: hero-loop
   - Scene ID: scene-01
   - Format: WebM (primary) + MP4 (fallback)
   - Budget: 1800KB
   - Duration: 8-12s
   - Status: 🔴 To Convert

3. **Hero Scene 02 Poster**
4. **Hero Scene 02 Loop**
5. **Hero Scene 03 Poster**
6. **Hero Scene 03 Loop**
7. **Hero Scene 04 Poster**
8. **Hero Scene 04 Loop**
9. **Noise Texture**
   - Asset Class: atmosphere
   - Type: noise-texture
   - Format: PNG (tileable)
   - Budget: 50KB
10. **Thread Line Texture**
    - Asset Class: system
    - Type: thread-texture
    - Format: SVG preferred
11. **Seal Pulse**
    - Asset Class: system
    - Type: seal-pulse
    - Format: CSS-based preferred, optional WebM
12. **Receipt Object Texture**
    - Asset Class: proof
    - Type: receipt-object
    - Format: PNG/SVG

### Views to Create:

**1. Gallery View** (default)
- Card preview: Show converted file image
- Card size: Medium
- Group by: Asset Class
- Filter: Status ≠ Uploaded (hide completed)

**2. Budget Tracker View** (Table)
- Show: Name, Asset Class, File Size, Budget, Within Budget
- Sort: Within Budget (❌ first)
- Filter: Status = Done OR Converting
- Conditional formatting: Red if over budget

**3. Conversion Pipeline** (Board)
- Group by: Status
- Card properties: Name, Asset Class, File Size, Within Budget
- Drag-and-drop to update status

**4. Uploaded Assets** (Table)
- Filter: Status = Uploaded to Supabase
- Show: Name, Supabase URL, File Size, Tags
- For reference after deployment

---

## 📝 Component Documentation

### Navigation:
- **Phase 1: Infrastructure** (Complete)
  - Form Components (Input, Textarea, Button)
  - SEO Component
  - ErrorBoundary
  - Loading States (Spinner, Skeleton, PageLoader)
  
- **Phase 2: Narrative Components** (In Progress)
  - WalkthroughPresenter
  - SpineExplorer
  - ContinuityStream
  - OrchestrationFeed
  - TrustRails

### Template for Each Component Page:

```
# [Component Name]

## Overview
Brief description and purpose

## Usage
```tsx
import { ComponentName } from '@recoveryos/ui';

<ComponentName prop="value" />
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ... | ... | ... | ... |

## Asset Integration
- Asset class: [atmosphere/hero/system/icon/proof]
- Placement rule: [describe]
- Example: `useAssetsByComponent('ComponentName')`

## States
- Loading
- Error
- Success

## Accessibility
- ARIA attributes
- Keyboard navigation
- Screen reader support

## Examples
[Screenshots or CodeSandbox embeds]

## Related
- Links to related components
- Links to Jira issues
```

---

## ✍️ Copy & Content Repository

### Page Copy Database:

| Property | Type |
|----------|------|
| **Page** | Select | Home / Journey / Framework / How It Works / Contact / Glossary |
| **Section** | Text | Hero / Benefits / CTA / etc. |
| **Content Type** | Select | Headline / Body / CTA / Meta Description |
| **Copy** | Text (long) | The actual text |
| **Character Count** | Formula | `length(prop("Copy"))` |
| **Status** | Select | Draft / Review / Approved / Published |
| **SEO Notes** | Text | Keywords, meta descriptions |

### Pre-populated Sections:

**Home Page:**
1. Hero Headline
2. Hero Subheadline
3. Scene 01 Copy: "Runs in real life"
4. Scene 02 Copy: "Feed with a spine"
5. Scene 03 Copy: "Receipts"
6. Scene 04 Copy: "One OS / Three worlds"
7. Primary CTA
8. Meta Description

**Journey Page:**
9. Journey Hero
10. Journey Explainer
...

**Glossary Terms Database** (separate):
- Term name
- Definition
- Pillar association
- Related terms
- Icon

---

## 🎨 Design System Guide

### Semantic Tokens Reference
Quick reference for developers:

**Thread (Purple/Indigo):**
- `--thread-depth-bg`: Background
- `--thread-depth-border`: Borders
- `--thread-pulse`: Hover/active states

**Trace (Cyan):**
- `--trace-signal`: Attention/navigation
- `--trace-deliver`: Focus states

**Return (Green):**
- `--return-affirm`: Success/proof

**Field (Atmosphere):**
- `--field-base`: Page backgrounds
- `--field-pillar-*`: Pillar-specific fields

### Component Patterns
- Form field anatomy
- Button hierarchy (primary/secondary/ghost)
- Loading state patterns
- Error messaging guidelines

### Asset Usage Guidelines
- When to use hero vs atmosphere assets
- Budget constraints (400KB/1.8MB)
- Reduced motion fallbacks
- Label mapping examples

---

## 🔗 External Links

**Development:**
- [Supabase Dashboard](https://supabase.com/dashboard/project/wzeqlkbmqxlsjryidagf)
- [GitHub Repository](#) (add your repo)
- [Jira Project](https://danielfincham.atlassian.net/jira/software/projects/REC/)
- [Dev Server](http://localhost:5174) (when running)

**Documentation:**
- [Asset Governance Spec](link to ASSET_GOVERNANCE.md)
- [Supabase Setup Guide](link to SUPABASE_SETUP.md)
- [Infrastructure Complete](link to INFRASTRUCTURE_COMPLETE.md)

**Design References:**
- Asset specifications (15 asset folders)
- Icon specifications (12 icon folders)
- Brand kit folder

---

## 📋 Weekly Sprint Template

Create this as a recurring template for weekly planning:

```
# Sprint: [Week of Jan X]

## Goals
- [ ] Goal 1
- [ ] Goal 2
- [ ] Goal 3

## Jira Issues This Week
- REC-X: [Issue name]
- REC-Y: [Issue name]

## Asset Status
- Converted: X/12
- Uploaded: X/12
- Tested: X/12

## Blockers
- [ ] Blocker 1
- [ ] Blocker 2

## Notes
Sprint retrospective notes...

## Next Week
Preview of upcoming work...
```

---

## 📊 Metrics Dashboard

Create a simple dashboard page with formulas:

**Asset Conversion Progress:**
- Total assets: 12
- Converted: `countif(Asset Library.Status, "Done") + countif(Asset Library.Status, "Uploaded")`
- Percentage: `(Converted / 12) * 100`

**Budget Compliance:**
- Assets over budget: `countif(Asset Library.Within Budget, false)`
- Compliance rate: `((12 - Over Budget) / 12) * 100`

**Component Progress:**
- Total components: 5 (narrative)
- Completed: Track manually
- Next: [Component name]

**Pages Progress:**
- Total pages: 6
- Completed: Track manually
- Next: [Page name]

---

## 🎯 Quick Start Checklist

Use this to onboard new team members:

- [ ] Read ASSET_GOVERNANCE.md
- [ ] Review Jira project structure
- [ ] Understand the 3-tier governance (locked/controlled/expandable)
- [ ] Know the Core 12 assets
- [ ] Understand placement rules
- [ ] Review component documentation
- [ ] Set up local dev environment
- [ ] Access Supabase dashboard
- [ ] Understand budget constraints (400KB/1.8MB)

---

## 💡 Tips for Notion Setup

1. **Use Templates:**
   - Create a "Component Doc" template
   - Create a "Page Copy" template
   - Create a "Sprint" template

2. **Link Databases:**
   - Link Asset Library to Component Docs (which components use which assets)
   - Link Jira issue IDs in notes fields

3. **Embed Code:**
   - Use code blocks with syntax highlighting for examples
   - Embed CodeSandbox or StackBlitz demos

4. **Visual Elements:**
   - Upload component screenshots
   - Add asset previews to the Asset Library
   - Use callout blocks for important notes

5. **Permissions:**
   - Share with team members
   - Set edit/view permissions appropriately
   - Keep API keys and secrets in separate secure location

---

## 🚀 Import Instructions

**Option 1: Manual Setup**
1. Create a new Notion workspace or page
2. Add databases using the schemas above
3. Populate with pre-filled data
4. Create views (Gallery, Table, Board)

**Option 2: Notion API Import** (if you have API access)
1. Use Notion API to create databases programmatically
2. Script to import Core 12 assets
3. Set up relationships and views

**Option 3: CSV Import**
1. Export schema to CSV
2. Import via Notion's CSV import feature
3. Manually configure views

---

**Generated:** 9 January 2026  
**Project:** RecoveryOS  
**Purpose:** Documentation, asset tracking, content management
