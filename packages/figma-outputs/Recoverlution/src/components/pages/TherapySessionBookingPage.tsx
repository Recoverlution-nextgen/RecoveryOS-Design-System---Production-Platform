/**
 * THERAPY SESSION BOOKING
 * Find professionals, book sessions, process payment via Stripe Connect
 */

import { useState, useEffect } from 'react';
import { createClient } from '../../utils/supabase/client';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface Professional {
  id: string;
  name: string;
  credentials: string;
  specialties: string[];
  hourly_rate: number;
  bio: string;
  next_available: string | null;
  rating: number;
  sessions_completed: number;
}

export default function TherapySessionBookingPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [meetingProvider, setMeetingProvider] = useState<'zoom' | 'google_meet' | 'teams'>('zoom');
  const [meetingUrl, setMeetingUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadProfessionals();
  }, []);

  async function loadProfessionals() {
    const { data } = await supabase
      .from('professionals')
      .select('*')
      .eq('status', 'verified')
      .order('rating', { ascending: false });

    setProfessionals(data || []);
    setLoading(false);
  }

  async function handleBookSession() {
    if (!selectedProfessional || !selectedDate || !selectedTime) {
      alert('Please select a professional, date, and time');
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('Please log in to book a session');
      return;
    }

    // Create session booking (pending payment)
    const scheduledTime = new Date(`${selectedDate}T${selectedTime}`).toISOString();
    const sessionCost = selectedProfessional.hourly_rate * 100; // Convert to cents
    const platformFee = Math.round(sessionCost * 0.15); // 15% platform fee
    const professionalAmount = sessionCost - platformFee;

    const { data: session, error } = await supabase
      .from('therapy_sessions')
      .insert({
        patient_id: user.id,
        professional_id: selectedProfessional.id,
        scheduled_time: scheduledTime,
        duration_minutes: 50,
        meeting_provider: meetingProvider,
        meeting_url: meetingUrl,
        payment_amount: sessionCost,
        platform_fee_amount: platformFee,
        professional_amount: professionalAmount,
        status: 'pending_payment'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating session:', error);
      alert('Failed to create session');
      return;
    }

    // Initiate Stripe Connect payment
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/create-therapy-payment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            session_id: session.id,
            amount: sessionCost,
            platform_fee: platformFee,
            professional_stripe_account_id: selectedProfessional.stripe_account_id
          })
        }
      );

      const { checkoutUrl } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error creating payment:', error);
      alert('Failed to process payment');
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading professionals...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-12">
        <button
          onClick={() => onNavigate('Navigate')}
          className="mb-4 px-4 py-2 bg-white bg-opacity-10 rounded hover:bg-opacity-20 transition-all"
        >
          ← Back to Navigate
        </button>
        <h1 className="mb-2">Book Therapy Session</h1>
        <p className="text-lg opacity-70">Find a professional and schedule your session</p>
      </header>

      {!selectedProfessional ? (
        // Step 1: Select Professional
        <section>
          <h2 className="mb-6">Available Professionals</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {professionals.map(professional => (
              <div
                key={professional.id}
                className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 hover:border-opacity-20 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="mb-1">{professional.name}</h3>
                    <p className="text-sm opacity-70 mb-2">{professional.credentials}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm">{professional.rating.toFixed(1)}</span>
                      <span className="text-sm opacity-70">• {professional.sessions_completed} sessions</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl">${professional.hourly_rate}</p>
                    <p className="text-sm opacity-70">/session</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {professional.specialties.slice(0, 3).map(specialty => (
                    <span
                      key={specialty}
                      className="px-2 py-1 text-xs bg-white bg-opacity-10 rounded"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <p className="text-sm opacity-70 mb-4 line-clamp-2">{professional.bio}</p>

                {professional.next_available && (
                  <p className="text-sm text-green-400 mb-4">
                    Next available: {new Date(professional.next_available).toLocaleDateString()}
                  </p>
                )}

                <button
                  onClick={() => setSelectedProfessional(professional)}
                  className="w-full px-4 py-2 bg-[#3E2BB8] text-white rounded hover:bg-[#5739FB] transition-all"
                >
                  Select Professional
                </button>
              </div>
            ))}
          </div>
        </section>
      ) : (
        // Step 2: Schedule & Payment
        <section>
          <div className="mb-8 p-4 bg-white bg-opacity-5 rounded-lg flex justify-between items-center">
            <div>
              <h3>{selectedProfessional.name}</h3>
              <p className="text-sm opacity-70">{selectedProfessional.credentials}</p>
            </div>
            <button
              onClick={() => setSelectedProfessional(null)}
              className="px-4 py-2 bg-white bg-opacity-10 rounded hover:bg-opacity-20 transition-all"
            >
              Change Professional
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Scheduling */}
            <div>
              <h2 className="mb-6">Schedule Your Session</h2>

              <div className="space-y-6">
                <div>
                  <label className="block mb-2">Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-2">Select Time</label>
                  <select
                    value={selectedTime}
                    onChange={e => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
                  >
                    <option value="">Choose a time slot</option>
                    {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2">Meeting Platform</label>
                  <select
                    value={meetingProvider}
                    onChange={e => setMeetingProvider(e.target.value as any)}
                    className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
                  >
                    <option value="zoom">Zoom</option>
                    <option value="google_meet">Google Meet</option>
                    <option value="teams">Microsoft Teams</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2">Meeting URL (optional)</label>
                  <input
                    type="url"
                    value={meetingUrl}
                    onChange={e => setMeetingUrl(e.target.value)}
                    placeholder="Professional will provide if left blank"
                    className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
                  />
                  <p className="text-sm opacity-70 mt-2">
                    Your professional can send you a meeting link, or you can provide your own
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Payment Summary */}
            <div>
              <h2 className="mb-6">Payment Summary</h2>

              <div className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="opacity-70">Session (50 min)</span>
                    <span>${selectedProfessional.hourly_rate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Platform fee (15%)</span>
                    <span>${(selectedProfessional.hourly_rate * 0.15).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-white border-opacity-10">
                    <span>Total</span>
                    <span className="text-2xl">${selectedProfessional.hourly_rate}</span>
                  </div>
                </div>

                <div className="mb-6 p-4 bg-[#3E2BB8] bg-opacity-10 rounded">
                  <p className="text-sm">
                    📅 {selectedDate && new Date(selectedDate).toLocaleDateString()}<br />
                    🕐 {selectedTime || 'Select a time'}<br />
                    💻 {meetingProvider.replace('_', ' ')}
                  </p>
                </div>

                <button
                  onClick={handleBookSession}
                  disabled={!selectedDate || !selectedTime}
                  className="w-full px-6 py-3 bg-[#3E2BB8] text-white rounded hover:bg-[#5739FB] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Payment
                </button>

                <p className="text-xs opacity-70 mt-4 text-center">
                  Secure payment processed by Stripe
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
