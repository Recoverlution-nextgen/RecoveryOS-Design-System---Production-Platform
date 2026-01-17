/**
 * ST49: Patient Onboarding Page
 * Simple patient creation flow to test journey infrastructure
 */

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Sparkles, User, Mail } from 'lucide-react';
import { createPatient } from '../../utils/patientData';

interface PatientOnboardingPageProps {
  onPatientCreated: (patientId: string) => void;
}

export function PatientOnboardingPage({ onPatientCreated }: PatientOnboardingPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  const handleCreatePatient = async () => {
    setError('');

    // Validation
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    setIsCreating(true);

    try {
      // Demo mode: Create patient locally without backend call
      const patientId = crypto.randomUUID();
      const patient = {
        id: patientId,
        name: name.trim(),
        email: email.trim(),
        currentWeek: 1,
        hasCompletedOnboarding: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('✅ Patient created (demo mode):', patient);
      
      // Store patient data in localStorage
      localStorage.setItem('currentPatientId', patient.id);
      localStorage.setItem(`patient:${patient.id}`, JSON.stringify(patient));
      
      // Brief delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Navigate to journey
      onPatientCreated(patient.id);
      
      // Future: When backend is ready, uncomment this:
      // const patient = await createPatient(name, email, 1);
      // onPatientCreated(patient.id);
      
    } catch (err) {
      console.error('❌ Error creating patient:', err);
      setError('Failed to create account. Please try again.');
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 shadow-xl border-purple-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-display text-[#3E2BB8] mb-2">
            Welcome to Recoverlution
          </h1>
          <p className="text-gray-600">
            Let's set up your personalized journey
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2 text-gray-700">
              <User className="w-4 h-4" />
              Your Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g., Alex Johnson"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-purple-200 focus:border-[#5739FB] focus:ring-[#5739FB]"
            />
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 text-gray-700">
              <Mail className="w-4 h-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="e.g., alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-purple-200 focus:border-[#5739FB] focus:ring-[#5739FB]"
            />
          </div>



          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Create Button */}
          <Button
            onClick={handleCreatePatient}
            disabled={isCreating}
            className="w-full bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] hover:from-[#2E1B98] hover:to-[#4729DB] text-white py-6"
          >
            {isCreating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Creating Your Journey...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Begin Your Journey
              </>
            )}
          </Button>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-medium text-[#3E2BB8]">What happens next?</span>
            <br />
            We'll show you a quick intro to help you get started. Then you'll have access to therapeutic
            practices tailored to where you are in your journey. No timelines, no pressure, just tools
            that are available whenever you're ready.
          </p>
        </div>
      </Card>
    </div>
  );
}
