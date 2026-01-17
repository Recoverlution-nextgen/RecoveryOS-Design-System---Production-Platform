import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const app = new Hono();

// NaviCue data inline (we'll insert programmatically)
// This is the complete 500-item dataset

// Execute batch import of all 500 NaviCues
app.post('/execute', async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('🚀 Starting NaviCue batch import...');

    // We need to execute raw SQL for bulk inserts
    // Supabase JS client doesn't support executing arbitrary SQL
    // Best approach: Create the data as JSON and insert via client

    return c.json({
      success: false,
      message: 'Please execute the SQL files directly in Supabase SQL Editor',
      instructions: [
        '1. Go to Supabase SQL Editor',
        '2. Copy and paste each BATCH-NAVICUES-PART-X.sql file',
        '3. Execute them in order (Part 1-6)',
        '4. Verify with: SELECT COUNT(*) FROM navicue_library'
      ],
      sql_files: [
        'BATCH-NAVICUES-PART-1-MAPPING.sql',
        'BATCH-NAVICUES-PART-2-MIRRORS.sql',
        'BATCH-NAVICUES-PART-3-PROBES-KOANS-STORIES.sql',
        'BATCH-NAVICUES-PART-4-STORIES-REFRAMES.sql',
        'BATCH-NAVICUES-PART-5-FINAL.sql',
        'BATCH-NAVICUES-PART-6-COMPLETION.sql'
      ]
    });

  } catch (error) {
    console.error('❌ Batch import failed:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

// Check import status
app.get('/status', async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { count } = await supabase
      .from('navicue_library')
      .select('*', { count: 'exact', head: true });

    // Get breakdown by type
    const { data: allNavicues } = await supabase
      .from('navicue_library')
      .select('type_id');

    const typeCounts = {};
    allNavicues?.forEach(nc => {
      typeCounts[nc.type_id] = (typeCounts[nc.type_id] || 0) + 1;
    });

    return c.json({
      total: count,
      by_type: typeCounts,
      target: 500,
      complete: count >= 500,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return c.json({
      error: error.message
    }, 500);
  }
});

export default app;
