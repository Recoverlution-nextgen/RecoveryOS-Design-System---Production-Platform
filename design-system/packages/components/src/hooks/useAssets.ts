import { useState, useEffect } from 'react';
import { supabaseClient, type StorageAsset, type AssetQueryOptions } from '@design-system/supabase';

export function useAssets(options: AssetQueryOptions = {}) {
  const [assets, setAssets] = useState<StorageAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAssets() {
      try {
        setLoading(true);
        const data = await supabaseClient.queryStorageAssets(options);
        setAssets(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch assets');
      } finally {
        setLoading(false);
      }
    }

    fetchAssets();
  }, [JSON.stringify(options)]);

  return { assets, loading, error };
}

export function useHeroAssets(limit = 10) {
  return useAssets({}).then(({ assets, ...rest }) => ({
    assets: assets.slice(0, limit),
    ...rest
  }));
}

export function useAssetsByStyle(style: string, type?: string, limit = 50) {
  return useAssets({ style, type, limit });
}

export function useAssetsForContext(context: string, limit = 20) {
  const [assets, setAssets] = useState<StorageAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContextAssets() {
      try {
        setLoading(true);
        const data = await supabaseClient.getAssetsForContext(context, limit);
        setAssets(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch context assets');
      } finally {
        setLoading(false);
      }
    }

    fetchContextAssets();
  }, [context, limit]);

  return { assets, loading, error };
}