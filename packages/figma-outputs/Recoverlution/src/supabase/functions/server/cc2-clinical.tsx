/**
 * CC2 CLINICAL DATA ROUTES
 * Endpoints for Playground components to access:
 * - Schemas (20 patterns)
 * - Families (200 clusters)
 * - Mindblocks (2,400 signals)
 * - Primitives (8 moves)
 * - Voices (8 stances)
 * - Heat × KBE Matrix
 */

import { Hono } from 'npm:hono';
import { createClient } from 'npm:@supabase/supabase-js@2';

const app = new Hono();

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * GET /cc2/clinical/schemas
 * Returns all 20 canonical schemas with stats
 */
app.get('/schemas', async (c) => {
  try {
    // Get all schemas
    const { data: schemas, error: schemasError } = await supabase
      .from('schema_catalog')
      .select('*')
      .order('schema_key');

    if (schemasError) throw schemasError;

    // Get family counts for each schema
    const { data: familyCounts, error: countsError } = await supabase
      .from('mindblock_families')
      .select('schema_id')
      .then(result => {
        if (result.error) throw result.error;
        const counts: Record<string, number> = {};
        result.data?.forEach((row: any) => {
          counts[row.schema_id] = (counts[row.schema_id] || 0) + 1;
        });
        return { data: counts, error: null };
      });

    // Enrich schemas with family counts
    const enrichedSchemas = schemas?.map(schema => ({
      ...schema,
      familyCount: familyCounts?.[schema.id] || 0
    }));

    return c.json({ schemas: enrichedSchemas });
  } catch (error) {
    console.error('Error fetching schemas:', error);
    return c.json({ error: 'Failed to fetch schemas' }, 500);
  }
});

/**
 * GET /cc2/clinical/schemas/:id
 * Returns single schema with all families
 */
app.get('/schemas/:id', async (c) => {
  try {
    const schemaId = c.req.param('id');

    // Get schema
    const { data: schema, error: schemaError } = await supabase
      .from('schema_catalog')
      .select('*')
      .eq('id', schemaId)
      .single();

    if (schemaError) throw schemaError;

    // Get families for this schema
    const { data: families, error: familiesError } = await supabase
      .from('mindblock_families')
      .select('*')
      .eq('schema_id', schemaId)
      .order('family_key');

    if (familiesError) throw familiesError;

    // Get mindblock counts for each family
    const familyIds = families?.map(f => f.id) || [];
    const { data: mindblockCounts, error: countsError } = await supabase
      .from('mindblocks_v3')
      .select('family_id')
      .in('family_id', familyIds)
      .then(result => {
        if (result.error) throw result.error;
        const counts: Record<string, number> = {};
        result.data?.forEach((row: any) => {
          counts[row.family_id] = (counts[row.family_id] || 0) + 1;
        });
        return { data: counts, error: null };
      });

    // Enrich families with mindblock counts
    const enrichedFamilies = families?.map(family => ({
      ...family,
      mindblockCount: mindblockCounts?.[family.id] || 0
    }));

    return c.json({ 
      schema, 
      families: enrichedFamilies 
    });
  } catch (error) {
    console.error('Error fetching schema:', error);
    return c.json({ error: 'Failed to fetch schema' }, 500);
  }
});

/**
 * GET /cc2/clinical/families/:id/mindblocks
 * Returns all mindblocks for a family
 */
app.get('/families/:id/mindblocks', async (c) => {
  try {
    const familyId = c.req.param('id');

    // Get family
    const { data: family, error: familyError } = await supabase
      .from('mindblock_families')
      .select('*')
      .eq('id', familyId)
      .single();

    if (familyError) throw familyError;

    // Get mindblocks
    const { data: mindblocks, error: mindblocksError } = await supabase
      .from('mindblocks_v3')
      .select('*')
      .eq('family_id', familyId)
      .order('mindblock_key');

    if (mindblocksError) throw mindblocksError;

    return c.json({ 
      family, 
      mindblocks 
    });
  } catch (error) {
    console.error('Error fetching mindblocks:', error);
    return c.json({ error: 'Failed to fetch mindblocks' }, 500);
  }
});

/**
 * GET /cc2/clinical/primitives
 * Returns all 8 primitives with usage stats
 */
