/**
 * ST49: Patient Data Infrastructure (Supabase Integration)
 * Types and utilities for patient management, micro-block tracking, and journey progression
 * 
 * UPDATED: Now uses Supabase backend instead of localStorage
 */

import { microBlocks } from './microBlockData';
import createClient from './supabase/client';
import { projectId, publicAnonKey } from './supabase/info';

// ============================================================================
// TYPES
// ============================================================================

export type MicroBlockState = 'red' | 'orange' | 'green';

export interface Patient {
  id: string;
  name: string;
  email: string;
  currentWeek: number; // Backend tracking only - never shown to patient
  hasCompletedOnboarding: boolean; // First-login guide
  createdAt: string;
  updatedAt: string;
}

export interface PatientMicroBlockState {
  patientId: string;
  blockId: string;
  state: MicroBlockState;
  lastUpdated: string;
  completedNaviCues: string[]; // IDs of NaviCues that contributed to this block
}

export interface JourneyProgress {
  patientId: string;
  weekNumber: number; // 1-12
  unlockedAt: string;
  completedNaviCues: string[]; // NaviCue IDs completed in this week
  favoritedContent: string[]; // Content IDs favorited (infinite canvas principle)
}

// ============================================================================
// API BASE URL
// ============================================================================

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a`;

// ============================================================================
// HELPER: Get Access Token
// ============================================================================

function getAccessToken(): string | null {
  const session = localStorage.getItem('recoverlution_session');
  if (!session) {
    return null;
  }
  
  try {
    const parsed = JSON.parse(session);
    return parsed.access_token;
  } catch {
    return null;
  }
}

// ============================================================================
// PATIENT OPERATIONS
// ============================================================================

/**
 * Create a new patient via public signup (no auth required)
 * Used for demo/onboarding flow
 */
export async function createPatient(
  name: string,
  email: string,
  startingWeek: number = 1
): Promise<Patient> {
  try {
    console.log('🔄 Creating patient via public signup:', { name, email, startingWeek });
    
    const response = await fetch(`${API_BASE}/patients/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}` // Use public anon key for CORS
      },
      body: JSON.stringify({
        name,
        email,
        currentWeek: startingWeek
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Patient signup failed:', error);
      throw new Error(error.error || 'Failed to create patient');
    }

    const { patient } = await response.json();
    
    console.log('✅ Patient created via signup:', patient);

    // Store patient ID in localStorage for quick access
    localStorage.setItem('currentPatientId', patient.id);
    
    // Also store the patient data locally for offline access
    localStorage.setItem(`patient:${patient.id}`, JSON.stringify(patient));

    return patient;

  } catch (error: any) {
    console.error('Error creating patient:', error);
    throw error;
  }
}

/**
 * Create a new patient (authenticated - for facility staff)
 * NOTE: This requires an active session
 */
export async function createPatientAuthenticated(
  name: string,
  email: string,
  facilityId: string,
  startingWeek: number = 1
): Promise<Patient> {
  try {
    const token = getAccessToken();
    
    if (!token) {
      throw new Error('No active session. Please login first.');
    }
    
    const response = await fetch(`${API_BASE}/patients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        facility_id: facilityId,
        email,
        first_name: name.split(' ')[0],
        last_name: name.split(' ').slice(1).join(' ') || '',
        treatment_stage: 'intake'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create patient');
    }

    const { patient: dbPatient } = await response.json();
    
    // Transform database patient to our Patient interface
    const patient: Patient = {
      id: dbPatient.id,
      name: `${dbPatient.first_name} ${dbPatient.last_name}`,
      email: dbPatient.email,
      currentWeek: startingWeek,
      hasCompletedOnboarding: dbPatient.has_completed_onboarding,
      createdAt: dbPatient.created_at,
      updatedAt: dbPatient.updated_at
    };

    // Store patient ID in localStorage for quick access
    localStorage.setItem('currentPatientId', patient.id);

    console.log('✅ Patient created:', patient.id);
    return patient;

  } catch (error: any) {
    console.error('Error creating patient:', error);
    throw error;
  }
}

