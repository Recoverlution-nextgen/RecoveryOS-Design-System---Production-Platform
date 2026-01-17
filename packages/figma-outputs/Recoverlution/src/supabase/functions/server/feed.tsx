/**
 * Feed API - Universal Player Queue Management
 * 
 * Endpoints:
 * - POST   /generate    - Generate queue for individual (LUMA orchestration)
 * - POST   /engagement  - Track engagement event
 * - GET    /next        - Get next item in queue
 * - GET    /queue       - Get full queue for individual
 * - DELETE /clear       - Clear queue for individual
 */

import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const feed = new Hono();

// Enable CORS
feed.use('*', cors());

// Create Supabase client (service role for bypassing RLS in queue generation)
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

// Helper: Verify user can access patient data
async function canAccessPatient(userId: string, patientId: string): Promise<boolean> {
  const supabase = getSupabaseClient();
  
  // Case 1: User accessing their own data
  if (userId === patientId) {
    return true;
  }
  
  // Case 2: Professional accessing client data
  const { data: assignment } = await supabase
    .from('client_assignments')
    .select('id')
    .eq('professional_id', userId)
    .eq('client_id', patientId)
    .maybeSingle();
  
  if (assignment) {
    return true;
  }
  
  // Case 3: Organization admin/professional accessing org member
  // This requires checking organization_members + organization_id match
  // For now, simplified - can be extended later
  
  return false;
}

// ============================================================================
// ENDPOINT: POST /generate
// Generate queue for individual using LUMA orchestration
// ============================================================================

