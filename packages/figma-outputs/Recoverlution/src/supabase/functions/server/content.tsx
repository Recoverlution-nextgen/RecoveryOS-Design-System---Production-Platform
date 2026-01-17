/**
 * Content Management Routes
 * 
 * Serves therapeutic content: NaviCues, Building Blocks, Journeys, Articles, Videos
 */

import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const content = new Hono();

// Enable CORS
content.use('*', cors());

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
// NAVICUES
// ============================================================================

// List all published NaviCues
content.get('/navicues', async (c) => {
  try {
    const supabase = getSupabaseClient();
    
    // Query parameters for filtering
    const pillar = c.req.query('pillar');
    const scenarioType = c.req.query('scenario_type');
    const contentType = c.req.query('content_type');
    
    let query = supabase
      .from('navicues')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    
    // Apply filters if provided
    if (pillar) {
      query = query.eq('pillar', pillar);
    }
    
    if (scenarioType) {
      query = query.eq('scenario_type', scenarioType);
    }
    
    if (contentType) {
      query = query.eq('content_type', contentType);
    }
    
    const { data: navicues, error } = await query;
    
    if (error) {
      console.error('Error fetching NaviCues:', error);
      return c.json({ error: 'Failed to fetch NaviCues', details: error.message }, 500);
    }
    
    return c.json({ 
      success: true, 
      navicues,
      count: navicues.length 
    });
    
  } catch (error: any) {
    console.error('List NaviCues error:', error);
    return c.json({ error: error.message || 'Failed to list NaviCues' }, 500);
  }
});

// Get single NaviCue by ID
content.get('/navicues/:id', async (c) => {
  try {
    const navicueId = c.req.param('id');
    const supabase = getSupabaseClient();
    
    const { data: navicue, error } = await supabase
      .from('navicues')
      .select('*')
      .eq('id', navicueId)
      .eq('status', 'published')
      .single();
    
    if (error) {
      console.error('Error fetching NaviCue:', error);
      return c.json({ error: 'NaviCue not found' }, 404);
    }
    
    return c.json({ success: true, navicue });
    
  } catch (error: any) {
    console.error('Get NaviCue error:', error);
    return c.json({ error: error.message || 'Failed to get NaviCue' }, 500);
  }
});

// Create NaviCue (admin only)
content.post('/navicues', async (c) => {
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
      title,
      subtitle,
      pillar,
      micro_blocks,
      content_type,
      scenario_type,
      duration_seconds,
      content,
      status = 'draft'
    } = body;

    // Validate required fields
    if (!title || !pillar || !content_type || !content) {
      return c.json({ error: 'title, pillar, content_type, and content are required' }, 400);
    }

    const supabase = getSupabaseClient();

    // Create NaviCue
    const { data: navicue, error } = await supabase
      .from('navicues')
      .insert({
        title,
        subtitle: subtitle || null,
        pillar,
        micro_blocks: micro_blocks || [],
        content_type,
        scenario_type: scenario_type || null,
        duration_seconds: duration_seconds || 0,
        content,
        status,
        created_by: user.id
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating NaviCue:', error);
      return c.json({ error: 'Failed to create NaviCue', details: error.message }, 500);
    }

    console.log('✅ NaviCue created:', navicue.id);

    return c.json({ success: true, navicue });

  } catch (error: any) {
    console.error('Create NaviCue error:', error);
    return c.json({ error: error.message || 'Failed to create NaviCue' }, 500);
  }
});

// ============================================================================
// BUILDING BLOCKS
// ============================================================================

