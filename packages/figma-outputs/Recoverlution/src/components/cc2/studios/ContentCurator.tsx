/**
 * CONTENT CURATOR STUDIO
 * Organisation-specific content library management
 * HIGH VALUE: Customize NaviCues, practices, and resources per org
 */

import { useState, useEffect } from 'react';
import { Book, FileText, Heart, Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { projectId } from '../../../utils/supabase/info';
import { useUser } from '../../../contexts/UserContext';
import { StudioHeader } from '../shared/StudioHeader';
import { ContentRenderer } from '../../universal-player/ContentRenderer';

interface ContentItem {
  id: string;
  type: 'navicue' | 'practice' | 'article' | 'video';
  title: string;
  description: string;
  pillar_id: string;
  pillar_name: string;
  pillar_color: string;
  tags: string[];
  created_by: string;
  created_at: string;
  usage_count: number;
  avg_engagement_seconds: number;
  status: 'active' | 'draft' | 'archived';
  content_data: any;
}

interface ContentCuratorProps {
  onBack: () => void;
  tenantScope: 'platform' | 'org' | 'professional';
}

export function ContentCurator({ onBack, tenantScope }: ContentCuratorProps) {
  const { organisationId } = useUser();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPillar, setFilterPillar] = useState<string>('all');
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [playerContent, setPlayerContent] = useState<any>(null);

  useEffect(() => {
    loadContent();
  }, [organisationId]);

  async function loadContent() {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !organisationId) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/organisations/${organisationId}/content-library`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setContent(data.content || []);
      }
    } catch (error) {
      console.error('[ContentCurator] Error loading content:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesPillar = filterPillar === 'all' || item.pillar_id === filterPillar;
    return matchesSearch && matchesType && matchesPillar;
  });

  const pillars = Array.from(new Set(content.map(c => ({ id: c.pillar_id, name: c.pillar_name, color: c.pillar_color }))))
    .filter((p, idx, arr) => arr.findIndex(x => x.id === p.id) === idx);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B0F] text-white">
        <StudioHeader title="Content Curator" subtitle="Loading..." onBack={onBack} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#3E2BB8] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="opacity-70">Loading content library...</p>
          </div>
        </div>
      </div>
    );
  }

  const activeCount = content.filter(c => c.status === 'active').length;
  const draftCount = content.filter(c => c.status === 'draft').length;

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <StudioHeader 
        title="Content Curator" 
        subtitle={`${activeCount} active items • ${draftCount} drafts`}
        onBack={onBack}
        actions={
          <button
            className="px-4 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors flex items-center gap-2 text-sm"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            <Plus className="w-4 h-4" />
            Create Content
          </button>
        }
      />

      {/* Filters */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 focus:border-[#3E2BB8] focus:outline-none transition-colors"
              style={{ fontFamily: 'var(--font-sans)' }}
            />
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 focus:border-[#3E2BB8] focus:outline-none transition-colors"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            <option value="all">All Types</option>
            <option value="navicue">NaviCues</option>
            <option value="practice">Practices</option>
            <option value="article">Articles</option>
            <option value="video">Videos</option>
          </select>

          {/* Pillar Filter */}
          <select
            value={filterPillar}
            onChange={(e) => setFilterPillar(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 focus:border-[#3E2BB8] focus:outline-none transition-colors"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            <option value="all">All Pillars</option>
            {pillars.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Grid */}
      <div className="p-6">
        {filteredContent.length === 0 ? (
          <div className="text-center py-20">
            <Book className="w-16 h-16 opacity-20 mx-auto mb-4" />
            <p className="opacity-50">No content found</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-sm text-[#5739FB] hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContent.map(item => (
              <div
                key={item.id}
                className="bg-white/5 border border-white/10 p-6 hover:bg-white/8 hover:border-white/20 transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {item.type === 'navicue' && <Book className="w-5 h-5 text-[#5739FB]" />}
                    {item.type === 'practice' && <Heart className="w-5 h-5 text-[#5739FB]" />}
                    {item.type === 'article' && <FileText className="w-5 h-5 text-[#5739FB]" />}
                    {item.type === 'video' && <Eye className="w-5 h-5 text-[#5739FB]" />}
                    <span 
                      className="px-2 py-1 text-xs uppercase tracking-wider"
                      style={{
                        backgroundColor: `${item.pillar_color}20`,
                        color: item.pillar_color,
                        border: `1px solid ${item.pillar_color}50`
                      }}
                    >
                      {item.type}
                    </span>
                  </div>
                  <span 
                    className={`px-2 py-1 text-xs ${
                      item.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      item.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mb-2 line-clamp-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  {item.title}
                </h3>
                <p className="text-sm opacity-70 mb-4 line-clamp-3">
                  {item.description}
                </p>

                {/* Pillar */}
                <div className="mb-4">
                  <span 
                    className="px-2 py-1 text-xs"
                    style={{
                      backgroundColor: `${item.pillar_color}20`,
                      color: item.pillar_color,
                      border: `1px solid ${item.pillar_color}50`
                    }}
                  >
                    {item.pillar_name}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div>
                    <p className="opacity-50 text-xs mb-1">Usage</p>
                    <p>{item.usage_count} times</p>
                  </div>
                  <div>
                    <p className="opacity-50 text-xs mb-1">Avg Engagement</p>
                    <p>{Math.floor(item.avg_engagement_seconds / 60)}m {item.avg_engagement_seconds % 60}s</p>
                  </div>
                </div>

                {/* Tags */}
                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-white/10 text-xs opacity-70">
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="px-2 py-0.5 text-xs opacity-50">+{item.tags.length - 3}</span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setPlayerContent({
                        type: 'block',
                        data: {
                          block_id: item.id,
                          block_type: item.type === 'practice' ? 'practice' : item.type === 'article' ? 'article' : 'insight',
                          title: item.title,
                          content: item.content_data,
                          pillar_id: item.pillar_id,
                          pillar_name: item.pillar_name,
                          pillar_color: item.pillar_color,
                          tags: item.tags,
                          shared_by: {
                            name: 'Content Library',
                            role: 'Organisation',
                            message: item.description
                          }
                        }
                      });
                    }}
                    className="flex-1 px-3 py-2 bg-[#5739FB] hover:bg-[#3E2BB8] transition-colors text-sm flex items-center justify-center gap-2"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button
                    className="px-3 py-2 bg-white/5 hover:bg-white/10 transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* UNIVERSAL PLAYER MODAL */}
      {playerContent && (
        <div className="fixed inset-0 z-50 bg-black/90">
          <ContentRenderer
            content={playerContent.data}
            contentType={playerContent.type}
            onResponse={(response) => {
              console.log('[ContentCurator] Player response:', response);
            }}
            onClose={() => setPlayerContent(null)}
          />
        </div>
      )}
    </div>
  );
}
