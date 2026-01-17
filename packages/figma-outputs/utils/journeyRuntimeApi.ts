/**
 * JOURNEY RUNTIME API - Supabase Edge Function Integration
 * 
 * PRODUCTION ARCHITECTURE (January 2026):
 * - Edge Function: make-server-49b28b8a (deployed production function)
 * - Routes: /make-server-49b28b8a/journey/* (journey.tsx)
 * - Tables: journey_instances, journey_scene_events, journey_scene_captures, etc.
 * - Realtime: Private channels (journey:{instance_id})
 * - Storage: journey-audio bucket with signed URLs
 * - Auth: RLS enforces row ownership
 * 
 * DEPLOYMENT:
 * - Function Name: "make-server-49b28b8a" (Figma Make auto-generated name)
 * - Base URL: https://{projectId}.supabase.co/functions/v1/make-server-49b28b8a
 * - Journey Routes: /journey/start, /journey/instance/:id/current, etc.
 */

import { createClient } from './supabase/client';
import { projectId, publicAnonKey } from './supabase/info';

// ============================================================================
// TYPES
// ============================================================================

export interface JourneyInstance {
  id: string;
  user_id: string;
  template_id: string;
  status: 'active' | 'paused' | 'complete';
  current_scene_number: number;
  next_scene_available_at?: string;
  started_at: string;
  updated_at: string;
  cadence_mode?: string;
  seed_window_hours?: number;
  min_scene_gap_hours?: number;
  organization_id?: string | null;
  source?: string;
}

export interface JourneyTemplateScene {
  template_id: string;
  scene_number: number;
  audio_path?: string;
  title?: string;
  body_md?: string;
  prompt_md?: string;
  era_phase?: string;
  phase_label?: string;
  has_audio?: boolean;
  audio_type?: string;
  requires_capture?: boolean;
  capture_kind?: string;
  requires_resistance_check?: boolean;
  requires_real_world_trigger?: boolean;
  real_world_trigger_hint?: string | null;
  signed_audio_url?: string | null;
  [key: string]: any;
}

export interface JourneySceneEvent {
  id: string;
  journey_instance_id: string;
  scene_number: number;
  event_type: string;
  idempotency_key?: string;
  created_at: string;
}

export interface JourneySceneCapture {
  id: string;
  journey_instance_id: string;
  scene_number: number;
  capture_kind: string;
  capture_text?: string;
  capture_storage_path?: string;
  arousal_snapshot?: any;
  tags?: string[];
  luma_extracted?: any;
  created_at: string;
}

export interface JourneyResistanceCheck {
  id: string;
  journey_instance_id: string;
  scene_number: number;
  value_num?: number;
  hesitation_ms?: number;
  notes?: string;
  mindblock_inferred?: any;
  resistance_kind?: string;
  created_at: string;
}

// ============================================================================
// API FUNCTIONS
// ============================================================================

/**
 * POST /journey-api/start
 * Create or reuse an active journey instance
 * Idempotent: returns existing active instance if one exists
 */
