# ✅ SYNTHETICS DEPLOYMENT (CORRECTED ARCHITECTURE)

## 🎯 CORRECT THREE-TIER ARCHITECTURE

```
Frontend → Backend Server → Database
           (/make-server-49b28b8a)
```

All synthetics logic lives in `/supabase/functions/server/` directory:
- ✅ `synthetics-control.tsx` - API endpoints
- ✅ `synthetics-runner.ts` - Core generation logic

**Cron calls backend server:**
```
GitHub Actions → /make-server-49b28b8a/synthetics/run-now → Database
```

---

## 📦 WHAT WAS FIXED

### ❌ WRONG (Before)
- Standalone Edge Function `/supabase/functions/synthetics/`
- Frontend calling multiple services
- Fragmented architecture

### ✅ CORRECT (Now)
- Everything in backend server `/supabase/functions/server/`
- Single entry point for all synthetics operations
- Clean three-tier architecture

---

## 🚀 DEPLOYMENT STEPS

### **Step 1: Deploy Migration** (1 min)

```bash
supabase db push
```

Creates:
- `synthetic_settings` table
- `sim_users` table
- Helper functions

**Verify:**
```sql
SELECT * FROM synthetic_settings;
-- Should return 1 row with default settings
```

---

### **Step 2: Backfill sim_users** (1 min)

If you already ran `seed-synthetics` before:

```bash
# Via psql
psql $DATABASE_URL -f /supabase/migrations/20260109_backfill_sim_users.sql
```

**Or via Supabase Dashboard:**
1. Go to SQL Editor
2. Copy/paste contents of `/supabase/migrations/20260109_backfill_sim_users.sql`
3. Run

**Verify:**
```sql
SELECT COUNT(*) FROM sim_users;
-- Should return: 3000
```

**If 0 users:** Re-run seed function (it now populates sim_users):
```bash
supabase functions deploy seed-synthetics
curl -X POST \
  https://YOUR_PROJECT.supabase.co/functions/v1/seed-synthetics \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY"
```

---

### **Step 3: Deploy Backend Server** (1 min)

```bash
# Deploy the main backend (already includes synthetics modules)
supabase functions deploy make-server-49b28b8a
```

**Verify:**
```bash
curl "https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/status" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

**Expected response:**
```json
{
  "settings": {
    "enabled": true,
    "sessions_per_min": 2,
    "max_per_run": 5,
    "error_rate": 0.05,
    "abandon_rate": 0.15
  },
  "activity": {
    "last_5_min": {
      "scene_events": 0,
      "mindblock_events": 0
    },
    "active_journeys": 0
  },
  "status": "running"
}
```

---

### **Step 4: Test Manual Run** (30 sec)

```bash
curl -X POST \
  "https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/run-now" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"target": 5}'
```

**Expected response:**
```json
{
  "success": true,
  "result": {
    "success": true,
    "sessions_created": 5,
    "scene_events_created": 23,
    "mindblock_events_created": 12,
    "settings": {
      "target": 5,
      "abandon_rate": 0.15,
      "error_rate": 0.05
    },
    "timestamp": "2026-01-09T19:15:00.000Z"
  }
}
```

---

### **Step 5: Set Up Cron** (2 min)

**RECOMMENDED: GitHub Actions**

Create `.github/workflows/synthetics-cron.yml`:

```yaml
name: Synthetics Continuous Data Generation
on:
  schedule:
    - cron: '*/1 * * * *' # Every minute
  workflow_dispatch:

jobs:
  generate-synthetic-data:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Synthetics Runner
        run: |
          curl -X POST \
            "https://${{ secrets.SUPABASE_PROJECT_ID }}.supabase.co/functions/v1/make-server-49b28b8a/synthetics/run-now" \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}" \
            -H "Content-Type: application/json" \
            -d '{"target": 3}' \
            --fail --silent --show-error
      
      - name: Log Result
        if: always()
        run: echo "Synthetics run completed at $(date)"
```

**Setup GitHub Secrets:**
1. Go to repo → Settings → Secrets and variables → Actions
2. Add:
   - `SUPABASE_PROJECT_ID`
   - `SUPABASE_ANON_KEY`
3. Commit workflow file
4. GitHub will run automatically every minute

**Alternative options:** See `/docs/SYNTHETICS_CRON_SETUP.md` for Vercel, Railway, pg_cron, etc.

---

### **Step 6: Verify It's Working** (2 min)

Wait 1-2 minutes after cron starts, then:

```sql
-- Check recent activity
SELECT COUNT(*) 
FROM journey_scene_events 
WHERE created_at > NOW() - INTERVAL '5 minutes'
  AND event_payload->>'synthetic' = 'true';
