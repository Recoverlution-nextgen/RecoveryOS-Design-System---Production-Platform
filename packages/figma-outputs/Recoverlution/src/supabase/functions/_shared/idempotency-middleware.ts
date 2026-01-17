/**
 * IDEMPOTENCY MIDDLEWARE
 * 
 * Ensures write operations are idempotent using the public.idempotency_keys table.
 * Prevents duplicate requests and returns cached responses.
 * 
 * USAGE:
 *   const idempotencyKey = c.req.header('Idempotency-Key');
 *   if (!idempotencyKey) return c.json({ error: 'Idempotency-Key header required' }, 400);
 *   
 *   const cached = await checkIdempotency(supabase, idempotencyKey, endpoint, userId);
 *   if (cached) return c.json(cached.response, cached.status);
 *   
 *   // ... process request ...
 *   
 *   await storeIdempotency(supabase, idempotencyKey, endpoint, userId, requestHash, response, status);
 */

import { createClient } from 'jsr:@supabase/supabase-js@2';

export interface IdempotencyCacheResult {
  response: any;
  status: number;
}

/**
 * Generate a hash of the request body for duplicate detection
 */
export function hashRequest(body: any): string {
  const str = JSON.stringify(body);
  // Simple hash function (you could use crypto for production)
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
}

/**
 * Check if this request has been processed before
 * Returns cached response if found
 */
export async function checkIdempotency(
  supabase: ReturnType<typeof createClient>,
  idempotencyKey: string,
  endpoint: string,
  userId?: string
): Promise<IdempotencyCacheResult | null> {
  try {
    const { data, error } = await supabase
      .from('idempotency_keys')
      .select('response_json')
      .eq('key', idempotencyKey)
      .eq('endpoint', endpoint)
      .maybeSingle();

    if (error) {
      console.error('[Idempotency] Check error:', error);
      return null;
    }

    if (data && data.response_json) {
      console.log(`[Idempotency] Cache hit for key: ${idempotencyKey}`);
      return {
        response: data.response_json.body || data.response_json,
        status: data.response_json.status || 200,
      };
    }

    return null;
  } catch (err) {
    console.error('[Idempotency] Check exception:', err);
    return null;
  }
}

/**
 * Store the response for future idempotency checks
 */
export async function storeIdempotency(
  supabase: ReturnType<typeof createClient>,
  idempotencyKey: string,
  endpoint: string,
  userId: string | undefined,
  requestHash: string,
  responseBody: any,
  statusCode: number
): Promise<void> {
  try {
    const responseJson = {
      status: statusCode,
      body: responseBody,
    };

    const { error } = await supabase
      .from('idempotency_keys')
      .insert({
        key: idempotencyKey,
        endpoint,
        user_id: userId || null,
        request_hash: requestHash,
        response_json: responseJson,
      });

    if (error) {
      // Ignore unique constraint violations (race condition - another request already stored it)
      if (!error.message?.includes('duplicate key') && !error.code?.includes('23505')) {
        console.error('[Idempotency] Store error:', error);
      }
    } else {
      console.log(`[Idempotency] Cached response for key: ${idempotencyKey}`);
    }
  } catch (err) {
    console.error('[Idempotency] Store exception:', err);
  }
}

/**
 * Require and validate idempotency key from headers
 * Returns error response if missing/invalid
 */
export function requireIdempotencyKey(c: any): { key?: string; error?: Response } {
  const key = c.req.header('Idempotency-Key');
  
  if (!key) {
    return {
      error: c.json(
        { 
          error: 'Idempotency-Key required',
          message: 'Write operations require an Idempotency-Key header to ensure safe retries'
        },
        400
      ),
    };
  }

  // Validate format (should be UUID or similar unique string)
  if (key.length < 16 || key.length > 128) {
    return {
      error: c.json(
        {
          error: 'Invalid Idempotency-Key',
          message: 'Idempotency-Key must be between 16 and 128 characters'
        },
        400
      ),
    };
  }

  return { key };
}
