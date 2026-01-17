/**
 * PEER CONNECTIONS ENDPOINT
 * Individual-to-individual relationships
 */

import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const app = new Hono();

// POST /peer/send-invite - Send connection invite
app.post('/send-invite', async (c) => {
  try {
    const { from_user_id, to_user_id, message } = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('peer_connection_invites')
      .insert({
        from_user_id,
        to_user_id,
        message: message || '',
        status: 'pending',
        sent_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error sending invite:', error);
      return c.json({ error: 'Failed to send invite' }, 500);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error in POST /peer/send-invite:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /peer/accept-invite - Accept invite
app.post('/accept-invite', async (c) => {
  try {
    const { invite_id } = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Update invite status
    const { data: invite } = await supabase
      .from('peer_connection_invites')
      .update({ status: 'accepted', accepted_at: new Date().toISOString() })
      .eq('id', invite_id)
      .select()
      .single();

    if (!invite) {
      return c.json({ error: 'Invite not found' }, 404);
    }

    // Create connection
    const { data, error } = await supabase
      .from('peer_connections')
      .insert({
        user1_id: invite.from_user_id,
        user2_id: invite.to_user_id,
        connected_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating connection:', error);
      return c.json({ error: 'Failed to create connection' }, 500);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error in POST /peer/accept-invite:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /peer/connections/:user_id - Get connections
app.get('/connections/:user_id', async (c) => {
  try {
    const userId = c.req.param('user_id');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('peer_connections')
      .select('*')
      .or(`user1_id.eq.${userId},user2_id.eq.${userId}`);

    if (error) {
      console.error('Error fetching connections:', error);
      return c.json({ error: 'Failed to fetch connections' }, 500);
    }

    return c.json(data || []);
  } catch (error) {
    console.error('Error in GET /peer/connections/:user_id:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /peer/message - Send message
app.post('/message', async (c) => {
  try {
    const { connection_id, from_user_id, message } = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('peer_messages')
      .insert({
        connection_id,
        from_user_id,
        message,
        sent_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error sending message:', error);
      return c.json({ error: 'Failed to send message' }, 500);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error in POST /peer/message:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /peer/messages/:connection_id - Get messages
app.get('/messages/:connection_id', async (c) => {
  try {
    const connectionId = c.req.param('connection_id');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('peer_messages')
      .select('*')
      .eq('connection_id', connectionId)
      .order('sent_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return c.json({ error: 'Failed to fetch messages' }, 500);
    }

    return c.json(data || []);
  } catch (error) {
    console.error('Error in GET /peer/messages/:connection_id:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /peer/support-circle/create - Create support circle
app.post('/support-circle/create', async (c) => {
  try {
    const { name, creator_id, description } = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('support_circles')
      .insert({
        name,
        creator_id,
        description: description || '',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating support circle:', error);
      return c.json({ error: 'Failed to create support circle' }, 500);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error in POST /peer/support-circle/create:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
