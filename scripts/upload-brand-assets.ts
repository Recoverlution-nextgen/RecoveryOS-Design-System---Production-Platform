// scripts/upload-brand-assets.ts
import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import type { BrandAsset } from './generate-brand-assets';

// Supabase configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Required: VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// Upload a single asset file to Supabase Storage
async function uploadAssetFile(
  localPath: string,
  storagePath: string,
  contentType: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const fileBuffer = readFileSync(localPath);

    const { data, error } = await supabase.storage
      .from('recoverlution-assets')
      .upload(storagePath, fileBuffer, {
        contentType,
        upsert: true // Overwrite if exists
      });

    if (error) {
      return { success: false, error: error.message };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('recoverlution-assets')
      .getPublicUrl(storagePath);

    return { success: true, url: urlData.publicUrl };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

// Upload all formats of a brand asset
async function uploadBrandAsset(asset: BrandAsset): Promise<{
  success: boolean;
  urls: Record<string, string>;
  errors: string[];
}> {
  const urls: Record<string, string> = {};
  const errors: string[] = [];

  console.log(`📤 Uploading ${asset.id}...`);

  for (const [format, formatData] of Object.entries(asset.formats)) {
    if (!formatData) continue;

    const contentType = format === 'jpg' ? 'image/jpeg' :
                       format === 'avif' ? 'image/avif' :
                       format === 'webp' ? 'image/webp' : 'image/jpeg';

    const result = await uploadAssetFile(formatData.path, asset.supabasePath, contentType);

    if (result.success && result.url) {
      urls[format] = result.url;
      console.log(`   ✅ ${format.toUpperCase()}: ${result.url}`);
    } else {
      errors.push(`${format}: ${result.error}`);
      console.log(`   ❌ ${format}: ${result.error}`);
    }
  }

  return {
    success: errors.length === 0,
    urls,
    errors
  };
}

// Insert asset metadata into database
async function insertAssetMetadata(asset: BrandAsset, urls: Record<string, string>): Promise<boolean> {
  try {
    // Use primary format for metadata
    const primaryFormat = Object.keys(urls)[0];
    const formatData = asset.formats[primaryFormat as keyof typeof asset.formats];

    const record = {
      id: asset.id,
      name: asset.name,
      type: 'hero-poster',
      category: 'hero',
      pillar_id: asset.type, // Will be mapped by governance
      format: primaryFormat,
      url: urls[primaryFormat],
      width: formatData?.width,
      height: formatData?.height,
      file_size: formatData?.size,
      tags: asset.tags,
      created_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('assets')
      .upsert(record, { onConflict: 'id' });

    if (error) {
      console.error(`❌ Failed to insert metadata for ${asset.id}:`, error);
      return false;
    }

    console.log(`📝 Metadata inserted for ${asset.id}`);
    return true;
  } catch (error) {
    console.error(`❌ Error inserting metadata for ${asset.id}:`, error);
    return false;
  }
}

// Main upload function
async function uploadBrandAssets(metadataFile: string): Promise<void> {
  try {
    console.log('🚀 Starting brand asset upload to Supabase...');

    // Load metadata
    const assets: BrandAsset[] = JSON.parse(readFileSync(metadataFile, 'utf-8'));
    console.log(`📦 Loaded ${assets.length} assets from ${metadataFile}`);

    let successCount = 0;
    let errorCount = 0;

    // Upload assets in batches to avoid overwhelming Supabase
    const batchSize = 5;

    for (let i = 0; i < assets.length; i += batchSize) {
      const batch = assets.slice(i, i + batchSize);
      console.log(`\n📤 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(assets.length / batchSize)}`);

      const promises = batch.map(async (asset) => {
        const uploadResult = await uploadBrandAsset(asset);

        if (uploadResult.success) {
          const metadataResult = await insertAssetMetadata(asset, uploadResult.urls);
          return metadataResult ? 'success' : 'metadata_error';
        } else {
          console.log(`❌ Upload failed for ${asset.id}: ${uploadResult.errors.join(', ')}`);
          return 'upload_error';
        }
      });

      const results = await Promise.all(promises);

      results.forEach(result => {
        if (result === 'success') successCount++;
        else errorCount++;
      });

      // Small delay between batches
      if (i + batchSize < assets.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log('\n🎉 Upload complete!');
    console.log(`✅ Successfully uploaded: ${successCount} assets`);
    console.log(`❌ Failed: ${errorCount} assets`);

  } catch (error) {
    console.error('❌ Upload failed:', error);
    process.exit(1);
  }
}

// CLI usage
if (require.main === module) {
  const metadataFile = process.argv[2];

  if (!metadataFile) {
    console.error('Usage: tsx upload-brand-assets.ts <metadata-file>');
    console.error('Example: tsx upload-brand-assets.ts ./brand-assets-metadata.json');
    process.exit(1);
  }

  uploadBrandAssets(metadataFile);
}

export { uploadBrandAssets, uploadAssetFile };