feed.post('/generate', async (c) => {
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
    const { patientId, organizationId, limit = 10 } = body;

    // Validate required fields
    if (!patientId) {
      return c.json({ error: 'patientId is required' }, 400);
    }

    // Verify access
    const hasAccess = await canAccessPatient(user.id, patientId);
    if (!hasAccess) {
      return c.json({ error: 'Forbidden: Cannot access this patient' }, 403);
    }

    const supabase = getSupabaseClient();

    // Step 1: Get current queue depth
    const { count: currentQueueDepth } = await supabase
      .from('user_feed_queue')
      .select('*', { count: 'exact', head: true })
      .eq('patient_id', patientId)
      .is('completed_at', null)
      .is('skipped_at', null);

    console.log(`📊 Current queue depth for ${patientId}: ${currentQueueDepth || 0}`);

    // Step 2: Calculate how many items to add
    const targetQueueSize = limit;
    const itemsToAdd = Math.max(0, targetQueueSize - (currentQueueDepth || 0));

    if (itemsToAdd === 0) {
      return c.json({
        success: true,
        message: 'Queue is already full',
        queued: 0,
        queueDepth: currentQueueDepth,
        items: []
      });
    }

    // Step 3: Get Sentient Baseline (from LUMA v2)
    // TODO: Import and call calculateSentientBaseline(patientId)
    const sentientBaseline = {
      regulate_ready: 0.5,
      state_avg: 5.0,
      dysregulated: false
    };

    // Step 4: Get Story Map context
    const { data: storyMap } = await supabase
      .from('story_map_entries')
      .select('*')
      .eq('user_id', patientId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    const protectionBias = storyMap?.protection_bias || null;
    const hotContexts = storyMap?.hot_contexts || [];

    console.log(`🗺️ Story Map context: protection=${protectionBias}, contexts=${hotContexts.join(',')}`);

    // Step 5: Get weakest K-B-E
    // TODO: Import and call getWeakestKBE(patientId)
    const weakestKBE = 'knowing'; // Default

    // Step 6: Query candidate content (NaviCues for now)
    // Later: include blocks, practices, articles, etc.
    const { data: navicues, error: navicuesError } = await supabase
      .from('navicues')
      .select('*')
      .eq('kbe_target', weakestKBE)
      .limit(itemsToAdd * 3); // Get 3x candidates for scoring

    if (navicuesError) {
      console.error('❌ Error fetching NaviCues:', navicuesError);
      return c.json({ error: 'Failed to fetch content' }, 500);
    }

    console.log(`🎯 Found ${navicues?.length || 0} candidate NaviCues for K-B-E: ${weakestKBE}`);

    // Step 7: Score and rank candidates
    const scoredContent = (navicues || []).map((navicue: any) => {
      let score = 1.0;

      // Boost if matches protection bias
      if (protectionBias && navicue.protection_match?.includes(protectionBias)) {
        score += 0.5;
      }

      // Boost if matches hot contexts
      const matchingContexts = navicue.hot_context_match?.filter((ctx: string) => hotContexts.includes(ctx)) || [];
      score += matchingContexts.length * 0.3;

      // Penalize if safety flags present and user is dysregulated
      if (sentientBaseline.dysregulated && navicue.safety_flags?.length > 0) {
        score -= 0.3;
      }

      return { navicue, score };
    });

    // Sort by score descending
    scoredContent.sort((a, b) => b.score - a.score);

    // Take top N
    const selectedContent = scoredContent.slice(0, itemsToAdd);

    console.log(`✅ Selected ${selectedContent.length} items for queue`);

    // Step 8: Get current max position
    const { data: maxPositionRow } = await supabase
      .from('user_feed_queue')
      .select('position')
      .eq('patient_id', patientId)
      .order('position', { ascending: false })
      .limit(1)
      .maybeSingle();

    let nextPosition = (maxPositionRow?.position || 0) + 1;

    // Step 9: Insert into queue
    const queueItems = selectedContent.map(({ navicue, score }) => ({
      patient_id: patientId,
      organization_id: organizationId || null,
      content_type: 'navicue',
      content_id: navicue.id,
      position: nextPosition++,
      reason: `kbe:${weakestKBE},score:${score.toFixed(2)}`,
      context_tags: [
        ...(protectionBias ? [protectionBias] : []),
        ...hotContexts.slice(0, 2), // Top 2 hot contexts
        weakestKBE
      ],
      metadata: {
        sentient_baseline: sentientBaseline,
        protection_bias: protectionBias,
        hot_contexts: hotContexts,
        score: score
      }
    }));

    const { error: insertError } = await supabase
      .from('user_feed_queue')
      .insert(queueItems);

    if (insertError) {
      console.error('❌ Error inserting queue items:', insertError);
      return c.json({ error: `Failed to insert queue items: ${insertError.message}` }, 500);
    }

    console.log(`✅ Successfully queued ${queueItems.length} items for patient ${patientId}`);

    return c.json({
      success: true,
      queued: queueItems.length,
      nextPosition: nextPosition,
      queueDepth: (currentQueueDepth || 0) + queueItems.length,
      items: queueItems.map(item => ({
        content_type: item.content_type,
        content_id: item.content_id,
        position: item.position,
        reason: item.reason
      }))
    });

  } catch (error: any) {
    console.error('❌ Feed generation error:', error);
    return c.json({ error: error.message || 'Failed to generate feed' }, 500);
  }
});

// ============================================================================
// ENDPOINT: POST /engagement
// Track engagement event
// ============================================================================

