/**
 * NOTIFICATIONS API
 * 
 * Manages in-app notifications for users.
 * 
 * ROUTES:
 * - GET  /unread          → Get unread notifications for current user
 * - POST /read            → Mark notification as read
 * - POST /ack             → Acknowledge notification delivery
 * 
 * AUTH: All routes require authenticated user (via RLS)
 * REALTIME: Changes broadcast to user:{uuid}:notifications channel
 */

import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const notifications = new Hono();

const getSupabaseClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );
};

// Helper to get authenticated user from token
async function getAuthUser(c: any) {
  const authHeader = c.req.header('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return { error: c.json({ error: 'Unauthorized', message: 'Valid Bearer token required' }, 401) };
  }

  const token = authHeader.substring(7);
  const supabase = getSupabaseClient();
  
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    return { error: c.json({ error: 'Unauthorized', message: 'Invalid or expired token' }, 401) };
  }

  // Get profile ID
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (profileError || !profile) {
    return { error: c.json({ error: 'Profile not found' }, 404) };
  }

  return { userId: user.id, profileId: profile.id };
}

// Simple request timer
class RequestTimer {
  private start: number;
  constructor() {
    this.start = Date.now();
  }
  elapsed() {
    return Date.now() - this.start;
  }
}

// Simplified logging (no middleware dependency)
function logActivity(_supabase: any, _data: any) {
  // Optional: implement logging if needed
  // For now, just skip to avoid middleware dependency
}

// ============================================================================
// GET /unread - Get unread notifications
// ============================================================================

notifications.get('/unread', async (c) => {
  const timer = new RequestTimer();
  const supabase = getSupabaseClient();

  try {
    const authResult = await getAuthUser(c);
    if (authResult.error) return authResult.error;
    const { profileId } = authResult;

    // Get unread notifications
    const { data: unreadNotifications, error } = await supabase
      .from('in_app_notifications')
      .select('*')
      .eq('individual_id', profileId)
      .eq('is_read', false)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Notifications] Error fetching unread:', error);
      logActivity(supabase, {
        endpoint: '/notifications/unread',
        method: 'GET',
        statusCode: 500,
        duration: timer.elapsed(),
        userId: profileId,
        error: error.message,
      });
      return c.json({ error: 'Failed to fetch notifications', details: error.message }, 500);
    }

    logActivity(supabase, {
      endpoint: '/notifications/unread',
      method: 'GET',
      statusCode: 200,
      duration: timer.elapsed(),
      userId: profileId,
      metadata: { count: unreadNotifications?.length || 0 },
    });

    return c.json({
      notifications: unreadNotifications || [],
      count: unreadNotifications?.length || 0,
    });
  } catch (err) {
    console.error('[Notifications] Exception in /unread:', err);
    logActivity(supabase, {
      endpoint: '/notifications/unread',
      method: 'GET',
      statusCode: 500,
      duration: timer.elapsed(),
      error: err.message,
    });
    return c.json({ error: 'Internal server error', details: err.message }, 500);
  }
});

// ============================================================================
// POST /read - Mark notification as read
// ============================================================================

notifications.post('/read', async (c) => {
  const supabase = getSupabaseClient();

  try {
    const authResult = await getAuthUser(c);
    if (authResult.error) return authResult.error;
    const { profileId } = authResult;

    // Parse and validate body
    let body;
    try {
      body = await c.req.json();
    } catch (err) {
      return c.json({ error: 'Invalid JSON', message: 'Request body must be valid JSON' }, 400);
    }

    const { id } = body;
    
    if (!id) {
      return c.json({ error: 'Validation failed', message: 'id is required' }, 422);
    }

    // Update notification (RLS ensures user owns it)
    const { data: updated, error } = await supabase
      .from('in_app_notifications')
      .update({
        is_read: true,
        read_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('individual_id', profileId)
      .select()
      .single();

    if (error) {
      console.error('[Notifications] Error marking as read:', error);
      return c.json({ error: 'Failed to mark notification as read', details: error.message }, 500);
    }

    if (!updated) {
      return c.json({ error: 'Notification not found or access denied' }, 404);
    }

    return c.json({ success: true, notification: updated });
  } catch (err: any) {
    console.error('[Notifications] Exception in /read:', err);
    return c.json({ error: 'Internal server error', details: err.message }, 500);
  }
});

// ============================================================================
// POST /ack - Acknowledge notification delivery
// ============================================================================

notifications.post('/ack', async (c) => {
  const supabase = getSupabaseClient();

  try {
    const authResult = await getAuthUser(c);
    if (authResult.error) return authResult.error;
    const { profileId } = authResult;

    // Parse and validate body
    let body;
    try {
      body = await c.req.json();
    } catch (err) {
      return c.json({ error: 'Invalid JSON', message: 'Request body must be valid JSON' }, 400);
    }

    const { outbox_id } = body;
    
    if (!outbox_id) {
      return c.json({ error: 'Validation failed', message: 'outbox_id is required' }, 422);
    }

    // Verify outbox entry exists and belongs to user
    const { data: outboxEntry, error: outboxError } = await supabase
      .from('notifications_outbox')
      .select('id, individual_id')
      .eq('id', outbox_id)
      .single();

    if (outboxError || !outboxEntry) {
      return c.json({ error: 'Outbox entry not found' }, 404);
    }

    if (outboxEntry.individual_id !== profileId) {
      return c.json({ error: 'Access denied' }, 403);
    }

    // Upsert delivery record
    const { data: delivery, error } = await supabase
      .from('notification_deliveries')
      .upsert({
        outbox_id,
        provider: 'internal',
        status: 'delivered',
        delivered_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('[Notifications] Error recording delivery:', error);
      return c.json({ error: 'Failed to record delivery', details: error.message }, 500);
    }

    return c.json({ success: true, delivery });
  } catch (err: any) {
    console.error('[Notifications] Exception in /ack:', err);
    return c.json({ error: 'Internal server error', details: err.message }, 500);
  }
});

export default notifications;