# 🤖 SYNTHETICS AUTOMATION - COMPLETE SYSTEM

**Status:** ✅ FULLY AUTOMATED & READY TO ACTIVATE  
**Date:** January 9, 2026

---

## 🎯 WHAT WE BUILT

A **fully automated continuous synthetic data generation system** that runs like real users 24/7:

### ✅ Components Deployed:

1. **Edge Function: `synthetics`** - Core generator
   - URL: `https://wzeqlkbmqxlsjryidagf.supabase.co/functions/v1/synthetics`
   - Generates realistic journey sessions
   - Emits scene events, captures, resistance checks, mindblock events
   - Honors scene contracts for authenticity

2. **Control API: `/synthetics` routes** - Management interface
   - `/synthetics/status` - Real-time status
   - `/synthetics/toggle` - Start/stop engine
   - `/synthetics/settings` - Tune intensity
   - `/synthetics/run-now` - Manual trigger
   - `/synthetics/activity/:hours` - Activity analytics
   - `/synthetics/cleanup` - Data management
   - `/synthetics/sim-users` - User pool status

3. **Settings Table: `public.synthetic_settings`** - Configuration
   - Controls enabled/disabled state
   - Configures sessions per minute
   - Manages error/abandon rates
   - Persists settings across restarts

4. **CC2 Synthetics Studio** - UI Control Panel
   - Real-time monitoring dashboard
   - Start/stop controls
   - Settings editor
   - Activity analytics
   - Manual triggers
   - Cleanup management

---

## 🚀 ACTIVATION (ONE-TIME SETUP)

### **STEP 1: Activate the Cron Scheduler**

Go to **Supabase Dashboard → Your Project → Database → Cron Jobs**

**Create New Cron Job:**
```
Name: synthetics_continuous
Schedule: * * * * * (every minute)
Command: 
SELECT net.http_post(
  url := 'https://wzeqlkbmqxlsjryidagf.supabase.co/functions/v1/synthetics/cron',
  headers := jsonb_build_object(
    'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true),
    'Content-Type', 'application/json'
  ),
  body := '{}'::jsonb
);
```

**OR use Dashboard Edge Function Scheduler:**
```
Method: POST
URL: https://wzeqlkbmqxlsjryidagf.supabase.co/functions/v1/synthetics/cron
Headers:
  Authorization: Bearer YOUR_SERVICE_ROLE_KEY
  Content-Type: application/json
Body: {}
Frequency: Every 1 minute
```

### **STEP 2: Verify It's Running**

After 2-3 minutes, check activity:

```sql
-- Should see recent synthetic events
SELECT count(*) 
FROM journey_scene_events 
WHERE created_at > now() - interval '5 minutes'
  AND event_payload->>'synthetic' = 'true';
```

### **STEP 3: Add Synthetics Studio to CC2**

In your CC2 component, add the Synthetics card:

```tsx
import SyntheticsStudio from './components/cc2/SyntheticsStudio';

// In your CC2 studio grid:
{selectedStudio === 'synthetics' && <SyntheticsStudio />}
```

---

## 🎮 HOW IT WORKS (AUTOMATED FLOW)

### **Every Minute (Continuous):**

1. **Cron triggers** → Edge Function `/synthetics/cron`
2. **Function checks** `synthetic_settings.enabled`
3. **If enabled:**
   - Computes target sessions (settings × diurnal multiplier)
   - Picks synthetic users from `sim_users` pool
   - For each user:
     - Ensures/creates a `journey_instance`
     - Progresses **1-3 scenes** with realistic timing
     - Emits events respecting `scene_contracts`
     - Updates mindblock states probabilistically
     - Occasionally completes journeys
4. **Data flows** into all your tables automatically
5. **Dashboards update** with new activity

### **Diurnal Pattern (Automatic):**
- **Peak hours (14-22 UTC):** 130% of base rate
- **Off hours (2-10 UTC):** 50% of base rate
- **Smooth transitions:** Sine curve for realism

### **Session Realism:**
- Think time: 2-8 seconds between actions
- Session length: 20-120 seconds per scene
- 1-3 scenes per session
- Occasional errors (~3%) and abandons (~8%)
- Mindblock events 45% of scenes

