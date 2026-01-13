# Asset Governance Integration

This document explains how the asset governance system integrates with our Supabase backend to provide intelligent, component-driven asset fetching.

## Overview

The asset governance system bridges high-level component needs with low-level database queries through:

1. **Stable governance IDs** (pillars, concepts, themes, schemas)
2. **Natural language label mapping** (breathing → arousal_regulation)
3. **Component placement rules** (WalkthroughPresenter → hero assets)
4. **Performance budgets** (400KB posters, 1.8MB loops)
5. **Delivery fit hints** (sense/route/deliver/seal stages)

## File Structure

```
packages/ui/src/
├── assets/
│   ├── asset-governance.json       # Governance schema (version-controlled)
│   └── asset-governance.ts         # TypeScript wrapper and utilities
├── lib/
│   └── supabase.ts                 # Enhanced with governance queries
└── hooks/
    └── useAssetPlacement.ts        # React hooks for components
```

## Governance Hierarchy

### Locked (Immutable Framework)
- **6 Pillars**: ER, SR, SC, CR, II, DM
- Cannot be added/removed, only enhanced with labels

### Controlled (Curated Taxonomy)
- **4 Concepts**: attention_orienting, arousal_regulation, repair_reconnection, choice_architecture
- **4 Themes**: create_choice_space, downshift_under_load, repair_the_moment, proof_capture
- **4 Schemas**: proof_capture, spine_feed, real_life_run, one_os_three_worlds
- Requires approval to add new entities

### Expandable (Organic Growth)
- **Families**: User-created collections
- **Mindblocks**: Content building blocks
- Can be added by content creators

## Usage Examples

### 1. Component-Driven Asset Fetching

Components automatically get the right assets based on placement rules:

```tsx
import { useAssetsByComponent } from '@recoveryos/ui';

function WalkthroughPresenter({ sceneId }) {
  // Automatically fetches hero assets for this component
  const { assets, loading } = useAssetsByComponent('WalkthroughPresenter');
  
  const poster = assets.find(a => a.type === 'hero-poster' && a.scene_id === sceneId);
  const loop = assets.find(a => a.type === 'hero-loop' && a.scene_id === sceneId);
  
  return (
    <div className="hero-scene">
      <img src={poster?.url} alt="Scene background" />
      <video src={loop?.url} autoPlay loop muted />
    </div>
  );
}
```

### 2. Hero Scene Hook (Best Practice)

Dedicated hook for hero scenes with automatic poster/loop detection:

```tsx
import { useHeroScene } from '@recoveryos/ui';

function Scene({ sceneId }) {
  // Respects prefers-reduced-motion automatically
  const { poster, loop, loading, error } = useHeroScene(sceneId);
  
  if (loading) return <LoadingSpinner />;
  if (error) return <div>Asset loading failed</div>;
  
  return (
    <div className="scene">
      {poster && <img src={poster.url} alt="Scene" />}
      {loop && <video src={loop.url} autoPlay loop muted />}
    </div>
  );
}
```

### 3. Natural Language Label Search

Content creators use natural language; system resolves to governance entities:

```tsx
import { useAssetsByLabels } from '@recoveryos/ui';

function BreathingExercise() {
  // Searches: breathing → arousal_regulation → downshift_under_load → wellbeing
  const { assets } = useAssetsByLabels(['breathing', 'meditation']);
  
  return (
    <div className="exercise">
      {assets.map(asset => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </div>
  );
}
```

### 4. Manual Governance Queries

Direct access to governance utilities:

```tsx
import { assetGovernance, getAssetsByComponent } from '@recoveryos/ui';

// Get pillar definition
const pillarER = assetGovernance.getPillar('emotional regulation');
// Returns: { id: 'pillar_ER', labels: ['emotional regulation', 'ER'] }

// Get concept by label
const concept = assetGovernance.getConcept('downshift');
// Returns: { id: 'concept_arousal_regulation', labels: ['arousal regulation', 'calm down', 'downshift'] }

// Match multiple labels
const matched = assetGovernance.matchLabels(['breathing', 'repair', 'proof']);
// Returns: { pillars: [], concepts: [...], themes: [...], schemas: [...] }

// Get enhanced tags for asset query
const tags = assetGovernance.getEnhancedTags(['breathing', 'meditation']);
// Returns: {
//   usage_tags: ['wellbeing'],
//   proof_fit: [],
//   concept_id: 'concept_arousal_regulation',
//   theme_id: 'theme_downshift_under_load'
// }
```

## Placement Rules

Placement rules connect components and routes to asset classes:

| Match | Asset Class | Usage Tags | Schema |
|-------|-------------|------------|--------|
| `component: WalkthroughPresenter` | `hero` | - | - |
| `component: SpineExplorer` | `system` | - | - |
| `component: OrchestrationFeed` | - | `dashboard` | - |
| `component: ContinuityStream` | - | `state` | - |
| `component: TraceTravel` | - | `library` | `schema_one_os_three_worlds` |
| `route: /journey*` | - | `journeys` | - |
| `route: /navicue*` | - | `navicues` | - |

