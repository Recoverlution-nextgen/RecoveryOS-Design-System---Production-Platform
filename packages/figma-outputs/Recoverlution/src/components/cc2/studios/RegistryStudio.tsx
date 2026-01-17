/**
 * REGISTRY STUDIO - THE HEART OF COMMAND CENTER
 * Browse, create, edit content contracts
 * Manage deliveries and variants
 * Full CRUD with validation
 */

import { useState, useEffect } from 'react';
import { Plus, Filter, Search } from 'lucide-react';
import { DataTable } from '../shared/DataTable';
import { FilterBar } from '../shared/FilterBar';
import { ContentEditor } from './ContentEditor';

interface RegistryStudioProps {
  onBack: () => void;
  tenantScope: 'platform' | 'org' | 'professional';
}

export function RegistryStudio({ onBack, tenantScope }: RegistryStudioProps) {
  const [content, setContent] = useState<any[]>([]);
  const [filteredContent, setFilteredContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  // Filters
  const [kindFilter, setKindFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadContent();
  }, [tenantScope]);

  useEffect(() => {
    applyFilters();
  }, [content, kindFilter, statusFilter, searchQuery]);

  const loadContent = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with real API call
      const mockContent = [
        {
          id: '1',
          content_kind: 'navicue',
          status: 'published',
          pillar_id: 'ER',
          tags: ['grounding', 'breath'],
          created_at: new Date().toISOString(),
          visibility_scope: 'platform',
        },
        {
          id: '2',
          content_kind: 'practice',
          status: 'draft',
          pillar_id: 'SR',
          tags: ['meditation', 'stress'],
          created_at: new Date().toISOString(),
          visibility_scope: 'org',
        },
        {
          id: '3',
          content_kind: 'soundbite',
          status: 'published',
          pillar_id: 'SC',
          tags: ['connection', 'spark'],
          created_at: new Date().toISOString(),
          visibility_scope: 'platform',
        },
      ];
      setContent(mockContent);
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...content];

    if (kindFilter !== 'all') {
      filtered = filtered.filter(c => c.content_kind === kindFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(c => 
        JSON.stringify(c).toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredContent(filtered);
  };

  const handleCreateNew = () => {
    setIsCreating(true);
    setSelectedContent(null);
  };

  const handleEdit = (item: any) => {
    setSelectedContent(item);
    setIsCreating(false);
  };

  const handleSave = async (data: any) => {
    // TODO: Call registry API
    console.log('Saving content:', data);
    setIsCreating(false);
    setSelectedContent(null);
    loadContent();
  };

  const handleCancel = () => {
    setIsCreating(false);
    setSelectedContent(null);
  };

  // If editing or creating, show editor
  if (isCreating || selectedContent) {
    return (
      <ContentEditor
        content={selectedContent}
        onSave={handleSave}
        onCancel={handleCancel}
        tenantScope={tenantScope}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <div className="max-w-[1800px] mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Registry Studio</h1>
          <p className="text-zinc-400">
            Content contracts · Deliveries · Variants · Lifecycle
          </p>
        </div>

        {/* Filters */}
        <FilterBar
          filters={[
            {
              label: 'Kind',
              value: kindFilter,
              options: [
                { value: 'all', label: 'All Kinds' },
                { value: 'navicue', label: 'NaviCues' },
                { value: 'practice', label: 'Practices' },
                { value: 'article', label: 'Articles' },
                { value: 'video', label: 'Videos' },
                { value: 'soundbite', label: 'Soundbites' },
                { value: 'journey_scene', label: 'Journey Scenes' },
              ],
              onChange: setKindFilter,
            },
            {
              label: 'Status',
              value: statusFilter,
              options: [
                { value: 'all', label: 'All Status' },
                { value: 'draft', label: 'Draft' },
                { value: 'review', label: 'In Review' },
                { value: 'published', label: 'Published' },
                { value: 'deprecated', label: 'Deprecated' },
              ],
              onChange: setStatusFilter,
            },
          ]}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onCreateNew={handleCreateNew}
        />

        {/* Table */}
        <DataTable
          data={filteredContent}
          columns={[
            { key: 'content_kind', label: 'Kind' },
            { key: 'status', label: 'Status' },
            { key: 'pillar_id', label: 'Pillar' },
            { key: 'tags', label: 'Tags', render: (val) => val?.join(', ') || '' },
            { key: 'visibility_scope', label: 'Scope' },
            { key: 'created_at', label: 'Created', render: (val) => new Date(val).toLocaleDateString() },
          ]}
          onRowClick={handleEdit}
          loading={loading}
        />
      </div>
    </div>
  );
}