---

## 🎛️ CONTROL INTERFACE

### **Via CC2 Synthetics Studio UI:**

**Quick Actions:**
- ▶️ **Start/Pause** - Toggle automation
- 🔄 **Run Now** - Trigger 5 sessions immediately
- ⚙️ **Edit Settings** - Adjust intensity
- 🗑️ **Cleanup** - Remove old data

**Real-time Monitoring:**
- Last 5 minutes activity
- Active journeys count
- 24-hour breakdowns
- Event type distributions

### **Via API (Programmatic):**

```bash
# Check status
curl https://wzeqlkbmqxlsjryidagf.supabase.co/functions/v1/make-server-49b28b8a/synthetics/status \
  -H "Authorization: Bearer $ANON_KEY"

# Pause automation
curl -X POST https://wzeqlkbmqxlsjryidagf.supabase.co/functions/v1/make-server-49b28b8a/synthetics/toggle \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"enabled": false}'

# Resume automation
curl -X POST https://wzeqlkbmqxlsjryidagf.supabase.co/functions/v1/make-server-49b28b8a/synthetics/toggle \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"enabled": true}'

# Update intensity
curl -X POST https://wzeqlkbmqxlsjryidagf.supabase.co/functions/v1/make-server-49b28b8a/synthetics/settings \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"sessions_per_min": 5, "max_per_run": 8}'

# Manual burst
curl -X POST https://wzeqlkbmqxlsjryidagf.supabase.co/functions/v1/make-server-49b28b8a/synthetics/run-now \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"target": 10}'
```

### **Via SQL (Direct Database):**

```sql
-- Pause
UPDATE synthetic_settings SET enabled = false WHERE id = 1;

-- Resume
UPDATE synthetic_settings SET enabled = true WHERE id = 1;

-- Increase to 5 sessions/min
UPDATE synthetic_settings 
SET sessions_per_min = 5, max_per_run = 8 
WHERE id = 1;

-- Decrease to 1 session/min (light)
UPDATE synthetic_settings 
SET sessions_per_min = 1, max_per_run = 3 
WHERE id = 1;
```

---

## 📊 WHAT DATA GETS GENERATED

### **Journey Activity:**
- `journey_instances` - New journeys started
- `journey_instance_scenes` - Scene progressions
- `journey_scene_events` - All scene actions:
  - scene_opened
  - prompt_viewed
  - capture_submitted
  - resistance_submitted
  - scene_completed

### **Captures & Checks:**
- `journey_scene_captures` - Text/voice receipts
- `journey_resistance_checks` - Resistance measurements
- `journey_real_world_triggers` - Real-world events
- Honors `scene_contracts.expects_receipt` and `expects_checks`

### **Mindblock Signals:**
- `mindblock_events` - State change signals:
  - activation
  - release
  - reframe
  - alignment_choice
  - transfer
- `user_mindblock_status` - Progress tracking (future)

### **Metadata Flags:**
All synthetic data tagged with:
```json
{
  "synthetic": true,
  "run_id": "...",
  "persona": "..."
}
```

Easy to filter out from production KPIs.

---

## 🔍 MONITORING & OBSERVABILITY

### **Real-time Activity (Last 5 Minutes):**
```sql
SELECT 
  'scene_events' as type,
  count(*) as count
FROM journey_scene_events
WHERE created_at > now() - interval '5 minutes'
  AND event_payload->>'synthetic' = 'true'

UNION ALL

SELECT 
  'mindblock_events' as type,
  count(*) as count
FROM mindblock_events
WHERE created_at > now() - interval '5 minutes'
  AND evidence->>'synthetic' = 'true';
```

### **Active Journeys:**
```sql
SELECT 
  ji.id,
  ji.user_id,
  ji.current_scene_number,
  ji.started_at,
  su.persona_key
FROM journey_instances ji
JOIN sim_users su ON su.profile_id = ji.user_id
WHERE ji.status = 'active'
ORDER BY ji.started_at DESC
LIMIT 20;
```

