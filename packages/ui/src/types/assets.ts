/**
 * Asset Schema: Copy-on-asset system where text is etched into visuals
 * Assets are the heroes - they tell the story, carry the narrative
 */

export type AssetFormat = 'svg' | 'png' | 'webp' | 'json-lottie';
export type AssetTone = 'calm' | 'heat' | 'neutral';
export type AssetLayer = 'background' | 'midground' | 'foreground' | 'etched-text';

/**
 * RecoveryOS Asset
 * Assets carry narrative weight - text is part of the visual, not overlaid
 */
export interface RecoveryOSAsset {
  id: string; // Unique asset identifier
  slug: string; // Human-readable slug (e.g., "sense-route-deliver-seal")
  title: string; // Asset title for accessibility
  narrative: string; // What story this asset tells

  // Visual properties
  format: AssetFormat;
  tone: AssetTone; // Calm/heat mode variant
  layers: AssetLayer[]; // Which layers compose this asset

  // Copy integration (text etched into asset)
  etchedCopy?: EtchedCopy; // Text that's part of the asset
  glassEffect?: GlassEffect; // Crystal glass aesthetic
  
  // Asset metadata
  source: string; // SVG code or image URL
  alt: string; // Accessibility alt text
  dimensions: { width: number; height: number };
  
  // Usage context
  usedIn: ('companion' | 'console' | 'command')[]; // Which views show this
  elevation: 'surface' | 'raised' | 'floating'; // Z-index layer
}

/**
 * Etched Copy: Text integrated into the asset (not overlaid)
 * Like text carved into glass or metal
 */
export interface EtchedCopy {
  text: string; // The copy
  position: 'top' | 'center' | 'bottom' | 'edge'; // Where text sits
  style: 'carved' | 'embossed' | 'transparent' | 'illuminated'; // How text appears
  typography: {
    family: 'SF Pro Display' | 'SF Pro Text' | 'SF Mono';
    size: number; // In pixels
    weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    letterSpacing: number; // In em
    lineHeight: number; // Multiplier
  };
  color: string; // CSS color (can be semi-transparent for glass)
  blend: 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light'; // CSS blend mode
}

/**
 * Glass Effect: Crystal glass aesthetic for assets
 * Transparency, refraction, layering
 */
export interface GlassEffect {
  opacity: number; // 0-1 (e.g., 0.14 for subtle)
  blur: number; // Backdrop blur in px
  gradient?: {
    from: string; // CSS color
    to: string; // CSS color
    angle: number; // Degrees
  };
  border?: {
    width: number; // In px
    color: string; // CSS color
    opacity: number; // 0-1
  };
  shadow?: {
    x: number;
    y: number;
    blur: number;
    color: string;
  };
}

/**
 * Asset Variant: Different states/tones of the same asset
 */
export interface AssetVariant {
  assetId: string; // Parent asset ID
  variantName: string; // "calm", "heat", "inactive", "active", etc.
  source: string; // SVG or image URL
  etchedCopy?: EtchedCopy; // Text might change per variant
}

/**
 * Asset Collection: Grouped assets that tell a story together
 */
export interface AssetCollection {
  id: string;
  name: string; // "Sense-Route-Deliver-Seal Loop", "ERA Cadence", etc.
  narrative: string; // Story this collection tells
  assets: RecoveryOSAsset[];
  sequence?: number[]; // Order to show assets (by index)
}

/**
 * Factory: Create asset with etched copy
 */
export function createAssetWithEtchedCopy(
  id: string,
  slug: string,
  title: string,
  narrative: string,
  source: string,
  etchedText: string,
  tone: AssetTone = 'neutral',
  dimensions: { width: number; height: number } = { width: 400, height: 300 }
): RecoveryOSAsset {
  return {
    id,
    slug,
    title,
    narrative,
    format: 'svg',
    tone,
    layers: ['background', 'etched-text'],
    etchedCopy: {
      text: etchedText,
      position: 'center',
      style: 'transparent',
      typography: {
        family: 'SF Pro Display',
        size: 24,
        weight: 600,
        letterSpacing: 0.02,
        lineHeight: 1.2,
      },
      color: 'hsla(0, 0%, 100%, 0.14)',
      blend: 'overlay',
    },
    glassEffect: {
      opacity: 0.14,
      blur: 24,
      border: {
        width: 1,
        color: 'hsla(0, 0%, 100%, 0.08)',
        opacity: 0.8,
      },
    },
    source,
    alt: title,
    dimensions,
    usedIn: ['companion', 'console', 'command'],
    elevation: 'raised',
  };
}

/**
 * Factory: Create hero asset (large, narrative-driven)
 */
export function createHeroAsset(
  id: string,
  slug: string,
  title: string,
  narrative: string,
  source: string,
  etchedText: string,
  usedIn: ('companion' | 'console' | 'command')[]
): RecoveryOSAsset {
  return {
    id,
    slug,
    title,
    narrative,
    format: 'svg',
    tone: 'neutral',
    layers: ['background', 'midground', 'foreground', 'etched-text'],
    etchedCopy: {
      text: etchedText,
      position: 'center',
      style: 'illuminated',
      typography: {
        family: 'SF Pro Display',
        size: 48,
        weight: 700,
        letterSpacing: 0.01,
        lineHeight: 1.1,
      },
      color: 'hsla(160, 70%, 48%, 0.25)',
      blend: 'screen',
    },
    glassEffect: {
      opacity: 0.25,
      blur: 32,
      gradient: {
        from: 'hsla(200, 12%, 8%, 0.8)',
        to: 'hsla(200, 12%, 12%, 0.6)',
        angle: 135,
      },
      border: {
        width: 1,
        color: 'hsla(160, 70%, 48%, 0.14)',
        opacity: 1,
      },
      shadow: {
        x: 0,
        y: 8,
        blur: 24,
        color: 'hsla(0, 0%, 0%, 0.4)',
      },
    },
    source,
    alt: title,
    dimensions: { width: 1200, height: 600 },
    usedIn,
    elevation: 'floating',
  };
}
