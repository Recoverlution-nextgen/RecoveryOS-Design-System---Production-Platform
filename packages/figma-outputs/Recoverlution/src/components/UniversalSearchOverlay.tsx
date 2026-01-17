import { useEffect, useState } from 'react';
import { Search, X, FileText, Folder, Sparkles, Code, Palette, TrendingUp, Wrench } from 'lucide-react';
import { type PageType } from '../utils/router';

interface SearchResult {
  title: string;
  category: string;
  page: PageType | string;
  icon: any;
  description?: string;
}

const SEARCH_INDEX: SearchResult[] = [
  // Foundation
  { title: 'Brand Anchor', category: 'Foundation', page: 'docs-brand-anchor', icon: Sparkles, description: 'Product DNA & Philosophy' },
  { title: 'How We Build', category: 'Foundation', page: 'docs-how-we-build', icon: FileText, description: 'Principles & Values' },
  
  // System
  { title: 'System Map', category: 'System', page: 'docs-system-map', icon: Folder, description: 'How blocks connect' },
  { title: 'Human Cognition Platform', category: 'System', page: 'docs-hcp', icon: Code, description: 'Core framework' },
  { title: 'E-R-A Flow', category: 'System', page: 'docs-era-flow', icon: Sparkles, description: 'Engage-Regulate-Anchor' },
  { title: 'Sphere Principle', category: 'System', page: 'docs-sphere-principle', icon: Sparkles, description: 'Holistic integration' },
  { title: 'Infinite Canvas Principle', category: 'System', page: 'docs-infinite-canvas', icon: Code, description: 'Design philosophy' },
  { title: 'Journey Infrastructure', category: 'System', page: 'docs-journey-infrastructure', icon: Code, description: 'NOW Principle architecture' },
  
  // Content
  { title: 'Micro-Block Library', category: 'Content', page: 'docs-micro-block-library', icon: FileText, description: '48 fundamental brain states' },
  { title: 'Six Pillars Framework', category: 'Content', page: 'docs-pillars', icon: FileText, description: 'Therapeutic framework' },
  { title: 'Weekly ERA Sprints', category: 'Content', page: 'docs-weekly-era-sprints', icon: FileText, description: '12-week journeys' },
  { title: 'Content Mapping System', category: 'Content', page: 'docs-content-mapping', icon: FileText, description: 'Tagging system' },
  { title: 'Video Library Audit', category: 'Content', page: 'docs-video-library-audit', icon: FileText, description: 'Content coverage' },
  { title: 'NaviCue Suite', category: 'Content', page: 'docs-navicue-suite', icon: FileText, description: 'Framework & library' },
  { title: 'Content Lab', category: 'Content', page: 'content-lab', icon: FileText, description: 'Jira-style workspace' },
  
  // Platform
  { title: 'Core Features', category: 'Platform', page: 'docs-core-features', icon: Code, description: '10 functional blocks' },
  { title: 'Feature Definitions', category: 'Platform', page: 'docs-feature-definitions', icon: Code, description: 'What things are and are not' },
  { title: 'Roadmap', category: 'Platform', page: 'docs-content-roadmap', icon: TrendingUp, description: 'Vision/value board' },
  
  // Development
  { title: 'Epic Stories', category: 'Development', page: 'docs-stories', icon: FileText, description: 'Product backlog (ST0-ST54)' },
  { title: 'Ideas', category: 'Development', page: 'docs-ideas', icon: Sparkles, description: 'Breakthrough moments' },
  { title: 'Emotional Regulation Pillar', category: 'Development', page: 'docs-pillar-emotional-regulation', icon: FileText, description: 'Pillar deep-dive' },
  { title: 'Stress Resilience Pillar', category: 'Development', page: 'docs-pillar-stress-resilience', icon: FileText, description: 'Pillar deep-dive' },
  { title: 'Social Connectivity Pillar', category: 'Development', page: 'docs-pillar-social-connectivity', icon: FileText, description: 'Pillar deep-dive' },
  { title: 'Cognitive Reframing Pillar', category: 'Development', page: 'docs-pillar-cognitive-reframing', icon: FileText, description: 'Pillar deep-dive' },
  { title: 'Identity Integration Pillar', category: 'Development', page: 'docs-pillar-identity-integration', icon: FileText, description: 'Pillar deep-dive' },
  { title: 'Decision Mastery Pillar', category: 'Development', page: 'docs-pillar-decision-mastery', icon: FileText, description: 'Pillar deep-dive' },
  
  // Design
  { title: 'DNA Hub', category: 'Design', page: 'dna-hub', icon: Palette, description: 'Design system home' },
  { title: 'Design System', category: 'Design', page: 'dna-design-system', icon: Palette, description: 'Components & patterns' },
  { title: 'Asset Manager', category: 'Design', page: 'dna-asset-manager', icon: Palette, description: 'Image library' },
  { title: 'Frosted Glass Demo', category: 'Design', page: 'demo-frosted-glass', icon: Palette, description: 'InfiniteK cards' },
  { title: 'Background Gallery', category: 'Design', page: 'demo-card-backgrounds', icon: Palette, description: 'Card backgrounds' },
  { title: 'Intelligent Backgrounds', category: 'Design', page: 'demo-backgrounds', icon: Palette, description: 'Dynamic backgrounds' },
  
  // Tools
  { title: 'Analytics', category: 'Tools', page: 'docs-analytics', icon: TrendingUp, description: 'Platform insights' },
  { title: 'Tech Stack', category: 'Tools', page: 'docs-tech-stack', icon: Code, description: 'Architecture & tooling' },
  { title: 'Email Blast Tool', category: 'Tools', page: 'admin-email-blast', icon: Wrench, description: 'Campaign tool' },
  { title: 'LinkedIn Carousel', category: 'Tools', page: 'admin-linkedin-carousel', icon: Wrench, description: 'Social content' },
  { title: 'Messaging Lab', category: 'Tools', page: 'docs-messaging', icon: FileText, description: 'Taglines & copy' },
  { title: 'Tone & Voice', category: 'Tools', page: 'docs-tone-voice', icon: FileText, description: 'How we speak' },
];

