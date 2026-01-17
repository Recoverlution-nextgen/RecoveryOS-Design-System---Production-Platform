/**
 * PATIENT ROSTER STUDIO
 * Professional's dashboard: View all individuals under care
 * Features: Schema mapping, Risk indicators, Quick actions
 * 
 * UNIVERSAL PLAYER: Same, Same But Different
 * - Desktop: Full table view with inline actions
 * - Mobile: Swipeable card view (Instagram Stories style)
 * - LUMA: Voice summary of risk alerts
 */

import { useState, useEffect } from 'react';
import { Search, Plus, Filter, ArrowUpDown, MessageCircle, Calendar, User, Eye } from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { projectId } from '../../../utils/supabase/info';
import { useUser } from '../../../contexts/UserContext';
import { StudioHeader } from '../shared/StudioHeader';
import { RiskBadge } from '../shared/RiskBadge';
import { ContentRenderer } from '../../universal-player/ContentRenderer';

interface Patient {
  id: string;
  name: string;
  email: string;
  last_session: string | null;
  next_session: string | null;
  arousal_band: 'green' | 'amber' | 'red';
  primary_schemas: string[];
  engagement_score: number;
  risk_alerts: number;
  created_at: string;
}

interface PatientRosterProps {
  onBack: () => void;
  tenantScope: 'platform' | 'org' | 'professional';
}

