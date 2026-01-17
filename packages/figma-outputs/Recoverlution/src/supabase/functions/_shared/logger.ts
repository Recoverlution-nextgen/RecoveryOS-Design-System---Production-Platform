// supabase/functions/_shared/logger.ts
// Minimal, dependency-free logger that writes request audit rows via REST.
// Uses service role for server-side logging. Safe to import in Edge Functions.

export interface LogExtra {
  function_slug?: string
  route?: string
  user_id?: string | null
  tenant_id?: string | null
  meta?: Record<string, unknown> | null
}

export async function logEdge(
  req: Request,
  resStatus: number,
  startedAt: number,
  extra?: LogExtra
) {
  try {
    const durationMs = Date.now() - startedAt
    const url = new URL(req.url)
    const route = extra?.route ?? url.pathname.replace(/^.*\/functions\/v1\//, '')
    
    const payload = {
      function_slug: extra?.function_slug ?? route.split('/')[0] ?? 'unknown-fn',
      route,
      method: req.method,
      status: resStatus,
      duration_ms: durationMs,
      user_id: extra?.user_id ?? null,
      tenant_id: extra?.tenant_id ?? null,
      meta: extra?.meta ?? null,
    }
    
    const api = Deno.env.get('SUPABASE_URL')
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!api || !key) return

    await fetch(`${api}/rest/v1/audit_edge_requests`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
    })
  } catch {
    // swallow logging errors
  }
}
