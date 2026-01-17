/**
 * SYNTHETICS DIAGNOSTIC PANEL
 * Quick verification that synthetic data automation is working
 * 
 * Usage: Add to any page to test synthetics system
 */

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Play, Database } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface DiagnosticResult {
  name: string;
  status: 'pass' | 'fail' | 'warn' | 'loading';
  message: string;
  details?: any;
}

export default function SyntheticsDiagnostic() {
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a`;

  const runDiagnostics = async () => {
    setLoading(true);
    setExpanded(true);
    const checks: DiagnosticResult[] = [];

    // Test 1: Synthetics status endpoint
    try {
      const res = await fetch(`${API_BASE}/synthetics/status`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        checks.push({
          name: 'Synthetics Control Server',
          status: 'pass',
          message: `Connected. Status: ${data.status}`,
          details: data
        });

        // Test 2: Check if enabled
        if (data.settings?.enabled) {
          checks.push({
            name: 'Synthetics Enabled',
            status: 'pass',
            message: `Running at ${data.settings.sessions_per_min} sessions/min`,
            details: data.settings
          });
        } else {
          checks.push({
            name: 'Synthetics Enabled',
            status: 'warn',
            message: 'Synthetics are paused. Use toggle to enable.',
            details: data.settings
          });
        }

        // Test 3: Recent activity
        const total = (data.activity?.last_5_min?.scene_events || 0) + 
                      (data.activity?.last_5_min?.mindblock_events || 0);
        
        if (total > 0) {
          checks.push({
            name: 'Recent Activity (5 min)',
            status: 'pass',
            message: `${data.activity.last_5_min.scene_events} scene events, ${data.activity.last_5_min.mindblock_events} mindblock events`,
            details: data.activity
          });
        } else {
          checks.push({
            name: 'Recent Activity (5 min)',
            status: 'warn',
            message: 'No activity in last 5 minutes. Cron may not be running.',
            details: data.activity
          });
        }

        // Test 4: Active journeys
        if (data.activity?.active_journeys > 0) {
          checks.push({
            name: 'Active Journeys',
            status: 'pass',
            message: `${data.activity.active_journeys} active synthetic journeys`,
            details: data.activity.recent_journeys
          });
        } else {
          checks.push({
            name: 'Active Journeys',
            status: 'warn',
            message: 'No active journeys. May be normal if all recently completed.',
            details: null
          });
        }
      } else {
        checks.push({
          name: 'Synthetics Control Server',
          status: 'fail',
          message: `HTTP ${res.status}: ${res.statusText}`,
          details: await res.text().catch(() => 'No details')
        });
      }
    } catch (err: any) {
      checks.push({
        name: 'Synthetics Control Server',
        status: 'fail',
        message: err.message,
        details: err
      });
    }

    // Test 5: 24h activity summary
    try {
      const res = await fetch(`${API_BASE}/synthetics/activity/24`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        const total = data.total_events || 0;
        
        if (total > 1000) {
          checks.push({
            name: '24h Activity Volume',
            status: 'pass',
            message: `${total.toLocaleString()} total events (healthy)`,
            details: data
          });
        } else if (total > 100) {
          checks.push({
            name: '24h Activity Volume',
            status: 'warn',
            message: `${total} events (low volume, may be just starting)`,
            details: data
          });
        } else {
          checks.push({
            name: '24h Activity Volume',
            status: 'warn',
            message: `${total} events (very low, cron may be disabled)`,
            details: data
          });
        }
      }
    } catch (err: any) {
      checks.push({
        name: '24h Activity Volume',
        status: 'fail',
        message: err.message,
        details: err
      });
    }

    // Test 6: Sim users
    try {
      const res = await fetch(`${API_BASE}/synthetics/sim-users`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        
        if (data.count >= 3000) {
          checks.push({
            name: 'Sim Users Available',
            status: 'pass',
            message: `${data.count.toLocaleString()} synthetic users ready`,
            details: data.users?.slice(0, 5)
          });
        } else if (data.count > 0) {
          checks.push({
            name: 'Sim Users Available',
            status: 'warn',
            message: `Only ${data.count} users (expected 3000). Run seed-synthetics.`,
            details: data.users?.slice(0, 5)
          });
        } else {
          checks.push({
            name: 'Sim Users Available',
            status: 'fail',
            message: 'No sim_users found. Run seed-synthetics edge function.',
            details: null
          });
        }
      }
    } catch (err: any) {
      checks.push({
        name: 'Sim Users Available',
        status: 'fail',
        message: err.message,
        details: err
      });
    }

    setResults(checks);
    setLoading(false);
  };

  const manualTrigger = async () => {
    try {
      const res = await fetch(`${API_BASE}/synthetics/run-now`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ target: 3 })
      });

      if (res.ok) {
        const data = await res.json();
        alert(`✅ Manual trigger success!\n\nSessions: ${data.result.sessions_created}\nScene events: ${data.result.scene_events_created}\nMindblock events: ${data.result.mindblock_events_created}`);
        runDiagnostics(); // Refresh
      } else {
        alert(`❌ Manual trigger failed: ${res.statusText}`);
      }
    } catch (err: any) {
      alert(`❌ Error: ${err.message}`);
    }
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  const getIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'fail': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warn': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'loading': return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />;
      default: return null;
    }
  };

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="fixed bottom-4 right-4 bg-[var(--brand-dark)] text-white px-4 py-2 text-sm font-medium shadow-lg hover:bg-[var(--brand-mid)] transition-colors z-50 flex items-center gap-2"
        style={{ borderRadius: 0 }}
      >
        <Database className="w-4 h-4" />
        Test Synthetics
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-[var(--brand-dark)] shadow-2xl z-50 w-[600px] max-h-[80vh] overflow-auto">
      {/* Header */}
      <div className="bg-[var(--brand-dark)] text-white p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6" />
            <div>
              <h3 className="text-lg font-semibold">Synthetics Diagnostic</h3>
              <p className="text-xs opacity-80">System health check</p>
            </div>
          </div>
          <button
            onClick={() => setExpanded(false)}
            className="text-white hover:bg-white/10 p-2 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 border-b border-gray-200 flex gap-3">
        <button
          onClick={runDiagnostics}
          disabled={loading}
          className="flex-1 bg-[var(--brand-dark)] text-white px-4 py-2 text-sm font-medium hover:bg-[var(--brand-mid)] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Re-run Tests
        </button>
        <button
          onClick={manualTrigger}
          className="flex-1 border-2 border-[var(--brand-dark)] text-[var(--brand-dark)] px-4 py-2 text-sm font-medium hover:bg-[var(--brand-dark)] hover:text-white transition-colors flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4" />
          Manual Trigger
        </button>
      </div>

      {/* Results */}
      <div className="p-4 space-y-3">
        {loading && results.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
            Running diagnostics...
          </div>
        ) : (
          results.map((result, idx) => (
            <div
              key={idx}
              className="border border-gray-200 p-3 bg-gray-50"
            >
              <div className="flex items-start gap-3">
                {getIcon(result.status)}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-gray-900">
                    {result.name}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {result.message}
                  </p>
                  {result.details && (
                    <details className="mt-2">
                      <summary className="text-xs text-gray-500 cursor-pointer hover:text-[var(--brand-dark)]">
                        Show details
                      </summary>
                      <pre className="text-xs bg-white p-2 mt-1 overflow-auto border border-gray-200 max-h-40">
                        {JSON.stringify(result.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        {/* Summary */}
        {results.length > 0 && (
          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Overall Status:</span>
              <span className={`font-semibold ${
                results.every(r => r.status === 'pass') ? 'text-green-600' :
                results.some(r => r.status === 'fail') ? 'text-red-600' :
                'text-yellow-600'
              }`}>
                {results.every(r => r.status === 'pass') ? '✅ All systems operational' :
                 results.some(r => r.status === 'fail') ? '❌ Issues detected' :
                 '⚠️ Warnings present'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-3 border-t border-gray-200 text-xs text-gray-600">
        <p>
          📘 <a 
            href="/docs/SYNTHETICS_SETUP.md" 
            className="text-[var(--brand-dark)] hover:underline"
            target="_blank"
          >
            View setup guide
          </a>
          {' · '}
          Last check: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
