/**
 * FAMILY HUB MANAGER STUDIO
 * Family subscription management, family member coordination
 * HIGH VALUE: Manage multi-user family subscriptions
 */

import { useState, useEffect } from 'react';
import { Users, UserPlus, Crown, Shield, Calendar, TrendingUp } from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { projectId } from '../../../utils/supabase/info';
import { useUser } from '../../../contexts/UserContext';
import { StudioHeader } from '../shared/StudioHeader';
import { StatsCard } from '../shared/StatsCard';

interface FamilyHub {
  id: string;
  family_name: string;
  subscription_tier: 'family_starter' | 'family_plus' | 'family_premium';
  primary_account_holder: {
    name: string;
    email: string;
    phone: string;
  };
  members: Array<{
    id: string;
    name: string;
    email: string;
    role: 'primary' | 'adult' | 'teen' | 'child';
    age_group: '13-17' | '18-25' | '26-40' | '41-60' | '60+';
    engagement_score: number;
    last_active: string;
    status: 'active' | 'paused';
  }>;
  subscription_start: string;
  monthly_rate: number;
  seats_licensed: number;
  seats_used: number;
  family_analytics: {
    total_sessions: number;
    avg_engagement: number;
    shared_content_count: number;
  };
}

interface FamilyHubManagerProps {
  onBack: () => void;
  tenantScope: 'platform' | 'org' | 'professional';
}

