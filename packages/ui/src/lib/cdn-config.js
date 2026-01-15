// packages/ui/src/lib/cdn-config.ts
// CDN and Caching Configuration for Lightning-Fast Asset Delivery
// Optimal caching for different asset types
export const CACHE_CONFIGS = {
    // Static assets that rarely change - maximum cache
    'hero-images': {
        'Cache-Control': 'public, max-age=31536000, immutable',
        'CDN-Cache-Control': 'public, max-age=31536000, immutable',
        'Vary': 'Accept'
    },
    // Brand assets - long cache with revalidation
    'brand-assets': {
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        'CDN-Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        'ETag': true,
        'Vary': 'Accept'
    },
    // Dynamic assets that might change
    'system-assets': {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        'CDN-Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        'ETag': true
    }
};
// Get cache config for asset type
export function getCacheConfigForAsset(assetPath) {
    if (assetPath.includes('/brand/')) {
        return CACHE_CONFIGS['brand-assets'];
    }
    if (assetPath.includes('/system/') || assetPath.includes('/icons/')) {
        return CACHE_CONFIGS['system-assets'];
    }
    // Default to hero images for most assets
    return CACHE_CONFIGS['hero-images'];
}
// Generate responsive image srcset with cache-busting
export function generateResponsiveSrcSet(baseUrl, assetId, breakpoints) {
    return breakpoints
        .map(bp => `${baseUrl.replace(assetId, `${assetId}${bp.suffix}`)} ${bp.width}w`)
        .join(', ');
}
// CDN optimization utilities
export class CDNOptimizer {
    constructor(cdnBaseUrl) {
        Object.defineProperty(this, "cdnBaseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.cdnBaseUrl = cdnBaseUrl;
    }
    // Convert Supabase storage URL to CDN URL
    toCDNUrl(storageUrl) {
        // Replace Supabase storage URL with CDN domain
        return storageUrl.replace(/https:\/\/[^\/]+\.supabase\.co\/storage\/v1\/object\/public\//, this.cdnBaseUrl);
    }
    // Add cache-busting parameter for mutable assets
    addCacheBusting(url, version) {
        const separator = url.includes('?') ? '&' : '?';
        const cacheBuster = version || Date.now().toString();
        return `${url}${separator}v=${cacheBuster}`;
    }
    // Generate optimized picture element
    generatePictureElement(asset, options = {}) {
        const cdnUrl = this.toCDNUrl(asset.url);
        const alt = asset.description;
        const loading = options.priority ? 'eager' : (options.lazy !== false ? 'lazy' : undefined);
        const decoding = options.priority ? 'sync' : 'async';
        // For now, assume single URL - expand when we have multiple formats
        return `<img
      src="${cdnUrl}"
      alt="${alt}"
      loading="${loading}"
      decoding="${decoding}"
      ${options.sizes ? `sizes="${options.sizes}"` : ''}
      style="max-width: 100%; height: auto;"
    />`;
    }
}
// Service Worker caching strategies for offline/PWA support
export const SW_CACHE_STRATEGIES = {
    // Cache-first for static assets
    staticAssets: `
    workbox.routing.registerRoute(
      ({ url }) => url.pathname.includes('/assets/'),
      new workbox.strategies.CacheFirst({
        cacheName: 'recoveryos-assets-v1',
        plugins: [
          new workbox.expiration.ExpirationPlugin({
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
            maxEntries: 100
          })
        ]
      })
    );
  `,
    // Network-first for dynamic content
    dynamicAssets: `
    workbox.routing.registerRoute(
      ({ url }) => url.pathname.includes('/api/assets'),
      new workbox.strategies.NetworkFirst({
        cacheName: 'recoveryos-api-v1',
        plugins: [
          new workbox.cacheableResponse.CacheableResponsePlugin({
            statuses: [0, 200]
          })
        ]
      })
    );
  `
};
// Preload critical assets
export function preloadCriticalAssets(assetUrls) {
    if (typeof document === 'undefined')
        return;
    assetUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = url.includes('.webp') || url.includes('.avif') || url.includes('.jpg') ? 'image' : 'fetch';
        document.head.appendChild(link);
    });
}
// Intersection Observer for lazy loading
export function createLazyImageObserver() {
    return new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });
}
