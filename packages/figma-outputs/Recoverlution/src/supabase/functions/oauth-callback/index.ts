/**
 * UNIVERSAL OAUTH CALLBACK HANDLER
 * Handles OAuth callbacks from ALL providers (Oura, Strava, Google, Outlook, etc.)
 */

import { createClient } from 'jsr:@supabase/supabase-js@2';
import { corsHeaders } from '../server/index.tsx';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const providers: Record<string, { tokenUrl: string; clientId: string; clientSecret: string }> = {
  oura: {
    tokenUrl: 'https://api.ouraring.com/oauth/token',
    clientId: Deno.env.get('OURA_CLIENT_ID')!,
    clientSecret: Deno.env.get('OURA_CLIENT_SECRET')!
  },
  strava: {
    tokenUrl: 'https://www.strava.com/oauth/token',
    clientId: Deno.env.get('STRAVA_CLIENT_ID')!,
    clientSecret: Deno.env.get('STRAVA_CLIENT_SECRET')!
  },
  google_fit: {
    tokenUrl: 'https://oauth2.googleapis.com/token',
    clientId: Deno.env.get('GOOGLE_CLIENT_ID')!,
    clientSecret: Deno.env.get('GOOGLE_CLIENT_SECRET')!
  },
  google_calendar: {
    tokenUrl: 'https://oauth2.googleapis.com/token',
    clientId: Deno.env.get('GOOGLE_CLIENT_ID')!,
    clientSecret: Deno.env.get('GOOGLE_CLIENT_SECRET')!
  },
  outlook: {
    tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    clientId: Deno.env.get('OUTLOOK_CLIENT_ID')!,
    clientSecret: Deno.env.get('OUTLOOK_CLIENT_SECRET')!
  }
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const provider = url.pathname.split('/').pop(); // /oauth-callback/oura → 'oura'
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (!provider || !code || !providers[provider]) {
      return new Response('Invalid request', { status: 400, headers: corsHeaders });
    }

    // Decode state to get user info
    const stateData = JSON.parse(atob(state!));
    
    // Get user from session (they should be logged in)
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response('Unauthorized', { status: 401, headers: corsHeaders });
    }

    const { data: { user } } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
    if (!user) {
      return new Response('Unauthorized', { status: 401, headers: corsHeaders });
    }

    // Exchange code for tokens
    const providerConfig = providers[provider];
    const tokenResponse = await fetch(providerConfig.tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: providerConfig.clientId,
        client_secret: providerConfig.clientSecret,
        redirect_uri: `${url.origin}/integrations/callback/${provider}`
      })
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error('Token exchange failed:', error);
      return new Response('Token exchange failed', { status: 500, headers: corsHeaders });
    }

    const tokens = await tokenResponse.json();

    // Store in database (encrypted)
    const expiresAt = new Date(Date.now() + (tokens.expires_in * 1000));
    
    const { error } = await supabase.from('integrations').upsert({
      patient_id: user.id,
      provider,
      access_token: tokens.access_token, // TODO: Encrypt with pgcrypto
      refresh_token: tokens.refresh_token,
      expires_at: expiresAt.toISOString(),
      status: 'active',
      last_sync: null
    }, {
      onConflict: 'patient_id,provider'
    });

    if (error) {
      console.error('Database error:', error);
      return new Response('Database error', { status: 500, headers: corsHeaders });
    }

    // Redirect back to integrations page with success
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': `${url.origin}/integrations?connected=${provider}`
      }
    });

  } catch (error) {
    console.error('OAuth callback error:', error);
    return new Response('Internal error', { status: 500, headers: corsHeaders });
  }
});
