/**
 * SCHEDULING ENDPOINT
 * Calendar integration (Google/Outlook)
 */

import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const app = new Hono();

// POST /scheduling/google/auth - Google Calendar OAuth
app.post('/google/auth', async (c) => {
  // TODO: Implement Google OAuth flow
  return c.json({ auth_url: 'https://accounts.google.com/o/oauth2/v2/auth?...' });
});

// POST /scheduling/outlook/auth - Outlook Calendar OAuth
app.post('/outlook/auth', async (c) => {
  // TODO: Implement Microsoft OAuth flow
  return c.json({ auth_url: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?...' });
});

// GET /scheduling/availability/:professional_id - Get availability
app.get('/availability/:professional_id', async (c) => {
  try {
    const professionalId = c.req.param('professional_id');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data } = await supabase
      .from('professionals')
      .select('availability')
      .eq('id', professionalId)
      .single();

    return c.json(data?.availability || {});
  } catch (error) {
    console.error('Error fetching availability:', error);
    return c.json({ error: 'Failed to fetch availability' }, 500);
  }
});

// POST /scheduling/book - Book session
app.post('/book', async (c) => {
  try {
    const { professional_id, individual_id, scheduled_time, duration_minutes } = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('therapy_sessions')
      .insert({
        professional_id,
        individual_id,
        scheduled_time,
        duration_minutes: duration_minutes || 60,
        status: 'scheduled',
      })
      .select()
      .single();

    if (error) {
      console.error('Error booking session:', error);
      return c.json({ error: 'Failed to book session' }, 500);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error in POST /scheduling/book:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// PUT /scheduling/:id/reschedule - Reschedule session
app.put('/:id/reschedule', async (c) => {
  try {
    const sessionId = c.req.param('id');
    const { scheduled_time } = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('therapy_sessions')
      .update({ scheduled_time })
      .eq('id', sessionId)
      .select()
      .single();

    if (error) {
      console.error('Error rescheduling session:', error);
      return c.json({ error: 'Failed to reschedule session' }, 500);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error in PUT /scheduling/:id/reschedule:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// DELETE /scheduling/:id/cancel - Cancel session
app.delete('/:id/cancel', async (c) => {
  try {
    const sessionId = c.req.param('id');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { error } = await supabase
      .from('therapy_sessions')
      .update({ status: 'cancelled' })
      .eq('id', sessionId);

    if (error) {
      console.error('Error cancelling session:', error);
      return c.json({ error: 'Failed to cancel session' }, 500);
    }

    return c.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /scheduling/:id/cancel:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
