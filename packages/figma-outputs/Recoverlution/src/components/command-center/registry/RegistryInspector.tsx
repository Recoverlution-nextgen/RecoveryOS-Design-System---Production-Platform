// REGISTRY INSPECTOR (Tab 3)
import { useState } from 'react';
import { ContentRegistryList } from './ContentRegistryList';
import { DeliveryRegistryPanel } from './DeliveryRegistryPanel';
import { ContentEnvelopeModal } from './ContentEnvelopeModal';
import { useContentRegistry, useContentStats, useDeliveryStats } from '@/lib/hooks/useRegistry';
import type { ContentEnvelope, ContentRegistryFilters } from '@/lib/types/constitution';
import { Database, Package, Search, Filter } from 'lucide-react';

export function RegistryInspector() {
  const [filters, setFilters] = useState<ContentRegistryFilters>({});
  const [selectedContent, setSelectedContent] = useState<ContentEnvelope | null>(null);
  const [showEnvelopeModal, setShowEnvelopeModal] = useState(false);
  
  const { data: contents, isLoading } = useContentRegistry(filters);
  const { data: contentStats } = useContentStats();
  const { data: deliveryStats } = useDeliveryStats();
  
  const handleSelectContent = (content: ContentEnvelope) => {
    setSelectedContent(content);
  };
  
  const handleInspect = (content: ContentEnvelope) => {
    setSelectedContent(content);
    setShowEnvelopeModal(true);
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Header Stats */}
      <div className="flex-shrink-0 p-4 bg-white/5 border-b border-white/10">
        <div className="grid grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <Database className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-2xl font-medium text-white">{contentStats?.total || 0}</p>
              <p className="text-xs text-white/60">Total Content</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-violet-400" />
            <div>
              <p className="text-2xl font-medium text-white">{deliveryStats?.total || 0}</p>
              <p className="text-xs text-white/60">Deliveries</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500/20 rounded flex items-center justify-center">
              <span className="text-emerald-400 font-medium">
                {contentStats?.active || 0}
              </span>
            </div>
            <div>
              <p className="text-sm text-white/90">Active</p>
              <p className="text-xs text-white/50">
                {contentStats?.total && contentStats.total > 0
                  ? Math.round((contentStats.active / contentStats.total) * 100)
                  : 0}% live
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-500/20 rounded flex items-center justify-center">
              <span className="text-amber-400 font-medium">
                {contentStats?.draft || 0}
              </span>
            </div>
            <div>
              <p className="text-sm text-white/90">Draft</p>
              <p className="text-xs text-white/50">In progress</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Content Registry */}
        <div className="flex-1 flex flex-col border-r border-white/10">
          <div className="flex-shrink-0 p-4 border-b border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Search className="w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Search content..."
                className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#5739FB]"
                onChange={e => setFilters({ ...filters, search: e.target.value || undefined })}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-white/50" />
              <select
                className="bg-white/5 border border-white/10 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-[#5739FB]"
                onChange={e => setFilters({
                  ...filters,
                  content_kind: e.target.value ? [e.target.value as any] : undefined
                })}
              >
                <option value="">All Types</option>
                <option value="article">Article</option>
                <option value="practice">Practice</option>
                <option value="insight">Insight</option>
                <option value="video">Video</option>
                <option value="journey_scene">Journey Scene</option>
                <option value="state_checkin">State Check-in</option>
                <option value="navicue">NaviCue</option>
              </select>
              
              <select
                className="bg-white/5 border border-white/10 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-[#5739FB]"
                onChange={e => setFilters({
                  ...filters,
                  status: e.target.value ? [e.target.value] : undefined
                })}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="review">Review</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
          
          <ContentRegistryList
            contents={contents || []}
            isLoading={isLoading}
            selectedId={selectedContent?.id}
            onSelect={handleSelectContent}
            onInspect={handleInspect}
          />
        </div>
        
        {/* Right Panel: Delivery Registry */}
        <DeliveryRegistryPanel
          contentRef={selectedContent?.id || null}
          contentKind={selectedContent?.content_kind}
        />
      </div>
      
      {/* Envelope Modal */}
      {showEnvelopeModal && selectedContent && (
        <ContentEnvelopeModal
          contentRef={selectedContent.id}
          onClose={() => setShowEnvelopeModal(false)}
        />
      )}
    </div>
  );
}
