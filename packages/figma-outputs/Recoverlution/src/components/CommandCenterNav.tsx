import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import recoverlutionLogo from "figma:asset/7da866ea6ef2018dfd4656f74ef1f42cdc972b51.png";

interface CommandCenterNavProps {
  onNavigate: (page: string) => void;
}

// Navigation structure for the Command Center
const NAV_CATEGORIES = [
  {
    id: 'foundation',
    label: 'Foundation',
    items: [
      { id: 'brand-anchor', label: 'Brand Anchor', route: 'docs-brand-anchor', description: 'Product DNA & Philosophy' },
      { id: 'how-we-build', label: 'How We Build', route: 'docs-how-we-build', description: 'Principles & Values' },
    ]
  },
  {
    id: 'system',
    label: 'System',
    items: [
      { id: 'system-map', label: 'System Map', route: 'docs-system-map', description: 'How blocks connect' },
      { id: 'hcp', label: 'Human Cognition Platform', route: 'docs-hcp', description: 'Core framework' },
      { id: 'era-flow', label: 'E-R-A Flow', route: 'docs-era-flow', description: 'Engage-Regulate-Anchor' },
      { id: 'sphere', label: 'Sphere Principle', route: 'docs-sphere-principle', description: 'Holistic integration' },
      { id: 'infinite-canvas', label: 'Infinite Canvas', route: 'docs-infinite-canvas', description: 'Design philosophy' },
      { id: 'journey-infra', label: 'Journey Infrastructure', route: 'docs-journey-infrastructure', description: 'NOW Principle' },
    ]
  },
  {
    id: 'content',
    label: 'Content',
    items: [
      { id: 'micro-blocks', label: 'Micro-Block Library', route: 'docs-micro-block-library', description: '48 fundamental brain states' },
      { id: 'pillars', label: 'Six Pillars', route: 'docs-pillars', description: 'Therapeutic framework' },
      { id: 'weekly-era', label: 'Weekly ERA Sprints', route: 'docs-weekly-era-sprints', description: '12-week journeys' },
      { id: 'content-mapping', label: 'Content Mapping', route: 'docs-content-mapping', description: 'Tagging system' },
      { id: 'video-library', label: 'Video Library Audit', route: 'docs-video-library-audit', description: 'Content coverage' },
      { id: 'navicue-suite', label: 'NaviCue Suite', route: 'docs-navicue-suite', description: 'Framework & library' },
      { id: 'content-lab', label: 'Content Lab', route: 'content-lab', description: 'Jira-style workspace' },
    ]
  },
  {
    id: 'platform',
    label: 'Platform',
    items: [
      { id: 'core-features', label: 'Core Features', route: 'docs-core-features', description: '10 functional blocks' },
      { id: 'feature-defs', label: 'Feature Definitions', route: 'docs-feature-definitions', description: 'What things are and are not' },
      { id: 'roadmap', label: 'Roadmap', route: 'docs-content-roadmap', description: 'Vision/value board' },
    ]
  },
  {
    id: 'development',
    label: 'Development',
    items: [
      { id: 'stories', label: 'Epic Stories', route: 'docs-stories', description: 'Product backlog (ST0-ST54)' },
      { id: 'ideas', label: 'Ideas', route: 'docs-ideas', description: 'Breakthrough moments' },
      { id: 'emotional-reg', label: 'Emotional Regulation', route: 'docs-pillar-emotional-regulation', description: 'Pillar deep-dive' },
      { id: 'stress-res', label: 'Stress Resilience', route: 'docs-pillar-stress-resilience', description: 'Pillar deep-dive' },
      { id: 'social-conn', label: 'Social Connectivity', route: 'docs-pillar-social-connectivity', description: 'Pillar deep-dive' },
      { id: 'cognitive-ref', label: 'Cognitive Reframing', route: 'docs-pillar-cognitive-reframing', description: 'Pillar deep-dive' },
      { id: 'identity-int', label: 'Identity Integration', route: 'docs-pillar-identity-integration', description: 'Pillar deep-dive' },
      { id: 'decision-mas', label: 'Decision Mastery', route: 'docs-pillar-decision-mastery', description: 'Pillar deep-dive' },
    ]
  },
  {
    id: 'design',
    label: 'Design',
    items: [
      { id: 'dna-hub', label: 'DNA Hub', route: 'dna-hub', description: 'Design system home' },
      { id: 'design-system', label: 'Design System', route: 'dna-design-system', description: 'Components & patterns' },
      { id: 'asset-manager', label: 'Asset Manager', route: 'dna-asset-manager', description: 'Image library' },
      { id: 'tinycdn-preview', label: 'TinyPNG CDN Preview', route: 'dna-tinycdn-preview', description: 'Image optimization' },
      { id: 'messaging-matrix', label: 'Messaging Matrix', route: 'dna-messaging-matrix', description: 'Copy consistency' },
      { id: 'frosted-glass', label: 'Frosted Glass Demo', route: 'demo-frosted-glass', description: 'InfiniteK cards' },
      { id: 'backgrounds', label: 'Intelligent Backgrounds', route: 'demo-backgrounds', description: 'Dynamic backgrounds' },
      { id: 'card-gallery', label: 'Background Gallery', route: 'demo-card-backgrounds', description: 'Card backgrounds' },
    ]
  },
  {
    id: 'tools',
    label: 'Tools',
    items: [
      { id: 'pixabay-test', label: 'Pixabay API Test', route: 'admin-pixabay-test', description: 'API diagnostics' },
      { id: 'email-blast', label: 'Email Blast', route: 'admin-email-blast', description: 'Campaign tool' },
      { id: 'linkedin', label: 'LinkedIn Carousel', route: 'admin-linkedin-carousel', description: 'Social content' },
      { id: 'investors', label: 'Investor Deck', route: 'investors', description: 'Series A presentation' },
    ]
  }
];

