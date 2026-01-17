/**
 * PATIENT ROSTER ORG STUDIO
 * Organisation-wide view: All individuals across all professionals
 * Features: Professional assignment, cross-org analytics, bulk actions
 */

import { useState, useEffect } from 'react';
import { Search, Filter, ArrowUpDown, User, Users, TrendingUp } from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { projectId } from '../../../utils/supabase/info';
import { useUser } from '../../../contexts/UserContext';
import { StudioHeader } from '../shared/StudioHeader';
import { RiskBadge } from '../shared/RiskBadge';
import { StatsCard } from '../shared/StatsCard';

interface OrgPatient {
  id: string;
  name: string;
  email: string;
  professional_id: string;
  professional_name: string;
  admission_date: string;
  arousal_band: 'green' | 'amber' | 'red';
  engagement_score: number;
  mttr_current: number;
  days_in_program: number;
  status: 'active' | 'paused' | 'completed' | 'discharged';
}

interface PatientRosterOrgProps {
  onBack: () => void;
  tenantScope: 'platform' | 'org' | 'professional';
}

export function PatientRosterOrg({ onBack, tenantScope }: PatientRosterOrgProps) {
  const { organisationId } = useUser();
  const [patients, setPatients] = useState<OrgPatient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProfessional, setFilterProfessional] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('active');
  const [sortBy, setSortBy] = useState<'name' | 'professional' | 'engagement' | 'risk'>('name');

  useEffect(() => {
    loadPatients();
  }, [organisationId]);

  async function loadPatients() {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !organisationId) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/organisations/${organisationId}/patients`,
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
      console.error('[PatientRosterOrg] Error loading patients:', error);
    } finally {
      setLoading(false);
    }
  }

  const professionals = Array.from(new Set(patients.map(p => ({ id: p.professional_id, name: p.professional_name }))))
    .filter((p, idx, arr) => arr.findIndex(x => x.id === p.id) === idx);

  const filteredPatients = patients
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesProfessional = filterProfessional === 'all' || p.professional_id === filterProfessional;
      const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
      return matchesSearch && matchesProfessional && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'professional':
          return a.professional_name.localeCompare(b.professional_name);
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
        <StudioHeader title="Patient Roster (Organisation)" subtitle="Loading..." onBack={onBack} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#3E2BB8] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="opacity-70">Loading organisation roster...</p>
          </div>
        </div>
      </div>
    );
  }

  const activeCount = patients.filter(p => p.status === 'active').length;
  const avgEngagement = patients.length > 0 ? patients.reduce((sum, p) => sum + p.engagement_score, 0) / patients.length : 0;
  const criticalCount = patients.filter(p => p.arousal_band === 'red').length;

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <StudioHeader 
        title="Patient Roster (Organisation)" 
        subtitle={`${activeCount} active individuals across ${professionals.length} professionals`}
        onBack={onBack}
      />

      {/* Org-Level Stats */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard
            icon={Users}
            label="Total Active"
            value={activeCount}
            sublabel={`${professionals.length} professionals`}
          />
          <StatsCard
            icon={TrendingUp}
            label="Avg Engagement"
            value={`${avgEngagement.toFixed(0)}%`}
            trend={{ value: 5.2, direction: 'up' }}
            sublabel="Across all individuals"
          />
          <StatsCard
            icon={User}
            label="Avg Caseload"
            value={(activeCount / professionals.length).toFixed(1)}
            sublabel="Per professional"
          />
          <StatsCard
            icon={User}
            label="Critical Alerts"
            value={criticalCount}
            sublabel={criticalCount > 0 ? 'Requires attention' : 'All stable'}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex flex-col md:flex-row gap-4">
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

          <select
            value={filterProfessional}
            onChange={(e) => setFilterProfessional(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 focus:border-[#3E2BB8] focus:outline-none transition-colors"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            <option value="all">All Professionals</option>
            {professionals.map(prof => (
              <option key={prof.id} value={prof.id}>{prof.name}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 focus:border-[#3E2BB8] focus:outline-none transition-colors"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
            <option value="discharged">Discharged</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 bg-white/5 border border-white/10 focus:border-[#3E2BB8] focus:outline-none transition-colors"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            <option value="name">Name</option>
            <option value="professional">Professional</option>
            <option value="engagement">Engagement</option>
            <option value="risk">Risk Level</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="p-6">
        {filteredPatients.length === 0 ? (
          <div className="text-center py-20">
            <User className="w-16 h-16 opacity-20 mx-auto mb-4" />
            <p className="opacity-50">No patients found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Name</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Professional</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Days in Program</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Risk</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Engagement</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>MTTR</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Status</th>
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
                    <td className="py-4 px-4 text-sm">
                      {patient.professional_name}
                    </td>
                    <td className="py-4 px-4 text-sm">
                      {patient.days_in_program} days
                    </td>
                    <td className="py-4 px-4">
                      <RiskBadge level={patient.arousal_band} size="sm" />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/10 max-w-[100px]">
                          <div 
                            className="h-full bg-[#5739FB]"
                            style={{ width: `${patient.engagement_score}%` }}
                          />
                        </div>
                        <span className="text-sm">{patient.engagement_score}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm">
                      {patient.mttr_current} min
                    </td>
                    <td className="py-4 px-4">
                      <span 
                        className={`px-2 py-1 text-xs capitalize ${
                          patient.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                          patient.status === 'paused' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                          patient.status === 'completed' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                          'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                        }`}
                      >
                        {patient.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