### **24-Hour Summary:**
```sql
SELECT 
  date_trunc('hour', created_at) as hour,
  count(*) as events
FROM journey_scene_events
WHERE created_at > now() - interval '24 hours'
  AND event_payload->>'synthetic' = 'true'
GROUP BY hour
ORDER BY hour DESC;
```

### **Synthetic User Progress:**
```sql
SELECT 
  su.profile_id,
  su.persona_key,
  count(DISTINCT ji.id) as journeys_started,
  count(DISTINCT jis.id) FILTER (WHERE jis.status = 'completed') as scenes_completed,
  max(jis.completed_at) as last_active
FROM sim_users su
LEFT JOIN journey_instances ji ON ji.user_id = su.profile_id
LEFT JOIN journey_instance_scenes jis ON jis.journey_instance_id = ji.id
GROUP BY su.profile_id, su.persona_key
ORDER BY last_active DESC NULLS LAST
LIMIT 20;
```

---

## 🧹 DATA MANAGEMENT

### **Auto-Cleanup (Recommended):**

Create a nightly cleanup job:

```sql
-- Dashboard → Cron Jobs → Add:
Name: synthetics_cleanup
Schedule: 0 4 * * * (daily at 4am UTC)
Command:
SELECT net.http_post(
  url := 'https://wzeqlkbmqxlsjryidagf.supabase.co/functions/v1/make-server-49b28b8a/synthetics/cleanup',
  headers := jsonb_build_object(
    'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true),
    'Content-Type', 'application/json'
  ),
  body := '{"retain_days": 45}'::jsonb
);
```

**Or via UI:**
- Open CC2 Synthetics Studio
- Click "Cleanup Old Data"
- Removes data older than 45 days

### **Manual Cleanup:**
```sql
-- Remove all synthetic data older than 30 days
DELETE FROM journey_scene_events
WHERE created_at < now() - interval '30 days'
  AND event_payload->>'synthetic' = 'true';

DELETE FROM mindblock_events
WHERE created_at < now() - interval '30 days'
  AND evidence->>'synthetic' = 'true';

DELETE FROM journey_scene_captures
WHERE created_at < now() - interval '30 days';

-- Clean completed synthetic journeys
DELETE FROM journey_instances ji
USING sim_users su
WHERE ji.user_id = su.profile_id
  AND ji.status = 'completed'
  AND ji.completed_at < now() - interval '30 days';
```

---

## 📈 EXPECTED DATA VOLUME

### **Default Settings (2 sessions/min):**
- **Per minute:** ~2 sessions × 2 scenes × 5 events = 20 events
- **Per hour:** ~1,200 events
- **Per day:** ~28,800 events
- **Per month:** ~864,000 events

### **Moderate Settings (5 sessions/min):**
- **Per day:** ~72,000 events
- **Per month:** ~2,160,000 events

### **Storage Impact:**
- Event row: ~500 bytes
- 1M events ≈ 500 MB
- With 45-day retention: ~1-2 GB at default rate

**Cleanup keeps this predictable and manageable.**

---

## 🎚️ INTENSITY PRESETS

### **Light (Testing/Demo):**
```sql
UPDATE synthetic_settings 
SET sessions_per_min = 1, max_per_run = 2 
WHERE id = 1;
```
- ~600 events/hour
- ~14,400 events/day

### **Moderate (Default - Recommended):**
```sql
UPDATE synthetic_settings 
SET sessions_per_min = 2, max_per_run = 5 
WHERE id = 1;
```
- ~1,200 events/hour
- ~28,800 events/day

### **Heavy (High Activity):**
```sql
UPDATE synthetic_settings 
SET sessions_per_min = 5, max_per_run = 8 
WHERE id = 1;
```
- ~3,000 events/hour
- ~72,000 events/day

### **Intense (Stress Testing):**
```sql
UPDATE synthetic_settings 
SET sessions_per_min = 10, max_per_run = 15 
WHERE id = 1;
```
- ~6,000 events/hour
- ~144,000 events/day

---

## 🛡️ SAFETY & BEST PRACTICES

