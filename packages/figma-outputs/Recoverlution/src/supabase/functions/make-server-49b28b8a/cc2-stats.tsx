/**
 * CC2 STATS ENDPOINT
 * Dashboard statistics for Command Center 2 Home
 */

import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const app = new Hono();

// GET /cc2/stats - Dashboard statistics
app.get('/stats', async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Count live content
    const { count: contentLive } = await supabase
      .from('content_items')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published');

    // Count events today
    const { count: eventsToday } = await supabase
      .from('event_spine')
      .select('*', { count: 'exact', head: true })
      .gte('occurred_at', today.toISOString());

    // Count proofs today (practice completions + article completions)
    const { count: proofsToday } = await supabase
      .from('practice_completions')
      .select('*', { count: 'exact', head: true })
      .gte('completed_at', today.toISOString());

    // Count blocks created today
    const { count: blocksToday } = await supabase
      .from('content_items')
      .select('*', { count: 'exact', head: true })
      .eq('kind', 'block')
      .gte('created_at', today.toISOString());

    // Calculate open rate (feed exposures that were clicked)
    const { count: totalExposures } = await supabase
      .from('feed_exposures')
      .select('*', { count: 'exact', head: true })
      .gte('surfaced_at', today.toISOString());

    const { count: clickedExposures } = await supabase
      .from('feed_exposures')
      .select('*', { count: 'exact', head: true })
      .gte('surfaced_at', today.toISOString())
      .not('clicked_at', 'is', null);

    const openRate = totalExposures ? Math.round((clickedExposures / totalExposures) * 100) : 0;

    // Calculate completion rate (clicked exposures that were completed)
    const { count: completedExposures } = await supabase
      .from('feed_exposures')
      .select('*', { count: 'exact', head: true })
      .gte('surfaced_at', today.toISOString())
      .not('converted_at', 'is', null);

    const completionRate = clickedExposures ? Math.round((completedExposures / clickedExposures) * 100) : 0;

    return c.json({
      content_live: contentLive || 0,
      events_today: eventsToday || 0,
      proofs_today: proofsToday || 0,
      blocks_today: blocksToday || 0,
      open_rate: openRate,
      completion_rate: completionRate,
    });
  } catch (error) {
    console.error('Error fetching CC2 stats:', error);
    return c.json({ error: 'Failed to fetch stats' }, 500);
  }
});

export default app;
