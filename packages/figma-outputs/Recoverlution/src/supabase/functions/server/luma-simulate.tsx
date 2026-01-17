/**
 * LUMA SIMULATE ENDPOINT
 * Server-side LUMA simulation for testing
 */

import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const app = new Hono();

// POST /simulate - Simulate LUMA decision
app.post('/simulate', async (c) => {
  try {
    const body = await c.req.json();
    const { user_id, state_override, context } = body;

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Use override state or fetch real user state
    let userState = state_override;
    if (!userState && user_id) {
      const { data } = await supabase
        .from('state_checkins')
        .select('*')
        .eq('user_id', user_id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      userState = data ? {
        energy: data.energy,
        clarity: data.clarity,
        anchorage: data.anchorage,
      } : { energy: 5, clarity: 5, anchorage: 5 };
    }

    // Simple LUMA logic simulation
    const predictions = [];

    // Rule 1: Low energy → Downshift video
    if (userState.energy < 4) {
      predictions.push({
        content_type: 'wellbeing_video',
        pillar: 'Stress Resilience',
        purpose: 'downshift',
        why_now: 'Your energy is low. A grounding practice will help you regulate.',
        confidence: 0.85,
      });
    }

    // Rule 2: Low clarity → Cognitive Reframing block
    if (userState.clarity < 4) {
      predictions.push({
        content_type: 'block',
        pillar: 'Cognitive Reframing',
        why_now: 'Your clarity is low. This article will help untangle your thinking.',
        confidence: 0.78,
      });
    }

    // Rule 3: Low anchorage → Identity Integration practice
    if (userState.anchorage < 4) {
      predictions.push({
        content_type: 'practice',
        pillar: 'Identity Integration',
        why_now: 'Your sense of anchorage is shaky. This practice will help you reconnect with your values.',
        confidence: 0.82,
      });
    }

    // Rule 4: Morning context → NaviCue
    if (context === 'morning_checkin') {
      predictions.push({
        content_type: 'navicue',
        family: 'morning_prompt',
        why_now: 'A morning check-in to set your intention for the day.',
        confidence: 0.90,
      });
    }

    // Rule 5: High state → Challenge content
    if (userState.energy >= 7 && userState.clarity >= 7) {
      predictions.push({
        content_type: 'block',
        pillar: 'Decision Mastery',
        why_now: 'You are in a high-resource state. This is the perfect time for deeper cognitive work.',
        confidence: 0.88,
      });
    }

    // Default: Random engagement
    if (predictions.length === 0) {
      predictions.push({
        content_type: 'navicue',
        family: 'placebo_engagement',
        why_now: 'A light engagement moment to maintain connection.',
        confidence: 0.65,
      });
    }

    return c.json({
      user_state: userState,
      context: context || 'unknown',
      predictions: predictions.slice(0, 3), // Top 3
      simulated_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in luma-simulate:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
