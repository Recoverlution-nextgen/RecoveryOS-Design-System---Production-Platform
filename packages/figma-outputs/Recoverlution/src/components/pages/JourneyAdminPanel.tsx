/**
 * Journey Admin Panel
 * Quick utility for clearing journey cache and forcing data refresh
 */

import { useState } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { Button } from '../ui/button';
import { RefreshCw, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export function JourneyAdminPanel() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const forceReseed = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/journey/force-reseed`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();
      setResult({
        success: data.success,
        message: data.message || data.error || 'Unknown response',
      });
    } catch (error: any) {
      setResult({
        success: false,
        message: `Error: ${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0118] via-[#1a0a2e] to-[#0A0118] flex items-center justify-center p-6">
      <div className="w-full max-width-lg">
        {/* Floating glass card */}
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#3E2BB8] via-[#5739FB] to-[#3E2BB8] rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
          
          {/* Card */}
          <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <RefreshCw className="w-8 h-8 text-[#5739FB]" />
              <h1 className="text-white">Journey Admin Panel</h1>
            </div>

            <p className="text-white/70 mb-6">
              Force refresh journey data to clear cached scenes and update all users with the latest content.
            </p>

            <div className="space-y-4">
              <Button
                onClick={forceReseed}
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] hover:opacity-90 transition-opacity"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Clearing cache...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Force Re-Seed Journey Data
                  </>
                )}
              </Button>

              {result && (
                <div
                  className={`rounded-2xl p-4 border ${
                    result.success
                      ? 'bg-green-500/10 border-green-500/20'
                      : 'bg-red-500/10 border-red-500/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {result.success ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p
                        className={`${
                          result.success ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {result.message}
                      </p>
                      {result.success && (
                        <p className="text-white/60 mt-2 text-sm">
                          All users will now receive the updated journey scenes. You may need to
                          refresh the journey page.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <h2 className="text-white/90 mb-3">What This Does</h2>
              <ul className="text-white/60 text-sm space-y-2">
                <li>• Clears all cached journey blocks from KV store</li>
                <li>• Re-seeds with latest scene definitions from journey-enhanced.tsx</li>
                <li>• Ensures all users get the most recent copy and structure</li>
                <li>• Fixes issues where users see old/outdated scenes</li>
              </ul>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <h2 className="text-white/90 mb-3">When to Use This</h2>
              <ul className="text-white/60 text-sm space-y-2">
                <li>• After updating narrative copy in journey-enhanced.tsx</li>
                <li>• When users report seeing outdated scene content</li>
                <li>• After fixing typos or refining headlines</li>
                <li>• When testing new journey sprint iterations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}