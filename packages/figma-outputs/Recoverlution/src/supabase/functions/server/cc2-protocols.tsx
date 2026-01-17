/**
 * CC2 PROTOCOL ROUTES
 * Analytics and management for journey protocols
 */

import { Hono } from 'npm:hono';
import { createClient } from 'npm:@supabase/supabase-js@2';

const app = new Hono();

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * POST /cc2/protocols/sync
 * Refresh protocol analytics materialized views
 */
app.post('/sync', async (c) => {
  try {
    // Call the RPC function to refresh materialized views
    const { data, error } = await supabase.rpc('refresh_protocol_analytics');
    
    if (error) throw error;

    return c.json({
      success: true,
      refreshed: true,
      timestamp: new Date().toISOString(),
      message: 'Protocol analytics refreshed successfully',
    });
  } catch (error) {
    console.error('Error syncing protocol analytics:', error);
    return c.json({ error: error.message || 'Failed to sync protocol analytics' }, 500);
  }
});

/**
 * GET /cc2/protocols/list
 * Get all protocols
 */
app.get('/list', async (c) => {
  try {
    const { data, error } = await supabase
      .from('protocols_by_slug')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;

    return c.json({ protocols: data || [] });
  } catch (error) {
    console.error('Error fetching protocols:', error);
    return c.json({ error: 'Failed to fetch protocols' }, 500);
  }
});

/**
 * GET /cc2/protocols/active
 * Get active protocols only
 */
app.get('/active', async (c) => {
  try {
    const { data, error } = await supabase
      .from('protocols_active')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;

    return c.json({ protocols: data || [] });
  } catch (error) {
    console.error('Error fetching active protocols:', error);
    return c.json({ error: 'Failed to fetch active protocols' }, 500);
  }
});

/**
 * GET /cc2/protocols/summary
 * Get protocol summary with KPIs (uses materialized view)
 */
app.get('/summary', async (c) => {
  try {
    const { data, error } = await supabase
      .from('mv_protocol_summary')
      .select('*')
      .order('missing_contracts', { ascending: false });

    if (error) throw error;

    return c.json({ 
      protocols: data || [],
      last_refreshed: data?.[0]?.refreshed_at || null
    });
  } catch (error) {
    console.error('Error fetching protocol summary:', error);
    return c.json({ error: 'Failed to fetch protocol summary' }, 500);
  }
});

/**
 * GET /cc2/protocols/:id/integrity
 * Get integrity issues for a specific protocol
 */
app.get('/:id/integrity', async (c) => {
  try {
    const protocolId = c.req.param('id');

    const { data, error } = await supabase
      .from('protocol_integrity_issues')
      .select('*')
      .eq('protocol_id', protocolId)
      .order('scene_number', { ascending: true });

    if (error) throw error;

    return c.json({ issues: data || [] });
  } catch (error) {
    console.error('Error fetching protocol integrity:', error);
    return c.json({ error: 'Failed to fetch integrity issues' }, 500);
  }
});

/**
 * GET /cc2/protocols/:id/breakdown
 * Get phase/scene-type breakdown for charts
 */
app.get('/:id/breakdown', async (c) => {
  try {
    const protocolId = c.req.param('id');

    const { data, error } = await supabase
      .from('mv_protocol_step_summary')
      .select('*')
      .eq('protocol_id', protocolId);

    if (error) throw error;

    return c.json({ breakdown: data || [] });
  } catch (error) {
    console.error('Error fetching protocol breakdown:', error);
    return c.json({ error: 'Failed to fetch protocol breakdown' }, 500);
  }
});

/**
 * GET /cc2/protocols/stats
 * Get overall protocol statistics
 */
app.get('/stats', async (c) => {
  try {
    // Get counts from summary view
    const { data: summary, error: sumErr } = await supabase
      .from('mv_protocol_summary')
      .select('protocol_status, scene_count, contract_count, missing_contracts');

    if (sumErr) throw sumErr;

    const stats = {
      total_protocols: summary?.length || 0,
      active_protocols: summary?.filter((p: any) => p.protocol_status === 'active').length || 0,
      draft_protocols: summary?.filter((p: any) => p.protocol_status === 'draft').length || 0,
      archived_protocols: summary?.filter((p: any) => p.protocol_status === 'archived').length || 0,
      total_scenes: summary?.reduce((sum: number, p: any) => sum + (p.scene_count || 0), 0) || 0,
      total_contracts: summary?.reduce((sum: number, p: any) => sum + (p.contract_count || 0), 0) || 0,
      total_missing_contracts: summary?.reduce((sum: number, p: any) => sum + (p.missing_contracts || 0), 0) || 0,
    };

    return c.json({ stats });
  } catch (error) {
    console.error('Error fetching protocol stats:', error);
    return c.json({ error: 'Failed to fetch protocol stats' }, 500);
  }
});

export default app;
