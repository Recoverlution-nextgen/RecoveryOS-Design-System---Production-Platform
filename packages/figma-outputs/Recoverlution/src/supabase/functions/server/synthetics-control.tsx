import { Hono } from 'npm:hono';
import { createClient } from 'npm:@supabase/supabase-js';
import { runSynthetics } from './synthetics-runner.ts';

const app = new Hono();

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Get current synthetics status
app.get('/status', async (c) => {
  try {
    const { data: settings, error: settingsError } = await supabase
      .from('synthetic_settings')
      .select('*')
      .single();

    if (settingsError) throw settingsError;

    // Get recent activity counts
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    
    const { count: eventCount } = await supabase
      .from('journey_scene_events')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', fiveMinAgo)
      .eq('event_payload->>synthetic', 'true');

    const { count: mindblockCount } = await supabase
      .from('mindblock_events')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', fiveMinAgo)
      .eq('evidence->>synthetic', 'true');

    // Get sim user IDs first
    const { data: simUsers } = await supabase
      .from('sim_users')
      .select('profile_id');
    
    const simUserIds = simUsers?.map(u => u.profile_id) || [];

    const { data: activeJourneys } = await supabase
      .from('journey_instances')
      .select('id, user_id, current_scene_number, started_at')
      .in('user_id', simUserIds)
      .eq('status', 'active')
      .order('started_at', { ascending: false })
      .limit(10);

    return c.json({
      settings,
      activity: {
        last_5_min: {
          scene_events: eventCount || 0,
          mindblock_events: mindblockCount || 0,
        },
        active_journeys: activeJourneys?.length || 0,
        recent_journeys: activeJourneys || []
      },
      status: settings?.enabled ? 'running' : 'paused'
    });
  } catch (error: any) {
    console.error('Error fetching synthetics status:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Toggle synthetics on/off
app.post('/toggle', async (c) => {
  try {
    const { enabled } = await c.req.json();
    
    const { data, error } = await supabase
      .from('synthetic_settings')
      .update({ enabled, updated_at: new Date().toISOString() })
      .eq('id', 1)
      .select()
      .single();

    if (error) throw error;

    return c.json({ 
      success: true, 
      enabled: data.enabled,
      message: data.enabled ? 'Synthetics enabled' : 'Synthetics paused'
    });
  } catch (error: any) {
    console.error('Error toggling synthetics:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Update synthetics settings
app.post('/settings', async (c) => {
  try {
    const body = await c.req.json();
    const { sessions_per_min, max_per_run, error_rate, abandon_rate } = body;
    
    const updates: any = { updated_at: new Date().toISOString() };
    if (sessions_per_min !== undefined) updates.sessions_per_min = sessions_per_min;
    if (max_per_run !== undefined) updates.max_per_run = max_per_run;
    if (error_rate !== undefined) updates.error_rate = error_rate;
    if (abandon_rate !== undefined) updates.abandon_rate = abandon_rate;

    const { data, error } = await supabase
      .from('synthetic_settings')
      .update(updates)
      .eq('id', 1)
      .select()
      .single();

    if (error) throw error;

    return c.json({ success: true, settings: data });
  } catch (error: any) {
    console.error('Error updating synthetics settings:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Manual trigger - run N sessions immediately
app.post('/run-now', async (c) => {
  try {
    const { target = 5 } = await c.req.json();
    
    // Call the synthetics runner directly (backend module)
    const result = await runSynthetics(target);
    
    return c.json({ 
      success: result.success, 
      result 
    });
  } catch (error: any) {
    console.error('Error running synthetics manually:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Get activity summary for last N hours
app.get('/activity/:hours', async (c) => {
  try {
    const hours = parseInt(c.req.param('hours') || '24');
    const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

    // Scene events by type
    const { data: eventsByType } = await supabase
      .from('journey_scene_events')
      .select('event_type')
      .gte('created_at', since)
      .eq('event_payload->>synthetic', 'true');

    const eventTypeCounts = eventsByType?.reduce((acc: any, e: any) => {
      acc[e.event_type] = (acc[e.event_type] || 0) + 1;
      return acc;
    }, {}) || {};

    // Mindblock events by signal type
    const { data: mindblocksByType } = await supabase
      .from('mindblock_events')
      .select('signal_type')
      .gte('created_at', since)
      .eq('evidence->>synthetic', 'true');

    const mindblockTypeCounts = mindblocksByType?.reduce((acc: any, m: any) => {
      acc[m.signal_type] = (acc[m.signal_type] || 0) + 1;
      return acc;
    }, {}) || {};

    // Journeys completed
    // Get sim user IDs first
    const { data: simUsersForCompleted } = await supabase
      .from('sim_users')
      .select('profile_id');
    
    const simUserIdsForCompleted = simUsersForCompleted?.map(u => u.profile_id) || [];
    
    const { count: completedCount } = await supabase
      .from('journey_instances')
      .select('*', { count: 'exact', head: true })
      .in('user_id', simUserIdsForCompleted)
      .eq('status', 'completed')
      .gte('completed_at', since);

    // Scenes completed
    const { count: scenesCount } = await supabase
      .from('journey_instance_scenes')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed')
      .gte('completed_at', since);

    return c.json({
      period_hours: hours,
      since,
      scene_events_by_type: eventTypeCounts,
      mindblock_events_by_type: mindblockTypeCounts,
      journeys_completed: completedCount || 0,
      scenes_completed: scenesCount || 0,
      total_events: (eventsByType?.length || 0) + (mindblocksByType?.length || 0)
    });
  } catch (error: any) {
    console.error('Error fetching activity summary:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Cleanup old synthetic data
app.post('/cleanup', async (c) => {
  try {
    const { retain_days = 45 } = await c.req.json();
    const cutoff = new Date(Date.now() - retain_days * 24 * 60 * 60 * 1000).toISOString();

    let deleted = 0;

    // Clean old scene events
    const { error: e1 } = await supabase
      .from('journey_scene_events')
      .delete()
      .lt('created_at', cutoff)
      .eq('event_payload->>synthetic', 'true');
    if (e1) console.error('Error cleaning scene events:', e1);

    // Clean old mindblock events
    const { error: e2 } = await supabase
      .from('mindblock_events')
      .delete()
      .lt('created_at', cutoff)
      .eq('evidence->>synthetic', 'true');
    if (e2) console.error('Error cleaning mindblock events:', e2);

    // Clean old captures
    const { error: e3 } = await supabase
      .from('journey_scene_captures')
      .delete()
      .lt('created_at', cutoff);
    if (e3) console.error('Error cleaning captures:', e3);

    // Clean completed synthetic journeys
    const { data: simUsers } = await supabase
      .from('sim_users')
      .select('profile_id');
    
    if (simUsers && simUsers.length > 0) {
      const userIds = simUsers.map((u: any) => u.profile_id);
      const { error: e4 } = await supabase
        .from('journey_instances')
        .delete()
        .in('user_id', userIds)
        .eq('status', 'completed')
        .lt('completed_at', cutoff);
      if (e4) console.error('Error cleaning journey instances:', e4);
    }

    return c.json({ 
      success: true, 
      message: `Cleaned synthetic data older than ${retain_days} days`,
      cutoff_date: cutoff
    });
  } catch (error: any) {
    console.error('Error cleaning synthetic data:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Check sim_users availability
app.get('/sim-users', async (c) => {
  try {
    const { data: users, error } = await supabase
      .from('sim_users')
      .select('profile_id, org_id, started_at')
      .order('started_at', { ascending: true })
      .limit(20);

    if (error) throw error;

    return c.json({ 
      count: users?.length || 0,
      users: users || [],
      ready: (users?.length || 0) > 0
    });
  } catch (error: any) {
    console.error('Error fetching sim users:', error);
    return c.json({ error: error.message }, 500);
  }
});

export default app;