// packages/ui/src/components/ResponsiveHero.tsx
import React, { useState, useEffect, useRef } from 'react';
import { CDNOptimizer, getCacheConfigForAsset, preloadCriticalAssets } from '../lib/cdn-config';
import type { StorageAsset } from '../lib/supabase';

export interface ResponsiveHeroProps {
  // Can accept either asset ID or full asset object
  asset?: StorageAsset;
  assetId?: string; // For querying by ID
  style?: string; // Asset style (neural_flower, flowstate, etc.)
  description?: string; // Search term

  // Display options
  priority?: boolean; // Preload this image
  lazy?: boolean; // Use lazy loading
  sizes?: string; // Responsive sizes attribute

  // Accessibility
  alt?: string;

  // Styling
  className?: string;
  style?: React.CSSProperties;

  // Callbacks
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export function ResponsiveHero({
  asset,
  assetId,
  style: assetStyle,
  description,
  priority = false,
  lazy = true,
  sizes = '(max-width: 768px) 390px, (max-width: 1000px) 768px, 1000px',
  alt,
  className,
  style,
  onLoad,
  onError
}: ResponsiveHeroProps) {
  const [currentAsset, setCurrentAsset] = useState<StorageAsset | null>(asset || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // CDN optimizer instance
  const cdnOptimizer = new CDNOptimizer(
    // Use environment variable or default to Supabase CDN
    import.meta.env?.VITE_CDN_BASE_URL ||
    'https://your-cdn-domain.com/assets/'
  );

  // Query asset if not provided
  useEffect(() => {
    if (currentAsset) return;

    const queryAsset = async () => {
      try {
        // Import query functions dynamically to avoid circular deps
        const { queryStorageAssets } = await import('../lib/supabase');

        let assets: StorageAsset[];

        if (assetId) {
          // Query by specific asset ID (description match)
          assets = await queryStorageAssets({
            search: assetId,
            limit: 1
          });
        } else if (assetStyle) {
          // Query by style, prefer hero-worthy formats
          assets = await queryStorageAssets({
            style: assetStyle,
            type: 'avif', // Prefer AVIF
            limit: 1
          });

          if (assets.length === 0) {
            // Fallback to WebP
            assets = await queryStorageAssets({
              style: assetStyle,
              type: 'webp',
              limit: 1
            });
          }

          if (assets.length === 0) {
            // Final fallback to JPG
            assets = await queryStorageAssets({
              style: assetStyle,
              type: 'JPG',
              limit: 1
            });
          }
        } else if (description) {
          // Search by description
          assets = await queryStorageAssets({
            search: description,
            limit: 1
          });
        } else {
          // Default: get a hero asset
          const { getHeroStorageAssets } = await import('../lib/supabase');
          assets = await getHeroStorageAssets({ limit: 1 });
        }

        if (assets.length > 0) {
          setCurrentAsset(assets[0]);
        } else {
          throw new Error('No asset found matching criteria');
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to load asset');
        setError(error);
        onError?.(error);
      }
    };

    queryAsset();
  }, [asset, assetId, assetStyle, description, onError]);

  // Preload critical assets
  useEffect(() => {
    if (priority && currentAsset) {
      preloadCriticalAssets([currentAsset.url]);
    }
  }, [priority, currentAsset]);

  // Handle image load
  const handleLoad = () => {
    setLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    const error = new Error(`Failed to load image: ${currentAsset?.url}`);
    setError(error);
    setLoading(false);
    onError?.(error);
  };

  if (error) {
    return (
      <div
        className={`responsive-hero error ${className || ''}`}
        style={style}
        role="img"
        aria-label={`Error loading image: ${error.message}`}
      >
        <div className="error-placeholder">
          {/* Could show a fallback image or placeholder */}
        </div>
      </div>
    );
  }

  if (!currentAsset) {
    return (
      <div
        className={`responsive-hero loading ${className || ''}`}
        style={style}
      >
        <div className="loading-placeholder" />
      </div>
    );
  }

  const cdnUrl = cdnOptimizer.toCDNUrl(currentAsset.url);
  const cacheConfig = getCacheConfigForAsset(currentAsset.object_name);

  return (
    <div className={`responsive-hero ${className || ''}`} style={style}>
      <picture>
        {/* Future: Add source elements for multiple formats when available */}
        <img
          ref={imgRef}
          src={cdnUrl}
          alt={alt || currentAsset.description}
          loading={priority ? 'eager' : lazy ? 'lazy' : undefined}
          decoding={priority ? 'sync' : 'async'}
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: '100%',
            height: 'auto',
            opacity: loading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out'
          }}
          data-cache-config={JSON.stringify(cacheConfig)}
        />
      </picture>

      {loading && (
        <div className="loading-overlay">
          {/* Loading indicator */}
        </div>
      )}
    </div>
  );
}

// Hook for querying assets
export function useStorageAsset(options: {
  style?: string;
  description?: string;
  limit?: number;
}) {
  const [assets, setAssets] = useState<StorageAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const queryAssets = async () => {
      try {
        const { queryStorageAssets } = await import('../lib/supabase');
        const result = await queryStorageAssets(options);
        setAssets(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to query assets'));
      } finally {
        setLoading(false);
      }
    };

    queryAssets();
  }, [options.style, options.description, options.limit]);

  return { assets, loading, error };
}

export default ResponsiveHero;