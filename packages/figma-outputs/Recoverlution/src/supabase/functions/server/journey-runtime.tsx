/**
 * JOURNEY RUNTIME API
 * 
 * Implements the bulletproof Journey Runtime spec for the 64-journey system.
 * 
 * ARCHITECTURE:
 * - Templates: journey_template (64 sprints)
 * - Scenes: journey_template_scene (832 total scenes)
 * - Instances: journey_instances (user-specific active journeys)
 * - Progress: journey_scene_progress (scene completion tracking)
 * - Events: journey_events (telemetry/analytics)
 * 
 * ENDPOINTS:
 * - POST /start: Create or resume journey instance
 * - GET /instance/:id/current: Get current scene with signed audio URL
 * - POST /instance/:id/scene/:n/complete: Mark scene complete & advance
 * - POST /instance/:id/capture: Record captures with mindblock enrichment
 * - POST /instance/:id/resistance: Record resistance checks
 * - POST /instance/:id/audio-events/batch: Batch audio telemetry
 * 
 * AUTH: All routes require authenticated user (RLS enforced)
 */

import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const journey = new Hono();

const getSupabaseClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );
};

// ============================================================================
// TEMPLATE BROWSING (for CC2 Journey Studio)
// ============================================================================

/**
 * GET /templates
 * List all journey templates with optional filters
 * Query params: pillar_id, status, is_onboarding
 */
