/**
 * CC2 INDIVIDUAL DATA ROUTES
 * Individual-level data aggregation for patient/user tracking
 */

import { Hono } from 'npm:hono';
import { createClient } from 'npm:@supabase/supabase-js@2';

const app = new Hono();

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * GET /cc2/individuals/list
 * List individuals with filters
 */
app.get('/list', async (c) => {
  try {
    const url = new URL(c.req.url);
    const organization_id = url.searchParams.get('organization_id');
    const professional_id = url.searchParams.get('professional_id');
    const status = url.searchParams.get('status'); // active, inactive, paused, graduated
    const search = url.searchParams.get('search'); // name or email search
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    let query = supabase
      .from('profiles')
      .select(`
        id,
        email,
        full_name,
        role,
        organization_id,
        created_at,
        updated_at,
        metadata,
        organizations:organization_id(id, name)
      `)
      .eq('role', 'patient')
      .order('created_at', { ascending: false });

    if (organization_id) {
      query = query.eq('organization_id', organization_id);
    }

    // Note: status filtering removed as column doesn't exist in profiles table
    // Consider adding status to profiles table or tracking it in metadata

    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    query = query.range(offset, offset + limit - 1);

    const { data: individuals, error, count } = await query;

    if (error) throw error;

    // Get total count
    const { count: totalCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'patient');

    return c.json({
      individuals: individuals || [],
      total: totalCount || 0,
      limit,
      offset,
      hasMore: (offset + limit) < (totalCount || 0),
    });
  } catch (error) {
    console.error('Error fetching individuals list:', error);
    return c.json({ error: 'Failed to fetch individuals' }, 500);
  }
});

/**
 * GET /cc2/individuals/:id
 * Get comprehensive individual data
 */
