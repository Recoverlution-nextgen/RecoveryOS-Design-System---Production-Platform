# 🤖 SYNTHETICS ENGINE - DOCUMENTATION INDEX

**Complete automated continuous data generation system**

---

## 📑 DOCUMENTATION FILES

### **🚀 Quick Start (Read This First)**
**File:** `ACTIVATE_SYNTHETICS.md`  
**Time:** 5 minutes  
**Purpose:** Step-by-step activation guide

**What's inside:**
- Prerequisites checklist
- Dashboard scheduler setup (Option A) ⭐
- Edge Function scheduler setup (Option B)
- Verification steps
- Quick controls
- Troubleshooting

**Start here if you just want to get it running!**

---

### **📖 Complete Documentation**
**File:** `SYNTHETICS_AUTOMATION_COMPLETE.md`  
**Length:** Comprehensive  
**Purpose:** Full system reference

**What's inside:**
- Complete architecture overview
- All components explained
- How the automation works
- Control interface (UI, API, SQL)
- Data volume expectations
- Monitoring & observability
- Safety & best practices
- Cleanup strategies
- API reference
- Intensity presets
- Troubleshooting guide

**Read this to understand how everything works.**

---

### **📋 Summary & Checklist**
**File:** `SYNTHETICS_COMPLETE_SUMMARY.md`  
**Length:** Overview  
**Purpose:** Quick reference & status

**What's inside:**
- What you have deployed
- How it runs (flow diagram)
- One-time activation steps
- Quick controls reference
- Expected data volume
- Monitoring queries
- Final checklist

**Read this for a high-level overview.**

---

## 🗂️ CODE FILES

### **Edge Function**
**File:** `/supabase/functions/synthetics/index.ts` (deployed)  
**Purpose:** Core data generator  
**Tech:** Deno, Supabase client  
**Endpoints:**
- `POST /cron` - Auto-run (called by scheduler)
- `POST /run?target=N` - Manual trigger
- `GET /health` - Health check

---

### **Control API**
**File:** `/supabase/functions/server/synthetics-control.tsx`  
**Purpose:** Management endpoints  
**Routes:**
- `GET /status` - Current status
- `POST /toggle` - Start/stop
- `POST /settings` - Update config
- `POST /run-now` - Manual run
- `GET /activity/:hours` - Analytics
- `POST /cleanup` - Data removal
- `GET /sim-users` - User pool

---

### **UI Component**
**File:** `/components/cc2/SyntheticsStudio.tsx`  
**Purpose:** Visual control panel  
**Features:**
- Real-time status display
- Start/Stop button
- Settings editor
- Activity charts
- Manual triggers
- Cleanup controls

---

### **Main Server Integration**
**File:** `/supabase/functions/server/index.tsx`  
**Change:** Added route: `apiApp.route('/synthetics', syntheticsControlRoutes);`

---

## 🗄️ DATABASE

### **Settings Table**
**Table:** `public.synthetic_settings`  
**Purpose:** Configuration storage  
**Columns:**
- `id` - Always 1 (singleton)
- `enabled` - On/off switch
- `sessions_per_min` - Frequency
- `max_per_run` - Batch size
- `error_rate` - Error probability
- `abandon_rate` - Abandon probability
- `bias` - Optional targeting (JSON)
- `updated_at` - Last modified

**Query:**
```sql
SELECT * FROM public.synthetic_settings;
```

---

## 🎯 QUICK REFERENCE

### **URLs:**
```
Edge Function:
https://wzeqlkbmqxlsjryidagf.supabase.co/functions/v1/synthetics

Control API:
https://wzeqlkbmqxlsjryidagf.supabase.co/functions/v1/make-server-49b28b8a/synthetics
```

### **Quick Controls:**
```sql
-- Pause
UPDATE synthetic_settings SET enabled = false WHERE id = 1;

-- Resume
UPDATE synthetic_settings SET enabled = true WHERE id = 1;

-- Increase to 5/min
UPDATE synthetic_settings SET sessions_per_min = 5, max_per_run = 8 WHERE id = 1;

-- Decrease to 1/min
UPDATE synthetic_settings SET sessions_per_min = 1, max_per_run = 3 WHERE id = 1;
```

