/**
 * NAVICUES API
 * 
 * Infinite NaviCue player logic.
 * No suites, no durations, no limits.
 * Just pull → action → next → repeat.
 * 
 * Like Instagram: you never know how long you'll be scrolling.
 */

import { Hono } from 'npm:hono';
import { createClient } from 'npm:@supabase/supabase-js@2';

const app = new Hono();

// ============================================================================
// GET /random - Get random NaviCue from the arsenal
// ============================================================================
app.get('/random', async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Get count first to generate random offset
    const { count, error: countError } = await supabase
      .from('navicue_library')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    if (countError) {
      console.error('Error counting NaviCues:', countError);
      return c.json({ error: 'Failed to count NaviCues', details: countError.message }, 500);
    }

    if (!count || count === 0) {
      return c.json({ error: 'No active NaviCues found' }, 404);
    }

    // Generate random offset
    const randomOffset = Math.floor(Math.random() * count);

    // Fetch single random NaviCue
    const { data, error } = await supabase
      .from('navicue_library')
      .select('*')
      .eq('status', 'active')
      .range(randomOffset, randomOffset)
      .single();

    if (error) {
      console.error('Error fetching random NaviCue:', error);
      return c.json({ error: 'Failed to fetch NaviCue', details: error.message }, 500);
    }

    console.log(`✅ Random NaviCue served: ${data.id}`);

    return c.json({
      navicue: data,
      meta: {
        total_available: count,
        logic: 'random',
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Unexpected error in /random:', error);
    return c.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// ============================================================================
// GET /batch - Get batch of random NaviCues (for prefetching)
// ============================================================================
app.get('/batch', async (c) => {
  try {
    const batchSize = parseInt(c.req.query('size') || '10');
    
    if (batchSize < 1 || batchSize > 50) {
      return c.json({ error: 'Batch size must be between 1 and 50' }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Fetch random sample using PostgreSQL's RANDOM() function
    const { data, error } = await supabase
      .from('navicue_library')
      .select('*')
      .eq('status', 'active')
      .limit(batchSize * 2); // Get more than needed for randomization

    if (error) {
      console.error('Error fetching batch:', error);
      return c.json({ error: 'Failed to fetch batch', details: error.message }, 500);
    }

    // Shuffle and take requested amount
    const shuffled = data.sort(() => Math.random() - 0.5);
    const batch = shuffled.slice(0, batchSize);

    console.log(`✅ Batch of ${batch.length} NaviCues served`);

    return c.json({
      navicues: batch,
      meta: {
        requested: batchSize,
        delivered: batch.length,
        logic: 'random',
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Unexpected error in /batch:', error);
    return c.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// ============================================================================
// GET /stats - Get NaviCue library stats (for monitoring)
// ============================================================================
app.get('/stats', async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Get total count
    const { count: totalCount } = await supabase
      .from('navicue_library')
      .select('*', { count: 'exact', head: true });

    // Get active count
    const { count: activeCount } = await supabase
      .from('navicue_library')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    // Get breakdown by type
    const { data: typeData } = await supabase
      .from('navicue_library')
      .select('type_id')
      .eq('status', 'active');

    const typeCounts: Record<string, number> = {};
    typeData?.forEach((item) => {
      typeCounts[item.type_id] = (typeCounts[item.type_id] || 0) + 1;
    });

    // Get breakdown by pillar
    const { data: pillarData } = await supabase
      .from('navicue_library')
      .select('pillar_id')
      .eq('status', 'active');

    const pillarCounts: Record<string, number> = {};
    pillarData?.forEach((item) => {
      pillarCounts[item.pillar_id] = (pillarCounts[item.pillar_id] || 0) + 1;
    });

    return c.json({
      total: totalCount || 0,
      active: activeCount || 0,
      by_type: typeCounts,
      by_pillar: pillarCounts,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Unexpected error in /stats:', error);
    return c.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// ============================================================================
// POST /sync - Sync NaviCues from navicue_library to canonical schema
// ============================================================================
app.post('/sync', async (c) => {
  try {
    const body = await c.req.json();
    const dryRun = body.dry_run ?? false;

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Count active NaviCues in library
    const { count, error: countError } = await supabase
      .from('navicue_library')
      .select('*', { count: 'exact', head: true })
      .eq('active', true);

    if (countError) {
      return c.json({
        ok: false,
        error: 'Failed to count NaviCues',
        details: countError.message,
        version: 'navicue-sync@2025-12-28'
      }, 500);
    }

    if (dryRun) {
      return c.json({
        ok: true,
        dry_run: true,
        found: count || 0,
        message: `Dry run complete. Found ${count} active NaviCues ready to sync.`,
        version: 'navicue-sync@2025-12-28'
      });
    }

    // Execute full sync
    const batchId = `sync_${Date.now()}`;
    
    // Fetch all active NaviCues
    const { data: navicues, error: fetchError } = await supabase
      .from('navicue_library')
      .select('*')
      .eq('active', true);

    if (fetchError || !navicues) {
      return c.json({
        ok: false,
        error: 'Failed to fetch NaviCues',
        details: fetchError?.message,
        version: 'navicue-sync@2025-12-28'
      }, 500);
    }

    // Import to canonical navicues table
    const navicuesToInsert = navicues.map(nc => ({
      navicue_id: nc.navicue_id,
      text: nc.text,
      voice: nc.voice,
      track: nc.track,
      mechanism: nc.mechanism,
      core_schema: nc.core_schema,
      secondary_schema: nc.secondary_schema,
      mindblock: nc.mindblock,
      metadata: nc.metadata || {},
      active: true,
      created_at: nc.created_at,
      updated_at: new Date().toISOString(),
    }));

    const { error: insertError } = await supabase
      .from('navicues')
      .upsert(navicuesToInsert, { 
        onConflict: 'navicue_id',
        ignoreDuplicates: false 
      });

    if (insertError) {
      return c.json({
        ok: false,
        error: 'Failed to insert NaviCues',
        details: insertError.message,
        version: 'navicue-sync@2025-12-28'
      }, 500);
    }

    // Create schema links
    const schemaLinks: any[] = [];
    navicues.forEach(nc => {
      if (nc.core_schema) {
        schemaLinks.push({
          navicue_id: nc.navicue_id,
          schema_name: nc.core_schema,
          relationship_type: 'core',
        });
      }
      if (nc.secondary_schema) {
        schemaLinks.push({
          navicue_id: nc.navicue_id,
          schema_name: nc.secondary_schema,
          relationship_type: 'secondary',
        });
      }
    });

    let schemaLinksInserted = 0;
    if (schemaLinks.length > 0) {
      const { error: schemaError } = await supabase
        .from('navicue_schemas')
        .upsert(schemaLinks, { 
          onConflict: 'navicue_id,schema_name',
          ignoreDuplicates: true 
        });

      if (!schemaError) {
        schemaLinksInserted = schemaLinks.length;
      }
    }

    // Create mindblock links
    const mindblockLinks: any[] = [];
    navicues.forEach(nc => {
      if (nc.mindblock) {
        mindblockLinks.push({
          navicue_id: nc.navicue_id,
          mindblock_name: nc.mindblock,
        });
      }
    });

    let mindblockLinksInserted = 0;
    if (mindblockLinks.length > 0) {
      const { error: mindblockError } = await supabase
        .from('navicue_mindblocks')
        .upsert(mindblockLinks, { 
          onConflict: 'navicue_id,mindblock_name',
          ignoreDuplicates: true 
        });

      if (!mindblockError) {
        mindblockLinksInserted = mindblockLinks.length;
      }
    }

    return c.json({
      ok: true,
      batch_id: batchId,
      message: `Successfully synced ${navicues.length} NaviCues`,
      source: {
        table: 'navicue_library',
        active_count: navicues.length,
      },
      canonical: {
        navicues: navicues.length,
        schema_links: schemaLinksInserted,
        mindblock_links: mindblockLinksInserted,
      },
      version: 'navicue-sync@2025-12-28'
    });

  } catch (err: any) {
    console.error('NaviCue sync error:', err);
    return c.json({
      ok: false,
      error: 'Sync failed',
      details: err.message,
      stack: err.stack,
      version: 'navicue-sync@2025-12-28'
    }, 500);
  }
});

export default app;