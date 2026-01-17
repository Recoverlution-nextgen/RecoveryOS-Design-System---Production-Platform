/**
 * NAVICUE LIBRARY BROWSER
 * 
 * Browse and inspect all NaviCues with full metadata visible.
 * Wired up to actual data from NAVICUE_1000_COMPLETE, NAVICUE_MASTER_2000, NAVICUE_3000_COUNCIL
 * 
 * The HERO of the Command Center - see each cue well organized with tags/data
 */

import { useState, useMemo } from 'react';
import { CommandCenterCard } from '../CommandCenterLayout';
import { NAVICUE_1000_COMPLETE } from '../../../lib/navicues/NAVICUE_1000_COMPLETE';
import { NAVICUE_MASTER_2000 } from '../../../lib/navicues/NAVICUE_MASTER_2000';
import { NAVICUE_3000_COUNCIL } from '../../../lib/navicues/NAVICUE_3000_COUNCIL';
import type { NaviCue } from '../../../lib/navicues/types';

export function NaviCueLibraryBrowser() {
  const [selectedBatch, setSelectedBatch] = useState<1 | 2 | 3>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNaviCue, setSelectedNaviCue] = useState<NaviCue | null>(null);
  const [filterSchema, setFilterSchema] = useState<string>('all');
  const [filterFamily, setFilterFamily] = useState<string>('all');

  // Get batch data
  const batchData = useMemo(() => {
    if (selectedBatch === 1) return NAVICUE_1000_COMPLETE;
    if (selectedBatch === 2) return NAVICUE_MASTER_2000.slice(1000);
    return NAVICUE_3000_COUNCIL;
  }, [selectedBatch]);

  // Get unique filters
  const schemas = useMemo(() => {
    const unique = new Set(batchData.map(nc => nc.schema).filter(Boolean));
    return ['all', ...Array.from(unique).sort()];
  }, [batchData]);

  const families = useMemo(() => {
    const unique = new Set(batchData.map(nc => nc.family).filter(Boolean));
    return ['all', ...Array.from(unique).sort()];
  }, [batchData]);

  // Filter data
  const filtered = useMemo(() => {
    return batchData.filter(nc => {
      const matchesSearch = !searchQuery ||
        nc.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nc.text_line?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nc.schema?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSchema = filterSchema === 'all' || nc.schema === filterSchema;
      const matchesFamily = filterFamily === 'all' || nc.family === filterFamily;
      
      return matchesSearch && matchesSchema && matchesFamily;
    });
  }, [batchData, searchQuery, filterSchema, filterFamily]);

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '320px 1fr', 
      gap: '24px', 
      height: '700px' 
    }}>
      {/* SIDEBAR */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '16px',
        overflowY: 'auto',
      }}>
        {/* Batch Selector */}
        <CommandCenterCard>
          <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--text-tertiary)' }}>
            Select Batch
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[1, 2, 3].map(num => (
              <button
                key={num}
                onClick={() => {
                  setSelectedBatch(num as 1 | 2 | 3);
                  setSelectedNaviCue(null);
                }}
                style={{
                  flex: 1,
                  padding: '8px',
                  backgroundColor: selectedBatch === num ? 'var(--brand-primary)' : 'transparent',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-default)',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                Batch {num}
              </button>
            ))}
          </div>
          <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--text-secondary)' }}>
            {batchData.length} NaviCues
          </div>
        </CommandCenterCard>

        {/* Filters */}
        <CommandCenterCard>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Search */}
            <div>
              <div style={{ marginBottom: '4px', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                Search
              </div>
              <input
                type="text"
                placeholder="Search NaviCues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '13px',
                }}
              />
            </div>

            {/* Schema Filter */}
            <div>
              <div style={{ marginBottom: '4px', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                Schema
              </div>
              <select
                value={filterSchema}
                onChange={(e) => setFilterSchema(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '13px',
                }}
              >
                {schemas.map(s => (
                  <option key={s} value={s} style={{ backgroundColor: 'var(--bg-primary)' }}>
                    {s === 'all' ? 'All Schemas' : s}
                  </option>
                ))}
              </select>
            </div>

            {/* Family Filter */}
            <div>
              <div style={{ marginBottom: '4px', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                Family
              </div>
              <select
                value={filterFamily}
                onChange={(e) => setFilterFamily(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '13px',
                }}
              >
                {families.map(f => (
                  <option key={f} value={f} style={{ backgroundColor: 'var(--bg-primary)' }}>
                    {f === 'all' ? 'All Families' : f}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CommandCenterCard>

        {/* Results Count */}
        <div style={{ 
          padding: '8px 12px',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          fontSize: '11px', 
          color: 'var(--text-secondary)',
        }}>
          {filtered.length} results
        </div>

        {/* NaviCue List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {filtered.slice(0, 100).map(nc => (
            <div
              key={nc.id}
              onClick={() => setSelectedNaviCue(nc)}
              style={{
                padding: '10px',
                backgroundColor: selectedNaviCue?.id === nc.id ? 'var(--brand-primary)' : 'var(--bg-secondary)',
                border: `1px solid ${selectedNaviCue?.id === nc.id ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                cursor: 'pointer',
                fontSize: '12px',
                color: 'var(--text-primary)',
              }}
            >
              <div style={{ fontWeight: 500, marginBottom: '4px' }}>{nc.id}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                {nc.name}
              </div>
              <div style={{ 
                display: 'flex', 
                gap: '4px', 
                flexWrap: 'wrap',
                fontSize: '10px',
              }}>
                {nc.schema && (
                  <span style={{ 
                    padding: '2px 6px', 
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-tertiary)',
                  }}>
                    {nc.schema}
                  </span>
                )}
                {nc.family && (
                  <span style={{ 
                    padding: '2px 6px', 
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-tertiary)',
                  }}>
                    {nc.family}
                  </span>
                )}
              </div>
            </div>
          ))}
          {filtered.length > 100 && (
            <div style={{ 
              padding: '8px', 
              fontSize: '11px', 
              color: 'var(--text-secondary)',
              textAlign: 'center',
            }}>
              Showing first 100 of {filtered.length}
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ 
        padding: '24px',
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
        overflowY: 'auto',
      }}>
        {selectedNaviCue ? (
          <NaviCueDetail navicue={selectedNaviCue} />
        ) : (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center',
            height: '100%',
            color: 'var(--text-tertiary)',
            fontSize: '14px',
            gap: '16px',
          }}>
            <div style={{ fontSize: '48px', opacity: 0.5 }}>⚡</div>
            <div>Select a NaviCue to view details</div>
            <div style={{ fontSize: '12px', textAlign: 'center', maxWidth: '400px' }}>
              Browse {batchData.length} NaviCues from Batch {selectedBatch}
              <br />
              Filter by schema, family, or search by text
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NaviCueDetail({ navicue }: { navicue: NaviCue }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
          {navicue.id}
        </div>
        <div style={{ fontSize: '20px', color: 'var(--text-primary)', marginBottom: '8px' }}>
          {navicue.name}
        </div>
        {navicue.text_line && (
          <div style={{ 
            fontSize: '14px', 
            color: 'var(--text-secondary)', 
            lineHeight: 1.6,
            padding: '16px',
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-subtle)',
          }}>
            {navicue.text_line}
          </div>
        )}
      </div>

      {/* Core Metadata */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '16px',
        paddingTop: '16px',
        borderTop: '1px solid var(--border-subtle)',
      }}>
        <MetadataField label="Schema" value={navicue.schema} />
        <MetadataField label="Family" value={navicue.family} />
        <MetadataField label="Pillar" value={navicue.pillar_id} />
        <MetadataField label="KBE Target" value={navicue.kbe_target} />
        <MetadataField label="Heat Level" value={navicue.heat_level} />
        <MetadataField label="Response Type" value={navicue.response_type} />
      </div>

      {/* Batch 3 Specific Metadata */}
      {(navicue.council_lens || navicue.way_process) && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '16px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-subtle)',
        }}>
          {navicue.council_lens && (
            <MetadataField label="Council Lens" value={navicue.council_lens} />
          )}
          {navicue.way_process && (
            <MetadataField label="Way Process" value={navicue.way_process} />
          )}
        </div>
      )}

      {/* Tags */}
      {navicue.tags && navicue.tags.length > 0 && (
        <div style={{ 
          paddingTop: '16px',
          borderTop: '1px solid var(--border-subtle)',
        }}>
          <div style={{ 
            fontSize: '12px', 
            color: 'var(--text-tertiary)',
            marginBottom: '12px'
          }}>
            Tags ({navicue.tags.length})
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {navicue.tags.map((tag: string) => (
              <div
                key={tag}
                style={{
                  padding: '4px 8px',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Raw JSON (expandable) */}
      <details style={{ 
        paddingTop: '16px',
        borderTop: '1px solid var(--border-subtle)',
      }}>
        <summary style={{ 
          fontSize: '12px', 
          color: 'var(--text-tertiary)',
          cursor: 'pointer',
          marginBottom: '12px'
        }}>
          Raw JSON
        </summary>
        <pre style={{ 
          padding: '12px',
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-subtle)',
          fontSize: '11px',
          color: 'var(--text-secondary)',
          overflowX: 'auto',
          maxHeight: '400px',
          overflowY: 'auto',
        }}>
          {JSON.stringify(navicue, null, 2)}
        </pre>
      </details>
    </div>
  );
}

function MetadataField({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
        {label}
      </div>
      <div style={{ 
        fontSize: '13px', 
        color: value ? 'var(--text-primary)' : 'var(--text-tertiary)',
        textTransform: 'capitalize',
      }}>
        {value || 'Not set'}
      </div>
    </div>
  );
}
