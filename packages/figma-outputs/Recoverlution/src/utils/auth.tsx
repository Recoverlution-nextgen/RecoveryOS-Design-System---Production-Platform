/**
 * Authentication Service
 * Production-ready auth with Supabase backend
 * 
 * Features:
 * - Secure sign-up/sign-in with JWT tokens
 * - User roles (patient, therapist, facility_admin)
 * - Token refresh and session management
 * - Profile management
 */

import { projectId, publicAnonKey } from './supabase/info';

// ============================================================================
// TYPES
// ============================================================================

export type UserRole = 'patient' | 'therapist' | 'facility_admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  facility_id?: string | null;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
}

// ============================================================================
// API BASE URL
// ============================================================================

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a`;

// ============================================================================
// LOCAL STORAGE KEYS
// ============================================================================

const STORAGE_KEYS = {
  USER: 'recoverlution_user',
  SESSION: 'recoverlution_session',
};

// ============================================================================
// SESSION MANAGEMENT
// ============================================================================

/**
 * Get current session from localStorage
 */
export function getSession(): Session | null {
  try {
    const sessionData = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!sessionData) return null;
    
    const session = JSON.parse(sessionData) as Session;
    
    // Check if session is expired
    if (session.expires_at && session.expires_at < Date.now() / 1000) {
      clearSession();
      return null;
    }
    
    return session;
  } catch {
    return null;
  }
}

/**
 * Save session to localStorage
 */
function saveSession(session: Session): void {
  localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
}

/**
 * Clear session from localStorage
 */
function clearSession(): void {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
  localStorage.removeItem(STORAGE_KEYS.USER);
}

/**
 * Get current user from localStorage
 */
export function getCurrentUser(): User | null {
  try {
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    if (!userData) return null;
    return JSON.parse(userData) as User;
  } catch {
    return null;
  }
}

/**
 * Save user to localStorage
 */
function saveUser(user: User): void {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

/**
 * Get current auth state
 */
export function getAuthState(): AuthState {
  const session = getSession();
  const user = getCurrentUser();
  
  return {
    user,
    session,
    isAuthenticated: !!(session && user),
  };
}

// ============================================================================
// AUTH API CALLS
// ============================================================================

/**
 * Sign up a new user
 */
export async function signUp(params: {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
  facilityId?: string;
}): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: params.email,
        password: params.password,
        name: params.name,
        role: params.role || 'patient',
        facilityId: params.facilityId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Sign up failed:', data.error);
      return { success: false, error: data.error || 'Sign up failed' };
    }

    console.log('✅ Sign up successful:', data.user.email);
    
    // After signup, user must sign in to get session
    return { success: true, user: data.user };

  } catch (error: any) {
    console.error('Sign up error:', error);
    return { success: false, error: error.message || 'Network error' };
  }
}

/**
 * Sign in existing user
 */
export async function signIn(params: {
  email: string;
  password: string;
}): Promise<{ success: boolean; user?: User; session?: Session; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: params.email,
        password: params.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Sign in failed:', data.error);
      return { success: false, error: data.error || 'Sign in failed' };
    }

    // Save user and session
    saveUser(data.user);
    saveSession(data.session);

    console.log('✅ Sign in successful:', data.user.email);

    return { success: true, user: data.user, session: data.session };

  } catch (error: any) {
    console.error('Sign in error:', error);
    return { success: false, error: error.message || 'Network error' };
  }
}

/**
 * Sign out current user
 */
export async function signOut(): Promise<void> {
  clearSession();
  console.log('✅ Signed out');
}

/**
 * Get current user from server (verify session)
 */
export async function getCurrentUserFromServer(): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const session = getSession();
    
    if (!session) {
      return { success: false, error: 'No active session' };
    }

    const response = await fetch(`${API_BASE}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Get user failed:', data.error);
      clearSession();
      return { success: false, error: data.error || 'Failed to get user' };
    }

    // Update local user data
    saveUser(data.user);

    return { success: true, user: data.user };

  } catch (error: any) {
    console.error('Get user error:', error);
    return { success: false, error: error.message || 'Network error' };
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const session = getSession();
  return !!session;
}

/**
 * Get access token for API requests
 */
export function getAccessToken(): string | null {
  const session = getSession();
  return session?.access_token || null;
}

/**
 * Make authenticated API request
 */
export async function authFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getAccessToken();
  
  if (!token) {
    throw new Error('No access token available');
  }

  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  return fetch(endpoint, {
    ...options,
    headers,
  });
}

// ============================================================================
// ROLE-BASED ACCESS CONTROL
// ============================================================================

/**
 * Check if user has required role
 */
export function hasRole(requiredRole: UserRole | UserRole[]): boolean {
  const user = getCurrentUser();
  if (!user) return false;

  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  return roles.includes(user.role);
}

/**
 * Check if user is a patient
 */
export function isPatient(): boolean {
  return hasRole('patient');
}

/**
 * Check if user is a therapist
 */
export function isTherapist(): boolean {
  return hasRole('therapist');
}

/**
 * Check if user is a facility admin
 */
export function isFacilityAdmin(): boolean {
  return hasRole('facility_admin');
}

/**
 * Check if user can access patient data
 */
export function canAccessPatient(patientId: string): boolean {
  const user = getCurrentUser();
  if (!user) return false;

  // User can access their own data
  if (user.id === patientId) return true;

  // Therapists and admins can access patient data
  if (user.role === 'therapist' || user.role === 'facility_admin') return true;

  return false;
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize auth on app startup
 * Verifies session and refreshes user data
 */
export async function initAuth(): Promise<AuthState> {
  const session = getSession();
  
  if (!session) {
    return {
      user: null,
      session: null,
      isAuthenticated: false,
    };
  }

  // Verify session with server
  const result = await getCurrentUserFromServer();

  if (!result.success) {
    clearSession();
    return {
      user: null,
      session: null,
      isAuthenticated: false,
    };
  }

  return {
    user: result.user || null,
    session,
    isAuthenticated: true,
  };
}

// ============================================================================
// DEMO FUNCTIONS (for development)
// ============================================================================

/**
 * Create demo accounts (for testing)
 * IMPORTANT: Remove this in production!
 */
export async function createDemoAccounts() {
  console.log('🔧 Creating demo accounts...');

  // Demo Patient
  await signUp({
    email: 'patient@demo.com',
    password: 'demo123',
    name: 'Demo Patient',
    role: 'patient',
  });

  // Demo Therapist
  await signUp({
    email: 'therapist@demo.com',
    password: 'demo123',
    name: 'Dr. Sarah Johnson',
    role: 'therapist',
  });

  // Demo Admin
  await signUp({
    email: 'admin@demo.com',
    password: 'demo123',
    name: 'Admin User',
    role: 'facility_admin',
  });

  console.log('✅ Demo accounts created!');
  console.log('📧 Patient: patient@demo.com / demo123');
  console.log('📧 Therapist: therapist@demo.com / demo123');
  console.log('📧 Admin: admin@demo.com / demo123');
}
