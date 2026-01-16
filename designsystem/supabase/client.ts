import {
  createClient,
  SupabaseClient as SbClient,
} from "@supabase/supabase-js";
import type {
  StorageAsset,
  AssetQueryOptions,
  AssetFacets,
  CacheOptions,
  ImageTransformOptions,
  SoundbiteTrackFrontend,
  SoundbiteTrackByCode,
  SignedDownloadUrlResponse,
  GenerateUploadUrlResponse,
  UserAudioItem,
  FeedQueueItem,
  FeedPullRequest,
  ContentRegistryItem,
  RecentListen,
} from "./types";

type ResolvedEnv = {
  url: string;
  anonKey: string;
  serviceKey?: string;
  cdnUrl?: string;
};

const resolveEnv = (): ResolvedEnv => {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    "";
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const cdnUrl =
    process.env.NEXT_PUBLIC_SUPABASE_CDN_URL ||
    process.env.VITE_SUPABASE_CDN_URL;

  if (!url) throw new Error("Supabase URL is required");
  if (!anonKey && !serviceKey)
    throw new Error("Supabase anon or service key is required");

  return { url, anonKey, serviceKey, cdnUrl };
};

class SupabaseClient {
  private readonly client: SbClient;
  private readonly serviceClient?: SbClient;
  private readonly functionsBase: string;
  private readonly cdnBaseUrl?: string;

