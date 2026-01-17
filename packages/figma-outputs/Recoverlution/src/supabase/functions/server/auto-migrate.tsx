/**
 * AUTO MIGRATE TOOLKIT CONTENT
 * Simple GET endpoint that migrates everything server-side
 * No frontend data needed - just hit the endpoint
 */

import { createClient } from 'jsr:@supabase/supabase-js@2';
import { Context } from 'npm:hono@4';

export async function handleAutoMigrate(c: Context) {
  try {
    console.log('🚀 Starting auto-migration...');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Sample content to migrate (just a few pieces for testing)
    const testArticles = [
      {
        id: 'sample-article-1',
        type: 'article',
        pillar: 'Purpose',
        concept: 'Identity',
        theme: 'Self Worth',
        mindblock_id: null,
        headline: 'Understanding Your True Self',
        subtitle: 'Discovering who you are beyond addiction',
        body: 'Recovery begins with understanding yourself...',
        clinical_note: 'Identity work is foundational to recovery',
        author: 'Dr. Sarah Johnson',
        read_time_minutes: 5,
        tags: ['identity', 'self-worth', 'purpose'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'sample-article-2',
        type: 'article',
        pillar: 'Connection',
        concept: 'Relationships',
        theme: 'Healthy Boundaries',
        mindblock_id: null,
        headline: 'Building Healthy Boundaries',
        subtitle: 'Protecting your recovery through clear limits',
        body: 'Boundaries are essential for recovery...',
        clinical_note: 'Boundary work prevents relapse',
        author: 'Dr. Michael Chen',
        read_time_minutes: 7,
        tags: ['boundaries', 'relationships', 'connection'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    const testPractices = [
      {
        id: 'sample-practice-1',
        type: 'practice',
        pillar: 'Present',
        concept: 'Mindfulness',
        theme: 'Awareness',
        mindblock_id: null,
        headline: 'Morning Mindfulness',
        subtitle: 'Start your day with presence',
        body: 'This 5-minute practice helps ground you...',
        how_to_steps: ['Find a quiet space', 'Sit comfortably', 'Focus on breath', 'Notice thoughts without judgment', 'Return to breath'],
        duration_minutes: 5,
        difficulty: 'Beginner',
        tags: ['mindfulness', 'morning', 'awareness'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    const testInsights = [
      {
        id: 'sample-insight-1',
        type: 'insight',
        pillar: 'Power',
        concept: 'Agency',
        theme: 'Choice',
        mindblock_id: null,
        headline: 'You Have More Power Than You Think',
        subtitle: 'Reclaiming agency in recovery',
        body: 'Every moment offers a choice...',
        clinical_foundation: 'Choice theory supports autonomy in recovery',
        key_takeaway: 'You are not powerless - you have agency',
        tags: ['power', 'choice', 'agency'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    // Migrate articles
    console.log(`Migrating ${testArticles.length} articles...`);
    const { data: articleData, error: articleError } = await supabase
      .from('toolkit_content')
      .upsert(testArticles, { onConflict: 'id' });

    if (articleError) {
      console.error('Article migration error:', articleError);
    } else {
      console.log(`✅ Articles migrated`);
    }

    // Migrate practices
    console.log(`Migrating ${testPractices.length} practices...`);
    const { data: practiceData, error: practiceError } = await supabase
      .from('toolkit_content')
      .upsert(testPractices, { onConflict: 'id' });

    if (practiceError) {
      console.error('Practice migration error:', practiceError);
    } else {
      console.log(`✅ Practices migrated`);
    }

    // Migrate insights
    console.log(`Migrating ${testInsights.length} insights...`);
    const { data: insightData, error: insightError } = await supabase
      .from('toolkit_content')
      .upsert(testInsights, { onConflict: 'id' });

    if (insightError) {
      console.error('Insight migration error:', insightError);
    } else {
      console.log(`✅ Insights migrated`);
    }

    return c.json({
      success: true,
      message: 'Auto-migration complete!',
      summary: {
        articles: testArticles.length,
        practices: testPractices.length,
        insights: testInsights.length,
        total: testArticles.length + testPractices.length + testInsights.length
      }
    });

  } catch (error: any) {
    console.error('Auto-migration error:', error);
    return c.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, 500);
  }
}
