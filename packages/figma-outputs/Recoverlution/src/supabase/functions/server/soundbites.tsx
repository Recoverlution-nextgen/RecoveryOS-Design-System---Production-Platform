/**
 * SOUNDBITES API
 * Serve the 450 real soundbites from wherever they're actually stored
 */

import { Hono } from 'npm:hono';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import * as store from './simple-store.tsx';

const app = new Hono();

const AUDIO_BASE_URL = 'https://wzeqlkbmqxlsjryidagf.supabase.co/storage/v1/object/public/audio';

// Get Supabase client with service role
const getClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
};

// Health check endpoint
app.get('/health', async (c) => {
  try {
    const supabase = getClient();
    
    // Try to query what tables actually exist
    // We'll try a few known tables to see which ones work
    const tables = [
      'app_storage',
      'founding_members_therapy',
      'sound_bites',
      'soundbite_tracks',
      'soundbite_all',
    ];
    
    const results: any = {};
    
    for (const table of tables) {
      try {
        const { count, error } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true });
        
        results[table] = error ? `ERROR: ${error.message}` : `✅ ${count} rows`;
      } catch (e) {
        results[table] = `EXCEPTION: ${e.message}`;
      }
    }
    
    // Also check app_storage for soundbite data
    let storedSoundbites = null;
    try {
      storedSoundbites = await store.get('soundbites_library');
    } catch (e) {
      // Ignore
    }
    
    return c.json({
      success: true,
      message: 'Soundbites health check',
      tables: results,
      app_storage_soundbites: storedSoundbites ? 'Found in app_storage' : 'Not found in app_storage',
    });
  } catch (error) {
    console.error('[Soundbites Health] Error:', error);
    return c.json({
      success: false,
      error: error.message,
    }, 500);
  }
});

// Get all soundbites
app.get('/', async (c) => {
  try {
    // First, try to get from app_storage
    const cached = await store.get('soundbites_library');
    
    if (cached) {
      console.log('[Soundbites] Loaded from app_storage');
      return c.json(cached);
    }
    
    // If not in storage, return empty arrays
    // The user will need to populate the data
    console.warn('[Soundbites] No data found in app_storage');
    
    return c.json({
      sparks: [],
      flames: [],
      embers: [],
      all: [],
    });
  } catch (error) {
    console.error('[Soundbites] Error:', error);
    return c.json({
      error: error.message,
      sparks: [],
      flames: [],
      embers: [],
      all: [],
    }, 500);
  }
});

// Get by pillar
app.get('/pillar/:pillarId', async (c) => {
  const pillarId = c.req.param('pillarId');
  
  try {
    const cached = await store.get('soundbites_library');
    
    if (!cached) {
      return c.json([]);
    }
    
    const all = cached.all || [];
    const filtered = all.filter((track: any) => track.pillarId === pillarId);
    
    return c.json(filtered);
  } catch (error) {
    console.error(`[Soundbites] Error fetching pillar ${pillarId}:`, error);
    return c.json({ error: error.message }, 500);
  }
});

// Get analytics data (admin only - uses service role)
app.get('/analytics', async (c) => {
  try {
    const supabase = getClient();

    // Get all sessions with service role key
    const { data: allSessions, error: sessionsError } = await supabase
      .from('soundbite_playback_sessions')
      .select(`
        soundbite_asset_id,
        intent,
        pre_state,
        post_state,
        metrics,
        started_at,
        completed_at
      `);

    if (sessionsError) {
      console.error('[Soundbites Analytics] Sessions error:', sessionsError);
      
      // Return empty data if table doesn't exist or no permissions
      return c.json({
        sessions: [],
        message: 'No session data available'
      });
    }

    return c.json({
      sessions: allSessions || [],
      count: allSessions?.length || 0
    });

  } catch (error) {
    console.error('[Soundbites Analytics] Error:', error);
    return c.json({ 
      sessions: [],
      error: error.message 
    }, 500);
  }
});

export default app;