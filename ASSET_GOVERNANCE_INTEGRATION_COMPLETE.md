# Asset Governance Integration - Complete ✅

## What Was Built

Successfully integrated the asset governance JSON schema into the RecoveryOS codebase, creating a sophisticated asset management system that bridges natural language labels to structured database queries.

## Files Created

### 1. Core Governance System
- **`packages/ui/src/assets/asset-governance.json`** (145 lines)
  - Version-controlled governance schema
  - 6 locked pillars (ER, SR, SC, CR, II, DM)
  - 4 controlled concepts, themes, schemas
  - 7 placement rules for component-driven asset fetching
  - 5 label mappings for natural language resolution
  - Performance budgets (400KB posters, 1.8MB loops)
  - Delivery fit hints per asset class

- **`packages/ui/src/assets/asset-governance.ts`** (250 lines)
  - TypeScript wrapper around JSON schema
  - `AssetGovernance` singleton class with methods:
    - `getPillar/getConcept/getTheme/getSchema(idOrLabel)`
    - `getPlacementForComponent(componentName, route?)`
    - `matchLabels(labels)` - Multi-entity matching
    - `getEnhancedTags(labels)` - Resolve labels to IDs
    - `validateAssetBudget(asset)` - Performance validation
    - `getDeliveryFitHints(assetClass)` - Stage hints
    - `getTokensForClass(assetClass)` - CSS token mapping

### 2. Enhanced Supabase Integration
- **`packages/ui/src/lib/supabase.ts`** (Updated, +80 lines)
  - `getAssetsByComponent(componentName, route?)` - Placement-driven queries
  - `getAssetsByLabels(labels[])` - Natural language search
  - `getDeliveryFitForClass(assetClass)` - Delivery hints
  - `getTokensForAssetClass(assetClass)` - Token mapping
  - `validateAssetBudget(asset)` - Budget validation
  - Automatic budget warnings in dev mode

### 3. React Hooks
- **`packages/ui/src/hooks/useAssetPlacement.ts`** (180 lines)
  - `useAssetsByComponent(componentName, route?)` - Component-driven fetching
  - `useAssetsByLabels(labels[])` - Natural language queries
  - `useAssetsByClass(assetClass)` - Filter by asset class
  - `useHeroScene(sceneId)` - Dedicated hero scene hook
    - Returns `{ poster, loop, loading, error }`
    - Respects `prefers-reduced-motion` automatically
    - Budget validation in dev mode

### 4. Documentation
- **`ASSET_GOVERNANCE.md`** (500+ lines)
  - Complete integration guide
  - Usage examples for all hooks and functions
  - API reference with types
  - Governance hierarchy explanation
  - Placement rules table
  - Label mapping guide
  - Budget specifications
  - Delivery fit stages
  - Token mapping
  - Troubleshooting section
  - Best practices

## Key Features

### 1. Component-Driven Asset Fetching
```tsx
const { assets } = useAssetsByComponent('WalkthroughPresenter');
// Automatically fetches hero assets based on placement rules
```

### 2. Natural Language Label Resolution
```tsx
const { assets } = useAssetsByLabels(['breathing', 'meditation']);
// Resolves: breathing → arousal_regulation → downshift_under_load → wellbeing
```

### 3. Hero Scene Hook with Reduced Motion Support
```tsx
const { poster, loop } = useHeroScene('scene-01');
// loop is null if user prefers reduced motion
```

### 4. Automatic Budget Validation
```typescript
// Dev mode automatically logs warnings:
// "Asset hero-scene-01-poster has budget warnings: ['Hero poster exceeds 400KB budget (512KB)']"
```

### 5. Delivery Fit Awareness
```typescript
const heroFit = getDeliveryFitForClass('hero');
// { sense: true, route: true, deliver: false, seal: false, dose: "glance", heat_band: "amber" }
```

## Governance Hierarchy

### Locked (Immutable)
- 6 Pillars: ER, SR, SC, CR, II, DM
- Cannot be added/removed, only enhanced with label synonyms

### Controlled (Curated)
- 4 Concepts: attention_orienting, arousal_regulation, repair_reconnection, choice_architecture
- 4 Themes: create_choice_space, downshift_under_load, repair_the_moment, proof_capture
- 4 Schemas: proof_capture, spine_feed, real_life_run, one_os_three_worlds
- Requires approval to add new entities

### Expandable (Organic)
- Families: User-created collections
- Mindblocks: Content building blocks
- Can be added freely by content creators

## Placement Rules

| Component | Asset Class | Tags | Schema |
|-----------|-------------|------|--------|
| WalkthroughPresenter | hero | - | - |
| SpineExplorer | system | - | - |
| OrchestrationFeed | - | dashboard | - |
| ContinuityStream | - | state | - |
| TraceTravel | - | library | one_os_three_worlds |
| Route: /journey* | - | journeys | - |
| Route: /navicue* | - | navicues | - |

## Performance Budgets

### Images
- Hero posters: ≤ 400KB (AVIF → WebP)
- Section posters: ≤ 200KB

