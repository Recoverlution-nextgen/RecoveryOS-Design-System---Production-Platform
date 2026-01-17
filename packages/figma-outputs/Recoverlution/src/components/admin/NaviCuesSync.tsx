/**
 * NaviCues Sync Component
 * 
 * Admin UI for syncing NaviCues from navicue_library to canonical schema
 * 
 * Usage:
 * <NaviCuesSync />
 */

import { useState } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface SyncResult {
  ok: boolean;
  dry_run: boolean;
  batch_id?: string;
  source?: {
    table: string;
    active_count: number;
  };
  staging?: {
    inserted: number;
  };
  import?: {
    summary: Array<{ action: string; count: number }>;
  };
  canonical?: {
    navicues: number;
    schema_links: number;
    mindblock_links: number;
  };
  message?: string;
  error?: string;
  details?: string;
}

export default function NaviCuesSync() {
  const [loading, setLoading] = useState(false);
  const [dryRun, setDryRun] = useState(true);
  const [clearStaging, setClearStaging] = useState(false);
  const [result, setResult] = useState<SyncResult | null>(null);

  const handleSync = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/navicues-sync`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dry_run: dryRun,
            clear_staging: clearStaging
          })
        }
      );

      const data = await response.json();
      setResult(data);

      if (!response.ok) {
        console.error('Sync failed:', data);
      }
    } catch (error) {
      console.error('Sync error:', error);
      setResult({
        ok: false,
        dry_run: false,
        error: 'Failed to call sync API',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white border border-gray-200 p-8">
        <h2 className="text-2xl mb-6">NaviCues Sync</h2>
        
        <p className="text-gray-600 mb-6">
          Sync NaviCues from <code className="bg-gray-100 px-2 py-1">navicue_library</code> table 
          to canonical schema (<code className="bg-gray-100 px-2 py-1">public.navicues</code>)
        </p>

        {/* Options */}
        <div className="space-y-4 mb-6">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={dryRun}
              onChange={(e) => setDryRun(e.target.checked)}
              className="w-4 h-4"
            />
            <span>Dry run (validate only, no changes)</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={clearStaging}
              onChange={(e) => setClearStaging(e.target.checked)}
              disabled={dryRun}
              className="w-4 h-4"
            />
            <span>Clear staging before sync</span>
          </label>
        </div>

        {/* Sync Button */}
        <button
          onClick={handleSync}
          disabled={loading}
          className="px-6 py-3 bg-[#3E2BB8] text-white disabled:opacity-50 hover:bg-[#5739FB] transition-colors"
        >
          {loading ? 'Syncing...' : dryRun ? 'Validate' : 'Sync Now'}
        </button>

        {/* Results */}
        {result && (
          <div className="mt-8 p-6 bg-gray-50 border border-gray-200">
            {result.ok ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✅</span>
                  <h3 className="text-lg">
                    {result.dry_run ? 'Validation Successful' : 'Sync Complete'}
                  </h3>
                </div>

                {result.message && (
                  <p className="text-gray-700">{result.message}</p>
                )}

                {result.source && (
                  <div>
                    <h4 className="text-sm uppercase tracking-wide text-gray-500 mb-2">Source</h4>
                    <p>Found {result.source.active_count} active NaviCues in {result.source.table}</p>
                  </div>
                )}

                {!result.dry_run && result.canonical && (
                  <div>
                    <h4 className="text-sm uppercase tracking-wide text-gray-500 mb-2">Canonical Schema</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>NaviCues: {result.canonical.navicues}</li>
                      <li>Schema links: {result.canonical.schema_links}</li>
                      <li>Mindblock links: {result.canonical.mindblock_links}</li>
                    </ul>
                  </div>
                )}

                {!result.dry_run && result.import?.summary && (
                  <div>
                    <h4 className="text-sm uppercase tracking-wide text-gray-500 mb-2">Import Summary</h4>
                    <ul className="space-y-1 text-gray-700">
                      {result.import.summary.map((item, idx) => (
                        <li key={idx}>
                          {item.action}: {item.count}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.batch_id && (
                  <p className="text-xs text-gray-500">Batch ID: {result.batch_id}</p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">❌</span>
                  <h3 className="text-lg text-red-600">Sync Failed</h3>
                </div>
                <p className="text-red-600">{result.error}</p>
                {result.details && (
                  <pre className="text-xs bg-red-50 p-4 overflow-auto text-red-800">
                    {result.details}
                  </pre>
                )}
              </div>
            )}
          </div>
        )}

        {/* Help Text */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 text-sm text-gray-700">
          <h4 className="mb-2">How it works:</h4>
          <ol className="list-decimal list-inside space-y-1">
            <li>Reads active NaviCues from <code>navicue_library</code></li>
            <li>Transforms to canonical format</li>
            <li>Loads into staging table</li>
            <li>Imports to <code>public.navicues</code></li>
            <li>Creates schema/mindblock join table links</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
