# 🚨 QUICK FIX: No Synthetic Users in Database

## THE PROBLEM

You ran `seed-synthetics` but the `sim_users` table is empty. This is because the original seed function didn't populate that table (it only created Auth users, profiles, and content_engagements).

The continuous runner (`/synthetics/run`) **requires** the `sim_users` table to know which users to simulate.

---

## THE SOLUTION (2 Options)

### **Option 1: Backfill from Existing Users** (1 minute)

If you already ran `seed-synthetics` and have 3,000 synthetic users in your database:

```bash
# Step 1: Deploy the migration (creates sim_users table if needed)
supabase db push

# Step 2: Run the backfill script
psql $DATABASE_URL -f /supabase/migrations/20260109_backfill_sim_users.sql
```

**Or via Supabase SQL Editor:**
1. Open Supabase Dashboard → SQL Editor
2. Copy/paste contents of `/supabase/migrations/20260109_backfill_sim_users.sql`
3. Click "Run"

**Expected output:**
```
NOTICE: Backfilled 3000 synthetic users into sim_users table

 total_sim_users | unique_orgs | unique_personas 
-----------------+-------------+-----------------
            3000 |           3 |              10
```

**Verify it worked:**
```sql
SELECT COUNT(*) FROM sim_users;
-- Should return: 3000
```

---

### **Option 2: Re-run Seed Function** (5-10 minutes)

If you want a fresh start:

```bash
# Step 1: Deploy updated migration
supabase db push

# Step 2: Deploy updated seed-synthetics function
supabase functions deploy seed-synthetics

# Step 3: Run the seed function (now includes sim_users population)
curl -X POST \
  https://YOUR_PROJECT.supabase.co/functions/v1/seed-synthetics \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"count_users": 3000, "coverage_per_mindblock": 15}'
```

**Expected response:**
```json
{
  "users_created": 3000,
  "engagements_created": 36000,
  "mindblocks_covered": 2400,
  "min_engagements_per_mindblock": 14,
  "max_engagements_per_mindblock": 16
}
```

**Verify it worked:**
```sql
SELECT COUNT(*) FROM sim_users;
-- Should return: 3000
```

---

## WHAT I CHANGED

### **Updated: `/supabase/functions/seed-synthetics/index.ts`**

Added section after org_members upsert (line ~169):
```typescript
// 3b) Upsert sim_users (NEW - required for continuous synthetics runner)
const simUserUpserts: any[] = [];
const personas = [
  'motivated_beginner',
  'struggling_returner', 
  'high_risk_relapse',
  'stable_maintainer',
  'crisis_intervention',
  'family_concerned',
  'mandated_treatment',
  'dual_diagnosis',
  'chronic_relapser',
  'early_recovery'
];

for (let i = 0; i < n; i++) {
  const id = createdUserIds[i];
  const orgId = pickOrg(i);
  const personaKey = personas[i % personas.length];
  
  simUserUpserts.push({ 
    profile_id: id,
    org_id: orgId,
    persona_key: personaKey,
    cohort_label: p.cohort_label,
    started_at: new Date().toISOString(),
    metadata: { 
      email: emails[i],
      created_by: 'seed-synthetics',
      batch_timestamp: new Date().toISOString()
    }
  });
  
  if (simUserUpserts.length >= 1000 || i === n - 1) {
    await supa.from('sim_users').upsert(simUserUpserts, { onConflict: 'profile_id' });
    simUserUpserts.length = 0;
  }
}
```

### **Created: `/supabase/migrations/20260109_backfill_sim_users.sql`**

Script that:
- Finds all profiles with email like `synthetic+%@example.com`
- Assigns persona keys (10 archetypes distributed evenly)
- Inserts into `sim_users` table
- Idempotent (won't create duplicates)

---

## VERIFY IT'S WORKING

### **1. Check sim_users count**
```sql
SELECT COUNT(*) FROM sim_users;
-- Expected: 3000
```

### **2. Check via API**
```bash
curl https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/sim-users \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

**Expected response:**
```json
{
  "count": 3000,
  "users": [
    {
      "profile_id": "abc123...",
      "org_id": "org-alpha",
      "persona_key": "motivated_beginner",
      "started_at": "2026-01-09T..."
    },
    ...
  ],
  "ready": true
}
```

### **3. Test continuous runner**
```bash
# Manual trigger (creates 5 sessions immediately)
curl -X POST \
  https://YOUR_PROJECT.supabase.co/functions/v1/synthetics/run \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"target": 5}'
```

**Expected response:**
```json
{
  "success": true,
  "sessions_created": 5,
  "scene_events_created": 23,
  "mindblock_events_created": 12,
  "settings": {
    "target": 5,
    "abandon_rate": 0.15,
    "error_rate": 0.05
  },
  "timestamp": "2026-01-09T18:45:00.000Z"
}
```

### **4. Check for recent activity**
```sql
-- Should see events in last 5 minutes
SELECT 
  event_type,
  COUNT(*) as count
FROM journey_scene_events
WHERE created_at > NOW() - INTERVAL '5 minutes'
  AND event_payload->>'synthetic' = 'true'
GROUP BY event_type;
```

**Expected:**
```
   event_type    | count 
-----------------+-------
 scene_started   |     5
 scene_progressed|     3
 scene_completed |     2
```

---

## NEXT STEPS

Once `sim_users` is populated:

1. ✅ **Enable continuous synthetics:**
```bash
curl -X POST \
  https://YOUR_PROJECT.supabase.co/functions/v1/make-server-49b28b8a/synthetics/toggle \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"enabled": true}'
```

2. ✅ **Deploy continuous runner:**
```bash
supabase functions deploy synthetics
```

3. ✅ **Set up cron** (see `/docs/SYNTHETICS_SETUP.md` for options)

4. ✅ **Monitor via Synthetics Studio:**
   - Navigate to Command Center 2 → Synthetics Studio
   - Should show activity within 1-2 minutes

---

## TROUBLESHOOTING

### **Problem: Still showing 0 sim_users**

**Check 1: Does table exist?**
```sql
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_name = 'sim_users'
);
-- Should return: true
```

**Check 2: Do synthetic profiles exist?**
```sql
SELECT COUNT(*) 
FROM profiles 
WHERE email LIKE 'synthetic+%@example.com';
-- Should return: 3000
```

**Check 3: Run backfill manually**
```sql
-- Copy/paste from /supabase/migrations/20260109_backfill_sim_users.sql
```

### **Problem: Backfill says "0 users inserted"**

This means either:
- No synthetic profiles exist (run seed-synthetics first)
- sim_users already populated (check `SELECT COUNT(*) FROM sim_users`)

### **Problem: seed-synthetics fails with "table doesn't exist"**

Run the migration first:
```bash
supabase db push
```

---

## SUMMARY

**Root cause:** Original `seed-synthetics` didn't populate `sim_users` table

**Fix applied:** Updated seed function to populate `sim_users` during user creation

**Immediate solution:** Run backfill script to populate from existing synthetic profiles

**Verification:** `SELECT COUNT(*) FROM sim_users;` should return 3000

**Next:** Enable synthetics and set up cron for continuous data flow

---

**Questions? Run the diagnostic:**
```tsx
import SyntheticsDiagnostic from './components/SyntheticsDiagnostic';
<SyntheticsDiagnostic />
```

This will show you exactly what's working and what's not.
