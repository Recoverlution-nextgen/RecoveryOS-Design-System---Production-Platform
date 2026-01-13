# RecoveryOS Marketing Website - Build Specification

**Purpose**: Keynote-grade marketing website. Not the product. The demo, the spec sheet, the guided experience.

**Philosophy**: One website with a Lens. Individual/Professional/Organisation density changes without rebuilding UI.

---

## File Structure

```
apps/web/src/
  pages/
    HomePage.tsx              # Hero + What it is
    HowItWorksPage.tsx        # Spine → Orchestration → Proof
    TrustPage.tsx             # Rails + governance
    ThreeWorldsPage.tsx       # Individual/Pro/Org via Lens
    SpecsPage.tsx             # Framework glossary
    ContactPage.tsx           # Entry point
  
packages/ui/src/
  website/
    primitives/
      Section/
        Section.tsx
        Section.css
      Container/
        Container.tsx
        Container.css
      Grid/
        Grid.tsx
        Grid.css
      CTACluster/
        CTACluster.tsx
        CTACluster.css
      AmbientField/
        AmbientField.tsx
        AmbientField.css
      SiteLensToggle/
        SiteLensToggle.tsx
        SiteLensToggle.css
    
    narrative/
      WalkthroughPresenter/
        WalkthroughPresenter.tsx
        WalkthroughPresenter.css
      SpineExplorer/
        SpineExplorer.tsx
        SpineExplorer.css
      ContinuityStream/
        ContinuityStream.tsx
        ContinuityStream.css
      OrchestrationFeed/
        OrchestrationFeed.tsx
        OrchestrationFeed.css
      TrustRails/
        TrustRails.tsx
        TrustRails.css
      EmbeddedDemo/
        EmbeddedDemo.tsx
        EmbeddedDemo.css
```

---

## Routes & Pages

### 1. Home (`/`)
**Sections**:
- Hero: WalkthroughPresenter (4 scenes)
- What it is: Quick explainer with CTACluster
- Social proof (optional): Testimonial cards

**Components used**:
- WalkthroughPresenter
- Section, Container
- CTACluster
- AmbientField

---

### 2. How It Works (`/how-it-works`)
**Sections**:
- SpineExplorer: Framework made tangible (glance → journey)
- ContinuityStream: Routed → Delivered → Sealed → Reviewed
- OrchestrationFeed: Why routed, what held, what's next
- Proof section: TraceTravel preview

**Components used**:
- SpineExplorer
- ContinuityStream
- OrchestrationFeed
- TraceTravel (wrapped)
- Section, Container, Grid

---

### 3. Trust (`/trust`)
**Sections**:
- Hero: Safety as design, not compliance
- TrustRails: Consent, boundaries, auditability
- Governance visualization
- Integrity log preview

**Components used**:
- TrustRails
- IntegrityLogPreview (wrapped)
- GovernanceLockMap (wrapped)
- Section, Container

---

### 4. Three Worlds (`/three-worlds`)
**Sections**:
- Lens toggle hero (Individual/Professional/Organisation)
- Same artifact, three interpretations
- TraceTravel with all three lenses
- Density comparison

**Components used**:
- SiteLensToggle (prominent)
- TraceTravel (full demo)
- Section, Container, Grid

---

### 5. Specs (`/specs`)
**Sections**:
- Framework glossary
- Pillar definitions (ER/SR/SC/CR/II/DM)
- Stability model
- Token system overview

**Components used**:
- Section, Container
- Custom spec tables/cards

---

### 6. Contact/Demo (`/contact`)
**Sections**:
- EmbeddedDemo: "Run a Moment" mini experience
- Contact form
- CTACluster

**Components used**:
- EmbeddedDemo
- CTACluster
- Section, Container

---

## Component API Specifications

### Site Primitives

#### `Section`
```tsx
interface SectionProps {
  variant?: 'default' | 'hero' | 'feature' | 'dark' | 'ambient';
  ambient?: boolean; // Adds AmbientField background
  children: React.ReactNode;
  id?: string; // For anchor links
}
```

#### `Container`
```tsx
interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
}
```

#### `Grid`
```tsx
interface GridProps {
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
  children: React.ReactNode;
}
```

#### `CTACluster`
```tsx
interface CTAClusterProps {
  primary: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondary?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  align?: 'left' | 'center' | 'right';
}
```

#### `AmbientField`
```tsx
interface AmbientFieldProps {
  variant?: 'calm' | 'heat' | 'return' | 'thread' | 'trace';
  intensity?: 'low' | 'medium' | 'high';
  children?: React.ReactNode;
}
```

#### `SiteLensToggle`
```tsx
interface SiteLensToggleProps {
  value: 'individual' | 'professional' | 'organisation';
  onChange: (lens: Lens) => void;
  variant?: 'chrome' | 'inline' | 'hero';
}
```

---

### Narrative Components

#### `WalkthroughPresenter`
```tsx
interface Scene {
  id: string;
  title: string;
  subtitle?: string;
  body: string;
  visual?: 'ambient' | 'diagram' | 'component' | React.ReactNode;
  cta: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

interface WalkthroughPresenterProps {
  scenes: Scene[];
  autoAdvance?: boolean;
  autoAdvanceDelay?: number; // ms
  onComplete?: () => void;
}
```

