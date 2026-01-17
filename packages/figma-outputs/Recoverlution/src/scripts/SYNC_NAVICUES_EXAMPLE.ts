/**
 * NAVICUE SYNC SCRIPT (EXAMPLE)
 * 
 * This script syncs all 3000 NaviCues from TypeScript files to Supabase.
 * 
 * ⚠️ IMPORTANT: This is a REFERENCE IMPLEMENTATION
 * You'll need to adapt this based on your actual NaviCue file structure.
 * 
 * USAGE:
 * 
 * 1. Set environment variables:
 *    SUPABASE_URL=https://your-project.supabase.co
 *    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
 * 
 * 2. Run with Node.js or Deno:
 *    node scripts/syncNaviCues.js
 *    or
 *    deno run --allow-env --allow-net scripts/syncNaviCues.ts
 * 
 * WHAT IT DOES:
 * 
 * 1. Loads raw NaviCues from TypeScript files
 * 2. Enhances them with full metadata (schema, heat_level, tags, etc.)
 * 3. Validates all NaviCues
 * 4. Syncs to Supabase in batches
 * 5. Reports statistics
 */

// ============================================================================
// IMPORTS
// ============================================================================

// For Node.js:
// import { createClient } from '@supabase/supabase-js';

// For Deno:
// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

import {
  enhanceBatch1,
  enhanceBatch2,
  enhanceBatch3,
  validateBatch,
  getBatchStatistics,
  type EnhancedNaviCue,
} from '../lib/navicues/enhanceNaviCues';

// ============================================================================
// EXAMPLE: Import your actual NaviCue arrays
// ============================================================================

/*
// Batch 1 (1000 NaviCues - Neuroscience + Spirit + Poetry)
import { NAVICUE_1000_COMPLETE } from '../lib/navicues/NAVICUE_1000_COMPLETE';

// Batch 2 (1000 NaviCues - Algorithmic Arsenal)
import { NAVICUE_MASTER_2000 } from '../lib/navicues/NAVICUE_MASTER_2000';

// Batch 3 (1000 NaviCues - Council of Six)
import { NAVICUE_3000_COUNCIL } from '../lib/navicues/NAVICUE_3000_COUNCIL';
*/

// For this example, we'll use mock data:
const NAVICUE_1000_COMPLETE: any[] = [];
const NAVICUE_MASTER_2000: any[] = [];
const NAVICUE_3000_COUNCIL: any[] = [];

// ============================================================================
// CONFIGURATION
// ============================================================================

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const BATCH_SIZE = 100; // Upsert 100 NaviCues at a time
const DRY_RUN = false;  // Set to true to test without writing to database

// ============================================================================
// SUPABASE CLIENT
// ============================================================================

/*
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
*/

// ============================================================================
// MAIN SYNC FUNCTION
// ============================================================================

