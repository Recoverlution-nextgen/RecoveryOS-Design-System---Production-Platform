// CONTENT REGISTRY LIST
import type { ContentEnvelope } from '@/lib/types/constitution';
import { ContentCard } from '../shared/ContentCard';
import { Loader2 } from 'lucide-react';

interface Props {
  contents: ContentEnvelope[];
  isLoading: boolean;
  selectedId?: string;
  onSelect: (content: ContentEnvelope) => void;
  onInspect: (content: ContentEnvelope) => void;
}

export function ContentRegistryList({
  contents,
  isLoading,
  selectedId,
  onSelect,
  onInspect,
}: Props) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-6 h-6 text-white/50 animate-spin" />
      </div>
    );
  }
  
  if (contents.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-white/50">No content found</p>
      </div>
    );
  }
  
  return (
    <div className="flex-1 overflow-auto p-4 space-y-3">
      {contents.map(content => (
        <ContentCard
          key={content.id}
          content={content}
          selected={content.id === selectedId}
          onClick={() => onSelect(content)}
        />
      ))}
    </div>
  );
}
