/**
 * ALUMNI MICROSITES STUDIO
 * Build branded alumni hubs with AI-moderated message boards
 * GAME-CHANGER: Solves the discharge cliff problem
 */

import { useState, useEffect } from 'react';
import { Plus, Globe, Settings, MessageSquare, Calendar, Users } from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { projectId } from '../../../utils/supabase/info';
import { useUser } from '../../../contexts/UserContext';
import { StudioHeader } from '../shared/StudioHeader';

interface Microsite {
  id: string;
  name: string;
  custom_domain: string | null;
  member_count: number;
  message_count: number;
  event_count: number;
  created_at: string;
}

interface AlumniMicrositesProps {
  onBack: () => void;
}

export function AlumniMicrosites({ onBack }: AlumniMicrositesProps) {
  const { organizationId } = useUser();
  const [microsites, setMicrosites] = useState<Microsite[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newMicrositeData, setNewMicrositeData] = useState({
    name: '',
    custom_domain: '',
    logo_url: '',
    primary_color: '#3E2BB8',
  });

  useEffect(() => {
    loadMicrosites();
  }, [organizationId]);

  async function loadMicrosites() {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !organizationId) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/alumni-microsites?organization_id=${organizationId}`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMicrosites(data.microsites || []);
      }
    } catch (error) {
      console.error('[AlumniMicrosites] Error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function createMicrosite() {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !organizationId) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/alumni-microsites`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            organization_id: organizationId,
            ...newMicrositeData,
          }),
        }
      );

      if (response.ok) {
        setShowCreate(false);
        setNewMicrositeData({ name: '', custom_domain: '', logo_url: '', primary_color: '#3E2BB8' });
        loadMicrosites();
      }
    } catch (error) {
      console.error('[AlumniMicrosites] Error creating:', error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B0F] text-white">
        <StudioHeader title="Alumni Microsites" subtitle="Loading..." onBack={onBack} />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin w-8 h-8 border-2 border-[#3E2BB8] border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <StudioHeader 
        title="Alumni Microsites" 
        subtitle={`${microsites.length} active hub${microsites.length !== 1 ? 's' : ''}`}
        onBack={onBack}
        actions={
          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors flex items-center gap-2 text-sm"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            <Plus className="w-4 h-4" />
            Create Microsite
          </button>
        }
      />

      <div className="p-6">
        {/* Create Microsite Modal */}
        {showCreate && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
            <div className="bg-[#0A0B0F] border border-white/20 p-8 max-w-2xl w-full">
              <h2 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                Create Alumni Microsite
              </h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm opacity-70 mb-2">Microsite Name</label>
                  <input
                    type="text"
                    value={newMicrositeData.name}
                    onChange={(e) => setNewMicrositeData({...newMicrositeData, name: e.target.value})}
                    placeholder="e.g., Serenity Alumni Hub"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-[#3E2BB8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm opacity-70 mb-2">Custom Domain (Optional)</label>
                  <input
                    type="text"
                    value={newMicrositeData.custom_domain}
                    onChange={(e) => setNewMicrositeData({...newMicrositeData, custom_domain: e.target.value})}
                    placeholder="e.g., alumni.serenityrecovery.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-[#3E2BB8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm opacity-70 mb-2">Brand Color</label>
                  <input
                    type="color"
                    value={newMicrositeData.primary_color}
                    onChange={(e) => setNewMicrositeData({...newMicrositeData, primary_color: e.target.value})}
                    className="w-full h-12 bg-white/5 border border-white/10"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={createMicrosite}
                  disabled={!newMicrositeData.name}
                  className="px-6 py-3 bg-[#3E2BB8] hover:bg-[#5739FB] disabled:bg-white/10 disabled:opacity-50 transition-colors"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                >
                  Create Microsite
                </button>
                <button
                  onClick={() => setShowCreate(false)}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 transition-colors"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Microsites Grid */}
        {microsites.length === 0 ? (
          <div className="text-center py-20">
            <Globe className="w-16 h-16 opacity-20 mx-auto mb-4" />
            <p className="opacity-50 mb-6">No alumni microsites yet</p>
            <button
              onClick={() => setShowCreate(true)}
              className="px-6 py-3 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              Create Your First Microsite
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {microsites.map((site) => (
              <div
                key={site.id}
                className="bg-white/5 border border-white/10 p-6 hover:border-white/20 hover:bg-white/8 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                      {site.name}
                    </h3>
                    {site.custom_domain && (
                      <div className="flex items-center gap-2 text-sm opacity-70">
                        <Globe className="w-4 h-4" />
                        <span>{site.custom_domain}</span>
                      </div>
                    )}
                  </div>
                  <button className="p-2 hover:bg-white/10 transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 opacity-70">
                      <Users className="w-4 h-4" />
                      <span>Members</span>
                    </div>
                    <span>{site.member_count}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 opacity-70">
                      <MessageSquare className="w-4 h-4" />
                      <span>Messages</span>
                    </div>
                    <span>{site.message_count}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 opacity-70">
                      <Calendar className="w-4 h-4" />
                      <span>Events</span>
                    </div>
                    <span>{site.event_count}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 transition-colors text-sm">
                    Manage
                  </button>
                  <button className="flex-1 px-3 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors text-sm">
                    View Site
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}