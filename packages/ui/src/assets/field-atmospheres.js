/**
 * Field Atmospheres: Subtle textures/gradients implying "continuity layer"
 * Non-intrusive backgrounds that create ambient presence
 */
/**
 * Grain Field — subtle texture overlay for depth
 */
export const GRAIN_FIELD = {
    id: 'field-atmosphere-grain',
    slug: 'grain-field',
    title: 'Grain Field',
    narrative: 'Subtle texture that adds organic warmth — like paper grain or film stock',
    family: 'field-atmospheres',
    familyMetadata: {
        family: 'field-atmospheres',
        layerType: 'grain',
        intensity: 'subtle',
        animates: false,
        blendMode: 'multiply',
    },
    format: 'png',
    source: '/assets/atmospheres/grain-field.png',
    alt: 'Subtle grain texture overlay',
    dimensions: { width: 1920, height: 1080 },
    glassEffect: {
        opacity: 0.03,
        blur: 0,
    },
    usedIn: ['companion', 'console', 'command'],
    elevation: 'surface',
};
/**
 * Breath Gradient — slow-shifting color field
 */
export const BREATH_GRADIENT = {
    id: 'field-atmosphere-breath-gradient',
    slug: 'breath-gradient',
    title: 'Breath Gradient',
    narrative: 'Slow-drifting gradient that pulses with recovery rhythm — barely perceptible',
    family: 'field-atmospheres',
    familyMetadata: {
        family: 'field-atmospheres',
        layerType: 'gradient',
        intensity: 'subtle',
        animates: true,
        blendMode: 'overlay',
    },
    format: 'svg',
    source: `<svg viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="breathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:hsla(200, 12%, 8%, 0.6);stop-opacity:1">
          <animate attributeName="stop-opacity" values="0.6;0.8;0.6" dur="8s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" style="stop-color:hsla(160, 70%, 48%, 0.03);stop-opacity:1">
          <animate attributeName="stop-opacity" values="0.03;0.06;0.03" dur="8s" repeatCount="indefinite" />
        </stop>
      </linearGradient>
    </defs>
    <rect width="1920" height="1080" fill="url(#breathGrad)" />
  </svg>`,
    alt: 'Slow-breathing gradient overlay',
    dimensions: { width: 1920, height: 1080 },
    glassEffect: {
        opacity: 0.08,
        blur: 0,
    },
    usedIn: ['companion'],
    elevation: 'surface',
};
/**
 * Noise Shimmer — organic motion texture
 */
export const NOISE_SHIMMER = {
    id: 'field-atmosphere-noise-shimmer',
    slug: 'noise-shimmer',
    title: 'Noise Shimmer',
    narrative: 'Subtle noise pattern that shifts slowly — like water surface or heat haze',
    family: 'field-atmospheres',
    familyMetadata: {
        family: 'field-atmospheres',
        layerType: 'shimmer',
        intensity: 'subtle',
        animates: true,
        blendMode: 'soft-light',
    },
    format: 'json-lottie',
    source: '/assets/atmospheres/noise-shimmer.json',
    alt: 'Subtle animated noise texture',
    dimensions: { width: 1920, height: 1080 },
    glassEffect: {
        opacity: 0.05,
        blur: 2,
    },
    usedIn: ['companion', 'console'],
    elevation: 'surface',
};
/**
 * Continuity Veil — ambient presence layer
 */
export const CONTINUITY_VEIL = {
    id: 'field-atmosphere-continuity-veil',
    slug: 'continuity-veil',
    title: 'Continuity Veil',
    narrative: 'Barely-there presence that suggests ongoing system support — never intrusive',
    family: 'field-atmospheres',
    familyMetadata: {
        family: 'field-atmospheres',
        layerType: 'gradient',
        intensity: 'subtle',
        animates: true,
        blendMode: 'overlay',
    },
    format: 'svg',
    source: `<svg viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="continuityGlow">
        <stop offset="0%" style="stop-color:hsla(160, 70%, 48%, 0.02);stop-opacity:1">
          <animate attributeName="stop-opacity" values="0.02;0.04;0.02" dur="12s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" style="stop-color:hsla(160, 70%, 48%, 0);stop-opacity:0" />
      </radialGradient>
    </defs>
    <rect width="1920" height="1080" fill="url(#continuityGlow)" />
  </svg>`,
    alt: 'Subtle ambient glow suggesting system presence',
    dimensions: { width: 1920, height: 1080 },
    glassEffect: {
        opacity: 0.06,
        blur: 64,
    },
    usedIn: ['companion', 'console', 'command'],
    elevation: 'surface',
};
/**
 * Heat Haze — intensifies in heat mode
 */
export const HEAT_HAZE = {
    id: 'field-atmosphere-heat-haze',
    slug: 'heat-haze',
    title: 'Heat Haze',
    narrative: 'Subtle distortion that increases in heat mode — signals elevated state without alarm',
    family: 'field-atmospheres',
    familyMetadata: {
        family: 'field-atmospheres',
        layerType: 'shimmer',
        intensity: 'medium',
        animates: true,
        blendMode: 'overlay',
    },
    format: 'json-lottie',
    source: '/assets/atmospheres/heat-haze.json',
    alt: 'Subtle heat distortion effect',
    dimensions: { width: 1920, height: 1080 },
    glassEffect: {
        opacity: 0.12,
        blur: 8,
    },
    usedIn: ['companion', 'console'],
    elevation: 'surface',
};
/**
 * Export all field atmosphere assets
 */
export const FIELD_ATMOSPHERE_ASSETS = [
    GRAIN_FIELD,
    BREATH_GRADIENT,
    NOISE_SHIMMER,
    CONTINUITY_VEIL,
    HEAT_HAZE,
];
