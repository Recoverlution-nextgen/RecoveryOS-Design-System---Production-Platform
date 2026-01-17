/**
 * FAMILY HUB ENDPOINT
 * Family member support (B2C)
 */

import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const app = new Hono();

// POST /family/create-account - Create family member account
app.post('/create-account', async (c) => {
  try {
    const { email, name, relationship_type } = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('family_members')
      .insert({
        email,
        name,
        relationship_type,
        subscription_status: 'trial',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating family account:', error);
      return c.json({ error: 'Failed to create account' }, 500);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error in POST /family/create-account:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /family/link-individual - Link to loved one (with consent)
app.post('/link-individual', async (c) => {
  try {
    const { family_member_id, individual_id, consent_given } = await c.req.json();

    if (!consent_given) {
      return c.json({ error: 'Consent required from individual' }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('family_connections')
      .insert({
        family_member_id,
        individual_id,
        consent_given: true,
        linked_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error linking individual:', error);
      return c.json({ error: 'Failed to link individual' }, 500);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error in POST /family/link-individual:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /family/:id/resources - Get family resources
app.get('/:id/resources', async (c) => {
  try {
    const familyMemberId = c.req.param('id');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Get family-specific content
    const { data, error } = await supabase
      .from('content_items')
      .select('*')
      .contains('tags', ['family'])
      .eq('status', 'published');

    if (error) {
      console.error('Error fetching family resources:', error);
      return c.json({ error: 'Failed to fetch resources' }, 500);
    }

    return c.json(data || []);
  } catch (error) {
    console.error('Error in GET /family/:id/resources:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /family/:id/support-groups - Get family support groups
app.get('/:id/support-groups', async (c) => {
  try {
    // TODO: Return family support groups
    return c.json([
      { id: '1', name: 'Parents in Recovery Support', members: 47 },
      { id: '2', name: 'Spouses & Partners Circle', members: 33 },
      { id: '3', name: 'Setting Boundaries Workshop', members: 22 },
    ]);
  } catch (error) {
    console.error('Error in GET /family/:id/support-groups:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /family/subscribe - B2C subscription
app.post('/subscribe', async (c) => {
  try {
    const { family_member_id, plan } = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('family_members')
      .update({
        subscription_status: 'active',
        subscription_plan: plan,
        subscribed_at: new Date().toISOString(),
      })
      .eq('id', family_member_id)
      .select()
      .single();

    if (error) {
      console.error('Error updating subscription:', error);
      return c.json({ error: 'Failed to subscribe' }, 500);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error in POST /family/subscribe:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
