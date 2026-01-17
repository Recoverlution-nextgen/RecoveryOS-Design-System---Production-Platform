/**
 * TOOLKIT CONTENT MIGRATION HELPER
 * Frontend utility to trigger content migration to Supabase
 * 
 * Usage:
 * import { migrateAllContent } from './utils/migrate-toolkit-helper';
 * await migrateAllContent();
 */

import { projectId, publicAnonKey } from './supabase/info';

// Import all content
import { allArticles, allPractices, allInsights } from './contentLibraryMaster';

const MIGRATION_ENDPOINT = `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/migrate-content`;

export async function migrateAllContent(dryRun = false) {
  console.log('🚀 Starting Toolkit Content Migration...\n');
  console.log(`📊 Content Summary:`);
  console.log(`   - Articles:  ${allArticles.length}`);
  console.log(`   - Practices: ${allPractices.length}`);
  console.log(`   - Insights:  ${allInsights.length}`);
  console.log(`   - TOTAL:     ${allArticles.length + allPractices.length + allInsights.length}\n`);
  
  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No changes will be made\n');
  }
  
  try {
    const response = await fetch(MIGRATION_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify({
        articles: allArticles,
        practices: allPractices,
        insights: allInsights,
        dryRun
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Migration failed: ${response.status} ${errorText}`);
    }
    
    const result = await response.json();
    
    console.log('\n✅ MIGRATION COMPLETE!\n');
    console.log('📈 Results:');
    console.log(`   Articles:  ${result.summary.articles.migrated}/${result.summary.articles.total} migrated, ${result.summary.articles.failed} failed`);
    console.log(`   Practices: ${result.summary.practices.migrated}/${result.summary.practices.total} migrated, ${result.summary.practices.failed} failed`);
    console.log(`   Insights:  ${result.summary.insights.migrated}/${result.summary.insights.total} migrated, ${result.summary.insights.failed} failed`);
    
    if (result.results.articles.failed.length > 0) {
      console.log('\n❌ Failed Articles:');
      result.results.articles.failed.forEach((fail: any) => {
        console.log(`   - ${fail.originalId}: ${fail.error}`);
      });
    }
    
    if (result.results.practices.failed.length > 0) {
      console.log('\n❌ Failed Practices:');
      result.results.practices.failed.forEach((fail: any) => {
        console.log(`   - ${fail.originalId}: ${fail.error}`);
      });
    }
    
    if (result.results.insights.failed.length > 0) {
      console.log('\n❌ Failed Insights:');
      result.results.insights.failed.forEach((fail: any) => {
        console.log(`   - ${fail.originalId}: ${fail.error}`);
      });
    }
    
    return result;
  } catch (error) {
    console.error('\n❌ Migration Error:', error);
    throw error;
  }
}

// Helper to migrate just articles (for testing)
export async function migrateArticlesOnly(dryRun = false) {
  console.log('🚀 Migrating Articles Only...\n');
  
  const response = await fetch(MIGRATION_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`
    },
    body: JSON.stringify({
      articles: allArticles,
      dryRun
    })
  });
  
  if (!response.ok) {
    throw new Error(`Migration failed: ${response.status}`);
  }
  
  return await response.json();
}

// Helper to migrate just practices
export async function migratePracticesOnly(dryRun = false) {
  console.log('🚀 Migrating Practices Only...\n');
  
  const response = await fetch(MIGRATION_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`
    },
    body: JSON.stringify({
      practices: allPractices,
      dryRun
    })
  });
  
  if (!response.ok) {
    throw new Error(`Migration failed: ${response.status}`);
  }
  
  return await response.json();
}

// Helper to migrate just insights
export async function migrateInsightsOnly(dryRun = false) {
  console.log('🚀 Migrating Insights Only...\n');
  
  const response = await fetch(MIGRATION_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`
    },
    body: JSON.stringify({
      insights: allInsights,
      dryRun
    })
  });
  
  if (!response.ok) {
    throw new Error(`Migration failed: ${response.status}`);
  }
  
  return await response.json();
}

// Helper to test with just 5 articles
export async function migrateTest() {
  console.log('🧪 TEST MIGRATION - First 5 Articles Only\n');
  
  const testArticles = allArticles.slice(0, 5);
  
  const response = await fetch(MIGRATION_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`
    },
    body: JSON.stringify({
      articles: testArticles,
      dryRun: false
    })
  });
  
  if (!response.ok) {
    throw new Error(`Migration failed: ${response.status}`);
  }
  
  const result = await response.json();
  console.log('✅ Test Complete:', result);
  return result;
}
