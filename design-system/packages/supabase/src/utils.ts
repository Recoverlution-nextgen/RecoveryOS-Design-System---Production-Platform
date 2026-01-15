import type { StorageAsset, CacheOptions, ImageTransformOptions } from './types';

/**
 * Image optimization utilities for Supabase assets
 */
export class ImageOptimizationUtils {
  /**
   * Generate responsive image srcset for different breakpoints
   */
  static generateSrcSet(asset: StorageAsset, breakpoints: number[], format: 'webp' | 'avif' = 'webp'): string {
    return breakpoints
      .map(width => {
        const url = `${asset.storage_path}?width=${width}&format=${format}`;
        return `${url} ${width}w`;
      })
      .join(', ');
  }

  /**
   * Generate picture element sources for modern image formats
   */
  static generatePictureSources(asset: StorageAsset, breakpoints: number[]): {
    avif: string;
    webp: string;
    fallback: string;
  } {
    return {
      avif: this.generateSrcSet(asset, breakpoints, 'avif'),
      webp: this.generateSrcSet(asset, breakpoints, 'webp'),
      fallback: asset.storage_path
    };
  }

  /**
   * Calculate optimal image dimensions based on container and aspect ratio
   */
  static calculateOptimalDimensions(
    containerWidth: number,
    containerHeight: number,
    aspectRatio: number
  ): { width: number; height: number } {
    const containerAspectRatio = containerWidth / containerHeight;

    if (aspectRatio > containerAspectRatio) {
      // Image is wider than container - fit by width
      return {
        width: containerWidth,
        height: Math.round(containerWidth / aspectRatio)
      };
    } else {
      // Image is taller than container - fit by height
      return {
        width: Math.round(containerHeight * aspectRatio),
        height: containerHeight
      };
    }
  }

  /**
   * Generate cache-busting version string based on asset metadata
   */
  static generateCacheVersion(asset: StorageAsset): string {
    const { updated_at, file_size, checksum } = asset;
    return `${updated_at}_${file_size}_${checksum?.slice(0, 8) || 'no-checksum'}`;
  }

  /**
   * Determine if an asset should be lazy loaded based on position
   */
  static shouldLazyLoad(index: number, totalItems: number, viewportHeight: number = 1080): boolean {
    // Load first 3 items immediately, lazy load the rest
    return index > 2;
  }

  /**
   * Generate preload link for critical images
   */
  static generatePreloadLink(asset: StorageAsset, options?: ImageTransformOptions): string {
    let href = asset.storage_path;
    const params = new URLSearchParams();

    if (options?.width) params.set('width', options.width.toString());
    if (options?.height) params.set('height', options.height.toString());
    if (options?.format) params.set('format', options.format);
    if (options?.quality) params.set('quality', options.quality.toString());

    if (params.toString()) {
      href += `?${params.toString()}`;
    }

    return `<link rel="preload" as="image" href="${href}" crossorigin="anonymous">`;
  }
}

/**
 * Cache management utilities
 */
export class CacheUtils {
  private static readonly CACHE_KEY_PREFIX = 'recoverlution_asset_';
  private static readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  /**
   * Cache asset data with TTL
   */
  static setCachedAsset(assetId: string, data: StorageAsset): void {
    const cacheData = {
      data,
      timestamp: Date.now(),
      version: ImageOptimizationUtils.generateCacheVersion(data)
    };

    try {
      localStorage.setItem(
        `${this.CACHE_KEY_PREFIX}${assetId}`,
        JSON.stringify(cacheData)
      );
    } catch (error) {
      console.warn('Failed to cache asset data:', error);
    }
  }

  /**
   * Get cached asset data if still valid
   */
  static getCachedAsset(assetId: string): StorageAsset | null {
    try {
      const cached = localStorage.getItem(`${this.CACHE_KEY_PREFIX}${assetId}`);
      if (!cached) return null;

      const cacheData = JSON.parse(cached);
      const isExpired = Date.now() - cacheData.timestamp > this.CACHE_DURATION;

      if (isExpired) {
        this.removeCachedAsset(assetId);
        return null;
      }

      return cacheData.data;
    } catch (error) {
      console.warn('Failed to retrieve cached asset:', error);
      return null;
    }
  }

  /**
   * Remove cached asset data
   */
  static removeCachedAsset(assetId: string): void {
    try {
      localStorage.removeItem(`${this.CACHE_KEY_PREFIX}${assetId}`);
    } catch (error) {
      console.warn('Failed to remove cached asset:', error);
    }
  }

  /**
   * Clear all cached assets
   */
  static clearAssetCache(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.CACHE_KEY_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear asset cache:', error);
    }
  }

  /**
   * Get cache statistics
   */
  static getCacheStats(): { totalItems: number; totalSize: number } {
    try {
      const keys = Object.keys(localStorage);
      const assetKeys = keys.filter(key => key.startsWith(this.CACHE_KEY_PREFIX));

      let totalSize = 0;
      assetKeys.forEach(key => {
        const item = localStorage.getItem(key);
        if (item) {
          totalSize += item.length;
        }
      });

      return {
        totalItems: assetKeys.length,
        totalSize
      };
    } catch (error) {
      console.warn('Failed to get cache stats:', error);
      return { totalItems: 0, totalSize: 0 };
    }
  }
}

/**
 * Performance monitoring utilities
 */
export class PerformanceUtils {
  /**
   * Measure image load performance
   */
  static measureImageLoad(url: string): Promise<PerformanceEntry> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const startTime = performance.now();

      img.onload = () => {
        const endTime = performance.now();
        const entry: PerformanceEntry = {
          name: url,
          entryType: 'measure',
          startTime,
          duration: endTime - startTime,
          toJSON: () => ({})
        };
        resolve(entry);
      };

      img.onerror = reject;
      img.src = url;
    });
  }

  /**
   * Track asset usage analytics
   */
  static trackAssetUsage(assetId: string, context: string, userId?: string): void {
    // This would integrate with your analytics service
    console.log(`Asset ${assetId} used in ${context}`, { userId, timestamp: Date.now() });
  }

  /**
   * Generate performance report for asset loading
   */
  static generatePerformanceReport(entries: PerformanceEntry[]): {
    averageLoadTime: number;
    slowestAsset: string;
    fastestAsset: string;
    totalAssets: number;
  } {
    if (entries.length === 0) {
      return {
        averageLoadTime: 0,
        slowestAsset: '',
        fastestAsset: '',
        totalAssets: 0
      };
    }

    const loadTimes = entries.map(entry => entry.duration);
    const averageLoadTime = loadTimes.reduce((a, b) => a + b, 0) / loadTimes.length;

    const slowestIndex = loadTimes.indexOf(Math.max(...loadTimes));
    const fastestIndex = loadTimes.indexOf(Math.min(...loadTimes));

    return {
      averageLoadTime,
      slowestAsset: entries[slowestIndex]?.name || '',
      fastestAsset: entries[fastestIndex]?.name || '',
      totalAssets: entries.length
    };
  }
}