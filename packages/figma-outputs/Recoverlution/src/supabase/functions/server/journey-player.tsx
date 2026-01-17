/**
 * Journey Player - Contract-Compliant API
 * 
 * Implements the "One Pull" pattern:
 * - get_journey_player_payload: Returns full journey + scenes + navicues + resume state
 * - submit_scene_response: Upserts response with progress tracking
 * 
 * GOLDEN RULES:
 * 1. Frontend never constructs content, only renders payload
 * 2. Stable key is navicue_id (e.g., NC-ER-011)
 * 3. id (uuid) is opaque to frontend
 * 4. No pillar label dependencies in FE
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
// RPC: GET JOURNEY PLAYER PAYLOAD
// ============================================================================

journey.get('/payload/:journeyId/:userId', async (c) => {
  try {
    const journeyId = c.req.param('journeyId');
    const userId = c.req.param('userId');
    
    const supabase = getSupabaseClient();
    
    // 1) Fetch journey metadata
    const { data: journeyData, error: journeyError } = await supabase
      .from('journeys')
      .select('*')
      .eq('id', journeyId)
      .single();
    
    if (journeyError || !journeyData) {
      return c.json({ error: 'Journey not found' }, 404);
    }
    
    // 2) Fetch all scenes for this journey (ordered by scene_number)
    const { data: scenesData, error: scenesError } = await supabase
      .from('journey_scenes')
      .select('*')
      .eq('journey_id', journeyId)
      .order('scene_number', { ascending: true });
    
    if (scenesError) {
      console.error('Error fetching scenes:', scenesError);
      return c.json({ error: 'Failed to fetch scenes' }, 500);
    }
    
    // 3) Hydrate each scene with its NaviCues
    const scenesWithNaviCues = await Promise.all(
      (scenesData || []).map(async (scene) => {
        // Get navicue_ids from scene.navicues array (or content.navicue_ids)
        const navicueIds = scene.navicue_ids || scene.content?.navicue_ids || [];
        
        if (navicueIds.length === 0) {
          return {
            ...scene,
            navicues: []
          };
        }
        
        // Fetch NaviCues using canonical RPC (maintains order)
        const { data: navicues, error: navicuesError } = await supabase
          .rpc('get_navicues', { p_navicue_ids: navicueIds });
        
        if (navicuesError) {
          console.error(`Error fetching navicues for scene ${scene.id}:`, navicuesError);
        }
        
        // Return scene with hydrated navicues
        return {
          scene_id: scene.id,
          scene_number: scene.scene_number,
          scene_type: scene.scene_type,
          title: scene.title,
          era_phase: scene.era_phase,
          content: scene.content,
          navicues: navicues || [],
          gating: scene.gating || { requires_response: true },
          next: scene.next || { mode: 'linear' }
        };
      })
    );
    
    // 4) Fetch user's progress/resume state
    const { data: progressData } = await supabase
      .from('journey_progress')
      .select('*')
      .eq('journey_id', journeyId)
      .eq('user_id', userId)
      .maybeSingle();
    
    const resume = progressData ? {
      last_completed_scene_number: progressData.last_completed_scene_number,
      in_progress_scene_number: progressData.in_progress_scene_number,
      completed_scene_numbers: progressData.completed_scene_numbers || [],
      responses_by_scene: progressData.responses_by_scene || {}
    } : {
      last_completed_scene_number: 0,
      in_progress_scene_number: 1,
      completed_scene_numbers: [],
      responses_by_scene: {}
    };
    
    // 5) Return the complete payload
    return c.json({
      journey: {
        journey_id: journeyData.id,
        title: journeyData.title,
        description: journeyData.description,
        version: journeyData.version || '1.0',
        status: journeyData.status || 'active',
        estimated_duration: journeyData.estimated_duration
      },
      resume,
      scenes: scenesWithNaviCues
    });
    
  } catch (error: any) {
    console.error('Error in get_journey_player_payload:', error);
    return c.json({ 
      error: 'Failed to fetch journey payload',
      details: error.message 
    }, 500);
  }
});

// ============================================================================
// RPC: SUBMIT SCENE RESPONSE
// ============================================================================

journey.post('/response', async (c) => {
  try {
    const body = await c.req.json();
    const {
      user_id,
      journey_id,
      scene_id,
      scene_number,
      navicue_id,
      response_type,
      response
    } = body;
    
    // Validate required fields
    if (!user_id || !journey_id || !scene_id || !navicue_id || !response_type || !response) {
      return c.json({ error: 'Missing required fields' }, 400);
    }
    
    const supabase = getSupabaseClient();
    
    // 1) Upsert the response (idempotent)
    const { error: responseError } = await supabase
      .from('journey_scene_responses')
      .upsert({
        user_id,
        journey_id,
        scene_id,
        scene_number,
        navicue_id,
        response_type,
        response,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,journey_id,scene_id,navicue_id'
      });
    
    if (responseError) {
      console.error('Error upserting response:', responseError);
      return c.json({ 
        error: 'Failed to save response',
        details: responseError.message 
      }, 500);
    }
    
    // 2) Check if all navicues in this scene are completed
    const { data: sceneData } = await supabase
      .from('journey_scenes')
      .select('navicue_ids, gating')
      .eq('id', scene_id)
      .single();
    
    const requiredNavicues = sceneData?.navicue_ids || [];
    
    // Get all responses for this scene
    const { data: allResponses } = await supabase
      .from('journey_scene_responses')
      .select('navicue_id')
      .eq('user_id', user_id)
      .eq('journey_id', journey_id)
      .eq('scene_id', scene_id);
    
    const completedNavicues = new Set(allResponses?.map(r => r.navicue_id) || []);
    const sceneCompleted = requiredNavicues.every(nc => completedNavicues.has(nc));
    
    // 3) Update progress if scene is completed
    if (sceneCompleted) {
      const { data: currentProgress } = await supabase
        .from('journey_progress')
        .select('*')
        .eq('journey_id', journey_id)
        .eq('user_id', user_id)
        .maybeSingle();
      
      const completedScenes = new Set(currentProgress?.completed_scene_numbers || []);
      completedScenes.add(scene_number);
      
      await supabase
        .from('journey_progress')
        .upsert({
          user_id,
          journey_id,
          last_completed_scene_number: scene_number,
          in_progress_scene_number: scene_number + 1,
          completed_scene_numbers: Array.from(completedScenes),
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,journey_id'
        });
    }
    
    // 4) Return updated progress
    const { data: updatedProgress } = await supabase
      .from('journey_progress')
      .select('*')
      .eq('journey_id', journey_id)
      .eq('user_id', user_id)
      .maybeSingle();
    
    return c.json({
      ok: true,
      scene_completed: sceneCompleted,
      progress: updatedProgress ? {
        last_completed_scene_number: updatedProgress.last_completed_scene_number,
        in_progress_scene_number: updatedProgress.in_progress_scene_number,
        completed_scene_numbers: updatedProgress.completed_scene_numbers || []
      } : null
    });
    
  } catch (error: any) {
    console.error('Error in submit_scene_response:', error);
    return c.json({ 
      error: 'Failed to submit response',
      details: error.message 
    }, 500);
  }
});

// ============================================================================
// ANALYTICS: Track journey events
// ============================================================================

journey.post('/analytics', async (c) => {
  try {
    const body = await c.req.json();
    const {
      user_id,
      journey_id,
      event_type,
      event_data
    } = body;
    
    // Valid event types:
    // journey_started, scene_viewed, navicue_shown, response_submitted,
    // scene_completed, journey_completed, journey_abandoned
    
    const supabase = getSupabaseClient();
    
    const { error } = await supabase
      .from('journey_analytics')
      .insert({
        user_id,
        journey_id,
        event_type,
        event_data,
        created_at: new Date().toISOString()
      });
    
    if (error) {
      console.error('Error logging analytics:', error);
      // Don't fail the request if analytics fails
    }
    
    return c.json({ ok: true });
    
  } catch (error: any) {
    console.error('Error in journey analytics:', error);
    return c.json({ ok: true }); // Always return ok for analytics
  }
});

export default journey;