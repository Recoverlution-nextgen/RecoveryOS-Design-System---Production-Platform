/**
 * RecoveryOS Event Schema
 *
 * One immutable contract per moment:
 * Sense → Route → Deliver → Seal
 */

export type HeatBand = 'safe' | 'caution' | 'alert';
export type ProofStatus = 'pending' | 'captured' | 'missed';

export interface DeliveryContract {
  target: string; // Pillar/Concept e.g. "Arousal regulation"
  aim: string; // What we're trying to shift
  dose: string; // Scale/duration e.g. "30s", "light"
  primitive: string; // The actual move e.g. "Box breath 4x"
  heatBand: HeatBand;
  proofRequest: string; // What proof we're collecting
}

export interface ConsentScope {
  state_signals: boolean;
  notifications: boolean;
  escalation_contact: boolean;
  quiet_hours_active?: boolean;
  escalation_path?: string; // 'self' | 'clinician' | 'support'
}

export interface ProofReceipt {
  felt_shift?: string; // What changed (body, emotion, clarity)
  timestamp: number; // Unix ms
  held_under: HeatBand; // Heat level when captured
}

/**
 * Immutable event: one action in one moment
 * IDs are stable; labels can evolve.
 */
export interface RecoveryOSEvent {
  // Immutable
  delivery_id: string; // UUID v4; never changes
  timestamp: number; // Unix ms
  sequence: number; // Event sequence in session

  // Contract
  contract: DeliveryContract;

  // Context
  consent_scope: ConsentScope;

  // Outcome
  status: ProofStatus; // Did proof land?
  proof?: ProofReceipt;

  // Audit
  escalation_triggered?: boolean;
  quiet_hours_bypassed?: boolean;
}

export interface IntegrityLog {
  delivery_id: string;
  timestamp: number;
  quiet_hours_adherence: boolean;
  consent_adherence: boolean;
  escalation_protocol_used?: string;
  delivery_success: boolean;
}

/**
 * Event factory for guaranteed contract
 */
export function createEvent(
  contract: DeliveryContract,
  consent: ConsentScope,
  status: ProofStatus,
  proof?: ProofReceipt,
): RecoveryOSEvent {
  return {
    delivery_id: crypto.getRandomValues(new Uint8Array(16)).reduce((s, b) => s + b.toString(16).padStart(2, '0'), ''),
    timestamp: Date.now(),
    sequence: 0, // populated by event store
    contract,
    consent_scope: consent,
    status,
    proof,
  };
}

/**
 * Log factory for audit trail
 */
export function createIntegrityLog(event: RecoveryOSEvent, quietHoursOk: boolean, consentOk: boolean): IntegrityLog {
  return {
    delivery_id: event.delivery_id,
    timestamp: event.timestamp,
    quiet_hours_adherence: quietHoursOk,
    consent_adherence: consentOk,
    escalation_protocol_used: event.consent_scope.escalation_path,
    delivery_success: event.status === 'captured',
  };
}
