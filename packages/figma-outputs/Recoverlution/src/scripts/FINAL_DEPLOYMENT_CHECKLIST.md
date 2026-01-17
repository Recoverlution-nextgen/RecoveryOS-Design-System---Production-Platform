# ✅ ENRICHMENT SYSTEM - FINAL DEPLOYMENT CHECKLIST

---

## 🎯 CONCRETE ANSWERS TO YOUR QUESTIONS

### **1. Internal Enrichment Endpoint** ✅

**Correct endpoint:**
```
GET /functions/v1/make-server-49b28b8a/media-enrichment/internal/enrich
```

**Full URL:**
```
https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/make-server-49b28b8a/media-enrichment/internal/enrich?force=true&prefix=bucket
```

**Authorization:**
- Uses `SUPABASE_SERVICE_ROLE_KEY` (never exposed to client)

**Already configured in:**
- ✅ `/supabase/functions/relay_enrich_admin/index.ts` (UPDATED)
- ✅ `/supabase/functions/server/media-enrichment.tsx` (route exists)
- ✅ `/supabase/functions/server/index.tsx` (route mounted at line 92)

---

### **2. Admin UUIDs** 🔍

**You need to get your own UUID first. Here's how:**

#### **Option A: SQL Script (Recommended)**

1. Open the script: `/scripts/get-my-uuid-and-add-admin.sql`
2. Replace `'your@email.com'` with your actual email
3. Run STEP 1 to get your UUID
4. Copy the UUID
5. Uncomment STEP 3, paste your UUID, and run

#### **Option B: Supabase Dashboard**

1. Go to: Supabase Dashboard → SQL Editor
2. Run:
   ```sql
   SELECT id, email FROM auth.users WHERE email = 'your@email.com';
   ```
3. Copy the `id` value
4. Run:
   ```sql
   INSERT INTO app_admins (user_id, created_by, notes)
   VALUES ('YOUR_UUID', 'self-service', 'Platform admin')
   ON CONFLICT (user_id) DO NOTHING;
   ```

#### **Option C: Command Line**

```bash
# Get UUID
psql $SUPABASE_DB_URL -c "SELECT id, email FROM auth.users WHERE email = 'your@email.com';"

# Add as admin (replace YOUR_UUID)
psql $SUPABASE_DB_URL -c "INSERT INTO app_admins (user_id, created_by) VALUES ('YOUR_UUID', 'cli') ON CONFLICT DO NOTHING;"
```

---

## 📋 DEPLOYMENT STEPS (In Order)

### **✅ Step 1: Deploy Migration**

```bash
supabase db push
```

**What this does:**
- Creates `app_admins` table
- Creates `enrichment_audit_log` table
- Creates `media_assets` table
- Adds `get_enrichment_stats()` function
- Sets up RLS policies

**Verify:**
```sql
SELECT EXISTS (SELECT FROM pg_tables WHERE tablename = 'app_admins');
-- Should return: true
```

---

### **✅ Step 2: Add Yourself as Admin**

**Run the script:**
```bash
psql $SUPABASE_DB_URL -f /scripts/get-my-uuid-and-add-admin.sql
```

**Or use the SQL queries from Option A/B above.**

**Verify:**
```sql
SELECT * FROM app_admins;
-- Should show at least one row (you!)
```

---

### **✅ Step 3: Deploy Backend Server**

```bash
supabase functions deploy make-server-49b28b8a
```

**What this deploys:**
- All existing CC2 routes
- NEW: `/media-enrichment/internal/enrich` endpoint

**Verify:**
```bash
curl "https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/make-server-49b28b8a/health" \
  -H "Authorization: Bearer ${SUPABASE_ANON_KEY}"

# Expected: {"status":"ok","timestamp":"2026-01-09T..."}
```

---

### **✅ Step 4: Deploy Relay Function**

```bash
supabase functions deploy relay_enrich_admin
```

