import React, { useState } from 'react';

/**
 * IDENTITY RECEIPT - EMBODYING LAYER
 * 
 * Purpose: Collect evidence of "new you" moments
 * Mechanism: Log instances where new identity showed up
 * Psychology: Identity change requires proof, not just intention
 * 
 * Example: New identity "I am someone who sets boundaries"
 * Receipt: "I said no to extra work today"
 * Accumulation = identity shift becomes real
 */

interface IdentityReceiptProps {
  newIdentity: string;
  existingReceipts: Array<{
    action: string;
    timestamp: string;
  }>;
  onAddReceipt: (action: string) => void;
}

export function IdentityReceipt({ newIdentity, existingReceipts, onAddReceipt }: IdentityReceiptProps) {
  const [action, setAction] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    if (!action.trim()) return;
    onAddReceipt(action);
    setAction('');
    setShowForm(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
            Identity receipts
          </div>
          <h2 className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            New identity:
          </h2>
          <div className="text-2xl" style={{ color: '#FFFFFF' }}>
            {newIdentity}
          </div>
        </div>

        {/* Receipt count */}
        <div className="text-center p-8" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-6xl mb-2" style={{ color: '#5739FB' }}>
            {existingReceipts.length}
          </div>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            receipts collected
          </div>
        </div>

        {/* Recent receipts */}
        {existingReceipts.length > 0 && (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            <div className="text-sm mb-2" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Recent proof:
            </div>
            {existingReceipts.slice(-5).reverse().map((receipt, index) => (
              <div
                key={index}
                className="p-4"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.08)',
                  borderLeft: '3px solid #5739FB',
                  color: '#FFFFFF',
                }}
              >
                <div className="text-sm mb-1">{receipt.action}</div>
                <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                  {receipt.timestamp}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add receipt */}
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full p-5 transition-all duration-200"
            style={{
              backgroundColor: 'rgba(87, 57, 251, 0.2)',
              border: '2px dashed #5739FB',
              color: '#FFFFFF',
            }}
          >
            Add new receipt
          </button>
        ) : (
          <div className="space-y-3">
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              What did you do that proves this new identity?
            </div>
            <textarea
              value={action}
              onChange={(e) => setAction(e.target.value)}
              placeholder="Today I..."
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
                disabled={!action.trim()}
                className="p-3"
                style={{
                  backgroundColor: action.trim() ? '#5739FB' : 'rgba(87, 57, 251, 0.3)',
                  color: '#FFFFFF',
                  opacity: action.trim() ? 1 : 0.5,
                }}
              >
                Collect receipt
              </button>
            </div>
          </div>
        )}

        {/* Insight */}
        <div className="text-center text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
          Identity shifts when you have proof, not just hopes
        </div>
      </div>
    </div>
  );
}
