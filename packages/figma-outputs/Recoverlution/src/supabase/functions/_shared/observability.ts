/**
 * OBSERVABILITY MIDDLEWARE
 * 
 * Logs API requests to public.activities for monitoring and debugging.
 * Uses non-blocking async logging to avoid impacting response times.
 * 
 * USAGE:
 *   const startTime = Date.now();
 *   try {
 *     // ... process request ...
 *     logActivity(supabase, { endpoint, method, statusCode: 200, duration: Date.now() - startTime, userId, idempotencyKey });
 *     return c.json(response);
 *   } catch (err) {
 *     logActivity(supabase, { endpoint, method, statusCode: 500, duration: Date.now() - startTime, userId, error: err.message });
 *     throw err;
 *   }
 */

import { createClient } from 'jsr:@supabase/supabase-js@2';

export interface ActivityLog {
  endpoint: string;
  method?: string;
  statusCode: number;
  duration: number;
  userId?: string;
  idempotencyKey?: string;
  error?: string;
  metadata?: Record<string, any>;
}

/**
 * Log API activity to the activities table
 * Non-blocking - uses setTimeout to avoid impacting response time
 */
export function logActivity(
  supabase: ReturnType<typeof createClient>,
  log: ActivityLog
): void {
  // Non-blocking async log
  setTimeout(async () => {
    try {
      const { error } = await supabase
        .from('activities')
        .insert({
          activity_type: 'api_request',
          user_id: log.userId || null,
          metadata: {
            endpoint: log.endpoint,
            method: log.method || 'UNKNOWN',
            status_code: log.statusCode,
            duration_ms: log.duration,
            idempotency_key: log.idempotencyKey,
            error: log.error,
            ...log.metadata,
          },
        });

      if (error) {
        console.error('[Observability] Failed to log activity:', error);
      }
    } catch (err) {
      console.error('[Observability] Exception logging activity:', err);
    }
  }, 0);
}

/**
 * Create a timing wrapper for route handlers
 * Automatically logs duration and status
 */
export function withObservability(
  handler: (c: any) => Promise<Response>,
  endpoint: string
) {
  return async (c: any) => {
    const startTime = Date.now();
    const method = c.req.method;
    const idempotencyKey = c.req.header('Idempotency-Key');
    
    // Extract user ID from auth header (if present)
    let userId: string | undefined;
    try {
      const authHeader = c.req.header('Authorization');
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        // We'll extract this in the handler if needed
        // For now, just note that auth is present
      }
    } catch (err) {
      // Ignore auth parsing errors in observability
    }

    try {
      const response = await handler(c);
      const duration = Date.now() - startTime;
      
      // Log successful request
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );
      
      logActivity(supabase, {
        endpoint,
        method,
        statusCode: response.status,
        duration,
        userId,
        idempotencyKey,
      });

      return response;
    } catch (err) {
      const duration = Date.now() - startTime;
      
      // Log failed request
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );
      
      logActivity(supabase, {
        endpoint,
        method,
        statusCode: 500,
        duration,
        userId,
        idempotencyKey,
        error: err.message || 'Unknown error',
      });

      throw err;
    }
  };
}

/**
 * Simple request timer utility
 */
export class RequestTimer {
  private startTime: number;

  constructor() {
    this.startTime = Date.now();
  }

  elapsed(): number {
    return Date.now() - this.startTime;
  }

  reset(): void {
    this.startTime = Date.now();
  }
}
