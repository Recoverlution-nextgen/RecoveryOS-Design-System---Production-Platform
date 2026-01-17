/**
 * PROFESSIONAL ONBOARDING
 * Complete setup flow for new therapists/professionals
 */

import { useState } from 'react';
import { createClient } from '../../utils/supabase/client';

export default function ProfessionalOnboardingPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    credentials: '',
    license_number: '',
    license_state: '',
    specialties: [] as string[],
    hourly_rate: 150,
    bio: '',
    phone: '',
    email: ''
  });

  const supabase = createClient();

  const specialtyOptions = [
    'Addiction & Recovery',
    'Trauma & PTSD',
    'Anxiety & Depression',
    'Cognitive Behavioral Therapy',
    'Dialectical Behavior Therapy',
    'EMDR',
    'Mindfulness-Based Therapy',
    'Family Systems Therapy',
    'Motivational Interviewing'
  ];

  async function handleSubmit() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Create professional profile
    const { error } = await supabase.from('professionals').insert({
      user_id: user.id,
      name: formData.name,
      credentials: formData.credentials,
      license_number: formData.license_number,
      license_state: formData.license_state,
      specialties: formData.specialties,
      hourly_rate: formData.hourly_rate,
      bio: formData.bio,
      phone: formData.phone,
      email: formData.email,
      is_stripe_connected: false,
      status: 'pending_verification'
    });

    if (error) {
      console.error('Error creating professional profile:', error);
      return;
    }

    onNavigate('professional-portal');
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`w-full h-2 rounded ${s <= step ? 'bg-[#3E2BB8]' : 'bg-white bg-opacity-10'} ${s < 3 ? 'mr-2' : ''}`}
            />
          ))}
        </div>
        <p className="text-sm opacity-70">Step {step} of 3</p>
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div>
          <h1 className="mb-2">Professional Information</h1>
          <p className="mb-8 opacity-70">Tell us about your professional background</p>

          <div className="space-y-6">
            <div>
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
                placeholder="Dr. Jane Smith"
              />
            </div>

            <div>
              <label className="block mb-2">Credentials</label>
              <input
                type="text"
                value={formData.credentials}
                onChange={e => setFormData({ ...formData, credentials: e.target.value })}
                className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
                placeholder="Ph.D., LMFT, CAC III"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">License Number</label>
                <input
                  type="text"
                  value={formData.license_number}
                  onChange={e => setFormData({ ...formData, license_number: e.target.value })}
                  className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
                  placeholder="12345678"
                />
              </div>

              <div>
                <label className="block mb-2">License State</label>
                <input
                  type="text"
                  value={formData.license_state}
                  onChange={e => setFormData({ ...formData, license_state: e.target.value })}
                  className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
                  placeholder="CA"
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full px-6 py-3 bg-[#3E2BB8] text-white rounded hover:bg-[#5739FB] transition-all"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Specialties & Rate */}
      {step === 2 && (
        <div>
          <h1 className="mb-2">Specialties & Pricing</h1>
          <p className="mb-8 opacity-70">What are your areas of expertise?</p>

          <div className="space-y-6">
            <div>
              <label className="block mb-4">Select Your Specialties</label>
              <div className="grid grid-cols-2 gap-3">
                {specialtyOptions.map(specialty => (
                  <label key={specialty} className="flex items-center gap-3 p-3 bg-white bg-opacity-5 rounded border border-white border-opacity-10 hover:border-opacity-20 transition-all cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.specialties.includes(specialty)}
                      onChange={e => {
                        if (e.target.checked) {
                          setFormData({ ...formData, specialties: [...formData.specialties, specialty] });
                        } else {
                          setFormData({ ...formData, specialties: formData.specialties.filter(s => s !== specialty) });
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{specialty}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2">Hourly Rate ($)</label>
              <input
                type="number"
                value={formData.hourly_rate}
                onChange={e => setFormData({ ...formData, hourly_rate: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
              />
              <p className="text-sm opacity-70 mt-2">
                Platform takes 15% fee • You receive ${(formData.hourly_rate * 0.85).toFixed(2)}/hour
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 px-6 py-3 bg-white bg-opacity-10 rounded hover:bg-opacity-20 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 px-6 py-3 bg-[#3E2BB8] text-white rounded hover:bg-[#5739FB] transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Bio & Contact */}
      {step === 3 && (
        <div>
          <h1 className="mb-2">Complete Your Profile</h1>
          <p className="mb-8 opacity-70">Help patients get to know you</p>

          <div className="space-y-6">
            <div>
              <label className="block mb-2">Professional Bio</label>
              <textarea
                value={formData.bio}
                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
                rows={6}
                placeholder="Share your approach to therapy, years of experience, and what drives your work..."
              />
            </div>

            <div>
              <label className="block mb-2">Contact Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
                placeholder="jane@example.com"
              />
            </div>

            <div>
              <label className="block mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 px-6 py-3 bg-white bg-opacity-10 rounded hover:bg-opacity-20 transition-all"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-[#3E2BB8] text-white rounded hover:bg-[#5739FB] transition-all"
              >
                Complete Setup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
