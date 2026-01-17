/**
 * ADMIN CONSOLE
 * Platform-wide administration and management
 * Features: User management, content moderation, system health, analytics
 */

import { useState, useEffect } from 'react';
import { Shield, Users, Database, Activity, AlertTriangle, CheckCircle, TrendingUp, Settings } from 'lucide-react';

interface SystemHealth {
  status: 'healthy' | 'degraded' | 'down';
  uptime: number;
  total_users: number;
  active_users_24h: number;
  total_content: number;
  total_events_24h: number;
  api_response_time_ms: number;
  error_rate: number;
}

export default function AdminConsole({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [tab, setTab] = useState<'overview' | 'users' | 'content' | 'system' | 'analytics'>('overview');
  const [health, setHealth] = useState<SystemHealth>({
    status: 'healthy',
    uptime: 99.97,
    total_users: 1247,
    active_users_24h: 342,
    total_content: 847,
    total_events_24h: 12834,
    api_response_time_ms: 127,
    error_rate: 0.03,
  });

  return (
    <div className="min-h-screen bg-[#0A0118]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0A0118]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl mb-1 flex items-center gap-2">
                <Shield className="w-7 h-7 text-[#5739FB]" />
                Admin Console
              </h1>
              <p className="text-white/40 text-sm">Platform management & monitoring</p>
            </div>
            <button
              onClick={() => onNavigate('Dashboard')}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-all"
            >
              Exit Admin
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-8 py-8">
        {/* System Health Banner */}
        <div className={`mb-8 p-6 rounded-xl border ${
          health.status === 'healthy' ? 'bg-green-500/10 border-green-500/30' :
          health.status === 'degraded' ? 'bg-yellow-500/10 border-yellow-500/30' :
          'bg-red-500/10 border-red-500/30'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${
                health.status === 'healthy' ? 'bg-green-500' :
                health.status === 'degraded' ? 'bg-yellow-500' :
                'bg-red-500'
              } animate-pulse`} />
              <div>
                <h3 className="text-lg mb-1">
                  System Status: {health.status === 'healthy' ? 'All Systems Operational' : 'Degraded Performance'}
                </h3>
                <p className="text-white/60 text-sm">
                  {health.uptime}% uptime · {health.api_response_time_ms}ms avg response · {health.error_rate}% error rate
                </p>
              </div>
            </div>
            <CheckCircle className={`w-8 h-8 ${
              health.status === 'healthy' ? 'text-green-500' : 'text-yellow-500'
            }`} />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/10">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'content', label: 'Content', icon: Database },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'system', label: 'System', icon: Settings },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`px-4 py-3 text-sm transition-all flex items-center gap-2 border-b-2 ${
                tab === t.id
                  ? 'border-[#5739FB] text-white'
                  : 'border-transparent text-white/40 hover:text-white/60'
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Users"
                value={health.total_users.toLocaleString()}
                subtitle={`${health.active_users_24h} active (24h)`}
                icon={Users}
                trend="+12%"
              />
              <StatCard
                title="Total Content"
                value={health.total_content.toLocaleString()}
                subtitle="Published items"
                icon={Database}
                trend="+8%"
              />
              <StatCard
                title="Events (24h)"
                value={health.total_events_24h.toLocaleString()}
                subtitle="User interactions"
                icon={Activity}
                trend="+23%"
              />
              <StatCard
                title="API Health"
                value={`${health.api_response_time_ms}ms`}
                subtitle="Avg response time"
                icon={CheckCircle}
                trend="-5%"
              />
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-xl mb-4">Recent Activity</h2>
              <div className="space-y-2">
                {[
                  { event: 'New user registered', user: 'jane@example.com', time: '2 min ago', type: 'user' },
                  { event: 'Content published', user: 'Admin', time: '12 min ago', type: 'content' },
                  { event: 'Organization created', user: 'Recovery Center Inc', time: '34 min ago', type: 'org' },
                  { event: 'Professional verified', user: 'Dr. Sarah M.', time: '1 hour ago', type: 'pro' },
                  { event: 'Support ticket resolved', user: 'Support Team', time: '2 hours ago', type: 'support' },
                ].map((activity, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'user' ? 'bg-blue-500' :
                        activity.type === 'content' ? 'bg-green-500' :
                        activity.type === 'org' ? 'bg-purple-500' :
                        activity.type === 'pro' ? 'bg-yellow-500' :
                        'bg-white/40'
                      }`} />
                      <div>
                        <p className="text-white">{activity.event}</p>
                        <p className="text-white/40 text-sm">{activity.user}</p>
                      </div>
                    </div>
                    <p className="text-white/40 text-sm">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div>
              <h2 className="text-xl mb-4">System Alerts</h2>
              <div className="space-y-2">
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-white mb-1">Database Connection Pool at 75%</h3>
                    <p className="text-white/60 text-sm">Consider scaling up connection limits</p>
                  </div>
                  <button className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded text-sm hover:bg-yellow-500/30 transition-all">
                    Review
                  </button>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-white mb-1">All Systems Operational</h3>
                    <p className="text-white/60 text-sm">No critical issues detected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'users' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl">User Management</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:ring-2 focus:ring-[#5739FB]/50"
                />
                <button className="px-4 py-2 bg-[#5739FB] text-white rounded hover:bg-[#3E2BB8] transition-all">
                  Filter
                </button>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm text-white/60">User</th>
                    <th className="px-4 py-3 text-left text-sm text-white/60">Type</th>
                    <th className="px-4 py-3 text-left text-sm text-white/60">Status</th>
                    <th className="px-4 py-3 text-left text-sm text-white/60">Joined</th>
                    <th className="px-4 py-3 text-left text-sm text-white/60">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'John Doe', email: 'john@example.com', type: 'Individual', status: 'Active', joined: '2024-01-15' },
                    { name: 'Dr. Sarah Mitchell', email: 'sarah@therapy.com', type: 'Professional', status: 'Active', joined: '2024-02-03' },
                    { name: 'Recovery Center Inc', email: 'admin@recovery.org', type: 'Organization', status: 'Active', joined: '2024-03-10' },
                  ].map((user, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-all">
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-white">{user.name}</p>
                          <p className="text-white/40 text-sm">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-white/60 text-sm">{user.type}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded text-xs">
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/60 text-sm">{user.joined}</td>
                      <td className="px-4 py-3">
                        <button className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-sm transition-all">
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'content' && (
          <div>
            <h2 className="text-xl mb-6">Content Moderation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-white/40 text-sm mb-1">Pending Review</p>
                <p className="text-3xl">12</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-white/40 text-sm mb-1">Published Today</p>
                <p className="text-3xl">47</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-white/40 text-sm mb-1">Flagged Items</p>
                <p className="text-3xl">3</p>
              </div>
            </div>
            <div className="text-center py-12 text-white/40">
              Content moderation queue coming soon...
            </div>
          </div>
        )}

        {tab === 'analytics' && (
          <div>
            <h2 className="text-xl mb-6">Platform Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <h3 className="text-lg mb-4">User Growth</h3>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[45, 62, 58, 73, 81, 95, 112].map((val, idx) => (
                    <div
                      key={idx}
                      className="flex-1 bg-gradient-to-t from-[#5739FB] to-[#3E2BB8] rounded-t"
                      style={{ height: `${(val / 112) * 100}%` }}
                    />
                  ))}
                </div>
                <p className="text-white/40 text-sm mt-4 text-center">Last 7 days</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <h3 className="text-lg mb-4">Engagement Rate</h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-6xl mb-2">73%</p>
                    <p className="text-white/40">Average completion rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'system' && (
          <div>
            <h2 className="text-xl mb-6">System Configuration</h2>
            <div className="space-y-4">
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <h3 className="text-lg mb-4">Environment</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white/40 mb-1">Environment</p>
                    <p className="text-white">Production</p>
                  </div>
                  <div>
                    <p className="text-white/40 mb-1">Version</p>
                    <p className="text-white">v2.4.1</p>
                  </div>
                  <div>
                    <p className="text-white/40 mb-1">Database</p>
                    <p className="text-white">Supabase PostgreSQL</p>
                  </div>
                  <div>
                    <p className="text-white/40 mb-1">CDN</p>
                    <p className="text-white">Cloudflare</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <h3 className="text-lg mb-4">Feature Flags</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Peer Connections', enabled: true },
                    { name: 'Family Hub', enabled: true },
                    { name: 'Video Conferencing', enabled: false },
                    { name: 'AI Content Generation', enabled: false },
                  ].map((flag, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-white/80">{flag.name}</span>
                      <button
                        className={`px-3 py-1 rounded text-sm transition-all ${
                          flag.enabled
                            ? 'bg-green-500/20 text-green-500'
                            : 'bg-white/10 text-white/40'
                        }`}
                      >
                        {flag.enabled ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon: Icon, trend }: any) {
  const isPositive = trend?.startsWith('+');
  
  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
      <div className="flex items-start justify-between mb-4">
        <Icon className="w-8 h-8 text-[#5739FB]" />
        {trend && (
          <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-3xl mb-1">{value}</p>
      <p className="text-white/40 text-sm">{title}</p>
      {subtitle && <p className="text-white/30 text-xs mt-1">{subtitle}</p>}
    </div>
  );
}
