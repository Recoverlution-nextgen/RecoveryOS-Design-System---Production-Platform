# SYNTHETICS CRON SETUP
# Continuous data generation for Recoverlution

## CORRECT ARCHITECTURE ✅

```
Cron Service → Backend Server → Database
                (/make-server-49b28b8a/synthetics/run-now)
```

**NOT:**
```
❌ Cron → Standalone Edge Function → Database
```

---

## OPTION 1: GITHUB ACTIONS (RECOMMENDED)

Create `.github/workflows/synthetics-cron.yml`:

```yaml
name: Synthetics Continuous Data Generation
on:
  schedule:
    - cron: '*/1 * * * *' # Every minute
  workflow_dispatch: # Manual trigger

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
            --fail \
            --silent \
            --show-error
      
      - name: Log Result
        if: always()
        run: echo "Synthetics run completed at $(date)"
```

**Setup:**
1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Add secrets:
   - `SUPABASE_PROJECT_ID` (your project ID)
   - `SUPABASE_ANON_KEY` (your anon key - safe for frontend/cron)
3. Commit the workflow file
4. GitHub will run it every minute automatically

---

## OPTION 2: VERCEL CRON

If deploying frontend to Vercel, add to `vercel.json`:

```json
{
  "crons": [{
    "path": "/api/cron/synthetics",
    "schedule": "*/1 * * * *"
  }]
}
```

Create `/pages/api/cron/synthetics.ts`:

```typescript
export default async function handler(req: any, res: any) {
  // Verify Vercel cron secret
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/make-server-49b28b8a/synthetics/run-now`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ target: 3 })
      }
    );

    const data = await response.json();
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error('Synthetics cron error:', error);
    return res.status(500).json({ error: error.message });
  }
}
```

---

## OPTION 3: RAILWAY CRON

If using Railway for hosting, create `/cron/synthetics.sh`:

```bash
#!/bin/bash
curl -X POST \
  "https://$SUPABASE_PROJECT_ID.supabase.co/functions/v1/make-server-49b28b8a/synthetics/run-now" \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"target": 3}'
```

Add to Railway cron config:
```
*/1 * * * * /app/cron/synthetics.sh
```

---

## OPTION 4: EXTERNAL CRON SERVICE (EasyCron, cron-job.org, etc.)

**Setup:**
1. Sign up for a cron service
2. Create new cron job:
   - **URL:** `https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/run-now`
   - **Method:** POST
   - **Headers:**
     - `Authorization: Bearer YOUR_ANON_KEY`
     - `Content-Type: application/json`
   - **Body:** `{"target": 3}`
   - **Schedule:** Every 1 minute
3. Enable and test

---

## OPTION 5: SUPABASE PG_CRON (If Available)

If your Supabase plan supports pg_cron:

```sql
-- Enable pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule synthetics runner
SELECT cron.schedule(
  'synthetics-runner',
  '*/1 * * * *', -- Every minute
  $$
  SELECT net.http_post(
    url := 'https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/run-now',
    headers := jsonb_build_object(
      'Authorization', 'Bearer YOUR_SERVICE_ROLE_KEY',
      'Content-Type', 'application/json'
    ),
    body := jsonb_build_object('target', 3)
  );
  $$
);

-- View scheduled jobs
SELECT * FROM cron.job;

-- Unschedule (if needed)
SELECT cron.unschedule('synthetics-runner');
```

**Note:** pg_cron requires Pro plan or higher.

---

## CONFIGURATION

### Adjust Generation Rate

Edit the cron body to change how many sessions are created per minute:

```json
{"target": 1}   // Low activity (1 session/min)
{"target": 3}   // Medium activity (3 sessions/min)  ← RECOMMENDED
{"target": 5}   // High activity (5 sessions/min)
{"target": 10}  // Very high activity (10 sessions/min)
```

### Adjust Cron Frequency

Change the schedule:

```
*/1 * * * *    // Every 1 minute ← RECOMMENDED
*/2 * * * *    // Every 2 minutes
*/5 * * * *    // Every 5 minutes
0 * * * *      // Every hour
```

---

## TESTING

### Manual Test

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
    "timestamp": "2026-01-09T19:00:00.000Z"
  }
}
```

