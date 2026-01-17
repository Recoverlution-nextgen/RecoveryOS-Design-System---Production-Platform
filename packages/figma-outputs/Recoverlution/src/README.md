# 🎯 Recoverlution Platform

A sophisticated SaaS therapeutic platform with AI orchestration.

## 📍 Documentation

**All documentation has been migrated to Notion for better organization and collaboration.**

🔗 **[Access Full Documentation in Notion](https://www.notion.so/2dc5a0fd01ef812ab28af56129a9d5a2)**

### Quick Links

- **[📚 AI START HERE - Context Map](https://www.notion.so/2dc5a0fd01ef81bfa52eeab492d4305e)** ← Read this FIRST every session
- **[🧭 Brand & Design System](https://www.notion.so/2dc5a0fd01ef81f5bb58deedcf06f5f7)** ← The Anchor, infiniteK rules
- **[🎨 Design System Playbook](https://www.notion.so/2dc5a0fd01ef81f2a5d0d9922fbbca5a)** ← Complete CSS & component patterns
- **[🏛️ Marketing Site](https://www.notion.so/2dc5a0fd01ef81eb8433edf334a013ef)** ← All 7 pages documented
- **[🏛️ Platform/App](https://www.notion.so/2dc5a0fd01ef81489c4ed4d7fed8796b)** ← 4-layer architecture, 7 rooms

## 🎨 For Designers: Figma Handoff Workflow

**Source of Truth:** Notion is canonical. Read the links above before designing.

**Workflow:**
1. Read Notion pages (Context Map, Brand & Design System, Design System Playbook)
2. Design in Figma using only defined tokens and components
3. Export/annotate with token names (spacing, typography, colors)
4. Create handoff note in Notion with links, decisions, questions
5. Engineers land changes in GitHub; acknowledge in Notion when merged

**Guardrails (must follow):**
- **The Anchor Rule:** NO CARD ON CARD. NO TILE ON TILE. NO BORDER ON BORDER.
- No new colors, radii, shadows, or spacing outside token set
- No emojis in UI copy
- No dashes in copy (use em dash — when needed)
- Keep copy minimal and direct
- Prefer vertical stacking; let content breathe

**What to hand off:**
- Layout with spacing tokens (e.g., space-4, space-6)
- Type with token names (e.g., h1, h2, meta, small)
- Color tokens (e.g., text-default, bg-surface, brand-primary)
- Component variant selections (e.g., Button primary/secondary)
- Conditional states noted (hover, focus, pressed)

## 🏗️ Architecture

**Four-Layer Operating System:**
1. **Command Center 2** - Control plane for truth and governance
2. **LUMA** - AI orchestration layer with mandatory WhyNow explanations
3. **6S Orbit** - Daily lived OS (STATION, SOUNDTRACKS, STORY, STICKYNOTES, SHELF, SEARCH)
4. **Rooms** - Journey, NaviCues, Toolkit, Wellbeing, State, Navigate, Momentum

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🎨 Design System: infiniteK

**Brand Colors:**
- Primary: `#3E2BB8`
- Accent: `#5739FB`

**The Anchor Rule:** NO CARD ON CARD. NO TILE ON TILE. NO BORDER ON BORDER.

**Strict Rules:**
- No rounded corners
- No emojis in UI
- No dashes site-wide
- No minimizing words

## 🔌 Backend

**Edge Functions:** All database operations via Supabase Edge Functions  
**Schema Management:** Via Supabase Dashboard (no SQL files in repository)  
**Synthetics Engine:** Continuous automated synthetic data generation for testing and demos

## 📚 Key Systems

- **NaviCue System** - 7,000 batch generation system with 21 Schema Therapy schemas
- **Journey System** - 13-scene journey builder with ERA phases
- **Command Center 2** - Complete admin interface with 4 modes (BUILD, GOVERN, SIMULATE, PROVE)
- **Synthetics Engine** - Automated continuous data generation (see `ACTIVATE_SYNTHETICS.md`)
- **Universal Player** - Unified content playback system
- **Glass Morphism** - 3-level system (Primary → Secondary → Tertiary)

## 🔗 Philosophy

**Apple for Addiction.**  
World-class science. Human-first design. Authority with heart.

**The NOW Principle:**  
Patients never see timelines, weeks, or deadlines. Recovery is fluid and forever.

---

**Built with:** React + TypeScript + Tailwind CSS + Supabase  
**Status:** Production Ready ✅  
**Documentation:** [Notion Workspace](https://www.notion.so/2dc5a0fd01ef812ab28af56129a9d5a2)