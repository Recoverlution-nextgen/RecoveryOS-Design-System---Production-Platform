# ✅ SYNTHETICS DEPLOYMENT CHECKLIST

Quick reference for deploying the continuous synthetic data automation system.

---

## 📦 WHAT WAS CREATED

### **1. Edge Function: Continuous Runner**
- **File:** `/supabase/functions/synthetics/index.ts`
- **What it does:** Creates realistic journey sessions with scene events and mindblock interactions
- **Endpoint:** `POST /functions/v1/synthetics/run`
- **Parameters:** `{ target?: number }` (optional override)

### **2. Database Migration**
- **File:** `/supabase/migrations/20260109_synthetics_tables.sql`
- **Creates:**
  - `synthetic_settings` table (configuration)
  - `sim_users` table (synthetic user profiles)
  - Helper functions (`get_synthetics_activity_summary`, `cleanup_old_synthetic_data`)
  - Indexes for performance
  - RLS policies

### **3. Setup Guide**
- **File:** `/docs/SYNTHETICS_SETUP.md`
- **Contents:** Complete deployment, configuration, monitoring, and troubleshooting guide

### **4. Diagnostic Component**
- **File:** `/components/SyntheticsDiagnostic.tsx`
- **What it does:** Visual diagnostic panel to verify system health
- **Usage:** Add to any page: `<SyntheticsDiagnostic />`

---

## 🚀 DEPLOYMENT STEPS (5 MINUTES)

### **Step 1: Deploy Migration** (1 min)
```bash
# Apply database tables and functions
supabase db push
```

**Verify:**
```sql
SELECT * FROM synthetic_settings;
-- Should return 1 row with default settings
```

---

### **Step 2: Deploy Edge Function** (1 min)
```bash
# Deploy the continuous runner
supabase functions deploy synthetics
```

**Verify:**
```bash
supabase functions list | grep synthetics
# Should show: synthetics | active | v1
```

---

### **Step 3: Seed Initial Data** (5-10 min one-time)
```bash
# Create 3,000 synthetic users + 36,000 engagements
curl -X POST \
  https://YOUR_PROJECT.supabase.co/functions/v1/seed-synthetics \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"count_users": 3000, "coverage_per_mindblock": 15}'
```

**Verify:**
```sql
SELECT COUNT(*) FROM sim_users;
-- Should return: 3000
```

---

### **Step 4: Enable Synthetics** (30 sec)
```bash
# Turn on continuous generation
curl -X POST \
  https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/toggle \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"enabled": true}'
```

**Verify:**
```bash
curl https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/status \
  -H "Authorization: Bearer YOUR_ANON_KEY"
# Should show: "status": "running"
```

---

### **Step 5: Set Up Cron** (2 min)

**Option A: Supabase Edge Function Cron**
Create `/supabase/functions/synthetics/deno.json`:
```json
{
  "cron": {
    "synthetics": {
      "schedule": "*/1 * * * *",
      "description": "Run synthetics every minute"
    }
  }
}
```

Deploy with cron:
```bash
supabase functions deploy synthetics --with-cron
```

**Option B: GitHub Actions**
Create `.github/workflows/synthetics-cron.yml`:
```yaml
name: Synthetics Cron
on:
  schedule:
    - cron: '*/1 * * * *'
jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - run: |
          curl -X POST \
            https://${{ secrets.SUPABASE_PROJECT_ID }}.supabase.co/functions/v1/synthetics/run \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}"
```

**Option C: Vercel Cron, Railway, etc.**
Use your preferred cron service to hit:
```
POST https://YOUR_PROJECT.supabase.co/functions/v1/synthetics/run
Authorization: Bearer YOUR_SERVICE_ROLE_KEY
```

---

### **Step 6: Verify It's Working** (1 min)

**Use the diagnostic component:**
1. Add to any page: `import SyntheticsDiagnostic from './components/SyntheticsDiagnostic'`
2. Render: `<SyntheticsDiagnostic />`
3. Click "Test Synthetics" button (bottom-right)
4. Check all tests pass ✅

**Or use SQL:**
```sql
-- Should see events in last 5 minutes
SELECT COUNT(*) 
FROM journey_scene_events 
WHERE created_at > NOW() - INTERVAL '5 minutes'
  AND event_payload->>'synthetic' = 'true';
-- Expected: 10-50 events (depending on rate)
```

---

## 🎛️ CONFIGURATION

### **Default Settings**
```json
{
  "enabled": true,
  "sessions_per_min": 2,
  "max_per_run": 5,
  "error_rate": 0.05,
  "abandon_rate": 0.15
}
```

