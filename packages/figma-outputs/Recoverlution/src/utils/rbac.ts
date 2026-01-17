/**
 * RBAC HELPER UTILITIES
 * Permission checks and role-based feature gating
 */

import { Role, Permission } from '../contexts/UserContext';

export function canViewAllData(role: Role): boolean {
  return role === 'platform_admin';
}

export function canEditAllData(role: Role): boolean {
  return role === 'platform_admin';
}

export function canViewOrgData(role: Role): boolean {
  return role === 'platform_admin' || role === 'org_admin' || role === 'professional';
}

export function canEditOrgData(role: Role): boolean {
  return role === 'platform_admin' || role === 'org_admin';
}

export function canManageTeam(role: Role): boolean {
  return role === 'platform_admin' || role === 'org_admin';
}

export function canViewPatients(role: Role): boolean {
  return role === 'platform_admin' || role === 'org_admin' || role === 'professional';
}

export function canWriteClinicalNotes(role: Role): boolean {
  return role === 'professional';
}

export function canAccessBilling(role: Role): boolean {
  return role === 'platform_admin' || role === 'org_admin';
}

export function canDeployContent(role: Role): boolean {
  return role === 'platform_admin' || role === 'org_admin';
}

export function canCreatePlatformContent(role: Role): boolean {
  return role === 'platform_admin';
}

// Studio visibility mapping
export const PLATFORM_STUDIOS = [
  'registry',
  'event-explorer',
  'proof-ledger',
  'journey-studio',
  'navicue-studio',
  'navicue-batch',
  'navicue-playground',
  'navicue-sync',
  'simulation-lab',
  'timeline-replayer',
  'decision-inspector',
  'wellbeing-studio',
  'content-assembly',
  'content-editor',
  'org-manager',
  'pro-manager',
  'platform-analytics',
  'installation-system-explorer',
  'installation-control-plane',
  'algorithm-visualizer',
  'taxonomy-exploration-engine',
];

export const ORG_STUDIOS = [
  'team-management',
  'patient-roster',
  'content-curator',
  'org-analytics',
  'billing-dashboard',
  'org-settings',
  'journey-studio',
  'navicue-curator',
  'wellbeing-curator',
  'event-explorer',
  'proof-ledger',
  'installation-system-explorer',
  'installation-control-plane',
  'algorithm-visualizer',
  'taxonomy-exploration-engine',
];

export const PROFESSIONAL_STUDIOS = [
  'patient-roster',
  'patient-dashboard',
  'session-manager',
  'clinical-notes',
  'patient-analytics',
  'intervention-tracker',
  'earnings-dashboard',
  'professional-profile',
  'event-explorer',
  'proof-ledger',
  'content-library',
  'installation-system-explorer',
  'installation-control-plane',
  'algorithm-visualizer',
  'taxonomy-exploration-engine',
];

export function getVisibleStudios(role: Role): string[] {
  if (role === 'platform_admin') return PLATFORM_STUDIOS;
  if (role === 'org_admin') return ORG_STUDIOS;
  if (role === 'professional') return PROFESSIONAL_STUDIOS;
  return [];
}