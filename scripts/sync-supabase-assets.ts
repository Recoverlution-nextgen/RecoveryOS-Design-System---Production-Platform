// scripts/sync-supabase-assets.ts
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Required: VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// Interface matching the storage_assets table structure
interface StorageAsset {
  id: string;
  object_name: string;
  bucket_id: string;
  style: string;
  dimension: string;
  type: string;
  description: string;
  size_bytes?: number;
  url: string;
  updated_at: string;
  tags?: string[];
}

// Universal governance mapping for flexible asset usage
const UNIVERSAL_GOVERNANCE = {
  evolvingforms: {
    therapeuticFocus: ['pattern recognition', 'transformation', 'evolution', 'change'],
    possiblePillars: ['ER', 'DM', 'SR', 'II'],
    universalTags: ['therapeutic', 'contemplative', 'transformation', 'growth']
  },
  flowstate: {
    therapeuticFocus: ['flow state', 'harmony', 'balance', 'engagement', 'presence'],
    possiblePillars: ['DM', 'II', 'ER', 'SR'],
    universalTags: ['therapeutic', 'encouraging', 'flow', 'harmony', 'balance']
  },
  mindblock: {
    therapeuticFocus: ['cognitive barriers', 'limitation', 'acceptance', 'compassion', 'obstacle'],
    possiblePillars: ['SC', 'II', 'ER', 'DM'],
    universalTags: ['therapeutic', 'neutral', 'acceptance', 'compassion', 'limitation']
  },
  neural_flow: {
    therapeuticFocus: ['neural patterns', 'cognitive flow', 'connection', 'integration'],
    possiblePillars: ['II', 'DM', 'ER', 'SR'],
    universalTags: ['therapeutic', 'contemplative', 'neural', 'connection', 'integration']
  },
  neural_flower: {
    therapeuticFocus: ['neural growth', 'cognitive blossoming', 'reflection', 'development'],
    possiblePillars: ['SR', 'ER', 'SC', 'II'],
    universalTags: ['therapeutic', 'encouraging', 'growth', 'reflection', 'beauty']
  }
};

// Generate flexible governance tags for any asset
function generateUniversalTags(asset: StorageAsset): string[] {
  const tags: string[] = [];

  // Base therapeutic tag (universal)
  tags.push('therapeutic');

  // Style-based governance (flexible, not prescriptive)
  const style = asset.style.toLowerCase();
  const governance = Object.values(UNIVERSAL_GOVERNANCE).find(g =>
    style.includes(g.therapeuticFocus[0].split(' ')[0]) ||
    g.therapeuticFocus.some(focus => style.includes(focus.split(' ')[0]))
  );

  if (governance) {
    // Add possible pillars (flexible usage)
    tags.push(...governance.possiblePillars);

    // Add universal tags for this style
    tags.push(...governance.universalTags);

    // Add therapeutic focus areas
    tags.push(...governance.therapeuticFocus.slice(0, 3));
  }

  // Description-based tags (from filename)
  const desc = asset.description.toLowerCase();
  if (desc.includes('alignment') || desc.includes('harmony')) {
    tags.push('alignment', 'harmony', 'balance');
  }
  if (desc.includes('shift') || desc.includes('change') || desc.includes('transformation')) {
    tags.push('transformation', 'change', 'transition');
  }
  if (desc.includes('flow') || desc.includes('movement')) {
    tags.push('flow', 'movement', 'fluidity');
  }
  if (desc.includes('growth') || desc.includes('development')) {
    tags.push('growth', 'development', 'progression');
  }
  if (desc.includes('connection') || desc.includes('link')) {
    tags.push('connection', 'relationship', 'linkage');
  }
  if (desc.includes('focus') || desc.includes('attention')) {
    tags.push('focus', 'attention', 'concentration');
  }
  if (desc.includes('light')) {
    tags.push('light', 'bright', 'uplifting');
  }
  if (desc.includes('dark')) {
    tags.push('dark', 'contemplative', 'grounding');
  }

  // Format and dimension tags
  tags.push(asset.type.toLowerCase());
  tags.push(asset.dimension.toLowerCase().replace(':', '-'));

  // Universal context tags (flexible usage)
  tags.push('individual', 'universal');

  return [...new Set(tags)]; // Remove duplicates
}

// Sync governance tags to storage_assets table
async function syncAssetGovernance(): Promise<void> {
  console.log('🔄 Syncing universal governance tags to storage_assets...');

  try {
    // Get all brand assets from storage_assets table
    const { data: assets, error: fetchError } = await supabase
      .from('storage_assets')
      .select('*')
      .like('object_name', 'recoverlution-assets/brand/%')
      .order('style', { ascending: true });

    if (fetchError) {
      console.error('❌ Error fetching assets:', fetchError);
      return;
    }

    if (!assets || assets.length === 0) {
      console.log('ℹ️  No brand assets found in storage_assets table');
      return;
    }

    console.log(`📦 Found ${assets.length} brand assets to sync with universal governance`);

    let processed = 0;
    let updated = 0;

    // Process assets in batches to avoid overwhelming Supabase
    const batchSize = 10;

    for (let i = 0; i < assets.length; i += batchSize) {
      const batch = assets.slice(i, i + batchSize);
      console.log(`🔄 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(assets.length / batchSize)}`);

      for (const asset of batch) {
        processed++;

        // Generate universal governance tags
        const governanceTags = generateUniversalTags(asset);

        try {
          const { error: updateError } = await supabase
            .from('storage_assets')
            .update({
              tags: governanceTags,
              updated_at: new Date().toISOString()
            })
            .eq('id', asset.id);

          if (updateError) {
            console.error(`❌ Failed to update governance for ${asset.description}:`, updateError);
          } else {
            updated++;
            console.log(`✅ Updated ${asset.description} with ${governanceTags.length} universal tags`);
          }
        } catch (error) {
          console.error(`❌ Error processing ${asset.description}:`, error);
        }
      }

      // Small delay between batches
      if (i + batchSize < assets.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    console.log('\n🎉 Universal governance sync complete!');
    console.log(`✅ Processed: ${processed} assets`);
    console.log(`✅ Updated: ${updated} assets with flexible therapeutic tags`);
    console.log(`🎨 Applied universal approach: no rigid pillar assignment, flexible usage across contexts`);

  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  }
}

// CLI usage
if (require.main === module) {
  syncAssetGovernance();
}

export { syncAssetGovernance, generateUniversalTags };