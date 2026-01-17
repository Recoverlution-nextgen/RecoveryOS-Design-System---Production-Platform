/**
 * CC2 MINDBLOCK ROUTES
 * Endpoints for managing and viewing the 2,400 mindblocks across 200 families and 20 schemas
 */

import { Hono } from 'npm:hono';
import { createClient } from 'npm:@supabase/supabase-js@2';

const app = new Hono();

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * GET /cc2/mindblocks/list
 * List all mindblocks with pagination and filters
 */
app.get('/list', async (c) => {
  try {
    const url = new URL(c.req.url);
    const schema_id = url.searchParams.get('schema_id');
    const family_id = url.searchParams.get('family_id');
    const heat = url.searchParams.get('heat'); // RED|AMBER|GREEN
    const kbe_stage = url.searchParams.get('kbe_stage'); // Knowing|Believing|Embodying
    const search = url.searchParams.get('search');
    const limit = parseInt(url.searchParams.get('limit') || '100');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    let query = supabase
      .from('mindblock_library')
      .select(`
        *,
        family:family_catalog!inner(
          id,
          family_key,
          title,
          schema_id,
          schema:schema_catalog!inner(
            id,
            schema_key,
            title
          )
        )
      `)
      .order('created_at', { ascending: false });

    // Filters
    if (schema_id) {
      query = query.eq('family.schema_id', schema_id);
    }
    if (family_id) {
      query = query.eq('family_id', family_id);
    }
    if (heat) {
      query = query.eq('heat', heat);
    }
    if (kbe_stage) {
      query = query.eq('kbe_stage', kbe_stage);
    }
    if (search) {
      query = query.or(`limiting_prediction.ilike.%${search}%,truth.ilike.%${search}%,mindblock_key.ilike.%${search}%`);
    }

    // Pagination
    query = query.range(offset, offset + limit - 1);

    const { data: mindblocks, error, count } = await query;

    if (error) throw error;

    // Get total count for pagination
    const { count: totalCount } = await supabase
      .from('mindblock_library')
      .select('*', { count: 'exact', head: true });

    return c.json({
      mindblocks: mindblocks || [],
      total: totalCount || 0,
      limit,
      offset,
      hasMore: (offset + limit) < (totalCount || 0),
    });
  } catch (error) {
    console.error('Error fetching mindblocks list:', error);
    return c.json({ error: 'Failed to fetch mindblocks' }, 500);
  }
});

/**
 * GET /cc2/mindblocks/:id
 * Get single mindblock detail
 */
app.get('/:id', async (c) => {
  try {
    const mindblockId = c.req.param('id');

    const { data: mindblock, error } = await supabase
      .from('mindblock_library')
      .select(`
        *,
        family:family_catalog!inner(
          id,
          family_key,
          title,
          description,
          archetype,
          schema:schema_catalog!inner(
            id,
            schema_key,
            title,
            description
          )
        ),
        navicue_targets:navicue_targets_v2!mindblock_id(
          navicue:navicues_v2(
            id,
            code,
            status,
            component_type
          )
        )
      `)
      .eq('id', mindblockId)
      .single();

    if (error) throw error;
    if (!mindblock) {
      return c.json({ error: 'Mindblock not found' }, 404);
    }

    return c.json({ mindblock });
  } catch (error) {
    console.error('Error fetching mindblock detail:', error);
    return c.json({ error: 'Failed to fetch mindblock' }, 500);
  }
});

/**
 * GET /cc2/mindblocks/by-heat/:heat
 * Get mindblocks filtered by heat level (RED/AMBER/GREEN)
 */
