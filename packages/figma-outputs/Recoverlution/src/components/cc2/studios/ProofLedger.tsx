/**
 * PROOF LEDGER - BROWSE PROOF ARTIFACTS
 * Filter by type, view details
 * The "currency" of the platform
 */

import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { DataTable } from '../shared/DataTable';
import { FilterBar } from '../shared/FilterBar';

interface ProofLedgerProps {
  onBack: () => void;
  tenantScope: 'platform' | 'org' | 'professional';
}

export function ProofLedger({ onBack, tenantScope }: ProofLedgerProps) {
  const [proofs, setProofs] = useState<any[]>([]);
  const [filteredProofs, setFilteredProofs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProof, setSelectedProof] = useState<any | null>(null);
  
  // Filters
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProofs();
  }, [tenantScope]);

  useEffect(() => {
    applyFilters();
  }, [proofs, typeFilter, searchQuery]);

  const loadProofs = async () => {
    try {
      setLoading(true);
      // Mock data - replace with real API call
      const mockProofs = [
        {
          id: '1',
          artifact_type: 'micro_proof',
          individual_id: 'user-123',
          content_ref: 'content-1',
          quality: 0.85,
          confidence: 0.90,
          created_at: new Date().toISOString(),
          payload: { state_delta: { tempo: 10, flow: 15 } },
        },
        {
          id: '2',
          artifact_type: 'receipt',
          individual_id: 'user-123',
          content_ref: 'content-2',
          quality: 0.70,
          confidence: 0.75,
          created_at: new Date(Date.now() - 3600000).toISOString(),
          payload: { completion: true },
        },
        {
          id: '3',
          artifact_type: 'transfer_test',
          individual_id: 'user-456',
          content_ref: 'content-3',
          quality: 0.92,
          confidence: 0.88,
          created_at: new Date(Date.now() - 7200000).toISOString(),
          payload: { success: true, context: 'real_world' },
        },
      ];
      setProofs(mockProofs);
    } catch (error) {
      console.error('Failed to load proofs:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...proofs];

    if (typeFilter !== 'all') {
      filtered = filtered.filter(p => p.artifact_type === typeFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(p => 
        JSON.stringify(p).toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProofs(filtered);
  };

  const handleProofClick = (proof: any) => {
    setSelectedProof(proof);
  };

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <div className="max-w-[1800px] mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-500" />
            Proof Ledger
          </h1>
          <p className="text-zinc-400">
            Browse proof artifacts · The platform currency
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900/50 border border-zinc-800 p-4">
            <p className="text-sm text-zinc-400 mb-1">Total Proofs</p>
            <p className="text-2xl font-bold text-green-400">{proofs.length}</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 p-4">
            <p className="text-sm text-zinc-400 mb-1">Avg Quality</p>
            <p className="text-2xl font-bold text-blue-400">
              {(proofs.reduce((sum, p) => sum + p.quality, 0) / proofs.length || 0).toFixed(2)}
            </p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 p-4">
            <p className="text-sm text-zinc-400 mb-1">Avg Confidence</p>
            <p className="text-2xl font-bold text-purple-400">
              {(proofs.reduce((sum, p) => sum + p.confidence, 0) / proofs.length || 0).toFixed(2)}
            </p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 p-4">
            <p className="text-sm text-zinc-400 mb-1">Transfer Tests</p>
            <p className="text-2xl font-bold text-orange-400">
              {proofs.filter(p => p.artifact_type === 'transfer_test').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <FilterBar
          filters={[
            {
              label: 'Type',
              value: typeFilter,
              options: [
                { value: 'all', label: 'All Types' },
                { value: 'receipt', label: 'Receipt' },
                { value: 'micro_proof', label: 'Micro Proof' },
                { value: 'transfer_test', label: 'Transfer Test' },
                { value: 'prediction_error', label: 'Prediction Error' },
                { value: 'durability_check', label: 'Durability' },
              ],
              onChange: setTypeFilter,
            },
          ]}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Table */}
        <DataTable
          data={filteredProofs}
          columns={[
            { 
              key: 'artifact_type', 
              label: 'Type',
              render: (val) => (
                <span className={`
                  px-2 py-1 text-xs font-mono
                  ${val === 'transfer_test' ? 'bg-orange-500/20 text-orange-400' : ''}
                  ${val === 'micro_proof' ? 'bg-green-500/20 text-green-400' : ''}
                  ${val === 'receipt' ? 'bg-blue-500/20 text-blue-400' : ''}
                  ${val === 'durability_check' ? 'bg-purple-500/20 text-purple-400' : ''}
                `}>
                  {val}
                </span>
              )
            },
            { key: 'individual_id', label: 'User ID', render: (val) => val?.slice(0, 8) + '...' },
            { key: 'content_ref', label: 'Content Ref', render: (val) => val?.slice(0, 10) + '...' || '-' },
            { 
              key: 'quality', 
              label: 'Quality',
              render: (val) => (
                <span className={val >= 0.8 ? 'text-green-400' : val >= 0.6 ? 'text-yellow-400' : 'text-red-400'}>
                  {(val * 100).toFixed(0)}%
                </span>
              )
            },
            { 
              key: 'confidence', 
              label: 'Confidence',
              render: (val) => (
                <span className={val >= 0.8 ? 'text-green-400' : val >= 0.6 ? 'text-yellow-400' : 'text-red-400'}>
                  {(val * 100).toFixed(0)}%
                </span>
              )
            },
            { 
              key: 'created_at', 
              label: 'Created',
              render: (val) => new Date(val).toLocaleTimeString()
            },
          ]}
          onRowClick={handleProofClick}
          loading={loading}
        />

        {/* Proof Detail Modal */}
        {selectedProof && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-8">
            <div className="bg-zinc-900 border border-zinc-700 max-w-2xl w-full max-h-[80vh] overflow-auto">
              <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 flex items-center justify-between">
                <h3 className="text-xl font-bold">Proof Details</h3>
                <button
                  onClick={() => setSelectedProof(null)}
                  className="text-zinc-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">Type</p>
                    <p className="font-mono text-green-400">{selectedProof.artifact_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">Quality</p>
                    <p className="text-2xl font-bold text-green-400">{(selectedProof.quality * 100).toFixed(0)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">Confidence</p>
                    <p className="text-2xl font-bold text-blue-400">{(selectedProof.confidence * 100).toFixed(0)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">Created</p>
                    <p>{new Date(selectedProof.created_at).toLocaleString()}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-2">Full Payload</p>
                  <pre className="bg-zinc-950 border border-zinc-800 p-4 text-sm text-zinc-300 font-mono overflow-auto">
                    {JSON.stringify(selectedProof, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
