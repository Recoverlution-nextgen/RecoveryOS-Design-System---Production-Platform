import React, { useState } from 'react';

/**
 * EVIDENCE VAULT - BELIEVING LAYER
 * 
 * Purpose: Collect counter-evidence to limiting beliefs
 * Mechanism: Log instances that contradict old belief
 * Psychology: Accumulation creates cognitive dissonance → belief update
 * 
 * Example: Old belief "I always fail"
 * Vault: 12 pieces of evidence of success
 * Weight of evidence forces belief revision
 */

interface EvidenceVaultProps {
  limitingBelief: string;
  counterEvidence: string[];
  onAddEvidence: (evidence: string) => void;
  onReviewVault: () => void;
}

export function EvidenceVault({ 
  limitingBelief, 
  counterEvidence,
  onAddEvidence,
  onReviewVault
}: EvidenceVaultProps) {
  const [newEvidence, setNewEvidence] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    if (!newEvidence.trim()) return;
    onAddEvidence(newEvidence);
    setNewEvidence('');
    setShowForm(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
            Evidence vault
          </div>
          <h2 className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Old belief:
          </h2>
          <div className="text-2xl line-through opacity-60" style={{ color: '#FFFFFF' }}>
            {limitingBelief}
          </div>
        </div>

        {/* Counter-evidence count */}
        <div className="text-center p-8" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-6xl mb-2" style={{ color: '#5739FB' }}>
            {counterEvidence.length}
          </div>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            pieces of counter-evidence
          </div>
        </div>

        {/* Evidence list */}
        {counterEvidence.length > 0 && (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {counterEvidence.slice(-5).reverse().map((evidence, index) => (
              <div
                key={index}
                className="p-4 text-sm"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.05)',
                  borderLeft: '3px solid #5739FB',
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                {evidence}
              </div>
            ))}
          </div>
        )}

        {/* Add evidence */}
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full p-5 transition-all duration-200"
            style={{
              backgroundColor: 'rgba(87, 57, 251, 0.2)',
              color: '#FFFFFF',
            }}
          >
            Add counter-evidence
          </button>
        ) : (
          <div className="space-y-3">
            <textarea
              value={newEvidence}
              onChange={(e) => setNewEvidence(e.target.value)}
              placeholder="Evidence that contradicts the old belief..."
              className="w-full p-4"
              rows={3}
              autoFocus
              style={{
                backgroundColor: 'rgba(87, 57, 251, 0.05)',
                border: '1px solid rgba(87, 57, 251, 0.3)',
                color: '#FFFFFF',
              }}
            />
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="p-3"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.1)',
                  color: 'rgba(255, 255, 255, 0.6)',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={!newEvidence.trim()}
                className="p-3"
                style={{
                  backgroundColor: newEvidence.trim() ? '#5739FB' : 'rgba(87, 57, 251, 0.3)',
                  color: '#FFFFFF',
                  opacity: newEvidence.trim() ? 1 : 0.5,
                }}
              >
                Add to vault
              </button>
            </div>
          </div>
        )}

        {/* Review */}
        <button
          onClick={onReviewVault}
          className="w-full p-5 transition-all duration-200"
          style={{
            backgroundColor: '#3E2BB8',
            color: '#FFFFFF',
          }}
        >
          Review full vault
        </button>

        {/* Insight */}
        <div className="text-center text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
          Evidence accumulates until the old belief can no longer hold
        </div>
      </div>
    </div>
  );
}
