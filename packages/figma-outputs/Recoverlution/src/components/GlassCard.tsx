import React, { useState } from 'react';

interface GlassCardProps {
  /** Background asset image URL - displayed at 100% opacity (crystal sharp) */
  backgroundAsset?: string;
  
  /** Optional gradient overlay for depth (e.g., 'linear-gradient(...)') */
  gradientOverlay?: string;
  
  /** Card content */
  children: React.ReactNode;
  
  /** Optional click handler for interactive cards */
  onClick?: () => void;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Inline styles for the container */
  style?: React.CSSProperties;
  
  /** Disable hover effects (for non-interactive cards) */
  disableHover?: boolean;
  
  /** Custom shimmer color (defaults to ultra-subtle white) */
  shimmerColor?: string;
  
  /** Border radius (defaults to '0px' per infiniteK) */
  borderRadius?: string;
}

/**
 * 🎨 UNIVERSAL GLASS CARD STANDARD
 * 
 * Exhibition-grade glass treatment with:
 * - 100% opacity background assets (crystal sharp, NO unnecessary opacity reduction)
 * - Optional subtle gradient overlays for depth
 * - Shimmer effect on hover
 * - Apple Infinite Pro elegance hover animation
 * - Proper z-index layering (asset → gradient → shimmer → content)
 * 
 * THE ANCHOR RULE: NO CARD ON CARD. NO TILE ON TILE. NO BORDER ON BORDER.
 * 
 * @example
 * ```tsx
 * <GlassCard
 *   backgroundAsset="/path/to/asset.png"
 *   gradientOverlay="linear-gradient(135deg, rgba(62, 43, 184, 0.08) 0%, rgba(87, 57, 251, 0.06) 100%)"
 * >
 *   <h3>Card Title</h3>
 *   <p>Card content...</p>
 * </GlassCard>
 * ```
 */
export const GlassCard: React.FC<GlassCardProps> = ({
  backgroundAsset,
  gradientOverlay,
  children,
  onClick,
  className = '',
  style = {},
  disableHover = false,
  shimmerColor = 'rgba(255, 255, 255, 0.12)', // Ultra-subtle, elegant shimmer
  borderRadius = '0px'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const isInteractive = !!onClick;
  
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => !disableHover && setIsHovered(true)}
      onMouseLeave={() => !disableHover && setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
      style={{
        borderRadius,
        cursor: isInteractive ? 'pointer' : 'default',
        transform: isHovered && !disableHover ? 'scale(1.02) translateY(-4px)' : 'scale(1) translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', // Apple's signature easing
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        boxShadow: '0 40px 120px rgba(64, 224, 208, 0.2), 0 20px 60px rgba(87, 57, 251, 0.15)',
        ...style
      }}
    >
      {/* 🎨 BACKGROUND ASSET - 100% OPACITY (CRYSTAL SHARP) */}
      {backgroundAsset && (
        <img 
          src={backgroundAsset}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{
            opacity: 1, // ALWAYS 100% - NO UNNECESSARY OPACITY REDUCTION
            mixBlendMode: 'normal',
            imageRendering: '-webkit-optimize-contrast',
            zIndex: 1
          }}
        />
      )}

      {/* Subtle gradient overlay for depth */}
      {gradientOverlay && (
        <div 
          className="absolute inset-0" 
          style={{ 
            background: gradientOverlay,
            zIndex: 2
          }}
        />
      )}

      {/* ✨ SHIMMER EFFECT - Ultra-subtle, elegant sweep on hover */}
      {!disableHover && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(110deg, transparent 35%, ${shimmerColor} 50%, transparent 65%)`,
            backgroundSize: '200% 100%',
            animation: isHovered ? 'shimmer 2s ease-in-out' : 'none',
            zIndex: 3
          }}
        />
      )}

      {/* Card Content */}
      <div className="relative" style={{ zIndex: 10 }}>
        {children}
      </div>

      {/* Shimmer animation keyframes injected once */}
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * 🎨 PRESET GRADIENT OVERLAYS
 * 
 * Standard gradient overlays matching the infiniteK design system
 */
export const GLASS_GRADIENTS = {
  purple: 'linear-gradient(135deg, rgba(62, 43, 184, 0.08) 0%, rgba(87, 57, 251, 0.06) 100%)',
  purpleMid: 'linear-gradient(135deg, rgba(87, 57, 251, 0.08) 0%, rgba(124, 103, 255, 0.06) 100%)',
  purpleLight: 'linear-gradient(135deg, rgba(124, 103, 255, 0.08) 0%, rgba(87, 57, 251, 0.06) 100%)',
  neutral: 'linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.03) 100%)',
  white: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
};
