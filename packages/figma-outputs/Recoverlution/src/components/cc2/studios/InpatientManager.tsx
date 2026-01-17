/**
 * INPATIENT MANAGER STUDIO
 * Daily schedules, room assignments, staff coordination for inpatient programs
 * HIGH VALUE: Critical for residential treatment centers
 */

import { useState, useEffect } from 'react';
import { Bed, Users, Calendar, Clock, AlertCircle, CheckCircle, Activity } from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { projectId } from '../../../utils/supabase/info';
import { useUser } from '../../../contexts/UserContext';
import { StudioHeader } from '../shared/StudioHeader';
import { RiskBadge } from '../shared/RiskBadge';

interface InpatientRecord {
  id: string;
  patient_name: string;
  admission_date: string;
  room_number: string;
  bed_assignment: string;
  primary_therapist: string;
  treatment_phase: 'intake' | 'active' | 'transition' | 'discharge';
  risk_level: 'green' | 'amber' | 'red';
  scheduled_activities: Array<{
    time: string;
    activity: string;
    location: string;
    staff: string;
  }>;
  vitals_check_due: boolean;
  medication_schedule: Array<{
    time: string;
    medication: string;
    administered: boolean;
  }>;
  notes: string;
  length_of_stay_days: number;
}

interface InpatientManagerProps {
  onBack: () => void;
  tenantScope: 'platform' | 'org' | 'professional';
}

