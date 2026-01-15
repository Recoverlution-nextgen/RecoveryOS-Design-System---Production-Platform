# Asset System

**Cross-reference**: Extends [Asset Governance Constitution](ASSET_GOVERNANCE.md)

## RecoveryOS Asset System Overview

Assets in RecoveryOS are governed therapeutic visual experiences that serve the four realities: Sense → Route → Deliver → Seal. This system extends the core governance with implementation details and operational procedures.

## Core Principles (Constitution Compliance)

### 1) Natural Language Labels → Governance Entities
Assets are tagged with human-readable labels that map to governance entities:

```typescript
// Constitution-compliant asset structure
{
  id: "asset_hero_welcome",
  labels: ["emotional regulation", "attention orienting", "create choice space"],
  schema: "schema_one_os_three_worlds",
  placement: "hero",
  governance: {
    therapeutic: true,
    universal_tags: ["intent.growth", "context.meditation"],
    max_tags: 5
  }
}
```

### 2) Component Placement Rules
Assets are matched to components through placement rules with governance validation:

```typescript
interface PlacementRule {
  match: {
    route_contains?: string;
    component_matches?: string;
  };
  usage_tags_add?: string[];
  asset_class?: AssetClass;
  schema_id?: string;
  governance_check?: boolean; // Constitution compliance
}
```

### 3) Budgets + Reduced Motion Behavior
Assets respect performance budgets and accessibility (constitution requirement):

```typescript
interface AssetBudget {
  posterKb?: number;    // Poster frame size limit
  loopKb?: number;      // Animated loop size limit
  reducedMotion?: boolean; // Respects prefers-reduced-motion (constitution)
  governance?: {
    therapeutic_integrity: boolean;
    universal_accessibility: boolean;
    performance_optimization: boolean;
  }
}
```

## Asset Classes (Constitution Extension)

### Atmosphere Assets
**Purpose**: Background environmental context
**Governance**: Must support all three worlds (companion/console/command centre)
**Performance**: <50KB, subtle animation, reduced motion compliant

### Hero Assets
**Purpose**: Primary focal therapeutic experiences
**Governance**: Must have clear therapeutic intent + universal tags
**Performance**: <100KB, optimized loading, accessibility first

### System Assets
**Purpose**: UI feedback and status indicators
**Governance**: Semantic meaning only, no decorative use
**Performance**: <10KB, instant loading, critical path

## Therapeutic Asset Categories

### Neural Styles (5 Core)
Following the governance framework:

1. **neural_flower** - Growth, reflection, natural beauty
2. **flowstate** - Harmony, balance, fluid motion
3. **evolvingforms** - Transformation, change, evolution
4. **mindblock** - Breakthrough, clarity, mental barriers
5. **neural_flow** - Connection, neural pathways, cognition

### Dimension Scale
- **hero**: 1920x1080 - Primary therapeutic experiences
- **card**: 800x600 - Component-level assets
- **thumb**: 400x300 - Navigation and lists

### Type Classification
- **image**: Static therapeutic visuals (WebP primary, JPEG fallback)
- **video**: Animated therapeutic experiences (H.264, optimized bitrate)
- **interactive**: Dynamic therapeutic interfaces (reduced motion compliant)

## Universal Tag System

### Intent Tags (Required: ≥1)
- `intent.growth` - Personal development, expansion
- `intent.healing` - Restoration, recovery
- `intent.focus` - Concentration, clarity
- `intent.calm` - Peace, tranquility
- `intent.breakthrough` - Overcoming barriers
- `intent.flow` - Harmony, balance

### Context Tags (Max: 1)
- `context.meditation` - Mindfulness practices
- `context.recovery` - Healing journeys
- `context.productivity` - Focus enhancement
- `context.therapy` - Clinical applications
- `context.wellness` - General well-being

### Association Tags
- `association.personal` - Individual experiences
- `association.universal` - Shared human experiences

## Governance Implementation

### Schema Validation
Assets must pass governance schema validation:
- Therapeutic integrity check
- Universal accessibility compliance
- Performance optimization verification
- Tag limit enforcement (max 5 universal tags)

### Content Review Process
1. **Therapeutic Assessment**: Serves clear therapeutic purpose
2. **Accessibility Review**: Universal access across cultures/abilities
3. **Performance Audit**: Meets budget requirements
4. **Governance Approval**: Constitution compliance verified

### Quality Standards
- **Visual Quality**: Professional therapeutic aesthetics
- **Technical Quality**: Optimized for web delivery
- **Ethical Standards**: No triggering or harmful content
- **Cultural Sensitivity**: Inclusive representation

## Operational Procedures

### Asset Submission Workflow
1. Creator submits with metadata + governance tags
2. Automated validation (schema, performance, tags)
3. Content review (therapeutic appropriateness)
4. Technical review (optimization, accessibility)
5. Governance approval (constitution compliance)
6. Catalog integration with CDN optimization

### Maintenance Procedures
- **Version Control**: Assets versioned with therapeutic impact tracking
- **Performance Monitoring**: Loading times, engagement metrics
- **Governance Auditing**: Regular compliance reviews
- **Deprecation Process**: Safe removal with fallback strategies

## Integration Points

### Component Integration
Assets integrate with components through:
- Placement rules (constitution compliant)
- Context mapping (therapeutic appropriateness)
- Performance budgets (optimization requirements)
- Accessibility features (universal access)

### Platform Integration
- **Supabase Storage**: Governed asset catalog
- **CDN Optimization**: Performance-first delivery
- **Cache Strategy**: Version-based invalidation
- **Analytics**: Therapeutic impact measurement

## References

- **[ASSET_GOVERNANCE.md](ASSET_GOVERNANCE.md)** - Core constitution
- **[ASSET_MATRIX.md](docs/ASSET_MATRIX.md)** - Tagging model details
- **[ASSET_PACKLIST.md](docs/ASSET_PACKLIST.md)** - Asset catalog
- **[ASSET_GOVERNANCE_STRUCTURE.md](docs/ASSET_GOVERNANCE_STRUCTURE.md)** - Governance framework