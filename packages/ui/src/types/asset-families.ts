/**
 * Asset Families: Organized visual language for RecoveryOS
 * Assets grouped by narrative purpose and visual treatment
 */

export type AssetFamily = 
  | 'cinematic-reality'    // Becoming in motion (quiet moments, not crisis)
  | 'os-objects'           // Passes, receipts, vault cards, timelines
  | 'system-maps'          // Loop ring, spine atlas, conductor routing
  | 'field-atmospheres'    // Subtle textures/gradients (continuity layer)
  | 'micro-motion';        // Seal, snap, settle, glide (regulation-grade)

export type AssetMood = 
  | 'quiet'          // Contemplative, low-arousal
  | 'becoming'       // In-transition, gentle shift
  | 'settled'        // Anchored, grounded
  | 'held'           // Supported, contained
  | 'continuous';    // Ongoing, sustained

/**
 * Cinematic Reality Assets
 * "Becoming in motion" — quiet moments, not crisis
 * Visual language: Soft focus, organic movement, subtle light shifts
 */
export interface CinematicRealityAsset {
  family: 'cinematic-reality';
  mood: AssetMood;
  moment: string; // "Breath settling", "Recognition dawning", "Pattern shifting"
  duration?: number; // For video/lottie assets (in seconds)
  soundscape?: string; // Optional audio layer
}

/**
 * OS Objects
 * Tangible system artifacts: passes, receipts, vault cards, timelines
 * Visual language: Skeuomorphic depth, tactile materials, clear hierarchy
 */
export interface OSObjectAsset {
  family: 'os-objects';
  objectType: 'pass' | 'receipt' | 'vault-card' | 'timeline' | 'badge' | 'token';
  materialFinish: 'glass' | 'metal' | 'paper' | 'ceramic' | 'liquid';
  interactable: boolean; // Can user tap/drag/manipulate?
  dataBinding?: string; // Which event/proof field populates this
}

/**
 * System Maps
 * Architectural views: loop ring, spine atlas, conductor routing
 * Visual language: Diagrams, flows, topology, spatial relationships
 */
export interface SystemMapAsset {
  family: 'system-maps';
  mapType: 'loop-ring' | 'spine-atlas' | 'conductor-routing' | 'altitude-layers' | 'era-cadence';
  perspective: '2d-flat' | '2.5d-isometric' | '3d-orbital';
  animated: boolean; // Does map show data flow/state changes?
  zoomable: boolean; // Can user drill down into detail?
}

/**
 * Field Atmospheres
 * Subtle textures/gradients implying "continuity layer"
 * Visual language: Low-contrast, ambient, non-intrusive backgrounds
 */
export interface FieldAtmosphereAsset {
  family: 'field-atmospheres';
  layerType: 'grain' | 'gradient' | 'noise' | 'shimmer' | 'breath';
  intensity: 'subtle' | 'medium' | 'present'; // Never "loud"
  animates: boolean; // Slow drift/pulse
  blendMode: 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light';
}

/**
 * Micro-Motion
 * Seal, snap, settle, glide — regulation-grade animation primitives
 * Visual language: Physics-based, natural timing, supportive feedback
 */
export interface MicroMotionAsset {
  family: 'micro-motion';
  motionType: 'seal' | 'snap' | 'settle' | 'glide' | 'pulse' | 'breathe';
  regulation: 'calming' | 'activating' | 'neutral'; // Physiological intent
  duration: number; // In milliseconds
  easing: 'spring' | 'ease-out' | 'linear';
  haptic?: 'light' | 'medium' | 'heavy'; // For mobile devices
}

/**
 * Extended Asset with Family
 */
export interface AssetWithFamily {
  id: string;
  slug: string;
  title: string;
  narrative: string;
  family: AssetFamily;
  familyMetadata: 
    | CinematicRealityAsset 
    | OSObjectAsset 
    | SystemMapAsset 
    | FieldAtmosphereAsset 
    | MicroMotionAsset;
  
  // Visual properties (from base RecoveryOSAsset)
  format: 'svg' | 'png' | 'webp' | 'json-lottie' | 'mp4';
  source: string;
  alt: string;
  dimensions: { width: number; height: number };
  
  // Copy integration
  etchedCopy?: {
    text: string;
    position: 'top' | 'center' | 'bottom' | 'edge';
    style: 'carved' | 'embossed' | 'transparent' | 'illuminated';
    typography: {
      family: 'SF Pro Display' | 'SF Pro Text' | 'SF Mono';
      size: number;
      weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
      letterSpacing: number;
      lineHeight: number;
    };
    color: string;
    blend: 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light';
  };
  
  glassEffect?: {
    opacity: number;
    blur: number;
    gradient?: { from: string; to: string; angle: number };
    border?: { width: number; color: string; opacity: number };
    shadow?: { x: number; y: number; blur: number; color: string };
  };
  
  // Usage
  usedIn: ('companion' | 'console' | 'command')[];
  elevation: 'surface' | 'raised' | 'floating';
}

/**
 * Asset Family Collections
 */
export interface AssetFamilyCollection {
  family: AssetFamily;
  name: string; // "Cinematic Reality", "OS Objects", etc.
  description: string;
  visualTreatment: string; // How this family should feel/look
  assets: AssetWithFamily[];
}