async function syncAllNaviCues() {
  console.log('🚀 NaviCue Sync Started');
  console.log('==========================================');
  console.log(`Supabase URL: ${SUPABASE_URL}`);
  console.log(`Dry run: ${DRY_RUN}`);
  console.log('');
  
  try {
    // ========================================================================
    // BATCH 1: Neuroscience + Spirit + Poetry
    // ========================================================================
    console.log('📦 Processing Batch 1 (Neuroscience + Spirit + Poetry)...');
    const batch1Enhanced = enhanceBatch1(NAVICUE_1000_COMPLETE);
    const batch1Validation = validateBatch(batch1Enhanced);
    
    console.log(`   Total: ${batch1Validation.totalCount}`);
    console.log(`   Valid: ${batch1Validation.validCount}`);
    console.log(`   Invalid: ${batch1Validation.invalidCount}`);
    
    if (batch1Validation.invalidCount > 0) {
      console.log('   ⚠️  Validation errors:');
      batch1Validation.errors.slice(0, 5).forEach(err => {
        console.log(`      ${err.id}: ${err.errors.join(', ')}`);
      });
      if (batch1Validation.invalidCount > 5) {
        console.log(`      ... and ${batch1Validation.invalidCount - 5} more`);
      }
    }
    
    const batch1Stats = getBatchStatistics(batch1Enhanced);
    console.log(`   Schemas: ${Object.keys(batch1Stats.by_schema).length}`);
    console.log(`   Families: ${Object.keys(batch1Stats.by_family).length}`);
    console.log(`   Heat levels: ${JSON.stringify(batch1Stats.by_heat)}`);
    console.log('');
    
    if (!DRY_RUN) {
      await syncBatch(batch1Enhanced, 1);
    }
    
    // ========================================================================
    // BATCH 2: Algorithmic Arsenal
    // ========================================================================
    console.log('📦 Processing Batch 2 (Algorithmic Arsenal)...');
    const batch2Enhanced = enhanceBatch2(NAVICUE_MASTER_2000);
    const batch2Validation = validateBatch(batch2Enhanced);
    
    console.log(`   Total: ${batch2Validation.totalCount}`);
    console.log(`   Valid: ${batch2Validation.validCount}`);
    console.log(`   Invalid: ${batch2Validation.invalidCount}`);
    
    if (batch2Validation.invalidCount > 0) {
      console.log('   ⚠️  Validation errors:');
      batch2Validation.errors.slice(0, 5).forEach(err => {
        console.log(`      ${err.id}: ${err.errors.join(', ')}`);
      });
    }
    
    const batch2Stats = getBatchStatistics(batch2Enhanced);
    console.log(`   Schemas: ${Object.keys(batch2Stats.by_schema).length}`);
    console.log(`   Families: ${Object.keys(batch2Stats.by_family).length}`);
    console.log(`   KBE distribution: ${JSON.stringify(batch2Stats.by_kbe)}`);
    console.log('');
    
    if (!DRY_RUN) {
      await syncBatch(batch2Enhanced, 2);
    }
    
    // ========================================================================
    // BATCH 3: Council of Six
    // ========================================================================
    console.log('📦 Processing Batch 3 (Council of Six)...');
    const batch3Enhanced = enhanceBatch3(NAVICUE_3000_COUNCIL);
    const batch3Validation = validateBatch(batch3Enhanced);
    
    console.log(`   Total: ${batch3Validation.totalCount}`);
    console.log(`   Valid: ${batch3Validation.validCount}`);
    console.log(`   Invalid: ${batch3Validation.invalidCount}`);
    
    if (batch3Validation.invalidCount > 0) {
      console.log('   ⚠️  Validation errors:');
      batch3Validation.errors.slice(0, 5).forEach(err => {
        console.log(`      ${err.id}: ${err.errors.join(', ')}`);
      });
    }
    
    const batch3Stats = getBatchStatistics(batch3Enhanced);
    console.log(`   Schemas: ${Object.keys(batch3Stats.by_schema).length}`);
    console.log(`   Council lenses: ${Object.keys(batch3Stats.by_council).length}`);
    console.log(`   Way processes: ${Object.keys(batch3Stats.by_way).length}`);
    console.log(`   Heat levels: ${JSON.stringify(batch3Stats.by_heat)}`);
    console.log('');
    
    if (!DRY_RUN) {
      await syncBatch(batch3Enhanced, 3);
    }
    
    // ========================================================================
    // FINAL VERIFICATION
    // ========================================================================
    console.log('==========================================');
    console.log('✅ Sync Complete!');
    console.log('');
    
    if (!DRY_RUN) {
      console.log('🔍 Verifying database...');
      /*
      const { count } = await supabase
        .from('navicue_library')
        .select('*', { count: 'exact', head: true });
      
      console.log(`📊 Total NaviCues in database: ${count}`);
      
      // Check distribution
      const { data: heatDist } = await supabase
        .from('navicue_library')
        .select('heat_level')
        .eq('status', 'active');
      
      const heatCounts = heatDist?.reduce((acc: any, row: any) => {
        acc[row.heat_level] = (acc[row.heat_level] || 0) + 1;
        return acc;
      }, {});
      
      console.log(`Heat level distribution: ${JSON.stringify(heatCounts)}`);
      */
    } else {
      console.log('(Dry run - no data written to database)');
    }
    
  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  }
}

// ============================================================================
// SYNC BATCH HELPER
// ============================================================================

