# 🚀 MEDIA ENRICHMENT SYSTEM - DEPLOYMENT GUIDE
## **Complete Setup: 3 Minutes**

---

## ✅ WHAT WE BUILT

A complete admin-gated media enrichment system:

1. **Backend Enrichment Logic** (`/supabase/functions/server/media-enrichment.tsx`)
   - Scans Supabase Storage buckets
   - Extracts metadata (size, MIME type, dimensions)
   - Stores enriched data in `media_assets` table
   - Supports filtering by prefix and force re-enrichment

2. **Admin Relay Function** (`/supabase/functions/relay_enrich_admin/index.ts`)
   - Validates user access_token
   - Checks `app_admins` table membership
   - Relays to internal endpoint with service role key
   - Rate limiting (10 requests/minute per user)
   - Audit logging

3. **Frontend UI** (`/components/admin/EnrichmentPanel.tsx`)
   - Clean infiniteK design
   - Admin-only access
   - Integrated into Command Center 2

4. **Database Tables** (Migration: `20260109_admin_enrichment_setup.sql`)
   - `app_admins` - Admin user registry
   - `enrichment_audit_log` - Request audit trail
   - `media_assets` - Enriched asset metadata

---

## 🚀 DEPLOYMENT STEPS

### **Step 1: Deploy Migration (30 seconds)**

```bash
# Deploy migration to create tables
supabase db push

# Or via SQL if you prefer:
psql $SUPABASE_DB_URL -f /supabase/migrations/20260109_admin_enrichment_setup.sql
```

**Creates:**
- ✅ `app_admins` table with RLS
- ✅ `enrichment_audit_log` table with RLS
- ✅ `media_assets` table with RLS
- ✅ Helper function: `get_enrichment_stats()`

---

### **Step 2: Add Yourself as Admin (10 seconds)**

```sql
-- First, find your user_id:
SELECT id, email FROM auth.users WHERE email = 'your@email.com';

-- Then insert into app_admins:
INSERT INTO app_admins (user_id, created_by, notes)
VALUES (
  'YOUR_USER_ID_HERE',  -- Replace with your actual user_id
  'migration',
  'Initial platform admin'
);

-- Verify:
SELECT 
  aa.user_id,
  u.email,
  aa.created_at
FROM app_admins aa
JOIN auth.users u ON u.id = aa.user_id;
```

**Expected output:**
```
user_id                               | email            | created_at
--------------------------------------|------------------|-------------------
a1b2c3d4-...                          | your@email.com   | 2026-01-09 ...
```

---

### **Step 3: Deploy Backend Server (1 minute)**

```bash
# Deploy the backend server with media enrichment routes
supabase functions deploy make-server-49b28b8a

# Verify deployment:
curl "https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/make-server-49b28b8a/health" \
  -H "Authorization: Bearer ${SUPABASE_ANON_KEY}"

# Expected: {"status":"ok","timestamp":"2026-01-09T..."}
```

---

### **Step 4: Deploy Relay Function (30 seconds)**

```bash
# Deploy the admin relay function
supabase functions deploy relay_enrich_admin

# Verify deployment:
supabase functions list

# Expected to see:
# relay_enrich_admin (active)
# make-server-49b28b8a (active)
```

---

### **Step 5: Test the System (1 minute)**

#### **Test 1: Verify Authentication (Should return 401)**

```bash
curl "https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/relay_enrich_admin"

# Expected:
# {"error":"Not authenticated. Please sign in."}
```

#### **Test 2: Verify Admin Access (Should succeed)**

```bash
# Get your access token (from your app after signing in)
# Or generate one via Supabase CLI:
supabase auth login

# Then call with your token:
curl "https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/relay_enrich_admin?force=false&prefix=dashboard-assets" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Expected:
# {
#   "ok": true,
#   "status": 200,
#   "result": {
#     "enriched_count": 15,
#     "skipped_count": 3,
#     "error_count": 0,
#     "total_processed": 18,
#     "prefix": "dashboard-assets",
#     "duration_ms": 2340
#   }
# }
```

#### **Test 3: Verify Non-Admin (Should return 403)**

```bash
# If you have a test non-admin user:
curl "https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/relay_enrich_admin" \
  -H "Authorization: Bearer NON_ADMIN_ACCESS_TOKEN"

# Expected:
# {
#   "error": "Admin access required. Your account is not in app_admins table."
# }
```

