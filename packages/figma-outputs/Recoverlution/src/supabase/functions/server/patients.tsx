/**
 * Patient Management Routes
 * 
 * Handles CRUD operations for patients, progress tracking, and data retrieval
 */

import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const patients = new Hono();

// Enable CORS
patients.use('*', cors());

// Create Supabase client
function getSupabaseClient() {
  return createClient(
    Deno.env.get('SUPABASE_URL') || '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
  );
}

// Helper: Get user from access token
async function getUserFromToken(token: string) {
  const supabase = getSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    return null;
  }
  
  return user;
}

// ============================================================================
// PUBLIC PATIENT SIGNUP (No Auth Required - for demo/onboarding)
// Uses KV Store since patients table may not exist yet
// ============================================================================

patients.post('/signup', async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, currentWeek } = body;

    // Validate required fields
    if (!email || !name) {
      return c.json({ error: 'name and email are required' }, 400);
    }

    // Generate patient ID
    const patientId = crypto.randomUUID();
    const now = new Date().toISOString();

    // Create patient object
    const patient = {
      id: patientId,
      name: name,
      email: email,
      currentWeek: currentWeek || 1,
      hasCompletedOnboarding: false,
      createdAt: now,
      updatedAt: now
    };

    // Store in simple store (using existing infrastructure)
    const store = await import('./simple-store.tsx');
    await store.set(`patient:${patientId}`, patient);
    
    // Also store email -> patientId mapping for lookup
    await store.set(`patient-email:${email}`, patientId);

    console.log('✅ Patient created via signup (simple store):', patientId);

    // Return in format expected by frontend
    return c.json({ 
      success: true, 
      patient
    });

  } catch (error: any) {
    console.error('Patient signup error:', error);
    return c.json({ error: error.message || 'Failed to create patient' }, 500);
  }
});

// ============================================================================
// CREATE PATIENT (Authenticated - for facility staff)
// ============================================================================

