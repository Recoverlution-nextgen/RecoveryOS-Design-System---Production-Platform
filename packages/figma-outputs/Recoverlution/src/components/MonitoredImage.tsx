import { useState, useEffect } from 'react';
import { getAssetByUrl } from '../utils/assetManifest';

/**
 * MONITORED IMAGE COMPONENT
 * 
 * Wraps image elements with error detection and reporting.
 * Logs failures to console and tracks broken images for alerts.
 */

interface MonitoredImageProps {
  src: string;
  alt: string;
  className?: string;
  location: string; // Which page/component is using this image
  fallback?: string; // Optional fallback image URL
  onError?: () => void;
}

// Track broken images globally for reporting
const brokenImages: Array<{
  src: string;
  alt: string;
  location: string;
  timestamp: string;
  assetName?: string;
}> = [];

export function MonitoredImage({ 
  src, 
  alt, 
  className, 
  location, 
  fallback,
  onError 
}: MonitoredImageProps) {
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleError = () => {
    const asset = getAssetByUrl(src);
    const errorDetails = {
      src,
      alt,
      location,
      timestamp: new Date().toISOString(),
      assetName: asset?.name
    };

    // Log to console immediately
    console.error('🚨 IMAGE LOAD FAILED', {
      ...errorDetails,
      assetMetadata: asset
    });

    // Add to broken images tracker
    brokenImages.push(errorDetails);

    // Try fallback if provided
    if (fallback && !imageError) {
      console.warn(`⚠️ Attempting fallback for: ${alt}`);
      setCurrentSrc(fallback);
      setImageError(true);
    } else {
      setImageError(true);
    }

    // Call custom error handler
    onError?.();
  };

  // Report on mount if src is invalid
  useEffect(() => {
    if (!src || src === '') {
      console.error('🚨 IMAGE MISSING SRC', { alt, location });
      brokenImages.push({
        src: 'MISSING',
        alt,
        location,
        timestamp: new Date().toISOString()
      });
    }
  }, [src, alt, location]);

  // Show error state
  if (imageError && !fallback) {
    return (
      <div 
        className={className}
        style={{
          background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
          border: '2px dashed #DC2626',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px',
          padding: '20px',
          textAlign: 'center'
        }}
      >
        <div>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>⚠️</div>
          <div style={{ color: '#DC2626', fontWeight: 600, marginBottom: '4px' }}>
            Image Failed to Load
          </div>
          <div style={{ fontSize: '12px', color: '#991B1B', fontFamily: 'monospace' }}>
            {alt}
          </div>
          <div style={{ fontSize: '11px', color: '#7F1D1D', marginTop: '8px' }}>
            Location: {location}
          </div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
}

/**
 * Get all broken images that have been tracked
 */
export function getBrokenImages() {
  return [...brokenImages];
}

/**
 * Clear broken images log
 */
export function clearBrokenImages() {
  brokenImages.length = 0;
}

/**
 * Check if any images are broken
 */
export function hasBrokenImages(): boolean {
  return brokenImages.length > 0;
}

/**
 * Generate alert message for broken images
 */
export function generateImageAlertReport(): string {
  if (brokenImages.length === 0) {
    return '✅ All images loaded successfully';
  }

  const report = [
    `🚨 CRITICAL: ${brokenImages.length} IMAGES FAILED TO LOAD`,
    '',
    ...brokenImages.map((img, i) => 
      `${i + 1}. ${img.assetName || img.alt}\n   Location: ${img.location}\n   Time: ${new Date(img.timestamp).toLocaleString()}\n   URL: ${img.src.substring(0, 50)}...`
    )
  ];

  return report.join('\n');
}
