/**
 * Alumni Message Board API
 * 
 * Endpoints for moderated community message board:
 * - Topics/channels management
 * - Post CRUD (create, read, update, delete)
 * - Reactions (like, support, celebrate)
 * - Comments
 * - Moderation (flag, review, approve)
 * - AI content suggestions
 * - Engagement prompts (platform-initiated)
 * - Analytics
 */

import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const alumni = new Hono();

// Apply CORS
alumni.use('*', cors());

// Create Supabase client
function getSupabaseClient() {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
}

// ============================================================================
// TOPICS
// ============================================================================

/**
 * GET /alumni/topics
 * List all active topics for a facility
 */
alumni.get('/topics', async (c) => {
  try {
    const supabase = getSupabaseClient();
    const facilityId = c.req.header('X-Facility-ID'); // Or get from auth token

    const { data: topics, error } = await supabase
      .from('alumni_topics')
      .select('*')
      .eq('is_active', true)
      .order('created_at');

    if (error) throw error;

    return c.json({ topics });

  } catch (error: any) {
    console.error('Error fetching alumni topics:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * POST /alumni/topics
 * Create a new topic (facility admin only)
 */
alumni.post('/topics', async (c) => {
  try {
    const supabase = getSupabaseClient();
    const body = await c.req.json();
    
    const { id, name, description, icon, color, facility_id } = body;

    const { data: topic, error } = await supabase
      .from('alumni_topics')
      .insert({
        id,
        name,
        description,
        icon,
        color,
        facility_id,
        is_active: true
      })
      .select()
      .single();

    if (error) throw error;

    return c.json({ topic }, 201);

  } catch (error: any) {
    console.error('Error creating alumni topic:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// POSTS
// ============================================================================

/**
 * GET /alumni/posts
 * List all posts (with filters)
 * Query params: topic_id, patient_id, limit, offset
 */
alumni.get('/posts', async (c) => {
  try {
    const supabase = getSupabaseClient();
    
    // Get query params
    const topicId = c.req.query('topic_id');
    const patientId = c.req.query('patient_id');
    const limit = parseInt(c.req.query('limit') || '50');
    const offset = parseInt(c.req.query('offset') || '0');
    const facilityId = c.req.header('X-Facility-ID');

    let query = supabase
      .from('alumni_posts')
      .select(`
        *,
        patient:patients(id, first_name, last_name),
        topic:alumni_topics(id, name, color, icon),
        reactions:alumni_reactions(count),
        comments:alumni_comments(count)
      `)
      .is('deleted_at', null)
      .eq('is_approved', true)
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (facilityId) {
      query = query.eq('facility_id', facilityId);
    }
    if (topicId) {
      query = query.eq('topic_id', topicId);
    }
    if (patientId) {
      query = query.eq('patient_id', patientId);
    }

    const { data: posts, error } = await query;

    if (error) throw error;

    return c.json({ posts, count: posts?.length || 0 });

  } catch (error: any) {
    console.error('Error fetching alumni posts:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * GET /alumni/posts/:id
 * Get a single post with all details
 */
alumni.get('/posts/:id', async (c) => {
  try {
    const supabase = getSupabaseClient();
    const postId = c.req.param('id');

    const { data: post, error } = await supabase
      .from('alumni_posts')
      .select(`
        *,
        patient:patients(id, first_name, last_name),
        topic:alumni_topics(id, name, color, icon),
        reactions:alumni_reactions(id, patient_id, reaction_type, created_at),
        comments:alumni_comments(
          id,
          content,
          created_at,
          patient:patients(id, first_name, last_name)
        )
      `)
      .eq('id', postId)
      .single();

    if (error) throw error;

    // Increment view count
    await supabase
      .from('alumni_posts')
      .update({ view_count: (post.view_count || 0) + 1 })
      .eq('id', postId);

    return c.json({ post });

  } catch (error: any) {
    console.error('Error fetching alumni post:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * POST /alumni/posts
 * Create a new post
 */
alumni.post('/posts', async (c) => {
  try {
    const supabase = getSupabaseClient();
    const body = await c.req.json();
    
    const {
      facility_id,
      patient_id,
      topic_id,
      content,
      image_url,
      hashtags,
      post_type = 'discussion'
    } = body;

    // Check facility moderation settings
    const { data: topic } = await supabase
      .from('alumni_topics')
      .select('requires_moderation')
      .eq('id', topic_id)
      .single();

    const isApproved = topic?.requires_moderation ? false : true;

    // Analyze content for AI suggestions
    const aiSuggestions = await generateContentSuggestions(content, hashtags);

    const { data: post, error } = await supabase
      .from('alumni_posts')
      .insert({
        facility_id,
        patient_id,
        topic_id,
        content,
        image_url,
        hashtags: hashtags || [],
        post_type,
        is_approved: isApproved,
        ai_suggestions: aiSuggestions
      })
      .select()
      .single();

    if (error) throw error;

    return c.json({ post, requires_approval: !isApproved }, 201);

  } catch (error: any) {
    console.error('Error creating alumni post:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * PUT /alumni/posts/:id
 * Update a post (author only, or facility staff for moderation)
 */
alumni.put('/posts/:id', async (c) => {
  try {
    const supabase = getSupabaseClient();
    const postId = c.req.param('id');
    const body = await c.req.json();
    
    const updates: any = {};
    
    // Content updates (author only)
    if (body.content !== undefined) updates.content = body.content;
    if (body.image_url !== undefined) updates.image_url = body.image_url;
    if (body.hashtags !== undefined) updates.hashtags = body.hashtags;
    
    // Moderation updates (facility staff only)
    if (body.is_pinned !== undefined) updates.is_pinned = body.is_pinned;
    if (body.is_approved !== undefined) updates.is_approved = body.is_approved;
    if (body.is_flagged !== undefined) updates.is_flagged = body.is_flagged;
    if (body.flagged_reason !== undefined) updates.flagged_reason = body.flagged_reason;

    const { data: post, error } = await supabase
      .from('alumni_posts')
      .update(updates)
      .eq('id', postId)
      .select()
      .single();

    if (error) throw error;

    return c.json({ post });

  } catch (error: any) {
    console.error('Error updating alumni post:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * DELETE /alumni/posts/:id
 * Soft delete a post
 */
alumni.delete('/posts/:id', async (c) => {
  try {
    const supabase = getSupabaseClient();
    const postId = c.req.param('id');

    const { error } = await supabase
      .from('alumni_posts')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', postId);

    if (error) throw error;

    return c.json({ success: true });

  } catch (error: any) {
    console.error('Error deleting alumni post:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// REACTIONS
// ============================================================================

/**
 * POST /alumni/posts/:id/react
 * Add or remove a reaction (toggle)
 */
alumni.post('/posts/:id/react', async (c) => {
  try {
    const supabase = getSupabaseClient();
    const postId = c.req.param('id');
    const body = await c.req.json();
    
    const { patient_id, reaction_type = 'like' } = body;

    // Check if reaction already exists
    const { data: existing } = await supabase
      .from('alumni_reactions')
      .select('id')
      .eq('post_id', postId)
      .eq('patient_id', patient_id)
      .single();

    if (existing) {
      // Remove reaction (unlike)
      const { error } = await supabase
        .from('alumni_reactions')
        .delete()
        .eq('id', existing.id);

      if (error) throw error;

      return c.json({ reacted: false });
    } else {
      // Add reaction
      const { data: reaction, error } = await supabase
        .from('alumni_reactions')
        .insert({
          post_id: postId,
          patient_id,
          reaction_type
        })
        .select()
        .single();

      if (error) throw error;

      return c.json({ reacted: true, reaction });
    }

  } catch (error: any) {
    console.error('Error toggling reaction:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// COMMENTS
// ============================================================================

/**
 * GET /alumni/posts/:id/comments
 * Get all comments for a post
 */
alumni.get('/posts/:id/comments', async (c) => {
  try {
    const supabase = getSupabaseClient();
    const postId = c.req.param('id');

    const { data: comments, error } = await supabase
      .from('alumni_comments')
      .select(`
        *,
        patient:patients(id, first_name, last_name)
      `)
      .eq('post_id', postId)
      .is('deleted_at', null)
      .order('created_at');

    if (error) throw error;

    return c.json({ comments });

  } catch (error: any) {
    console.error('Error fetching comments:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * POST /alumni/posts/:id/comments
 * Add a comment to a post
 */
alumni.post('/posts/:id/comments', async (c) => {
  try {
    const supabase = getSupabaseClient();
    const postId = c.req.param('id');
    const body = await c.req.json();
    
    const { patient_id, content } = body;

    const { data: comment, error } = await supabase
      .from('alumni_comments')
      .insert({
        post_id: postId,
        patient_id,
        content
      })
      .select(`
        *,
        patient:patients(id, first_name, last_name)
      `)
      .single();

    if (error) throw error;

    return c.json({ comment }, 201);

  } catch (error: any) {
    console.error('Error creating comment:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// MODERATION
// ============================================================================

/**
 * POST /alumni/posts/:id/flag
 * Flag a post for review
 */
alumni.post('/posts/:id/flag', async (c) => {
  try {
    const supabase = getSupabaseClient();
    const postId = c.req.param('id');
    const body = await c.req.json();
    
    const { patient_id, reason } = body;

    const { data: post, error } = await supabase
      .from('alumni_posts')
      .update({
        is_flagged: true,
        flagged_reason: reason,
        flagged_by: patient_id,
        flagged_at: new Date().toISOString()
      })
      .eq('id', postId)
      .select()
      .single();

    if (error) throw error;

    // TODO: Notify facility staff

    return c.json({ post });

  } catch (error: any) {
    console.error('Error flagging post:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * GET /alumni/moderation/flagged
 * Get all flagged posts for facility staff review
 */
alumni.get('/moderation/flagged', async (c) => {
  try {
    const supabase = getSupabaseClient();
    const facilityId = c.req.header('X-Facility-ID');

    const { data: posts, error } = await supabase
      .from('alumni_posts')
      .select(`
        *,
        patient:patients(id, first_name, last_name, email),
        topic:alumni_topics(name),
        flagged_by_patient:patients!alumni_posts_flagged_by_fkey(id, first_name, last_name)
      `)
      .eq('facility_id', facilityId)
      .eq('is_flagged', true)
      .is('reviewed_at', null)
      .order('flagged_at', { ascending: false });

    if (error) throw error;

    return c.json({ posts, count: posts?.length || 0 });

  } catch (error: any) {
    console.error('Error fetching flagged posts:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * POST /alumni/moderation/review/:id
 * Review and resolve a flagged post
 */
alumni.post('/moderation/review/:id', async (c) => {
  try {
    const supabase = getSupabaseClient();
    const postId = c.req.param('id');
    const body = await c.req.json();
    
    const { reviewed_by, action } = body; // action: approve, delete, edit

    const updates: any = {
      reviewed_by,
      reviewed_at: new Date().toISOString()
    };

    if (action === 'approve') {
      updates.is_flagged = false;
      updates.is_approved = true;
    } else if (action === 'delete') {
      updates.deleted_at = new Date().toISOString();
    }

    const { data: post, error } = await supabase
      .from('alumni_posts')
      .update(updates)
      .eq('id', postId)
      .select()
      .single();

    if (error) throw error;

    return c.json({ post });

  } catch (error: any) {
    console.error('Error reviewing post:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// ANALYTICS
// ============================================================================

/**
 * GET /alumni/analytics
 * Get board analytics for a facility
 */
alumni.get('/analytics', async (c) => {
  try {
    const supabase = getSupabaseClient();
    const facilityId = c.req.header('X-Facility-ID');
    const days = parseInt(c.req.query('days') || '30');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data: analytics, error } = await supabase
      .from('alumni_board_analytics')
      .select('*')
      .eq('facility_id', facilityId)
      .gte('date', startDate.toISOString().split('T')[0])
      .order('date', { ascending: false });

    if (error) throw error;

    // Calculate totals
    const totals = analytics?.reduce((acc, day) => ({
      total_posts: acc.total_posts + (day.total_posts || 0),
      total_reactions: acc.total_reactions + (day.total_reactions || 0),
      total_comments: acc.total_comments + (day.total_comments || 0),
      unique_posters: Math.max(acc.unique_posters, day.active_posters || 0)
    }), { total_posts: 0, total_reactions: 0, total_comments: 0, unique_posters: 0 });

    return c.json({ analytics, totals });

  } catch (error: any) {
    console.error('Error fetching alumni analytics:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// ENGAGEMENT PROMPTS
// ============================================================================

/**
 * POST /alumni/prompts/generate
 * Generate and post an engagement prompt
 */
alumni.post('/prompts/generate', async (c) => {
  try {
    const supabase = getSupabaseClient();
    const body = await c.req.json();
    
    const { facility_id, prompt_type, topic_id } = body;

    // Generate prompt content based on type
    const promptContent = await generateEngagementPrompt(prompt_type);

    // Create the prompt record
    const { data: prompt, error: promptError } = await supabase
      .from('alumni_engagement_prompts')
      .insert({
        facility_id,
        prompt_type,
        title: promptContent.title,
        content: promptContent.content,
        topic_id,
        trigger_condition: 'manual',
        status: 'pending'
      })
      .select()
      .single();

    if (promptError) throw promptError;

    // Create the actual post
    const { data: post, error: postError } = await supabase
      .from('alumni_posts')
      .insert({
        facility_id,
        patient_id: null, // Platform post
        topic_id,
        content: promptContent.content,
        post_type: prompt_type,
        is_pinned: true,
        is_approved: true
      })
      .select()
      .single();

    if (postError) throw postError;

    // Update prompt with post ID
    await supabase
      .from('alumni_engagement_prompts')
      .update({
        post_id: post.id,
        posted_at: new Date().toISOString(),
        status: 'posted'
      })
      .eq('id', prompt.id);

    return c.json({ prompt, post }, 201);

  } catch (error: any) {
    console.error('Error generating engagement prompt:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// AI HELPERS
// ============================================================================

/**
 * Analyze post content and generate relevant content suggestions
 */
async function generateContentSuggestions(content: string, hashtags: string[] = []) {
  const suggestions: any[] = [];
  const lowerContent = content.toLowerCase();
  const allTags = [...hashtags, ...content.match(/#\w+/g) || []].map(t => t.toLowerCase());

  // Keyword matching for content suggestions
  const contentMap: Record<string, any> = {
    'trigger|craving|urge|want to use': {
      type: 'navicue',
      title: 'Urge Surfing: Ride the Wave',
      reason: 'This NaviCue helps you manage cravings without acting on them'
    },
    'boundary|boundaries|saying no|old friend': {
      type: 'navicue',
      title: 'Setting Boundaries Without Guilt',
      reason: 'This addresses saying no to relationships that threaten your recovery'
    },
    'shame|guilt|failure|not good enough': {
      type: 'navicue',
      title: 'Shame Resilience',
      reason: 'Understanding shame vs guilt can help break negative self-talk patterns'
    },
    'anxious|anxiety|panic|overwhelmed|stressed': {
      type: 'article',
      title: 'Window of Tolerance',
      reason: 'Recognizing when you\'re outside your window can help you self-regulate'
    },
    'family|parents|relationship|trust': {
      type: 'navicue',
      title: 'Rebuilding Trust',
      reason: 'This content focuses on healing damaged relationships in recovery'
    }
  };

  // Check each pattern
  for (const [pattern, suggestion] of Object.entries(contentMap)) {
    const regex = new RegExp(pattern, 'i');
    if (regex.test(lowerContent) || allTags.some(tag => regex.test(tag))) {
      suggestions.push(suggestion);
    }
  }

  return suggestions.slice(0, 3); // Max 3 suggestions
}

/**
 * Generate engagement prompt content
 */
async function generateEngagementPrompt(promptType: string) {
  const prompts: Record<string, any> = {
    'poll': {
      title: 'Weekend Check-In',
      content: 'Weekend Poll: What\'s one thing you\'re looking forward to this weekend that doesn\'t involve substances? Drop your answer below 👇'
    },
    'quote': {
      title: 'Daily Reflection',
      content: '"Recovery is not a straight line. It\'s a spiral. You keep passing the same spots, but you\'re higher up each time." - Unknown\n\nWhat does this quote mean to you?'
    },
    'reflection': {
      title: 'Monthly Milestone',
      content: 'Looking back on this month: What\'s one small win you\'re proud of? It doesn\'t have to be huge - tiny victories count.'
    },
    'challenge': {
      title: 'Practice Challenge',
      content: 'This week\'s challenge: Try the 5-4-3-2-1 grounding technique when you feel triggered. 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste. Come back and share how it went!'
    },
    'question': {
      title: 'Community Question',
      content: 'What\'s one boundary you\'ve set recently that you\'re proud of? How did it feel?'
    }
  };

  return prompts[promptType] || prompts['question'];
}

export default alumni;
