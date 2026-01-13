# 📋 RecoveryOS Canva Quick Reference

## 🎯 Naming Conventions

### Asset Naming Format
```
[asset_type]_[therapeutic_context]_[variant]_[version].[extension]
```

### Examples
```
# Hero Assets
hero_anxiety_relief_01.png
hero_mindfulness_mountain_02.jpg
hero_depression_support_01.png

# UI Components
button_primary_cta_v2.png
card_therapeutic_session_01.svg
icon_meditation_breath_01.svg

# Atmosphere Assets
atmosphere_calm_ocean_01.jpg
atmosphere_focus_library_02.png
atmosphere_energy_sunrise_01.jpg

# System Assets
system_logo_recoveryos_01.svg
system_icon_settings_01.png
system_badge_progress_01.svg
```

---

## 📁 Folder Quick Reference

### Where to Save What

**01_Design_Sources/**
- **Hero_Assets**: Main banners, backgrounds, key visuals
- **Atmosphere_Assets**: Mood-setting images, ambient scenes
- **System_Assets**: Logos, icons, UI elements
- **Proof_Assets**: Testimonials, badges, social proof
- **UI_Components**: Buttons, cards, form elements

**02_By_Surface/**
- **Marketing_Home**: Website homepage assets
- **Companion_Player**: In-app playback interface
- **Companion_Editor**: Content creation tools
- **Command_Console**: Admin/debug panels
- **Command_Center**: Management dashboards
- **System_Recovery**: Recovery mode visuals

**03_Export_Queue/**
- **Ready_to_Export**: Final designs ready for processing
- **Exported_Pending_Review**: Uploaded, being processed
- **Approved_Archive**: Final approved assets

**04_Work_In_Progress/**
- **Drafts**: Initial concepts and ideas
- **Iterations**: Versioned design updates
- **Feedback_Review**: Awaiting team feedback

---

## 🎨 Design Specifications

### Hero Templates
- **Desktop (1920×1080)**: Website banners, marketing pages
- **Square (1080×1080)**: Social media, app previews
- **Link Preview (1200×630)**: Facebook, Twitter, LinkedIn
- **Mobile (390×844)**: Mobile apps, responsive design

### Color Palette
- **Primary Blue**: #3B82F6 (trust, calm)
- **Secondary Green**: #10B981 (healing, growth)
- **Neutral Gray**: #6B7280 (balance, stability)
- **Accent Purple**: #8B5CF6 (creativity, insight)

### Typography Scale
- **H1 Headlines**: 32-48px, Bold
- **H2 Subheadings**: 20-24px, Semibold
- **Body Text**: 16px, Regular
- **Captions**: 14px, Regular

---

## 📤 Export Workflow

### Step-by-Step Process
1. **Create** design in appropriate folder
2. **Save** iterations in `04_Work_In_Progress/Iterations`
3. **Finalize** and move to `03_Export_Queue/Ready_to_Export`
4. **Export** with settings below
5. **Upload** via RecoveryOS interface at `/canva/upload`
6. **Monitor** processing in `Exported_Pending_Review`
7. **Archive** approved assets in `Approved_Archive`

### Export Settings
- **Format**: PNG (graphics), JPG (photos), SVG (icons)
- **Quality**: High (300 DPI minimum)
- **Background**: Transparent where possible
- **File Size**: Keep under 50MB for upload

---

## 🏷️ Therapeutic Content Tags

### Emotional States
- anxiety, stress, depression, grief, trauma
- calm, peace, mindfulness, focus, energy
- hope, resilience, strength, recovery

### Therapeutic Approaches
- cognitive-behavioral, mindfulness, meditation
- breathing-exercises, grounding, relaxation
- positive-affirmations, gratitude, self-compassion

### Content Types
- hero (main banners), atmosphere (backgrounds)
- icon (symbols), badge (achievements)
- card (content containers), button (actions)

---

## ⚡ Quick Commands

### Folder Creation (Copy & Paste)
```
RecoveryOS_Assets
01_Design_Sources
02_By_Surface
03_Export_Queue
04_Work_In_Progress
05_Templates
06_Deprecated
```

### Template Sizes (Copy & Paste)
```
1920 x 1080 (Desktop Hero)
1080 x 1080 (Square Social)
1200 x 630 (Link Preview)
390 x 844 (Mobile Hero)
```

---

## 🔗 RecoveryOS Integration

### Upload Interface
- **URL**: `yourapp.com/canva/upload`
- **Supported Formats**: PNG, JPG, GIF, WebP
- **Max File Size**: 50MB
- **Processing**: Automatic optimization + AI tagging

### What Happens After Upload
1. **Optimization**: Convert to AVIF/WebP, resize
2. **Tagging**: AI analyzes therapeutic content
3. **Validation**: Governance rules applied
4. **Storage**: Uploaded to Supabase CDN
5. **Registration**: Added to asset database

---

## 🚨 Common Issues & Solutions

### File Too Large
- **Problem**: Export exceeds 50MB limit
- **Solution**: Reduce image quality or crop content

### Wrong Format
- **Problem**: File type not supported
- **Solution**: Export as PNG/JPG/GIF/WebP

### Naming Issues
- **Problem**: Asset not properly categorized
- **Solution**: Use format: `type_context_variant_version`

### Processing Fails
- **Problem**: Upload succeeds but processing fails
- **Solution**: Check file corruption, try re-export

---

## 📞 Support Resources

- **Canva Help**: canva.com/help
- **RecoveryOS Docs**: ASSET_PROCESSING_DEPLOYMENT_GUIDE.md
- **Brand Guidelines**: Check 05_Templates/Brand_Guidelines
- **Team Collaboration**: Share folder access with designers

---

**💡 Pro Tip**: Keep this guide open in a browser tab while working in Canva for quick reference!**</content>
<parameter name="filePath">/Users/danielfincham/recoverlution-platform/CANVA_QUICK_REFERENCE.md