/**
 * Motion sequences: Orchestrated multi-step animations
 */
import { motionConfig } from './config';
/**
 * Proof capture celebration sequence
 * Seal button press → success pulse → receipt cascade
 */
export async function proofCaptureSequence() {
    const timeline = [];
    // Step 1: Seal button compresses (visual feedback)
    timeline.push({
        step: 'seal-press',
        duration: motionConfig.duration.micro,
        delay: 0,
    });
    // Step 2: Success pulse (confirmation)
    timeline.push({
        step: 'success-pulse',
        duration: motionConfig.duration.base,
        delay: motionConfig.duration.micro,
    });
    // Step 3: Receipt cascade (proof stacks in)
    timeline.push({
        step: 'receipt-cascade',
        duration: motionConfig.duration.slow,
        delay: motionConfig.duration.micro + motionConfig.duration.base,
    });
    return timeline;
}
/**
 * View transition sequence
 * Current view fades out (stagger children) → new view fades in (stagger children)
 */
export async function viewTransitionSequence(fromView, toView) {
    const timeline = [];
    // Step 1: Fade current view + stagger exit
    timeline.push({
        step: `exit-${fromView}`,
        duration: motionConfig.duration.fast,
        delay: 0,
    });
    // Step 2: Fade new view + stagger enter
    timeline.push({
        step: `enter-${toView}`,
        duration: motionConfig.duration.base,
        delay: motionConfig.duration.fast,
    });
    return timeline;
}
/**
 * Heat mode transition sequence
 * Animated color/contrast shift across all elements
 */
export async function heatShiftSequence(fromMode, toMode) {
    const timeline = [];
    // Single orchestrated shift: colors, contrast, accent intensity
    timeline.push({
        step: `shift-${fromMode}-to-${toMode}`,
        duration: motionConfig.duration.slow,
        delay: 0,
    });
    return timeline;
}
/**
 * Escalation alert sequence
 * Shake + glow pulse (urgent, attention-grabbing)
 */
export async function escalationAlertSequence(severity) {
    const timeline = [];
    // Step 1: Alert shake (3x for emphasis)
    timeline.push({
        step: 'shake',
        duration: motionConfig.duration.micro,
        delay: 0,
        repeats: severity === 'alert' ? 4 : 2,
    });
    // Step 2: Glow pulse (escalation arrival)
    timeline.push({
        step: 'glow-pulse',
        duration: motionConfig.duration.ceremony,
        delay: motionConfig.duration.micro * (severity === 'alert' ? 4 : 2),
    });
    return timeline;
}
/**
 * List cascade sequence
 * Each item enters with spring timing
 */
export function listCascadeSequence(itemCount) {
    const staggerMs = motionConfig.transitions.viewChange.stagger * 1000;
    const timeline = [];
    for (let i = 0; i < itemCount; i++) {
        timeline.push({
            item: i,
            delay: i * staggerMs,
            duration: motionConfig.duration.base,
        });
    }
    return timeline;
}
/**
 * Consent toggle sequence
 * Switch animates, label fades/slides
 */
export async function consentToggleSequence() {
    const timeline = [];
    // Step 1: Toggle thumb slides
    timeline.push({
        step: 'toggle-slide',
        duration: motionConfig.duration.fast,
        delay: 0,
    });
    // Step 2: Label updates (fade in new text)
    timeline.push({
        step: 'label-update',
        duration: motionConfig.duration.micro,
        delay: motionConfig.duration.fast,
    });
    return timeline;
}
