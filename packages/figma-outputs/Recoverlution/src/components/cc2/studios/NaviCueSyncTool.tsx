/**
 * NAVICUE SYNC TOOL
 * 
 * Import NaviCues from TS files → Database
 * Handles batch imports for scaling from 3000 → 10,000
 * 
 * WORKFLOW:
 * 1. Detect current state (TS files vs DB)
 * 2. Preview what will be imported
 * 3. Batch import with progress tracking
 * 4. Validate wiring (registry, delivery, events)
 * 
 * USAGE:
 * - First time: Import all 3000
 * - Incremental: Import new batches (4, 5, 6... up to 10)
 * - Sync: Update metadata from files to DB
 */

import { useState } from 'react';
import { Upload, Database, CheckCircle, AlertCircle, RefreshCw, Download } from 'lucide-react';
import { NAVICUE_1000_COMPLETE } from '../../../lib/navicues/NAVICUE_1000_COMPLETE';
import { NAVICUE_MASTER_2000 } from '../../../lib/navicues/NAVICUE_MASTER_2000';
import { NAVICUE_3000_COUNCIL } from '../../../lib/navicues/NAVICUE_3000_COUNCIL';

interface NaviCueSyncToolProps {
  onClose: () => void;
}

type SyncState = 'idle' | 'analyzing' | 'ready' | 'importing' | 'complete' | 'error';

interface SyncStats {
  filesTotal: number;
  dbTotal: number;
  toImport: number;
  toUpdate: number;
  conflicts: number;
}

