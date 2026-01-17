/**
 * POPULATION HEALTH STUDIO
 * Organisation dashboard: Heat map of all alumni (Green/Amber/Red)
 * CRITICAL for org visibility and intervention
 */

import { useState, useEffect } from 'react';
import { Users, AlertTriangle, TrendingUp, Filter, Eye } from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { projectId } from '../../../utils/supabase/info';
import { useUser } from '../../../contexts/UserContext';
import { StudioHeader } from '../shared/StudioHeader';
import { StatsCard } from '../shared/StatsCard';
import { RiskBadge } from '../shared/RiskBadge';
import { ContentRenderer } from '../../universal-player/ContentRenderer';

interface Individual {
  id: string;
  name: string;
  email: string;
  risk_level: 'green' | 'amber' | 'red';
  program: string;
  assigned_professional: string;
  red_band_days: number;
  practice_dropout_rate: number;
  engagement_gap_days: number;
  last_activity: string;
}

interface PopulationHealthProps {
  onBack: () => void;
}

export function PopulationHealth({ onBack }: PopulationHealthProps) {
  const { organizationId } = useUser();
  const [individuals, setIndividuals] = useState<Individual[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterRisk, setFilterRisk] = useState<'all' | 'green' | 'amber' | 'red'>('all');
  const [filterProgram, setFilterProgram] = useState<string>('all');
  const [playerContent, setPlayerContent] = useState<any>(null);

  useEffect(() => {
    loadPopulationHealth();
  }, [organizationId]);

  async function loadPopulationHealth() {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !organizationId) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/population-health?organization_id=${organizationId}`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIndividuals(data.individuals || []);
      }
    } catch (error) {
      console.error('[PopulationHealth] Error:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredIndividuals = individuals.filter(i => {
    const matchesRisk = filterRisk === 'all' || i.risk_level === filterRisk;
    const matchesProgram = filterProgram === 'all' || i.program === filterProgram;
    return matchesRisk && matchesProgram;
  });

  const stats = {
    total: individuals.length,
    green: individuals.filter(i => i.risk_level === 'green').length,
    amber: individuals.filter(i => i.risk_level === 'amber').length,
    red: individuals.filter(i => i.risk_level === 'red').length,
  };

  const programs = [...new Set(individuals.map(i => i.program))];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B0F] text-white">
        <StudioHeader title="Population Health" subtitle="Loading..." onBack={onBack} />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin w-8 h-8 border-2 border-[#3E2BB8] border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <StudioHeader 
        title="Population Health" 
        subtitle={`${filteredIndividuals.length} individuals tracked`}
        onBack={onBack}
      />

      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatsCard
            icon={Users}
            label="Total Alumni"
            value={stats.total}
            sublabel="All programs"
          />
          <StatsCard
            label="Green Band"
            value={stats.green}
            sublabel={`${((stats.green / stats.total) * 100).toFixed(0)}% stable`}
          />
          <StatsCard
            label="Amber Band"
            value={stats.amber}
            sublabel={`${((stats.amber / stats.total) * 100).toFixed(0)}% watch`}
          />
          <StatsCard
            icon={AlertTriangle}
            label="Red Band"
            value={stats.red}
            sublabel={`${((stats.red / stats.total) * 100).toFixed(0)}% urgent`}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 opacity-50" />
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value as any)}
              className="px-4 py-2 bg-white/5 border border-white/10 focus:border-[#3E2BB8] focus:outline-none"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              <option value="all">All Risk Levels</option>
              <option value="red">Red Band Only</option>
              <option value="amber">Amber Band Only</option>
              <option value="green">Green Band Only</option>
            </select>
          </div>
          <select
            value={filterProgram}
            onChange={(e) => setFilterProgram(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 focus:border-[#3E2BB8] focus:outline-none"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            <option value="all">All Programs</option>
            {programs.map(prog => (
              <option key={prog} value={prog}>{prog}</option>
            ))}
          </select>
        </div>

        {/* Heat Map */}
        <div className="bg-white/5 border border-white/10 p-6">
          <h3 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
            Alumni Heat Map
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm opacity-70">Name</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70">Risk Level</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70">Program</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70">Professional</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70">Red Band Days</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70">Engagement Gap</th>
                  <th className="text-right py-3 px-4 text-sm opacity-70">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredIndividuals.map((individual) => (
                  <tr key={individual.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-4 px-4">
                      <div>
                        <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                          {individual.name}
                        </div>
                        <div className="text-sm opacity-50">{individual.email}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <RiskBadge level={individual.risk_level} />
                    </td>
                    <td className="py-4 px-4">{individual.program}</td>
                    <td className="py-4 px-4 text-sm">{individual.assigned_professional}</td>
                    <td className="py-4 px-4">
                      <span className={individual.red_band_days > 0 ? 'text-red-400' : 'opacity-50'}>
                        {individual.red_band_days} days
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={individual.engagement_gap_days > 3 ? 'text-amber-400' : 'opacity-50'}>
                        {individual.engagement_gap_days} days
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setPlayerContent({
                            type: 'session_prep',
                            data: {
                              individual_id: individual.id,
                              individual_name: individual.name,
                              session_date: new Date().toISOString(),
                              week_number: Math.floor(individual.red_band_days / 7) + 1,
                              mttr_current: individual.red_band_days * 10 + 120,
                              mttr_trend: 'increasing',
                              arousal_pattern: individual.risk_level === 'red' ? 'red_spike' : individual.risk_level === 'amber' ? 'yellow_stable' : 'green_low',
                              risk_level: individual.risk_level,
                              key_insights: [
                                `${individual.engagement_gap_days} day engagement gap`,
                                `${individual.practice_dropout_rate}% practice dropout`,
                                `Assigned to ${individual.assigned_professional}`
                              ],
                              recent_events: [`Last activity: ${new Date(individual.last_activity).toLocaleDateString()}`],
                              recommended_focus: individual.risk_level === 'red' ? 'Immediate intervention required' : 'Continue monitoring',
                              ai_summary: `${individual.name} showing ${individual.risk_level} band indicators with ${individual.red_band_days} days in red band.`
                            }
                          })}
                          className="px-3 py-1 text-sm bg-[#5739FB] hover:bg-[#3E2BB8] flex items-center gap-1"
                          style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                        >
                          <Eye className="w-4 h-4" />
                          View Prep
                        </button>
                        {individual.risk_level === 'red' && (
                          <button className="px-3 py-1 text-sm bg-red-500/20 hover:bg-red-500/30 text-red-400">
                            Intervene
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* UNIVERSAL PLAYER MODAL */}
      {playerContent && (
        <div className="fixed inset-0 z-50 bg-black/90">
          <ContentRenderer
            content={playerContent.data}
            contentType={playerContent.type}
            onResponse={(response) => {
              console.log('[PopulationHealth] Player response:', response);
            }}
            onClose={() => setPlayerContent(null)}
          />
        </div>
      )}
    </div>
  );
}