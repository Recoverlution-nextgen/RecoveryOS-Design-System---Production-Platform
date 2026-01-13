# 🚀 RecoveryOS Canva Workspace Setup Guide

## 📋 Quick Setup Overview

This guide will help you set up your Canva workspace structure for RecoveryOS therapeutic content creation. The structure is designed to organize assets by type, deployment surface, and workflow stage.

## 🎯 Prerequisites

1. **Canva Account**: Make sure you have a Canva account (free or Pro)
2. **RecoveryOS Brand Kit**: Access to your brand guidelines and assets
3. **Asset Processing System**: The upload interface at `/canva/upload` (when ready)

---

## 📁 Step 1: Create Root Folder Structure

### 1.1 Access Canva Folders
1. Go to [canva.com](https://canva.com) and sign in
2. Click on "Your projects" or "Projects" in the sidebar
3. Look for the folder icon or "Create a folder" button

### 1.2 Create Main RecoveryOS Folder
```
📁 RecoveryOS_Assets  (Root folder - create this first)
```

---

## 📁 Step 2: Design Sources Organization

Create these folders **inside** `RecoveryOS_Assets`:

```
📁 RecoveryOS_Assets
├── 📁 01_Design_Sources
│   ├── 📁 Hero_Assets          // Main hero images and backgrounds
│   ├── 📁 Atmosphere_Assets    // Ambient/mood-setting visuals
│   ├── 📁 System_Assets        // UI system elements and icons
│   ├── 📁 Proof_Assets         // Social proof, testimonials, badges
│   └── 📁 UI_Components        // Reusable UI elements
```

**Quick Create Commands:**
```bash
# Copy and paste these folder names when creating:
01_Design_Sources
Hero_Assets
Atmosphere_Assets
System_Assets
Proof_Assets
UI_Components
```

---

## 📁 Step 3: Surface-Based Organization

Create the deployment surface folders:

```
📁 RecoveryOS_Assets
├── 📁 02_By_Surface
│   ├── 📁 Marketing_Home       // Website homepage assets
│   ├── 📁 Companion_Player     // In-app player interface
│   ├── 📁 Companion_Editor     // Content creation interface
│   ├── 📁 Command_Console      // Admin/debug interface
│   ├── 📁 Command_Center       // Management dashboard
│   └── 📁 System_Recovery      // Recovery mode assets
```

**Quick Create Commands:**
```bash
02_By_Surface
Marketing_Home
Companion_Player
Companion_Editor
Command_Console
Command_Center
System_Recovery
```

---

## 📁 Step 4: Export Workflow Management

Create the processing pipeline folders:

```
📁 RecoveryOS_Assets
├── 📁 03_Export_Queue
│   ├── 📁 Ready_to_Export      // Final designs ready for export
│   ├── 📁 Exported_Pending_Review  // Exported, waiting approval
│   └── 📁 Approved_Archive     // Final approved assets
```

**Quick Create Commands:**
```bash
03_Export_Queue
Ready_to_Export
Exported_Pending_Review
Approved_Archive
```

---

## 📁 Step 5: Work-in-Progress Management

Create active development folders:

```
📁 RecoveryOS_Assets
├── 📁 04_Work_In_Progress
│   ├── 📁 Drafts               // Initial concepts and ideas
│   ├── 📁 Iterations           // Versioned design iterations
│   └── 📁 Feedback_Review      // Designs awaiting feedback
```

**Quick Create Commands:**
```bash
04_Work_In_Progress
Drafts
Iterations
Feedback_Review
```

---

## 📁 Step 6: Templates & Standards

Create reusable asset folders:

```
📁 RecoveryOS_Assets
├── 📁 05_Templates
│   ├── 📁 Hero_Templates       // Standardized hero formats
│   ├── 📁 Component_Templates  // UI component templates
│   └── 📁 Brand_Guidelines     // Brand standards and assets
```

**Quick Create Commands:**
```bash
05_Templates
Hero_Templates
Component_Templates
Brand_Guidelines
```

---

## 📁 Step 7: Archive Management

Create deprecated/archive folders:

```
📁 RecoveryOS_Assets
├── 📁 06_Deprecated
│   ├── 📁 Replaced_Assets      // Assets replaced by newer versions
│   └── 📁 Version_Archive      // Historical versions
```

**Quick Create Commands:**
```bash
06_Deprecated
Replaced_Assets
Version_Archive
```

---

## 🎨 Step 8: Create Initial Templates

### 8.1 Hero Templates (in `05_Templates/Hero_Templates`)
Create these standard formats:
- **Hero_1920x1080** - Desktop hero (16:9)
- **Hero_1080x1080** - Square hero (Instagram/Social)
- **Hero_1200x630** - Link preview (Facebook/Twitter)
- **Hero_390x844** - Mobile hero (iPhone aspect)

### 8.2 Component Templates (in `05_Templates/Component_Templates`)
- **Button_Primary** - Main call-to-action buttons
- **Card_Therapeutic** - Content cards for therapeutic content
- **Icon_System** - Standardized icon templates
- **Badge_Achievement** - Progress/milestone badges

### 8.3 Brand Guidelines (in `05_Templates/Brand_Guidelines`)
- **Color_Palette** - RecoveryOS brand colors
- **Typography_Scale** - Font hierarchy and usage
- **Logo_Variants** - Different logo formats and sizes

---

## 📤 Step 9: Export Workflow Setup

### 9.1 Configure Export Settings
When exporting designs for RecoveryOS:

1. **Format**: PNG (for graphics), JPG (for photos), SVG (for icons)
2. **Quality**: High (300 DPI minimum)
3. **Naming Convention**:
   ```
   [asset_type]_[context]_[variant]_[version]
   Examples:
   hero_anxiety_relief_01.png
   button_primary_cta_v2.png
   icon_mindfulness_meditation.svg
   ```

### 9.2 Workflow Process
1. **Create** → Save in appropriate `01_Design_Sources` subfolder
2. **Iterate** → Move versions to `04_Work_In_Progress/Iterations`
3. **Finalize** → Move to `03_Export_Queue/Ready_to_Export`
4. **Export** → Use RecoveryOS upload interface at `/canva/upload`
5. **Review** → Move to `Exported_Pending_Review` during processing
6. **Archive** → Final approved assets go to `Approved_Archive`

---

## 🔗 Step 10: Connect to RecoveryOS

### 10.1 Upload Interface
Once your asset processing system is deployed:
1. Export designs from Canva
2. Visit `yourapp.com/canva/upload`
3. Upload exported files
4. Assets automatically processed and tagged

### 10.2 Integration Benefits
- **Automatic Optimization**: AVIF/WebP conversion, size reduction
- **Intelligent Tagging**: AI-powered therapeutic content classification
- **Context-Aware Selection**: Assets matched to user emotional state
- **Governance Compliance**: Clinical accuracy and safety validation

---

## ✅ Setup Verification Checklist

- [ ] Root folder `RecoveryOS_Assets` created
- [ ] All 6 main folders (01-06) created
- [ ] All subfolders created (23 total)
- [ ] Initial templates created in `05_Templates`
- [ ] Export workflow understood
- [ ] RecoveryOS upload interface tested (when available)

---

## 🎯 Next Steps

1. **Create Your First Asset**: Try making a hero image in `01_Design_Sources/Hero_Assets`
2. **Test Export Process**: Export and upload via the RecoveryOS interface
3. **Build Template Library**: Create more reusable templates as you work
4. **Team Collaboration**: Share folder structure with other designers

---

## 📚 Resources

- **Canva Help**: [canva.com/help](https://canva.com/help)
- **RecoveryOS Brand Kit**: Check your brand guidelines folder
- **Asset Processing**: See `ASSET_PROCESSING_DEPLOYMENT_GUIDE.md`

---

**🎉 Your Canva workspace is now ready for RecoveryOS therapeutic content creation!**</content>
<parameter name="filePath">/Users/danielfincham/recoverlution-platform/CANVA_WORKSPACE_SETUP.md