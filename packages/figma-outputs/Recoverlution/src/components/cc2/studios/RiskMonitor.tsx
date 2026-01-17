/**
 * RISK MONITOR STUDIO
 * Real-time risk alerts and escalation protocols
 * HIGH VALUE: Professionals can respond to risk windows immediately
 */

import { useState, useEffect } from 'react';
import { AlertTriangle, Clock, Phone, MessageCircle, CheckCircle, X } from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { projectId } from '../../../utils/supabase/info';
import { useUser } from '../../../contexts/UserContext';
import { StudioHeader } from '../shared/StudioHeader';
import { RiskBadge } from '../shared/RiskBadge';

interface RiskAlert {
  id: string;
  individual_id: string;
  individual_name: string;
  alert_type: 'red_band' | 'rapid_decline' | 'no_engagement' | 'missed_checkin';
  severity: 'critical' | 'high' | 'medium';
  triggered_at: string;
  duration_minutes: number;
  current_state: {
    energy: number;
    clarity: number;
    connection: number;
  };
  last_contact: string;
  escalation_protocol: string[];
  status: 'active' | 'acknowledged' | 'resolved';
  notes?: string;
}

interface RiskMonitorProps {
  onBack: () => void;
  tenantScope: 'platform' | 'org' | 'professional';
}

