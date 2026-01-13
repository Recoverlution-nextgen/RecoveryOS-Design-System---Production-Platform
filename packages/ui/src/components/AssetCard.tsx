import React from 'react';
import type { RecoveryOSAsset } from '../types/assets';

export interface AssetCardProps {
  asset: RecoveryOSAsset;
  interactive?: boolean;
  onClick?: () => void;
}

/**
 * AssetCard: Display asset with etched copy
 * Text is part of the visual, not overlaid
 */
export function AssetCard({ asset, interactive = false, onClick }: AssetCardProps) {
  const { etchedCopy, glassEffect, source, alt, dimensions, narrative } = asset;

  // Build glass effect styles
  const glassStyles: React.CSSProperties = glassEffect
    ? {
        backdropFilter: `blur(${glassEffect.blur}px)`,
        opacity: glassEffect.opacity,
        ...(glassEffect.gradient && {
          background: `linear-gradient(${glassEffect.gradient.angle}deg, ${glassEffect.gradient.from}, ${glassEffect.gradient.to})`,
        }),
        ...(glassEffect.border && {
          border: `${glassEffect.border.width}px solid ${glassEffect.border.color}`,
          borderOpacity: glassEffect.border.opacity,
        }),
        ...(glassEffect.shadow && {
          boxShadow: `${glassEffect.shadow.x}px ${glassEffect.shadow.y}px ${glassEffect.shadow.blur}px ${glassEffect.shadow.color}`,
        }),
      }
    : {};

  // Build etched copy styles
  const etchedStyles: React.CSSProperties = etchedCopy
    ? {
        fontFamily: etchedCopy.typography.family,
        fontSize: `${etchedCopy.typography.size}px`,
        fontWeight: etchedCopy.typography.weight,
        letterSpacing: `${etchedCopy.typography.letterSpacing}em`,
        lineHeight: etchedCopy.typography.lineHeight,
        color: etchedCopy.color,
        mixBlendMode: etchedCopy.blend,
        textAlign: 'center',
        ...(etchedCopy.style === 'carved' && {
          textShadow: '0 1px 0 rgba(0,0,0,0.5), 0 -1px 0 rgba(255,255,255,0.1)',
        }),
        ...(etchedCopy.style === 'embossed' && {
          textShadow: '0 1px 2px rgba(255,255,255,0.3), 0 -1px 0 rgba(0,0,0,0.7)',
        }),
        ...(etchedCopy.style === 'transparent' && {
          opacity: 0.7,
        }),
        ...(etchedCopy.style === 'illuminated' && {
          textShadow: `0 0 12px ${etchedCopy.color}, 0 0 24px ${etchedCopy.color}`,
        }),
      }
    : {};

  return (
    <div
      className="asset-card"
      style={{
        position: 'relative',
        width: dimensions.width,
        height: dimensions.height,
        overflow: 'hidden',
        borderRadius: 'var(--radius-large)',
        cursor: interactive ? 'pointer' : 'default',
        transition: 'transform 200ms var(--ease-out)',
        ...(interactive && {
          ':hover': {
            transform: 'scale(1.02)',
          },
        }),
      }}
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={alt}
    >
      {/* Background layer (asset itself) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          ...glassStyles,
        }}
        dangerouslySetInnerHTML={source.startsWith('<svg') ? { __html: source } : undefined}
      >
        {!source.startsWith('<svg') && <img src={source} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
      </div>

      {/* Etched text layer */}
      {etchedCopy && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: etchedCopy.position === 'top' ? 'flex-start' : etchedCopy.position === 'bottom' ? 'flex-end' : 'center',
            justifyContent: 'center',
            padding: '32px',
            pointerEvents: 'none',
          }}
        >
          <span style={etchedStyles}>{etchedCopy.text}</span>
        </div>
      )}

      {/* Narrative (hover tooltip) */}
      {interactive && (
        <div
          className="asset-narrative"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '16px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            color: 'var(--color-text-primary)',
            fontSize: '14px',
            opacity: 0,
            transition: 'opacity 200ms',
          }}
        >
          {narrative}
        </div>
      )}
    </div>
  );
}

AssetCard.displayName = 'AssetCard';
