/**
 * CC2 INDIVIDUAL DATA API CLIENT
 * TypeScript client for individual-level patient data
 */

import { projectId, publicAnonKey } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/cc2/individuals`;

export interface Individual {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  organization_id: string | null;
  status: 'active' | 'inactive' | 'paused' | 'graduated';
  created_at: string;
  updated_at: string;
  metadata: any;
  organizations?: {
    id: string;
    name: string;
    organization_type?: string;
  };
}

export interface EngagementMetrics {
  total_engagements: number;
  navicue_responses: number;
  navicue_response_rate: number;
  avg_latency: number;
  helpful_rate: number;
  state_checkin_count: number;
  proofs_collected: number;
  transfer_tests: number;
}

export interface StateCheckin {
  energy: number;
  clarity: number;
  connection: number;
  notes: string | null;
  created_at: string;
}

export interface ContextDetection {
  context_key: string;
  confidence: number;
  source: string;
  created_at: string;
}

export interface Proof {
  outcome: string;
  content_kind: string;
  friction: string | null;
  evidence: any;
  created_at: string;
}

export interface TransferTest {
  outcome: string;
  content_kind: string;
  friction: string | null;
  evidence: any;
  created_at: string;
}

export interface IndividualDetail {
  profile: Individual;
  metrics: EngagementMetrics;
  current_journey: any;
  recent_state: StateCheckin[];
  recent_context: ContextDetection[];
  recent_proofs: Proof[];
  transfer_tests: TransferTest[];
}

export interface TimelineEvent {
  type: 'event' | 'navicue' | 'scene' | 'state';
  timestamp: string;
  [key: string]: any;
}

export interface SchemaFocus {
  schema_id: string;
  schema_key: string;
  title: string;
  count: number;
}

export interface FamilyFocus {
  family_id: string;
  family_key: string;
  title: string;
  schema_key: string;
  count: number;
}

export interface MindblockFocus {
  mindblock_id: string;
  mindblock_key: string;
  heat: 'RED' | 'AMBER' | 'GREEN';
  kbe_stage: 'Knowing' | 'Believing' | 'Embodying';
  family_key: string;
  count: number;
}

export interface IndividualStats {
  total: number;
  byStatus: {
    active: number;
    inactive: number;
    paused: number;
    graduated: number;
  };
}

/**
 * Fetch individuals list with filters
 */
export async function fetchIndividualsList(params?: {
  organization_id?: string;
  professional_id?: string;
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<{
  individuals: Individual[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}> {
  const searchParams = new URLSearchParams();
  
  if (params?.organization_id) searchParams.set('organization_id', params.organization_id);
  if (params?.professional_id) searchParams.set('professional_id', params.professional_id);
  if (params?.status) searchParams.set('status', params.status);
  if (params?.search) searchParams.set('search', params.search);
  if (params?.limit) searchParams.set('limit', params.limit.toString());
  if (params?.offset) searchParams.set('offset', params.offset.toString());

  const url = `${API_BASE}/list?${searchParams.toString()}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}: Failed to fetch individuals list`);
  }

  return response.json();
}

/**
 * Fetch comprehensive individual detail
 */
export async function fetchIndividualDetail(id: string): Promise<IndividualDetail> {
  const response = await fetch(`${API_BASE}/${id}`, {
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}: Failed to fetch individual detail`);
  }

  return response.json();
}

/**
 * Fetch individual activity timeline
 */
export async function fetchIndividualTimeline(
  id: string,
  limit?: number
): Promise<{ timeline: TimelineEvent[] }> {
  const url = limit 
    ? `${API_BASE}/${id}/timeline?limit=${limit}`
    : `${API_BASE}/${id}/timeline`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}: Failed to fetch timeline`);
  }

  return response.json();
}

/**
 * Fetch individual schema/mindblock focus analysis
 */
export async function fetchIndividualSchemaFocus(id: string): Promise<{
  schemas: SchemaFocus[];
  families: FamilyFocus[];
  mindblocks: MindblockFocus[];
}> {
  const response = await fetch(`${API_BASE}/${id}/schema-focus`, {
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}: Failed to fetch schema focus`);
  }

  return response.json();
}

/**
 * Fetch individual statistics
 */
export async function fetchIndividualStats(params?: {
  organization_id?: string;
}): Promise<{ stats: IndividualStats }> {
  const url = params?.organization_id
    ? `${API_BASE}/stats?organization_id=${params.organization_id}`
    : `${API_BASE}/stats`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}: Failed to fetch individual stats`);
  }

  return response.json();
}
