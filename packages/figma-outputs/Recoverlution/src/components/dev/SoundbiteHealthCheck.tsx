/**
 * SOUNDBITE HEALTH CHECK
 * Quick diagnostic to verify RLS policies are working
 */

import React, { useState, useEffect } from 'react';
import { healthCheckSoundbites } from '../../utils/supabase/soundbites';
import { CheckCircle2, XCircle, AlertTriangle, Loader2 } from 'lucide-react';

export function SoundbiteHealthCheck() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const runCheck = async () => {
      try {
        const health = await healthCheckSoundbites();
        setResult(health);
        setStatus(health.success ? 'success' : 'error');
      } catch (error) {
        console.error('[Health Check] Unexpected error:', error);
        setResult({ error: String(error) });
        setStatus('error');
      }
    };

    runCheck();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[9999] w-96 luma-glass border border-white/10 p-4">
      <div className="flex items-center gap-3 mb-3">
        {status === 'loading' && <Loader2 className="w-5 h-5 text-[#5739FB] animate-spin" />}
        {status === 'success' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
        {status === 'error' && <XCircle className="w-5 h-5 text-red-500" />}
        
        <div className="text-white">
          Soundbite Database Health Check
        </div>
      </div>

      {status === 'loading' && (
        <div className="text-white/50 text-sm">
          Testing soundbite_all view access...
        </div>
      )}

      {status === 'success' && result && (
        <div className="space-y-2">
          <div className="text-green-400 text-sm">
            ✓ RLS policies configured correctly
          </div>
          <div className="text-white/70 text-sm">
            Total soundbites: {result.totalSoundbites}
          </div>
          <div className="text-white/70 text-sm">
            Expected tracks: {result.totalSoundbites * 3} (Spark + Flame + Ember)
          </div>
          {result.sample && result.sample.length > 0 && (
            <div className="mt-3 p-2 bg-black/20 text-xs text-white/50 font-mono overflow-x-auto">
              <div>Sample: {result.sample[0].code}</div>
              <div className="text-[10px] mt-1 text-white/30">
                Spark: {result.sample[0].spark_title ? '✓' : '✗'}<br/>
                Flame: {result.sample[0].flame_title ? '✓' : '✗'}<br/>
                Ember: {result.sample[0].ember_title ? '✓' : '✗'}
              </div>
            </div>
          )}
        </div>
      )}

      {status === 'error' && result && (
        <div className="space-y-2">
          <div className="text-red-400 text-sm">
            {result.needsRLSSetup ? (
              <>
                <AlertTriangle className="w-4 h-4 inline mr-1" />
                RLS policies not configured
              </>
            ) : (
              'Database error'
            )}
          </div>
          <div className="text-white/50 text-xs font-mono bg-black/20 p-2 rounded overflow-x-auto">
            {result.error || result.code || 'Unknown error'}
          </div>
          {result.needsRLSSetup && (
            <div className="text-white/70 text-xs mt-2">
              Run the SQL from DEVELOPER_SUMMARY_SOUNDBITES_VIEW.md in Supabase SQL Editor
            </div>
          )}
        </div>
      )}
    </div>
  );
}