interface UniversalSearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

export function UniversalSearchOverlay({ isOpen, onClose, onNavigate }: UniversalSearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>(SEARCH_INDEX);

  // Handle ESC key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        console.log('🔍 ESC pressed - closing search overlay');
        onClose();
      }
    };

    if (isOpen) {
      console.log('🔍 Search overlay opened - adding ESC listener');
      document.addEventListener('keydown', handleEscape);
      // Focus search input
      setTimeout(() => {
        const input = document.getElementById('universal-search-input');
        if (input) input.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Filter results based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredResults(SEARCH_INDEX);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query)
    );
    setFilteredResults(results);
  }, [searchQuery]);

  const handleResultClick = (page: string) => {
    console.log('🔍 Search result clicked:', page);
    onNavigate(page);
    onClose();
    setSearchQuery('');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="universal-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all pages... (60+ destinations)"
              className="w-full pl-12 pr-12 py-3 text-base bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5739FB]/20"
              style={{ fontFamily: 'var(--font-sans)' }}
            />
            <button
              onClick={onClose}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filteredResults.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p style={{ fontFamily: 'var(--font-sans)' }}>No results found for "{searchQuery}"</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredResults.map((result, index) => {
                const Icon = result.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleResultClick(result.page)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors text-left group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#5739FB]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#5739FB]/20 transition-colors">
                      <Icon className="w-4 h-4 text-[#5739FB]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <p className="font-medium text-gray-900 truncate" style={{ fontFamily: 'var(--font-display)' }}>
                          {result.title}
                        </p>
                        <span className="text-xs text-gray-500 uppercase tracking-wider flex-shrink-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                          {result.category}
                        </span>
                      </div>
                      {result.description && (
                        <p className="text-sm text-gray-600 truncate" style={{ fontFamily: 'var(--font-sans)' }}>
                          {result.description}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
          <span style={{ fontFamily: 'var(--font-sans)' }}>
            {filteredResults.length} {filteredResults.length === 1 ? 'result' : 'results'}
          </span>
          <span style={{ fontFamily: 'var(--font-sans)' }}>
            Press <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
