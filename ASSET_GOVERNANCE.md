# Asset Governance (RecoveryOS)

Assets are governed to ensure they serve the four realities: Sense → Route → Deliver → Seal.

## Core Principles

### 1) Natural Language Labels → Governance Entities
Assets are tagged with human-readable labels that map to governance entities:

```typescript
// Example asset with governance labels
{
  id: "asset_hero_welcome",
  labels: ["emotional regulation", "attention orienting", "create choice space"],
  schema: "schema_one_os_three_worlds",
  placement: "hero"
}
```

### 2) Component Placement Rules
Assets are matched to components through placement rules:

```typescript
interface PlacementRule {
  match: {
    route_contains?: string;
    component_matches?: string;
  };
  usage_tags_add?: string[];
  asset_class?: AssetClass;
  schema_id?: string;
}
```

### 3) Budgets + Reduced Motion Behavior
Assets respect performance budgets and accessibility:

```typescript
interface AssetBudget {
  posterKb?: number;    // Poster frame size limit
  loopKb?: number;      // Animated loop size limit
  reducedMotion?: boolean; // Respects prefers-reduced-motion
}
```

## Asset Classes

- **Atmosphere**: Background environmental assets
- **Hero**: Primary focal assets (welcome, celebration)
- **System**: UI feedback and status assets
- **Icon**: Interface symbols and indicators
- **Proof**: Receipt and evidence assets

## Rooms (Asset Contexts)

- **Journeys**: Path-based navigation assets
- **NaviCues**: Guidance and direction assets
- **Toolkit**: Tool and feature assets
- **Wellbeing**: Health and balance assets
- **State**: Status and condition assets
- **Library**: Archive and reference assets
- **Dashboard**: Overview and control assets

## Proof Fit Categories

- **receipt_ready**: Can be used as proof of completion
- **pre/post**: Before/after transformation assets
- **micro_win**: Small achievement celebrations
- **checklist**: Progress tracking assets
- **before_after**: Transformation visualization

## Delivery Fit Matrix

Assets are evaluated for fit within the Sense→Route→Deliver→Seal loop:

```typescript
interface DeliveryFit {
  sense: boolean;      // Works for initial engagement
  route: boolean;      // Supports navigation decisions
  deliver: boolean;    // Enables action completion
  seal: boolean;       // Confirms successful closure
  heat_band: HeatBand; // amber/green/purple energy level
  dose: Dose;         // glance/seed/focus attention level
}
```

## Governance Implementation

### Component Integration
Components declare their asset needs through placement contracts:

```typescript
// Component declares asset requirements
const heroPlacement: ComponentPlacementRule = {
  component: "HeroMedia",
  placement: "hero",
  labels: ["emotional regulation", "attention orienting"],
  schema: "schema_one_os_three_worlds",
  budgets: { posterKb: 500, loopKb: 2000 }
};
```

### Runtime Resolution
Assets are resolved at runtime based on component context:

```typescript
// Asset resolver matches component to available assets
const resolver = new AssetResolver();
const asset = resolver.resolveForComponent("HeroMedia", currentRoute);
```

### Performance Enforcement
Budgets are enforced through build-time validation:

```typescript
// Build-time asset validation
if (asset.size > placement.budgets.posterKb) {
  throw new Error(`Asset exceeds budget: ${asset.id}`);
}
```

## Quality Gates

### Automated Checks
- Asset size validation against budgets
- Label governance compliance
- Schema adherence verification
- Accessibility metadata validation

### Manual Review
- Emotional resonance assessment
- Cultural sensitivity review
- Performance impact evaluation
- A/B testing for engagement metrics

## Migration Strategy

### Phase 1: Governance Foundation
- Implement label taxonomy
- Create placement rules
- Establish budget enforcement

### Phase 2: Component Integration
- Update components to declare asset needs
- Implement runtime resolution
- Add performance monitoring

### Phase 3: Quality Assurance
- Automated testing for asset fit
- User experience validation
- Performance optimization

## Success Metrics

- **Performance**: Assets load within budget limits
- **Engagement**: Assets contribute to user flow completion
- **Accessibility**: Assets respect user preferences
- **Maintainability**: Assets are discoverable and replaceable

This governance ensures assets serve the RecoveryOS mission: creating safe spaces for cognitive change through carefully orchestrated visual and auditory experiences.