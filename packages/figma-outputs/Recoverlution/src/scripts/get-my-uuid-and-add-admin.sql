-- ============================================================================
-- GET YOUR UUID AND ADD YOURSELF AS ADMIN
-- ============================================================================
-- This script helps you find your user_id and add yourself to app_admins
--
-- STEP 1: Find your UUID
-- STEP 2: Copy the UUID
-- STEP 3: Run the INSERT with your UUID
-- ============================================================================

-- ============================================================================
-- STEP 1: FIND YOUR UUID
-- ============================================================================
-- Replace 'your@email.com' with your actual email and run this query:

SELECT 
  id as user_id,
  email,
  created_at,
  '👆 Copy this UUID and use it in STEP 3 below' as instruction
FROM auth.users
WHERE email = 'your@email.com'  -- ⚠️ REPLACE WITH YOUR EMAIL
ORDER BY created_at DESC
LIMIT 1;

-- Expected output:
-- user_id                               | email           | created_at           | instruction
-- --------------------------------------|-----------------|----------------------|------------------
-- a1b2c3d4-e5f6-7890-abcd-ef1234567890 | your@email.com  | 2026-01-09 14:30:00  | 👆 Copy this UUID...

-- ============================================================================
-- STEP 2: COPY YOUR UUID
-- ============================================================================
-- Copy the entire UUID from the user_id column above.
-- It should look like: a1b2c3d4-e5f6-7890-abcd-ef1234567890

-- ============================================================================
-- STEP 3: ADD YOURSELF AS ADMIN
-- ============================================================================
-- Uncomment the INSERT below and replace YOUR_UUID_HERE with your actual UUID:

/*
INSERT INTO app_admins (user_id, created_by, notes)
VALUES (
  'YOUR_UUID_HERE',  -- ⚠️ PASTE YOUR UUID HERE
  'self-service',
  'Platform admin for media enrichment'
)
ON CONFLICT (user_id) DO NOTHING;
*/

-- ============================================================================
-- STEP 4: VERIFY YOU'RE AN ADMIN
-- ============================================================================
-- Uncomment and run this to verify:

/*
SELECT 
  aa.user_id,
  u.email,
  aa.created_at,
  aa.created_by,
  aa.notes,
  '✅ You are now an admin!' as status
FROM app_admins aa
JOIN auth.users u ON u.id = aa.user_id
WHERE u.email = 'your@email.com'  -- ⚠️ REPLACE WITH YOUR EMAIL
ORDER BY aa.created_at DESC;
*/

-- ============================================================================
-- ALTERNATIVE: LIST ALL USERS (if you don't know your email)
-- ============================================================================
-- Uncomment to see all users in the system:

/*
SELECT 
  id as user_id,
  email,
  created_at,
  last_sign_in_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 20;
*/

-- ============================================================================
-- DONE!
-- ============================================================================
-- After running STEP 3, you should be able to:
-- 1. Access Media Enrichment panel in Command Center 2
-- 2. Run enrichment without 403 errors
-- 3. View audit logs in enrichment_audit_log table
--
-- Next step: Deploy the relay function
--   supabase functions deploy relay_enrich_admin
-- ============================================================================
