/**
 * PLATFORM ADMIN PAGE
 * Complete platform oversight for platform owners
 */

import { useState, useEffect } from 'react';
import { createClient } from '../../utils/supabase/client';

interface PlatformStats {
  total_patients: number;
  total_professionals: number;
  total_organizations: number;
  active_sessions_today: number;
  monthly_revenue: number;
  total_navicues_delivered: number;
  avg_momentum_score: number;
}

export default function PlatformAdminPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [stats, setStats] = useState<PlatformStats>({
    total_patients: 0,
    total_professionals: 0,
    total_organizations: 0,
    active_sessions_today: 0,
    monthly_revenue: 0,
    total_navicues_delivered: 0,
    avg_momentum_score: 0
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadPlatformStats();
  }, []);

  async function loadPlatformStats() {
    // This would pull from actual database
    // For now using mock data
    setStats({
      total_patients: 1247,
      total_professionals: 89,
      total_organizations: 12,
      active_sessions_today: 34,
      monthly_revenue: 62350,
      total_navicues_delivered: 45678,
      avg_momentum_score: 76
    });
    setLoading(false);
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="flex justify-between items-start mb-12">
        <div>
          <h1 className="mb-2">Platform Administration</h1>
          <p className="text-lg opacity-70">Complete oversight of Recoverlution platform</p>
        </div>
        <button
          onClick={() => onNavigate('Dashboard')}
          className="px-4 py-2 bg-white bg-opacity-10 rounded hover:bg-opacity-20 transition-all"
        >
          Exit Admin
        </button>
      </header>

      {/* Key Metrics */}
      <section className="mb-12">
        <h2 className="mb-6">Key Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
            <p className="text-sm opacity-70 mb-2">Total Patients</p>
            <p className="text-3xl">{stats.total_patients.toLocaleString()}</p>
          </div>
          
          <div className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
            <p className="text-sm opacity-70 mb-2">Professionals</p>
            <p className="text-3xl">{stats.total_professionals}</p>
          </div>
          
          <div className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
            <p className="text-sm opacity-70 mb-2">Organizations</p>
            <p className="text-3xl">{stats.total_organizations}</p>
          </div>
          
          <div className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
            <p className="text-sm opacity-70 mb-2">Sessions Today</p>
            <p className="text-3xl">{stats.active_sessions_today}</p>
          </div>
          
          <div className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
            <p className="text-sm opacity-70 mb-2">Monthly Revenue</p>
            <p className="text-3xl">${(stats.monthly_revenue / 1000).toFixed(0)}K</p>
          </div>
          
          <div className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
            <p className="text-sm opacity-70 mb-2">NaviCues Delivered</p>
            <p className="text-3xl">{(stats.total_navicues_delivered / 1000).toFixed(1)}K</p>
          </div>
          
          <div className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
            <p className="text-sm opacity-70 mb-2">Avg Momentum</p>
            <p className="text-3xl">{stats.avg_momentum_score}</p>
          </div>
          
          <div className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
            <p className="text-sm opacity-70 mb-2">Platform Health</p>
            <p className="text-3xl text-green-400">98%</p>
          </div>
        </div>
      </section>

      {/* Admin Tools */}
      <section className="mb-12">
        <h2 className="mb-6">Administration Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => onNavigate('backend-admin')}
            className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 hover:border-opacity-20 transition-all text-left"
          >
            <div className="text-3xl mb-3">🗄️</div>
            <h3 className="mb-2">Database Admin</h3>
            <p className="text-sm opacity-70">KV store management, data exports</p>
          </button>
          
          <button
            onClick={() => onNavigate('admin-navicue-sync')}
            className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 hover:border-opacity-20 transition-all text-left"
          >
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="mb-2">NaviCue Sync</h3>
            <p className="text-sm opacity-70">Manage NaviCue arsenal, sync batches</p>
          </button>
          
          <button className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 hover:border-opacity-20 transition-all text-left">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="mb-2">User Management</h3>
            <p className="text-sm opacity-70">Patients, professionals, organizations</p>
          </button>
          
          <button className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 hover:border-opacity-20 transition-all text-left">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="mb-2">Analytics</h3>
            <p className="text-sm opacity-70">Usage metrics, engagement, outcomes</p>
          </button>
          
          <button className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 hover:border-opacity-20 transition-all text-left">
            <div className="text-3xl mb-3">💳</div>
            <h3 className="mb-2">Revenue Dashboard</h3>
            <p className="text-sm opacity-70">Subscriptions, payments, refunds</p>
          </button>
          
          <button className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 hover:border-opacity-20 transition-all text-left">
            <div className="text-3xl mb-3">🎛️</div>
            <h3 className="mb-2">Feature Flags</h3>
            <p className="text-sm opacity-70">Enable/disable features globally</p>
          </button>
          
          <button
            onClick={() => onNavigate('content-library-showcase')}
            className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 hover:border-opacity-20 transition-all text-left"
          >
            <div className="text-3xl mb-3">📚</div>
            <h3 className="mb-2">Content Management</h3>
            <p className="text-sm opacity-70">Articles, practices, insights, videos</p>
          </button>
          
          <button className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 hover:border-opacity-20 transition-all text-left">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="mb-2">LUMA Intelligence</h3>
            <p className="text-sm opacity-70">AI orchestration, telemetry, algorithms</p>
          </button>
          
          <button className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 hover:border-opacity-20 transition-all text-left">
            <div className="text-3xl mb-3">🔧</div>
            <h3 className="mb-2">System Health</h3>
            <p className="text-sm opacity-70">Monitoring, logs, performance</p>
          </button>
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="mb-6">Recent Platform Activity</h2>
        <div className="space-y-3">
          {[
            { time: '2 min ago', event: 'New patient signup', detail: 'john.doe@email.com' },
            { time: '5 min ago', event: 'Session completed', detail: 'Dr. Smith + Patient #1234' },
            { time: '12 min ago', event: 'NaviCue delivered', detail: 'Shame Resilience #47 → Patient #5678' },
            { time: '18 min ago', event: 'Organization signup', detail: 'Denver Recovery Center (80 seats)' },
            { time: '23 min ago', event: 'Professional verified', detail: 'Dr. Jane Williams, LMFT' },
            { time: '31 min ago', event: 'Payment processed', detail: '$150 therapy session' }
          ].map((activity, i) => (
            <div key={i} className="p-4 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 flex justify-between items-center">
              <div>
                <p className="mb-1">{activity.event}</p>
                <p className="text-sm opacity-70">{activity.detail}</p>
              </div>
              <p className="text-sm opacity-70">{activity.time}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}