async function syncBatch(navicues: EnhancedNaviCue[], batchNumber: number) {
  console.log(`   Syncing to Supabase...`);
  
  for (let i = 0; i < navicues.length; i += BATCH_SIZE) {
    const batch = navicues.slice(i, i + BATCH_SIZE);
    
    // Transform to match Supabase schema
    const rows = batch.map(nc => ({
      // Primary fields
      id: nc.id,
      text_line: nc.text_line,
      response_type: nc.response_type,
      status: nc.status,
      
      // Core orchestration metadata
      family: nc.family,
      schema: nc.schema,
      kbe_target: nc.kbe_target,
      heat_level: nc.heat_level,
      
      // Batch 3 specific
      council_lens: nc.council_lens || null,
      way_process: nc.way_process || null,
      
      // Clinical taxonomy
      pillar_id: nc.pillar_id,
      
      // Tags (JSONB array)
      tags: nc.tags,
      
      // Metadata (JSONB object)
      metadata: {
        batch_number: nc.batch_number,
        batch_name: nc.batch_name,
      },
      
      // Timestamps
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
    
    // Upsert to Supabase
    /*
    const { error } = await supabase
      .from('navicue_library')
      .upsert(rows, { onConflict: 'id' });
    
    if (error) {
      console.error(`   ❌ Error syncing batch ${batchNumber}, rows ${i}-${i + BATCH_SIZE}:`, error);
      throw error;
    }
    */
    
    console.log(`   ✅ Synced ${Math.min(i + BATCH_SIZE, navicues.length)}/${navicues.length}`);
    
    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`   Done!`);
}

// ============================================================================
// EXAMPLE QUERIES TO TEST ORCHESTRATION
// ============================================================================

async function testOrchestrationQueries() {
  console.log('');
  console.log('🧪 Testing Orchestration Queries');
  console.log('==========================================');
  
  // Test 1: Get all high-heat NaviCues for red state
  console.log('Test 1: High-heat NaviCues (red state safe)');
  /*
  const { data: highHeat } = await supabase
    .from('navicue_library')
    .select('id, schema, family, heat_level')
    .eq('heat_level', 'high')
    .eq('status', 'active')
    .limit(10);
  
  console.log(`Found ${highHeat?.length} high-heat NaviCues`);
  console.log(highHeat);
  */
  
  // Test 2: Get NaviCues for specific schema
  console.log('');
  console.log('Test 2: Schema-specific (shame)');
  /*
  const { data: shameNaviCues } = await supabase
    .from('navicue_library')
    .select('id, schema, family, kbe_target, heat_level')
    .eq('schema', 'shame')
    .eq('status', 'active')
    .limit(10);
  
  console.log(`Found ${shameNaviCues?.length} shame NaviCues`);
  console.log(shameNaviCues);
  */
  
  // Test 3: Get NaviCues by tags
  console.log('');
  console.log('Test 3: Tag-based query (somatic)');
  /*
  const { data: somaticNaviCues } = await supabase
    .from('navicue_library')
    .select('id, family, tags')
    .contains('tags', ['approach_somatic'])
    .eq('status', 'active')
    .limit(10);
  
  console.log(`Found ${somaticNaviCues?.length} somatic NaviCues`);
  console.log(somaticNaviCues);
  */
  
  // Test 4: Council lens query (Batch 3)
  console.log('');
  console.log('Test 4: Council lens (Watts)');
  /*
  const { data: wattsNaviCues } = await supabase
    .from('navicue_library')
    .select('id, schema, council_lens, way_process')
    .eq('council_lens', 'watts')
    .eq('status', 'active')
    .limit(10);
  
  console.log(`Found ${wattsNaviCues?.length} Watts NaviCues`);
  console.log(wattsNaviCues);
  */
  
  console.log('');
  console.log('✅ Orchestration queries complete!');
}

// ============================================================================
// RUN IT
// ============================================================================

if (import.meta.main || require.main === module) {
  syncAllNaviCues()
    .then(() => {
      // Optionally run test queries
      // return testOrchestrationQueries();
    })
    .then(() => {
      console.log('');
      console.log('🎉 All done!');
      process.exit(0);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

// ============================================================================
// EXPORT FOR PROGRAMMATIC USE
// ============================================================================

export {
  syncAllNaviCues,
  syncBatch,
  testOrchestrationQueries,
};
