/**
 * TOOLKIT MIGRATION TRIGGER
 * 
 * One-click migration endpoint that:
 * 1. Fetches ALL 100 pieces of content from the app
 * 2. Calls the migration endpoint
 * 3. Returns detailed results
 * 
 * GET /make-server-49b28b8a/migrate-toolkit-trigger
 * POST /make-server-49b28b8a/migrate-toolkit-trigger (with optional { dryRun: true })
 */

import { Hono } from 'npm:hono';
import { handleMigrateContent } from './migrate-content.tsx';

const app = new Hono();

// Sample data for when frontend data isn't available
// This will be replaced by actual data passed from frontend
const SAMPLE_ARTICLES = [
  {
    id: "ER-ART-01",
    pillarId: "ER",
    title: "Understanding Your Emotional Landscape",
    subtitle: "Why feelings matter and how to navigate them",
    summary: "Learn how to recognize, name, and work with your emotions instead of being overwhelmed by them.",
    readTime: 12,
    difficulty: "Beginner",
    sections: [
      {
        heading: "The Nature of Emotions",
        content: "Emotions are not the enemy. They are messengers carrying important information about our needs, boundaries, and experiences."
      }
    ],
    blocks: ["ER-01-FOUNDATION"],
    keywords: {
      primary: ["emotions", "feelings", "awareness"],
      secondary: ["regulation", "understanding"],
      tertiary: []
    }
  }
];

/**
 * POST - Trigger migration with data from request
 */
app.post('/', async (c) => {
  const body = await c.req.json();
  
  const { articles, practices, insights, dryRun = false } = body;
  
  // Validate data
  if (!articles || !Array.isArray(articles)) {
    return c.json({ 
      success: false, 
      error: 'Missing articles array in request body' 
    }, 400);
  }
  
  if (!practices || !Array.isArray(practices)) {
    return c.json({ 
      success: false, 
      error: 'Missing practices array in request body' 
    }, 400);
  }
  
  if (!insights || !Array.isArray(insights)) {
    return c.json({ 
      success: false, 
      error: 'Missing insights array in request body' 
    }, 400);
  }
  
  console.log('\n🚀 TOOLKIT MIGRATION TRIGGERED');
  console.log(`📊 Content Summary:`);
  console.log(`   Articles:  ${articles.length}`);
  console.log(`   Practices: ${practices.length}`);
  console.log(`   Insights:  ${insights.length}`);
  console.log(`   TOTAL:     ${articles.length + practices.length + insights.length}`);
  console.log(`   Mode:      ${dryRun ? 'DRY RUN (no changes)' : 'LIVE MIGRATION'}\n`);
  
  // Call the existing migration handler
  return handleMigrateContent(c);
});

/**
 * GET - Status check and instructions
 */
app.get('/', (c) => {
  return c.json({
    status: 'ready',
    endpoint: '/make-server-49b28b8a/migrate-toolkit-trigger',
    instructions: {
      method: 'POST',
      body: {
        articles: 'Array of article objects',
        practices: 'Array of practice objects',
        insights: 'Array of insight objects',
        dryRun: 'boolean (optional, default: false)'
      },
      example: 'See /components/pages/ToolkitMigrationPage.tsx for usage'
    },
    expectedContent: {
      articles: 30,
      practices: 40,
      insights: 30,
      total: 100
    }
  });
});

export default app;