---

## 📊 HOW IT WORKS

### **Architecture Flow:**

```
┌─────────────────────────────────────────────────────────────────┐
│ Frontend (EnrichmentPanel.tsx)                                   │
│ - User clicks "Run enrichment"                                   │
│ - Gets user's access_token from Supabase Auth                    │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ Edge Function: relay_enrich_admin                                │
│ 1. Validate access_token → extract user_id                       │
│ 2. Check: user_id in app_admins? → Yes/No                        │
│ 3. If No → Return 403                                             │
│ 4. If Yes → Continue                                              │
│ 5. Check rate limit (10/min per user)                            │
│ 6. Sanitize prefix (no path traversal)                           │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ Internal Endpoint: /media-enrichment/internal/enrich             │
│ (Called with SUPABASE_SERVICE_ROLE_KEY)                          │
│                                                                   │
│ 1. List storage buckets (filter by prefix if provided)           │
│ 2. For each bucket:                                               │
│    - List all files                                               │
│    - Check if already enriched (skip if not force=true)          │
│    - Extract metadata (size, MIME, dimensions)                   │
│    - Upsert to media_assets table                                │
│ 3. Return: { enriched_count, skipped_count, errors, duration }   │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ Database Updates                                                  │
│ - media_assets: New/updated rows with enriched metadata          │
│ - enrichment_audit_log: Audit record of the request              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔍 VERIFY ENRICHMENT RESULTS

### **Check Media Assets Table:**

```sql
-- Count enriched assets
SELECT COUNT(*) FROM media_assets;

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

-- Get enrichment stats
SELECT get_enrichment_stats();
```

**Expected output:**
```json
{
  "total_assets": 42,
  "by_mime_type": {
    "image/jpeg": 15,
    "image/png": 10,
    "video/mp4": 8,
    "audio/mpeg": 9
  },
  "by_bucket": {
    "dashboard-assets": 25,
    "audio": 17
  },
  "recent_enrichments": 42,
  "total_size_mb": 125.34
}
```

---

### **Check Audit Log:**

```sql
-- View recent enrichment requests
SELECT 
  requested_by,
  requested_at,
  force,
  prefix,
  upstream_status,
  ok,
  result->>'enriched_count' as enriched,
  result->>'duration_ms' as duration_ms
FROM enrichment_audit_log
ORDER BY requested_at DESC
LIMIT 10;
```

**Expected output:**
```
requested_by | requested_at       | force | prefix           | status | ok | enriched | duration_ms
-------------|-------------------|-------|------------------|--------|----|---------|-----------
a1b2c3...    | 2026-01-09 14:30  | false | dashboard-assets | 200    | t  | 15      | 2340
a1b2c3...    | 2026-01-09 14:25  | true  |                  | 200    | t  | 42      | 5680
```

---

## 🎨 USING THE UI

### **Access the Panel:**

1. Navigate to **Command Center 2** in your app
2. Sign in as a platform admin (must be in `app_admins` table)
3. Click **"Media Enrichment"** studio card (cyan accent)

### **Configure & Run:**

1. **Prefix (optional):** Enter bucket/path to limit scope
   - Examples:
     - `dashboard-assets` - Only that bucket
     - `dashboard-assets/images/` - Only images folder
     - Leave empty for all buckets

2. **Force:** Check to re-process existing assets
   - Unchecked: Skip already enriched assets
   - Checked: Re-process everything

3. Click **"Run enrichment"**

4. Wait for completion (typically 1-5 seconds per 10 files)

5. View results:
   - Success banner with counts
   - Full JSON response
   - Error messages (if any)

---

## 📋 COMMON USE CASES

### **Use Case 1: Initial Enrichment**
```
Goal: Enrich all media assets for the first time
Prefix: (leave empty)
Force: ☐ unchecked
→ Processes all unenriched assets
```

### **Use Case 2: Update Schema Tags**
```
Goal: Re-process all assets after schema changes
Prefix: (leave empty)
Force: ☑ checked
→ Re-processes ALL assets with new schema logic
```

### **Use Case 3: Fix Specific Bucket**
```
Goal: Re-enrich just the dashboard-assets bucket
Prefix: dashboard-assets
Force: ☑ checked
→ Re-processes only dashboard-assets bucket
```

### **Use Case 4: Enrich New Uploads**
```
Goal: Enrich recently uploaded files
Prefix: uploads/2026-01-09/
Force: ☐ unchecked
→ Processes only new uploads from today
```

---

## 🛡️ SECURITY FEATURES

✅ **Admin Gating:**
- Only users in `app_admins` table can trigger enrichment
- 403 error if not admin

✅ **Token Validation:**
- User must be authenticated (valid access_token)
- 401 error if not authenticated

✅ **Rate Limiting:**
- 10 requests per minute per user
- 429 error if exceeded

✅ **Prefix Sanitization:**
- Removes path traversal attempts (`../`)
- Strips dangerous characters
- Max length: 200 characters

✅ **Service Key Protection:**
- Service role key NEVER exposed to client
- Only used server-side in relay function

✅ **Audit Trail:**
- Every request logged to `enrichment_audit_log`
- Includes: user, timestamp, params, result, errors

---

## 🐛 TROUBLESHOOTING

### **Error: "Not authenticated"**
```
Cause: No access_token or expired token
Fix: Sign in again, ensure frontend passes valid token
```

### **Error: "Admin access required"**
```
Cause: User not in app_admins table
Fix: Add user_id to app_admins:
  INSERT INTO app_admins (user_id, created_by)
  VALUES ('USER_ID', 'manual');