  constructor() {
    const { url, anonKey, serviceKey, cdnUrl } = resolveEnv();

    this.client = createClient(url, anonKey || serviceKey || "", {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    if (serviceKey) {
      this.serviceClient = createClient(url, serviceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
    }

    this.functionsBase = `${url}/functions/v1`;
    this.cdnBaseUrl = cdnUrl;
  }

  private async getUserToken(): Promise<string | undefined> {
    const { data } = await this.client.auth.getSession();
    return data.session?.access_token || undefined;
  }

  private async authedFetch(
    path: string,
    init?: RequestInit
  ): Promise<Response> {
    const token = await this.getUserToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(init?.headers as Record<string, string> | undefined),
    };
    if (token) headers.Authorization = `Bearer ${token}`;
    return fetch(`${this.functionsBase}${path}`, { ...init, headers });
  }

  private async serviceFetch(
    path: string,
    init?: RequestInit
  ): Promise<Response> {
    if (!this.serviceClient)
      throw new Error("Service key required for this operation");
    const { url, serviceKey } = resolveEnv();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(init?.headers as Record<string, string> | undefined),
    };
    if (serviceKey) headers.Authorization = `Bearer ${serviceKey}`;
    return fetch(`${url}/functions/v1${path}`, { ...init, headers });
  }

  // View: v_soundbite_tracks_frontend
  async fetchSoundbiteTracksFrontend(
    limit = 50
  ): Promise<SoundbiteTrackFrontend[]> {
    const { data, error } = await this.client
      .from("v_soundbite_tracks_frontend")
      .select("*")
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  // View: v_soundbite_tracks_by_code
  async fetchSoundbiteTracksByCode(
    limit = 100
  ): Promise<SoundbiteTrackByCode[]> {
    const { data, error } = await this.client
      .from("v_soundbite_tracks_by_code")
      .select("*")
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  // RPC: list_recent_listens
  async listRecentListens(limit = 25): Promise<RecentListen[]> {
    const { data, error } = await this.client.rpc("list_recent_listens", {
      limit,
    });
    if (error) throw error;
    return data || [];
  }

  // Edge Function: sign-download-url
  async signDownloadUrl(params: {
    bucket: string;
    object: string;
    expiresIn?: number;
  }): Promise<SignedDownloadUrlResponse> {
    const res = await this.authedFetch("/sign-download-url", {
      method: "POST",
      body: JSON.stringify({ ...params, expiresIn: params.expiresIn }),
    });
    if (!res.ok)
      throw new Error(
        `sign-download-url failed: ${res.status} ${await res.text()}`
      );
    return res.json();
  }

  // Edge Function: generate-upload-url
  async generateUploadUrl(params: {
    bucket: string;
    object: string;
    contentType: string;
    expiresIn?: number;
  }): Promise<GenerateUploadUrlResponse> {
    const res = await this.authedFetch("/generate-upload-url", {
      method: "POST",
      body: JSON.stringify({ ...params, expiresIn: params.expiresIn }),
    });
    if (!res.ok)
      throw new Error(
        `generate-upload-url failed: ${res.status} ${await res.text()}`
      );
    return res.json();
  }

  // Edge Function: list-user-audio
  async listUserAudio(prefix: string): Promise<UserAudioItem[]> {
    const res = await this.authedFetch(
      `/list-user-audio?prefix=${encodeURIComponent(prefix)}`,
      {
        method: "GET",
      }
    );
    if (!res.ok)
      throw new Error(
        `list-user-audio failed: ${res.status} ${await res.text()}`
      );
    return res.json();
  }

  // Edge Function: rename-user-audio
  async renameUserAudio(params: { from: string; to: string }): Promise<void> {
    const res = await this.authedFetch("/rename-user-audio", {
      method: "POST",
      body: JSON.stringify(params),
    });
    if (!res.ok)
      throw new Error(
        `rename-user-audio failed: ${res.status} ${await res.text()}`
      );
  }

  // Edge Function: delete-user-audio
  async deleteUserAudio(params: { object: string }): Promise<void> {
    const res = await this.authedFetch("/delete-user-audio", {
      method: "POST",
      body: JSON.stringify(params),
    });
    if (!res.ok)
      throw new Error(
        `delete-user-audio failed: ${res.status} ${await res.text()}`
      );
  }

  // Edge Function: events-api (generic logging)
  async logEvent(event: {
    type: string;
    payload: Record<string, any>;
  }): Promise<void> {
    const res = await this.authedFetch("/events-api", {
      method: "POST",
      body: JSON.stringify(event),
    });
    if (!res.ok)
      throw new Error(`events-api failed: ${res.status} ${await res.text()}`);
  }

  // Edge Function: v1_feed_pull
  async feedPull(body: FeedPullRequest = {}): Promise<FeedQueueItem[]> {
    const res = await this.authedFetch("/v1_feed_pull", {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!res.ok)
      throw new Error(`v1_feed_pull failed: ${res.status} ${await res.text()}`);
    return res.json();
  }

  // Direct query: user_feed_queue_v2 (alternative to function)
  async fetchFeedQueue(limit = 20): Promise<FeedQueueItem[]> {
    const { data, error } = await this.client
      .from("user_feed_queue_v2")
      .select("*")
      .lte("scheduled_for", new Date().toISOString())
      .is("surfaced_at", null)
      .order("priority", { ascending: false })
      .order("queued_at", { ascending: true })
      .limit(limit);
    if (error) throw error;
    return data || [];
  }

  async fetchContentRegistryById(
    id: string
  ): Promise<ContentRegistryItem | null> {
    const { data, error } = await this.client
      .from("content_registry")
      .select("*")
      .eq("id", id)
      .limit(1)
      .single();
    if (error && error.code !== "PGRST116") throw error;
    return data || null;
  }

  // Legacy storage assets helpers (retain for compatibility)
  async queryStorageAssets(
    options: AssetQueryOptions = {}
  ): Promise<StorageAsset[]> {
    let query = this.client.from("storage_assets").select("*");

    if (options.style) query = query.eq("style", options.style);
    if (options.dimension) query = query.eq("dimension", options.dimension);
    if (options.type) query = query.eq("type", options.type);
    if (options.search)
      query = query.ilike("description", `%${options.search}%`);
    if (options.tags && options.tags.length > 0)
      query = query.overlaps("tags", options.tags);
    if (options.limit) query = query.limit(options.limit);
    if (options.offset) {
      const limit = options.limit || 20;
      query = query.range(options.offset, options.offset + limit - 1);
    }
    query = query.order("style").order("description");

    const { data, error } = await query;
    if (error) return [];
    return data || [];
  }

  async getAssetFacets(): Promise<AssetFacets> {
    const [stylesResult, dimensionsResult, typesResult] = await Promise.all([
      this.client.from("storage_assets").select("style").neq("style", null),
      this.client
        .from("storage_assets")
        .select("dimension")
        .neq("dimension", null),
      this.client.from("storage_assets").select("type").neq("type", null),
    ]);

    const styles = [
      ...new Set(stylesResult.data?.map((d) => d.style).filter(Boolean)),
    ].sort((a, b) => a.localeCompare(b));
    const dimensions = [
      ...new Set(
        dimensionsResult.data?.map((d) => d.dimension).filter(Boolean)
      ),
    ].sort((a, b) => a.localeCompare(b));
    const types = [
      ...new Set(typesResult.data?.map((d) => d.type).filter(Boolean)),
    ].sort((a, b) => a.localeCompare(b));

    return { styles, dimensions, types };
  }

  async getAssetsByStyle(
    style: string,
    options: { type?: string; limit?: number } = {}
  ): Promise<StorageAsset[]> {
    return this.queryStorageAssets({
      style,
      type: options.type,
      limit: options.limit || 50,
    });
  }

  async getHeroAssets(
    options: { style?: string; limit?: number } = {}
  ): Promise<StorageAsset[]> {
    const heroStyles = ["neural_flower", "flowstate", "evolvingforms"];
    if (options.style && heroStyles.includes(options.style)) {
      return this.getAssetsByStyle(options.style, { limit: options.limit });
    }
    const assets: StorageAsset[] = [];
    for (const style of heroStyles) {
      const styleAssets = await this.getAssetsByStyle(style, {
        limit: Math.ceil((options.limit || 20) / heroStyles.length),
      });
      assets.push(...styleAssets);
    }
    return assets.slice(0, options.limit || 20);
  }

  async getAssetsForContext(
    context: string,
    limit = 20
  ): Promise<StorageAsset[]> {
    const contextMappings: Record<string, string[]> = {
      meditation: ["neural_flower", "flowstate", "neural_flow"],
      reflection: ["neural_flower", "evolvingforms", "mindblock"],
      healing: ["neural_flower", "evolvingforms", "flowstate"],
      focus: ["flowstate", "neural_flow", "mindblock"],
      growth: ["evolvingforms", "neural_flower", "neural_flow"],
      calm: ["flowstate", "neural_flower", "neural_flow"],
      breakthrough: ["mindblock", "evolvingforms", "neural_flower"],
    };

    const relevantStyles = contextMappings[context.toLowerCase()] || [
      "neural_flower",
      "flowstate",
    ];
    const assets: StorageAsset[] = [];
    for (const style of relevantStyles) {
      const styleAssets = await this.getAssetsByStyle(style, {
        limit: Math.ceil(limit / relevantStyles.length),
      });
      assets.push(...styleAssets);
    }
    return assets.slice(0, limit);
  }

  private generateCdnUrl(
    path: string,
    bucket = "assets",
    options?: CacheOptions & ImageTransformOptions
  ): string {
    if (!path) return "";
    const { url } = resolveEnv();
    if (!this.cdnBaseUrl) {
      return `${url}/storage/v1/object/public/${bucket}/${path}`;
    }

    let final = `${this.cdnBaseUrl}/${path}`;
    const params = new URLSearchParams();

    if (options?.version) params.set("v", options.version);
    if (options?.width) params.set("width", options.width.toString());
    if (options?.height) params.set("height", options.height.toString());
    if (options?.format) params.set("format", options.format);
    if (options?.quality) params.set("quality", options.quality.toString());

    const query = params.toString();
    if (query) final += `?${query}`;
    return final;
  }

  getAssetUrl(
    asset: StorageAsset,
    options?: CacheOptions & ImageTransformOptions
  ): string {
    return this.generateCdnUrl(
      asset.storage_path || asset.object_name,
      asset.bucket_id,
      options
    );
  }

  getResponsiveImageUrls(asset: StorageAsset, breakpoints: number[]): string[] {
    return breakpoints.map((width) =>
      this.generateCdnUrl(
        asset.storage_path || asset.object_name,
        asset.bucket_id,
        { width, format: "webp" }
      )
    );
  }

  getFallbackImageUrls(asset: StorageAsset): {
    webp: string;
    avif: string;
    original: string;
  } {
    const basePath = asset.storage_path || asset.object_name;
    return {
      webp: this.generateCdnUrl(basePath, asset.bucket_id, { format: "webp" }),
      avif: this.generateCdnUrl(basePath, asset.bucket_id, { format: "avif" }),
      original: this.generateCdnUrl(basePath, asset.bucket_id),
    };
  }

  async syncAssetGovernance(): Promise<void> {
    if (!this.serviceClient)
      throw new Error("Service key required for governance sync");

    const { data: assets, error } = await this.serviceClient
      .from("storage_assets")
      .select("*")
      .like("object_name", "recoverlution-assets/brand/%");

    if (error || !assets)
      throw new Error(`Failed to fetch assets: ${error?.message}`);

    for (const asset of assets) {
      const governanceTags = this.generateUniversalTags(asset);
      await this.serviceClient
        .from("storage_assets")
        .update({ tags: governanceTags, updated_at: new Date().toISOString() })
        .eq("id", asset.id);
    }
  }

  private generateUniversalTags(asset: StorageAsset): string[] {
    const tags: string[] = ["therapeutic"];
    const style = (asset.style || "").toLowerCase();
    if (style.includes("neural_flower"))
      tags.push("growth", "reflection", "beauty", "neural");
    else if (style.includes("flowstate"))
      tags.push("flow", "harmony", "balance", "engagement");
    else if (style.includes("evolvingforms"))
      tags.push("transformation", "change", "evolution");

    if (asset.type) tags.push(asset.type.toLowerCase());
    if (asset.dimension)
      tags.push(asset.dimension.toLowerCase().replace(":", "-"));
    return [...new Set(tags)];
  }
}

export const supabaseClient = new SupabaseClient();
export default supabaseClient;
