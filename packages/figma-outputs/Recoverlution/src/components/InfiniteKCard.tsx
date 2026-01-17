import { ReactNode } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface InfiniteKCardProps {
  // Image (optional)
  imageUrl?: string;
  imageAlt?: string;
  
  // Badge/Category
  badgeText?: string;
  badgeIcon?: ReactNode;
  badgeColor?: string; // Hex color for badge dot/text
  
  // Title & Description
  title: string;
  description?: string;
  
  // Optional metadata
  duration?: string;
  metaInfo?: string;
  
  // Content area (children for custom content like charts)
  children?: ReactNode;
  
  // Accent color for borders/highlights
  accentColor?: string;
  
  // Click handler
  onClick?: () => void;
  
  // Card styling
  className?: string;
}

export function InfiniteKCard({
  imageUrl,
  imageAlt,
  badgeText,
  badgeIcon,
  badgeColor = "#3E2BB8",
  title,
  description,
  duration,
  metaInfo,
  children,
  accentColor = "#3E2BB8",
  onClick,
  className = ""
}: InfiniteKCardProps) {
  // Convert hex to RGB for transparency
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 62, g: 43, b: 184 }; // Fallback to brand purple
  };

  const rgb = hexToRgb(accentColor);
  
  return (
    <div
      onClick={onClick}
      className={`backdrop-blur-xl border shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden transition-all duration-300 ${
        onClick ? "cursor-pointer hover:shadow-[0_12px_40px_rgba(59,130,246,0.25),0_6px_20px_rgba(87,57,251,0.2)]" : ""
      } ${className}`}
      style={{
        // COLORED GLASS BACKGROUND - elegant transparency
        backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08)`,
        borderColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`,
        borderRadius: '0px' // infiniteK: Square corners
      }}
    >
      {/* Image Section (Optional) */}
      {imageUrl && (
        <div className="w-full aspect-[4/3] relative overflow-hidden">
          <ImageWithFallback
            src={imageUrl}
            alt={imageAlt || title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content on Colored Glass */}
      <div className="p-6">
        {/* Badges Row */}
        {(badgeText || duration) && (
          <div className="flex items-center justify-between mb-4">
            {/* Category/Pillar Badge */}
            {badgeText && (
              <div 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-sm"
                style={{
                  backgroundColor: `rgba(255, 255, 255, 0.2)`,
                  borderColor: `rgba(255, 255, 255, 0.3)`
                }}
              >
                {badgeIcon && (
                  <div className="text-white">
                    {badgeIcon}
                  </div>
                )}
                <div 
                  className="w-2 h-2 rounded-full bg-white"
                />
                <span 
                  className="text-xs uppercase tracking-wider text-white"
                  style={{ 
                    fontWeight: 600
                  }}
                >
                  {badgeText}
                </span>
              </div>
            )}

            {/* Duration/Meta Badge */}
            {duration && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 rounded-full border border-white/30">
                <span className="text-xs text-white/90">
                  {duration}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Title - WHITE on colored glass */}
        <h3 
          className="text-white mb-2"
          style={{ 
            fontFamily: 'var(--font-display)',
            fontWeight: 600
          }}
        >
          {title}
        </h3>

        {/* Meta Info (optional subtitle) - WHITE */}
        {metaInfo && (
          <p className="text-sm text-white/80 mb-2">
            {metaInfo}
          </p>
        )}

        {/* Description - WHITE */}
        {description && (
          <p className="text-sm text-white/90 leading-relaxed mb-4">
            {description}
          </p>
        )}

        {/* Custom Content (charts, metrics, etc.) */}
        {children}
      </div>
    </div>
  );
}
