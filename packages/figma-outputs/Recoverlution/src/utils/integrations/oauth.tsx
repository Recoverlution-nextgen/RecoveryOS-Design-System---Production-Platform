/**
 * UNIVERSAL OAUTH HANDLER
 * 
 * One pattern for all integrations: Oura, Strava, Google Calendar, Outlook, etc.
 * Add new provider = add config to providers object, no new code needed
 */

export interface OAuthProvider {
  name: string;
  authUrl: string;
  tokenUrl: string;
  clientId: string;
  clientSecret: string;
  scope: string;
  redirectUri: string;
}

export const providers: Record<string, OAuthProvider> = {
  oura: {
    name: 'Oura Ring',
    authUrl: 'https://cloud.ouraring.com/oauth/authorize',
    tokenUrl: 'https://api.ouraring.com/oauth/token',
    clientId: import.meta.env.VITE_OURA_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_OURA_CLIENT_SECRET || '',
    scope: 'daily',
    redirectUri: `${window.location.origin}/integrations/callback/oura`
  },
  
  strava: {
    name: 'Strava',
    authUrl: 'https://www.strava.com/oauth/authorize',
    tokenUrl: 'https://www.strava.com/oauth/token',
    clientId: import.meta.env.VITE_STRAVA_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_STRAVA_CLIENT_SECRET || '',
    scope: 'activity:read_all',
    redirectUri: `${window.location.origin}/integrations/callback/strava`
  },
  
  google_fit: {
    name: 'Google Fit',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET || '',
    scope: 'https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.sleep.read',
    redirectUri: `${window.location.origin}/integrations/callback/google_fit`
  },
  
  google_calendar: {
    name: 'Google Calendar',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET || '',
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    redirectUri: `${window.location.origin}/integrations/callback/google_calendar`
  },
  
  outlook: {
    name: 'Outlook Calendar',
    authUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    clientId: import.meta.env.VITE_OUTLOOK_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_OUTLOOK_CLIENT_SECRET || '',
    scope: 'Calendars.Read offline_access',
    redirectUri: `${window.location.origin}/integrations/callback/outlook`
  }
};

/**
 * Initiate OAuth flow - redirects user to provider's consent screen
 */
export function initiateOAuth(providerId: string) {
  const provider = providers[providerId];
  if (!provider) {
    throw new Error(`Unknown provider: ${providerId}`);
  }

  const params = new URLSearchParams({
    client_id: provider.clientId,
    redirect_uri: provider.redirectUri,
    response_type: 'code',
    scope: provider.scope,
    // Add state for CSRF protection
    state: btoa(JSON.stringify({ 
      provider: providerId, 
      timestamp: Date.now(),
      csrf: crypto.randomUUID()
    }))
  });

  window.location.href = `${provider.authUrl}?${params}`;
}

/**
 * Exchange authorization code for access token
 * Called from callback route after user approves
 */
export async function exchangeCodeForToken(
  providerId: string,
  code: string
): Promise<{ access_token: string; refresh_token: string; expires_in: number }> {
  const provider = providers[providerId];
  
  const response = await fetch(provider.tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: provider.clientId,
      client_secret: provider.clientSecret,
      redirect_uri: provider.redirectUri
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed: ${error}`);
  }

  return response.json();
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(
  providerId: string,
  refreshToken: string
): Promise<{ access_token: string; expires_in: number }> {
  const provider = providers[providerId];
  
  const response = await fetch(provider.tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: provider.clientId,
      client_secret: provider.clientSecret
    })
  });

  if (!response.ok) {
    throw new Error('Token refresh failed');
  }

  return response.json();
}
