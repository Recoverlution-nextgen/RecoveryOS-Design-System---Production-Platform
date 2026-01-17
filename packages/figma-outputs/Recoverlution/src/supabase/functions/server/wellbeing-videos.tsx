/**
 * WELLBEING VIDEOS ENDPOINT
 * Video library management
 */

import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const app = new Hono();

// POST /wellbeing/upload - Upload video
app.post('/upload', async (c) => {
  try {
    const { title, instructor, duration, file_path } = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('wellbeing_mindblocks')
      .insert({
        title,
        instructor,
        duration_seconds: duration,
        video_url: file_path,
        status: 'draft',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating video record:', error);
      return c.json({ error: 'Failed to upload video' }, 500);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error in POST /wellbeing/upload:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /wellbeing/videos - List all videos
app.get('/videos', async (c) => {
  try {
    const status = c.req.query('status');
    const purpose = c.req.query('purpose');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    let query = supabase
      .from('wellbeing_mindblocks')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    if (purpose) {
      query = query.eq('primary_purpose', purpose);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching videos:', error);
      return c.json({ error: 'Failed to fetch videos' }, 500);
    }

    return c.json(data || []);
  } catch (error) {
    console.error('Error in GET /wellbeing/videos:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /wellbeing/videos/:id - Get video details
app.get('/videos/:id', async (c) => {
  try {
    const videoId = c.req.param('id');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('wellbeing_mindblocks')
      .select('*, chapters(*), practices(*)')
      .eq('id', videoId)
      .single();

    if (error || !data) {
      return c.json({ error: 'Video not found' }, 404);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error in GET /wellbeing/videos/:id:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// PUT /wellbeing/videos/:id - Update metadata
app.put('/videos/:id', async (c) => {
  try {
    const videoId = c.req.param('id');
    const updates = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('wellbeing_mindblocks')
      .update(updates)
      .eq('id', videoId)
      .select()
      .single();

    if (error) {
      console.error('Error updating video:', error);
      return c.json({ error: 'Failed to update video' }, 500);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error in PUT /wellbeing/videos/:id:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /wellbeing/videos/:id/chapters - Add chapters
app.post('/videos/:id/chapters', async (c) => {
  try {
    const videoId = c.req.param('id');
    const { chapters } = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const chaptersToInsert = chapters.map((ch: any) => ({
      video_id: videoId,
      title: ch.title,
      timestamp: ch.timestamp,
      chapter_type: ch.chapter_type || 'teaching',
    }));

    const { data, error } = await supabase
      .from('video_chapters')
      .insert(chaptersToInsert)
      .select();

    if (error) {
      console.error('Error adding chapters:', error);
      return c.json({ error: 'Failed to add chapters' }, 500);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error in POST /wellbeing/videos/:id/chapters:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /wellbeing/videos/:id/practices - Link practices
app.post('/videos/:id/practices', async (c) => {
  try {
    const videoId = c.req.param('id');
    const { practice_id, injection_point } = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('video_practice_links')
      .insert({
        video_id: videoId,
        practice_id,
        injection_point: injection_point || 'end',
      })
      .select()
      .single();

    if (error) {
      console.error('Error linking practice:', error);
      return c.json({ error: 'Failed to link practice' }, 500);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error in POST /wellbeing/videos/:id/practices:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /wellbeing/videos/:id/publish - Publish video
app.post('/videos/:id/publish', async (c) => {
  try {
    const videoId = c.req.param('id');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('wellbeing_mindblocks')
      .update({
        status: 'published',
        published_at: new Date().toISOString(),
      })
      .eq('id', videoId)
      .select()
      .single();

    if (error) {
      console.error('Error publishing video:', error);
      return c.json({ error: 'Failed to publish video' }, 500);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error in POST /wellbeing/videos/:id/publish:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /wellbeing/jw-sync - Trigger JW Player sync
app.post('/jw-sync', async (c) => {
  try {
    const { mode = 'full' } = await c.req.json().catch(() => ({}));
    
    const projectId = Deno.env.get('SUPABASE_URL')!.split('//')[1].split('.')[0];
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // Call the jw_sync_media edge function
    const syncUrl = `https://${projectId}.supabase.co/functions/v1/jw_sync_media?mode=${mode}&page_length=500`;
    const syncResponse = await fetch(syncUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!syncResponse.ok) {
      const errorText = await syncResponse.text();
      console.error('JW sync failed:', errorText);
      return c.json({ error: 'Sync failed', details: errorText }, 500);
    }

    const syncResult = await syncResponse.json();

    // Enqueue classification jobs for videos without enrichment
    const enqueueUrl = `https://${projectId}.supabase.co/functions/v1/jw_sync_media/enqueue_missing?limit=250`;
    const enqueueResponse = await fetch(enqueueUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
      },
    });

    const enqueueResult = enqueueResponse.ok ? await enqueueResponse.json() : { enqueued: 0 };

    // Trigger first classification batch
    const workerUrl = `https://${projectId}.supabase.co/functions/v1/media_worker?type=classify&limit=50`;
    const workerResponse = await fetch(workerUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
      },
    });

    const workerResult = workerResponse.ok ? await workerResponse.json() : { processed: 0 };

    return c.json({
      success: true,
      sync: syncResult,
      enqueued: enqueueResult.enqueued || 0,
      classified: workerResult.processed || 0,
    });
  } catch (error) {
    console.error('Error in POST /wellbeing/jw-sync:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /wellbeing/jw-sync/status - Check sync status
app.get('/jw-sync/status', async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Get video counts
    const { count: totalVideos } = await supabase
      .from('videos')
      .select('*', { count: 'exact', head: true });

    const { count: enrichedVideos } = await supabase
      .from('videos_enrichment')
      .select('*', { count: 'exact', head: true });

    // Get job counts
    const { data: jobCounts } = await supabase
      .from('media_jobs')
      .select('status, job_type');

    const jobStats = (jobCounts || []).reduce((acc: any, job: any) => {
      const key = `${job.job_type}_${job.status}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    // Get last sync time
    const { data: syncState } = await supabase
      .from('sync_state')
      .select('value')
      .eq('key', 'jw.last_updated_at')
      .single();

    return c.json({
      videos: {
        total: totalVideos || 0,
        enriched: enrichedVideos || 0,
        percentage: totalVideos ? Math.round((enrichedVideos || 0) / totalVideos * 100) : 0,
      },
      jobs: jobStats,
      lastSync: syncState?.value?.ts || null,
    });
  } catch (error) {
    console.error('Error in GET /wellbeing/jw-sync/status:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;