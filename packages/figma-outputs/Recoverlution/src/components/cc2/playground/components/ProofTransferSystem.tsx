/**
 * PROOF + TRANSFER SYSTEM
 * Proof makes change auditable. Transfer makes it real.
 * Receipts + Transfer Tests
 */

import { FileCheck, ArrowRight, Clock, TrendingDown } from 'lucide-react';

interface ProofCard {
  id: string;
  name: string;
  metric: string;
  result: {
    type: 'delta' | 'duration' | 'streak';
    value: string;
    unit: string;
  };
  timestamp: string;
}

interface TransferCard {
  id: string;
  contextChange: string;
  deadline: string;
  status: 'pending' | 'in-progress' | 'complete';
  proofCardId: string;
}

const PROOF_CARDS: ProofCard[] = [
  {
    id: 'proof-1',
    name: 'Distress Downshift',
    metric: 'Subjective distress rating',
    result: { type: 'delta', value: '-4', unit: 'points' },
    timestamp: '2 hours ago'
  },
  {
    id: 'proof-2',
    name: 'HRV Improvement',
    metric: 'Heart rate variability',
    result: { type: 'delta', value: '+12', unit: 'ms' },
    timestamp: '4 hours ago'
  },
  {
    id: 'proof-3',
    name: 'Pattern Recognition',
    metric: 'Mindblock identification',
    result: { type: 'duration', value: '90', unit: 'seconds' },
    timestamp: '1 day ago'
  },
  {
    id: 'proof-4',
    name: 'Self-Compassion Moment',
    metric: 'Compassion practice',
    result: { type: 'streak', value: '7', unit: 'days' },
    timestamp: '2 days ago'
  }
];

const TRANSFER_CARDS: TransferCard[] = [
  {
    id: 'transfer-1',
    contextChange: 'Work meeting → Family dinner',
    deadline: 'Tomorrow 6pm',
    status: 'pending',
    proofCardId: 'proof-1'
  },
  {
    id: 'transfer-2',
    contextChange: 'Home → Public space',
    deadline: 'In 3 days',
    status: 'in-progress',
    proofCardId: 'proof-2'
  },
  {
    id: 'transfer-3',
    contextChange: 'Solo → With partner',
    deadline: 'This weekend',
    status: 'complete',
    proofCardId: 'proof-3'
  }
];

export function ProofTransferSystem() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#F59E42';
      case 'in-progress': return '#5AB9EA';
      case 'complete': return '#10B981';
      default: return '#71717A';
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      {/* Header */}
      <div className="border-b border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-8 py-8">
          <div className="mb-3">
            <span 
              className="text-xs tracking-[0.2em] text-zinc-500"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              08 OF 10
            </span>
          </div>
          <h1 
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Proof makes change auditable. Transfer makes it real.
          </h1>
          <p 
            className="text-lg text-zinc-400"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Capture the receipt, then repeat in a new context.
          </p>
        </div>
      </div>

      {/* Dual Layout */}
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="grid grid-cols-2 gap-8">
          {/* Proof Cards */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 
                className="text-2xl font-bold"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Proof Receipts
              </h2>
              <button
                className="px-4 py-2 bg-[#5739FB] text-white text-sm font-semibold transition-all hover:bg-[#3E2BB8]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Log receipt
              </button>
            </div>

            <div className="space-y-4">
              {PROOF_CARDS.map((proof) => (
                <div
                  key={proof.id}
                  className="border border-zinc-800 p-6"
                  style={{
                    background: 'rgba(39, 39, 42, 0.3)',
                    backdropFilter: 'blur(20px) saturate(110%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(110%)'
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 
                        className="text-lg font-bold mb-1"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {proof.name}
                      </h3>
                      <p 
                        className="text-xs text-zinc-500"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {proof.metric}
                      </p>
                    </div>
                    <FileCheck className="w-5 h-5 text-[#5739FB]" />
                  </div>

                  {/* Result */}
                  <div className="flex items-end gap-2 mb-3">
                    {proof.result.type === 'delta' && (
                      <TrendingDown className="w-5 h-5 text-[#10B981]" />
                    )}
                    {proof.result.type === 'duration' && (
                      <Clock className="w-5 h-5 text-[#40E0D0]" />
                    )}
                    <span 
                      className="text-3xl font-bold"
                      style={{ fontFamily: 'var(--font-display)', color: '#10B981' }}
                    >
                      {proof.result.value}
                    </span>
                    <span 
                      className="text-sm text-zinc-400 pb-1"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {proof.result.unit}
                    </span>
                  </div>

                  {/* Timestamp */}
                  <p 
                    className="text-xs text-zinc-500"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {proof.timestamp}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Transfer Cards */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 
                className="text-2xl font-bold"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Transfer Tests
              </h2>
              <button
                className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-white text-sm font-semibold transition-all hover:bg-zinc-800"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Start transfer test
              </button>
            </div>

            <div className="space-y-4">
              {TRANSFER_CARDS.map((transfer) => (
                <div
                  key={transfer.id}
                  className="border border-zinc-800 p-6"
                  style={{
                    background: 'rgba(39, 39, 42, 0.3)',
                    backdropFilter: 'blur(20px) saturate(110%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(110%)',
                    borderLeft: `4px solid ${getStatusColor(transfer.status)}`
                  }}
                >
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="text-xs px-2 py-1 font-bold"
                      style={{
                        background: `${getStatusColor(transfer.status)}20`,
                        color: getStatusColor(transfer.status),
                        border: `1px solid ${getStatusColor(transfer.status)}40`,
                        fontFamily: 'var(--font-sans)',
                        textTransform: 'uppercase'
                      }}
                    >
                      {transfer.status.replace('-', ' ')}
                    </span>
                    <ArrowRight className="w-5 h-5 text-zinc-500" />
                  </div>

                  {/* Context Change */}
                  <h3 
                    className="text-lg font-bold mb-3"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {transfer.contextChange}
                  </h3>

                  {/* Deadline */}
                  <p 
                    className="text-sm text-zinc-400 mb-3"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    Deadline: {transfer.deadline}
                  </p>

                  {/* Linked Proof */}
                  <div className="pt-3 border-t border-zinc-800">
                    <p 
                      className="text-xs text-zinc-500 mb-1"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      LINKED PROOF
                    </p>
                    <p 
                      className="text-xs text-zinc-400"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {PROOF_CARDS.find(p => p.id === transfer.proofCardId)?.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
