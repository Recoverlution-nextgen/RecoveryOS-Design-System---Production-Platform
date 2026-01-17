/**
 * TOOLKIT MIGRATION PAGE
 * 
 * One-click admin interface to migrate all 100 pieces of toolkit content
 * to Supabase content_registry
 * 
 * Philosophy: Simple, clear, infiniteK branded
 */

import { useState } from 'react';
import { PlatformPageHeader } from '../PlatformPageHeader';
import { Database, CheckCircle2, AlertCircle, Loader2, Play, FileText, Lightbulb, Activity } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { allArticles, allPractices, allInsights } from '../../utils/contentLibraryMaster';

interface MigrationResult {
  success: boolean;
  summary?: {
    articles: { total: number; migrated: number; failed: number };
    practices: { total: number; migrated: number; failed: number };
    insights: { total: number; migrated: number; failed: number };
  };
  error?: string;
}

export function ToolkitMigrationPage() {
  const [status, setStatus] = useState<'idle' | 'running' | 'complete' | 'error'>('idle');
  const [result, setResult] = useState<MigrationResult | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [duration, setDuration] = useState<number>(0);

  const handleMigrate = async (dryRun: boolean = false) => {
    setStatus('running');
    setStartTime(Date.now());
    setResult(null);

    const endpoint = `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/migrate-toolkit-trigger`;

    try {
      console.log('🚀 Starting migration...', {
        articles: allArticles.length,
        practices: allPractices.length,
        insights: allInsights.length,
        dryRun
      });

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
          dryRun
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
      setStatus('complete');
      
      const elapsed = Date.now() - (startTime || Date.now());
      setDuration(elapsed);

      console.log('✅ Migration complete:', data);

    } catch (error: any) {
      console.error('❌ Migration failed:', error);
      setResult({
        success: false,
        error: error.message
      });
      setStatus('error');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)',
      padding: '0'
    }}>
      <PlatformPageHeader 
        title="Toolkit Migration"
        subtitle="Import 100 pieces of content to Supabase"
      />

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '32px 24px'
      }}>
        
        {/* Content Summary Card */}
        <div style={{
          background: 'white',
          padding: '32px',
          marginBottom: '24px',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px'
          }}>
            <Database className="w-6 h-6" style={{ color: '#3E2BB8' }} />
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              color: '#1A1A1A',
              margin: 0
            }}>
              Content Inventory
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px'
          }}>
            <div style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #3E2BB8 0%, #5739FB 100%)',
              textAlign: 'center'
            }}>
              <FileText className="w-8 h-8 mb-3 mx-auto" style={{ color: 'white' }} />
              <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', color: 'white' }}>
                {allArticles.length}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.9)', marginTop: '8px' }}>
                Articles
              </div>
            </div>

            <div style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #5739FB 0%, #7C67FF 100%)',
              textAlign: 'center'
            }}>
              <Activity className="w-8 h-8 mb-3 mx-auto" style={{ color: 'white' }} />
              <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', color: 'white' }}>
                {allPractices.length}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.9)', marginTop: '8px' }}>
                Practices
              </div>
            </div>

            <div style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #7C67FF 0%, #9D8FFF 100%)',
              textAlign: 'center'
            }}>
              <Lightbulb className="w-8 h-8 mb-3 mx-auto" style={{ color: 'white' }} />
              <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', color: 'white' }}>
                {allInsights.length}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.9)', marginTop: '8px' }}>
                Insights
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: '#F8F9FA',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>
              Total Content Pieces
            </span>
            <div style={{
              fontSize: '2rem',
              fontFamily: 'var(--font-display)',
              color: '#3E2BB8',
              marginTop: '4px'
            }}>
              {allArticles.length + allPractices.length + allInsights.length}
            </div>
          </div>
        </div>

        {/* Migration Controls */}
        {status === 'idle' && (
          <div style={{
            background: 'white',
            padding: '32px',
            border: '1px solid #E5E7EB',
            marginBottom: '24px'
          }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              color: '#1A1A1A',
              marginBottom: '16px'
            }}>
              Ready to Migrate
            </h3>
            <p style={{ color: '#6B7280', marginBottom: '24px', lineHeight: '1.6' }}>
              This will import all articles, practices, and insights into the content_registry table,
              create proper pillar mappings, and establish relationships to mindblocks.
            </p>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                onClick={() => handleMigrate(false)}
                style={{
                  flex: 1,
                  padding: '16px 24px',
                  background: '#3E2BB8',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}
              >
                <Play className="w-5 h-5" />
                Run Migration
              </button>

              <button
                onClick={() => handleMigrate(true)}
                style={{
                  flex: 1,
                  padding: '16px 24px',
                  background: 'white',
                  color: '#3E2BB8',
                  border: '1px solid #3E2BB8',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}
              >
                <FileText className="w-5 h-5" />
                Dry Run (Test Only)
              </button>
            </div>
          </div>
        )}

        {/* Running Status */}
        {status === 'running' && (
          <div style={{
            background: 'white',
            padding: '48px',
            border: '1px solid #E5E7EB',
            textAlign: 'center'
          }}>
            <Loader2 className="w-12 h-12 mb-4 mx-auto animate-spin" style={{ color: '#3E2BB8' }} />
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              color: '#1A1A1A',
              marginBottom: '8px'
            }}>
              Migration in Progress
            </h3>
            <p style={{ color: '#6B7280' }}>
              Importing {allArticles.length + allPractices.length + allInsights.length} pieces of content...
            </p>
          </div>
        )}

        {/* Results */}
        {status === 'complete' && result?.success && result.summary && (
          <div style={{
            background: 'white',
            padding: '32px',
            border: '1px solid #E5E7EB'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <CheckCircle2 className="w-8 h-8" style={{ color: '#10B981' }} />
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  color: '#1A1A1A',
                  margin: 0
                }}>
                  Migration Complete
                </h3>
                <p style={{ color: '#6B7280', margin: '4px 0 0 0', fontSize: '0.875rem' }}>
                  Completed in {(duration / 1000).toFixed(1)}s
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ padding: '16px', background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '4px' }}>ARTICLES</div>
                <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', color: '#10B981' }}>
                  {result.summary.articles.migrated}/{result.summary.articles.total}
                </div>
              </div>

              <div style={{ padding: '16px', background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '4px' }}>PRACTICES</div>
                <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', color: '#10B981' }}>
                  {result.summary.practices.migrated}/{result.summary.practices.total}
                </div>
              </div>

              <div style={{ padding: '16px', background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '4px' }}>INSIGHTS</div>
                <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', color: '#10B981' }}>
                  {result.summary.insights.migrated}/{result.summary.insights.total}
                </div>
              </div>
            </div>

            {(result.summary.articles.failed > 0 || 
              result.summary.practices.failed > 0 || 
              result.summary.insights.failed > 0) && (
              <div style={{
                padding: '16px',
                background: '#FEF3C7',
                border: '1px solid #FCD34D',
                marginBottom: '24px'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#92400E' }}>
                  ⚠️ Some items failed to migrate. Check console for details.
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setStatus('idle');
                setResult(null);
              }}
              style={{
                width: '100%',
                padding: '12px',
                background: '#F8F9FA',
                color: '#3E2BB8',
                border: '1px solid #E5E7EB',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)'
              }}
            >
              Run Another Migration
            </button>
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <div style={{
            background: 'white',
            padding: '32px',
            border: '1px solid #E5E7EB'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <AlertCircle className="w-8 h-8" style={{ color: '#EF4444' }} />
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                color: '#1A1A1A',
                margin: 0
              }}>
                Migration Failed
              </h3>
            </div>

            <div style={{
              padding: '16px',
              background: '#FEE2E2',
              border: '1px solid #FCA5A5',
              marginBottom: '24px'
            }}>
              <pre style={{
                fontSize: '0.875rem',
                color: '#991B1B',
                margin: 0,
                whiteSpace: 'pre-wrap'
              }}>
                {result?.error || 'Unknown error occurred'}
              </pre>
            </div>

            <button
              onClick={() => {
                setStatus('idle');
                setResult(null);
              }}
              style={{
                width: '100%',
                padding: '12px',
                background: '#3E2BB8',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)'
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Instructions */}
        <div style={{
          marginTop: '32px',
          padding: '24px',
          background: '#F8F9FA',
          border: '1px solid #E5E7EB'
        }}>
          <h4 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            color: '#1A1A1A',
            marginBottom: '12px'
          }}>
            What This Does
          </h4>
          <ul style={{
            color: '#6B7280',
            fontSize: '0.875rem',
            lineHeight: '1.6',
            paddingLeft: '20px',
            margin: 0
          }}>
            <li>Creates entries in content_registry for all 100 pieces</li>
            <li>Maps content to correct pillars (P-01 through P-06)</li>
            <li>Tags content with pillar and type tags</li>
            <li>Creates relationships between content and mindblocks</li>
            <li>Preserves all metadata and original IDs</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
