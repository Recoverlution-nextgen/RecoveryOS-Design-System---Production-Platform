/**
 * ORGANIZATION ONBOARDING
 * Setup flow for treatment centers/clinics
 */

import { useState } from 'react';
import { createClient } from '../../utils/supabase/client';

export default function OrganizationOnboardingPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: 'treatment_center' as 'treatment_center' | 'clinic' | 'private_practice',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    website: '',
    license_number: '',
    seat_capacity: 100,
    estimated_patients: 80
  });

  const supabase = createClient();

  async function handleSubmit() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Calculate pricing (PMPM model)
    const pmpm = 50; // $50 per patient per month
    const monthlyCost = formData.estimated_patients * pmpm;

    // Create organization
    const { error } = await supabase.from('organizations').insert({
      owner_id: user.id,
      name: formData.name,
      type: formData.type,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      phone: formData.phone,
      email: formData.email,
      website: formData.website,
      license_number: formData.license_number,
      seat_capacity: formData.seat_capacity,
      monthly_cost: monthlyCost,
      status: 'pending_verification'
    });

    if (error) {
      console.error('Error creating organization:', error);
      return;
    }

    onNavigate('organization-portal');
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

      {/* Step 1: Organization Info */}
      {step === 1 && (
        <div>
          <h1 className="mb-2">Organization Information</h1>
          <p className="mb-8 opacity-70">Tell us about your organization</p>

          <div className="space-y-6">
            <div>
              <label className="block mb-2">Organization Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
                placeholder="Acme Treatment Center"
              />
            </div>

            <div>
              <label className="block mb-2">Organization Type</label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
              >
                <option value="treatment_center">Treatment Center</option>
                <option value="clinic">Outpatient Clinic</option>
                <option value="private_practice">Private Practice</option>
              </select>
            </div>

            <div>
              <label className="block mb-2">License Number</label>
              <input
                type="text"
                value={formData.license_number}
                onChange={e => setFormData({ ...formData, license_number: e.target.value })}
                className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
                placeholder="State license number"
              />
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

      {/* Step 2: Location & Contact */}
      {step === 2 && (
        <div>
          <h1 className="mb-2">Location & Contact</h1>
          <p className="mb-8 opacity-70">How can patients reach you?</p>

          <div className="space-y-6">
            <div>
              <label className="block mb-2">Street Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
                placeholder="123 Recovery Road"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block mb-2">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
                  placeholder="Denver"
                />
              </div>

              <div>
                <label className="block mb-2">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={e => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
                  placeholder="CO"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2">ZIP Code</label>
              <input
                type="text"
                value={formData.zip}
                onChange={e => setFormData({ ...formData, zip: e.target.value })}
                className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
                placeholder="80202"
              />
            </div>

            <div>
              <label className="block mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
                placeholder="contact@example.com"
              />
            </div>

            <div>
              <label className="block mb-2">Website (optional)</label>
              <input
                type="url"
                value={formData.website}
                onChange={e => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
                placeholder="https://example.com"
              />
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

      {/* Step 3: Pricing & Capacity */}
      {step === 3 && (
        <div>
          <h1 className="mb-2">Pricing & Capacity</h1>
          <p className="mb-8 opacity-70">Configure your subscription plan</p>

          <div className="space-y-6">
            <div>
              <label className="block mb-2">Maximum Seat Capacity</label>
              <input
                type="number"
                value={formData.seat_capacity}
                onChange={e => setFormData({ ...formData, seat_capacity: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
              />
              <p className="text-sm opacity-70 mt-2">
                Maximum number of patients you can serve simultaneously
              </p>
            </div>

            <div>
              <label className="block mb-2">Estimated Active Patients</label>
              <input
                type="number"
                value={formData.estimated_patients}
                onChange={e => setFormData({ ...formData, estimated_patients: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
              />
              <p className="text-sm opacity-70 mt-2">
                How many patients do you expect to have active at any given time?
              </p>
            </div>

            {/* Pricing Calculation */}
            <div className="p-6 bg-[#3E2BB8] bg-opacity-10 rounded-lg border border-[#3E2BB8] border-opacity-30">
              <h3 className="mb-4">Estimated Monthly Cost</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="opacity-70">{formData.estimated_patients} patients × $50/patient</span>
                  <span>${formData.estimated_patients * 50}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white border-opacity-10">
                  <span>Total Monthly Cost</span>
                  <span className="text-2xl">${formData.estimated_patients * 50}</span>
                </div>
              </div>
              <p className="text-sm opacity-70">
                PMPM pricing model • Only pay for active patients • Scale up or down anytime
              </p>
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