### **Check Activity:**
```sql
SELECT count(*) FROM journey_scene_events 
WHERE created_at > now() - interval '5 minutes'
AND event_payload->>'synthetic' = 'true';
```

---

## 📊 DATA GENERATED

### **Tables Populated:**
- `journey_instances` - Journey sessions
- `journey_instance_scenes` - Scene progress
- `journey_scene_events` - All actions
- `journey_scene_captures` - User responses
- `journey_resistance_checks` - Resistance data
- `journey_real_world_triggers` - RWT events
- `mindblock_events` - State signals

### **Event Types:**
- scene_opened
- prompt_viewed
- capture_submitted
- resistance_submitted
- scene_completed

### **Mindblock Signals:**
- activation
- release
- reframe
- alignment_choice
- transfer

---

## ⚙️ CONFIGURATION

### **Default Settings:**
```
enabled: true
sessions_per_min: 2
max_per_run: 5
error_rate: 0.03 (3%)
abandon_rate: 0.08 (8%)
```

### **Intensity Presets:**
```
Light:     1 session/min  → ~14K events/day
Moderate:  2 sessions/min → ~29K events/day (default)
Heavy:     5 sessions/min → ~72K events/day
Intense:   10 sessions/min → ~144K events/day
```

---

## 🎬 ACTIVATION FLOW

```
1. Read ACTIVATE_SYNTHETICS.md
   ↓
2. Verify prerequisites (sim_users, templates)
   ↓
3. Set up cron job (Dashboard)
   ↓
4. Wait 2-3 minutes
   ↓
5. Verify activity (SQL query)
   ↓
6. Add CC2 Studio UI (optional)
   ↓
7. Set up auto-cleanup (optional)
   ↓
8. Done! ✅
```

---

## 🆘 TROUBLESHOOTING

### **No activity?**
1. Check `synthetic_settings.enabled = true`
2. Verify cron job exists
3. Check Edge Function deployed
4. Check logs for errors
5. Verify sim_users exist
6. Verify active templates exist

### **Too much activity?**
```sql
UPDATE synthetic_settings SET sessions_per_min = 1, max_per_run = 2 WHERE id = 1;
```

### **Want to stop?**
```sql
UPDATE synthetic_settings SET enabled = false WHERE id = 1;
```

---

## ✅ CHECKLIST

### **Deployed:**
- [x] Edge Function `synthetics`
- [x] Control API `/synthetics` routes
- [x] Settings table `synthetic_settings`
- [x] UI component `SyntheticsStudio.tsx`
- [x] Documentation (3 files)

### **To Activate:**
- [ ] Set up cron job
- [ ] Verify activity
- [ ] Add UI to CC2
- [ ] Set up cleanup (optional)

### **To Monitor:**
- [ ] Check CC2 Synthetics Studio
- [ ] Run activity queries
- [ ] Review Edge Function logs
- [ ] Verify dashboards populating

---

## 📚 READ NEXT

**If you want to:**
- ⚡ **Just activate it** → Read `ACTIVATE_SYNTHETICS.md`
- 📖 **Understand it fully** → Read `SYNTHETICS_AUTOMATION_COMPLETE.md`
- 📋 **See the overview** → Read `SYNTHETICS_COMPLETE_SUMMARY.md`
- 🔧 **Troubleshoot** → Check troubleshooting sections in any doc
- 🎮 **Control it** → Use CC2 Synthetics Studio or API endpoints

---

## 🎉 STATUS

**System:** ✅ Fully deployed and tested  
**Documentation:** ✅ Complete (3 guides)  
**Activation:** ⏳ Waiting for cron setup  
**Time to Live Data:** 2-3 minutes after activation  

**You have everything you need to activate continuous automated data generation!**

---

**Start here:** `ACTIVATE_SYNTHETICS.md` (5 minutes to running system)

