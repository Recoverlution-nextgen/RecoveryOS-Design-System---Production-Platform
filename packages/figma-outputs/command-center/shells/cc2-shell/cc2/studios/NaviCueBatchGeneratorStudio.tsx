/**
 * NAVICUE BATCH GENERATOR STUDIO
 * 
 * CC2 interface for generating the 7,000 NaviCue mega batch
 * Batches 4-10: 3,000 → 10,000
 * 
 * Features:
 * - Configure generation parameters
 * - Preview NaviCues before committing
 * - Quality gate visualization
 * - Bulk export to JSON/CSV
 * - Integration with NaviCue Sync Tool
 */

import { useState } from 'react';
import { Zap, Download, Eye, CheckCircle, AlertCircle, Settings } from 'lucide-react';
import { 
  NaviCueBatchGenerator,
  GeneratorConfig,
  DEFAULT_CONFIG,
  generateBatch,
  generateAll7000
} from '../../../lib/navicues/batch-generator/NaviCueBatchGenerator';
import { GeneratedNavicue, NavicueQualityCheck } from '../../../types/navicue-contract';
import { SCHEMA_WAYPACKS_21 } from '../../../lib/navicues/schema-waypacks/SCHEMA_WAYPACKS_18';

interface BatchGeneratorProps {
  onClose: () => void;
}

