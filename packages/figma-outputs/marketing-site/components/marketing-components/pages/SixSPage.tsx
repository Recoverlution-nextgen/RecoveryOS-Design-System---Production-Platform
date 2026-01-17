// 6 S's Page - Entry point for the complete sound bites system
import { SixSHub } from '../components/sixs/SixSHub';
import { useState, useEffect } from 'react';

export function SixSPage() {
  const [patientId, setPatientId] = useState<string | null>(null);

  useEffect(() => {
    // Get current patient ID from localStorage
    const storedPatientId = localStorage.getItem('currentPatientId');
    setPatientId(storedPatientId);
  }, []);

  if (!patientId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="headline-section text-primary mb-4">Welcome to the 6 S's</h2>
          <p className="copy-secondary">Please log in to access your content</p>
        </div>
      </div>
    );
  }

  return <SixSHub patientId={patientId} />;
}
