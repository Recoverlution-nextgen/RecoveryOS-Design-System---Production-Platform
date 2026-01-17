/**
 * Supabase API Utilities
 * Connects to Recoverlution's Journey backend
 * 
 * Architecture:
 * - Catalog endpoints (read-only): pillars, concepts, themes, blocks
 * - Runtime endpoints (read/write): state_checkins, block_assignments, events
 * - LUMA edge function: intelligent "what next?" recommendations
 */

import { projectId, publicAnonKey } from './info';

// Supabase configuration
const SB_REF = 'wzeqlkbmqxlsjryidagf';
const REST_BASE = `https://${SB_REF}.supabase.co/rest/v1`;
const LUMA_URL = `https://${SB_REF}.supabase.co/functions/v1/make-server-49b28b8a/luma`;

// Type definitions based on backend schema
export interface Pillar {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

export interface Concept {
  id: string;
  pillar_id: string;
  name: string;
  description?: string;
}

export interface Theme {
  id: string;
  concept_id: string;
  name: string;
  description?: string;
}

export interface Block {
  id: string;
  name: string;
  description: string;
  theme_id: string;
  day_type: string[];
  era: {
    mon_seed?: string;
    tue_embody?: string;
    wed_root?: string;
    thu_adapt?: string;
    fri_lens?: string;
    sat_integrate?: string;
    sun_reflect?: string;
  };
  measures?: any;
  context_tags?: string[];
  skill_tags?: string[];
  explore_weight?: number;
  effectiveness_score?: number;
  completion_rate?: number;
  status?: string;
}

export interface StateCheckin {
  rehab_id: string;
  user_id: string;
  tempo: number;
  flow: number;
  sync: number;
  notes?: string;
}

export interface BlockAssignment {
  rehab_id: string;
  user_id: string;
  block_id: string;
  phase: 'experience' | 'recognize' | 'align';
  status: 'pending' | 'active' | 'completed' | 'skipped' | 'abandoned';
  days_completed?: number;
  assigned_at?: string;
  started_at?: string;
  completed_at?: string;
}

export interface Event {
  rehab_id: string;
  user_id: string;
  kind: string;
  data: any;
}

export interface LUMAResponse {
  next: Block | null;
  whyNow: string;
  state: {
    tempo: number;
    flow: number;
    sync: number;
    timestamp: string;
  } | null;
}

// Helper to create headers with auth token
function createHeaders(authToken?: string): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'apikey': publicAnonKey,
    'Prefer': 'return=representation',
  };
  
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  
  return headers;
}

// ====================
// CATALOG ENDPOINTS (Read-only)
// ====================

export async function getPillars(authToken?: string): Promise<Pillar[]> {
  const response = await fetch(`${REST_BASE}/pillars`, {
    headers: createHeaders(authToken),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch pillars: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getConcepts(pillarId: string, authToken?: string): Promise<Concept[]> {
  const response = await fetch(`${REST_BASE}/concepts?pillar_id=eq.${pillarId}`, {
    headers: createHeaders(authToken),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch concepts: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getThemes(conceptId: string, authToken?: string): Promise<Theme[]> {
  const response = await fetch(`${REST_BASE}/themes?concept_id=eq.${conceptId}`, {
    headers: createHeaders(authToken),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch themes: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getBlock(blockId: string, authToken?: string): Promise<Block> {
  const response = await fetch(`${REST_BASE}/blocks?id=eq.${blockId}`, {
    headers: createHeaders(authToken),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch block: ${response.statusText}`);
  }
  
  const blocks = await response.json();
  if (!blocks || blocks.length === 0) {
    throw new Error(`Block not found: ${blockId}`);
  }
  
  return blocks[0];
}

// ====================
// RUNTIME ENDPOINTS (Read/Write)
// ====================

export async function addStateCheckin(
  checkin: StateCheckin,
  authToken: string
): Promise<void> {
  const response = await fetch(`${REST_BASE}/state_logs`, {
    method: 'POST',
    headers: createHeaders(authToken),
    body: JSON.stringify(checkin),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to add state checkin: ${response.statusText}`);
  }
}

export async function markStepDone(
  rehabId: string,
  userId: string,
  blockId: string,
  phase: 'experience' | 'recognize' | 'align',
  authToken: string
): Promise<void> {
  const response = await fetch(
    `${REST_BASE}/block_assignments?rehab_id=eq.${rehabId}&user_id=eq.${userId}&block_id=eq.${blockId}&phase=eq.${phase}`,
    {
      method: 'PATCH',
      headers: createHeaders(authToken),
      body: JSON.stringify({
        status: 'completed',
        completed_at: new Date().toISOString(),
      }),
    }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to mark step done: ${response.statusText}`);
  }
}

export async function logEvent(
  event: Event,
  authToken: string
): Promise<void> {
  const response = await fetch(`${REST_BASE}/events`, {
    method: 'POST',
    headers: createHeaders(authToken),
    body: JSON.stringify(event),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to log event: ${response.statusText}`);
  }
}

// ====================
// LUMA EDGE FUNCTION
// ====================

export async function getLUMANext(
  rehabId: string,
  userId: string,
  phase: 'experience' | 'recognize' | 'align',
  context?: any,
  authToken?: string
): Promise<LUMAResponse> {
  const response = await fetch(LUMA_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authToken ? `Bearer ${authToken}` : '',
    },
    body: JSON.stringify({
      rehab_id: rehabId,
      user_id: userId,
      phase,
      context,
    }),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[LUMA API] Request failed:`, errorText);
    throw new Error(`LUMA request failed: ${response.statusText}`);
  }
  
  return response.json();
}

// ====================
// HELPER FUNCTIONS
// ====================

/**
 * Get current ERA phase based on day of week
 * Mon/Tue = Experience
 * Wed/Thu = Recognize
 * Fri/Sat = Align
 * Sun = Mirror (special Sunday reflection)
 */
export function getCurrentPhase(): 'experience' | 'recognize' | 'align' | 'mirror' {
  const day = new Date().getDay();
  
  if (day === 1 || day === 2) return 'experience'; // Mon, Tue
  if (day === 3 || day === 4) return 'recognize'; // Wed, Thu
  if (day === 5 || day === 6) return 'align'; // Fri, Sat
  return 'mirror'; // Sun
}

/**
 * Get the specific day instruction from ERA block
 */
export function getDayInstruction(block: Block): string {
  const day = new Date().getDay();
  
  switch (day) {
    case 1: return block.era.mon_seed || '';
    case 2: return block.era.tue_embody || '';
    case 3: return block.era.wed_root || '';
    case 4: return block.era.thu_adapt || '';
    case 5: return block.era.fri_lens || '';
    case 6: return block.era.sat_integrate || '';
    case 0: return block.era.sun_reflect || '';
    default: return block.era.mon_seed || '';
  }
}