app.get('/:id', async (c) => {
  try {
    const individualId = c.req.param('id');

    // Get profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select(`
        *,
        organizations:organization_id(id, name, organization_type)
      `)
      .eq('id', individualId)
      .single();

    if (profileError) throw profileError;
    if (!profile) {
      return c.json({ error: 'Individual not found' }, 404);
    }

    // Get engagement stats
    const { data: engagements } = await supabase
      .from('content_engagements')
      .select('action, content_type, created_at')
      .eq('individual_id', individualId);

    // Get NaviCue responses
    const { data: navicueResponses } = await supabase
      .from('navicue_responses_v2')
      .select('response_type, latency_ms, helpful, created_at')
      .eq('individual_id', individualId);

    // Get current journey
    const { data: currentJourney } = await supabase
      .from('journey_instances')
      .select('*')
      .eq('individual_id', individualId)
      .eq('status', 'running')
      .order('started_at', { ascending: false })
      .limit(1)
      .single();

    // Get recent state checkins
    const { data: stateCheckins } = await supabase
      .from('state_checkins')
      .select('energy, clarity, connection, notes, created_at')
      .eq('individual_id', individualId)
      .order('created_at', { ascending: false })
      .limit(30);

    // Get context detections
    const { data: contextDetections } = await supabase
      .from('context_detections_v24')
      .select('context_key, confidence, source, created_at')
      .eq('individual_id', individualId)
      .order('created_at', { ascending: false })
      .limit(50);

    // Get proofs
    const { data: proofs } = await supabase
      .from('proofs')
      .select('outcome, content_kind, friction, evidence, created_at')
      .eq('individual_id', individualId)
      .order('created_at', { ascending: false })
      .limit(100);

    // Get transfer test results
    const { data: transferTests } = await supabase
      .from('transfer_test_results')
      .select('outcome, content_kind, friction, evidence, created_at')
      .eq('individual_id', individualId)
      .order('created_at', { ascending: false });

    // Calculate engagement metrics
    const metrics = {
      total_engagements: engagements?.length || 0,
      navicue_responses: navicueResponses?.length || 0,
      navicue_response_rate: navicueResponses ? 
        (navicueResponses.filter((r: any) => r.response_type !== 'none').length / navicueResponses.length) : 0,
      avg_latency: navicueResponses && navicueResponses.length > 0 ?
        navicueResponses.reduce((sum: number, r: any) => sum + (r.latency_ms || 0), 0) / navicueResponses.length : 0,
      helpful_rate: navicueResponses ?
        (navicueResponses.filter((r: any) => r.helpful === true).length / navicueResponses.length) : 0,
      state_checkin_count: stateCheckins?.length || 0,
      proofs_collected: proofs?.length || 0,
      transfer_tests: transferTests?.length || 0,
    };

    return c.json({
      profile,
      metrics,
      current_journey: currentJourney || null,
      recent_state: stateCheckins || [],
      recent_context: contextDetections || [],
      recent_proofs: proofs?.slice(0, 10) || [],
      transfer_tests: transferTests || [],
    });
  } catch (error) {
    console.error('Error fetching individual data:', error);
    return c.json({ error: 'Failed to fetch individual data' }, 500);
  }
});

/**
 * GET /cc2/individuals/:id/timeline
 * Get chronological activity timeline
 */
app.get('/:id/timeline', async (c) => {
  try {
    const individualId = c.req.param('id');
    const limit = parseInt(c.req.query('limit') || '100');

    // Get all events from user_events table
    const { data: events } = await supabase
      .from('user_events')
      .select('*')
      .eq('individual_id', individualId)
      .order('created_at', { ascending: false })
      .limit(limit);

    // Get NaviCue responses
    const { data: navicues } = await supabase
      .from('navicue_responses_v2')
      .select(`
        *,
        navicue:navicues_v2(code, component_type)
      `)
      .eq('individual_id', individualId)
      .order('created_at', { ascending: false })
      .limit(limit);

    // Get journey scene completions
    const { data: scenes } = await supabase
      .from('scene_runs')
      .select(`
        *,
        journey:journey_instances!inner(template_id)
      `)
      .eq('journey.individual_id', individualId)
      .order('completed_at', { ascending: false })
      .limit(limit);

    // Get state checkins
    const { data: states } = await supabase
      .from('state_checkins')
      .select('*')
      .eq('individual_id', individualId)
      .order('created_at', { ascending: false })
      .limit(limit);

    // Merge and sort all events
    const timeline = [
      ...(events || []).map((e: any) => ({ ...e, type: 'event', timestamp: e.created_at })),
      ...(navicues || []).map((n: any) => ({ ...n, type: 'navicue', timestamp: n.created_at })),
      ...(scenes || []).map((s: any) => ({ ...s, type: 'scene', timestamp: s.completed_at })),
      ...(states || []).map((s: any) => ({ ...s, type: 'state', timestamp: s.created_at })),
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return c.json({ timeline });
  } catch (error) {
    console.error('Error fetching timeline:', error);
    return c.json({ error: 'Failed to fetch timeline' }, 500);
  }
});

/**
 * GET /cc2/individuals/:id/schema-focus
 * Get schema/mindblock focus analysis
 */
app.get('/:id/schema-focus', async (c) => {
  try {
    const individualId = c.req.param('id');

    // Get all content engagements with mindblocks
    const { data: engagements } = await supabase
      .from('content_engagements')
      .select('content_id, action, created_at')
      .eq('individual_id', individualId)
      .eq('content_type', 'mindblock');

    if (!engagements || engagements.length === 0) {
      return c.json({ schemas: [], families: [], mindblocks: [] });
    }

    // Get mindblock details to extract schema/family
    const mindblockIds = [...new Set(engagements.map((e: any) => e.content_id))];
    
    const { data: mindblocks } = await supabase
      .from('mindblock_library')
      .select(`
        id,
        mindblock_key,
        heat,
        kbe_stage,
        family:family_catalog!inner(
          id,
          family_key,
          title,
          schema:schema_catalog!inner(
            id,
            schema_key,
            title
          )
        )
      `)
      .in('id', mindblockIds);

    // Aggregate by schema
    const schemaMap = new Map();
    const familyMap = new Map();
    const mindblockMap = new Map();

    mindblocks?.forEach((mb: any) => {
      const schemaKey = mb.family?.schema?.schema_key;
      const familyKey = mb.family?.family_key;
      
      if (schemaKey) {
        schemaMap.set(schemaKey, {
          schema_id: mb.family.schema.id,
          schema_key: schemaKey,
          title: mb.family.schema.title,
          count: (schemaMap.get(schemaKey)?.count || 0) + 1,
        });
      }

      if (familyKey) {
        familyMap.set(familyKey, {
          family_id: mb.family.id,
          family_key: familyKey,
          title: mb.family.title,
          schema_key: schemaKey,
          count: (familyMap.get(familyKey)?.count || 0) + 1,
        });
      }

      mindblockMap.set(mb.id, {
        mindblock_id: mb.id,
        mindblock_key: mb.mindblock_key,
        heat: mb.heat,
        kbe_stage: mb.kbe_stage,
        family_key: familyKey,
        count: (mindblockMap.get(mb.id)?.count || 0) + 1,
      });
    });

    return c.json({
      schemas: Array.from(schemaMap.values()).sort((a, b) => b.count - a.count),
      families: Array.from(familyMap.values()).sort((a, b) => b.count - a.count),
      mindblocks: Array.from(mindblockMap.values()).sort((a, b) => b.count - a.count),
    });
  } catch (error) {
    console.error('Error fetching schema focus:', error);
    return c.json({ error: 'Failed to fetch schema focus' }, 500);
  }
});

/**
 * GET /cc2/individuals/stats
 * Get overall individual statistics
 */
app.get('/stats', async (c) => {
  try {
    const organization_id = c.req.query('organization_id');

    let query = supabase
      .from('profiles')
      .select('status, role', { count: 'exact', head: true })
      .eq('role', 'patient');

    if (organization_id) {
      query = query.eq('organization_id', organization_id);
    }

    const { count: totalPatients } = await query;

    // Count by status
    const statusCounts = {
      active: 0,
      inactive: 0,
      paused: 0,
      graduated: 0,
    };

    for (const status of Object.keys(statusCounts)) {
      let statusQuery = supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'patient')
        .eq('status', status);

      if (organization_id) {
        statusQuery = statusQuery.eq('organization_id', organization_id);
      }

      const { count } = await statusQuery;
      statusCounts[status as keyof typeof statusCounts] = count || 0;
    }

    return c.json({
      total: totalPatients || 0,
      byStatus: statusCounts,
    });
  } catch (error) {
    console.error('Error fetching individual stats:', error);
    return c.json({ error: 'Failed to fetch stats' }, 500);
  }
});

export default app;