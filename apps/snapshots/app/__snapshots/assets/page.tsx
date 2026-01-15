'use client';

import React, { useState, useEffect } from 'react';
import { getAssetsByContext } from '@recoverlution/assets';

export default function AssetsPage() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAssets() {
      try {
        const meditationAssets = await getAssetsByContext('meditation', 12);
        setAssets(meditationAssets);
      } catch (error) {
        console.error('Failed to load assets:', error);
      } finally {
        setLoading(false);
      }
    }

    loadAssets();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">Loading assets...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Asset Gallery</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {assets.map((asset) => (
          <div key={asset.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-square bg-gray-100 relative">
              <picture>
                <source
                  srcSet={`${asset.storage_path}?width=400&format=webp`}
                  type="image/webp"
                />
                <img
                  src={`${asset.storage_path}?width=400`}
                  alt={asset.description || asset.style}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </picture>

              {/* Glass Carve Overlay Example */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="px-4 py-2 rounded-lg text-center"
                  style={{
                    backgroundColor: 'var(--asset-type-paper-white)',
                    color: 'var(--asset-type-paper-text)',
                    textShadow: '0 1px 2px var(--asset-type-paper-shadow)',
                    fontSize: 'var(--overlay-text-sm)',
                    fontWeight: 'var(--overlay-weight-medium)'
                  }}
                >
                  Inner Peace
                </div>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-sm mb-1">{asset.style}</h3>
              <p className="text-xs text-gray-600 mb-2">{asset.dimension}</p>
              <div className="flex flex-wrap gap-1">
                {asset.tags?.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {assets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No assets available. Check Supabase connection.</p>
        </div>
      )}
    </div>
  );
}