export function PatientRoster({ onBack, tenantScope }: PatientRosterProps) {
  const { professionalId, userId } = useUser();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState<'all' | 'green' | 'amber' | 'red'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'last_session' | 'engagement' | 'risk'>('name');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [playerContent, setPlayerContent] = useState<any>(null);

  useEffect(() => {
    loadPatients();
  }, [professionalId]);

  async function loadPatients() {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !professionalId) {
        setLoading(false);
        return;
      }

      // Fetch patients for this professional
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/professionals/${professionalId}/patients`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPatients(data.patients || []);
      }
    } catch (error) {
      console.error('[PatientRoster] Error loading patients:', error);
    } finally {
      setLoading(false);
    }
  }

  // Filter and sort patients
  const filteredPatients = patients
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRisk = filterRisk === 'all' || p.arousal_band === filterRisk;
      return matchesSearch && matchesRisk;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'last_session':
          if (!a.last_session) return 1;
          if (!b.last_session) return -1;
          return new Date(b.last_session).getTime() - new Date(a.last_session).getTime();
        case 'engagement':
          return b.engagement_score - a.engagement_score;
        case 'risk':
          const riskOrder = { red: 0, amber: 1, green: 2 };
          return riskOrder[a.arousal_band] - riskOrder[b.arousal_band];
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B0F] text-white">
        <StudioHeader title="Patient Roster" subtitle="Loading..." onBack={onBack} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#3E2BB8] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="opacity-70">Loading patients...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      {/* Header */}
      <StudioHeader 
        title="Patient Roster" 
        subtitle={`${filteredPatients.length} individuals under your care`}
        onBack={onBack}
        actions={
          <>
            <button
              onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 transition-colors text-sm"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              {viewMode === 'table' ? 'Card View' : 'Table View'}
            </button>
            <button
              className="px-4 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors flex items-center gap-2 text-sm"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              <Plus className="w-4 h-4" />
              Add Individual
            </button>
          </>
        }
      />

      {/* Filters & Search */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 focus:border-[#3E2BB8] focus:outline-none transition-colors"
              style={{ fontFamily: 'var(--font-sans)' }}
            />
          </div>

          {/* Risk Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 opacity-50" />
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value as any)}
              className="px-4 py-2 bg-white/5 border border-white/10 focus:border-[#3E2BB8] focus:outline-none transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              <option value="all">All Risk Levels</option>
              <option value="red">Red Band Only</option>
              <option value="amber">Amber Band Only</option>
              <option value="green">Green Band Only</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-5 h-5 opacity-50" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 bg-white/5 border border-white/10 focus:border-[#3E2BB8] focus:outline-none transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              <option value="name">Name</option>
              <option value="last_session">Last Session</option>
              <option value="engagement">Engagement</option>
              <option value="risk">Risk Level</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {filteredPatients.length === 0 ? (
          <div className="text-center py-12">
            <User className="w-16 h-16 opacity-20 mx-auto mb-4" />
            <p className="opacity-50 mb-4">No patients found</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-sm text-[#5739FB] hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : viewMode === 'table' ? (
          /* Table View */
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Name</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Last Session</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Next Session</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Risk Level</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Schemas</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Engagement</th>
                  <th className="text-right py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>{patient.name}</div>
                        <div className="text-sm opacity-50">{patient.email}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {patient.last_session ? (
                        <div className="text-sm">
                          {new Date(patient.last_session).toLocaleDateString()}
                        </div>
                      ) : (
                        <span className="text-sm opacity-30">Never</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      {patient.next_session ? (
                        <div className="text-sm">
                          {new Date(patient.next_session).toLocaleDateString()}
                        </div>
                      ) : (
                        <span className="text-sm opacity-30">Not scheduled</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <RiskBadge level={patient.arousal_band} />
                      {patient.risk_alerts > 0 && (
                        <span className="ml-2 text-xs text-red-400">
                          {patient.risk_alerts} alert{patient.risk_alerts > 1 ? 's' : ''}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {patient.primary_schemas.length > 0 ? (
                          patient.primary_schemas.slice(0, 2).map((schema, idx) => (
                            <span 
                              key={idx}
                              className="px-2 py-1 bg-[#5739FB]/20 border border-[#5739FB]/30 text-xs"
                              style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
                            >
                              {schema}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm opacity-30">Not mapped</span>
                        )}
                        {patient.primary_schemas.length > 2 && (
                          <span className="text-xs opacity-50">+{patient.primary_schemas.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/10 overflow-hidden">
                          <div 
                            className="h-full bg-[#5739FB]"
                            style={{ width: `${patient.engagement_score}%` }}
                          />
                        </div>
                        <span className="text-sm">{patient.engagement_score}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            // Open patient timeline in UniversalPlayer
                            setSelectedPatient(patient);
                            // Mock timeline content - in production, fetch from API
                            setPlayerContent({
                              type: 'session_prep',
                              data: {
                                individual_id: patient.id,
                                individual_name: patient.name,
                                session_date: patient.next_session || new Date().toISOString(),
                                week_number: 4,
                                mttr_current: 23,
                                mttr_trend: 'improving' as const,
                                arousal_pattern: 'Morning spikes, stable afternoons',
                                risk_level: patient.arousal_band,
                                key_insights: [
                                  'Significant progress in emotional regulation practices',
                                  'Schema work showing early signs of integration',
                                  'Sleep quality has improved 40% over past 2 weeks'
                                ],
                                recent_events: [
                                  {
                                    date: new Date().toISOString(),
                                    type: 'State Check In',
                                    summary: 'Green band maintained for 3 consecutive days'
                                  },
                                  {
                                    date: new Date(Date.now() - 86400000).toISOString(),
                                    type: 'Practice Complete',
                                    summary: 'Completed RAIN practice with high engagement'
                                  }
                                ],
                                recommended_focus: ['Continue schema work', 'Introduce somatic practices', 'Build on regulation wins'],
                                ai_summary: `${patient.name} is showing consistent progress across multiple dimensions. MTTR has decreased from 35 to 23 minutes, indicating improved emotional regulation capacity. Primary schemas (${patient.primary_schemas.join(', ')}) are being actively worked on. Recommend maintaining current trajectory while introducing somatic practices to deepen embodiment.`
                              }
                            });
                          }}
                          className="p-2 hover:bg-white/10 transition-colors"
                          title="View timeline"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 hover:bg-white/10 transition-colors"
                          title="Send message"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 hover:bg-white/10 transition-colors"
                          title="Schedule session"
                        >
                          <Calendar className="w-4 h-4" />
                        </button>
                        <button
                          className="px-3 py-1 text-sm bg-white/5 hover:bg-white/10 transition-colors"
                          style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                        >
                          View Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Card View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="bg-white/5 border border-white/10 p-6 hover:border-white/20 hover:bg-white/8 transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                      {patient.name}
                    </h3>
                    <p className="text-sm opacity-50">{patient.email}</p>
                  </div>
                  <RiskBadge level={patient.arousal_band} size="sm" />
                </div>

                {/* Stats */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="opacity-70">Last Session</span>
                    <span>{patient.last_session ? new Date(patient.last_session).toLocaleDateString() : 'Never'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-70">Next Session</span>
                    <span>{patient.next_session ? new Date(patient.next_session).toLocaleDateString() : 'Not scheduled'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-70">Engagement</span>
                    <span>{patient.engagement_score}%</span>
                  </div>
                  {patient.risk_alerts > 0 && (
                    <div className="flex justify-between text-sm text-red-400">
                      <span>Risk Alerts</span>
                      <span>{patient.risk_alerts}</span>
                    </div>
                  )}
                </div>

                {/* Schemas */}
                {patient.primary_schemas.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs opacity-50 mb-2">Primary Schemas</p>
                    <div className="flex flex-wrap gap-1">
                      {patient.primary_schemas.map((schema, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-[#5739FB]/20 border border-[#5739FB]/30 text-xs"
                        >
                          {schema}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 transition-colors text-sm flex items-center justify-center gap-2"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </button>
                  <button
                    className="flex-1 px-3 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors text-sm"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* UNIVERSAL PLAYER MODAL */}
      {playerContent && (
        <div className="fixed inset-0 z-50 bg-black/90">
          <ContentRenderer
            content={playerContent.data}
            contentType={playerContent.type}
            onResponse={(response) => {
              console.log('[PatientRoster] Player response:', response);
            }}
            onClose={() => {
              setPlayerContent(null);
              setSelectedPatient(null);
            }}
          />
        </div>
      )}
    </div>
  );
}