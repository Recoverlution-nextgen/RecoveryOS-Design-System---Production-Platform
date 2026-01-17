# ⚡ ACTIVATE SYNTHETICS - QUICK START

**Time Required:** 5 minutes  
**Technical Level:** Copy & paste

---

## 🎯 GOAL
Get continuous synthetic data flowing through your platform automatically.

---

## 📋 STEP-BY-STEP ACTIVATION

### **STEP 1: Verify Prerequisites** (30 seconds)

Check that synthetic users exist:

```sql
SELECT count(*) FROM public.sim_users;
```

**Expected:** At least 1 user  
**If 0:** Run your existing user generation script first

Check that active journey templates exist:

```sql
SELECT count(*) FROM public.journey_template WHERE status = 'active';
```

**Expected:** At least 1 template  
**If 0:** Set a template to active status

---

### **STEP 2: Option A - Dashboard Scheduler** (2 minutes) ⭐ RECOMMENDED

**Navigate to:**
Supabase Dashboard → Your Project → Database → Cron Jobs (or Edge Functions → Schedule)

**Click "Create a new cron job"**

**Fill in:**
```
Name: synthetics_continuous
Description: Continuous synthetic user data generation
Schedule: * * * * * 
(or use "Every 1 minute" from dropdown)

Command/SQL:
SELECT net.http_post(
  url := 'https://wzeqlkbmqxlsjryidagf.supabase.co/functions/v1/synthetics/cron',
  headers := jsonb_build_object(
    'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true),
    'Content-Type', 'application/json'
  ),
  body := '{}'::jsonb
);
```

**Click "Create"**

---

### **STEP 2: Option B - Edge Function Scheduler** (2 minutes)

**Navigate to:**
Supabase Dashboard → Your Project → Edge Functions → Schedule

**Click "Create schedule"**

**Fill in:**
```
Name: synthetics_continuous
Edge Function: synthetics
Method: POST
Path: /cron
Headers:
  Authorization: Bearer YOUR_SERVICE_ROLE_KEY
  Content-Type: application/json
Body: {}
Frequency: Every 1 minute
```

**Replace `YOUR_SERVICE_ROLE_KEY`:**
1. Go to Project Settings → API
2. Copy the `service_role` key (secret)
3. Paste it in the Authorization header

**Click "Create schedule"**

---

### **STEP 3: Verify It's Working** (2 minutes)

Wait 2-3 minutes, then run:

```sql
-- Check recent activity (last 5 minutes)
SELECT 
  count(*) as events,
  max(created_at) as latest_event
FROM journey_scene_events
WHERE created_at > now() - interval '5 minutes'
  AND event_payload->>'synthetic' = 'true';
```

**Expected:**
- `events`: Greater than 0 (probably 10-30)
- `latest_event`: Within last 2-3 minutes

**If you see activity:** ✅ **SUCCESS! You're done!**

**If no activity yet:** Wait another 2 minutes and check again.

---

### **STEP 4: Check the Dashboard** (1 minute)

**Via API:**
```bash
curl "https://wzeqlkbmqxlsjryidagf.supabase.co/functions/v1/make-server-49b28b8a/synthetics/status" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

**Expected response:**
```json
{
  "settings": {
    "enabled": true,
    "sessions_per_min": 2,
    ...
  },
  "activity": {
    "last_5_min": {
      "scene_events": 15,
      "mindblock_events": 7
    },
    ...
  },
  "status": "running"
}
```

---

## 🎛️ QUICK CONTROLS

### **Pause Synthetics:**
```sql
UPDATE synthetic_settings SET enabled = false WHERE id = 1;
```

### **Resume Synthetics:**
```sql
UPDATE synthetic_settings SET enabled = true WHERE id = 1;
```

### **Increase Activity (5 sessions/min):**
```sql
UPDATE synthetic_settings 
SET sessions_per_min = 5, max_per_run = 8 
WHERE id = 1;
```

### **Decrease Activity (1 session/min):**
```sql
UPDATE synthetic_settings 
SET sessions_per_min = 1, max_per_run = 3 
WHERE id = 1;
```

### **Manual Test (5 sessions immediately):**
```bash
curl -X POST \
  "https://wzeqlkbmqxlsjryidagf.supabase.co/functions/v1/synthetics/run?target=5" \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

## 📊 MONITORING QUERIES

### **Last Hour Activity:**
```sql
SELECT 
  date_trunc('minute', created_at) as minute,
  count(*) as events
FROM journey_scene_events
WHERE created_at > now() - interval '1 hour'
  AND event_payload->>'synthetic' = 'true'
GROUP BY minute
ORDER BY minute DESC
LIMIT 20;
```

### **Active Synthetic Journeys:**
```sql
SELECT 
  ji.id,
  ji.current_scene_number,
  ji.started_at,
  now() - ji.started_at as duration
FROM journey_instances ji
JOIN sim_users su ON su.profile_id = ji.user_id
WHERE ji.status = 'active'
ORDER BY ji.started_at DESC
LIMIT 10;
```

### **Event Breakdown:**
```sql
SELECT 
  event_type,
  count(*) as count
FROM journey_scene_events
WHERE created_at > now() - interval '24 hours'
  AND event_payload->>'synthetic' = 'true'
GROUP BY event_type
ORDER BY count DESC;
```

---

## 🆘 TROUBLESHOOTING

### **Problem: No events after 5 minutes**

1. **Check cron job exists:**
   - Dashboard → Database → Cron Jobs
   - Should see `synthetics_continuous`

2. **Check settings enabled:**
   ```sql
   SELECT * FROM synthetic_settings;
   ```
   Should show `enabled = true`

3. **Check Edge Function is deployed:**
   - Dashboard → Edge Functions
   - Should see `synthetics` in the list
   - Status should be "Deployed"

4. **Check logs:**
   - Dashboard → Edge Functions → synthetics → Logs
   - Look for errors or 200 responses

5. **Manual test:**
   ```bash
   curl "https://wzeqlkbmqxlsjryidagf.supabase.co/functions/v1/synthetics/health"
   ```
   Should return `{"ok": true}`

### **Problem: Too much activity**

Reduce intensity:
```sql
UPDATE synthetic_settings 
SET sessions_per_min = 1, max_per_run = 2 
WHERE id = 1;
```

### **Problem: Errors in logs**

1. Check service role key is correct
2. Verify project URL matches
3. Ensure sim_users table has data
4. Ensure journey_template has active templates

---

## ✅ SUCCESS CHECKLIST

After activation, you should have:

- [x] Cron job scheduled and running
- [x] `synthetic_settings.enabled = true`
- [x] New events every 1-2 minutes
- [x] Active journey instances for sim_users
- [x] Mindblock events appearing
- [x] No errors in Edge Function logs

---

## 🎉 YOU'RE DONE!

Your platform now has continuous realistic data flowing 24/7!

**What's happening:**
- Every minute, 2-5 synthetic users start or continue journeys
- They progress through scenes with realistic timing
- They emit captures, resistance checks, mindblock events
- Your dashboards fill with activity
- Everything is tagged as synthetic for easy filtering

**Next steps:**
- Open CC2 to see Individual Data Studio populate
- Watch realtime updates flow through
- Adjust intensity as needed
- Set up auto-cleanup (optional, see main docs)

---

**Questions?** See `SYNTHETICS_AUTOMATION_COMPLETE.md` for full documentation.

**Want to stop it?** `UPDATE synthetic_settings SET enabled = false WHERE id = 1;`

**Want more activity?** `UPDATE synthetic_settings SET sessions_per_min = 5 WHERE id = 1;`

