/**
 * PLATFORM MOCKUP IMAGE COMPONENT
 * Renders transparent device mockups with solid color backgrounds
 * Same pattern as Section 6 Always-on Lifetime Care
 */

import { motion } from 'motion/react';

interface PlatformMockupImageProps {
  src: string;
  alt: string;
  color: string;
  featureId: string;
}

export const PlatformMockupImage = ({ src, alt, color, featureId }: PlatformMockupImageProps) => {
  return (
    <>
      {/* Add shimmer animation keyframes */}
      <style>{`
        @keyframes shimmer-platform-mockup {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      {/* Premium light reflections */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, transparent 30%),
            linear-gradient(-135deg, transparent 70%, rgba(255, 255, 255, 0.08) 100%),
            radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.18) 0%, transparent 40%),
            radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.10) 0%, transparent 35%)
          `,
          zIndex: 1
        }}
      />
      
      {/* Subtle diagonal light streak */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(45deg, 
              transparent 0%, 
              transparent 40%,
              rgba(255, 255, 255, 0.06) 50%,
              transparent 60%,
              transparent 100%
            )
          `,
          zIndex: 1
        }}
      />

      {/* Device Mockup - Transparent PNG */}
      <motion.img 
        key={featureId}
        src={src}
        alt={alt}
        style={{ 
          position: 'relative',
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          objectPosition: 'right center',
          zIndex: 2,
          filter: 'drop-shadow(0 15px 40px rgba(0, 0, 0, 0.25)) drop-shadow(0 5px 15px rgba(0, 0, 0, 0.15))'
        }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Subtle dark vignette for depth */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: `
            radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0, 0, 0, 0.12) 100%)
          `,
          zIndex: 3
        }}
      />

      {/* Premium shimmer effect */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 4 }}
      >
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)',
            animation: 'shimmer-platform-mockup 8s ease-in-out infinite',
            width: '50%'
          }}
        />
      </div>
    </>
  );
};
