/**
 * ENTERPRISE CONTACTS API
 * 
 * Handles enterprise inquiry form submissions for Recoverlution Continuity.
 * Stores contact details in Supabase and triggers notification emails.
 */

import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

/**
 * POST /submit
 * Submit enterprise contact form
 */
app.post('/submit', async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, organization, role, phone, message } = body;

    // Validate required fields
    if (!name || !email || !organization) {
      return c.json({ 
        error: 'Missing required fields: name, email, organization' 
      }, 400);
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: 'Invalid email format' }, 400);
    }

    console.log('📝 Enterprise contact submission:', {
      name,
      email,
      organization,
      role: role || 'Not provided',
      phone: phone || 'Not provided'
    });

    // Store in database
    const { data, error } = await supabase
      .from('enterprise_contacts_therapy')
      .insert({
        name,
        email,
        organization,
        role: role || null,
        phone: phone || null,
        message: message || null,
        status: 'new',
        source: 'therapy_page',
        metadata: {
          submitted_at: new Date().toISOString(),
          user_agent: c.req.header('user-agent'),
          ip: c.req.header('x-forwarded-for') || 'unknown'
        }
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Error storing enterprise contact:', error);
      return c.json({ 
        error: 'Failed to store contact information',
        details: error.message 
      }, 500);
    }

    console.log('✅ Enterprise contact stored:', data);

    // TODO: Send notification email via Resend
    // This will be added in a future update

    return c.json({ 
      success: true,
      message: 'Thank you for your interest. We will be in touch within 24 hours.',
      contactId: data.id
    });

  } catch (error) {
    console.error('❌ Error in enterprise contact submission:', error);
    return c.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

/**
 * GET /verify/:contactId
 * Verify a contact submission (for confirmation pages)
 */
app.get('/verify/:contactId', async (c) => {
  try {
    const contactId = c.req.param('contactId');

    if (!contactId) {
      return c.json({ error: 'Missing contact ID' }, 400);
    }

    const { data, error } = await supabase
      .from('enterprise_contacts_therapy')
      .select('id, name, email, organization, created_at, status')
      .eq('id', contactId)
      .single();

    if (error || !data) {
      return c.json({ error: 'Contact not found' }, 404);
    }

    return c.json({
      success: true,
      contact: data
    });

  } catch (error) {
    console.error('❌ Error verifying contact:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