// List all published Building Blocks
content.get('/building-blocks', async (c) => {
  try {
    const supabase = getSupabaseClient();
    
    // Query parameters
    const pillar = c.req.query('pillar');
    const category = c.req.query('category');
    
    let query = supabase
      .from('building_blocks')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    
    if (pillar) {
      query = query.eq('pillar', pillar);
    }
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data: buildingBlocks, error } = await query;
    
    if (error) {
      console.error('Error fetching Building Blocks:', error);
      return c.json({ error: 'Failed to fetch Building Blocks', details: error.message }, 500);
    }
    
    return c.json({ 
      success: true, 
      buildingBlocks,
      count: buildingBlocks.length 
    });
    
  } catch (error: any) {
    console.error('List Building Blocks error:', error);
    return c.json({ error: error.message || 'Failed to list Building Blocks' }, 500);
  }
});

// Get single Building Block by ID
content.get('/building-blocks/:id', async (c) => {
  try {
    const blockId = c.req.param('id');
    const supabase = getSupabaseClient();
    
    const { data: buildingBlock, error } = await supabase
      .from('building_blocks')
      .select('*')
      .eq('id', blockId)
      .eq('status', 'published')
      .single();
    
    if (error) {
      console.error('Error fetching Building Block:', error);
      return c.json({ error: 'Building Block not found' }, 404);
    }
    
    return c.json({ success: true, buildingBlock });
    
  } catch (error: any) {
    console.error('Get Building Block error:', error);
    return c.json({ error: error.message || 'Failed to get Building Block' }, 500);
  }
});

// ============================================================================
// JOURNEY WEEKS
// ============================================================================

// List all journey weeks
content.get('/journeys', async (c) => {
  try {
    const supabase = getSupabaseClient();
    
    const { data: weeks, error } = await supabase
      .from('journey_weeks')
      .select('*')
      .order('week_number', { ascending: true });
    
    if (error) {
      console.error('Error fetching journey weeks:', error);
      return c.json({ error: 'Failed to fetch journey weeks', details: error.message }, 500);
    }
    
    return c.json({ 
      success: true, 
      weeks,
      count: weeks.length 
    });
    
  } catch (error: any) {
    console.error('List journey weeks error:', error);
    return c.json({ error: error.message || 'Failed to list journey weeks' }, 500);
  }
});

// Get specific journey week
content.get('/journeys/:weekNumber', async (c) => {
  try {
    const weekNumber = parseInt(c.req.param('weekNumber'));
    const supabase = getSupabaseClient();
    
    const { data: week, error } = await supabase
      .from('journey_weeks')
      .select('*')
      .eq('week_number', weekNumber)
      .single();
    
    if (error) {
      console.error('Error fetching journey week:', error);
      return c.json({ error: 'Journey week not found' }, 404);
    }
    
    return c.json({ success: true, week });
    
  } catch (error: any) {
    console.error('Get journey week error:', error);
    return c.json({ error: error.message || 'Failed to get journey week' }, 500);
  }
});

// ============================================================================
// ARTICLES
// ============================================================================

// List all published articles
content.get('/articles', async (c) => {
  try {
    const supabase = getSupabaseClient();
    
    const pillar = c.req.query('pillar');
    
    let query = supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    
    if (pillar) {
      query = query.eq('pillar', pillar);
    }
    
    const { data: articles, error } = await query;
    
    if (error) {
      console.error('Error fetching articles:', error);
      return c.json({ error: 'Failed to fetch articles', details: error.message }, 500);
    }
    
    return c.json({ 
      success: true, 
      articles,
      count: articles.length 
    });
    
  } catch (error: any) {
    console.error('List articles error:', error);
    return c.json({ error: error.message || 'Failed to list articles' }, 500);
  }
});

