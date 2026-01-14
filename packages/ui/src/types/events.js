/**
 * RecoveryOS Event Schema
 *
 * One immutable contract per moment:
 * Sense → Route → Deliver → Seal
 */
/**
 * Event factory for guaranteed contract
 */
export function createEvent(contract, consent, status, proof) {
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
export function createIntegrityLog(event, quietHoursOk, consentOk) {
    return {
        delivery_id: event.delivery_id,
        timestamp: event.timestamp,
        quiet_hours_adherence: quietHoursOk,
        consent_adherence: consentOk,
        escalation_protocol_used: event.consent_scope.escalation_path,
        delivery_success: event.status === 'captured',
    };
}
