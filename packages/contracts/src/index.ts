// RecoveryOS Design System Contracts
// This is the canonical source of truth for all contracts, events, and data models

export enum Lens {
  INDIVIDUAL = 'individual',
  PROFESSIONAL = 'professional',
  ORGANISATION = 'organisation'
}

export enum Intent {
  NAVIGATE = 'navigate',
  CREATE = 'create',
  EDIT = 'edit',
  DELETE = 'delete',
  SHARE = 'share',
  EXPORT = 'export'
}

export enum StateBand {
  CLEAR = 'clear',
  LOADED = 'loaded',
  NARROW_WINDOW = 'narrow_window',
  ANY_STATE = 'any_state'
}

export interface RecoveryOSEvent {
  type: string;
  lens: Lens;
  timestamp: number;
  payload: Record<string, any>;
}

export interface ReceiptModel {
  id: string;
  title: string;
  description?: string;
  timestamp: number;
  lens: Lens;
  stateBand: StateBand;
  metadata?: Record<string, any>;
}

export interface NaviCueModel {
  id: string;
  title: string;
  stateBand: StateBand;
  lens: Lens;
  timestamp: number;
  context?: string;
  actions?: Array<{
    label: string;
    intent: Intent;
    payload?: Record<string, any>;
  }>;
}