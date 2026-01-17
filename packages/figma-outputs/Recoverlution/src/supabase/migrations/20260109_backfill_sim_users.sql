-- BACKFILL SIM_USERS FROM EXISTING SYNTHETIC PROFILES
-- Run this if you already ran seed-synthetics before and need to populate sim_users

-- This script finds all synthetic users in the profiles table and adds them to sim_users

DO $$
DECLARE
  inserted_count INTEGER := 0;
  personas TEXT[] := ARRAY[
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
BEGIN
  -- Insert synthetic users into sim_users
  -- We identify synthetic users by their email pattern: synthetic+*@example.com
  INSERT INTO sim_users (profile_id, org_id, persona_key, cohort_label, started_at, metadata)
  SELECT 
    p.id as profile_id,
    p.organization_id as org_id,
    personas[((ROW_NUMBER() OVER (ORDER BY p.email)) % 10) + 1] as persona_key,
    'synthetics_v1' as cohort_label,
    COALESCE(p.created_at, NOW()) as started_at,
    jsonb_build_object(
      'email', p.email,
      'created_by', 'backfill_script',
      'backfilled_at', NOW()
    ) as metadata
  FROM profiles p
  WHERE p.email LIKE 'synthetic+%@example.com'
    AND NOT EXISTS (
      SELECT 1 FROM sim_users su WHERE su.profile_id = p.id
    );
  
  GET DIAGNOSTICS inserted_count = ROW_COUNT;
  
  RAISE NOTICE 'Backfilled % synthetic users into sim_users table', inserted_count;
END $$;

-- Verify the backfill
SELECT 
  COUNT(*) as total_sim_users,
  COUNT(DISTINCT org_id) as unique_orgs,
  COUNT(DISTINCT persona_key) as unique_personas
FROM sim_users;

-- Show distribution by persona
SELECT 
  persona_key,
  COUNT(*) as count
FROM sim_users
GROUP BY persona_key
ORDER BY count DESC;