**What this deploys:**
- Admin-gated relay endpoint
- Token validation
- Admin check against `app_admins`
- Rate limiting (10/min per user)
- Audit logging

**Verify:**
```bash
supabase functions list | grep relay_enrich_admin
# Expected: relay_enrich_admin (active)
```

---

### **✅ Step 5: Test Authentication Flow**

#### **Test 1: No Auth (Should return 401)**

```bash
curl -i "https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/relay_enrich_admin"

# Expected:
# HTTP/1.1 401 Unauthorized
# {"error":"Not authenticated. Please sign in."}
```

#### **Test 2: With Your Token (Should return 200 if admin)**

```bash
# Get your access token from the app or via:
# supabase auth login

curl -i "https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/relay_enrich_admin?force=false&prefix=dashboard-assets" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Expected:
# HTTP/1.1 200 OK
# {"ok":true,"status":200,"result":{"enriched_count":...}}
```

#### **Test 3: Non-Admin User (Should return 403)**

```bash
# If you have a test non-admin user
curl -i "https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/relay_enrich_admin" \
  -H "Authorization: Bearer NON_ADMIN_TOKEN"

# Expected:
# HTTP/1.1 403 Forbidden
# {"error":"Admin access required. Your account is not in app_admins table."}
```

---

### **✅ Step 6: Test in UI**

1. Navigate to **Command Center 2**
2. Click **"Media Enrichment"** studio (platform_admin only)
3. Set:
   - Prefix: `dashboard-assets` (or leave empty)
   - Force: ☐ unchecked
4. Click **"Run enrichment"**
5. Should see:
   ```
   ✅ Enrichment Completed
   Enriched: 15 assets
   Skipped: 3 assets
   Errors: 0 assets
   Total processed: 18 assets
   Duration: 2.34s
   ```

---

### **✅ Step 7: Verify Database**

```sql
-- Check enriched assets
SELECT COUNT(*) as total_assets FROM media_assets;

-- View recent enrichments
SELECT 
  bucket_name,
  file_name,
  mime_type,
  size_bytes,
  enriched_at
FROM media_assets
ORDER BY enriched_at DESC
LIMIT 10;

-- Check audit log
SELECT 
  requested_at,
  force,
  prefix,
  upstream_status,
  ok,
  result->>'enriched_count' as enriched
FROM enrichment_audit_log
ORDER BY requested_at DESC
LIMIT 5;

-- Get stats
SELECT get_enrichment_stats();
```

---

## 🎯 AUDIT LOGGING (Already Included!)

The system already includes audit logging:

**Table:** `enrichment_audit_log`

**Logs:**
- request_id (UUID)
- requested_by (user_id)
- requested_at (timestamp)
- force (boolean)
- prefix (string)
- upstream_status (HTTP status)
- ok (success/failure)
- error_text (if failed)
- result (full JSON response)

