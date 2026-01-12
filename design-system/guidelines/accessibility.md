# Accessibility Guidelines

**Status**: Active | **Last Updated**: Jan 2026

## Overview
RecoveryOS serves users in vulnerable states. Accessibility is not a feature - it's a fundamental requirement. All components must meet or exceed WCAG 2.1 AA standards.

## Core Principles

### 1. Dignity First
- Never make users feel "broken" for using accessibility features
- Design for the full range of human capability and circumstance
- Accessibility features should feel like natural parts of the experience

### 2. Progressive Enhancement
- Core functionality works without JavaScript
- Enhanced experience layers on top
- Graceful degradation under poor conditions

### 3. Context Awareness
- Interfaces adapt to user state (heat levels, cognitive load)
- Accessibility preferences persist across sessions
- Features scale based on user needs

## Technical Standards

### Color & Contrast
- **Minimum Contrast**: 4.5:1 for normal text, 3:1 for large text
- **Focus Indicators**: 3:1 contrast against adjacent colors
- **Color Independence**: No information conveyed by color alone

### Typography
- **Minimum Size**: 14px for body text (16px preferred)
- **Line Height**: 1.5 minimum for body text
- **Spacing**: 1.25x line height between paragraphs
- **System Fonts**: Respect user's font preferences

### Touch & Motion
- **Touch Targets**: 48px minimum (44px absolute minimum)
- **Motion**: Respect `prefers-reduced-motion`
- **Haptics**: Meaningful feedback, not just decoration

### Keyboard Navigation
- **Tab Order**: Logical and predictable
- **Focus Management**: Clear focus indicators
- **Keyboard Shortcuts**: Consistent and documented
- **Escape Routes**: Easy exit from any state

## Component Requirements

### Interactive Elements
```css
/* Focus indicators must be visible */
.focus-ring {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .component {
    border: 2px solid currentColor;
  }
}
```

### Form Elements
- **Labels**: Always visible, always associated
- **Errors**: Clear, specific, actionable
- **Help Text**: Available on demand
- **Validation**: Real-time when possible

### Media & Content
- **Alt Text**: Descriptive, contextual
- **Captions**: Always available for audio/video
- **Transcripts**: For audio content
- **Plain Language**: Avoid jargon, explain terms

## Lens-Specific Considerations

### Individual Lens
- **Simplified Language**: Short sentences, familiar words
- **Emotional Safety**: No shaming or demanding tones
- **Progressive Disclosure**: Information revealed gradually

### Professional Lens
- **Clinical Accuracy**: Precise terminology when needed
- **Data Accessibility**: Charts and graphs have text alternatives
- **Workflow Efficiency**: Keyboard shortcuts for power users

### Organisation Lens
- **Audit Trails**: All actions logged and accessible
- **Bulk Operations**: Keyboard and screen reader friendly
- **Reporting**: Data exports in accessible formats

## Testing Requirements

### Automated Testing
- **Color Contrast**: Automated checks in CI/CD
- **Keyboard Navigation**: Selenium-based tests
- **Screen Reader**: Axe-core integration

### Manual Testing
- **Screen Reader Review**: NVDA, JAWS, VoiceOver
- **Keyboard Only**: Full workflow completion
- **High Contrast**: Windows High Contrast mode
- **Zoom**: 200% and 400% magnification

### User Testing
- **Diverse Users**: Different abilities, assistive technologies
- **Real Scenarios**: Testing in actual usage contexts
- **Feedback Integration**: User input drives improvements

## Implementation Checklist

### For Each Component
- [ ] Semantic HTML structure
- [ ] ARIA labels where needed
- [ ] Keyboard navigation support
- [ ] Screen reader compatibility
- [ ] High contrast support
- [ ] Reduced motion support
- [ ] Touch target sizing
- [ ] Color contrast verification

### For Each Feature
- [ ] Accessibility impact assessment
- [ ] Alternative interaction methods
- [ ] Error state accessibility
- [ ] Loading state accessibility
- [ ] Offline functionality

## Tools & Resources

### Development Tools
- **axe-core**: Automated accessibility testing
- **WAVE**: Web accessibility evaluation
- **Lighthouse**: Performance and accessibility audits
- **Color Contrast Analyzer**: Contrast ratio checking

### Design Tools
- **Stark**: Contrast and color blindness simulation
- **A11y Color Palette**: Accessible color palette generation
- **Accessibility Scanner**: iOS/Android testing

### Learning Resources
- **WCAG Guidelines**: Web Content Accessibility Guidelines
- **ARIA Practices**: WAI-ARIA Authoring Practices Guide
- **Inclusive Design Principles**: Microsoft Inclusive Design

## Maintenance
- **Regular Audits**: Quarterly accessibility reviews
- **User Feedback**: Dedicated accessibility feedback channel
- **Standards Updates**: Monitor WCAG and platform guidelines
- **Training**: Ongoing accessibility education for team

## Contact
For accessibility questions or concerns:
- **Design Review**: Accessibility checklist required for all designs
- **Code Review**: Automated and manual accessibility checks
- **User Research**: Regular accessibility user testing sessions</content>
<parameter name="filePath">/Users/danielfincham/recoverlution-platform/design-system/guidelines/accessibility.md