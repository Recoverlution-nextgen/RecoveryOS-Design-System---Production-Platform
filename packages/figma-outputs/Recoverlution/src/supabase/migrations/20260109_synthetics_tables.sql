-- SYNTHETICS SYSTEM TABLES
-- Supports continuous synthetic data generation for dashboard testing

-- ============================================================================
-- 1. SYNTHETIC SETTINGS TABLE
-- ============================================================================
-- Controls the continuous synthetics runner behavior
CREATE TABLE IF NOT EXISTS synthetic_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  enabled BOOLEAN DEFAULT TRUE,
  sessions_per_min INTEGER DEFAULT 2,
  max_per_run INTEGER DEFAULT 5,
  error_rate FLOAT DEFAULT 0.05,
  abandon_rate FLOAT DEFAULT 0.15,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert default settings
INSERT INTO synthetic_settings (id, enabled, sessions_per_min, max_per_run, error_rate, abandon_rate)
VALUES (1, TRUE, 2, 5, 0.05, 0.15)
ON CONFLICT (id) DO NOTHING;

COMMENT ON TABLE synthetic_settings IS 'Configuration for continuous synthetic data generation';
COMMENT ON COLUMN synthetic_settings.sessions_per_min IS 'Target number of synthetic journey sessions to create per minute';
COMMENT ON COLUMN synthetic_settings.max_per_run IS 'Maximum sessions to create in a single run (safety limit)';
COMMENT ON COLUMN synthetic_settings.error_rate IS 'Probability of synthetic journeys encountering errors (0-1)';
COMMENT ON COLUMN synthetic_settings.abandon_rate IS 'Probability of synthetic journeys being abandoned (0-1)';

-- ============================================================================
-- 2. SIM USERS TABLE
-- ============================================================================
-- Synthetic user profiles for testing
CREATE TABLE IF NOT EXISTS sim_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  org_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  persona_key TEXT NOT NULL,
  cohort_label TEXT DEFAULT 'synthetics_v1',
  started_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id)
);

CREATE INDEX IF NOT EXISTS idx_sim_users_org ON sim_users(org_id);
CREATE INDEX IF NOT EXISTS idx_sim_users_persona ON sim_users(persona_key);
CREATE INDEX IF NOT EXISTS idx_sim_users_cohort ON sim_users(cohort_label);

COMMENT ON TABLE sim_users IS 'Synthetic user profiles for testing and demo data generation';
COMMENT ON COLUMN sim_users.persona_key IS 'User archetype identifier (e.g., "motivated_beginner", "relapse_risk")';
COMMENT ON COLUMN sim_users.cohort_label IS 'Batch identifier for grouping synthetic users';

-- ============================================================================
-- 3. ENSURE JOURNEY TABLES EXIST
-- ============================================================================
-- These should already exist, but we'll ensure they're ready for synthetics

-- Journey instances
CREATE TABLE IF NOT EXISTS journey_instances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  template_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'paused', 'completed', 'abandoned')),
  current_scene_number INTEGER DEFAULT 1,
  total_scenes INTEGER,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_journey_instances_user ON journey_instances(user_id);
CREATE INDEX IF NOT EXISTS idx_journey_instances_status ON journey_instances(status);
CREATE INDEX IF NOT EXISTS idx_journey_instances_template ON journey_instances(template_id);
CREATE INDEX IF NOT EXISTS idx_journey_instances_org ON journey_instances(organization_id);
CREATE INDEX IF NOT EXISTS idx_journey_instances_synthetic ON journey_instances((metadata->>'synthetic')) WHERE metadata->>'synthetic' = 'true';

