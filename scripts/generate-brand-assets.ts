// scripts/generate-brand-assets.ts
import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, extname, basename } from 'path';
import { generateGovernanceTags, validateBrandAsset, generateSupabaseAssetRecord } from './brand-asset-governance';

interface BrandAsset {
  id: string;
  name: string;
  type: string; // evolvingforms, flowstate, mindblock, neural_flow, neural_flower
  form: string; // abstract
  description: string; // alignmentshift, etc.
  tone: 'light' | 'dark';
  formats: {
    jpg?: { path: string; size: number; width: number; height: number };
    avif?: { path: string; size: number; width: number; height: number };
    webp?: { path: string; size: number; width: number; height: number };
  };
  aspectRatio: '5:4' | '1:1' | '16:9';
  tags: string[];
  supabasePath: string;
}

// Parse filename according to convention: type_form_description_tone
function parseAssetFilename(filename: string): Omit<BrandAsset, 'formats' | 'supabasePath'> | null {
  const nameWithoutExt = basename(filename, extname(filename));

  // Expected format: type_form_description_tone
  const parts = nameWithoutExt.split('_');

  if (parts.length !== 4) {
    console.warn(`Skipping ${filename}: doesn't match expected format (type_form_description_tone)`);
    return null;
  }

  const [type, form, description, toneStr] = parts;

  // Validate type
  const validTypes = ['evolvingforms', 'flowstate', 'mindblock', 'neural_flow', 'neural_flower'];
  if (!validTypes.includes(type)) {
    console.warn(`Skipping ${filename}: invalid type '${type}'`);
    return null;
  }

  // Validate tone
  if (toneStr !== 'light' && toneStr !== 'dark') {
    console.warn(`Skipping ${filename}: invalid tone '${toneStr}'`);
    return null;
  }

  const tone: 'light' | 'dark' = toneStr;

  return {
    id: nameWithoutExt,
    name: `${type} ${description} (${tone})`,
    type,
    form,
    description,
    tone,
    aspectRatio: '5:4', // Default to 5:4 as per spec
    tags: generateTags(type, description, tone)
  };
}

// Generate governance tags based on asset properties
function generateTags(type: string, description: string, tone: 'light' | 'dark'): string[] {
  // Create a temporary asset object for governance processing
  const tempAsset: BrandAsset = {
    id: `${type}_abstract_${description}_${tone}`,
    name: `${type} ${description} (${tone})`,
    type,
    form: 'abstract',
    description,
    tone,
    aspectRatio: '5:4',
    formats: {},
    tags: [],
    supabasePath: ''
  };

  return generateGovernanceTags(tempAsset);
}

// Generate Supabase storage path
function generateSupabasePath(asset: BrandAsset, format: string, aspectRatio: string): string {
  return `brand/${asset.type}/${format.toUpperCase()}/${aspectRatio}/${asset.id}.${format}`;
}

// Scan directory and generate asset metadata
function generateBrandAssets(baseDir: string): BrandAsset[] {
  const assets: { [key: string]: Partial<BrandAsset> } = {};

  // Scan the directory structure: brand/type/format/aspectRatio/
  function scanDirectory(dir: string): void {
    const items = readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = join(dir, item.name);

      if (item.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.isFile()) {
        const ext = extname(item.name).toLowerCase();

        // Only process image files
        if (!['.jpg', '.jpeg', '.avif', '.webp'].includes(ext)) continue;

        const parsed = parseAssetFilename(item.name);
        if (!parsed) continue;

        const assetId = parsed.id;
        const format = ext.slice(1); // Remove the dot

        if (!assets[assetId]) {
          assets[assetId] = {
            ...parsed,
            formats: {},
            supabasePath: '' // Will be set based on directory structure
          };
        }

        const asset = assets[assetId] as BrandAsset;
        const stats = statSync(fullPath);

        // For now, assume 5:4 aspect ratio and extract dimensions from filename or use defaults
        // In a real implementation, you'd use image processing to get actual dimensions
        const dimensions = getDimensionsFromPath(fullPath);

        asset.formats[format as keyof BrandAsset['formats']] = {
          path: fullPath,
          size: stats.size,
          width: dimensions.width,
          height: dimensions.height
        };

        // Set supabase path based on current directory structure
        const relativePath = fullPath.replace(baseDir, '').replace(/^\//, '');
        const pathParts = relativePath.split('/');
        if (pathParts.length >= 3) {
          const aspectRatio = pathParts[pathParts.length - 2];
          asset.supabasePath = generateSupabasePath(asset, format, aspectRatio);
        }
      }
    }
  }

  scanDirectory(baseDir);

  // Filter out incomplete assets
  return Object.values(assets).filter((asset): asset is BrandAsset => {
    return asset.formats && Object.keys(asset.formats).length > 0;
  });
}

