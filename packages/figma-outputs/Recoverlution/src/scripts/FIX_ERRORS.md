# 🔧 FIX ENRICHMENT ERRORS

You're seeing these errors:
```
Could not find the 'bucket_name' column of 'media_assets' in the schema cache
TypeError: Failed to fetch
```

---

## 🚀 **QUICK FIX (Recommended)**

Run this one command:

```bash
chmod +x ./scripts/fix-enrichment-errors.sh && ./scripts/fix-enrichment-errors.sh
```

**What it does:**
1. Deploys the migration (creates `media_assets` table with `bucket_name` column)
2. Adds your UUID as admin
3. Deploys the relay function
4. Deploys the backend server

**Time:** ~3 minutes

---

## 📋 **MANUAL FIX (If Script Fails)**

### **Step 1: Deploy Migration**

```bash
supabase db push
```

This creates the `media_assets` table with all required columns including `bucket_name`.

**Verify it worked:**
```bash
psql $SUPABASE_DB_URL -c "SELECT column_name FROM information_schema.columns WHERE table_name = 'media_assets';"
```

You should see: `id, bucket_name, file_path, file_name, mime_type, size_bytes, width, height, duration_seconds, public_url, thumbnail_url, tags, metadata, enriched_at, created_at, updated_at`

---

### **Step 2: Add Your UUID as Admin**

```bash
psql $SUPABASE_DB_URL -f ./scripts/add-admin-01c6597f.sql
```

**Verify it worked:**
```bash
psql $SUPABASE_DB_URL -c "SELECT * FROM app_admins WHERE user_id = '01c6597f-bb21-4e02-ad66-44370743c223';"
```

You should see 1 row with your UUID.

---

### **Step 3: Deploy Functions**

```bash
# Deploy relay function (fixes "Failed to fetch")
supabase functions deploy relay_enrich_admin

# Deploy backend server (has the enrichment logic)
supabase functions deploy make-server-49b28b8a
```

**Verify functions are deployed:**
```bash
supabase functions list
```

You should see both `relay_enrich_admin` and `make-server-49b28b8a` listed.

---

## 🧪 **TEST IT WORKS**

### **Option 1: Test in UI**

1. Refresh your browser
2. Go to Command Center 2
3. Click "Media Enrichment"
4. Try running enrichment again
5. Should work without errors

### **Option 2: Test via curl**

```bash
# Get your access token first
# (Sign in to Recoverlution, open console, run:)
# const { data: { session } } = await supabase.auth.getSession(); console.log(session.access_token)

# Then test:
curl -i "https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/relay_enrich_admin?prefix=dashboard-assets" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Expected: HTTP/1.1 200 OK
```

---

## ❓ **WHY DID THIS HAPPEN?**

The migration file `/supabase/migrations/20260109_admin_enrichment_setup.sql` exists but wasn't applied to your database yet.

**Two possible reasons:**
1. You didn't run `supabase db push` after the migration was created
2. The migration ran but failed silently

**The fix:** Just run the migration now with `supabase db push`

---

## 🔍 **SQL-ONLY FIX (Alternative)**

If you prefer to use SQL directly:

```bash
psql $SUPABASE_DB_URL -f ./scripts/fix-enrichment-manual.sql
```

This SQL script:
- Checks if tables exist
- Creates them if missing
- Adds your UUID as admin
- Verifies everything is correct

---

## ✅ **VERIFICATION CHECKLIST**

After running the fix, verify:

- [ ] `media_assets` table exists with `bucket_name` column
- [ ] Your UUID (`01c6597f-bb21-4e02-ad66-44370743c223`) is in `app_admins` table
- [ ] `relay_enrich_admin` function is deployed
- [ ] `make-server-49b28b8a` function is deployed
- [ ] Enrichment works in UI without 403 or fetch errors

---

## 🆘 **STILL NOT WORKING?**

### **Check function logs:**
```bash
# Relay function logs
supabase functions logs relay_enrich_admin --tail

# Backend server logs
supabase functions logs make-server-49b28b8a --tail
```

### **Check database:**
```bash
# Verify tables exist
psql $SUPABASE_DB_URL -c "\dt"

# Check media_assets structure
psql $SUPABASE_DB_URL -c "\d media_assets"

# Verify you're admin
psql $SUPABASE_DB_URL -c "SELECT * FROM app_admins;"
```

### **Nuclear option (start fresh):**
```bash
# Drop and recreate (WARNING: deletes data!)
psql $SUPABASE_DB_URL -c "DROP TABLE IF EXISTS media_assets, enrichment_audit_log, app_admins CASCADE;"

# Then run migration
supabase db push

# Add admin
psql $SUPABASE_DB_URL -f ./scripts/add-admin-01c6597f.sql

# Deploy functions
supabase functions deploy relay_enrich_admin
supabase functions deploy make-server-49b28b8a
```

---

## 📖 **TL;DR**

**Just run:**
```bash
chmod +x ./scripts/fix-enrichment-errors.sh && ./scripts/fix-enrichment-errors.sh
```

**Or manually:**
```bash
supabase db push
psql $SUPABASE_DB_URL -f ./scripts/add-admin-01c6597f.sql
supabase functions deploy relay_enrich_admin
supabase functions deploy make-server-49b28b8a
```

That's it! 🎉
