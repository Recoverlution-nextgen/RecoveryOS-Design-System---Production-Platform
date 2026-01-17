# ✅ Deployment Checklist

## Pre-Deployment Verification

### **1. File Structure ✅**
- [x] Middleware moved to `/_shared/` directory
- [x] No subdirectories in `/server/` folder
- [x] All imports use correct `../_shared/` paths
- [x] File extensions changed to `.ts` (not `.tsx`)

### **2. Import Paths ✅**
- [x] `/server/notifications.tsx` imports from `../_shared/`
- [x] No other files reference old `./middleware/` paths
- [x] All imports use relative paths correctly

### **3. Files Created ✅**
- [x] `/_shared/validation.ts`
- [x] `/_shared/idempotency-middleware.ts`
- [x] `/_shared/observability.ts`
- [x] `/server/notifications.tsx`
- [x] Journey status endpoint added to `/server/journey-runtime.tsx`
- [x] Notifications routes wired into `/server/index.tsx`

### **4. Files Deleted ✅**
- [x] `/server/middleware/validation.tsx` (deleted)
- [x] `/server/middleware/idempotency.tsx` (deleted)
- [x] `/server/middleware/observability.tsx` (deleted)
- [x] `/server/middleware/README.md` (moved)

---

## Expected Deployment Result

### **Success Indicators:**
1. ✅ No "Module not found" errors
2. ✅ Edge Function compiles successfully
3. ✅ Health endpoint responds: `/make-server-49b28b8a/health`
4. ✅ Notifications routes accessible: `/make-server-49b28b8a/notifications/unread`
5. ✅ Journey status endpoint works: `/make-server-49b28b8a/journey/instance/:id/status`

### **Test Commands:**
```bash
# Test health endpoint
curl https://wzeqlkbmqxlsjryidagf.supabase.co/functions/v1/make-server-49b28b8a/health

# Expected: {"status":"ok","timestamp":"..."}

# Test notifications (requires auth token)
curl -X GET \
  https://wzeqlkbmqxlsjryidagf.supabase.co/functions/v1/make-server-49b28b8a/notifications/unread \
  -H "Authorization: Bearer YOUR_TOKEN"

# Expected: {"notifications":[...],"count":0}
```

---

## Post-Deployment Verification

### **1. Check Logs**
- [ ] Go to Supabase Dashboard → Edge Functions → server → Logs
- [ ] Verify no import errors
- [ ] Verify function starts successfully

### **2. Test Endpoints**
- [ ] Test `/health` endpoint (should return 200)
- [ ] Test `/notifications/unread` with auth token
- [ ] Test journey status endpoint
- [ ] Verify middleware is being applied (check activity logs)

### **3. Test Realtime**
- [ ] Subscribe to `user:{id}:notifications` channel
- [ ] Insert notification in database
- [ ] Verify realtime event received
- [ ] Test feed channel similarly

### **4. Test Idempotency**
- [ ] Send POST request twice with same Idempotency-Key
- [ ] Verify second request returns cached response
- [ ] Check `idempotency_keys` table for entry

### **5. Test Validation**
- [ ] Send request with invalid UUID
- [ ] Verify 422 response with `field_errors`
- [ ] Check error format matches spec

---

## Rollback Plan (If Needed)

**If deployment fails:**

1. Check error logs in Dashboard → Edge Functions → Logs
2. Verify import paths are correct
3. Ensure all files in `_shared` are `.ts` not `.tsx`
4. Check for typos in import statements
5. Verify Deno.env variables are set (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

**Common Issues:**
- ❌ Import path typo (e.g., `./shared` instead of `../_shared`)
- ❌ Missing file extension (e.g., `.ts` required in Deno)
- ❌ Wrong file extension (`.tsx` when should be `.ts`)
- ❌ Missing environment variable

---

## Success Criteria

**Deployment is successful when:**
1. ✅ Edge Function deploys without errors
2. ✅ Health endpoint returns 200 OK
3. ✅ Notifications API returns proper responses
4. ✅ Journey status endpoint works
5. ✅ Middleware applies correctly (validation/idempotency/logging)
6. ✅ Realtime subscriptions receive events
7. ✅ No console errors in function logs

---

## Next Steps After Successful Deployment

1. **Frontend Integration:**
   - Add `Idempotency-Key` headers to write operations
   - Set up realtime subscriptions
   - Handle 422 validation errors
   - Build notification UI components

2. **Monitoring:**
   - Set up alerts for error rates
   - Monitor activity logs table
   - Track idempotency cache hit rates
   - Watch realtime channel usage

3. **Testing:**
   - End-to-end notification flow
   - Journey progress tracking
   - Idempotency with concurrent requests
   - Validation error handling
   - Realtime message delivery

---

## 🎉 READY TO DEPLOY!

All files are in place with correct import paths. The Edge Function should deploy successfully now.

**Deploy Command (if manual):**
```bash
supabase functions deploy server
```

**Or** the Make platform should auto-deploy on save.