```

### **Error: "Rate limit exceeded"**
```
Cause: More than 10 requests in 1 minute
Fix: Wait 1 minute or increase rate limit in relay function
```

### **Error: "Failed to list storage buckets"**
```
Cause: Service role key issue or permissions
Fix: Verify SUPABASE_SERVICE_ROLE_KEY env var is set correctly
```

### **No assets enriched (enriched_count: 0)**
```
Cause: All assets already enriched, force=false
Fix: Set force=true to re-process existing assets
```

---

## 🎯 NEXT STEPS

### **Add More Admins:**

```sql
-- Add another admin
INSERT INTO app_admins (user_id, created_by, notes)
VALUES (
  'ANOTHER_USER_ID',
  'your@email.com',
  'Added for media management'
);
```

### **Schedule Regular Enrichment:**

Set up a cron job (e.g., GitHub Actions) to auto-enrich new uploads:

```yaml
name: Auto-Enrich Media
on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM

jobs:
  enrich:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Enrichment
        run: |
          curl -X GET \
            "https://${{ secrets.SUPABASE_PROJECT_ID }}.supabase.co/functions/v1/relay_enrich_admin?force=false" \
            -H "Authorization: Bearer ${{ secrets.ADMIN_ACCESS_TOKEN }}"
```

### **Monitor Enrichment Stats:**

Add a dashboard query:

```sql
-- Daily enrichment activity
SELECT 
  DATE(requested_at) as date,
  COUNT(*) as requests,
  SUM((result->>'enriched_count')::int) as total_enriched,
  AVG((result->>'duration_ms')::int) as avg_duration_ms
FROM enrichment_audit_log
WHERE requested_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(requested_at)
ORDER BY date DESC;
```

---

## ✅ DEPLOYMENT CHECKLIST

- [ ] Migration deployed (`supabase db push`)
- [ ] Your user_id added to `app_admins` table
- [ ] Backend server deployed (`supabase functions deploy make-server-49b28b8a`)
- [ ] Relay function deployed (`supabase functions deploy relay_enrich_admin`)
- [ ] Tested: 401 without auth ✓
- [ ] Tested: 403 for non-admin ✓
- [ ] Tested: 200 for admin with small prefix ✓
- [ ] Verified: `media_assets` populated ✓
- [ ] Verified: `enrichment_audit_log` has records ✓
- [ ] UI accessible in Command Center 2 ✓

---

## 📝 SUMMARY

**Status:** ✅ Complete and ready to deploy

**What to do now:**

1. Run migration: `supabase db push`
2. Add your user_id to `app_admins` (SQL above)
3. Deploy backend: `supabase functions deploy make-server-49b28b8a`
4. Deploy relay: `supabase functions deploy relay_enrich_admin`
5. Test in UI: Command Center 2 → Media Enrichment
6. Start with small prefix, then expand

**Total deployment time: ~3 minutes**

**Your media assets will be fully queryable by schema, MIME type, tags, and metadata!** 🎯