export function FamilyHubManager({ onBack, tenantScope }: FamilyHubManagerProps) {
  const { organisationId } = useUser();
  const [families, setFamilies] = useState<FamilyHub[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFamily, setSelectedFamily] = useState<FamilyHub | null>(null);

  useEffect(() => {
    loadFamilies();
  }, [organisationId]);

  async function loadFamilies() {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !organisationId) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/organisations/${organisationId}/family-hubs`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFamilies(data.families || []);
      }
    } catch (error) {
      console.error('[FamilyHubManager] Error loading families:', error);
    } finally {
      setLoading(false);
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'primary': return Crown;
      case 'adult': return Shield;
      default: return Users;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'primary': return '#F59E0B';
      case 'adult': return '#3B82F6';
      case 'teen': return '#8B5CF6';
      case 'child': return '#10B981';
      default: return '#6B7280';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B0F] text-white">
        <StudioHeader title="Family Hub Manager" subtitle="Loading..." onBack={onBack} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#3E2BB8] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="opacity-70">Loading family hubs...</p>
          </div>
        </div>
      </div>
    );
  }

  const totalFamilyMembers = families.reduce((sum, f) => sum + f.members.length, 0);
  const avgFamilySize = families.length > 0 ? totalFamilyMembers / families.length : 0;
  const totalRevenue = families.reduce((sum, f) => sum + f.monthly_rate, 0);

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <StudioHeader 
        title="Family Hub Manager" 
        subtitle={`${families.length} active family subscriptions`}
        onBack={onBack}
      />

      <div className="p-6 space-y-6">
        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard
            icon={Users}
            label="Active Families"
            value={families.length}
            sublabel={`${totalFamilyMembers} total members`}
          />
          <StatsCard
            icon={TrendingUp}
            label="Avg Family Size"
            value={avgFamilySize.toFixed(1)}
            sublabel="Members per family"
          />
          <StatsCard
            icon={Calendar}
            label="Monthly Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            sublabel="From family subscriptions"
          />
          <StatsCard
            icon={Users}
            label="Avg Engagement"
            value={`${families.length > 0 ? (families.reduce((sum, f) => sum + f.family_analytics.avg_engagement, 0) / families.length).toFixed(0) : 0}%`}
            sublabel="Across all families"
          />
        </div>

        {/* Family List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {families.map(family => (
            <div
              key={family.id}
              onClick={() => setSelectedFamily(family)}
              className="bg-white/5 border border-white/10 p-6 hover:bg-white/8 hover:border-white/20 transition-all cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                    {family.family_name}
                  </h3>
                  <p className="text-sm opacity-70">{family.primary_account_holder.name}</p>
                </div>
                <span 
                  className="px-3 py-1 text-xs uppercase tracking-wider"
                  style={{
                    backgroundColor: '#5739FB20',
                    color: '#5739FB',
                    border: '1px solid #5739FB50'
                  }}
                >
                  {family.subscription_tier.replace('family_', '')}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
                <div>
                  <p className="opacity-50 text-xs mb-1">Members</p>
                  <p className="text-lg">{family.members.length}</p>
                </div>
                <div>
                  <p className="opacity-50 text-xs mb-1">Sessions</p>
                  <p className="text-lg">{family.family_analytics.total_sessions}</p>
                </div>
                <div>
                  <p className="opacity-50 text-xs mb-1">Engagement</p>
                  <p className="text-lg">{family.family_analytics.avg_engagement}%</p>
                </div>
              </div>

              {/* Members Preview */}
              <div className="mb-4">
                <p className="text-xs opacity-50 mb-2">Family Members</p>
                <div className="flex flex-wrap gap-2">
                  {family.members.slice(0, 4).map(member => {
                    const RoleIcon = getRoleIcon(member.role);
                    return (
                      <div
                        key={member.id}
                        className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10"
                      >
                        <RoleIcon className="w-3 h-3" style={{ color: getRoleColor(member.role) }} />
                        <span className="text-sm">{member.name}</span>
                      </div>
                    );
                  })}
                  {family.members.length > 4 && (
                    <div className="px-3 py-1 bg-white/5 border border-white/10 text-sm opacity-70">
                      +{family.members.length - 4} more
                    </div>
                  )}
                </div>
              </div>

              {/* Subscription Info */}
              <div className="flex items-center justify-between text-sm opacity-70">
                <span>Active since {new Date(family.subscription_start).toLocaleDateString()}</span>
                <span>${family.monthly_rate}/mo</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Family Detail Modal */}
      {selectedFamily && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6 overflow-y-auto"
          onClick={() => setSelectedFamily(null)}
        >
          <div 
            className="bg-[#0A0B0F] border border-white/20 p-8 max-w-4xl w-full my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  {selectedFamily.family_name}
                </h2>
                <p className="text-sm opacity-50">
                  {selectedFamily.subscription_tier.replace('_', ' ').toUpperCase()} • {selectedFamily.members.length} members
                </p>
              </div>
              <button
                onClick={() => setSelectedFamily(null)}
                className="p-2 hover:bg-white/10 transition-colors"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            {/* Primary Account Holder */}
            <div className="bg-white/5 border border-white/10 p-6 mb-6">
              <h3 className="mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                <Crown className="w-5 h-5 text-yellow-400" />
                Primary Account Holder
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm opacity-50 mb-1">Name</p>
                  <p>{selectedFamily.primary_account_holder.name}</p>
                </div>
                <div>
                  <p className="text-sm opacity-50 mb-1">Email</p>
                  <p className="text-sm">{selectedFamily.primary_account_holder.email}</p>
                </div>
                <div>
                  <p className="text-sm opacity-50 mb-1">Phone</p>
                  <p className="text-sm">{selectedFamily.primary_account_holder.phone}</p>
                </div>
              </div>
            </div>

            {/* Family Members */}
            <div className="bg-white/5 border border-white/10 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  Family Members ({selectedFamily.members.length})
                </h3>
                <button
                  className="px-3 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors text-sm flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                >
                  <UserPlus className="w-4 h-4" />
                  Add Member
                </button>
              </div>

              <div className="space-y-3">
                {selectedFamily.members.map(member => {
                  const RoleIcon = getRoleIcon(member.role);
                  return (
                    <div key={member.id} className="bg-white/5 border border-white/10 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <RoleIcon className="w-5 h-5" style={{ color: getRoleColor(member.role) }} />
                          <div>
                            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                              {member.name}
                            </p>
                            <p className="text-sm opacity-70">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span 
                            className="px-2 py-1 text-xs capitalize"
                            style={{
                              backgroundColor: `${getRoleColor(member.role)}20`,
                              color: getRoleColor(member.role),
                              border: `1px solid ${getRoleColor(member.role)}50`
                            }}
                          >
                            {member.role}
                          </span>
                          <span 
                            className={`px-2 py-1 text-xs ${
                              member.status === 'active' 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            }`}
                          >
                            {member.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="opacity-50 text-xs mb-1">Age Group</p>
                          <p>{member.age_group}</p>
                        </div>
                        <div>
                          <p className="opacity-50 text-xs mb-1">Engagement</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-white/10 max-w-[60px]">
                              <div 
                                className="h-full bg-[#5739FB]"
                                style={{ width: `${member.engagement_score}%` }}
                              />
                            </div>
                            <span>{member.engagement_score}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="opacity-50 text-xs mb-1">Last Active</p>
                          <p>{new Date(member.last_active).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Analytics */}
            <div className="bg-white/5 border border-white/10 p-6 mb-6">
              <h3 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                Family Analytics
              </h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-sm opacity-50 mb-2">Total Sessions</p>
                  <p className="text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                    {selectedFamily.family_analytics.total_sessions}
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-50 mb-2">Avg Engagement</p>
                  <p className="text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                    {selectedFamily.family_analytics.avg_engagement}%
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-50 mb-2">Shared Content</p>
                  <p className="text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                    {selectedFamily.family_analytics.shared_content_count}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
              >
                Manage Subscription
              </button>
              <button
                className="flex-1 px-4 py-3 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
              >
                View Full Analytics
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
