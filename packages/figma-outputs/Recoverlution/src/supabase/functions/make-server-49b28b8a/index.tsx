import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { logEdge } from '../_shared/logger.ts';

import dialogue from './dialogue.tsx';
import soundbites from './soundbites.tsx';
import journey from './journey.tsx';
import auth from './auth.tsx';
import cc2Stats from './cc2-stats.tsx';
import v1Ingest from './v1-ingest.tsx';

console.log('🚀 Starting Recoverlution Make Server...');

const app = new Hono();

// Enable CORS FIRST - before any routes
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Enable logger
app.use('*', logger(console.log));

// Custom audit logging middleware
app.use('*', async (c, next) => {
  const startedAt = Date.now();
  const req = c.req.raw;
  
  await next();
  
  const resStatus = c.res.status;
  const userId = c.req.header('x-user-id') ?? null; // Optional: extract from JWT later
  
  await logEdge(req, resStatus, startedAt, {
    function_slug: 'make-server-49b28b8a',
    route: c.req.path.replace('/make-server-49b28b8a/', ''),
    user_id: userId,
  });
});

// Auth API - Demo user initialization (INLINE)
app.post('/make-server-49b28b8a/auth/init-demo-user', async (c) => {
  try {
    const { createClient } = await import('jsr:@supabase/supabase-js@2');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const DEMO_EMAIL = 'demo@recoverlution.com';
    const DEMO_PASSWORD = 'recoverlution2025';

    console.log('[Auth] Checking for existing demo user...');

    // Check if user already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const userExists = existingUsers?.users?.some(u => u.email === DEMO_EMAIL);

    if (userExists) {
      console.log('[Auth] Demo user already exists');
      return c.json({ 
        success: true, 
        message: 'Demo user already exists',
        exists: true 
      });
    }

    console.log('[Auth] Creating new demo user...');

    // Create the demo user
    const { data, error } = await supabase.auth.admin.createUser({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
      email_confirm: true, // Auto-confirm since we don't have email server
      user_metadata: {
        name: 'Demo User',
        role: 'demo',
      },
    });

    if (error) {
      console.error('[Auth] Error creating demo user:', error);
      return c.json({ success: false, error: error.message }, 500);
    }

    console.log('[Auth] Demo user created successfully:', data.user?.id);
    return c.json({ 
      success: true, 
      message: 'Demo user created successfully',
      userId: data.user?.id 
    });
  } catch (error) {
    console.error('[Auth] Unexpected error:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// CC2 Stats API (INLINE)
app.get('/make-server-49b28b8a/cc2/stats', async (c) => {
  try {
    const { createClient } = await import('jsr:@supabase/supabase-js@2');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    console.log('[CC2] Fetching stats for:', today.toISOString());

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

    // Count proofs today
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

    // Calculate open rate
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

    // Calculate completion rate
    const { count: completedExposures } = await supabase
      .from('feed_exposures')
      .select('*', { count: 'exact', head: true })
      .gte('surfaced_at', today.toISOString())
      .not('converted_at', 'is', null);

    const completionRate = clickedExposures ? Math.round((completedExposures / clickedExposures) * 100) : 0;

    console.log('[CC2] Stats:', { contentLive, eventsToday, proofsToday, blocksToday, openRate, completionRate });

    return c.json({
      content_live: contentLive || 0,
      events_today: eventsToday || 0,
      proofs_today: proofsToday || 0,
      blocks_today: blocksToday || 0,
      open_rate: openRate,
      completion_rate: completionRate,
    });
  } catch (error) {
    console.error('[CC2] Error fetching stats:', error);
    return c.json({ error: 'Failed to fetch stats', details: error instanceof Error ? error.message : 'Unknown error' }, 500);
  }
});

// Dialogue API (Interactive dialogue system)
app.route('/make-server-49b28b8a/dialogue', dialogue);

// Soundbites API (450 real therapeutic soundbites)
app.route('/make-server-49b28b8a/soundbites', soundbites);

// Journey API (Therapeutic journey system)
app.route('/make-server-49b28b8a/journey', journey);

// V1 Ingest API (Data ingestion for v1)
app.route('/make-server-49b28b8a/v1-ingest', v1Ingest);

// Health check endpoint
app.get("/make-server-49b28b8a/health", (c) => {
  return c.json({ status: "ok", server: "make-server-49b28b8a" });
});

// Start the server
Deno.serve(app.fetch);