/**
 * LAST SECTION CLASS (Final CTA) - UNIVERSAL COMPONENT
 * Used on all 6 marketing pages (Final section)
 * 
 * Same structure as Hero Class:
 * (a) Eyebrow
 * (b) Headline
 * (c) Subheadline
 * (d) CTA Button
 * (e) Full bleed asset
 * 
 * Note: This is essentially HeroClass with Final CTA specific defaults
 */

import { HeroClass } from './HeroClass';
import { ReactNode } from 'react';

interface LastSectionClassProps {
  // Content
  eyebrow?: string;
  eyebrowColor?: string;
  headline: string | ReactNode;
  subheadline?: string | ReactNode;
  
  // CTA Button
  ctaText: string;
  ctaOnClick: () => void;
  ctaBackgroundColor?: string;
  ctaTextColor?: string;
  
  // Asset
  desktopAsset: string;
  mobileAsset?: string;
  assetAlt: string;
  
  // Styling
  backgroundColor?: string;
  textColor?: string;
}

/**
 * LastSectionClass is a wrapper around HeroClass
 * If the content/styling is identical to Hero, it reuses the same component IDs
 * This follows the "NO DUPLICATION" principle
 */
export function LastSectionClass(props: LastSectionClassProps) {
  return <HeroClass {...props} />;
}
