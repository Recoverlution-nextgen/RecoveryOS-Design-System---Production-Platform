// scripts/query-supabase-assets.ts
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Required: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Query Supabase storage_assets table
export async function queryStorageAssets(options: {
  style?: string;
  dimension?: string;
  type?: string;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  let query = supabase
    .from('storage_assets')
    .select('*');

  if (options.style) {
    query = query.eq('style', options.style);
  }

  if (options.dimension) {
    query = query.eq('dimension', options.dimension);
  }

  if (options.type) {
    query = query.eq('type', options.type);
  }

  if (options.search) {
    query = query.ilike('description', `%${options.search}%`);
  }

  if (options.limit) {
    query = query.limit(options.limit);
  }

  if (options.offset) {
    query = query.range(options.offset, (options.offset + (options.limit || 20)) - 1);
  }

  query = query.order('style').order('description');

  const { data, error } = await query;

  if (error) {
    console.error('Error querying storage assets:', error);
    return [];
  }

  return data;
}

// Get distinct values for filters
export async function getAssetFacets() {
  const [stylesResult, dimensionsResult, typesResult] = await Promise.all([
    supabase.from('storage_assets').select('style').neq('style', null),
    supabase.from('storage_assets').select('dimension').neq('dimension', null),
    supabase.from('storage_assets').select('type').neq('type', null)
  ]);

  const styles = [...new Set(stylesResult.data?.map(d => d.style).filter(Boolean))].sort();
  const dimensions = [...new Set(dimensionsResult.data?.map(d => d.dimension).filter(Boolean))].sort();
  const types = [...new Set(typesResult.data?.map(d => d.type).filter(Boolean))].sort();

  return { styles, dimensions, types };
}

// Get assets by style (your 5 types)
export async function getAssetsByStyle(style: string, options: { type?: string; limit?: number } = {}) {
  return queryStorageAssets({
    style,
    type: options.type,
    limit: options.limit || 50
  });
}

// Get hero-worthy assets (beautiful ones like neural_flower)
export async function getHeroAssets(options: { style?: string; limit?: number } = {}) {
  // Prioritize neural_flower for heroes, then others
  const heroStyles = ['neural_flower', 'flowstate', 'evolvingforms'];

  if (options.style && heroStyles.includes(options.style)) {
    return getAssetsByStyle(options.style, { limit: options.limit });
  }

  // Get mix of hero-worthy assets
  const assets = [];
  for (const style of heroStyles) {
    const styleAssets = await getAssetsByStyle(style, { limit: Math.ceil((options.limit || 20) / heroStyles.length) });
    assets.push(...styleAssets);
  }

  return assets.slice(0, options.limit || 20);
}

// Get assets for specific therapeutic contexts
export async function getAssetsForContext(context: string, limit = 20) {
  // Map contexts to likely styles
  const contextMappings: Record<string, string[]> = {
    'meditation': ['neural_flower', 'flowstate', 'neural_flow'],
    'reflection': ['neural_flower', 'evolvingforms', 'mindblock'],
    'healing': ['neural_flower', 'evolvingforms', 'flowstate'],
    'focus': ['flowstate', 'neural_flow', 'mindblock'],
    'growth': ['evolvingforms', 'neural_flower', 'neural_flow'],
    'calm': ['flowstate', 'neural_flower', 'neural_flow'],
    'breakthrough': ['mindblock', 'evolvingforms', 'neural_flower']
  };

  const relevantStyles = contextMappings[context.toLowerCase()] || ['neural_flower', 'flowstate'];

  const assets = [];
  for (const style of relevantStyles) {
    const styleAssets = await getAssetsByStyle(style, { limit: Math.ceil(limit / relevantStyles.length) });
    assets.push(...styleAssets);
  }

  return assets.slice(0, limit);
}

// CLI usage
if (require.main === module) {
  const command = process.argv[2];

  switch (command) {
    case 'facets':
      getAssetFacets().then(facets => {
        console.log('📊 Asset Facets:');
        console.log('Styles:', facets.styles);
        console.log('Dimensions:', facets.dimensions);
        console.log('Types:', facets.types);
      });
      break;

    case 'heroes':
      const limit = parseInt(process.argv[3]) || 10;
      getHeroAssets({ limit }).then(assets => {
        console.log(`🎨 Hero Assets (${assets.length}):`);
        assets.forEach(asset => {
          console.log(`  ${asset.style}/${asset.description} (${asset.type})`);
        });
      });
      break;

    case 'style':
      const style = process.argv[3];
      const styleLimit = parseInt(process.argv[4]) || 5;
      if (!style) {
        console.error('Usage: tsx query-supabase-assets.ts style <style> [limit]');
        process.exit(1);
      }
      getAssetsByStyle(style, { limit: styleLimit }).then(assets => {
        console.log(`🎨 ${style} Assets (${assets.length}):`);
        assets.forEach(asset => {
          console.log(`  ${asset.description} (${asset.type}) - ${asset.url}`);
        });
      });
      break;

    case 'context':
      const context = process.argv[3];
      const contextLimit = parseInt(process.argv[4]) || 10;
      if (!context) {
        console.error('Usage: tsx query-supabase-assets.ts context <context> [limit]');
        process.exit(1);
      }
      getAssetsForContext(context, contextLimit).then(assets => {
        console.log(`🎯 ${context} Assets (${assets.length}):`);
        assets.forEach(asset => {
          console.log(`  ${asset.style}/${asset.description} (${asset.type})`);
        });
      });
      break;

    default:
      console.log('Usage:');
      console.log('  tsx query-supabase-assets.ts facets');
      console.log('  tsx query-supabase-assets.ts heroes [limit]');
      console.log('  tsx query-supabase-assets.ts style <style> [limit]');
      console.log('  tsx query-supabase-assets.ts context <context> [limit]');
      break;
  }
}

export {
  queryStorageAssets,
  getAssetFacets,
  getAssetsByStyle,
  getHeroAssets,
  getAssetsForContext
};