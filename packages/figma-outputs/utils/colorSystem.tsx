/**
 * RECOVERLUTION COLOR WHEEL
 * 
 * The single source of truth for ALL colors across the platform.
 * Brand-aligned, neuroscience-backed, infiniteK quality.
 * 
 * RULES:
 * - All colors derive from our brand palette (#3E2BB8, #5739FB)
 * - NO random hex codes - everything comes from this file
 * - Icons YES, emojis NO
 */

// ============================================================================
// BRAND COLORS - Core Identity (EXPANDED PALETTE - Official)
// ============================================================================
export const BRAND = {
  // Primary Purple Scale
  dark: '#3E2BB8',      // Primary brand - authority, depth
  mid: '#5739FB',       // Secondary brand - energy, action
  light: '#7C67FF',     // Tertiary - soft, accessible
  accent: '#9D8FFF',    // Lightest - highlights, hover states
  
  // NEW: Atmospheric Dark Tones (Official Brand Extensions)
  darkPurple: '#242D63',    // Dark purple - gradients, atmospheric depth
  darkPurpleAlt: '#222461', // Dark purple variant - alternative tones
  deepBlueGrey: '#1E2034',  // Deep blue-grey - shadows, extreme depth
  
  // Neutral Scale (for text, backgrounds)
  black: '#1A1A1A',     // Primary text
  gray: '#6B7280',      // Secondary text, muted elements
  lightGray: '#F5F5F5', // Backgrounds, subtle dividers
  white: '#FFFFFF',     // Cards, clean surfaces
} as const;

// ============================================================================
// OFFICIAL BRAND PALETTE - Complete Color System
// ============================================================================
// The full spectrum from white to deep shadow, all brand-aligned:
// #FFFFFF (White) → #5739FB (Purple) → #3E2BB8 (Indigo) → 
// #242D63 (Dark Purple) → #222461 (Dark Purple Alt) → #1E2034 (Deep Blue-Grey)

// ============================================================================
// SIX PILLARS - Therapeutic Framework Colors
// Soft, familiar blues/purples/lavenders - NO reds/oranges (danger signals)
// ============================================================================
export const SIX_PILLARS = {
  emotionalRegulation: {
    primary: '#7C67FF',   // Soft purple - gentle, accessible
    light: '#9D8FFF',     // Lighter lavender for backgrounds
    name: 'Emotional Regulation',
  },
  stressResilience: {
    primary: '#C49DC4',   // Soft mauve - calm, soothing
    light: '#D4B5D4',     // Lighter for backgrounds
    name: 'Stress Resilience',
  },
  socialConnectivity: {
    primary: '#9D8FFF',   // Light lavender - connection, openness
    light: '#B8A8FF',     // Lighter for backgrounds
    name: 'Social Connectivity',
  },
  cognitiveReframing: {
    primary: '#3E2BB8',   // Deep purple - clarity, insight
    light: '#5739FB',     // Lighter for backgrounds
    name: 'Cognitive Reframing',
  },
  identityIntegration: {
    primary: '#5739FB',   // Brand purple - integration, wholeness
    light: '#7C67FF',     // Lighter for backgrounds
    name: 'Identity Integration',
  },
  decisionMastery: {
    primary: '#A8C4E1',   // Soft blue - calm clarity, wisdom
    light: '#C4D9ED',     // Lighter for backgrounds
    name: 'Decision Mastery',
  },
} as const;

// Array for easy iteration
export const SIX_PILLARS_ARRAY = [
  { id: 'emotionalRegulation', ...SIX_PILLARS.emotionalRegulation },
  { id: 'stressResilience', ...SIX_PILLARS.stressResilience },
  { id: 'socialConnectivity', ...SIX_PILLARS.socialConnectivity },
  { id: 'cognitiveReframing', ...SIX_PILLARS.cognitiveReframing },
  { id: 'identityIntegration', ...SIX_PILLARS.identityIntegration },
  { id: 'decisionMastery', ...SIX_PILLARS.decisionMastery },
] as const;

