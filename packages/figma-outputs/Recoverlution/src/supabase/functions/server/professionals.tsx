/**
 * PROFESSIONALS ENDPOINT
 * Professional portal backend
 */

import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const app = new Hono();

// POST /professionals - Create professional profile
app.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const { user_id, name, credentials, specialties, hourly_rate, bio } = body;

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('professionals')
      .insert({
        user_id,
        name,
        credentials,
        specialties: specialties || [],
        hourly_rate: hourly_rate || 0,
        bio: bio || '',
        is_stripe_connected: false,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating professional:', error);
      return c.json({ error: 'Failed to create professional profile' }, 500);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error in POST /professionals:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /professionals/:id - Get professional profile
app.get('/:id', async (c) => {
  try {
    const professionalId = c.req.param('id');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('professionals')
      .select('*')
      .eq('id', professionalId)
      .single();

    if (error || !data) {
      return c.json({ error: 'Professional not found' }, 404);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error in GET /professionals/:id:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// PUT /professionals/:id - Update professional profile
app.put('/:id', async (c) => {
  try {
    const professionalId = c.req.param('id');
    const updates = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('professionals')
      .update(updates)
      .eq('id', professionalId)
      .select()
      .single();

    if (error) {
      console.error('Error updating professional:', error);
      return c.json({ error: 'Failed to update professional' }, 500);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error in PUT /professionals/:id:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /professionals/:id/sessions - Get therapy sessions
app.get('/:id/sessions', async (c) => {
  try {
    const professionalId = c.req.param('id');
    const status = c.req.query('status'); // scheduled | completed | cancelled

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    let query = supabase
      .from('therapy_sessions')
      .select('*')
      .eq('professional_id', professionalId)
      .order('scheduled_time', { ascending: true });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching sessions:', error);
      return c.json({ error: 'Failed to fetch sessions' }, 500);
    }

    return c.json(data || []);
  } catch (error) {
    console.error('Error in GET /professionals/:id/sessions:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /professionals/:id/earnings - Get earnings data
app.get('/:id/earnings', async (c) => {
  try {
    const professionalId = c.req.param('id');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: sessions, error } = await supabase
      .from('therapy_sessions')
      .select('payment_amount, status, scheduled_time')
      .eq('professional_id', professionalId)
      .eq('status', 'completed');

    if (error) {
      console.error('Error fetching earnings:', error);
      return c.json({ error: 'Failed to fetch earnings' }, 500);
    }

    const total = sessions?.reduce((sum, s) => sum + (s.payment_amount || 0), 0) || 0;
    const thisMonth = sessions?.filter(s => {
      const sessionDate = new Date(s.scheduled_time);
      const now = new Date();
      return sessionDate.getMonth() === now.getMonth() && sessionDate.getFullYear() === now.getFullYear();
    }).reduce((sum, s) => sum + (s.payment_amount || 0), 0) || 0;

    return c.json({
      total_earnings: total,
      this_month: thisMonth,
      session_count: sessions?.length || 0,
    });
  } catch (error) {
    console.error('Error in GET /professionals/:id/earnings:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /professionals/:id/availability - Set availability
app.post('/:id/availability', async (c) => {
  try {
    const professionalId = c.req.param('id');
    const { availability } = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('professionals')
      .update({ availability })
      .eq('id', professionalId)
      .select()
      .single();

    if (error) {
      console.error('Error updating availability:', error);
      return c.json({ error: 'Failed to update availability' }, 500);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error in POST /professionals/:id/availability:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /professionals/search - Search professionals
app.get('/search', async (c) => {
  try {
    const query = c.req.query('q');
    const specialty = c.req.query('specialty');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    let dbQuery = supabase
      .from('professionals')
      .select('*')
      .eq('status', 'active');

    if (query) {
      dbQuery = dbQuery.or(`name.ilike.%${query}%,bio.ilike.%${query}%`);
    }

    if (specialty) {
      dbQuery = dbQuery.contains('specialties', [specialty]);
    }

    const { data, error } = await dbQuery;

    if (error) {
      console.error('Error searching professionals:', error);
      return c.json({ error: 'Failed to search professionals' }, 500);
    }

    return c.json(data || []);
  } catch (error) {
    console.error('Error in GET /professionals/search:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /professionals/:id/individuals - Get all individuals (patients) for professional
app.get('/:id/individuals', async (c) => {
  try {
    const professionalId = c.req.param('id');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Get individuals assigned to this professional
    const { data, error } = await supabase
      .from('professional_individuals')
      .select(`
        individual_id,
        individuals:individual_id (
          id,
          name,
          email,
          created_at
        )
      `)
      .eq('professional_id', professionalId);

    if (error) {
      console.error('Error fetching individuals:', error);
      return c.json({ error: 'Failed to fetch individuals' }, 500);
    }

    // Transform and enrich with mock session data
    const individuals = (data || []).map((item: any) => ({
      id: item.individuals.id,
      name: item.individuals.name,
      email: item.individuals.email,
      next_session: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      week_number: Math.floor(Math.random() * 12) + 1,
      created_at: item.individuals.created_at,
    }));

    return c.json({ individuals });
  } catch (error) {
    console.error('Error in GET /professionals/:id/individuals:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /professionals/:id/messages - Send message to individual
app.post('/:id/messages', async (c) => {
  try {
    const professionalId = c.req.param('id');
    const { individual_id, message_type, content, tone_analysis } = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('professional_messages')
      .insert({
        professional_id: professionalId,
        individual_id,
        message_type,
        content,
        tone_analysis: tone_analysis || {},
        sent_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error sending message:', error);
      return c.json({ error: 'Failed to send message' }, 500);
    }

    return c.json({ success: true, message: data });
  } catch (error) {
    console.error('Error in POST /professionals/:id/messages:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /professionals/:id/messages - Get professional's inbox
app.get('/:id/messages', async (c) => {
  try {
    const professionalId = c.req.param('id');
    const unreadOnly = c.req.query('unread_only') === 'true';

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    let query = supabase
      .from('professional_messages')
      .select(`
        *,
        individuals:individual_id (
          id,
          name,
          email
        )
      `)
      .eq('professional_id', professionalId)
      .order('sent_at', { ascending: false });

    if (unreadOnly) {
      query = query.is('read_at', null);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching messages:', error);
      return c.json({ error: 'Failed to fetch messages' }, 500);
    }

    // Transform to include individual name
    const messages = (data || []).map((msg: any) => ({
      id: msg.id,
      individual_id: msg.individual_id,
      individual_name: msg.individuals?.name || 'Unknown',
      message_type: msg.message_type,
      message_content: msg.content,
      sent_at: msg.sent_at,
      read_at: msg.read_at,
      individual_reply: msg.individual_reply,
      replied_at: msg.replied_at,
    }));

    return c.json({ messages });
  } catch (error) {
    console.error('Error in GET /professionals/:id/messages:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /professionals/:id/shared-content - Get shared content tracker
app.get('/:id/shared-content', async (c) => {
  try {
    const professionalId = c.req.param('id');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('shared_content')
      .select(`
        *,
        individuals:individual_id (
          id,
          name
        )
      `)
      .eq('professional_id', professionalId)
      .order('shared_at', { ascending: false });

    if (error) {
      console.error('Error fetching shared content:', error);
      return c.json({ error: 'Failed to fetch shared content' }, 500);
    }

    const content = (data || []).map((item: any) => ({
      id: item.id,
      content_type: item.content_type,
      content_title: item.content_title,
      individual_name: item.individuals?.name || 'Unknown',
      shared_at: item.shared_at,
      viewed_at: item.viewed_at,
      completed_at: item.completed_at,
      individual_response: item.individual_response,
    }));

    return c.json({ content });
  } catch (error) {
    console.error('Error in GET /professionals/:id/shared-content:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /professionals/:id/analyze-tone - Analyze message tone (Affective Compiler)
app.post('/:id/analyze-tone', async (c) => {
  try {
    const { message } = await c.req.json();

    // Simple tone analysis algorithm
    // In production, this would use OpenAI or similar
    const threatWords = ['must', 'should', 'have to', 'need to', 'wrong', 'bad', 'fail'];
    const agencyWords = ['you can', 'you might', 'consider', 'explore', 'choose', 'decide'];
    
    const lowerMessage = message.toLowerCase();
    const threatScore = threatWords.reduce((score, word) => {
      return score + (lowerMessage.includes(word) ? 10 : 0);
    }, 0);
    
    const agencyScore = agencyWords.reduce((score, word) => {
      return score + (lowerMessage.includes(word) ? 15 : 0);
    }, 50); // Base agency score of 50

    let suggestedRewrite = null;
    if (threatScore > 30) {
      suggestedRewrite = message
        .replace(/must/gi, 'might consider')
        .replace(/should/gi, 'could')
        .replace(/have to/gi, 'might want to')
        .replace(/need to/gi, 'could benefit from');
    }

    return c.json({
      threat_score: Math.min(threatScore, 100),
      agency_score: Math.min(agencyScore, 100),
      suggested_rewrite: suggestedRewrite,
    });
  } catch (error) {
    console.error('Error in POST /professionals/:id/analyze-tone:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;