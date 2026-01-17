/**
 * SOUNDBITES API v2.1
 * LUMA-orchestrated soundbite delivery with state-aware routing
 * 
 * EDGE FUNCTION: https://wzeqlkbmqxlsjryidagf.supabase.co/functions/v1/soundbites
 * 
 * Four Endpoints:
 * 1. GET /soundbites/next?intent=X&band=Y → LUMA picks next soundbite
 * 2. GET /soundbites/mine → User's personal soundbites (SPACKs)
 * 3. POST /soundbites/sessions → Track playback session (start)
 * 4. PATCH /soundbites/sessions/:id → Update session (completion + metrics)
 * 
 * Data Sources:
 * - v_soundbite_playable (VIEW) → Frontend DTO for platform soundbites
 * - v_user_personal_soundbites (VIEW) → Frontend DTO for personal soundbites
 * - soundbite_playback_sessions (TABLE) → Measurement/telemetry
 * 
 * PROJECT: wzeqlkbmqxlsjryidagf (unified database + storage)
 */

import { createClient } from './client';
import { projectId, publicAnonKey } from './info';

const SOUNDBITES_API = `https://${projectId}.supabase.co/functions/v1/soundbites`;

// ==================== TYPE DEFINITIONS ====================

/**
 * LEGACY: Old soundbite_all VIEW format (still used for bulk fetching)
 */
export interface SoundbiteRecord {
  id: string;
  code: string;
  pillar_id: string;
  pillar_rank: number;
  code_num: number;
  
  theme_id?: string;
  guru_id?: string;
  tag?: string;
  angle?: string;
  
  // Spark track
  spark_title?: string;
  spark_audio_path?: string;
  spark_public_url?: string;
  
  // Flame track
  flame_title?: string;
  flame_audio_path?: string;
  flame_public_url?: string;
  
  // Ember track
  ember_title?: string;
  ember_audio_path?: string;
  ember_public_url?: string;
}

/**
 * NEW: v_soundbite_playable VIEW format (LUMA-ready DTO)
 */
export interface PlayableSoundbite {
  id: string;
  code: string;
  type: 'spark' | 'flame' | 'ember';
  display_text: string;
  intent?: string;
  pillar_id: string;
  theme_id?: string;
  primary_schema_ids?: string[];
  tags?: string[];
  state_band_min?: number;
  state_band_max?: number;
  duration_ms?: number;
  audio_asset_id?: string;
  version?: number;
}

/**
 * NEW: v_user_personal_soundbites VIEW format (user SPACKs)
 */
export interface PersonalSoundbite {
  id: string;
  user_id: string;
  audio_path: string;
  transcript?: string;
  intent?: string;
  visibility: 'private_only' | 'therapist_shared' | 'family_shared';
  context_tags?: string[];
  created_at: string;
  updated_at: string;
  captured_at?: string;
  energy?: number;
  clarity?: number;
  connection?: number;
}

/**
 * LEGACY: Unified track format for LUMA Play
 */
export interface LibraryTrack {
  id: string;
  type: 'spark' | 'flame' | 'ember';
  code: string;
  title: string;
  audioUrl: string;
  pillarId: string;
  themeId?: string;
  tag?: string;
  angle?: string;
}

/**
 * NEW: Playback session request body
 */
export interface PlaybackSessionRequest {
  soundbite_asset_id?: string | null;
  user_soundbite_id?: string | null;
  intent?: string | null;
  band?: number | null;
  why_now?: {
    your_state?: string;
    why_this?: string;
    expected_effect?: string;
    authority?: string;
    next_step?: string;
  } | null;
  pre_state?: {
    energy?: number;
    clarity?: number;
    arousal?: number;
    connection?: number;
  } | null;
  post_state?: {
    energy?: number;
    clarity?: number;
    arousal?: number;
    connection?: number;
  } | null;
  device?: string | null;
  app_version?: string | null;
}

/**
 * NEW: Playback session response
 */
export interface PlaybackSession {
  id: string;
  started_at: string;
}

/**
 * NEW: Session update request (PATCH)
 * All fields optional — at least one required
 * 
 * NOTE: Frontend uses `ended_at`, but backend expects `completed_at`
 * The updatePlaybackSession function handles this mapping automatically.
 */
