/**
 * RELAY_ENRICH_ADMIN EDGE FUNCTION
 * Admin-gated relay for media enrichment
 * 
 * Security:
 * - Validates user access_token
 * - Checks membership in app_admins table
 * - Relays to internal enrichment endpoint with service role key
 * - Never exposes service role key to client
 * 
 * Usage:
 * GET /relay_enrich_admin?force=true&prefix=bucket/path
 * Headers: Authorization: Bearer <user_access_token>
 * 
 * Returns:
 * { ok: boolean, status: number, result: {...} } or { error: string }
 */

import { createClient } from 'jsr:@supabase/supabase-js@2';

// Simple in-memory rate limiter
const rateLimiter = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute per user

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const userRequests = rateLimiter.get(userId) || [];
  
  // Remove old requests outside the window
  const recentRequests = userRequests.filter(
    timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS
  );
  
  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false; // Rate limit exceeded
  }
  
  // Add current request
  recentRequests.push(now);
  rateLimiter.set(userId, recentRequests);
  
  return true; // OK
}

function sanitizePrefix(prefix: string | null): string {
  if (!prefix) return '';
  
  // Remove dangerous characters and path traversal
  let clean = prefix
    .replace(/\.\./g, '') // No parent directory
    .replace(/[<>:"|?*]/g, '') // No special chars
    .trim();
  
  // Max length
  if (clean.length > 200) {
    clean = clean.substring(0, 200);
  }
  
  return clean;
}

Deno.serve(async (req: Request) => {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed. Use GET.' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const requestId = crypto.randomUUID();
  console.log(`[relay_enrich_admin] Request ${requestId} started`);

  try {
    // Extract authorization token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log(`[relay_enrich_admin] ${requestId}: No authorization header`);
      return new Response(
        JSON.stringify({ error: 'Not authenticated. Please sign in.' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');

    // Create Supabase client with service role key
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Validate user token and get user_id
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      console.log(`[relay_enrich_admin] ${requestId}: Invalid token`);
      return new Response(
        JSON.stringify({ error: 'Not authenticated. Please sign in again.' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = user.id;
    console.log(`[relay_enrich_admin] ${requestId}: User ${userId} authenticated`);

    // Check rate limit
    if (!checkRateLimit(userId)) {
      console.log(`[relay_enrich_admin] ${requestId}: Rate limit exceeded for user ${userId}`);
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if user is admin
    const { data: adminData, error: adminError } = await supabase
      .from('app_admins')
      .select('user_id')
      .eq('user_id', userId)
      .single();

    if (adminError || !adminData) {
      console.log(`[relay_enrich_admin] ${requestId}: User ${userId} not in app_admins`);
      return new Response(
        JSON.stringify({ 
          error: 'Admin access required. Your account is not in app_admins table.' 
        }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[relay_enrich_admin] ${requestId}: User ${userId} is admin ✓`);

    // Parse query params
    const url = new URL(req.url);
    const force = url.searchParams.get('force') === 'true';
    const prefix = sanitizePrefix(url.searchParams.get('prefix'));

    console.log(`[relay_enrich_admin] ${requestId}: Enrichment params: force=${force}, prefix=${prefix || '(all)'}`);

    // Build internal enrichment URL
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const internalUrl = new URL(`${supabaseUrl}/functions/v1/make-server-49b28b8a/media-enrichment/internal/enrich`);
    
    if (force) {
      internalUrl.searchParams.set('force', 'true');
    }
    if (prefix) {
      internalUrl.searchParams.set('prefix', prefix);
    }

    console.log(`[relay_enrich_admin] ${requestId}: Calling internal endpoint: ${internalUrl.toString()}`);

    // Call internal enrichment endpoint with service role key
    const enrichmentResponse = await fetch(internalUrl.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        'X-Request-Id': requestId,
      },
    });

    const enrichmentResult = await enrichmentResponse.json();

    console.log(`[relay_enrich_admin] ${requestId}: Upstream status ${enrichmentResponse.status}`);

    // Log to audit table (best effort, don't fail request if this fails)
    try {
      await supabase
        .from('enrichment_audit_log')
        .insert({
          request_id: requestId,
          requested_by: userId,
          force,
          prefix: prefix || null,
          upstream_status: enrichmentResponse.status,
          ok: enrichmentResponse.ok,
          error_text: enrichmentResponse.ok ? null : JSON.stringify(enrichmentResult),
        });
    } catch (auditError) {
      console.error(`[relay_enrich_admin] ${requestId}: Failed to write audit log:`, auditError);
      // Don't fail the request
    }

    // Return normalized response
    const response = {
      ok: enrichmentResponse.ok,
      status: enrichmentResponse.status,
      result: enrichmentResult,
    };

    return new Response(
      JSON.stringify(response),
      { 
        status: enrichmentResponse.status,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'X-Request-Id': requestId,
        } 
      }
    );

  } catch (error: any) {
    console.error(`[relay_enrich_admin] ${requestId}: Fatal error:`, error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});