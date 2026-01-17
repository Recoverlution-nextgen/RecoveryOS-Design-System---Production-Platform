// supabase/functions/make-server-49b28b8a/v1-ingest.tsx
// Unified write endpoint for all user interactions

import { Hono } from 'npm:hono';
import { getUserFromRequest, requireAuth } from '../_shared/auth.ts';
import { broadcastToUser } from '../_shared/realtime.ts';
import { isProcessed, markProcessed } from '../_shared/idempotency.ts';

const app = new Hono();

// POST /v1/ingest/navicue-response
app.post('/navicue-response', async (c) => {
  const user = await getUserFromRequest(c.req.raw);
  requireAuth(user);
  
  const body = await c.req.json();
  const { idempotency_key, navicue_id, response_data, decision_id } = body;
  
  // Check idempotency
  if (idempotency_key) {
    const check = isProcessed(idempotency_key);
    if (check.processed) {
      return c.json(check.response, 200);
    }
  }
  
  try {
    const { createClient } = await import('jsr:@supabase/supabase-js@2');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
    
    // Write to navicue_responses
    const { data: responseRecord, error: writeError } = await supabase
      .from('navicue_responses')
      .insert({
        user_id: user.sub,
        navicue_id,
        response_data,
        decision_id,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (writeError) {
      console.error('[Ingest] NaviCue response write error:', writeError);
      return c.json({ error: 'Failed to save response' }, 500);
    }
    
    // Write to event_spine
    await supabase.from('event_spine').insert({
      user_id: user.sub,
      event_type: 'navicue_response',
      event_data: { navicue_id, decision_id },
      occurred_at: new Date().toISOString(),
    });
    
    // Compute next move (simplified - replace with actual decision logic)
    const { data: nextItem } = await supabase.rpc('get_next_feed_item', {
      p_user_id: user.sub,
    });
    
    // Broadcast update to user's feed channel
    await broadcastToUser(user.sub, 'feed', {
      type: 'navicue_completed',
      payload: {
        navicue_id,
        next: nextItem,
      },
    });
    
    const response = {
      status: 'ok',
      recorded: responseRecord,
      next: nextItem || null,
    };
    
    if (idempotency_key) {
      markProcessed(idempotency_key, response);
    }
    
    return c.json(response);
  } catch (error) {
    console.error('[Ingest] Error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /v1/ingest/state-checkin
app.post('/state-checkin', async (c) => {
  const user = await getUserFromRequest(c.req.raw);
  requireAuth(user);
  
  const body = await c.req.json();
  const { arousal_level, focus_level, context, idempotency_key } = body;
  
  if (idempotency_key) {
    const check = isProcessed(idempotency_key);
    if (check.processed) return c.json(check.response, 200);
  }
  
  try {
    const { createClient } = await import('jsr:@supabase/supabase-js@2');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
    
    // Write to state_checkins
    const { data: checkin } = await supabase
      .from('state_checkins')
      .insert({
        user_id: user.sub,
        arousal_level,
        focus_level,
        context_data: context,
        checked_in_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    // Update user_arousal_state (latest state)
    await supabase
      .from('user_arousal_state')
      .upsert({
        user_id: user.sub,
        current_level: arousal_level,
        updated_at: new Date().toISOString(),
      });
    
    // Write to event_spine
    await supabase.from('event_spine').insert({
      user_id: user.sub,
      event_type: 'state_checkin',
      event_data: { arousal_level, focus_level },
      occurred_at: new Date().toISOString(),
    });
    
    const response = {
      status: 'ok',
      recorded: checkin,
    };
    
    if (idempotency_key) {
      markProcessed(idempotency_key, response);
    }
    
    return c.json(response);
  } catch (error) {
    console.error('[Ingest] State checkin error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /v1/ingest/practice-complete
app.post('/practice-complete', async (c) => {
  const user = await getUserFromRequest(c.req.raw);
  requireAuth(user);
  
  const body = await c.req.json();
  const { practice_id, duration_seconds, quality_rating, idempotency_key } = body;
  
  if (idempotency_key) {
    const check = isProcessed(idempotency_key);
    if (check.processed) return c.json(check.response, 200);
  }
  
  try {
    const { createClient } = await import('jsr:@supabase/supabase-js@2');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
    
    // Write to practice_logs
    const { data: log } = await supabase
      .from('practice_logs')
      .insert({
        user_id: user.sub,
        practice_id,
        duration_seconds,
        quality_rating,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    // Create proof record
    await supabase.from('proofs').insert({
      user_id: user.sub,
      proof_type: 'practice_completion',
      content_ref: practice_id,
      created_at: new Date().toISOString(),
    });
    
    // Write to event_spine
    await supabase.from('event_spine').insert({
      user_id: user.sub,
      event_type: 'practice_complete',
      event_data: { practice_id, duration_seconds, quality_rating },
      occurred_at: new Date().toISOString(),
    });
    
    const response = {
      status: 'ok',
      recorded: log,
    };
    
    if (idempotency_key) {
      markProcessed(idempotency_key, response);
    }
    
    return c.json(response);
  } catch (error) {
    console.error('[Ingest] Practice complete error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /v1/ingest/scene-event
app.post('/scene-event', async (c) => {
  const user = await getUserFromRequest(c.req.raw);
  requireAuth(user);
  
  const body = await c.req.json();
  const { journey_instance_id, scene_id, event_type, event_data, idempotency_key } = body;
  
  if (idempotency_key) {
    const check = isProcessed(idempotency_key);
    if (check.processed) return c.json(check.response, 200);
  }
  
  try {
    const { createClient } = await import('jsr:@supabase/supabase-js@2');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
    
    // Write to journey_scene_events
    const { data: event } = await supabase
      .from('journey_scene_events')
      .insert({
        journey_instance_id,
        scene_id,
        user_id: user.sub,
        event_type,
        event_data,
        occurred_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    // Write to event_spine
    await supabase.from('event_spine').insert({
      user_id: user.sub,
      event_type: 'journey_scene_event',
      event_data: { journey_instance_id, scene_id, event_type },
      occurred_at: new Date().toISOString(),
    });
    
    // Broadcast to journey channel
    await broadcastToUser(user.sub, 'journey', {
      type: 'scene_event',
      payload: {
        scene_id,
        event_type,
      },
    });
    
    const response = {
      status: 'ok',
      recorded: event,
    };
    
    if (idempotency_key) {
      markProcessed(idempotency_key, response);
    }
    
    return c.json(response);
  } catch (error) {
    console.error('[Ingest] Scene event error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