export interface SessionUpdateRequest {
  ended_at?: string | null;  // ISO timestamp (mapped to completed_at in API)
  post_state?: {
    energy?: number;
    clarity?: number;
    arousal?: number;
    connection?: number;
  } | null;
  band?: number | null;  // Updated state band (sent as string to API)
  why_now?: {
    your_state?: string;
    why_this?: string;
    expected_effect?: string;
    authority?: string;
    next_step?: string;
  } | null;
  device?: string | null;
  app_version?: string | null;
  metrics?: {
    completed?: boolean;          // User listened to end
    skipped?: boolean;            // User skipped before end
    saved?: boolean;              // User saved to favorites
    loop_count?: number;          // Times replayed
    led_to_practice?: boolean;    // Opened NaviCue/practice after
    led_to_receipt?: boolean;     // Captured receipt after
    duration_listened_ms?: number; // Actual time listened
  } | null;
}

/**
 * NEW: Session update response
 */
export interface SessionUpdateResponse {
  session: {
    id: string;
    started_at: string;
    ended_at?: string;
    updated_at: string;
  };
}

// ==================== LUMA ORCHESTRATION API ====================

/**
 * GET NEXT SOUNDBITE (LUMA-Orchestrated)
 * Ask LUMA to pick the next soundbite based on user state + intent
 * 
 * @param intent - User's current intent (e.g., 'downshift', 'ground', 'clarity')
 * @param band - State band (1-10, where 1=calm, 10=crisis)
 * @returns Soundbite picked by LUMA's pick_soundbite RPC, or null
 */
export async function getNextSoundbite(
  intent?: string,
  band?: number
): Promise<PlayableSoundbite | null> {
  try {
    const params = new URLSearchParams();
    if (intent) params.append('intent', intent);
    if (band !== undefined) params.append('band', band.toString());

    const response = await fetch(`${SOUNDBITES_API}/next?${params}`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('[Soundbites] GET /next failed:', error);
      return null;
    }

    const { soundbite } = await response.json();
    console.log('[Soundbites] LUMA picked:', soundbite?.code || 'none');
    return soundbite;
  } catch (error) {
    console.error('[Soundbites] Error fetching next soundbite:', error);
    return null;
  }
}

/**
 * GET MY PERSONAL SOUNDBITES (SPACKs)
 * Fetch all personal soundbites created by the current user
 * 
 * @returns Array of user's personal soundbites
 */
export async function getMyPersonalSoundbites(): Promise<PersonalSoundbite[]> {
  try {
    const response = await fetch(`${SOUNDBITES_API}/mine`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('[Soundbites] GET /mine failed:', error);
      return [];
    }

    const { items } = await response.json();
    console.log('[Soundbites] Loaded personal soundbites:', items.length);
    return items;
  } catch (error) {
    console.error('[Soundbites] Error fetching personal soundbites:', error);
    return [];
  }
}

/**
 * CREATE PLAYBACK SESSION
 * Track that a soundbite was played, including state pre/post and WhyNow explanation
 * 
 * @param session - Session metadata (state, intent, device, etc.)
 * @returns Created session with ID and timestamp
 */
