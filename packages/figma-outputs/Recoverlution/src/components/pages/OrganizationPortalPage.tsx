/**
 * ORGANIZATION PORTAL
 * Complete dashboard for treatment centers/clinics managing teams & patients
 */

import { useState, useEffect } from 'react';
import { createClient } from '../../utils/supabase/client';

interface Organization {
  id: string;
  name: string;
  type: 'treatment_center' | 'clinic' | 'private_practice';
  seat_capacity: number;
  active_patients: number;
  active_professionals: number;
  monthly_cost: number;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  active_patients: number;
  status: 'active' | 'inactive';
}

export default function OrganizationPortalPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadOrganizationData();
  }, []);

  async function loadOrganizationData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Load organization
    const { data: orgData } = await supabase
      .from('organizations')
      .select('*')
      .eq('owner_id', user.id)
      .single();

    setOrganization(orgData);

    // Load team members
    const { data: members } = await supabase
      .from('professionals')
      .select('*')
      .eq('organization_id', orgData?.id);

    setTeamMembers(members || []);

    setLoading(false);
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!organization) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="mb-4">Welcome to Recoverlution Organization Portal</h1>
          <p className="mb-6 opacity-70">Set up your organization to get started</p>
          <button
            onClick={() => onNavigate('organization-onboarding')}
            className="px-6 py-3 bg-[#3E2BB8] text-white rounded"
          >
            Complete Onboarding
          </button>
        </div>
      </div>
    );
  }

  const utilization = (organization.active_patients / organization.seat_capacity) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="flex justify-between items-start mb-12">
        <div>
          <h1 className="mb-2">{organization.name}</h1>
          <p className="text-lg opacity-70">Organization Dashboard</p>
        </div>
        <button
          onClick={() => onNavigate('Dashboard')}
          className="px-4 py-2 bg-white bg-opacity-10 rounded hover:bg-opacity-20 transition-all"
        >
          Exit Admin
        </button>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
          <p className="text-sm opacity-70 mb-2">Active Patients</p>
          <p className="text-3xl">{organization.active_patients}</p>
          <p className="text-sm opacity-70 mt-2">of {organization.seat_capacity} seats</p>
        </div>
        
        <div className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
          <p className="text-sm opacity-70 mb-2">Team Members</p>
          <p className="text-3xl">{organization.active_professionals}</p>
        </div>
        
        <div className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
          <p className="text-sm opacity-70 mb-2">Seat Utilization</p>
          <p className="text-3xl">{utilization.toFixed(0)}%</p>
        </div>
        
        <div className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
          <p className="text-sm opacity-70 mb-2">Monthly Cost</p>
          <p className="text-3xl">${organization.monthly_cost}</p>
        </div>
      </div>

      {/* Team Management */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2>Team Members</h2>
          <button className="px-4 py-2 bg-[#3E2BB8] text-white rounded hover:bg-[#5739FB] transition-all">
            Add Team Member
          </button>
        </div>

        <div className="space-y-4">
          {teamMembers.map(member => (
            <div
              key={member.id}
              className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="mb-1">{member.name}</h3>
                  <p className="text-sm opacity-70 mb-2">{member.role}</p>
                  <p className="text-sm">
                    {member.active_patients} active patients
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 text-sm rounded ${member.status === 'active' ? 'bg-green-500 bg-opacity-20 text-green-300' : 'bg-red-500 bg-opacity-20 text-red-300'}`}>
                    {member.status}
                  </span>
                  <button className="px-3 py-1 text-sm bg-white bg-opacity-10 rounded hover:bg-opacity-20 transition-all">
                    Manage
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 hover:border-opacity-20 transition-all text-left">
            <div className="text-2xl mb-2">👥</div>
            <h3 className="mb-1">Patient Roster</h3>
            <p className="text-sm opacity-70">View all active patients</p>
          </button>
          
          <button className="p-4 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 hover:border-opacity-20 transition-all text-left">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="mb-1">Analytics</h3>
            <p className="text-sm opacity-70">Usage & engagement metrics</p>
          </button>
          
          <button className="p-4 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 hover:border-opacity-20 transition-all text-left">
            <div className="text-2xl mb-2">💳</div>
            <h3 className="mb-1">Billing</h3>
            <p className="text-sm opacity-70">Invoices & payment history</p>
          </button>
        </div>
      </section>
    </div>
  );
}