export function CommandCenterNav({ onNavigate }: CommandCenterNavProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (categoryId: string) => {
    setActiveDropdown(activeDropdown === categoryId ? null : categoryId);
  };

  return (
    <nav 
      className="relative z-50 bg-white/90 backdrop-blur-[40px] backdrop-saturate-[180%] border-b border-white/40 px-6 md:px-12 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.05),0_0_0_1px_rgba(255,255,255,0.5)_inset]" 
      style={{ height: '64px', minHeight: '64px' }}
    >
      {/* Logo - Goes to Command Center Home */}
      <button 
        onClick={() => onNavigate('command-center')} 
        className="flex items-center transition-opacity hover:opacity-70"
      >
        <img src={recoverlutionLogo} alt="Recoverlution" className="h-8" />
      </button>

      {/* Category Dropdowns - Desktop */}
      <div className="hidden lg:flex items-center gap-1 relative" ref={dropdownRef}>
        {NAV_CATEGORIES.map((category) => (
          <div key={category.id} className="relative">
            <button
              onClick={() => toggleDropdown(category.id)}
              className={`flex items-center gap-1 px-4 py-2 text-[10px] uppercase tracking-[0.1em] transition-all ${
                activeDropdown === category.id
                  ? 'text-[#3E2BB8] bg-[#3E2BB8]/5'
                  : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5'
              } rounded-lg`}
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
            >
              {category.label}
              <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === category.id ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {activeDropdown === category.id && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-200/60 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="text-xs uppercase tracking-[0.12em] text-[#3E2BB8]" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                    {category.label}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{category.items.length} items</p>
                </div>
                <div className="max-h-96 overflow-y-auto py-1">
                  {category.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.route);
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-[#3E2BB8]/5 transition-colors"
                    >
                      <div className="font-medium text-gray-900 text-sm" style={{ fontFamily: 'var(--font-display)' }}>
                        {item.label}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