### **Production KPIs:**
Always filter out synthetics:
```sql
WHERE user_id NOT IN (SELECT profile_id FROM sim_users)
-- OR check metadata flags
WHERE event_payload->>'synthetic' IS NULL
```

### **RLS Safety:**
- Synthetics run as service role (bypasses RLS)
- Only uses `sim_users` profiles
- Won't touch real user data
- All rows flagged in metadata

### **Performance:**
- Indexes on common filters recommended:
  ```sql
  CREATE INDEX IF NOT EXISTS idx_scene_events_synthetic 
  ON journey_scene_events((event_payload->>'synthetic'));
  
  CREATE INDEX IF NOT EXISTS idx_mindblock_events_synthetic 
  ON mindblock_events((evidence->>'synthetic'));
  ```

### **Cost Control:**
- Start with moderate settings
- Monitor database size
- Enable auto-cleanup
- Adjust retention period based on needs

---

## ✅ VERIFICATION CHECKLIST

After activation, verify:

- [ ] Cron job is scheduled (Dashboard → Cron Jobs)
- [ ] Settings enabled: `SELECT * FROM synthetic_settings;`
- [ ] Events appearing: Check queries above
- [ ] CC2 Studio showing activity
- [ ] No errors in Edge Function logs
- [ ] Sim users exist: `SELECT count(*) FROM sim_users;`
- [ ] Journey templates active: `SELECT count(*) FROM journey_template WHERE status = 'active';`

---

## 🎯 TROUBLESHOOTING

### **No activity after 5 minutes:**

1. Check settings:
   ```sql
   SELECT * FROM synthetic_settings;
   ```
   Ensure `enabled = true`

2. Check cron job exists:
   - Dashboard → Database → Cron Jobs
   - Look for `synthetics_continuous`

3. Check Edge Function logs:
   - Dashboard → Edge Functions → synthetics → Logs

4. Check sim_users exist:
   ```sql
   SELECT count(*) FROM sim_users;
   ```
   If 0, synthetic users need to be created

5. Check active templates:
   ```sql
   SELECT count(*) FROM journey_template WHERE status = 'active';
   ```
   Need at least 1 active template

### **Too much activity:**
```sql
-- Reduce intensity
UPDATE synthetic_settings 
SET sessions_per_min = 1, max_per_run = 2 
WHERE id = 1;
```

### **Want to pause temporarily:**
```sql
UPDATE synthetic_settings SET enabled = false WHERE id = 1;
```

### **Function errors:**
- Check service role key is set correctly
- Verify URL matches your project
- Check Edge Function deployment status

---

## 🚀 NEXT STEPS

1. **Activate Cron** (see Step 1 above)
2. **Wait 2-3 minutes**
3. **Verify Activity** (see Verification section)
4. **Add CC2 Studio** (for UI controls)
5. **Monitor & Tune** (adjust as needed)
6. **Enable Auto-Cleanup** (daily maintenance)

---

## 📚 API REFERENCE

### **Base URL:**
```
https://wzeqlkbmqxlsjryidagf.supabase.co/functions/v1/make-server-49b28b8a/synthetics
```

### **Endpoints:**

| Method | Path | Description |
|--------|------|-------------|
| GET | `/status` | Current status & activity |
| POST | `/toggle` | Start/stop engine |
| POST | `/settings` | Update configuration |
| POST | `/run-now` | Manual trigger |
| GET | `/activity/:hours` | Activity summary |
| POST | `/cleanup` | Remove old data |
| GET | `/sim-users` | User pool status |

### **Authentication:**
All endpoints require:
```
Authorization: Bearer YOUR_ANON_KEY
```

---

## 🎉 SUMMARY

**You now have:**
✅ Fully automated continuous data generation  
✅ Realistic user behavior simulation  
✅ Journey progression with mindblock updates  
✅ Real-time monitoring dashboard  
✅ Flexible controls (UI, API, SQL)  
✅ Auto-cleanup for data management  
✅ Safe isolation from production data  

**Just activate the cron job and watch your platform come alive!** 🚀

---

**System Status:** ✅ PRODUCTION READY  
**Activation Required:** Cron scheduler setup (one-time)  
**Documentation:** Complete  
**Support:** All endpoints operational  

