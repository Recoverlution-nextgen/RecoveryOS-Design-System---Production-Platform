/**
 * RESPONSIVE ASSET UTILITY
 * 
 * Provides a hook to automatically select mobile or desktop assets based on screen size
 * 
 * Usage:
 * import { useResponsiveAsset } from '../utils/responsiveAssets';
 * 
 * const asset = useResponsiveAsset(desktopAsset, mobileAsset);
 */

import { useState, useEffect } from 'react';

// Mobile breakpoint (matches Tailwind's md breakpoint)
const MOBILE_BREAKPOINT = 768;

/**
 * Hook to select appropriate asset based on screen width
 * @param desktopAsset - Asset to use on desktop (>= 768px)
 * @param mobileAsset - Asset to use on mobile (< 768px)
 * @returns The appropriate asset for current screen size
 */
export function useResponsiveAsset(desktopAsset: string, mobileAsset?: string): string {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initial check
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    checkMobile();

    // Listen for resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // If no mobile asset provided, use desktop asset everywhere
  if (!mobileAsset) return desktopAsset;
  
  return isMobile ? mobileAsset : desktopAsset;
}

/**
 * Component wrapper for responsive images
 * Automatically selects correct asset and provides loading states
 */
interface ResponsiveAssetImageProps {
  desktopAsset: string;
  mobileAsset?: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ResponsiveAssetImage({ 
  desktopAsset, 
  mobileAsset, 
  alt, 
  className = '',
  style = {}
}: ResponsiveAssetImageProps) {
  const asset = useResponsiveAsset(desktopAsset, mobileAsset);

  return (
    <img 
      src={asset}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
    />
  );
}
