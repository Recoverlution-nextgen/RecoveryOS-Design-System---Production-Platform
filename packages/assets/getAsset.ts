import { supabaseClient, ImageOptimizationUtils } from '@recoverlution/supabase';
import type { StorageAsset, AssetQueryOptions } from '@recoverlution/supabase';

/**
 * Asset query and fallback rules for Recoverlution platform
 * Handles association/world/state/tags/format selection with intelligent fallbacks
 */

export interface AssetQuery {
  // Primary selectors
  style?: string;
  dimension?: string;
  type?: string;

  // Semantic selectors
  association?: 'personal' | 'universal';
  world?: string;
  state?: string;

  // Tag-based selection
  tags?: string[];
  intent?: string;
  context?: string;

  // Format preferences
  format?: 'webp' | 'avif' | 'jpg' | 'png';

  // Performance options
  width?: number;
  height?: number;
  quality?: number;
}

export interface AssetResult {
  asset: StorageAsset | null;
  url: string | null;
  fallbacks: {
    webp: string | null;
    avif: string | null;
    original: string | null;
  };
  metadata: {
    cacheVersion: string;
    optimized: boolean;
    fromCache: boolean;
  };
}

/**
 * Get a single asset with intelligent fallback rules
 */
export async function getAsset(query: AssetQuery): Promise<AssetResult> {
  const {
    style,
    dimension,
    type,
    association,
    world,
    state,
    tags,
    intent,
    context,
    format = 'webp',
    width,
    height,
    quality = 85
  } = query;

  // Build query options with fallbacks
  const queryOptions: AssetQueryOptions = {
    style,
    dimension,
    type,
    limit: 1
  };

  // Add semantic tag filtering
  if (tags || intent || context) {
    const semanticTags = [
      ...(tags || []),
      ...(intent ? [`intent.${intent}`] : []),
      ...(context ? [`context.${context}`] : []),
      ...(association ? [`association.${association}`] : []),
      ...(world ? [`world.${world}`] : []),
      ...(state ? [`state.${state}`] : [])
    ];

    if (semanticTags.length > 0) {
      queryOptions.tags = semanticTags;
    }
  }

  // Query assets
  const assets = await supabaseClient.queryStorageAssets(queryOptions);

  if (assets.length === 0) {
    return {
      asset: null,
      url: null,
      fallbacks: { webp: null, avif: null, original: null },
      metadata: {
        cacheVersion: '',
        optimized: false,
        fromCache: false
      }
    };
  }

  const asset = assets[0];

  // Generate URLs with optimization
  const transformOptions = {
    width,
    height,
    format,
    quality
  };

  const url = supabaseClient.getAssetUrl(asset, transformOptions);
  const fallbacks = supabaseClient.getFallbackImageUrls(asset);
  const cacheVersion = ImageOptimizationUtils.generateCacheVersion(asset);

  return {
    asset,
    url,
    fallbacks,
    metadata: {
      cacheVersion,
      optimized: !!(width || height || format !== 'jpg'),
      fromCache: false // TODO: Implement cache checking
    }
  };
}

/**
 * Get multiple assets for a context with pagination
 */
export async function getAssets(
  query: AssetQuery & { limit?: number; offset?: number }
): Promise<StorageAsset[]> {
  const {
    style,
    dimension,
    type,
    association,
    world,
    state,
    tags,
    intent,
    context,
    limit = 20,
    offset = 0
  } = query;

  const queryOptions: AssetQueryOptions = {
    style,
    dimension,
    type,
    limit,
    offset
  };

  // Add semantic tag filtering
  if (tags || intent || context) {
    const semanticTags = [
      ...(tags || []),
      ...(intent ? [`intent.${intent}`] : []),
      ...(context ? [`context.${context}`] : []),
      ...(association ? [`association.${association}`] : []),
      ...(world ? [`world.${world}`] : []),
      ...(state ? [`state.${state}`] : [])
    ];

    if (semanticTags.length > 0) {
      queryOptions.tags = semanticTags;
    }
  }

  return supabaseClient.queryStorageAssets(queryOptions);
}

/**
 * Get assets by therapeutic context with smart fallbacks
 */
export async function getAssetsByContext(
  context: string,
  options: { limit?: number; style?: string } = {}
): Promise<StorageAsset[]> {
  const { limit = 10, style } = options;

  // Context mapping with fallback styles
  const contextMappings: Record<string, string[]> = {
    'meditation': ['neural_flower', 'flowstate', 'neural_flow'],
    'reflection': ['neural_flower', 'evolvingforms', 'mindblock'],
    'healing': ['neural_flower', 'evolvingforms', 'flowstate'],
    'focus': ['flowstate', 'neural_flow', 'mindblock'],
    'growth': ['evolvingforms', 'neural_flower', 'neural_flow'],
    'calm': ['flowstate', 'neural_flower', 'neural_flow'],
    'breakthrough': ['mindblock', 'evolvingforms', 'neural_flower'],
    'recovery': ['neural_flower', 'flowstate', 'evolvingforms']
  };

  const relevantStyles = contextMappings[context.toLowerCase()] || ['neural_flower'];

  // If specific style requested, prioritize it
  if (style && relevantStyles.includes(style)) {
    return supabaseClient.getAssetsByStyle(style, { limit });
  }

  // Get mix from relevant styles
  const assets = [];
  for (const styleName of relevantStyles) {
    const styleAssets = await supabaseClient.getAssetsByStyle(styleName, {
      limit: Math.ceil(limit / relevantStyles.length)
    });
    assets.push(...styleAssets);
  }

  return assets.slice(0, limit);
}

/**
 * Preload critical assets for performance
 */
export function preloadAsset(asset: StorageAsset, priority: 'high' | 'low' = 'low'): void {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = supabaseClient.getAssetUrl(asset);
  link.crossOrigin = 'anonymous';

  if (priority === 'high') {
    link.fetchPriority = 'high';
  }

  document.head.appendChild(link);
}