/**
 * SUBHERO CLASS - UNIVERSAL COMPONENT
 * Used on: Platform Section 2 & 7, Science Section 2, Story Section 2
 * 
 * Components:
 * (a) Eyebrow
 * (b) Headline
 * (c) Subheadline
 * (d) Bottom right icons (optional)
 * (e) Full bleed asset
 */

import { ReactNode } from 'react';

interface SubheroClassProps {
  // Content
  eyebrow: string;
  eyebrowColor?: string; // Default: purple (#5739FB)
  headline: string | ReactNode;
  subheadline?: string | ReactNode;
  
  // Asset
  desktopAsset: string;
  mobileAsset?: string;
  assetAlt: string;
  
  // Styling
  backgroundColor?: string; // Default: #FAFAFA
  textColor?: string; // Default: #1a1a1a
  
  // Bottom right icons (optional, like Platform page stats)
  bottomRightIcons?: ReactNode;
}

export function SubheroClass({
  eyebrow,
  eyebrowColor = '#5739FB',
  headline,
  subheadline,
  desktopAsset,
  mobileAsset,
  assetAlt,
  backgroundColor = '#FAFAFA',
  textColor = '#1a1a1a',
  bottomRightIcons,
}: SubheroClassProps) {
  return (
    <section 
      className="relative w-full overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Desktop Layout */}
      <div className="hidden lg:block relative min-h-[500px]">
        {/* Full Bleed Asset */}
        <div className="absolute inset-0">
          <img
            src={desktopAsset}
            alt={assetAlt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div 
              className="inline-block mb-4"
              style={{ color: eyebrowColor }}
            >
              <span className="text-sm tracking-[0.2em] uppercase">
                {eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h2
              className="mb-6"
              style={{ 
                color: textColor,
                fontSize: '56px',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
              }}
            >
              {headline}
            </h2>

            {/* Subheadline */}
            {subheadline && (
              <p
                className="max-w-xl"
                style={{
                  color: textColor,
                  fontSize: '18px',
                  lineHeight: '1.6',
                  opacity: 0.9,
                }}
              >
                {subheadline}
              </p>
            )}
          </div>

          {/* Bottom Right Icons (optional) */}
          {bottomRightIcons && (
            <div className="absolute bottom-12 right-12">
              {bottomRightIcons}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Mobile Asset */}
        <div className="w-full" style={{ aspectRatio: '375/400' }}>
          <img
            src={mobileAsset || desktopAsset}
            alt={assetAlt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Mobile Content */}
        <div className="px-6 py-12" style={{ backgroundColor }}>
          {/* Eyebrow */}
          <div 
            className="inline-block mb-3"
            style={{ color: eyebrowColor }}
          >
            <span className="text-xs tracking-[0.2em] uppercase">
              {eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h2
            className="mb-4"
            style={{ 
              color: textColor,
              fontSize: '32px',
              lineHeight: '1.2',
              letterSpacing: '-0.01em',
            }}
          >
            {headline}
          </h2>

          {/* Subheadline */}
          {subheadline && (
            <p
              style={{
                color: textColor,
                fontSize: '16px',
                lineHeight: '1.6',
                opacity: 0.9,
              }}
            >
              {subheadline}
            </p>
          )}

          {/* Bottom Icons (mobile) */}
          {bottomRightIcons && (
            <div className="mt-6">
              {bottomRightIcons}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
