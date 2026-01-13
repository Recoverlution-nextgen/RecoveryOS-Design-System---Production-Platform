-- WARNING: This schema is for context only and is not meant to be run.  
-- Table order and constraints may not be valid for execution.  
  
CREATE TABLE public.Mindblock_Families_v0.3 (  
  family_id text,  
  schema_code text,  
  schema_name text,  
  family_index bigint,  
  family_code text,  
  family_name text,  
  archetype text,  
  routing_default text  
);  
CREATE TABLE public.Mindblock_Family_Membership_v0.3 (  
  family_id text,  
  family_code text,  
  family_name text,  
  mindblock_id text,  
  mindblock_code text  
);  
CREATE TABLE public.Mindblocks_v0.3 (  
  mindblock_id text,  
  mindblock_code text,  
  mindblock_name text,  
  schema_code text,  
  schema_name text,  
  family_code text,  
  family_name text,  
  archetype text,  
  limiting_prediction text,  
  replacement_truth text,  
  best_primitive text,  
  best_voice_stances text,  
  heat_band text,  
  kbe_target text,  
  proof_artifacts text,  
  transfer_test text  
);  
CREATE TABLE public.Schemas_v0.3 (  
  schema_code text,  
  schema_name text,  
  schema_desc text  
);  
CREATE TABLE public._journeys_mb_family_stage (  
  template_id text NOT NULL,  
  scene_number integer NOT NULL,  
  mindblock_id uuid NOT NULL,  
  family_id uuid NOT NULL  
);  
CREATE TABLE public._journeys_mb_stage (  
  template_id text NOT NULL,  
  scene_number integer NOT NULL,  
  mb_key text NOT NULL,  
  mindblock_id uuid  
);  
CREATE TABLE public._journeys_schema_stage (  
  template_id text NOT NULL,  
  scene_number integer NOT NULL,  
  schema_key text NOT NULL,  
  schema_id text  
);  
CREATE TABLE public._stg_navicues_seed (  
  navicue_id text NOT NULL,  
  name text,  
  title text,  
  family text,  
  pillar_id text,  
  kbe_layer text,  
  track text,  
  text_line text NOT NULL,  
  response_type text NOT NULL,  
  response_options jsonb,  
  voice_archetype text,  
  delivery_mechanism text,  
  intent_primary text,  
  intent_secondary text,  
  schemas ARRAY,  
  mindblock_codes ARRAY,  
  tags ARRAY,  
  batch_id uuid NOT NULL DEFAULT gen_random_uuid(),  
  source_file text,  
  loaded_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT _stg_navicues_seed_pkey PRIMARY KEY (navicue_id, batch_id)  
);  
CREATE TABLE public.access_audit_log (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  actor_id uuid,  
  actor_role text,  
  individual_id uuid,  
  purpose text NOT NULL CHECK (purpose = ANY (ARRAY['care'::text, 'personalization'::text, 'safety'::text, 'research'::text, 'billing'::text, 'support'::text])),  
  object_type text NOT NULL,  
  object_id text NOT NULL,  
  fields_accessed ARRAY DEFAULT '{}'::text[],  
  access_mode text NOT NULL CHECK (access_mode = ANY (ARRAY['read'::text, 'write'::text, 'delete'::text, 'export'::text])),  
  allowed boolean NOT NULL DEFAULT true,  
  decision jsonb DEFAULT '{}'::jsonb,  
  occurred_at timestamp with time zone DEFAULT now(),  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT access_audit_log_pkey PRIMARY KEY (id),  
  CONSTRAINT access_audit_log_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.activities (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  actor_id uuid NOT NULL,  
  subject_type text NOT NULL,  
  subject_id text NOT NULL,  
  verb text NOT NULL,  
  metadata jsonb DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT activities_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.activity_events (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  organization_id uuid,  
  event_type text NOT NULL,  
  status USER-DEFINED DEFAULT 'scheduled'::event_status,  
  occurred_at timestamp with time zone DEFAULT now(),  
  metadata jsonb DEFAULT '{}'::jsonb,  
  profile_id uuid,  
  CONSTRAINT activity_events_pkey PRIMARY KEY (id),  
  CONSTRAINT activity_events_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT activity_events_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)  
);  
CREATE TABLE public.adverse_events (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  occurred_at timestamp with time zone NOT NULL DEFAULT now(),  
  kind USER-DEFINED NOT NULL,  
  severity smallint DEFAULT 3 CHECK (severity >= 1 AND severity <= 5),  
  content_kind text DEFAULT 'block'::text CHECK (content_kind = ANY (ARRAY['block'::text, 'sequence'::text, 'navicue'::text, 'article'::text, 'lesson'::text, 'practice'::text, 'other'::text])),  
  content_id text,  
  deployment_kind text,  
  deployment_id text,  
  notes_md text,  
  meta jsonb DEFAULT '{}'::jsonb,  
  individual_id uuid,  
  profile_id uuid,  
  CONSTRAINT adverse_events_pkey PRIMARY KEY (id),  
  CONSTRAINT adverse_events_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.alerts (  
  id bigint NOT NULL DEFAULT nextval('alerts_id_seq'::regclass),  
  severity text,  
  routed_to jsonb,  
  ts timestamp with time zone DEFAULT now(),  
  profile_id uuid,  
  CONSTRAINT alerts_pkey PRIMARY KEY (id),  
  CONSTRAINT alerts_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.anchor_points (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  organization_id uuid,  
  label text NOT NULL,  
  description text,  
  weight numeric,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT anchor_points_pkey PRIMARY KEY (id),  
  CONSTRAINT anchor_points_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT anchor_points_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)  
);  
CREATE TABLE public.app_admins (  
  user_id uuid NOT NULL,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  note text,  
  CONSTRAINT app_admins_pkey PRIMARY KEY (user_id),  
  CONSTRAINT app_admins_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)  
);  
CREATE TABLE public.app_config (  
  key text NOT NULL,  
  value text NOT NULL,  
  CONSTRAINT app_config_pkey PRIMARY KEY (key)  
);  
CREATE TABLE public.app_storage (  
  key text NOT NULL,  
  value jsonb NOT NULL,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT app_storage_pkey PRIMARY KEY (key)  
);  
CREATE TABLE public.arousal_episodes (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  opened_at timestamp with time zone NOT NULL,  
  closed_at timestamp with time zone,  
  peak_at timestamp with time zone,  
  spike_index numeric CHECK (spike_index IS NULL OR spike_index >= 0::numeric AND spike_index <= 1::numeric),  
  mttr_seconds integer,  
  open_trigger jsonb DEFAULT '{}'::jsonb,  
  closure_rule jsonb DEFAULT '{}'::jsonb,  
  confidence numeric DEFAULT 0.7 CHECK (confidence >= 0::numeric AND confidence <= 1::numeric),  
  trace_id uuid,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT arousal_episodes_pkey PRIMARY KEY (id),  
  CONSTRAINT arousal_episodes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.article_blocks (  
  article_id bigint NOT NULL,  
  block_id text NOT NULL,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT article_blocks_pkey PRIMARY KEY (article_id, block_id),  
  CONSTRAINT article_blocks_article_id_fkey FOREIGN KEY (article_id) REFERENCES public.articles(id),  
  CONSTRAINT article_blocks_block_id_fkey FOREIGN KEY (block_id) REFERENCES public.blocks(id)  
);  
CREATE TABLE public.article_mindblocks (  
  article_id bigint NOT NULL,  
  mindblock_id uuid NOT NULL,  
  relevance_strength numeric,  
  CONSTRAINT article_mindblocks_pkey PRIMARY KEY (article_id, mindblock_id),  
  CONSTRAINT article_mindblocks_article_id_fkey FOREIGN KEY (article_id) REFERENCES public.articles(id),  
  CONSTRAINT article_mindblocks_mindblock_id_fkey FOREIGN KEY (mindblock_id) REFERENCES public.mindblocks(id)  
);  
CREATE TABLE public.articles (  
  id bigint NOT NULL DEFAULT nextval('articles_id_seq'::regclass),  
  slug text UNIQUE,  
  title text NOT NULL,  
  summary_md text,  
  body_md text,  
  level USER-DEFINED DEFAULT 'patient'::content_level,  
  status USER-DEFINED NOT NULL DEFAULT 'draft'::content_status,  
  est_read_min integer,  
  pillar_id text,  
  concept_id text,  
  theme_id text,  
  block_id text,  
  tags ARRAY DEFAULT '{}'::text[],  
  navicue_types ARRAY DEFAULT '{}'::text[],  
  hero_media_id bigint,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  status_text text,  
  subtitle text,  
  pillar_name text,  
  concept_name text,  
  theme_name text,  
  thought_leader text,  
  read_time_minutes integer,  
  hero_image text,  
  difficulty text,  
  summary text,  
  sections jsonb,  
  related_content jsonb,  
  blocks ARRAY,  
  keywords jsonb,  
  external_id text UNIQUE,  
  CONSTRAINT articles_pkey PRIMARY KEY (id),  
  CONSTRAINT articles_pillar_id_fkey FOREIGN KEY (pillar_id) REFERENCES public.pillars(id),  
  CONSTRAINT articles_concept_id_fkey FOREIGN KEY (concept_id) REFERENCES public.concepts(id),  
  CONSTRAINT articles_theme_id_fkey FOREIGN KEY (theme_id) REFERENCES public.themes(id),  
  CONSTRAINT articles_block_id_fkey FOREIGN KEY (block_id) REFERENCES public.blocks(id),  
  CONSTRAINT articles_hero_media_id_fkey FOREIGN KEY (hero_media_id) REFERENCES public.media_assets(id)  
);  
CREATE TABLE public.authors (  
  id bigint NOT NULL DEFAULT nextval('authors_id_seq'::regclass),  
  given_name text,  
  family_name text,  
  affiliation text,  
  CONSTRAINT authors_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.bandit_candidates (  
  decision_id uuid NOT NULL,  
  rank integer NOT NULL,  
  content_type text NOT NULL,  
  content_id text NOT NULL,  
  propensity numeric NOT NULL CHECK (propensity > 0::numeric AND propensity <= 1::numeric),  
  score numeric,  
  features jsonb NOT NULL DEFAULT '{}'::jsonb,  
  CONSTRAINT bandit_candidates_pkey PRIMARY KEY (decision_id, rank),  
  CONSTRAINT bandit_candidates_decision_id_fkey FOREIGN KEY (decision_id) REFERENCES public.bandit_decisions(id)  
);  
CREATE TABLE public.bandit_decisions (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  made_at timestamp with time zone NOT NULL DEFAULT now(),  
  policy_id text NOT NULL,  
  context jsonb NOT NULL DEFAULT '{}'::jsonb,  
  chosen_type text NOT NULL,  
  chosen_id text NOT NULL,  
  chosen_propensity numeric NOT NULL CHECK (chosen_propensity > 0::numeric AND chosen_propensity <= 1::numeric),  
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,  
  CONSTRAINT bandit_decisions_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.bandit_rewards (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  decision_id uuid NOT NULL,  
  exposure_id uuid,  
  user_id uuid NOT NULL,  
  reward_key text NOT NULL,  
  reward_value numeric NOT NULL,  
  window_hours integer NOT NULL DEFAULT 24,  
  computed_at timestamp with time zone NOT NULL DEFAULT now(),  
  components jsonb NOT NULL DEFAULT '{}'::jsonb,  
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,  
  CONSTRAINT bandit_rewards_pkey PRIMARY KEY (id),  
  CONSTRAINT bandit_rewards_decision_id_fkey FOREIGN KEY (decision_id) REFERENCES public.bandit_decisions(id)  
);  
CREATE TABLE public.belief_ladders (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  schema_id text NOT NULL,  
  title text NOT NULL,  
  description_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT belief_ladders_pkey PRIMARY KEY (id),  
  CONSTRAINT belief_ladders_schema_id_fkey FOREIGN KEY (schema_id) REFERENCES public.schema_catalog(id)  
);  
CREATE TABLE public.block_assignments (  
  user_id uuid NOT NULL,  
  block_id text NOT NULL,  
  week_start date NOT NULL,  
  phase text NOT NULL,  
  status text NOT NULL DEFAULT 'pending'::text,  
  started_at timestamp with time zone,  
  completed_at timestamp with time zone,  
  organization_id uuid,  
  profile_id uuid,  
  CONSTRAINT block_assignments_pkey PRIMARY KEY (user_id, block_id, week_start, phase),  
  CONSTRAINT block_assignments_block_id_fkey FOREIGN KEY (block_id) REFERENCES public.blocks(id),  
  CONSTRAINT block_assignments_user_fk FOREIGN KEY (user_id) REFERENCES public.profiles(id),  
  CONSTRAINT block_assignments_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)  
);  
CREATE TABLE public.block_assignments_audit (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  operation text NOT NULL,  
  old_data jsonb,  
  changed_by uuid,  
  changed_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT block_assignments_audit_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.block_deployments (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  block_id text NOT NULL,  
  delivered_at timestamp with time zone NOT NULL DEFAULT now(),  
  completed_at timestamp with time zone,  
  status text NOT NULL DEFAULT 'started'::text CHECK (status = ANY (ARRAY['started'::text, 'completed'::text, 'skipped'::text, 'abandoned'::text])),  
  source_type text,  
  source_id text,  
  sequence_id text,  
  context jsonb DEFAULT '{}'::jsonb,  
  context_tags ARRAY DEFAULT '{}'::text[],  
  voice_id text,  
  pre_state_checkin_ts timestamp with time zone,  
  post_state_checkin_ts timestamp with time zone,  
  transfer_receipt_id bigint,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  exposure_id uuid,  
  queue_id uuid,  
  rationale jsonb DEFAULT '{}'::jsonb CHECK (rationale IS NULL OR jsonb_typeof(rationale) = 'object'::text),  
  experiment_key text,  
  experiment_id uuid,  
  variant_key text,  
  variant_id uuid,  
  decision_source USER-DEFINED DEFAULT 'policy_ai'::decision_source_enum,  
  individual_id uuid,  
  profile_id uuid,  
  CONSTRAINT block_deployments_pkey PRIMARY KEY (id),  
  CONSTRAINT block_deployments_block_id_fkey FOREIGN KEY (block_id) REFERENCES public.blocks(id),  
  CONSTRAINT block_deployments_sequence_id_fkey FOREIGN KEY (sequence_id) REFERENCES public.cue_sequences(id),  
  CONSTRAINT block_deployments_voice_id_fkey FOREIGN KEY (voice_id) REFERENCES public.voice_archetypes(id),  
  CONSTRAINT block_deployments_transfer_receipt_id_fkey FOREIGN KEY (transfer_receipt_id) REFERENCES public.receipts(id),  
  CONSTRAINT block_deployments_exposure_fk FOREIGN KEY (exposure_id) REFERENCES public.feed_exposures(id),  
  CONSTRAINT block_deployments_queue_fk FOREIGN KEY (queue_id) REFERENCES public.user_feed_queue_v2(id),  
  CONSTRAINT block_deployments_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.block_followups (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  block_id text NOT NULL,  
  followup USER-DEFINED NOT NULL,  
  scheduled_at timestamp with time zone NOT NULL DEFAULT now(),  
  completed_at timestamp with time zone,  
  state_checkin_ts timestamp with time zone,  
  durability_score numeric CHECK (durability_score IS NULL OR durability_score >= 0::numeric AND durability_score <= 1::numeric),  
  deltas jsonb DEFAULT '{}'::jsonb,  
  notes_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT block_followups_pkey PRIMARY KEY (id),  
  CONSTRAINT block_followups_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),  
  CONSTRAINT block_followups_block_id_fkey FOREIGN KEY (block_id) REFERENCES public.blocks(id)  
);  
CREATE TABLE public.block_mechanism_markers (  
  block_id text NOT NULL,  
  mechanism text NOT NULL,  
  predicted_markers jsonb DEFAULT '{}'::jsonb,  
  expected_signature jsonb DEFAULT '{}'::jsonb,  
  notes_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT block_mechanism_markers_pkey PRIMARY KEY (block_id, mechanism),  
  CONSTRAINT block_mechanism_markers_block_id_fkey FOREIGN KEY (block_id) REFERENCES public.blocks(id)  
);  
CREATE TABLE public.blocks (  
  id text NOT NULL,  
  theme_id text,  
  name text NOT NULL,  
  status USER-DEFINED NOT NULL DEFAULT 'draft'::block_status,  
  version text NOT NULL DEFAULT '1.0.0'::text,  
  state_targets jsonb,  
  day_type ARRAY,  
  context_tags ARRAY,  
  skill_tags ARRAY,  
  safety_flags ARRAY,  
  contraindications text,  
  era jsonb NOT NULL,  
  measures jsonb NOT NULL,  
  navicue_hits ARRAY,  
  rescue_links ARRAY,  
  explore_weight double precision DEFAULT 0.5,  
  created_at timestamp with time zone DEFAULT now(),  
  era_script jsonb DEFAULT '{}'::jsonb CHECK (era_script IS NULL OR jsonb_typeof(era_script) = 'object'::text AND era_script ? 'context'::text AND era_script ? 'experience'::text AND era_script ? 'recognize'::text AND era_script ? 'align'::text AND era_script ? 'reflection'::text),  
  status_text text,  
  CONSTRAINT blocks_pkey PRIMARY KEY (id),  
  CONSTRAINT blocks_theme_id_fkey FOREIGN KEY (theme_id) REFERENCES public.themes(id)  
);  
CREATE TABLE public.calc_assoc_v01 (  
  user_id uuid NOT NULL,  
  assoc_type text NOT NULL,  
  left_key text NOT NULL,  
  right_key text NOT NULL,  
  strength numeric NOT NULL,  
  confidence numeric NOT NULL,  
  evidence_count integer NOT NULL DEFAULT 0,  
  evidence_status text NOT NULL DEFAULT 'emerging'::text,  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  trace_id uuid,  
  CONSTRAINT calc_assoc_v01_pkey PRIMARY KEY (user_id, assoc_type, left_key, right_key)  
);  
CREATE TABLE public.calc_hot_context_scores_v01 (  
  user_id uuid NOT NULL,  
  context_key text NOT NULL,  
  score numeric NOT NULL,  
  confidence numeric NOT NULL,  
  evidence_count integer NOT NULL DEFAULT 0,  
  evidence_status text NOT NULL DEFAULT 'emerging'::text,  
  last_seen_at timestamp with time zone,  
  computed_at timestamp with time zone NOT NULL DEFAULT now(),  
  trace_id uuid,  
  CONSTRAINT calc_hot_context_scores_v01_pkey PRIMARY KEY (user_id, context_key)  
);  
CREATE TABLE public.calc_proof_scores_by_scope_v01 (  
  user_id uuid NOT NULL,  
  scope_type text NOT NULL,  
  scope_key text NOT NULL,  
  score numeric NOT NULL,  
  confidence numeric NOT NULL,  
  evidence_count integer NOT NULL DEFAULT 0,  
  evidence_status text NOT NULL DEFAULT 'emerging'::text,  
  computed_at timestamp with time zone NOT NULL DEFAULT now(),  
  trace_id uuid,  
  CONSTRAINT calc_proof_scores_by_scope_v01_pkey PRIMARY KEY (user_id, scope_type, scope_key, computed_at)  
);  
CREATE TABLE public.calc_proof_scores_v01 (  
  user_id uuid NOT NULL,  
  stability_score numeric NOT NULL,  
  growth_score numeric NOT NULL,  
  reliability_score numeric NOT NULL,  
  computed_at timestamp with time zone NOT NULL DEFAULT now(),  
  trace_id uuid,  
  CONSTRAINT calc_proof_scores_v01_pkey PRIMARY KEY (user_id, computed_at)  
);  
CREATE TABLE public.calc_risk_windows_v01 (  
  user_id uuid NOT NULL,  
  risk_score numeric NOT NULL,  
  risk_band text NOT NULL,  
  window_start timestamp with time zone NOT NULL,  
  window_end timestamp with time zone NOT NULL,  
  confidence numeric NOT NULL,  
  computed_at timestamp with time zone NOT NULL DEFAULT now(),  
  trace_id uuid,  
  CONSTRAINT calc_risk_windows_v01_pkey PRIMARY KEY (user_id)  
);  
CREATE TABLE public.candidate_embeddings (  
  candidate_type text NOT NULL,  
  candidate_id text NOT NULL,  
  embedding USER-DEFINED,  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT candidate_embeddings_pkey PRIMARY KEY (candidate_type, candidate_id)  
);  
CREATE TABLE public.candidate_scores (  
  decision_id uuid NOT NULL,  
  rank integer NOT NULL CHECK (rank >= 1),  
  content_type text NOT NULL,  
  content_id text NOT NULL,  
  hard_filter_pass boolean NOT NULL DEFAULT true,  
  score_total numeric,  
  score_breakdown jsonb NOT NULL DEFAULT '{}'::jsonb,  
  bucket text,  
  eliminated_by text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT candidate_scores_pkey PRIMARY KEY (decision_id, rank),  
  CONSTRAINT candidate_scores_decision_id_fkey FOREIGN KEY (decision_id) REFERENCES public.bandit_decisions(id)  
);  
CREATE TABLE public.candidate_variants (  
  candidate_type text NOT NULL,  
  candidate_id text NOT NULL,  
  variant_key text NOT NULL,  
  is_active boolean NOT NULL DEFAULT true,  
  meta_patch jsonb,  
  payload_patch jsonb,  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT candidate_variants_pkey PRIMARY KEY (candidate_type, candidate_id, variant_key)  
);  
CREATE TABLE public.care_relationships (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  professional_profile_id uuid NOT NULL,  
  individual_profile_id uuid NOT NULL,  
  organization_id uuid,  
  status text NOT NULL CHECK (status = ANY (ARRAY['pending'::text, 'active'::text, 'paused'::text, 'ended'::text])),  
  consent_policy_id uuid,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT care_relationships_pkey PRIMARY KEY (id),  
  CONSTRAINT care_relationships_professional_profile_id_fkey FOREIGN KEY (professional_profile_id) REFERENCES public.profiles(id),  
  CONSTRAINT care_relationships_individual_profile_id_fkey FOREIGN KEY (individual_profile_id) REFERENCES public.profiles(id),  
  CONSTRAINT care_relationships_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)  
);  
CREATE TABLE public.case_formulations (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  organization_id uuid,  
  version integer NOT NULL DEFAULT 1,  
  status text NOT NULL DEFAULT 'active'::text CHECK (status = ANY (ARRAY['draft'::text, 'active'::text, 'archived'::text])),  
  summary_md text,  
  maintaining_loops jsonb NOT NULL DEFAULT '{}'::jsonb,  
  protective_strategies ARRAY NOT NULL DEFAULT '{}'::text[],  
  strengths ARRAY NOT NULL DEFAULT '{}'::text[],  
  values ARRAY NOT NULL DEFAULT '{}'::text[],  
  goals jsonb NOT NULL DEFAULT '[]'::jsonb,  
  active_schema_ids ARRAY NOT NULL DEFAULT '{}'::text[],  
  active_mindblock_ids ARRAY NOT NULL DEFAULT '{}'::uuid[],  
  hot_contexts ARRAY NOT NULL DEFAULT '{}'::text[],  
  risk_flags ARRAY NOT NULL DEFAULT '{}'::text[],  
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT case_formulations_pkey PRIMARY KEY (id),  
  CONSTRAINT case_formulations_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT case_formulations_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)  
);  
CREATE TABLE public.case_formulations_history (  
  hist_id uuid NOT NULL DEFAULT gen_random_uuid(),  
  id uuid NOT NULL,  
  individual_id uuid NOT NULL,  
  organization_id uuid,  
  version integer NOT NULL,  
  status text NOT NULL,  
  snapshot jsonb NOT NULL,  
  changed_by uuid DEFAULT auth.uid(),  
  changed_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT case_formulations_history_pkey PRIMARY KEY (hist_id)  
);  
CREATE TABLE public.change_log (  
  id bigint NOT NULL DEFAULT nextval('change_log_id_seq'::regclass),  
  entity_type text NOT NULL,  
  entity_id text NOT NULL,  
  version text,  
  change_summary text,  
  changed_by uuid,  
  changed_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT change_log_pkey PRIMARY KEY (id),  
  CONSTRAINT change_log_changed_by_fkey FOREIGN KEY (changed_by) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.circle_members (  
  circle_id uuid NOT NULL,  
  profile_id uuid NOT NULL,  
  role text NOT NULL CHECK (role = ANY (ARRAY['owner'::text, 'member'::text, 'witness'::text, 'support'::text, 'clinician'::text, 'moderator'::text])),  
  consent_state text NOT NULL DEFAULT 'invited'::text CHECK (consent_state = ANY (ARRAY['invited'::text, 'accepted'::text, 'declined'::text, 'revoked'::text])),  
  joined_at timestamp with time zone,  
  revoked_at timestamp with time zone,  
  meta jsonb DEFAULT '{}'::jsonb,  
  CONSTRAINT circle_members_pkey PRIMARY KEY (circle_id, profile_id),  
  CONSTRAINT circle_members_circle_id_fkey FOREIGN KEY (circle_id) REFERENCES public.circles(id),  
  CONSTRAINT circle_members_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.circles (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  organization_id uuid,  
  circle_type text NOT NULL CHECK (circle_type = ANY (ARRAY['inner'::text, 'care'::text, 'peer'::text, 'program'::text])),  
  name text NOT NULL,  
  purpose_md text,  
  privacy text NOT NULL DEFAULT 'private'::text CHECK (privacy = ANY (ARRAY['private'::text, 'invite_only'::text])),  
  data_tier text DEFAULT 'tier1'::text CHECK (data_tier = ANY (ARRAY['tier0'::text, 'tier1'::text, 'tier2'::text, 'tier3'::text, 'tier4'::text])),  
  is_active boolean DEFAULT true,  
  created_by uuid,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT circles_pkey PRIMARY KEY (id),  
  CONSTRAINT circles_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),  
  CONSTRAINT circles_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.citations (  
  id bigint NOT NULL DEFAULT nextval('citations_id_seq'::regclass),  
  target_type USER-DEFINED NOT NULL,  
  target_id text NOT NULL,  
  relation USER-DEFINED NOT NULL,  
  source_id bigint NOT NULL,  
  quote_md text,  
  page text,  
  notes_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT citations_pkey PRIMARY KEY (id),  
  CONSTRAINT citations_source_id_fkey FOREIGN KEY (source_id) REFERENCES public.sources(id)  
);  
CREATE TABLE public.claim_evidence_links (  
  claim_id uuid NOT NULL,  
  evidence_key text NOT NULL,  
  relation text NOT NULL CHECK (relation = ANY (ARRAY['supports'::text, 'contradicts'::text, 'qualifies'::text, 'background'::text])),  
  strength numeric DEFAULT 1.0 CHECK (strength >= 0::numeric AND strength <= 2::numeric),  
  applicability text DEFAULT 'general'::text CHECK (applicability = ANY (ARRAY['general'::text, 'addiction'::text, 'trauma'::text, 'depression'::text, 'anxiety'::text, 'psychosis'::text, 'youth'::text, 'adult'::text, 'older_adult'::text])),  
  notes_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT claim_evidence_links_pkey PRIMARY KEY (claim_id, evidence_key, relation),  
  CONSTRAINT claim_evidence_links_claim_id_fkey FOREIGN KEY (claim_id) REFERENCES public.claims(id),  
  CONSTRAINT claim_evidence_links_evidence_key_fkey FOREIGN KEY (evidence_key) REFERENCES public.evidence_registry(key)  
);  
CREATE TABLE public.claim_reviews (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  claim_id uuid NOT NULL,  
  reviewer_id uuid,  
  reviewer_role text DEFAULT 'expert'::text CHECK (reviewer_role = ANY (ARRAY['expert'::text, 'clinician'::text, 'researcher'::text, 'editor'::text])),  
  verdict text NOT NULL CHECK (verdict = ANY (ARRAY['approve'::text, 'request_changes'::text, 'contest'::text])),  
  confidence numeric CHECK (confidence IS NULL OR confidence >= 0::numeric AND confidence <= 1::numeric),  
  notes_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT claim_reviews_pkey PRIMARY KEY (id),  
  CONSTRAINT claim_reviews_claim_id_fkey FOREIGN KEY (claim_id) REFERENCES public.claims(id),  
  CONSTRAINT claim_reviews_reviewer_id_fkey FOREIGN KEY (reviewer_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.claims (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  slug text UNIQUE,  
  statement text NOT NULL,  
  scope text DEFAULT 'general'::text CHECK (scope = ANY (ARRAY['general'::text, 'population'::text, 'clinical'::text, 'mechanistic'::text])),  
  discipline_id text,  
  pillar_id text,  
  concept_id text,  
  lens_id text,  
  schema_id text,  
  claim_type text NOT NULL CHECK (claim_type = ANY (ARRAY['mechanism'::text, 'phenomenology'::text, 'intervention'::text, 'risk'::text, 'measurement'::text, 'developmental'::text, 'social'::text])),  
  status text DEFAULT 'draft'::text CHECK (status = ANY (ARRAY['draft'::text, 'evidence_pending'::text, 'reviewed'::text, 'published'::text, 'contested'::text, 'retired'::text])),  
  notes_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT claims_pkey PRIMARY KEY (id),  
  CONSTRAINT claims_discipline_id_fkey FOREIGN KEY (discipline_id) REFERENCES public.disciplines(id),  
  CONSTRAINT claims_pillar_id_fkey FOREIGN KEY (pillar_id) REFERENCES public.pillars(id),  
  CONSTRAINT claims_concept_id_fkey FOREIGN KEY (concept_id) REFERENCES public.concepts(id),  
  CONSTRAINT claims_lens_id_fkey FOREIGN KEY (lens_id) REFERENCES public.lens_catalog(id),  
  CONSTRAINT claims_schema_id_fkey FOREIGN KEY (schema_id) REFERENCES public.schema_catalog(id)  
);  
CREATE TABLE public.classify_rules_concepts (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  pattern text NOT NULL,  
  concept text NOT NULL,  
  weight integer NOT NULL DEFAULT 1,  
  active boolean NOT NULL DEFAULT true,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT classify_rules_concepts_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.classify_rules_guardrails (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  pattern text NOT NULL,  
  caution text NOT NULL,  
  active boolean NOT NULL DEFAULT true,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT classify_rules_guardrails_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.classify_rules_moods (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  pattern text NOT NULL,  
  mood text NOT NULL,  
  weight integer NOT NULL DEFAULT 1,  
  active boolean NOT NULL DEFAULT true,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT classify_rules_moods_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.client_assignments (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  professional_id uuid NOT NULL,  
  client_id uuid NOT NULL,  
  relationship text NOT NULL DEFAULT 'therapist-client'::text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT client_assignments_pkey PRIMARY KEY (id),  
  CONSTRAINT client_assignments_professional_id_fkey FOREIGN KEY (professional_id) REFERENCES public.profiles(id),  
  CONSTRAINT client_assignments_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.comb_tags (  
  tag_key text NOT NULL CHECK (tag_key = ANY (ARRAY['C'::text, 'O'::text, 'M'::text])),  
  label text NOT NULL,  
  description_md text,  
  CONSTRAINT comb_tags_pkey PRIMARY KEY (tag_key)  
);  
CREATE TABLE public.comms_channels (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  name text NOT NULL,  
  channel_type text NOT NULL,  
  config jsonb,  
  created_by uuid,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT comms_channels_pkey PRIMARY KEY (id),  
  CONSTRAINT comms_channels_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id)  
);  
CREATE TABLE public.comms_messages (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  template_id uuid,  
  channel_id uuid,  
  recipient text NOT NULL,  
  payload jsonb,  
  status text NOT NULL DEFAULT 'queued'::text,  
  error text,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  created_by uuid,  
  CONSTRAINT comms_messages_pkey PRIMARY KEY (id),  
  CONSTRAINT comms_messages_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.comms_templates(id),  
  CONSTRAINT comms_messages_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES public.comms_channels(id)  
);  
CREATE TABLE public.comms_templates (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  key text NOT NULL,  
  version integer NOT NULL DEFAULT 1,  
  format text NOT NULL DEFAULT 'markdown'::text,  
  subject text,  
  body text NOT NULL,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT comms_templates_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.companions (  
  profile_id uuid NOT NULL,  
  relationship_preferences jsonb DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT companions_pkey PRIMARY KEY (profile_id),  
  CONSTRAINT companions_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.component_type_catalog (  
  component_type text NOT NULL,  
  label text NOT NULL,  
  defaults jsonb NOT NULL DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT component_type_catalog_pkey PRIMARY KEY (component_type)  
);  
CREATE TABLE public.concept_citations (  
  concept_id text NOT NULL,  
  citation_id bigint NOT NULL,  
  relation text DEFAULT 'theory'::text,  
  CONSTRAINT concept_citations_pkey PRIMARY KEY (concept_id, citation_id),  
  CONSTRAINT concept_citations_concept_id_fkey FOREIGN KEY (concept_id) REFERENCES public.concepts(id),  
  CONSTRAINT concept_citations_citation_id_fkey FOREIGN KEY (citation_id) REFERENCES public.citations(id)  
);  
CREATE TABLE public.concept_disciplines (  
  concept_id text NOT NULL,  
  discipline_id text NOT NULL,  
  CONSTRAINT concept_disciplines_pkey PRIMARY KEY (concept_id, discipline_id),  
  CONSTRAINT concept_disciplines_concept_id_fkey FOREIGN KEY (concept_id) REFERENCES public.concepts(id),  
  CONSTRAINT concept_disciplines_discipline_id_fkey FOREIGN KEY (discipline_id) REFERENCES public.disciplines(id)  
);  
CREATE TABLE public.concept_tags (  
  concept_id text NOT NULL,  
  tag_id uuid NOT NULL,  
  CONSTRAINT concept_tags_pkey PRIMARY KEY (concept_id, tag_id),  
  CONSTRAINT concept_tags_concept_id_fkey FOREIGN KEY (concept_id) REFERENCES public.concepts(id),  
  CONSTRAINT concept_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id)  
);  
CREATE TABLE public.concepts (  
  id text NOT NULL,  
  pillar_id text,  
  name text NOT NULL,  
  mechanisms jsonb DEFAULT '[]'::jsonb,  
  description text,  
  mechanism text,  
  sort_order integer,  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT concepts_pkey PRIMARY KEY (id),  
  CONSTRAINT concepts_pillar_id_fkey FOREIGN KEY (pillar_id) REFERENCES public.pillars(id)  
);  
CREATE TABLE public.connection_contracts (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  circle_id uuid,  
  from_id uuid NOT NULL,  
  to_id uuid NOT NULL,  
  contract_type text NOT NULL CHECK (contract_type = ANY (ARRAY['witness'::text, 'accountability'::text, 'support'::text, 'checkin'::text])),  
  frequency text DEFAULT 'weekly'::text CHECK (frequency = ANY (ARRAY['daily'::text, 'weekly'::text, 'as_needed'::text])),  
  channels ARRAY DEFAULT '{in_app}'::text[],  
  boundaries jsonb NOT NULL DEFAULT '{}'::jsonb,  
  sla_minutes integer CHECK (sla_minutes IS NULL OR sla_minutes >= 1 AND sla_minutes <= 10080),  
  is_active boolean DEFAULT true,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT connection_contracts_pkey PRIMARY KEY (id),  
  CONSTRAINT connection_contracts_circle_id_fkey FOREIGN KEY (circle_id) REFERENCES public.circles(id),  
  CONSTRAINT connection_contracts_from_id_fkey FOREIGN KEY (from_id) REFERENCES public.profiles(id),  
  CONSTRAINT connection_contracts_to_id_fkey FOREIGN KEY (to_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.consent_events (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  consent_grant_id uuid NOT NULL,  
  event_type text NOT NULL CHECK (event_type = ANY (ARRAY['granted'::text, 'modified'::text, 'revoked'::text, 'expired'::text])),  
  occurred_at timestamp with time zone NOT NULL DEFAULT now(),  
  actor_id uuid,  
  details jsonb DEFAULT '{}'::jsonb,  
  CONSTRAINT consent_events_pkey PRIMARY KEY (id),  
  CONSTRAINT consent_events_consent_grant_id_fkey FOREIGN KEY (consent_grant_id) REFERENCES public.consent_grants(id)  
);  
CREATE TABLE public.consent_grants (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  grantor_user_id uuid NOT NULL,  
  grantee_profile_id uuid,  
  grantee_circle_id uuid,  
  scope_id text NOT NULL,  
  purposes ARRAY NOT NULL DEFAULT '{}'::text[],  
  tier text,  
  starts_at timestamp with time zone NOT NULL DEFAULT now(),  
  ends_at timestamp with time zone,  
  revoked_at timestamp with time zone,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  meta jsonb DEFAULT '{}'::jsonb,  
  CONSTRAINT consent_grants_pkey PRIMARY KEY (id),  
  CONSTRAINT consent_grants_grantor_user_id_fkey FOREIGN KEY (grantor_user_id) REFERENCES public.profiles(id),  
  CONSTRAINT consent_grants_grantee_profile_id_fkey FOREIGN KEY (grantee_profile_id) REFERENCES public.profiles(id),  
  CONSTRAINT consent_grants_grantee_circle_id_fkey FOREIGN KEY (grantee_circle_id) REFERENCES public.circles(id),  
  CONSTRAINT consent_grants_scope_id_fkey FOREIGN KEY (scope_id) REFERENCES public.consent_scopes(scope_id)  
);  
CREATE TABLE public.consent_ledger (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  consent_type text NOT NULL CHECK (consent_type = ANY (ARRAY['data_storage'::text, 'research'::text, 'wearables'::text, 'calendar'::text, 'location'::text, 'care_team_share'::text, 'org_reporting'::text, 'ai_processing'::text])),  
  scope jsonb NOT NULL DEFAULT '{}'::jsonb,  
  tier text NOT NULL DEFAULT 'tier1'::text CHECK (tier = ANY (ARRAY['tier0'::text, 'tier1'::text, 'tier2'::text, 'tier3'::text, 'tier4'::text])),  
  status text NOT NULL DEFAULT 'granted'::text CHECK (status = ANY (ARRAY['granted'::text, 'revoked'::text, 'expired'::text])),  
  granted_at timestamp with time zone DEFAULT now(),  
  expires_at timestamp with time zone,  
  revoked_at timestamp with time zone,  
  method text DEFAULT 'in_app'::text,  
  meta jsonb DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT consent_ledger_pkey PRIMARY KEY (id),  
  CONSTRAINT consent_ledger_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.consent_scopes (  
  scope_id text NOT NULL,  
  name text NOT NULL,  
  description_md text,  
  allowed_purposes ARRAY NOT NULL DEFAULT '{}'::text[],  
  default_tier text,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT consent_scopes_pkey PRIMARY KEY (scope_id)  
);  
CREATE TABLE public.construct_catalog (  
  construct_key text NOT NULL,  
  label text NOT NULL,  
  definition_md text,  
  citations jsonb NOT NULL DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT construct_catalog_pkey PRIMARY KEY (construct_key)  
);  
CREATE TABLE public.construct_links (  
  construct_key text NOT NULL,  
  target_level USER-DEFINED NOT NULL,  
  target_id text NOT NULL,  
  weight numeric,  
  notes_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT construct_links_pkey PRIMARY KEY (construct_key, target_level, target_id),  
  CONSTRAINT construct_links_construct_key_fkey FOREIGN KEY (construct_key) REFERENCES public.construct_catalog(construct_key)  
);  
CREATE TABLE public.content_assets (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  source_object_id uuid UNIQUE,  
  bucket_id text,  
  collection text,  
  content_key text,  
  storage_path text,  
  file_name text,  
  mime_type text,  
  inferred_kind text,  
  metadata jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT content_assets_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.content_engagements (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  organization_id uuid,  
  content_type text NOT NULL,  
  content_id text NOT NULL,  
  action text NOT NULL,  
  duration_seconds integer,  
  context_tags ARRAY DEFAULT '{}'::text[],  
  metadata jsonb DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  profile_id uuid,  
  CONSTRAINT content_engagements_pkey PRIMARY KEY (id),  
  CONSTRAINT content_engagements_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT content_engagements_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)  
);  
CREATE TABLE public.content_injections (  
  parent_content_id uuid NOT NULL,  
  practice_content_id uuid NOT NULL,  
  placement text NOT NULL DEFAULT 'inline'::text,  
  order_index integer NOT NULL DEFAULT 1,  
  CONSTRAINT content_injections_pkey PRIMARY KEY (parent_content_id, practice_content_id),  
  CONSTRAINT content_injections_parent_content_id_fkey FOREIGN KEY (parent_content_id) REFERENCES public.content_items(id),  
  CONSTRAINT content_injections_practice_content_id_fkey FOREIGN KEY (practice_content_id) REFERENCES public.content_items(id)  
);  
CREATE TABLE public.content_items (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  code text UNIQUE,  
  kind USER-DEFINED NOT NULL,  
  status USER-DEFINED NOT NULL DEFAULT 'draft'::content_status,  
  title text NOT NULL,  
  summary text,  
  config jsonb NOT NULL DEFAULT '{}'::jsonb,  
  tags ARRAY NOT NULL DEFAULT '{}'::text[],  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT content_items_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.content_length_targets (  
  id integer NOT NULL DEFAULT 1,  
  spark_target integer NOT NULL DEFAULT 50,  
  spark_min integer NOT NULL DEFAULT 35,  
  spark_max integer NOT NULL DEFAULT 70,  
  flame_target integer NOT NULL DEFAULT 250,  
  flame_min integer NOT NULL DEFAULT 200,  
  flame_max integer NOT NULL DEFAULT 300,  
  ember_target integer NOT NULL DEFAULT 500,  
  ember_min integer NOT NULL DEFAULT 425,  
  ember_max integer NOT NULL DEFAULT 575,  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT content_length_targets_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.content_navicues (  
  id bigint NOT NULL DEFAULT nextval('content_navicues_id_seq'::regclass),  
  content_kind text NOT NULL CHECK (content_kind = ANY (ARRAY['article'::text, 'video'::text, 'lesson'::text])),  
  content_id bigint NOT NULL,  
  navicue_id text NOT NULL,  
  relation text DEFAULT 'reinforces'::text,  
  CONSTRAINT content_navicues_pkey PRIMARY KEY (id),  
  CONSTRAINT content_navicues_navicue_id_fkey FOREIGN KEY (navicue_id) REFERENCES public.navicues(id)  
);  
CREATE TABLE public.content_people (  
  content_id uuid NOT NULL,  
  person_id text NOT NULL,  
  role text NOT NULL DEFAULT 'featured'::text,  
  weight numeric NOT NULL DEFAULT 1.0,  
  CONSTRAINT content_people_pkey PRIMARY KEY (content_id, person_id, role),  
  CONSTRAINT content_people_content_id_fkey FOREIGN KEY (content_id) REFERENCES public.content_items(id),  
  CONSTRAINT content_people_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.people(id)  
);  
CREATE TABLE public.content_refs (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  ref_type text NOT NULL CHECK (ref_type = ANY (ARRAY['template'::text, 'scene'::text])),  
  ref_id text NOT NULL,  
  ref_extra text,  
  title text,  
  slug text,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  unique_key text DEFAULT ((((ref_type || ':'::text) || ref_id) || ':'::text) || COALESCE(ref_extra, ''::text)) UNIQUE,  
  CONSTRAINT content_refs_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.content_registry (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  content_kind USER-DEFINED NOT NULL,  
  source_table text NOT NULL,  
  source_pk text NOT NULL,  
  title text,  
  pillar_id text,  
  theme_id text,  
  status text,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  reading_time_minutes integer CHECK (reading_time_minutes IS NULL OR reading_time_minutes >= 1 AND reading_time_minutes <= 120),  
  difficulty_level text,  
  clinical_metadata jsonb DEFAULT '{}'::jsonb,  
  canonical_id uuid,  
  version text,  
  is_active boolean DEFAULT true,  
  safety_flags ARRAY,  
  contraindications ARRAY,  
  targeting_rules jsonb DEFAULT '{}'::jsonb,  
  response_contract jsonb DEFAULT '{}'::jsonb CHECK (rc_has_minimum_keys(response_contract)),  
  source_of_truth text,  
  search_tsv tsvector,  
  arousal_fit text DEFAULT 'amber'::text CHECK (arousal_fit = ANY (ARRAY['green'::text, 'amber'::text, 'red'::text, 'downshift_first'::text])),  
  tags ARRAY DEFAULT '{}'::text[],  
  content_type text NOT NULL DEFAULT 'content'::text,  
  supersedes_content_ref uuid,  
  change_log text,  
  min_client_version text,  
  allowed_state_bands ARRAY,  
  harm_types ARRAY,  
  response_failure_policy jsonb CHECK (response_failure_policy_valid(response_failure_policy)),  
  rescue_contract jsonb,  
  organization_id uuid,  
  professional_id uuid,  
  visibility_scope text NOT NULL DEFAULT 'platform'::text CHECK (visibility_scope = ANY (ARRAY['platform'::text, 'org'::text, 'professional'::text, 'private'::text])),  
  CONSTRAINT content_registry_pkey PRIMARY KEY (id),  
  CONSTRAINT content_registry_pillar_id_fkey FOREIGN KEY (pillar_id) REFERENCES public.pillars(id),  
  CONSTRAINT content_registry_supersedes_content_ref_fkey FOREIGN KEY (supersedes_content_ref) REFERENCES public.content_registry(id),  
  CONSTRAINT content_registry_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),  
  CONSTRAINT content_registry_professional_id_fkey FOREIGN KEY (professional_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.content_relationships (  
  id uuid NOT NULL DEFAULT uuid_generate_v4(),  
  content_type_source text NOT NULL,  
  content_id_source text NOT NULL,  
  content_type_target text NOT NULL,  
  content_id_target text NOT NULL,  
  relationship_type text DEFAULT 'related'::text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT content_relationships_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.content_seeds (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  title text NOT NULL,  
  seed_text text NOT NULL,  
  target_subtype text NOT NULL DEFAULT 'insight'::text,  
  params jsonb DEFAULT '{}'::jsonb,  
  created_by uuid,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT content_seeds_pkey PRIMARY KEY (id),  
  CONSTRAINT content_seeds_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id)  
);  
CREATE TABLE public.content_tags (  
  content_id uuid NOT NULL,  
  tag_id uuid NOT NULL,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT content_tags_pkey PRIMARY KEY (content_id, tag_id),  
  CONSTRAINT content_tags_content_id_fkey FOREIGN KEY (content_id) REFERENCES public.content_registry(id),  
  CONSTRAINT content_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id)  
);  
CREATE TABLE public.content_targets (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  content_id uuid NOT NULL,  
  scope_type USER-DEFINED NOT NULL,  
  pillar_id text,  
  schema_id text,  
  family_id uuid,  
  concept_id text,  
  theme_id text,  
  mindblock_id uuid,  
  weight numeric NOT NULL DEFAULT 1.0,  
  is_primary boolean NOT NULL DEFAULT false,  
  brain_coordinate jsonb NOT NULL DEFAULT '{}'::jsonb,  
  CONSTRAINT content_targets_pkey PRIMARY KEY (id),  
  CONSTRAINT content_targets_content_id_fkey FOREIGN KEY (content_id) REFERENCES public.content_items(id),  
  CONSTRAINT content_targets_pillar_id_fkey FOREIGN KEY (pillar_id) REFERENCES public.pillars(id),  
  CONSTRAINT content_targets_schema_id_fkey FOREIGN KEY (schema_id) REFERENCES public.schema_catalog(id),  
  CONSTRAINT content_targets_family_id_fkey FOREIGN KEY (family_id) REFERENCES public.mindblock_families(id),  
  CONSTRAINT content_targets_concept_id_fkey FOREIGN KEY (concept_id) REFERENCES public.concepts(id),  
  CONSTRAINT content_targets_theme_id_fkey FOREIGN KEY (theme_id) REFERENCES public.themes(id),  
  CONSTRAINT content_targets_mindblock_id_fkey FOREIGN KEY (mindblock_id) REFERENCES public.mindblocks(id)  
);  
CREATE TABLE public.content_versions (  
  content_ref uuid NOT NULL,  
  version text NOT NULL,  
  review_state text NOT NULL DEFAULT 'draft'::text,  
  reviewed_by uuid,  
  reviewed_at timestamp with time zone,  
  clinical_signoff boolean DEFAULT false,  
  snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT content_versions_pkey PRIMARY KEY (content_ref, version),  
  CONSTRAINT content_versions_content_ref_fkey FOREIGN KEY (content_ref) REFERENCES public.content_registry(id),  
  CONSTRAINT content_versions_reviewed_by_fkey FOREIGN KEY (reviewed_by) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.context_catalog (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  slug text NOT NULL UNIQUE,  
  label text NOT NULL,  
  kind text DEFAULT 'situation'::text CHECK (kind = ANY (ARRAY['situation'::text, 'place'::text, 'people'::text, 'time'::text, 'emotion'::text, 'body'::text, 'other'::text])),  
  synonyms ARRAY DEFAULT '{}'::text[],  
  parent_id uuid,  
  tags ARRAY DEFAULT '{}'::text[],  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT context_catalog_pkey PRIMARY KEY (id),  
  CONSTRAINT context_catalog_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.context_catalog(id)  
);  
CREATE TABLE public.context_detections_v24 (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  detected_at timestamp with time zone NOT NULL DEFAULT now(),  
  context_key text NOT NULL,  
  confidence numeric NOT NULL DEFAULT 0.5 CHECK (confidence >= 0::numeric AND confidence <= 1::numeric),  
  source text NOT NULL CHECK (source = ANY (ARRAY['self_report'::text, 'calendar'::text, 'wearable'::text, 'device_pattern'::text, 'location'::text, 'manual'::text, 'system'::text])),  
  mode text DEFAULT 'auto'::text CHECK (mode = ANY (ARRAY['auto'::text, 'confirm_only'::text, 'manual'::text])),  
  confirmed boolean,  
  evidence jsonb DEFAULT '{}'::jsonb,  
  expires_at timestamp with time zone,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT context_detections_v24_pkey PRIMARY KEY (id),  
  CONSTRAINT context_detections_v24_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.context_dict (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  slug text NOT NULL UNIQUE,  
  label text NOT NULL,  
  kind USER-DEFINED NOT NULL DEFAULT 'situation'::context_kind_enum,  
  synonyms ARRAY DEFAULT '{}'::text[],  
  parent_id uuid,  
  tags ARRAY DEFAULT '{}'::text[],  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT context_dict_pkey PRIMARY KEY (id),  
  CONSTRAINT context_dict_parent_fk FOREIGN KEY (parent_id) REFERENCES public.context_dict(id)  
);  
CREATE TABLE public.context_routing_decisions_v24 (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  decided_at timestamp with time zone DEFAULT now(),  
  risk_window_id uuid,  
  context_key text,  
  target_type text NOT NULL CHECK (target_type = ANY (ARRAY['navicue'::text, 'block'::text, 'sequence'::text, 'practice'::text, 'checkin'::text, 'journey_scene'::text])),  
  target_id text NOT NULL,  
  policy_id text,  
  policy_version text,  
  safety_decision_id uuid,  
  expected_effect text,  
  rationale jsonb NOT NULL DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT context_routing_decisions_v24_pkey PRIMARY KEY (id),  
  CONSTRAINT context_routing_decisions_v24_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT context_routing_decisions_v24_risk_window_id_fkey FOREIGN KEY (risk_window_id) REFERENCES public.risk_windows_v24(id)  
);  
CREATE TABLE public.context_training_plans_v24 (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  context_key text NOT NULL,  
  status text NOT NULL DEFAULT 'active'::text CHECK (status = ANY (ARRAY['active'::text, 'paused'::text, 'completed'::text, 'abandoned'::text])),  
  horizon_days integer NOT NULL DEFAULT 14 CHECK (horizon_days = ANY (ARRAY[7, 14, 21, 28])),  
  target_exposures integer NOT NULL DEFAULT 3 CHECK (target_exposures >= 1 AND target_exposures <= 20),  
  plan jsonb NOT NULL DEFAULT '{}'::jsonb,  
  started_at timestamp with time zone DEFAULT now(),  
  completed_at timestamp with time zone,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT context_training_plans_v24_pkey PRIMARY KEY (id),  
  CONSTRAINT context_training_plans_v24_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.context_transfer_results_v24 (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  context_key text NOT NULL,  
  content_kind text NOT NULL CHECK (content_kind = ANY (ARRAY['block'::text, 'sequence'::text, 'practice'::text, 'navicue'::text])),  
  content_id text NOT NULL,  
  attempt_at timestamp with time zone DEFAULT now(),  
  outcome text NOT NULL CHECK (outcome = ANY (ARRAY['held'::text, 'partial'::text, 'failed'::text, 'unknown'::text])),  
  friction integer CHECK (friction IS NULL OR friction >= 0 AND friction <= 10),  
  transfer_test_id uuid,  
  transfer_test_result_id uuid,  
  receipt_id bigint,  
  evidence jsonb DEFAULT '{}'::jsonb,  
  notes_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT context_transfer_results_v24_pkey PRIMARY KEY (id),  
  CONSTRAINT context_transfer_results_v24_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.conversation_mindblocks (  
  conversation_id uuid NOT NULL,  
  mindblock_id uuid NOT NULL,  
  evidence jsonb DEFAULT '{}'::jsonb,  
  CONSTRAINT conversation_mindblocks_pkey PRIMARY KEY (conversation_id, mindblock_id),  
  CONSTRAINT conversation_mindblocks_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.luma_conversations(id),  
  CONSTRAINT conversation_mindblocks_mindblock_id_fkey FOREIGN KEY (mindblock_id) REFERENCES public.mindblocks(id)  
);  
CREATE TABLE public.core_beliefs (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  belief text NOT NULL,  
  origin text,  
  strength numeric,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT core_beliefs_pkey PRIMARY KEY (id),  
  CONSTRAINT core_beliefs_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.cue_sequence_deployments (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  sequence_id text NOT NULL,  
  deployed_at timestamp with time zone DEFAULT now(),  
  completed_at timestamp with time zone,  
  skipped boolean DEFAULT false,  
  step_results jsonb DEFAULT '{}'::jsonb,  
  context jsonb DEFAULT '{}'::jsonb,  
  status text CHECK (status IS NULL OR (status = ANY (ARRAY['started'::text, 'completed'::text, 'skipped'::text, 'abandoned'::text]))),  
  exposure_id uuid,  
  queue_id uuid,  
  rationale jsonb DEFAULT '{}'::jsonb CHECK (rationale IS NULL OR jsonb_typeof(rationale) = 'object'::text),  
  experiment_key text,  
  experiment_id uuid,  
  variant_key text,  
  variant_id uuid,  
  decision_source USER-DEFINED DEFAULT 'policy_ai'::decision_source_enum,  
  individual_id uuid NOT NULL,  
  CONSTRAINT cue_sequence_deployments_pkey PRIMARY KEY (id),  
  CONSTRAINT cue_sequence_deployments_sequence_id_fkey FOREIGN KEY (sequence_id) REFERENCES public.cue_sequences(id),  
  CONSTRAINT cue_seq_deployments_exposure_fk FOREIGN KEY (exposure_id) REFERENCES public.feed_exposures(id),  
  CONSTRAINT cue_seq_deployments_queue_fk FOREIGN KEY (queue_id) REFERENCES public.user_feed_queue_v2(id),  
  CONSTRAINT cue_sequence_deployments_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.cue_sequence_intents (  
  sequence_id text NOT NULL,  
  intent text NOT NULL,  
  CONSTRAINT cue_sequence_intents_pkey PRIMARY KEY (sequence_id, intent),  
  CONSTRAINT cue_sequence_intents_sequence_id_fkey FOREIGN KEY (sequence_id) REFERENCES public.cue_sequences(id)  
);  
CREATE TABLE public.cue_sequence_schema_fit (  
  sequence_id text NOT NULL,  
  schema_id text NOT NULL,  
  weight numeric DEFAULT 1.0,  
  CONSTRAINT cue_sequence_schema_fit_pkey PRIMARY KEY (sequence_id, schema_id),  
  CONSTRAINT cue_sequence_schema_fit_sequence_id_fkey FOREIGN KEY (sequence_id) REFERENCES public.cue_sequences(id),  
  CONSTRAINT cue_sequence_schema_fit_schema_id_fkey FOREIGN KEY (schema_id) REFERENCES public.schema_catalog(id)  
);  
CREATE TABLE public.cue_sequence_steps (  
  sequence_id text NOT NULL,  
  step_no integer NOT NULL CHECK (step_no >= 1 AND step_no <= 20),  
  prompt_id text NOT NULL,  
  voice_override_id text,  
  required boolean DEFAULT true,  
  expects_receipt boolean DEFAULT false,  
  receipt_type text CHECK (receipt_type = ANY (ARRAY['text'::text, 'voice'::text, 'photo'::text, 'video'::text])),  
  max_duration_sec integer,  
  notes_md text,  
  tags jsonb DEFAULT '{}'::jsonb,  
  CONSTRAINT cue_sequence_steps_pkey PRIMARY KEY (sequence_id, step_no),  
  CONSTRAINT cue_sequence_steps_sequence_id_fkey FOREIGN KEY (sequence_id) REFERENCES public.cue_sequences(id),  
  CONSTRAINT cue_sequence_steps_prompt_id_fkey FOREIGN KEY (prompt_id) REFERENCES public.prompt_templates(id),  
  CONSTRAINT cue_sequence_steps_voice_override_id_fkey FOREIGN KEY (voice_override_id) REFERENCES public.voice_archetypes(id)  
);  
CREATE TABLE public.cue_sequence_voice_fit (  
  sequence_id text NOT NULL,  
  voice_id text NOT NULL,  
  weight numeric DEFAULT 1.0,  
  notes_md text,  
  CONSTRAINT cue_sequence_voice_fit_pkey PRIMARY KEY (sequence_id, voice_id),  
  CONSTRAINT cue_sequence_voice_fit_sequence_id_fkey FOREIGN KEY (sequence_id) REFERENCES public.cue_sequences(id),  
  CONSTRAINT cue_sequence_voice_fit_voice_id_fkey FOREIGN KEY (voice_id) REFERENCES public.voice_archetypes(id)  
);  
CREATE TABLE public.cue_sequences (  
  id text NOT NULL,  
  title text NOT NULL,  
  description_md text,  
  kbe_target text DEFAULT 'believing'::text CHECK (kbe_target = ANY (ARRAY['knowing'::text, 'believing'::text, 'embodying'::text])),  
  arousal_fit text DEFAULT 'amber'::text CHECK (arousal_fit = ANY (ARRAY['green'::text, 'amber'::text, 'red'::text, 'downshift_first'::text])),  
  time_horizon text DEFAULT 'session'::text CHECK (time_horizon = ANY (ARRAY['immediate'::text, 'session'::text, 'same_day'::text, 'multi_day'::text, 'weeks'::text])),  
  is_curveball boolean DEFAULT false,  
  tags jsonb DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT cue_sequences_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.data_classification (  
  key text NOT NULL,  
  sensitivity text NOT NULL CHECK (sensitivity = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text, 'critical'::text])),  
  default_tier text NOT NULL CHECK (default_tier = ANY (ARRAY['tier0'::text, 'tier1'::text, 'tier2'::text, 'tier3'::text, 'tier4'::text])),  
  retention_days integer,  
  allowed_purposes ARRAY NOT NULL DEFAULT '{}'::text[],  
  notes_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT data_classification_pkey PRIMARY KEY (key)  
);  
CREATE TABLE public.data_sharing_grants (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  subject_profile_id uuid NOT NULL,  
  grantee_profile_id uuid NOT NULL,  
  scope ARRAY NOT NULL,  
  expires_at timestamp with time zone,  
  revoked_at timestamp with time zone,  
  audit jsonb DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT data_sharing_grants_pkey PRIMARY KEY (id),  
  CONSTRAINT data_sharing_grants_subject_profile_id_fkey FOREIGN KEY (subject_profile_id) REFERENCES public.profiles(id),  
  CONSTRAINT data_sharing_grants_grantee_profile_id_fkey FOREIGN KEY (grantee_profile_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.decision_feature_snapshots (  
  decision_id uuid NOT NULL,  
  policy_id text,  
  policy_version text,  
  user_features jsonb NOT NULL DEFAULT '{}'::jsonb,  
  context_features jsonb NOT NULL DEFAULT '{}'::jsonb,  
  proof_features jsonb NOT NULL DEFAULT '{}'::jsonb,  
  safety_features jsonb NOT NULL DEFAULT '{}'::jsonb,  
  computed_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT decision_feature_snapshots_pkey PRIMARY KEY (decision_id),  
  CONSTRAINT decision_feature_snapshots_decision_id_fkey FOREIGN KEY (decision_id) REFERENCES public.bandit_decisions(id)  
);  
CREATE TABLE public.decision_traces (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  created_at timestamp with time zone DEFAULT now(),  
  signals jsonb NOT NULL,  
  candidates jsonb NOT NULL,  
  why_this text NOT NULL,  
  why_now text NOT NULL,  
  why_variant text,  
  expected_proof text,  
  ranker_version text,  
  policy_version text,  
  experiment_id uuid,  
  content_ref uuid NOT NULL,  
  delivery_id uuid,  
  policy_outcome text NOT NULL CHECK (policy_outcome = ANY (ARRAY['allow'::text, 'allow_with_modification'::text, 'hold'::text, 'block_and_route'::text, 'require_support'::text])),  
  CONSTRAINT decision_traces_pkey PRIMARY KEY (id),  
  CONSTRAINT decision_traces_content_ref_fkey FOREIGN KEY (content_ref) REFERENCES public.content_registry(id),  
  CONSTRAINT decision_traces_delivery_id_fkey FOREIGN KEY (delivery_id) REFERENCES public.delivery_registry(id)  
);  
CREATE TABLE public.definitions (  
  slug text NOT NULL,  
  term text NOT NULL,  
  definition_md text NOT NULL,  
  clinician_note_md text,  
  pillar_id text,  
  aliases ARRAY DEFAULT '{}'::text[],  
  tags ARRAY DEFAULT '{}'::text[],  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT definitions_pkey PRIMARY KEY (slug),  
  CONSTRAINT definitions_pillar_id_fkey FOREIGN KEY (pillar_id) REFERENCES public.pillars(id)  
);  
CREATE TABLE public.delivery_registry (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  content_ref uuid NOT NULL,  
  delivery_key text NOT NULL,  
  delivery_kind text NOT NULL CHECK (delivery_kind = ANY (ARRAY['feed_card'::text, 'inline_player'::text, 'modal'::text, 'push'::text, 'email'::text, 'sms'::text, 'clinician_portal'::text])),  
  channel text NOT NULL CHECK (channel = ANY (ARRAY['in_app'::text, 'push'::text, 'email'::text, 'sms'::text])),  
  player_mode text NOT NULL CHECK (player_mode = ANY (ARRAY['text'::text, 'audio'::text, 'video'::text, 'mixed'::text])),  
  cta_label text,  
  preview_payload jsonb DEFAULT '{}'::jsonb CHECK (_is_json_object(preview_payload)),  
  estimated_cost_seconds integer,  
  expiry_seconds integer,  
  response_contract_override jsonb,  
  activation_rules jsonb,  
  is_active boolean DEFAULT true,  
  created_at timestamp with time zone DEFAULT now(),  
  organization_id uuid,  
  professional_id uuid,  
  visibility_scope text NOT NULL DEFAULT 'platform'::text CHECK (visibility_scope = ANY (ARRAY['platform'::text, 'org'::text, 'professional'::text, 'private'::text])),  
  CONSTRAINT delivery_registry_pkey PRIMARY KEY (id),  
  CONSTRAINT delivery_registry_content_ref_fkey FOREIGN KEY (content_ref) REFERENCES public.content_registry(id),  
  CONSTRAINT delivery_registry_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),  
  CONSTRAINT delivery_registry_professional_id_fkey FOREIGN KEY (professional_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.disciplines (  
  id text NOT NULL,  
  name text NOT NULL UNIQUE,  
  CONSTRAINT disciplines_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.diversity_caps (  
  key text NOT NULL,  
  value numeric NOT NULL,  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT diversity_caps_pkey PRIMARY KEY (key)  
);  
CREATE TABLE public.engagement_events (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  organization_id uuid,  
  content_type text NOT NULL,  
  content_id text NOT NULL,  
  action text NOT NULL CHECK (action = ANY (ARRAY['viewed'::text, 'started'::text, 'completed'::text, 'skipped'::text, 'saved'::text, 'shared'::text, 'rated'::text])),  
  duration_seconds integer,  
  context_tags ARRAY DEFAULT '{}'::text[],  
  metadata jsonb DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  content_ref uuid NOT NULL,  
  CONSTRAINT engagement_events_pkey PRIMARY KEY (id),  
  CONSTRAINT engagement_events_patient_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT engagement_events_content_ref_fkey FOREIGN KEY (content_ref) REFERENCES public.content_registry(id)  
);  
CREATE TABLE public.engagements (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  engagement_type text NOT NULL CHECK (engagement_type = ANY (ARRAY['content'::text, 'navicue'::text, 'soundbite'::text, 'conversation'::text, 'practice'::text, 'service'::text])),  
  content_id uuid,  
  organization_id uuid,  
  professional_id uuid,  
  status text DEFAULT 'completed'::text CHECK (status = ANY (ARRAY['started'::text, 'in_progress'::text, 'completed'::text, 'abandoned'::text])),  
  duration_seconds integer,  
  completion_percentage integer CHECK (completion_percentage >= 0 AND completion_percentage <= 100),  
  mindblock_ids ARRAY,  
  was_helpful boolean,  
  rating integer CHECK (rating >= 1 AND rating <= 5),  
  notes text,  
  started_at timestamp with time zone DEFAULT now(),  
  completed_at timestamp with time zone,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT engagements_pkey PRIMARY KEY (id),  
  CONSTRAINT engagements_content_id_fkey FOREIGN KEY (content_id) REFERENCES public.content_registry(id),  
  CONSTRAINT engagements_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)  
);  
CREATE TABLE public.enrichment_audit_log (  
  id bigint NOT NULL DEFAULT nextval('enrichment_audit_log_id_seq'::regclass),  
  requested_by uuid NOT NULL,  
  prefix text NOT NULL,  
  forced boolean NOT NULL DEFAULT false,  
  status text NOT NULL DEFAULT 'requested'::text,  
  message text,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT enrichment_audit_log_pkey PRIMARY KEY (id),  
  CONSTRAINT enrichment_audit_log_requested_by_fkey FOREIGN KEY (requested_by) REFERENCES auth.users(id)  
);  
CREATE TABLE public.escalation_queue (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  scope_type text NOT NULL CHECK (scope_type = ANY (ARRAY['schema'::text, 'family'::text, 'mindblock'::text])),  
  scope_id text NOT NULL,  
  reason text NOT NULL CHECK (reason = ANY (ARRAY['no_receipts'::text, 'no_checks'::text, 'no_state_change'::text])),  
  occurrences integer NOT NULL CHECK (occurrences >= 1),  
  first_seen_at timestamp with time zone NOT NULL,  
  last_seen_at timestamp with time zone NOT NULL,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  processed_at timestamp with time zone,  
  CONSTRAINT escalation_queue_pkey PRIMARY KEY (id),  
  CONSTRAINT escalation_queue_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.event_spine (  
  id bigint NOT NULL DEFAULT nextval('event_spine_id_seq'::regclass),  
  occurred_at timestamp with time zone NOT NULL DEFAULT now(),  
  organization_id uuid,  
  actor text,  
  event_type USER-DEFINED NOT NULL CHECK (event_type::text = ANY (ARRAY['exposure'::text, 'opened'::text, 'clicked'::text, 'started'::text, 'completed'::text, 'error'::text])),  
  content_ref uuid,  
  delivery_id uuid,  
  decision_trace_id uuid,  
  experiment_id uuid,  
  variant_id text,  
  request_ctx jsonb,  
  state_snapshot jsonb,  
  event_payload jsonb,  
  rail USER-DEFINED,  
  individual_id uuid NOT NULL,  
  source_table text,  
  source_pk text,  
  event_name text,  
  severity text,  
  CONSTRAINT event_spine_pkey PRIMARY KEY (id),  
  CONSTRAINT event_spine_content_ref_fkey FOREIGN KEY (content_ref) REFERENCES public.content_registry(id),  
  CONSTRAINT event_spine_delivery_id_fkey FOREIGN KEY (delivery_id) REFERENCES public.delivery_registry(id),  
  CONSTRAINT event_spine_decision_trace_id_fkey FOREIGN KEY (decision_trace_id) REFERENCES public.decision_traces(id),  
  CONSTRAINT event_spine_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.events (  
  id bigint NOT NULL DEFAULT nextval('events_id_seq'::regclass),  
  user_id uuid NOT NULL,  
  kind text NOT NULL,  
  data jsonb,  
  ts timestamp with time zone DEFAULT now(),  
  individual_id uuid,  
  profile_id uuid,  
  CONSTRAINT events_pkey PRIMARY KEY (id),  
  CONSTRAINT events_user_fk FOREIGN KEY (user_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.evidence_appraisals (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  evidence_key text NOT NULL,  
  level_of_evidence text,  
  risk_of_bias numeric CHECK (risk_of_bias IS NULL OR risk_of_bias >= 0::numeric AND risk_of_bias <= 1::numeric),  
  replicability numeric CHECK (replicability IS NULL OR replicability >= 0::numeric AND replicability <= 1::numeric),  
  effect_size_hint text,  
  confidence numeric CHECK (confidence IS NULL OR confidence >= 0::numeric AND confidence <= 1::numeric),  
  appraiser_id uuid,  
  notes_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  individual_id uuid,  
  CONSTRAINT evidence_appraisals_pkey PRIMARY KEY (id),  
  CONSTRAINT evidence_appraisals_evidence_key_fkey FOREIGN KEY (evidence_key) REFERENCES public.evidence_registry(key),  
  CONSTRAINT evidence_appraisals_appraiser_id_fkey FOREIGN KEY (appraiser_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.evidence_events (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  organization_id uuid,  
  occurred_at timestamp with time zone NOT NULL DEFAULT now(),  
  source text NOT NULL CHECK (source = ANY (ARRAY['feed_exposure'::text, 'feed_injection'::text, 'navicue_response'::text, 'practice_log'::text, 'manual'::text, 'system'::text])),  
  content_ref uuid,  
  event_type text NOT NULL,  
  event_data jsonb NOT NULL DEFAULT '{}'::jsonb,  
  score double precision,  
  tags ARRAY NOT NULL DEFAULT '{}'::text[],  
  individual_id uuid,  
  CONSTRAINT evidence_events_pkey PRIMARY KEY (id),  
  CONSTRAINT evidence_events_content_ref_fkey FOREIGN KEY (content_ref) REFERENCES public.content_registry(id)  
);  
CREATE TABLE public.evidence_registry (  
  key text NOT NULL,  
  kind USER-DEFINED NOT NULL,  
  title text NOT NULL,  
  year integer,  
  doi text,  
  url text,  
  notes_md text,  
  source_id bigint,  
  leader_id text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT evidence_registry_pkey PRIMARY KEY (key),  
  CONSTRAINT evidence_registry_source_id_fkey FOREIGN KEY (source_id) REFERENCES public.sources(id),  
  CONSTRAINT evidence_registry_leader_id_fkey FOREIGN KEY (leader_id) REFERENCES public.thought_leaders(id)  
);  
CREATE TABLE public.evt_context_detection (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  detected_at timestamp with time zone NOT NULL,  
  context_key text NOT NULL,  
  confidence numeric NOT NULL DEFAULT 0.5,  
  source text NOT NULL,  
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT evt_context_detection_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.evt_decision (  
  decision_id uuid NOT NULL,  
  user_id uuid NOT NULL,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  mode text NOT NULL DEFAULT 'standard'::text,  
  decision_json jsonb NOT NULL CHECK (decision_json ? 'decision_id'::text AND decision_json ? 'user_id'::text AND decision_json ? 'created_at'::text AND decision_json ? 'selection'::text AND decision_json ? 'why_now'::text AND decision_json ? 'policies'::text),  
  why_now jsonb NOT NULL DEFAULT '{}'::jsonb,  
  policies jsonb NOT NULL DEFAULT '{}'::jsonb,  
  selected jsonb,  
  audit jsonb NOT NULL DEFAULT '{}'::jsonb,  
  selection_type text,  
  selection_id text,  
  CONSTRAINT evt_decision_pkey PRIMARY KEY (decision_id)  
);  
CREATE TABLE public.evt_delivery (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  delivered_at timestamp with time zone NOT NULL,  
  content_id text,  
  delivery_type text NOT NULL,  
  decision_id uuid,  
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  mode USER-DEFINED,  
  delivery USER-DEFINED,  
  selection_type text,  
  selection_id text,  
  CONSTRAINT evt_delivery_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.evt_map_action (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  occurred_at timestamp with time zone NOT NULL,  
  map_stage text NOT NULL CHECK (map_stage = ANY (ARRAY['moment'::text, 'appraisal'::text, 'proof'::text])),  
  payload jsonb NOT NULL,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT evt_map_action_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.evt_outcome (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  occurred_at timestamp with time zone NOT NULL,  
  outcome_type text NOT NULL,  
  outcome jsonb NOT NULL,  
  related_delivery_id uuid,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT evt_outcome_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.evt_signal (  
  id bigint NOT NULL DEFAULT nextval('evt_signal_id_seq'::regclass),  
  user_id uuid,  
  type USER-DEFINED NOT NULL,  
  source text,  
  context jsonb,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT evt_signal_pkey PRIMARY KEY (id),  
  CONSTRAINT evt_signal_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)  
);  
CREATE TABLE public.evt_user_signal (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  occurred_at timestamp with time zone NOT NULL,  
  source text NOT NULL,  
  signal_type text NOT NULL,  
  signal jsonb NOT NULL,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT evt_user_signal_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.experiment_assignments (  
  experiment_id uuid NOT NULL,  
  individual_id uuid NOT NULL,  
  variant_id uuid NOT NULL,  
  assigned_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT experiment_assignments_pkey PRIMARY KEY (experiment_id, individual_id),  
  CONSTRAINT experiment_assignments_experiment_id_fkey FOREIGN KEY (experiment_id) REFERENCES public.experiments(id),  
  CONSTRAINT experiment_assignments_variant_id_fkey FOREIGN KEY (variant_id) REFERENCES public.experiment_variants(id)  
);  
CREATE TABLE public.experiment_variants (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  experiment_id uuid NOT NULL,  
  key text NOT NULL,  
  name text NOT NULL,  
  weight integer NOT NULL CHECK (weight >= 0),  
  CONSTRAINT experiment_variants_pkey PRIMARY KEY (id),  
  CONSTRAINT experiment_variants_experiment_id_fkey FOREIGN KEY (experiment_id) REFERENCES public.experiments(id)  
);  
CREATE TABLE public.experiments (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  experiment_key text NOT NULL UNIQUE,  
  name text NOT NULL,  
  description text,  
  starts_at timestamp with time zone NOT NULL,  
  ends_at timestamp with time zone,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  organization_id uuid,  
  CONSTRAINT experiments_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.family_check_defaults (  
  family_id uuid NOT NULL,  
  check_type_keys ARRAY NOT NULL DEFAULT '{}'::text[],  
  CONSTRAINT family_check_defaults_pkey PRIMARY KEY (family_id),  
  CONSTRAINT family_check_defaults_family_id_fkey FOREIGN KEY (family_id) REFERENCES public.mindblock_families(id)  
);  
CREATE TABLE public.family_claims (  
  family_id uuid NOT NULL,  
  claim_id uuid NOT NULL,  
  role text DEFAULT 'rationale'::text CHECK (role = ANY (ARRAY['rationale'::text, 'mechanism'::text, 'measurement'::text, 'contraindication'::text, 'example'::text])),  
  weight numeric DEFAULT 1.0 CHECK (weight >= 0::numeric AND weight <= 2::numeric),  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT family_claims_pkey PRIMARY KEY (family_id, claim_id),  
  CONSTRAINT family_claims_family_id_fkey FOREIGN KEY (family_id) REFERENCES public.mindblock_families(id),  
  CONSTRAINT family_claims_claim_id_fkey FOREIGN KEY (claim_id) REFERENCES public.claims(id)  
);  
CREATE TABLE public.family_interventions (  
  family_id uuid NOT NULL,  
  intervention_type text NOT NULL CHECK (intervention_type = ANY (ARRAY['navicue_type'::text, 'practice'::text, 'block'::text, 'sequence'::text, 'prompt'::text])),  
  intervention_id text NOT NULL,  
  strength numeric DEFAULT 1.0 CHECK (strength >= 0::numeric AND strength <= 2::numeric),  
  notes_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT family_interventions_pkey PRIMARY KEY (family_id, intervention_type, intervention_id),  
  CONSTRAINT family_interventions_family_id_fkey FOREIGN KEY (family_id) REFERENCES public.mindblock_families(id)  
);  
CREATE TABLE public.family_lenses (  
  family_id uuid NOT NULL,  
  lens_id text NOT NULL,  
  is_primary boolean DEFAULT false,  
  weight numeric DEFAULT 1.0 CHECK (weight >= 0::numeric AND weight <= 2::numeric),  
  notes_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT family_lenses_pkey PRIMARY KEY (family_id, lens_id),  
  CONSTRAINT family_lenses_family_id_fkey FOREIGN KEY (family_id) REFERENCES public.mindblock_families(id),  
  CONSTRAINT family_lenses_lens_id_fkey FOREIGN KEY (lens_id) REFERENCES public.lens_catalog(id)  
);  
CREATE TABLE public.family_receipt_defaults (  
  family_id uuid NOT NULL,  
  receipt_type_keys ARRAY NOT NULL DEFAULT '{}'::text[],  
  CONSTRAINT family_receipt_defaults_pkey PRIMARY KEY (family_id),  
  CONSTRAINT family_receipt_defaults_family_id_fkey FOREIGN KEY (family_id) REFERENCES public.mindblock_families(id)  
);  
CREATE TABLE public.family_schemas (  
  family_id uuid NOT NULL,  
  schema_id text NOT NULL,  
  is_primary boolean DEFAULT false,  
  weight numeric DEFAULT 1.0 CHECK (weight >= 0::numeric AND weight <= 2::numeric),  
  notes_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT family_schemas_pkey PRIMARY KEY (family_id, schema_id),  
  CONSTRAINT family_schemas_family_id_fkey FOREIGN KEY (family_id) REFERENCES public.mindblock_families(id),  
  CONSTRAINT family_schemas_schema_id_fkey FOREIGN KEY (schema_id) REFERENCES public.schema_catalog(id)  
);  
CREATE TABLE public.feed_cooldowns (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  target_type text NOT NULL CHECK (target_type = ANY (ARRAY['navicue'::text, 'sequence'::text, 'block'::text, 'article'::text, 'practice'::text])),  
  target_id text NOT NULL,  
  cooldown_until timestamp with time zone NOT NULL,  
  reason text,  
  created_at timestamp with time zone DEFAULT now(),  
  individual_id uuid,  
  profile_id uuid,  
  CONSTRAINT feed_cooldowns_pkey PRIMARY KEY (id),  
  CONSTRAINT feed_cooldowns_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.feed_exposures (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  item_kind text NOT NULL CHECK (item_kind = ANY (ARRAY['micro'::text, 'episode'::text])),  
  content_type text NOT NULL CHECK (content_type = ANY (ARRAY['navicue'::text, 'block'::text, 'sequence'::text, 'article'::text, 'practice'::text])),  
  content_id text NOT NULL,  
  reason text,  
  arousal_fit text,  
  surfaced_at timestamp with time zone NOT NULL,  
  completed_at timestamp with time zone,  
  skipped boolean,  
  helpful boolean,  
  rating integer,  
  dwell_seconds integer,  
  created_at timestamp with time zone DEFAULT now(),  
  content_ref uuid NOT NULL,  
  queue_id uuid,  
  decision_id uuid,  
  experiment_key text,  
  experiment_id uuid,  
  variant_key text,  
  variant_id uuid,  
  individual_id uuid NOT NULL,  
  profile_id uuid,  
  CONSTRAINT feed_exposures_pkey PRIMARY KEY (id),  
  CONSTRAINT feed_exposures_content_ref_fkey FOREIGN KEY (content_ref) REFERENCES public.content_registry(id),  
  CONSTRAINT feed_exposures_queue_fk FOREIGN KEY (queue_id) REFERENCES public.user_feed_queue_v2(id),  
  CONSTRAINT feed_exposures_decision_fk FOREIGN KEY (decision_id) REFERENCES public.bandit_decisions(id),  
  CONSTRAINT feed_exposures_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.feed_injections (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  item_kind text NOT NULL CHECK (item_kind = ANY (ARRAY['micro'::text, 'episode'::text])),  
  reason text,  
  content_type text NOT NULL CHECK (content_type = ANY (ARRAY['navicue'::text, 'block'::text, 'sequence'::text, 'article'::text, 'practice'::text])),  
  content_id text NOT NULL,  
  scheduled_for timestamp with time zone NOT NULL,  
  expires_at timestamp with time zone,  
  consumed_at timestamp with time zone,  
  dedupe_key text UNIQUE,  
  created_at timestamp with time zone DEFAULT now(),  
  content_ref uuid NOT NULL,  
  individual_id uuid,  
  profile_id uuid,  
  CONSTRAINT feed_injections_pkey PRIMARY KEY (id),  
  CONSTRAINT feed_injections_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),  
  CONSTRAINT feed_injections_content_ref_fkey FOREIGN KEY (content_ref) REFERENCES public.content_registry(id)  
);  
CREATE TABLE public.feed_rationale_violations (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  queue_id uuid,  
  individual_id uuid,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  payload jsonb,  
  CONSTRAINT feed_rationale_violations_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.framework_blueprint (  
  id text NOT NULL DEFAULT 'v1'::text,  
  summary_md text,  
  architecture_md text,  
  safety_principles_md text,  
  taxonomy jsonb,  
  version text DEFAULT '1.0.0'::text,  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT framework_blueprint_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.funnel_steps (  
  key text NOT NULL,  
  step_no integer NOT NULL,  
  verb text NOT NULL,  
  CONSTRAINT funnel_steps_pkey PRIMARY KEY (key, step_no)  
);  
CREATE TABLE public.generation_job_failures (  
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,  
  job_id uuid NOT NULL,  
  failed_at timestamp with time zone NOT NULL DEFAULT now(),  
  error text,  
  CONSTRAINT generation_job_failures_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.generation_jobs (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  seed_id uuid NOT NULL,  
  status text NOT NULL CHECK (status = ANY (ARRAY['queued'::text, 'running'::text, 'succeeded'::text, 'failed'::text])),  
  requested_count integer NOT NULL DEFAULT 1 CHECK (requested_count > 0),  
  error text,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  attempts integer NOT NULL DEFAULT 0,  
  dead_lettered boolean NOT NULL DEFAULT false,  
  CONSTRAINT generation_jobs_pkey PRIMARY KEY (id),  
  CONSTRAINT generation_jobs_seed_id_fkey FOREIGN KEY (seed_id) REFERENCES public.content_seeds(id)  
);  
CREATE TABLE public.guidance_modes (  
  mode_key text NOT NULL,  
  label text NOT NULL,  
  definition_md text,  
  never_do_md text,  
  safe_state_bands ARRAY NOT NULL DEFAULT '{}'::text[],  
  default_move_keys ARRAY NOT NULL DEFAULT '{}'::text[],  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT guidance_modes_pkey PRIMARY KEY (mode_key)  
);  
CREATE TABLE public.guru_dossiers (  
  guru_id bigint NOT NULL,  
  worldview_md text,  
  signature_moves jsonb DEFAULT '[]'::jsonb,  
  probing_styles jsonb DEFAULT '[]'::jsonb,  
  language_geometry jsonb DEFAULT '{}'::jsonb,  
  do_not jsonb DEFAULT '[]'::jsonb,  
  notes_md text,  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT guru_dossiers_pkey PRIMARY KEY (guru_id),  
  CONSTRAINT guru_dossiers_guru_id_fkey FOREIGN KEY (guru_id) REFERENCES public.gurus(id)  
);  
CREATE TABLE public.gurus (  
  id bigint NOT NULL DEFAULT nextval('gurus_id_seq'::regclass),  
  name text NOT NULL,  
  archetype text,  
  notes text,  
  CONSTRAINT gurus_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.hot_context_scores_v24 (  
  individual_id uuid NOT NULL,  
  context_key text NOT NULL,  
  score numeric NOT NULL DEFAULT 0 CHECK (score >= 0::numeric AND score <= 1::numeric),  
  confidence numeric NOT NULL DEFAULT 0.2 CHECK (confidence >= 0::numeric AND confidence <= 1::numeric),  
  drivers jsonb DEFAULT '{}'::jsonb,  
  last_triggered_at timestamp with time zone,  
  last_trained_at timestamp with time zone,  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT hot_context_scores_v24_pkey PRIMARY KEY (individual_id, context_key),  
  CONSTRAINT hot_context_scores_v24_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.idempotency_keys (  
  key text NOT NULL,  
  endpoint text NOT NULL,  
  user_id uuid NOT NULL,  
  request_hash text NOT NULL,  
  response_json jsonb,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT idempotency_keys_pkey PRIMARY KEY (key)  
);  
CREATE TABLE public.identity_lines (  
  id bigint NOT NULL DEFAULT nextval('identity_lines_id_seq'::regclass),  
  user_id uuid NOT NULL,  
  line_text text NOT NULL,  
  week_start date NOT NULL DEFAULT (date_trunc('week'::text, now()))::date,  
  adopted boolean DEFAULT true,  
  reuse_count integer DEFAULT 0,  
  active boolean DEFAULT true,  
  created_at timestamp with time zone DEFAULT now(),  
  individual_id uuid,  
  profile_id uuid,  
  CONSTRAINT identity_lines_pkey PRIMARY KEY (id),  
  CONSTRAINT identity_lines_user_fk FOREIGN KEY (user_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.in_app_notifications (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  outbox_id uuid UNIQUE,  
  individual_id uuid NOT NULL,  
  category text NOT NULL DEFAULT 'system'::text,  
  priority text NOT NULL DEFAULT 'normal'::text CHECK (priority = ANY (ARRAY['low'::text, 'normal'::text, 'high'::text, 'urgent'::text])),  
  title text,  
  body text NOT NULL,  
  deep_link text,  
  is_read boolean DEFAULT false,  
  read_at timestamp with time zone,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT in_app_notifications_pkey PRIMARY KEY (id),  
  CONSTRAINT in_app_notifications_outbox_id_fkey FOREIGN KEY (outbox_id) REFERENCES public.notifications_outbox(id),  
  CONSTRAINT in_app_notifications_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.insight_blocks (  
  insight_id text NOT NULL,  
  block_id text NOT NULL,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT insight_blocks_pkey PRIMARY KEY (insight_id, block_id),  
  CONSTRAINT insight_blocks_insight_id_fkey FOREIGN KEY (insight_id) REFERENCES public.navicues(id),  
  CONSTRAINT insight_blocks_block_id_fkey FOREIGN KEY (block_id) REFERENCES public.blocks(id)  
);  
CREATE TABLE public.insight_sections (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  insight_id bigint NOT NULL,  
  section_no integer NOT NULL,  
  heading text,  
  body_md text,  
  CONSTRAINT insight_sections_pkey PRIMARY KEY (id),  
  CONSTRAINT insight_sections_insight_id_fkey FOREIGN KEY (insight_id) REFERENCES public.insights(id)  
);  
CREATE TABLE public.insight_steps (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  insight_id bigint NOT NULL,  
  step_no integer NOT NULL,  
  prompt_md text,  
  practice jsonb,  
  quiz jsonb,  
  measure_key text,  
  CONSTRAINT insight_steps_pkey PRIMARY KEY (id),  
  CONSTRAINT insight_steps_insight_id_fkey FOREIGN KEY (insight_id) REFERENCES public.insights(id)  
);  
CREATE TABLE public.insights (  
  id bigint NOT NULL DEFAULT nextval('insights_id_seq'::regclass),  
  slug text UNIQUE,  
  title text NOT NULL,  
  summary_md text,  
  body_md text,  
  level USER-DEFINED DEFAULT 'patient'::content_level,  
  status USER-DEFINED NOT NULL DEFAULT 'draft'::content_status,  
  est_read_min integer,  
  pillar_id text,  
  concept_id text,  
  theme_id text,  
  tags ARRAY DEFAULT '{}'::text[],  
  hero_media_id bigint,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  sections jsonb,  
  CONSTRAINT insights_pkey PRIMARY KEY (id),  
  CONSTRAINT insights_pillar_id_fkey FOREIGN KEY (pillar_id) REFERENCES public.pillars(id),  
  CONSTRAINT insights_concept_id_fkey FOREIGN KEY (concept_id) REFERENCES public.concepts(id),  
  CONSTRAINT insights_theme_id_fkey FOREIGN KEY (theme_id) REFERENCES public.themes(id),  
  CONSTRAINT insights_hero_media_id_fkey FOREIGN KEY (hero_media_id) REFERENCES public.media_assets(id)  
);  
CREATE TABLE public.internal_model_patterns (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  pattern_name text NOT NULL,  
  description_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT internal_model_patterns_pkey PRIMARY KEY (id),  
  CONSTRAINT internal_model_patterns_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.intervention_injections (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  intervention_type text NOT NULL CHECK (intervention_type = ANY (ARRAY['block'::text, 'insight'::text, 'practice'::text, 'video'::text, 'navicue'::text, 'journey_step'::text])),  
  intervention_id uuid NOT NULL,  
  injected_asset_type text NOT NULL CHECK (injected_asset_type = ANY (ARRAY['soundbite'::text, 'practice'::text, 'prompt'::text, 'video'::text])),  
  injected_asset_id uuid NOT NULL,  
  placement text NOT NULL CHECK (placement = ANY (ARRAY['pre'::text, 'mid'::text, 'post'::text])),  
  start_ms integer,  
  end_ms integer,  
  required boolean DEFAULT false,  
  routing_rules jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT intervention_injections_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.job_processor_runs (  
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,  
  started_at timestamp with time zone NOT NULL DEFAULT now(),  
  finished_at timestamp with time zone,  
  processed integer NOT NULL DEFAULT 0,  
  ok integer NOT NULL DEFAULT 0,  
  fail integer NOT NULL DEFAULT 0,  
  error text,  
  details jsonb,  
  CONSTRAINT job_processor_runs_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.job_run_log (  
  id bigint NOT NULL DEFAULT nextval('job_run_log_id_seq'::regclass),  
  job_name text NOT NULL,  
  started_at timestamp with time zone NOT NULL DEFAULT now(),  
  finished_at timestamp with time zone,  
  status text NOT NULL CHECK (status = ANY (ARRAY['started'::text, 'succeeded'::text, 'failed'::text])),  
  details jsonb,  
  CONSTRAINT job_run_log_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.journey_audio_events (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  journey_instance_id uuid NOT NULL,  
  scene_number integer NOT NULL CHECK (scene_number >= 1 AND scene_number <= 50),  
  scene_key text,  
  event_type USER-DEFINED NOT NULL,  
  position_ms integer CHECK (position_ms IS NULL OR position_ms >= 0),  
  duration_ms integer CHECK (duration_ms IS NULL OR duration_ms >= 0),  
  playback_rate numeric,  
  muted boolean,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT journey_audio_events_pkey PRIMARY KEY (id),  
  CONSTRAINT journey_audio_events_journey_instance_id_fkey FOREIGN KEY (journey_instance_id) REFERENCES public.journey_instances(id)  
);  
CREATE TABLE public.journey_instance_scenes (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  journey_instance_id uuid NOT NULL,  
  scene_number integer NOT NULL CHECK (scene_number >= 1 AND scene_number <= 50),  
  status USER-DEFINED NOT NULL DEFAULT 'locked'::journey_instance_scene_status,  
  opened_at timestamp with time zone,  
  completed_at timestamp with time zone,  
  time_spent_ms integer CHECK (time_spent_ms IS NULL OR time_spent_ms >= 0),  
  completed_without_audio boolean NOT NULL DEFAULT false,  
  completion_mode USER-DEFINED,  
  client_version text,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT journey_instance_scenes_pkey PRIMARY KEY (id),  
  CONSTRAINT journey_instance_scenes_journey_instance_id_fkey FOREIGN KEY (journey_instance_id) REFERENCES public.journey_instances(id)  
);  
CREATE TABLE public.journey_instances (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  template_id text NOT NULL,  
  status USER-DEFINED NOT NULL DEFAULT 'active'::journey_instance_status,  
  current_scene_number integer NOT NULL DEFAULT 1 CHECK (current_scene_number >= 1 AND current_scene_number <= 50),  
  started_at timestamp with time zone NOT NULL DEFAULT now(),  
  completed_at timestamp with time zone,  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  cadence_mode USER-DEFINED NOT NULL DEFAULT 'daily'::journey_cadence_mode,  
  seed_window_hours smallint NOT NULL DEFAULT 24 CHECK (seed_window_hours >= 1 AND seed_window_hours <= 168),  
  min_scene_gap_hours smallint NOT NULL DEFAULT 6 CHECK (min_scene_gap_hours >= 0 AND min_scene_gap_hours <= 168),  
  next_scene_available_at timestamp with time zone,  
  paused_reason_code text,  
  source text NOT NULL DEFAULT 'onboarding'::text CHECK (source = ANY (ARRAY['onboarding'::text, 'luma'::text, 'clinician'::text, 'user_choice'::text])),  
  organization_id uuid,  
  individual_id uuid,  
  CONSTRAINT journey_instances_pkey PRIMARY KEY (id),  
  CONSTRAINT journey_instances_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.journey_template(id),  
  CONSTRAINT journey_instances_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),  
  CONSTRAINT journey_instances_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.journey_real_world_triggers (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  journey_instance_id uuid NOT NULL,  
  scene_number integer NOT NULL CHECK (scene_number >= 1 AND scene_number <= 50),  
  trigger_kind USER-DEFINED NOT NULL,  
  trigger_payload jsonb NOT NULL DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  mindblock_challenged ARRAY DEFAULT '{}'::text[],  
  transfer_success boolean,  
  CONSTRAINT journey_real_world_triggers_pkey PRIMARY KEY (id),  
  CONSTRAINT journey_real_world_triggers_journey_instance_id_fkey FOREIGN KEY (journey_instance_id) REFERENCES public.journey_instances(id)  
);  
CREATE TABLE public.journey_resistance_checks (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  journey_instance_id uuid NOT NULL,  
  scene_number integer NOT NULL CHECK (scene_number >= 1 AND scene_number <= 50),  
  value_num smallint NOT NULL CHECK (value_num >= 0 AND value_num <= 100),  
  hesitation_ms integer CHECK (hesitation_ms IS NULL OR hesitation_ms >= 0),  
  notes text,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  mindblock_inferred ARRAY DEFAULT '{}'::text[],  
  resistance_kind text,  
  CONSTRAINT journey_resistance_checks_pkey PRIMARY KEY (id),  
  CONSTRAINT journey_resistance_checks_journey_instance_id_fkey FOREIGN KEY (journey_instance_id) REFERENCES public.journey_instances(id)  
);  
CREATE TABLE public.journey_runs (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  template_id text NOT NULL,  
  user_id uuid,  
  status text NOT NULL DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'running'::text, 'paused'::text, 'completed'::text, 'failed'::text, 'canceled'::text])),  
  started_at timestamp with time zone DEFAULT now(),  
  completed_at timestamp with time zone,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT journey_runs_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.journey_scene_captures (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  journey_instance_id uuid NOT NULL,  
  scene_number integer NOT NULL CHECK (scene_number >= 1 AND scene_number <= 50),  
  capture_kind USER-DEFINED NOT NULL DEFAULT 'none'::journey_capture_kind,  
  capture_text text,  
  capture_storage_path text,  
  arousal_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,  
  tags ARRAY NOT NULL DEFAULT '{}'::text[],  
  luma_extracted jsonb NOT NULL DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  mindblock_self_report ARRAY DEFAULT '{}'::text[],  
  mindblock_inferred ARRAY DEFAULT '{}'::text[],  
  mindblock_confidence jsonb DEFAULT '{}'::jsonb,  
  CONSTRAINT journey_scene_captures_pkey PRIMARY KEY (id),  
  CONSTRAINT journey_scene_captures_journey_instance_id_fkey FOREIGN KEY (journey_instance_id) REFERENCES public.journey_instances(id)  
);  
CREATE TABLE public.journey_scene_events (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  journey_instance_id uuid NOT NULL,  
  scene_number integer NOT NULL CHECK (scene_number >= 1 AND scene_number <= 50),  
  event_type USER-DEFINED NOT NULL,  
  event_payload jsonb NOT NULL DEFAULT '{}'::jsonb,  
  client_ts timestamp with time zone,  
  client_session_id text,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT journey_scene_events_pkey PRIMARY KEY (id),  
  CONSTRAINT journey_scene_events_journey_instance_id_fkey FOREIGN KEY (journey_instance_id) REFERENCES public.journey_instances(id)  
);  
CREATE TABLE public.journey_scene_targets (  
  template_id text NOT NULL,  
  scene_number integer NOT NULL CHECK (scene_number >= 1 AND scene_number <= 50),  
  scope_type text NOT NULL CHECK (scope_type = ANY (ARRAY['schema'::text, 'family'::text, 'mindblock'::text, 'pillar'::text, 'concept'::text, 'theme'::text])),  
  schema_id text NOT NULL,  
  family_id uuid NOT NULL,  
  mindblock_id uuid NOT NULL,  
  pillar_id text NOT NULL,  
  concept_id text NOT NULL,  
  theme_id text NOT NULL,  
  weight numeric,  
  is_primary boolean DEFAULT false,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT journey_scene_targets_pkey PRIMARY KEY (template_id, scene_number, scope_type, schema_id, family_id, mindblock_id, pillar_id, concept_id, theme_id),  
  CONSTRAINT journey_scene_targets_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.journey_template(id)  
);  
CREATE TABLE public.journey_target_diagnostics (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  template_id text NOT NULL,  
  scene_number integer NOT NULL,  
  source text NOT NULL,  
  raw_value text NOT NULL,  
  reason text NOT NULL,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT journey_target_diagnostics_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.journey_template (  
  id text NOT NULL,  
  slug text,  
  title text,  
  pillar_id text,  
  pillar_name text,  
  sprint_number bigint,  
  duration_days bigint,  
  description text,  
  primary_mantra text,  
  has_audio boolean,  
  audio_voice_id text,  
  status text CHECK (status = ANY (ARRAY['draft'::text, 'review'::text, 'active'::text, 'archived'::text])),  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  mindblock_targets ARRAY DEFAULT '{}'::text[],  
  schema_targets ARRAY DEFAULT '{}'::text[],  
  contraindicated_mindblocks ARRAY DEFAULT '{}'::text[],  
  mindblock_intent text,  
  CONSTRAINT journey_template_pkey PRIMARY KEY (id),  
  CONSTRAINT journey_template_pillar_id_fkey FOREIGN KEY (pillar_id) REFERENCES public.pillars(id)  
);  
CREATE TABLE public.journey_template_scenes (  
  template_id text NOT NULL,  
  scene_number bigint NOT NULL,  
  scene_key text,  
  phase text,  
  scene_type text CHECK (scene_type = ANY (ARRAY['intro_teaching'::text, 'experience_teaching'::text, 'experience_cue'::text, 'experience_reflection'::text, 'bridge'::text, 'recognize_teaching'::text, 'recognize_cue'::text, 'recognize_reflection'::text, 'align_teaching'::text, 'align_cue'::text, 'align_reflection'::text, 'integration'::text])),  
  headline text,  
  narration_text text,  
  prompt text,  
  input_type text CHECK (input_type = ANY (ARRAY['none'::text, 'text'::text, 'voice'::text, 'slider'::text, 'binary'::text, 'tap'::text])),  
  has_audio boolean NOT NULL DEFAULT false,  
  audio_track_type text CHECK (audio_track_type = ANY (ARRAY['ember'::text, 'flame'::text, 'spark'::text, 'none'::text])),  
  audio_object_path text,  
  requires_real_world_trigger boolean NOT NULL DEFAULT false,  
  requires_resistance_check boolean NOT NULL DEFAULT false,  
  response_contract_json jsonb CHECK (response_contract_json IS NULL OR jsonb_typeof(response_contract_json) = 'object'::text),  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  era_phase text CHECK (era_phase = ANY (ARRAY['context'::text, 'experience'::text, 'recognize'::text, 'align'::text, 'reflection'::text])),  
  mindblock_targets ARRAY DEFAULT '{}'::text[],  
  mindblock_prompt_style text,  
  mindblock_probe text,  
  mindblock_resolution_move text,  
  move_key text,  
  stage_key text,  
  state_band text,  
  guidance_mode_key text,  
  receipt_type_keys ARRAY DEFAULT '{}'::text[],  
  real_life_check_keys ARRAY DEFAULT '{}'::text[],  
  CONSTRAINT journey_template_scenes_pkey PRIMARY KEY (id),  
  CONSTRAINT journey_template_scenes_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.journey_template(id),  
  CONSTRAINT journey_template_scenes_guidance_mode_key_fkey FOREIGN KEY (guidance_mode_key) REFERENCES public.guidance_modes(mode_key)  
);  
CREATE TABLE public.kbe_transitions (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  scope_type text NOT NULL CHECK (scope_type = ANY (ARRAY['schema'::text, 'family'::text, 'mindblock'::text, 'ladder'::text, 'rung'::text])),  
  scope_key text NOT NULL,  
  from_stage text,  
  to_stage text NOT NULL CHECK (to_stage = ANY (ARRAY['knowing'::text, 'believing'::text, 'embodying'::text])),  
  triggered_by_event jsonb DEFAULT '{}'::jsonb,  
  triggered_at timestamp with time zone NOT NULL DEFAULT now(),  
  trace_id uuid,  
  CONSTRAINT kbe_transitions_pkey PRIMARY KEY (id),  
  CONSTRAINT kbe_transitions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.kernel_dead_letters (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  job_id uuid,  
  error text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT kernel_dead_letters_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.kernel_decision_log (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  bandit_decision_id uuid,  
  individual_id uuid NOT NULL,  
  policy_id text,  
  policy_version text,  
  decision_source text NOT NULL CHECK (decision_source = ANY (ARRAY['policy_ai'::text, 'clinician_plan'::text, 'user_pull'::text, 'safety_override'::text, 'protocol_rail'::text])),  
  bucket text CHECK (bucket = ANY (ARRAY['DOWN_SHIFT'::text, 'TRANSFER'::text, 'GROWTH'::text, 'SUPPORT'::text])),  
  intent text,  
  chosen_type text NOT NULL CHECK (chosen_type = ANY (ARRAY['navicue'::text, 'block'::text, 'sequence'::text, 'practice'::text, 'checkin'::text, 'journey_scene'::text, 'social_move'::text])),  
  chosen_id text NOT NULL,  
  context jsonb NOT NULL DEFAULT '{}'::jsonb,  
  rationale jsonb NOT NULL DEFAULT '{}'::jsonb,  
  expected_effect jsonb DEFAULT '{}'::jsonb,  
  measurement_contract jsonb DEFAULT '{}'::jsonb,  
  deployment_refs jsonb DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT kernel_decision_log_pkey PRIMARY KEY (id),  
  CONSTRAINT kernel_decision_log_bandit_decision_id_fkey FOREIGN KEY (bandit_decision_id) REFERENCES public.bandit_decisions(id),  
  CONSTRAINT kernel_decision_log_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.kernel_jobs (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  topic text NOT NULL,  
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,  
  status text NOT NULL DEFAULT 'queued'::text,  
  run_at timestamp with time zone DEFAULT now(),  
  attempts integer NOT NULL DEFAULT 0,  
  last_error text,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT kernel_jobs_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.kv_store_3040d0df (  
  key text NOT NULL,  
  value jsonb NOT NULL,  
  CONSTRAINT kv_store_3040d0df_pkey PRIMARY KEY (key)  
);  
CREATE TABLE public.kv_store_49b28b8a (  
  key text NOT NULL,  
  value jsonb NOT NULL,  
  CONSTRAINT kv_store_49b28b8a_pkey PRIMARY KEY (key)  
);  
CREATE TABLE public.ladder_rungs (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  ladder_id uuid NOT NULL,  
  rung_no integer NOT NULL CHECK (rung_no >= 1),  
  label text NOT NULL,  
  criteria_md text,  
  CONSTRAINT ladder_rungs_pkey PRIMARY KEY (id),  
  CONSTRAINT ladder_rungs_ladder_id_fkey FOREIGN KEY (ladder_id) REFERENCES public.belief_ladders(id)  
);  
CREATE TABLE public.leader_lenses (  
  leader_id text NOT NULL,  
  lens_id text NOT NULL,  
  weight numeric DEFAULT 1,  
  notes_md text,  
  CONSTRAINT leader_lenses_pkey PRIMARY KEY (leader_id, lens_id),  
  CONSTRAINT leader_lenses_leader_id_fkey FOREIGN KEY (leader_id) REFERENCES public.thought_leaders(id),  
  CONSTRAINT leader_lenses_lens_id_fkey FOREIGN KEY (lens_id) REFERENCES public.lens_catalog(id)  
);  
CREATE TABLE public.leader_quotes (  
  id bigint NOT NULL DEFAULT nextval('leader_quotes_id_seq'::regclass),  
  leader_id text NOT NULL,  
  quote_md text NOT NULL,  
  source_id bigint,  
  context_tags ARRAY DEFAULT '{}'::text[],  
  CONSTRAINT leader_quotes_pkey PRIMARY KEY (id),  
  CONSTRAINT leader_quotes_leader_id_fkey FOREIGN KEY (leader_id) REFERENCES public.thought_leaders(id),  
  CONSTRAINT leader_quotes_source_id_fkey FOREIGN KEY (source_id) REFERENCES public.sources(id)  
);  
CREATE TABLE public.leader_sources (  
  id bigint NOT NULL DEFAULT nextval('leader_sources_id_seq'::regclass),  
  leader_id text,  
  title text NOT NULL,  
  year integer,  
  doi text,  
  url text,  
  source_id bigint,  
  notes_md text,  
  doi_norm text DEFAULT COALESCE(doi, ''::text),  
  url_norm text DEFAULT COALESCE(url, ''::text),  
  title_norm text DEFAULT COALESCE(title, ''::text),  
  CONSTRAINT leader_sources_pkey PRIMARY KEY (id),  
  CONSTRAINT leader_sources_leader_id_fkey FOREIGN KEY (leader_id) REFERENCES public.thought_leaders(id),  
  CONSTRAINT leader_sources_source_id_fkey FOREIGN KEY (source_id) REFERENCES public.sources(id)  
);  
CREATE TABLE public.lens_catalog (  
  id text NOT NULL,  
  name text NOT NULL,  
  description_md text,  
  constructs jsonb DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT lens_catalog_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.lens_leaders (  
  lens_id text NOT NULL,  
  leader_id text NOT NULL,  
  angle text,  
  weight numeric DEFAULT 1,  
  notes_md text,  
  CONSTRAINT lens_leaders_pkey PRIMARY KEY (lens_id, leader_id),  
  CONSTRAINT lens_leaders_lens_id_fkey FOREIGN KEY (lens_id) REFERENCES public.lens_catalog(id),  
  CONSTRAINT lens_leaders_leader_id_fkey FOREIGN KEY (leader_id) REFERENCES public.thought_leaders(id)  
);  
CREATE TABLE public.lens_mindblocks (  
  lens_id text NOT NULL,  
  mindblock_id uuid NOT NULL,  
  weight numeric DEFAULT 1.0,  
  notes_md text,  
  CONSTRAINT lens_mindblocks_pkey PRIMARY KEY (lens_id, mindblock_id),  
  CONSTRAINT lens_mindblocks_lens_id_fkey FOREIGN KEY (lens_id) REFERENCES public.lens_catalog(id),  
  CONSTRAINT lens_mindblocks_mindblock_id_fkey FOREIGN KEY (mindblock_id) REFERENCES public.mindblocks(id)  
);  
CREATE TABLE public.lesson_progress (  
  user_id uuid NOT NULL,  
  lesson_id bigint NOT NULL,  
  step_no integer NOT NULL,  
  done_at timestamp with time zone DEFAULT now(),  
  individual_id uuid,  
  profile_id uuid,  
  CONSTRAINT lesson_progress_pkey PRIMARY KEY (user_id, lesson_id, step_no),  
  CONSTRAINT lesson_progress_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.micro_lessons(id),  
  CONSTRAINT lesson_progress_individual_fk FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.luma_conversations (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  organization_id uuid,  
  title text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT luma_conversations_pkey PRIMARY KEY (id),  
  CONSTRAINT luma_conversations_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT luma_conversations_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)  
);  
CREATE TABLE public.luma_messages (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  conversation_id uuid NOT NULL,  
  sender text NOT NULL CHECK (sender = ANY (ARRAY['user'::text, 'luma'::text, 'clinician'::text])),  
  content text,  
  metadata jsonb DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT luma_messages_pkey PRIMARY KEY (id),  
  CONSTRAINT luma_messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.luma_conversations(id)  
);  
CREATE TABLE public.marker_observations (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  block_id text,  
  observed_at timestamp with time zone DEFAULT now(),  
  source text NOT NULL DEFAULT 'navicue_response'::text,  
  deployment_kind text,  
  deployment_id text,  
  markers jsonb NOT NULL DEFAULT '{}'::jsonb,  
  meta jsonb DEFAULT '{}'::jsonb,  
  individual_id uuid,  
  profile_id uuid,  
  CONSTRAINT marker_observations_pkey PRIMARY KEY (id),  
  CONSTRAINT marker_observations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),  
  CONSTRAINT marker_observations_block_id_fkey FOREIGN KEY (block_id) REFERENCES public.blocks(id)  
);  
CREATE TABLE public.marketing_asset_links (  
  asset_id uuid NOT NULL,  
  target_type text NOT NULL CHECK (target_type = ANY (ARRAY['schema'::text, 'family'::text, 'mindblock'::text, 'pillar'::text, 'concept'::text, 'theme'::text, 'article'::text, 'insight'::text, 'lesson'::text, 'block'::text, 'navicue'::text])),  
  target_id text NOT NULL,  
  relation text NOT NULL DEFAULT 'illustrates'::text,  
  weight numeric DEFAULT 1.0 CHECK (weight >= 0::numeric AND weight <= 5::numeric),  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT marketing_asset_links_pkey PRIMARY KEY (asset_id, target_type, target_id, relation),  
  CONSTRAINT marketing_asset_links_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.marketing_assets(id)  
);  
CREATE TABLE public.marketing_assets (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  bucket_id text NOT NULL,  
  object_name text NOT NULL,  
  title text,  
  description text,  
  tags ARRAY DEFAULT '{}'::text[],  
  is_published boolean NOT NULL DEFAULT false,  
  sort_order integer,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  file_size bigint,  
  mime_type text,  
  width integer,  
  height integer,  
  dominant_colors ARRAY,  
  color_profile text,  
  usage_tags ARRAY,  
  audience text,  
  language text,  
  purpose text,  
  pillar_id text,  
  concept_id text,  
  theme_id text,  
  family_id uuid,  
  mindblock_id uuid,  
  schema_relevance text,  
  meta jsonb,  
  public_url text,  
  descriptors jsonb,  
  last_enriched_at timestamp with time zone,  
  CONSTRAINT marketing_assets_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.media_assets (  
  id bigint NOT NULL DEFAULT nextval('media_assets_id_seq'::regclass),  
  kind USER-DEFINED NOT NULL,  
  storage_path text NOT NULL,  
  alt text,  
  duration_sec integer,  
  meta jsonb DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT media_assets_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.media_enrich_runs (  
  id bigint NOT NULL DEFAULT nextval('media_enrich_runs_id_seq'::regclass),  
  started_at timestamp with time zone NOT NULL DEFAULT now(),  
  finished_at timestamp with time zone,  
  status text NOT NULL DEFAULT 'queued'::text CHECK (status = ANY (ARRAY['queued'::text, 'running'::text, 'succeeded'::text, 'failed'::text])),  
  bucket text NOT NULL,  
  prefix text,  
  total_files integer,  
  processed_files integer DEFAULT 0,  
  succeeded integer DEFAULT 0,  
  failed integer DEFAULT 0,  
  error text,  
  CONSTRAINT media_enrich_runs_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.messages (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  room_id uuid NOT NULL,  
  user_id uuid NOT NULL,  
  content text NOT NULL,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  individual_id uuid,  
  profile_id uuid,  
  CONSTRAINT messages_pkey PRIMARY KEY (id),  
  CONSTRAINT messages_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.metric_config (  
  key text NOT NULL,  
  value_num numeric,  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT metric_config_pkey PRIMARY KEY (key)  
);  
CREATE TABLE public.metric_definitions (  
  metric_key text NOT NULL,  
  name text NOT NULL,  
  description_md text,  
  version integer NOT NULL DEFAULT 1,  
  formula jsonb NOT NULL DEFAULT '{}'::jsonb,  
  depends_on_signals ARRAY NOT NULL DEFAULT '{}'::text[],  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT metric_definitions_pkey PRIMARY KEY (metric_key)  
);  
CREATE TABLE public.micro_lessons (  
  id bigint NOT NULL DEFAULT nextval('micro_lessons_id_seq'::regclass),  
  slug text UNIQUE,  
  title text NOT NULL,  
  overview_md text,  
  level USER-DEFINED DEFAULT 'patient'::content_level,  
  status USER-DEFINED NOT NULL DEFAULT 'draft'::content_status,  
  pillar_id text,  
  concept_id text,  
  theme_id text,  
  block_id text,  
  tags ARRAY DEFAULT '{}'::text[],  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  status_text text,  
  CONSTRAINT micro_lessons_pkey PRIMARY KEY (id),  
  CONSTRAINT micro_lessons_pillar_id_fkey FOREIGN KEY (pillar_id) REFERENCES public.pillars(id),  
  CONSTRAINT micro_lessons_concept_id_fkey FOREIGN KEY (concept_id) REFERENCES public.concepts(id),  
  CONSTRAINT micro_lessons_theme_id_fkey FOREIGN KEY (theme_id) REFERENCES public.themes(id),  
  CONSTRAINT micro_lessons_block_id_fkey FOREIGN KEY (block_id) REFERENCES public.blocks(id)  
);  
CREATE TABLE public.micro_proofs (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  organization_id uuid,  
  mindblock_id uuid,  
  kind text NOT NULL,  
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  profile_id uuid,  
  CONSTRAINT micro_proofs_pkey PRIMARY KEY (id),  
  CONSTRAINT micro_proofs_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT micro_proofs_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),  
  CONSTRAINT micro_proofs_mindblock_id_fkey FOREIGN KEY (mindblock_id) REFERENCES public.mindblocks(id)  
);  
CREATE TABLE public.micro_steps (  
  id bigint NOT NULL DEFAULT nextval('micro_steps_id_seq'::regclass),  
  lesson_id bigint NOT NULL,  
  step_no integer NOT NULL,  
  prompt_md text NOT NULL,  
  practice jsonb DEFAULT '{}'::jsonb,  
  quiz jsonb,  
  measure_key text,  
  CONSTRAINT micro_steps_pkey PRIMARY KEY (id),  
  CONSTRAINT micro_steps_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.micro_lessons(id)  
);  
CREATE TABLE public.mind_steps (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  pillar_id text NOT NULL,  
  title text NOT NULL,  
  status text NOT NULL DEFAULT 'draft'::text,  
  sort_index integer NOT NULL DEFAULT 0,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT mind_steps_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.mind_steps_insights (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  mind_step_id uuid NOT NULL,  
  title text NOT NULL,  
  block_name text,  
  block_status text,  
  estimated_minutes integer,  
  why_it_matters text,  
  mechanism_md text,  
  key_takeaway text,  
  application_instruction text,  
  application_example text,  
  application_outcome text,  
  checkpoints jsonb NOT NULL DEFAULT '[]'::jsonb,  
  practice_connection jsonb NOT NULL DEFAULT '{}'::jsonb,  
  related_content jsonb NOT NULL DEFAULT '[]'::jsonb,  
  status text NOT NULL DEFAULT 'draft'::text,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  external_id text UNIQUE,  
  sort_index integer,  
  CONSTRAINT mind_steps_insights_pkey PRIMARY KEY (id),  
  CONSTRAINT mind_steps_insights_mind_step_id_fkey FOREIGN KEY (mind_step_id) REFERENCES public.mind_steps(id)  
);  
CREATE TABLE public.mindblock_claims (  
  mindblock_id uuid NOT NULL,  
  claim_id uuid NOT NULL,  
  role text DEFAULT 'rationale'::text CHECK (role = ANY (ARRAY['rationale'::text, 'mechanism'::text, 'measurement'::text, 'contraindication'::text, 'example'::text])),  
  weight numeric DEFAULT 1.0 CHECK (weight >= 0::numeric AND weight <= 2::numeric),  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT mindblock_claims_pkey PRIMARY KEY (mindblock_id, claim_id),  
  CONSTRAINT mindblock_claims_mindblock_id_fkey FOREIGN KEY (mindblock_id) REFERENCES public.mindblocks(id),  
  CONSTRAINT mindblock_claims_claim_id_fkey FOREIGN KEY (claim_id) REFERENCES public.claims(id)  
);  
CREATE TABLE public.mindblock_dedupe_queue (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  candidate_a uuid NOT NULL,  
  candidate_b uuid NOT NULL,  
  match_type text NOT NULL CHECK (match_type = ANY (ARRAY['name'::text, 'limiting_belief'::text, 'new_truth'::text, 'mixed'::text, 'manual'::text])),  
  similarity numeric NOT NULL CHECK (similarity >= 0::numeric AND similarity <= 1::numeric),  
  status text NOT NULL DEFAULT 'open'::text CHECK (status = ANY (ARRAY['open'::text, 'reviewing'::text, 'resolved'::text, 'dismissed'::text])),  
  resolution text CHECK (resolution = ANY (ARRAY['merge'::text, 'keep_distinct'::text, 'related'::text, 'redirect'::text, 'dismiss'::text])),  
  canonical_id uuid,  
  notes_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  resolved_at timestamp with time zone,  
  candidate_lo uuid DEFAULT LEAST(candidate_a, candidate_b),  
  candidate_hi uuid DEFAULT GREATEST(candidate_a, candidate_b),  
  CONSTRAINT mindblock_dedupe_queue_pkey PRIMARY KEY (id),  
  CONSTRAINT mindblock_dedupe_queue_candidate_a_fkey FOREIGN KEY (candidate_a) REFERENCES public.mindblocks(id),  
  CONSTRAINT mindblock_dedupe_queue_candidate_b_fkey FOREIGN KEY (candidate_b) REFERENCES public.mindblocks(id),  
  CONSTRAINT mindblock_dedupe_queue_canonical_id_fkey FOREIGN KEY (canonical_id) REFERENCES public.mindblocks(id)  
);  
CREATE TABLE public.mindblock_events (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  source_kind text NOT NULL CHECK (source_kind = ANY (ARRAY['journey'::text, 'navicue'::text, 'toolkit'::text, 'talk'::text, 'voice'::text, 'state'::text])),  
  source_ref uuid,  
  content_ref uuid,  
  journey_instance_id uuid,  
  journey_template_id text,  
  scene_key text,  
  mindblock_key text NOT NULL,  
  signal_type text NOT NULL CHECK (signal_type = ANY (ARRAY['activation'::text, 'resistance'::text, 'avoidance'::text, 'release'::text, 'reframe'::text, 'alignment_choice'::text, 'transfer'::text, 'connection'::text, 'shame_threat'::text])),  
  signal_strength numeric NOT NULL DEFAULT 0.5 CHECK (signal_strength >= 0::numeric AND signal_strength <= 1::numeric),  
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT mindblock_events_pkey PRIMARY KEY (id),  
  CONSTRAINT mindblock_events_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),  
  CONSTRAINT mindblock_events_content_ref_fkey FOREIGN KEY (content_ref) REFERENCES public.content_registry(id),  
  CONSTRAINT mindblock_events_journey_instance_id_fkey FOREIGN KEY (journey_instance_id) REFERENCES public.journey_instances(id),  
  CONSTRAINT mindblock_events_journey_template_id_fkey FOREIGN KEY (journey_template_id) REFERENCES public.journey_template(id)  
);  
CREATE TABLE public.mindblock_evidence_links (  
  mindblock_id uuid NOT NULL,  
  evidence_key text NOT NULL,  
  relation text NOT NULL,  
  weight numeric DEFAULT 1.0,  
  notes_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT mindblock_evidence_links_pkey PRIMARY KEY (mindblock_id, evidence_key, relation),  
  CONSTRAINT mindblock_evidence_links_mindblock_id_fkey FOREIGN KEY (mindblock_id) REFERENCES public.mindblocks(id),  
  CONSTRAINT mindblock_evidence_links_evidence_key_fkey FOREIGN KEY (evidence_key) REFERENCES public.evidence_registry(key)  
);  
CREATE TABLE public.mindblock_families (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  code text UNIQUE,  
  name text NOT NULL,  
  description_md text,  
  pillar_id text,  
  concept_id text,  
  theme_id text,  
  mechanism text,  
  clinical_rationale text,  
  limiting_pattern text,  
  new_truth_pattern text,  
  tags ARRAY DEFAULT '{}'::text[],  
  is_active boolean DEFAULT true,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  evidence_status text DEFAULT 'draft'::text CHECK (evidence_status = ANY (ARRAY['draft'::text, 'evidence_pending'::text, 'reviewed'::text, 'published'::text, 'contested'::text])),  
  evidence_score numeric,  
  last_reviewed_at timestamp with time zone,  
  slug text UNIQUE,  
  schema_id text,  
  typical_policies ARRAY DEFAULT '{}'::text[],  
  probe_hints jsonb DEFAULT '{}'::jsonb,  
  coping_direction text CHECK (coping_direction IS NULL OR (coping_direction = ANY (ARRAY['surrender'::text, 'avoidance'::text, 'overcompensation'::text, 'safety_behaviours'::text, 'relief_shortcuts'::text]))),  
  short_term_payoff text,  
  long_term_cost text,  
  default_move_keys ARRAY DEFAULT '{}'::text[],  
  default_receipt_types ARRAY DEFAULT '{}'::text[],  
  default_real_life_checks ARRAY DEFAULT '{}'::text[],  
  CONSTRAINT mindblock_families_pkey PRIMARY KEY (id),  
  CONSTRAINT mindblock_families_pillar_id_fkey FOREIGN KEY (pillar_id) REFERENCES public.pillars(id),  
  CONSTRAINT mindblock_families_concept_id_fkey FOREIGN KEY (concept_id) REFERENCES public.concepts(id),  
  CONSTRAINT mindblock_families_theme_id_fkey FOREIGN KEY (theme_id) REFERENCES public.themes(id)  
);  
CREATE TABLE public.mindblock_family_members (  
  family_id uuid NOT NULL,  
  mindblock_id uuid NOT NULL,  
  role text DEFAULT 'core'::text CHECK (role = ANY (ARRAY['core'::text, 'variant'::text, 'probe'::text, 'red_flag'::text, 'contra'::text, 'edge'::text])),  
  weight numeric DEFAULT 1.0 CHECK (weight >= 0::numeric AND weight <= 2::numeric),  
  notes_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT mindblock_family_members_pkey PRIMARY KEY (family_id, mindblock_id),  
  CONSTRAINT mindblock_family_members_family_id_fkey FOREIGN KEY (family_id) REFERENCES public.mindblock_families(id),  
  CONSTRAINT mindblock_family_members_mindblock_id_fkey FOREIGN KEY (mindblock_id) REFERENCES public.mindblocks(id)  
);  
CREATE TABLE public.mindblock_family_membership (  
  family_id uuid NOT NULL,  
  mindblock_id uuid NOT NULL,  
  role text DEFAULT 'core'::text CHECK (role = ANY (ARRAY['core'::text, 'variant'::text, 'probe'::text, 'intervention'::text, 'contra'::text])),  
  weight numeric DEFAULT 1.0 CHECK (weight >= 0::numeric AND weight <= 2::numeric),  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT mindblock_family_membership_pkey PRIMARY KEY (family_id, mindblock_id),  
  CONSTRAINT mindblock_family_membership_family_id_fkey FOREIGN KEY (family_id) REFERENCES public.mindblock_families(id),  
  CONSTRAINT mindblock_family_membership_mindblock_id_fkey FOREIGN KEY (mindblock_id) REFERENCES public.mindblocks(id)  
);  
CREATE TABLE public.mindblock_leaders (  
  mindblock_id uuid NOT NULL,  
  leader_id text NOT NULL,  
  angle text,  
  weight numeric DEFAULT 1.0,  
  notes_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT mindblock_leaders_pkey PRIMARY KEY (mindblock_id, leader_id),  
  CONSTRAINT mindblock_leaders_mindblock_id_fkey FOREIGN KEY (mindblock_id) REFERENCES public.mindblocks(id),  
  CONSTRAINT mindblock_leaders_leader_id_fkey FOREIGN KEY (leader_id) REFERENCES public.thought_leaders(id)  
);  
CREATE TABLE public.mindblock_lenses (  
  mindblock_id uuid NOT NULL,  
  lens_id text NOT NULL,  
  weight numeric NOT NULL DEFAULT 1.0 CHECK (weight >= 0::numeric AND weight <= 5::numeric),  
  notes_md text,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT mindblock_lenses_pkey PRIMARY KEY (mindblock_id, lens_id),  
  CONSTRAINT mindblock_lenses_mindblock_id_fkey FOREIGN KEY (mindblock_id) REFERENCES public.mindblocks(id),  
  CONSTRAINT mindblock_lenses_lens_id_fkey FOREIGN KEY (lens_id) REFERENCES public.lens_catalog(id)  
);  
CREATE TABLE public.mindblock_redirects (  
  from_id uuid NOT NULL,  
  to_id uuid NOT NULL,  
  reason text DEFAULT 'dedupe'::text,  
  notes_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT mindblock_redirects_pkey PRIMARY KEY (from_id),  
  CONSTRAINT mindblock_redirects_from_id_fkey FOREIGN KEY (from_id) REFERENCES public.mindblocks(id),  
  CONSTRAINT mindblock_redirects_to_id_fkey FOREIGN KEY (to_id) REFERENCES public.mindblocks(id)  
);  
CREATE TABLE public.mindblock_schemas (  
  mindblock_id uuid NOT NULL,  
  schema_id text NOT NULL,  
  weight numeric NOT NULL DEFAULT 1.0 CHECK (weight >= 0::numeric AND weight <= 5::numeric),  
  is_primary boolean NOT NULL DEFAULT false,  
  notes_md text,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT mindblock_schemas_pkey PRIMARY KEY (mindblock_id, schema_id),  
  CONSTRAINT mindblock_schemas_mindblock_id_fkey FOREIGN KEY (mindblock_id) REFERENCES public.mindblocks(id),  
  CONSTRAINT mindblock_schemas_schema_id_fkey FOREIGN KEY (schema_id) REFERENCES public.schema_catalog(id)  
);  
CREATE TABLE public.mindblocks (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  code text UNIQUE,  
  name text NOT NULL,  
  description_md text,  
  pillar_id text,  
  theme_id text,  
  tags ARRAY DEFAULT '{}'::text[],  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  limiting_belief text,  
  new_truth text,  
  clinical_rationale text,  
  mechanism text,  
  sort_order integer,  
  concept_id text,  
  evidence_status text DEFAULT 'draft'::text CHECK (evidence_status = ANY (ARRAY['draft'::text, 'evidence_pending'::text, 'reviewed'::text, 'published'::text, 'contested'::text])),  
  evidence_score numeric,  
  last_reviewed_at timestamp with time zone,  
  variant_key text,  
  variant_meta jsonb DEFAULT '{}'::jsonb,  
  dedupe_fingerprint text DEFAULT regexp_replace(lower(btrim(((((COALESCE(name, ''::text) || ' '::text) || COALESCE(limiting_belief, ''::text)) || ' '::text) || COALESCE(new_truth, ''::text)))), '\s+'::text, ' '::text, 'g'::text),  
  CONSTRAINT mindblocks_pkey PRIMARY KEY (id),  
  CONSTRAINT mindblocks_concept_id_fkey FOREIGN KEY (concept_id) REFERENCES public.concepts(id)  
);  
CREATE TABLE public.momentum (  
  user_id uuid NOT NULL,  
  week_start date NOT NULL,  
  summary jsonb,  
  profile_id uuid,  
  CONSTRAINT momentum_pkey PRIMARY KEY (user_id, week_start),  
  CONSTRAINT momentum_user_fk FOREIGN KEY (user_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.moods (  
  slug text NOT NULL,  
  name text NOT NULL,  
  CONSTRAINT moods_pkey PRIMARY KEY (slug)  
);  
CREATE TABLE public.mv_refresh_logs (  
  id bigint NOT NULL DEFAULT nextval('mv_refresh_logs_id_seq'::regclass),  
  started_at timestamp with time zone NOT NULL DEFAULT now(),  
  finished_at timestamp with time zone,  
  success boolean,  
  error_text text,  
  duration_ms integer CHECK (duration_ms IS NULL OR duration_ms >= 0),  
  triggered_by text DEFAULT 'cron'::text,  
  CONSTRAINT mv_refresh_logs_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.navicue_content_registry (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  library_id text NOT NULL,  
  variant_id uuid,  
  content_type text NOT NULL,  
  name text NOT NULL,  
  body jsonb NOT NULL DEFAULT '{}'::jsonb,  
  checksum text,  
  variant_id_coalesced uuid DEFAULT COALESCE(variant_id, '00000000-0000-0000-0000-000000000000'::uuid),  
  CONSTRAINT navicue_content_registry_pkey PRIMARY KEY (id),  
  CONSTRAINT navicue_content_registry_library_id_fkey FOREIGN KEY (library_id) REFERENCES public.navicue_library(id),  
  CONSTRAINT navicue_content_registry_variant_id_fkey FOREIGN KEY (variant_id) REFERENCES public.navicue_variants(id)  
);  
CREATE TABLE public.navicue_deployments (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  navicue_id text NOT NULL,  
  deployed_at timestamp with time zone DEFAULT now(),  
  response_data jsonb,  
  response_time_seconds integer,  
  skipped boolean DEFAULT false,  
  context jsonb,  
  voice_id text,  
  rationale jsonb DEFAULT '{}'::jsonb CHECK (rationale IS NULL OR jsonb_typeof(rationale) = 'object'::text),  
  content_ref uuid,  
  experiment_key text,  
  experiment_id uuid,  
  variant_key text,  
  variant_id uuid,  
  decision_source USER-DEFINED DEFAULT 'policy_ai'::decision_source_enum,  
  individual_id uuid,  
  profile_id uuid,  
  CONSTRAINT navicue_deployments_pkey PRIMARY KEY (id),  
  CONSTRAINT navicue_deployments_navicue_id_fkey FOREIGN KEY (navicue_id) REFERENCES public.navicue_library(id),  
  CONSTRAINT navicue_deployments_voice_fk FOREIGN KEY (voice_id) REFERENCES public.voice_archetypes(id),  
  CONSTRAINT navicue_deployments_navicue_library_fk FOREIGN KEY (navicue_id) REFERENCES public.navicue_library(id),  
  CONSTRAINT navicue_deployments_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.navicue_deployments_v2 (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  navicue_id uuid NOT NULL,  
  delivered_at timestamp with time zone NOT NULL DEFAULT now(),  
  delivery_id uuid,  
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,  
  CONSTRAINT navicue_deployments_v2_pkey PRIMARY KEY (id),  
  CONSTRAINT navicue_deployments_v2_navicue_id_fkey FOREIGN KEY (navicue_id) REFERENCES public.navicues_v2(id)  
);  
CREATE TABLE public.navicue_form_catalog (  
  form_slug text NOT NULL,  
  label text NOT NULL,  
  defaults jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (defaults ? 'component_type'::text AND ((defaults ->> 'component_type'::text)::component_type) IS NOT NULL),  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT navicue_form_catalog_pkey PRIMARY KEY (form_slug)  
);  
CREATE TABLE public.navicue_library (  
  id text NOT NULL,  
  type_id text NOT NULL,  
  pillar_id text,  
  theme_id text,  
  text_line text NOT NULL,  
  audio_url text,  
  video_url text,  
  response_type text NOT NULL CHECK (response_type = ANY (ARRAY['tap'::text, 'binary'::text, 'slider'::text, 'one_word'::text, 'breath'::text, 'hold'::text, 'none'::text])),  
  response_options jsonb,  
  personalization jsonb,  
  min_day_in_journey integer,  
  max_day_in_journey integer,  
  requires_mindblock_state jsonb,  
  is_curveball boolean DEFAULT false,  
  tags ARRAY,  
  status text DEFAULT 'active'::text,  
  kbe_target text CHECK (kbe_target = ANY (ARRAY['knowing'::text, 'believing'::text, 'embodying'::text])),  
  created_at timestamp with time zone DEFAULT now(),  
  navicue_pk text,  
  heat_level text DEFAULT 'medium'::text CHECK (heat_level = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text])),  
  primary_schema_id uuid,  
  updated_at timestamp with time zone,  
  CONSTRAINT navicue_library_pkey PRIMARY KEY (id),  
  CONSTRAINT navicue_library_type_id_fkey FOREIGN KEY (type_id) REFERENCES public.navicue_types(id),  
  CONSTRAINT navicue_library_pillar_id_fkey FOREIGN KEY (pillar_id) REFERENCES public.pillars(id),  
  CONSTRAINT navicue_library_theme_id_fkey FOREIGN KEY (theme_id) REFERENCES public.themes(id),  
  CONSTRAINT navicue_library_navicue_pk_fkey FOREIGN KEY (navicue_pk) REFERENCES public.navicues(id)  
);  
CREATE TABLE public.navicue_library_staging (  
  id text,  
  type_id text,  
  pillar_id text,  
  theme_id text,  
  text_line text,  
  audio_url text,  
  video_url text,  
  response_type text,  
  response_options jsonb,  
  personalization jsonb,  
  min_day_in_journey integer,  
  max_day_in_journey integer,  
  requires_mindblock_state jsonb,  
  is_curveball boolean,  
  tags ARRAY,  
  status text,  
  kbe_target text  
);  
CREATE TABLE public.navicue_mindblocks (  
  navicue_id text NOT NULL,  
  mindblock_id uuid NOT NULL,  
  relevance_strength numeric,  
  CONSTRAINT navicue_mindblocks_pkey PRIMARY KEY (navicue_id, mindblock_id),  
  CONSTRAINT navicue_mindblocks_navicue_id_fkey FOREIGN KEY (navicue_id) REFERENCES public.navicues(id),  
  CONSTRAINT navicue_mindblocks_mindblock_id_fkey FOREIGN KEY (mindblock_id) REFERENCES public.mindblocks(id)  
);  
CREATE TABLE public.navicue_prompts (  
  navicue_id text NOT NULL,  
  prompt_id text NOT NULL,  
  relation text DEFAULT 'delivers'::text,  
  CONSTRAINT navicue_prompts_pkey PRIMARY KEY (navicue_id, prompt_id),  
  CONSTRAINT navicue_prompts_navicue_id_fkey FOREIGN KEY (navicue_id) REFERENCES public.navicues(id),  
  CONSTRAINT navicue_prompts_prompt_id_fkey FOREIGN KEY (prompt_id) REFERENCES public.prompt_templates(id)  
);  
CREATE TABLE public.navicue_responses (  
  id bigint NOT NULL DEFAULT nextval('navicue_responses_id_seq'::regclass),  
  navicue_id text NOT NULL,  
  theme_id text,  
  pillar_id text,  
  captured_at timestamp with time zone DEFAULT now(),  
  capture_type text NOT NULL CHECK (capture_type = ANY (ARRAY['tap'::text, 'one_word'::text, 'slider'::text, 'voice10'::text, 'none'::text])),  
  hesitation_ms integer,  
  response_text text,  
  response_choice text,  
  response_slider numeric,  
  valence_smallint smallint,  
  context text,  
  kbe_target USER-DEFINED,  
  meta jsonb DEFAULT '{}'::jsonb,  
  deployment_id uuid,  
  navicue_library_id text,  
  exposure_id uuid,  
  queue_id uuid,  
  voice_id text,  
  individual_id uuid NOT NULL,  
  CONSTRAINT navicue_responses_pkey PRIMARY KEY (id),  
  CONSTRAINT navicue_responses_navicue_id_fkey FOREIGN KEY (navicue_id) REFERENCES public.navicues(id),  
  CONSTRAINT navicue_responses_queue_fk FOREIGN KEY (queue_id) REFERENCES public.user_feed_queue_v2(id),  
  CONSTRAINT navicue_responses_voice_fk FOREIGN KEY (voice_id) REFERENCES public.voice_archetypes(id),  
  CONSTRAINT navicue_responses_deployment_fk FOREIGN KEY (deployment_id) REFERENCES public.navicue_deployments(id),  
  CONSTRAINT navicue_responses_library_fk FOREIGN KEY (navicue_library_id) REFERENCES public.navicue_library(id),  
  CONSTRAINT navicue_responses_exposure_fk FOREIGN KEY (exposure_id) REFERENCES public.feed_exposures(id),  
  CONSTRAINT navicue_responses_individual_fk FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.navicue_responses_v2 (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  deployment_id uuid,  
  navicue_id uuid NOT NULL,  
  response_type USER-DEFINED NOT NULL,  
  response jsonb NOT NULL,  
  latency_ms integer,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT navicue_responses_v2_pkey PRIMARY KEY (id),  
  CONSTRAINT navicue_responses_v2_deployment_id_fkey FOREIGN KEY (deployment_id) REFERENCES public.navicue_deployments_v2(id),  
  CONSTRAINT navicue_responses_v2_navicue_id_fkey FOREIGN KEY (navicue_id) REFERENCES public.navicues_v2(id)  
);  
CREATE TABLE public.navicue_route_events (  
  id bigint NOT NULL DEFAULT nextval('navicue_route_events_id_seq'::regclass),  
  event_type text NOT NULL CHECK (event_type = ANY (ARRAY['route'::text, 'complete'::text])),  
  schema_id text,  
  navicue_id text,  
  status_code integer NOT NULL,  
  detail text,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT navicue_route_events_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.navicue_router (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  canonical_navicue_id text NOT NULL,  
  variant_key text,  
  match_expr jsonb NOT NULL DEFAULT '{}'::jsonb,  
  active boolean NOT NULL DEFAULT true,  
  CONSTRAINT navicue_router_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.navicue_schema_capacity (  
  schema_id text NOT NULL,  
  max_concurrent integer,  
  current_load integer DEFAULT 0,  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT navicue_schema_capacity_pkey PRIMARY KEY (schema_id)  
);  
CREATE TABLE public.navicue_schema_cooldowns (  
  schema_id text NOT NULL,  
  cooldown_ms integer,  
  last_used_at timestamp with time zone,  
  CONSTRAINT navicue_schema_cooldowns_pkey PRIMARY KEY (schema_id)  
);  
CREATE TABLE public.navicue_schema_map (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  navicue_id text NOT NULL,  
  schema_id text NOT NULL,  
  weight numeric DEFAULT 1.0 CHECK (weight >= 0::numeric AND weight <= 5::numeric),  
  rule_source text DEFAULT 'manual'::text,  
  notes text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT navicue_schema_map_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.navicue_schemas (  
  navicue_id text NOT NULL,  
  schema_id text NOT NULL,  
  weight numeric DEFAULT 1.0,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT navicue_schemas_pkey PRIMARY KEY (navicue_id, schema_id),  
  CONSTRAINT navicue_schemas_navicue_fk FOREIGN KEY (navicue_id) REFERENCES public.navicues(id),  
  CONSTRAINT navicue_schemas_schema_fk FOREIGN KEY (schema_id) REFERENCES public.schema_catalog(id)  
);  
CREATE TABLE public.navicue_steps_v2 (  
  navicue_id uuid NOT NULL,  
  step_index integer NOT NULL CHECK (step_index >= 1 AND step_index <= 20),  
  component_type USER-DEFINED NOT NULL,  
  response_type USER-DEFINED NOT NULL,  
  config jsonb NOT NULL DEFAULT '{}'::jsonb,  
  CONSTRAINT navicue_steps_v2_pkey PRIMARY KEY (navicue_id, step_index),  
  CONSTRAINT navicue_steps_v2_navicue_id_fkey FOREIGN KEY (navicue_id) REFERENCES public.navicues_v2(id)  
);  
CREATE TABLE public.navicue_targets_v2 (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  navicue_id uuid NOT NULL,  
  scope_type USER-DEFINED NOT NULL,  
  schema_id text,  
  family_id uuid,  
  mindblock_id uuid,  
  pillar_id text,  
  concept_id text,  
  theme_id text,  
  weight numeric,  
  is_primary boolean NOT NULL DEFAULT false,  
  brain_coordinate jsonb NOT NULL DEFAULT '{}'::jsonb,  
  CONSTRAINT navicue_targets_v2_pkey PRIMARY KEY (id),  
  CONSTRAINT navicue_targets_v2_navicue_id_fkey FOREIGN KEY (navicue_id) REFERENCES public.navicues_v2(id),  
  CONSTRAINT navicue_targets_v2_schema_id_fkey FOREIGN KEY (schema_id) REFERENCES public.schema_catalog(id),  
  CONSTRAINT navicue_targets_v2_family_id_fkey FOREIGN KEY (family_id) REFERENCES public.mindblock_families(id),  
  CONSTRAINT navicue_targets_v2_mindblock_id_fkey FOREIGN KEY (mindblock_id) REFERENCES public.mindblocks(id),  
  CONSTRAINT navicue_targets_v2_pillar_id_fkey FOREIGN KEY (pillar_id) REFERENCES public.pillars(id),  
  CONSTRAINT navicue_targets_v2_concept_id_fkey FOREIGN KEY (concept_id) REFERENCES public.concepts(id),  
  CONSTRAINT navicue_targets_v2_theme_id_fkey FOREIGN KEY (theme_id) REFERENCES public.themes(id)  
);  
CREATE TABLE public.navicue_types (  
  id text NOT NULL,  
  family text NOT NULL,  
  category text NOT NULL,  
  purpose text NOT NULL,  
  kbe_layer text NOT NULL CHECK (kbe_layer = ANY (ARRAY['knowing'::text, 'believing'::text, 'embodying'::text])),  
  deployment_logic jsonb DEFAULT '{}'::jsonb,  
  example_text text,  
  tags ARRAY,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT navicue_types_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.navicue_variants (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  library_id text NOT NULL,  
  key text NOT NULL,  
  config jsonb NOT NULL DEFAULT '{}'::jsonb,  
  CONSTRAINT navicue_variants_pkey PRIMARY KEY (id),  
  CONSTRAINT navicue_variants_library_id_fkey FOREIGN KEY (library_id) REFERENCES public.navicue_library(id)  
);  
CREATE TABLE public.navicue_variants_v2 (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  navicue_id uuid NOT NULL,  
  lens USER-DEFINED NOT NULL DEFAULT 'therapist'::council_lens,  
  language text NOT NULL DEFAULT 'en'::text,  
  copy jsonb NOT NULL DEFAULT '{}'::jsonb,  
  is_default boolean NOT NULL DEFAULT false,  
  version integer NOT NULL DEFAULT 1,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT navicue_variants_v2_pkey PRIMARY KEY (id),  
  CONSTRAINT navicue_variants_v2_navicue_id_fkey FOREIGN KEY (navicue_id) REFERENCES public.navicues_v2(id)  
);  
CREATE TABLE public.navicue_voices (  
  navicue_id text NOT NULL,  
  voice_id text NOT NULL,  
  weight numeric DEFAULT 1,  
  CONSTRAINT navicue_voices_pkey PRIMARY KEY (navicue_id, voice_id),  
  CONSTRAINT navicue_voices_navicue_id_fkey FOREIGN KEY (navicue_id) REFERENCES public.navicues(id),  
  CONSTRAINT navicue_voices_voice_id_fkey FOREIGN KEY (voice_id) REFERENCES public.voice_archetypes(id)  
);  
CREATE TABLE public.navicues (  
  id text NOT NULL,  
  name text NOT NULL,  
  hits ARRAY DEFAULT '{}'::text[],  
  tags ARRAY DEFAULT '{}'::text[],  
  payload jsonb NOT NULL,  
  duration_sec integer,  
  state_fit jsonb,  
  safety_flags ARRAY DEFAULT '{}'::text[],  
  title text NOT NULL DEFAULT 'Untitled'::text,  
  status USER-DEFINED DEFAULT 'draft'::navi_status,  
  intent ARRAY DEFAULT '{}'::text[],  
  pillar_links ARRAY DEFAULT '{}'::text[],  
  modality ARRAY DEFAULT '{text}'::text[],  
  type USER-DEFINED NOT NULL DEFAULT 'mirror'::navicue_type,  
  kbe_target USER-DEFINED NOT NULL DEFAULT 'knowing'::kbe_layer,  
  curveball boolean DEFAULT false,  
  context_tags ARRAY DEFAULT '{}'::text[],  
  measure_hooks jsonb DEFAULT '{}'::jsonb,  
  response_contract jsonb DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  family text,  
  family_name text,  
  type_name text,  
  practice_liquidity_score numeric,  
  mechanism text,  
  expected_effect text,  
  contraindications text,  
  display_format jsonb,  
  audio_url text,  
  video_url text,  
  is_active boolean DEFAULT true,  
  modality_simple text,  
  neuro_tags jsonb DEFAULT '{}'::jsonb,  
  schema_targets ARRAY DEFAULT '{}'::text[],  
  CONSTRAINT navicues_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.navicues-export-2026-01-06.csv (  
  id text,  
  name text,  
  text_line text,  
  pillar_id text,  
  schema text,  
  family text,  
  kbe_layer text,  
  response_type text,  
  modality text,  
  heat_level text,  
  council_lens text,  
  tags text,  
  batch bigint,  
  status text,  
  created_at timestamp with time zone  
);  
CREATE TABLE public.navicues_v2 (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  code text UNIQUE,  
  status text NOT NULL DEFAULT 'active'::text,  
  kbe_layer USER-DEFINED,  
  tier USER-DEFINED,  
  family text,  
  primary_schema_id text,  
  component_type USER-DEFINED NOT NULL,  
  default_response_type USER-DEFINED NOT NULL,  
  intent text,  
  safety_notes text,  
  config jsonb NOT NULL DEFAULT '{}'::jsonb,  
  analytics_config jsonb NOT NULL DEFAULT '{}'::jsonb,  
  tags ARRAY NOT NULL DEFAULT '{}'::text[],  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  move_key text,  
  stage_key text,  
  state_band text,  
  guidance_mode_key text,  
  receipt_type_keys ARRAY DEFAULT '{}'::text[],  
  real_life_check_keys ARRAY DEFAULT '{}'::text[],  
  CONSTRAINT navicues_v2_pkey PRIMARY KEY (id),  
  CONSTRAINT navicues_v2_primary_schema_id_fkey FOREIGN KEY (primary_schema_id) REFERENCES public.schema_catalog(id),  
  CONSTRAINT navicues_v2_guidance_mode_key_fkey FOREIGN KEY (guidance_mode_key) REFERENCES public.guidance_modes(mode_key)  
);  
CREATE TABLE public.node_content_refs (  
  node_id uuid NOT NULL,  
  content_ref uuid NOT NULL,  
  relation USER-DEFINED NOT NULL DEFAULT 'related_to'::graph_edge_kind,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT node_content_refs_pkey PRIMARY KEY (node_id, content_ref, relation),  
  CONSTRAINT node_content_refs_node_fk FOREIGN KEY (node_id) REFERENCES public.world_nodes(id),  
  CONSTRAINT node_content_refs_content_fk FOREIGN KEY (content_ref) REFERENCES public.content_registry(id)  
);  
CREATE TABLE public.notification_cadence_allowed_channels (  
  category text NOT NULL,  
  channel USER-DEFINED NOT NULL,  
  CONSTRAINT notification_cadence_allowed_channels_pkey PRIMARY KEY (category, channel),  
  CONSTRAINT notification_cadence_allowed_channels_category_fkey FOREIGN KEY (category) REFERENCES public.notification_category(key)  
);  
CREATE TABLE public.notification_cadence_rules (  
  category text NOT NULL,  
  priority_default USER-DEFINED NOT NULL DEFAULT 'normal'::notification_priority,  
  cooldown_minutes integer NOT NULL DEFAULT 120 CHECK (cooldown_minutes >= 0 AND cooldown_minutes <= 10080),  
  max_per_day_override integer CHECK (max_per_day_override IS NULL OR max_per_day_override >= 0 AND max_per_day_override <= 1000),  
  quiet_hours_policy text NOT NULL DEFAULT 'respect'::text CHECK (quiet_hours_policy = ANY (ARRAY['respect'::text, 'override_urgent_only'::text, 'ignore'::text])),  
  requires_consent boolean NOT NULL DEFAULT true,  
  delivery_window_start_local time with time zone,  
  delivery_window_end_local time with time zone,  
  CONSTRAINT notification_cadence_rules_pkey PRIMARY KEY (category),  
  CONSTRAINT notification_cadence_rules_category_fkey FOREIGN KEY (category) REFERENCES public.notification_category(key)  
);  
CREATE TABLE public.notification_category (  
  key text NOT NULL,  
  label text NOT NULL,  
  description text,  
  CONSTRAINT notification_category_pkey PRIMARY KEY (key)  
);  
CREATE TABLE public.notification_consent (  
  individual_id uuid NOT NULL,  
  category text NOT NULL,  
  channel USER-DEFINED NOT NULL,  
  enabled boolean NOT NULL DEFAULT false,  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT notification_consent_pkey PRIMARY KEY (individual_id, category, channel),  
  CONSTRAINT notification_consent_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT notification_consent_category_fkey FOREIGN KEY (category) REFERENCES public.notification_category(key)  
);  
CREATE TABLE public.notification_deliveries (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  outbox_id uuid NOT NULL,  
  provider text NOT NULL DEFAULT 'internal'::text,  
  provider_message_id text,  
  attempt_no integer NOT NULL DEFAULT 1 CHECK (attempt_no >= 1 AND attempt_no <= 10),  
  status USER-DEFINED NOT NULL DEFAULT 'pending'::delivery_status_enum,  
  requested_at timestamp with time zone DEFAULT now(),  
  sent_at timestamp with time zone,  
  delivered_at timestamp with time zone,  
  opened_at timestamp with time zone,  
  clicked_at timestamp with time zone,  
  error_code text,  
  error_message text,  
  meta jsonb DEFAULT '{}'::jsonb,  
  CONSTRAINT notification_deliveries_pkey PRIMARY KEY (id),  
  CONSTRAINT notification_deliveries_outbox_id_fkey FOREIGN KEY (outbox_id) REFERENCES public.notifications_outbox(id)  
);  
CREATE TABLE public.notification_events (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  occurred_at timestamp with time zone NOT NULL DEFAULT now(),  
  source text NOT NULL CHECK (source = ANY (ARRAY['cue_drop'::text, 'receipt_due'::text, 'real_life_check_due'::text, 'resistance_flag'::text, 'escalation'::text, 'system'::text, 'manual'::text])),  
  source_ref jsonb NOT NULL DEFAULT '{}'::jsonb,  
  individual_id uuid,  
  category USER-DEFINED,  
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,  
  CONSTRAINT notification_events_pkey PRIMARY KEY (id),  
  CONSTRAINT notification_events_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.notification_preferences (  
  individual_id uuid NOT NULL,  
  org_id uuid NOT NULL,  
  quiet_hours_enabled boolean NOT NULL DEFAULT false,  
  quiet_hours_start_local time with time zone,  
  quiet_hours_end_local time with time zone,  
  timezone text NOT NULL DEFAULT 'UTC'::text,  
  digest_mode text NOT NULL DEFAULT 'off'::text CHECK (digest_mode = ANY (ARRAY['off'::text, 'daily'::text, 'weekly'::text])),  
  max_per_day integer NOT NULL DEFAULT 6 CHECK (max_per_day >= 0 AND max_per_day <= 1000),  
  max_per_hour integer NOT NULL DEFAULT 2 CHECK (max_per_hour >= 0 AND max_per_hour <= 1000),  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT notification_preferences_pkey PRIMARY KEY (individual_id, org_id),  
  CONSTRAINT notification_preferences_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT notification_preferences_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id)  
);  
CREATE TABLE public.notification_provider_events (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  provider text NOT NULL,  
  provider_message_id text,  
  event_type text NOT NULL,  
  occurred_at timestamp with time zone DEFAULT now(),  
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,  
  CONSTRAINT notification_provider_events_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.notification_receipts (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  notification_id uuid NOT NULL,  
  provider text,  
  provider_message_id text,  
  delivered_at timestamp with time zone,  
  meta jsonb DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT notification_receipts_pkey PRIMARY KEY (id),  
  CONSTRAINT notification_receipts_notification_fk FOREIGN KEY (notification_id) REFERENCES public.notifications(id)  
);  
CREATE TABLE public.notification_templates (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  template_key text NOT NULL UNIQUE,  
  category USER-DEFINED,  
  channel USER-DEFINED NOT NULL DEFAULT 'in_app'::comm_channel_enum,  
  title_template text,  
  body_template text NOT NULL,  
  deep_link_template text,  
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,  
  version integer NOT NULL DEFAULT 1,  
  is_active boolean NOT NULL DEFAULT true,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  category_key text,  
  CONSTRAINT notification_templates_pkey PRIMARY KEY (id),  
  CONSTRAINT notification_templates_category_key_fkey FOREIGN KEY (category_key) REFERENCES public.notification_category(key)  
);  
CREATE TABLE public.notifications (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  channel USER-DEFINED NOT NULL DEFAULT 'in_app'::comm_channel_enum,  
  template_key text,  
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,  
  status USER-DEFINED NOT NULL DEFAULT 'queued'::comm_status_enum,  
  error text,  
  scheduled_for timestamp with time zone,  
  sent_at timestamp with time zone,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  individual_id uuid,  
  attempts integer NOT NULL DEFAULT 0,  
  next_attempt_at timestamp with time zone,  
  CONSTRAINT notifications_pkey PRIMARY KEY (id),  
  CONSTRAINT notifications_user_fk FOREIGN KEY (user_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.notifications_outbox (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  audience text NOT NULL DEFAULT 'user'::text CHECK (audience = ANY (ARRAY['user'::text, 'clinician'::text, 'organization'::text, 'support'::text, 'system'::text])),  
  recipient_profile_id uuid,  
  organization_id uuid,  
  professional_id uuid,  
  channel USER-DEFINED NOT NULL,  
  category text NOT NULL DEFAULT 'system'::text,  
  priority text NOT NULL DEFAULT 'normal'::text CHECK (priority = ANY (ARRAY['low'::text, 'normal'::text, 'high'::text, 'urgent'::text])),  
  template_id text,  
  rendered_title text,  
  rendered_body text NOT NULL,  
  deep_link text,  
  trigger_source text NOT NULL DEFAULT 'system'::text CHECK (trigger_source = ANY (ARRAY['risk_window'::text, 'safety_decision'::text, 'incident'::text, 'social_action'::text, 'deployment'::text, 'manual'::text, 'system'::text])),  
  trigger_ref jsonb DEFAULT '{}'::jsonb,  
  rationale jsonb DEFAULT '{}'::jsonb,  
  status USER-DEFINED NOT NULL DEFAULT 'queued'::comm_status_enum,  
  send_after timestamp with time zone DEFAULT now(),  
  expires_at timestamp with time zone,  
  suppress_reason text,  
  purpose text DEFAULT 'personalization'::text CHECK (purpose = ANY (ARRAY['care'::text, 'personalization'::text, 'safety'::text, 'research'::text, 'billing'::text, 'support'::text])),  
  data_tier text DEFAULT 'tier1'::text CHECK (data_tier = ANY (ARRAY['tier0'::text, 'tier1'::text, 'tier2'::text, 'tier3'::text, 'tier4'::text])),  
  meta jsonb DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  dedupe_key text,  
  fingerprint text,  
  CONSTRAINT notifications_outbox_pkey PRIMARY KEY (id),  
  CONSTRAINT notifications_outbox_professional_id_fkey FOREIGN KEY (professional_id) REFERENCES public.profiles(id),  
  CONSTRAINT notifications_outbox_recipient_profile_id_fkey FOREIGN KEY (recipient_profile_id) REFERENCES public.profiles(id),  
  CONSTRAINT notifications_outbox_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)  
);  
CREATE TABLE public.org_members (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  organization_id uuid NOT NULL,  
  user_id uuid NOT NULL,  
  role text NOT NULL CHECK (role = ANY (ARRAY['owner'::text, 'admin'::text, 'staff'::text, 'member'::text])),  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT org_members_pkey PRIMARY KEY (id),  
  CONSTRAINT org_members_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),  
  CONSTRAINT org_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.organization_admins (  
  organization_id uuid NOT NULL,  
  user_id uuid NOT NULL,  
  role text NOT NULL CHECK (role = ANY (ARRAY['owner'::text, 'admin'::text, 'editor'::text])),  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT organization_admins_pkey PRIMARY KEY (organization_id, user_id),  
  CONSTRAINT organization_admins_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),  
  CONSTRAINT organization_admins_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.organization_members (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  organization_id uuid NOT NULL,  
  profile_id uuid NOT NULL,  
  member_roles ARRAY NOT NULL DEFAULT '{}'::text[],  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT organization_members_pkey PRIMARY KEY (id),  
  CONSTRAINT organization_members_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),  
  CONSTRAINT organization_members_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.organization_tags (  
  organization_id uuid NOT NULL,  
  tag_id uuid NOT NULL,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT organization_tags_pkey PRIMARY KEY (organization_id, tag_id),  
  CONSTRAINT organization_tags_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),  
  CONSTRAINT organization_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id)  
);  
CREATE TABLE public.organizations (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  name text NOT NULL,  
  created_at timestamp with time zone DEFAULT now(),  
  organization_type text DEFAULT 'platform'::text,  
  CONSTRAINT organizations_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.people (  
  id text NOT NULL,  
  display_name text NOT NULL,  
  kind ARRAY NOT NULL DEFAULT '{}'::text[],  
  tags ARRAY NOT NULL DEFAULT '{}'::text[],  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  search_tsv tsvector,  
  CONSTRAINT people_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.people_aliases (  
  person_id text NOT NULL,  
  alias text NOT NULL,  
  CONSTRAINT people_aliases_pkey PRIMARY KEY (person_id, alias),  
  CONSTRAINT people_aliases_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.people(id)  
);  
CREATE TABLE public.people_audit (  
  audit_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,  
  person_id text NOT NULL,  
  action text NOT NULL CHECK (action = ANY (ARRAY['insert'::text, 'update'::text, 'alias_add'::text, 'alias_remove'::text])),  
  details jsonb NOT NULL,  
  actor uuid,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT people_audit_pkey PRIMARY KEY (audit_id)  
);  
CREATE TABLE public.people_source_map (  
  person_id text NOT NULL,  
  source_type text NOT NULL CHECK (source_type = ANY (ARRAY['guru'::text, 'thought_leader'::text])),  
  source_id text NOT NULL,  
  CONSTRAINT people_source_map_pkey PRIMARY KEY (source_type, source_id),  
  CONSTRAINT people_source_map_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.people(id)  
);  
CREATE TABLE public.pillar_concepts (  
  pillar_id text NOT NULL,  
  concept_id text NOT NULL,  
  CONSTRAINT pillar_concepts_pkey PRIMARY KEY (pillar_id, concept_id),  
  CONSTRAINT pillar_concepts_pillar_id_fkey FOREIGN KEY (pillar_id) REFERENCES public.pillars(id),  
  CONSTRAINT pillar_concepts_concept_id_fkey FOREIGN KEY (concept_id) REFERENCES public.concepts(id)  
);  
CREATE TABLE public.pillar_leaders (  
  pillar_id text NOT NULL,  
  leader_id text NOT NULL,  
  role text DEFAULT 'influencer'::text,  
  stance text DEFAULT 'supportive'::text,  
  notes_md text,  
  CONSTRAINT pillar_leaders_pkey PRIMARY KEY (pillar_id, leader_id),  
  CONSTRAINT pillar_leaders_pillar_id_fkey FOREIGN KEY (pillar_id) REFERENCES public.pillars(id),  
  CONSTRAINT pillar_leaders_leader_id_fkey FOREIGN KEY (leader_id) REFERENCES public.thought_leaders(id)  
);  
CREATE TABLE public.pillar_practices (  
  id text NOT NULL,  
  pillar_id text NOT NULL,  
  name text NOT NULL,  
  summary_md text,  
  steps_md text,  
  contraindications ARRAY DEFAULT '{}'::text[],  
  fits_state ARRAY DEFAULT '{}'::text[],  
  level text DEFAULT 'patient'::text,  
  status text DEFAULT 'pilot'::text,  
  CONSTRAINT pillar_practices_pkey PRIMARY KEY (id),  
  CONSTRAINT pillar_practices_pillar_id_fkey FOREIGN KEY (pillar_id) REFERENCES public.pillars(id)  
);  
CREATE TABLE public.pillar_reference (  
  pillar_id text NOT NULL,  
  summary_md text,  
  mechanisms jsonb DEFAULT '[]'::jsonb,  
  red_flags jsonb DEFAULT '[]'::jsonb,  
  clinical_guidance_md text,  
  practice_index jsonb DEFAULT '{}'::jsonb,  
  citations jsonb DEFAULT '{}'::jsonb,  
  updated_at timestamp with time zone DEFAULT now(),  
  narratives_md text,  
  core_measures jsonb,  
  reading_list jsonb,  
  faq jsonb,  
  design_notes_md text,  
  CONSTRAINT pillar_reference_pkey PRIMARY KEY (pillar_id),  
  CONSTRAINT pillar_reference_pillar_id_fkey FOREIGN KEY (pillar_id) REFERENCES public.pillars(id)  
);  
CREATE TABLE public.pillar_themes (  
  pillar_id text NOT NULL,  
  theme_id text NOT NULL,  
  CONSTRAINT pillar_themes_pkey PRIMARY KEY (pillar_id, theme_id),  
  CONSTRAINT pillar_themes_pillar_id_fkey FOREIGN KEY (pillar_id) REFERENCES public.pillars(id),  
  CONSTRAINT pillar_themes_theme_id_fkey FOREIGN KEY (theme_id) REFERENCES public.themes(id)  
);  
CREATE TABLE public.pillars (  
  id text NOT NULL,  
  name text NOT NULL,  
  description text,  
  created_at timestamp with time zone DEFAULT now(),  
  tagline text,  
  clinical_aim text,  
  color_primary text,  
  color_secondary text,  
  icon_name text,  
  sort_order integer,  
  short_code text,  
  slug text,  
  CONSTRAINT pillars_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.policy_approvals (  
  policy_id text NOT NULL,  
  version text NOT NULL,  
  approver_id uuid NOT NULL,  
  approver_role text,  
  verdict text NOT NULL CHECK (verdict = ANY (ARRAY['approve'::text, 'reject'::text])),  
  notes_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT policy_approvals_pkey PRIMARY KEY (policy_id, version, approver_id),  
  CONSTRAINT policy_approvals_approver_id_fkey FOREIGN KEY (approver_id) REFERENCES public.profiles(id),  
  CONSTRAINT policy_approvals_policy_id_version_fkey FOREIGN KEY (policy_id) REFERENCES public.policy_versions(policy_id),  
  CONSTRAINT policy_approvals_policy_id_version_fkey FOREIGN KEY (version) REFERENCES public.policy_versions(policy_id),  
  CONSTRAINT policy_approvals_policy_id_version_fkey FOREIGN KEY (policy_id) REFERENCES public.policy_versions(version),  
  CONSTRAINT policy_approvals_policy_id_version_fkey FOREIGN KEY (version) REFERENCES public.policy_versions(version)  
);  
CREATE TABLE public.policy_deployments (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  policy_id text NOT NULL,  
  version text NOT NULL,  
  scope text NOT NULL CHECK (scope = ANY (ARRAY['global'::text, 'organization'::text, 'cohort'::text, 'individual'::text])),  
  scope_id text,  
  starts_at timestamp with time zone DEFAULT now(),  
  ends_at timestamp with time zone,  
  is_active boolean DEFAULT true,  
  created_by uuid,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT policy_deployments_pkey PRIMARY KEY (id),  
  CONSTRAINT policy_deployments_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.profiles(id),  
  CONSTRAINT policy_deployments_policy_id_version_fkey FOREIGN KEY (policy_id) REFERENCES public.policy_versions(policy_id),  
  CONSTRAINT policy_deployments_policy_id_version_fkey FOREIGN KEY (version) REFERENCES public.policy_versions(policy_id),  
  CONSTRAINT policy_deployments_policy_id_version_fkey FOREIGN KEY (policy_id) REFERENCES public.policy_versions(version),  
  CONSTRAINT policy_deployments_policy_id_version_fkey FOREIGN KEY (version) REFERENCES public.policy_versions(version)  
);  
CREATE TABLE public.policy_evaluations (  
  id bigint NOT NULL DEFAULT nextval('policy_evaluations_id_seq'::regclass),  
  decision_trace_id uuid NOT NULL,  
  policy_id uuid NOT NULL,  
  evaluated_at timestamp with time zone DEFAULT now(),  
  outcome text NOT NULL CHECK (outcome = ANY (ARRAY['allow'::text, 'allow_with_modification'::text, 'hold'::text, 'block_and_route'::text, 'require_support'::text])),  
  rationale jsonb,  
  CONSTRAINT policy_evaluations_pkey PRIMARY KEY (id),  
  CONSTRAINT policy_evaluations_decision_trace_id_fkey FOREIGN KEY (decision_trace_id) REFERENCES public.decision_traces(id),  
  CONSTRAINT policy_evaluations_policy_id_fkey FOREIGN KEY (policy_id) REFERENCES public.safety_policies(id)  
);  
CREATE TABLE public.policy_registry (  
  id text NOT NULL,  
  name text NOT NULL,  
  status text NOT NULL DEFAULT 'active'::text CHECK (status = ANY (ARRAY['active'::text, 'paused'::text, 'retired'::text])),  
  ruleset jsonb NOT NULL DEFAULT '{}'::jsonb,  
  bandit_config jsonb NOT NULL DEFAULT '{}'::jsonb,  
  reward_contract jsonb NOT NULL DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT policy_registry_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.policy_runs (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  decision_id uuid,  
  policy_id text NOT NULL,  
  status USER-DEFINED NOT NULL,  
  reason text,  
  details jsonb NOT NULL DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT policy_runs_pkey PRIMARY KEY (id),  
  CONSTRAINT policy_runs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.policy_versions (  
  policy_id text NOT NULL,  
  version text NOT NULL,  
  status text NOT NULL DEFAULT 'draft'::text CHECK (status = ANY (ARRAY['draft'::text, 'review'::text, 'approved'::text, 'active'::text, 'retired'::text])),  
  ruleset jsonb NOT NULL,  
  bandit_config jsonb NOT NULL,  
  reward_contract jsonb NOT NULL,  
  change_summary text,  
  created_by uuid,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT policy_versions_pkey PRIMARY KEY (policy_id, version),  
  CONSTRAINT policy_versions_policy_id_fkey FOREIGN KEY (policy_id) REFERENCES public.policy_registry(id),  
  CONSTRAINT policy_versions_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.practice_blocks (  
  practice_id text NOT NULL,  
  block_id text NOT NULL,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT practice_blocks_pkey PRIMARY KEY (practice_id, block_id),  
  CONSTRAINT practice_blocks_practice_id_fkey FOREIGN KEY (practice_id) REFERENCES public.pillar_practices(id),  
  CONSTRAINT practice_blocks_block_id_fkey FOREIGN KEY (block_id) REFERENCES public.blocks(id)  
);  
CREATE TABLE public.practice_logs (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  practice_id text NOT NULL,  
  started_at timestamp with time zone NOT NULL DEFAULT now(),  
  completed_at timestamp with time zone,  
  status text NOT NULL DEFAULT 'started'::text CHECK (status = ANY (ARRAY['started'::text, 'completed'::text, 'skipped'::text, 'abandoned'::text])),  
  pre_state_checkin_ts timestamp with time zone,  
  post_state_checkin_ts timestamp with time zone,  
  duration_seconds integer DEFAULT   
CASE  
    WHEN (completed_at IS NULL) THEN NULL::integer  
    ELSE GREATEST(0, (EXTRACT(epoch FROM (completed_at - started_at)))::integer)  
END,  
  context_tags ARRAY DEFAULT '{}'::text[],  
  notes_md text,  
  helpful boolean,  
  rating integer CHECK (rating >= 1 AND rating <= 5),  
  meta jsonb DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  individual_id uuid NOT NULL,  
  profile_id uuid,  
  CONSTRAINT practice_logs_pkey PRIMARY KEY (id),  
  CONSTRAINT practice_logs_practice_id_fkey FOREIGN KEY (practice_id) REFERENCES public.pillar_practices(id),  
  CONSTRAINT practice_logs_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.practice_mindblocks (  
  practice_id text NOT NULL,  
  mindblock_id uuid NOT NULL,  
  relevance_strength numeric,  
  CONSTRAINT practice_mindblocks_pkey PRIMARY KEY (practice_id, mindblock_id),  
  CONSTRAINT practice_mindblocks_practice_id_fkey FOREIGN KEY (practice_id) REFERENCES public.pillar_practices(id),  
  CONSTRAINT practice_mindblocks_mindblock_id_fkey FOREIGN KEY (mindblock_id) REFERENCES public.mindblocks(id)  
);  
CREATE TABLE public.practices (  
  id text NOT NULL,  
  name text NOT NULL,  
  subtitle text,  
  description text,  
  pillar_id text,  
  pillar_name text,  
  concept_name text,  
  theme_name text,  
  duration_minutes integer,  
  difficulty text,  
  image text,  
  purpose text,  
  steps jsonb,  
  the_science text,  
  when_to_use ARRAY,  
  related_content jsonb,  
  blocks ARRAY,  
  keywords jsonb,  
  status text DEFAULT 'review'::text,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT practices_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.prediction_errors (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  organization_id uuid,  
  captured_at timestamp with time zone NOT NULL DEFAULT now(),  
  context_tags ARRAY NOT NULL DEFAULT '{}'::text[],  
  hot_context text,  
  arousal_state jsonb NOT NULL DEFAULT '{}'::jsonb,  
  prediction_text text NOT NULL,  
  outcome_text text NOT NULL,  
  surprise_rating integer CHECK (surprise_rating >= 0 AND surprise_rating <= 10),  
  meaning_update_text text,  
  linked_schema_id text,  
  linked_mindblock_id uuid,  
  proof_kind text CHECK (proof_kind = ANY (ARRAY['micro_proof'::text, 'receipt'::text, 'transfer_test'::text, 'other'::text])),  
  proof_id text,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  profile_id uuid,  
  CONSTRAINT prediction_errors_pkey PRIMARY KEY (id),  
  CONSTRAINT prediction_errors_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),  
  CONSTRAINT prediction_errors_linked_schema_id_fkey FOREIGN KEY (linked_schema_id) REFERENCES public.schema_catalog(id),  
  CONSTRAINT prediction_errors_linked_mindblock_id_fkey FOREIGN KEY (linked_mindblock_id) REFERENCES public.mindblocks(id),  
  CONSTRAINT prediction_errors_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.primitive_events (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  primitive_key text NOT NULL,  
  occurred_at timestamp with time zone NOT NULL DEFAULT now(),  
  source_kind text NOT NULL CHECK (source_kind = ANY (ARRAY['journey'::text, 'navicue'::text, 'toolkit'::text, 'talk'::text, 'voice'::text, 'state'::text, 'feed'::text, 'practice'::text])),  
  source_ref text,  
  content_ref uuid,  
  decision_trace_id uuid,  
  event_spine_id bigint,  
  state_snapshot jsonb DEFAULT '{}'::jsonb,  
  outcome_ref jsonb DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT primitive_events_pkey PRIMARY KEY (id),  
  CONSTRAINT primitive_events_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),  
  CONSTRAINT primitive_events_primitive_key_fkey FOREIGN KEY (primitive_key) REFERENCES public.primitives_catalog(primitive_key),  
  CONSTRAINT primitive_events_content_ref_fkey FOREIGN KEY (content_ref) REFERENCES public.content_registry(id),  
  CONSTRAINT primitive_events_decision_trace_id_fkey FOREIGN KEY (decision_trace_id) REFERENCES public.decision_traces(id),  
  CONSTRAINT primitive_events_event_spine_id_fkey FOREIGN KEY (event_spine_id) REFERENCES public.event_spine(id)  
);  
CREATE TABLE public.primitives_catalog (  
  primitive_key text NOT NULL,  
  name text NOT NULL,  
  description_md text,  
  contraindications_md text,  
  required_inputs jsonb NOT NULL DEFAULT '{}'::jsonb,  
  expected_outputs jsonb NOT NULL DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  safe_states ARRAY DEFAULT '{}'::text[],  
  typical_receipts ARRAY DEFAULT '{}'::text[],  
  typical_checks ARRAY DEFAULT '{}'::text[],  
  CONSTRAINT primitives_catalog_pkey PRIMARY KEY (primitive_key)  
);  
CREATE TABLE public.professional_admins (  
  professional_id uuid NOT NULL,  
  user_id uuid NOT NULL,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT professional_admins_pkey PRIMARY KEY (professional_id, user_id),  
  CONSTRAINT professional_admins_professional_id_fkey FOREIGN KEY (professional_id) REFERENCES public.profiles(id),  
  CONSTRAINT professional_admins_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.professional_soundbites (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  professional_id uuid NOT NULL,  
  individual_id uuid,  
  organization_id uuid,  
  mode USER-DEFINED NOT NULL DEFAULT 'voice'::diary_mode,  
  transcript text,  
  media_url text,  
  duration_seconds integer,  
  ai_summary jsonb NOT NULL DEFAULT '{}'::jsonb,  
  captured_at timestamp with time zone NOT NULL DEFAULT now(),  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  privacy_level USER-DEFINED NOT NULL DEFAULT 'clinical_visible'::privacy_level_enum,  
  intent USER-DEFINED,  
  context_tags ARRAY NOT NULL DEFAULT '{}'::text[],  
  CONSTRAINT professional_soundbites_pkey PRIMARY KEY (id),  
  CONSTRAINT professional_soundbites_professional_id_fkey FOREIGN KEY (professional_id) REFERENCES public.profiles(id),  
  CONSTRAINT professional_soundbites_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT professional_soundbites_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)  
);  
CREATE TABLE public.professionals (  
  profile_id uuid NOT NULL,  
  credentials text,  
  specialties ARRAY,  
  billing jsonb DEFAULT '{}'::jsonb,  
  availability jsonb DEFAULT '{}'::jsonb,  
  stripe_connected boolean DEFAULT false,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT professionals_pkey PRIMARY KEY (profile_id),  
  CONSTRAINT professionals_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.profile_roles (  
  profile_id uuid NOT NULL,  
  roles ARRAY NOT NULL DEFAULT '{}'::text[],  
  CONSTRAINT profile_roles_pkey PRIMARY KEY (profile_id),  
  CONSTRAINT profile_roles_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.profile_tags (  
  profile_id uuid NOT NULL,  
  tag_id uuid NOT NULL,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT profile_tags_pkey PRIMARY KEY (profile_id, tag_id),  
  CONSTRAINT profile_tags_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id),  
  CONSTRAINT profile_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id)  
);  
CREATE TABLE public.profiles (  
  id uuid NOT NULL,  
  role USER-DEFINED NOT NULL DEFAULT 'patient'::user_role,  
  created_at timestamp with time zone DEFAULT now(),  
  professional_type text,  
  license_number text,  
  specializations ARRAY,  
  years_experience integer CHECK (years_experience IS NULL OR years_experience >= 0 AND years_experience <= 80),  
  accepts_new_clients boolean,  
  organization_id uuid,  
  full_name text,  
  email text,  
  phone text,  
  avatar_url text,  
  CONSTRAINT profiles_pkey PRIMARY KEY (id),  
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id),  
  CONSTRAINT profiles_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)  
);  
CREATE TABLE public.prompt_templates (  
  id text NOT NULL,  
  form USER-DEFINED NOT NULL,  
  stance USER-DEFINED NOT NULL DEFAULT 'inquiry'::epistemic_stance,  
  title text NOT NULL,  
  template_md text NOT NULL,  
  cognitive_load integer DEFAULT 1 CHECK (cognitive_load >= 0 AND cognitive_load <= 5),  
  arousal_fit text DEFAULT 'green'::text CHECK (arousal_fit = ANY (ARRAY['green'::text, 'amber'::text, 'red'::text, 'downshift_first'::text])),  
  time_horizon text DEFAULT 'immediate'::text CHECK (time_horizon = ANY (ARRAY['immediate'::text, 'session'::text, 'same_day'::text, 'multi_day'::text, 'weeks'::text])),  
  tags jsonb DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT prompt_templates_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.prompt_voice_fit (  
  prompt_id text NOT NULL,  
  voice_id text NOT NULL,  
  weight numeric DEFAULT 1,  
  notes_md text,  
  CONSTRAINT prompt_voice_fit_pkey PRIMARY KEY (prompt_id, voice_id),  
  CONSTRAINT prompt_voice_fit_prompt_id_fkey FOREIGN KEY (prompt_id) REFERENCES public.prompt_templates(id),  
  CONSTRAINT prompt_voice_fit_voice_id_fkey FOREIGN KEY (voice_id) REFERENCES public.voice_archetypes(id)  
);  
CREATE TABLE public.proof_artifacts (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  subject_type text NOT NULL,  
  subject_id uuid NOT NULL,  
  artifact_type text NOT NULL,  
  uri text,  
  content jsonb,  
  chain_id uuid,  
  created_by uuid,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT proof_artifacts_pkey PRIMARY KEY (id),  
  CONSTRAINT fk_proof_artifacts_chain FOREIGN KEY (chain_id) REFERENCES public.proof_chains(id),  
  CONSTRAINT proof_artifacts_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id)  
);  
CREATE TABLE public.proof_artifacts_v26 (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  artifact_type text NOT NULL CHECK (artifact_type = ANY (ARRAY['receipt'::text, 'practice'::text, 'transfer_test'::text, 'prediction_error'::text, 'micro_proof'::text, 'followup'::text, 'state_shift'::text, 'witness_confirm'::text, 'context_transfer'::text, 'rescue'::text, 'adverse'::text])),  
  source_table text NOT NULL,  
  source_id text NOT NULL,  
  context_key text,  
  schema_id text,  
  mindblock_id uuid,  
  family_id uuid,  
  mechanism_key text,  
  kbe_target text CHECK (kbe_target = ANY (ARRAY['knowing'::text, 'believing'::text, 'embodying'::text])),  
  quality numeric DEFAULT 0.6 CHECK (quality >= 0::numeric AND quality <= 1::numeric),  
  weight numeric DEFAULT 1.0 CHECK (weight >= 0::numeric AND weight <= 5::numeric),  
  confidence numeric DEFAULT 0.7 CHECK (confidence >= 0::numeric AND confidence <= 1::numeric),  
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,  
  related_decision_id uuid,  
  related_routing_id uuid,  
  decision_trace_id uuid,  
  content_ref uuid,  
  CONSTRAINT proof_artifacts_v26_pkey PRIMARY KEY (id),  
  CONSTRAINT proof_artifacts_v26_decision_trace_id_fkey FOREIGN KEY (decision_trace_id) REFERENCES public.decision_traces(id),  
  CONSTRAINT proof_artifacts_v26_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.proof_chain_links_v26 (  
  chain_id uuid NOT NULL,  
  proof_artifact_id uuid NOT NULL,  
  step_key text NOT NULL CHECK (step_key = ANY (ARRAY['claim'::text, 'prediction'::text, 'rite'::text, 'outcome'::text, 'meaning_update'::text, 'witness'::text, 'transfer'::text, 'durability'::text])),  
  step_no smallint NOT NULL CHECK (step_no >= 1 AND step_no <= 50),  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT proof_chain_links_v26_pkey PRIMARY KEY (chain_id, proof_artifact_id),  
  CONSTRAINT proof_chain_links_v26_chain_id_fkey FOREIGN KEY (chain_id) REFERENCES public.proof_chains_v26(id),  
  CONSTRAINT proof_chain_links_v26_proof_artifact_id_fkey FOREIGN KEY (proof_artifact_id) REFERENCES public.proof_artifacts_v26(id)  
);  
CREATE TABLE public.proof_chains (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  root_artifact_id uuid,  
  status text NOT NULL DEFAULT 'open'::text,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT proof_chains_pkey PRIMARY KEY (id),  
  CONSTRAINT fk_root_artifact FOREIGN KEY (root_artifact_id) REFERENCES public.proof_artifacts(id)  
);  
CREATE TABLE public.proof_chains_v26 (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  title text,  
  schema_id text,  
  mindblock_id uuid,  
  family_id uuid,  
  context_key text,  
  started_at timestamp with time zone DEFAULT now(),  
  completed_at timestamp with time zone,  
  status text DEFAULT 'active'::text CHECK (status = ANY (ARRAY['active'::text, 'completed'::text, 'abandoned'::text])),  
  meta jsonb DEFAULT '{}'::jsonb,  
  CONSTRAINT proof_chains_v26_pkey PRIMARY KEY (id),  
  CONSTRAINT proof_chains_v26_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.proof_scores (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  artifact_id uuid NOT NULL,  
  metric text NOT NULL,  
  value numeric NOT NULL,  
  details jsonb,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT proof_scores_pkey PRIMARY KEY (id),  
  CONSTRAINT proof_scores_artifact_id_fkey FOREIGN KEY (artifact_id) REFERENCES public.proof_artifacts(id)  
);  
CREATE TABLE public.proof_scores_by_scope_v26 (  
  individual_id uuid NOT NULL,  
  computed_at timestamp with time zone NOT NULL DEFAULT now(),  
  window_days integer NOT NULL DEFAULT 14 CHECK (window_days = ANY (ARRAY[7, 14, 30, 90])),  
  scope_type text NOT NULL CHECK (scope_type = ANY (ARRAY['global'::text, 'schema'::text, 'mindblock'::text, 'family'::text, 'context'::text, 'protocol'::text, 'journey'::text])),  
  scope_id text NOT NULL,  
  proof numeric NOT NULL CHECK (proof >= 0::numeric AND proof <= 1::numeric),  
  receipt numeric NOT NULL CHECK (receipt >= 0::numeric AND receipt <= 1::numeric),  
  transfer numeric NOT NULL CHECK (transfer >= 0::numeric AND transfer <= 1::numeric),  
  stability numeric NOT NULL CHECK (stability >= 0::numeric AND stability <= 1::numeric),  
  confidence numeric NOT NULL DEFAULT 0.2 CHECK (confidence >= 0::numeric AND confidence <= 1::numeric),  
  drivers jsonb DEFAULT '{}'::jsonb,  
  evidence jsonb DEFAULT '{}'::jsonb,  
  CONSTRAINT proof_scores_by_scope_v26_pkey PRIMARY KEY (individual_id, computed_at, window_days, scope_type, scope_id),  
  CONSTRAINT proof_scores_by_scope_v26_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.proof_scores_v26 (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  computed_at timestamp with time zone NOT NULL DEFAULT now(),  
  window_days integer NOT NULL DEFAULT 14 CHECK (window_days = ANY (ARRAY[7, 14, 30, 90])),  
  overall numeric NOT NULL CHECK (overall >= 0::numeric AND overall <= 1::numeric),  
  receipt_score numeric NOT NULL CHECK (receipt_score >= 0::numeric AND receipt_score <= 1::numeric),  
  transfer_score numeric NOT NULL CHECK (transfer_score >= 0::numeric AND transfer_score <= 1::numeric),  
  stability_score numeric NOT NULL CHECK (stability_score >= 0::numeric AND stability_score <= 1::numeric),  
  confidence numeric NOT NULL DEFAULT 0.2 CHECK (confidence >= 0::numeric AND confidence <= 1::numeric),  
  drivers jsonb DEFAULT '{}'::jsonb,  
  cautions jsonb DEFAULT '{}'::jsonb,  
  evidence jsonb DEFAULT '{}'::jsonb,  
  inputs_hash text,  
  CONSTRAINT proof_scores_v26_pkey PRIMARY KEY (id),  
  CONSTRAINT proof_scores_v26_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.proofs (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  organization_id uuid,  
  content_ref uuid,  
  source USER-DEFINED NOT NULL DEFAULT 'system'::proof_source_enum,  
  kind USER-DEFINED NOT NULL DEFAULT 'other'::proof_kind_enum,  
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,  
  score double precision,  
  tags ARRAY DEFAULT '{}'::text[],  
  occurred_at timestamp with time zone DEFAULT now(),  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT proofs_pkey PRIMARY KEY (id),  
  CONSTRAINT proofs_profile_fk FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT proofs_org_fk FOREIGN KEY (organization_id) REFERENCES public.organizations(id),  
  CONSTRAINT proofs_content_fk FOREIGN KEY (content_ref) REFERENCES public.content_registry(id)  
);  
CREATE TABLE public.queue_maintenance_runs (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  started_at timestamp with time zone DEFAULT now(),  
  finished_at timestamp with time zone,  
  processed integer DEFAULT 0,  
  requeued integer DEFAULT 0,  
  expired integer DEFAULT 0,  
  error text,  
  CONSTRAINT queue_maintenance_runs_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.queue_members (  
  user_id uuid NOT NULL,  
  queue_id uuid NOT NULL,  
  inserted_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT queue_members_pkey PRIMARY KEY (user_id, queue_id)  
);  
CREATE TABLE public.ranker_weights (  
  key text NOT NULL,  
  value numeric NOT NULL,  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT ranker_weights_pkey PRIMARY KEY (key)  
);  
CREATE TABLE public.real_life_check_types (  
  key text NOT NULL,  
  label text NOT NULL,  
  description_md text,  
  CONSTRAINT real_life_check_types_pkey PRIMARY KEY (key)  
);  
CREATE TABLE public.receipt_types (  
  key text NOT NULL,  
  label text NOT NULL,  
  description_md text,  
  CONSTRAINT receipt_types_pkey PRIMARY KEY (key)  
);  
CREATE TABLE public.receipts (  
  id bigint NOT NULL DEFAULT nextval('receipts_id_seq'::regclass),  
  block_id text,  
  type text CHECK (type = ANY (ARRAY['text'::text, 'voice'::text, 'photo'::text, 'video'::text])),  
  url text,  
  text_content text,  
  ts timestamp with time zone DEFAULT now(),  
  deployment_id uuid,  
  exposure_id uuid,  
  queue_id uuid,  
  deployment_kind text,  
  captured_at timestamp with time zone NOT NULL DEFAULT now(),  
  privacy_level USER-DEFINED NOT NULL DEFAULT 'private'::privacy_level_enum,  
  intent USER-DEFINED,  
  capture_quality USER-DEFINED DEFAULT 'clean'::capture_quality_enum,  
  context_tags ARRAY NOT NULL DEFAULT '{}'::text[],  
  hot_context text,  
  energy smallint CHECK (energy >= 0 AND energy <= 10),  
  clarity smallint CHECK (clarity >= 0 AND clarity <= 10),  
  connection smallint CHECK (connection >= 0 AND connection <= 10),  
  profile_id uuid,  
  CONSTRAINT receipts_pkey PRIMARY KEY (id),  
  CONSTRAINT receipts_block_id_fkey FOREIGN KEY (block_id) REFERENCES public.blocks(id),  
  CONSTRAINT receipts_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.reg_tile_params (  
  tile_key text NOT NULL,  
  param_key text NOT NULL,  
  param_type text NOT NULL,  
  required boolean NOT NULL DEFAULT false,  
  default_value jsonb,  
  CONSTRAINT reg_tile_params_pkey PRIMARY KEY (tile_key, param_key),  
  CONSTRAINT reg_tile_params_tile_key_fkey FOREIGN KEY (tile_key) REFERENCES public.reg_tiles(tile_key)  
);  
CREATE TABLE public.reg_tiles (  
  tile_key text NOT NULL,  
  room text NOT NULL CHECK (room = ANY (ARRAY['STATE'::text, 'CONTEXT'::text, 'MAP'::text, 'DELIVERY'::text, 'SAFETY'::text])),  
  title text NOT NULL,  
  description_md text,  
  primary_view text NOT NULL,  
  default_range_days integer NOT NULL DEFAULT 30,  
  refresh_mode text NOT NULL DEFAULT 'realtime'::text CHECK (refresh_mode = ANY (ARRAY['realtime'::text, 'hourly'::text, 'daily'::text])),  
  pillar_scoped boolean NOT NULL DEFAULT false,  
  enabled boolean NOT NULL DEFAULT true,  
  order_index integer NOT NULL DEFAULT 0,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT reg_tiles_pkey PRIMARY KEY (tile_key)  
);  
CREATE TABLE public.relationship_types (  
  type text NOT NULL,  
  description text,  
  CONSTRAINT relationship_types_pkey PRIMARY KEY (type)  
);  
CREATE TABLE public.relationships (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  source_type text NOT NULL,  
  source_id text NOT NULL,  
  target_type text NOT NULL,  
  target_id text NOT NULL,  
  relation_type text NOT NULL,  
  metadata jsonb DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT relationships_pkey PRIMARY KEY (id),  
  CONSTRAINT relationships_relation_type_fk FOREIGN KEY (relation_type) REFERENCES public.relationship_types(type)  
);  
CREATE TABLE public.rescue_events (  
  id bigint NOT NULL DEFAULT nextval('rescue_events_id_seq'::regclass),  
  user_id uuid NOT NULL,  
  kind USER-DEFINED NOT NULL,  
  triggered_by USER-DEFINED NOT NULL DEFAULT 'user'::rescue_trigger,  
  context text,  
  resolved boolean DEFAULT false,  
  notes_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  block_id text,  
  content_kind text DEFAULT 'block'::text,  
  content_id text,  
  individual_id uuid,  
  profile_id uuid,  
  CONSTRAINT rescue_events_pkey PRIMARY KEY (id),  
  CONSTRAINT rescue_events_user_fk FOREIGN KEY (user_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.rescue_routes (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  organization_id uuid,  
  route_key text NOT NULL,  
  delivery_key text NOT NULL,  
  variant_key text,  
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,  
  is_active boolean NOT NULL DEFAULT true,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT rescue_routes_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.retention_jobs (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  job_type text NOT NULL CHECK (job_type = ANY (ARRAY['ttl_purge'::text, 'user_delete'::text, 'org_offboard'::text])),  
  individual_id uuid,  
  scope jsonb DEFAULT '{}'::jsonb,  
  status text NOT NULL DEFAULT 'queued'::text CHECK (status = ANY (ARRAY['queued'::text, 'running'::text, 'complete'::text, 'failed'::text])),  
  started_at timestamp with time zone,  
  finished_at timestamp with time zone,  
  error text,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT retention_jobs_pkey PRIMARY KEY (id),  
  CONSTRAINT retention_jobs_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.reward_events (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  decision_id uuid,  
  user_id uuid NOT NULL,  
  occurred_at timestamp with time zone DEFAULT now(),  
  reward_key text NOT NULL,  
  reward_value numeric NOT NULL,  
  evidence jsonb DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT reward_events_pkey PRIMARY KEY (id),  
  CONSTRAINT reward_events_decision_id_fkey FOREIGN KEY (decision_id) REFERENCES public.bandit_decisions(id),  
  CONSTRAINT reward_events_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.risk_windows_v24 (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  created_at timestamp with time zone DEFAULT now(),  
  window_start timestamp with time zone NOT NULL,  
  window_end timestamp with time zone NOT NULL,  
  risk_score numeric NOT NULL CHECK (risk_score >= 0::numeric AND risk_score <= 1::numeric),  
  arousal_fit text CHECK (arousal_fit = ANY (ARRAY['green'::text, 'amber'::text, 'red'::text, 'downshift_first'::text])),  
  top_contexts ARRAY DEFAULT '{}'::text[],  
  likely_mindblocks ARRAY DEFAULT '{}'::uuid[],  
  likely_schema_ids ARRAY DEFAULT '{}'::text[],  
  rationale jsonb DEFAULT '{}'::jsonb,  
  CONSTRAINT risk_windows_v24_pkey PRIMARY KEY (id),  
  CONSTRAINT risk_windows_v24_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.rite_definitions (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  key text NOT NULL,  
  version integer NOT NULL DEFAULT 1,  
  name text NOT NULL,  
  description text,  
  schema jsonb,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT rite_definitions_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.rite_followups (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  run_id uuid,  
  followup text NOT NULL CHECK (followup = ANY (ARRAY['h6'::text, 'h24'::text, 'd7'::text])),  
  scheduled_at timestamp with time zone DEFAULT now(),  
  completed_at timestamp with time zone,  
  notes_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT rite_followups_pkey PRIMARY KEY (id),  
  CONSTRAINT rite_followups_run_id_fkey FOREIGN KEY (run_id) REFERENCES public.rite_runs(id)  
);  
CREATE TABLE public.rite_outcomes (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  run_id uuid,  
  outcome_type text NOT NULL CHECK (outcome_type = ANY (ARRAY['pass'::text, 'partial'::text, 'fail'::text, 'unknown'::text])),  
  friction integer CHECK (friction IS NULL OR friction >= 0 AND friction <= 10),  
  notes_md text,  
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT rite_outcomes_pkey PRIMARY KEY (id),  
  CONSTRAINT rite_outcomes_run_id_fkey FOREIGN KEY (run_id) REFERENCES public.rite_runs(id)  
);  
CREATE TABLE public.rite_receipts (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  run_id uuid NOT NULL,  
  step_key text,  
  receipt_kind text NOT NULL CHECK (receipt_kind = ANY (ARRAY['text'::text, 'voice'::text, 'photo'::text, 'video'::text, 'checkin'::text, 'other'::text])),  
  url text,  
  text_content text,  
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,  
  captured_at timestamp with time zone DEFAULT now(),  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT rite_receipts_pkey PRIMARY KEY (id),  
  CONSTRAINT rite_receipts_run_id_fkey FOREIGN KEY (run_id) REFERENCES public.rite_runs(id)  
);  
CREATE TABLE public.rite_runs (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  rite_id uuid,  
  individual_id uuid,  
  organization_id uuid,  
  status text NOT NULL DEFAULT 'started'::text CHECK (status = ANY (ARRAY['started'::text, 'completed'::text, 'skipped'::text, 'abandoned'::text])),  
  started_at timestamp with time zone DEFAULT now(),  
  completed_at timestamp with time zone,  
  context jsonb NOT NULL DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT rite_runs_pkey PRIMARY KEY (id),  
  CONSTRAINT rite_runs_rite_id_fkey FOREIGN KEY (rite_id) REFERENCES public.rites(id),  
  CONSTRAINT rite_runs_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT rite_runs_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)  
);  
CREATE TABLE public.rite_steps (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  rite_id uuid NOT NULL,  
  step_key text NOT NULL,  
  step_order integer NOT NULL,  
  input jsonb,  
  output jsonb,  
  status text NOT NULL DEFAULT 'pending'::text,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT rite_steps_pkey PRIMARY KEY (id),  
  CONSTRAINT rite_steps_rite_id_fkey FOREIGN KEY (rite_id) REFERENCES public.rites(id)  
);  
CREATE TABLE public.rites (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  rite_key text NOT NULL,  
  rite_version integer NOT NULL DEFAULT 1,  
  context jsonb,  
  status text NOT NULL DEFAULT 'pending'::text,  
  started_by uuid,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT rites_pkey PRIMARY KEY (id),  
  CONSTRAINT rites_started_by_fkey FOREIGN KEY (started_by) REFERENCES auth.users(id),  
  CONSTRAINT fk_rites_def FOREIGN KEY (rite_key) REFERENCES public.rite_definitions(key),  
  CONSTRAINT fk_rites_def FOREIGN KEY (rite_version) REFERENCES public.rite_definitions(key),  
  CONSTRAINT fk_rites_def FOREIGN KEY (rite_key) REFERENCES public.rite_definitions(version),  
  CONSTRAINT fk_rites_def FOREIGN KEY (rite_version) REFERENCES public.rite_definitions(version)  
);  
CREATE TABLE public.room_members (  
  room_id uuid NOT NULL,  
  user_id uuid NOT NULL,  
  role text DEFAULT 'member'::text CHECK (role = ANY (ARRAY['owner'::text, 'admin'::text, 'member'::text])),  
  created_at timestamp with time zone DEFAULT now(),  
  individual_id uuid,  
  CONSTRAINT room_members_pkey PRIMARY KEY (room_id, user_id),  
  CONSTRAINT room_members_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.rung_navicues (  
  ladder_id uuid NOT NULL,  
  rung_id uuid NOT NULL,  
  navicue_id text NOT NULL,  
  role text DEFAULT 'probe'::text,  
  CONSTRAINT rung_navicues_pkey PRIMARY KEY (ladder_id, rung_id, navicue_id),  
  CONSTRAINT rung_navicues_ladder_id_fkey FOREIGN KEY (ladder_id) REFERENCES public.belief_ladders(id),  
  CONSTRAINT rung_navicues_rung_id_fkey FOREIGN KEY (rung_id) REFERENCES public.ladder_rungs(id),  
  CONSTRAINT rung_navicues_navicue_id_fkey FOREIGN KEY (navicue_id) REFERENCES public.navicues(id)  
);  
CREATE TABLE public.safety_decisions (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  organization_id uuid,  
  content_ref uuid,  
  decision text NOT NULL CHECK (decision = ANY (ARRAY['allow'::text, 'deny'::text, 'modify'::text])),  
  rules_fired jsonb NOT NULL DEFAULT '[]'::jsonb,  
  inputs_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  policy_evaluation_id bigint,  
  CONSTRAINT safety_decisions_pkey PRIMARY KEY (id),  
  CONSTRAINT safety_decisions_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT safety_decisions_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),  
  CONSTRAINT safety_decisions_content_ref_fkey FOREIGN KEY (content_ref) REFERENCES public.content_registry(id),  
  CONSTRAINT safety_decisions_policy_eval_fk FOREIGN KEY (policy_evaluation_id) REFERENCES public.policy_evaluations(id)  
);  
CREATE TABLE public.safety_policies (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  name text NOT NULL,  
  version text NOT NULL,  
  description text,  
  rules jsonb NOT NULL,  
  is_active boolean DEFAULT true,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT safety_policies_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.safety_policy_registry (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  key text NOT NULL UNIQUE,  
  description text NOT NULL,  
  applies_to ARRAY NOT NULL DEFAULT '{}'::text[],  
  rule jsonb NOT NULL,  
  severity text NOT NULL CHECK (severity = ANY (ARRAY['info'::text, 'warn'::text, 'deny'::text])),  
  is_active boolean DEFAULT true,  
  updated_at timestamp with time zone DEFAULT now(),  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT safety_policy_registry_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.scene_contract_rebuild_audit (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  template_id text,  
  started_at timestamp with time zone DEFAULT now(),  
  finished_at timestamp with time zone,  
  status text,  
  details jsonb DEFAULT '{}'::jsonb,  
  CONSTRAINT scene_contract_rebuild_audit_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.scene_contracts (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  template_id text NOT NULL,  
  scene_number integer NOT NULL CHECK (scene_number >= 1 AND scene_number <= 50),  
  expects_receipt boolean NOT NULL DEFAULT false,  
  receipt_type_keys ARRAY NOT NULL DEFAULT '{}'::text[],  
  expects_checks boolean NOT NULL DEFAULT false,  
  check_type_keys ARRAY NOT NULL DEFAULT '{}'::text[],  
  response_contract jsonb NOT NULL DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT scene_contracts_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.scene_run_checks (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  scene_run_id uuid NOT NULL,  
  check_type text NOT NULL CHECK (check_type = ANY (ARRAY['constraint'::text, 'policy'::text, 'score'::text, 'guardrail'::text])),  
  check_name text NOT NULL,  
  status text NOT NULL CHECK (status = ANY (ARRAY['pass'::text, 'fail'::text, 'warn'::text, 'info'::text])),  
  details jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  real_life_check_key text NOT NULL,  
  schema_id text,  
  family_id uuid,  
  mindblock_id uuid,  
  CONSTRAINT scene_run_checks_pkey PRIMARY KEY (id),  
  CONSTRAINT scene_run_checks_scene_fk FOREIGN KEY (scene_run_id) REFERENCES public.scene_runs(id),  
  CONSTRAINT scene_run_checks_check_type_fk FOREIGN KEY (real_life_check_key) REFERENCES public.real_life_check_types(key),  
  CONSTRAINT scene_run_checks_schema_fk FOREIGN KEY (schema_id) REFERENCES public.schema_catalog(id),  
  CONSTRAINT scene_run_checks_family_fk FOREIGN KEY (family_id) REFERENCES public.mindblock_families(id),  
  CONSTRAINT scene_run_checks_mindblock_fk FOREIGN KEY (mindblock_id) REFERENCES public.mindblocks(id)  
);  
CREATE TABLE public.scene_run_receipts (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  scene_run_id uuid NOT NULL,  
  kind text NOT NULL CHECK (kind = ANY (ARRAY['input'::text, 'output'::text, 'event'::text, 'error'::text])),  
  message text,  
  data jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  receipt_type_key text NOT NULL,  
  schema_id text,  
  family_id uuid,  
  mindblock_id uuid,  
  CONSTRAINT scene_run_receipts_pkey PRIMARY KEY (id),  
  CONSTRAINT scene_run_receipts_scene_fk FOREIGN KEY (scene_run_id) REFERENCES public.scene_runs(id),  
  CONSTRAINT scene_run_receipts_receipt_type_fk FOREIGN KEY (receipt_type_key) REFERENCES public.receipt_types(key),  
  CONSTRAINT scene_run_receipts_schema_fk FOREIGN KEY (schema_id) REFERENCES public.schema_catalog(id),  
  CONSTRAINT scene_run_receipts_family_fk FOREIGN KEY (family_id) REFERENCES public.mindblock_families(id),  
  CONSTRAINT scene_run_receipts_mindblock_fk FOREIGN KEY (mindblock_id) REFERENCES public.mindblocks(id)  
);  
CREATE TABLE public.scene_runs (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  journey_run_id uuid NOT NULL,  
  template_id text NOT NULL,  
  scene_number integer NOT NULL,  
  status text NOT NULL DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'running'::text, 'skipped'::text, 'completed'::text, 'failed'::text])),  
  started_at timestamp with time zone DEFAULT now(),  
  completed_at timestamp with time zone,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT scene_runs_pkey PRIMARY KEY (id),  
  CONSTRAINT scene_runs_journey_fk FOREIGN KEY (journey_run_id) REFERENCES public.journey_runs(id)  
);  
CREATE TABLE public.schema_aliases (  
  alias_slug text NOT NULL CHECK (alias_slug = lower(btrim(alias_slug))),  
  schema_id text NOT NULL,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT schema_aliases_pkey PRIMARY KEY (alias_slug),  
  CONSTRAINT schema_aliases_schema_id_fkey FOREIGN KEY (schema_id) REFERENCES public.schema_catalog(id)  
);  
CREATE TABLE public.schema_catalog (  
  id text NOT NULL,  
  title text NOT NULL,  
  description_md text,  
  pillar_id text,  
  concept_id text,  
  tags ARRAY DEFAULT '{}'::text[],  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  pillar_ids ARRAY DEFAULT '{}'::text[],  
  typical_policies ARRAY DEFAULT '{}'::text[],  
  probe_hints jsonb DEFAULT '{}'::jsonb,  
  belief_shift_target_md text,  
  name text,  
  schema_code text,  
  CONSTRAINT schema_catalog_pkey PRIMARY KEY (id),  
  CONSTRAINT schema_catalog_pillar_id_fkey FOREIGN KEY (pillar_id) REFERENCES public.pillars(id),  
  CONSTRAINT schema_catalog_concept_id_fkey FOREIGN KEY (concept_id) REFERENCES public.concepts(id)  
);  
CREATE TABLE public.schema_dossiers (  
  schema_id text NOT NULL,  
  one_liner text,  
  clinical_lineage jsonb DEFAULT '{}'::jsonb,  
  neurocomputational_md text,  
  state_constraints jsonb DEFAULT '{}'::jsonb,  
  mechanism_map jsonb DEFAULT '{}'::jsonb,  
  implicit_measurement jsonb DEFAULT '{}'::jsonb,  
  contraindications jsonb DEFAULT '{}'::jsonb,  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT schema_dossiers_pkey PRIMARY KEY (schema_id),  
  CONSTRAINT schema_dossiers_schema_id_fkey FOREIGN KEY (schema_id) REFERENCES public.schema_catalog(id)  
);  
CREATE TABLE public.schema_evidence_links (  
  schema_id text NOT NULL,  
  evidence_key text NOT NULL,  
  relation USER-DEFINED NOT NULL,  
  weight numeric DEFAULT 1,  
  notes_md text,  
  CONSTRAINT schema_evidence_links_pkey PRIMARY KEY (schema_id, evidence_key, relation),  
  CONSTRAINT schema_evidence_links_schema_id_fkey FOREIGN KEY (schema_id) REFERENCES public.schema_catalog(id),  
  CONSTRAINT schema_evidence_links_evidence_key_fkey FOREIGN KEY (evidence_key) REFERENCES public.evidence_registry(key)  
);  
CREATE TABLE public.schema_families_backup (  
  schema_id text NOT NULL,  
  family_id uuid NOT NULL,  
  weight numeric DEFAULT 1.0,  
  notes_md text,  
  CONSTRAINT schema_families_backup_pkey PRIMARY KEY (schema_id, family_id),  
  CONSTRAINT schema_families_schema_id_fkey FOREIGN KEY (schema_id) REFERENCES public.schema_catalog(id),  
  CONSTRAINT schema_families_family_id_fkey FOREIGN KEY (family_id) REFERENCES public.mindblock_families(id)  
);  
CREATE TABLE public.schema_leaders (  
  schema_id text NOT NULL,  
  leader_id text NOT NULL,  
  angle text,  
  weight numeric DEFAULT 1,  
  notes_md text,  
  CONSTRAINT schema_leaders_pkey PRIMARY KEY (schema_id, leader_id),  
  CONSTRAINT schema_leaders_schema_id_fkey FOREIGN KEY (schema_id) REFERENCES public.schema_catalog(id),  
  CONSTRAINT schema_leaders_leader_id_fkey FOREIGN KEY (leader_id) REFERENCES public.thought_leaders(id)  
);  
CREATE TABLE public.schema_lenses (  
  schema_id text NOT NULL,  
  lens_id text NOT NULL,  
  weight numeric DEFAULT 1,  
  notes_md text,  
  CONSTRAINT schema_lenses_pkey PRIMARY KEY (schema_id, lens_id),  
  CONSTRAINT schema_lenses_schema_id_fkey FOREIGN KEY (schema_id) REFERENCES public.schema_catalog(id),  
  CONSTRAINT schema_lenses_lens_id_fkey FOREIGN KEY (lens_id) REFERENCES public.lens_catalog(id)  
);  
CREATE TABLE public.schema_mindblocks (  
  schema_id text NOT NULL,  
  mindblock_id uuid NOT NULL,  
  weight numeric DEFAULT 1.0,  
  evidence jsonb DEFAULT '{}'::jsonb,  
  notes_md text,  
  CONSTRAINT schema_mindblocks_pkey PRIMARY KEY (schema_id, mindblock_id),  
  CONSTRAINT schema_mindblocks_schema_id_fkey FOREIGN KEY (schema_id) REFERENCES public.schema_catalog(id),  
  CONSTRAINT schema_mindblocks_mindblock_id_fkey FOREIGN KEY (mindblock_id) REFERENCES public.mindblocks(id)  
);  
CREATE TABLE public.schema_prompt_fit (  
  schema_id text NOT NULL,  
  prompt_id text NOT NULL,  
  weight numeric DEFAULT 1,  
  notes_md text,  
  CONSTRAINT schema_prompt_fit_pkey PRIMARY KEY (schema_id, prompt_id),  
  CONSTRAINT schema_prompt_fit_schema_id_fkey FOREIGN KEY (schema_id) REFERENCES public.schema_catalog(id),  
  CONSTRAINT schema_prompt_fit_prompt_id_fkey FOREIGN KEY (prompt_id) REFERENCES public.prompt_templates(id)  
);  
CREATE TABLE public.schema_public_profiles (  
  schema_id text NOT NULL,  
  audience text NOT NULL DEFAULT 'public'::text,  
  public_name text NOT NULL,  
  public_slug text NOT NULL,  
  public_definition text,  
  one_liner text,  
  version text DEFAULT '1.0.0'::text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT schema_public_profiles_pkey PRIMARY KEY (schema_id, audience),  
  CONSTRAINT schema_public_profiles_schema_id_fkey FOREIGN KEY (schema_id) REFERENCES public.schema_catalog(id)  
);  
CREATE TABLE public.schema_voice_fit (  
  schema_id text NOT NULL,  
  voice_id text NOT NULL,  
  weight numeric DEFAULT 1,  
  best_for text,  
  CONSTRAINT schema_voice_fit_pkey PRIMARY KEY (schema_id, voice_id),  
  CONSTRAINT schema_voice_fit_schema_id_fkey FOREIGN KEY (schema_id) REFERENCES public.schema_catalog(id),  
  CONSTRAINT schema_voice_fit_voice_id_fkey FOREIGN KEY (voice_id) REFERENCES public.voice_archetypes(id)  
);  
CREATE TABLE public.signal_catalog (  
  signal_key text NOT NULL,  
  name text NOT NULL,  
  description_md text,  
  units text,  
  source_types ARRAY NOT NULL DEFAULT '{}'::text[],  
  expected_range jsonb DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT signal_catalog_pkey PRIMARY KEY (signal_key)  
);  
CREATE TABLE public.signals (  
  id bigint NOT NULL DEFAULT nextval('signals_id_seq'::regclass),  
  user_id uuid NOT NULL,  
  source text NOT NULL,  
  key text NOT NULL,  
  unit text,  
  value_num numeric,  
  value_text text,  
  captured_at timestamp with time zone NOT NULL DEFAULT now(),  
  meta jsonb DEFAULT '{}'::jsonb,  
  individual_id uuid,  
  profile_id uuid,  
  CONSTRAINT signals_pkey PRIMARY KEY (id),  
  CONSTRAINT signals_user_fk FOREIGN KEY (user_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.sim_run_errors (  
  id bigint NOT NULL DEFAULT nextval('sim_run_errors_id_seq'::regclass),  
  run_id uuid NOT NULL,  
  profile_id uuid,  
  error_text text NOT NULL,  
  payload jsonb,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT sim_run_errors_pkey PRIMARY KEY (id),  
  CONSTRAINT sim_run_errors_run_id_fkey FOREIGN KEY (run_id) REFERENCES public.sim_runs(id),  
  CONSTRAINT sim_run_errors_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.sim_runs (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  run_date date NOT NULL,  
  sim_version text NOT NULL DEFAULT 'v1'::text,  
  seed bigint,  
  scenario_packs ARRAY NOT NULL DEFAULT '{}'::text[],  
  users_active integer NOT NULL DEFAULT 0,  
  sessions_written integer NOT NULL DEFAULT 0,  
  events_written integer NOT NULL DEFAULT 0,  
  proofs_written integer NOT NULL DEFAULT 0,  
  errors_count integer NOT NULL DEFAULT 0,  
  notes text,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT sim_runs_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.sim_users (  
  profile_id uuid NOT NULL,  
  archetype text NOT NULL,  
  params jsonb NOT NULL DEFAULT '{}'::jsonb,  
  org_id uuid,  
  pro_id uuid,  
  phase text NOT NULL DEFAULT 'onboarding'::text,  
  started_at timestamp with time zone NOT NULL DEFAULT now(),  
  notes text,  
  CONSTRAINT sim_users_pkey PRIMARY KEY (profile_id),  
  CONSTRAINT sim_users_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id),  
  CONSTRAINT sim_users_pro_id_fkey FOREIGN KEY (pro_id) REFERENCES public.profiles(id),  
  CONSTRAINT sim_users_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.social_actions (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  circle_id uuid,  
  action_type text NOT NULL CHECK (action_type = ANY (ARRAY['witness_request'::text, 'witness_confirm'::text, 'support_request'::text, 'support_offer'::text, 'repair_message'::text, 'celebration'::text, 'checkin'::text, 'boundary_update'::text])),  
  to_profile_id uuid,  
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,  
  outbox_id uuid,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT social_actions_pkey PRIMARY KEY (id),  
  CONSTRAINT social_actions_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT social_actions_circle_id_fkey FOREIGN KEY (circle_id) REFERENCES public.circles(id),  
  CONSTRAINT social_actions_to_profile_id_fkey FOREIGN KEY (to_profile_id) REFERENCES public.profiles(id),  
  CONSTRAINT social_actions_outbox_id_fkey FOREIGN KEY (outbox_id) REFERENCES public.notifications(id)  
);  
CREATE TABLE public.social_events (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  actor_id uuid,  
  subject_type text NOT NULL,  
  subject_id uuid NOT NULL,  
  event_type text NOT NULL,  
  payload jsonb,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  created_by uuid,  
  CONSTRAINT social_events_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.social_metrics_weekly (  
  organization_id uuid,  
  cohort_id uuid,  
  individual_id uuid NOT NULL,  
  week_start date NOT NULL,  
  witness_requests integer DEFAULT 0,  
  witness_confirms integer DEFAULT 0,  
  witness_response_median_minutes integer,  
  support_requests integer DEFAULT 0,  
  support_offers integer DEFAULT 0,  
  repair_messages integer DEFAULT 0,  
  connection_delta numeric,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT social_metrics_weekly_pkey PRIMARY KEY (individual_id, week_start),  
  CONSTRAINT social_metrics_weekly_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),  
  CONSTRAINT social_metrics_weekly_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.social_safety_routes (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  action_id uuid NOT NULL,  
  risk_level text NOT NULL DEFAULT 'low'::text CHECK (risk_level = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text, 'acute'::text])),  
  routed_to jsonb NOT NULL DEFAULT '{}'::jsonb,  
  status text NOT NULL DEFAULT 'open'::text CHECK (status = ANY (ARRAY['open'::text, 'acknowledged'::text, 'resolved'::text])),  
  created_at timestamp with time zone DEFAULT now(),  
  resolved_at timestamp with time zone,  
  CONSTRAINT social_safety_routes_pkey PRIMARY KEY (id),  
  CONSTRAINT social_safety_routes_action_id_fkey FOREIGN KEY (action_id) REFERENCES public.social_actions(id)  
);  
CREATE TABLE public.sound_bite_code_sequences (  
  pillar_id text NOT NULL,  
  theme_id text NOT NULL,  
  last_number bigint NOT NULL DEFAULT 0,  
  CONSTRAINT sound_bite_code_sequences_pkey PRIMARY KEY (pillar_id, theme_id)  
);  
CREATE TABLE public.sound_bites (  
  legacy_id bigint NOT NULL DEFAULT nextval('sound_bites_id_seq'::regclass),  
  code text UNIQUE CHECK (code ~ '^[A-Z]{2}-[A-Z]-[0-9]+$'::text),  
  pillar_id text,  
  theme_id text,  
  guru_id bigint,  
  tag text,  
  angle text,  
  sound_bite text NOT NULL,  
  audio_path text,  
  audio_status text CHECK (audio_status = ANY (ARRAY['pending'::text, 'processing'::text, 'ready'::text, 'error'::text])),  
  audio_error text,  
  audio_url text,  
  sound_bite_url text,  
  sound_bite_spark text,  
  sound_bite_spark_url text,  
  sound_bite_flame text,  
  sound_bite_flame_url text,  
  sound_bite_ember text,  
  sound_bite_ember_url text,  
  id integer NOT NULL UNIQUE,  
  content_ref uuid,  
  spark_words integer DEFAULT   
CASE  
    WHEN (btrim(COALESCE(sound_bite_spark, ''::text)) = ''::text) THEN 0  
    ELSE array_length(regexp_split_to_array(regexp_replace(sound_bite_spark, '\s+'::text, ' '::text, 'g'::text), ' '::text), 1)  
END,  
  flame_words integer DEFAULT   
CASE  
    WHEN (btrim(COALESCE(sound_bite_flame, ''::text)) = ''::text) THEN 0  
    ELSE array_length(regexp_split_to_array(regexp_replace(sound_bite_flame, '\s+'::text, ' '::text, 'g'::text), ' '::text), 1)  
END,  
  ember_words integer DEFAULT   
CASE  
    WHEN (btrim(COALESCE(sound_bite_ember, ''::text)) = ''::text) THEN 0  
    ELSE array_length(regexp_split_to_array(regexp_replace(sound_bite_ember, '\s+'::text, ' '::text, 'g'::text), ' '::text), 1)  
END,  
  sound_bite_spark_production text,  
  sound_bite_flame_production text,  
  sound_bite_ember_production text,  
  spark_words_prod integer DEFAULT   
CASE  
    WHEN (btrim(COALESCE(sound_bite_spark_production, ''::text)) = ''::text) THEN 0  
    ELSE array_length(regexp_split_to_array(regexp_replace(sound_bite_spark_production, '\s+'::text, ' '::text, 'g'::text), ' '::text), 1)  
END,  
  flame_words_prod integer DEFAULT   
CASE  
    WHEN (btrim(COALESCE(sound_bite_flame_production, ''::text)) = ''::text) THEN 0  
    ELSE array_length(regexp_split_to_array(regexp_replace(sound_bite_flame_production, '\s+'::text, ' '::text, 'g'::text), ' '::text), 1)  
END,  
  ember_words_prod integer DEFAULT   
CASE  
    WHEN (btrim(COALESCE(sound_bite_ember_production, ''::text)) = ''::text) THEN 0  
    ELSE array_length(regexp_split_to_array(regexp_replace(sound_bite_ember_production, '\s+'::text, ' '::text, 'g'::text), ' '::text), 1)  
END,  
  CONSTRAINT sound_bites_pkey PRIMARY KEY (id),  
  CONSTRAINT sound_bites_pillar_id_fkey FOREIGN KEY (pillar_id) REFERENCES public.pillars(id),  
  CONSTRAINT sound_bites_theme_id_fkey FOREIGN KEY (theme_id) REFERENCES public.themes(id),  
  CONSTRAINT sound_bites_guru_id_fkey FOREIGN KEY (guru_id) REFERENCES public.gurus(id)  
);  
CREATE TABLE public.sound_bites_completed (  
  id bigint,  
  code text,  
  pillar_id text,  
  theme_id text,  
  guru_id bigint,  
  tag text,  
  angle text,  
  sound_bite text,  
  url_9 text  
);  
CREATE TABLE public.soundbite_assets (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  code text UNIQUE,  
  type text NOT NULL CHECK (type = ANY (ARRAY['spark'::text, 'flame'::text, 'ember'::text, 'spack'::text])),  
  canonical_text text,  
  spark_copy text,  
  flame_copy text,  
  ember_copy text,  
  tts_text text,  
  audio_asset_id uuid,  
  duration_ms integer,  
  primary_person_id uuid,  
  lens text,  
  angle text,  
  pillar_id text,  
  theme_id text,  
  primary_schema_ids ARRAY,  
  tags ARRAY,  
  state_band_min integer,  
  state_band_max integer,  
  contraindications ARRAY,  
  intent text CHECK (intent = ANY (ARRAY['interrupt'::text, 'reframe'::text, 'prime'::text, 'seal'::text, 'connect'::text, 'meaning'::text])),  
  status text DEFAULT 'draft'::text CHECK (status = ANY (ARRAY['draft'::text, 'reviewed'::text, 'published'::text, 'archived'::text])),  
  clinical_review_passed boolean DEFAULT false,  
  version integer DEFAULT 1,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT soundbite_assets_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.soundbite_mindblocks (  
  soundbite_id uuid NOT NULL,  
  mindblock_id uuid NOT NULL,  
  confidence numeric,  
  CONSTRAINT soundbite_mindblocks_pkey PRIMARY KEY (soundbite_id, mindblock_id),  
  CONSTRAINT soundbite_mindblocks_soundbite_id_fkey FOREIGN KEY (soundbite_id) REFERENCES public.user_soundbites(id),  
  CONSTRAINT soundbite_mindblocks_mindblock_id_fkey FOREIGN KEY (mindblock_id) REFERENCES public.mindblocks(id)  
);  
CREATE TABLE public.soundbite_playback_sessions (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  soundbite_asset_id uuid,  
  user_soundbite_id uuid,  
  intent text,  
  band text,  
  why_now jsonb,  
  started_at timestamp with time zone DEFAULT now(),  
  completed_at timestamp with time zone,  
  pre_state jsonb,  
  post_state jsonb,  
  device text,  
  app_version text,  
  metrics jsonb,  
  CONSTRAINT soundbite_playback_sessions_pkey PRIMARY KEY (id),  
  CONSTRAINT soundbite_playback_sessions_soundbite_asset_id_fkey FOREIGN KEY (soundbite_asset_id) REFERENCES public.soundbite_assets(id),  
  CONSTRAINT soundbite_playback_sessions_user_soundbite_id_fkey FOREIGN KEY (user_soundbite_id) REFERENCES public.user_soundbites(id)  
);  
CREATE TABLE public.soundbite_track_moods (  
  track_id text NOT NULL,  
  mood_slug text NOT NULL,  
  weight numeric NOT NULL DEFAULT 1,  
  CONSTRAINT soundbite_track_moods_pkey PRIMARY KEY (track_id, mood_slug),  
  CONSTRAINT soundbite_track_moods_track_id_fkey FOREIGN KEY (track_id) REFERENCES public.soundbite_tracks(track_id),  
  CONSTRAINT soundbite_track_moods_mood_slug_fkey FOREIGN KEY (mood_slug) REFERENCES public.moods(slug)  
);  
CREATE TABLE public.soundbite_tracks (  
  track_id text NOT NULL,  
  sound_bite_id integer NOT NULL,  
  type USER-DEFINED NOT NULL,  
  code text NOT NULL,  
  pillar_id text NOT NULL,  
  theme_id text NOT NULL,  
  tag text,  
  angle text,  
  title text,  
  tts_text text,  
  audio_path text NOT NULL,  
  audio_status text CHECK (audio_status = ANY (ARRAY['queued'::text, 'ok'::text, 'error'::text])),  
  audio_error text,  
  audio_duration_ms integer,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT soundbite_tracks_pkey PRIMARY KEY (track_id),  
  CONSTRAINT soundbite_tracks_sound_bite_id_fkey FOREIGN KEY (sound_bite_id) REFERENCES public.sound_bites(id)  
);  
CREATE TABLE public.source_authors (  
  source_id bigint NOT NULL,  
  author_id bigint NOT NULL,  
  author_order integer NOT NULL,  
  CONSTRAINT source_authors_pkey PRIMARY KEY (source_id, author_id),  
  CONSTRAINT source_authors_source_id_fkey FOREIGN KEY (source_id) REFERENCES public.sources(id),  
  CONSTRAINT source_authors_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.authors(id)  
);  
CREATE TABLE public.sources (  
  id bigint NOT NULL DEFAULT nextval('sources_id_seq'::regclass),  
  type USER-DEFINED NOT NULL,  
  title text NOT NULL,  
  year integer,  
  journal text,  
  publisher text,  
  doi text,  
  url text,  
  abstract_md text,  
  level_of_evidence text,  
  tags ARRAY DEFAULT '{}'::text[],  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT sources_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.spark_events (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  journey_instance_id uuid,  
  journey_template_id text,  
  pillar_id text,  
  theme_id text,  
  schema_id text,  
  family_id uuid,  
  captured_at timestamp with time zone NOT NULL DEFAULT now(),  
  source text NOT NULL CHECK (source = ANY (ARRAY['journey_scene'::text, 'voice_note'::text, 'journal'::text, 'navicue_response'::text])),  
  payload_ref_type text CHECK (payload_ref_type = ANY (ARRAY['soundbite'::text, 'story_map'::text, 'receipt'::text, 'text'::text])),  
  payload_ref_id text,  
  spark_strength numeric CHECK (spark_strength >= 0::numeric AND spark_strength <= 1::numeric),  
  tags ARRAY,  
  era_phase text,  
  evidence_weight numeric CHECK (evidence_weight IS NULL OR evidence_weight >= 0::numeric AND evidence_weight <= 1::numeric),  
  CONSTRAINT spark_events_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.state_band_map (  
  heat text NOT NULL,  
  state_band USER-DEFINED NOT NULL,  
  CONSTRAINT state_band_map_pkey PRIMARY KEY (heat)  
);  
CREATE TABLE public.state_band_policies (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  band text NOT NULL CHECK (band = ANY (ARRAY['green'::text, 'amber'::text, 'red'::text, 'shutdown'::text])),  
  allowed_content_kinds ARRAY NOT NULL,  
  allowed_response_types ARRAY NOT NULL,  
  allowed_variants ARRAY,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT state_band_policies_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.state_checkins (  
  user_id uuid NOT NULL,  
  ts timestamp with time zone NOT NULL DEFAULT now(),  
  energy integer CHECK (energy >= 0 AND energy <= 10),  
  clarity integer CHECK (clarity >= 0 AND clarity <= 10),  
  connection integer CHECK (connection >= 0 AND connection <= 10),  
  notes text,  
  individual_id uuid,  
  CONSTRAINT state_checkins_pkey PRIMARY KEY (user_id, ts)  
);  
CREATE TABLE public.state_logs (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  organization_id uuid,  
  state_key text NOT NULL,  
  state_value jsonb NOT NULL,  
  logged_at timestamp with time zone DEFAULT now(),  
  profile_id uuid,  
  CONSTRAINT state_logs_pkey PRIMARY KEY (id),  
  CONSTRAINT state_logs_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT state_logs_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)  
);  
CREATE TABLE public.story_map_entries (  
  id bigint NOT NULL DEFAULT nextval('story_map_entries_id_seq'::regclass),  
  user_id uuid NOT NULL,  
  mode USER-DEFINED NOT NULL DEFAULT 'text'::story_mode,  
  content_text text,  
  transcript_text text,  
  pain_vectors jsonb DEFAULT '[]'::jsonb,  
  protection_bias text,  
  identity_line_draft text,  
  hot_contexts ARRAY DEFAULT '{}'::text[],  
  pillar_hypotheses ARRAY DEFAULT '{}'::text[],  
  theme_hypotheses ARRAY DEFAULT '{}'::text[],  
  tags ARRAY DEFAULT '{}'::text[],  
  meta jsonb DEFAULT '{}'::jsonb CHECK (meta IS NULL OR jsonb_typeof(meta) = 'object'::text),  
  created_at timestamp with time zone DEFAULT now(),  
  captured_at timestamp with time zone NOT NULL DEFAULT now(),  
  privacy_level USER-DEFINED NOT NULL DEFAULT 'private'::privacy_level_enum,  
  intent USER-DEFINED,  
  capture_quality USER-DEFINED DEFAULT 'clean'::capture_quality_enum,  
  energy smallint CHECK (energy >= 0 AND energy <= 10),  
  clarity smallint CHECK (clarity >= 0 AND clarity <= 10),  
  connection smallint CHECK (connection >= 0 AND connection <= 10),  
  individual_id uuid,  
  profile_id uuid,  
  CONSTRAINT story_map_entries_pkey PRIMARY KEY (id),  
  CONSTRAINT story_map_entries_user_fk FOREIGN KEY (user_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.supports (  
  id bigint NOT NULL DEFAULT nextval('supports_id_seq'::regclass),  
  user_id uuid NOT NULL,  
  role text,  
  contact jsonb,  
  notify_policy jsonb DEFAULT '{"quiet_hours": [22, 7]}'::jsonb,  
  individual_id uuid,  
  profile_id uuid,  
  CONSTRAINT supports_pkey PRIMARY KEY (id),  
  CONSTRAINT supports_user_fk FOREIGN KEY (user_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.synthetic_settings (  
  id integer NOT NULL DEFAULT 1,  
  enabled boolean NOT NULL DEFAULT true,  
  sessions_per_min integer NOT NULL DEFAULT 2,  
  max_per_run integer NOT NULL DEFAULT 5,  
  error_rate numeric NOT NULL DEFAULT 0.03,  
  abandon_rate numeric NOT NULL DEFAULT 0.08,  
  bias jsonb NOT NULL DEFAULT '{}'::jsonb,  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT synthetic_settings_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.tags (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  slug text NOT NULL UNIQUE,  
  label text NOT NULL,  
  category text,  
  description text,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT tags_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.task_queue (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  topic text NOT NULL,  
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,  
  status text NOT NULL DEFAULT 'queued'::text,  
  run_at timestamp with time zone NOT NULL DEFAULT now(),  
  attempts integer NOT NULL DEFAULT 0,  
  last_error text,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT task_queue_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.task_queue_errors (  
  id bigint NOT NULL DEFAULT nextval('task_queue_errors_id_seq'::regclass),  
  task_id uuid NOT NULL,  
  error text NOT NULL,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT task_queue_errors_pkey PRIMARY KEY (id),  
  CONSTRAINT task_queue_errors_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.task_queue(id)  
);  
CREATE TABLE public.template_members (  
  user_id uuid NOT NULL,  
  template_id text NOT NULL,  
  CONSTRAINT template_members_pkey PRIMARY KEY (user_id, template_id)  
);  
CREATE TABLE public.theme_comb_map (  
  theme_id text NOT NULL,  
  c_flag boolean NOT NULL DEFAULT false,  
  o_flag boolean NOT NULL DEFAULT false,  
  m_flag boolean NOT NULL DEFAULT false,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT theme_comb_map_pkey PRIMARY KEY (theme_id),  
  CONSTRAINT theme_comb_map_theme_id_fkey FOREIGN KEY (theme_id) REFERENCES public.themes(id)  
);  
CREATE TABLE public.theme_concepts (  
  theme_id text NOT NULL,  
  concept_id text NOT NULL,  
  CONSTRAINT theme_concepts_pkey PRIMARY KEY (theme_id, concept_id),  
  CONSTRAINT theme_concepts_theme_id_fkey FOREIGN KEY (theme_id) REFERENCES public.themes(id),  
  CONSTRAINT theme_concepts_concept_id_fkey FOREIGN KEY (concept_id) REFERENCES public.concepts(id)  
);  
CREATE TABLE public.themes (  
  id text NOT NULL,  
  concept_id text,  
  name text NOT NULL,  
  contexts ARRAY DEFAULT '{}'::text[],  
  code text,  
  pillar_id text,  
  duration_weeks integer DEFAULT 2,  
  sort_order integer,  
  CONSTRAINT themes_pkey PRIMARY KEY (id),  
  CONSTRAINT themes_concept_id_fkey FOREIGN KEY (concept_id) REFERENCES public.concepts(id),  
  CONSTRAINT themes_pillar_id_fkey FOREIGN KEY (pillar_id) REFERENCES public.pillars(id)  
);  
CREATE TABLE public.thought_leader_aliases (  
  leader_id text NOT NULL,  
  alias text NOT NULL,  
  CONSTRAINT thought_leader_aliases_pkey PRIMARY KEY (leader_id, alias),  
  CONSTRAINT thought_leader_aliases_leader_id_fkey FOREIGN KEY (leader_id) REFERENCES public.thought_leaders(id)  
);  
CREATE TABLE public.thought_leader_links (  
  id bigint NOT NULL DEFAULT nextval('thought_leader_links_id_seq'::regclass),  
  leader_id text NOT NULL,  
  kind text NOT NULL CHECK (kind = ANY (ARRAY['site'::text, 'x'::text, 'youtube'::text, 'podcast'::text, 'paper'::text, 'other'::text])),  
  url text NOT NULL,  
  CONSTRAINT thought_leader_links_pkey PRIMARY KEY (id),  
  CONSTRAINT thought_leader_links_leader_id_fkey FOREIGN KEY (leader_id) REFERENCES public.thought_leaders(id)  
);  
CREATE TABLE public.thought_leaders (  
  id text NOT NULL,  
  display_name text NOT NULL,  
  affiliation text,  
  bio_md text,  
  photo_media_id bigint,  
  tags ARRAY DEFAULT '{}'::text[],  
  created_at timestamp with time zone DEFAULT now(),  
  org text,  
  website text,  
  CONSTRAINT thought_leaders_pkey PRIMARY KEY (id),  
  CONSTRAINT thought_leaders_photo_media_id_fkey FOREIGN KEY (photo_media_id) REFERENCES public.media_assets(id)  
);  
CREATE TABLE public.toolkit_items (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  content_id uuid NOT NULL,  
  added_at timestamp with time zone NOT NULL DEFAULT now(),  
  pinned boolean NOT NULL DEFAULT false,  
  notes text,  
  CONSTRAINT toolkit_items_pkey PRIMARY KEY (id),  
  CONSTRAINT toolkit_items_content_id_fkey FOREIGN KEY (content_id) REFERENCES public.content_items(id),  
  CONSTRAINT toolkit_items_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.transfer_test_results (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  test_id uuid NOT NULL,  
  content_kind text NOT NULL DEFAULT 'block'::text CHECK (content_kind = ANY (ARRAY['block'::text, 'sequence'::text, 'navicue'::text, 'article'::text, 'lesson'::text, 'practice'::text, 'other'::text])),  
  content_id text,  
  deployment_kind text DEFAULT 'block_assignment'::text,  
  deployment_id text,  
  assigned_at timestamp with time zone DEFAULT now(),  
  due_at timestamp with time zone,  
  completed_at timestamp with time zone,  
  outcome USER-DEFINED NOT NULL DEFAULT 'unknown'::transfer_outcome,  
  friction integer CHECK (friction >= 0 AND friction <= 10),  
  notes_md text,  
  evidence jsonb DEFAULT '{}'::jsonb,  
  exposure_id uuid,  
  queue_id uuid,  
  individual_id uuid NOT NULL,  
  CONSTRAINT transfer_test_results_pkey PRIMARY KEY (id),  
  CONSTRAINT transfer_test_results_test_id_fkey FOREIGN KEY (test_id) REFERENCES public.transfer_tests(id),  
  CONSTRAINT transfer_test_results_exposure_fk FOREIGN KEY (exposure_id) REFERENCES public.feed_exposures(id),  
  CONSTRAINT transfer_test_results_queue_fk FOREIGN KEY (queue_id) REFERENCES public.user_feed_queue_v2(id),  
  CONSTRAINT transfer_test_results_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.transfer_test_rules (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  is_active boolean NOT NULL DEFAULT true,  
  test_id uuid NOT NULL,  
  trigger_event text NOT NULL CHECK (trigger_event = ANY (ARRAY['block_completed'::text, 'block_delivered'::text, 'followup_completed'::text])),  
  block_id text,  
  theme_id text,  
  pillar_id text,  
  delay_hours integer NOT NULL DEFAULT 24,  
  window_hours integer,  
  max_per_user_per_7d integer DEFAULT 3,  
  priority integer NOT NULL DEFAULT 0,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT transfer_test_rules_pkey PRIMARY KEY (id),  
  CONSTRAINT transfer_test_rules_test_id_fkey FOREIGN KEY (test_id) REFERENCES public.transfer_tests(id)  
);  
CREATE TABLE public.transfer_tests (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  key text UNIQUE,  
  title text NOT NULL,  
  description_md text,  
  block_id text,  
  sequence_id text,  
  schema_id text,  
  prompt_id text,  
  window_hours integer NOT NULL DEFAULT 24 CHECK (window_hours >= 1 AND window_hours <= 720),  
  success_criteria jsonb NOT NULL DEFAULT '{}'::jsonb,  
  default_friction_scale_max integer DEFAULT 10 CHECK (default_friction_scale_max >= 1 AND default_friction_scale_max <= 10),  
  is_required boolean DEFAULT false,  
  tags jsonb DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT transfer_tests_pkey PRIMARY KEY (id),  
  CONSTRAINT transfer_tests_block_id_fkey FOREIGN KEY (block_id) REFERENCES public.blocks(id),  
  CONSTRAINT transfer_tests_sequence_id_fkey FOREIGN KEY (sequence_id) REFERENCES public.cue_sequences(id),  
  CONSTRAINT transfer_tests_schema_id_fkey FOREIGN KEY (schema_id) REFERENCES public.schema_catalog(id),  
  CONSTRAINT transfer_tests_prompt_id_fkey FOREIGN KEY (prompt_id) REFERENCES public.prompt_templates(id)  
);  
CREATE TABLE public.tts_jobs (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  payload jsonb NOT NULL,  
  status text NOT NULL DEFAULT 'queued'::text,  
  response jsonb,  
  error text,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  audio_path text,  
  audio_mime text,  
  audio_size_bytes integer,  
  audio_duration_seconds numeric,  
  CONSTRAINT tts_jobs_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.tts_outputs (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  request_id uuid NOT NULL,  
  storage_path text NOT NULL,  
  mime text NOT NULL,  
  size_bytes integer,  
  duration_seconds numeric,  
  provider text,  
  meta jsonb DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT tts_outputs_pkey PRIMARY KEY (id),  
  CONSTRAINT tts_outputs_request_id_fkey FOREIGN KEY (request_id) REFERENCES public.tts_requests(id)  
);  
CREATE TABLE public.tts_requests (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  text text NOT NULL,  
  voice text,  
  format text NOT NULL DEFAULT 'mp3'::text CHECK (format = ANY (ARRAY['mp3'::text, 'wav'::text, 'ogg'::text])),  
  provider_settings jsonb DEFAULT '{}'::jsonb,  
  status text NOT NULL DEFAULT 'queued'::text CHECK (status = ANY (ARRAY['queued'::text, 'processing'::text, 'done'::text, 'error'::text])),  
  priority integer NOT NULL DEFAULT 0,  
  error text,  
  requested_by uuid,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT tts_requests_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.user_arousal_state (  
  user_id uuid NOT NULL,  
  energy01 numeric CHECK (energy01 >= 0::numeric AND energy01 <= 1::numeric),  
  clarity01 numeric CHECK (clarity01 >= 0::numeric AND clarity01 <= 1::numeric),  
  connection01 numeric CHECK (connection01 >= 0::numeric AND connection01 <= 1::numeric),  
  arousal_band text CHECK (arousal_band = ANY (ARRAY['downshift'::text, 'neutral'::text, 'upshift'::text])),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT user_arousal_state_pkey PRIMARY KEY (user_id),  
  CONSTRAINT user_arousal_state_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.user_belief_statements (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  organization_id uuid,  
  statement text NOT NULL,  
  valence text NOT NULL DEFAULT 'neutral'::text CHECK (valence = ANY (ARRAY['limiting'::text, 'new_truth'::text, 'neutral'::text])),  
  confidence numeric CHECK (confidence IS NULL OR confidence >= 0::numeric AND confidence <= 1::numeric),  
  emotion_tags ARRAY NOT NULL DEFAULT '{}'::text[],  
  context_tags ARRAY NOT NULL DEFAULT '{}'::text[],  
  schema_id text,  
  mindblock_id uuid,  
  source_kind text NOT NULL CHECK (source_kind = ANY (ARRAY['soundbite'::text, 'story_map'::text, 'navicue'::text, 'clinician'::text, 'system'::text])),  
  source_id text,  
  captured_at timestamp with time zone NOT NULL DEFAULT now(),  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT user_belief_statements_pkey PRIMARY KEY (id),  
  CONSTRAINT user_belief_statements_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT user_belief_statements_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),  
  CONSTRAINT user_belief_statements_schema_id_fkey FOREIGN KEY (schema_id) REFERENCES public.schema_catalog(id),  
  CONSTRAINT user_belief_statements_mindblock_id_fkey FOREIGN KEY (mindblock_id) REFERENCES public.mindblocks(id)  
);  
CREATE TABLE public.user_cadence_settings (  
  user_id uuid NOT NULL,  
  navicues_max_per_day smallint NOT NULL DEFAULT 8 CHECK (navicues_max_per_day >= 0 AND navicues_max_per_day <= 50),  
  navicues_min_gap_minutes smallint NOT NULL DEFAULT 90 CHECK (navicues_min_gap_minutes >= 0 AND navicues_min_gap_minutes <= 1440),  
  quiet_hours_start smallint NOT NULL DEFAULT 22 CHECK (quiet_hours_start >= 0 AND quiet_hours_start <= 23),  
  quiet_hours_end smallint NOT NULL DEFAULT 7 CHECK (quiet_hours_end >= 0 AND quiet_hours_end <= 23),  
  journey_mode USER-DEFINED NOT NULL DEFAULT 'standard'::journey_cadence_mode_enum,  
  journey_min_scene_gap_hours smallint NOT NULL DEFAULT 6 CHECK (journey_min_scene_gap_hours >= 0 AND journey_min_scene_gap_hours <= 168),  
  journey_seed_window_hours smallint NOT NULL DEFAULT 24 CHECK (journey_seed_window_hours >= 1 AND journey_seed_window_hours <= 168),  
  journey_allow_fast_forward boolean NOT NULL DEFAULT true,  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  profile_id uuid,  
  CONSTRAINT user_cadence_settings_pkey PRIMARY KEY (user_id),  
  CONSTRAINT user_cadence_settings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.user_change_state (  
  user_id uuid NOT NULL,  
  ri_score numeric NOT NULL DEFAULT 0,  
  oi_score numeric NOT NULL DEFAULT 0,  
  ri_confidence numeric NOT NULL DEFAULT 0.2,  
  oi_confidence numeric NOT NULL DEFAULT 0.2,  
  dominant_barrier text,  
  last_spark_at timestamp with time zone,  
  last_proof_at timestamp with time zone,  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  profile_id uuid,  
  CONSTRAINT user_change_state_pkey PRIMARY KEY (user_id),  
  CONSTRAINT user_change_state_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.user_consents (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  scope text NOT NULL CHECK (scope = ANY (ARRAY['calendar'::text, 'location'::text, 'voice'::text, 'transcripts'::text, 'community'::text, 'research'::text, 'clinician_sharing'::text, 'notifications'::text])),  
  purpose text NOT NULL CHECK (purpose = ANY (ARRAY['personalization'::text, 'orchestration'::text, 'analytics'::text, 'research'::text, 'clinical'::text])),  
  granted boolean NOT NULL,  
  granted_at timestamp with time zone DEFAULT now(),  
  revoked_at timestamp with time zone,  
  metadata jsonb,  
  CONSTRAINT user_consents_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.user_context_events (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  context_slug text NOT NULL,  
  event USER-DEFINED NOT NULL DEFAULT 'observed'::context_event_enum,  
  value_num numeric,  
  notes text,  
  evidence jsonb DEFAULT '{}'::jsonb,  
  occurred_at timestamp with time zone DEFAULT now(),  
  created_at timestamp with time zone DEFAULT now(),  
  profile_id uuid,  
  CONSTRAINT user_context_events_pkey PRIMARY KEY (id),  
  CONSTRAINT user_context_events_profile_fk FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.user_context_mindblock_assoc (  
  individual_id uuid NOT NULL,  
  context_slug text NOT NULL,  
  mindblock_id uuid NOT NULL,  
  assoc numeric NOT NULL DEFAULT 0 CHECK (assoc >= 0::numeric AND assoc <= 1::numeric),  
  evidence jsonb DEFAULT '{}'::jsonb,  
  updated_at timestamp with time zone DEFAULT now(),  
  profile_id uuid,  
  CONSTRAINT user_context_mindblock_assoc_pkey PRIMARY KEY (individual_id, context_slug, mindblock_id),  
  CONSTRAINT user_context_mindblock_assoc_mindblock_id_fkey FOREIGN KEY (mindblock_id) REFERENCES public.mindblocks(id)  
);  
CREATE TABLE public.user_context_state (  
  individual_id uuid NOT NULL,  
  context_slug text NOT NULL,  
  weight numeric NOT NULL DEFAULT 0 CHECK (weight >= 0::numeric AND weight <= 1::numeric),  
  confidence numeric NOT NULL DEFAULT 0.2 CHECK (confidence >= 0::numeric AND confidence <= 1::numeric),  
  last_seen_at timestamp with time zone,  
  evidence jsonb DEFAULT '{}'::jsonb,  
  updated_at timestamp with time zone DEFAULT now(),  
  profile_id uuid,  
  CONSTRAINT user_context_state_pkey PRIMARY KEY (individual_id, context_slug),  
  CONSTRAINT user_context_state_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.user_embeddings (  
  user_id uuid NOT NULL,  
  state_embedding USER-DEFINED,  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT user_embeddings_pkey PRIMARY KEY (user_id)  
);  
CREATE TABLE public.user_events (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  organization_id uuid,  
  event_type text NOT NULL,  
  content_ref uuid,  
  deployment_id uuid,  
  exposure_id uuid,  
  session_id uuid,  
  properties jsonb NOT NULL DEFAULT '{}'::jsonb,  
  occurred_at timestamp with time zone NOT NULL DEFAULT now(),  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  profile_id uuid,  
  CONSTRAINT user_events_pkey PRIMARY KEY (id),  
  CONSTRAINT user_events_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT user_events_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),  
  CONSTRAINT user_events_content_ref_fkey FOREIGN KEY (content_ref) REFERENCES public.content_registry(id)  
);  
CREATE TABLE public.user_feed_queue (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  organization_id uuid,  
  content_type text NOT NULL CHECK (content_type = ANY (ARRAY['navicue'::text, 'block'::text, 'sequence'::text, 'article'::text, 'practice'::text, 'insight'::text, 'state_checkin'::text, 'celebration'::text, 'reflection'::text, 'social'::text])),  
  content_id text NOT NULL,  
  position integer NOT NULL,  
  reason text,  
  queued_at timestamp with time zone DEFAULT now(),  
  surfaced_at timestamp with time zone,  
  completed_at timestamp with time zone,  
  skipped_at timestamp with time zone,  
  saved_at timestamp with time zone,  
  context_tags ARRAY DEFAULT '{}'::text[],  
  metadata jsonb DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  content_ref uuid NOT NULL,  
  item_kind text CHECK (item_kind = ANY (ARRAY['micro'::text, 'episode'::text, 'proof'::text, 'support'::text])),  
  scheduled_for timestamp with time zone,  
  expires_at timestamp with time zone,  
  priority integer DEFAULT 0,  
  score numeric,  
  rank_features jsonb DEFAULT '{}'::jsonb,  
  arousal_fit text CHECK (arousal_fit = ANY (ARRAY['green'::text, 'amber'::text, 'red'::text, 'downshift_first'::text])),  
  CONSTRAINT user_feed_queue_pkey PRIMARY KEY (id),  
  CONSTRAINT user_feed_queue_patient_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT user_feed_queue_content_ref_fkey FOREIGN KEY (content_ref) REFERENCES public.content_registry(id)  
);  
CREATE TABLE public.user_feed_queue_v2 (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  organization_id uuid,  
  item_kind text NOT NULL CHECK (item_kind = ANY (ARRAY['micro'::text, 'episode'::text, 'proof'::text, 'support'::text])),  
  content_type text NOT NULL CHECK (content_type = ANY (ARRAY['navicue'::text, 'block'::text, 'sequence'::text, 'article'::text, 'practice'::text, 'state_checkin'::text, 'reflection'::text, 'celebration'::text, 'insight'::text])),  
  content_id text NOT NULL,  
  reason text,  
  scheduled_for timestamp with time zone,  
  expires_at timestamp with time zone,  
  priority integer DEFAULT 0,  
  score numeric,  
  rank_features jsonb DEFAULT '{}'::jsonb,  
  arousal_fit text CHECK (arousal_fit = ANY (ARRAY['green'::text, 'amber'::text, 'red'::text, 'downshift_first'::text])),  
  queued_at timestamp with time zone DEFAULT now(),  
  surfaced_at timestamp with time zone,  
  completed_at timestamp with time zone,  
  skipped_at timestamp with time zone,  
  saved_at timestamp with time zone,  
  context_tags ARRAY DEFAULT '{}'::text[],  
  metadata jsonb DEFAULT '{}'::jsonb,  
  content_ref uuid,  
  CONSTRAINT user_feed_queue_v2_pkey PRIMARY KEY (id),  
  CONSTRAINT user_feed_queue_v2_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT user_feed_queue_v2_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),  
  CONSTRAINT user_feed_queue_v2_individual_fk FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT user_feed_queue_v2_org_fk FOREIGN KEY (organization_id) REFERENCES public.organizations(id)  
);  
CREATE TABLE public.user_flags (  
  user_id uuid NOT NULL,  
  is_under_18 boolean,  
  is_vulnerable boolean,  
  marketing_opt_out boolean,  
  safety_opt_out boolean,  
  notes text,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT user_flags_pkey PRIMARY KEY (user_id),  
  CONSTRAINT user_flags_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)  
);  
CREATE TABLE public.user_focus_state (  
  individual_id uuid NOT NULL,  
  active_journey_instance_id uuid,  
  pillar_id text,  
  theme_id text,  
  schema_id text,  
  family_id uuid,  
  amplitude numeric DEFAULT 0 CHECK (amplitude >= 0::numeric AND amplitude <= 1::numeric),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT user_focus_state_pkey PRIMARY KEY (individual_id)  
);  
CREATE TABLE public.user_item_fatigue (  
  user_id uuid NOT NULL,  
  item_type text NOT NULL,  
  item_id text NOT NULL,  
  last_seen_at timestamp with time zone NOT NULL DEFAULT now(),  
  seen_count integer NOT NULL DEFAULT 1,  
  CONSTRAINT user_item_fatigue_pkey PRIMARY KEY (user_id, item_type, item_id)  
);  
CREATE TABLE public.user_kbe_state (  
  user_id uuid NOT NULL,  
  scope_type text NOT NULL CHECK (scope_type = ANY (ARRAY['schema'::text, 'family'::text, 'mindblock'::text, 'ladder'::text, 'rung'::text])),  
  scope_key text NOT NULL,  
  stage text NOT NULL CHECK (stage = ANY (ARRAY['knowing'::text, 'believing'::text, 'embodying'::text])),  
  confidence numeric NOT NULL DEFAULT 0.7 CHECK (confidence >= 0::numeric AND confidence <= 1::numeric),  
  evidence_count integer NOT NULL DEFAULT 0,  
  last_evidence_at timestamp with time zone,  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  trace_id uuid,  
  CONSTRAINT user_kbe_state_pkey PRIMARY KEY (user_id, scope_type, scope_key),  
  CONSTRAINT user_kbe_state_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)  
);  
CREATE TABLE public.user_lens_state (  
  individual_id uuid NOT NULL,  
  lens_id text NOT NULL,  
  weight numeric DEFAULT 0,  
  confidence numeric DEFAULT 0.2,  
  evidence jsonb DEFAULT '{}'::jsonb,  
  updated_at timestamp with time zone DEFAULT now(),  
  profile_id uuid,  
  CONSTRAINT user_lens_state_pkey PRIMARY KEY (individual_id, lens_id),  
  CONSTRAINT user_lens_state_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT user_lens_state_lens_id_fkey FOREIGN KEY (lens_id) REFERENCES public.lens_catalog(id)  
);  
CREATE TABLE public.user_mindblock_status (  
  individual_id uuid NOT NULL,  
  mindblock_id uuid NOT NULL,  
  organization_id uuid,  
  status text NOT NULL DEFAULT 'unknown'::text,  
  confidence numeric,  
  evidence jsonb DEFAULT '{}'::jsonb,  
  updated_at timestamp with time zone DEFAULT now(),  
  k_level numeric CHECK (k_level IS NULL OR k_level >= 0::numeric AND k_level <= 1::numeric),  
  b_level numeric CHECK (b_level IS NULL OR b_level >= 0::numeric AND b_level <= 1::numeric),  
  e_level numeric CHECK (e_level IS NULL OR e_level >= 0::numeric AND e_level <= 1::numeric),  
  progress_pct smallint CHECK (progress_pct IS NULL OR progress_pct >= 0 AND progress_pct <= 100),  
  priority_score numeric CHECK (priority_score IS NULL OR priority_score >= 0::numeric AND priority_score <= 100::numeric),  
  priority_band text CHECK (priority_band IS NULL OR (priority_band = ANY (ARRAY['green'::text, 'amber'::text, 'red'::text]))),  
  impact01 numeric CHECK (impact01 IS NULL OR impact01 >= 0::numeric AND impact01 <= 1::numeric),  
  priority_weighted numeric CHECK (priority_weighted IS NULL OR priority_weighted >= 0::numeric AND priority_weighted <= 100::numeric),  
  is_hot boolean DEFAULT false,  
  last_signal_at timestamp with time zone,  
  context_hotness01 numeric CHECK (context_hotness01 IS NULL OR context_hotness01 >= 0::numeric AND context_hotness01 <= 1::numeric),  
  context_multiplier numeric CHECK (context_multiplier IS NULL OR context_multiplier >= 1::numeric AND context_multiplier <= 1.35),  
  CONSTRAINT user_mindblock_status_pkey PRIMARY KEY (individual_id, mindblock_id),  
  CONSTRAINT user_mindblock_status_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT user_mindblock_status_mindblock_id_fkey FOREIGN KEY (mindblock_id) REFERENCES public.mindblocks(id),  
  CONSTRAINT user_mindblock_status_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)  
);  
CREATE TABLE public.user_risk_state (  
  user_id uuid NOT NULL,  
  risk_level smallint NOT NULL DEFAULT 0,  
  risk_reason text,  
  last_event_at timestamp with time zone,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT user_risk_state_pkey PRIMARY KEY (user_id),  
  CONSTRAINT user_risk_state_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)  
);  
CREATE TABLE public.user_risk_state_v2 (  
  user_id uuid NOT NULL,  
  risk_level USER-DEFINED NOT NULL DEFAULT 'none'::risk_level,  
  reasons ARRAY NOT NULL DEFAULT '{}'::text[],  
  expires_at timestamp with time zone,  
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT user_risk_state_v2_pkey PRIMARY KEY (user_id),  
  CONSTRAINT user_risk_state_v2_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)  
);  
CREATE TABLE public.user_schema_state (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  schema_id text NOT NULL,  
  belief_level numeric,  
  embodiment_level numeric,  
  confidence numeric,  
  evidence jsonb DEFAULT '{}'::jsonb,  
  updated_at timestamp with time zone DEFAULT now(),  
  weight numeric DEFAULT 0,  
  profile_id uuid,  
  CONSTRAINT user_schema_state_pkey PRIMARY KEY (id),  
  CONSTRAINT user_schema_state_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT user_schema_state_schema_id_fkey FOREIGN KEY (schema_id) REFERENCES public.schema_catalog(id)  
);  
CREATE TABLE public.user_schema_status (  
  individual_id uuid NOT NULL,  
  schema_id text NOT NULL,  
  weight numeric DEFAULT 0.0 CHECK (weight >= 0::numeric AND weight <= 1::numeric),  
  confidence numeric DEFAULT 0.0 CHECK (confidence >= 0::numeric AND confidence <= 1::numeric),  
  evidence jsonb DEFAULT '{}'::jsonb,  
  updated_at timestamp with time zone DEFAULT now(),  
  profile_id uuid,  
  CONSTRAINT user_schema_status_pkey PRIMARY KEY (individual_id, schema_id),  
  CONSTRAINT user_schema_status_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT user_schema_status_schema_id_fkey FOREIGN KEY (schema_id) REFERENCES public.schema_catalog(id)  
);  
CREATE TABLE public.user_schemas (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  organization_id uuid,  
  title text,  
  description_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT user_schemas_pkey PRIMARY KEY (id),  
  CONSTRAINT user_schemas_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT user_schemas_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)  
);  
CREATE TABLE public.user_soundbites (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  individual_id uuid NOT NULL,  
  organization_id uuid,  
  mode USER-DEFINED NOT NULL DEFAULT 'voice'::diary_mode,  
  transcript text,  
  media_url text,  
  duration_seconds integer,  
  ai_summary jsonb DEFAULT '{}'::jsonb,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  captured_at timestamp with time zone NOT NULL DEFAULT now(),  
  privacy_level USER-DEFINED NOT NULL DEFAULT 'private'::privacy_level_enum,  
  intent USER-DEFINED,  
  capture_quality USER-DEFINED DEFAULT 'clean'::capture_quality_enum,  
  context_tags ARRAY NOT NULL DEFAULT '{}'::text[],  
  hot_context text,  
  energy smallint CHECK (energy >= 0 AND energy <= 10),  
  clarity smallint CHECK (clarity >= 0 AND clarity <= 10),  
  connection smallint CHECK (connection >= 0 AND connection <= 10),  
  profile_id uuid,  
  CONSTRAINT user_soundbites_pkey PRIMARY KEY (id),  
  CONSTRAINT user_soundbites_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.profiles(id),  
  CONSTRAINT user_soundbites_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)  
);  
CREATE TABLE public.user_state_bands (  
  id bigint NOT NULL DEFAULT nextval('user_state_bands_id_seq'::regclass),  
  user_id uuid NOT NULL,  
  band text NOT NULL CHECK (band = ANY (ARRAY['green'::text, 'amber'::text, 'red'::text, 'shutdown'::text])),  
  estimated_at timestamp with time zone DEFAULT now(),  
  estimator_version text,  
  inputs jsonb,  
  CONSTRAINT user_state_bands_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.user_state_checkins (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  user_id uuid NOT NULL,  
  timestamp timestamp with time zone DEFAULT now(),  
  tempo integer CHECK (tempo >= 0 AND tempo <= 100),  
  flow integer CHECK (flow >= 0 AND flow <= 100),  
  sync integer CHECK (sync >= 0 AND sync <= 100),  
  composite integer DEFAULT (((tempo + flow) + sync) / 3),  
  context text,  
  tags ARRAY,  
  location text,  
  mood text,  
  CONSTRAINT user_state_checkins_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.video_schemas (  
  id text NOT NULL,  
  theme_id text,  
  name text NOT NULL,  
  description text,  
  is_active boolean DEFAULT true,  
  CONSTRAINT video_schemas_pkey PRIMARY KEY (id),  
  CONSTRAINT video_schemas_theme_id_fkey FOREIGN KEY (theme_id) REFERENCES public.video_themes(id)  
);  
CREATE TABLE public.video_themes (  
  id text NOT NULL,  
  pillar_id text,  
  name text NOT NULL,  
  description text,  
  CONSTRAINT video_themes_pkey PRIMARY KEY (id),  
  CONSTRAINT video_themes_pillar_id_fkey FOREIGN KEY (pillar_id) REFERENCES public.pillars(id)  
);  
CREATE TABLE public.videos (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  source_provider text NOT NULL DEFAULT 'jw'::text,  
  jw_media_id text UNIQUE,  
  title text,  
  description text,  
  tags ARRAY NOT NULL DEFAULT '{}'::text[],  
  status text NOT NULL DEFAULT 'needs_review'::text CHECK (status = ANY (ARRAY['needs_review'::text, 'keep'::text, 'archive'::text, 'delete'::text])),  
  duration_seconds integer,  
  language text,  
  auto_summary text,  
  auto_tags ARRAY NOT NULL DEFAULT '{}'::text[],  
  storage_bucket text,  
  storage_path text,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),  
  updated_at timestamp with time zone NOT NULL DEFAULT now(),  
  CONSTRAINT videos_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.voice_archetypes (  
  id text NOT NULL,  
  name text NOT NULL UNIQUE,  
  description_md text,  
  stance_defaults ARRAY DEFAULT '{inquiry}'::epistemic_stance[],  
  warmth numeric DEFAULT 0.5 CHECK (warmth >= 0::numeric AND warmth <= 1::numeric),  
  directness numeric DEFAULT 0.5 CHECK (directness >= 0::numeric AND directness <= 1::numeric),  
  humor numeric DEFAULT 0.2 CHECK (humor >= 0::numeric AND humor <= 1::numeric),  
  paradox_tolerance numeric DEFAULT 0.3 CHECK (paradox_tolerance >= 0::numeric AND paradox_tolerance <= 1::numeric),  
  compassion_heat numeric DEFAULT 0.6 CHECK (compassion_heat >= 0::numeric AND compassion_heat <= 1::numeric),  
  precision numeric DEFAULT 0.5 CHECK ("precision" >= 0::numeric AND "precision" <= 1::numeric),  
  somatic_bias numeric DEFAULT 0.3 CHECK (somatic_bias >= 0::numeric AND somatic_bias <= 1::numeric),  
  meaning_bias numeric DEFAULT 0.4 CHECK (meaning_bias >= 0::numeric AND meaning_bias <= 1::numeric),  
  challenge_bias numeric DEFAULT 0.3 CHECK (challenge_bias >= 0::numeric AND challenge_bias <= 1::numeric),  
  anti_patterns text,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT voice_archetypes_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.voice_inspirations (  
  voice_id text NOT NULL,  
  guru_id bigint NOT NULL,  
  weight numeric DEFAULT 1,  
  internal_only boolean DEFAULT true,  
  notes_md text,  
  CONSTRAINT voice_inspirations_pkey PRIMARY KEY (voice_id, guru_id),  
  CONSTRAINT voice_inspirations_voice_id_fkey FOREIGN KEY (voice_id) REFERENCES public.voice_archetypes(id),  
  CONSTRAINT voice_inspirations_guru_id_fkey FOREIGN KEY (guru_id) REFERENCES public.gurus(id)  
);  
CREATE TABLE public.wellbeing_mindblocks (  
  wellbeing_video_id bigint NOT NULL,  
  mindblock_id uuid NOT NULL,  
  relevance_strength numeric,  
  CONSTRAINT wellbeing_mindblocks_pkey PRIMARY KEY (wellbeing_video_id, mindblock_id),  
  CONSTRAINT wellbeing_mindblocks_mindblock_id_fkey FOREIGN KEY (mindblock_id) REFERENCES public.mindblocks(id)  
);  
CREATE TABLE public.witness_requests (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  run_id uuid,  
  requester_id uuid NOT NULL,  
  witness_id uuid NOT NULL,  
  request_type text NOT NULL DEFAULT 'notify'::text CHECK (request_type = ANY (ARRAY['notify'::text, 'confirm'::text, 'support'::text])),  
  status text NOT NULL DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'delivered'::text, 'acknowledged'::text, 'confirmed'::text, 'declined'::text, 'expired'::text])),  
  channel text NOT NULL DEFAULT 'in_app'::text CHECK (channel = ANY (ARRAY['in_app'::text, 'email'::text, 'sms'::text, 'push'::text])),  
  outbox_id uuid,  
  requested_at timestamp with time zone DEFAULT now(),  
  responded_at timestamp with time zone,  
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,  
  CONSTRAINT witness_requests_pkey PRIMARY KEY (id),  
  CONSTRAINT witness_requests_run_id_fkey FOREIGN KEY (run_id) REFERENCES public.rite_runs(id),  
  CONSTRAINT witness_requests_requester_id_fkey FOREIGN KEY (requester_id) REFERENCES public.profiles(id),  
  CONSTRAINT witness_requests_witness_id_fkey FOREIGN KEY (witness_id) REFERENCES public.profiles(id),  
  CONSTRAINT witness_requests_outbox_id_fkey FOREIGN KEY (outbox_id) REFERENCES public.notifications(id)  
);  
CREATE TABLE public.world_edges (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  src_id uuid NOT NULL,  
  dst_id uuid NOT NULL,  
  kind USER-DEFINED NOT NULL DEFAULT 'related_to'::graph_edge_kind,  
  strength USER-DEFINED,  
  weight numeric,  
  notes_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT world_edges_pkey PRIMARY KEY (id),  
  CONSTRAINT world_edges_src_fk FOREIGN KEY (src_id) REFERENCES public.world_nodes(id),  
  CONSTRAINT world_edges_dst_fk FOREIGN KEY (dst_id) REFERENCES public.world_nodes(id)  
);  
CREATE TABLE public.world_edges_v23 (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  source_entity_id uuid NOT NULL,  
  relation_type text NOT NULL,  
  target_entity_id uuid NOT NULL,  
  weight numeric DEFAULT 1.0 CHECK (weight >= 0::numeric AND weight <= 5::numeric),  
  polarity USER-DEFINED DEFAULT 'supports'::world_edge_polarity_enum,  
  evidence_status USER-DEFINED DEFAULT 'draft'::world_edge_status_enum,  
  context_scope ARRAY DEFAULT '{}'::text[],  
  evidence jsonb DEFAULT '{}'::jsonb,  
  notes_md text,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT world_edges_v23_pkey PRIMARY KEY (id),  
  CONSTRAINT world_edges_v23_source_entity_id_fkey FOREIGN KEY (source_entity_id) REFERENCES public.world_entities(id),  
  CONSTRAINT world_edges_v23_relation_type_fkey FOREIGN KEY (relation_type) REFERENCES public.world_relation_types(type),  
  CONSTRAINT world_edges_v23_target_entity_id_fkey FOREIGN KEY (target_entity_id) REFERENCES public.world_entities(id)  
);  
CREATE TABLE public.world_entities (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  entity_type USER-DEFINED NOT NULL,  
  key text NOT NULL,  
  label text NOT NULL,  
  description_md text,  
  aliases ARRAY DEFAULT '{}'::text[],  
  tags ARRAY DEFAULT '{}'::text[],  
  ref_table text,  
  ref_id text,  
  meta jsonb DEFAULT '{}'::jsonb,  
  is_active boolean DEFAULT true,  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT world_entities_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.world_nodes (  
  id uuid NOT NULL DEFAULT gen_random_uuid(),  
  node_type text NOT NULL,  
  node_key text NOT NULL,  
  title text,  
  summary_md text,  
  tags ARRAY DEFAULT '{}'::text[],  
  created_at timestamp with time zone DEFAULT now(),  
  updated_at timestamp with time zone DEFAULT now(),  
  CONSTRAINT world_nodes_pkey PRIMARY KEY (id)  
);  
CREATE TABLE public.world_relation_types (  
  type text NOT NULL,  
  description text,  
  is_symmetric boolean DEFAULT false,  
  allowed_sources ARRAY DEFAULT '{}'::world_entity_type_enum[],  
  allowed_targets ARRAY DEFAULT '{}'::world_entity_type_enum[],  
  CONSTRAINT world_relation_types_pkey PRIMARY KEY (type)  
);  