-- Journey scene events
CREATE TABLE IF NOT EXISTS journey_scene_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  journey_instance_id UUID REFERENCES journey_instances(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  template_id TEXT NOT NULL,
  scene_number INTEGER NOT NULL,
  event_type TEXT NOT NULL,
  event_payload JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_scene_events_journey ON journey_scene_events(journey_instance_id);
CREATE INDEX IF NOT EXISTS idx_scene_events_user ON journey_scene_events(user_id);
CREATE INDEX IF NOT EXISTS idx_scene_events_type ON journey_scene_events(event_type);
CREATE INDEX IF NOT EXISTS idx_scene_events_created ON journey_scene_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scene_events_synthetic ON journey_scene_events((event_payload->>'synthetic')) WHERE event_payload->>'synthetic' = 'true';

-- Mindblock events
CREATE TABLE IF NOT EXISTS mindblock_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  individual_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  mindblock_id TEXT NOT NULL,
  signal_type TEXT NOT NULL,
  evidence JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mindblock_events_individual ON mindblock_events(individual_id);
CREATE INDEX IF NOT EXISTS idx_mindblock_events_mindblock ON mindblock_events(mindblock_id);
CREATE INDEX IF NOT EXISTS idx_mindblock_events_signal ON mindblock_events(signal_type);
CREATE INDEX IF NOT EXISTS idx_mindblock_events_created ON mindblock_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_mindblock_events_synthetic ON mindblock_events((evidence->>'synthetic')) WHERE evidence->>'synthetic' = 'true';

-- ============================================================================
-- 4. REALTIME PUBLICATION
-- ============================================================================
-- Enable realtime broadcasts for synthetics activity

-- Enable realtime on key tables
ALTER PUBLICATION supabase_realtime ADD TABLE IF EXISTS journey_scene_events;
ALTER PUBLICATION supabase_realtime ADD TABLE IF EXISTS mindblock_events;
ALTER PUBLICATION supabase_realtime ADD TABLE IF EXISTS journey_instances;

-- ============================================================================
-- 5. RLS POLICIES FOR SYNTHETICS
-- ============================================================================
-- Allow service role to manage synthetic data

-- Synthetic settings (service role only)
ALTER TABLE synthetic_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Service role can manage synthetic settings"
  ON synthetic_settings
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Sim users (service role only)
ALTER TABLE sim_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Service role can manage sim users"
  ON sim_users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to read synthetic activity (for dashboards)
CREATE POLICY IF NOT EXISTS "Authenticated users can view synthetic journey events"
  ON journey_scene_events
  FOR SELECT
  TO authenticated
  USING (event_payload->>'synthetic' = 'true');

CREATE POLICY IF NOT EXISTS "Authenticated users can view synthetic mindblock events"
  ON mindblock_events
  FOR SELECT
  TO authenticated
  USING (evidence->>'synthetic' = 'true');

-- ============================================================================
-- 6. HELPER FUNCTIONS
-- ============================================================================

-- Function to get synthetics activity summary
CREATE OR REPLACE FUNCTION get_synthetics_activity_summary(hours INTEGER DEFAULT 24)
RETURNS JSON AS $$
DECLARE
  result JSON;
  since TIMESTAMPTZ;
BEGIN
  since := NOW() - (hours || ' hours')::INTERVAL;
  
  SELECT json_build_object(
    'period_hours', hours,
    'since', since,
    'scene_events', (
      SELECT COUNT(*)
      FROM journey_scene_events
      WHERE created_at >= since
        AND event_payload->>'synthetic' = 'true'
    ),
    'mindblock_events', (
      SELECT COUNT(*)
      FROM mindblock_events
      WHERE created_at >= since
        AND evidence->>'synthetic' = 'true'
    ),
    'journeys_completed', (
      SELECT COUNT(*)
      FROM journey_instances
      WHERE completed_at >= since
        AND metadata->>'synthetic' = 'true'
        AND status = 'completed'
    ),
    'active_journeys', (
      SELECT COUNT(*)
      FROM journey_instances
      WHERE metadata->>'synthetic' = 'true'
        AND status = 'active'
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION get_synthetics_activity_summary IS 'Returns activity summary for synthetic data over specified hours';

-- ============================================================================
-- 7. CLEANUP FUNCTION
-- ============================================================================

-- Function to cleanup old synthetic data
CREATE OR REPLACE FUNCTION cleanup_old_synthetic_data(retain_days INTEGER DEFAULT 45)
RETURNS JSON AS $$
DECLARE
  cutoff TIMESTAMPTZ;
  deleted_events INTEGER := 0;
  deleted_journeys INTEGER := 0;
BEGIN
  cutoff := NOW() - (retain_days || ' days')::INTERVAL;
  
  -- Delete old scene events
  DELETE FROM journey_scene_events
  WHERE created_at < cutoff
    AND event_payload->>'synthetic' = 'true';
  GET DIAGNOSTICS deleted_events = ROW_COUNT;
  
  -- Delete old mindblock events
  DELETE FROM mindblock_events
  WHERE created_at < cutoff
    AND evidence->>'synthetic' = 'true';
  
  -- Delete old completed journeys
  DELETE FROM journey_instances
  WHERE completed_at < cutoff
    AND metadata->>'synthetic' = 'true'
    AND status IN ('completed', 'abandoned');
  GET DIAGNOSTICS deleted_journeys = ROW_COUNT;
  
  RETURN json_build_object(
    'deleted_events', deleted_events,
    'deleted_journeys', deleted_journeys,
    'cutoff_date', cutoff
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION cleanup_old_synthetic_data IS 'Removes synthetic data older than specified days (default 45)';

-- ============================================================================
-- DONE
-- ============================================================================

-- Grant necessary permissions
GRANT SELECT ON synthetic_settings TO authenticated;
GRANT SELECT ON sim_users TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT EXECUTE ON FUNCTION get_synthetics_activity_summary TO authenticated;
GRANT EXECUTE ON FUNCTION cleanup_old_synthetic_data TO service_role;
