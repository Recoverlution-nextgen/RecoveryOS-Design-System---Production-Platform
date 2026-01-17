import { useState, useEffect } from 'react';
import { AlertCircle, Play, Pause, RefreshCw, Trash2, Users, Activity, TrendingUp, Settings, ArrowLeft } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface SyntheticsSettings {
  enabled: boolean;
  sessions_per_min: number;
  max_per_run: number;
  error_rate: number;
  abandon_rate: number;
  updated_at: string;
}

interface SyntheticsStatus {
  settings: SyntheticsSettings;
  activity: {
    last_5_min: {
      scene_events: number;
      mindblock_events: number;
    };
    active_journeys: number;
    recent_journeys: any[];
  };
  status: 'running' | 'paused';
}

interface ActivitySummary {
  period_hours: number;
  scene_events_by_type: Record<string, number>;
  mindblock_events_by_type: Record<string, number>;
  journeys_completed: number;
  scenes_completed: number;
  total_events: number;
}

export default function SyntheticsStudio() {
  const [status, setStatus] = useState<SyntheticsStatus | null>(null);
  const [activity24h, setActivity24h] = useState<ActivitySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [simUsersCount, setSimUsersCount] = useState<number | null>(null);
  
  // Settings form
  const [editingSettings, setEditingSettings] = useState(false);
  const [sessionsPerMin, setSessionsPerMin] = useState(2);
  const [maxPerRun, setMaxPerRun] = useState(5);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/synthetics`;

  const fetchSimUsers = async () => {
    try {
      const response = await fetch(`${API_BASE}/sim-users`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      if (!response.ok) throw new Error('Failed to fetch sim users');
      const data = await response.json();
      setSimUsersCount(data.count);
    } catch (err: any) {
      console.error('Failed to fetch sim users:', err);
      setSimUsersCount(0);
    }
  };

  const fetchStatus = async () => {
    try {
      const response = await fetch(`${API_BASE}/status`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      if (!response.ok) throw new Error('Failed to fetch status');
      const data = await response.json();
      setStatus(data);
      setSessionsPerMin(data.settings.sessions_per_min);
      setMaxPerRun(data.settings.max_per_run);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchActivity = async () => {
    try {
      const response = await fetch(`${API_BASE}/activity/24`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      if (!response.ok) throw new Error('Failed to fetch activity');
      const data = await response.json();
      setActivity24h(data);
    } catch (err: any) {
      console.error('Failed to fetch activity:', err);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchSimUsers();
      await fetchStatus();
      await fetchActivity();
      setLoading(false);
    };
    load();

    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      fetchStatus();
      fetchActivity();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const toggleSynthetics = async () => {
    try {
      const response = await fetch(`${API_BASE}/toggle`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ enabled: !status?.settings.enabled })
      });
      if (!response.ok) throw new Error('Failed to toggle');
      await fetchStatus();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const updateSettings = async () => {
    try {
      const response = await fetch(`${API_BASE}/settings`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessions_per_min: sessionsPerMin,
          max_per_run: maxPerRun
        })
      });
      if (!response.ok) throw new Error('Failed to update settings');
      await fetchStatus();
      setEditingSettings(false);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const runNow = async () => {
    try {
      const response = await fetch(`${API_BASE}/run-now`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ target: 5 })
      });
      if (!response.ok) throw new Error('Failed to run');
      setTimeout(() => {
        fetchStatus();
        fetchActivity();
      }, 2000);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const cleanup = async () => {
    if (!confirm('Clean up synthetic data older than 45 days?')) return;
    try {
      const response = await fetch(`${API_BASE}/cleanup`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ retain_days: 45 })
      });
      if (!response.ok) throw new Error('Failed to cleanup');
      alert('Cleanup completed');
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center gap-2 text-[var(--text-muted)]">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span className="text-sm">Loading synthetics status...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </div>
      </div>
    );
  }

  const isRunning = status?.status === 'running';

  return (
    <div className="p-8">
      {/* Setup Warning Banner */}
      {simUsersCount === 0 && (
        <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-500/30 text-yellow-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Synthetics Not Configured</h3>
              <p className="text-sm text-yellow-200/80 mb-2">
                No synthetic users found in database. The synthetics engine requires sim_users to generate activity.
              </p>
              <p className="text-sm text-yellow-200/80">
                <strong>Action required:</strong> Run the backfill script or seed function to populate sim_users table.
                See <code className="px-1 py-0.5 bg-yellow-200/10">/docs/SYNTHETICS_QUICK_FIX.md</code> for instructions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-[var(--text-default)]">Synthetics Engine</h1>
          <div className="flex items-center gap-3">
            {simUsersCount !== null && (
              <div className="px-3 py-1.5 bg-[var(--bg-surface)] border border-[var(--border-default)] text-sm text-[var(--text-muted)]">
                <Users className="w-4 h-4 inline mr-1" />
                {simUsersCount} sim users
              </div>
            )}
            <div className={`flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-surface)] border border-[var(--border-default)] text-sm ${isRunning ? 'text-green-500' : 'text-yellow-500'}`}>
              <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
              {isRunning ? 'Running' : 'Paused'}
            </div>
            <button
              onClick={toggleSynthetics}
              disabled={simUsersCount === 0}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Pause' : 'Start'}
            </button>
          </div>
        </div>
        <p className="text-sm text-[var(--text-muted)]">
          Continuous synthetic user activity generator for realistic data flow
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-default)]">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-[var(--text-muted)]" />
            <span className="text-xs text-[var(--text-muted)] uppercase">Last 5 Min</span>
          </div>
          <div className="text-2xl font-bold text-[var(--text-default)]">
            {status?.activity.last_5_min.scene_events || 0}
          </div>
          <div className="text-xs text-[var(--text-muted)] mt-1">Scene Events</div>
        </div>

        <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-default)]">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-[var(--text-muted)]" />
            <span className="text-xs text-[var(--text-muted)] uppercase">Last 5 Min</span>
          </div>
          <div className="text-2xl font-bold text-[var(--text-default)]">
            {status?.activity.last_5_min.mindblock_events || 0}
          </div>
          <div className="text-xs text-[var(--text-muted)] mt-1">Mindblock Events</div>
        </div>

        <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-default)]">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-[var(--text-muted)]" />
            <span className="text-xs text-[var(--text-muted)] uppercase">Active Now</span>
          </div>
          <div className="text-2xl font-bold text-[var(--text-default)]">
            {status?.activity.active_journeys || 0}
          </div>
          <div className="text-xs text-[var(--text-muted)] mt-1">Active Journeys</div>
        </div>

        <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-default)]">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-[var(--text-muted)]" />
            <span className="text-xs text-[var(--text-muted)] uppercase">Last 24h</span>
          </div>
          <div className="text-2xl font-bold text-[var(--text-default)]">
            {activity24h?.total_events || 0}
          </div>
          <div className="text-xs text-[var(--text-muted)] mt-1">Total Events</div>
        </div>
      </div>

      {/* Settings & Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Settings */}
        <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-default)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-[var(--text-muted)]" />
              <h2 className="text-lg font-semibold text-[var(--text-default)]">Settings</h2>
            </div>
            {!editingSettings && (
              <button
                onClick={() => setEditingSettings(true)}
                className="text-sm text-[var(--brand-primary)] hover:opacity-80"
              >
                Edit
              </button>
            )}
          </div>

          {editingSettings ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1">
                  Sessions per Minute
                </label>
                <input
                  type="number"
                  value={sessionsPerMin}
                  onChange={(e) => setSessionsPerMin(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-[var(--bg-default)] border border-[var(--border-default)] text-[var(--text-default)]"
                  min="1"
                  max="20"
                />
              </div>
              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1">
                  Max Sessions per Run
                </label>
                <input
                  type="number"
                  value={maxPerRun}
                  onChange={(e) => setMaxPerRun(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-[var(--bg-default)] border border-[var(--border-default)] text-[var(--text-default)]"
                  min="1"
                  max="20"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={updateSettings}
                  className="flex-1 px-4 py-2 bg-[var(--brand-primary)] text-white hover:opacity-90"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingSettings(false)}
                  className="flex-1 px-4 py-2 bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-default)] hover:opacity-80"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Sessions per Minute</span>
                <span className="font-medium text-[var(--text-default)]">{status?.settings.sessions_per_min}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Max Sessions per Run</span>
                <span className="font-medium text-[var(--text-default)]">{status?.settings.max_per_run}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Error Rate</span>
                <span className="font-medium text-[var(--text-default)]">{(status?.settings.error_rate || 0) * 100}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Abandon Rate</span>
                <span className="font-medium text-[var(--text-default)]">{(status?.settings.abandon_rate || 0) * 100}%</span>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-default)]">
          <h2 className="text-lg font-semibold text-[var(--text-default)] mb-4">Actions</h2>
          <div className="space-y-3">
            <button
              onClick={runNow}
              className="w-full flex items-center gap-2 px-4 py-3 bg-[var(--bg-default)] border border-[var(--border-default)] text-[var(--text-default)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
            >
              <Play className="w-4 h-4" />
              Run 5 Sessions Now
            </button>
            <button
              onClick={() => { fetchStatus(); fetchActivity(); }}
              className="w-full flex items-center gap-2 px-4 py-3 bg-[var(--bg-default)] border border-[var(--border-default)] text-[var(--text-default)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Data
            </button>
            <button
              onClick={cleanup}
              className="w-full flex items-center gap-2 px-4 py-3 bg-[var(--bg-default)] border border-[var(--border-default)] text-red-500 hover:border-red-500"
            >
              <Trash2 className="w-4 h-4" />
              Cleanup Old Data
            </button>
          </div>
        </div>
      </div>

      {/* 24h Activity Breakdown */}
      {activity24h && (
        <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-default)]">
          <h2 className="text-lg font-semibold text-[var(--text-default)] mb-4">Last 24 Hours</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scene Events */}
            <div>
              <h3 className="text-sm text-[var(--text-muted)] uppercase mb-3">Scene Events</h3>
              <div className="space-y-2">
                {Object.entries(activity24h.scene_events_by_type).map(([type, count]) => (
                  <div key={type} className="flex justify-between text-sm">
                    <span className="text-[var(--text-muted)]">{type}</span>
                    <span className="font-medium text-[var(--text-default)]">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mindblock Events */}
            <div>
              <h3 className="text-sm text-[var(--text-muted)] uppercase mb-3">Mindblock Events</h3>
              <div className="space-y-2">
                {Object.entries(activity24h.mindblock_events_by_type).map(([type, count]) => (
                  <div key={type} className="flex justify-between text-sm">
                    <span className="text-[var(--text-muted)]">{type}</span>
                    <span className="font-medium text-[var(--text-default)]">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[var(--border-default)] grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-[var(--text-muted)] uppercase mb-1">Journeys Completed</div>
              <div className="text-xl font-bold text-[var(--text-default)]">{activity24h.journeys_completed}</div>
            </div>
            <div>
              <div className="text-xs text-[var(--text-muted)] uppercase mb-1">Scenes Completed</div>
              <div className="text-xl font-bold text-[var(--text-default)]">{activity24h.scenes_completed}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}