/**
 * Get patient by ID (from backend or localStorage)
 */
export async function getPatient(patientId: string): Promise<Patient | null> {
  // Always check localStorage first (faster, works offline)
  console.log('🔍 Checking localStorage for patient:', patientId);
  const localKey = `patient:${patientId}`;
  const localData = localStorage.getItem(localKey);
  if (localData) {
    try {
      const patient = JSON.parse(localData) as Patient;
      console.log('✅ Found patient in localStorage:', patient);
      return patient;
    } catch (e) {
      console.warn('Failed to parse patient from localStorage:', e);
    }
  }
  
  // Try backend as fallback
  try {
    console.log('🔄 Fetching patient from backend:', patientId);
    const response = await fetch(`${API_BASE}/patients/${patientId}`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}` // Public anon key for CORS
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn('❌ Patient not found:', patientId);
        return null;
      }
      throw new Error('Failed to fetch patient');
    }

    const { patient } = await response.json();
    console.log('✅ Found patient in backend:', patient);
    
    // Store in localStorage for future
    localStorage.setItem(localKey, JSON.stringify(patient));

    return patient;

  } catch (error: any) {
    console.error('❌ Error fetching patient from backend:', error);
    return null;
  }
}

/**
 * Update patient's current week
 */
export async function updatePatientWeek(patientId: string, weekNumber: number): Promise<void> {
  const token = getAccessToken();
  
  if (!token) {
    // No session - update localStorage only
    console.log('No session - updating patient week in localStorage only');
    const patient = await getPatient(patientId);
    if (patient) {
      patient.currentWeek = weekNumber;
      patient.updatedAt = new Date().toISOString();
      localStorage.setItem(`patient:${patientId}`, JSON.stringify(patient));
    }
    return;
  }
  
  try {
    const response = await fetch(`${API_BASE}/patients/${patientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        // Store in metadata since we don't have a currentWeek column
        treatment_plan: { currentWeek: weekNumber }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update patient week');
    }

    console.log('✅ Patient week updated:', weekNumber);

  } catch (error: any) {
    console.error('Error updating patient week:', error);
    
    // Fallback to localStorage
    const patient = await getPatient(patientId);
    if (patient) {
      patient.currentWeek = weekNumber;
      patient.updatedAt = new Date().toISOString();
      localStorage.setItem(`patient:${patientId}`, JSON.stringify(patient));
    }
  }
}

// ============================================================================
// MICRO-BLOCK STATE OPERATIONS
// ============================================================================

/**
 * Get all micro-block states for a patient
 */
export async function getPatientMicroBlocks(
  patientId: string
): Promise<PatientMicroBlockState[]> {
  try {
    // For now, use localStorage until we fully migrate
    // TODO: Fetch from /patients/:id/micro-blocks endpoint
    
    const prefix = `microblock:${patientId}:`;
    const states: PatientMicroBlockState[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            states.push(JSON.parse(data));
          } catch {
            // Skip invalid data
          }
        }
      }
    }
    
    // If no states found, initialize
    if (states.length === 0) {
      await initializeMicroBlocks(patientId);
      return getPatientMicroBlocks(patientId);
    }
    
    return states;

  } catch (error: any) {
    console.error('Error fetching micro-blocks:', error);
    return [];
  }
}

/**
 * Initialize all micro-blocks for a patient (default: red)
 */
async function initializeMicroBlocks(patientId: string): Promise<void> {
  const now = new Date().toISOString();
  const states: PatientMicroBlockState[] = microBlocks.map((block) => ({
    patientId,
    blockId: block.id,
    state: 'red' as MicroBlockState,
    lastUpdated: now,
    completedNaviCues: [],
  }));

  // Store all states in localStorage (temporary until backend migration)
  for (const state of states) {
    const key = `microblock:${patientId}:${state.blockId}`;
    localStorage.setItem(key, JSON.stringify(state));
  }
  
  console.log('✅ Initialized 59 micro-blocks for patient:', patientId);
}

