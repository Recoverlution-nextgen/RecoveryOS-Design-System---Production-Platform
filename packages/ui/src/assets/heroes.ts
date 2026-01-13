/**
 * Hero Assets: Large narrative-driven visuals with etched copy
 * These are the storytellers of RecoveryOS
 */

import { createHeroAsset, createAssetWithEtchedCopy } from '../types/assets';
import type { RecoveryOSAsset } from '../types/assets';

/**
 * Sense → Route → Deliver → Seal Loop Hero
 */
export const SENSE_ROUTE_DELIVER_SEAL_HERO: RecoveryOSAsset = createHeroAsset(
  'hero-sense-route-deliver-seal',
  'sense-route-deliver-seal',
  'Sense → Route → Deliver → Seal',
  'The core RecoveryOS loop: Sense state, Route to primitive, Deliver intervention, Seal proof of shift',
  `<svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:hsla(200, 12%, 8%, 0.9);stop-opacity:1" />
        <stop offset="100%" style="stop-color:hsla(200, 12%, 12%, 0.7);stop-opacity:1" />
      </linearGradient>
      <filter id="glassBlur">
        <feGaussianBlur in="SourceGraphic" stdDeviation="32" />
      </filter>
    </defs>
    <rect width="1200" height="600" fill="url(#heroGradient)" />
    
    <!-- Sense circle -->
    <circle cx="250" cy="300" r="80" fill="none" stroke="hsla(160, 70%, 48%, 0.3)" stroke-width="2" opacity="0.6" />
    <text x="250" y="305" text-anchor="middle" font-family="SF Pro Display" font-size="18" font-weight="600" fill="hsla(160, 70%, 48%, 0.8)">SENSE</text>
    
    <!-- Route arrow -->
    <path d="M 330 300 L 450 300" stroke="hsla(160, 70%, 48%, 0.4)" stroke-width="2" stroke-dasharray="4,4" />
    <polygon points="450,300 440,295 440,305" fill="hsla(160, 70%, 48%, 0.4)" />
    
    <!-- Deliver circle -->
    <circle cx="550" cy="300" r="80" fill="none" stroke="hsla(160, 70%, 48%, 0.3)" stroke-width="2" opacity="0.6" />
    <text x="550" y="305" text-anchor="middle" font-family="SF Pro Display" font-size="18" font-weight="600" fill="hsla(160, 70%, 48%, 0.8)">DELIVER</text>
    
    <!-- Seal arrow -->
    <path d="M 630 300 L 750 300" stroke="hsla(160, 70%, 48%, 0.4)" stroke-width="2" stroke-dasharray="4,4" />
    <polygon points="750,300 740,295 740,305" fill="hsla(160, 70%, 48%, 0.4)" />
    
    <!-- Seal circle -->
    <circle cx="850" cy="300" r="80" fill="none" stroke="hsla(160, 70%, 48%, 0.3)" stroke-width="2" opacity="0.6" />
    <text x="850" y="305" text-anchor="middle" font-family="SF Pro Display" font-size="18" font-weight="600" fill="hsla(160, 70%, 48%, 0.8)">SEAL</text>
    
    <!-- Feedback loop back to Sense -->
    <path d="M 850 380 Q 550 450, 250 380" stroke="hsla(160, 70%, 48%, 0.2)" stroke-width="2" stroke-dasharray="4,4" fill="none" />
    <polygon points="250,380 255,370 245,370" fill="hsla(160, 70%, 48%, 0.2)" />
    
    <!-- Glass overlay -->
    <rect width="1200" height="600" fill="hsla(200, 12%, 10%, 0.3)" filter="url(#glassBlur)" />
  </svg>`,
  'Sense → Route → Deliver → Seal',
  ['companion', 'console', 'command']
);

/**
 * ERA Cadence Hero (Experience → Recognise → Align)
 */
export const ERA_CADENCE_HERO: RecoveryOSAsset = createHeroAsset(
  'hero-era-cadence',
  'era-cadence',
  'Experience → Recognise → Align',
  'The weekly recovery cadence: Experience the loop, Recognise patterns, Align to what works',
  `<svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="eraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:hsla(200, 12%, 8%, 0.9);stop-opacity:1" />
        <stop offset="100%" style="stop-color:hsla(200, 12%, 12%, 0.7);stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="1200" height="600" fill="url(#eraGradient)" />
    
    <!-- Experience wave -->
    <path d="M 100 300 Q 300 200, 400 300" stroke="hsla(160, 70%, 48%, 0.4)" stroke-width="3" fill="none" />
    <text x="250" y="250" text-anchor="middle" font-family="SF Pro Display" font-size="20" font-weight="600" fill="hsla(160, 70%, 48%, 0.8)">EXPERIENCE</text>
    
    <!-- Recognise wave -->
    <path d="M 400 300 Q 500 400, 600 300" stroke="hsla(160, 70%, 48%, 0.4)" stroke-width="3" fill="none" />
    <text x="500" y="420" text-anchor="middle" font-family="SF Pro Display" font-size="20" font-weight="600" fill="hsla(160, 70%, 48%, 0.8)">RECOGNISE</text>
    
    <!-- Align wave -->
    <path d="M 600 300 Q 800 200, 1000 300" stroke="hsla(160, 70%, 48%, 0.4)" stroke-width="3" fill="none" />
    <text x="800" y="250" text-anchor="middle" font-family="SF Pro Display" font-size="20" font-weight="600" fill="hsla(160, 70%, 48%, 0.8)">ALIGN</text>
    
    <!-- Weekly timeline -->
    <line x1="100" y1="500" x2="1100" y2="500" stroke="hsla(0, 0%, 100%, 0.1)" stroke-width="1" />
    <text x="100" y="530" font-family="SF Pro Text" font-size="14" fill="hsla(0, 0%, 100%, 0.4)">Day 1</text>
    <text x="1050" y="530" font-family="SF Pro Text" font-size="14" fill="hsla(0, 0%, 100%, 0.4)">Day 7</text>
  </svg>`,
  'Experience → Recognise → Align',
  ['companion', 'console']
);

