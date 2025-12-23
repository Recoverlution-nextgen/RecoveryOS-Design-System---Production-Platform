# Contributing to Recoverlution Platform

## Development Standards

This document outlines the development standards, workflows, and design principles for the Recoverlution platform.

---

## infiniteK Design System Principles

### THE ANCHOR RULE
**NO CARD ON CARD. NO TILE ON TILE. NO BORDER ON BORDER.**

This is the fundamental principle that guides all UI component composition:

✅ **DO:**
- Use a single container level per component
- Create clear visual hierarchy through spacing and typography
- Use background colors and shadows to define boundaries

❌ **DON'T:**
- Nest bordered containers within bordered containers
- Place cards inside other cards
- Stack tiles on top of tiles

### Core Design Rules

1. **No Emojis** - Never use emojis anywhere in the application UI or documentation
2. **No Dashes** - Avoid dashes in user-facing copy (use proper punctuation)
3. **No Rounded Corners** - All UI elements use sharp, geometric corners
4. **No Minimizing Words** - Write complete, clear sentences (no abbreviations unless standard)
5. **Brand Colors Only:**
   - Primary: `#3E2BB8`
   - Accent: `#5739FB`
   - Use grayscale for neutral elements

### Typography
- Clear hierarchy through size and weight
- Consistent line height and spacing
- Readable, professional font choices

### Spacing
- Use consistent spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px)
- Generous whitespace for breathing room
- Aligned grids for visual consistency

---

## Git Workflow

### Branch Strategy

```
main (production)
└── develop (integration)
    ├── feature/luma-interface-layer-3
    ├── feature/navicue-delivery-modal
    ├── fix/soundbites-playback-bug
    └── docs/architecture-updates
```

**Branch Types:**
- `feature/[description]` - New features
- `fix/[description]` - Bug fixes
- `docs/[description]` - Documentation updates
- `refactor/[description]` - Code refactoring
- `test/[description]` - Test additions/updates

### Commit Message Convention

Use semantic commit messages:

```
<type>: <subject>

<body (optional)>

<footer (optional)>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, no logic change)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

**Examples:**

```bash
feat: Add LUMA layer 4 decision tree interface

Implements the fourth layer of the LUMA AI orchestration system,
including decision tree visualization and user interaction flows.

Relates to: REC-23
```

```bash
fix: Resolve Sound Bites playback interruption

Audio playback was interrupted when navigating between STATION
and SOUNDTRACKS. Fixed by maintaining audio context across routes.

Fixes: REC-87
```

```bash
docs: Update NaviCue delivery mechanism specifications

Added detailed documentation for 5 new delivery mechanisms
including implementation examples and design constraints.
```

### Pull Request Process

1. **Create Branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Develop & Commit**
   - Make focused, atomic commits
   - Follow commit message conventions
   - Test thoroughly

3. **Push & Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   - Use the PR template (`.github/PULL_REQUEST_TEMPLATE.md`)
   - Reference related Jira tickets (e.g., `REC-23`)
   - Add screenshots for UI changes

4. **Code Review**
   - Address all review comments
   - Ensure CI passes
   - Verify infiniteK design compliance

5. **Merge**
   - Squash commits when merging to `develop`
   - Delete feature branch after merge

---

## Code Standards

### TypeScript
- Strict mode enabled
- No `any` types (use `unknown` if necessary)
- Explicit return types for functions
- Interfaces for object shapes

### React Components

```typescript
// Good: Functional component with proper typing
interface NaviCueCardProps {
  navicue: NaviCue;
  onSelect: (id: string) => void;
  variant?: 'compact' | 'expanded';
}

export function NaviCueCard({ 
  navicue, 
  onSelect, 
  variant = 'compact' 
}: NaviCueCardProps): JSX.Element {
  // Component implementation
}
```

### File Organization

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── layout/          # Layout components
│   └── forms/           # Form components
├── features/
│   ├── luma/
│   │   ├── components/  # Feature-specific components
│   │   ├── hooks/       # Feature-specific hooks
│   │   ├── types/       # Feature-specific types
│   │   └── utils/       # Feature-specific utilities
│   ├── navicues/
│   ├── soundbites/
│   └── clinical/
├── lib/
│   ├── supabase/        # Supabase client and utilities
│   ├── stripe/          # Stripe integration
│   └── utils/           # Shared utilities
└── hooks/               # Shared custom hooks
```

### Styling with Tailwind

```typescript
// Good: Following infiniteK design system
<div className="bg-white border border-gray-200 p-6">
  {/* No nested bordered containers inside */}
  <h2 className="text-2xl font-semibold" style={{ color: '#3E2BB8' }}>
    NaviCue Title
  </h2>
  <p className="mt-4 text-gray-700">
    Content goes here
  </p>
</div>

// Bad: Violates THE ANCHOR RULE
<div className="bg-white border border-gray-200 rounded-lg p-6">
  {/* Rounded corners violate design system */}
  <div className="border border-gray-300 rounded p-4">
    {/* Nested borders violate THE ANCHOR RULE */}
  </div>
</div>
```

---

## Testing

### Unit Tests
- Test all business logic
- Test complex UI interactions
- Use React Testing Library

### Integration Tests
- Test feature workflows
- Test Supabase integrations
- Test Stripe checkout flows

### E2E Tests
- Critical user journeys
- NaviCue delivery mechanisms
- Sound Bites recording and playback

---

## Clinical Foundation Compliance

### 6-Pillar Taxonomy

When working with clinical content:

```typescript
interface ClinicalTaxonomy {
  pillar: Pillar;        // Top level
  concept: Concept;      // Second level
  theme: Theme;          // Third level
  mindblock: Mindblock;  // Atomic unit (smallest)
}
```

**Always maintain hierarchy:**
- Every Mindblock belongs to a Theme
- Every Theme belongs to a Concept
- Every Concept belongs to a Pillar

### NaviCue Implementation

- Reference NaviCues by ID from `navicue_library` table
- Use appropriate delivery mechanism for context
- Track user interactions for LUMA personalization

---

## Supabase Guidelines

### Database Queries
- Use TypeScript types generated from schema
- Handle errors gracefully
- Use RLS policies appropriately

### Edge Functions
- Keep functions focused and single-purpose
- Log errors comprehensively
- Use environment variables for secrets

### Storage
- Store audio files in organized buckets
- Use signed URLs for private content
- Implement proper access controls

---

## Performance Standards

- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Lighthouse Score:** > 90
- **Bundle Size:** Monitor and optimize

---

## Accessibility

- WCAG 2.1 Level AA compliance
- Semantic HTML
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast

---

## Security

- Never commit secrets or API keys
- Use environment variables
- Validate all user input
- Sanitize data before display
- Follow OWASP guidelines

---

## Questions?

Refer to:
- [Architecture Documentation](docs/ARCHITECTURE.md)
- [Design System Documentation](docs/DESIGN_SYSTEM.md)
- [Notion Workspace](https://www.notion.so/2d25a0fd01ef8161965bd978102f0e1b)
- Jira Project: `REC`

---

**Remember: THE ANCHOR RULE is non-negotiable. Every component must respect this principle.**