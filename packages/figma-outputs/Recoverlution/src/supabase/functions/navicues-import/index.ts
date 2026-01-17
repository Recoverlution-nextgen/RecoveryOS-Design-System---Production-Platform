/**
 * NaviCues Bulk Import Edge Function
 * 
 * POST /functions/v1/navicues-import
 * 
 * Accepts:
 * - JSON: { items: NavicueSeed[], dry_run?: boolean }
 * - CSV: Content-Type: text/csv
 * 
 * Query params:
 * - ?dry_run=true to validate without importing
 * 
 * Headers:
 * - Authorization: Bearer <token>
 * - Content-Type: application/json | text/csv
 * - X-Source-File: optional label for audit
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-source-file',
};

interface NavicueSeed {
  navicue_id: string;
  name?: string;
  title?: string;
  family?: string;
  pillar_id?: string;
  kbe_layer?: string;
  track?: string;
  text_line: string;
  response_type: string;
  response_options?: any;
  voice_archetype?: string;
  delivery_mechanism?: string;
  intent_primary?: string;
  intent_secondary?: string;
  schemas?: string[];
  mindblock_codes?: string[];
  tags?: string[];
  source_file?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get Supabase client (service role for writes)
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Validate method
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get headers
    const contentType = req.headers.get('content-type') || '';
    const sourceFile = req.headers.get('x-source-file') || 'unknown';
    
    // Check for dry_run in URL or body
    const url = new URL(req.url);
    const dryRunParam = url.searchParams.get('dry_run') === 'true';

    let items: NavicueSeed[] = [];
    let dryRun = dryRunParam;

    // Parse request body
    if (contentType.includes('application/json')) {
      const body = await req.json();
      items = body.items || [];
      dryRun = body.dry_run ?? dryRun;
    } else if (contentType.includes('text/csv')) {
      const csvText = await req.text();
      items = parseCSV(csvText);
    } else {
      return new Response(
        JSON.stringify({ error: 'Unsupported content type. Use application/json or text/csv' }),
        { status: 415, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate items
    if (!items || items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No items provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (items.length > 5000) {
      return new Response(
        JSON.stringify({ error: 'Too many items. Maximum 5000 per batch.' }),
        { status: 413, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate required fields
    const errors: string[] = [];
    items.forEach((item, idx) => {
      if (!item.navicue_id) errors.push(`Item ${idx}: missing navicue_id`);
      if (!item.text_line) errors.push(`Item ${idx}: missing text_line`);
      if (!item.response_type) errors.push(`Item ${idx}: missing response_type`);
    });

    if (errors.length > 0) {
      return new Response(
        JSON.stringify({ error: 'Validation errors', details: errors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (dryRun) {
      // Dry run: validate only
      return new Response(
        JSON.stringify({
          ok: true,
          dry_run: true,
          validated: items.length,
          message: `Validated ${items.length} items. No changes made.`
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate batch_id
    const batchId = crypto.randomUUID();

    // Insert to staging
    const stagingRecords = items.map(item => ({
      navicue_id: item.navicue_id,
      name: item.name,
      title: item.title,
      family: item.family,
      pillar_id: item.pillar_id,
      kbe_layer: item.kbe_layer,
      track: item.track,
      text_line: item.text_line,
      response_type: item.response_type,
      response_options: item.response_options ? JSON.stringify(item.response_options) : null,
      voice_archetype: item.voice_archetype,
      delivery_mechanism: item.delivery_mechanism,
      intent_primary: item.intent_primary,
      intent_secondary: item.intent_secondary,
      schemas: item.schemas || [],
      mindblock_codes: item.mindblock_codes || [],
      tags: item.tags || [],
      source_file: item.source_file || sourceFile,
      batch_id: batchId,
    }));

    const { error: stagingError } = await supabase
      .from('_stg_navicues_seed')
      .insert(stagingRecords);

    if (stagingError) {
      console.error('Staging insert error:', stagingError);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to insert to staging',
          details: stagingError.message 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Run import
    const { data: importResult, error: importError } = await supabase
      .rpc('import_navicues_from_staging', {
        p_batch_id: batchId,
        p_clear_batch: false, // Keep staging for audit
      });

    if (importError) {
      console.error('Import error:', importError);
      return new Response(
        JSON.stringify({ 
          error: 'Import failed',
          details: importError.message 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Return success
    return new Response(
      JSON.stringify({
        ok: true,
        dry_run: false,
        batch_id: batchId,
        inserted_to_staging: items.length,
        summary: importResult || [],
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

/**
 * Parse CSV to NavicueSeed[]
 * 
 * Header: navicue_id,name,title,family,pillar_id,kbe_layer,track,text_line,response_type,response_options,voice_archetype,delivery_mechanism,intent_primary,intent_secondary,schemas,mindblock_codes,tags,source_file
 * Arrays: pipe-delimited (control|victimhood)
 */
function parseCSV(csvText: string): NavicueSeed[] {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const items: NavicueSeed[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const row: any = {};

    headers.forEach((header, idx) => {
      const value = values[idx] || '';
      
      // Parse arrays (pipe-delimited)
      if (['schemas', 'mindblock_codes', 'tags'].includes(header)) {
        row[header] = value ? value.split('|').map(s => s.trim()) : [];
      }
      // Parse JSON (response_options)
      else if (header === 'response_options') {
        try {
          row[header] = value ? JSON.parse(value) : null;
        } catch {
          row[header] = null;
        }
      }
      // String fields
      else {
        row[header] = value || null;
      }
    });

    // Validate required fields
    if (row.navicue_id && row.text_line && row.response_type) {
      items.push(row as NavicueSeed);
    }
  }

  return items;
}
