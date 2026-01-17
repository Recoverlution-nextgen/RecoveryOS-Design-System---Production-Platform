/**
 * TEAM MANAGEMENT STUDIO
 * Organization admin tool for managing professionals
 * TENANT: Org Admin only
 */

import { useState, useEffect } from 'react';
import { Users, Plus, Mail, Activity } from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { useUser } from '../../../contexts/UserContext';

interface Professional {
  id: string;
  user_id: string;
  name: string;
  credentials: string;
  specialties: string[];
  hourly_rate: number;
  bio: string;
  status: string;
  created_at: string;
}

export function TeamManagement() {
  const { organizationId, role } = useUser();
  const [team, setTeam] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(() => {
    if (organizationId && role === 'org_admin') {
      loadTeam();
    }
  }, [organizationId]);

  async function loadTeam() {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !organizationId) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/organizations/${organizationId}/team`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTeam(data);
      }
    } catch (error) {
      console.error('[TeamManagement] Error loading team:', error);
    } finally {
      setLoading(false);
    }
  }

  if (role !== 'org_admin') {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="opacity-50">Team Management is only available to organization admins</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-[#3E2BB8] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="opacity-70">Loading team...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="mb-2">Team Management</h2>
          <p className="opacity-70">Manage professionals in your organization</p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="px-4 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Invite Professional
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white bg-opacity-5 p-4">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 opacity-50" />
            <span className="text-sm opacity-70">Total Team</span>
          </div>
          <div className="text-3xl">{team.length}</div>
        </div>
        
        <div className="bg-white bg-opacity-5 p-4">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 opacity-50" />
            <span className="text-sm opacity-70">Active</span>
          </div>
          <div className="text-3xl">{team.filter(t => t.status === 'active').length}</div>
        </div>

        <div className="bg-white bg-opacity-5 p-4">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="w-5 h-5 opacity-50" />
            <span className="text-sm opacity-70">Pending</span>
          </div>
          <div className="text-3xl">{team.filter(t => t.status === 'pending').length}</div>
        </div>

        <div className="bg-white bg-opacity-5 p-4">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 opacity-50" />
            <span className="text-sm opacity-70">Specialties</span>
          </div>
          <div className="text-3xl">
            {new Set(team.flatMap(t => t.specialties)).size}
          </div>
        </div>
      </div>

      {/* Team List */}
      <div className="flex-1 overflow-auto">
        <div className="space-y-2">
          {team.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 opacity-20 mx-auto mb-4" />
              <p className="opacity-50 mb-4">No team members yet</p>
              <button
                onClick={() => setShowInviteModal(true)}
                className="px-4 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Invite First Professional
              </button>
            </div>
          ) : (
            team.map((pro) => (
              <div
                key={pro.id}
                className="bg-white bg-opacity-5 hover:bg-opacity-10 transition-all p-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3>{pro.name}</h3>
                      <span className="text-xs px-2 py-1 bg-white bg-opacity-10 opacity-70">
                        {pro.credentials}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 ${
                          pro.status === 'active'
                            ? 'bg-green-500 bg-opacity-20 text-green-400'
                            : 'bg-yellow-500 bg-opacity-20 text-yellow-400'
                        }`}
                      >
                        {pro.status}
                      </span>
                    </div>
                    
                    <p className="text-sm opacity-70 mb-3">{pro.bio}</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className="opacity-50">Specialties: </span>
                        <span>{pro.specialties.join(', ')}</span>
                      </div>
                      <div className="text-sm">
                        <span className="opacity-50">Rate: </span>
                        <span>${pro.hourly_rate}/hr</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm bg-white bg-opacity-5 hover:bg-opacity-10 transition-colors">
                      View Details
                    </button>
                    <button className="px-3 py-1 text-sm bg-white bg-opacity-5 hover:bg-opacity-10 transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Invite Modal (simplified) */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#0A0B14] border border-white border-opacity-10 p-8 max-w-md w-full">
            <h3 className="mb-4">Invite Professional</h3>
            <p className="opacity-70 mb-6">Send an invitation to join your organization</p>
            
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-white bg-opacity-5 px-4 py-2 mb-4"
            />
            
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-white bg-opacity-5 px-4 py-2 mb-6"
            />
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-4 py-2 bg-white bg-opacity-5 hover:bg-opacity-10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // TODO: Send invitation
                  setShowInviteModal(false);
                }}
                className="flex-1 px-4 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
