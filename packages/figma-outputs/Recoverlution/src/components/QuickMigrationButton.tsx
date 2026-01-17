/**
 * QUICK MIGRATION BUTTON
 * 
 * Temporary standalone component for executing content migration
 * Add this to your dashboard or any page to trigger migration
 */

import { useState } from 'react';
import { Database, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function QuickMigrationButton() {
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [counts, setCounts] = useState({ articles: 0, practices: 0, insights: 0 });

  const handleMigrate = async () => {
    setStatus('running');
    setMessage('Loading content...');

    try {
      // Dynamically import the content only when needed
      const { allArticles, allPractices, allInsights } = await import('../utils/contentLibraryMaster');
      
      setCounts({
        articles: allArticles?.length || 0,
        practices: allPractices?.length || 0,
        insights: allInsights?.length || 0
      });

      setMessage('Sending to Supabase...');

      const endpoint = `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/migrate-toolkit-trigger`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          articles: allArticles,
          practices: allPractices,
          insights: allInsights,
          dryRun: false
        })
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage(`✅ Successfully migrated ${data.summary.articles.migrated + data.summary.practices.migrated + data.summary.insights.migrated} pieces of content!`);
      } else {
        setStatus('error');
        setMessage(`❌ Migration failed: ${data.error || 'Unknown error'}`);
      }
    } catch (err: any) {
      setStatus('error');
      setMessage(`❌ Error: ${err.message}`);
      console.error('Migration error:', err);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(87, 57, 251, 0.1), rgba(62, 43, 184, 0.05))',
      border: '1px solid rgba(87, 57, 251, 0.2)',
      padding: '24px',
      maxWidth: '500px',
      margin: '0 auto',
      boxShadow: '0 8px 32px rgba(62, 43, 184, 0.15)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px',
        justifyContent: 'center'
      }}>
        <Database className="w-6 h-6" style={{ color: '#3E2BB8' }} />
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.25rem',
          color: '#1A1A1A',
          fontWeight: '600'
        }}>
          One-Click Migration
        </div>
      </div>

      <button
        onClick={handleMigrate}
        disabled={status === 'running'}
        style={{
          width: '100%',
          padding: '16px',
          background: status === 'success' ? '#10B981' : status === 'error' ? '#EF4444' : '#3E2BB8',
          color: 'white',
          border: 'none',
          cursor: status === 'running' ? 'wait' : 'pointer',
          fontFamily: 'var(--font-display)',
          fontSize: '1rem',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          opacity: status === 'running' ? 0.7 : 1,
          marginBottom: message ? '16px' : '0',
          transition: 'all 0.3s ease'
        }}
      >
        {status === 'running' && <Loader2 className="w-5 h-5 animate-spin" />}
        {status === 'success' && <CheckCircle className="w-5 h-5" />}
        {status === 'error' && <XCircle className="w-5 h-5" />}
        {status === 'idle' && 'Migrate All Content'}
        {status === 'running' && 'Migrating...'}
        {status === 'success' && 'Migration Complete!'}
        {status === 'error' && 'Migration Failed'}
      </button>

      {message && (
        <div style={{
          fontSize: '0.875rem',
          color: '#1A1A1A',
          lineHeight: '1.6',
          padding: '12px',
          background: 'rgba(255, 255, 255, 0.6)',
          borderLeft: '3px solid #3E2BB8'
        }}>
          {message}
        </div>
      )}

      <div style={{
        marginTop: '16px',
        paddingTop: '16px',
        borderTop: '1px solid rgba(87, 57, 251, 0.2)',
        fontSize: '0.8rem',
        color: '#6B7280',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '8px', fontWeight: '500' }}>Ready to Migrate:</div>
        <div>Articles: {counts.articles} • Practices: {counts.practices} • Insights: {counts.insights}</div>
      </div>
    </div>
  );
}