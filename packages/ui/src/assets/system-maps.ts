/**
 * System Maps: Loop ring, spine atlas, conductor routing
 * Architectural/topological views of RecoveryOS structure
 */

import type { AssetWithFamily } from '../types/asset-families';

/**
 * Loop Ring — Sense→Route→Deliver→Seal circular topology
 */
export const LOOP_RING: AssetWithFamily = {
  id: 'system-map-loop-ring',
  slug: 'loop-ring',
  title: 'Loop Ring',
  narrative: 'The core topology: Recovery is a continuous loop, not a linear journey',
  family: 'system-maps',
  familyMetadata: {
    family: 'system-maps',
    mapType: 'loop-ring',
    perspective: '2.5d-isometric',
    animated: true,
    zoomable: false,
  } as const,
  format: 'svg',
  source: `<svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ringGlow">
        <stop offset="0%" style="stop-color:hsla(160, 70%, 48%, 0.2);stop-opacity:1" />
        <stop offset="100%" style="stop-color:hsla(160, 70%, 48%, 0);stop-opacity:0" />
      </radialGradient>
    </defs>
    
    <!-- Background glow -->
    <circle cx="300" cy="300" r="250" fill="url(#ringGlow)" />
    
    <!-- Loop ring (orbital path) -->
    <circle cx="300" cy="300" r="180" fill="none" stroke="hsla(160, 70%, 48%, 0.3)" stroke-width="2" stroke-dasharray="8,8" />
    
    <!-- Four stations on the loop -->
    <circle cx="300" cy="120" r="40" fill="hsla(200, 12%, 10%, 0.9)" stroke="hsla(160, 70%, 48%, 0.4)" stroke-width="2" />
    <text x="300" y="130" text-anchor="middle" font-family="SF Pro Display" font-size="16" font-weight="600" fill="hsla(160, 70%, 48%, 0.9)">SENSE</text>
    
    <circle cx="480" cy="300" r="40" fill="hsla(200, 12%, 10%, 0.9)" stroke="hsla(160, 70%, 48%, 0.4)" stroke-width="2" />
    <text x="480" y="310" text-anchor="middle" font-family="SF Pro Display" font-size="16" font-weight="600" fill="hsla(160, 70%, 48%, 0.9)">ROUTE</text>
    
    <circle cx="300" cy="480" r="40" fill="hsla(200, 12%, 10%, 0.9)" stroke="hsla(160, 70%, 48%, 0.4)" stroke-width="2" />
    <text x="300" y="490" text-anchor="middle" font-family="SF Pro Display" font-size="14" font-weight="600" fill="hsla(160, 70%, 48%, 0.9)">DELIVER</text>
    
    <circle cx="120" cy="300" r="40" fill="hsla(200, 12%, 10%, 0.9)" stroke="hsla(160, 70%, 48%, 0.4)" stroke-width="2" />
    <text x="120" y="310" text-anchor="middle" font-family="SF Pro Display" font-size="16" font-weight="600" fill="hsla(160, 70%, 48%, 0.9)">SEAL</text>
    
    <!-- Directional arrows -->
    <path d="M 300 160 L 300 120" stroke="hsla(160, 70%, 48%, 0.3)" stroke-width="2" marker-end="url(#arrowhead)" />
  </svg>`,
  alt: 'Circular loop showing four recovery stages in orbital topology',
  dimensions: { width: 600, height: 600 },
  etchedCopy: {
    text: 'The loop never stops',
    position: 'center',
    style: 'transparent',
    typography: {
      family: 'SF Pro Display',
      size: 18,
      weight: 300,
      letterSpacing: 0.04,
      lineHeight: 1,
    },
    color: 'hsla(0, 0%, 100%, 0.15)',
    blend: 'overlay',
  },
  glassEffect: {
    opacity: 0.1,
    blur: 24,
  },
  usedIn: ['companion', 'console', 'command'],
  elevation: 'raised',
};

/**
 * Spine Atlas — Three-altitude stack with data flow
 */
