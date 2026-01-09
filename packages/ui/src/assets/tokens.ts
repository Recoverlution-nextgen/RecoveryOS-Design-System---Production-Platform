// Asset Tokens - Registry for all website assets
// This is the single source of truth for asset paths and configurations

export type PillarId = 'ER' | 'SR' | 'SC' | 'CR' | 'II' | 'DM';
export type Lens = 'individual' | 'professional' | 'organisation';
export type SceneId = 'scene-01' | 'scene-02' | 'scene-03' | 'scene-04';

// Atmosphere: Background fields and gradients
export const ATMOSPHERE_TOKENS = {
  noise: '/assets/atmosphere/noise.png',
  
  fields: {
    calm: {
      gradients: ['var(--return-glow)', 'var(--thread-pulse)', 'var(--drift-stable)'],
      positions: ['20% 20%', '80% 30%', '60% 80%'],
      sizes: ['600px 420px', '520px 380px', '520px 380px'],
    },
    heat: {
      gradients: ['var(--handrail-escalate)', 'var(--drift-active)', 'var(--return-glow)'],
      positions: ['30% 25%', '75% 35%', '50% 75%'],
      sizes: ['600px 420px', '520px 380px', '520px 380px'],
    },
    return: {
      gradients: ['var(--return-glow)', 'var(--return-press)'],
      positions: ['50% 40%', '20% 70%'],
      sizes: ['700px 500px', '600px 400px'],
    },
    thread: {
      gradients: ['var(--thread-pulse)', 'var(--thread-depth-fg)'],
      positions: ['50% 40%', '70% 60%'],
      sizes: ['700px 500px', '600px 400px'],
    },
    trace: {
      gradients: ['var(--trace-seal)', 'var(--trace-stamp)'],
      positions: ['50% 40%', '30% 70%'],
      sizes: ['700px 500px', '600px 400px'],
    },
    handrail: {
      gradients: ['var(--handrail-callout)', 'var(--handrail-escalate)'],
      positions: ['50% 40%', '60% 70%'],
      sizes: ['700px 500px', '600px 400px'],
    },
    pillars: {
      ER: { primary: 'var(--return-glow)', secondary: 'var(--return-press)' },
      SR: { primary: 'var(--drift-stable)', secondary: 'var(--return-glow)' },
      SC: { primary: 'var(--thread-pulse)', secondary: 'var(--thread-depth-fg)' },
      CR: { primary: 'var(--lens-professional)', secondary: 'var(--thread-pulse)' },
      II: { primary: 'var(--lens-organisation)', secondary: 'var(--trace-seal)' },
      DM: { primary: 'var(--drift-noticing)', secondary: 'var(--lens-individual)' },
    },
  },
} as const;

// Heroes: Keynote scene assets
export const HERO_TOKENS = {
  'scene-01': {
    title: 'Your moments. Your proof.',
    subtitle: 'RecoveryOS turns what happened into what you can show.',
    cta: 'See how it works',
    poster: {
      avif: '/assets/heroes/scene-01/poster.avif',
      webp: '/assets/heroes/scene-01/poster.webp',
    },
    loop: {
      webm: '/assets/heroes/scene-01/loop.webm',
      mp4: '/assets/heroes/scene-01/loop.mp4',
    },
  },
  'scene-02': {
    title: 'Routed through care',
    subtitle: 'See how moments flow from need to delivered support.',
    cta: 'Explore the spine',
    poster: {
      avif: '/assets/heroes/scene-02/poster.avif',
      webp: '/assets/heroes/scene-02/poster.webp',
    },
    loop: {
      webm: '/assets/heroes/scene-02/loop.webm',
      mp4: '/assets/heroes/scene-02/loop.mp4',
    },
  },
  'scene-03': {
    title: 'Built on trust',
    subtitle: 'Every trace is sealed. Every route is governed.',
    cta: 'Trust by design',
    poster: {
      avif: '/assets/heroes/scene-03/poster.avif',
      webp: '/assets/heroes/scene-03/poster.webp',
    },
    loop: {
      webm: '/assets/heroes/scene-03/loop.webm',
      mp4: '/assets/heroes/scene-03/loop.mp4',
    },
  },
  'scene-04': {
    title: 'Three worlds. One spine.',
    subtitle: 'Individual. Professional. Organisation. All connected.',
    cta: 'See the three worlds',
    poster: {
      avif: '/assets/heroes/scene-04/poster.avif',
      webp: '/assets/heroes/scene-04/poster.webp',
    },
    loop: {
      webm: '/assets/heroes/scene-04/loop.webm',
      mp4: '/assets/heroes/scene-04/loop.mp4',
    },
  },
} as const;

// System: Framework visualization assets
export const SYSTEM_TOKENS = {
  threadLine: '/assets/system/thread-line.svg',
  pillarHalos: {
    ER: '/assets/system/pillar-halos/er.svg',
    SR: '/assets/system/pillar-halos/sr.svg',
    SC: '/assets/system/pillar-halos/sc.svg',
    CR: '/assets/system/pillar-halos/cr.svg',
    II: '/assets/system/pillar-halos/ii.svg',
    DM: '/assets/system/pillar-halos/dm.svg',
  },
  nodeCapsule: '/assets/system/node-capsule.svg',
  sealPulse: '/assets/system/seal-pulse.svg',
  altitudeRefraction: '/assets/system/altitude-refraction.svg',
} as const;

// Icons: UI iconography
export const ICON_TOKENS = {
  lensToggle: '/assets/icons/lens-toggle.svg',
  depthDial: '/assets/icons/depth-dial.svg',
  play: '/assets/icons/play.svg',
  run: '/assets/icons/run.svg',
  install: '/assets/icons/install.svg',
  seal: '/assets/icons/seal.svg',
  receipt: '/assets/icons/receipt.svg',
  spine: '/assets/icons/spine.svg',
  node: '/assets/icons/node.svg',
  consent: '/assets/icons/consent.svg',
  quietHours: '/assets/icons/quiet-hours.svg',
  escalation: '/assets/icons/escalation.svg',
  integrations: '/assets/icons/integrations.svg',
  search: '/assets/icons/search.svg',
  chevron: '/assets/icons/chevron.svg',
  close: '/assets/icons/close.svg',
} as const;

// Proof: Receipt and vault assets
export const PROOF_TOKENS = {
  receiptTexture: '/assets/proof/receipt-texture.svg',
  sealMark: '/assets/proof/seal-mark.svg',
  vaultTexture: '/assets/proof/vault-texture.svg',
} as const;

// Helper: Get field config by variant
export function getFieldConfig(variant: keyof typeof ATMOSPHERE_TOKENS.fields) {
  return ATMOSPHERE_TOKENS.fields[variant];
}

// Helper: Get pillar colors
export function getPillarColors(pillar: PillarId) {
  return ATMOSPHERE_TOKENS.fields.pillars[pillar];
}

// Helper: Get hero scene
export function getHeroScene(scene: SceneId) {
  return HERO_TOKENS[scene];
}