feed.post('/engagement', async (c) => {
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
    const {
      patientId,
      organizationId,
      contentType,
      contentId,
      action,
      durationSeconds,
      contextTags = [],
      metadata = {}
    } = body;

    // Validate required fields
    if (!patientId || !contentType || !contentId || !action) {
      return c.json({ 
        error: 'patientId, contentType, contentId, and action are required' 
      }, 400);
    }

    // Verify access
    const hasAccess = await canAccessPatient(user.id, patientId);
    if (!hasAccess) {
      return c.json({ error: 'Forbidden: Cannot access this patient' }, 403);
    }

    const supabase = getSupabaseClient();

    // Insert engagement event
    const { data: event, error: insertError } = await supabase
      .from('engagement_events')
      .insert({
        patient_id: patientId,
        organization_id: organizationId || null,
        content_type: contentType,
        content_id: contentId,
        action: action,
        duration_seconds: durationSeconds || null,
        context_tags: contextTags,
        metadata: metadata
      })
      .select()
      .single();

    if (insertError) {
      console.error('❌ Error inserting engagement event:', insertError);
      return c.json({ error: `Failed to track engagement: ${insertError.message}` }, 500);
    }

    console.log(`✅ Engagement tracked: ${patientId} ${action} ${contentType}:${contentId}`);

    // Update queue item if action is completed or skipped
    let updatedQueue = false;
    if (action === 'completed' || action === 'skipped') {
      const timestampField = action === 'completed' ? 'completed_at' : 'skipped_at';
      
      const { error: updateError } = await supabase
        .from('user_feed_queue')
        .update({ [timestampField]: new Date().toISOString() })
        .eq('patient_id', patientId)
        .eq('content_type', contentType)
        .eq('content_id', contentId)
        .is(timestampField, null);

      if (updateError) {
        console.error(`⚠️ Warning: Could not update queue item: ${updateError.message}`);
      } else {
        updatedQueue = true;
        console.log(`✅ Queue item marked as ${action}`);
      }
    }

    // Check if queue is low (< 5 items) and trigger background regeneration
    const { count: remainingItems } = await supabase
      .from('user_feed_queue')
      .select('*', { count: 'exact', head: true })
      .eq('patient_id', patientId)
      .is('completed_at', null)
      .is('skipped_at', null);

    let shouldRegenerate = false;
    if ((remainingItems || 0) < 5) {
      shouldRegenerate = true;
      console.log(`📊 Queue low (${remainingItems} items), should trigger regeneration`);
    }

    return c.json({
      success: true,
      eventId: event.id,
      updatedQueue: updatedQueue,
      shouldRegenerate: shouldRegenerate,
      remainingItems: remainingItems || 0
    });

  } catch (error: any) {
    console.error('❌ Engagement tracking error:', error);
    return c.json({ error: error.message || 'Failed to track engagement' }, 500);
  }
});

// ============================================================================
// ENDPOINT: GET /next
// Get next item in queue with hydrated content
// ============================================================================

feed.get('/next', async (c) => {
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

    const patientId = c.req.query('patientId');
    const organizationId = c.req.query('organizationId');

    if (!patientId) {
      return c.json({ error: 'patientId query param is required' }, 400);
    }

    // Verify access
    const hasAccess = await canAccessPatient(user.id, patientId);
    if (!hasAccess) {
      return c.json({ error: 'Forbidden: Cannot access this patient' }, 403);
    }

    const supabase = getSupabaseClient();

    // Get next item in queue
    const { data: queueItem, error: queueError } = await supabase
      .from('user_feed_queue')
      .select('*')
      .eq('patient_id', patientId)
      .is('completed_at', null)
      .is('skipped_at', null)
      .order('position', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (queueError) {
      console.error('❌ Error fetching next item:', queueError);
      return c.json({ error: 'Failed to fetch next item' }, 500);
    }

    if (!queueItem) {
      return c.json({
        item: null,
        message: 'Queue is empty',
        queueDepth: 0,
        completedToday: 0
      });
    }

    // Hydrate content based on content_type
    let content = null;
    const contentType = queueItem.content_type;
    const contentId = queueItem.content_id;

    if (contentType === 'navicue') {
      const { data: navicue } = await supabase
        .from('navicues')
        .select('*')
        .eq('id', contentId)
        .maybeSingle();
      
      content = navicue;
    } else if (contentType === 'block') {
      const { data: block } = await supabase
        .from('blocks')
        .select('*')
        .eq('id', contentId)
        .maybeSingle();
      
      content = block;
    } else if (contentType === 'practice') {
      const { data: practice } = await supabase
        .from('practices')
        .select('*')
        .eq('id', contentId)
        .maybeSingle();
      
      content = practice;
    } else if (contentType === 'article') {
      const { data: article } = await supabase
        .from('articles')
        .select('*')
        .eq('id', contentId)
        .maybeSingle();
      
      content = article;
    }

    // Get queue stats
    const { count: queueDepth } = await supabase
      .from('user_feed_queue')
      .select('*', { count: 'exact', head: true })
      .eq('patient_id', patientId)
      .is('completed_at', null)
      .is('skipped_at', null);

    // Get today's completed count
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const { count: completedToday } = await supabase
      .from('engagement_events')
      .select('*', { count: 'exact', head: true })
      .eq('patient_id', patientId)
      .eq('action', 'completed')
      .gte('created_at', todayStart.toISOString());

    // Mark as surfaced
    await supabase
      .from('user_feed_queue')
      .update({ surfaced_at: new Date().toISOString() })
      .eq('id', queueItem.id)
      .is('surfaced_at', null);

    return c.json({
      item: {
        id: queueItem.id,
        contentType: queueItem.content_type,
        contentId: queueItem.content_id,
        position: queueItem.position,
        reason: queueItem.reason,
        contextTags: queueItem.context_tags,
        metadata: queueItem.metadata,
        content: content
      },
      queueDepth: queueDepth || 0,
      completedToday: completedToday || 0
    });

  } catch (error: any) {
    console.error('❌ Get next item error:', error);
    return c.json({ error: error.message || 'Failed to get next item' }, 500);
  }
});

