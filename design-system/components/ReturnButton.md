# ReturnButton

**Status**: Active | **Last Updated**: Jan 2026

## Overview
The ReturnButton is the universal action surface - the primary entry point to RecoveryOS. It represents the fundamental action of "returning" and provides access to micro-experiences (Grips).

## Purpose
- **Universal Action**: The one button that starts any RecoveryOS interaction
- **Context Aware**: Adapts based on user state and lens
- **Always Available**: Present on every screen where appropriate

## Interaction Model

### Primary Action (Tap)
- **Default**: Triggers Anchor Grip (10 seconds)
- **Context**: Adapts based on current state/heat level
- **Feedback**: Immediate visual confirmation + haptic

### Secondary Action (Long Press)
- **Opens**: GripGenerator for custom direction/duration
- **States**: Direction (Anchor/Compass/Handrail) + Duration (10s/30s/2m)

## Visual Design

### States
- **Idle**: Subtle presence, inviting but not demanding
- **Hover**: Gentle glow, increased accessibility
- **Press**: Active state with clear feedback
- **Active**: During Grip execution
- **Confirm**: Post-action success state
- **Hold**: Long press indication

### Styling
```css
.return-button {
  background: var(--return-surface);
  border-radius: var(--r-xl);
  padding: var(--s-4) var(--s-5);
  color: var(--return-ink);
  font-family: var(--font-heading);
  font-weight: 600;
  transition: all var(--dur-confirm) var(--ease-regulate);
}

.return-button:hover {
  background: var(--return-surface-hover);
  box-shadow: var(--return-glow);
}

.return-button:active {
  transform: scale(0.98);
}
```

## Variants

### Size Variants
- **Default**: Standard button size
- **Compact**: Smaller for constrained spaces
- **Prominent**: Larger for hero sections

### Lens Variants
- **Individual**: "Return" - personal, intimate
- **Professional**: "Guide" - clinical, supportive
- **Organisation**: "Stabilize" - infrastructural, reliable

## Accessibility
- **Touch Target**: Minimum 48px
- **Focus Ring**: High contrast focus indicator
- **Screen Reader**: "Return to yourself" or lens-appropriate label
- **Motion**: Respects reduced motion preferences

## Implementation

### Props API
```typescript
interface ReturnButtonProps {
  variant?: 'default' | 'compact' | 'prominent';
  lens?: 'individual' | 'professional' | 'organisation';
  onReturn?: (grip: GripConfig) => void;
  disabled?: boolean;
  loading?: boolean;
}
```

### Usage Examples
```tsx
// Basic usage
<ReturnButton />

// Professional lens
<ReturnButton lens="professional" />

// Custom handler
<ReturnButton onReturn={(grip) => console.log('Grip executed:', grip)} />
```

## Related Components
- **GripGenerator**: For custom grip selection
- **TraceTile**: Displays resulting proof
- **ThreadView**: Shows continuity context

## Version History
- **v1.0**: Initial implementation with core interactions
- **v0.8**: Lens variants added
- **v0.5**: Basic tap functionality</content>
<parameter name="filePath">/Users/danielfincham/recoverlution-platform/design-system/components/ReturnButton.md