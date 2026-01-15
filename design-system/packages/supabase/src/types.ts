// Supabase integration types and interfaces

export interface StorageAsset {
  id: string;
  object_name: string;
  bucket_id: string;
  style: string;
  dimension: string;
  type: string;
  description: string;
  size_bytes?: number;
  url: string;
  updated_at: string;
  tags?: string[];
  asset_id?: string; // Optional: simplified key from filename
}

export interface AssetQueryOptions {
  style?: string;
  dimension?: string;
  type?: string;
  search?: string;
  limit?: number;
  offset?: number;
  tags?: string[];
}

export interface AssetFacets {
  styles: string[];
  dimensions: string[];
  types: string[];
}

export interface CacheOptions {
  version?: string; // For cache-busting (e.g., ?v=20260115)
  immutable?: boolean; // For immutable caching strategy
}

export interface ImageTransformOptions {
  width?: number;
  height?: number;
  format?: 'webp' | 'avif' | 'jpg' | 'png';
  quality?: number;
}

export interface AssetFacets {
  styles: string[];
  dimensions: string[];
  types: string[];
}

export interface DesignTokenAsset {
  id: string;
  name: string;
  category: 'color' | 'typography' | 'spacing' | 'icon' | 'image';
  value: any;
  tags?: string[];
  usage?: string;
  updated_at: string;
}