/**
 * Update a micro-block state after completing a NaviCue
 */
export async function updateMicroBlockState(
  patientId: string,
  blockId: string,
  newState: MicroBlockState,
  navicueId: string
): Promise<void> {
  try {
    // TODO: POST to /patients/:id/micro-blocks/:blockId
    
    // For now, use localStorage
    const key = `microblock:${patientId}:${blockId}`;
    const data = localStorage.getItem(key);
    
    let state: PatientMicroBlockState;
    
    if (data) {
      try {
        state = JSON.parse(data);
      } catch {
        state = {
          patientId,
          blockId,
          state: 'red',
          lastUpdated: new Date().toISOString(),
          completedNaviCues: [],
        };
      }
    } else {
      state = {
        patientId,
        blockId,
        state: 'red',
        lastUpdated: new Date().toISOString(),
        completedNaviCues: [],
      };
    }

    // Update state
    state.state = newState;
    state.lastUpdated = new Date().toISOString();
    if (!state.completedNaviCues.includes(navicueId)) {
      state.completedNaviCues.push(navicueId);
    }

    localStorage.setItem(key, JSON.stringify(state));
    console.log('✅ Micro-block state updated:', blockId, newState);

  } catch (error: any) {
    console.error('Error updating micro-block state:', error);
  }
}

/**
 * Get micro-block states by pillar
 */
export async function getMicroBlocksByPillar(
  patientId: string,
  pillar: string
): Promise<PatientMicroBlockState[]> {
  const allStates = await getPatientMicroBlocks(patientId);
  const pillarBlockIds = microBlocks
    .filter((block) => block.pillar === pillar)
    .map((block) => block.id);
  
  return allStates.filter((state) => pillarBlockIds.includes(state.blockId));
}

/**
 * Calculate overall progress (percentage of green blocks)
 */
export async function calculateOverallProgress(patientId: string): Promise<number> {
  const allStates = await getPatientMicroBlocks(patientId);
  if (allStates.length === 0) return 0;
  
  const greenCount = allStates.filter((state) => state.state === 'green').length;
  return Math.round((greenCount / allStates.length) * 100);
}

// ============================================================================
// JOURNEY PROGRESS OPERATIONS
// ============================================================================

/**
 * Get all journey progress for a patient
 */
export async function getJourneyProgress(patientId: string): Promise<JourneyProgress[]> {
  try {
    // TODO: Fetch from /patients/:id/journey-progress endpoint
    
    // For now, use localStorage
    const prefix = `journey:${patientId}:`;
    const progress: JourneyProgress[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            progress.push(JSON.parse(data));
          } catch {
            // Skip invalid data
          }
        }
      }
    }
    
    return progress;

  } catch (error: any) {
    console.error('Error fetching journey progress:', error);
    return [];
  }
}

/**
 * Mark NaviCue as completed in journey
 */
