/**
 * Journey V2 API Client (KV Store Version)
 * 
 * Refactored to use the KV store instead of custom database tables.
 * All data is stored as JSON in the key-value store.
 */

import { projectId, publicAnonKey } from './supabase/info';

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a`;

// ============================================================================
// TYPES
// ============================================================================

export interface Block {
  id: string;
  
  // Hierarchy
  pillar_id: string;
  pillar_name: string;
  concept_id: string;
  concept_name: string;
  theme_id: string;
  theme_name?: string;
  
  // THE ANCHOR (Layer 1 - the tool they collect)
  anchor: string;
  
  // CONTEXTUAL HEADLINES (Layer 2 - fresh per ERA phase)
  era_headlines?: {
    experience: string;
    recognize: string;
    align: string;
  };
  
  // ANCHOR GUIDES (Layer 3 - practical daily instructions)
  anchor_guides?: {
    experience: string;
    recognize: string;
    align: string;
  };
  
  // Legacy/Supporting
  title: string;
  subtitle?: string;
  description?: string;
  
  // ENHANCED: Scenes-based structure (replaces flat instructions array)
  scenes?: JourneyScene[];
  
  // LEGACY: Old instructions format (for backward compatibility)
  instructions?: DayInstruction[];
  
  duration_days?: number;
  difficulty_level?: 'beginner' | 'intermediate' | 'advanced';
  status?: 'draft' | 'published' | 'archived';
  created_at?: string;
  updated_at?: string;
  published_at?: string;
}

export interface JourneyScene {
  sequence: number;
  type: SceneType;
  
  // Core fields
  phase?: 'Experience' | 'Recognize' | 'Align' | 'Integrate';
  headline?: string;
  context?: string;
  instruction?: string;
  anchor_integration?: string;
  anchor_guide?: string;
  anchor_reveal?: string;
  
  // Bridge-specific
  transition_context?: string;
  next_headline?: string;
  science_foundation?: string;
  identity_foundation?: string;
  
  // Reflection-specific
  reflection_prompts?: string[];
  
  // Integration-specific
  headline_weaving?: string;
  assessment_questions?: AssessmentQuestion[];
  
  // Cue-specific
  focus_reminder?: string;
  
  // Supporting
  focus?: string;
  duration_minutes?: number;
  toolkit_tags?: string[];
  cta_text?: string;
  cta_focus?: string;
}

export type SceneType = 
  | 'introduction'
  | 'experience_teaching' | 'experience_cue' | 'experience_reflection'
  | 'bridge_e_to_r'
  | 'recognize_teaching' | 'recognize_cue' | 'recognize_reflection'
  | 'bridge_r_to_a'
  | 'align_teaching' | 'align_cue' | 'align_reflection'
  | 'integration';

export interface AssessmentQuestion {
  question: string;
  type: 'scale' | 'binary' | 'text';
  scale_type?: 'confidence' | 'shift' | 'contentment' | 'belief';
  min_label?: string;
  max_label?: string;
}

// LEGACY: Old instruction format (for backward compatibility)
export interface DayInstruction {
  day: number;
  sequence: number;
  title: string;
  phase: 'Experience' | 'Recognize' | 'Align' | 'Integrate';
  context: string;
  instruction: string;
  focus: string;
  duration_minutes: number;
  toolkit_tags?: string[];
  send_off_message?: string;
  reflection_prompts?: string[];
}

export interface BlockAssignment {
  id: string;
  rehab_id: string;
  patient_id: string;
  block_id: string;
  status: 'active' | 'completed' | 'skipped';
  current_day: number;
  completion_percentage: number;
  assigned_at: string;
  started_at?: string;
  completed_at?: string;
  last_interaction_at?: string;
}

export interface JourneyEvent {
  id: string;
  rehab_id: string;
  patient_id: string;
  block_id: string;
  assignment_id: string;
  event_type: string;
  event_data?: any;
  day_number?: number;
  session_duration_seconds?: number;
  created_at: string;
}

// ============================================================================
// BLOCK OPERATIONS
// ============================================================================

/**
 * Fetch a specific block by ID (from KV store)
 */
export async function fetchBlock(blockId: string): Promise<Block | null> {
  try {
    console.log('📡 Fetching block:', blockId);
    const url = `${SERVER_URL}/journey/blocks/${blockId}`;
    console.log('📡 Request URL:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error fetching block - Status:', response.status);
      console.error('❌ Error fetching block - Response:', errorText);
      return null;
    }

    const data = await response.json();
    console.log('✅ Block fetched successfully:', { 
      hasBlock: !!data.block, 
      blockId: data.block?.id,
      hasScenes: !!data.block?.scenes,
      sceneCount: data.block?.scenes?.length,
      hasInstructions: !!data.block?.instructions,
      instructionCount: data.block?.instructions?.length
    });
    return data.block || null;
  } catch (err) {
    console.error('❌ Exception fetching block:', err);
    return null;
  }
}

// ============================================================================
// ASSIGNMENT OPERATIONS
// ============================================================================

/**
 * Get current assignment for a patient
 */
export async function getCurrentAssignment(
  rehabId: string,
  patientId: string,
  accessToken: string
): Promise<BlockAssignment | null> {
  try {
    const response = await fetch(`${SERVER_URL}/journey/assignments/${rehabId}/${patientId}/current`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    // 404 is expected when no assignment exists - don't log as error
    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      console.error('Error getting current assignment:', await response.text());
      return null;
    }

    const data = await response.json();
    return data.assignment || null;
  } catch (err) {
    console.error('Exception getting current assignment:', err);
    return null;
  }
}

/**
 * Start a new block assignment
 */
export async function startAssignment(
  rehabId: string,
  patientId: string,
  blockId: string,
  accessToken: string
): Promise<BlockAssignment | null> {
  try {
    console.log('📤 POST /journey/assignments with:', { rehab_id: rehabId, patient_id: patientId, block_id: blockId });
    
    const response = await fetch(`${SERVER_URL}/journey/assignments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rehab_id: rehabId, patient_id: patientId, block_id: blockId }),
    });

    console.log('📥 Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error starting assignment - Status:', response.status);
      console.error('❌ Error starting assignment - Response:', errorText);
      return null;
    }

    const data = await response.json();
    console.log('✅ Assignment created:', {
      hasAssignment: !!data,
      assignmentId: data?.id,
      current_day: data?.current_day,
      status: data?.status
    });
    return data || null;
  } catch (err) {
    console.error('❌ Exception starting assignment:', err);
    return null;
  }
}

