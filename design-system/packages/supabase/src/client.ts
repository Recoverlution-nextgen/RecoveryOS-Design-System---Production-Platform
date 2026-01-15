import { createClient } from '@supabase/supabase-js';
import type { StorageAsset, AssetQueryOptions, AssetFacets, CacheOptions, ImageTransformOptions } from './types';

// Supabase configuration - these should be set in environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SUPABASE_URL) {
  throw new Error('VITE_SUPABASE_URL environment variable is required');
}

class SupabaseClient {
  private client;
  private serviceClient;
  private cdnBaseUrl?: string;

  constructor() {
    // Public client for queries
    this.client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY || SUPABASE_SERVICE_KEY || '', {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    // Service client for admin operations (if service key available)
    if (SUPABASE_SERVICE_KEY) {
      this.serviceClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
        auth: { autoRefreshToken: false, persistSession: false }
      });
    }

    // Set CDN base URL if available (for faster asset loading)
    this.cdnBaseUrl = process.env.VITE_SUPABASE_CDN_URL;
  }

  // Query storage assets with flexible filtering
  async queryStorageAssets(options: AssetQueryOptions = {}): Promise<StorageAsset[]> {
    let query = this.client
      .from('storage_assets')
      .select('*');

    if (options.style) {
      query = query.eq('style', options.style);
    }

    if (options.dimension) {
      query = query.eq('dimension', options.dimension);
    }

    if (options.type) {
      query = query.eq('type', options.type);
    }

    if (options.search) {
      query = query.ilike('description', `%${options.search}%`);
    }

    if (options.tags && options.tags.length > 0) {
      // Use overlap operator for array intersection
      query = query.overlaps('tags', options.tags);
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.offset) {
      const limit = options.limit || 20;
      query = query.range(options.offset, options.offset + limit - 1);
    }

    query = query.order('style').order('description');

    const { data, error } = await query;

    if (error) {
      console.error('Error querying storage assets:', error);
      return [];
    }

    return data || [];
  }

  // Get distinct values for filters
  async getAssetFacets(): Promise<AssetFacets> {
    const [stylesResult, dimensionsResult, typesResult] = await Promise.all([
      this.client.from('storage_assets').select('style').neq('style', null),
      this.client.from('storage_assets').select('dimension').neq('dimension', null),
      this.client.from('storage_assets').select('type').neq('type', null)
    ]);

    const styles = [...new Set(stylesResult.data?.map(d => d.style).filter(Boolean))].sort();
    const dimensions = [...new Set(dimensionsResult.data?.map(d => d.dimension).filter(Boolean))].sort();
    const types = [...new Set(typesResult.data?.map(d => d.type).filter(Boolean))].sort();

    return { styles, dimensions, types };
  }

  // Get assets by style
  async getAssetsByStyle(style: string, options: { type?: string; limit?: number } = {}): Promise<StorageAsset[]> {
    return this.queryStorageAssets({
      style,
      type: options.type,
      limit: options.limit || 50
    });
  }

  // Get hero-worthy assets
  async getHeroAssets(options: { style?: string; limit?: number } = {}): Promise<StorageAsset[]> {
    const heroStyles = ['neural_flower', 'flowstate', 'evolvingforms'];

    if (options.style && heroStyles.includes(options.style)) {
      return this.getAssetsByStyle(options.style, { limit: options.limit });
    }

    // Get mix of hero-worthy assets
    const assets = [];
    for (const style of heroStyles) {
      const styleAssets = await this.getAssetsByStyle(style, { limit: Math.ceil((options.limit || 20) / heroStyles.length) });
      assets.push(...styleAssets);
    }

    return assets.slice(0, options.limit || 20);
  }

  // Get assets for specific contexts
  async getAssetsForContext(context: string, limit = 20): Promise<StorageAsset[]> {
    const contextMappings: Record<string, string[]> = {
      'meditation': ['neural_flower', 'flowstate', 'neural_flow'],
      'reflection': ['neural_flower', 'evolvingforms', 'mindblock'],
      'healing': ['neural_flower', 'evolvingforms', 'flowstate'],
      'focus': ['flowstate', 'neural_flow', 'mindblock'],
      'growth': ['evolvingforms', 'neural_flower', 'neural_flow'],
      'calm': ['flowstate', 'neural_flower', 'neural_flow'],
      'breakthrough': ['mindblock', 'evolvingforms', 'neural_flower']
    };

    const relevantStyles = contextMappings[context.toLowerCase()] || ['neural_flower', 'flowstate'];

    const assets = [];
    for (const style of relevantStyles) {
      const styleAssets = await this.getAssetsByStyle(style, { limit: Math.ceil(limit / relevantStyles.length) });
      assets.push(...styleAssets);
    }

    return assets.slice(0, limit);
  }

  /**
   * Generate CDN URL with caching and transformation options
   */
  private generateCdnUrl(path: string, options?: CacheOptions & ImageTransformOptions): string {
    if (!this.cdnBaseUrl) {
      // Fallback to Supabase storage URL
      return `${SUPABASE_URL}/storage/v1/object/public/assets/${path}`;
    }

    let url = `${this.cdnBaseUrl}/${path}`;

    // Add cache-busting version parameter
    if (options?.version) {
      url += `?v=${options.version}`;
    }

    // Add image transformation parameters
    if (options && (options.width || options.height || options.format || options.quality)) {
      const params = new URLSearchParams();

      if (options.width) params.set('width', options.width.toString());
      if (options.height) params.set('height', options.height.toString());
      if (options.format) params.set('format', options.format);
      if (options.quality) params.set('quality', options.quality.toString());

      url += (options.version ? '&' : '?') + params.toString();
    }

    return url;
  }

  /**
   * Get asset URL with optional CDN and transformation options
   */
  getAssetUrl(asset: StorageAsset, options?: CacheOptions & ImageTransformOptions): string {
    return this.generateCdnUrl(asset.storage_path, options);
  }

  /**
   * Get responsive image URLs for different breakpoints
   */
  getResponsiveImageUrls(asset: StorageAsset, breakpoints: number[]): string[] {
    return breakpoints.map(width =>
      this.generateCdnUrl(asset.storage_path, { width, format: 'webp' })
    );
  }

  /**
   * Get fallback image URLs (WebP, AVIF, original)
   */
  getFallbackImageUrls(asset: StorageAsset): { webp: string; avif: string; original: string } {
    return {
      webp: this.generateCdnUrl(asset.storage_path, { format: 'webp' }),
      avif: this.generateCdnUrl(asset.storage_path, { format: 'avif' }),
      original: this.generateCdnUrl(asset.storage_path)
    };
  }

  // Sync governance tags (admin operation)
  async syncAssetGovernance(): Promise<void> {
    if (!this.serviceClient) {
      throw new Error('Service key required for governance sync');
    }

    console.log('🔄 Syncing universal governance tags...');

    const { data: assets, error } = await this.serviceClient
      .from('storage_assets')
      .select('*')
      .like('object_name', 'recoverlution-assets/brand/%');

    if (error || !assets) {
      throw new Error(`Failed to fetch assets: ${error?.message}`);
    }

    // Generate and update tags for each asset
    for (const asset of assets) {
      const governanceTags = this.generateUniversalTags(asset);

      await this.serviceClient
        .from('storage_assets')
        .update({
          tags: governanceTags,
          updated_at: new Date().toISOString()
        })
        .eq('id', asset.id);
    }

    console.log(`✅ Updated ${assets.length} assets with governance tags`);
  }

  // Generate universal governance tags
  private generateUniversalTags(asset: StorageAsset): string[] {
    const tags: string[] = ['therapeutic'];

    // Add style-based tags
    const style = asset.style.toLowerCase();
    if (style.includes('neural_flower')) {
      tags.push('growth', 'reflection', 'beauty', 'neural');
    } else if (style.includes('flowstate')) {
      tags.push('flow', 'harmony', 'balance', 'engagement');
    } else if (style.includes('evolvingforms')) {
      tags.push('transformation', 'change', 'evolution');
    }

    // Add type and dimension tags
    tags.push(asset.type.toLowerCase());
    tags.push(asset.dimension.toLowerCase().replace(':', '-'));

    return [...new Set(tags)];
  }
}

// Export singleton instance
export const supabaseClient = new SupabaseClient();
export default supabaseClient;