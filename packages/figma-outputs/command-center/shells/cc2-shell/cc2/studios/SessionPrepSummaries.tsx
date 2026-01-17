/**
 * SESSION PREP SUMMARIES STUDIO
 * Week-at-a-glance before sessions with MTTR tracking
 * HIGH VALUE: Shows professionals exactly what happened between sessions
 */

import { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Activity, CheckCircle, AlertCircle, Star, Eye } from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { projectId } from '../../../utils/supabase/info';
import { useUser } from '../../../contexts/UserContext';
import { StudioHeader } from '../shared/StudioHeader';
import { StatsCard } from '../shared/StatsCard';
import { RiskBadge } from '../shared/RiskBadge';
import { ContentRenderer } from '../../universal-player/ContentRenderer';

interface SessionPrepData {
  individual_id: string;
  individual_name: string;
  week_start: string;
  week_end: string;
  state_summary: {
    avg_energy: number;
    avg_clarity: number;
    avg_connection: number;
    red_band_days: number;
    risk_windows: Array<{ start: string; end: string }>;
  };
  practice_summary: {
    assigned: number;
    completed: number;
    adherence_rate: number;
  };
  navicue_summary: {
    total_engagements: number;
    avg_dwell_seconds: number;
    top_families: string[];
  };
  proof_events_count: number;
  mttr_this_week: number;
  mttr_trend: number;
  ai_insights: string;
  next_session: string;
}

interface SessionPrepSummariesProps {
  onBack: () => void;
  tenantScope: 'platform' | 'org' | 'professional';
}

