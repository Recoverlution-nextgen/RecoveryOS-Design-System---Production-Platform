/**
 * CC2 EVENTS ENDPOINT
 * Event Explorer data for Command Center 2
 */

import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const app = new Hono();

// GET /events - Query event spine
app.get('/', async (c) => {
  try {
    const eventType = c.req.query('event_type');
    const userId = c.req.query('user_id');
    const dateFrom = c.req.query('date_from');
    const dateTo = c.req.query('date_to');
    const limit = parseInt(c.req.query('limit') || '100');
    const offset = parseInt(c.req.query('offset') || '0');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    let query = supabase
      .from('event_spine')
      .select('*', { count: 'exact' })
      .order('occurred_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (eventType) {
      query = query.eq('event_type', eventType);
    }

    if (userId) {
      query = query.eq('actor_id', userId);
    }

    if (dateFrom) {
      query = query.gte('occurred_at', dateFrom);
    }

    if (dateTo) {
      query = query.lte('occurred_at', dateTo);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching events:', error);
      return c.json({ error: 'Failed to fetch events' }, 500);
    }

    return c.json({
      data: data || [],
      count: count || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error in cc2-events:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