export async function startJourney(params: {
  individualId: string;
  templateId: string;
  source?: string;
  cadenceMode?: string;
  seedWindowHours?: number;
  minSceneGapHours?: number;
  organizationId?: string;
}): Promise<JourneyInstance> {
  const url = `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/journey/start`;
  
  const res = await fetch(url, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`
    },
    body: JSON.stringify({
      individual_id: params.individualId,
      template_id: params.templateId,
      source: params.source,
      cadence_mode: params.cadenceMode,
      seed_window_hours: params.seedWindowHours,
      min_scene_gap_hours: params.minSceneGapHours,
      organization_id: params.organizationId,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('[Journey API] Error response:', errorText);
    throw new Error(`Failed to start journey: ${errorText}`);
  }

  const { instance } = await res.json();
  return instance;
}

/**
 * GET /journey-api/instance/{instance_id}/current
 * Fetch the current scene details for the instance
 * Returns: { instance, scene } with signed_audio_url if available
 */
export async function getCurrentScene(instanceId: string): Promise<{
  instance: JourneyInstance;
  scene: JourneyTemplateScene;
}> {
  const url = `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/journey/instance/${instanceId}/current`;
  const res = await fetch(url);

  if (!res.ok) {
    const errorText = await res.text();
    console.error('[Journey API] Error response:', errorText);
    throw new Error(`Failed to load current scene: ${errorText}`);
  }

  return await res.json();
}

/**
 * POST /journey-api/instance/{instance_id}/scene/{n}/complete
 * Mark a scene as completed and advance instance
 * Idempotent: safe to retry with same idempotency_key
 */
export async function completeScene(
  instanceId: string,
  sceneNumber: number,
  idempotencyKey?: string
): Promise<{
  ok: boolean;
  next_scene_number: number;
  next_scene_available_at: string;
}> {
  const url = `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/journey/instance/${instanceId}/scene/${sceneNumber}/complete`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      idempotency_key: idempotencyKey || crypto.randomUUID(),
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('[Journey API] Error response:', errorText);
    throw new Error(`Failed to complete scene: ${errorText}`);
  }

  return await res.json();
}

/**
 * POST /journey-api/instance/{instance_id}/capture
 * Record a capture (text, file, metadata)
 * Optional: Include mindblock enrichment fields
 */
export async function postCapture(
  instanceId: string,
  payload: {
    scene_number: number;
    capture_kind?: string;
    capture_text?: string;
    capture_storage_path?: string;
    arousal_snapshot?: any;
    tags?: string[];
    luma_extracted?: any;
    // Optional mindblock enrichment
    individual_id?: string;
    template_id?: string;
    scene_key?: string;
    mindblock_key?: string;
    signal_strength?: number;
    evidence?: any;
  }
): Promise<{ ok: boolean }> {
  const res = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/journey/instance/${instanceId}/capture`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to post capture');
  }

  return await res.json();
}

/**
 * POST /journey-api/instance/{instance_id}/resistance
 * Record a resistance check
 */
export async function postResistance(
  instanceId: string,
  payload: {
    scene_number: number;
    value_num?: number;
    hesitation_ms?: number;
    notes?: string;
    mindblock_inferred?: any[];
    resistance_kind?: string;
    // Optional mindblock enrichment
    individual_id?: string;
    template_id?: string;
    scene_key?: string;
    mindblock_key?: string;
    signal_strength?: number;
    evidence?: any;
  }
): Promise<{ ok: boolean }> {
  const res = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/journey/instance/${instanceId}/resistance`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to post resistance check');
  }

  return await res.json();
}

/**
 * POST /journey-api/instance/{instance_id}/audio-events/batch
 * Batch ingest audio playback telemetry
 */
export async function postAudioEvents(
  instanceId: string,
  events: Array<{
    scene_number: number;
    event_type: string; // 'play', 'pause', 'ended', etc.
    position_ms?: number;
    duration_ms?: number;
    playback_rate?: number;
    muted?: boolean;
    created_at?: string;
  }>
): Promise<{ ok: boolean; ingested: number }> {
  const res = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/journey/instance/${instanceId}/audio-events/batch`,
    {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify({ events }),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to post audio events');
  }

  return await res.json();
}

// ============================================================================
// LEGACY SUPPORT: Journey Templates Query (for CC2 Journey Studio browsing)
// ============================================================================

/**
 * Fetch all journey templates from Supabase (for CC2 browsing)
 * This is read-only access to the journey_template table (SINGULAR)
 */
export async function fetchAllJourneyTemplates(): Promise<any[]> {
  const supabase = createClient();

  console.log('[Journey Runtime API] Fetching templates from journey_template table...');
  console.log('[Journey Runtime API] Supabase client initialized:', {
    url: supabase.supabaseUrl,
    hasClient: !!supabase
  });

  const { data, error, count } = await supabase
    .from('journey_template')
    .select('*', { count: 'exact' })
    .order('pillar_id', { ascending: true });

  console.log('[Journey Runtime API] Query result:', {
    success: !error,
    error: error?.message,
    errorDetails: error,
    count,
    dataLength: data?.length || 0,
    sample: data?.slice(0, 2),
    allPillarIds: data?.map(t => t.pillar_id)
  });

  if (error) {
    console.error('[Journey Runtime API] Error fetching templates:', error);
    throw error;
  }

  console.log('[Journey Runtime API] Templates fetched successfully:', {
    count: data?.length || 0,
    sample: data?.slice(0, 2),
    allPillarIds: data?.map(t => t.pillar_id)
  });

  return data || [];
}