app.get('/by-heat/:heat', async (c) => {
  try {
    const heat = c.req.param('heat').toUpperCase();
    
    if (!['RED', 'AMBER', 'GREEN'].includes(heat)) {
      return c.json({ error: 'Invalid heat level. Must be RED, AMBER, or GREEN' }, 400);
    }

    const { data: mindblocks, error } = await supabase
      .from('mindblock_library')
      .select(`
        *,
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
      .eq('heat', heat)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return c.json({ mindblocks: mindblocks || [], heat });
  } catch (error) {
    console.error('Error fetching mindblocks by heat:', error);
    return c.json({ error: 'Failed to fetch mindblocks' }, 500);
  }
});

/**
 * GET /cc2/mindblocks/by-kbe/:kbe_stage
 * Get mindblocks filtered by KBE stage
 */
app.get('/by-kbe/:kbe_stage', async (c) => {
  try {
    const kbe_stage = c.req.param('kbe_stage');
    
    if (!['Knowing', 'Believing', 'Embodying'].includes(kbe_stage)) {
      return c.json({ error: 'Invalid KBE stage. Must be Knowing, Believing, or Embodying' }, 400);
    }

    const { data: mindblocks, error } = await supabase
      .from('mindblock_library')
      .select(`
        *,
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
      .eq('kbe_stage', kbe_stage)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return c.json({ mindblocks: mindblocks || [], kbe_stage });
  } catch (error) {
    console.error('Error fetching mindblocks by KBE:', error);
    return c.json({ error: 'Failed to fetch mindblocks' }, 500);
  }
});

/**
 * GET /cc2/mindblocks/stats
 * Get mindblock statistics and distribution
 */
app.get('/stats', async (c) => {
  try {
    // Total count
    const { count: totalCount } = await supabase
      .from('mindblock_library')
      .select('*', { count: 'exact', head: true });

    // Count by heat
    const { data: heatCounts } = await supabase
      .from('mindblock_library')
      .select('heat')
      .then(({ data }) => {
        const counts = { RED: 0, AMBER: 0, GREEN: 0 };
        data?.forEach((m: any) => {
          if (m.heat) counts[m.heat as keyof typeof counts]++;
        });
        return { data: counts };
      });

    // Count by KBE
    const { data: kbeCounts } = await supabase
      .from('mindblock_library')
      .select('kbe_stage')
      .then(({ data }) => {
        const counts = { Knowing: 0, Believing: 0, Embodying: 0 };
        data?.forEach((m: any) => {
          if (m.kbe_stage) counts[m.kbe_stage as keyof typeof counts]++;
        });
        return { data: counts };
      });

    // Count by schema
    const { data: schemaCounts } = await supabase
      .from('mindblock_library')
      .select(`
        family:family_catalog!inner(
          schema:schema_catalog!inner(
            id,
            schema_key,
            title
          )
        )
      `)
      .then(({ data }) => {
        const schemaMap = new Map();
        data?.forEach((m: any) => {
          const schema = m.family?.schema;
          if (schema) {
            const key = schema.schema_key;
            schemaMap.set(key, {
              schema_id: schema.id,
              schema_key: schema.schema_key,
              title: schema.title,
              count: (schemaMap.get(key)?.count || 0) + 1,
            });
          }
        });
        return { data: Array.from(schemaMap.values()).sort((a, b) => b.count - a.count) };
      });

    return c.json({
      total: totalCount || 0,
      byHeat: heatCounts || { RED: 0, AMBER: 0, GREEN: 0 },
      byKBE: kbeCounts || { Knowing: 0, Believing: 0, Embodying: 0 },
      bySchema: schemaCounts || [],
    });
  } catch (error) {
    console.error('Error fetching mindblock stats:', error);
    return c.json({ error: 'Failed to fetch stats' }, 500);
  }
});

/**
 * POST /cc2/mindblocks/save
 * Create or update mindblock
 */
app.post('/save', async (c) => {
  try {
    const body = await c.req.json();
    const { id, mindblock_key, family_id, limiting_prediction, truth, heat, kbe_stage, notes } = body;

    // Validate required fields
    if (!mindblock_key || !family_id || !limiting_prediction || !truth || !heat || !kbe_stage) {
      return c.json({ 
        error: 'Missing required fields: mindblock_key, family_id, limiting_prediction, truth, heat, kbe_stage' 
      }, 400);
    }

    // Validate heat
    if (!['RED', 'AMBER', 'GREEN'].includes(heat)) {
      return c.json({ error: 'heat must be RED, AMBER, or GREEN' }, 400);
    }

    // Validate kbe_stage
    if (!['Knowing', 'Believing', 'Embodying'].includes(kbe_stage)) {
      return c.json({ error: 'kbe_stage must be Knowing, Believing, or Embodying' }, 400);
    }

    const mindblockData = {
      mindblock_key,
      family_id,
      limiting_prediction,
      truth,
      heat,
      kbe_stage,
      notes,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (id) {
      // Update existing
      result = await supabase
        .from('mindblock_library')
        .update(mindblockData)
        .eq('id', id)
        .select()
        .single();
    } else {
      // Create new
      result = await supabase
        .from('mindblock_library')
        .insert({ ...mindblockData, created_at: new Date().toISOString() })
        .select()
        .single();
    }

    if (result.error) throw result.error;

    return c.json({ mindblock: result.data, success: true });
  } catch (error) {
    console.error('Error saving mindblock:', error);
    return c.json({ error: error.message || 'Failed to save mindblock' }, 500);
  }
});

/**
 * DELETE /cc2/mindblocks/:id
 * Delete mindblock (soft delete recommended)
 */
app.delete('/:id', async (c) => {
  try {
    const mindblockId = c.req.param('id');

    // Soft delete by setting deleted_at
    const { error } = await supabase
      .from('mindblock_library')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', mindblockId);

    if (error) throw error;

    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting mindblock:', error);
    return c.json({ error: 'Failed to delete mindblock' }, 500);
  }
});

export default app;
