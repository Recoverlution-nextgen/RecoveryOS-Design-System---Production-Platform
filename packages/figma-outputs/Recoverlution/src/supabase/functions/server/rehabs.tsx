/**
 * REHAB FACILITIES API
 * 
 * Multi-tenant B2B SaaS management for rehab facilities
 * 
 * Routes:
 * - GET /rehabs - List all rehabs (platform admin only)
 * - POST /rehabs - Create new rehab
 * - GET /rehabs/:id - Get specific rehab details
 * - PATCH /rehabs/:id - Update rehab settings
 * - GET /rehabs/:id/analytics - Get rehab-wide analytics
 */

import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const rehabs = new Hono();

// Helper: Check if user is platform admin
async function isPlatformAdmin(authHeader: string | null): Promise<boolean> {
  if (!authHeader) return false;
  
  const token = authHeader.split(' ')[1];
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
  
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) return false;
  
  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('auth_user_id', user.id)
    .single();
  
  return userData?.role === 'platform_admin';
}

// Helper: Get rehab_id from auth token
async function getRehabIdFromAuth(authHeader: string | null): Promise<string | null> {
  if (!authHeader) return null;
  
  const token = authHeader.split(' ')[1];
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
  
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) return null;
  
  const { data: userData } = await supabase
    .from('users')
    .select('rehab_id')
    .eq('auth_user_id', user.id)
    .single();
  
  return userData?.rehab_id || null;
}

// ============================================================================
// GET /rehabs - List all rehabs (platform admin only)
// ============================================================================

rehabs.get('/', async (c) => {
  console.log('📋 GET /rehabs - List all rehabs');
  
  // Check platform admin permission
  const isAdmin = await isPlatformAdmin(c.req.header('Authorization'));
  if (!isAdmin) {
    console.log('❌ Unauthorized: Not a platform admin');
    return c.json({ error: 'Unauthorized. Platform admin access required.' }, 403);
  }
  
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
  
  // Get query params
  const page = parseInt(c.req.query('page') || '1');
  const limit = parseInt(c.req.query('limit') || '50');
  const offset = (page - 1) * limit;
  
  // Query rehabs with counts
  const { data, error, count } = await supabase
    .from('rehabs')
    .select(`
      *,
      active_patients:patients!rehab_id(count),
      therapist_count:users!rehab_id(count)
    `, { count: 'exact' })
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  
  if (error) {
    console.error('❌ Error fetching rehabs:', error);
    return c.json({ error: error.message }, 500);
  }
  
  console.log(`✅ Fetched ${data.length} rehabs (page ${page})`);
  
  return c.json({
    rehabs: data,
    pagination: {
      page,
      limit,
      total: count,
      total_pages: Math.ceil((count || 0) / limit)
    }
  });
});

// ============================================================================
// POST /rehabs - Create new rehab facility
// ============================================================================

rehabs.post('/', async (c) => {
  console.log('➕ POST /rehabs - Create new rehab');
  
  // Check platform admin permission
  const isAdmin = await isPlatformAdmin(c.req.header('Authorization'));
  if (!isAdmin) {
    console.log('❌ Unauthorized: Not a platform admin');
    return c.json({ error: 'Unauthorized. Platform admin access required.' }, 403);
  }
  
  const body = await c.req.json();
  const { name, contact_email, plan_tier, max_patients, max_therapists } = body;
  
  // Validate required fields
  if (!name || !contact_email) {
    return c.json({ error: 'Missing required fields: name, contact_email' }, 400);
  }
  
  // Generate slug from name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
  
  // Check if slug already exists
  const { data: existing } = await supabase
    .from('rehabs')
    .select('slug')
    .eq('slug', slug)
    .single();
  
  if (existing) {
    return c.json({ error: `Slug "${slug}" already exists. Choose a different name.` }, 409);
  }
  
  // Create rehab
  const { data, error } = await supabase
    .from('rehabs')
    .insert({
      name,
      slug,
      contact_email,
      plan_tier: plan_tier || 'starter',
      max_patients: max_patients || 50,
      max_therapists: max_therapists || 5,
      billing_status: 'trial', // New rehabs start on trial
      billing_cycle_start: new Date().toISOString().split('T')[0]
    })
    .select()
    .single();
  
  if (error) {
    console.error('❌ Error creating rehab:', error);
    return c.json({ error: error.message }, 500);
  }
  
  console.log(`✅ Created rehab: ${data.name} (${data.id})`);
  
  return c.json({ rehab: data }, 201);
});

// ============================================================================
// GET /rehabs/:id - Get specific rehab details
// ============================================================================

rehabs.get('/:id', async (c) => {
  const rehabId = c.req.param('id');
  console.log(`📋 GET /rehabs/${rehabId} - Get rehab details`);
  
  // Check auth: Either platform admin OR user from this rehab
  const isAdmin = await isPlatformAdmin(c.req.header('Authorization'));
  const userRehabId = await getRehabIdFromAuth(c.req.header('Authorization'));
  
  if (!isAdmin && userRehabId !== rehabId) {
    console.log('❌ Unauthorized: Not authorized to view this rehab');
    return c.json({ error: 'Unauthorized' }, 403);
  }
  
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
  
  // Get rehab with detailed stats
  const { data, error } = await supabase
    .from('rehabs')
    .select(`
      *,
      active_patients:patients!rehab_id(count),
      discharged_patients:patients!rehab_id(count),
      therapist_count:users!rehab_id(count),
      admin_count:users!rehab_id(count)
    `)
    .eq('id', rehabId)
    .eq('patients.status', 'active')
    .eq('patients.status', 'discharged')
    .eq('users.role', 'therapist')
    .eq('users.role', 'admin')
    .single();
  
  if (error) {
    console.error('❌ Error fetching rehab:', error);
    return c.json({ error: error.message }, 500);
  }
  
  if (!data) {
    return c.json({ error: 'Rehab not found' }, 404);
  }
  
  console.log(`✅ Fetched rehab: ${data.name}`);
  
  return c.json({ rehab: data });
});

