export interface StorageAsset {
  id: string;
  object_name: string;
  bucket_id: string;
  style?: string;
  dimension?: string;
  type?: string;
  description?: string;
  storage_path?: string;
  size_bytes?: number;
  url?: string;
  updated_at?: string;
  tags?: string[];
  asset_id?: string;
  checksum?: string;
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
  version?: string;
  immutable?: boolean;
}

export interface ImageTransformOptions {
  width?: number;
  height?: number;
  format?: "webp" | "avif" | "jpg" | "png";
  quality?: number;
}

export interface DesignTokenAsset {
  id: string;
  name: string;
  category: "color" | "typography" | "spacing" | "icon" | "image";
  value: any;
  tags?: string[];
  usage?: string;
  updated_at: string;
}

export interface SoundbiteTrackFrontend {
  track_id: string;
  sound_bite_id: string;
  code: string;
  type: string;
  title: string;
  pillar_id?: string;
  theme_id?: string;
  tag?: string;
  angle?: string;
  duration_ms?: number;
  bucket: string;
  object: string;
}

export interface SoundbiteTrackByCode {
  code: string;
  variants: SoundbiteTrackFrontend[];
}

export interface SignedDownloadUrlResponse {
  signed_url: string;
  expires_in: number;
}

export interface GenerateUploadUrlResponse {
  url: string;
  headers: Record<string, string>;
  expires_in: number;
}

export interface UserAudioItem {
  name: string;
  size: number;
  updated_at: string;
}

export interface FeedQueueItem {
  id: string;
  item_kind: string;
  content_type: string;
  content_id?: string;
  content_ref?: string;
  score?: number;
  priority?: number;
  arousal_fit?: number;
  context_tags?: string[];
  metadata?: any;
}

export interface ContentRegistryItem {
  id: string;
  title?: string;
  type?: string;
  metadata?: any;
}

export interface RecentListen {
  id: string;
  started_at: string | null;
  completed_at?: string | null;
  soundbite_asset_id?: string | null;
  user_soundbite_id?: string | null;
  intent?: string | null;
  band?: string | null;
  why_now?: string | null;
}

export interface FeedPullRequest {
  limit?: number;
  filters?: Record<string, any>;
}