/**
 * Fetch journey template scenes (for CC2 preview)
 * Table: journey_template_scenes (PLURAL)
 */
export async function fetchTemplateScenes(templateId: string): Promise<any[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('journey_template_scenes')
    .select('*')
    .eq('template_id', templateId)
    .order('scene_number', { ascending: true });

  if (error) {
    console.error('[Journey Runtime API] Error fetching template scenes:', error);
    return [];
  }

  return data || [];
}

/**
 * Group journeys by pillar (for CC2 UI)
 */
export function groupJourneysByPillar(journeys: any[]): Record<string, any[]> {
  const grouped: Record<string, any[]> = {};

  journeys.forEach((journey) => {
    const pillarKey = journey.pillar_id || 'uncategorized';
    if (!grouped[pillarKey]) {
      grouped[pillarKey] = [];
    }
    grouped[pillarKey].push(journey);
  });

  return grouped;
}

/**
 * Get pillar display info
 */
export function getPillarInfo(pillarId: string): {
  name: string;
  color: string;
  description: string;
} {
  const pillars: Record<
    string,
    { name: string; color: string; description: string }
  > = {
    // FULL pillar_ids as they exist in database (not abbreviated)
    emotional_regulation: {
      name: 'Emotional Regulation',
      color: '#FF6B6B',
      description: 'Stabilise first. Create safety. Build return to baseline.',
    },
    stress_resilience: {
      name: 'Stress Resilience',
      color: '#4ECDC4',
      description: 'Pressure becomes signal. Stop treating life like danger.',
    },
    social_connectivity: {
      name: 'Social Connectivity',
      color: '#95E1D3',
      description: 'Connection becomes medicine. Isolation stops being default.',
    },
    cognitive_reframing: {
      name: 'Cognitive Reframing',
      color: '#F38181',
      description: 'Upgrade the story. Reduce shame. Increase flexibility.',
    },
    identity_integration: {
      name: 'Identity Integration',
      color: '#AA96DA',
      description: 'From doing recovery → being recovered.',
    },
    decision_mastery: {
      name: 'Decision Mastery',
      color: '#FCBAD3',
      description: 'Real-time choice under pressure. Durable autonomy.',
    },
    onboarding: {
      name: 'Onboarding',
      color: '#5739FB',
      description: 'Learn the system. Install the foundation.',
    },
    
    // Legacy abbreviated IDs (for backward compatibility)
    ER: {
      name: 'Emotional Regulation',
      color: '#FF6B6B',
      description: 'Stabilise first. Create safety. Build return to baseline.',
    },
    SR: {
      name: 'Stress Resilience',
      color: '#4ECDC4',
      description: 'Pressure becomes signal. Stop treating life like danger.',
    },
    SC: {
      name: 'Social Connectivity',
      color: '#95E1D3',
      description: 'Connection becomes medicine. Isolation stops being default.',
    },
    CR: {
      name: 'Cognitive Reframing',
      color: '#F38181',
      description: 'Upgrade the story. Reduce shame. Increase flexibility.',
    },
    II: {
      name: 'Identity Integration',
      color: '#AA96DA',
      description: 'From doing recovery → being recovered.',
    },
    DM: {
      name: 'Decision Mastery',
      color: '#FCBAD3',
      description: 'Real-time choice under pressure. Durable autonomy.',
    },
    ONB: {
      name: 'Onboarding',
      color: '#5739FB',
      description: 'Learn the system. Install the foundation.',
    },
  };

  return (
    pillars[pillarId] || {
      name: pillarId,
      color: '#666',
      description: 'Journey pillar',
    }
  );
}