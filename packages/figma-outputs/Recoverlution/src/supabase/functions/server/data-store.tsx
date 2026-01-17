/**
 * Data Store - Replaces kv_store with proper table-based storage
 * 
 * This module provides data persistence using actual Supabase tables
 * instead of the Figma Make-specific kv_store.
 * 
 * Note: Tables should be created in your Supabase project:
 * - dialogue_sessions
 * - anchor_points
 * - journey_blocks
 * - journey_assignments
 * - patient_profiles
 * - therapist_profiles
 * - conversation_sessions
 * - reflections
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const getClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
};

// ============================================================================
// DIALOGUE SESSIONS
// ============================================================================

export const saveDialogueSession = async (sessionId: string, data: any): Promise<void> => {
  const supabase = getClient();
  const { error } = await supabase
    .from('dialogue_sessions')
    .upsert({
      session_id: sessionId,
      data: data,
      updated_at: new Date().toISOString()
    });
  
  if (error) {
    console.error('Error saving dialogue session:', error);
    throw new Error(`Failed to save dialogue session: ${error.message}`);
  }
};

export const getDialogueSession = async (sessionId: string): Promise<any | null> => {
  const supabase = getClient();
  const { data, error } = await supabase
    .from('dialogue_sessions')
    .select('data')
    .eq('session_id', sessionId)
    .maybeSingle();
  
  if (error) {
    console.error('Error getting dialogue session:', error);
    throw new Error(`Failed to get dialogue session: ${error.message}`);
  }
  
  return data?.data || null;
};

// ============================================================================
// ANCHOR POINTS
// ============================================================================

export const saveAnchorPoint = async (anchorPointId: string, data: any): Promise<void> => {
  const supabase = getClient();
  const { error } = await supabase
    .from('anchor_points')
    .upsert({
      anchor_point_id: anchorPointId,
      user_id: data.userId,
      text: data.text,
      mode: data.mode,
      timestamp: data.timestamp,
      metadata: data
    });
  
  if (error) {
    console.error('Error saving anchor point:', error);
    throw new Error(`Failed to save anchor point: ${error.message}`);
  }
};

export const getUserAnchorPoints = async (userId: string): Promise<string[]> => {
  const supabase = getClient();
  const { data, error } = await supabase
    .from('anchor_points')
    .select('anchor_point_id')
    .eq('user_id', userId)
    .order('timestamp', { ascending: false });
  
  if (error) {
    console.error('Error getting user anchor points:', error);
    throw new Error(`Failed to get user anchor points: ${error.message}`);
  }
  
  return data?.map(ap => ap.anchor_point_id) || [];
};

// ============================================================================
// JOURNEY BLOCKS
// ============================================================================

export const saveJourneyBlock = async (blockId: string, data: any): Promise<void> => {
  const supabase = getClient();
  const { error } = await supabase
    .from('journey_blocks')
    .upsert({
      block_id: blockId,
      data: data,
      updated_at: new Date().toISOString()
    });
  
  if (error) {
    console.error('Error saving journey block:', error);
    throw new Error(`Failed to save journey block: ${error.message}`);
  }
};

export const getJourneyBlock = async (blockId: string): Promise<any | null> => {
  const supabase = getClient();
  const { data, error } = await supabase
    .from('journey_blocks')
    .select('data')
    .eq('block_id', blockId)
    .maybeSingle();
  
  if (error) {
    console.error('Error getting journey block:', error);
    throw new Error(`Failed to get journey block: ${error.message}`);
  }
  
  return data?.data || null;
};

// ============================================================================
// JOURNEY ASSIGNMENTS
// ============================================================================

export const saveAssignment = async (assignmentId: string, data: any): Promise<void> => {
  const supabase = getClient();
  const { error } = await supabase
    .from('journey_assignments')
    .upsert({
      assignment_id: assignmentId,
      rehab_id: data.rehab_id,
      patient_id: data.patient_id,
      block_id: data.block_id,
      data: data,
      updated_at: new Date().toISOString()
    });
  
  if (error) {
    console.error('Error saving assignment:', error);
    throw new Error(`Failed to save assignment: ${error.message}`);
  }
};

export const getAssignment = async (assignmentId: string): Promise<any | null> => {
  const supabase = getClient();
  const { data, error } = await supabase
    .from('journey_assignments')
    .select('data')
    .eq('assignment_id', assignmentId)
    .maybeSingle();
  
  if (error) {
    console.error('Error getting assignment:', error);
    throw new Error(`Failed to get assignment: ${error.message}`);
  }
  
  return data?.data || null;
};

export const getCurrentAssignment = async (rehabId: string, patientId: string): Promise<string | null> => {
  const supabase = getClient();
  const { data, error } = await supabase
    .from('journey_assignments')
    .select('assignment_id')
    .eq('rehab_id', rehabId)
    .eq('patient_id', patientId)
    .eq('is_current', true)
    .maybeSingle();
  
  if (error) {
    console.error('Error getting current assignment:', error);
    throw new Error(`Failed to get current assignment: ${error.message}`);
  }
  
  return data?.assignment_id || null;
};

export const setCurrentAssignment = async (rehabId: string, patientId: string, assignmentId: string): Promise<void> => {
  const supabase = getClient();
  
  // First, mark all other assignments as not current
  await supabase
    .from('journey_assignments')
    .update({ is_current: false })
    .eq('rehab_id', rehabId)
    .eq('patient_id', patientId);
  
  // Then mark this one as current
  const { error } = await supabase
    .from('journey_assignments')
    .update({ is_current: true })
    .eq('assignment_id', assignmentId);
  
  if (error) {
    console.error('Error setting current assignment:', error);
    throw new Error(`Failed to set current assignment: ${error.message}`);
  }
};

export const deleteAssignment = async (assignmentId: string): Promise<void> => {
  const supabase = getClient();
  const { error } = await supabase
    .from('journey_assignments')
    .delete()
    .eq('assignment_id', assignmentId);
  
  if (error) {
    console.error('Error deleting assignment:', error);
    throw new Error(`Failed to delete assignment: ${error.message}`);
  }
};

// ============================================================================
// PATIENT PROFILES
// ============================================================================

export const savePatient = async (patientId: string, data: any): Promise<void> => {
  const supabase = getClient();
  const { error } = await supabase
    .from('patient_profiles')
    .upsert({
      patient_id: patientId,
      email: data.email,
      name: data.name,
      rehab_id: data.rehabId,
      data: data,
      updated_at: new Date().toISOString()
    });
  
  if (error) {
    console.error('Error saving patient:', error);
    throw new Error(`Failed to save patient: ${error.message}`);
  }
};

export const getPatient = async (patientId: string): Promise<any | null> => {
  const supabase = getClient();
  const { data, error } = await supabase
    .from('patient_profiles')
    .select('data')
    .eq('patient_id', patientId)
    .maybeSingle();
  
  if (error) {
    console.error('Error getting patient:', error);
    throw new Error(`Failed to get patient: ${error.message}`);
  }
  
  return data?.data || null;
};

export const getPatientByEmail = async (email: string): Promise<string | null> => {
  const supabase = getClient();
  const { data, error } = await supabase
    .from('patient_profiles')
    .select('patient_id')
    .eq('email', email)
    .maybeSingle();
  
  if (error) {
    console.error('Error getting patient by email:', error);
    throw new Error(`Failed to get patient by email: ${error.message}`);
  }
  
  return data?.patient_id || null;
};

// ============================================================================
// THERAPIST PROFILES
// ============================================================================

export const saveTherapist = async (therapistId: string, data: any): Promise<void> => {
  const supabase = getClient();
  const { error } = await supabase
    .from('therapist_profiles')
    .upsert({
      therapist_id: therapistId,
      email: data.email,
      practice_name: data.practiceName,
      data: data,
      updated_at: new Date().toISOString()
    });
  
  if (error) {
    console.error('Error saving therapist:', error);
    throw new Error(`Failed to save therapist: ${error.message}`);
  }
};

export const getTherapist = async (therapistId: string): Promise<any | null> => {
  const supabase = getClient();
  const { data, error } = await supabase
    .from('therapist_profiles')
    .select('data')
    .eq('therapist_id', therapistId)
    .maybeSingle();
  
  if (error) {
    console.error('Error getting therapist:', error);
    throw new Error(`Failed to get therapist: ${error.message}`);
  }
  
  return data?.data || null;
};

// ============================================================================
// CONVERSATION SESSIONS
// ============================================================================

export const saveConversationSession = async (sessionId: string, data: any): Promise<void> => {
  const supabase = getClient();
  const { error } = await supabase
    .from('conversation_sessions')
    .upsert({
      session_id: sessionId,
      data: data,
      updated_at: new Date().toISOString()
    });
  
  if (error) {
    console.error('Error saving conversation session:', error);
    throw new Error(`Failed to save conversation session: ${error.message}`);
  }
};

export const getConversationSession = async (sessionId: string): Promise<any | null> => {
  const supabase = getClient();
  const { data, error } = await supabase
    .from('conversation_sessions')
    .select('data')
    .eq('session_id', sessionId)
    .maybeSingle();
  
  if (error) {
    console.error('Error getting conversation session:', error);
    throw new Error(`Failed to get conversation session: ${error.message}`);
  }
  
  return data?.data || null;
};

// ============================================================================
// REFLECTIONS
// ============================================================================

export const saveReflection = async (reflectionId: string, data: any): Promise<void> => {
  const supabase = getClient();
  const { error } = await supabase
    .from('reflections')
    .upsert({
      reflection_id: reflectionId,
      assignment_id: data.assignmentId,
      data: data,
      created_at: new Date().toISOString()
    });
  
  if (error) {
    console.error('Error saving reflection:', error);
    throw new Error(`Failed to save reflection: ${error.message}`);
  }
};

export const getReflection = async (reflectionId: string): Promise<any | null> => {
  const supabase = getClient();
  const { data, error } = await supabase
    .from('reflections')
    .select('data')
    .eq('reflection_id', reflectionId)
    .maybeSingle();
  
  if (error) {
    console.error('Error getting reflection:', error);
    throw new Error(`Failed to get reflection: ${error.message}`);
  }
  
  return data?.data || null;
};
