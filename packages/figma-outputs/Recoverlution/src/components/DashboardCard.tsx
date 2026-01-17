import { ImageWithFallback } from "./figma/ImageWithFallback";

/**
 * DASHBOARD CARD v12.0 - EXHIBITION-LEVEL REFINEMENT ✨
 * 
 * v12 PREMIUM ELEGANCE UPDATE (October 28, 2025):
 * - ENHANCED GLASS EFFECTS: Better blur, saturation, and depth
 * - REFINED SHADOWS: Multi-layer shadows for premium depth
 * - IMPROVED ANIMATIONS: Apple-grade easing and timing
 * - BETTER TYPOGRAPHY: Enhanced sizing and shadows
 * - SOPHISTICATED HOVER: Smoother transforms and transitions
 * 
 * TWO-LAYER ARCHITECTURE:
 * - Layer 1: CRISP background image (100% sharp, no blur)
 * - Layer 2: Text overlay with premium backdrop blur (readability)
 *
 * infiniteK COMPLIANCE:
 * - Square corners (borderRadius: '0px')
 * - No card on card
 * - Premium white elegance
 */

interface DashboardCardProps {
  title: string;
  subtitle: string;
  imageUrl?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  accentColor?: string;
  titleSize?: string;
  subtitleSize?: string;
  darkOverlay?: boolean;
  dataTour?: string;
}

export function DashboardCard({ 
  title, 
  subtitle, 
  imageUrl, 
  onClick,
  className = "",
  children,
  accentColor = "#3E2BB8",
  titleSize = "text-2xl",
  subtitleSize = "text-xs",
  darkOverlay = false,
  dataTour
}: DashboardCardProps) {
  return (
    <div
      onClick={onClick}
      data-tour={dataTour}
      className={`group relative w-full h-full overflow-hidden cursor-pointer border border-white/[0.10] ${className}`}
      style={{
        borderRadius: '0px', // infiniteK: Square corners
        transition: 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
        boxShadow: `
          0 6px 24px rgba(62, 43, 184, 0.09),
          0 2px 6px rgba(0, 0, 0, 0.07),
          inset 0 0 0 1px rgba(255, 255, 255, 0.10)
        `,
      }}
    >
      {/* Premium hover styles */}
      <style>{`
        .dashboard-card-hover:hover {
          transform: translateY(-3px);
          box-shadow: 
            0 16px 36px rgba(62, 43, 184, 0.14),
            0 6px 12px rgba(87, 57, 251, 0.10),
            inset 0 0 0 1px rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.18);
        }
        .dashboard-card-hover:active {
          transform: translateY(-1.5px);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
      
      <div className="dashboard-card-hover w-full h-full">
        {/* LAYER 1: CRISP Background Image (100% sharp, NO blur) */}
        <div className="absolute inset-0 w-full h-full">
          <ImageWithFallback
            src={imageUrl || ""}
            alt={title}
            className="w-full h-full object-cover"
            style={{
              opacity: 1, // Full crisp visibility
            }}
          />
          
          {/* Refined warmth overlay (subtle purple tint) */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(87, 57, 251, 0.025) 0%, transparent 55%)',
              mixBlendMode: 'overlay',
              pointerEvents: 'none',
            }}
          />
          
          {/* Enhanced dark gradient (only if darkOverlay is true) */}
          {darkOverlay && (
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.35) 100%)',
              }}
            />
          )}
        </div>

        {/* LAYER 2: Text Overlay (premium blur ONLY here) */}
        {children ? (
          children
        ) : (
          <div className="relative h-full flex flex-col justify-end">
            <div 
              className="relative px-7 py-6"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.12) 50%, rgba(0, 0, 0, 0.45) 100%)',
              }}
            >
              {/* Premium backdrop blur - Enhanced for v12 */}
              <div 
                className="absolute inset-0 -z-10"
                style={{
                  backdropFilter: 'blur(32px) saturate(140%)',
                  WebkitBackdropFilter: 'blur(32px) saturate(140%)',
                }}
              />
              
              <div className="relative flex flex-col" style={{ gap: '3px' }}>
                {/* Title - Enhanced typography */}
                <h3 
                  className={`text-white uppercase ${titleSize}`}
                  style={{ 
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    lineHeight: '1.02',
                    letterSpacing: '0.035em',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.35), 0 3px 8px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  {title}
                </h3>
                
                {/* Subtitle - Enhanced readability */}
                <p 
                  className={`text-white/90 lowercase ${subtitleSize}`}
                  style={{ 
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 400,
                    lineHeight: '1.35',
                    letterSpacing: '-0.008em',
                    textShadow: '0 2px 3px rgba(0, 0, 0, 0.40), 0 3px 6px rgba(0, 0, 0, 0.18)',
                    opacity: 0.94,
                  }}
                >
                  {subtitle}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
