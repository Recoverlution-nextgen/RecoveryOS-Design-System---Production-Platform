import { useState, useEffect } from 'react';
import { getAssetsByComponent, getAssetsByLabels } from '../lib/supabase';
/**
 * Hook to fetch assets based on component placement rules
 * @param componentName - Name of the component (e.g., "WalkthroughPresenter")
 * @param route - Optional route for additional context
 */
export function useAssetsByComponent(componentName, route) {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        let mounted = true;
        async function fetchAssets() {
            try {
                setLoading(true);
                setError(null);
                const data = await getAssetsByComponent(componentName, route);
                if (mounted) {
                    setAssets(data);
                }
            }
            catch (err) {
                if (mounted) {
                    setError(err instanceof Error ? err : new Error('Failed to fetch assets'));
                }
            }
            finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }
        fetchAssets();
        return () => {
            mounted = false;
        };
    }, [componentName, route]);
    return { assets, loading, error };
}
/**
 * Hook to fetch assets using natural language labels
 * @param labels - Array of natural language labels (e.g., ["breathing", "meditation"])
 */
export function useAssetsByLabels(labels) {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Stringify labels for stable dependency tracking
    const labelsKey = labels.join(',');
    useEffect(() => {
        let mounted = true;
        async function fetchAssets() {
            if (labels.length === 0) {
                setAssets([]);
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                setError(null);
                const data = await getAssetsByLabels(labels);
                if (mounted) {
                    setAssets(data);
                }
            }
            catch (err) {
                if (mounted) {
                    setError(err instanceof Error ? err : new Error('Failed to fetch assets'));
                }
            }
            finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }
        fetchAssets();
        return () => {
            mounted = false;
        };
    }, [labelsKey]); // Use stringified key
    return { assets, loading, error };
}
/**
 * Hook to filter assets by asset class with budget validation
 * @param assetClass - The asset class to filter by
 */
export function useAssetsByClass(assetClass) {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        let mounted = true;
        async function fetchAssets() {
            try {
                setLoading(true);
                setError(null);
                // Use component placement with asset class
                const data = await getAssetsByComponent('', '');
                const filtered = data.filter(asset => asset.category === assetClass);
                if (mounted) {
                    setAssets(filtered);
                }
            }
            catch (err) {
                if (mounted) {
                    setError(err instanceof Error ? err : new Error('Failed to fetch assets'));
                }
            }
            finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }
        fetchAssets();
        return () => {
            mounted = false;
        };
    }, [assetClass]);
    return { assets, loading, error };
}
/**
 * Hook for hero scene assets with automatic poster/loop detection
 * Respects prefers-reduced-motion: returns only poster if user prefers reduced motion
 */
export function useHeroScene(sceneId) {
    const [poster, setPoster] = useState(null);
    const [loop, setLoop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        let mounted = true;
        async function fetchSceneAssets() {
            try {
                setLoading(true);
                setError(null);
                const assets = await getAssetsByComponent('WalkthroughPresenter');
                const sceneAssets = assets.filter(asset => asset.scene_id === sceneId);
                if (mounted) {
                    const posterAsset = sceneAssets.find(a => a.type === 'hero-poster') || null;
                    const loopAsset = sceneAssets.find(a => a.type === 'hero-loop') || null;
                    setPoster(posterAsset);
                    // Respect prefers-reduced-motion
                    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                    setLoop(prefersReducedMotion ? null : loopAsset);
                }
            }
            catch (err) {
                if (mounted) {
                    setError(err instanceof Error ? err : new Error('Failed to fetch scene assets'));
                }
            }
            finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }
        fetchSceneAssets();
        return () => {
            mounted = false;
        };
    }, [sceneId]);
    return { poster, loop, loading, error };
}