**Written by:** `relay_enrich_admin` Edge Function (best effort, doesn't fail request if log fails)

**Query recent logs:**
```sql
SELECT 
  u.email,
  eal.requested_at,
  eal.force,
  eal.prefix,
  eal.upstream_status,
  eal.result->>'enriched_count' as enriched,
  eal.result->>'duration_ms' as duration_ms
FROM enrichment_audit_log eal
JOIN auth.users u ON u.id = eal.requested_by
ORDER BY eal.requested_at DESC
LIMIT 10;
```

---

## 📊 WHAT'S READY

### **Backend:**
- ✅ Media enrichment logic (`/supabase/functions/server/media-enrichment.tsx`)
- ✅ Admin relay function (`/supabase/functions/relay_enrich_admin/index.ts`)
- ✅ Route mounted in server (`/supabase/functions/server/index.tsx`)
- ✅ Correct endpoint path configured

### **Database:**
- ✅ `app_admins` table (with RLS)
- ✅ `enrichment_audit_log` table (with RLS)
- ✅ `media_assets` table (with RLS)
- ✅ `get_enrichment_stats()` helper function

### **Frontend:**
- ✅ EnrichmentPanel component (`/components/admin/EnrichmentPanel.tsx`)
- ✅ Integrated into CC2 (`/components/cc2/CC2Layout.tsx`)
- ✅ Studio card in CC2Home (`/components/cc2/CC2Home.tsx`)
- ✅ Error messages with inline instructions

### **Documentation:**
- ✅ Deployment guide (`/docs/ENRICHMENT_DEPLOYMENT_GUIDE.md`)
- ✅ Fix admin error (`/docs/FIX_ADMIN_ERROR.md`)
- ✅ Complete system docs (`/docs/ENRICHMENT_SYSTEM_COMPLETE.md`)
- ✅ Helper SQL script (`/scripts/get-my-uuid-and-add-admin.sql`)

---

## 🚀 QUICK START (TL;DR)

```bash
# 1. Deploy migration
supabase db push

# 2. Get your UUID and add as admin
psql $SUPABASE_DB_URL -f /scripts/get-my-uuid-and-add-admin.sql
# (Follow the script instructions)

# 3. Deploy backend
supabase functions deploy make-server-49b28b8a

# 4. Deploy relay
supabase functions deploy relay_enrich_admin

# 5. Test in UI
# Go to Command Center 2 → Media Enrichment → Run enrichment
```

**Total time: ~5 minutes**

---

## 📖 NEXT STEPS AFTER DEPLOYMENT

### **1. Run Initial Enrichment**

Start with a small prefix to verify:
```
Prefix: dashboard-assets
Force: ☐ unchecked
```

Then expand to full enrichment:
```
Prefix: (empty)
Force: ☐ unchecked
```

### **2. Add More Admins (Optional)**

```sql
-- Get other user UUIDs
SELECT id, email FROM auth.users;

-- Add them as admins
INSERT INTO app_admins (user_id, created_by, notes)
VALUES 
  ('USER_UUID_1', 'your@email.com', 'Secondary admin'),
  ('USER_UUID_2', 'your@email.com', 'Media admin');
```

### **3. Schedule Regular Enrichment (Optional)**

Create a cron job to auto-enrich new uploads:
```yaml
# .github/workflows/enrich-media.yml
name: Auto-Enrich Media
on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM
jobs:
  enrich:
    runs-on: ubuntu-latest
    steps:
      - run: |
          curl -X GET \
            "https://${{ secrets.SUPABASE_PROJECT_ID }}.supabase.co/functions/v1/relay_enrich_admin?force=false" \
            -H "Authorization: Bearer ${{ secrets.ADMIN_ACCESS_TOKEN }}"
```

---

## ✅ FINAL CHECKLIST

Before marking this complete, verify:

- [ ] Migration deployed (`supabase db push`)
- [ ] Your UUID added to `app_admins` table
- [ ] Backend server deployed (`make-server-49b28b8a`)
- [ ] Relay function deployed (`relay_enrich_admin`)
- [ ] Health check returns 200
- [ ] 401 test passes (no auth)
- [ ] 403 test passes (non-admin)
- [ ] 200 test passes (your admin account)
- [ ] UI accessible in Command Center 2
- [ ] Enrichment runs successfully
- [ ] `media_assets` table populated
- [ ] `enrichment_audit_log` has records

---

## 🎉 SUMMARY

**Status:** 🎯 **100% READY TO DEPLOY**

**Endpoint:** ✅ **CONFIGURED**
```
GET /functions/v1/make-server-49b28b8a/media-enrichment/internal/enrich
```

**Admin UUIDs:** 🔍 **USE SCRIPT**
```bash
psql $SUPABASE_DB_URL -f /scripts/get-my-uuid-and-add-admin.sql
```

**Audit Logging:** ✅ **ALREADY INCLUDED**
- Table: `enrichment_audit_log`
- Written by: `relay_enrich_admin`
- Fields: request_id, user_id, timestamp, params, result

**Ready to execute!** 🚀
