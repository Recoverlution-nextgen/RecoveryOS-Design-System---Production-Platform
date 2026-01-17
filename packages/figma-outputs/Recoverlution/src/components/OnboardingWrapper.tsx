/**
 * ST49: Onboarding Wrapper
 * Marks patient as onboarded (tour happens on Dashboard)
 */

import { useEffect } from 'react';
import { completeOnboarding } from '../utils/patientData';

interface OnboardingWrapperProps {
  patientId: string;
  onComplete: () => void;
}

export function OnboardingWrapper({ patientId, onComplete }: OnboardingWrapperProps) {
  useEffect(() => {
    // Mark onboarding as complete immediately
    // The tour will happen on the Dashboard itself
    completeOnboarding(patientId).then(() => {
      onComplete();
    });
  }, [patientId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5739FB] mx-auto mb-4" />
        <p className="text-gray-600">Setting up your dashboard...</p>
      </div>
    </div>
  );
}