// ============================================================================
// PATCH /rehabs/:id - Update rehab settings
// ============================================================================

rehabs.patch('/:id', async (c) => {
  const rehabId = c.req.param('id');
  console.log(`✏️ PATCH /rehabs/${rehabId} - Update rehab`);
  
  // Check auth: Either platform admin OR admin from this rehab
  const isAdmin = await isPlatformAdmin(c.req.header('Authorization'));
  const userRehabId = await getRehabIdFromAuth(c.req.header('Authorization'));
  
  if (!isAdmin && userRehabId !== rehabId) {
    console.log('❌ Unauthorized: Not authorized to update this rehab');
    return c.json({ error: 'Unauthorized' }, 403);
  }
  
  const updates = await c.req.json();
  
  // Prevent updating certain fields unless platform admin
  if (!isAdmin) {
    delete updates.plan_tier;
    delete updates.max_patients;
    delete updates.max_therapists;
    delete updates.billing_status;
  }
  
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
  
  const { data, error } = await supabase
    .from('rehabs')
    .update(updates)
    .eq('id', rehabId)
    .select()
    .single();
  
  if (error) {
    console.error('❌ Error updating rehab:', error);
    return c.json({ error: error.message }, 500);
  }
  
  console.log(`✅ Updated rehab: ${data.name}`);
  
  return c.json({ rehab: data });
});

// ============================================================================
// GET /rehabs/:id/analytics - Get rehab-wide analytics
// ============================================================================

rehabs.get('/:id/analytics', async (c) => {
  const rehabId = c.req.param('id');
  console.log(`📊 GET /rehabs/${rehabId}/analytics - Get analytics`);
  
  // Check auth
  const isAdmin = await isPlatformAdmin(c.req.header('Authorization'));
  const userRehabId = await getRehabIdFromAuth(c.req.header('Authorization'));
  
  if (!isAdmin && userRehabId !== rehabId) {
    console.log('❌ Unauthorized: Not authorized to view analytics for this rehab');
    return c.json({ error: 'Unauthorized' }, 403);
  }
  
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
  
  // Get time range from query params
  const daysBack = parseInt(c.req.query('days') || '30');
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - daysBack);
  
  // Run parallel queries for performance
  const [
    patientCount,
    activeThisWeek,
    navicuesCompleted,
    averageEngagement,
    stateDistribution,
    pillarDistribution
  ] = await Promise.all([
    // Total active patients
    supabase
      .from('patients')
      .select('*', { count: 'exact', head: true })
      .eq('rehab_id', rehabId)
      .eq('status', 'active'),
    
    // Patients active in last 7 days
    supabase
      .from('patient_activity')
      .select('patient_id')
      .eq('rehab_id', rehabId)
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .then(({ data }) => {
        const uniquePatients = new Set(data?.map(a => a.patient_id));
        return uniquePatients.size;
      }),
    
    // NaviCues completed this month
    supabase
      .from('patient_activity')
      .select('*', { count: 'exact', head: true })
      .eq('rehab_id', rehabId)
      .eq('activity_type', 'navicue_completed')
      .gte('created_at', startDate.toISOString()),
    
    // Average engagement time
    supabase
      .from('patient_activity')
      .select('duration_seconds')
      .eq('rehab_id', rehabId)
      .gte('created_at', startDate.toISOString())
      .not('duration_seconds', 'is', null),
    
    // State distribution
    supabase
      .from('state_logs')
      .select('tempo, flow, sync')
      .eq('rehab_id', rehabId)
      .gte('logged_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
    
    // Activity by pillar
    supabase
      .from('patient_activity')
      .select('pillar')
      .eq('rehab_id', rehabId)
      .gte('created_at', startDate.toISOString())
      .not('pillar', 'is', null)
  ]);
  
  // Calculate average engagement
  const avgEngagementSeconds = averageEngagement.data && averageEngagement.data.length > 0
    ? averageEngagement.data.reduce((sum, a) => sum + (a.duration_seconds || 0), 0) / averageEngagement.data.length
    : 0;
  
  // Calculate state averages
  const stateAvg = stateDistribution.data && stateDistribution.data.length > 0
    ? {
        tempo: stateDistribution.data.reduce((sum, s) => sum + s.tempo, 0) / stateDistribution.data.length,
        flow: stateDistribution.data.reduce((sum, s) => sum + s.flow, 0) / stateDistribution.data.length,
        sync: stateDistribution.data.reduce((sum, s) => sum + s.sync, 0) / stateDistribution.data.length
      }
    : { tempo: 0, flow: 0, sync: 0 };
  
  // Count activities by pillar
  const pillarCounts = pillarDistribution.data?.reduce((acc, { pillar }) => {
    if (pillar) {
      acc[pillar] = (acc[pillar] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>) || {};
  
  console.log('✅ Analytics calculated successfully');
  
  return c.json({
    rehab_id: rehabId,
    time_range_days: daysBack,
    total_patients: patientCount.count || 0,
    active_this_week: activeThisWeek,
    navicues_completed: navicuesCompleted.count || 0,
    avg_engagement_minutes: Math.round(avgEngagementSeconds / 60),
    avg_state_this_week: {
      tempo: Math.round(stateAvg.tempo * 10) / 10,
      flow: Math.round(stateAvg.flow * 10) / 10,
      sync: Math.round(stateAvg.sync * 10) / 10
    },
    activity_by_pillar: pillarCounts
  });
});

export default rehabs;
