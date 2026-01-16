#!/usr/bin/env node

// CLI script to sync assets from Supabase
import { supabaseClient } from './client';

async function main() {
  try {
    console.log('🔄 Syncing assets from Supabase...');

    // Sync governance tags
    await supabaseClient.syncAssetGovernance();

    // Get asset facets
    const facets = await supabaseClient.getAssetFacets();
    console.log('📊 Available asset facets:');
    console.log(`  Styles: ${facets.styles.join(', ')}`);
    console.log(`  Dimensions: ${facets.dimensions.join(', ')}`);
    console.log(`  Types: ${facets.types.join(', ')}`);

    // Get hero assets
    const heroes = await supabaseClient.getHeroAssets({ limit: 5 });
    console.log(`\n🎨 Hero assets (${heroes.length}):`);
    heroes.forEach(asset => {
      console.log(`  ${asset.style}/${asset.description} (${asset.type})`);
    });

    console.log('\n✅ Asset sync complete!');
  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  }
}

if (typeof require !== "undefined" && require.main === module) {
  main();
}