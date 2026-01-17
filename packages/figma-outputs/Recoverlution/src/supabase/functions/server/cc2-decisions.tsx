/**
 * CC2 DECISIONS ENDPOINT
 * Decision Inspector for LUMA decision traces
 */

import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const app = new Hono();

// GET /decisions/:id - Get decision trace
app.get('/:id', async (c) => {
  try {
    const decisionId = c.req.param('id');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Get decision from feed_exposures
    const { data: decision, error } = await supabase
      .from('feed_exposures')
      .select('*, content_items(title, kind, pillar)')
      .eq('id', decisionId)
      .single();

    if (error || !decision) {
      return c.json({ error: 'Decision not found' }, 404);
    }

    // Get user state at decision time
    const { data: stateData } = await supabase
      .from('state_checkins')
      .select('*')
      .eq('user_id', decision.user_id)
      .lte('created_at', decision.surfaced_at)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    // Get user context at decision time
    const { data: contextData } = await supabase
      .from('user_contexts')
      .select('*')
      .eq('user_id', decision.user_id)
      .lte('detected_at', decision.surfaced_at)
      .order('detected_at', { ascending: false })
      .limit(1)
      .single();

    // Build decision trace
    const trace = {
      decision_id: decision.id,
      content: decision.content_items,
      surfaced_at: decision.surfaced_at,
      clicked_at: decision.clicked_at,
      converted_at: decision.converted_at,
      rating: decision.rating,
      user_state: stateData || null,
      user_context: contextData || null,
      decision_metadata: decision.decision_metadata || {},
      why_now: decision.decision_metadata?.why_now || 'LUMA selected this content based on your current state and context',
      reasoning: {
        state_fit: `Energy: ${stateData?.energy || 'unknown'}, Clarity: ${stateData?.clarity || 'unknown'}, Anchorage: ${stateData?.anchorage || 'unknown'}`,
        context_fit: contextData?.primary_context || 'unknown',
        pillar_match: decision.content_items?.pillar || 'unknown',
        timing: 'Optimal based on user activity pattern',
      },
    };

    return c.json(trace);
  } catch (error) {
    console.error('Error in cc2-decisions:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
