/**
 * Motion Config: Physics-based choreography
 * Spring timings tuned for RecoveryOS feel
 */
export const motionConfig = {
    // Spring presets (Framer Motion)
    spring: {
        // Gentle, natural: quick recognition, low overshoot
        gentle: { type: 'spring', damping: 20, stiffness: 150, mass: 1 },
        // Snappy: responsive feedback, subtle bounce
        snappy: { type: 'spring', damping: 15, stiffness: 200, mass: 0.8 },
        // Bouncy: celebratory, proof capture moment
        bouncy: { type: 'spring', damping: 10, stiffness: 200, mass: 0.6 },
        // Slow settle: calm transitions, meditation-like
        settle: { type: 'spring', damping: 25, stiffness: 100, mass: 1.2 },
    },
    // Durations (ms)
    duration: {
        micro: 120,
        fast: 180,
        base: 240,
        slow: 360,
        ceremony: 600,
    },
    // Easing curves
    easing: 'cubic-bezier(0.19, 0.8, 0.2, 1)',
    // Transitions
    transitions: {
        // Proof capture: seal button → success
        proofCapture: {
            seal: { duration: 120, ease: 'easeOut' },
            success: { duration: 240, ease: 'easeInOut' },
            receipt: { duration: 360, ease: 'easeOut' },
        },
        // View switch: fade + stagger children
        viewChange: {
            fade: { duration: 200 },
            stagger: 0.04,
        },
        // Heat mode shift: animated color/contrast
        heatShift: { duration: 400, ease: 'easeInOut' },
        // Escalation: alert pulse + shake
        escalation: {
            alert: { duration: 300 },
            shake: { duration: 100, repeats: 3 },
        },
    },
    // Variants for common motions
    variants: {
        // Fade in/out
        fade: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
            exit: { opacity: 0 },
        },
        // Slide up from bottom
        slideUp: {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 20 },
        },
        // Slide down from top
        slideDown: {
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
        },
        // Scale up + fade
        scaleIn: {
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.95 },
        },
        // Proof receipt celebration
        receiptBounce: {
            hidden: { opacity: 0, scale: 0.8, y: 20 },
            visible: { opacity: 1, scale: 1, y: 0 },
        },
    },
};
