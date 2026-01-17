/**
 * NAVICUE SYNC STUDIO
 * 
 * Unified sync interface for all 10,000 NaviCues
 * - Load legacy 3,000 (from wherever they are)
 * - Load new 7,000 (from generated JSON)
 * - Preview combined library
 * - Sync to Supabase
 * - Monitor sync progress
 */

import { useState } from 'react';
import { Upload, Database, CheckCircle, XCircle, Loader, AlertTriangle } from 'lucide-react';
import { GeneratedNavicue } from '../../../types/navicue-contract';
import { syncBatch, syncAll10000, getSyncStats, SyncResult } from '../../../lib/navicues/sync/supabase-sync';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

interface NaviCueSyncStudioProps {
  onClose: () => void;
}

export function NaviCueSyncStudio({ onClose }: NaviCueSyncStudioProps) {
  const [legacy3000, setLegacy3000] = useState<GeneratedNavicue[]>([]);
  const [new7000, setNew7000] = useState<GeneratedNavicue[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [result, setResult] = useState<SyncResult | null>(null);
  const [stats, setStats] = useState<any>(null);
  
  const handleLegacyUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        const cues = json.navicues || json;
        setLegacy3000(Array.isArray(cues) ? cues : []);
        console.log(`Loaded ${cues.length} legacy NaviCues`);
      } catch (error) {
        alert('Failed to parse legacy JSON');
        console.error(error);
      }
    };
    reader.readAsText(file);
  };
  
  const handleNew7000Upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        const cues = json.navicues || json;
        setNew7000(Array.isArray(cues) ? cues : []);
        console.log(`Loaded ${cues.length} new NaviCues`);
      } catch (error) {
        alert('Failed to parse new JSON');
        console.error(error);
      }
    };
    reader.readAsText(file);
  };
  
  const handleSync = async () => {
    if (legacy3000.length === 0 && new7000.length === 0) {
      alert('Please upload NaviCues first');
      return;
    }
    
    setSyncing(true);
    setProgress(0);
    setResult(null);
    
    try {
      const syncResult = await syncAll10000(legacy3000, new7000, {
        supabaseUrl: `https://${projectId}.supabase.co`,
        supabaseKey: publicAnonKey,
        batchSize: 50,
        onProgress: (current, total) => {
          setProgress(current);
          setTotal(total);
        },
        onError: (error, cue) => {
          console.error(`Error syncing ${cue.code}:`, error);
        },
      });
      
      setResult(syncResult);
      
      // Fetch stats after sync
      const statsData = await getSyncStats({
        supabaseUrl: `https://${projectId}.supabase.co`,
        supabaseKey: publicAnonKey,
      });
      setStats(statsData);
      
    } catch (error) {
      alert(`Sync failed: ${error}`);
      console.error(error);
    } finally {
      setSyncing(false);
    }
  };
  
  const totalCues = legacy3000.length + new7000.length;
  const progressPercent = total > 0 ? Math.round((progress / total) * 100) : 0;
  
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">NaviCue Sync Studio</h1>
          <p className="text-sm opacity-70 mt-1">Unified sync for all 10,000 NaviCues</p>
        </div>
        <button onClick={onClose} className="px-4 py-2 bg-red-700 hover:bg-red-600">
          Close
        </button>
      </div>
      
      {/* Upload Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Legacy 3,000 */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-6">
          <h2 className="font-bold mb-4 flex items-center gap-2">
            <Database className="w-5 h-5" />
            Legacy 3,000
          </h2>
          
          {legacy3000.length === 0 ? (
            <div className="border-2 border-dashed border-zinc-700 p-8 text-center">
              <Upload className="w-8 h-8 mx-auto mb-3 opacity-40" />
              <p className="text-sm opacity-70 mb-4">Upload normalized legacy NaviCues</p>
              <label className="inline-block px-4 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] cursor-pointer text-sm">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleLegacyUpload}
                  className="hidden"
                />
                Choose JSON
              </label>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-green-400 mb-4">
                <CheckCircle className="w-5 h-5" />
                <span className="font-bold">{legacy3000.length} cues loaded</span>
              </div>
              <div className="text-xs opacity-60 space-y-1">
                <div>Batches 1-3</div>
                <div>Codes: {legacy3000[0]?.code} - {legacy3000[legacy3000.length - 1]?.code}</div>
              </div>
            </div>
          )}
        </div>
        
        {/* New 7,000 */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-6">
          <h2 className="font-bold mb-4 flex items-center gap-2">
            <Database className="w-5 h-5" />
            New 7,000
          </h2>
          
          {new7000.length === 0 ? (
            <div className="border-2 border-dashed border-zinc-700 p-8 text-center">
              <Upload className="w-8 h-8 mx-auto mb-3 opacity-40" />
              <p className="text-sm opacity-70 mb-4">Upload generated NaviCues (Batches 4-10)</p>
              <label className="inline-block px-4 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] cursor-pointer text-sm">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleNew7000Upload}
                  className="hidden"
                />
                Choose JSON
              </label>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-green-400 mb-4">
                <CheckCircle className="w-5 h-5" />
                <span className="font-bold">{new7000.length} cues loaded</span>
              </div>
              <div className="text-xs opacity-60 space-y-1">
                <div>Batches 4-10</div>
                <div>Codes: {new7000[0]?.code} - {new7000[new7000.length - 1]?.code}</div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Sync Button */}
      {totalCues > 0 && (
        <div className="bg-zinc-900/50 border border-zinc-800 p-8 mb-8 text-center">
          <div className="text-3xl font-bold mb-4">{totalCues.toLocaleString()} NaviCues Ready</div>
          
          {!syncing && !result && (
            <button
              onClick={handleSync}
              className="px-8 py-4 bg-[#3E2BB8] hover:bg-[#5739FB] text-lg"
            >
              Sync to Supabase
            </button>
          )}
          
          {syncing && (
            <div>
              <div className="flex items-center justify-center gap-3 mb-4">
                <Loader className="w-6 h-6 animate-spin" />
                <span className="text-lg">Syncing...</span>
              </div>
              
              <div className="max-w-md mx-auto">
                <div className="h-4 bg-zinc-800 mb-2">
                  <div
                    className="h-full bg-[#5739FB] transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="text-sm opacity-70">
                  {progress.toLocaleString()} / {total.toLocaleString()} ({progressPercent}%)
                </div>
              </div>
            </div>
          )}
          
          {result && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 text-green-400">
                <CheckCircle className="w-8 h-8" />
                <span className="text-xl font-bold">Sync Complete</span>
              </div>
              
              <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="bg-zinc-800/50 p-4">
                  <div className="text-2xl font-bold text-[#5739FB]">{result.total}</div>
                  <div className="text-xs opacity-60">Total</div>
                </div>
                <div className="bg-zinc-800/50 p-4">
                  <div className="text-2xl font-bold text-green-400">{result.inserted}</div>
                  <div className="text-xs opacity-60">Inserted</div>
                </div>
                <div className="bg-zinc-800/50 p-4">
                  <div className="text-2xl font-bold text-yellow-400">{result.updated}</div>
                  <div className="text-xs opacity-60">Updated</div>
                </div>
                <div className="bg-zinc-800/50 p-4">
                  <div className="text-2xl font-bold text-red-400">{result.failed}</div>
                  <div className="text-xs opacity-60">Failed</div>
                </div>
              </div>
              
              {result.errors.length > 0 && (
                <div className="max-w-2xl mx-auto mt-4">
                  <div className="flex items-center gap-2 text-yellow-400 mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-bold">{result.errors.length} Errors</span>
                  </div>
                  <div className="bg-zinc-800/50 p-4 max-h-48 overflow-y-auto text-left text-xs">
                    {result.errors.map((err, idx) => (
                      <div key={idx} className="mb-2 opacity-70">
                        <span className="text-red-400">{err.code}:</span> {err.error}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Stats */}
      {stats && (
        <div className="bg-zinc-900/50 border border-zinc-800 p-8">
          <h2 className="font-bold mb-6">Database Stats</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* By Tier */}
            <div>
              <div className="text-sm opacity-70 mb-3">By Tier</div>
              <div className="space-y-2">
                {Object.entries(stats.by_tier).map(([tier, count]) => (
                  <div key={tier} className="flex justify-between text-sm">
                    <span className="capitalize">{tier}</span>
                    <span className="font-bold">{count as number}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* By KBE */}
            <div>
              <div className="text-sm opacity-70 mb-3">By KBE Layer</div>
              <div className="space-y-2">
                {Object.entries(stats.by_kbe).map(([kbe, count]) => (
                  <div key={kbe} className="flex justify-between text-sm">
                    <span>{kbe}</span>
                    <span className="font-bold">{count as number}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* By Batch */}
            <div>
              <div className="text-sm opacity-70 mb-3">By Batch</div>
              <div className="space-y-2">
                {Object.entries(stats.by_batch).map(([batch, count]) => (
                  <div key={batch} className="flex justify-between text-sm">
                    <span className="capitalize">{batch.replace('_', ' ')}</span>
                    <span className="font-bold">{count as number}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