// Extract dimensions from file path (placeholder - in reality use image processing)
function getDimensionsFromPath(path: string): { width: number; height: number } {
  // For 5:4 assets, use the spec dimensions
  if (path.includes('5:4')) {
    if (path.includes('mobile')) return { width: 390, height: 488 };
    if (path.includes('tablet')) return { width: 768, height: 960 };
    if (path.includes('desktop')) return { width: 1000, height: 1250 };
  }

  // Default to desktop 5:4
  return { width: 1000, height: 1250 };
}

// Generate Supabase SQL for bulk insert
function generateSupabaseSQL(assets: BrandAsset[]): string {
  const inserts = assets.map(asset => {
    try {
      const record = generateSupabaseAssetRecord(asset);

      return `(
        '${record.id}',
        '${record.name}',
        '${record.type}',
        '${record.category}',
        '${record.pillar_id}',
        '${record.format}',
        '${record.url}',
        ${record.width || 'NULL'},
        ${record.height || 'NULL'},
        ${record.file_size || 'NULL'},
        ARRAY[${record.tags.map(tag => `'${tag}'`).join(', ')}],
        '${record.created_at}'
      )`;
    } catch (error) {
      console.warn(`Skipping asset ${asset.id}: ${error}`);
      return null;
    }
  }).filter(Boolean);

  if (inserts.length === 0) {
    throw new Error('No valid assets to generate SQL for');
  }

  return `
-- Insert brand assets into Supabase
-- Generated: ${new Date().toISOString()}
INSERT INTO assets (
  id, name, type, category, pillar_id, format, url, width, height, file_size, tags, created_at
) VALUES
${inserts.join(',\n')};
  `.trim();
}

// CLI usage
if (require.main === module) {
  const assetsDir = process.argv[2] || './assets/brand';
  const outputFile = process.argv[3] || './brand-assets-metadata.json';

  console.log(`🔍 Scanning assets in: ${assetsDir}`);

  try {
    const assets = generateBrandAssets(assetsDir);

    console.log(`✅ Found ${assets.length} valid brand assets`);

    // Validate governance compliance
    console.log('\n🔍 Validating governance compliance...');
    let validAssets = 0;
    let totalWarnings = 0;

    assets.forEach(asset => {
      const validation = validateBrandAsset(asset);
      if (validation.valid) {
        validAssets++;
      } else {
        totalWarnings += validation.warnings.length;
        console.log(`⚠️  ${asset.id}: ${validation.warnings.join(', ')}`);
      }
    });

    console.log(`✅ Governance validation: ${validAssets}/${assets.length} assets compliant (${totalWarnings} warnings)`);

    // Write JSON metadata
    writeFileSync(outputFile, JSON.stringify(assets, null, 2));
    console.log(`📄 Asset metadata written to: ${outputFile}`);

    // Generate SQL for Supabase
    const sqlFile = outputFile.replace('.json', '.sql');
    const sql = generateSupabaseSQL(assets);
    writeFileSync(sqlFile, sql);
    console.log(`🗄️  Supabase SQL written to: ${sqlFile}`);

    // Summary
    const typeCounts = assets.reduce((acc, asset) => {
      acc[asset.type] = (acc[asset.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log('\n📊 Asset Summary:');
    Object.entries(typeCounts).forEach(([type, count]) => {
      console.log(`   ${type}: ${count} assets`);
    });

  } catch (error) {
    console.error('❌ Error generating brand assets:', error);
    process.exit(1);
  }
}

export { generateBrandAssets, generateSupabaseSQL, type BrandAsset };