export function InpatientManager({ onBack, tenantScope }: InpatientManagerProps) {
  const { organisationId, userId } = useUser();
  const [patients, setPatients] = useState<InpatientRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'floor' | 'schedule' | 'list'>('floor');
  const [selectedPatient, setSelectedPatient] = useState<InpatientRecord | null>(null);
  const [filterPhase, setFilterPhase] = useState<string>('all');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    loadPatients();
    // Refresh every 2 minutes for real-time updates
    const interval = setInterval(loadPatients, 120000);
    return () => clearInterval(interval);
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
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/organisations/${organisationId}/inpatients`,
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
      console.error('[InpatientManager] Error loading patients:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredPatients = patients.filter(p => {
    if (filterPhase === 'all') return true;
    return p.treatment_phase === filterPhase;
  });

  const groupByFloor = () => {
    const floors: { [key: string]: InpatientRecord[] } = {};
    filteredPatients.forEach(p => {
      const floor = p.room_number.charAt(0);
      if (!floors[floor]) floors[floor] = [];
      floors[floor].push(p);
    });
    return floors;
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'intake': return '#F59E0B';
      case 'active': return '#10B981';
      case 'transition': return '#3B82F6';
      case 'discharge': return '#6B7280';
      default: return '#6B7280';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B0F] text-white">
        <StudioHeader title="Inpatient Manager" subtitle="Loading..." onBack={onBack} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#3E2BB8] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="opacity-70">Loading inpatient data...</p>
          </div>
        </div>
      </div>
    );
  }

  const criticalCount = patients.filter(p => p.risk_level === 'red').length;
  const vitalsOverdueCount = patients.filter(p => p.vitals_check_due).length;

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      {/* Header */}
      <StudioHeader 
        title="Inpatient Manager" 
        subtitle={`${patients.length} active residents${criticalCount > 0 ? ` • ${criticalCount} critical alerts` : ''}`}
        onBack={onBack}
      />

      {/* Controls */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* View Mode */}
          <div className="flex gap-2">
            {(['floor', 'schedule', 'list'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 text-sm transition-colors ${
                  viewMode === mode 
                    ? 'bg-[#3E2BB8] text-white' 
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)} View
              </button>
            ))}
          </div>

          {/* Phase Filter */}
          <div className="flex gap-2">
            <select
              value={filterPhase}
              onChange={(e) => setFilterPhase(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 focus:border-[#3E2BB8] focus:outline-none transition-colors text-sm"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              <option value="all">All Phases</option>
              <option value="intake">Intake</option>
              <option value="active">Active Treatment</option>
              <option value="transition">Transition</option>
              <option value="discharge">Discharge Prep</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alerts Banner */}
      {(criticalCount > 0 || vitalsOverdueCount > 0) && (
        <div className="px-6 py-3 bg-red-500/10 border-b border-red-500/30 flex items-center gap-4">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <div className="flex gap-6 text-sm">
            {criticalCount > 0 && (
              <span className="text-red-400">{criticalCount} critical risk alerts</span>
            )}
            {vitalsOverdueCount > 0 && (
              <span className="text-yellow-400">{vitalsOverdueCount} vitals checks overdue</span>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {viewMode === 'floor' ? (
          /* Floor Plan View */
          <div className="space-y-6">
            {Object.entries(groupByFloor()).map(([floor, floorPatients]) => (
              <div key={floor} className="bg-white/5 border border-white/10 p-6">
                <h3 className="text-xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  Floor {floor}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {floorPatients.map(patient => (
                    <button
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient)}
                      className="text-left bg-white/5 border border-white/10 p-4 hover:bg-white/10 hover:border-white/20 transition-all"
                    >
                      {/* Room Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Bed className="w-5 h-5 opacity-50" />
                          <span className="text-lg" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                            {patient.room_number}-{patient.bed_assignment}
                          </span>
                        </div>
                        <RiskBadge level={patient.risk_level} size="sm" />
                      </div>

                      {/* Patient Info */}
                      <div className="mb-3">
                        <p className="mb-1" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                          {patient.patient_name}
                        </p>
                        <p className="text-xs opacity-50">
                          Day {patient.length_of_stay_days}
                        </p>
                      </div>

                      {/* Phase */}
                      <div 
                        className="px-2 py-1 text-xs inline-block"
                        style={{
                          backgroundColor: `${getPhaseColor(patient.treatment_phase)}20`,
                          color: getPhaseColor(patient.treatment_phase),
                          border: `1px solid ${getPhaseColor(patient.treatment_phase)}50`
                        }}
                      >
                        {patient.treatment_phase.toUpperCase()}
                      </div>

                      {/* Alerts */}
                      {patient.vitals_check_due && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-yellow-400">
                          <Activity className="w-3 h-3" />
                          Vitals Due
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : viewMode === 'schedule' ? (
          /* Daily Schedule View */
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 p-4 mb-4">
              <h3 className="text-lg mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                Daily Schedule - {currentDate.toLocaleDateString()}
              </h3>
            </div>

            {filteredPatients.map(patient => (
              <div key={patient.id} className="bg-white/5 border border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg mb-1" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                      {patient.patient_name}
                    </h4>
                    <p className="text-sm opacity-50">Room {patient.room_number}-{patient.bed_assignment}</p>
                  </div>
                  <RiskBadge level={patient.risk_level} />
                </div>

                {/* Activities */}
                <div className="space-y-2">
                  {patient.scheduled_activities.map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 bg-white/5 border border-white/10">
                      <div className="text-sm" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, minWidth: '80px' }}>
                        {activity.time}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.activity}</p>
                        <p className="text-xs opacity-50">{activity.location} • {activity.staff}</p>
                      </div>
                    </div>
                  ))}

                  {/* Medications */}
                  {patient.medication_schedule.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs uppercase tracking-wider opacity-50 mb-2">Medications</p>
                      {patient.medication_schedule.map((med, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-2 bg-blue-500/10 border border-blue-500/30">
                          <div className="text-sm" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, minWidth: '80px' }}>
                            {med.time}
                          </div>
                          <div className="flex-1 text-sm">{med.medication}</div>
                          {med.administered ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <Clock className="w-4 h-4 text-yellow-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Room</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Patient</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Therapist</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Phase</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Risk</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>LOS</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map(patient => (
                  <tr 
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Bed className="w-4 h-4 opacity-50" />
                        {patient.room_number}-{patient.bed_assignment}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                        {patient.patient_name}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm opacity-70">
                      {patient.primary_therapist}
                    </td>
                    <td className="py-4 px-4">
                      <span 
                        className="px-2 py-1 text-xs"
                        style={{
                          backgroundColor: `${getPhaseColor(patient.treatment_phase)}20`,
                          color: getPhaseColor(patient.treatment_phase),
                          border: `1px solid ${getPhaseColor(patient.treatment_phase)}50`
                        }}
                      >
                        {patient.treatment_phase}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <RiskBadge level={patient.risk_level} size="sm" />
                    </td>
                    <td className="py-4 px-4 text-sm">
                      {patient.length_of_stay_days} days
                    </td>
                    <td className="py-4 px-4">
                      {patient.vitals_check_due && (
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs border border-yellow-500/30">
                          Vitals Due
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6 overflow-y-auto"
          onClick={() => setSelectedPatient(null)}
        >
          <div 
            className="bg-[#0A0B0F] border border-white/20 p-8 max-w-4xl w-full my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  {selectedPatient.patient_name}
                </h2>
                <p className="text-sm opacity-50">
                  Room {selectedPatient.room_number}-{selectedPatient.bed_assignment} • Admitted {new Date(selectedPatient.admission_date).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedPatient(null)}
                className="p-2 hover:bg-white/10 transition-colors"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm opacity-50 mb-1">Primary Therapist</p>
                <p>{selectedPatient.primary_therapist}</p>
              </div>
              <div>
                <p className="text-sm opacity-50 mb-1">Treatment Phase</p>
                <span 
                  className="px-3 py-1 text-sm inline-block"
                  style={{
                    backgroundColor: `${getPhaseColor(selectedPatient.treatment_phase)}20`,
                    color: getPhaseColor(selectedPatient.treatment_phase),
                    border: `1px solid ${getPhaseColor(selectedPatient.treatment_phase)}50`
                  }}
                >
                  {selectedPatient.treatment_phase.toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm opacity-50 mb-1">Risk Level</p>
                <RiskBadge level={selectedPatient.risk_level} />
              </div>
              <div>
                <p className="text-sm opacity-50 mb-1">Length of Stay</p>
                <p>{selectedPatient.length_of_stay_days} days</p>
              </div>
            </div>

            {selectedPatient.notes && (
              <div className="mb-6 p-4 bg-white/5 border border-white/10">
                <p className="text-sm opacity-50 mb-2">Clinical Notes</p>
                <p className="text-sm opacity-80">{selectedPatient.notes}</p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-white/10">
              <button
                onClick={() => setSelectedPatient(null)}
                className="w-full px-4 py-3 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
