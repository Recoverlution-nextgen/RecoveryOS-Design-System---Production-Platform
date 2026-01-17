# 🤖 SYNTHETICS AUTOMATION SYSTEM

Complete guide to deploying and managing the continuous synthetic data generation system for Recoverlution.

---

## 📋 OVERVIEW

The synthetics system provides **realistic, continuous data flow** to make dashboards and realtime features feel alive during development and demos.

**What it does:**
- ✅ Simulates real users progressing through journeys
- ✅ Emits scene events (start, progress, complete, abandon)
- ✅ Generates mindblock state changes with proper NaviCue v2 signals
- ✅ Honors scene contracts and emits artifacts
- ✅ Respects configurable settings (rate, error %, abandon %)
- ✅ Can run continuously via cron or be triggered manually

---

## 🏗️ ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────┐
│                     SYNTHETICS SYSTEM                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. SEED FUNCTION (One-time bulk insert)                    │
│     /functions/v1/seed-synthetics                           │
│     → Creates 3,000 users + 36,000 engagements              │
│                                                              │
│  2. CONTINUOUS RUNNER (Ongoing activity)                    │
│     /functions/v1/synthetics/run                            │
│     → Creates 2-5 sessions/min with realistic behavior      │
│                                                              │
│  3. CONTROL SERVER (Settings & status)                      │
│     /make-server-49b28b8a/synthetics/*                      │
│     → Toggle, settings, activity queries                    │
│                                                              │
│  4. SYNTHETICS STUDIO (UI dashboard)                        │
│     Command Center 2 → Synthetics Studio                    │
│     → Real-time monitoring, manual triggers                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 DEPLOYMENT STEPS

### **Step 1: Run Database Migration**

```bash
# Apply the synthetics tables migration
supabase db push --include-all

# Or manually run the SQL
psql $DATABASE_URL -f /supabase/migrations/20260109_synthetics_tables.sql
```

**This creates:**
- `synthetic_settings` table (config)
- `sim_users` table (synthetic user profiles)
- Helper functions (`get_synthetics_activity_summary`, `cleanup_old_synthetic_data`)
- Indexes for performance
- RLS policies

---

### **Step 2: Deploy Edge Functions**

```bash
# Deploy the seed function (one-time bulk)
supabase functions deploy seed-synthetics

# Deploy the continuous runner (NEW)
supabase functions deploy synthetics

# Verify deployment
supabase functions list
```

**Expected output:**
```
┌─────────────────────┬────────┬────────────────────┐
│ NAME                │ STATUS │ VERSION            │
├─────────────────────┼────────┼────────────────────┤
│ seed-synthetics     │ active │ v1                 │
│ synthetics          │ active │ v1                 │
│ make-server-49b28b8a│ active │ v1                 │
└─────────────────────┴────────┴────────────────────┘
```

---

### **Step 3: Seed Initial Data**

```bash
# Create 3,000 synthetic users and 36,000 engagements
curl -X POST \
  https://$PROJECT_ID.supabase.co/functions/v1/seed-synthetics \
  -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "count_users": 3000,
    "coverage_per_mindblock": 15,
    "days": 45,
    "cohort_label": "synthetics_v1",
    "with_orgs": true,
    "with_journeys": false,
    "with_notifications": false
  }'
```

**Response:**
```json
{
  "users_created": 3000,
  "engagements_created": 36000,
  "mindblocks_covered": 2400,
  "min_engagements_per_mindblock": 14,
  "max_engagements_per_mindblock": 16
}
```

**This takes ~5-10 minutes.** It's idempotent, so you can re-run safely.

---

### **Step 4: Enable Continuous Runner**

```bash
# Enable synthetics via API
curl -X POST \
  https://$PROJECT_ID.supabase.co/functions/v1/make-server-49b28b8a/synthetics/toggle \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"enabled": true}'
```

**Response:**
```json
{
  "success": true,
  "enabled": true,
  "message": "Synthetics enabled"
}
```

---

### **Step 5: Set Up Cron Trigger (Automated)**

Supabase Edge Functions support cron schedules via `deno.json`:

**Create `/supabase/functions/synthetics/deno.json`:**
```json
{
  "tasks": {
    "cron": "deno run --allow-net --allow-env index.ts"
  },
  "cron": {
    "synthetics": {
      "schedule": "*/1 * * * *",
      "description": "Run synthetics every 1 minute"
    }
  }
}
```

**Deploy with cron:**
```bash
supabase functions deploy synthetics --with-cron
```

**Alternative: Use pg_cron (if available)**
```sql
SELECT cron.schedule(
  'synthetics-runner',
  '*/1 * * * *', -- Every minute
  $$
  SELECT net.http_post(
    url := 'https://YOUR_PROJECT.supabase.co/functions/v1/synthetics/run',
    headers := '{"Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}',
    body := '{}'
  )
  $$
);
```

**Alternative: External Cron (vercel-cron, GitHub Actions, etc.)**
```yaml
# .github/workflows/synthetics-cron.yml
name: Synthetics Cron
on:
  schedule:
    - cron: '*/1 * * * *' # Every minute
  workflow_dispatch: # Manual trigger
jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - run: |
          curl -X POST \
            https://${{ secrets.SUPABASE_PROJECT_ID }}.supabase.co/functions/v1/synthetics/run \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}"
```

---

## 🎛️ CONFIGURATION

### **Adjust Settings via API**

```bash
curl -X POST \
  https://$PROJECT_ID.supabase.co/functions/v1/make-server-49b28b8a/synthetics/settings \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "sessions_per_min": 3,
    "max_per_run": 10,
    "error_rate": 0.08,
    "abandon_rate": 0.20
  }'
```

### **Settings Explained**

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `true` | Master on/off switch |
| `sessions_per_min` | `2` | Target synthetic sessions per minute |
| `max_per_run` | `5` | Safety limit per execution |
| `error_rate` | `0.05` | Probability of journeys encountering errors (5%) |
| `abandon_rate` | `0.15` | Probability of journeys being abandoned (15%) |

### **Adjust Settings via UI**

1. Navigate to **Command Center 2**
2. Open **Synthetics Studio**
3. Click **Settings** tab
4. Adjust sliders
5. Click **Save**

---

## 📊 MONITORING

### **Via Synthetics Studio UI**

Navigate to: **Command Center 2 → Synthetics Studio**

**Dashboard shows:**
- ✅ Status: Running/Paused
- ✅ Last 5 min activity (scene events, mindblock events)
- ✅ Active journeys count
- ✅ 24-hour activity summary
- ✅ Recent journey instances

**Auto-refreshes every 10 seconds.**

---

### **Via API**

**Get Status:**
```bash
curl https://$PROJECT_ID.supabase.co/functions/v1/make-server-49b28b8a/synthetics/status \
  -H "Authorization: Bearer $ANON_KEY"
```

**Get 24h Activity:**
```bash
curl https://$PROJECT_ID.supabase.co/functions/v1/make-server-49b28b8a/synthetics/activity/24 \
  -H "Authorization: Bearer $ANON_KEY"
```

**Response:**
```json
{
  "period_hours": 24,
  "scene_events_by_type": {
    "scene_started": 450,
    "scene_completed": 380,
    "scene_abandoned": 70,
    "artifact_captured": 120
  },
  "mindblock_events_by_type": {
    "viewed": 200,
    "engaged": 180,
    "completed": 150,
    "resonated": 90
  },
  "journeys_completed": 95,
  "scenes_completed": 380,
  "total_events": 1440
}
```

---

### **Via SQL**

```sql
-- Activity summary (last 24 hours)
SELECT get_synthetics_activity_summary(24);

-- Recent scene events
SELECT 
  event_type,
  COUNT(*) as count
FROM journey_scene_events
WHERE created_at > NOW() - INTERVAL '1 hour'
  AND event_payload->>'synthetic' = 'true'
GROUP BY event_type;

-- Active synthetic journeys
SELECT 
  template_id,
  status,
  COUNT(*) as count
FROM journey_instances
WHERE metadata->>'synthetic' = 'true'
  AND status = 'active'
GROUP BY template_id, status;
```

---

## 🧪 MANUAL TESTING

### **Run N Sessions Immediately**

```bash
curl -X POST \
  https://$PROJECT_ID.supabase.co/functions/v1/synthetics/run \
  -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"target": 10}'
```

**Response:**
```json
{
  "success": true,
  "sessions_created": 10,
  "scene_events_created": 47,
  "mindblock_events_created": 23,
  "settings": {
    "target": 10,
    "abandon_rate": 0.15,
    "error_rate": 0.05
  },
  "timestamp": "2026-01-09T18:30:00.000Z"
}
```

**Or via UI:**
1. Open Synthetics Studio
2. Click **"Run Now"** button
3. Specify number of sessions
4. Click **Execute**

---

## 🧹 MAINTENANCE

### **Cleanup Old Data**

**Via API:**
```bash
curl -X POST \
  https://$PROJECT_ID.supabase.co/functions/v1/make-server-49b28b8a/synthetics/cleanup \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"retain_days": 30}'
