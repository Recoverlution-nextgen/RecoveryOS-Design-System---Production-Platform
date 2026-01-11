# RecoveryOS Motion Architecture

## Overview

We've built a **next-generation motion choreography system** for RecoveryOS that orchestrates animations across three user altitudes (Companion/Console/Command) while respecting accessibility preferences and spring physics for natural, intuitive interactions.

## Architecture Layers

### 1. Motion Config (`packages/ui/src/motion/config.ts`)
Centralized motion design tokens matching RecoveryOS visual language:

- **Spring presets**: Gentle (20,150), Snappy (15,200), Bouncy (10,200), Settle (25,140)
- **Durations**: Micro (120ms) → Ceremony (600ms) with Fast/Base/Slow intermediate
- **Easing**: ease-in-out transitions for smooth, natural motion
- **Variants**: Fade, SlideUp/Down, ScaleIn, ReceiptBounce, Shake, Pulse, Glow

### 2. Motion Hooks (`packages/ui/src/motion/hooks.ts`)
Orchestration hooks managing state and timing:

- `useProofCapture()` - Seal → Success → Receipt cascade
- `useViewTransition(view)` - Fade on Companion/Console/Command switch
- `useHeatShift(mode)` - Color/contrast transition on Calm↔Heat toggle
- `useEscalationAlert()` - Shake + Pulse for urgent signals
- `useStagger(index, total)` - List cascade timing
- `useReducedMotion()` - Respects `prefers-reduced-motion: reduce` system setting

### 3. Motion Components (`packages/ui/src/motion/components.tsx`)
Drop-in animated primitives using Framer Motion:

- **MotionCard** - Fade + ScaleIn entrance animation
- **MotionButton** - Spring bounce on tap, respects disabled state
- **MotionProofPill** - Celebrate bounce with color shift (capturing state)
- **MotionView** - Cross-fade + stagger children on mount/exit
- **MotionList** - Stagger cascade items with spring entrance
- **MotionToggle** - Animated thumb slide + label update
- **MotionAlert** - Shake + pulse + glow for escalation/caution signals

### 4. Orchestrated Sequences (`packages/ui/src/motion/sequences.ts`)
Multi-step animation choreography:

- `proofCaptureSequence()` - Seal (120ms) → Pulse (300ms) → Cascade (400ms)
- `viewTransitionSequence(from, to)` - Exit stagger → Enter stagger
- `heatShiftSequence(from, to)` - Unified 400ms color transition
- `escalationAlertSequence(severity)` - Severity-based shake repeat + 600ms pulse
- `listCascadeSequence(count)` - Per-item stagger calculated from count
- `consentToggleSequence()` - Toggle slide (200ms) → Label fade (120ms)

## Integration into Web App

### Updated `apps/web/src/App.tsx`
Motion hooks and components wired to user interactions:

```tsx
// Orchestration state
const { capturing, success, trigger: triggerProofCapture } = useProofCapture();
const { isChanging } = useViewTransition(view);
const { shifting } = useHeatShift(theme);
const { alerting } = useEscalationAlert();
const prefersReduced = useReducedMotion();

// MotionView wraps all view content (Companion/Console/Command)
<MotionView isExiting={isChanging} variant="fade">
  {view === 'companion' && (
    // UniversalPlayer seal triggers triggerProofCapture()
    <UniversalPlayer onSeal={() => {
      triggerProofCapture(); // Starts celebration sequence
      addEvent(event, log);
    }} />
  )}
  {view === 'console' && <Console />}
  {view === 'command' && <CommandCenter />}
</MotionView>

// MotionProofPill cascades in with celebrating state
<MotionProofPill celebrating={success} />

// MotionAlert wraps escalation
<MotionAlert active={alerting} severity="caution">
  <EscalationChooser />
</MotionAlert>
```

## Key Sequences