// Get single article by ID
content.get('/articles/:id', async (c) => {
  try {
    const articleId = c.req.param('id');
    const supabase = getSupabaseClient();
    
    const { data: article, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', articleId)
      .eq('status', 'published')
      .single();
    
    if (error) {
      console.error('Error fetching article:', error);
      return c.json({ error: 'Article not found' }, 404);
    }
    
    return c.json({ success: true, article });
    
  } catch (error: any) {
    console.error('Get article error:', error);
    return c.json({ error: error.message || 'Failed to get article' }, 500);
  }
});

// ============================================================================
// VIDEOS
// ============================================================================

// List all published videos
content.get('/videos', async (c) => {
  try {
    const supabase = getSupabaseClient();
    
    const pillar = c.req.query('pillar');
    const category = c.req.query('category');
    
    let query = supabase
      .from('videos')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    
    if (pillar) {
      query = query.eq('pillar', pillar);
    }
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data: videos, error } = await query;
    
    if (error) {
      console.error('Error fetching videos:', error);
      return c.json({ error: 'Failed to fetch videos', details: error.message }, 500);
    }
    
    return c.json({ 
      success: true, 
      videos,
      count: videos.length 
    });
    
  } catch (error: any) {
    console.error('List videos error:', error);
    return c.json({ error: error.message || 'Failed to list videos' }, 500);
  }
});

// ============================================================================
// SEARCH CONTENT (across all types)
// ============================================================================

content.get('/search', async (c) => {
  try {
    const query = c.req.query('q');
    const pillar = c.req.query('pillar');
    
    if (!query) {
      return c.json({ error: 'Query parameter "q" is required' }, 400);
    }
    
    const supabase = getSupabaseClient();
    
    // Search across NaviCues, Building Blocks, Articles
    // Note: In production, you'd want full-text search or Elasticsearch
    // For MVP, we'll do simple ILIKE searches
    
    const searchTerm = `%${query}%`;
    
    // Search NaviCues
    let navicueQuery = supabase
      .from('navicues')
      .select('*')
      .eq('status', 'published')
      .or(`title.ilike.${searchTerm},subtitle.ilike.${searchTerm}`);
    
    if (pillar) {
      navicueQuery = navicueQuery.eq('pillar', pillar);
    }
    
    const { data: navicues } = await navicueQuery;
    
    // Search Building Blocks
    let blockQuery = supabase
      .from('building_blocks')
      .select('*')
      .eq('status', 'published')
      .ilike('title', searchTerm);
    
    if (pillar) {
      blockQuery = blockQuery.eq('pillar', pillar);
    }
    
    const { data: buildingBlocks } = await blockQuery;
    
    // Search Articles
    let articleQuery = supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .or(`title.ilike.${searchTerm},subtitle.ilike.${searchTerm}`);
    
    if (pillar) {
      articleQuery = articleQuery.eq('pillar', pillar);
    }
    
    const { data: articles } = await articleQuery;
    
    return c.json({
      success: true,
      results: {
        navicues: navicues || [],
        buildingBlocks: buildingBlocks || [],
        articles: articles || [],
      },
      totalCount: (navicues?.length || 0) + (buildingBlocks?.length || 0) + (articles?.length || 0)
    });
    
  } catch (error: any) {
    console.error('Search content error:', error);
    return c.json({ error: error.message || 'Failed to search content' }, 500);
  }
});

// ============================================================================
// CONTENT RECOMMENDATIONS (for patient)
// ============================================================================

content.get('/recommendations/:patientId', async (c) => {
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

    const patientId = c.req.param('patientId');
    const supabase = getSupabaseClient();
    
    // TODO: Implement recommendation algorithm
    // For MVP, return most recent NaviCues
    // In production, this would use:
    // - Patient's micro-block states (red/orange blocks need content)
    // - Patient's current week in journey
    // - Patient's engagement history
    // - LUMA's recommendations
    
    const { data: navicues, error } = await supabase
      .from('navicues')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (error) {
      console.error('Error fetching recommendations:', error);
      return c.json({ error: 'Failed to fetch recommendations' }, 500);
    }
    
    return c.json({
      success: true,
      recommendations: navicues,
      algorithm: 'most_recent' // TODO: Replace with intelligent algorithm
    });
    
  } catch (error: any) {
    console.error('Get recommendations error:', error);
    return c.json({ error: error.message || 'Failed to get recommendations' }, 500);
  }
});

export default content;