export const SPINE_ATLAS: AssetWithFamily = {
  id: 'system-map-spine-atlas',
  slug: 'spine-atlas',
  title: 'Spine Atlas',
  narrative: 'The vertical architecture: Individual → Professional → Organisational signal flow',
  family: 'system-maps',
  familyMetadata: {
    family: 'system-maps',
    mapType: 'spine-atlas',
    perspective: '2.5d-isometric',
    animated: true,
    zoomable: true,
  } as const,
  format: 'svg',
  source: `<svg viewBox="0 0 400 800" xmlns="http://www.w3.org/2000/svg">
    <!-- Individual layer (bottom) -->
    <rect x="50" y="600" width="300" height="150" rx="8" fill="hsla(160, 70%, 48%, 0.08)" stroke="hsla(160, 70%, 48%, 0.25)" stroke-width="1" />
    <text x="200" y="680" text-anchor="middle" font-family="SF Pro Display" font-size="18" font-weight="600" fill="hsla(160, 70%, 48%, 0.8)">INDIVIDUAL</text>
    <text x="200" y="705" text-anchor="middle" font-family="SF Pro Text" font-size="12" fill="hsla(0, 0%, 100%, 0.4)">Companion</text>
    
    <!-- Professional layer (middle) -->
    <rect x="75" y="400" width="250" height="150" rx="8" fill="hsla(160, 70%, 48%, 0.12)" stroke="hsla(160, 70%, 48%, 0.35)" stroke-width="1" />
    <text x="200" y="480" text-anchor="middle" font-family="SF Pro Display" font-size="18" font-weight="600" fill="hsla(160, 70%, 48%, 0.9)">PROFESSIONAL</text>
    <text x="200" y="505" text-anchor="middle" font-family="SF Pro Text" font-size="12" fill="hsla(0, 0%, 100%, 0.5)">Console</text>
    
    <!-- Organisational layer (top) -->
    <rect x="100" y="200" width="200" height="150" rx="8" fill="hsla(160, 70%, 48%, 0.16)" stroke="hsla(160, 70%, 48%, 0.45)" stroke-width="1" />
    <text x="200" y="280" text-anchor="middle" font-family="SF Pro Display" font-size="18" font-weight="600" fill="hsla(160, 70%, 48%, 1)">ORGANISATIONAL</text>
    <text x="200" y="305" text-anchor="middle" font-family="SF Pro Text" font-size="12" fill="hsla(0, 0%, 100%, 0.6)">Command</text>
    
    <!-- Signal flow arrows -->
    <line x1="200" y1="600" x2="200" y2="550" stroke="hsla(160, 70%, 48%, 0.3)" stroke-width="2" stroke-dasharray="4,4" />
    <line x1="200" y1="400" x2="200" y2="350" stroke="hsla(160, 70%, 48%, 0.3)" stroke-width="2" stroke-dasharray="4,4" />
  </svg>`,
  alt: 'Three-layer spine showing individual, professional, and organizational altitudes',
  dimensions: { width: 400, height: 800 },
  etchedCopy: {
    text: 'Signal flows up\nSupport flows down',
    position: 'top',
    style: 'transparent',
    typography: {
      family: 'SF Pro Text',
      size: 14,
      weight: 400,
      letterSpacing: 0.02,
      lineHeight: 1.4,
    },
    color: 'hsla(0, 0%, 100%, 0.3)',
    blend: 'normal',
  },
  usedIn: ['console', 'command'],
  elevation: 'raised',
};

/**
 * Conductor Routing — How events route from person → clinician → org
 */
export const CONDUCTOR_ROUTING: AssetWithFamily = {
  id: 'system-map-conductor-routing',
  slug: 'conductor-routing',
  title: 'Conductor Routing',
  narrative: 'Consent-native routing: Events flow based on person consent scope and escalation choices',
  family: 'system-maps',
  familyMetadata: {
    family: 'system-maps',
    mapType: 'conductor-routing',
    perspective: '2d-flat',
    animated: true,
    zoomable: true,
  } as const,
  format: 'svg',
  source: `<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
    <!-- Person node (source) -->
    <circle cx="100" cy="200" r="50" fill="hsla(160, 70%, 48%, 0.15)" stroke="hsla(160, 70%, 48%, 0.4)" stroke-width="2" />
    <text x="100" y="205" text-anchor="middle" font-family="SF Pro Display" font-size="14" font-weight="600" fill="hsla(160, 70%, 48%, 1)">PERSON</text>
    
    <!-- Consent gate -->
    <rect x="250" y="175" width="100" height="50" rx="6" fill="hsla(0, 0%, 15%, 0.9)" stroke="hsla(0, 0%, 100%, 0.2)" stroke-width="1" />
    <text x="300" y="205" text-anchor="middle" font-family="SF Mono" font-size="10" font-weight="700" fill="hsla(0, 0%, 100%, 0.5)">CONSENT</text>
    
    <!-- Clinician node -->
    <circle cx="500" cy="150" r="40" fill="hsla(160, 70%, 48%, 0.12)" stroke="hsla(160, 70%, 48%, 0.35)" stroke-width="1" />
    <text x="500" y="155" text-anchor="middle" font-family="SF Pro Display" font-size="12" font-weight="600" fill="hsla(160, 70%, 48%, 0.9)">CLINICIAN</text>
    
    <!-- Org node -->
    <circle cx="700" cy="200" r="40" fill="hsla(160, 70%, 48%, 0.1)" stroke="hsla(160, 70%, 48%, 0.3)" stroke-width="1" />
    <text x="700" y="205" text-anchor="middle" font-family="SF Pro Display" font-size="12" font-weight="600" fill="hsla(160, 70%, 48%, 0.8)">ORG</text>
    
    <!-- Routing paths -->
    <path d="M 150 200 L 250 200" stroke="hsla(160, 70%, 48%, 0.4)" stroke-width="2" />
    <path d="M 350 190 L 460 160" stroke="hsla(160, 70%, 48%, 0.3)" stroke-width="2" stroke-dasharray="4,4" />
    <path d="M 350 210 L 660 200" stroke="hsla(160, 70%, 48%, 0.3)" stroke-width="2" stroke-dasharray="4,4" />
  </svg>`,
  alt: 'Routing diagram showing consent-gated event flow from person to clinician and org',
  dimensions: { width: 800, height: 400 },
  etchedCopy: {
    text: 'Your consent routes the signal',
    position: 'bottom',
    style: 'transparent',
    typography: {
      family: 'SF Pro Text',
      size: 14,
      weight: 500,
      letterSpacing: 0.02,
      lineHeight: 1,
    },
    color: 'hsla(0, 0%, 100%, 0.3)',
    blend: 'normal',
  },
  usedIn: ['companion', 'console', 'command'],
  elevation: 'surface',
};

/**
 * Export all system map assets
 */
export const SYSTEM_MAP_ASSETS: AssetWithFamily[] = [
  LOOP_RING,
  SPINE_ATLAS,
  CONDUCTOR_ROUTING,
];