### Proof Capture Celebration
1. **Seal Press** (120ms micro): Button compresses visually
2. **Success Pulse** (300ms base): Green glow, scale 1 → 1.15 → 1
3. **Receipt Cascade** (400ms slow): ProofPill animates in with receipt color

**Total**: ~820ms from seal to settled proof entry

### View Transition (Companion → Console)
1. **Exit** (200ms fast): Current view fades out + children stagger exit
2. **Crossfade** (100ms gap): Brief pause
3. **Enter** (300ms base): New view fades in + children stagger enter

**UX**: Smooth navigation without jarring view swaps

### Heat Mode Shift
1. **Color Variables** animate via CSS `transition: 400ms ease-in-out`
2. **Accent intensity** increases: `--accent-alpha` 0.14 → 0.25
3. **Contrast** increases on text and borders

**Total**: 400ms unified shift across entire view

### Escalation Alert
- **Caution**: Shake 2x (60ms) + 600ms pulse glow
- **Alert**: Shake 4x (60ms) + 600ms pulse glow + optional haptic (native)

**UX**: Urgent, attention-grabbing without disruptive animation

## Accessibility

All motion components include:

1. **useReducedMotion() check** - Disables animations if system preference set
2. **No essential info in motion** - Proof capture succeeds even without animation
3. **Spring physics** - Natural timing feels less jolting than easing curves
4. **ForwardRef support** - Components play nicely with React ref forwarding

Example:
```tsx
const prefersReduced = useReducedMotion();
return (
  <motion.div
    animate={prefersReduced ? {} : { scale: [1, 1.15, 1] }}
    // ...
  />
);
```

## Token Alignment

Motion config constants tie to design token rhythm:
- **Durations** align to 120ms baseline (micro, fast, base, slow, ceremony)
- **Easing** matches calm/heat theme intensity
- **Spring presets** chosen for RecoveryOS feel (supportive, not jarring)

## Performance

- **GPU acceleration** via Framer Motion `will-change` optimization
- **Stagger timing** prevents animation pile-up (calculated per list size)
- **Reduced motion** ensures accessibility + performance on older devices
- **Spring physics** often finishes faster than easing curves with same perceived duration

## Testing Checklist

- [ ] Proof capture celebration plays end-to-end (seal → pulse → cascade)
- [ ] View transitions smooth on Companion → Console → Command
- [ ] Heat mode shift animates color + contrast together
- [ ] Escalation alert shakes then pulses correctly
- [ ] ProofStack cascades items in sequence
- [ ] Consent toggles slide smoothly
- [ ] All animations disable when `prefers-reduced-motion: reduce` is set
- [ ] Storybook stories show motion variants (calm, celebrating, shifting, alerting)
- [ ] No jank during sustained interaction (15+ seal presses)

## Files Changed

### New
- `packages/ui/src/motion/config.ts` - Motion tokens + variants
- `packages/ui/src/motion/hooks.ts` - Orchestration hooks
- `packages/ui/src/motion/components.tsx` - Animated primitives
- `packages/ui/src/motion/sequences.ts` - Multi-step choreography
- `packages/ui/src/motion/index.ts` - Motion exports

### Modified
- `packages/ui/src/index.ts` - Added motion exports
- `packages/ui/package.json` - Added framer-motion, exports config
- `apps/web/src/App.tsx` - Wired motion hooks + components
- `apps/web/src/main.tsx` - Fixed style imports

## Next Steps

1. **Storybook stories for motion components** - Show all variants (calm, celebrating, shifting)
2. **Native integration** - Trigger haptic feedback on escalation via Capacitor
3. **Analytics** - Track which animations users see (for A/B testing motion intensity)
4. **Motion preferences UI** - Let users adjust animation intensity (even within prefers-reduced-motion)
5. **Performance profiling** - Ensure 60fps on iOS/Android devices

---

**Status**: Motion architecture complete and integrated. Web app builds and serves with all animations wired. Ready for testing and refinement.
