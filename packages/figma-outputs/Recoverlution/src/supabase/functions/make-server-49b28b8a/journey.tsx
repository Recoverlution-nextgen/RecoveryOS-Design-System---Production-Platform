/**
 * JOURNEY RUNTIME API - Edge Function Routes
 * Handles journey instance lifecycle: start, progress, completion
 * 
 * NEW ARCHITECTURE (January 2026):
 * - Tables: journey_instances, journey_instance_scenes, journey_scene_events
 * - Templates: journey_template, journey_template_scene (read-only reference)
 * - Realtime: Private channels (journey:{instance_id})
 * - Storage: journey-audio bucket with signed URLs
 */

import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const journey = new Hono();

// Supabase client (service role for writes)
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

/**
 * POST /start
 * Create or reuse an active journey instance
 * Idempotent: returns existing active instance if one exists
 */
journey.post('/start', async (c) => {
  try {
    const { individual_id, template_id, source, cadence_mode, seed_window_hours, min_scene_gap_hours, organization_id } = await c.req.json();

    if (!individual_id || !template_id) {
      return c.json({ error: 'individual_id and template_id are required' }, 400);
    }

    console.log('[Journey API] Starting journey:', { individual_id, template_id, source });

    // Check for existing active instance (idempotent)
    const { data: existing, error: existingError } = await supabase
      .from('journey_instances')
      .select('*')
      .eq('user_id', individual_id)
      .eq('template_id', template_id)
      .eq('status', 'active')
      .maybeSingle();

    if (existingError) {
      console.error('[Journey API] Error checking existing instance:', existingError);
      return c.json({ error: 'Database error checking existing instance' }, 500);
    }

    if (existing) {
      console.log('[Journey API] Returning existing instance:', existing.id);
      return c.json({ instance: existing });
    }

    // Create new instance
    const { data: instance, error: instanceError } = await supabase
      .from('journey_instances')
      .insert({
        user_id: individual_id,
        template_id,
        status: 'active',
        current_scene_number: 1,
        started_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        cadence_mode,
        seed_window_hours,
        min_scene_gap_hours,
        organization_id,
        source,
      })
      .select()
      .single();

    if (instanceError) {
      console.error('[Journey API] Error creating instance:', instanceError);
      return c.json({ error: `Failed to create journey instance: ${instanceError.message}` }, 500);
    }

    console.log('[Journey API] Created new instance:', instance.id);

    // Pre-seed journey_instance_scenes from template_scenes
    const { data: templateScenes, error: scenesError } = await supabase
      .from('journey_template_scenes')
      .select('*')
      .eq('template_id', template_id)
      .order('scene_number', { ascending: true });

    if (scenesError) {
      console.error('[Journey API] Error fetching template scenes:', scenesError);
      // Don't fail the request, instance is already created
    } else if (templateScenes && templateScenes.length > 0) {
      const instanceScenes = templateScenes.map((scene, index) => ({
        journey_instance_id: instance.id,
        scene_number: scene.scene_number,
        status: index === 0 ? 'available' : 'locked',
        unlocked_at: index === 0 ? new Date().toISOString() : null,
      }));

      const { error: seedError } = await supabase
        .from('journey_instance_scenes')
        .insert(instanceScenes);

      if (seedError) {
        console.error('[Journey API] Error seeding instance scenes:', seedError);
        // Don't fail the request
      } else {
        console.log('[Journey API] Seeded', instanceScenes.length, 'scenes');
      }
    }

    return c.json({ instance });
  } catch (error: any) {
    console.error('[Journey API] /start error:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

/**
 * GET /instance/:instance_id/current
 * Fetch the current scene details for the instance
 * Returns: { instance, scene } with signed_audio_url if available
 */
journey.get('/instance/:instance_id/current', async (c) => {
  try {
    const instanceId = c.req.param('instance_id');

    console.log('[Journey API] Fetching current scene for:', instanceId);

    // Fetch instance
    const { data: instance, error: instanceError } = await supabase
      .from('journey_instances')
      .select('*')
      .eq('id', instanceId)
      .single();

    if (instanceError || !instance) {
      console.error('[Journey API] Instance not found:', instanceId);
      return c.json({ error: 'Journey instance not found' }, 404);
    }

    // Fetch current scene from template
    const { data: scene, error: sceneError } = await supabase
      .from('journey_template_scenes')
      .select('*')
      .eq('template_id', instance.template_id)
      .eq('scene_number', instance.current_scene_number)
      .single();

    if (sceneError || !scene) {
      console.error('[Journey API] Scene not found:', instance.current_scene_number);
      return c.json({ error: 'Current scene not found' }, 404);
    }

    // Generate signed audio URL if scene has audio
    let signed_audio_url = null;
    if (scene.audio_path) {
      const { data: signedData, error: signedError } = await supabase.storage
        .from('journey-audio')
        .createSignedUrl(scene.audio_path, 3600); // 1 hour expiry

      if (signedError) {
        console.error('[Journey API] Error generating signed URL:', signedError);
      } else {
        signed_audio_url = signedData.signedUrl;
      }
    }

    return c.json({
      instance,
      scene: {
        ...scene,
        signed_audio_url,
      },
    });
  } catch (error: any) {
    console.error('[Journey API] /current error:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

/**
 * POST /instance/:instance_id/scene/:n/complete
 * Mark a scene as completed and advance instance
 * Idempotent: safe to retry with same idempotency_key
 */
journey.post('/instance/:instance_id/scene/:n/complete', async (c) => {
  try {
    const instanceId = c.req.param('instance_id');
    const sceneNumber = parseInt(c.req.param('n'), 10);
    const { idempotency_key } = await c.req.json();

    console.log('[Journey API] Completing scene:', { instanceId, sceneNumber, idempotency_key });

    // Check for existing event (idempotent)
    if (idempotency_key) {
      const { data: existing } = await supabase
        .from('journey_scene_events')
        .select('id')
        .eq('journey_instance_id', instanceId)
        .eq('scene_number', sceneNumber)
        .eq('idempotency_key', idempotency_key)
        .maybeSingle();

      if (existing) {
        console.log('[Journey API] Duplicate completion request (idempotent)');
        // Still return success but don't re-process
      }
    }

    // Update instance scene status
    const { error: sceneUpdateError } = await supabase
      .from('journey_instance_scenes')
      .update({ status: 'completed', completed_at: new Date().toISOString() })
      .eq('journey_instance_id', instanceId)
      .eq('scene_number', sceneNumber);

    if (sceneUpdateError) {
      console.error('[Journey API] Error updating scene status:', sceneUpdateError);
    }

    // Advance instance to next scene
    const nextSceneNumber = sceneNumber + 1;
    const nextSceneAvailableAt = new Date().toISOString(); // Immediate unlock for CC2 testing

    const { error: instanceUpdateError } = await supabase
      .from('journey_instances')
      .update({
        current_scene_number: nextSceneNumber,
        next_scene_available_at: nextSceneAvailableAt,
        updated_at: new Date().toISOString(),
      })
      .eq('id', instanceId);

    if (instanceUpdateError) {
      console.error('[Journey API] Error advancing instance:', instanceUpdateError);
      return c.json({ error: 'Failed to advance journey' }, 500);
    }

    // Unlock next scene
    const { error: unlockError } = await supabase
      .from('journey_instance_scenes')
      .update({ status: 'available', unlocked_at: new Date().toISOString() })
      .eq('journey_instance_id', instanceId)
      .eq('scene_number', nextSceneNumber);

    if (unlockError) {
      console.error('[Journey API] Error unlocking next scene:', unlockError);
    }

    // Insert completion event
    const { error: eventError } = await supabase
      .from('journey_scene_events')
      .insert({
        journey_instance_id: instanceId,
        scene_number: sceneNumber,
        event_type: 'scene_completed',
        idempotency_key,
        created_at: new Date().toISOString(),
      });

    if (eventError) {
      console.error('[Journey API] Error inserting event:', eventError);
    }

    console.log('[Journey API] Scene completed, advanced to:', nextSceneNumber);

    return c.json({
      ok: true,
      next_scene_number: nextSceneNumber,
      next_scene_available_at: nextSceneAvailableAt,
    });
  } catch (error: any) {
    console.error('[Journey API] /complete error:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

/**
 * POST /instance/:instance_id/capture
 * Record a capture (text, file, metadata)
 */
journey.post('/instance/:instance_id/capture', async (c) => {
  try {
    const instanceId = c.req.param('instance_id');
    const payload = await c.req.json();

    console.log('[Journey API] Recording capture:', { instanceId, scene_number: payload.scene_number });

    const { error } = await supabase
      .from('journey_scene_captures')
      .insert({
        journey_instance_id: instanceId,
        scene_number: payload.scene_number,
        capture_kind: payload.capture_kind,
        capture_text: payload.capture_text,
        capture_storage_path: payload.capture_storage_path,
        arousal_snapshot: payload.arousal_snapshot,
        tags: payload.tags,
        luma_extracted: payload.luma_extracted,
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error('[Journey API] Error inserting capture:', error);
      return c.json({ error: 'Failed to save capture' }, 500);
    }

    return c.json({ ok: true });
  } catch (error: any) {
    console.error('[Journey API] /capture error:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

/**
 * POST /instance/:instance_id/audio-events/batch
 * Batch ingest audio playback telemetry
 */
journey.post('/instance/:instance_id/audio-events/batch', async (c) => {
  try {
    const instanceId = c.req.param('instance_id');
    const { events } = await c.req.json();

    if (!events || !Array.isArray(events)) {
      return c.json({ error: 'events array required' }, 400);
    }

    console.log('[Journey API] Recording', events.length, 'audio events');

    const inserts = events.map(event => ({
      journey_instance_id: instanceId,
      scene_number: event.scene_number,
      event_type: event.event_type,
      position_ms: event.position_ms,
      duration_ms: event.duration_ms,
      playback_rate: event.playback_rate,
      muted: event.muted,
      created_at: event.created_at || new Date().toISOString(),
    }));

    const { error } = await supabase
      .from('journey_audio_events')
      .insert(inserts);

    if (error) {
      console.error('[Journey API] Error inserting audio events:', error);
      return c.json({ error: 'Failed to save audio events' }, 500);
    }

    return c.json({ ok: true, ingested: events.length });
  } catch (error: any) {
    console.error('[Journey API] /audio-events error:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

export default journey;