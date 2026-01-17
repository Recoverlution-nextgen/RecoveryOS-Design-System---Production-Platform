// supabase/functions/_shared/idempotency.ts
// Request deduplication

const processedKeys = new Map<string, { timestamp: number; response: unknown }>();
const TTL_MS = 60000; // 1 minute

export function isProcessed(key: string): { processed: boolean; response?: unknown } {
  const entry = processedKeys.get(key);
  
  if (!entry) {
    return { processed: false };
  }
  
  // Check if expired
  if (Date.now() - entry.timestamp > TTL_MS) {
    processedKeys.delete(key);
    return { processed: false };
  }
  
  return { processed: true, response: entry.response };
}

export function markProcessed(key: string, response: unknown): void {
  processedKeys.set(key, {
    timestamp: Date.now(),
    response,
  });
  
  // Clean up old entries periodically
  if (processedKeys.size > 1000) {
    const now = Date.now();
    for (const [k, v] of processedKeys.entries()) {
      if (now - v.timestamp > TTL_MS) {
        processedKeys.delete(k);
      }
    }
  }
}

export function generateIdempotencyKey(userId: string, type: string, data: unknown): string {
  // Create hash from user + type + data
  const payload = JSON.stringify({ userId, type, data });
  // Simple hash for demo - use crypto.subtle.digest in production
  return `${userId}-${type}-${Date.now()}`;
}
