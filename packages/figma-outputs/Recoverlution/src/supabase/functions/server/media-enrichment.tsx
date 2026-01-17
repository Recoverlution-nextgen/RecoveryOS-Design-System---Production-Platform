/**
 * MEDIA ENRICHMENT ENDPOINT
 * Internal endpoint for media asset enrichment and backfill
 * 
 * This endpoint analyzes media assets in Supabase Storage and updates
 * the database with structured metadata (dimensions, thumbnails, etc.)
 * 
 * Used by: relay_enrich_admin Edge Function (admin-gated)
 */

import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const app = new Hono();

interface EnrichmentResult {
  enriched_count: number;
  skipped_count: number;
  error_count: number;
  total_processed: number;
  prefix?: string;
  duration_ms: number;
  errors?: string[];
}

/**
 * GET /internal/enrich
 * Trigger media enrichment with optional filters
 * 
 * Query params:
 * - force: boolean (default false) - re-process existing enriched assets
 * - prefix: string (optional) - limit to specific bucket/path
 * 
 * Returns: EnrichmentResult
 */
app.get('/internal/enrich', async (c) => {
  const startTime = Date.now();
  
  try {
    const force = c.req.query('force') === 'true';
    const prefix = c.req.query('prefix') || '';
    
    console.log(`[MediaEnrichment] Starting enrichment: force=${force}, prefix=${prefix || '(all)'}`);
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    let enriched = 0;
    let skipped = 0;
    let errors = 0;
    const errorMessages: string[] = [];

    // Get all buckets or filter by prefix
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error('[MediaEnrichment] Failed to list buckets:', bucketsError);
      return c.json({ 
        error: 'Failed to list storage buckets',
        details: bucketsError.message 
      }, 500);
    }

    console.log(`[MediaEnrichment] Found ${buckets?.length || 0} buckets`);

    // Filter buckets by prefix if provided
    const targetBuckets = prefix 
      ? buckets?.filter(b => b.name.startsWith(prefix.split('/')[0])) || []
      : buckets || [];

    console.log(`[MediaEnrichment] Processing ${targetBuckets.length} buckets`);

    // Process each bucket
    for (const bucket of targetBuckets) {
      const bucketName = bucket.name;
      console.log(`[MediaEnrichment] Processing bucket: ${bucketName}`);

      // List all files in bucket (with optional path prefix)
      const pathPrefix = prefix.includes('/') 
        ? prefix.split('/').slice(1).join('/')
        : '';

      const { data: files, error: filesError } = await supabase.storage
        .from(bucketName)
        .list(pathPrefix, { limit: 1000 });

      if (filesError) {
        console.error(`[MediaEnrichment] Failed to list files in ${bucketName}:`, filesError);
        errors++;
        errorMessages.push(`Bucket ${bucketName}: ${filesError.message}`);
        continue;
      }

      console.log(`[MediaEnrichment] Found ${files?.length || 0} files in ${bucketName}`);

      // Process each file
      for (const file of files || []) {
        try {
          // Skip directories
          if (!file.name || file.name.endsWith('/')) {
            continue;
          }

          const filePath = pathPrefix 
            ? `${pathPrefix}/${file.name}`
            : file.name;

          // Check if already enriched (unless force=true)
          if (!force) {
            const { data: existing } = await supabase
              .from('media_assets')
              .select('id')
              .eq('bucket_name', bucketName)
              .eq('file_path', filePath)
              .single();

            if (existing) {
              skipped++;
              continue;
            }
          }

          // Extract metadata from file
          const metadata = {
            bucket_name: bucketName,
            file_path: filePath,
            file_name: file.name,
            mime_type: file.metadata?.mimetype || inferMimeType(file.name),
            size_bytes: file.metadata?.size || 0,
            created_at: file.created_at,
            updated_at: file.updated_at,
            metadata: file.metadata || {},
          };

          // Get public URL (for signed URL generation)
          const { data: { publicUrl } } = supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath);

          // Upsert to media_assets table
          const { error: upsertError } = await supabase
            .from('media_assets')
            .upsert({
              ...metadata,
              public_url: publicUrl,
              enriched_at: new Date().toISOString(),
            }, {
              onConflict: 'bucket_name,file_path'
            });

          if (upsertError) {
            console.error(`[MediaEnrichment] Failed to upsert ${filePath}:`, upsertError);
            errors++;
            errorMessages.push(`${bucketName}/${filePath}: ${upsertError.message}`);
          } else {
            enriched++;
            if (enriched % 10 === 0) {
              console.log(`[MediaEnrichment] Progress: ${enriched} enriched, ${skipped} skipped, ${errors} errors`);
            }
          }
        } catch (fileError: any) {
          console.error(`[MediaEnrichment] Error processing file:`, fileError);
          errors++;
          errorMessages.push(`${bucketName}/${file.name}: ${fileError.message}`);
        }
      }
    }

    const duration = Date.now() - startTime;

    const result: EnrichmentResult = {
      enriched_count: enriched,
      skipped_count: skipped,
      error_count: errors,
      total_processed: enriched + skipped + errors,
      prefix: prefix || undefined,
      duration_ms: duration,
      errors: errorMessages.length > 0 ? errorMessages.slice(0, 10) : undefined, // First 10 errors
    };

    console.log(`[MediaEnrichment] Completed:`, result);

    return c.json(result);
  } catch (error: any) {
    const duration = Date.now() - startTime;
    console.error('[MediaEnrichment] Fatal error:', error);
    return c.json({ 
      error: 'Enrichment failed',
      details: error.message,
      duration_ms: duration 
    }, 500);
  }
});

/**
 * Helper: Infer MIME type from file extension
 */
function inferMimeType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  
  const mimeTypes: Record<string, string> = {
    // Images
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    
    // Videos
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'mov': 'video/quicktime',
    
    // Audio
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'ogg': 'audio/ogg',
    'm4a': 'audio/mp4',
    
    // Documents
    'pdf': 'application/pdf',
    'json': 'application/json',
    'txt': 'text/plain',
  };

  return mimeTypes[ext || ''] || 'application/octet-stream';
}

export default app;
