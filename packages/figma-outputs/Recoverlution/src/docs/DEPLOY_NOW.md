# 🚀 DEPLOY SYNTHETICS NOW
## **Using Your Existing SQL Data + Continuous Flow**

---

## ✅ YOU ALREADY HAVE

1. **Migration SQL** → `/supabase/migrations/20260109_synthetics_tables.sql`
   - Creates `synthetic_settings`, `sim_users`, journey tables
   - Sets up indexes, RLS policies, helper functions
   - Ready to deploy

2. **Backfill Script** → `/supabase/migrations/20260109_backfill_sim_users.sql`
   - Populates `sim_users` from existing synthetic profiles
   - Pattern: `synthetic+00001@example.com` through `synthetic+03000@example.com`
   - Assigns 10 persona types

3. **Seed Function** → `/supabase/functions/seed-synthetics/index.ts`
   - Already updated to populate `sim_users` table (lines 171-214)
   - Creates 3000 synthetic users + mindblock engagements
   - Fully idempotent

4. **Backend Server** → `/supabase/functions/server/`
   - `synthetics-control.tsx` - API endpoints
   - `synthetics-runner.ts` - Continuous data generation
   - Fixed architecture (no standalone Edge Function)

5. **Frontend UI** → `/components/cc2/SyntheticsStudio.tsx`
   - Real-time status display
   - Setup warning if sim_users = 0
   - Auto-refresh every 10 seconds

---

## 🎯 RECOMMENDED PATH: USE EXISTING DATA

**If you already ran seed-synthetics before:**

```bash
# Step 1: Deploy migration (30 sec)
supabase db push

# Step 2: Backfill sim_users from existing profiles (1 min)
psql $SUPABASE_DB_URL -f /supabase/migrations/20260109_backfill_sim_users.sql

# Step 3: Deploy backend server (1 min)
supabase functions deploy make-server-49b28b8a

# Step 4: Verify sim_users populated (5 sec)
curl "https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/make-server-49b28b8a/synthetics/sim-users" \
  -H "Authorization: Bearer ${SUPABASE_ANON_KEY}"

# Expected output:
# {"count": 3000, "users": [...], "ready": true}

# Step 5: Test manual run (10 sec)
curl -X POST \
  "https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/make-server-49b28b8a/synthetics/run-now" \
  -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
  -d '{"target": 5}'

# Expected output:
# {
#   "success": true,
#   "sessions_created": 5,
#   "scene_events_created": ~15-25,
#   "mindblock_events_created": ~8-15,
#   ...
# }

# Step 6: Set up continuous flow (GitHub Actions cron)
# See CRON SETUP section below
```

**Total time: ~3 minutes**

---

## 🔄 CONTINUOUS DATA FLOW SETUP

### **GitHub Actions Cron (Recommended)**

Create `.github/workflows/synthetics-cron.yml`:

```yaml
name: Recoverlution Synthetics Engine
on:
  schedule:
    - cron: '*/1 * * * *'  # Every minute
  workflow_dispatch:        # Manual trigger

jobs:
  generate-activity:
    runs-on: ubuntu-latest
    steps:
      - name: Generate Synthetic Activity
        run: |
          curl -X POST \
            "https://${{ secrets.SUPABASE_PROJECT_ID }}.supabase.co/functions/v1/make-server-49b28b8a/synthetics/run-now" \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}" \
            -H "Content-Type: application/json" \
            -d '{"target": 3}' \
            --fail --silent --show-error
      
      - name: Log Success
        if: success()
        run: echo "✅ Generated 3 synthetic sessions at $(date)"
      
      - name: Log Failure
        if: failure()
        run: echo "❌ Synthetics run failed at $(date)"
```

**Setup:**
1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Add secrets:
   - `SUPABASE_PROJECT_ID` = your project ID
   - `SUPABASE_ANON_KEY` = your anon key (safe for cron)
3. Commit the workflow file
4. GitHub will run it every minute automatically

**Result:**
- 3 journey sessions per minute
- ~180 sessions per hour
- ~4,320 sessions per day
- Dashboards show realistic continuous activity

---

## 📊 WHAT THE CONTINUOUS FLOW CREATES

Every minute, the cron triggers backend server which:

1. **Queries `sim_users`** → Picks 3 random synthetic users
2. **Creates `journey_instances`** → Onboarding, trigger awareness, craving management, etc.
3. **Emits `journey_scene_events`** → scene_started, scene_progressed, scene_completed
4. **Emits `mindblock_events`** → viewed, engaged, completed, resonated
5. **Flags all data** → `metadata.synthetic = true` or `event_payload.synthetic = true`

**Example data created per minute:**
```
journey_instances:        3 records
journey_scene_events:    ~15 records (5 scenes per journey avg)
mindblock_events:         ~8 records (2-3 mindblocks per journey)
Total:                   ~26 new records/min
```

**Per day:**
```
journey_instances:      ~4,320 records
journey_scene_events:   ~21,600 records
mindblock_events:       ~11,520 records
Total:                  ~37,440 new records/day
Storage:                ~50-100 KB/day
```

---

## 🔍 VERIFY IT'S WORKING

### **Check sim_users Count**

```bash
curl "https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/make-server-49b28b8a/synthetics/sim-users" \
  -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" | jq
```

Expected:
```json
{
  "count": 3000,
  "users": [
    {
      "profile_id": "...",
      "org_id": "...",
      "persona_key": "motivated_beginner",
      "started_at": "2026-01-09T..."
    },
    ...
  ],
  "ready": true
}
```