// ============================================================================
// BRAIN STATE TRAFFIC LIGHTS - Micro-Block Status (On-Brand)
// ============================================================================
export const BRAIN_STATE = {
  green: {
    primary: '#10B981',   // On-brand emerald - healthy patterns established
    light: '#34D399',     // Lighter for backgrounds
    bg: 'rgba(16, 185, 129, 0.1)',  // 10% opacity for subtle backgrounds
    border: 'rgba(16, 185, 129, 0.2)', // 20% opacity for borders
  },
  orange: {
    primary: '#F59E0B',   // On-brand amber - patterns actively shifting
    light: '#FBBF24',     // Lighter for backgrounds
    bg: 'rgba(245, 158, 11, 0.1)',
    border: 'rgba(245, 158, 11, 0.2)',
  },
  red: {
    primary: '#EF4444',   // On-brand red - patterns needing support
    light: '#F87171',     // Lighter for backgrounds
    bg: 'rgba(239, 68, 68, 0.1)',
    border: 'rgba(239, 68, 68, 0.2)',
  },
} as const;

// ============================================================================
// NOW STATE - Return · Rely · Shift (Momentum Metrics)
// ============================================================================
export const NOW_STATE = {
  return: {
    primary: BRAND.mid,        // #5739FB - showing up, presence
    light: BRAND.light,        // #7C67FF
    bg: 'rgba(87, 57, 251, 0.05)',
    border: 'rgba(87, 57, 251, 0.1)',
  },
  rely: {
    primary: '#3B82F6',        // Trust blue - toolkit, strength
    light: '#60A5FA',
    bg: 'rgba(59, 130, 246, 0.05)',
    border: 'rgba(59, 130, 246, 0.1)',
  },
  shift: {
    primary: '#8B5CF6',        // Violet - transformation, rewiring
    light: '#A78BFA',
    bg: 'rgba(139, 92, 246, 0.05)',
    border: 'rgba(139, 92, 246, 0.1)',
  },
} as const;

// ============================================================================
// TEMPO · FLOW · SYNC - Inner Metrics (Gradient Scale)
// ============================================================================
export const INNER_METRICS = {
  tempo: {
    primary: BRAND.dark,       // #3E2BB8 - rhythm, consistency
    gradient: ['#3E2BB8', '#5739FB', '#7C67FF'],
  },
  flow: {
    primary: '#06B6D4',        // Cyan - breadth, exploration
    gradient: ['#06B6D4', '#22D3EE', '#67E8F9'],
  },
  sync: {
    primary: '#EC4899',        // Pink - equilibrium, harmony
    gradient: ['#EC4899', '#F472B6', '#F9A8D4'],
  },
} as const;

// For Sync donut chart - three shades of brand purple
export const SYNC_GRADIENT = [BRAND.dark, BRAND.mid, BRAND.light] as const;

// ============================================================================
// CONTENT TYPES - Visual Differentiation
// ============================================================================
export const CONTENT_TYPES = {
  navicue: {
    primary: BRAND.mid,        // #5739FB - The right wisdom at the right moment
    icon: 'Compass',
  },
  video: {
    primary: '#EF4444',        // Red - rich media, engagement
    icon: 'Video',
  },
  article: {
    primary: '#3B82F6',        // Blue - deep learning, knowledge
    icon: 'FileText',
  },
  exercise: {
    primary: '#10B981',        // Green - practice, embodiment
    icon: 'Activity',
  },
  journey: {
    primary: '#8B5CF6',        // Violet - structured path, progression
    icon: 'Map',
  },
  buildingBlock: {
    primary: '#F59E0B',        // Amber - foundational concepts
    icon: 'Blocks',
  },
} as const;

// ============================================================================
// UTILITY COLORS - System States
// ============================================================================
export const UTILITY = {
  success: '#10B981',      // Emerald - confirmation, positive action
  warning: '#F59E0B',      // Amber - caution, attention needed
  error: '#EF4444',        // Red - critical, needs immediate attention
  info: '#3B82F6',         // Blue - informational, neutral
  
  // Glass effect overlays (for hero images)
  glassDark: 'rgba(0, 0, 0, 0.55)',     // Bottom text pocket
  glassLight: 'rgba(0, 0, 0, 0.15)',    // Subtle middle transition
  glassNone: 'transparent',              // Pristine top area
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get pillar color by name
 */
export function getPillarColor(pillarName: string): string {
  const pillar = SIX_PILLARS_ARRAY.find(p => p.name === pillarName);
  return pillar?.primary || BRAND.mid;
}

/**
 * Get brain state color
 */
export function getBrainStateColor(state: 'green' | 'orange' | 'red'): string {
  return BRAIN_STATE[state].primary;
}

/**
 * Get content type color
 */
export function getContentTypeColor(type: keyof typeof CONTENT_TYPES): string {
  return CONTENT_TYPES[type].primary;
}

/**
 * Convert hex to rgba
 */
export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}