import { createClient } from 'jsr:@supabase/supabase-js@2';

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 20; // 20 requests per minute (AI calls are expensive)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

Deno.serve(async (req: Request) => {
  // CORS headers
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, content-type',
      },
    });
  }

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, content-type',
    'Content-Type': 'application/json',
  };

  try {
    // 1. Auth: Validate access token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      console.error('[relay_ai_tagging] Missing or invalid Authorization header');
      return new Response(
        JSON.stringify({ ok: false, error: 'Unauthorized: Missing access token' }),
        { status: 401, headers: corsHeaders }
      );
    }

    const accessToken = authHeader.replace('Bearer ', '');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user?.id) {
      console.error('[relay_ai_tagging] Auth error:', authError);
      return new Response(
        JSON.stringify({ ok: false, error: 'Unauthorized: Invalid access token' }),
        { status: 401, headers: corsHeaders }
      );
    }

    const userId = user.id;
    console.log('[relay_ai_tagging] Request from user:', userId);

    // 2. Admin check: Verify user is in app_admins table
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: adminRecord, error: adminError } = await supabaseAdmin
      .from('app_admins')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle();

    if (adminError) {
      console.error('[relay_ai_tagging] Admin check error:', adminError);
      return new Response(
        JSON.stringify({ ok: false, error: 'Failed to verify admin status' }),
        { status: 500, headers: corsHeaders }
      );
    }

    if (!adminRecord) {
      console.warn('[relay_ai_tagging] Non-admin user attempted access:', userId);
      return new Response(
        JSON.stringify({ ok: false, error: 'Forbidden: Admin access required' }),
        { status: 403, headers: corsHeaders }
      );
    }

    // 3. Rate limiting
    const now = Date.now();
    const userLimit = rateLimitMap.get(userId);

    if (userLimit && userLimit.resetAt > now) {
      if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
        console.warn('[relay_ai_tagging] Rate limit exceeded for user:', userId);
        return new Response(
          JSON.stringify({ 
            ok: false, 
            error: 'Rate limit exceeded',
            details: `Max ${RATE_LIMIT_MAX_REQUESTS} requests per minute`
          }),
          { status: 429, headers: corsHeaders }
        );
      }
      userLimit.count++;
    } else {
      rateLimitMap.set(userId, {
        count: 1,
        resetAt: now + RATE_LIMIT_WINDOW_MS,
      });
    }

    // 4. Parse request
    const url = new URL(req.url);
    const endpoint = url.pathname.split('/').pop(); // analyze, batch, or apply

    let body;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ ok: false, error: 'Invalid JSON body' }),
        { status: 400, headers: corsHeaders }
      );
    }

    console.log('[relay_ai_tagging] Endpoint:', endpoint, 'Body:', body);

    // 5. Relay to internal server endpoint
    const serverUrl = `https://${Deno.env.get('SUPABASE_URL')?.split('//')[1]}/functions/v1/make-server-49b28b8a/ai-tagging/${endpoint}`;
    
    console.log('[relay_ai_tagging] Relaying to:', serverUrl);

    const upstreamResponse = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
      },
      body: JSON.stringify(body),
    });

    const upstreamData = await upstreamResponse.json();

    console.log('[relay_ai_tagging] Upstream response status:', upstreamResponse.status);

    // 6. Return upstream response
    return new Response(
      JSON.stringify(upstreamData),
      {
        status: upstreamResponse.status,
        headers: corsHeaders,
      }
    );

  } catch (error: any) {
    console.error('[relay_ai_tagging] Unexpected error:', error);
    return new Response(
      JSON.stringify({ ok: false, error: error.message || 'Internal server error' }),
      { status: 500, headers: corsHeaders }
    );
  }
});
