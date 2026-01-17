/**
 * EARNINGS DASHBOARD STUDIO
 * Revenue tracking, session billing, and financial metrics
 * HIGH VALUE: Transparency for professionals on earnings
 */

import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Calendar, Download, CheckCircle, Clock } from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { projectId } from '../../../utils/supabase/info';
import { useUser } from '../../../contexts/UserContext';
import { StudioHeader } from '../shared/StudioHeader';
import { StatsCard } from '../shared/StatsCard';

interface Session {
  id: string;
  individual_name: string;
  session_date: string;
  duration_minutes: number;
  rate: number;
  status: 'completed' | 'pending' | 'cancelled';
  payment_status: 'paid' | 'processing' | 'pending';
  notes?: string;
}

interface EarningsData {
  current_month: {
    total_earnings: number;
    completed_sessions: number;
    pending_sessions: number;
    avg_session_rate: number;
  };
  previous_month: {
    total_earnings: number;
    completed_sessions: number;
  };
  ytd: {
    total_earnings: number;
    total_sessions: number;
  };
  recent_sessions: Session[];
}

interface EarningsDashboardProps {
  onBack: () => void;
  tenantScope: 'platform' | 'org' | 'professional';
}

export function EarningsDashboard({ onBack, tenantScope }: EarningsDashboardProps) {
  const { professionalId } = useUser();
  const [data, setData] = useState<EarningsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<'month' | 'quarter' | 'year'>('month');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  useEffect(() => {
    loadEarningsData();
  }, [professionalId, dateRange]);

  async function loadEarningsData() {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !professionalId) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/professionals/${professionalId}/earnings?range=${dateRange}`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setData(responseData);
      }
    } catch (error) {
      console.error('[EarningsDashboard] Error loading earnings:', error);
    } finally {
      setLoading(false);
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return '#10B981';
      case 'processing': return '#F59E0B';
      case 'pending': return '#6B7280';
      default: return '#6B7280';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B0F] text-white">
        <StudioHeader title="Earnings Dashboard" subtitle="Loading..." onBack={onBack} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#3E2BB8] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="opacity-70">Loading earnings data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0A0B0F] text-white">
        <StudioHeader title="Earnings Dashboard" subtitle="No data available" onBack={onBack} />
      </div>
    );
  }

  const monthOverMonthChange = data.current_month.total_earnings - data.previous_month.total_earnings;
  const monthOverMonthPercent = data.previous_month.total_earnings > 0 
    ? ((monthOverMonthChange / data.previous_month.total_earnings) * 100).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      {/* Header */}
      <StudioHeader 
        title="Earnings Dashboard" 
        subtitle={`${data.current_month.completed_sessions} sessions completed this month`}
        onBack={onBack}
        actions={
          <button
            className="px-4 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors flex items-center gap-2 text-sm"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
        }
      />

      {/* Date Range Selector */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex gap-2">
          {(['month', 'quarter', 'year'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-4 py-2 text-sm transition-colors ${
                dateRange === range 
                  ? 'bg-[#3E2BB8] text-white' 
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard
            icon={DollarSign}
            label="This Month"
            value={`$${data.current_month.total_earnings.toLocaleString()}`}
            trend={{
              value: parseFloat(monthOverMonthPercent as string),
              direction: monthOverMonthChange >= 0 ? 'up' : 'down'
            }}
            sublabel={`${monthOverMonthChange >= 0 ? '+' : ''}$${Math.abs(monthOverMonthChange).toLocaleString()} from last month`}
          />
          <StatsCard
            icon={Calendar}
            label="Completed Sessions"
            value={data.current_month.completed_sessions}
            sublabel={`${data.current_month.pending_sessions} pending`}
          />
          <StatsCard
            icon={TrendingUp}
            label="Avg Session Rate"
            value={`$${data.current_month.avg_session_rate.toFixed(0)}`}
            sublabel="Per session"
          />
          <StatsCard
            icon={DollarSign}
            label="Year to Date"
            value={`$${data.ytd.total_earnings.toLocaleString()}`}
            sublabel={`${data.ytd.total_sessions} total sessions`}
          />
        </div>

        {/* Monthly Breakdown Chart Placeholder */}
        <div className="bg-white/5 border border-white/10 p-6">
          <h3 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
            Monthly Earnings Trend
          </h3>
          <div className="h-64 flex items-center justify-center opacity-50">
            <p className="text-sm">Chart visualization coming soon</p>
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="bg-white/5 border border-white/10 p-6">
          <h3 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
            Recent Sessions
          </h3>

          {data.recent_sessions.length === 0 ? (
            <div className="text-center py-12 opacity-50">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No sessions recorded yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Date</th>
                    <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Individual</th>
                    <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Duration</th>
                    <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Rate</th>
                    <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Status</th>
                    <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recent_sessions.map((session) => (
                    <tr 
                      key={session.id} 
                      className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() => setSelectedSession(session)}
                    >
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          {new Date(session.session_date).toLocaleDateString()}
                        </div>
                        <div className="text-xs opacity-50">
                          {new Date(session.session_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                          {session.individual_name}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">{session.duration_minutes} min</div>
                      </td>
                      <td className="py-4 px-4">
                        <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                          ${session.rate.toFixed(0)}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {session.status === 'completed' && (
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs border border-green-500/30">
                            Completed
                          </span>
                        )}
                        {session.status === 'pending' && (
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs border border-yellow-500/30">
                            Pending
                          </span>
                        )}
                        {session.status === 'cancelled' && (
                          <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs border border-red-500/30">
                            Cancelled
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: getPaymentStatusColor(session.payment_status) }}
                          />
                          <span className="text-sm capitalize">{session.payment_status}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Session Detail Modal */}
        {selectedSession && (
          <div 
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
            onClick={() => setSelectedSession(null)}
          >
            <div 
              className="bg-[#0A0B0F] border border-white/20 p-8 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  Session Details
                </h2>
                <button
                  onClick={() => setSelectedSession(null)}
                  className="p-2 hover:bg-white/10 transition-colors"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm opacity-50 mb-1">Individual</p>
                  <p className="text-lg">{selectedSession.individual_name}</p>
                </div>

                <div>
                  <p className="text-sm opacity-50 mb-1">Date & Time</p>
                  <p className="text-lg">
                    {new Date(selectedSession.session_date).toLocaleString()}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm opacity-50 mb-1">Duration</p>
                    <p className="text-lg">{selectedSession.duration_minutes} min</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-50 mb-1">Rate</p>
                    <p className="text-lg">${selectedSession.rate.toFixed(0)}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-50 mb-1">Status</p>
                    <p className="text-lg capitalize">{selectedSession.status}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm opacity-50 mb-1">Payment Status</p>
                  <p className="text-lg capitalize" style={{ color: getPaymentStatusColor(selectedSession.payment_status) }}>
                    {selectedSession.payment_status}
                  </p>
                </div>

                {selectedSession.notes && (
                  <div>
                    <p className="text-sm opacity-50 mb-1">Notes</p>
                    <p className="text-sm opacity-80">{selectedSession.notes}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <button
                  onClick={() => setSelectedSession(null)}
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
    </div>
  );
}