### Verify Cron is Working

After setting up cron, wait 1-2 minutes then check:

```sql
-- Should see recent events
SELECT COUNT(*) 
FROM journey_scene_events 
WHERE created_at > NOW() - INTERVAL '5 minutes'
  AND event_payload->>'synthetic' = 'true';
-- Expected: 10-50 events

-- Check via API
curl "https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/status" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

---

## MONITORING

### GitHub Actions Logs

If using GitHub Actions:
1. Go to repo → Actions tab
2. Click "Synthetics Continuous Data Generation"
3. View run history and logs

### Supabase Logs

```bash
# View backend server logs
supabase functions logs make-server-49b28b8a --tail

# Filter for synthetics
supabase functions logs make-server-49b28b8a --tail | grep "synthetics"
```

### Via Synthetics Studio

Navigate to: **Command Center 2 → Synthetics Studio**
- Shows real-time activity
- Auto-refreshes every 10 seconds
- Displays last 5 min and 24h metrics

---

## PAUSE/RESUME

### Temporary Pause (Keep Cron Running)

```bash
curl -X POST \
  "https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/toggle" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"enabled": false}'
```

Cron will keep running but synthetics runner will return early (no data generated).

### Resume

```bash
curl -X POST \
  "https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/toggle" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"enabled": true}'
```

### Disable Cron Completely

**GitHub Actions:**
- Edit `.github/workflows/synthetics-cron.yml`
- Comment out the `schedule:` section

**Vercel/Railway:**
- Remove cron configuration from config file

**External Service:**
- Disable job in service dashboard

---

## SECURITY NOTES

✅ **Safe to use ANON_KEY** - The `/synthetics/run-now` endpoint is designed for automated calls  
✅ **Backend validates settings** - Rate limits enforced via `max_per_run`  
✅ **Data is flagged** - All synthetic data marked with `synthetic: true`  
✅ **No production impact** - Synthetic users cannot access real data (RLS policies)

---

## RECOMMENDED SETUP

**For Recoverlution:**
1. ✅ Use GitHub Actions (free, reliable, easy to monitor)
2. ✅ Schedule every 1 minute
3. ✅ Set target to 3 sessions per minute
4. ✅ Monitor via Synthetics Studio dashboard
5. ✅ Review logs weekly

**Expected outcome:**
- ~180 journey sessions per hour
- ~4,320 journey sessions per day
- Dashboards always show realistic activity
- Minimal storage impact (~50KB/day)

---

## TROUBLESHOOTING

**Problem: Cron not triggering**

Check:
1. Secrets are correctly set in GitHub/Vercel/Railway
2. Cron schedule is valid (use crontab.guru to test)
3. Backend server is deployed and running
4. Check cron service logs for errors

**Problem: Runs but no data generated**

Check:
1. Is synthetics enabled? `GET /synthetics/status`
2. Are sim_users populated? `GET /synthetics/sim-users`
3. Check backend logs: `supabase functions logs make-server-49b28b8a`

**Problem: Too much/too little activity**

Adjust `target` in cron request body or adjust cron frequency.

---

## FINAL CHECKLIST

- [ ] Backend server deployed (`supabase functions deploy make-server-49b28b8a`)
- [ ] Migration applied (`supabase db push`)
- [ ] sim_users populated (3000 users)
- [ ] Synthetics enabled (`POST /toggle {"enabled": true}`)
- [ ] Cron configured (GitHub Actions/Vercel/Railway)
- [ ] Tested manually (`POST /run-now`)
- [ ] Monitoring via Synthetics Studio

**You're done! Synthetic data will flow continuously.**