export async function createPlaybackSession(
  session: PlaybackSessionRequest
): Promise<PlaybackSession | null> {
  try {
    const response = await fetch(`${SOUNDBITES_API}/sessions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('[Soundbites] POST /sessions failed:', error);
      return null;
    }

    const { session: created } = await response.json();
    console.log('[Soundbites] Session created:', created.id);
    return created;
  } catch (error) {
    console.error('[Soundbites] Error creating playback session:', error);
    return null;
  }
}

/**
 * UPDATE PLAYBACK SESSION (PATCH)
 * Complete a session with post-state, metrics, and behavioral signals
 * 
 * NOTE: Automatically maps frontend `ended_at` → backend `completed_at`
 * NOTE: Converts `band` number → string for database
 * 
 * @param sessionId - ID of the session to update
 * @param update - Fields to update (all optional, at least one required)
 * @returns Updated session or null
 */
export async function updatePlaybackSession(
  sessionId: string,
  update: SessionUpdateRequest
): Promise<SessionUpdateResponse | null> {
  try {
    // Map frontend fields to backend schema
    const payload: any = {};
    
    if (update.ended_at !== undefined) {
      payload.completed_at = update.ended_at;  // ended_at → completed_at
    }
    if (update.post_state !== undefined) {
      payload.post_state = update.post_state;
    }
    if (update.band !== undefined) {
      payload.band = update.band !== null ? String(update.band) : null;  // number → string
    }
    if (update.why_now !== undefined) {
      payload.why_now = update.why_now;
    }
    if (update.device !== undefined) {
      payload.device = update.device;
    }
    if (update.app_version !== undefined) {
      payload.app_version = update.app_version;
    }
    if (update.metrics !== undefined) {
      payload.metrics = update.metrics;
    }

    const response = await fetch(`${SOUNDBITES_API}/sessions/${sessionId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('[Soundbites] PATCH /sessions/:id failed:', error);
      return null;
    }

    const result = await response.json();
    console.log('[Soundbites] Session updated:', sessionId);
    return result;
  } catch (error) {
    console.error('[Soundbites] Error updating playback session:', error);
    return null;
  }
}

// ==================== LEGACY API (Bulk Fetching) ====================

/**
 * HEALTH CHECK
 * Verify view integrity and RLS permissions
 */
export async function healthCheckSoundbites() {
  const supabase = createClient();
  
  console.log('[Soundbites Health Check] Testing soundbite_all view access...');
  
  const { data, error, count } = await supabase
    .from('soundbite_all')
    .select('*', { count: 'exact', head: true });
  
  if (error) {
    console.error('[Soundbites Health Check] RLS or view error:', error);
    return {
      success: false,
      error: error.message,
      hint: error.hint,
      code: error.code,
      totalSoundbites: 0,
      needsRLSSetup: error.code === 'PGRST205' || error.code === '42501',
    };
  }
  
  // Get sample to verify data structure
  const { data: sample } = await supabase
    .from('soundbite_all')
    .select('code, pillar_id, spark_title, flame_title, ember_title, spark_public_url, flame_public_url, ember_public_url')
    .limit(3);
  
  console.log('[Soundbites Health Check] Success:', {
    totalSoundbites: count || 0,
    sample: sample?.[0] || null,
  });
  
  return {
    success: true,
    totalSoundbites: count || 0,
    sample: sample || [],
  };
}

/**
 * FETCH ALL SOUNDBITES
 * Returns all 150 sound bites with their 3 tracks from the soundbite_all VIEW
 */
export async function getAllSoundbites(): Promise<SoundbiteRecord[]> {
  const supabase = createClient();
  
  console.log('[Soundbites] Fetching from soundbite_all view...');
  
  const { data, error } = await supabase
    .from('soundbite_all')
    .select('*')
    .order('pillar_rank', { ascending: true })
    .order('code_num', { ascending: true });
  
  if (error) {
    console.error('[Soundbites] Error fetching soundbite_all:', {
      message: error.message,
      hint: error.hint,
      code: error.code,
      details: error.details,
    });
    
    if (error.code === 'PGRST205' || error.code === '42501') {
      console.error('[Soundbites] RLS PERMISSIONS REQUIRED - Run SQL from DEVELOPER_SUMMARY_SOUNDBITES_VIEW.md');
    }
    
    throw new Error(`Failed to fetch soundbites: ${error.message}`);
  }
  
  console.log(`[Soundbites] Fetched ${data?.length || 0} soundbites`);
  
  if (!data || data.length === 0) {
    console.warn('[Soundbites] No soundbites found in soundbite_all view');
    return [];
  }
  
  return data;
}

/**
 * FETCH LIBRARY TRACKS
 * Returns flattened array of 450 tracks (150 × 3)
 * Organized by type for LUMA Play consumption
 */
export async function getLibraryTracks(): Promise<{
  sparks: LibraryTrack[];
  flames: LibraryTrack[];
  embers: LibraryTrack[];
  all: LibraryTrack[];
}> {
  const soundbites = await getAllSoundbites();
  
  const sparks: LibraryTrack[] = [];
  const flames: LibraryTrack[] = [];
  const embers: LibraryTrack[] = [];
  
  soundbites.forEach((sb) => {
    // Spark track
    if (sb.spark_title && sb.spark_public_url) {
      sparks.push({
        id: `${sb.code}_S`,
        type: 'spark',
        code: sb.code,
        title: sb.spark_title,
        audioUrl: sb.spark_public_url,
        pillarId: sb.pillar_id,
        themeId: sb.theme_id,
        tag: sb.tag,
        angle: sb.angle,
      });
    }
    
    // Flame track
    if (sb.flame_title && sb.flame_public_url) {
      flames.push({
        id: `${sb.code}_F`,
        type: 'flame',
        code: sb.code,
        title: sb.flame_title,
        audioUrl: sb.flame_public_url,
        pillarId: sb.pillar_id,
        themeId: sb.theme_id,
        tag: sb.tag,
        angle: sb.angle,
      });
    }
    
    // Ember track
    if (sb.ember_title && sb.ember_public_url) {
      embers.push({
        id: `${sb.code}_E`,
        type: 'ember',
        code: sb.code,
        title: sb.ember_title,
        audioUrl: sb.ember_public_url,
        pillarId: sb.pillar_id,
        themeId: sb.theme_id,
        tag: sb.tag,
        angle: sb.angle,
      });
    }
  });
  
  console.log(`[Soundbites] Organized tracks:`, {
    sparks: sparks.length,
    flames: flames.length,
    embers: embers.length,
    total: sparks.length + flames.length + embers.length,
  });
  
  return {
    sparks,
    flames,
    embers,
    all: [...sparks, ...flames, ...embers],
  };
}

/**
 * FETCH BY PILLAR
 * Get all tracks for a specific pillar (ER, SR, SC, CR, II, DM)
 */
export async function getLibraryTracksByPillar(pillarId: string): Promise<LibraryTrack[]> {
  const supabase = createClient();
  
  console.log(`[Soundbites] Fetching tracks for pillar: ${pillarId}`);
  
  const { data, error } = await supabase
    .from('soundbite_all')
    .select('*')
    .eq('pillar_id', pillarId)
    .order('code_num', { ascending: true });
  
  if (error) {
    console.error(`[Soundbites] Error fetching pillar ${pillarId}:`, error);
    throw new Error(`Failed to fetch soundbites for pillar ${pillarId}: ${error.message}`);
  }
  
  const soundbites = data || [];
  const tracks: LibraryTrack[] = [];
  
  soundbites.forEach((sb) => {
    if (sb.spark_title && sb.spark_public_url) {
      tracks.push({
        id: `${sb.code}_S`,
        type: 'spark',
        code: sb.code,
        title: sb.spark_title,
        audioUrl: sb.spark_public_url,
        pillarId: sb.pillar_id,
        themeId: sb.theme_id,
        tag: sb.tag,
        angle: sb.angle,
      });
    }
    
    if (sb.flame_title && sb.flame_public_url) {
      tracks.push({
        id: `${sb.code}_F`,
        type: 'flame',
        code: sb.code,
        title: sb.flame_title,
        audioUrl: sb.flame_public_url,
        pillarId: sb.pillar_id,
        themeId: sb.theme_id,
        tag: sb.tag,
        angle: sb.angle,
      });
    }
    
    if (sb.ember_title && sb.ember_public_url) {
      tracks.push({
        id: `${sb.code}_E`,
        type: 'ember',
        code: sb.code,
        title: sb.ember_title,
        audioUrl: sb.ember_public_url,
        pillarId: sb.pillar_id,
        themeId: sb.theme_id,
        tag: sb.tag,
        angle: sb.angle,
      });
    }
  });
  
  console.log(`[Soundbites] Found ${tracks.length} tracks for pillar ${pillarId}`);
  
  return tracks;
}

/**
 * GET PILLAR INFO
 * Map pillar IDs to user-friendly series names (Apple Music style)
 */
export function getPillarInfo(pillarId: string): { name: string; shortName: string } {
  const pillars: Record<string, { name: string; shortName: string }> = {
    'ER': { name: 'Emotional Balance', shortName: 'Balance' },
    'SR': { name: 'Self Discovery', shortName: 'Discovery' },
    'SC': { name: 'Inner Kindness', shortName: 'Kindness' },
    'CR': { name: 'Mind Shift', shortName: 'Mind Shift' },
    'II': { name: 'Human Connection', shortName: 'Connection' },
    'DM': { name: 'Clear Choices', shortName: 'Choices' },
  };
  
  return pillars[pillarId] || { name: 'Core Wisdom', shortName: 'Core' };
}