app.get('/primitives', async (c) => {
  try {
    // Hardcoded primitives (canonical list)
    const primitives = [
      {
        id: 'orient',
        name: 'Orient',
        definition: 'Establish present state without judgment',
        move_key: 'orient',
        color: '#5739FB'
      },
      {
        id: 'downshift',
        name: 'Downshift',
        definition: 'Reduce arousal to workable level',
        move_key: 'downshift',
        color: '#10B981'
      },
      {
        id: 'make-move',
        name: 'Make Move',
        definition: 'Execute targeted behavioral change',
        move_key: 'make_move',
        color: '#F59E42'
      },
      {
        id: 'repair',
        name: 'Repair',
        definition: 'Restore after rupture or fracture',
        move_key: 'repair',
        color: '#E85D75'
      },
      {
        id: 'name-pattern',
        name: 'Name Pattern',
        definition: 'Identify recurring structure',
        move_key: 'name_pattern',
        color: '#40E0D0'
      },
      {
        id: 'witness',
        name: 'Witness',
        definition: 'Observe without merger or judgment',
        move_key: 'witness',
        color: '#9B87F5'
      },
      {
        id: 'capture-receipt',
        name: 'Capture Receipt',
        definition: 'Document measurable change',
        move_key: 'capture_receipt',
        color: '#5AB9EA'
      },
      {
        id: 'transfer-test',
        name: 'Transfer Test',
        definition: 'Repeat win in new context',
        move_key: 'real_life_check',
        color: '#06B6D4'
      }
    ];

    // Get usage counts from navicues_v2
    const { data: usageCounts, error } = await supabase
      .from('navicues_v2')
      .select('move_key')
      .then(result => {
        if (result.error) throw result.error;
        const counts: Record<string, number> = {};
        result.data?.forEach((row: any) => {
          counts[row.move_key] = (counts[row.move_key] || 0) + 1;
        });
        return { data: counts, error: null };
      });

    // Enrich primitives with usage stats
    const enrichedPrimitives = primitives.map(primitive => ({
      ...primitive,
      usageCount: usageCounts?.[primitive.move_key] || 0
    }));

    return c.json({ primitives: enrichedPrimitives });
  } catch (error) {
    console.error('Error fetching primitives:', error);
    return c.json({ error: 'Failed to fetch primitives' }, 500);
  }
});

/**
 * GET /cc2/clinical/voices
 * Returns all 8 voices with usage stats
 */
app.get('/voices', async (c) => {
  try {
    // Hardcoded voices (canonical list)
    const voices = [
      {
        id: 'clinician',
        name: 'Clinician',
        stance: 'Attuned Therapist - Evidence-based, structured, measurement-focused',
        guidance_mode_key: 'clinician_direct',
        color: '#5739FB'
      },
      {
        id: 'witness',
        name: 'Compassionate Witness',
        stance: 'Observational, non-judgmental, spacious',
        guidance_mode_key: 'witness_validate',
        color: '#40E0D0'
      },
      {
        id: 'coach',
        name: 'Coach',
        stance: 'Agency Builder - Action-oriented, skill-building, forward momentum',
        guidance_mode_key: 'coach_action',
        color: '#10B981'
      },
      {
        id: 'sage',
        name: 'Sage',
        stance: 'Perspective Shifter - Wisdom tradition, contemplative, long view',
        guidance_mode_key: 'sage_perspective',
        color: '#9B87F5'
      },
      {
        id: 'paradox',
        name: 'Paradox',
        stance: 'Pattern Breaker - Both/and, koan-like, tension-holding',
        guidance_mode_key: 'paradox_tension',
        color: '#F59E42'
      },
      {
        id: 'nurturer',
        name: 'Nurturer',
        stance: 'Co-regulator - Compassionate, soothing, self-care focused',
        guidance_mode_key: 'nurturer_coregulate',
        color: '#E85D75'
      },
      {
        id: 'straight-talk',
        name: 'Straight Talk',
        stance: 'Reality Anchor - Direct, accountability-focused, boundary-setting',
        guidance_mode_key: 'straight_talk',
        color: '#DC2626'
      },
      {
        id: 'elder',
        name: 'Elder',
        stance: 'Integrity/Values - Experience-grounded, legacy-aware, integrative',
        guidance_mode_key: 'elder_wisdom',
        color: '#8B5CF6'
      }
    ];

    // Get usage counts from navicues_v2
    const { data: usageCounts, error } = await supabase
      .from('navicues_v2')
      .select('guidance_mode_key')
      .then(result => {
        if (result.error) throw result.error;
        const counts: Record<string, number> = {};
        result.data?.forEach((row: any) => {
          counts[row.guidance_mode_key] = (counts[row.guidance_mode_key] || 0) + 1;
        });
        return { data: counts, error: null };
      });

    // Enrich voices with usage stats
    const enrichedVoices = voices.map(voice => ({
      ...voice,
      usageCount: usageCounts?.[voice.guidance_mode_key] || 0
    }));

    return c.json({ voices: enrichedVoices });
  } catch (error) {
    console.error('Error fetching voices:', error);
    return c.json({ error: 'Failed to fetch voices' }, 500);
  }
});

