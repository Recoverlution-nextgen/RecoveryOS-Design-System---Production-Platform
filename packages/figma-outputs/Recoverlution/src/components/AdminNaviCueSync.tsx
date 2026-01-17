import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface SyncResult {
  ok: boolean;
  dry_run?: boolean;
  found?: number;
  result?: {
    batch_id?: string;
    message?: string;
    source?: {
      table: string;
      active_count: number;
    };
    canonical?: {
      navicues: number;
      schema_links: number;
      mindblock_links: number;
    };
  };
  error?: string;
  details?: string;
  version?: string;
}

interface AdminNaviCueSyncProps {
  onNavigate?: (page: string) => void;
}

export function AdminNaviCueSync({ onNavigate }: AdminNaviCueSyncProps = {}) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SyncResult | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const supabase = createClient(
    `https://${projectId}.supabase.co`,
    publicAnonKey
  );

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const runSync = async (dryRun: boolean) => {
    setLoading(true);
    setResult(null);
    setLogs([]);
    
    addLog(dryRun ? 'Starting dry run...' : 'Starting full sync...');

    try {
      const { data, error } = await supabase.functions.invoke('navicues-sync', {
        body: { dry_run: dryRun },
      });

      if (error) {
        addLog(`❌ Error: ${error.message || 'Unknown error'}`);
        setResult({ 
          ok: false, 
          error: error.message || 'Request failed',
          details: JSON.stringify(error, null, 2)
        });
        return;
      }

      if (!data.ok) {
        addLog(`❌ Error: ${data.error || 'Unknown error'}`);
        setResult({ 
          ok: false, 
          error: data.error || 'Request failed',
          details: data.details || JSON.stringify(data, null, 2)
        });
        return;
      }

      addLog('✅ Sync completed successfully');
      setResult(data);

      if (data.ok && !dryRun) {
        addLog(`📊 Synced ${data.result?.canonical?.navicues || 0} NaviCues`);
        addLog(`🔗 Created ${data.result?.canonical?.schema_links || 0} schema links`);
        addLog(`🔗 Created ${data.result?.canonical?.mindblock_links || 0} mindblock links`);
      }

    } catch (err: any) {
      addLog(`❌ Unexpected error: ${err.message}`);
      setResult({ 
        ok: false, 
        error: err.message,
        details: err.stack
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-black mb-2">NaviCue Sync</h1>
          <p className="text-[#666666]">
            Sync NaviCues from navicue_library to canonical schema
          </p>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => runSync(true)}
            disabled={loading}
            className="px-6 py-3 bg-[#3E2BB8] text-white hover:bg-[#5739FB] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Running...' : 'Dry Run (Preview)'}
          </button>

          <button
            onClick={() => runSync(false)}
            disabled={loading}
            className="px-6 py-3 bg-[#5739FB] text-white hover:bg-[#3E2BB8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Running...' : 'Full Sync (Execute)'}
          </button>
        </div>

        {logs.length > 0 && (
          <div className="mb-8">
            <h2 className="text-black mb-4">Logs</h2>
            <div className="bg-black text-white p-4 font-mono text-sm space-y-1 max-h-96 overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          </div>
        )}

        {result && (
          <div className="mb-8">
            <h2 className="text-black mb-4">Result</h2>
            
            {result.ok ? (
              <div className="bg-[#F5F5F5] p-6 space-y-4">
                {result.dry_run ? (
                  <div>
                    <div className="text-[#3E2BB8] mb-2">Dry Run Complete</div>
                    <div className="text-black">
                      Found {result.found} active NaviCues ready to sync
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <div className="text-[#3E2BB8] mb-2">Sync Complete</div>
                      <div className="text-black">{result.result?.message}</div>
                    </div>

                    {result.result?.canonical && (
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white p-4">
                          <div className="text-[#666666] text-sm mb-1">NaviCues</div>
                          <div className="text-black">{result.result.canonical.navicues}</div>
                        </div>
                        <div className="bg-white p-4">
                          <div className="text-[#666666] text-sm mb-1">Schema Links</div>
                          <div className="text-black">{result.result.canonical.schema_links}</div>
                        </div>
                        <div className="bg-white p-4">
                          <div className="text-[#666666] text-sm mb-1">Mindblock Links</div>
                          <div className="text-black">{result.result.canonical.mindblock_links}</div>
                        </div>
                      </div>
                    )}

                    {result.result?.batch_id && (
                      <div className="text-sm text-[#666666]">
                        Batch ID: {result.result.batch_id}
                      </div>
                    )}
                  </div>
                )}

                {result.version && (
                  <div className="text-xs text-[#666666] mt-4 pt-4 border-t border-[#CCCCCC]">
                    Version: {result.version}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[#FFF5F5] p-6 space-y-4">
                <div className="text-red-600">Sync Failed</div>
                <div className="text-black">{result.error || 'Unknown error'}</div>
                {result.details && (
                  <details className="text-sm">
                    <summary className="cursor-pointer text-[#666666]">
                      Show Details
                    </summary>
                    <pre className="mt-2 bg-black text-white p-4 overflow-x-auto text-xs">
                      {result.details}
                    </pre>
                  </details>
                )}
              </div>
            )}
          </div>
        )}

        <div className="bg-[#F5F5F5] p-6 space-y-2 text-sm text-[#666666]">
          <div><strong className="text-black">Dry Run:</strong> Preview what would be synced without making changes</div>
          <div><strong className="text-black">Full Sync:</strong> Execute the sync and update canonical schema</div>
          <div><strong className="text-black">Source:</strong> navicue_library table (active records only)</div>
          <div><strong className="text-black">Destination:</strong> navicues, navicue_schemas, navicue_mindblocks</div>
        </div>
      </div>
    </div>
  );
}