export async function completeNaviCue(
  patientId: string,
  weekNumber: number,
  navicueId: string
): Promise<void> {
  const token = getAccessToken();
  
  // Update localStorage for immediate UI feedback
  const key = `journey:${patientId}:week${weekNumber}`;
  const data = localStorage.getItem(key);
  
  let progress: JourneyProgress;
  
  if (!data) {
    progress = {
      patientId,
      weekNumber,
      unlockedAt: new Date().toISOString(),
      completedNaviCues: [],
      favoritedContent: [],
    };
  } else {
    progress = JSON.parse(data);
  }

  if (!progress.completedNaviCues.includes(navicueId)) {
    progress.completedNaviCues.push(navicueId);
  }

  localStorage.setItem(key, JSON.stringify(progress));
  console.log('✅ NaviCue completed (localStorage):', navicueId);
  
  // If we have a session, also track on backend
  if (token) {
    try {
      await fetch(`${API_BASE}/patients/${patientId}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          event_type: 'complete',
          content_type: 'navicue',
          content_id: navicueId,
          session_id: `session_${Date.now()}`,
          session_duration: 0 // TODO: Track actual duration
        })
      });
      console.log('✅ NaviCue completion tracked on backend');
    } catch (error: any) {
      console.error('Error tracking NaviCue on backend (localStorage saved):', error);
    }
  }
}

/**
 * Toggle favorite content (infinite canvas principle)
 */
export async function toggleFavorite(
  patientId: string,
  weekNumber: number,
  contentId: string
): Promise<boolean> {
  const token = getAccessToken();
  
  // Update localStorage first
  const key = `journey:${patientId}:week${weekNumber}`;
  const data = localStorage.getItem(key);
  
  if (!data) return false;

  const progress: JourneyProgress = JSON.parse(data);

  const index = progress.favoritedContent.indexOf(contentId);
  if (index > -1) {
    progress.favoritedContent.splice(index, 1);
  } else {
    progress.favoritedContent.push(contentId);
  }

  localStorage.setItem(key, JSON.stringify(progress));
  const isFavorited = index === -1;
  
  console.log(`✅ Content ${isFavorited ? 'favorited' : 'unfavorited'} (localStorage)`);
  
  // If we have a session, sync to backend
  if (token) {
    try {
      await fetch(`${API_BASE}/patients/${patientId}/saved-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content_id: contentId,
          content_type: 'navicue', // TODO: Determine type
          saved_from: 'journey',
          is_favorite: isFavorited
        })
      });
      console.log('✅ Favorite synced to backend');
    } catch (error: any) {
      console.error('Error syncing favorite to backend (localStorage saved):', error);
    }
  }
  
  return isFavorited;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get state color for UI (brand purple variants)
 */
export function getStateColor(state: MicroBlockState): string {
  switch (state) {
    case 'red':
      return 'bg-red-500';
    case 'orange':
      return 'bg-orange-500';
    case 'green':
      return 'bg-green-500';
    default:
      return 'bg-gray-400';
  }
}

/**
 * Get state emoji
 */
export function getStateEmoji(state: MicroBlockState): string {
  switch (state) {
    case 'red':
      return '🔴';
    case 'orange':
      return '🟠';
    case 'green':
      return '🟢';
    default:
      return '⚪';
  }
}

/**
 * Determine next state progression (red → orange → green)
 */
export function getNextState(currentState: MicroBlockState): MicroBlockState {
  switch (currentState) {
    case 'red':
      return 'orange';
    case 'orange':
      return 'green';
    case 'green':
      return 'green'; // Stay green (fluid and forever)
    default:
      return 'red';
  }
}

/**
 * Mark patient onboarding as complete
 */
export async function completeOnboarding(patientId: string): Promise<void> {
  const token = getAccessToken();
  
  // Update localStorage first
  const patient = await getPatient(patientId);
  if (patient) {
    patient.hasCompletedOnboarding = true;
    patient.updatedAt = new Date().toISOString();
    localStorage.setItem(`patient:${patientId}`, JSON.stringify(patient));
    console.log('✅ Onboarding completed (localStorage):', patientId);
  }
  
  // If we have a session, sync to backend
  if (token) {
    try {
      const response = await fetch(`${API_BASE}/patients/${patientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          has_completed_onboarding: true
        })
      });

      if (!response.ok) {
        throw new Error('Failed to complete onboarding on backend');
      }

      console.log('✅ Onboarding synced to backend');

    } catch (error: any) {
      console.error('Error syncing onboarding to backend (localStorage saved):', error);
    }
  }
}

// ============================================================================
// LEGACY: Generate Patient ID (for localStorage fallback)
// ============================================================================

export function generatePatientId(): string {
  return `patient_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
