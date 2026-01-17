/**
 * Universal Player Page - Entry Point
 * 
 * Full-page wrapper for the Universal Player
 * Handles authentication and redirects
 */

import { useState, useEffect } from 'react';
import { UniversalPlayer } from '../universal-player/UniversalPlayer';
import { createClient } from '../../utils/supabase/client';
import { Sparkles } from 'lucide-react';

// Initialize Supabase client once
const supabase = createClient();

export function UniversalPlayerPage() {
  const [navicues, setNavicues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    loadPatientId();
  }, []);

  const loadPatientId = async () => {
    setLoading(true);
    
    try {
      // Try localStorage first
      const storedPatientId = localStorage.getItem('currentPatientId');
      
      if (storedPatientId) {
        setPatientId(storedPatientId);
        setLoading(false);
        return;
      }

      // Fallback: get from auth session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Look up patient by auth user ID
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', session.user.id)
          .maybeSingle();

        if (profile) {
          setPatientId(profile.id);
          localStorage.setItem('currentPatientId', profile.id);
        } else {
          setError('No patient profile found');
        }
      } else {
        setError('Not authenticated');
      }
      
    } catch (err: any) {
      console.error('Error loading patient ID:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExit = () => {
    if (onExit) {
      onExit();
    } else if (onNavigate) {
      onNavigate('Dashboard');
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <p className="text-white/60 text-sm">Preparing your feed</p>
        </div>
      </div>
    );
  }

  if (error || !patientId) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <Sparkles className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <p className="text-white text-xl mb-4">Unable to load your feed</p>
          <p className="text-white/60 text-sm mb-6">{error || 'Please log in to continue'}</p>
          <button
            onClick={handleExit}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
            style={{ borderRadius: '0px', fontFamily: 'var(--font-display)', fontWeight: 600 }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <UniversalPlayer
      patientId={patientId}
      onExit={handleExit}
    />
  );
}