/**
 * GET /cc2/clinical/heat-kbe-matrix
 * Returns 3×3 matrix with mindblock counts
 */
app.get('/heat-kbe-matrix', async (c) => {
  try {
    // Get all mindblocks grouped by heat and KBE
    const { data: mindblocks, error } = await supabase
      .from('mindblocks_v3')
      .select('heat, kbe_stage');

    if (error) throw error;

    // Build matrix counts
    const matrix: Record<string, Record<string, number>> = {
      RED: { Knowing: 0, Believing: 0, Embodying: 0 },
      AMBER: { Knowing: 0, Believing: 0, Embodying: 0 },
      GREEN: { Knowing: 0, Believing: 0, Embodying: 0 }
    };

    mindblocks?.forEach((mb: any) => {
      const heat = mb.heat || 'AMBER';
      const kbe = mb.kbe_stage || 'Knowing';
      if (matrix[heat] && matrix[heat][kbe] !== undefined) {
        matrix[heat][kbe]++;
      }
    });

    return c.json({ matrix });
  } catch (error) {
    console.error('Error fetching heat-kbe matrix:', error);
    return c.json({ error: 'Failed to fetch matrix' }, 500);
  }
});

/**
 * GET /cc2/clinical/navicues/by-archetype/:archetype
 * Returns NaviCues filtered by routing archetype using v2 views
 */
app.get('/navicues/by-archetype/:archetype', async (c) => {
  try {
    const archetype = c.req.param('archetype');

    // Map archetype to filters
    const archetypeFilters: Record<string, any> = {
      'panic-state': { state_band: 'overwhelmed', guidance_mode_key: 'nurturer_coregulate' },
      'rumination-loop': { state_band: 'activated', guidance_mode_key: 'sage_perspective' },
      'action-ready': { state_band: 'calm', guidance_mode_key: 'coach_action' },
      'shame-spiral': { state_band: 'overwhelmed', guidance_mode_key: 'witness_validate' },
      'integration-phase': { state_band: 'calm', kbe_layer: 'live' },
    };

    const filters = archetypeFilters[archetype] || {};

    // Get navicues from v2_list_view
    let query = supabase
      .from('navicues_v2_list_view')
      .select('*')
      .eq('status', 'active')
      .limit(10);

    // Apply filters
    if (filters.state_band) {
      query = query.eq('state_band', filters.state_band);
    }
    if (filters.guidance_mode_key) {
      query = query.eq('guidance_mode_key', filters.guidance_mode_key);
    }
    if (filters.kbe_layer) {
      query = query.eq('kbe_layer', filters.kbe_layer);
    }

    const { data: navicues, error } = await query;

    if (error) throw error;

    return c.json({ archetype, navicues, count: navicues?.length || 0 });
  } catch (error) {
    console.error('Error fetching navicues by archetype:', error);
    return c.json({ error: 'Failed to fetch navicues' }, 500);
  }
});

/**
 * GET /cc2/clinical/navicues/:id
 * Returns full NaviCue detail with steps, variants, targets
 */
app.get('/navicues/:id', async (c) => {
  try {
    const navicueId = c.req.param('id');

    // Get full navicue from detail view
    const { data: navicue, error } = await supabase
      .from('navicue_v2_detail_view')
      .select('*')
      .eq('id', navicueId)
      .single();

    if (error) throw error;

    return c.json({ navicue });
  } catch (error) {
    console.error('Error fetching navicue detail:', error);
    return c.json({ error: 'Failed to fetch navicue' }, 500);
  }
});

/**
 * GET /cc2/clinical/navicues/list
 * Returns paginated list of NaviCues with filters
 */