export function SessionPrepSummaries({ onBack, tenantScope }: SessionPrepSummariesProps) {
  const { professionalId } = useUser();
  const [selectedIndividual, setSelectedIndividual] = useState<string>('');
  const [individuals, setIndividuals] = useState<Array<{ id: string; name: string }>>([]);
  const [prepData, setPrepData] = useState<SessionPrepData | null>(null);
  const [loading, setLoading] = useState(false);
  const [playerContent, setPlayerContent] = useState<any>(null);

  useEffect(() => {
    loadIndividuals();
  }, [professionalId]);

  useEffect(() => {
    if (selectedIndividual) {
      loadPrepData(selectedIndividual);
    }
  }, [selectedIndividual]);

  async function loadIndividuals() {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !professionalId) return;

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
        setIndividuals(data.patients?.map((p: any) => ({ id: p.id, name: p.name })) || []);
        if (data.patients?.length > 0) {
          setSelectedIndividual(data.patients[0].id);
        }
      }
    } catch (error) {
      console.error('[SessionPrepSummaries] Error loading individuals:', error);
    }
  }

  async function loadPrepData(individualId: string) {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/session-prep/${individualId}`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPrepData(data);
      }
    } catch (error) {
      console.error('[SessionPrepSummaries] Error loading prep data:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <StudioHeader 
        title="Session Prep Summaries" 
        subtitle="Week-at-a-glance before your sessions"
        onBack={onBack}
      />

      <div className="p-6">
        {/* Individual Selector */}
        <div className="mb-6">
          <label className="block text-sm opacity-70 mb-2" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
            Select Individual
          </label>
          <select
            value={selectedIndividual}
            onChange={(e) => setSelectedIndividual(e.target.value)}
            className="w-full md:w-96 px-4 py-3 bg-white/5 border border-white/10 focus:border-[#3E2BB8] focus:outline-none transition-colors text-lg"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            {individuals.map(ind => (
              <option key={ind.id} value={ind.id}>{ind.name}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-[#3E2BB8] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="opacity-70">Generating summary...</p>
            </div>
          </div>
        ) : prepData ? (
          <div className="space-y-6">
            {/* Next Session Alert */}
            {prepData.next_session && (
              <div className="bg-[#3E2BB8]/20 border border-[#3E2BB8]/40 p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#5739FB]" />
                  <div>
                    <p className="text-sm opacity-70">Next Session</p>
                    <p className="text-lg" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                      {new Date(prepData.next_session).toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const selectedInd = individuals.find(i => i.id === selectedIndividual);
                    setPlayerContent({
                      type: 'session_prep',
                      data: {
                        individual_id: prepData.individual_id,
                        individual_name: selectedInd?.name || prepData.individual_name,
                        session_date: prepData.next_session,
                        week_number: Math.ceil((new Date().getTime() - new Date(prepData.week_start).getTime()) / (7 * 24 * 60 * 60 * 1000)),
                        mttr_current: Math.round(prepData.mttr_this_week * 60),
                        mttr_trend: prepData.mttr_trend < 0 ? 'improving' as const : prepData.mttr_trend > 0 ? 'declining' as const : 'stable' as const,
                        arousal_pattern: `${prepData.state_summary.red_band_days} red band days this week`,
                        risk_level: prepData.state_summary.red_band_days > 3 ? 'red' as const : prepData.state_summary.red_band_days > 0 ? 'amber' as const : 'green' as const,
                        key_insights: [
                          `${prepData.practice_summary.adherence_rate}% practice adherence (${prepData.practice_summary.completed}/${prepData.practice_summary.assigned} completed)`,
                          `${prepData.navicue_summary.total_engagements} NaviCue engagements with ${prepData.navicue_summary.avg_dwell_seconds}s average dwell time`,
                          `${prepData.proof_events_count} proof events captured this week`
                        ],
                        recent_events: prepData.state_summary.risk_windows.map(w => ({
                          date: w.start,
                          type: 'Risk Window',
                          summary: `Duration: ${Math.round((new Date(w.end).getTime() - new Date(w.start).getTime()) / 3600000)}h`
                        })),
                        recommended_focus: prepData.navicue_summary.top_families,
                        ai_summary: prepData.ai_insights
                      }
                    });
                  }}
                  className="px-4 py-2 bg-[#5739FB] hover:bg-[#3E2BB8] transition-colors flex items-center gap-2 text-sm"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                >
                  <Eye className="w-4 h-4" />
                  View in Player
                </button>
              </div>
            )}

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <StatsCard
                icon={Activity}
                label="Avg State Score"
                value={`${((prepData.state_summary.avg_energy + prepData.state_summary.avg_clarity + prepData.state_summary.avg_connection) / 3).toFixed(1)}/10`}
                sublabel={`${prepData.state_summary.red_band_days} red band days`}
              />
              <StatsCard
                icon={CheckCircle}
                label="Practice Adherence"
                value={`${prepData.practice_summary.adherence_rate}%`}
                sublabel={`${prepData.practice_summary.completed}/${prepData.practice_summary.assigned} completed`}
              />
              <StatsCard
                icon={TrendingUp}
                label="MTTR This Week"
                value={`${prepData.mttr_this_week}h`}
                trend={{
                  value: prepData.mttr_trend,
                  direction: prepData.mttr_trend > 0 ? 'down' : 'up'
                }}
                sublabel="Mean Time To Return"
              />
              <StatsCard
                icon={Star}
                label="Proof Events"
                value={prepData.proof_events_count}
                sublabel="Captured this week"
              />
            </div>

            {/* AI Insights */}
            <div className="bg-white/5 border border-white/10 p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-[#5739FB]" />
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  AI Insights
                </h3>
              </div>
              <p className="opacity-80 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                {prepData.ai_insights}
              </p>
            </div>

            {/* State Timeline */}
            <div className="bg-white/5 border border-white/10 p-6">
              <h3 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                State Timeline (7 Days)
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="opacity-70">Energy</span>
                    <span>{prepData.state_summary.avg_energy.toFixed(1)}/10</span>
                  </div>
                  <div className="h-2 bg-white/10 overflow-hidden">
                    <div 
                      className="h-full bg-[#5739FB]"
                      style={{ width: `${(prepData.state_summary.avg_energy / 10) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="opacity-70">Clarity</span>
                    <span>{prepData.state_summary.avg_clarity.toFixed(1)}/10</span>
                  </div>
                  <div className="h-2 bg-white/10 overflow-hidden">
                    <div 
                      className="h-full bg-[#5739FB]"
                      style={{ width: `${(prepData.state_summary.avg_clarity / 10) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="opacity-70">Connection</span>
                    <span>{prepData.state_summary.avg_connection.toFixed(1)}/10</span>
                  </div>
                  <div className="h-2 bg-white/10 overflow-hidden">
                    <div 
                      className="h-full bg-[#5739FB]"
                      style={{ width: `${(prepData.state_summary.avg_connection / 10) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* NaviCue Engagement */}
            <div className="bg-white/5 border border-white/10 p-6">
              <h3 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                NaviCue Engagement
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm opacity-70 mb-1">Total Engagements</p>
                  <p className="text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                    {prepData.navicue_summary.total_engagements}
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-70 mb-1">Avg Dwell Time</p>
                  <p className="text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                    {prepData.navicue_summary.avg_dwell_seconds}s
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-70 mb-1">Top Families</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {prepData.navicue_summary.top_families.map((family, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 bg-[#5739FB]/20 border border-[#5739FB]/30 text-xs"
                      >
                        {family}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Windows */}
            {prepData.state_summary.risk_windows.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/30 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <h3 className="text-red-400" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                    Risk Windows ({prepData.state_summary.risk_windows.length})
                  </h3>
                </div>
                <div className="space-y-2">
                  {prepData.state_summary.risk_windows.map((window, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-sm">
                      <span className="opacity-70">
                        {new Date(window.start).toLocaleString()} → {new Date(window.end).toLocaleString()}
                      </span>
                      <span className="text-red-400">
                        Duration: {Math.round((new Date(window.end).getTime() - new Date(window.start).getTime()) / 3600000)}h
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 opacity-20 mx-auto mb-4" />
            <p className="opacity-50">Select an individual to view their session prep summary</p>
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
              console.log('[SessionPrepSummaries] Player response:', response);
            }}
            onClose={() => setPlayerContent(null)}
          />
        </div>
      )}
    </div>
  );
}