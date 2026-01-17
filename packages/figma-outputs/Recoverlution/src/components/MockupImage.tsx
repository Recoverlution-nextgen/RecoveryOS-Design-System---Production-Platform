import { ImageWithFallback } from './figma/ImageWithFallback';

interface MockupImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Simple component for displaying shots.so mockups
 * These images already include device frames, shadows, and transparent backgrounds
 * No additional styling needed - just display them cleanly
 */
export function MockupImage({ src, alt, className = "" }: MockupImageProps) {
  return (
    <div className={`relative ${className}`}>
      <ImageWithFallback 
        src={src} 
        alt={alt} 
        className="w-full h-auto"
        style={{ 
          imageRendering: 'auto',
          maxWidth: '100%',
          height: 'auto'
        }}
      />
    </div>
  );
}

/**
 * For desktop + mobile combo in hero section
 */
interface MockupComboProps {
  desktopSrc: string;
  mobileSrc?: string;
  desktopAlt: string;
  mobileAlt?: string;
}

export function MockupCombo({ desktopSrc, mobileSrc, desktopAlt, mobileAlt }: MockupComboProps) {
  return (
    <div className="relative">
      {/* Main desktop mockup */}
      <MockupImage src={desktopSrc} alt={desktopAlt} />
      
      {/* Optional floating mobile mockup */}
      {mobileSrc && mobileAlt && (
        <div className="absolute -bottom-8 -right-8 w-48 md:w-56 lg:w-64">
          <MockupImage src={mobileSrc} alt={mobileAlt} />
        </div>
      )}
    </div>
  );
}