export function NaviCueBatchGeneratorStudio({ onClose }: BatchGeneratorProps) {
  const [config, setConfig] = useState<GeneratorConfig>(DEFAULT_CONFIG);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState<GeneratedNavicue[]>([]);
  const [qualityResults, setQualityResults] = useState<NavicueQualityCheck[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<number | null>(null);
  const [view, setView] = useState<'config' | 'preview' | 'quality'>('config');
  
  const handleGenerate = async (batchNumber: number) => {
    setGenerating(true);
    setSelectedBatch(batchNumber);
    
    try {
      const generator = new NaviCueBatchGenerator({ ...config, batch_number: batchNumber });
      const cues = generator.generate();
      
      setGenerated(cues);
      setView('preview');
    } catch (error) {
      console.error('Generation failed:', error);
      alert(`Generation failed: ${error}`);
    } finally {
      setGenerating(false);
    }
  };
  
  const handleGenerateAll = async () => {
    setGenerating(true);
    
    try {
      const allCues = generateAll7000();
      setGenerated(allCues);
      setView('preview');
    } catch (error) {
      console.error('Mass generation failed:', error);
      alert(`Mass generation failed: ${error}`);
    } finally {
      setGenerating(false);
    }
  };
  
  const handleExportJSON = () => {
    const generator = new NaviCueBatchGenerator({ ...config, batch_number: selectedBatch || 4 });
    // Set generated cues (hacky but works)
    (generator as any).generated = generated;
    const json = generator.exportToJSON();
    
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `navicues-batch-${selectedBatch || 'all'}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const handleExportCSV = () => {
    // CSV export similar to existing NaviCue Sync Tool
    const headers = [
      'code',
      'kbe_layer',
      'tier',
      'family',
      'component_type',
      'intent',
      'schema_id',
      'lens_primary',
      'headline',
      'body',
      'tags',
    ];
    
    const csvRows = [headers.join(',')];
    
    for (const nc of generated) {
      const primaryVariant = nc.variants[0];
      const primaryTarget = nc.targets.find(t => t.is_primary) || nc.targets[0];
      
      const row = [
        nc.code,
        nc.kbe_layer,
        nc.tier,
        nc.family,
        nc.component_type,
        `"${(nc.intent || '').replace(/"/g, '""')}"`,
        primaryTarget?.schema_id || '',
        primaryVariant?.lens || '',
        `"${(primaryVariant?.copy.headline || '').replace(/"/g, '""')}"`,
        `"${(primaryVariant?.copy.body || '').replace(/"/g, '""')}"`,
        `"${nc.tags.join('|')}"`,
      ];
      csvRows.push(row.join(','));
    }
    
    const csv = csvRows.join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `navicues-batch-${selectedBatch || 'all'}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const renderStats = () => {
    if (generated.length === 0) return null;
    
    // Calculate stats
    const byKBE = {
      K: generated.filter(c => c.kbe_layer === 'K').length,
      B: generated.filter(c => c.kbe_layer === 'B').length,
      E: generated.filter(c => c.kbe_layer === 'E').length,
    };
    
    const byTier = {
      hot: generated.filter(c => c.tier === 'hot').length,
      warm: generated.filter(c => c.tier === 'warm').length,
      cool: generated.filter(c => c.tier === 'cool').length,
    };
    
    const bySchema = SCHEMA_WAYPACKS_21.map(schema => ({
      schema_id: schema.schema_id,
      display_name: schema.display_name,
      count: generated.filter(c => c.targets.some(t => t.schema_id === schema.schema_id)).length,
    }));
    
    const uniqueComponents = new Set(generated.map(c => c.component_type)).size;
    
    return (
      <div className="bg-zinc-900/50 border border-zinc-800 p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Generation Stats</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 className="text-sm opacity-70 mb-2">KBE Distribution</h3>
            <div className="space-y-1">
              <div>K (Knowing): {byKBE.K} ({((byKBE.K / generated.length) * 100).toFixed(1)}%)</div>
              <div>B (Believing): {byKBE.B} ({((byKBE.B / generated.length) * 100).toFixed(1)}%)</div>
              <div>E (Embodying): {byKBE.E} ({((byKBE.E / generated.length) * 100).toFixed(1)}%)</div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm opacity-70 mb-2">Tier Distribution</h3>
            <div className="space-y-1">
              <div>Hot: {byTier.hot} ({((byTier.hot / generated.length) * 100).toFixed(1)}%)</div>
              <div>Warm: {byTier.warm} ({((byTier.warm / generated.length) * 100).toFixed(1)}%)</div>
              <div>Cool: {byTier.cool} ({((byTier.cool / generated.length) * 100).toFixed(1)}%)</div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm opacity-70 mb-2">Components</h3>
            <div className="space-y-1">
              <div>Total Generated: {generated.length}</div>
              <div>Unique Components: {uniqueComponents}</div>
              <div>Avg Variants/Cue: {(generated.reduce((sum, c) => sum + c.variants.length, 0) / generated.length).toFixed(1)}</div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm opacity-70 mb-2">Schema Coverage ({SCHEMA_WAYPACKS_21.length} schemas)</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
            {bySchema.map(s => (
              <div key={s.schema_id} className="text-xs p-2 bg-zinc-800/50">
                <div className="opacity-70">{s.display_name}</div>
                <div className="text-[#5739FB]">{s.count} cues</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">NaviCue Batch Generator</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setView('config')}
            className={`px-4 py-2 ${view === 'config' ? 'bg-[#3E2BB8]' : 'bg-zinc-700'}`}
          >
            Config
          </button>
          <button
            onClick={() => setView('preview')}
            disabled={generated.length === 0}
            className={`px-4 py-2 ${view === 'preview' ? 'bg-[#3E2BB8]' : 'bg-zinc-700'} disabled:opacity-30`}
          >
            Preview ({generated.length})
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-red-700 hover:bg-red-600">
            Close
          </button>
        </div>
      </div>
      
      {/* CONFIG VIEW */}
      {view === 'config' && (
        <>
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 mb-8">
            <h2 className="text-xl font-bold mb-6">Generator Configuration</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm opacity-70 mb-2">Target Count per Batch</label>
                <input
                  type="number"
                  value={config.target_count}
                  onChange={(e) => setConfig({ ...config, target_count: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm opacity-70 mb-2">Schema Balance</label>
                <select
                  value={config.schema_balance ? 'balanced' : 'weighted'}
                  onChange={(e) => setConfig({ ...config, schema_balance: e.target.value === 'balanced' })}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white"
                >
                  <option value="balanced">Balanced (equal distribution)</option>
                  <option value="weighted">Weighted (by prevalence)</option>
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm opacity-70 mb-2">KBE Ratio (K:B:E)</label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs opacity-60">Knowing (K)</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="1"
                    value={config.kbe_ratio.K}
                    onChange={(e) => setConfig({
                      ...config,
                      kbe_ratio: { ...config.kbe_ratio, K: parseFloat(e.target.value) }
                    })}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-xs opacity-60">Believing (B)</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="1"
                    value={config.kbe_ratio.B}
                    onChange={(e) => setConfig({
                      ...config,
                      kbe_ratio: { ...config.kbe_ratio, B: parseFloat(e.target.value) }
                    })}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-xs opacity-60">Embodying (E)</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="1"
                    value={config.kbe_ratio.E}
                    onChange={(e) => setConfig({
                      ...config,
                      kbe_ratio: { ...config.kbe_ratio, E: parseFloat(e.target.value) }
                    })}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 text-white"
                  />
                </div>
              </div>
              <div className="text-xs opacity-60 mt-2">
                Total: {(config.kbe_ratio.K + config.kbe_ratio.B + config.kbe_ratio.E).toFixed(2)} (should equal 1.0)
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={config.council_rotation}
                  onChange={(e) => setConfig({ ...config, council_rotation: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm">Council Lens Rotation</span>
              </label>
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={config.quality_gates}
                  onChange={(e) => setConfig({ ...config, quality_gates: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm">Quality Gates</span>
              </label>
            </div>
          </div>
          
          {/* BATCH BUTTONS */}
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 mb-8">
            <h2 className="text-xl font-bold mb-6">Generate Batches</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[4, 5, 6, 7, 8, 9, 10].map(batch => (
                <button
                  key={batch}
                  onClick={() => handleGenerate(batch)}
                  disabled={generating}
                  className="px-6 py-8 bg-[#3E2BB8] hover:bg-[#5739FB] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <div className="text-3xl font-bold mb-2">{batch}</div>
                  <div className="text-xs opacity-80">Batch {batch}</div>
                  <div className="text-xs opacity-60 mt-1">{config.target_count} cues</div>
                </button>
              ))}
            </div>
            
            <div className="border-t border-zinc-700 pt-6">
              <button
                onClick={handleGenerateAll}
                disabled={generating}
                className="w-full px-6 py-6 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] hover:from-[#5739FB] hover:to-[#3E2BB8] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <div className="flex items-center justify-center gap-3">
                  <Zap className="w-6 h-6" />
                  <div>
                    <div className="text-xl font-bold">Generate All 7,000</div>
                    <div className="text-sm opacity-80">Batches 4-10 (3,000 → 10,000)</div>
                  </div>
                </div>
              </button>
            </div>
            
            {generating && (
              <div className="mt-4 p-4 bg-blue-900/20 border border-blue-700/30 text-center">
                <div className="animate-spin inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full mb-2"></div>
                <div>Generating NaviCues...</div>
              </div>
            )}
          </div>
          
          {/* SCHEMA WAYPACKS INFO */}
          <div className="bg-zinc-900/50 border border-zinc-800 p-8">
            <h2 className="text-xl font-bold mb-4">21 Schema Waypacks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {SCHEMA_WAYPACKS_21.map(schema => (
                <div key={schema.schema_id} className="p-4 bg-zinc-800/50 border border-zinc-700">
                  <div className="font-bold text-[#5739FB]">{schema.display_name}</div>
                  <div className="text-xs opacity-60 mb-2">{schema.domain}</div>
                  <div className="text-sm opacity-80 mb-2">{schema.core_illusion}</div>
                  <div className="text-xs">
                    <span className="opacity-60">K:</span> {schema.recommended_families.K.join(', ')}
                  </div>
                  <div className="text-xs">
                    <span className="opacity-60">B:</span> {schema.recommended_families.B.join(', ')}
                  </div>
                  <div className="text-xs">
                    <span className="opacity-60">E:</span> {schema.recommended_families.E.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      
      {/* PREVIEW VIEW */}
      {view === 'preview' && generated.length > 0 && (
        <>
          {renderStats()}
          
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Export Options</h2>
              <div className="flex gap-4">
                <button
                  onClick={handleExportJSON}
                  className="px-6 py-3 bg-blue-700 hover:bg-blue-600 flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Export JSON
                </button>
                <button
                  onClick={handleExportCSV}
                  className="px-6 py-3 bg-green-700 hover:bg-green-600 flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-zinc-900/50 border border-zinc-800 p-8">
            <h2 className="text-xl font-bold mb-4">NaviCue Preview (First 20)</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {generated.slice(0, 20).map(cue => (
                <div key={cue.code} className="p-4 bg-zinc-800/50 border border-zinc-700">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="font-mono text-[#5739FB]">{cue.code}</span>
                      <span className="mx-2 opacity-40">|</span>
                      <span className="text-xs opacity-60">{cue.kbe_layer}</span>
                      <span className="mx-2 opacity-40">|</span>
                      <span className="text-xs opacity-60">{cue.tier}</span>
                      <span className="mx-2 opacity-40">|</span>
                      <span className="text-xs opacity-60">{cue.component_type}</span>
                    </div>
                    <div className="text-xs opacity-60">
                      {cue.variants.length} variants
                    </div>
                  </div>
                  
                  <div className="text-sm mb-2">{cue.intent}</div>
                  
                  {cue.variants[0] && (
                    <div className="mt-3 p-3 bg-zinc-900/50 border-l-2 border-[#5739FB]">
                      <div className="text-xs opacity-60 mb-1">Primary Variant ({cue.variants[0].lens})</div>
                      {cue.variants[0].copy.headline && (
                        <div className="font-bold mb-1">{cue.variants[0].copy.headline}</div>
                      )}
                      {cue.variants[0].copy.body && (
                        <div className="text-sm opacity-80">{cue.variants[0].copy.body}</div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {cue.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 bg-zinc-700 opacity-60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}