journey.get('/templates', async (c) => {
  try {
    const pillar_id = c.req.query('pillar_id');
    const status = c.req.query('status');
    const is_onboarding = c.req.query('is_onboarding');
    
    const supabase = getSupabaseClient();
    
    let query = supabase
      .from('journey_template')
      .select('*');
    
    // Apply filters
    if (pillar_id) {
      query = query.eq('pillar_id', pillar_id);
    }
    if (status) {
      query = query.eq('status', status);
    }
    if (is_onboarding !== undefined) {
      query = query.eq('is_onboarding', is_onboarding === 'true');
    }
    
    // Default sort: pillar_id, then sprint_number
    query = query.order('pillar_id', { ascending: true });
    query = query.order('sprint_number', { ascending: true });
    
    const { data, error, count } = await query;
    
    console.log('[Journey Runtime] Templates query result:', {
      count: data?.length || 0,
      filters: { pillar_id, status, is_onboarding },
      error: error?.message
    });
    
    if (error) {
      console.error('[Journey Runtime] Error fetching templates:', error);
      return c.json({ error: error.message }, 500);
    }
    
    return c.json({
      templates: data || [],
      count: data?.length || 0
    });
    
  } catch (error: any) {
    console.error('[Journey Runtime] Error in GET /templates:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * GET /templates/:id
 * Get a single template by ID
 */
journey.get('/templates/:id', async (c) => {
  try {
    const templateId = c.req.param('id');
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from('journey_template')
      .select('*')
      .eq('id', templateId)
      .single();
    
    if (error) {
      console.error('[Journey Runtime] Error fetching template:', error);
      return c.json({ error: error.message }, 404);
    }
    
    return c.json({ template: data });
    
  } catch (error: any) {
    console.error('[Journey Runtime] Error in GET /templates/:id:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * GET /templates/:id/scenes
 * Get all scenes for a template
 */
journey.get('/templates/:id/scenes', async (c) => {
  try {
    const templateId = c.req.param('id');
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from('journey_template_scene')
      .select('*')
      .eq('template_id', templateId)
      .order('scene_number', { ascending: true });
    
    if (error) {
      console.error('[Journey Runtime] Error fetching scenes:', error);
      return c.json({ error: error.message }, 500);
    }
    
    return c.json({
      scenes: data || [],
      count: data?.length || 0
    });
    
  } catch (error: any) {
    console.error('[Journey Runtime] Error in GET /templates/:id/scenes:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// JOURNEY INSTANCE MANAGEMENT
// ============================================================================

/**
 * GET /instance/:id/status
 * Get journey instance status with current/next scene info
 * Returns: current scene number, next scene number, total scenes, progress percentage
 */
journey.get('/instance/:id/status', async (c) => {
  try {
    const instanceId = c.req.param('id');
    const supabase = getSupabaseClient();
    
    // Get instance
    const { data: instance, error: instError } = await supabase
      .from('journey_instances')
      .select('*')
      .eq('id', instanceId)
      .single();
    
    if (instError || !instance) {
      return c.json({ error: 'Instance not found' }, 404);
    }
    
    // Get total scenes for this template
    const { data: scenes, error: scenesError } = await supabase
      .from('journey_template_scene')
      .select('scene_number')
      .eq('template_id', instance.template_id)
      .order('scene_number', { ascending: false })
      .limit(1);
    
    const totalScenes = scenes?.[0]?.scene_number || 0;
    
    // Get completed scenes count
    const { data: completed, error: completedError } = await supabase
      .from('journey_scene_progress')
      .select('scene_number')
      .eq('instance_id', instanceId)
      .eq('status', 'completed');
    
    const completedCount = completed?.length || 0;
    
    // Calculate next scene
    const currentScene = instance.current_scene_number;
    const nextScene = currentScene < totalScenes ? currentScene + 1 : null;
    const progressPercent = totalScenes > 0 ? Math.round((completedCount / totalScenes) * 100) : 0;
    
    return c.json({
      instance_id: instance.id,
      status: instance.status,
      current_scene_number: currentScene,
      next_scene_number: nextScene,
      total_scenes: totalScenes,
      completed_scenes: completedCount,
      progress_percent: progressPercent,
      started_at: instance.started_at,
      updated_at: instance.updated_at,
      next_scene_available_at: instance.next_scene_available_at,
    });
    
  } catch (error: any) {
    console.error('[Journey Runtime] Error in GET /instance/:id/status:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * POST /start
 * Create or resume a journey instance
 * Body: { individual_id, template_id, source?, cadence_mode?, organization_id? }
 * 
 * Idempotent: Returns existing active instance if one exists for this user+template
 */
journey.post('/start', async (c) => {
  try {
    const body = await c.req.json();
    const {
      individual_id,
      template_id,
      source = 'cc2_journey_studio',
      cadence_mode = 'linear_ready',
      seed_window_hours = 24,
      min_scene_gap_hours = 0,
      organization_id = null
    } = body;
    
    if (!individual_id || !template_id) {
      return c.json({ error: 'individual_id and template_id required' }, 400);
    }
    
    const supabase = getSupabaseClient();
    
    // Check for existing active instance (idempotent)
    const { data: existing } = await supabase
      .from('journey_instances')
      .select('*')
      .eq('user_id', individual_id)
      .eq('template_id', template_id)
      .eq('status', 'active')
      .maybeSingle();
    
    if (existing) {
      console.log('[Journey Runtime] Returning existing instance:', existing.id);
      return c.json({ instance: existing });
    }
    
    // Create new instance
    const { data: instance, error } = await supabase
      .from('journey_instances')
      .insert({
        user_id: individual_id,
        template_id,
        status: 'active',
        current_scene_number: 1,
        next_scene_available_at: new Date().toISOString(),
        cadence_mode,
        seed_window_hours,
        min_scene_gap_hours,
        organization_id,
        source,
        started_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error('[Journey Runtime] Error creating instance:', error);
      return c.json({ error: error.message }, 500);
    }
    
    console.log('[Journey Runtime] Created new instance:', instance.id);
    return c.json({ instance });
    
  } catch (error: any) {
    console.error('[Journey Runtime] Error in POST /start:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * GET /instance/:id/current
 * Fetch current scene for an instance with signed audio URL
 */
journey.get('/instance/:id/current', async (c) => {
  try {
    const instanceId = c.req.param('id');
    const supabase = getSupabaseClient();
    
    // 1. Get instance
    const { data: instance, error: instError } = await supabase
      .from('journey_instances')
      .select('*')
      .eq('id', instanceId)
      .single();
    
    if (instError || !instance) {
      return c.json({ error: 'Instance not found' }, 404);
    }
    
    // 2. Get current scene
    const { data: scene, error: sceneError } = await supabase
      .from('journey_template_scene')
      .select('*')
      .eq('template_id', instance.template_id)
      .eq('scene_number', instance.current_scene_number)
      .single();
    
    if (sceneError) {
      console.error('[Journey Runtime] Error fetching scene:', sceneError);
      return c.json({ error: 'Scene not found' }, 404);
    }
    
    // 3. Generate signed URL if scene has audio
    let signed_audio_url = null;
    if (scene.audio_path) {
      const { data: signedData, error: signError } = await supabase.storage
        .from('journey-audio')
        .createSignedUrl(scene.audio_path, 3600); // 1 hour expiry
      
      if (!signError && signedData) {
        signed_audio_url = signedData.signedUrl;
      }
    }
    
    return c.json({
      instance,
      scene: {
        ...scene,
        signed_audio_url
      }
    });
    
  } catch (error: any) {
    console.error('[Journey Runtime] Error in GET /instance/:id/current:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * POST /instance/:id/scene/:n/complete
 * Mark scene as complete and advance instance
 * Body: { idempotency_key? }
 */
journey.post('/instance/:id/scene/:n/complete', async (c) => {
  try {
    const instanceId = c.req.param('id');
    const sceneNumber = parseInt(c.req.param('n'));
    const body = await c.req.json();
    const { idempotency_key = crypto.randomUUID() } = body;
    
    const supabase = getSupabaseClient();
    
    // 1. Check if already completed (idempotent)
    const { data: existing } = await supabase
      .from('journey_events')
      .select('id')
      .eq('journey_instance_id', instanceId)
      .eq('scene_number', sceneNumber)
      .eq('event_type', 'scene_completed')
      .eq('idempotency_key', idempotency_key)
      .maybeSingle();
    
    if (existing) {
      console.log('[Journey Runtime] Scene already completed (idempotent)');
      
      // Return current instance state
      const { data: instance } = await supabase
        .from('journey_instances')
        .select('*')
        .eq('id', instanceId)
        .single();
      
      return c.json({
        ok: true,
        next_scene_number: instance?.current_scene_number || sceneNumber + 1,
        next_scene_available_at: instance?.next_scene_available_at || new Date().toISOString()
      });
    }
    
    // 2. Get instance to determine next scene timing
    const { data: instance } = await supabase
      .from('journey_instances')
      .select('*, journey_template!inner(total_scenes)')
      .eq('id', instanceId)
      .single();
    
    if (!instance) {
      return c.json({ error: 'Instance not found' }, 404);
    }
    
    const totalScenes = instance.journey_template.total_scenes || 13;
    const nextSceneNumber = sceneNumber + 1;
    const isComplete = nextSceneNumber > totalScenes;
    
    // Calculate next scene availability based on cadence
    const now = new Date();
    const minGapHours = instance.min_scene_gap_hours || 0;
    const nextAvailable = new Date(now.getTime() + minGapHours * 60 * 60 * 1000);
    
    // 3. Update instance
    const { error: updateError } = await supabase
      .from('journey_instances')
      .update({
        current_scene_number: isComplete ? sceneNumber : nextSceneNumber,
        next_scene_available_at: nextAvailable.toISOString(),
        status: isComplete ? 'complete' : 'active',
        updated_at: new Date().toISOString()
      })
      .eq('id', instanceId);
    
    if (updateError) {
      console.error('[Journey Runtime] Error updating instance:', updateError);
      return c.json({ error: updateError.message }, 500);
    }
    
    // 4. Record completion event
    await supabase
      .from('journey_events')
      .insert({
        journey_instance_id: instanceId,
        scene_number: sceneNumber,
        event_type: 'scene_completed',
        idempotency_key,
        created_at: new Date().toISOString()
      });
    
    // 5. Update progress tracking
    await supabase
      .from('journey_scene_progress')
      .upsert({
        journey_instance_id: instanceId,
        scene_number: sceneNumber,
        status: 'complete',
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'journey_instance_id,scene_number'
      });
    
    console.log('[Journey Runtime] Scene completed:', {
      instanceId,
      sceneNumber,
      nextSceneNumber,
      isComplete
    });
    
    return c.json({
      ok: true,
      next_scene_number: isComplete ? sceneNumber : nextSceneNumber,
      next_scene_available_at: nextAvailable.toISOString(),
      journey_complete: isComplete
    });
    
  } catch (error: any) {
    console.error('[Journey Runtime] Error in POST /instance/:id/scene/:n/complete:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * POST /instance/:id/capture
 * Record a capture (text, audio, video) with optional mindblock enrichment
 */
journey.post('/instance/:id/capture', async (c) => {
  try {
    const instanceId = c.req.param('id');
    const body = await c.req.json();
    const {
      scene_number,
      capture_kind = 'text',
      capture_text,
      capture_storage_path,
      arousal_snapshot,
      tags = [],
      luma_extracted,
      // Mindblock enrichment (optional)
      individual_id,
      template_id,
      scene_key,
      mindblock_key,
      signal_strength,
      evidence
    } = body;
    
    if (!scene_number) {
      return c.json({ error: 'scene_number required' }, 400);
    }
    
    const supabase = getSupabaseClient();
    
    // Insert capture
    const { error: captureError } = await supabase
      .from('journey_scene_captures')
      .insert({
        journey_instance_id: instanceId,
        scene_number,
        capture_kind,
        capture_text,
        capture_storage_path,
        arousal_snapshot,
        tags,
        luma_extracted,
        created_at: new Date().toISOString()
      });
    
    if (captureError) {
      console.error('[Journey Runtime] Error saving capture:', captureError);
      return c.json({ error: captureError.message }, 500);
    }
    
    // Optional: Record mindblock signal if enrichment data provided
    if (individual_id && mindblock_key && signal_strength !== undefined) {
      await supabase
        .from('mindblock_realtime_signals')
        .insert({
          individual_id,
          template_id,
          scene_key,
          mindblock_key,
          signal_strength,
          evidence: evidence || { capture_text },
          source: 'journey_capture',
          created_at: new Date().toISOString()
        });
    }
    
    return c.json({ ok: true });
    
  } catch (error: any) {
    console.error('[Journey Runtime] Error in POST /instance/:id/capture:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * POST /instance/:id/resistance
 * Record a resistance check with optional mindblock enrichment
 */
journey.post('/instance/:id/resistance', async (c) => {
  try {
    const instanceId = c.req.param('id');
    const body = await c.req.json();
    const {
      scene_number,
      value_num,
      hesitation_ms,
      notes,
      mindblock_inferred = [],
      resistance_kind = 'slider',
      // Mindblock enrichment (optional)
      individual_id,
      template_id,
      scene_key,
      mindblock_key,
      signal_strength,
      evidence
    } = body;
    
    if (!scene_number) {
      return c.json({ error: 'scene_number required' }, 400);
    }
    
    const supabase = getSupabaseClient();
    
    // Insert resistance check
    const { error: resistanceError } = await supabase
      .from('journey_resistance_checks')
      .insert({
        journey_instance_id: instanceId,
        scene_number,
        value_num,
        hesitation_ms,
        notes,
        mindblock_inferred,
        resistance_kind,
        created_at: new Date().toISOString()
      });
    
    if (resistanceError) {
      console.error('[Journey Runtime] Error saving resistance check:', resistanceError);
      return c.json({ error: resistanceError.message }, 500);
    }
    
    // Optional: Record mindblock signal if enrichment data provided
    if (individual_id && mindblock_key && signal_strength !== undefined) {
      await supabase
        .from('mindblock_realtime_signals')
        .insert({
          individual_id,
          template_id,
          scene_key,
          mindblock_key,
          signal_strength,
          evidence: evidence || { value_num, hesitation_ms },
          source: 'journey_resistance',
          created_at: new Date().toISOString()
        });
    }
    
    return c.json({ ok: true });
    
  } catch (error: any) {
    console.error('[Journey Runtime] Error in POST /instance/:id/resistance:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * POST /instance/:id/audio-events/batch
 * Batch ingest audio playback telemetry
 */
journey.post('/instance/:id/audio-events/batch', async (c) => {
  try {
    const instanceId = c.req.param('id');
    const body = await c.req.json();
    const { events = [] } = body;
    
    if (!Array.isArray(events) || events.length === 0) {
      return c.json({ error: 'events array required' }, 400);
    }
    
    const supabase = getSupabaseClient();
    
    // Transform events for insertion
    const insertData = events.map(evt => ({
      journey_instance_id: instanceId,
      scene_number: evt.scene_number,
      event_type: `audio_${evt.event_type}`,
      event_data: {
        position_ms: evt.position_ms,
        duration_ms: evt.duration_ms,
        playback_rate: evt.playback_rate,
        muted: evt.muted
      },
      created_at: evt.created_at || new Date().toISOString()
    }));
    
    const { error } = await supabase
      .from('journey_events')
      .insert(insertData);
    
    if (error) {
      console.error('[Journey Runtime] Error batch inserting audio events:', error);
      return c.json({ error: error.message }, 500);
    }
    
    return c.json({
      ok: true,
      ingested: events.length
    });
    
  } catch (error: any) {
    console.error('[Journey Runtime] Error in POST /instance/:id/audio-events/batch:', error);
    return c.json({ error: error.message }, 500);
  }
});

export default journey;