export function RiskMonitor({ onBack, tenantScope }: RiskMonitorProps) {
  const { professionalId } = useUser();
  const [alerts, setAlerts] = useState<RiskAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'acknowledged' | 'resolved'>('active');
  const [selectedAlert, setSelectedAlert] = useState<RiskAlert | null>(null);
  const [actionNote, setActionNote] = useState('');

  useEffect(() => {
    loadAlerts();
    // Set up polling every 30 seconds for real-time updates
    const interval = setInterval(loadAlerts, 30000);
    return () => clearInterval(interval);
  }, [professionalId]);

  async function loadAlerts() {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !professionalId) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/professionals/${professionalId}/risk-alerts`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAlerts(data.alerts || []);
      }
    } catch (error) {
      console.error('[RiskMonitor] Error loading alerts:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateAlertStatus(alertId: string, status: 'acknowledged' | 'resolved', notes?: string) {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/risk-alerts/${alertId}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status, notes }),
        }
      );

      if (response.ok) {
        loadAlerts();
        setSelectedAlert(null);
        setActionNote('');
      }
    } catch (error) {
      console.error('[RiskMonitor] Error updating alert:', error);
    }
  }

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    return alert.status === filter;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#EF4444';
      case 'high': return '#F59E0B';
      case 'medium': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getAlertTypeLabel = (type: string) => {
    switch (type) {
      case 'red_band': return 'Red Band Alert';
      case 'rapid_decline': return 'Rapid Decline';
      case 'no_engagement': return 'No Engagement';
      case 'missed_checkin': return 'Missed Check-in';
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B0F] text-white">
        <StudioHeader title="Risk Monitor" subtitle="Loading..." onBack={onBack} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#3E2BB8] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="opacity-70">Loading risk alerts...</p>
          </div>
        </div>
      </div>
    );
  }

  const activeCount = alerts.filter(a => a.status === 'active').length;
  const criticalCount = alerts.filter(a => a.severity === 'critical' && a.status === 'active').length;

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      {/* Header */}
      <StudioHeader 
        title="Risk Monitor" 
        subtitle={`${activeCount} active alerts${criticalCount > 0 ? ` (${criticalCount} critical)` : ''}`}
        onBack={onBack}
      />

      {/* Filters */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex gap-2">
          {(['all', 'active', 'acknowledged', 'resolved'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm transition-colors ${
                filter === f 
                  ? 'bg-[#3E2BB8] text-white' 
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'active' && activeCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                  {activeCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="p-6">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-20">
            <CheckCircle className="w-16 h-16 opacity-20 mx-auto mb-4" />
            <p className="opacity-50">
              {filter === 'active' ? 'No active risk alerts' : `No ${filter} alerts`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`border p-6 hover:bg-white/5 transition-all cursor-pointer ${
                  selectedAlert?.id === alert.id ? 'bg-white/10' : 'bg-white/5'
                }`}
                style={{
                  borderColor: alert.status === 'active' ? getSeverityColor(alert.severity) : 'rgba(255,255,255,0.1)',
                  borderWidth: alert.status === 'active' ? '2px' : '1px'
                }}
                onClick={() => setSelectedAlert(alert)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle 
                      className="w-6 h-6 flex-shrink-0" 
                      style={{ color: getSeverityColor(alert.severity) }}
                    />
                    <div>
                      <h3 className="text-lg" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                        {alert.individual_name}
                      </h3>
                      <p className="text-sm opacity-70">
                        {getAlertTypeLabel(alert.alert_type)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div 
                      className="px-3 py-1 text-xs uppercase tracking-wider inline-block mb-2"
                      style={{
                        backgroundColor: `${getSeverityColor(alert.severity)}20`,
                        color: getSeverityColor(alert.severity),
                        border: `1px solid ${getSeverityColor(alert.severity)}50`
                      }}
                    >
                      {alert.severity}
                    </div>
                    <div className="text-sm opacity-50">
                      {Math.floor(alert.duration_minutes / 60)}h {alert.duration_minutes % 60}m ago
                    </div>
                  </div>
                </div>

                {/* Current State */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs opacity-50 mb-1">Energy</p>
                    <p className="text-lg" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                      {alert.current_state.energy}/10
                    </p>
                  </div>
                  <div>
                    <p className="text-xs opacity-50 mb-1">Clarity</p>
                    <p className="text-lg" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                      {alert.current_state.clarity}/10
                    </p>
                  </div>
                  <div>
                    <p className="text-xs opacity-50 mb-1">Connection</p>
                    <p className="text-lg" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                      {alert.current_state.connection}/10
                    </p>
                  </div>
                </div>

                {/* Last Contact */}
                <div className="flex items-center gap-2 text-sm opacity-70 mb-4">
                  <Clock className="w-4 h-4" />
                  Last contact: {new Date(alert.last_contact).toLocaleString()}
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                  {alert.status === 'active' && (
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs border border-red-500/30">
                      ACTIVE
                    </span>
                  )}
                  {alert.status === 'acknowledged' && (
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs border border-yellow-500/30">
                      ACKNOWLEDGED
                    </span>
                  )}
                  {alert.status === 'resolved' && (
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs border border-green-500/30">
                      RESOLVED
                    </span>
                  )}
                </div>

                {/* Expanded View */}
                {selectedAlert?.id === alert.id && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    {/* Escalation Protocol */}
                    <div className="mb-6">
                      <h4 className="text-sm uppercase tracking-wider opacity-70 mb-3">
                        Escalation Protocol
                      </h4>
                      <div className="space-y-2">
                        {alert.escalation_protocol.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-3 text-sm">
                            <div className="w-6 h-6 flex items-center justify-center bg-[#5739FB]/20 text-[#5739FB] flex-shrink-0">
                              {idx + 1}
                            </div>
                            <div>{step}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {alert.status === 'active' && (
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <button
                            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                          >
                            <Phone className="w-4 h-4" />
                            Call Individual
                          </button>
                          <button
                            className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                          >
                            <MessageCircle className="w-4 h-4" />
                            Send Message
                          </button>
                        </div>

                        <textarea
                          placeholder="Add notes about your response..."
                          value={actionNote}
                          onChange={(e) => setActionNote(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-[#3E2BB8] focus:outline-none transition-colors"
                          rows={3}
                          style={{ fontFamily: 'var(--font-sans)' }}
                        />

                        <div className="flex gap-3">
                          <button
                            onClick={() => updateAlertStatus(alert.id, 'acknowledged', actionNote)}
                            className="flex-1 px-4 py-3 bg-yellow-600 hover:bg-yellow-700 transition-colors"
                            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                          >
                            Acknowledge Alert
                          </button>
                          <button
                            onClick={() => updateAlertStatus(alert.id, 'resolved', actionNote)}
                            className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 transition-colors"
                            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                          >
                            Mark Resolved
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {alert.notes && (
                      <div className="mt-4 p-4 bg-white/5 border border-white/10">
                        <p className="text-xs uppercase tracking-wider opacity-50 mb-2">Notes</p>
                        <p className="text-sm">{alert.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
