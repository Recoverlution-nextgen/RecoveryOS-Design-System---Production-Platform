import { LucideIcon } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DashboardTileProps {
  title: string;
  subtitle: string;
  imageUrl?: string;
  icon?: LucideIcon;
  gradient?: string;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  dimensions?: { width: number; height: number }; // For adaptive scaling
  children?: React.ReactNode;
}

export function DashboardTile({ 
  title, 
  subtitle, 
  imageUrl, 
  icon: Icon,
  gradient = "from-gray-800 to-gray-900",
  onClick,
  size = "medium",
  dimensions,
  children
}: DashboardTileProps) {
  
  // Adaptive typography and layout based on tile dimensions
  const getTypographyScale = () => {
    if (!dimensions) {
      return {
        titleSize: size === "small" ? "0.75rem" : size === "large" ? "1.125rem" : "0.95rem",
        subtitleSize: size === "small" ? "0.75rem" : "0.875rem",
        iconSize: size === "small" ? 18 : size === "large" ? 24 : 20,
        padding: size === "small" ? "12px 16px" : "16px 20px",
        dividerWidth: size === "small" ? "8px" : "12px",
        spacing: size === "small" ? "8px" : "10px",
        maxWidth: "320px"
      };
    }

    const area = dimensions.width * dimensions.height;
    const isBanner = dimensions.height < 150; // Like Toolkit
    const isTall = dimensions.height > dimensions.width * 1.5; // Like State

    if (isBanner) {
      // Compact horizontal layout for banner tiles
      return {
        titleSize: "0.75rem",
        subtitleSize: "0.7rem",
        iconSize: 16,
        padding: "10px 14px",
        dividerWidth: "0px",
        spacing: "10px",
        layout: "horizontal" as const,
        maxWidth: "none" // Full width for banners
      };
    }

    if (area > 300000) {
      // Large tiles (Journey, Navicues) - can afford slightly larger badge
      return {
        titleSize: "1rem",
        subtitleSize: "0.8rem",
        iconSize: 20,
        padding: "14px 18px",
        dividerWidth: "12px",
        spacing: "10px",
        layout: "vertical" as const,
        maxWidth: "360px"
      };
    }

    if (isTall) {
      // Tall tiles (State) - compact vertical
      return {
        titleSize: "0.85rem",
        subtitleSize: "0.75rem",
        iconSize: 18,
        padding: "12px 16px",
        dividerWidth: "10px",
        spacing: "8px",
        layout: "vertical" as const,
        maxWidth: "200px"
      };
    }

    // Medium tiles (Wellbeing, Navigate, Momentum)
    return {
      titleSize: "0.9rem",
      subtitleSize: "0.75rem",
      iconSize: 18,
      padding: "12px 16px",
      dividerWidth: "10px",
      spacing: "10px",
      layout: "vertical" as const,
      maxWidth: "300px"
    };
  };

  const scale = getTypographyScale();
  const isHorizontalLayout = scale.layout === "horizontal";

  return (
    <div
      onClick={onClick}
      className={`group relative w-full h-full overflow-hidden cursor-pointer transition-all duration-500 border`}
      style={{
        borderRadius: '0px',
        borderColor: 'rgba(255, 255, 255, 0.12)',
        boxShadow: `
          0 4px 24px rgba(0, 0, 0, 0.12),
          0 2px 8px rgba(0, 0, 0, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `,
      }}
    >
      {/* Background Image Layer - Lazy Loaded & Optimized - THE HERO */}
      {imageUrl && (
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            loading="lazy"
            width={dimensions?.width?.toString() || undefined}
            height={dimensions?.height?.toString() || undefined}
            className="w-full h-full object-cover"
            style={{
              filter: 'brightness(0.95) contrast(1.05)',
            }}
          />
          
          {/* Lighter gradient overlay - let the asset breathe */}
          <div 
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.25) 100%),
                linear-gradient(135deg, rgba(62, 43, 184, 0.08) 0%, rgba(87, 57, 251, 0.05) 100%)
              `
            }}
          />
        </div>
      )}

      {/* Ambient glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(87, 57, 251, 0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Energy flow DNA signature - more subtle */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-15 transition-opacity duration-700" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`energy-flow-${title}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5739FB" stopOpacity="0" />
            <stop offset="50%" stopColor="#40E0D0" stopOpacity="1" />
            <stop offset="100%" stopColor="#5739FB" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 0 50 Q 25 40, 50 50 T 100 50"
          stroke={`url(#energy-flow-${title})`}
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M 0 55 Q 25 65, 50 55 T 100 55"
          stroke={`url(#energy-flow-${title})`}
          strokeWidth="0.3"
          fill="none"
          opacity="0.6"
        />
      </svg>

      {/* Compact Floating Badge - Bottom Left Corner */}
      <div 
        className="absolute transition-transform duration-500 group-hover:-translate-y-1"
        style={{ 
          bottom: '20px',
          left: '20px',
          zIndex: 10,
          maxWidth: scale.maxWidth,
        }}
      >
        {children ? (
          children
        ) : (
          /* Premium Compact Glass Badge */
          <div 
            className="backdrop-blur-xl border transition-all duration-500"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.2) 0%, 
                  rgba(255, 255, 255, 0.12) 50%,
                  rgba(255, 255, 255, 0.08) 100%
                ),
                radial-gradient(circle at 30% 20%, rgba(87, 57, 251, 0.12) 0%, transparent 50%)
              `,
              borderColor: 'rgba(255, 255, 255, 0.25)',
              borderRadius: '0px',
              padding: scale.padding,
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.25),
                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                0 4px 12px rgba(87, 57, 251, 0.15)
              `,
              display: 'flex',
              flexDirection: isHorizontalLayout ? 'row' : 'column',
              alignItems: isHorizontalLayout ? 'center' : 'flex-start',
              gap: isHorizontalLayout ? '12px' : '0'
            }}
          >
            {/* Icon + Title Row */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: scale.spacing,
                flex: isHorizontalLayout ? '0 0 auto' : undefined
              }}
            >
              {/* Compact Icon Container */}
              {Icon && (
                <div 
                  className="flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                  style={{
                    width: `${scale.iconSize + 8}px`,
                    height: `${scale.iconSize + 8}px`,
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.12))',
                    borderRadius: '0px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                  }}
                >
                  <Icon 
                    size={scale.iconSize} 
                    style={{ 
                      color: 'white',
                      filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                    }} 
                  />
                </div>
              )}

              {/* Title */}
              <h3 
                className="text-white transition-all duration-300"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 700,
                  fontSize: scale.titleSize,
                  letterSpacing: '0.08em',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
                  lineHeight: '1.3',
                  whiteSpace: isHorizontalLayout ? 'nowrap' : 'normal'
                }}
              >
                {title}
              </h3>
            </div>

            {/* Divider (vertical layout only) */}
            {!isHorizontalLayout && scale.dividerWidth !== "0px" && (
              <div 
                className="transition-all duration-500"
                style={{
                  width: scale.dividerWidth,
                  height: '2px',
                  marginTop: '8px',
                  marginBottom: '8px',
                  background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 100%)',
                  boxShadow: '0 1px 3px rgba(255, 255, 255, 0.3)'
                }}
              />
            )}

            {/* Vertical divider for horizontal layout */}
            {isHorizontalLayout && (
              <div 
                style={{
                  width: '1px',
                  height: `${scale.iconSize}px`,
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%)',
                }}
              />
            )}

            {/* Subtitle with Dot Accent */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '6px',
                flex: isHorizontalLayout ? '1' : undefined
              }}
            >
              {/* Decorative dot */}
              <div 
                className="transition-all duration-500 group-hover:scale-125"
                style={{
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #40E0D0, #5739FB)',
                  boxShadow: '0 0 6px rgba(64, 224, 208, 0.6), 0 0 3px rgba(87, 57, 251, 0.4)',
                  flexShrink: 0,
                  marginTop: '6px'
                }}
              />

              {/* Subtitle */}
              <p 
                className="text-white/90 transition-all duration-300"
                style={{
                  fontSize: scale.subtitleSize,
                  lineHeight: '1.5',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)'
                }}
              >
                {subtitle}
              </p>
            </div>

            {/* Subtle bottom accent */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(90deg, #40E0D0 0%, #5739FB 50%, #40E0D0 100%)',
                filter: 'blur(2px)'
              }}
            />
          </div>
        )}
      </div>

      {/* Corner accent - subtle premium detail */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, rgba(255, 255, 255, 0.12) 0%, transparent 70%)',
          filter: 'blur(20px)'
        }}
      />

      {/* Bottom edge glow on hover */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(87, 57, 251, 0.5) 50%, transparent 100%)',
          boxShadow: '0 0 16px rgba(87, 57, 251, 0.4)'
        }}
      />
    </div>
  );
}
