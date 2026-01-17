/**
 * FAMILY HUB HOME
 * Complete B2C experience for family members/loved ones
 * Features: Resources, support groups, connection to individual, subscription management
 */

import { useState, useEffect } from 'react';
import { Heart, BookOpen, Users, Link as LinkIcon, CreditCard, CheckCircle, ArrowRight } from 'lucide-react';
import { projectId } from '../../utils/supabase/info';
import { createClient } from '../../utils/supabase/client';

interface FamilyMember {
  id: string;
  name: string;
  email: string;
  relationship_type: 'parent' | 'spouse' | 'child' | 'sibling' | 'friend' | 'other';
  subscription_status: 'trial' | 'active' | 'cancelled' | 'expired';
  subscription_plan?: string;
  created_at: string;
}

interface LinkedIndividual {
  id: string;
  individual_id: string;
  consent_given: boolean;
  linked_at: string;
  individual_name?: string;
}

export default function FamilyHubHome({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [familyMember, setFamilyMember] = useState<FamilyMember | null>(null);
  const [linkedIndividuals, setLinkedIndividuals] = useState<LinkedIndividual[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFamilyData();
  }, []);

  async function loadFamilyData() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Load family member profile
    const { data: familyData } = await supabase
      .from('family_members')
      .select('*')
      .eq('user_id', user.id)
      .single();

    setFamilyMember(familyData);

    if (familyData) {
      // Load linked individuals
      const { data: connections } = await supabase
        .from('family_connections')
        .select('*')
        .eq('family_member_id', familyData.id);

      setLinkedIndividuals(connections || []);

      // Load family resources
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/family/${familyData.id}/resources`,
        {
          headers: { 'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResources(data);
      }
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0118] flex items-center justify-center">
        <p className="text-white/40">Loading Family Hub...</p>
      </div>
    );
  }

  if (!familyMember) {
    return (
      <div className="min-h-screen bg-[#0A0118] flex items-center justify-center">
        <div className="text-center max-w-lg">
          <Heart className="w-16 h-16 mx-auto mb-6 text-[#5739FB]" />
          <h1 className="text-3xl mb-4">Welcome to Recoverlution Family Hub</h1>
          <p className="text-white/60 mb-8">
            Supporting those who support recovery. Get resources, connect with others, and stay informed.
          </p>
          <button
            onClick={() => onNavigate('family-onboarding')}
            className="px-8 py-4 bg-[#5739FB] text-white rounded hover:bg-[#3E2BB8] transition-all text-lg"
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  const isTrialing = familyMember.subscription_status === 'trial';
  const isActive = familyMember.subscription_status === 'active';

  return (
    <div className="min-h-screen bg-[#0A0118]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0A0118]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl mb-1 flex items-center gap-2">
                <Heart className="w-7 h-7 text-[#5739FB]" />
                Family Hub
              </h1>
              <p className="text-white/40 text-sm">
                Welcome back, {familyMember.name}
              </p>
            </div>
            <div className="flex gap-3">
              {isTrialing && (
                <button
                  onClick={() => onNavigate('family-subscribe')}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-all flex items-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Upgrade to Full Access
                </button>
              )}
              <button
                onClick={() => onNavigate('Settings')}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-all"
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Trial Banner */}
        {isTrialing && (
          <div className="mb-8 p-6 bg-gradient-to-r from-[#5739FB]/20 to-[#3E2BB8]/20 border border-[#5739FB]/30 rounded-xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg mb-2">You're on a Free Trial</h3>
                <p className="text-white/60 mb-4">
                  Access all resources, support groups, and tools for 14 days. Upgrade anytime to continue.
                </p>
                <button
                  onClick={() => onNavigate('family-subscribe')}
                  className="px-6 py-3 bg-[#5739FB] text-white rounded hover:bg-[#3E2BB8] transition-all flex items-center gap-2"
                >
                  View Plans
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
            <LinkIcon className="w-8 h-8 text-[#5739FB] mb-3" />
            <p className="text-white/40 text-sm mb-1">Connections</p>
            <p className="text-3xl">{linkedIndividuals.length}</p>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
            <BookOpen className="w-8 h-8 text-[#5739FB] mb-3" />
            <p className="text-white/40 text-sm mb-1">Resources</p>
            <p className="text-3xl">{resources.length}</p>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
            <Users className="w-8 h-8 text-[#5739FB] mb-3" />
            <p className="text-white/40 text-sm mb-1">Support Groups</p>
            <p className="text-3xl">3</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Linked Individuals */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl">Your Connections</h2>
                <button
                  onClick={() => onNavigate('family-link-individual')}
                  className="px-4 py-2 bg-[#5739FB] text-white rounded hover:bg-[#3E2BB8] transition-all text-sm"
                >
                  + Link Someone
                </button>
              </div>

              {linkedIndividuals.length === 0 ? (
                <div className="p-8 bg-white/5 border border-white/10 rounded-xl text-center">
                  <LinkIcon className="w-12 h-12 mx-auto mb-4 text-white/20" />
                  <h3 className="text-lg mb-2">No Connections Yet</h3>
                  <p className="text-white/40 mb-4">
                    Link with your loved one to stay informed and provide support (with their consent)
                  </p>
                  <button
                    onClick={() => onNavigate('family-link-individual')}
                    className="px-6 py-3 bg-[#5739FB] text-white rounded hover:bg-[#3E2BB8] transition-all"
                  >
                    Request Connection
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {linkedIndividuals.map((link) => (
                    <div
                      key={link.id}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#5739FB]/40 to-[#3E2BB8]/40 rounded-full flex items-center justify-center">
                            <Heart className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white mb-1">{link.individual_name || 'Your Loved One'}</h3>
                            <p className="text-white/40 text-sm flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Connected {new Date(link.linked_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-sm transition-all">
                          View Activity
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Resources for Families */}
            <div>
              <h2 className="text-xl mb-4">Resources for You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Understanding Recovery', type: 'Article', duration: '8 min read' },
                  { title: 'Setting Healthy Boundaries', type: 'Guide', duration: '12 min read' },
                  { title: 'Self-Care for Supporters', type: 'Practice', duration: '5 min' },
                  { title: 'Communication Toolkit', type: 'Guide', duration: '15 min read' },
                ].map((resource, idx) => (
                  <button
                    key={idx}
                    className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-[#5739FB]/50 transition-all text-left"
                  >
                    <div className="flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-[#5739FB] mt-0.5" />
                      <div className="flex-1">
                        <h3 className="text-white mb-1">{resource.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-white/40">
                          <span>{resource.type}</span>
                          <span>·</span>
                          <span>{resource.duration}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Support Groups */}
          <div>
            <h2 className="text-xl mb-4">Support Groups</h2>
            <div className="space-y-3">
              {[
                { name: 'Parents in Recovery Support', members: 47, nextMeeting: 'Tomorrow, 7PM' },
                { name: 'Spouses & Partners Circle', members: 33, nextMeeting: 'Thursday, 8PM' },
                { name: 'Setting Boundaries Workshop', members: 22, nextMeeting: 'Next Week' },
              ].map((group, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <Users className="w-5 h-5 text-[#5739FB] mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-white mb-1">{group.name}</h3>
                      <p className="text-white/40 text-xs">{group.members} members</p>
                    </div>
                  </div>
                  <div className="text-xs text-white/60 mb-3">
                    Next: {group.nextMeeting}
                  </div>
                  <button className="w-full px-3 py-2 bg-[#5739FB]/20 text-[#5739FB] rounded text-sm hover:bg-[#5739FB]/30 transition-all">
                    Join Group
                  </button>
                </div>
              ))}
            </div>

            {/* Subscription Card */}
            <div className="mt-6 p-4 bg-gradient-to-br from-[#5739FB]/10 to-[#3E2BB8]/10 border border-[#5739FB]/30 rounded-xl">
              <h3 className="text-sm mb-2 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Subscription
              </h3>
              <p className="text-2xl mb-1">
                {isTrialing ? 'Free Trial' : familyMember.subscription_plan || 'Family Support'}
              </p>
              <p className="text-white/40 text-xs mb-4">
                {isTrialing ? '14 days remaining' : 'Active'}
              </p>
              <button
                onClick={() => onNavigate('family-subscribe')}
                className="w-full px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded text-sm transition-all"
              >
                {isTrialing ? 'Upgrade Now' : 'Manage Subscription'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