-- Expected: 10-50 events
```

**Or via API:**
```bash
curl "https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/status" \
  -H "Authorization: Bearer YOUR_ANON_KEY" | jq '.activity.last_5_min'
```

**Expected:**
```json
{
  "scene_events": 15,
  "mindblock_events": 8
}
```

---

## 📊 MONITORING

### **Via Synthetics Studio UI**

Navigate to: **Command Center 2 → Synthetics Studio**

Shows:
- Real-time status
- Activity (5 min, 24 hours)
- Active journeys
- Manual trigger controls

Auto-refreshes every 10 seconds.

---

### **Via API**

```bash
# Status
GET /make-server-49b28b8a/synthetics/status

# 24h activity
GET /make-server-49b28b8a/synthetics/activity/24

# Sim users count
GET /make-server-49b28b8a/synthetics/sim-users

# Manual trigger
POST /make-server-49b28b8a/synthetics/run-now {"target": 5}
```

---

### **Via Logs**

```bash
# Backend server logs
supabase functions logs make-server-49b28b8a --tail

# Filter for synthetics
supabase functions logs make-server-49b28b8a --tail | grep "synthetics"
```

---

## 🎛️ CONTROL

### **Pause**

```bash
curl -X POST \
  "https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/toggle" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"enabled": false}'
```

### **Resume**

```bash
curl -X POST \
  "https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/toggle" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"enabled": true}'
```

### **Adjust Rate**

```bash
curl -X POST \
  "https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/settings" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"sessions_per_min": 5}'
```

---

## 🔍 TROUBLESHOOTING

### **Problem: No sim_users**

```bash
# Check count
curl "https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/sim-users" \
  -H "Authorization: Bearer YOUR_ANON_KEY" | jq '.count'

# If 0, run backfill
psql $DATABASE_URL -f /supabase/migrations/20260109_backfill_sim_users.sql

# Or re-run seed function
supabase functions deploy seed-synthetics
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/seed-synthetics \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY"
```

---

### **Problem: Cron not working**

```bash
# Test manual trigger first
curl -X POST \
  "https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/run-now" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"target": 3}'

# If that works, issue is with cron service
# Check GitHub Actions logs or cron service dashboard
```

---

### **Problem: No recent activity**

```bash
# Check if enabled
curl "https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/status" \
  -H "Authorization: Bearer YOUR_ANON_KEY" | jq '.settings.enabled'

# If false, enable
curl -X POST \
  "https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/toggle" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"enabled": true}'
```

---

## 📈 EXPECTED METRICS

### **After 1 Hour**
- Scene events: ~120
- Mindblock events: ~60
- Journeys created: ~120
- Journeys completed: ~100

### **After 24 Hours**
- Scene events: ~2,880
- Mindblock events: ~1,440
- Total events: ~4,320
- Storage: ~50KB

---

## ✅ FINAL CHECKLIST

- [ ] Migration applied
- [ ] sim_users populated (3000)
- [ ] Backend server deployed
- [ ] Manual test successful
- [ ] Cron configured (GitHub Actions)
- [ ] Synthetics enabled
- [ ] Activity visible in last 5 min
- [ ] Synthetics Studio dashboard working

---

## 🎯 KEY ENDPOINTS

All endpoints go through backend server:

```
GET  /make-server-49b28b8a/synthetics/status
POST /make-server-49b28b8a/synthetics/toggle
POST /make-server-49b28b8a/synthetics/settings
POST /make-server-49b28b8a/synthetics/run-now        ← Cron calls this
GET  /make-server-49b28b8a/synthetics/activity/:hours
POST /make-server-49b28b8a/synthetics/cleanup
GET  /make-server-49b28b8a/synthetics/sim-users
```

---

## 📚 DOCUMENTATION

- `/docs/SYNTHETICS_SETUP.md` - Complete setup guide
- `/docs/SYNTHETICS_CRON_SETUP.md` - Cron configuration options
- `/docs/SYNTHETICS_QUICK_FIX.md` - Troubleshooting sim_users issue
- `/docs/SYNTHETICS_DEPLOYMENT_CHECKLIST.md` - This file

---

**ARCHITECTURE IS NOW CORRECT. READY TO DEPLOY.** 🚀
