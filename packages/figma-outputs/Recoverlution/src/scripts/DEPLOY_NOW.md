# 🚀 DEPLOY NOW - QUICK REFERENCE

Your UUID: `01c6597f-bb21-4e02-ad66-44370743c223` ✅

---

## ⚡ ONE-COMMAND DEPLOYMENT

```bash
chmod +x ./scripts/deploy-enrichment.sh && ./scripts/deploy-enrichment.sh
```

**That's it!** The script will:
1. Deploy migration (creates tables)
2. Add you as admin
3. Deploy backend server
4. Deploy relay function
5. Verify everything works

---

## 📋 OR MANUAL STEP-BY-STEP

### **Step 1: Deploy Migration**
```bash
supabase db push
```

### **Step 2: Add Your UUID as Admin**
```bash
psql $SUPABASE_DB_URL -f ./scripts/add-admin-01c6597f.sql
```

### **Step 3: Deploy Backend**
```bash
supabase functions deploy make-server-49b28b8a
```

### **Step 4: Deploy Relay**
```bash
supabase functions deploy relay_enrich_admin
```

### **Step 5: Test**
```bash
# Health check
curl "https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/make-server-49b28b8a/health"

# Test 401 (no auth)
curl -i "https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/relay_enrich_admin"

# Test 200 (with your token - get from app)
curl -i "https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/relay_enrich_admin?prefix=dashboard-assets" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## ✅ VERIFICATION QUERIES

### **Confirm You're Admin**
```sql
SELECT * FROM app_admins WHERE user_id = '01c6597f-bb21-4e02-ad66-44370743c223';
```

### **Check Tables Exist**
```sql
SELECT tablename FROM pg_tables 
WHERE tablename IN ('app_admins', 'enrichment_audit_log', 'media_assets');
```

### **View Enrichment Stats**
```sql
SELECT get_enrichment_stats();
```

---

## 🎯 TEST IN UI

1. Go to **Command Center 2**
2. Click **"Media Enrichment"** (platform_admin only)
3. Enter:
   - Prefix: `dashboard-assets`
   - Force: ☐ unchecked
4. Click **"Run enrichment"**
5. Should see: ✅ **Enrichment Completed**

---

## 📊 VIEW AUDIT LOGS

```sql
SELECT 
  requested_at,
  force,
  prefix,
  upstream_status,
  result->>'enriched_count' as enriched,
  result->>'duration_ms' as duration_ms
FROM enrichment_audit_log
ORDER BY requested_at DESC
LIMIT 10;
```

---

## 🔥 TROUBLESHOOTING

### **403 Error: "Admin access required"**
**Fix:**
```bash
psql $SUPABASE_DB_URL -f ./scripts/add-admin-01c6597f.sql
```

### **404 Error: Function not found**
**Fix:**
```bash
supabase functions deploy relay_enrich_admin
```

### **500 Error: Internal server error**
**Check logs:**
```bash
supabase functions logs relay_enrich_admin --tail
supabase functions logs make-server-49b28b8a --tail
```

### **View Backend Logs**
```bash
# Relay function logs
supabase functions logs relay_enrich_admin

# Backend server logs
supabase functions logs make-server-49b28b8a

# Follow logs live
supabase functions logs relay_enrich_admin --tail
```

---

## 📁 KEY FILES

| File | Purpose |
|------|---------|
| `/scripts/add-admin-01c6597f.sql` | Add your UUID as admin (ready to run) |
| `/scripts/deploy-enrichment.sh` | One-command deployment script |
| `/scripts/FINAL_DEPLOYMENT_CHECKLIST.md` | Complete reference guide |
| `/supabase/functions/relay_enrich_admin/index.ts` | Admin relay function |
| `/supabase/functions/server/media-enrichment.tsx` | Enrichment logic |
| `/components/admin/EnrichmentPanel.tsx` | UI component |

---

## 🎉 SUCCESS CHECKLIST

After deployment, verify:

- [ ] Migration deployed (`supabase db push`)
- [ ] UUID added to `app_admins` table
- [ ] Backend server deployed
- [ ] Relay function deployed
- [ ] Health check returns `{"status":"ok"}`
- [ ] 401 test passes (no auth → Unauthorized)
- [ ] 200 test passes (your token → Success)
- [ ] UI accessible in Command Center 2
- [ ] Enrichment runs without 403 error
- [ ] `media_assets` table has data
- [ ] `enrichment_audit_log` has records

---

## 🚀 READY TO DEPLOY!

**Recommended:** Use the one-command script:

```bash
chmod +x ./scripts/deploy-enrichment.sh && ./scripts/deploy-enrichment.sh
```

**Estimated time:** ~5 minutes

**Questions?** Check `/scripts/FINAL_DEPLOYMENT_CHECKLIST.md` for detailed guide.

---

**Your UUID:** `01c6597f-bb21-4e02-ad66-44370743c223` ✅  
**Endpoint:** `GET /functions/v1/make-server-49b28b8a/media-enrichment/internal/enrich` ✅  
**Audit Logging:** Already included in `enrichment_audit_log` ✅

**Everything is ready!** 🎯
