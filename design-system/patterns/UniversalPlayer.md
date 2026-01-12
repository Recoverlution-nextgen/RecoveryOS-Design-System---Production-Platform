# Universal Player

**Status**: Active | **Last Updated**: Jan 2026

## Overview
The Universal Player is RecoveryOS's primary interface for delivering therapeutic content. It runs both Journeys (multi-step experiences) and NaviCues (single interventions) with a consistent, adaptable interface.

## Purpose
- **Single Interface**: One player for all therapeutic content
- **Adaptive Experience**: Adjusts based on content type and user state
- **Proof Capture**: Seamlessly captures evidence of engagement
- **Safety First**: Includes escalation paths and consent checks

## Content Types

### Journeys
- **Multi-step experiences**: 3-7 connected interventions
- **Progressive disclosure**: Content revealed based on user responses
- **Branching logic**: Adaptive paths based on state/context
- **Completion tracking**: Full journey progress with partial saves

### NaviCues
- **Single interventions**: Focused 1-5 minute experiences
- **Modular design**: Can be combined or delivered independently
- **Contextual triggers**: Delivered based on detected needs
- **Quick completion**: Designed for immediate engagement

## Interface Structure

### Header Section
```
┌─────────────────────────────────────┐
│ [Content Title]              [X]    │
│ [Progress Indicator]               │
│ [Current Step: 2 of 5]             │
└─────────────────────────────────────┘
```

### Content Area
```
┌─────────────────────────────────────┐
│                                     │
│        [Media/Content Display]      │
│                                     │
│        [Interactive Elements]       │
│                                     │
└─────────────────────────────────────┘
```

### Control Bar
```
┌─────────────────────────────────────┐
│ [Prev] [Play/Pause] [Next] [Menu]   │
│ [Progress Bar]                     │
│ [Time Remaining]                   │
└─────────────────────────────────────┘
```

## Key Features

### Contract Display
**Shows before starting:**
- Target outcome (what this achieves)
- Mechanism (how it works)
- Duration estimate
- Proof requirements
- Consent scope

### Adaptive Controls
**Based on content type:**
- **Audio**: Play/pause, speed control, transcript toggle
- **Video**: Standard video controls + interactive overlays
- **Interactive**: Custom controls based on exercise type
- **Text**: Reading progress, bookmarking

### Proof Capture
**Automatic evidence collection:**
- Completion timestamps
- Interaction data
- Self-report responses
- Physiological signals (if consented)

### Safety Features
- **Pause/Exit**: Always available, no judgment
- **Escalation**: One-tap access to human support
- **Content Warnings**: Pre-display of sensitive topics
- **Progress Saving**: Resume from any point

## State Management

### Player States
- **Loading**: Content preparation
- **Ready**: Contract display, waiting for start
- **Playing**: Active content delivery
- **Paused**: User-initiated pause
- **Completed**: Finished with proof capture
- **Error**: Technical issues with recovery options

### Content States
- **Not Started**: Available but not begun
- **In Progress**: Partially completed
- **Completed**: Fully finished with proof
- **Expired**: Time-sensitive content no longer available
- **Locked**: Prerequisites not met

## Responsive Behavior

### Mobile (320px+)
- Full-screen overlay
- Bottom control bar
- Swipe gestures for navigation
- Large touch targets

### Tablet (768px+)
- Modal overlay (80% screen)
- Side content panels
- Keyboard shortcuts
- Multi-touch support

### Desktop (1024px+)
- Centered modal (600px max width)
- Keyboard navigation
- Multiple window support
- Accessibility shortcuts

## Accessibility Features

### Screen Reader Support
- **Semantic Structure**: Proper headings and landmarks
- **Progress Announcements**: "Step 2 of 5 completed"
- **Content Descriptions**: Alt text for all media
- **Control Labels**: Clear button purposes

### Keyboard Navigation
- **Tab Order**: Logical progression through controls
- **Shortcuts**:
  - Space: Play/Pause
  - Arrow Keys: Seek/Navigation
  - Escape: Exit player
  - M: Toggle menu

### Motion & Animation
- **Reduced Motion**: Respects user preferences
- **Progress Indicators**: Non-animated alternatives available
- **Transitions**: Smooth but not disorienting

## Implementation

### Component API
```typescript
interface UniversalPlayerProps {
  contentId: string;
  contentType: 'journey' | 'navicue';
  onComplete: (proof: ProofData) => void;
  onExit: (progress: ProgressData) => void;
  initialProgress?: ProgressData;
  accessibilityMode?: boolean;
}
```

### Usage Examples
```tsx
// Basic usage
<UniversalPlayer
  contentId="journey-anxiety-basics"
  contentType="journey"
  onComplete={(proof) => saveProof(proof)}
  onExit={(progress) => saveProgress(progress)}
/>

// With accessibility
<UniversalPlayer
  contentId="navicue-quick-grounding"
  contentType="navicue"
  accessibilityMode={true}
  onComplete={handleCompletion}
/>
```

## Related Patterns
- **Content Library**: Entry point for player
- **Progress Dashboard**: Shows completion status
- **Proof Gallery**: Displays captured evidence
- **Settings Panel**: Player preferences and accessibility

## Quality Assurance

### Performance Metrics
- **Load Time**: < 2 seconds for content start
- **Smooth Playback**: 60fps animation
- **Memory Usage**: < 50MB for typical content
- **Offline Support**: Core functionality without network

### User Experience Metrics
- **Completion Rate**: > 80% for intended content
- **Error Rate**: < 2% technical failures
- **Accessibility Score**: 100% WCAG AA compliance
- **User Satisfaction**: > 4.5/5 in testing

## Version History
- **v2.0**: Multi-content-type support, enhanced accessibility
- **v1.5**: Proof capture integration, safety features
- **v1.0**: Initial journey support, basic controls</content>
<parameter name="filePath">/Users/danielfincham/recoverlution-platform/design-system/patterns/UniversalPlayer.md