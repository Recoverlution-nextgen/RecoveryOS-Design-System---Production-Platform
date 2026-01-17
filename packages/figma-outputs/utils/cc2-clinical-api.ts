/**
 * CC2 CLINICAL API CLIENT
 * Frontend utilities for fetching clinical data from make-server
 * Uses Supabase v2 views and endpoints
 */

import { projectId, publicAnonKey } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/cc2/clinical`;

/**
 * Generic fetch wrapper with auth
 */
async function fetchClinical<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

/**
 * SCHEMAS
 */

export interface Schema {
  id: string;
  schema_key: string;
  title: string;
  description: string;
  pillar_id: string;
  familyCount?: number;
}

export async function fetchSchemas(): Promise<{ schemas: Schema[] }> {
  return fetchClinical('/schemas');
}

export interface SchemaDetail {
  schema: Schema;
  families: Family[];
}

export async function fetchSchemaDetail(schemaId: string): Promise<SchemaDetail> {
  return fetchClinical(`/schemas/${schemaId}`);
}

/**
 * FAMILIES & MINDBLOCKS
 */

export interface Family {
  id: string;
  family_key: string;
  schema_id: string;
  title: string;
  description?: string;
  archetype?: string;
  mindblockCount?: number;
}

export interface Mindblock {
  id: string;
  mindblock_key: string;
  family_id: string;
  limiting_prediction: string;
  truth: string;
  heat: 'RED' | 'AMBER' | 'GREEN';
  kbe_stage: 'Knowing' | 'Believing' | 'Embodying';
}

export interface FamilyDetail {
  family: Family;
  mindblocks: Mindblock[];
}

export async function fetchFamilyMindblocks(familyId: string): Promise<FamilyDetail> {
  return fetchClinical(`/families/${familyId}/mindblocks`);
}

/**
 * MINDBLOCK MANAGEMENT
 */

export interface MindblockListItem {
  id: string;
  mindblock_key: string;
  family_id: string;
  limiting_prediction: string;
  truth: string;
  heat: 'RED' | 'AMBER' | 'GREEN';
  kbe_stage: 'Knowing' | 'Believing' | 'Embodying';
  notes?: string;
  created_at: string;
  updated_at: string;
  family?: {
    id: string;
    family_key: string;
    title: string;
    schema_id: string;
    schema: {
      id: string;
      schema_key: string;
      title: string;
    };
  };
}

export interface MindblockDetail extends MindblockListItem {
  navicue_targets?: Array<{
    navicue: {
      id: string;
      code: string;
      status: string;
      component_type: string;
    };
  }>;
}

export interface MindblockStats {
  total: number;
  byHeat: {
    RED: number;
    AMBER: number;
    GREEN: number;
  };
  byKBE: {
    Knowing: number;
    Believing: number;
    Embodying: number;
  };
  bySchema: Array<{
    schema_id: string;
    schema_key: string;
    title: string;
    count: number;
  }>;
}

export async function fetchMindblocksList(params?: {
  schema_id?: string;
  family_id?: string;
  heat?: 'RED' | 'AMBER' | 'GREEN';
  kbe_stage?: 'Knowing' | 'Believing' | 'Embodying';
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<{ mindblocks: MindblockListItem[]; total: number; hasMore: boolean }> {
  const queryParams = new URLSearchParams();
  if (params?.schema_id) queryParams.set('schema_id', params.schema_id);
  if (params?.family_id) queryParams.set('family_id', params.family_id);
  if (params?.heat) queryParams.set('heat', params.heat);
  if (params?.kbe_stage) queryParams.set('kbe_stage', params.kbe_stage);
  if (params?.search) queryParams.set('search', params.search);
  if (params?.limit) queryParams.set('limit', params.limit.toString());
  if (params?.offset) queryParams.set('offset', params.offset.toString());

  const url = `/mindblocks/list${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  return fetchMindblocks(url);
}

export async function fetchMindblockDetail(mindblockId: string): Promise<{ mindblock: MindblockDetail }> {
  return fetchMindblocks(`/${mindblockId}`);
}

