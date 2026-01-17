/**
 * SOUNDBITE ANALYTICS DASHBOARD
 * Comprehensive analytics for soundbite performance
 * 
 * Metrics:
 * - MTTR (Mean Time To Regulate)
 * - Completion rates
 * - Top performing soundbites
 * - Practice conversion rates
 */

import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Clock, CheckCircle, Target, Zap, BarChart3, Activity } from 'lucide-react';
import { createClient } from '../../utils/supabase/client';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface AnalyticsData {
  mttr: {
    avgArousalReduction: number;
    avgDurationSeconds: number;
    totalSessions: number;
  } | null;
  completionRates: {
    type: 'spark' | 'flame' | 'ember';
    total: number;
    completed: number;
    rate: number;
  }[];
  topSoundbites: {
    code: string;
    type: string;
    playCount: number;
    avgArousalReduction: number;
    completionRate: number;
  }[];
  practiceConversion: {
    intent: string;
    total: number;
    conversions: number;
    rate: number;
  }[];
}

export function SoundbiteAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Call backend analytics endpoint instead of direct table access
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/soundbites/analytics`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch analytics: ${response.status}`);
      }

      const { sessions } = await response.json();
      const allSessions = sessions || [];

      if (allSessions.length === 0) {
        // No session data yet - use placeholder data for new installations
        console.log('[Analytics] No session data yet, displaying placeholder metrics');
        // Use mock data if no real data exists
        setData({
          mttr: {
            avgArousalReduction: 3.2,
            avgDurationSeconds: 18,
            totalSessions: 0,
          },
          completionRates: [
            { type: 'spark', total: 0, completed: 0, rate: 0 },
            { type: 'flame', total: 0, completed: 0, rate: 0 },
            { type: 'ember', total: 0, completed: 0, rate: 0 },
          ],
          topSoundbites: [],
          practiceConversion: [],
        });
        setError(null);
        setLoading(false);
        return;
      }

      // Process data
      const processedData: AnalyticsData = {
        mttr: calculateMTTR(allSessions),
        completionRates: processCompletionRates(allSessions),
        topSoundbites: processTopSoundbites(allSessions),
        practiceConversion: processPracticeConversion(allSessions),
      };

      setData(processedData);
      setError(null);
    } catch (err) {
      console.error('[Analytics] Error fetching data:', err);
      setError('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  // NEW: Calculate MTTR from sessions
  const calculateMTTR = (sessions: any[]) => {
    const validSessions = sessions.filter(s => 
      s.pre_state?.arousal && 
      s.post_state?.arousal && 
      s.started_at && 
      s.completed_at
    );

    if (validSessions.length === 0) {
      return {
        avgArousalReduction: 0,
        avgDurationSeconds: 0,
        totalSessions: 0,
      };
    }

    const totalArousalReduction = validSessions.reduce((sum, s) => {
      const reduction = (s.pre_state.arousal || 0) - (s.post_state.arousal || 0);
      return sum + reduction;
    }, 0);

    const totalDuration = validSessions.reduce((sum, s) => {
      const start = new Date(s.started_at).getTime();
      const end = new Date(s.completed_at).getTime();
      return sum + (end - start) / 1000; // Convert to seconds
    }, 0);

    return {
      avgArousalReduction: totalArousalReduction / validSessions.length,
      avgDurationSeconds: totalDuration / validSessions.length,
      totalSessions: validSessions.length,
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#3E2BB8] border-t-transparent animate-spin mx-auto mb-4" style={{ borderRadius: '50%' }} />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-6" style={{ borderRadius: '12px' }}>
        <p className="text-red-800">{error}</p>
        <button
          onClick={fetchAnalytics}
          className="mt-4 px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors"
          style={{ borderRadius: '8px' }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900">Soundbite Analytics</h2>
          <p className="text-gray-600 mt-1">Performance metrics and insights</p>
        </div>
        <button
          onClick={fetchAnalytics}
          className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          style={{ borderRadius: '8px' }}
        >
          Refresh
        </button>
      </div>

      {/* MTTR Card */}
      {data.mttr && (
        <div className="bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] p-6 text-white" style={{ borderRadius: '16px' }}>
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6" />
            <h3 className="text-xl">Mean Time To Regulate (MTTR)</h3>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-white/70 text-sm mb-1">Avg Duration</p>
              <p className="text-3xl">{Math.round(data.mttr.avgDurationSeconds)}s</p>
            </div>
            <div>
              <p className="text-white/70 text-sm mb-1">Avg Arousal Reduction</p>
              <p className="text-3xl">{Math.abs(data.mttr.avgArousalReduction).toFixed(1)} pts</p>
            </div>
            <div>
              <p className="text-white/70 text-sm mb-1">Total Sessions</p>
              <p className="text-3xl">{data.mttr.totalSessions}</p>
            </div>
          </div>
        </div>
      )}

      {/* Completion Rates */}
      <div className="bg-white border border-gray-200 p-6" style={{ borderRadius: '16px' }}>
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-6 h-6 text-[#3E2BB8]" />
          <h3 className="text-xl text-gray-900">Completion Rates by Type</h3>
        </div>
        <div className="space-y-4">
          {data.completionRates.map((item) => (
            <CompletionRateBar key={item.type} item={item} />
          ))}
        </div>
      </div>

      {/* Top Soundbites */}
      <div className="bg-white border border-gray-200 p-6" style={{ borderRadius: '16px' }}>
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-[#3E2BB8]" />
          <h3 className="text-xl text-gray-900">Top 10 Soundbites</h3>
        </div>
        <div className="space-y-3">
          {data.topSoundbites.slice(0, 10).map((item, index) => (
            <TopSoundbiteRow key={item.code} item={item} rank={index + 1} />
          ))}
        </div>
      </div>

      {/* Practice Conversion */}
      <div className="bg-white border border-gray-200 p-6" style={{ borderRadius: '16px' }}>
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-6 h-6 text-[#3E2BB8]" />
          <h3 className="text-xl text-gray-900">Practice Conversion by Intent</h3>
        </div>
        <div className="space-y-4">
          {data.practiceConversion.map((item) => (
            <ConversionBar key={item.intent} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper: Completion Rate Bar
function CompletionRateBar({ item }: { item: { type: string; total: number; completed: number; rate: number } }) {
  const typeColors: Record<string, string> = {
    spark: '#EF4444',
    flame: '#F59E0B',
    ember: '#10B981',
  };

  const color = typeColors[item.type] || '#3E2BB8';

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="capitalize text-gray-900">{item.type}</span>
          <span className="text-sm text-gray-500">({item.total} plays)</span>
        </div>
        <span className="text-gray-900">{(item.rate * 100).toFixed(1)}%</span>
      </div>
      <div className="h-2 bg-gray-200" style={{ borderRadius: '4px', overflow: 'hidden' }}>
        <div
          className="h-full transition-all"
          style={{
            width: `${item.rate * 100}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}

// Helper: Top Soundbite Row
function TopSoundbiteRow({ item, rank }: { item: any; rank: number }) {
  return (
    <div className="flex items-center gap-4 p-3 bg-gray-50 hover:bg-gray-100 transition-colors" style={{ borderRadius: '8px' }}>
      <div className="w-8 h-8 flex items-center justify-center bg-[#3E2BB8] text-white" style={{ borderRadius: '50%' }}>
        {rank}
      </div>
      <div className="flex-1">
        <p className="text-gray-900">{item.code}</p>
        <p className="text-sm text-gray-500">{item.type} • {item.playCount} plays</p>
      </div>
      <div className="text-right">
        <p className="text-gray-900">{Math.abs(item.avgArousalReduction).toFixed(1)} pts</p>
        <p className="text-sm text-gray-500">{(item.completionRate * 100).toFixed(0)}% complete</p>
      </div>
    </div>
  );
}

// Helper: Conversion Bar
function ConversionBar({ item }: { item: { intent: string; total: number; conversions: number; rate: number } }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="capitalize text-gray-900">{item.intent}</span>
          <span className="text-sm text-gray-500">({item.conversions}/{item.total})</span>
        </div>
        <span className="text-gray-900">{(item.rate * 100).toFixed(1)}%</span>
      </div>
      <div className="h-2 bg-gray-200" style={{ borderRadius: '4px', overflow: 'hidden' }}>
        <div
          className="h-full transition-all"
          style={{
            width: `${item.rate * 100}%`,
            background: 'linear-gradient(90deg, #3E2BB8 0%, #5739FB 100%)',
          }}
        />
      </div>
    </div>
  );
}

// Data Processing Helpers
function processCompletionRates(data: any[]): any[] {
  const typeStats: Record<string, { total: number; completed: number }> = {
    spark: { total: 0, completed: 0 },
    flame: { total: 0, completed: 0 },
    ember: { total: 0, completed: 0 },
  };

  data.forEach((session) => {
    if (!session.metrics) return;
    
    // Extract type from soundbite_asset_id (e.g., "ER001_S" → spark)
    const assetId = session.soundbite_asset_id || '';
    let type = 'spark';
    if (assetId.endsWith('_F')) type = 'flame';
    else if (assetId.endsWith('_E')) type = 'ember';

    if (typeStats[type]) {
      typeStats[type].total++;
      if (session.metrics?.completed) {
        typeStats[type].completed++;
      }
    }
  });

  return Object.entries(typeStats).map(([type, stats]) => ({
    type: type as 'spark' | 'flame' | 'ember',
    total: stats.total,
    completed: stats.completed,
    rate: stats.total > 0 ? stats.completed / stats.total : 0,
  }));
}

function processTopSoundbites(data: any[]): any[] {
  const soundbiteStats: Record<string, {
    code: string;
    type: string;
    playCount: number;
    totalArousalReduction: number;
    completedCount: number;
  }> = {};

  data.forEach((session) => {
    const code = session.soundbite_asset_id || 'unknown';
    
    if (!soundbiteStats[code]) {
      // Extract type
      let type = 'spark';
      if (code.endsWith('_F')) type = 'flame';
      else if (code.endsWith('_E')) type = 'ember';

      soundbiteStats[code] = {
        code,
        type,
        playCount: 0,
        totalArousalReduction: 0,
        completedCount: 0,
      };
    }

    soundbiteStats[code].playCount++;

    if (session.pre_state?.arousal && session.post_state?.arousal) {
      const delta = session.pre_state.arousal - session.post_state.arousal;
      soundbiteStats[code].totalArousalReduction += delta;
    }

    if (session.metrics?.completed) {
      soundbiteStats[code].completedCount++;
    }
  });

  return Object.values(soundbiteStats)
    .map((stats) => ({
      code: stats.code,
      type: stats.type,
      playCount: stats.playCount,
      avgArousalReduction: stats.totalArousalReduction / stats.playCount,
      completionRate: stats.completedCount / stats.playCount,
    }))
    .sort((a, b) => b.avgArousalReduction - a.avgArousalReduction);
}

function processPracticeConversion(data: any[]): any[] {
  const intentStats: Record<string, { total: number; conversions: number }> = {};

  data.forEach((session) => {
    const intent = session.intent;
    if (!intent) return;

    if (!intentStats[intent]) {
      intentStats[intent] = { total: 0, conversions: 0 };
    }

    intentStats[intent].total++;

    if (session.metrics?.led_to_practice) {
      intentStats[intent].conversions++;
    }
  });

  return Object.entries(intentStats)
    .map(([intent, stats]) => ({
      intent,
      total: stats.total,
      conversions: stats.conversions,
      rate: stats.total > 0 ? stats.conversions / stats.total : 0,
    }))
    .sort((a, b) => b.rate - a.rate);
}