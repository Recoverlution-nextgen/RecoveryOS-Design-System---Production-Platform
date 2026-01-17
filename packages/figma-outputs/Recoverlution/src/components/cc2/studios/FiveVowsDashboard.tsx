/**
 * FIVE VOWS COMPLIANCE DASHBOARD
 * Auto-check all content for Five Vows compliance with one-click fixes
 */

import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, X, Zap } from 'lucide-react';
import { projectId } from '../../../utils/supabase/info';
import { createClient } from '../../../utils/supabase/client';

interface ComplianceViolation {
  vow: number;
  message: string;
  severity: 'high' | 'medium' | 'low';
  fix: string;
  flagged_terms?: string[];
  alternatives?: string[];
}

interface ContentCompliance {
  content_id: string;
  title?: string;
  compliance_score: number;
  violations: ComplianceViolation[];
  passed: boolean;
}

interface FiveVowsDashboardProps {
  onClose: () => void;
}

export function FiveVowsDashboard({ onClose }: FiveVowsDashboardProps) {
  const [selectedVow, setSelectedVow] = useState<number | null>(null);
  const [overallScore, setOverallScore] = useState(0);
  const [contentItems, setContentItems] = useState<ContentCompliance[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<ContentCompliance | null>(null);

  useEffect(() => {
    loadCompliance();
  }, []);

  async function loadCompliance() {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/compliance/check-all`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setOverallScore(data.average_compliance_score || 0);
        setContentItems(data.items || []);
      }
    } catch (error) {
      console.error('Error loading compliance:', error);
    } finally {
      setLoading(false);
    }
  }

  const vows = [
    {
      number: 1,
      name: 'Regulate Before Reason',
      description: 'Content has arousal band tags and respects state boundaries',
      color: '#3E2BB8',
    },
    {
      number: 2,
      name: 'Explain Everything',
      description: 'Content has WhyNow templates and authority anchors',
      color: '#5739FB',
    },
    {
      number: 3,
      name: 'Practice Liquidity',
      description: 'NaviCues ≤ 90 seconds, practices declare requirements',
      color: '#10b981',
    },
    {
      number: 4,
      name: 'Evidence Lives Here',
      description: 'Every practice declares measurement and proof hooks',
      color: '#f59e0b',
    },
    {
      number: 5,
      name: 'Dignity By Design',
      description: 'No pathologizing language, consent requirements declared',
      color: '#ef4444',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0118] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0A0118]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl mb-0.5">Five Vows Compliance Dashboard</h1>
              <p className="text-white/40 text-xs">Auto-check content for doctrine violations</p>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-sm transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-8 py-8">
        {/* Overall Score */}
        <div className="bg-gradient-to-r from-[#3E2BB8]/20 to-[#5739FB]/20 border border-white/10 rounded-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-mono mb-2">{overallScore}%</h2>
              <p className="text-white/60">Overall Compliance Score</p>
            </div>
            <Shield className="w-16 h-16 text-white/20" />
          </div>
        </div>

        {/* Vows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {vows.map((vow) => {
            const violations = contentItems.reduce(
              (count, item) => count + item.violations.filter(v => v.vow === vow.number).length,
              0
            );

            return (
              <button
                key={vow.number}
                onClick={() => setSelectedVow(selectedVow === vow.number ? null : vow.number)}
                className={`p-4 rounded-xl border transition-all text-left ${
                  selectedVow === vow.number
                    ? 'bg-white/10 border-white/30 ring-2'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
                style={{
                  ringColor: selectedVow === vow.number ? vow.color : undefined,
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-2xl font-mono" style={{ color: vow.color }}>
                    {vow.number}
                  </span>
                  {violations > 0 ? (
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
                <h3 className="text-sm mb-1">{vow.name}</h3>
                <p className="text-xs text-white/40 mb-2">{vow.description}</p>
                {violations > 0 && (
                  <p className="text-xs text-yellow-500">{violations} violations</p>
                )}
              </button>
            );
          })}
        </div>

        {/* Violations List */}
        {loading ? (
          <div className="text-center py-12 text-white/40">Loading compliance data...</div>
        ) : (
          <>
            {selectedVow ? (
              <div className="space-y-3">
                <h3 className="text-lg mb-4">
                  Vow {selectedVow}: {vows.find(v => v.number === selectedVow)?.name} Violations
                </h3>
                {contentItems
                  .filter(item => item.violations.some(v => v.vow === selectedVow))
                  .map((item) => (
                    <ViolationCard
                      key={item.content_id}
                      item={item}
                      vowFilter={selectedVow}
                      onSelect={() => setSelectedItem(item)}
                    />
                  ))}
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="text-lg mb-4">All Content ({contentItems.length} items)</h3>
                {contentItems.slice(0, 20).map((item) => (
                  <ViolationCard
                    key={item.content_id}
                    item={item}
                    onSelect={() => setSelectedItem(item)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <ViolationDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}

function ViolationCard({ 
  item, 
  vowFilter, 
  onSelect 
}: { 
  item: ContentCompliance; 
  vowFilter?: number;
  onSelect: () => void;
}) {
  const violations = vowFilter 
    ? item.violations.filter(v => v.vow === vowFilter)
    : item.violations;

  return (
    <button
      onClick={onSelect}
      className="w-full text-left bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 hover:border-[#5739FB]/50 transition-all"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-2 py-1 text-xs rounded font-mono ${
              item.compliance_score >= 80 ? 'bg-green-500/20 text-green-400' :
              item.compliance_score >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {item.compliance_score}%
            </span>
            <span className="text-sm text-white/60">{item.content_id}</span>
          </div>
          <h4 className="text-white mb-2">{item.title || 'Untitled Content'}</h4>
          <div className="flex flex-wrap gap-2">
            {violations.map((v, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs bg-white/10 text-white/60 rounded border border-white/10"
              >
                Vow {v.vow}: {v.message}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {violations.length > 0 ? (
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
          ) : (
            <CheckCircle className="w-5 h-5 text-green-500" />
          )}
        </div>
      </div>
    </button>
  );
}

function ViolationDetailModal({ item, onClose }: { item: ContentCompliance; onClose: () => void }) {
  async function handleFix(violation: ComplianceViolation) {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/compliance/fix/${item.content_id}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            violation_type: `vow_${violation.vow}`,
          }),
        }
      );

      alert('Fix applied!');
    } catch (error) {
      console.error('Error applying fix:', error);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8 overflow-y-auto">
      <div className="bg-[#0A0118] border border-white/10 rounded-xl p-8 max-w-2xl w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl mb-1">{item.title || 'Untitled Content'}</h2>
            <p className="text-white/40 text-sm">{item.content_id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <div className="text-4xl font-mono mb-2">{item.compliance_score}%</div>
          <p className="text-white/60">Compliance Score</p>
        </div>

        <div className="space-y-4">
          {item.violations.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <p className="text-white/60">No violations found. Content is compliant!</p>
            </div>
          ) : (
            item.violations.map((violation, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 text-xs rounded ${
                        violation.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                        violation.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        Vow {violation.vow} · {violation.severity}
                      </span>
                    </div>
                    <h4 className="text-white mb-1">{violation.message}</h4>
                    <p className="text-white/60 text-sm mb-3">{violation.fix}</p>
                    {violation.flagged_terms && (
                      <div className="text-sm">
                        <p className="text-white/40 mb-1">Flagged terms:</p>
                        <div className="flex flex-wrap gap-2">
                          {violation.flagged_terms.map((term, i) => (
                            <span key={i} className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">
                              {term} → {violation.alternatives?.[i]}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleFix(violation)}
                  className="w-full px-4 py-2 bg-[#5739FB] text-white rounded hover:bg-[#3E2BB8] transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Zap className="w-4 h-4" />
                  Apply Auto-Fix
                </button>
              </div>
            ))
          )}
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
