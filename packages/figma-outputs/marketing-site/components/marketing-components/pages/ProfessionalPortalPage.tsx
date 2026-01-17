/**
 * PROFESSIONAL PORTAL
 * Complete dashboard for therapists/counselors/professionals
 */

import { useState, useEffect } from 'react';
import { createClient } from '../../utils/supabase/client';

interface Session {
  id: string;
  patient_name: string;
  scheduled_time: string;
  duration_minutes: number;
  meeting_url: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  payment_amount: number;
}

interface Professional {
  id: string;
  name: string;
  credentials: string;
  specialties: string[];
  hourly_rate: number;
  stripe_account_id: string | null;
  is_stripe_connected: boolean;
}

export default function ProfessionalPortalPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadProfessionalData();
  }, []);

  async function loadProfessionalData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Load professional profile
    const { data: profData } = await supabase
      .from('professionals')
      .select('*')
      .eq('user_id', user.id)
      .single();

    setProfessional(profData);

    // Load upcoming sessions
    const { data: sessions } = await supabase
      .from('therapy_sessions')
      .select('*')
      .eq('professional_id', profData?.id)
      .gte('scheduled_time', new Date().toISOString())
      .order('scheduled_time', { ascending: true })
      .limit(10);

    setUpcomingSessions(sessions || []);

    // Calculate total earnings
    const { data: completedSessions } = await supabase
      .from('therapy_sessions')
      .select('payment_amount')
      .eq('professional_id', profData?.id)
      .eq('status', 'completed');

    const total = completedSessions?.reduce((sum, s) => sum + (s.payment_amount || 0), 0) || 0;
    setTotalEarnings(total);

    setLoading(false);
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!professional) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="mb-4">Welcome to Recoverlution Professional Portal</h1>
          <p className="mb-6 opacity-70">Complete your professional profile to get started</p>
          <button
            onClick={() => onNavigate('professional-onboarding')}
            className="px-6 py-3 bg-[#3E2BB8] text-white rounded"
          >
            Complete Onboarding
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="flex justify-between items-start mb-12">
        <div>
          <h1 className="mb-2">Professional Portal</h1>
          <p className="text-lg opacity-70">
            {professional.name}, {professional.credentials}
          </p>
        </div>
        <button
          onClick={() => onNavigate('Dashboard')}
          className="px-4 py-2 bg-white bg-opacity-10 rounded hover:bg-opacity-20 transition-all"
        >
          Back to Patient View
        </button>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
          <p className="text-sm opacity-70 mb-2">Upcoming Sessions</p>
          <p className="text-3xl">{upcomingSessions.length}</p>
        </div>
        
        <div className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
          <p className="text-sm opacity-70 mb-2">Total Earnings</p>
          <p className="text-3xl">${(totalEarnings / 100).toFixed(2)}</p>
        </div>
        
        <div className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
          <p className="text-sm opacity-70 mb-2">Hourly Rate</p>
          <p className="text-3xl">${professional.hourly_rate}</p>
        </div>
      </div>

      {/* Stripe Connect Status */}
      {!professional.is_stripe_connected && (
        <div className="mb-12 p-6 bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-lg">
          <h3 className="mb-2">⚠️ Payment Setup Required</h3>
          <p className="mb-4 opacity-70">
            Connect your Stripe account to receive payments from sessions
          </p>
          <button
            onClick={() => {/* TODO: Initiate Stripe Connect */}}
            className="px-4 py-2 bg-[#3E2BB8] text-white rounded"
          >
            Connect Stripe Account
          </button>
        </div>
      )}

      {/* Upcoming Sessions */}
      <section className="mb-12">
        <h2 className="mb-6">Upcoming Sessions</h2>
        {upcomingSessions.length === 0 ? (
          <p className="opacity-70">No upcoming sessions scheduled</p>
        ) : (
          <div className="space-y-4">
            {upcomingSessions.map(session => (
              <div
                key={session.id}
                className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 hover:border-opacity-20 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="mb-1">{session.patient_name}</h3>
                    <p className="text-sm opacity-70">
                      {new Date(session.scheduled_time).toLocaleString()} • {session.duration_minutes} minutes
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="mb-2">${(session.payment_amount / 100).toFixed(2)}</p>
                    <a
                      href={session.meeting_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#5739FB] hover:underline"
                    >
                      Join Meeting
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 hover:border-opacity-20 transition-all text-left">
            <div className="text-2xl mb-2">📅</div>
            <h3 className="mb-1">Manage Availability</h3>
            <p className="text-sm opacity-70">Set your schedule & time slots</p>
          </button>
          
          <button className="p-4 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 hover:border-opacity-20 transition-all text-left">
            <div className="text-2xl mb-2">👥</div>
            <h3 className="mb-1">Patient Roster</h3>
            <p className="text-sm opacity-70">View active patients & notes</p>
          </button>
          
          <button className="p-4 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 hover:border-opacity-20 transition-all text-left">
            <div className="text-2xl mb-2">💰</div>
            <h3 className="mb-1">Earnings Report</h3>
            <p className="text-sm opacity-70">Invoices & payment history</p>
          </button>
        </div>
      </section>
    </div>
  );
}