patients.post('/', async (c) => {
  try {
    // Verify authorization
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const token = authHeader.split(' ')[1];
    const user = await getUserFromToken(token);
    
    if (!user) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    const body = await c.req.json();
    const { facility_id, email, first_name, last_name, date_of_birth, phone, treatment_stage, demographics } = body;

    // Validate required fields
    if (!facility_id || !email || !first_name) {
      return c.json({ error: 'facility_id, email, and first_name are required' }, 400);
    }

    const supabase = getSupabaseClient();

    // Create patient record
    const { data: patient, error } = await supabase
      .from('patients')
      .insert({
        facility_id,
        email,
        first_name,
        last_name: last_name || '',
        date_of_birth: date_of_birth || null,
        phone: phone || null,
        treatment_stage: treatment_stage || 'intake',
        demographics: demographics || {},
        has_completed_onboarding: false
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating patient:', error);
      return c.json({ error: 'Failed to create patient', details: error.message }, 500);
    }

    console.log('✅ Patient created:', patient.id);

    return c.json({ success: true, patient });

  } catch (error: any) {
    console.error('Create patient error:', error);
    return c.json({ error: error.message || 'Failed to create patient' }, 500);
  }
});

// ============================================================================
// GET PATIENT BY ID
// ============================================================================

patients.get('/:id', async (c) => {
  try {
    const patientId = c.req.param('id');
    
    // Try to get from simple store first
    const store = await import('./simple-store.tsx');
    const patient = await store.get(`patient:${patientId}`);

    if (!patient) {
      return c.json({ error: 'Patient not found' }, 404);
    }

    return c.json({ success: true, patient });

  } catch (error: any) {
    console.error('Get patient error:', error);
    return c.json({ error: error.message || 'Failed to get patient' }, 500);
  }
});

// ============================================================================
// UPDATE PATIENT
// ============================================================================

patients.put('/:id', async (c) => {
  try {
    // Verify authorization
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const token = authHeader.split(' ')[1];
    const user = await getUserFromToken(token);
    
    if (!user) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    const patientId = c.req.param('id');
    const body = await c.req.json();

    const supabase = getSupabaseClient();

    // Update patient
    const { data: patient, error } = await supabase
      .from('patients')
      .update(body)
      .eq('id', patientId)
      .select()
      .single();

    if (error) {
      console.error('Error updating patient:', error);
      return c.json({ error: 'Failed to update patient', details: error.message }, 500);
    }

    console.log('✅ Patient updated:', patient.id);

    return c.json({ success: true, patient });

  } catch (error: any) {
    console.error('Update patient error:', error);
    return c.json({ error: error.message || 'Failed to update patient' }, 500);
  }
});

// ============================================================================
// LIST PATIENTS (for facility)
// ============================================================================

patients.get('/', async (c) => {
  try {
    // Verify authorization
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const token = authHeader.split(' ')[1];
    const user = await getUserFromToken(token);
    
    if (!user) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    // Get facility_id from query params (for admins) or from user's data (for patients)
    const facilityId = c.req.query('facility_id');

    if (!facilityId) {
      return c.json({ error: 'facility_id query parameter required' }, 400);
    }

    const supabase = getSupabaseClient();

    // Get patients for facility
    const { data: patientList, error } = await supabase
      .from('patients')
      .select('*')
      .eq('facility_id', facilityId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error listing patients:', error);
      return c.json({ error: 'Failed to list patients', details: error.message }, 500);
    }

    return c.json({ success: true, patients: patientList, count: patientList.length });

  } catch (error: any) {
    console.error('List patients error:', error);
    return c.json({ error: error.message || 'Failed to list patients' }, 500);
  }
});

// ============================================================================
// TRACK INTERACTION EVENT
// ============================================================================

patients.post('/:id/events', async (c) => {
  try {
    // Verify authorization
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const token = authHeader.split(' ')[1];
    const user = await getUserFromToken(token);
    
    if (!user) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    const patientId = c.req.param('id');
    const body = await c.req.json();

    const {
      event_type,
      content_type,
      content_id,
      session_id,
      session_duration,
      primary_pillar,
      secondary_pillars,
      micro_block_ids,
      prior_state,
      post_state,
      device_type,
      location
    } = body;

    // Validate required fields
    if (!event_type || !session_id) {
      return c.json({ error: 'event_type and session_id are required' }, 400);
    }

    const supabase = getSupabaseClient();

    // Insert interaction event
    const { data: event, error } = await supabase
      .from('interaction_events')
      .insert({
        patient_id: patientId,
        event_type,
        content_type: content_type || null,
        content_id: content_id || null,
        session_id,
        session_duration: session_duration || 0,
        primary_pillar: primary_pillar || null,
        secondary_pillars: secondary_pillars || [],
        micro_block_ids: micro_block_ids || [],
        prior_state: prior_state || null,
        post_state: post_state || null,
        device_type: device_type || 'desktop',
        location: location || 'home'
      })
      .select()
      .single();

    if (error) {
      console.error('Error tracking event:', error);
      return c.json({ error: 'Failed to track event', details: error.message }, 500);
    }

    console.log('✅ Event tracked:', event.id, event_type);

    return c.json({ success: true, event });

  } catch (error: any) {
    console.error('Track event error:', error);
    return c.json({ error: error.message || 'Failed to track event' }, 500);
  }
});

// ============================================================================
// SAVE CONTENT
// ============================================================================

patients.post('/:id/saved-content', async (c) => {
  try {
    // Verify authorization
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const token = authHeader.split(' ')[1];
    const user = await getUserFromToken(token);
    
    if (!user) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    const patientId = c.req.param('id');
    const body = await c.req.json();

    const { content_id, content_type, saved_from, notes, tags, is_favorite } = body;

    // Validate required fields
    if (!content_id || !content_type) {
      return c.json({ error: 'content_id and content_type are required' }, 400);
    }

    const supabase = getSupabaseClient();

    // Upsert saved content (insert or update if exists)
    const { data: savedContent, error } = await supabase
      .from('saved_content')
      .upsert({
        patient_id: patientId,
        content_id,
        content_type,
        saved_from: saved_from || 'toolkit',
        notes: notes || null,
        tags: tags || [],
        is_favorite: is_favorite || false
      }, {
        onConflict: 'patient_id,content_id,content_type'
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving content:', error);
      return c.json({ error: 'Failed to save content', details: error.message }, 500);
    }

    console.log('✅ Content saved:', savedContent.id);

    return c.json({ success: true, savedContent });

  } catch (error: any) {
    console.error('Save content error:', error);
    return c.json({ error: error.message || 'Failed to save content' }, 500);
  }
});

// ============================================================================
// STATE CHECK-IN (Inner Compass)
// ============================================================================

patients.post('/:id/state-checkins', async (c) => {
  try {
    // Verify authorization
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const token = authHeader.split(' ')[1];
    const user = await getUserFromToken(token);
    
    if (!user) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    const patientId = c.req.param('id');
    const body = await c.req.json();

    const { energy, clarity, connection, time_of_day, triggers, notes } = body;

    // Validate required fields
    if (energy === undefined || clarity === undefined || connection === undefined) {
      return c.json({ error: 'energy, clarity, and connection are required (0-100)' }, 400);
    }

    // Validate range
    if (energy < 0 || energy > 100 || clarity < 0 || clarity > 100 || connection < 0 || connection > 100) {
      return c.json({ error: 'energy, clarity, and connection must be between 0-100' }, 400);
    }

    const supabase = getSupabaseClient();

    // Insert state check-in
    const { data: checkin, error } = await supabase
      .from('state_checkins')
      .insert({
        patient_id: patientId,
        energy,
        clarity,
        connection,
        time_of_day: time_of_day || null,
        triggers: triggers || [],
        notes: notes || null
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving state check-in:', error);
      return c.json({ error: 'Failed to save state check-in', details: error.message }, 500);
    }

    console.log('✅ State check-in saved:', checkin.id, `Sync: ${checkin.sync_score}`);

    return c.json({ success: true, checkin });

  } catch (error: any) {
    console.error('State check-in error:', error);
    return c.json({ error: error.message || 'Failed to save state check-in' }, 500);
  }
});

// ============================================================================
// GET MOMENTUM DATA
// ============================================================================

patients.get('/:id/momentum', async (c) => {
  try {
    // Verify authorization
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const token = authHeader.split(' ')[1];
    const user = await getUserFromToken(token);
    
    if (!user) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    const patientId = c.req.param('id');
    const timeframe = c.req.query('timeframe') || 'week'; // week, month, all

    const supabase = getSupabaseClient();

    // Calculate date range
    const now = new Date();
    const days = timeframe === 'week' ? 7 : timeframe === 'month' ? 30 : 365;
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    // Get interaction events for Tempo and Flow
    const { data: events, error: eventsError } = await supabase
      .from('interaction_events')
      .select('*')
      .eq('patient_id', patientId)
      .gte('timestamp', startDate.toISOString())
      .order('timestamp', { ascending: false });

    if (eventsError) {
      console.error('Error fetching events:', eventsError);
      return c.json({ error: 'Failed to fetch momentum data' }, 500);
    }

    // Get saved content for Flow
    const { data: savedContent, error: savedError } = await supabase
      .from('saved_content')
      .select('*')
      .eq('patient_id', patientId);

    if (savedError) {
      console.error('Error fetching saved content:', savedError);
    }

    // Get state check-ins for Sync
    const { data: checkins, error: checkinsError } = await supabase
      .from('state_checkins')
      .select('*')
      .eq('patient_id', patientId)
      .gte('timestamp', startDate.toISOString())
      .order('timestamp', { ascending: false });

    if (checkinsError) {
      console.error('Error fetching check-ins:', checkinsError);
    }

    // Get micro-block states for Brain State
    const { data: microBlocks, error: microBlocksError } = await supabase
      .from('micro_block_states')
      .select('*')
      .eq('patient_id', patientId);

    if (microBlocksError) {
      console.error('Error fetching micro-blocks:', microBlocksError);
    }

    // TODO: Calculate Tempo, Flow, Sync, Brain State metrics
    // For now, return raw data - calculation happens in frontend
    // (Eventually move calculations to backend for performance)

    return c.json({
      success: true,
      data: {
        events: events || [],
        savedContent: savedContent || [],
        checkins: checkins || [],
        microBlocks: microBlocks || []
      }
    });

  } catch (error: any) {
    console.error('Get momentum error:', error);
    return c.json({ error: error.message || 'Failed to get momentum data' }, 500);
  }
});

export default patients;