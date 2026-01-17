/**
 * ORGANIZATIONS ENDPOINT
 * Organization portal backend
 */

import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const app = new Hono();

// POST /organizations - Create organization
app.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const { name, admin_user_id, org_type, settings } = body;

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('organizations')
      .insert({
        name,
        admin_user_id,
        org_type: org_type || 'treatment_center',
        settings: settings || {},
        status: 'active',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating organization:', error);
      return c.json({ error: 'Failed to create organization' }, 500);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error in POST /organizations:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /organizations/:id - Get organization
app.get('/:id', async (c) => {
  try {
    const orgId = c.req.param('id');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('organizations')
      .select('*')
      .eq('id', orgId)
      .single();

    if (error || !data) {
      return c.json({ error: 'Organization not found' }, 404);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error in GET /organizations/:id:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// PUT /organizations/:id - Update organization
app.put('/:id', async (c) => {
  try {
    const orgId = c.req.param('id');
    const updates = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('organizations')
      .update(updates)
      .eq('id', orgId)
      .select()
      .single();

    if (error) {
      console.error('Error updating organization:', error);
      return c.json({ error: 'Failed to update organization' }, 500);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error in PUT /organizations/:id:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /organizations/:id/members - Get organization members
app.get('/:id/members', async (c) => {
  try {
    const orgId = c.req.param('id');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('organization_members')
      .select('*, users(id, email, created_at)')
      .eq('organization_id', orgId);

    if (error) {
      console.error('Error fetching members:', error);
      return c.json({ error: 'Failed to fetch members' }, 500);
    }

    return c.json(data || []);
  } catch (error) {
    console.error('Error in GET /organizations/:id/members:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /organizations/:id/alumni - Get alumni network
app.get('/:id/alumni', async (c) => {
  try {
    const orgId = c.req.param('id');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('organization_members')
      .select('*, users(id, email)')
      .eq('organization_id', orgId)
      .eq('member_type', 'alumni')
      .eq('alumni_opt_in', true);

    if (error) {
      console.error('Error fetching alumni:', error);
      return c.json({ error: 'Failed to fetch alumni' }, 500);
    }

    return c.json(data || []);
  } catch (error) {
    console.error('Error in GET /organizations/:id/alumni:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /organizations/:id/alumni/invite - Invite to alumni network
app.post('/:id/alumni/invite', async (c) => {
  try {
    const orgId = c.req.param('id');
    const { email, name } = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Create invite record
    const { data, error } = await supabase
      .from('alumni_invites')
      .insert({
        organization_id: orgId,
        email,
        name: name || '',
        status: 'pending',
        invited_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating alumni invite:', error);
      return c.json({ error: 'Failed to create invite' }, 500);
    }

    // TODO: Send email invite (integrate with email service)

    return c.json(data);
  } catch (error) {
    console.error('Error in POST /organizations/:id/alumni/invite:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /organizations/:id/analytics - Cohort analytics
app.get('/:id/analytics', async (c) => {
  try {
    const orgId = c.req.param('id');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Get member count
    const { count: memberCount } = await supabase
      .from('organization_members')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', orgId);

    // Get active members (checked in last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: members } = await supabase
      .from('organization_members')
      .select('user_id')
      .eq('organization_id', orgId);

    const memberIds = members?.map(m => m.user_id) || [];

    const { count: activeCount } = await supabase
      .from('state_checkins')
      .select('*', { count: 'exact', head: true })
      .in('user_id', memberIds)
      .gte('created_at', sevenDaysAgo.toISOString());

    // Get practice completion rate
    const { count: practiceCount } = await supabase
      .from('practice_completions')
      .select('*', { count: 'exact', head: true })
      .in('user_id', memberIds);

    // Get average state metrics
    const { data: states } = await supabase
      .from('state_checkins')
      .select('energy, clarity, anchorage')
      .in('user_id', memberIds)
      .gte('created_at', sevenDaysAgo.toISOString());

    const avgEnergy = states?.reduce((sum, s) => sum + s.energy, 0) / (states?.length || 1);
    const avgClarity = states?.reduce((sum, s) => sum + s.clarity, 0) / (states?.length || 1);
    const avgAnchorage = states?.reduce((sum, s) => sum + s.anchorage, 0) / (states?.length || 1);

    return c.json({
      total_members: memberCount || 0,
      active_members_7d: activeCount || 0,
      practice_completions: practiceCount || 0,
      avg_state: {
        energy: Math.round(avgEnergy * 10) / 10,
        clarity: Math.round(avgClarity * 10) / 10,
        anchorage: Math.round(avgAnchorage * 10) / 10,
      },
    });
  } catch (error) {
    console.error('Error in GET /organizations/:id/analytics:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /organizations/:id/microsite - Configure alumni microsite
app.post('/:id/microsite', async (c) => {
  try {
    const orgId = c.req.param('id');
    const { config } = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('organizations')
      .update({ microsite_config: config })
      .eq('id', orgId)
      .select()
      .single();

    if (error) {
      console.error('Error updating microsite config:', error);
      return c.json({ error: 'Failed to update microsite' }, 500);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error in POST /organizations/:id/microsite:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /organizations/:id/population-health - Population health heat map
app.get('/:id/population-health', async (c) => {
  try {
    const orgId = c.req.param('id');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Get all individuals in organization programs
    const { data: members } = await supabase
      .from('organization_members')
      .select(`
        *,
        individuals:user_id (
          id,
          name,
          email
        )
      `)
      .eq('organization_id', orgId)
      .eq('member_type', 'individual');

    if (!members) {
      return c.json({ individuals: [] });
    }

    // Enrich with health metrics
    const individuals = await Promise.all(members.map(async (member: any) => {
      const individualId = member.individuals?.id;
      
      // Get recent state checkins to determine risk
      const { data: states } = await supabase
        .from('state_checkins')
        .select('energy, clarity, anchorage, created_at')
        .eq('user_id', member.user_id)
        .order('created_at', { ascending: false })
        .limit(7);

      // Calculate risk level based on recent states
      let riskLevel = 'green';
      let redBandDays = 0;
      
      if (states && states.length > 0) {
        const avgEnergy = states.reduce((sum, s) => sum + s.energy, 0) / states.length;
        const avgAnchorage = states.reduce((sum, s) => sum + s.anchorage, 0) / states.length;
        
        // Count red band days (low energy or low anchorage)
        redBandDays = states.filter(s => s.energy < 3 || s.anchorage < 3).length;
        
        if (avgEnergy < 3 || avgAnchorage < 3 || redBandDays > 3) {
          riskLevel = 'red';
        } else if (avgEnergy < 5 || avgAnchorage < 5 || redBandDays > 1) {
          riskLevel = 'amber';
        }
      }

      // Get engagement metrics
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { count: practiceCount } = await supabase
        .from('practice_completions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', member.user_id)
        .gte('created_at', sevenDaysAgo.toISOString());

      const { data: lastActivity } = await supabase
        .from('state_checkins')
        .select('created_at')
        .eq('user_id', member.user_id)
        .order('created_at', { ascending: false })
        .limit(1);

      const lastActivityDate = lastActivity?.[0]?.created_at || member.individuals?.created_at;
      const engagementGapDays = Math.floor(
        (Date.now() - new Date(lastActivityDate).getTime()) / (1000 * 60 * 60 * 24)
      );

      return {
        id: individualId || member.user_id,
        name: member.individuals?.name || 'Unknown',
        email: member.individuals?.email || '',
        risk_level: riskLevel,
        program: member.program_name || 'General',
        assigned_professional: member.assigned_professional || 'Unassigned',
        red_band_days: redBandDays,
        practice_dropout_rate: Math.max(0, 100 - (practiceCount || 0) * 20),
        engagement_gap_days: engagementGapDays,
        last_activity: lastActivityDate,
      };
    }));

    return c.json({ individuals });
  } catch (error) {
    console.error('Error in GET /organizations/:id/population-health:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /organizations/:id/inpatients - Get current inpatients
app.get('/:id/inpatients', async (c) => {
  try {
    const orgId = c.req.param('id');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('inpatients')
      .select(`
        *,
        individuals:individual_id (
          id,
          name,
          email
        )
      `)
      .eq('organization_id', orgId)
      .eq('status', 'active')
      .order('admission_date', { ascending: false });

    if (error) {
      console.error('Error fetching inpatients:', error);
      return c.json({ error: 'Failed to fetch inpatients' }, 500);
    }

    const inpatients = (data || []).map((ip: any) => ({
      id: ip.id,
      individual_id: ip.individual_id,
      name: ip.individuals?.name || 'Unknown',
      email: ip.individuals?.email || '',
      admission_date: ip.admission_date,
      expected_discharge: ip.expected_discharge,
      program: ip.program_type || 'Standard',
      primary_counselor: ip.primary_counselor || 'Unassigned',
      days_in_program: Math.floor(
        (Date.now() - new Date(ip.admission_date).getTime()) / (1000 * 60 * 60 * 24)
      ),
    }));

    return c.json({ inpatients });
  } catch (error) {
    console.error('Error in GET /organizations/:id/inpatients:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /organizations/:id/inpatients - Admit new inpatient
app.post('/:id/inpatients', async (c) => {
  try {
    const orgId = c.req.param('id');
    const { individual_id, admission_date, expected_discharge, program_type, primary_counselor } = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('inpatients')
      .insert({
        organization_id: orgId,
        individual_id,
        admission_date: admission_date || new Date().toISOString(),
        expected_discharge,
        program_type: program_type || 'Standard',
        primary_counselor: primary_counselor || null,
        status: 'active',
      })
      .select()
      .single();

    if (error) {
      console.error('Error admitting inpatient:', error);
      return c.json({ error: 'Failed to admit inpatient' }, 500);
    }

    return c.json({ success: true, inpatient: data });
  } catch (error) {
    console.error('Error in POST /organizations/:id/inpatients:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// PUT /organizations/:id/inpatients/:inpatient_id - Update or discharge inpatient
app.put('/:id/inpatients/:inpatient_id', async (c) => {
  try {
    const orgId = c.req.param('id');
    const inpatientId = c.req.param('inpatient_id');
    const updates = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('inpatients')
      .update(updates)
      .eq('id', inpatientId)
      .eq('organization_id', orgId)
      .select()
      .single();

    if (error) {
      console.error('Error updating inpatient:', error);
      return c.json({ error: 'Failed to update inpatient' }, 500);
    }

    return c.json({ success: true, inpatient: data });
  } catch (error) {
    console.error('Error in PUT /organizations/:id/inpatients/:inpatient_id:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /organizations/:id/events - Get organization events
app.get('/:id/events', async (c) => {
  try {
    const orgId = c.req.param('id');
    const upcoming = c.req.query('upcoming') === 'true';

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    let query = supabase
      .from('organization_events')
      .select('*')
      .eq('organization_id', orgId)
      .order('event_date', { ascending: true });

    if (upcoming) {
      query = query.gte('event_date', new Date().toISOString());
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching events:', error);
      return c.json({ error: 'Failed to fetch events' }, 500);
    }

    return c.json({ events: data || [] });
  } catch (error) {
    console.error('Error in GET /organizations/:id/events:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /organizations/:id/events - Create organization event
app.post('/:id/events', async (c) => {
  try {
    const orgId = c.req.param('id');
    const { title, description, event_date, event_type, location, capacity } = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('organization_events')
      .insert({
        organization_id: orgId,
        title,
        description: description || '',
        event_date,
        event_type: event_type || 'social',
        location: location || '',
        capacity: capacity || null,
        attendee_count: 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating event:', error);
      return c.json({ error: 'Failed to create event' }, 500);
    }

    return c.json({ success: true, event: data });
  } catch (error) {
    console.error('Error in POST /organizations/:id/events:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /organizations/:id/families - Get family hub connections
app.get('/:id/families', async (c) => {
  try {
    const orgId = c.req.param('id');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('family_connections')
      .select(`
        *,
        individuals:individual_id (
          id,
          name
        ),
        family_members:family_member_id (
          id,
          name,
          email
        )
      `)
      .eq('organization_id', orgId)
      .eq('status', 'active');

    if (error) {
      console.error('Error fetching families:', error);
      return c.json({ error: 'Failed to fetch families' }, 500);
    }

    return c.json({ families: data || [] });
  } catch (error) {
    console.error('Error in GET /organizations/:id/families:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;