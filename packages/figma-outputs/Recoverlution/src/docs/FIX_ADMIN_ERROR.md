# 🔧 FIX: Admin Access Required Error

---

## ❌ ERROR

```
[EnrichmentPanel] Enrichment error: Error: Admin access required. Your account is not in app_admins table.
```

---

## ✅ SOLUTION (Choose One)

### **Option 1: Supabase Dashboard (Easiest)**

1. **Go to Supabase Dashboard**
   - https://supabase.com/dashboard/project/YOUR_PROJECT_ID

2. **Navigate to SQL Editor**
   - Click "SQL Editor" in left sidebar

3. **Get Your User ID**
   - Paste this SQL and click Run:
   ```sql
   SELECT id, email FROM auth.users WHERE email = 'your@email.com';
   ```
   - Copy your `id` (format: `a1b2c3d4-e5f6-...`)

4. **Add Yourself as Admin**
   - Paste this SQL (replace `YOUR_USER_ID`):
   ```sql
   INSERT INTO app_admins (user_id, created_by, notes)
   VALUES ('YOUR_USER_ID', 'self-service', 'Platform admin')
   ON CONFLICT (user_id) DO NOTHING;
   ```
   - Click Run

5. **Verify**
   - Run this to confirm:
   ```sql
   SELECT * FROM app_admins;
   ```
   - You should see your user_id in the list

6. **Refresh & Retry**
   - Go back to Media Enrichment panel
   - Try running enrichment again
   - Error should be gone! ✅

---

### **Option 2: Command Line (psql)**

1. **Set Environment Variable**
   ```bash
   export SUPABASE_DB_URL="postgresql://..."  # Your DB URL
   ```

2. **Get Your User ID**
   ```bash
   psql $SUPABASE_DB_URL -c "SELECT id, email FROM auth.users WHERE email = 'your@email.com';"
   ```

3. **Add Yourself as Admin**
   ```bash
   psql $SUPABASE_DB_URL -c "
     INSERT INTO app_admins (user_id, created_by, notes)
     VALUES ('YOUR_USER_ID', 'psql', 'Platform admin')
     ON CONFLICT (user_id) DO NOTHING;
   "
   ```

4. **Verify**
   ```bash
   psql $SUPABASE_DB_URL -c "SELECT * FROM app_admins;"
   ```

5. **Retry in UI**
   - Refresh Media Enrichment panel
   - Try again

---

### **Option 3: Use Helper Script**

1. **Run Migration**
   ```bash
   psql $SUPABASE_DB_URL -f /supabase/migrations/20260109_add_admin.sql
   ```

2. **Follow Instructions**
   - Script will show you the queries to run
   - Uncomment and replace YOUR_USER_ID
   - Run the modified script

---

## 🎯 QUICK REFERENCE

### **One-Liner (if you know your user_id)**

```bash
psql $SUPABASE_DB_URL -c "INSERT INTO app_admins (user_id, created_by) VALUES ('YOUR_USER_ID', 'quick-add') ON CONFLICT DO NOTHING;"
```

---

## 🔍 DEBUGGING

### **Check if app_admins Table Exists**

```sql
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'app_admins'
);
```

**If false:** Run the migration first:
```bash
supabase db push
# or
psql $SUPABASE_DB_URL -f /supabase/migrations/20260109_admin_enrichment_setup.sql
```

---

### **Check Your Current Admin Status**

```sql
SELECT 
  aa.user_id,
  u.email,
  aa.created_at,
  aa.created_by
FROM app_admins aa
JOIN auth.users u ON u.id = aa.user_id
WHERE u.email = 'your@email.com';
```

**If no rows returned:** You're not an admin yet (follow solution above)

---

### **List All Admins**

```sql
SELECT 
  aa.user_id,
  u.email,
  aa.created_at,
  aa.created_by,
  aa.notes
FROM app_admins aa
JOIN auth.users u ON u.id = aa.user_id
ORDER BY aa.created_at DESC;
```

---

## ⚠️ IMPORTANT

### **Why This Error Happens**

The Media Enrichment feature is admin-only because it:
- Accesses all storage buckets
- Can process/modify large amounts of data
- Uses privileged service role keys on the backend
- Requires database write permissions

**Security Design:**
- ✅ User access_token validated by Edge Function
- ✅ Membership checked in `app_admins` table
- ✅ Service role key never exposed to browser
- ✅ All requests logged in `enrichment_audit_log`

---

## 🎉 SUCCESS

After adding yourself to `app_admins`, you should:

1. ✅ See no more 403 errors
2. ✅ Be able to run enrichment
3. ✅ See success messages with metrics
4. ✅ View results in `media_assets` table

---

## 📋 VERIFICATION QUERIES

### **Check Media Assets After Enrichment**

```sql
-- Count enriched assets
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

-- Get stats
SELECT get_enrichment_stats();
```

---

### **Check Audit Log**

```sql
-- Recent enrichment requests
SELECT 
  requested_at,
  force,
  prefix,
  upstream_status,
  ok,
  result->>'enriched_count' as enriched,
  result->>'duration_ms' as duration_ms
FROM enrichment_audit_log
ORDER BY requested_at DESC
LIMIT 5;
```

---

## 🆘 STILL NOT WORKING?

### **Check These:**

1. **Migration Applied?**
   ```sql
   SELECT EXISTS (SELECT FROM pg_tables WHERE tablename = 'app_admins');
   ```
   If false, run: `supabase db push`

2. **Relay Function Deployed?**
   ```bash
   supabase functions list | grep relay_enrich_admin
   ```
   If not listed, run: `supabase functions deploy relay_enrich_admin`

3. **Backend Server Deployed?**
   ```bash
   curl "https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/health"
   ```
   If error, run: `supabase functions deploy make-server-49b28b8a`

4. **User ID Correct?**
   - Double-check you copied the full UUID
   - Format should be: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

5. **Signed In?**
   - Make sure you're logged in to the app
   - Try signing out and back in

---

## 📖 MORE INFO

- **Setup Guide:** `/docs/ENRICHMENT_DEPLOYMENT_GUIDE.md`
- **Full Documentation:** `/docs/ENRICHMENT_SYSTEM_COMPLETE.md`
- **Admin Helper SQL:** `/supabase/migrations/20260109_add_admin.sql`

---

## ✅ SUMMARY

**To fix the error:**

1. Get your user_id from `auth.users`
2. Insert into `app_admins` table
3. Refresh and retry

**Fastest method:**
- Supabase Dashboard → SQL Editor → Run queries above

**That's it!** 🎉