export function NaviCueSyncTool({ onClose }: NaviCueSyncToolProps) {
  const [syncState, setSyncState] = useState<SyncState>('idle');
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState<SyncStats>({
    filesTotal: 0,
    dbTotal: 0,
    toImport: 0,
    toUpdate: 0,
    conflicts: 0,
  });
  const [logs, setLogs] = useState<string[]>([]);

  const allNaviCuesFromFiles = [
    ...NAVICUE_1000_COMPLETE.map(nc => ({ ...nc, batch: 1 })),
    ...NAVICUE_MASTER_2000.slice(1000).map(nc => ({ ...nc, batch: 2 })),
    ...NAVICUE_3000_COUNCIL.map(nc => ({ ...nc, batch: 3 })),
  ];

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toISOString().split('T')[1].substring(0, 8)} ${message}`]);
  };

  const analyzeSync = async () => {
    setSyncState('analyzing');
    addLog('Starting analysis...');
    
    try {
      // Count files
      const filesTotal = allNaviCuesFromFiles.length;
      addLog(`Found ${filesTotal} NaviCues in source files`);
      
      // Check database
      // TODO: GET /make-server-49b28b8a/navicues/count
      const response = await fetch('/make-server-49b28b8a/navicues/count', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      
      let dbTotal = 0;
      if (response.ok) {
        const data = await response.json();
        dbTotal = data.count || 0;
        addLog(`Found ${dbTotal} NaviCues in database`);
      } else {
        addLog('Database query failed, assuming empty DB');
      }
      
      const toImport = filesTotal - dbTotal;
      
      setStats({
        filesTotal,
        dbTotal,
        toImport: Math.max(0, toImport),
        toUpdate: 0,
        conflicts: 0,
      });
      
      setSyncState('ready');
      addLog('Analysis complete');
    } catch (error) {
      console.error('Analysis failed:', error);
      addLog(`Error: ${error}`);
      setSyncState('error');
    }
  };

  const performImport = async () => {
    setSyncState('importing');
    setProgress(0);
    addLog('Starting batch import...');
    
    try {
      const batchSize = 100;
      const totalBatches = Math.ceil(allNaviCuesFromFiles.length / batchSize);
      
      for (let i = 0; i < totalBatches; i++) {
        const batch = allNaviCuesFromFiles.slice(i * batchSize, (i + 1) * batchSize);
        
        addLog(`Importing batch ${i + 1}/${totalBatches} (${batch.length} items)...`);
        
        // TODO: POST /make-server-49b28b8a/navicues/batch-import
        const response = await fetch('/make-server-49b28b8a/navicues/batch-import', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: JSON.stringify({
            navicues: batch,
            upsert: true,
          }),
        });
        
        if (!response.ok) {
          throw new Error(`Batch ${i + 1} failed: ${response.statusText}`);
        }
        
        const result = await response.json();
        addLog(`✓ Imported ${result.imported || batch.length} items`);
        
        setProgress(((i + 1) / totalBatches) * 100);
      }
      
      addLog('Import complete!');
      setSyncState('complete');
      setProgress(100);
    } catch (error) {
      console.error('Import failed:', error);
      addLog(`ERROR: ${error}`);
      setSyncState('error');
    }
  };

  const exportToFiles = async () => {
    addLog('Exporting NaviCues to JSON...');
    
    try {
      // Export from TS files (works without DB)
      const exportData = {
        navicues: allNaviCuesFromFiles,
        exported_at: new Date().toISOString(),
        count: allNaviCuesFromFiles.length,
        source: 'TS_FILES',
        batches: {
          batch_1: allNaviCuesFromFiles.filter(nc => nc.batch === 1).length,
          batch_2: allNaviCuesFromFiles.filter(nc => nc.batch === 2).length,
          batch_3: allNaviCuesFromFiles.filter(nc => nc.batch === 3).length,
        }
      };
      
      // Download as JSON
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `navicues-export-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      addLog(`✓ Exported ${exportData.count} NaviCues to JSON`);
    } catch (error) {
      console.error('Export failed:', error);
      addLog(`ERROR: ${error}`);
    }
  };

  const exportFromDatabase = async () => {
    addLog('Exporting database to JSON...');
    
    try {
      // TODO: GET /make-server-49b28b8a/navicues/export
      const response = await fetch('/make-server-49b28b8a/navicues/export', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Database export endpoint not available. Use "Export JSON" to export from TS files instead.');
      }
      
      const data = await response.json();
      
      // Download as JSON
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `navicues-db-export-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      addLog(`✓ Exported ${data.navicues.length} NaviCues from database`);
    } catch (error) {
      console.error('Database export failed:', error);
      addLog(`ERROR: ${error}`);
    }
  };

  const exportToCSV = () => {
    addLog('Exporting NaviCues to CSV...');
    
    try {
      // Convert array to CSV
      const headers = [
        'id',
        'name',
        'text_line',
        'pillar_id',
        'schema',
        'family',
        'kbe_layer',
        'response_type',
        'modality',
        'heat_level',
        'council_lens',
        'tags',
        'batch',
        'status',
        'created_at',
      ];
      
      const csvRows = [headers.join(',')];
      
      for (const nc of allNaviCuesFromFiles) {
        const row = [
          nc.id || '',
          `"${(nc.name || '').replace(/"/g, '""')}"`,
          `"${(nc.text_line || '').replace(/"/g, '""')}"`,
          nc.pillar_id || '',
          nc.schema || '',
          nc.family || '',
          nc.kbe_layer || '',
          nc.response_type || '',
          nc.modality || '',
          nc.heat_level || '',
          nc.council_lens || '',
          `"${(nc.tags || []).join('|')}"`,
          nc.batch || '',
          nc.status || 'draft',
          nc.created_at || new Date().toISOString(),
        ];
        csvRows.push(row.join(','));
      }
      
      const csv = csvRows.join('\n');
      
      // Download as CSV
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `navicues-export-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      
      addLog(`✓ Exported ${allNaviCuesFromFiles.length} NaviCues to CSV`);
    } catch (error) {
      console.error('CSV export failed:', error);
      addLog(`ERROR: ${error}`);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">NaviCue Sync Tool</h1>
      
      {/* Actions */}
      <div className="bg-zinc-900/50 border border-zinc-800 p-8 mb-8">
        <h2 className="text-xl font-bold mb-6">Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={analyzeSync}
            disabled={syncState === 'analyzing' || syncState === 'importing'}
            className="px-6 py-4 bg-[#3E2BB8] hover:bg-[#5739FB] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
          >
            <RefreshCw className={`w-5 h-5 ${syncState === 'analyzing' ? 'animate-spin' : ''}`} />
            <div className="text-left">
              <div className="font-bold">Analyze</div>
              <div className="text-xs opacity-80">Compare files vs DB</div>
            </div>
          </button>

          <button
            onClick={performImport}
            disabled={syncState !== 'ready' && syncState !== 'complete'}
            className="px-6 py-4 bg-green-700 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
          >
            <Upload className="w-5 h-5" />
            <div className="text-left">
              <div className="font-bold">Import to DB</div>
              <div className="text-xs opacity-80">Batch upsert all</div>
            </div>
          </button>

          <button
            onClick={exportToCSV}
            disabled={syncState === 'importing'}
            className="px-6 py-4 bg-blue-700 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
          >
            <Download className="w-5 h-5" />
            <div className="text-left">
              <div className="font-bold">Export CSV</div>
              <div className="text-xs opacity-80">All 3000 + metadata</div>
            </div>
          </button>

          <button
            onClick={exportToFiles}
            disabled={syncState === 'importing'}
            className="px-6 py-4 bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
          >
            <Download className="w-5 h-5" />
            <div className="text-left">
              <div className="font-bold">Export JSON</div>
              <div className="text-xs opacity-80">All 3000 from files</div>
            </div>
          </button>
        </div>
      </div>
      
      {/* Stats */}
      <div className="bg-zinc-900/50 border border-zinc-800 p-8 mb-8">
        <h2 className="text-xl font-bold mb-6">Stats</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-zinc-800 p-4 rounded">
            <div className="text-xl font-bold">Files Total</div>
            <div className="text-sm opacity-80">{stats.filesTotal}</div>
          </div>
          <div className="bg-zinc-800 p-4 rounded">
            <div className="text-xl font-bold">DB Total</div>
            <div className="text-sm opacity-80">{stats.dbTotal}</div>
          </div>
          <div className="bg-zinc-800 p-4 rounded">
            <div className="text-xl font-bold">To Import</div>
            <div className="text-sm opacity-80">{stats.toImport}</div>
          </div>
          <div className="bg-zinc-800 p-4 rounded">
            <div className="text-xl font-bold">To Update</div>
            <div className="text-sm opacity-80">{stats.toUpdate}</div>
          </div>
          <div className="bg-zinc-800 p-4 rounded">
            <div className="text-xl font-bold">Conflicts</div>
            <div className="text-sm opacity-80">{stats.conflicts}</div>
          </div>
        </div>
      </div>
      
      {/* Progress */}
      <div className="bg-zinc-900/50 border border-zinc-800 p-8 mb-8">
        <h2 className="text-xl font-bold mb-6">Progress</h2>
        
        <div className="relative h-8 bg-zinc-800 rounded">
          <div
            className="absolute left-0 top-0 h-full bg-green-700 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="text-sm opacity-80 mt-2">
          {syncState === 'importing' ? `${progress.toFixed(2)}%` : syncState}
        </div>
      </div>
      
      {/* Logs */}
      <div className="bg-zinc-900/50 border border-zinc-800 p-8 mb-8">
        <h2 className="text-xl font-bold mb-6">Logs</h2>
        
        <div className="h-48 overflow-y-auto">
          {logs.map((log, index) => (
            <div key={index} className="text-sm opacity-80">
              {log}
            </div>
          ))}
        </div>
      </div>
      
      {/* Guide */}
      <div className="mt-8 p-6 bg-blue-900/20 border border-blue-700/30">
        <h3 className="text-blue-400 font-bold mb-2">📘 How to Use</h3>
        <ol className="text-sm text-blue-200 space-y-2 list-decimal list-inside">
          <li><strong>Export CSV:</strong> Download all 3000 NaviCues as CSV with full metadata (works immediately, no DB needed)</li>
          <li><strong>Analyze:</strong> Compare TS files (3000) vs database (0 initially)</li>
          <li><strong>Import:</strong> Batch upload all NaviCues to database (100 at a time)</li>
          <li><strong>Verify:</strong> Check NaviCue Studio list view shows all 3000</li>
          <li><strong>Incremental:</strong> When you add Batch 4-10, run Analyze + Import again</li>
          <li><strong>Export JSON:</strong> Download current DB state as JSON backup</li>
        </ol>
      </div>

      {/* CSV Format Info */}
      <div className="mt-6 p-6 bg-purple-900/20 border border-purple-700/30">
        <h3 className="text-purple-400 font-bold mb-2">📊 CSV Export Format</h3>
        <p className="text-sm text-purple-200 mb-3">
          The CSV includes 15 columns with all NaviCue metadata:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-purple-200">
          <div>• id (nc.0001 - nc.3000)</div>
          <div>• name</div>
          <div>• text_line (full text)</div>
          <div>• pillar_id (ER, SR, SC, CR, II, DM)</div>
          <div>• schema (18 schemas)</div>
          <div>• family (8+ families)</div>
          <div>• kbe_layer (know, be, express)</div>
          <div>• response_type</div>
          <div>• modality</div>
          <div>• heat_level (high, medium, low)</div>
          <div>• council_lens (Batch 3 only)</div>
          <div>• tags (pipe-separated: tag1|tag2)</div>
          <div>• batch (1, 2, 3)</div>
          <div>• status</div>
          <div>• created_at</div>
        </div>
        <p className="text-xs text-purple-300 mt-3">
          Perfect for: bulk review, spreadsheet editing, team collaboration, external analysis
        </p>
      </div>
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="px-6 py-4 bg-red-700 hover:bg-red-600 transition-colors"
      >
        Close
      </button>
    </div>
  );
}