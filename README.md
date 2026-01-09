# Recoverlution Platform

**Sophisticated SaaS Therapeutic Platform with infiniteK Design System**

## Overview

Recoverlution is a revolutionary therapeutic platform that combines clinical excellence with cutting-edge technology to deliver transformative mental health interventions. Built on the **6-Pillar Clinical Blueprint**, powered by **LUMA AI orchestration**, and delivered through the **NaviCue Arsenal** delivery mechanisms.

---

## Core Architecture

### Clinical Foundation: 6-Pillar Blueprint
**Taxonomy:** Pillar → Concept → Theme → Mindblock

- **Mindblocks:** Atomic units of mindset transformation
- **6 Pillars:** Core clinical framework
- **500 NaviCues:** Complete arsenal deployed in `navicue_library` table
- **20 Delivery Mechanisms:** Frontend toolkit for NaviCue presentation

### LUMA AI Orchestration
Revolutionary five-layer interface system providing intelligent therapeutic guidance and personalized intervention pathways.

### Sound Bites System: 6 S's Architecture
- **STATION:** Primary sound management hub
- **SOUNDTRACKS:** Curated therapeutic audio collections
- **STORY:** Narrative-driven content
- **STICKYNOTES:** Quick capture and reflection
- **SHELF:** Organized library management
- **SEARCH:** Intelligent content discovery

Organized into:
- **YOUR VOICE:** Personal recordings (450 soundbites)
- **LIBRARY:** Curated therapeutic content

---

## Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **infiniteK Design System** (brand colors: `#3E2BB8`, `#5739FB`)

### Backend
- **Supabase** (`wzeqlkbmqxlsjryidagf`)
  - PostgreSQL database
  - Edge Functions
  - Auth
  - Storage
- **Stripe** integration for subscriptions
  - Foundation Tier: £99
  - Professional Tier: £199

### Infrastructure
- Repository: `github.com/Finchy23/recoverlution-platform`
- Documentation: [Notion Workspace](https://www.notion.so/2d25a0fd01ef8161965bd978102f0e1b)
- Project Management: Jira (Project Key: `REC`)

---

## infiniteK Design System

### THE ANCHOR RULE
**NO CARD ON CARD. NO TILE ON TILE. NO BORDER ON BORDER.**

This fundamental principle ensures visual hierarchy and prevents nested container chaos.

### Core Design Principles
- ❌ **No emojis** site-wide
- ❌ **No dashes** in UI copy
- ❌ **No rounded corners** throughout the entire system
- ✅ **No minimizing words** (write fully, clearly)
- ✅ **Sharp, clean geometric design**
- ✅ **Consistent brand colors:** `#3E2BB8` (primary), `#5739FB` (accent)

---

## Project Structure

```
recoverlution-platform/
├── src/
│   ├── components/          # React components
│   ├── features/            # Feature modules
│   │   ├── luma/           # LUMA AI system
│   │   ├── navicues/       # NaviCue delivery mechanisms
│   │   ├── soundbites/     # Sound Bites 6 S's
│   │   └── clinical/       # 6-Pillar clinical features
│   ├── lib/                # Utilities and helpers
│   ├── hooks/              # Custom React hooks
│   └── styles/             # Global styles and themes
├── supabase/
│   ├── functions/          # Edge functions
│   └── migrations/         # Database migrations
├── docs/                   # Additional documentation
└── .github/                # GitHub workflows and templates
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase CLI (optional, for local development)

### Installation

```bash
# Clone the repository
git clone https://github.com/Finchy23/recoverlution-platform.git
cd recoverlution-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev
```

### Environment Variables

```env
VITE_SUPABASE_URL=https://wzeqlkbmqxlsjryidagf.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

---

## Development Workflow

### Branch Strategy
- **main:** Production-ready code
- **develop:** Integration branch for features
- **feature/[name]:** Individual feature branches
- **fix/[name]:** Bug fix branches
- **docs/[name]:** Documentation updates

### Commit Conventions

```
feat: Add new NaviCue delivery mechanism
fix: Resolve Sound Bites playback issue
docs: Update LUMA architecture documentation
style: Apply infiniteK design system to dashboard
refactor: Optimize clinical taxonomy queries
test: Add unit tests for 6-Pillar components
```

### Code Review Process
1. Create feature branch from `develop`
2. Implement changes following infiniteK design principles
3. Write tests and documentation
4. Submit Pull Request to `develop`
5. Address review feedback
6. Merge after approval

---

## NaviCue Arsenal

**500 NaviCues deployed** across the 6-Pillar Clinical Blueprint, stored in `navicue_library` table.

**20 Frontend Delivery Mechanisms:**
- Modal overlays
- Inline contextual hints
- Progressive disclosure patterns
- Animated transitions
- Voice-activated triggers
- And 15 more innovative mechanisms

---

## Deployment

### Production Checklist
- [ ] All tests passing
- [ ] infiniteK design system compliance verified
- [ ] THE ANCHOR RULE validated across all components
- [ ] Supabase migrations applied
- [ ] Stripe webhooks configured
- [ ] Environment variables set
- [ ] Performance benchmarks met

---

## Key Resources

- **Notion Workspace:** [Complete Documentation](https://www.notion.so/2d25a0fd01ef8161965bd978102f0e1b)
- **Jira Project:** `REC` (9 Epics, 109 Stories)
- **Supabase Project:** `wzeqlkbmqxlsjryidagf`
- **Design System:** See `docs/DESIGN_SYSTEM.md`
- **Architecture:** See `docs/ARCHITECTURE.md`

---

## Contributing

See `CONTRIBUTING.md` for detailed development standards, code conventions, and the complete infiniteK design system rules.

---

## License

Proprietary - All Rights Reserved

---

**Built with precision. Designed with purpose. Transforming lives through technology.**