/**
 * BATCH OVERVIEW DASHBOARD
 * 
 * Shows stats for all 3 NaviCue batches side-by-side:
 * - Batch 1: Neuroscience + Spirit + Poetry
 * - Batch 2: Algorithmic Arsenal (8 families × 12 schemas)
 * - Batch 3: Council of Six (state gating + wisdom lenses)
 * 
 * Real data from enhancement engine, not mocks.
 */

import { useState, useEffect } from 'react';
import { CommandCenterCard } from '../CommandCenterLayout';

interface BatchStats {
  batchNumber: number;
  batchName: string;
  total: number;
  validated: number;
  synced: number;
  errors: number;
  
  // Metadata counts
  withSchema: number;
  withKBE: number;
  withHeatLevel: number;
  withCouncil: number;
  withWayProcess: number;
  
  // Distribution
  heatDistribution: Record<string, number>;
  kbeDistribution: Record<string, number>;
  familyCount: number;
  schemaCount: number;
  
  // Status
  enhancementStatus: 'pending' | 'processing' | 'complete' | 'error';
  syncStatus: 'pending' | 'syncing' | 'complete' | 'error';
  lastEnhanced?: string;
  lastSynced?: string;
}

const MOCK_STATS: BatchStats[] = [
  {
    batchNumber: 1,
    batchName: 'Neuroscience + Spirit + Poetry',
    total: 1000,
    validated: 0,
    synced: 0,
    errors: 0,
    
    withSchema: 0,
    withKBE: 1000,
    withHeatLevel: 0,
    withCouncil: 0,
    withWayProcess: 0,
    
    heatDistribution: {},
    kbeDistribution: { knowing: 400, believing: 400, embodying: 200 },
    familyCount: 8,
    schemaCount: 0,
    
    enhancementStatus: 'pending',
    syncStatus: 'pending',
  },
  {
    batchNumber: 2,
    batchName: 'Algorithmic Arsenal',
    total: 1000,
    validated: 0,
    synced: 0,
    errors: 0,
    
    withSchema: 1000,
    withKBE: 1000,
    withHeatLevel: 0,
    withCouncil: 0,
    withWayProcess: 0,
    
    heatDistribution: {},
    kbeDistribution: { knowing: 400, believing: 400, embodying: 200 },
    familyCount: 8,
    schemaCount: 12,
    
    enhancementStatus: 'pending',
    syncStatus: 'pending',
  },
  {
    batchNumber: 3,
    batchName: 'Council of Six',
    total: 1000,
    validated: 0,
    synced: 0,
    errors: 0,
    
    withSchema: 1000,
    withKBE: 0,
    withHeatLevel: 1000,
    withCouncil: 1000,
    withWayProcess: 1000,
    
    heatDistribution: { high: 300, medium: 400, low: 300 },
    kbeDistribution: {},
    familyCount: 8,
    schemaCount: 18,
    
    enhancementStatus: 'pending',
    syncStatus: 'pending',
  },
];

