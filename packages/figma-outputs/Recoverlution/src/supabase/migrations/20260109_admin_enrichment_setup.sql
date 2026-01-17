-- ============================================================================
-- ADMIN & ENRICHMENT SYSTEM SETUP
-- ============================================================================
-- Creates tables for:
-- 1. app_admins - Admin user registry
-- 2. enrichment_audit_log - Enrichment request audit trail
-- 3. media_assets - Enriched media asset metadata
-- ============================================================================

-- ============================================================================
-- 1. APP ADMINS TABLE
-- ============================================================================
-- Tracks which users have admin privileges for platform operations

CREATE TABLE IF NOT EXISTS app_admins (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT,
  notes TEXT
);

COMMENT ON TABLE app_admins IS 'Platform admins who can execute privileged operations (enrichment, etc.)';
COMMENT ON COLUMN app_admins.user_id IS 'User ID from auth.users';
COMMENT ON COLUMN app_admins.created_by IS 'Who granted admin access (email or user_id)';
COMMENT ON COLUMN app_admins.notes IS 'Optional notes about admin access grant';

-- Enable RLS
ALTER TABLE app_admins ENABLE ROW LEVEL SECURITY;

-- Service role has full access (bypasses RLS anyway)
GRANT ALL ON app_admins TO service_role;

-- Authenticated users can read their own admin status
CREATE POLICY IF NOT EXISTS "Users can check if they are admin"
  ON app_admins
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Only service role can insert/update/delete
-- (No policies needed - RLS denies by default, service_role bypasses)

-- ============================================================================
-- 2. ENRICHMENT AUDIT LOG TABLE
-- ============================================================================
-- Tracks all enrichment requests for observability and compliance

CREATE TABLE IF NOT EXISTS enrichment_audit_log (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  request_id TEXT NOT NULL,
  requested_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  force BOOLEAN NOT NULL DEFAULT FALSE,
  prefix TEXT,
  upstream_status INTEGER,
  ok BOOLEAN,
  error_text TEXT,
  result JSONB
);

CREATE INDEX IF NOT EXISTS idx_enrichment_audit_requested_at ON enrichment_audit_log(requested_at DESC);
CREATE INDEX IF NOT EXISTS idx_enrichment_audit_requested_by ON enrichment_audit_log(requested_by);
CREATE INDEX IF NOT EXISTS idx_enrichment_audit_request_id ON enrichment_audit_log(request_id);

COMMENT ON TABLE enrichment_audit_log IS 'Audit trail for all media enrichment requests';
COMMENT ON COLUMN enrichment_audit_log.request_id IS 'Unique request identifier from Edge Function';
COMMENT ON COLUMN enrichment_audit_log.requested_by IS 'User who triggered the enrichment';
COMMENT ON COLUMN enrichment_audit_log.force IS 'Whether force re-enrichment was requested';
COMMENT ON COLUMN enrichment_audit_log.prefix IS 'Storage prefix filter (if any)';
COMMENT ON COLUMN enrichment_audit_log.upstream_status IS 'HTTP status from internal enrichment endpoint';
COMMENT ON COLUMN enrichment_audit_log.ok IS 'Whether enrichment succeeded';
COMMENT ON COLUMN enrichment_audit_log.error_text IS 'Error message if enrichment failed';
COMMENT ON COLUMN enrichment_audit_log.result IS 'Full enrichment result JSON';

-- Enable RLS
ALTER TABLE enrichment_audit_log ENABLE ROW LEVEL SECURITY;

-- Service role has full access
GRANT ALL ON enrichment_audit_log TO service_role;

-- Admins can view audit logs
CREATE POLICY IF NOT EXISTS "Admins can view enrichment audit logs"
  ON enrichment_audit_log
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM app_admins WHERE user_id = auth.uid()
    )
  );

-- ============================================================================
-- 3. MEDIA ASSETS TABLE
-- ============================================================================
-- Stores enriched metadata for all media assets in Supabase Storage

CREATE TABLE IF NOT EXISTS media_assets (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  bucket_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  mime_type TEXT,
  size_bytes BIGINT,
  width INTEGER,
  height INTEGER,
  duration_seconds INTEGER,
  public_url TEXT,
  thumbnail_url TEXT,
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  enriched_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(bucket_name, file_path)
);

