-- ============================================================================
-- ADD ADMIN USER
-- ============================================================================
-- This script helps you add yourself (or other users) as platform admin
-- 
-- USAGE:
-- 1. Find your user_id by running the SELECT query below
-- 2. Replace 'YOUR_EMAIL_HERE' with your actual email
-- 3. Copy the user_id from the result
-- 4. Uncomment the INSERT statement and paste your user_id
-- 5. Run this script
-- ============================================================================

-- Step 1: Find your user_id
-- Run this query and note your user_id:
SELECT 
  id as user_id,
  email,
  created_at
FROM auth.users
WHERE email = 'YOUR_EMAIL_HERE'  -- Replace with your actual email
ORDER BY created_at DESC
LIMIT 1;

-- Step 2: Insert into app_admins
-- Uncomment the lines below and replace YOUR_USER_ID with the id from Step 1:

/*
INSERT INTO app_admins (user_id, created_by, notes)
VALUES (
  'YOUR_USER_ID',  -- Paste your user_id here (format: a1b2c3d4-e5f6-...)
  'migration',
  'Initial platform admin'
)
ON CONFLICT (user_id) DO NOTHING;
*/

-- Step 3: Verify admin was added
-- Uncomment to verify:

/*
SELECT 
  aa.user_id,
  u.email,
  aa.created_at,
  aa.created_by,
  aa.notes
FROM app_admins aa
JOIN auth.users u ON u.id = aa.user_id
ORDER BY aa.created_at DESC;
*/

-- ============================================================================
-- EXAMPLE (DO NOT USE - Replace with your actual values)
-- ============================================================================

-- If your email is 'admin@recoverlution.com' and user_id is 'a1b2c3d4-...':

-- INSERT INTO app_admins (user_id, created_by, notes)
-- VALUES (
--   'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
--   'migration',
--   'Platform admin for media enrichment'
-- );

-- ============================================================================
-- ADD MULTIPLE ADMINS (Optional)
-- ============================================================================

-- Uncomment and modify to add multiple admins at once:

/*
INSERT INTO app_admins (user_id, created_by, notes)
VALUES 
  ('USER_ID_1', 'migration', 'Primary admin'),
  ('USER_ID_2', 'migration', 'Secondary admin'),
  ('USER_ID_3', 'migration', 'Media admin')
ON CONFLICT (user_id) DO NOTHING;
*/

-- ============================================================================
-- REMOVE ADMIN ACCESS (If needed)
-- ============================================================================

-- To remove admin access from a user:

-- DELETE FROM app_admins WHERE user_id = 'USER_ID_TO_REMOVE';

-- ============================================================================
-- DONE
-- ============================================================================

-- After adding yourself as admin, you can:
-- 1. Access Media Enrichment panel in Command Center 2
-- 2. Trigger enrichment via UI
-- 3. View audit logs in enrichment_audit_log table
