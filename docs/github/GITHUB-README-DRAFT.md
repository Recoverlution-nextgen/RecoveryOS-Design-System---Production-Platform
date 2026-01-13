# 🚀 Recoverlution Platform

**Sophisticated SaaS Therapeutic Platform with infiniteK Design System**

![Status](https://img.shields.io/badge/status-active%20development-blue)
![Platform](https://img.shields.io/badge/platform-web-green)
![License](https://img.shields.io/badge/license-proprietary-red)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Clinical Foundation](#clinical-foundation)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

Recoverlution is a cutting-edge SaaS therapeutic platform that combines clinical evidence, AI orchestration, and innovative delivery mechanisms to support individuals on their recovery journey.

### Key Differentiators

- **6-Pillar Clinical Blueprint**: Evidence-based framework (ER, SR, SC, CR, II, DM)
- **LUMA AI Orchestration**: Personalized guidance and recommendations
- **NaviCue Arsenal**: 20+ therapeutic delivery mechanisms across 3 layers
- **infiniteK Design System**: Premium design with THE ANCHOR RULE
- **Progress Tracking**: Dynamic source of truth with red/amber/green status

---

## ✨ Features

### Marketing Suite (7 Pages)
- Home
- Story
- Platform
- Science
- Pricing
- Demo
- Therapy

### Platform Core (8 Pages)
- Dashboard - Home view with key metrics
- Journey - Week-by-week therapeutic progression
- Wellbeing - Monitoring and tracking
- State - Current emotional/mental state
- Toolkit - Access to resources
- Navigate - NaviCue recommendations
- Momentum - Progress visualization
- Profile - User settings and data

### LUMA System (AI Orchestration)
- LUMA Home - Central hub
- LUMA Voice - Conversational interface
- LUMA Play - Sound Bites integration
- LUMA Talk - Dialogue system

### NaviCue Arsenal (20+ Types)
- **Knowing Layer** (8 types): Reveals implicit beliefs
- **Believing Layer** (6 types): Generates prediction errors
- **Embodying Layer** (6 types): Makes change automatic

### Sound Bites System
- 450 soundbites organized by 6 S's architecture
- STATION, SOUNDTRACKS, STORY, STICKYNOTES, SHELF, SEARCH

---

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing-fast builds
- **Tailwind CSS 4.0** for styling
- **Lucide React** for icons
- **Recharts** for data visualization

### Backend
- **Supabase** for database and authentication
- **Edge Functions** for serverless logic
- **PostgreSQL** for data storage
- **KV Store** for flexible data management

### Payment
- **Stripe** for subscription management
- Foundation Tier: £99
- Professional Tier: £199

### AI & Audio
- **OpenAI API** for AI features
- **ElevenLabs** for voice synthesis
- Audio playback system

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Stripe account (for payment features)
- OpenAI API key (for AI features)
- ElevenLabs API key (for voice features)

### Installation

```bash
# Clone the repository
git clone https://github.com/Finchy23/recoverlution-platform.git
cd recoverlution-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your keys
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase
VITE_SUPABASE_URL=https://wzeqlkbmqxlsjryidagf.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SUPABASE_DB_URL=your_db_url_here

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# AI & Voice
OPENAI_API_KEY=your_openai_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_VOICE_ID=your_voice_id
```

### Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
recoverlution-platform/
├── /components/              # React components
│   ├── /marketing/          # Marketing site components
│   ├── /pages/              # Platform page components
│   ├── /luma3/              # LUMA system
│   ├── /navicues/           # NaviCue Arsenal
│   │   └── /arsenal/        # 20+ NaviCue types
│   ├── /ui/                 # Shared UI primitives
│   └── /figma/              # Figma integration
├── /styles/                 # CSS files
│   ├── globals.css          # Global styles + design tokens
│   ├── design-system.css    # infiniteK design system
│   └── platform.css         # Platform-specific styles
├── /supabase/               # Backend
│   └── /functions/server/   # Edge functions
├── /data/                   # Static data
│   ├── /articles/           # Clinical articles
│   └── /practices/          # Therapeutic practices
├── /utils/                  # Utility functions
├── /hooks/                  # Custom React hooks
├── /types/                  # TypeScript definitions
├── /public/                 # Static assets
└── /docs/                   # Documentation (see Notion)
```

---

## 🎨 Design System: infiniteK

### Core Principles

#### THE ANCHOR RULE
**NO CARD ON CARD. NO TILE ON TILE. NO BORDER ON BORDER.**

This foundational principle prevents visual nesting conflicts and maintains design clarity.

#### No Rounded Corners
All components use sharp corners for a clean, modern aesthetic.

#### Brand Colors

```css
/* Primary */
--primary: #3E2BB8;

/* Secondary */
--secondary: #5739FB;

/* Glass Effects */
backdrop-filter: blur(10px);
background: rgba(62, 43, 184, 0.1);
```

#### Glass Effects
- Frosted glass overlays
- Semi-transparent backgrounds
- Intelligent layering
- Premium feel throughout

### Component Library

All components follow infiniteK principles:
- Sharp corners (border-radius: 0)
- Glass effect overlays
- Consistent spacing system
- Semantic color usage

---

## 🧠 Clinical Foundation

### 6-Pillar Blueprint

1. **Emotional Regulation (ER)**
   - Managing emotional experiences
   - Regulation strategies
   - Distress tolerance

2. **Stress Resilience (SR)**
   - Coping with stress
   - Recovery strategies
   - Resilience building

3. **Social Connectivity (SC)**
   - Healthy relationships
   - Communication skills
   - Support networks

4. **Cognitive Reframing (CR)**
   - Thought pattern change
   - Cognitive distortions
   - Perspective shifts

5. **Identity Integration (II)**
   - Coherent sense of self
   - Values alignment
   - Narrative coherence

6. **Decision Mastery (DM)**
   - Effective decisions
   - Values clarification
   - Option evaluation

### Taxonomy

```
Pillar → Concept → Theme → Mindblock
```

- **Pillar**: Top-level clinical domain (6 total)
- **Concept**: Core idea within pillar
- **Theme**: Specific aspect of concept
- **Mindblock**: Atomic unit of mindset transformation

### Source of Truth System

Dynamic tracking with red/amber/green status indicators:
- 🔴 Red: Needs attention
- 🟡 Amber: In progress
- 🟢 Green: Integrated

---

## 📚 Documentation

**Complete documentation is in Notion:**
- [Main Workspace](https://www.notion.so/2d25a0fd01ef8161965bd978102f0e1b)
- [System Architecture](https://www.notion.so/2d25a0fd01ef814bbdd8eb3fdcc63ca8)
- [Design System](https://www.notion.so/2d25a0fd01ef813b84b1ec45a596fc86)
- [Clinical Foundation](https://www.notion.so/2d25a0fd01ef81f7bd91ec82c680b301)
- [NaviCue Arsenal](https://www.notion.so/2d25a0fd01ef81c3a743fa9c9dda9937)
- [Engineering Guide](https://www.notion.so/2d25a0fd01ef81c988caef8a98984909)

---

## 🤝 Contributing

This is a private project. If you're part of the team:

1. Create a feature branch: `feature/REC-123-description`
2. Make your changes
3. Follow infiniteK design principles
4. Create a Pull Request
5. Link to Jira issue (REC-123)
6. Get code review
7. Merge to `develop`

### Code Standards

- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- No card-on-card violations
- No rounded corners
- Glass effects where appropriate
- Component documentation (JSDoc)

---

## 📊 Project Management

- **GitHub**: Code repository
- **Jira**: Task tracking (https://danielfincham.atlassian.net)
- **Notion**: Documentation hub
- **Figma Make**: Development environment

---

## 🔐 License

Proprietary. All rights reserved.

© 2024 Recoverlution. Not for public distribution.

---

## 📞 Contact

For questions or support:
- Email: daniel@recoverlution.com
- Jira: https://danielfincham.atlassian.net

---

## 🎉 Acknowledgments

Built with clinical rigor and design excellence.

**Technologies:**
- React + TypeScript
- Supabase
- Stripe
- OpenAI
- ElevenLabs
- Tailwind CSS
- Vite

---

## 📈 Status

- ✅ Marketing Suite: Complete
- ✅ Platform Core: Complete
- ✅ LUMA System: Complete
- ✅ NaviCue Arsenal: 20+ types built
- ✅ Sound Bites: 450 soundbites integrated
- ✅ Backend: Supabase + Stripe configured
- 🚧 Beta Testing: In progress
- 🚧 Production Deploy: Pending

**Current Version:** v1.0.0-beta  
**Last Updated:** December 23, 2024