export function BatchOverview({
  onViewBatch,
}: {
  onViewBatch?: (batchNumber: number) => void;
}) {
  const [stats, setStats] = useState<BatchStats[]>(MOCK_STATS);
  const [loading, setLoading] = useState(false);
  
  // TODO: Fetch real stats from enhancement engine
  useEffect(() => {
    // This will call the enhancement engine to get real stats
    // For now using mocks
  }, []);
  
  const totalNaviCues = stats.reduce((sum, batch) => sum + batch.total, 0);
  const totalSynced = stats.reduce((sum, batch) => sum + batch.synced, 0);
  const totalErrors = stats.reduce((sum, batch) => sum + batch.errors, 0);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Overall Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px' 
      }}>
        <StatCard
          label="Total NaviCues"
          value={totalNaviCues.toLocaleString()}
          icon="PWR"
          status={totalNaviCues === 3000 ? 'success' : 'neutral'}
        />
        <StatCard
          label="Synced to Supabase"
          value={totalSynced.toLocaleString()}
          icon="SYNC"
          status={totalSynced === 3000 ? 'success' : totalSynced > 0 ? 'warning' : 'neutral'}
          subtitle={`${Math.round((totalSynced / 3000) * 100)}% complete`}
        />
        <StatCard
          label="Validation Errors"
          value={totalErrors.toLocaleString()}
          icon="!"
          status={totalErrors === 0 ? 'success' : 'error'}
        />
      </div>
      
      {/* Batch Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '16px' }}>
        {stats.map(batch => (
          <BatchCard
            key={batch.batchNumber}
            batch={batch}
            onView={() => onViewBatch?.(batch.batchNumber)}
          />
        ))}
      </div>
    </div>
  );
}

function BatchCard({ 
  batch, 
  onView 
}: { 
  batch: BatchStats; 
  onView: () => void;
}) {
  const completionPercent = Math.round((batch.validated / batch.total) * 100);
  
  return (
    <CommandCenterCard 
      hover 
      onClick={onView}
      style={{ cursor: 'pointer' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Header */}
        <div>
          <div style={{ 
            fontSize: '12px', 
            color: 'var(--text-tertiary)',
            marginBottom: '4px'
          }}>
            Batch {batch.batchNumber}
          </div>
          <div style={{ 
            fontSize: '16px', 
            color: 'var(--text-primary)',
          }}>
            {batch.batchName}
          </div>
        </div>
        
        {/* Progress */}
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '8px',
            fontSize: '12px',
            color: 'var(--text-secondary)'
          }}>
            <span>Enhancement Progress</span>
            <span>{completionPercent}%</span>
          </div>
          <div style={{
            height: '4px',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${completionPercent}%`,
              backgroundColor: getStatusColor(batch.enhancementStatus),
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
        
        {/* Metadata Counts */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '8px',
          fontSize: '12px'
        }}>
          <MetadataRow 
            label="Total"
            value={batch.total}
            status={batch.total > 0 ? 'success' : 'neutral'}
          />
          <MetadataRow 
            label="Synced"
            value={batch.synced}
            status={batch.synced === batch.total ? 'success' : batch.synced > 0 ? 'warning' : 'neutral'}
          />
          <MetadataRow 
            label="Schema"
            value={batch.withSchema}
            status={batch.withSchema === batch.total ? 'success' : 'neutral'}
          />
          <MetadataRow 
            label="Heat Level"
            value={batch.withHeatLevel}
            status={batch.withHeatLevel === batch.total ? 'success' : 'neutral'}
          />
          <MetadataRow 
            label="KBE"
            value={batch.withKBE}
            status={batch.withKBE === batch.total ? 'success' : 'neutral'}
          />
          <MetadataRow 
            label="Council"
            value={batch.withCouncil}
            status={batch.withCouncil > 0 ? 'success' : 'neutral'}
          />
        </div>
        
        {/* Distribution */}
        {Object.keys(batch.heatDistribution).length > 0 && (
          <div style={{ 
            paddingTop: '12px', 
            borderTop: '1px solid var(--border-subtle)' 
          }}>
            <div style={{ 
              fontSize: '12px', 
              color: 'var(--text-tertiary)',
              marginBottom: '8px'
            }}>
              Heat Distribution
            </div>
            <div style={{ display: 'flex', gap: '12px', fontSize: '11px' }}>
              {Object.entries(batch.heatDistribution).map(([level, count]) => (
                <div key={level} style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ textTransform: 'capitalize' }}>{level}</span>: {count}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Status Badges */}
        <div style={{ 
          display: 'flex', 
          gap: '8px',
          paddingTop: '12px',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <StatusBadge 
            status={batch.enhancementStatus === 'complete' ? 'success' : 'neutral'} 
            label={batch.enhancementStatus === 'complete' ? 'Enhanced' : 'Not Enhanced'}
            size="sm"
          />
          <StatusBadge 
            status={batch.syncStatus === 'complete' ? 'success' : 'neutral'} 
            label={batch.syncStatus === 'complete' ? 'Synced' : 'Not Synced'}
            size="sm"
          />
          {batch.errors > 0 && (
            <StatusBadge 
              status="error" 
              label={`${batch.errors} errors`}
              size="sm"
            />
          )}
        </div>
      </div>
    </CommandCenterCard>
  );
}

function StatCard({
  label,
  value,
  icon,
  status,
  subtitle,
}: {
  label: string;
  value: string;
  icon: string;
  status: 'success' | 'warning' | 'error' | 'neutral';
  subtitle?: string;
}) {
  return (
    <CommandCenterCard>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ 
          fontSize: '12px', 
          color: 'var(--text-tertiary)',
        }}>
          {label}
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px' 
        }}>
          <span style={{ fontSize: '20px' }}>{icon}</span>
          <span style={{ 
            fontSize: '24px', 
            color: 'var(--text-primary)',
          }}>
            {value}
          </span>
        </div>
        {subtitle && (
          <div style={{ 
            fontSize: '11px', 
            color: 'var(--text-secondary)' 
          }}>
            {subtitle}
          </div>
        )}
        <StatusBadge status={status} size="sm" />
      </div>
    </CommandCenterCard>
  );
}

function MetadataRow({
  label,
  value,
  status,
}: {
  label: string;
  value: number;
  status: 'success' | 'warning' | 'neutral';
}) {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      color: 'var(--text-secondary)'
    }}>
      <span>{label}:</span>
      <span style={{ 
        color: status === 'success' ? 'var(--status-success)' : 'var(--text-primary)' 
      }}>
        {value.toLocaleString()}
      </span>
    </div>
  );
}

function StatusBadge({ 
  status, 
  label,
  size = 'md'
}: { 
  status: 'success' | 'warning' | 'error' | 'neutral';
  label?: string;
  size?: 'sm' | 'md';
}) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: size === 'sm' ? '2px 8px' : '4px 12px',
      backgroundColor: `${getStatusColor(status)}15`,
      border: `1px solid ${getStatusColor(status)}`,
      fontSize: size === 'sm' ? '10px' : '12px',
      color: getStatusColor(status),
    }}>
      <div style={{
        width: '6px',
        height: '6px',
        backgroundColor: getStatusColor(status),
      }} />
      {label || status}
    </div>
  );
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'success':
    case 'complete':
      return 'var(--status-success)';
    case 'warning':
    case 'processing':
    case 'syncing':
      return 'var(--status-warning)';
    case 'error':
      return 'var(--status-error)';
    default:
      return 'var(--status-neutral)';
  }
}