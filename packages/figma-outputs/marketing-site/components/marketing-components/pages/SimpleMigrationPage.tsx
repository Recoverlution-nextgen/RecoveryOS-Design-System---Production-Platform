/**
 * SIMPLE MIGRATION PAGE
 * Minimal page with just the migration button
 */

import { useState } from 'react';
import { PlatformPageHeader } from '../PlatformPageHeader';
import { Database, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

export function SimpleMigrationPage() {
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [summary, setSummary] = useState<any>(null);

  const handleMigrate = async () => {
    setStatus('running');
    setMessage('Migrating content...');

    try {
      const endpoint = `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/auto-migrate`;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setSummary(data.summary);
        setMessage(`Successfully migrated ${data.summary.total} pieces of content!`);
      } else {
        setStatus('error');
        setMessage(`Migration failed: ${data.error || 'Unknown error'}`);
      }
    } catch (err: any) {
      setStatus('error');
      setMessage(`Error: ${err.message}`);
      console.error('Migration error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0F]">
      <PlatformPageHeader
        title="Content Migration"
        subtitle="Migrate toolkit content to Supabase"
        showBackButton={false}
      />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white/5 border border-white/10 p-8">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <Database className="w-8 h-8 text-[#5739FB]" />
              <h2 className="text-white text-2xl">
                One-Click Migration
              </h2>
            </div>
            <p className="text-white/60">
              Click below to migrate sample toolkit content
            </p>
          </div>

          <button
            onClick={handleMigrate}
            disabled={status === 'running'}
            className="w-full py-4 px-6 text-white font-medium transition-all flex items-center justify-center gap-3"
            style={{
              background: status === 'success' ? '#10B981' : status === 'error' ? '#EF4444' : '#5739FB',
              opacity: status === 'running' ? 0.7 : 1,
              cursor: status === 'running' ? 'wait' : 'pointer'
            }}
          >
            {status === 'running' && <Loader2 className="w-5 h-5 animate-spin" />}
            {status === 'success' && <CheckCircle className="w-5 h-5" />}
            {status === 'error' && <XCircle className="w-5 h-5" />}
            {status === 'idle' && 'Migrate Content Now'}
            {status === 'running' && 'Migrating...'}
            {status === 'success' && 'Migration Complete!'}
            {status === 'error' && 'Migration Failed'}
          </button>

          {message && (
            <div className="mt-6 p-4 bg-white/10 border border-white/20 text-white text-sm">
              {message}
            </div>
          )}

          {summary && (
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-white/5 p-4 text-center border border-white/10">
                <div className="text-2xl text-[#5739FB] mb-1">{summary.articles}</div>
                <div className="text-white/60 text-sm">Articles</div>
              </div>
              <div className="bg-white/5 p-4 text-center border border-white/10">
                <div className="text-2xl text-[#5739FB] mb-1">{summary.practices}</div>
                <div className="text-white/60 text-sm">Practices</div>
              </div>
              <div className="bg-white/5 p-4 text-center border border-white/10">
                <div className="text-2xl text-[#5739FB] mb-1">{summary.insights}</div>
                <div className="text-white/60 text-sm">Insights</div>
              </div>
            </div>
          )}
          
          <div className="mt-8 pt-8 border-t border-white/10">
            <h3 className="text-white mb-3">About this migration</h3>
            <div className="text-white/60 text-sm space-y-2">
              <p>→ Server-side migration (no frontend data)</p>
              <p>→ Sample content for testing</p>
              <p>→ Safe to run multiple times</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}