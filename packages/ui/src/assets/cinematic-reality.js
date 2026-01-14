/**
 * Cinematic Reality Assets
 * "Becoming in motion" — quiet moments, not crisis
 */
/**
 * Breath Settling — person finding ground after arousal spike
 */
export const BREATH_SETTLING = {
    id: 'cinematic-breath-settling',
    slug: 'breath-settling',
    title: 'Breath Settling',
    narrative: 'The quiet moment after arousal peaks — breath finds its rhythm, body drops anchor',
    family: 'cinematic-reality',
    familyMetadata: {
        family: 'cinematic-reality',
        mood: 'settling',
        moment: 'Breath finding rhythm',
        duration: 6,
    },
    format: 'json-lottie',
    source: '/assets/cinematic/breath-settling.json',
    alt: 'Gentle breathing animation with soft light pulsing',
    dimensions: { width: 800, height: 600 },
    etchedCopy: {
        text: 'Let it settle',
        position: 'bottom',
        style: 'transparent',
        typography: {
            family: 'SF Pro Display',
            size: 32,
            weight: 300,
            letterSpacing: 0.03,
            lineHeight: 1.2,
        },
        color: 'hsla(0, 0%, 100%, 0.2)',
        blend: 'overlay',
    },
    glassEffect: {
        opacity: 0.08,
        blur: 40,
        gradient: {
            from: 'hsla(200, 12%, 8%, 0.9)',
            to: 'hsla(200, 12%, 10%, 0.7)',
            angle: 180,
        },
    },
    usedIn: ['companion'],
    elevation: 'surface',
};
/**
 * Recognition Dawning — person sees the pattern in real-time
 */
export const RECOGNITION_DAWNING = {
    id: 'cinematic-recognition-dawning',
    slug: 'recognition-dawning',
    title: 'Recognition Dawning',
    narrative: 'The moment clarity arrives — pattern becomes visible, choice space opens',
    family: 'cinematic-reality',
    familyMetadata: {
        family: 'cinematic-reality',
        mood: 'becoming',
        moment: 'Pattern recognition emerging',
        duration: 8,
    },
    format: 'json-lottie',
    source: '/assets/cinematic/recognition-dawning.json',
    alt: 'Soft light revealing structure beneath surface',
    dimensions: { width: 800, height: 600 },
    etchedCopy: {
        text: 'Oh. I see it now.',
        position: 'center',
        style: 'illuminated',
        typography: {
            family: 'SF Pro Display',
            size: 36,
            weight: 400,
            letterSpacing: 0.02,
            lineHeight: 1.3,
        },
        color: 'hsla(160, 70%, 48%, 0.3)',
        blend: 'screen',
    },
    glassEffect: {
        opacity: 0.12,
        blur: 32,
        gradient: {
            from: 'hsla(200, 12%, 8%, 0.8)',
            to: 'hsla(160, 70%, 48%, 0.1)',
            angle: 135,
        },
    },
    usedIn: ['companion', 'console'],
    elevation: 'raised',
};
/**
 * Held Under Load — person experiencing being supported while activated
 */
export const HELD_UNDER_LOAD = {
    id: 'cinematic-held-under-load',
    slug: 'held-under-load',
    title: 'Held Under Load',
    narrative: 'The experience of being held — not fixed, not rescued, just accompanied through intensity',
    family: 'cinematic-reality',
    familyMetadata: {
        family: 'cinematic-reality',
        mood: 'held',
        moment: 'Supported presence during activation',
        duration: 10,
    },
    format: 'json-lottie',
    source: '/assets/cinematic/held-under-load.json',
    alt: 'Gentle containment with breathing room',
    dimensions: { width: 800, height: 600 },
    etchedCopy: {
        text: "I don't have to do this alone",
        position: 'center',
        style: 'transparent',
        typography: {
            family: 'SF Pro Display',
            size: 28,
            weight: 400,
            letterSpacing: 0.01,
            lineHeight: 1.4,
        },
        color: 'hsla(0, 0%, 100%, 0.25)',
        blend: 'overlay',
    },
    glassEffect: {
        opacity: 0.14,
        blur: 36,
        gradient: {
            from: 'hsla(200, 12%, 10%, 0.85)',
            to: 'hsla(200, 12%, 8%, 0.75)',
            angle: 90,
        },
        border: {
            width: 1,
            color: 'hsla(0, 0%, 100%, 0.08)',
            opacity: 0.6,
        },
    },
    usedIn: ['companion'],
    elevation: 'raised',
};
/**
 * Export all cinematic reality assets
 */
export const CINEMATIC_REALITY_ASSETS = [
    BREATH_SETTLING,
    RECOGNITION_DAWNING,
    HELD_UNDER_LOAD,
];