#### `SpineExplorer`
```tsx
interface SpineExplorerProps {
  defaultDepth?: 'glance' | 'seed' | 'thread' | 'journey';
  interactive?: boolean;
  onPillarClick?: (pillar: Pillar) => void;
  onDepthChange?: (depth: Depth) => void;
}
```

#### `ContinuityStream`
```tsx
interface StreamEntry {
  id: string;
  stage: 'routed' | 'delivered' | 'sealed' | 'reviewed';
  title: string;
  timestamp: string;
  metadata?: Record<string, string>;
}

interface ContinuityStreamProps {
  entries: StreamEntry[];
  variant?: 'timeline' | 'cards' | 'compact';
}
```

#### `OrchestrationFeed`
```tsx
interface FeedCard {
  id: string;
  type: 'why-routed' | 'what-held' | 'whats-next';
  title: string;
  body: string;
  metadata?: Record<string, string>;
}

interface OrchestrationFeedProps {
  cards: FeedCard[];
  layout?: 'grid' | 'masonry' | 'list';
}
```

#### `TrustRails`
```tsx
interface TrustRailsProps {
  variant?: 'site' | 'demo';
  showConsent?: boolean;
  showQuietHours?: boolean;
  showEscalation?: boolean;
  showGovernance?: boolean;
  interactive?: boolean;
}
```

#### `EmbeddedDemo`
```tsx
interface EmbeddedDemoProps {
  mode?: 'moment' | 'continuity' | 'trace-travel';
  autoPlay?: boolean;
  onComplete?: () => void;
}
```

---

## Build Order

### **Phase 1: Site Primitives** (~2-3 hours)
Priority order:
1. Section (base layout)
2. Container (content constraint)
3. AmbientField (visual foundation)
4. Grid (responsive layout)
5. CTACluster (action pattern)
6. SiteLensToggle (core navigation)

**Deliverable**: Complete primitive set, all using --space-1 through --space-16 and semantic tokens.

---

### **Phase 2: Narrative Components** (~6-8 hours)

#### 2A. WalkthroughPresenter (~2 hours)
- Full-screen keynote mode
- Scene transitions with keyboard nav
- One CTA per scene
- From C8 spec

#### 2B. SpineExplorer (~1.5 hours)
- Enhance existing SpineAtlas
- Add zoom interaction (glance ⇄ thread)
- From C3 spec

#### 2C. ContinuityStream (~1.5 hours)
- Timeline component
- State progression visualization
- From C4 spec

#### 2D. OrchestrationFeed (~1 hour)
- Card layout
- "Why routed, what held, what's next"
- From C3 spec

#### 2E. TrustRails (~1 hour)
- Wrap existing Handrail/Trust components
- Presentation mode styling

**Deliverable**: All 5 narrative components ready, using semantic tokens.

---

### **Phase 3: Page Structure** (~4-5 hours)
1. Home (1 hour)
2. How It Works (1.5 hours)
3. Trust (1 hour)
4. Three Worlds (1 hour)
5. Specs (0.5 hours)
6. Contact (0.5 hours)

**Deliverable**: 6 complete pages, all routes working.

---

### **Phase 4: Embedded Demo** (~2-3 hours) [OPTIONAL]
- Constrained RecoveryOSPortal wrapper
- "Run a Moment" flow
- Continuity + TraceTravel preview

**Deliverable**: Interactive proof component.

---

## Token Usage Guidelines

**All new components must use:**
- Spacing scale: `--space-1` through `--space-16` (not legacy --space-small/medium/large)
- Semantic tokens: `--return-*`, `--thread-*`, `--trace-*`, `--handrail-*` where appropriate
- Motion tokens: `--motion-arrive`, `--motion-glide`, `--motion-settle`
- Typography scale: `--text-display-1`, `--text-body-1`, etc.
- Mode-aware: Support both Calm and Heat modes

---

## Lens Behavior

**Individual lens**:
- Calmer colors (more --return-* tokens)
- Fewer rails visible
- Simpler copy
- More whitespace

**Professional lens**:
- Signal-first (more --thread-* tokens)
- Continuity language
- "What held + what's next"
- Moderate density

**Organisation lens**:
- Integrity-first (more --trace-* tokens)
- Governance surfaces visible
- Mono/spec typography
- Higher density

**Implementation**: Use CSS custom properties + data attributes:
```css
[data-lens="individual"] .component { /* lighter */ }
[data-lens="professional"] .component { /* moderate */ }
[data-lens="organisation"] .component { /* denser */ }
```

---

## Success Metrics

**Phase 1 Complete**: All primitives built, tokens used correctly, stories created
**Phase 2 Complete**: All 5 narrative components functional, interactive
**Phase 3 Complete**: 6 pages live, routing works, lens toggle functional
**Phase 4 Complete**: Embedded demo works, "Run a Moment" flow smooth

**Total estimate**: 14-19 hours for complete marketing website.

---

## Next Steps

1. ✅ Build spec complete
2. Start Phase 1: Section, Container, AmbientField
3. Build Phase 2A: WalkthroughPresenter
4. Create Home page as proof
5. Iterate: add remaining narrative components
6. Complete all pages
7. Polish + embedded demo