## Budget Validation

Assets are automatically validated against performance budgets in dev mode:

```typescript
import { validateAssetBudget } from '@recoveryos/ui';

const asset = await getAssetByName('hero-scene-01-poster');
const validation = validateAssetBudget(asset);

if (!validation.valid) {
  console.warn('Budget warnings:', validation.warnings);
  // Example output:
  // ["Hero poster exceeds 400KB budget (512KB)"]
}
```

**Budgets:**
- Hero posters: ≤ 400KB (AVIF primary, WebP fallback)
- Section posters: ≤ 200KB
- Hero loops: ≤ 1.8MB (WebM primary, MP4 fallback)
- Micro loops: ≤ 600KB
- Video duration: 8-12 seconds

## Delivery Fit Hints

Each asset class has default delivery fit properties:

```typescript
import { getDeliveryFitForClass } from '@recoveryos/ui';

const heroFit = getDeliveryFitForClass('hero');
// Returns: {
//   sense: true,     // Initial awareness
//   route: true,     // Navigation/orientation
//   deliver: false,  // Active intervention
//   seal: false,     // Completion/proof
//   dose: "glance",  // Quick exposure
//   heat_band: "amber" // Attention level
// }

const proofFit = getDeliveryFitForClass('proof');
// Returns: {
//   sense: true,
//   route: true,
//   deliver: true,
//   seal: true,       // Full journey coverage
//   dose: "focus",    // Deep engagement
//   heat_band: "green" // Growth/achievement
// }
```

## Token Mapping

Asset classes map to CSS tokens:

```typescript
import { getTokensForAssetClass } from '@recoveryos/ui';

const heroTokens = getTokensForAssetClass('hero');
// Returns: ['hero.scene.*.poster', 'hero.scene.*.loop']

const systemTokens = getTokensForAssetClass('system');
// Returns: ['thread.overlay.default', 'halo.pillar.*', 'seal.pulse.*', 'altitude.refraction']
```

Use this to connect assets to design system tokens:

```tsx
function HeroScene({ sceneId }) {
  const { poster } = useHeroScene(sceneId);
  const tokens = getTokensForAssetClass('hero');
  
  return (
    <div 
      className="hero" 
      style={{ 
        backgroundImage: `url(${poster?.url})`,
        // Fallback to CSS token if asset not loaded
        backgroundColor: 'var(--hero-scene-01-poster-fallback)'
      }}
    />
  );
}
```

## Label Mapping

Natural language labels resolve to governance entities:

| Labels | Concept | Theme | Tags | Proof Fit |
|--------|---------|-------|------|-----------|
| breathing, meditation, grounding | arousal_regulation | downshift_under_load | wellbeing | - |
| proof, receipt, before after | - | proof_capture | - | receipt_ready, before_after, checklist |
| orient, attention, focus | attention_orienting | create_choice_space | - | - |
| apology, repair, relationship | repair_reconnection | repair_the_moment | - | - |
| spine, order, feed | - | - | - | schema_spine_feed |
| continuity, loop, motion | - | - | - | schema_real_life_run |

## Database Schema

Assets table structure (matches Supabase):

```sql
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  type TEXT CHECK (type IN ('hero-poster', 'hero-loop', 'noise-texture', 'thread-texture', 'seal-pulse', 'receipt-object', 'system', 'icon')),
  category TEXT CHECK (category IN ('atmosphere', 'hero', 'system', 'icon', 'proof')),
  scene_id TEXT CHECK (scene_id IN ('scene-01', 'scene-02', 'scene-03', 'scene-04')),
  pillar_id TEXT CHECK (pillar_id IN ('pillar_ER', 'pillar_SR', 'pillar_SC', 'pillar_CR', 'pillar_II', 'pillar_DM')),
  format TEXT CHECK (format IN ('avif', 'webp', 'webm', 'mp4', 'png', 'svg', 'css')),
  url TEXT NOT NULL,
  fallback_url TEXT,
  width INTEGER,
  height INTEGER,
  file_size INTEGER,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_assets_category_type ON assets(category, type);
CREATE INDEX idx_assets_scene ON assets(scene_id);
CREATE INDEX idx_assets_pillar ON assets(pillar_id);
CREATE INDEX idx_assets_tags ON assets USING gin(tags);
```

## API Reference

### Hooks

#### `useAssetsByComponent(componentName, route?)`
Fetches assets based on component placement rules.

**Parameters:**
- `componentName: string` - Component name (e.g., 'WalkthroughPresenter')
- `route?: string` - Optional route for context

**Returns:** `{ assets: Asset[], loading: boolean, error: Error | null }`

#### `useAssetsByLabels(labels)`
Fetches assets using natural language labels.

**Parameters:**
- `labels: string[]` - Array of labels (e.g., ['breathing', 'meditation'])

