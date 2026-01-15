import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// packages/ui/src/components/UniversalAsset.tsx
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
export function UniversalAsset({ style, dimension = '5:4', type, description, therapeuticFocus, priority = false, lazy = true, className = '', onLoad, onError }) {
    const [asset, setAsset] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchAsset();
    }, [style, dimension, type, description, therapeuticFocus]);
    const fetchAsset = async () => {
        try {
            setLoading(true);
            setError(null);
            let query = supabase
                .from('storage_assets')
                .select('*')
                .eq('dimension', dimension)
                .order('updated_at', { ascending: false });
            // Apply filters flexibly
            if (style) {
                query = query.eq('style', style);
            }
            if (type) {
                query = query.ilike('type', type);
            }
            if (description) {
                query = query.ilike('description', `%${description}%`);
            }
            // For therapeutic focus, we'd need to join with assets table
            // This is a simplified version - in practice you'd want to query
            // the assets table for governance tags and then get the storage URL
            const { data, error: fetchError } = await query.limit(1).single();
            if (fetchError) {
                throw new Error(`Failed to fetch asset: ${fetchError.message}`);
            }
            setAsset(data);
            onLoad?.();
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error('Unknown error');
            setError(error);
            onError?.(error);
        }
        finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (_jsx("div", { className: `universal-asset-loading ${className}`, children: _jsx("div", { className: "animate-pulse bg-gray-200 rounded-lg h-64 w-full" }) }));
    }
    if (error || !asset) {
        return (_jsx("div", { className: `universal-asset-error ${className}`, children: _jsx("div", { className: "bg-gray-100 rounded-lg h-64 w-full flex items-center justify-center", children: _jsx("span", { className: "text-gray-500", children: "Asset not available" }) }) }));
    }
    // Universal asset display with format fallbacks
    return (_jsxs("picture", { className: `universal-asset ${className}`, children: [asset.type === 'avif' && (_jsx("source", { srcSet: asset.url, type: "image/avif" })), asset.type === 'webp' && (_jsx("source", { srcSet: asset.url, type: "image/webp" })), _jsx("img", { src: asset.url, alt: asset.description, loading: lazy && !priority ? 'lazy' : 'eager', decoding: "async", className: "w-full h-auto", onLoad: onLoad, onError: (e) => {
                    const error = new Error(`Failed to load image: ${asset.url}`);
                    setError(error);
                    onError?.(error);
                } })] }));
}
// Hook for flexible asset querying
export function useUniversalAssets(filters) {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchAssets = async () => {
        try {
            setLoading(true);
            setError(null);
            let query = supabase
                .from('storage_assets')
                .select('*')
                .order('style', { ascending: true })
                .order('description', { ascending: true });
            if (filters.style) {
                query = query.eq('style', filters.style);
            }
            if (filters.dimension) {
                query = query.eq('dimension', filters.dimension);
            }
            if (filters.type) {
                query = query.ilike('type', filters.type);
            }
            if (filters.search) {
                query = query.ilike('description', `%${filters.search}%`);
            }
            if (filters.limit) {
                query = query.limit(filters.limit);
            }
            const { data, error: fetchError } = await query;
            if (fetchError) {
                throw new Error(`Failed to fetch assets: ${fetchError.message}`);
            }
            setAssets(data || []);
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error('Unknown error');
            setError(error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchAssets();
    }, [filters.style, filters.dimension, filters.type, filters.search, filters.limit]);
    return { assets, loading, error, refetch: fetchAssets };
}
// Governance-aware asset selection
export function useGovernanceAssets(therapeuticContext, limit = 10) {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchAssets = async () => {
        try {
            setLoading(true);
            setError(null);
            // This would query the assets table for governance tags
            // and then join with storage_assets for the URLs
            // For now, using a simplified approach
            const { data, error: fetchError } = await supabase
                .from('storage_assets')
                .select('*')
                .order('updated_at', { ascending: false })
                .limit(limit);
            if (fetchError) {
                throw new Error(`Failed to fetch governance assets: ${fetchError.message}`);
            }
            setAssets(data || []);
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error('Unknown error');
            setError(error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchAssets();
    }, [therapeuticContext, limit]);
    return { assets, loading, error, refetch: fetchAssets };
}
