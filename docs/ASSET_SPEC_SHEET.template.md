# Asset Specification Sheet

**Asset ID**: `{STYLE}_{DIMENSION}_{NUMBER:03d}`
**Created**: `{YYYY-MM-DD}`
**Version**: `1.0.0`

## Asset Overview

### Visual Description
[Detailed description of the asset's visual elements, colors, composition, and mood]

### Therapeutic Purpose
[Primary therapeutic application and intended psychological effect]

### Style Classification
- **Primary Style**: `{neural_flower|flowstate|evolvingforms|mindblock|neural_flow}`
- **Secondary Styles**: [Any secondary style associations]

## Technical Specifications

### Dimensions & Formats
- **Native Resolution**: `{width}x{height}px`
- **Aspect Ratio**: `{width}:{height}`
- **File Formats**: `webp`, `jpg` (fallback)
- **Color Space**: `sRGB`
- **DPI**: `{300|150|96}`

### Performance Metrics
- **File Size (WebP)**: `{size}KB`
- **File Size (JPEG)**: `{size}KB`
- **Estimated Load Time**: `{time}ms` (on 3G)
- **Compression Ratio**: `{ratio}:1`

## Governance Metadata

### Universal Tags (max 5)
- `intent.{purpose}` - Primary therapeutic intent
- `context.{application}` - Usage context
- `tone.{emotional}` - Emotional tone
- `association.{scope}` - Personal vs universal
- `world.{domain}` - Conceptual world

### Facet Classification
- **Style**: `{style}`
- **Dimension**: `{dimension}`
- **Type**: `{type}`

### Semantic Associations
- **Therapeutic Contexts**: [List of therapeutic applications]
- **User States**: [Target user emotional/mental states]
- **Content Warnings**: [Any potential triggering content]

## Usage Guidelines

### Recommended Contexts
1. **Primary**: [Main therapeutic application]
2. **Secondary**: [Alternative uses]
3. **Contraindications**: [When not to use]

### Technical Integration
- **Lazy Loading**: `{recommended|required|not needed}`
- **Preloading**: `{high|medium|low}` priority
- **Responsive Breakpoints**: `{sizes}`
- **Fallback Strategy**: WebP → JPEG → Placeholder

### Accessibility Considerations
- **Motion Sensitivity**: `{static|subtle|dynamic}` motion level
- **Color Contrast**: `{high|medium|low}` contrast requirements
- **Text Alternatives**: Required alt text patterns
- **Screen Reader**: Additional context needed

## Quality Assurance

### Visual Quality Checklist
- [ ] Composition follows style guidelines
- [ ] Color palette matches brand standards
- [ ] Resolution meets dimension requirements
- [ ] Artifacts-free compression
- [ ] Consistent with style family

### Therapeutic Quality Checklist
- [ ] Serves clear therapeutic purpose
- [ ] Psychologically safe for target users
- [ ] Culturally appropriate and inclusive
- [ ] Evidence-based therapeutic principles
- [ ] No unintended triggering content

### Technical Quality Checklist
- [ ] Optimized file size for web delivery
- [ ] Proper metadata and tagging
- [ ] CDN-compatible format and naming
- [ ] Responsive image support
- [ ] Accessibility features implemented

## Performance Benchmarks

### Loading Performance
- **First Contentful Paint**: < `{time}ms`
- **Largest Contentful Paint**: < `{time}ms`
- **Cumulative Layout Shift**: < `{score}`

### User Experience
- **Perceived Load Time**: `{rating}/5`
- **Therapeutic Impact**: `{rating}/5`
- **User Engagement**: `{metric}`

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | {date} | Initial creation | {author} |

## Approval Status

- **Content Review**: ⏳ Pending / ✅ Approved / ❌ Rejected
- **Technical Review**: ⏳ Pending / ✅ Approved / ❌ Rejected
- **Custodian Approval**: ⏳ Pending / ✅ Approved / ❌ Rejected

## Notes & Comments

[Additional notes, review feedback, or implementation details]

---

**Template Version**: 1.0
**Last Updated**: {date}
**Governed By**: [ASSET_GOVERNANCE_STRUCTURE.md](ASSET_GOVERNANCE_STRUCTURE.md)