CREATE INDEX IF NOT EXISTS idx_media_assets_bucket ON media_assets(bucket_name);
CREATE INDEX IF NOT EXISTS idx_media_assets_mime_type ON media_assets(mime_type);
CREATE INDEX IF NOT EXISTS idx_media_assets_tags ON media_assets USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_media_assets_enriched_at ON media_assets(enriched_at DESC);

COMMENT ON TABLE media_assets IS 'Enriched metadata for media assets in Supabase Storage';
COMMENT ON COLUMN media_assets.bucket_name IS 'Storage bucket name';
COMMENT ON COLUMN media_assets.file_path IS 'Full path within bucket';
COMMENT ON COLUMN media_assets.file_name IS 'File name only (no path)';
COMMENT ON COLUMN media_assets.mime_type IS 'MIME type (e.g., image/jpeg, video/mp4)';
COMMENT ON COLUMN media_assets.size_bytes IS 'File size in bytes';
COMMENT ON COLUMN media_assets.width IS 'Image/video width in pixels';
COMMENT ON COLUMN media_assets.height IS 'Image/video height in pixels';
COMMENT ON COLUMN media_assets.duration_seconds IS 'Audio/video duration in seconds';
COMMENT ON COLUMN media_assets.public_url IS 'Public URL (if bucket is public)';
COMMENT ON COLUMN media_assets.thumbnail_url IS 'Generated thumbnail URL';
COMMENT ON COLUMN media_assets.tags IS 'Searchable tags (schema, category, etc.)';
COMMENT ON COLUMN media_assets.metadata IS 'Additional metadata (JSON)';
COMMENT ON COLUMN media_assets.enriched_at IS 'When enrichment was performed';

-- Enable RLS
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

-- Service role has full access
GRANT ALL ON media_assets TO service_role;

-- Authenticated users can read all media assets
CREATE POLICY IF NOT EXISTS "Authenticated users can view media assets"
  ON media_assets
  FOR SELECT
  TO authenticated
  USING (true);

-- Only service role can insert/update/delete
-- (No policies needed - RLS denies by default, service_role bypasses)

-- ============================================================================
-- 4. HELPER FUNCTIONS
-- ============================================================================

-- Function to get enrichment statistics
CREATE OR REPLACE FUNCTION get_enrichment_stats()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_assets', (SELECT COUNT(*) FROM media_assets),
    'by_mime_type', (
      SELECT json_object_agg(
        COALESCE(mime_type, 'unknown'),
        count
      )
      FROM (
        SELECT mime_type, COUNT(*) as count
        FROM media_assets
        GROUP BY mime_type
        ORDER BY count DESC
      ) t
    ),
    'by_bucket', (
      SELECT json_object_agg(bucket_name, count)
      FROM (
        SELECT bucket_name, COUNT(*) as count
        FROM media_assets
        GROUP BY bucket_name
        ORDER BY count DESC
      ) t
    ),
    'recent_enrichments', (
      SELECT COUNT(*)
      FROM media_assets
      WHERE enriched_at >= NOW() - INTERVAL '24 hours'
    ),
    'total_size_mb', (
      SELECT ROUND((SUM(size_bytes) / 1024.0 / 1024.0)::numeric, 2)
      FROM media_assets
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION get_enrichment_stats IS 'Returns enrichment statistics and asset counts';

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION get_enrichment_stats TO authenticated;

-- ============================================================================
-- 5. INITIAL ADMIN SETUP (OPTIONAL)
-- ============================================================================
-- Uncomment and replace with your user_id to add yourself as admin:

-- INSERT INTO app_admins (user_id, created_by, notes)
-- VALUES (
--   'YOUR_USER_ID_HERE',  -- Replace with your auth.users.id
--   'migration',
--   'Initial admin setup'
-- )
-- ON CONFLICT (user_id) DO NOTHING;

-- To find your user_id, run:
-- SELECT id, email FROM auth.users WHERE email = 'your@email.com';

-- ============================================================================
-- DONE
-- ============================================================================

-- Grant necessary permissions
GRANT SELECT ON app_admins TO authenticated;
GRANT SELECT ON enrichment_audit_log TO authenticated;
GRANT SELECT ON media_assets TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT EXECUTE ON FUNCTION get_enrichment_stats TO authenticated;