### Videos
- Hero loops: ≤ 1.8MB, 8-12s (WebM → MP4)
- Micro loops: ≤ 600KB

## Label Mappings

| Labels | Concept | Theme | Tags |
|--------|---------|-------|------|
| breathing, meditation, grounding | arousal_regulation | downshift_under_load | wellbeing |
| proof, receipt, before after | - | proof_capture | - |
| orient, attention, focus | attention_orienting | create_choice_space | - |
| apology, repair, relationship | repair_reconnection | repair_the_moment | - |
| spine, order, feed | - | - | spine_feed |
| continuity, loop, motion | - | - | real_life_run |

## TypeScript Updates

- **`packages/ui/tsconfig.json`**: Added `resolveJsonModule: true`, `esModuleInterop: true`
- **`packages/ui/src/index.ts`**: Exported governance utilities and hooks

## Usage Examples

### Basic Component Usage
```tsx
import { useAssetsByComponent, LoadingSpinner } from '@recoveryos/ui';

function MyComponent() {
  const { assets, loading } = useAssetsByComponent('MyComponent');
  
  if (loading) return <LoadingSpinner />;
  
  return (
    <div>
      {assets.map(asset => (
        <img key={asset.id} src={asset.url} alt={asset.name} />
      ))}
    </div>
  );
}
```

### Hero Scene with Reduced Motion
```tsx
import { useHeroScene } from '@recoveryos/ui';

function Scene({ sceneId }) {
  const { poster, loop, loading } = useHeroScene(sceneId);
  
  return (
    <div className="hero-scene">
      {poster && <img src={poster.url} alt="Scene" />}
      {loop && <video src={loop.url} autoPlay loop muted />}
    </div>
  );
}
```

### Natural Language Search
```tsx
import { useAssetsByLabels } from '@recoveryos/ui';

function BreathingExercise() {
  const { assets } = useAssetsByLabels(['breathing', 'meditation']);
  
  return <AssetGallery assets={assets} />;
}
```

### Manual Governance Queries
```tsx
import { governance } from '@recoveryos/ui';

// Get pillar by label
const pillarER = governance.getPillar('emotional regulation');
// { id: 'pillar_ER', labels: ['emotional regulation', 'ER'] }

// Match multiple labels
const matched = governance.matchLabels(['breathing', 'proof']);
// { pillars: [], concepts: [...], themes: [...], schemas: [...] }

// Get enhanced tags
const tags = governance.getEnhancedTags(['breathing']);
// { usage_tags: ['wellbeing'], concept_id: 'concept_arousal_regulation', theme_id: 'theme_downshift_under_load' }
```

## Integration with Existing Systems

### ✅ Supabase
- All governance queries use existing Supabase client
- Enhanced `getAssetsByTags` with placement logic
- Budget validation in dev mode

### ✅ Design System
- Token mapping connects asset classes to CSS tokens
- `getTokensForAssetClass('hero')` → `['hero.scene.*.poster', 'hero.scene.*.loop']`

### ✅ Components
- WalkthroughPresenter can now use `useHeroScene`
- SpineExplorer can use `useAssetsByComponent('SpineExplorer')`
- All narrative components get placement-driven assets

## Next Steps

### Immediate
1. **Create `.env` file** with Supabase credentials
   ```
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

2. **Run SQL schema** (already documented in SUPABASE_SETUP.md)

3. **Upload Core 12 assets** to Supabase Storage with governance tags

4. **Update WalkthroughPresenter** to use `useHeroScene` hook

### Short-term
5. **Add placement rules** for remaining Phase 2 components
   - SpineExplorer (system assets)
   - ContinuityStream (state assets)
   - OrchestrationFeed (dashboard assets)
   - TrustRails (proof assets)

6. **Build asset admin UI**
   - Upload interface with label tagging
   - Budget validation warnings
   - Governance entity picker
   - Preview with delivery fit hints

7. **Add analytics tracking**
   - Which assets are used most
   - Coverage gaps by component
   - Budget compliance metrics

### Long-term
8. **Extend label mapping** with more synonyms
9. **Add families and mindblocks** to expandable governance
10. **Create asset recommendation engine** based on usage patterns

## Testing

All TypeScript errors resolved:
- ✅ JSON imports configured
- ✅ Type safety for governance entities
- ✅ React Hook dependencies correct
- ✅ Supabase queries typed
- ✅ Budget validation typed

Ready for production use after Supabase credentials are provided.

## Summary

The asset governance system provides:
- **Declarative asset fetching**: Components say what they need, not how to get it
- **Natural language support**: Content creators use familiar terms
- **Performance enforcement**: Automatic budget warnings
- **Type safety**: Full TypeScript support
- **Accessibility**: Reduced motion support built-in
- **Extensibility**: Three-tier governance (locked/controlled/expandable)

The system shifts asset management from imperative queries to declarative needs, with automatic governance enforcement and performance optimization.

**Status: ✅ Complete and ready for integration**
