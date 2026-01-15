import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// packages/ui/src/components/ResponsiveHero.tsx
import { useState, useEffect, useRef } from 'react';
import { CDNOptimizer, getCacheConfigForAsset, preloadCriticalAssets } from '../lib/cdn-config';
export function ResponsiveHero({ asset, assetId, style: assetStyle, description, priority = false, lazy = true, sizes = '(max-width: 768px) 390px, (max-width: 1000px) 768px, 1000px', alt, className, style, onLoad, onError }) {
    const [currentAsset, setCurrentAsset] = useState(asset || null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const imgRef = useRef(null);
    // CDN optimizer instance
    const cdnOptimizer = new CDNOptimizer(
    // Use environment variable or default to Supabase CDN
    import.meta.env?.VITE_CDN_BASE_URL ||
        'https://your-cdn-domain.com/assets/');
    // Query asset if not provided
    useEffect(() => {
        if (currentAsset)
            return;
        const queryAsset = async () => {
            try {
                // Import query functions dynamically to avoid circular deps
                const { queryStorageAssets } = await import('../lib/supabase');
                let assets;
                if (assetId) {
                    // Query by specific asset ID (description match)
                    assets = await queryStorageAssets({
                        search: assetId,
                        limit: 1
                    });
                }
                else if (assetStyle) {
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
                }
                else if (description) {
                    // Search by description
                    assets = await queryStorageAssets({
                        search: description,
                        limit: 1
                    });
                }
                else {
                    // Default: get a hero asset
                    const { getHeroStorageAssets } = await import('../lib/supabase');
                    assets = await getHeroStorageAssets({ limit: 1 });
                }
                if (assets.length > 0) {
                    setCurrentAsset(assets[0]);
                }
                else {
                    throw new Error('No asset found matching criteria');
                }
            }
            catch (err) {
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
        return (_jsx("div", { className: `responsive-hero error ${className || ''}`, style: style, role: "img", "aria-label": `Error loading image: ${error.message}`, children: _jsx("div", { className: "error-placeholder" }) }));
    }
    if (!currentAsset) {
        return (_jsx("div", { className: `responsive-hero loading ${className || ''}`, style: style, children: _jsx("div", { className: "loading-placeholder" }) }));
    }
    const cdnUrl = cdnOptimizer.toCDNUrl(currentAsset.url);
    const cacheConfig = getCacheConfigForAsset(currentAsset.object_name);
    return (_jsxs("div", { className: `responsive-hero ${className || ''}`, style: style, children: [_jsx("picture", { children: _jsx("img", { ref: imgRef, src: cdnUrl, alt: alt || currentAsset.description, loading: priority ? 'eager' : lazy ? 'lazy' : undefined, decoding: priority ? 'sync' : 'async', sizes: sizes, onLoad: handleLoad, onError: handleError, style: {
                        width: '100%',
                        height: 'auto',
                        opacity: loading ? 0 : 1,
                        transition: 'opacity 0.3s ease-in-out'
                    }, "data-cache-config": JSON.stringify(cacheConfig) }) }), loading && (_jsx("div", { className: "loading-overlay" }))] }));
}
// Hook for querying assets
export function useStorageAsset(options) {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const queryAssets = async () => {
            try {
                const { queryStorageAssets } = await import('../lib/supabase');
                const result = await queryStorageAssets(options);
                setAssets(result);
            }
            catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to query assets'));
            }
            finally {
                setLoading(false);
            }
        };
        queryAssets();
    }, [options.style, options.description, options.limit]);
    return { assets, loading, error };
}
export default ResponsiveHero;