/**
 * Three Altitudes Hero (Individual/Professional/Organisational)
 */
export const THREE_ALTITUDES_HERO: RecoveryOSAsset = createHeroAsset(
  'hero-three-altitudes',
  'three-altitudes',
  'Three Altitudes',
  'RecoveryOS scales across three perspectives: Individual (Companion), Professional (Console), Organisational (Command)',
  `<svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="altitudesGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:hsla(200, 12%, 8%, 0.9);stop-opacity:1" />
        <stop offset="100%" style="stop-color:hsla(200, 12%, 14%, 0.7);stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="1200" height="600" fill="url(#altitudesGradient)" />
    
    <!-- Individual layer (bottom) -->
    <rect x="200" y="400" width="800" height="120" rx="8" fill="hsla(160, 70%, 48%, 0.1)" stroke="hsla(160, 70%, 48%, 0.3)" stroke-width="1" />
    <text x="600" y="465" text-anchor="middle" font-family="SF Pro Display" font-size="22" font-weight="600" fill="hsla(160, 70%, 48%, 0.8)">INDIVIDUAL · COMPANION</text>
    
    <!-- Professional layer (middle) -->
    <rect x="250" y="250" width="700" height="120" rx="8" fill="hsla(160, 70%, 48%, 0.15)" stroke="hsla(160, 70%, 48%, 0.4)" stroke-width="1" />
    <text x="600" y="315" text-anchor="middle" font-family="SF Pro Display" font-size="22" font-weight="600" fill="hsla(160, 70%, 48%, 0.9)">PROFESSIONAL · CONSOLE</text>
    
    <!-- Organisational layer (top) -->
    <rect x="300" y="100" width="600" height="120" rx="8" fill="hsla(160, 70%, 48%, 0.2)" stroke="hsla(160, 70%, 48%, 0.5)" stroke-width="1" />
    <text x="600" y="165" text-anchor="middle" font-family="SF Pro Display" font-size="22" font-weight="600" fill="hsla(160, 70%, 48%, 1)">ORGANISATIONAL · COMMAND</text>
  </svg>`,
  'Individual → Professional → Organisational',
  ['command']
);

/**
 * Proof Stacking Asset (medium-sized narrative visual)
 */
export const PROOF_STACKING_ASSET: RecoveryOSAsset = createAssetWithEtchedCopy(
  'asset-proof-stacking',
  'proof-stacking',
  'Proof Stacking',
  'Evidence accumulates: Each sealed delivery creates immutable proof that stacks over time',
  `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="proofGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:hsla(200, 12%, 10%, 0.8);stop-opacity:1" />
        <stop offset="100%" style="stop-color:hsla(200, 12%, 8%, 0.9);stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#proofGradient)" rx="12" />
    
    <!-- Stacked proof cards -->
    <rect x="50" y="180" width="300" height="60" rx="6" fill="hsla(160, 70%, 48%, 0.08)" stroke="hsla(160, 70%, 48%, 0.2)" stroke-width="1" />
    <rect x="50" y="140" width="300" height="60" rx="6" fill="hsla(160, 70%, 48%, 0.12)" stroke="hsla(160, 70%, 48%, 0.25)" stroke-width="1" />
    <rect x="50" y="100" width="300" height="60" rx="6" fill="hsla(160, 70%, 48%, 0.16)" stroke="hsla(160, 70%, 48%, 0.3)" stroke-width="1" />
    
    <!-- Count badge -->
    <circle cx="350" cy="100" r="20" fill="hsla(160, 70%, 48%, 0.25)" />
    <text x="350" y="106" text-anchor="middle" font-family="SF Mono" font-size="14" font-weight="700" fill="hsla(160, 70%, 48%, 1)">3</text>
  </svg>`,
  'Stack proof\nBuild evidence',
  'neutral',
  { width: 400, height: 300 }
);

/**
 * All hero assets for export
 */
export const HERO_ASSETS: RecoveryOSAsset[] = [
  SENSE_ROUTE_DELIVER_SEAL_HERO,
  ERA_CADENCE_HERO,
  THREE_ALTITUDES_HERO,
  PROOF_STACKING_ASSET,
];
