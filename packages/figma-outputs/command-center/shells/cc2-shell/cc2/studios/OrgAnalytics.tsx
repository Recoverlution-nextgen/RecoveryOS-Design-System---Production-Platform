/**
 * ORG ANALYTICS STUDIO
 * Platform usage, engagement metrics, operational insights
 * HIGH VALUE: Data-driven decisions for org leadership
 */

import { useState, useEffect } from 'react';
import { Activity, Users, Clock, TrendingUp, Download } from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { projectId } from '../../../utils/supabase/info';
import { useUser } from '../../../contexts/UserContext';
import { StudioHeader } from '../shared/StudioHeader';
import { StatsCard } from '../shared/StatsCard';

interface OrgAnalyticsData {
  active_users: number;
  total_sessions: number;
  avg_session_length_minutes: number;
  engagement_rate: number;
  daily_active_users: number;
  weekly_active_users: number;
  monthly_active_users: number;
  content_engagement: {
    navicues: number;
    practices: number;
    articles: number;
    videos: number;
  };
  user_retention: {
    week_1: number;
    week_4: number;
    week_12: number;
  };
  peak_usage_hours: Array<{ hour: number; count: number }>;
  professional_activity: {
    total_professionals: number;
    active_professionals: number;
    avg_caseload: number;
  };
}

interface OrgAnalyticsProps {
  onBack: () => void;
  tenantScope: 'platform' | 'org' | 'professional';
}

export function OrgAnalytics({ onBack, tenantScope }: OrgAnalyticsProps) {
  const { organisationId } = useUser();
  const [data, setData] = useState<OrgAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    loadAnalytics();
  }, [organisationId, dateRange]);

  async function loadAnalytics() {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !organisationId) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/organisations/${organisationId}/analytics?range=${dateRange}`,
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
      console.error('[OrgAnalytics] Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B0F] text-white">
        <StudioHeader title="Org Analytics" subtitle="Loading..." onBack={onBack} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#3E2BB8] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="opacity-70">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <StudioHeader 
        title="Org Analytics" 
        subtitle={`${data.active_users} active users • ${data.engagement_rate.toFixed(1)}% engagement`}
        onBack={onBack}
        actions={
          <button
            className="px-4 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors flex items-center gap-2 text-sm"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>
        }
      />

      {/* Date Range */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex gap-2">
          {(['7d', '30d', '90d'] as const).map((range) => (
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
              Last {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard
            icon={Users}
            label="Active Users"
            value={data.active_users}
            trend={{ value: 12.3, direction: 'up' }}
            sublabel={`${data.engagement_rate.toFixed(1)}% engagement`}
          />
          <StatsCard
            icon={Activity}
            label="Total Sessions"
            value={data.total_sessions.toLocaleString()}
            sublabel={`${data.avg_session_length_minutes} min avg`}
          />
          <StatsCard
            icon={TrendingUp}
            label="DAU / MAU"
            value={`${((data.daily_active_users / data.monthly_active_users) * 100).toFixed(0)}%`}
            trend={{ value: 5.2, direction: 'up' }}
            sublabel="Daily engagement ratio"
          />
          <StatsCard
            icon={Users}
            label="Active Professionals"
            value={data.professional_activity.active_professionals}
            sublabel={`${data.professional_activity.avg_caseload.toFixed(1)} avg caseload`}
          />
        </div>

        {/* User Activity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 p-6">
            <h3 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              User Activity
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="opacity-70">Daily Active</span>
                  <span>{data.daily_active_users}</span>
                </div>
                <div className="h-2 bg-white/10">
                  <div 
                    className="h-full bg-[#5739FB]"
                    style={{ width: `${(data.daily_active_users / data.monthly_active_users) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="opacity-70">Weekly Active</span>
                  <span>{data.weekly_active_users}</span>
                </div>
                <div className="h-2 bg-white/10">
                  <div 
                    className="h-full bg-[#5739FB]"
                    style={{ width: `${(data.weekly_active_users / data.monthly_active_users) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="opacity-70">Monthly Active</span>
                  <span>{data.monthly_active_users}</span>
                </div>
                <div className="h-2 bg-white/10">
                  <div className="h-full bg-[#5739FB]" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6">
            <h3 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              Content Engagement
            </h3>
            <div className="space-y-3">
              {Object.entries(data.content_engagement).map(([type, count]) => (
                <div key={type}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="opacity-70 capitalize">{type}</span>
                    <span>{count}</span>
                  </div>
                  <div className="h-2 bg-white/10">
                    <div 
                      className="h-full bg-[#5739FB]"
                      style={{ 
                        width: `${(count / Math.max(...Object.values(data.content_engagement))) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6">
            <h3 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              User Retention
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm opacity-70 mb-1">Week 1</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/10">
                    <div 
                      className="h-full bg-green-500"
                      style={{ width: `${data.user_retention.week_1}%` }}
                    />
                  </div>
                  <span className="text-sm">{data.user_retention.week_1}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm opacity-70 mb-1">Week 4</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/10">
                    <div 
                      className="h-full bg-yellow-500"
                      style={{ width: `${data.user_retention.week_4}%` }}
                    />
                  </div>
                  <span className="text-sm">{data.user_retention.week_4}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm opacity-70 mb-1">Week 12</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/10">
                    <div 
                      className="h-full bg-blue-500"
                      style={{ width: `${data.user_retention.week_12}%` }}
                    />
                  </div>
                  <span className="text-sm">{data.user_retention.week_12}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Peak Usage Hours */}
        <div className="bg-white/5 border border-white/10 p-6">
          <h3 className="text-xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
            Peak Usage Hours
          </h3>
          <div className="grid grid-cols-24 gap-1 h-32 items-end">
            {data.peak_usage_hours.map((hour) => {
              const maxCount = Math.max(...data.peak_usage_hours.map(h => h.count));
              const height = (hour.count / maxCount) * 100;
              return (
                <div
                  key={hour.hour}
                  className="relative group"
                  style={{ height: '100%', display: 'flex', alignItems: 'flex-end' }}
                >
                  <div
                    className="w-full bg-[#5739FB] hover:bg-[#3E2BB8] transition-colors"
                    style={{ height: `${height}%` }}
                    title={`${hour.hour}:00 - ${hour.count} sessions`}
                  />
                  {hour.hour % 3 === 0 && (
                    <span className="absolute -bottom-5 left-0 text-xs opacity-50">
                      {hour.hour}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-xs opacity-50 mt-6">24-hour activity distribution</p>
        </div>

        {/* Professional Activity */}
        <div className="bg-white/5 border border-white/10 p-6">
          <h3 className="text-xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
            Professional Activity
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-sm opacity-70 mb-2">Total Professionals</p>
              <p className="text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                {data.professional_activity.total_professionals}
              </p>
            </div>
            <div>
              <p className="text-sm opacity-70 mb-2">Active This Period</p>
              <p className="text-3xl text-green-400" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                {data.professional_activity.active_professionals}
              </p>
              <p className="text-xs opacity-50 mt-1">
                {((data.professional_activity.active_professionals / data.professional_activity.total_professionals) * 100).toFixed(0)}% utilization
              </p>
            </div>
            <div>
              <p className="text-sm opacity-70 mb-2">Average Caseload</p>
              <p className="text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                {data.professional_activity.avg_caseload.toFixed(1)}
              </p>
              <p className="text-xs opacity-50 mt-1">patients per professional</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
