# Shared Middleware Documentation

Production-grade middleware utilities for bulletproof API operations in Supabase Edge Functions.

## 📁 Files

### `validation.ts`
Request validation with 422 error responses

### `idempotency-middleware.ts`
Ensure write operations are safe to retry

### `observability.ts`
Log API requests for monitoring and debugging

---

## 📖 USAGE GUIDE

See `/DEPLOYMENT_SUMMARY.md` and `/FRONTEND_QUICK_REFERENCE.md` for complete documentation.

### Quick Example

```typescript
import { validateRequest } from '../_shared/validation.ts';
import { requireIdempotencyKey, checkIdempotency, storeIdempotency, hashRequest } from '../_shared/idempotency-middleware.ts';
import { logActivity, RequestTimer } from '../_shared/observability.ts';

journey.post('/start', async (c) => {
  const timer = new RequestTimer();
  const supabase = getSupabaseClient();
  
  // 1. Auth
  const authResult = await getAuthUser(c);
  if (authResult.error) return authResult.error;
  
  // 2. Idempotency
  const idempotencyResult = requireIdempotencyKey(c);
  if (idempotencyResult.error) return idempotencyResult.error;
  const idempotencyKey = idempotencyResult.key!;
  
  const cached = await checkIdempotency(supabase, idempotencyKey, '/journey/start', userId);
  if (cached) return c.json(cached.response, cached.status);
  
  // 3. Validation
  const body = await c.req.json();
  const validation = validateRequest(body, {
    template_id: { required: true, type: 'uuid' },
  });
  if (validation.error) {
    return c.json({ error: 'Validation failed', field_errors: validation.error }, 422);
  }
  
  // 4. Business logic...
  const response = { instance: createdInstance };
  
  // 5. Cache & Log
  await storeIdempotency(supabase, idempotencyKey, '/journey/start', userId, hashRequest(body), response, 200);
  logActivity(supabase, { endpoint: '/journey/start', method: 'POST', statusCode: 200, duration: timer.elapsed(), userId, idempotencyKey });
  
  return c.json(response);
});
```

---

## 🔗 References

- Full documentation: `/DEPLOYMENT_SUMMARY.md`
- Frontend guide: `/FRONTEND_QUICK_REFERENCE.md`