```

**Via SQL:**
```sql
SELECT cleanup_old_synthetic_data(30);
```

**Via UI:**
1. Open Synthetics Studio
2. Click **Cleanup** tab
3. Set retention period (days)
4. Click **Clean Old Data**

---

### **Pause/Resume**

**Pause:**
```bash
curl -X POST \
  https://$PROJECT_ID.supabase.co/functions/v1/make-server-49b28b8a/synthetics/toggle \
  -H "Authorization: Bearer $ANON_KEY" \
  -d '{"enabled": false}'
```

**Resume:**
```bash
curl -X POST \
  https://$PROJECT_ID.supabase.co/functions/v1/make-server-49b28b8a/synthetics/toggle \
  -H "Authorization: Bearer $ANON_KEY" \
  -d '{"enabled": true}'
```

---

## 🔍 TROUBLESHOOTING

### **Problem: No synthetic activity showing**

**Check 1: Are synthetics enabled?**
```bash
curl https://$PROJECT_ID.supabase.co/functions/v1/make-server-49b28b8a/synthetics/status \
  -H "Authorization: Bearer $ANON_KEY" | jq '.status'
```

**Expected:** `"running"`

**Check 2: Are sim_users populated?**
```sql
SELECT COUNT(*) FROM sim_users;
```

**Expected:** 3000

**Check 3: Is cron running?**
```bash
supabase functions logs synthetics --tail
```

**Check 4: Trigger manually**
```bash
curl -X POST \
  https://$PROJECT_ID.supabase.co/functions/v1/synthetics/run \
  -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
  -d '{"target": 5}'
```

---

### **Problem: "No sim_users found" error**

**Solution:** Run seed-synthetics first
```bash
curl -X POST \
  https://$PROJECT_ID.supabase.co/functions/v1/seed-synthetics \
  -H "Authorization: Bearer $SERVICE_ROLE_KEY"
```

---

### **Problem: Rate too high/low**

**Solution:** Adjust `sessions_per_min`
```bash
curl -X POST \
  https://$PROJECT_ID.supabase.co/functions/v1/make-server-49b28b8a/synthetics/settings \
  -H "Authorization: Bearer $ANON_KEY" \
  -d '{"sessions_per_min": 1}'  # Lower rate
```

---

## 📈 PERFORMANCE NOTES

- **Database load:** ~2 sessions/min = ~10 INSERT ops/min (very light)
- **Storage growth:** ~50KB/day for scene events + mindblock events
- **Cleanup recommended:** Run monthly to keep under 45 days
- **Indexes:** All synthetic queries use optimized JSONB indexes
- **Realtime:** Broadcasts are optional, won't block if disabled

---

## 🔐 SECURITY

- ✅ All synthetic data is flagged with `synthetic: true` in metadata
- ✅ RLS policies prevent synthetic users from accessing real data
- ✅ Service role key required for seed function
- ✅ Anon key sufficient for control/monitoring (safe for frontend)
- ✅ Synthetics cannot interfere with production data

---

## 🎯 NEXT STEPS

1. ✅ Deploy migration → `supabase db push`
2. ✅ Deploy functions → `supabase functions deploy synthetics`
3. ✅ Seed initial data → Run seed-synthetics
4. ✅ Enable runner → POST /synthetics/toggle
5. ✅ Set up cron → Configure deno.json or external cron
6. ✅ Monitor via UI → Open Synthetics Studio

**You're now generating realistic synthetic data continuously!**

---

## 📞 SUPPORT

**Logs:**
```bash
supabase functions logs synthetics --tail
supabase functions logs seed-synthetics --tail
```

**Database queries:**
```sql
-- Total synthetic activity
SELECT COUNT(*) FROM journey_scene_events WHERE event_payload->>'synthetic' = 'true';
SELECT COUNT(*) FROM mindblock_events WHERE evidence->>'synthetic' = 'true';

-- Active synthetic journeys
SELECT COUNT(*) FROM journey_instances 
WHERE metadata->>'synthetic' = 'true' AND status = 'active';
```

**Debug mode:** Check browser console in Synthetics Studio for API errors
