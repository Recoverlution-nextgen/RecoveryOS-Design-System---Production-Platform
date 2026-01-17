/**
 * REGISTRY SERVICE
 * The canonical truth layer for Command Center
 * 
 * Manages:
 * - content_registry (universal contract headers)
 * - delivery_registry (presentation templates)
 * - delivery_variants (personalization patches)
 * - lifecycle (draft → review → publish → deprecate)
 */

import { Hono } from 'npm:hono';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const app = new Hono();

const getClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
};

// ============================================================================
// CONTENT REGISTRY - Universal Contract Headers
// ============================================================================

// Get all content (with filters)
app.get('/content', async (c) => {
  try {
    const supabase = getClient();
    
    // Query params
    const content_kind = c.req.query('content_kind');
    const status = c.req.query('status');
    const pillar_id = c.req.query('pillar_id');
    const is_active = c.req.query('is_active') !== 'false';
    
    let query = supabase
      .from('content_registry')
      .select('*')
      .eq('is_active', is_active)
      .order('created_at', { ascending: false });
    
    if (content_kind) query = query.eq('content_kind', content_kind);
    if (status) query = query.eq('status', status);
    if (pillar_id) query = query.eq('pillar_id', pillar_id);
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return c.json({ success: true, content: data });
  } catch (error: any) {
    console.error('[Registry] Get content error:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Get single content by ID
app.get('/content/:id', async (c) => {
  try {
    const supabase = getClient();
    const id = c.req.param('id');
    
    const { data, error } = await supabase
      .from('content_registry')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return c.json({ success: true, content: data });
  } catch (error: any) {
    console.error('[Registry] Get content by ID error:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create content
app.post('/content', async (c) => {
  try {
    const supabase = getClient();
    const body = await c.req.json();
    
    // Validate required fields
    if (!body.content_kind || !body.source_table || !body.source_pk) {
      return c.json({ 
        success: false, 
        error: 'content_kind, source_table, and source_pk are required' 
      }, 400);
    }
    
    // Validate response_contract exists (Law #2: No Contract, No Delivery)
    if (!body.response_contract || Object.keys(body.response_contract).length === 0) {
      return c.json({
        success: false,
        error: 'response_contract is required (Law #2: No Contract, No Delivery)'
      }, 400);
    }
    
    const { data, error } = await supabase
      .from('content_registry')
      .insert({
        content_kind: body.content_kind,
        source_table: body.source_table,
        source_pk: body.source_pk,
        pillar_id: body.pillar_id,
        theme_id: body.theme_id,
        tags: body.tags || [],
        targeting_rules: body.targeting_rules || {},
        arousal_fit: body.arousal_fit,
        state_band_fit: body.state_band_fit || ['green', 'amber', 'red'],
        safety_flags: body.safety_flags || {},
        contraindications: body.contraindications || [],
        risk_level: body.risk_level || 'low',
        response_contract: body.response_contract,
        clinical_metadata: body.clinical_metadata || {},
        measurement_intent: body.measurement_intent,
        proof_pathway: body.proof_pathway || {},
        created_by: body.created_by,
        status: body.status || 'draft'
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // Log to audit
    await logAudit(supabase, {
      actor_id: body.created_by,
      action: 'create',
      entity_type: 'content',
      entity_id: data.id,
      changes: { created: data }
    });
    
    return c.json({ success: true, content: data });
  } catch (error: any) {
    console.error('[Registry] Create content error:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Update content
app.put('/content/:id', async (c) => {
  try {
    const supabase = getClient();
    const id = c.req.param('id');
    const body = await c.req.json();
    
    // Get existing
    const { data: existing } = await supabase
      .from('content_registry')
      .select('*')
      .eq('id', id)
      .single();
    
    const { data, error } = await supabase
      .from('content_registry')
      .update({
        ...body,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    // Log to audit
    await logAudit(supabase, {
      actor_id: body.updated_by || body.created_by,
      action: 'update',
      entity_type: 'content',
      entity_id: id,
      changes: { before: existing, after: data }
    });
    
    return c.json({ success: true, content: data });
  } catch (error: any) {
    console.error('[Registry] Update content error:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Publish content (change status)
app.post('/content/:id/publish', async (c) => {
  try {
    const supabase = getClient();
    const id = c.req.param('id');
    const { approved_by } = await c.req.json();
    
    const { data, error } = await supabase
      .from('content_registry')
      .update({
        status: 'published',
        approved_by,
        approved_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    // Log to audit
    await logAudit(supabase, {
      actor_id: approved_by,
      action: 'publish',
      entity_type: 'content',
      entity_id: id,
      reason: 'Content approved and published'
    });
    
    return c.json({ success: true, content: data });
  } catch (error: any) {
    console.error('[Registry] Publish content error:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Deprecate content
app.post('/content/:id/deprecate', async (c) => {
  try {
    const supabase = getClient();
    const id = c.req.param('id');
    const { deprecated_by, reason, superseded_by } = await c.req.json();
    
    const { data, error } = await supabase
      .from('content_registry')
      .update({
        status: 'deprecated',
        deprecated_at: new Date().toISOString(),
        supersedes_content_ref: superseded_by || null
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    // Log to audit
    await logAudit(supabase, {
      actor_id: deprecated_by,
      action: 'deprecate',
      entity_type: 'content',
      entity_id: id,
      reason
    });
    
    return c.json({ success: true, content: data });
  } catch (error: any) {
    console.error('[Registry] Deprecate content error:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ============================================================================
// DELIVERY REGISTRY - Presentation Templates
// ============================================================================

// Get deliveries for content
app.get('/content/:content_ref/deliveries', async (c) => {
  try {
    const supabase = getClient();
    const content_ref = c.req.param('content_ref');
    
    const { data, error } = await supabase
      .from('delivery_registry')
      .select('*')
      .eq('content_ref', content_ref)
      .eq('is_active', true);
    
    if (error) throw error;
    
    return c.json({ success: true, deliveries: data });
  } catch (error: any) {
    console.error('[Registry] Get deliveries error:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create delivery
app.post('/deliveries', async (c) => {
  try {
    const supabase = getClient();
    const body = await c.req.json();
    
    // Validate
    if (!body.content_ref || !body.delivery_kind || !body.channel) {
      return c.json({
        success: false,
        error: 'content_ref, delivery_kind, and channel are required'
      }, 400);
    }
    
    const { data, error } = await supabase
      .from('delivery_registry')
      .insert({
        content_ref: body.content_ref,
        delivery_kind: body.delivery_kind,
        channel: body.channel,
        title_template: body.title_template,
        preview_payload: body.preview_payload || {},
        cta_label: body.cta_label,
        estimated_seconds: body.estimated_seconds,
        interaction_policy: body.interaction_policy || {},
        expiry_window_hours: body.expiry_window_hours,
        cooldown_hours: body.cooldown_hours || 24,
        max_exposures: body.max_exposures,
        has_variants: body.has_variants || false,
        variant_rules: body.variant_rules || {}
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return c.json({ success: true, delivery: data });
  } catch (error: any) {
    console.error('[Registry] Create delivery error:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Get variants for delivery
app.get('/deliveries/:delivery_ref/variants', async (c) => {
  try {
    const supabase = getClient();
    const delivery_ref = c.req.param('delivery_ref');
    
    const { data, error } = await supabase
      .from('delivery_variants')
      .select('*')
      .eq('delivery_ref', delivery_ref)
      .eq('is_active', true);
    
    if (error) throw error;
    
    return c.json({ success: true, variants: data });
  } catch (error: any) {
    console.error('[Registry] Get variants error:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create variant
app.post('/variants', async (c) => {
  try {
    const supabase = getClient();
    const body = await c.req.json();
    
    const { data, error } = await supabase
      .from('delivery_variants')
      .insert({
        delivery_ref: body.delivery_ref,
        variant_key: body.variant_key,
        meta_patch: body.meta_patch || {},
        payload_patch: body.payload_patch || {},
        voice_override: body.voice_override,
        response_contract_override: body.response_contract_override,
        activation_rules: body.activation_rules || {}
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return c.json({ success: true, variant: data });
  } catch (error: any) {
    console.error('[Registry] Create variant error:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ============================================================================
// REVIEWS - Approval Workflow
// ============================================================================

// Submit for review
app.post('/content/:id/submit-review', async (c) => {
  try {
    const supabase = getClient();
    const id = c.req.param('id');
    const { review_type, reviewer_id } = await c.req.json();
    
    // Update content status
    await supabase
      .from('content_registry')
      .update({ status: 'review' })
      .eq('id', id);
    
    // Create review record
    const { data, error } = await supabase
      .from('content_reviews')
      .insert({
        content_ref: id,
        reviewer_id,
        review_type: review_type || 'clinical',
        status: 'pending'
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return c.json({ success: true, review: data });
  } catch (error: any) {
    console.error('[Registry] Submit review error:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Approve/reject review
app.post('/reviews/:id/decision', async (c) => {
  try {
    const supabase = getClient();
    const review_id = c.req.param('id');
    const { status, comments, changes_requested } = await c.req.json();
    
    const { data, error } = await supabase
      .from('content_reviews')
      .update({
        status,
        comments,
        changes_requested: changes_requested || [],
        reviewed_at: new Date().toISOString()
      })
      .eq('id', review_id)
      .select()
      .single();
    
    if (error) throw error;
    
    // Update content status if approved
    if (status === 'approved') {
      await supabase
        .from('content_registry')
        .update({ status: 'approved' })
        .eq('id', data.content_ref);
    }
    
    return c.json({ success: true, review: data });
  } catch (error: any) {
    console.error('[Registry] Review decision error:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ============================================================================
// AUDIT LOG
// ============================================================================

// Get audit log
app.get('/audit', async (c) => {
  try {
    const supabase = getClient();
    
    const entity_type = c.req.query('entity_type');
    const entity_id = c.req.query('entity_id');
    const limit = parseInt(c.req.query('limit') || '50');
    
    let query = supabase
      .from('audit_log')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit);
    
    if (entity_type) query = query.eq('entity_type', entity_type);
    if (entity_id) query = query.eq('entity_id', entity_id);
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return c.json({ success: true, logs: data });
  } catch (error: any) {
    console.error('[Registry] Get audit log error:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ============================================================================
// HELPERS
// ============================================================================

async function logAudit(supabase: any, entry: {
  actor_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  changes?: any;
  reason?: string;
}) {
  try {
    await supabase
      .from('audit_log')
      .insert({
        actor_id: entry.actor_id,
        action: entry.action,
        entity_type: entry.entity_type,
        entity_id: entry.entity_id,
        changes: entry.changes || {},
        reason: entry.reason
      });
  } catch (error) {
    console.error('[Audit Log] Failed to log:', error);
  }
}

export default app;