export async function fetchMindblocksByHeat(heat: 'RED' | 'AMBER' | 'GREEN'): Promise<{ mindblocks: MindblockListItem[]; heat: string }> {
  return fetchMindblocks(`/by-heat/${heat}`);
}

export async function fetchMindblocksByKBE(kbe_stage: 'Knowing' | 'Believing' | 'Embodying'): Promise<{ mindblocks: MindblockListItem[]; kbe_stage: string }> {
  return fetchMindblocks(`/by-kbe/${kbe_stage}`);
}

export async function fetchMindblockStats(): Promise<MindblockStats> {
  return fetchMindblocks('/stats');
}

export async function saveMindblock(mindblock: {
  id?: string;
  mindblock_key: string;
  family_id: string;
  limiting_prediction: string;
  truth: string;
  heat: 'RED' | 'AMBER' | 'GREEN';
  kbe_stage: 'Knowing' | 'Believing' | 'Embodying';
  notes?: string;
}): Promise<{ mindblock: MindblockDetail; success: boolean }> {
  const response = await fetch(`${API_BASE.replace('/cc2/clinical', '/cc2/mindblocks')}/save`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mindblock),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

export async function deleteMindblock(mindblockId: string): Promise<{ success: boolean }> {
  const response = await fetch(`${API_BASE.replace('/cc2/clinical', '/cc2/mindblocks')}/${mindblockId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// Helper function for mindblock endpoints
async function fetchMindblocks(endpoint: string) {
  const response = await fetch(`${API_BASE.replace('/cc2/clinical', '/cc2/mindblocks')}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

/**
 * PROTOCOL MANAGEMENT
 */

export interface Protocol {
  protocol_id: string;
  protocol_slug: string;
  protocol_title: string;
  protocol_status: 'active' | 'draft' | 'archived';
  pillar_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ProtocolSummary extends Protocol {
  scene_count: number;
  contract_count: number;
  missing_contracts: number;
  contracts_expect_receipt: number;
  contracts_expect_checks: number;
  scenes_require_trigger: number;
  scenes_require_resistance: number;
  refreshed_at?: string;
}

export interface ProtocolIntegrityIssue {
  protocol_id: string;
  scene_number: number;
  issue: 'contract_without_scene' | 'scene_without_contract';
}

export interface ProtocolBreakdown {
  protocol_id: string;
  protocol_slug: string;
  phase: string;
  scene_type: string;
  scene_count: number;
  scenes_with_audio: number;
  scenes_require_trigger: number;
  scenes_require_resistance: number;
  contracts_expect_receipt: number;
  contracts_expect_checks: number;
}

export interface ProtocolStats {
  total_protocols: number;
  active_protocols: number;
  draft_protocols: number;
  archived_protocols: number;
  total_scenes: number;
  total_contracts: number;
  total_missing_contracts: number;
}

export async function refreshProtocolAnalytics(): Promise<{ success: boolean; timestamp: string }> {
  const response = await fetch(`${API_BASE.replace('/cc2/clinical', '/cc2/protocols')}/sync`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

export async function fetchProtocolsList(): Promise<{ protocols: Protocol[] }> {
  return fetchProtocols('/list');
}

export async function fetchActiveProtocols(): Promise<{ protocols: Protocol[] }> {
  return fetchProtocols('/active');
}

export async function fetchProtocolSummary(): Promise<{ protocols: ProtocolSummary[]; last_refreshed: string | null }> {
  return fetchProtocols('/summary');
}

export async function fetchProtocolIntegrity(protocolId: string): Promise<{ issues: ProtocolIntegrityIssue[] }> {
  return fetchProtocols(`/${protocolId}/integrity`);
}

export async function fetchProtocolBreakdown(protocolId: string): Promise<{ breakdown: ProtocolBreakdown[] }> {
  return fetchProtocols(`/${protocolId}/breakdown`);
}

export async function fetchProtocolStats(): Promise<{ stats: ProtocolStats }> {
  return fetchProtocols('/stats');
}

export async function seedSyntheticData(params?: {
  count_users?: number;
  coverage_per_mindblock?: number;
  days?: number;
  cohort_label?: string;
  with_orgs?: boolean;
  with_journeys?: boolean;
  with_notifications?: boolean;
}): Promise<{
  users_created: number;
  engagements_created: number;
  mindblocks_covered: number;
  min_engagements_per_mindblock: number;
  max_engagements_per_mindblock: number;
}> {
  const response = await fetch(`https://${projectId}.supabase.co/functions/v1/seed-synthetics`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params || {}),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// Helper function for protocol endpoints
async function fetchProtocols(endpoint: string) {
  const response = await fetch(`${API_BASE.replace('/cc2/clinical', '/cc2/protocols')}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

/**
 * PRIMITIVES
 */

export interface Primitive {
  id: string;
  name: string;
  definition: string;
  move_key: string;
  color: string;
  usageCount?: number;
}

export async function fetchPrimitives(): Promise<{ primitives: Primitive[] }> {
  return fetchClinical('/primitives');
}

/**
 * VOICES
 */

export interface Voice {
  id: string;
  name: string;
  stance: string;
  guidance_mode_key: string;
  color: string;
  usageCount?: number;
}

export async function fetchVoices(): Promise<{ voices: Voice[] }> {
  return fetchClinical('/voices');
}

/**
 * HEAT × KBE MATRIX
 */

export interface HeatKbeMatrix {
  matrix: {
    RED: { Knowing: number; Believing: number; Embodying: number };
    AMBER: { Knowing: number; Believing: number; Embodying: number };
    GREEN: { Knowing: number; Believing: number; Embodying: number };
  };
}

export async function fetchHeatKbeMatrix(): Promise<HeatKbeMatrix> {
  return fetchClinical('/heat-kbe-matrix');
}

/**
 * NAVICUES
 */

export interface NaviCueListItem {
  id: string;
  code: string;
  status: 'draft' | 'review' | 'active' | 'archived';
  kbe_layer: 'learn' | 'believe' | 'live';
  tier: string;
  family: string;
  primary_schema_id: string;
  component_type: string;
  default_response_type: string;
  intent: string;
  tags: string[];
  guidance_mode_key: string;
  state_band: 'calm' | 'activated' | 'overwhelmed';
  updated_at: string;
  primary_targets: any;
  default_variants: any;
}

export interface NaviCueDetail {
  navicue: {
    id: string;
    code: string;
    status: string;
    steps: any[];
    variants: any[];
    targets: any[];
    [key: string]: any;
  };
}

export interface NaviCueListResponse {
  navicues: NaviCueListItem[];
  count: number;
  offset: number;
  limit: number;
  hasMore: boolean;
}

export interface NaviCuesByArchetype {
  archetype: string;
  navicues: NaviCueListItem[];
  count: number;
}

export async function fetchNaviCuesByArchetype(archetype: string): Promise<NaviCuesByArchetype> {
  return fetchClinical(`/navicues/by-archetype/${archetype}`);
}

export async function fetchNaviCueDetail(navicueId: string): Promise<NaviCueDetail> {
  return fetchClinical(`/navicues/${navicueId}`);
}

export interface NaviCueListOptions {
  status?: 'draft' | 'review' | 'active' | 'archived';
  limit?: number;
  offset?: number;
  kbe_layer?: 'learn' | 'believe' | 'live';
  state_band?: 'calm' | 'activated' | 'overwhelmed';
  guidance_mode?: string;
}

export async function fetchNaviCuesList(options: NaviCueListOptions = {}): Promise<NaviCueListResponse> {
  const params = new URLSearchParams();
  
  if (options.status) params.set('status', options.status);
  if (options.limit) params.set('limit', options.limit.toString());
  if (options.offset) params.set('offset', options.offset.toString());
  if (options.kbe_layer) params.set('kbe_layer', options.kbe_layer);
  if (options.state_band) params.set('state_band', options.state_band);
  if (options.guidance_mode) params.set('guidance_mode', options.guidance_mode);

  const query = params.toString();
  return fetchClinical(`/navicues/list${query ? `?${query}` : ''}`);
}

/**
 * TARGET OPTIONS
 */

export interface TargetOption {
  scope_type: 'schema' | 'family' | 'mindblock' | 'pillar' | 'concept' | 'theme';
  id: string;
  key: string;
  title: string;
  parent_id?: string;
  metadata?: any;
}

export async function fetchTargetOptions(): Promise<{ options: TargetOption[] }> {
  return fetchClinical('/target-options');
}

/**
 * WRITE OPERATIONS
 */

export interface NaviCueSavePayload {
  navicue: {
    id?: string;
    code: string;
    status: 'draft' | 'review' | 'active' | 'archived';
    kbe_layer: 'learn' | 'believe' | 'live';
    tier: 'hot' | 'warm' | 'cool';
    family?: string;
    primary_schema_id: string;
    component_type: string;
    default_response_type: string;
    intent?: string;
    safety_notes?: string;
    config?: any;
    analytics_config?: any;
    tags?: string[];
    guidance_mode_key: string;
    state_band?: 'calm' | 'activated' | 'overwhelmed';
    receipt_type_keys?: string[];
    real_life_check_keys?: string[];
  };
  steps: Array<{
    step_index: number;
    component_type: string;
    response_type: string;
    config?: any;
  }>;
  variants: Array<{
    lens: string;
    language: string;
    copy: any;
    is_default: boolean;
    version: number;
  }>;
  targets: Array<{
    scope_type: 'schema' | 'family' | 'mindblock' | 'pillar' | 'concept' | 'theme';
    schema_id?: string;
    family_id?: string;
    mindblock_id?: string;
    pillar_id?: string;
    concept_id?: string;
    theme_id?: string;
    weight: number;
    is_primary: boolean;
  }>;
}

export async function saveNaviCue(payload: NaviCueSavePayload): Promise<{ id: string; success: boolean }> {
  const response = await fetch(`${API_BASE}/navicues/save`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

export async function archiveNaviCue(navicueId: string): Promise<{ success: boolean }> {
  const response = await fetch(`${API_BASE}/navicues/${navicueId}/archive`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

export async function cloneNaviCue(sourceId: string, newCode: string): Promise<{ id: string; success: boolean }> {
  const response = await fetch(`${API_BASE}/navicues/${sourceId}/clone`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newCode }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

export async function refreshMaterializedView(concurrent: boolean = true): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_BASE}/refresh-matview`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ concurrent }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

/**
 * EXAMPLE USAGE:
 * 
 * ```typescript
 * // Get all schemas
 * const { schemas } = await fetchSchemas();
 * 
 * // Get schema with families
 * const { schema, families } = await fetchSchemaDetail('schema-id');
 * 
 * // Get family with mindblocks
 * const { family, mindblocks } = await fetchFamilyMindblocks('family-id');
 * 
 * // Get primitives with usage stats
 * const { primitives } = await fetchPrimitives();
 * 
 * // Get NaviCues by archetype
 * const { navicues } = await fetchNaviCuesByArchetype('panic-state');
 * 
 * // Get paginated NaviCues list
 * const result = await fetchNaviCuesList({
 *   status: 'active',
 *   kbe_layer: 'live',
 *   limit: 20
 * });
 * 
 * // CREATE NaviCue
 * const { id } = await saveNaviCue({
 *   navicue: {
 *     code: 'NAV-TEST-001',
 *     status: 'draft',
 *     kbe_layer: 'learn',
 *     tier: 'warm',
 *     primary_schema_id: 'schema-uuid',
 *     component_type: 'statement_mirror',
 *     default_response_type: 'text_1line',
 *     guidance_mode_key: 'clinician_direct',
 *     tags: ['anxiety', 'panic']
 *   },
 *   steps: [
 *     { step_index: 1, component_type: 'statement_mirror', response_type: 'text_1line' }
 *   ],
 *   variants: [
 *     { lens: 'therapist', language: 'en', copy: { prompt: 'What brings you here?' }, is_default: true, version: 1 }
 *   ],
 *   targets: [
 *     { scope_type: 'schema', schema_id: 'schema-uuid', weight: 1.0, is_primary: true }
 *   ]
 * });
 * 
 * // ARCHIVE NaviCue
 * await archiveNaviCue('navicue-id');
 * 
 * // CLONE NaviCue
 * const { id: clonedId } = await cloneNaviCue('source-id', 'NAV-CLONE-001');
 * 
 * // REFRESH Materialized View (after bulk edits)
 * await refreshMaterializedView();
 * ```
 */