### **Adjust Rate**
```bash
# Lower rate (1 session/min)
curl -X POST \
  https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/settings \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"sessions_per_min": 1}'

# Higher rate (5 sessions/min)
curl -X POST \
  https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/settings \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"sessions_per_min": 5}'
```

---

## 📊 MONITORING

### **Synthetics Studio UI**
Navigate to: **Command Center 2 → Synthetics Studio**

Shows:
- ✅ Real-time status (running/paused)
- ✅ Activity metrics (5 min, 24 hours)
- ✅ Active journeys count
- ✅ Manual trigger controls
- ✅ Settings adjustment

**Auto-refreshes every 10 seconds**

---

### **Quick Health Check**
```bash
# One-liner to check if it's working
curl -s https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/status \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  | jq '{status: .status, last_5_min: .activity.last_5_min}'
```

**Expected output:**
```json
{
  "status": "running",
  "last_5_min": {
    "scene_events": 47,
    "mindblock_events": 23
  }
}
```

---

## 🔧 TROUBLESHOOTING

### **Problem: No activity in last 5 minutes**

**Diagnosis:**
```bash
# Check if enabled
curl https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/status \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  | jq '.settings.enabled'
```

**Solutions:**
1. Enable if paused: `POST /synthetics/toggle {"enabled": true}`
2. Check cron is running: `supabase functions logs synthetics --tail`
3. Manual trigger to test: `POST /synthetics/run-now {"target": 5}`

---

### **Problem: "No sim_users found"**

**Diagnosis:**
```sql
SELECT COUNT(*) FROM sim_users;
```

**Solution:**
```bash
# Run seed function
curl -X POST \
  https://YOUR_PROJECT.supabase.co/functions/v1/seed-synthetics \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY"
```

---

### **Problem: Rate too high/low**

**Adjust:**
```bash
curl -X POST \
  https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/settings \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"sessions_per_min": 2}'  # Your desired rate
```

---

## 🧹 MAINTENANCE

### **Pause During Demos**
```bash
# Pause
curl -X POST \
  https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/toggle \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"enabled": false}'

# Resume
curl -X POST \
  https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/toggle \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"enabled": true}'
```

---

### **Monthly Cleanup**
```bash
# Delete data older than 30 days
curl -X POST \
  https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/cleanup \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"retain_days": 30}'
```

---

## 📈 EXPECTED METRICS

### **After 1 Hour**
- Scene events: ~120 (2 sessions/min × 60 min × ~1 event/session)
- Mindblock events: ~60
- Active journeys: 5-10

### **After 24 Hours**
- Scene events: ~2,880
- Mindblock events: ~1,440
- Journeys completed: ~95
- Total events: ~4,320

### **Storage Impact**
- ~50KB/day for events
- ~1.5MB/month
- Cleanup recommended at 45 days

---

## ✅ FINAL VERIFICATION

Run this complete check:

```bash
# 1. Check status
curl https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/status \
  -H "Authorization: Bearer YOUR_ANON_KEY"

# 2. Check sim users
curl https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/sim-users \
  -H "Authorization: Bearer YOUR_ANON_KEY"

# 3. Check 24h activity
curl https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/activity/24 \
  -H "Authorization: Bearer YOUR_ANON_KEY"

# 4. Manual trigger test
curl -X POST \
  https://YOUR_PROJECT.supabase.co/functions/v1/synthetics/run \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -d '{"target": 3}'
```

**All 4 should return successful JSON responses.**

---

## 🎯 YOU'RE DONE!

Your synthetic data system is now:
- ✅ Generating 2-5 journey sessions per minute
- ✅ Emitting realistic scene events and mindblock interactions
- ✅ Honoring scene contracts and artifacts
- ✅ Respecting error and abandon rates
- ✅ Making dashboards feel alive with real activity

**Next: Monitor via Synthetics Studio and adjust rate as needed.**

---

## 📞 QUICK REFERENCE

**Enable/Disable:**
```bash
POST /make-server-49b28b8a/synthetics/toggle
{"enabled": true/false}
```

**Adjust Rate:**
```bash
POST /make-server-49b28b8a/synthetics/settings
{"sessions_per_min": 1-10}
```

**Manual Trigger:**
```bash
POST /functions/v1/synthetics/run
{"target": 5}
```

**Check Status:**
```bash
GET /make-server-49b28b8a/synthetics/status
```

**View Activity:**
```bash
GET /make-server-49b28b8a/synthetics/activity/24
```

**Cleanup:**
```bash
POST /make-server-49b28b8a/synthetics/cleanup
{"retain_days": 30}
```

---

**Last Updated:** January 9, 2026  
**Version:** 1.0.0