/**
 * Advance to the next day
 */
export async function advanceDay(
  assignmentId: string,
  accessToken: string
): Promise<BlockAssignment | null> {
  try {
    const response = await fetch(`${SERVER_URL}/journey/assignments/${assignmentId}/advance`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Error advancing day:', await response.text());
      return null;
    }

    const data = await response.json();
    return data.assignment || null;
  } catch (err) {
    console.error('Exception advancing day:', err);
    return null;
  }
}

/**
 * Complete an assignment
 */
export async function completeAssignment(
  assignmentId: string,
  accessToken: string
): Promise<BlockAssignment | null> {
  try {
    const response = await fetch(`${SERVER_URL}/journey/assignments/${assignmentId}/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Error completing assignment:', await response.text());
      return null;
    }

    const data = await response.json();
    return data.assignment || null;
  } catch (err) {
    console.error('Exception completing assignment:', err);
    return null;
  }
}

// ============================================================================
// EVENT LOGGING
// ============================================================================

/**
 * Log a Journey event (for ML training)
 */
export async function logEvent(
  rehabId: string,
  patientId: string,
  blockId: string,
  assignmentId: string,
  eventType: string,
  eventData?: any,
  dayNumber?: number,
  sessionDurationSeconds?: number,
  accessToken?: string
): Promise<boolean> {
  try {
    const response = await fetch(`${SERVER_URL}/journey/events`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken || publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rehab_id: rehabId,
        patient_id: patientId,
        block_id: blockId,
        assignment_id: assignmentId,
        event_type: eventType,
        event_data: eventData,
        day_number: dayNumber,
        session_duration_seconds: sessionDurationSeconds,
      }),
    });

    return response.ok;
  } catch (err) {
    console.error('Exception logging event:', err);
    return false;
  }
}

// ============================================================================
// CONVENIENCE ALIASES (for backward compatibility)
// ============================================================================

export const startBlockAssignment = startAssignment;
export const completeDayInAssignment = advanceDay;
export const completeBlockAssignment = completeAssignment;
export const logJourneyEvent = logEvent;

// ============================================================================
// ERA HELPER FUNCTIONS
// ============================================================================

/**
 * Get human-readable name for ERA day
 */
export function getERADayName(dayKey: string): string {
  const names: Record<string, string> = {
    'mon_seed': 'Monday: Seed',
    'tue_embody': 'Tuesday: Embody',
    'wed_root': 'Wednesday: Root',
    'thu_adapt': 'Thursday: Adapt',
    'fri_lens': 'Friday: Lens',
    'sat_integrate': 'Saturday: Integrate',
    'sun_reflect': 'Sunday: Reflect',
  };
  return names[dayKey] || 'Unknown Day';
}

/**
 * Get ERA phase for a day
 */
export function getERAPhase(dayKey: string): 'Experience' | 'Recognize' | 'Align' | 'Integrate' {
  const phases: Record<string, 'Experience' | 'Recognize' | 'Align' | 'Integrate'> = {
    'mon_seed': 'Experience',
    'tue_embody': 'Experience',
    'wed_root': 'Recognize',
    'thu_adapt': 'Recognize',
    'fri_lens': 'Align',
    'sat_integrate': 'Align',
    'sun_reflect': 'Integrate',
  };
  return phases[dayKey] || 'Experience';
}

/**
 * Get ERA day key from index (0-6)
 */
export function getERADayKey(dayIndex: number): string {
  const keys = ['mon_seed', 'tue_embody', 'wed_root', 'thu_adapt', 'fri_lens', 'sat_integrate', 'sun_reflect'];
  return keys[dayIndex] || 'mon_seed';
}