app.get('/navicues/list', async (c) => {
  try {
    const status = c.req.query('status') || 'active';
    const limit = parseInt(c.req.query('limit') || '20');
    const offset = parseInt(c.req.query('offset') || '0');
    const kbe_layer = c.req.query('kbe_layer');
    const state_band = c.req.query('state_band');
    const guidance_mode = c.req.query('guidance_mode');

    // Build query
    let query = supabase
      .from('navicues_v2_list_view')
      .select('*', { count: 'exact' })
      .eq('status', status)
      .order('updated_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply optional filters
    if (kbe_layer) {
      query = query.eq('kbe_layer', kbe_layer);
    }
    if (state_band) {
      query = query.eq('state_band', state_band);
    }
    if (guidance_mode) {
      query = query.eq('guidance_mode_key', guidance_mode);
    }

    const { data: navicues, error, count } = await query;

    if (error) throw error;

    return c.json({ 
      navicues, 
      count,
      offset,
      limit,
      hasMore: count ? offset + limit < count : false
    });
  } catch (error) {
    console.error('Error fetching navicues list:', error);
    return c.json({ error: 'Failed to fetch navicues list' }, 500);
  }
});

/**
 * GET /cc2/clinical/target-options
 * Returns all target options for pickers (schemas, families, mindblocks)
 */
app.get('/target-options', async (c) => {
  try {
    const { data: options, error } = await supabase
      .from('navicue_targets_options_view')
      .select('*');

    if (error) throw error;

    return c.json({ options });
  } catch (error) {
    console.error('Error fetching target options:', error);
    return c.json({ error: 'Failed to fetch target options' }, 500);
  }
});

/**
 * POST /cc2/clinical/navicues/save
 * Create or update NaviCue using navicue_v2_save RPC
 */
app.post('/navicues/save', async (c) => {
  try {
    const payload = await c.req.json();

    // Validate payload structure
    if (!payload.navicue || !payload.steps || !payload.variants || !payload.targets) {
      return c.json({ 
        error: 'Invalid payload. Required: navicue, steps, variants, targets' 
      }, 400);
    }

    // Call RPC
    const { data, error } = await supabase
      .rpc('navicue_v2_save', { payload });

    if (error) throw error;

    return c.json({ id: data, success: true });
  } catch (error) {
    console.error('Error saving navicue:', error);
    return c.json({ error: error.message || 'Failed to save navicue' }, 500);
  }
});

/**
 * POST /cc2/clinical/navicues/:id/archive
 * Archive NaviCue using navicue_v2_archive RPC
 */
app.post('/navicues/:id/archive', async (c) => {
  try {
    const navicueId = c.req.param('id');

    // Call RPC
    const { error } = await supabase
      .rpc('navicue_v2_archive', { p_id: navicueId });

    if (error) throw error;

    return c.json({ success: true });
  } catch (error) {
    console.error('Error archiving navicue:', error);
    return c.json({ error: error.message || 'Failed to archive navicue' }, 500);
  }
});

/**
 * POST /cc2/clinical/navicues/:id/clone
 * Clone NaviCue using navicue_v2_clone RPC
 */
app.post('/navicues/:id/clone', async (c) => {
  try {
    const sourceId = c.req.param('id');
    const { newCode } = await c.req.json();

    if (!newCode) {
      return c.json({ error: 'newCode is required' }, 400);
    }

    // Call RPC
    const { data, error } = await supabase
      .rpc('navicue_v2_clone', { 
        p_source_id: sourceId, 
        p_new_code: newCode 
      });

    if (error) throw error;

    return c.json({ id: data, success: true });
  } catch (error) {
    console.error('Error cloning navicue:', error);
    return c.json({ error: error.message || 'Failed to clone navicue' }, 500);
  }
});

/**
 * POST /cc2/clinical/refresh-matview
 * Refresh materialized view using refresh_navicues_v2_list_matview RPC
 */
app.post('/refresh-matview', async (c) => {
  try {
    const { concurrent = true } = await c.req.json().catch(() => ({}));

    // Call RPC
    const { error } = await supabase
      .rpc('refresh_navicues_v2_list_matview', { p_concurrent: concurrent });

    if (error) throw error;

    return c.json({ success: true, message: 'Materialized view refreshed' });
  } catch (error) {
    console.error('Error refreshing matview:', error);
    return c.json({ error: error.message || 'Failed to refresh matview' }, 500);
  }
});

export default app;