// ============================================================================
// ENDPOINT: GET /queue
// Get full queue for individual
// ============================================================================

feed.get('/queue', async (c) => {
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

    const patientId = c.req.query('patientId');
    const includeCompleted = c.req.query('includeCompleted') === 'true';

    if (!patientId) {
      return c.json({ error: 'patientId query param is required' }, 400);
    }

    // Verify access
    const hasAccess = await canAccessPatient(user.id, patientId);
    if (!hasAccess) {
      return c.json({ error: 'Forbidden: Cannot access this patient' }, 403);
    }

    const supabase = getSupabaseClient();

    // Build query
    let query = supabase
      .from('user_feed_queue')
      .select('*')
      .eq('patient_id', patientId);

    if (!includeCompleted) {
      query = query.is('completed_at', null).is('skipped_at', null);
    }

    const { data: queue, error: queueError } = await query
      .order('position', { ascending: true });

    if (queueError) {
      console.error('❌ Error fetching queue:', queueError);
      return c.json({ error: 'Failed to fetch queue' }, 500);
    }

    return c.json({
      success: true,
      queue: queue || [],
      total: queue?.length || 0
    });

  } catch (error: any) {
    console.error('❌ Get queue error:', error);
    return c.json({ error: error.message || 'Failed to get queue' }, 500);
  }
});

// ============================================================================
// ENDPOINT: DELETE /clear
// Clear queue for individual (for testing/debugging)
// ============================================================================

feed.delete('/clear', async (c) => {
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

    const patientId = c.req.query('patientId');

    if (!patientId) {
      return c.json({ error: 'patientId query param is required' }, 400);
    }

    // Verify access (only allow self-clear or admin)
    if (user.id !== patientId) {
      return c.json({ error: 'Forbidden: Can only clear your own queue' }, 403);
    }

    const supabase = getSupabaseClient();

    const { error: deleteError } = await supabase
      .from('user_feed_queue')
      .delete()
      .eq('patient_id', patientId);

    if (deleteError) {
      console.error('❌ Error clearing queue:', deleteError);
      return c.json({ error: 'Failed to clear queue' }, 500);
    }

    console.log(`✅ Queue cleared for patient ${patientId}`);

    return c.json({
      success: true,
      message: 'Queue cleared successfully'
    });

  } catch (error: any) {
    console.error('❌ Clear queue error:', error);
    return c.json({ error: error.message || 'Failed to clear queue' }, 500);
  }
});

export default feed;