**Returns:** `{ assets: Asset[], loading: boolean, error: Error | null }`

#### `useHeroScene(sceneId)`
Dedicated hook for hero scenes with automatic poster/loop detection.

**Parameters:**
- `sceneId: 'scene-01' | 'scene-02' | 'scene-03' | 'scene-04'`

**Returns:** `{ poster: Asset | null, loop: Asset | null, loading: boolean, error: Error | null }`

**Features:**
- Respects `prefers-reduced-motion` (returns null for loop if user prefers reduced motion)
- Automatically finds poster and loop assets
- Budget validation in dev mode

### Functions

#### `getAssetsByComponent(componentName, route?)`
Async function to fetch assets by component.

#### `getAssetsByLabels(labels)`
Async function to fetch assets by natural language labels.

#### `validateAssetBudget(asset)`
Validates asset against performance budgets.

**Returns:** `{ valid: boolean, warnings: string[] }`

#### `getDeliveryFitForClass(assetClass)`
Gets delivery fit hints for an asset class.

#### `getTokensForAssetClass(assetClass)`
Gets CSS tokens for an asset class.

### AssetGovernance Class

Singleton instance: `assetGovernance`

#### Methods

- `getPillar(idOrLabel)` - Get pillar by ID or label
- `getConcept(idOrLabel)` - Get concept by ID or label
- `getTheme(idOrLabel)` - Get theme by ID or label
- `getSchema(idOrLabel)` - Get schema by ID or label
- `getPlacementForComponent(componentName, route?)` - Get placement rule
- `matchLabels(labels)` - Match labels to governance entities
- `getEnhancedTags(labels)` - Resolve labels to tags and IDs
- `validateAssetBudget(asset)` - Validate against budgets
- `getDeliveryFitHints(assetClass)` - Get delivery fit defaults
- `getTokensForClass(assetClass)` - Get CSS tokens

## Best Practices

### 1. Always Use Hooks in Components
```tsx
// ✅ Good
function MyComponent() {
  const { assets, loading } = useAssetsByComponent('MyComponent');
  // ...
}

// ❌ Bad - direct query in component
function MyComponent() {
  const [assets, setAssets] = useState([]);
  useEffect(() => {
    getAssetsByComponent('MyComponent').then(setAssets);
  }, []);
  // ...
}
```

### 2. Handle Loading and Error States
```tsx
function MyComponent() {
  const { assets, loading, error } = useAssetsByComponent('MyComponent');
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={error} />;
  if (assets.length === 0) return <EmptyState />;
  
  return <AssetDisplay assets={assets} />;
}
```

### 3. Respect Reduced Motion
```tsx
function HeroScene({ sceneId }) {
  const { poster, loop } = useHeroScene(sceneId);
  // loop is automatically null if user prefers reduced motion
  
  return (
    <>
      <img src={poster?.url} alt="Scene" />
      {loop && <video src={loop.url} autoPlay loop muted />}
    </>
  );
}
```

### 4. Validate Budgets in Development
The system automatically logs budget warnings in dev mode. Monitor console for:
- "Asset X has budget warnings: [...]"
- "Hero poster exceeds 400KB budget"
- "Hero loop exceeds 1.8MB budget"

### 5. Use Natural Language Labels
```tsx
// ✅ Good - Natural language
const { assets } = useAssetsByLabels(['breathing', 'meditation']);

// ❌ Bad - Direct IDs (unless you need precise control)
const { assets } = useAssetsByLabels(['concept_arousal_regulation']);
```

## Troubleshooting

### No assets returned for component
```typescript
// Check placement rule exists
const placement = assetGovernance.getPlacementForComponent('MyComponent');
console.log(placement); // Should not be undefined

// Check Supabase query
const assets = await getAssetsByComponent('MyComponent');
console.log(assets); // Check what's returned
```

### Labels not resolving
```typescript
// Test label mapping
const enhanced = assetGovernance.getEnhancedTags(['breathing']);
console.log(enhanced);
// Should show: { usage_tags: ['wellbeing'], concept_id: 'concept_arousal_regulation', ... }
```

### Budget warnings
```typescript
// Validate specific asset
const asset = await getAssetByName('my-asset');
const validation = validateAssetBudget(asset);
console.log(validation.warnings);
```

## Next Steps

1. **Add Placement Rules** - Edit `asset-governance.json` to add rules for new components
2. **Extend Label Mapping** - Add natural language synonyms for governance entities
3. **Upload Assets** - Use Supabase Storage with governance-compliant metadata
4. **Create Admin UI** - Build interface for content creators to tag assets with labels
5. **Analytics** - Track which assets are used, identify gaps in coverage

## Versioning

Current version: `1.0.0`

The governance schema is versioned. Breaking changes increment major version:
- **Patch** (1.0.x): Label additions, documentation
- **Minor** (1.x.0): New placement rules, expandable entities
- **Major** (x.0.0): Changes to locked governance, breaking API changes