---

### **Check Synthetics Status**

```bash
curl "https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/make-server-49b28b8a/synthetics/status" \
  -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" | jq
```

Expected:
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
      "scene_events": 15,
      "mindblock_events": 8
    },
    "active_journeys": 3,
    "recent_journeys": [...]
  },
  "status": "running"
}
```

---

### **Check Recent Activity (SQL)**

```sql
-- Recent scene events (last 5 min)
SELECT COUNT(*) 
FROM journey_scene_events 
WHERE created_at > NOW() - INTERVAL '5 minutes'
  AND event_payload->>'synthetic' = 'true';
-- Expected: 10-30 (if cron running)

-- Recent mindblock events (last 5 min)
SELECT COUNT(*) 
FROM mindblock_events 
WHERE created_at > NOW() - INTERVAL '5 minutes'
  AND evidence->>'synthetic' = 'true';
-- Expected: 5-20 (if cron running)

-- Total synthetic journeys created
SELECT COUNT(*) 
FROM journey_instances 
WHERE metadata->>'synthetic' = 'true';
-- Expected: grows by ~180/hour

-- Persona distribution
SELECT 
  su.persona_key,
  COUNT(ji.id) as journey_count
FROM sim_users su
LEFT JOIN journey_instances ji ON ji.user_id = su.profile_id
  AND ji.metadata->>'synthetic' = 'true'
GROUP BY su.persona_key
ORDER BY journey_count DESC;
-- Expected: roughly even distribution across 10 personas
```

---

### **Check UI (SyntheticsStudio)**

1. Navigate to: **Command Center 2 → Synthetics Studio**
2. Should see:
   - **Header:** `[3000 sim users] [🟢 Running] [Pause]`
   - **Last 5 min:** Real numbers updating every 10 seconds
   - **Last 24h:** Activity breakdown by type
   - **No yellow warning banner**

---

## 🎛️ CONTROL & MONITORING

### **Pause Synthetics**

```bash
curl -X POST \
  "https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/make-server-49b28b8a/synthetics/toggle" \
  -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
  -d '{"enabled": false}'
```

Cron keeps running, but runner returns early (no data generated).

---

### **Resume Synthetics**

```bash
curl -X POST \
  "https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/make-server-49b28b8a/synthetics/toggle" \
  -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
  -d '{"enabled": true}'
```

---

### **Adjust Generation Rate**

```bash
curl -X POST \
  "https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/make-server-49b28b8a/synthetics/settings" \
  -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
  -d '{"sessions_per_min": 5}'
```

Or adjust directly in cron:
```yaml
-d '{"target": 5}'  # 5 sessions per run (high activity)
-d '{"target": 1}'  # 1 session per run (low activity)
```

---

### **Cleanup Old Data**

```bash
curl -X POST \
  "https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/make-server-49b28b8a/synthetics/cleanup" \
  -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
  -d '{"retain_days": 30}'
```

Removes synthetic data older than 30 days.

---

### **Monitor via Logs**

```bash
# Backend server logs
supabase functions logs make-server-49b28b8a --tail

# Filter for synthetics
supabase functions logs make-server-49b28b8a --tail | grep "synthetics"
```

---

## 🧹 CLEANUP & RESET (If Needed)

### **Reset Synthetics Completely**

```sql
-- Delete all synthetic journey data
DELETE FROM journey_scene_events 
WHERE event_payload->>'synthetic' = 'true';

DELETE FROM mindblock_events 
WHERE evidence->>'synthetic' = 'true';

DELETE FROM journey_instances 
WHERE metadata->>'synthetic' = 'true';

-- Clear sim_users (but keep profiles)
DELETE FROM sim_users;

-- Reset settings
UPDATE synthetic_settings 
SET enabled = false, sessions_per_min = 2, max_per_run = 5
WHERE id = 1;
```

Then re-run backfill or seed to start fresh.

---

## 📋 QUICK CHECKLIST

- [ ] Deploy migration: `supabase db push`
- [ ] Backfill sim_users: `psql $SUPABASE_DB_URL -f /supabase/migrations/20260109_backfill_sim_users.sql`
- [ ] Deploy backend: `supabase functions deploy make-server-49b28b8a`
- [ ] Verify sim_users: `curl .../synthetics/sim-users` → count = 3000
- [ ] Test manual run: `curl .../synthetics/run-now` → success
- [ ] Set up cron: GitHub Actions workflow committed
- [ ] Wait 2 minutes, check activity: `curl .../synthetics/status`
- [ ] Open UI: Command Center 2 → Synthetics Studio
- [ ] Verify: No yellow warning, real metrics showing

---

## ✅ EXPECTED OUTCOME

**After 1 minute:**
- 3 new journey_instances
- ~15 new scene_events
- ~8 new mindblock_events

**After 1 hour:**
- ~180 journey_instances
- ~900 scene_events
- ~480 mindblock_events

**After 24 hours:**
- ~4,320 journey_instances
- ~21,600 scene_events
- ~11,520 mindblock_events

**UI displays:**
- Real-time activity metrics
- 24-hour breakdowns
- Active journey counts
- Auto-refreshes every 10 seconds

---

## 🎯 YOU'RE DONE!

**Your existing SQL data is good → Just deploy, backfill, and enable the continuous flow.**

No need to re-seed unless you want fresh data. The backfill script will use what you already have.

**Deploy now?** Run the 6 commands in the Quick Checklist above. Total time: ~3 minutes.
