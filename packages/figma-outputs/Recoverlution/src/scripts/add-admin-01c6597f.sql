-- ============================================================================
-- ADD ADMIN: 01c6597f-bb21-4e02-ad66-44370743c223
-- ============================================================================
-- Ready to execute - no edits needed!
-- ============================================================================

-- Add admin to app_admins table
INSERT INTO app_admins (user_id, created_by, notes)
VALUES (
  '01c6597f-bb21-4e02-ad66-44370743c223',
  'self-service',
  'Platform admin for Recoverlution media enrichment system'
)
ON CONFLICT (user_id) DO NOTHING;

-- Verify admin was added
SELECT 
  aa.user_id,
  u.email,
  aa.created_at,
  aa.created_by,
  aa.notes,
  '✅ Successfully added as admin!' as status
FROM app_admins aa
JOIN auth.users u ON u.id = aa.user_id
WHERE aa.user_id = '01c6597f-bb21-4e02-ad66-44370743c223';

-- Show all admins (for reference)
SELECT 
  aa.user_id,
  u.email,
  aa.created_at,
  aa.notes
FROM app_admins aa
JOIN auth.users u ON u.id = aa.user_id
ORDER BY aa.created_at DESC;
