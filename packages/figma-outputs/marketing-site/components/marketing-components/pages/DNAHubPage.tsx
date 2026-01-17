import { FileText, Layers, GitBranch, Infinity, Brain, Heart, Users, Lightbulb, Shield, Target, CircleDot, Map, ArrowRight, ExternalLink, Image, MessageSquare, Zap } from "lucide-react";
import recoverlutionLogo from "figma:asset/d3c889f1d4c13c03718e4dd433a2fd6fe4a8d55c.png";
import { getStory, getStoriesByType } from "../../utils/storyRegistry";

interface DNAHubPageProps {
  onNavigate: (page: string) => void;
}

interface HubItem {
  id: string;
  title: string;
  description: string;
  icon: any;
  route: string;
  story?: string;
  status: "complete" | "in-progress" | "planned";
}

const foundationItems: HubItem[] = [
  {
    id: "anchor",
    title: "Our Anchor",
    description: "Apple for addiction: world-class science, human-first design, authority with heart",
    icon: CircleDot,
    route: "docs-brand-anchor",
    story: "ST1",
    status: "complete",
  },
  {
    id: "hcp",
    title: "Human Cognition Platform",
    description: "Three-layer architecture: Intelligence, Therapeutic, Human layers working in concert",
    icon: Layers,
    route: "docs-hcp",
    story: "ST2",
    status: "complete",
  },
  {
    id: "era",
    title: "ERA Flow",
    description: "Exploration → Reflection → Action: Turn insights into reflexes",
    icon: GitBranch,
    route: "docs-era-flow",
    story: "ST3",
    status: "complete",
  },
  {
    id: "infinite-canvas",
    title: "Infinite Canvas Principle",
    description: "NaviCues spark curiosity, Building Blocks enable infinite exploration",
    icon: Infinity,
    route: "docs-infinite-canvas",
    story: "ST4",
    status: "complete",
  },
];

const pillarItems: HubItem[] = [
  {
    id: "emotional-regulation",
    title: "Chapter One: Steady the Storm",
    description: "Emotional Regulation - Navigate overwhelming feelings with precision",
    icon: Heart,
    route: "docs-pillar-emotional-regulation",
    story: "ST5",
    status: "complete",
  },
  {
    id: "stress-resilience",
    title: "Chapter Two: Hold the Line",
    description: "Stress Resilience - Build capacity to handle life's pressures",
    icon: Shield,
    route: "docs-pillar-stress-resilience",
    story: "ST6",
    status: "complete",
  },
  {
    id: "social-connectivity",
    title: "Chapter Three: Build the Bridge",
    description: "Social Connectivity - Strengthen relationships and belonging",
    icon: Users,
    route: "docs-pillar-social-connectivity",
    story: "ST7",
    status: "complete",
  },
  {
    id: "cognitive-reframing",
    title: "Chapter Four: Change the Lens",
    description: "Cognitive Reframing - Transform unhelpful thought patterns",
    icon: Lightbulb,
    route: "docs-pillar-cognitive-reframing",
    story: "ST8",
    status: "complete",
  },
  {
    id: "identity-integration",
    title: "Chapter Five: Become Who You Practice",
    description: "Identity Integration - Build a self beyond addiction",
    icon: Brain,
    route: "docs-pillar-identity-integration",
    story: "ST9",
    status: "complete",
  },
  {
    id: "decision-mastery",
    title: "Chapter Six: Make Space to Choose",
    description: "Decision Mastery - Develop agency in high-stakes moments",
    icon: Target,
    route: "docs-pillar-decision-mastery",
    story: "ST10",
    status: "complete",
  },
];

const strategyItems: HubItem[] = [
  {
    id: "sphere",
    title: "Sphere Principle",
    description: "Visual system for representing recovery as continuous, multi-dimensional growth",
    icon: CircleDot,
    route: "docs-sphere-principle",
    story: "ST11",
    status: "complete",
  },
  {
    id: "roadmap",
    title: "Content Build-Out Roadmap",
    description: "Strategic plan for NaviCues, Building Blocks, and therapeutic content creation",
    icon: Map,
    route: "docs-content-roadmap",
    story: "ST12",
    status: "complete",
  },
];

const designSystemItems: HubItem[] = [
  {
    id: "design-system",
    title: "Design System Documentation",
    description: "Complete design system: principles, components, patterns, and page templates",
    icon: Layers,
    route: "dna-design-system",
    status: "complete",
  },
  {
    id: "asset-manager",
    title: "Image Asset Manager",
    description: "Browse, search, and manage hero images from Pexels and Unsplash with live API integration",
    icon: FileText,
    route: "dna-asset-manager",
    status: "complete",
  },
  {
    id: "tinycdn-preview",
    title: "TinyPNG CDN Preview",
    description: "Test image optimization with live before/after comparison and performance metrics (ST56)",
    icon: Zap,
    route: "dna-tinycdn-preview",
    status: "complete",
    story: "ST56"
  },
  {
    id: "card-backgrounds",
    title: "Card Background Gallery",
    description: "Map custom Pixabay abstracts to your 7 dashboard cards with visual preview and assignment system",
    icon: Image,
    route: "demo-card-backgrounds",
    status: "complete",
  },
  {
    id: "messaging-matrix",
    title: "Messaging Matrix",
    description: "Complete map of every messaging touchpoint across the platform - ensures 100% consistency",
    icon: MessageSquare,
    route: "docs-brand-anchor", // Go to Brand Anchor's Messaging Lab section
    status: "complete",
  },
];

export function DNAHubPage({ onNavigate }: DNAHubPageProps) {
  const handleNavigation = (route: string) => {
    onNavigate(route);
  };

  const renderHubItem = (item: HubItem) => (
    <button
      key={item.id}
      onClick={() => handleNavigation(item.route)}
      className="group relative bg-white rounded-xl p-6 border border-gray-200/60 hover:border-[#5739FB]/35 transition-all duration-300 hover:shadow-[0_10px_24px_rgba(59,130,246,0.25),0_5px_12px_rgba(87,57,251,0.2),0_0_0_1px_rgba(87,57,251,0.4)_inset] text-left"
    >
      {/* Status Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {item.story && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              handleNavigation(item.route);
            }}
            className="text-xs px-2 py-0.5 rounded-full bg-[#3E2BB8]/10 hover:bg-[#3E2BB8]/20 text-[#3E2BB8] font-medium transition-colors flex items-center gap-1 group cursor-pointer"
            title={`View ${item.story} documentation`}
          >
            {item.story}
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </span>
        )}
        {item.status === "complete" && (
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
        )}
      </div>

      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <item.icon className="w-6 h-6 text-white" />
      </div>

      {/* Content */}
      <h3 className="text-gray-900 mb-2 group-hover:text-[#3E2BB8] transition-colors">
        {item.title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        {item.description}
      </p>

      {/* Arrow */}
      <ArrowRight className="absolute bottom-6 right-6 w-4 h-4 text-gray-400 group-hover:text-[#5739FB] group-hover:translate-x-1 transition-all" />
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FAFAFA]">
      {/* Minimal Header */}
      <header className="bg-white border-b border-gray-200/60 px-6 md:px-12 flex items-center justify-between" style={{ height: '72px', minHeight: '72px' }}>
        <button onClick={() => onNavigate("Website")} className="flex items-center gap-3">
          <img src={recoverlutionLogo} alt="Recoverlution" className="h-8" />
          <span className="text-xs text-gray-400 font-mono">v49.1.0</span>
        </button>
        
        <div className="flex items-center gap-8">
          <button
            onClick={() => onNavigate("dna-hub")}
            className="text-sm text-[#3E2BB8] hover:text-[#5739FB] transition-colors relative group"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            DNA HUB
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5739FB] scale-x-100"></span>
          </button>
          <button
            onClick={() => onNavigate("content-lab")}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors relative group"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Content Lab
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5739FB] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            DNA HUB
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Strategic foundation for Recoverlution. The core principles, architecture, and philosophy that define how we build.
          </p>
        </div>
      </div>

      {/* Foundation Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        <div className="mb-8">
          <h2 className="text-2xl text-gray-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Foundation
          </h2>
          <p className="text-gray-600">
            Core architectural principles and design philosophy
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {foundationItems.map(renderHubItem)}
        </div>
      </div>

      {/* Six Pillars Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        <div className="mb-8">
          <h2 className="text-2xl text-gray-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Six Pillars of Recovery
          </h2>
          <p className="text-gray-600">
            Deep dives into each therapeutic pillar with neuroscience backing
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillarItems.map(renderHubItem)}
        </div>
      </div>

      {/* Strategy & Vision Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        <div className="mb-8">
          <h2 className="text-2xl text-gray-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Strategy & Vision
          </h2>
          <p className="text-gray-600">
            Visual systems and strategic roadmaps
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {strategyItems.map(renderHubItem)}
        </div>
      </div>

      {/* Design System Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        <div className="mb-8">
          <h2 className="text-2xl text-gray-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Design System
          </h2>
          <p className="text-gray-600">
            🔒 Locked design patterns for mega Apple consistency
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {designSystemItems.map(renderHubItem)}
        </div>
      </div>

      {/* Related Content Tools */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="bg-gradient-to-br from-[#3E2BB8]/5 to-[#5739FB]/5 rounded-2xl p-8 border border-[#5739FB]/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl text-gray-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Content Lab Tools
              </h3>
              <p className="text-gray-600">
                Operational infrastructure for building therapeutic content
              </p>
            </div>
            <button
              onClick={() => handleNavigation("content-lab")}
              className="px-4 py-2 bg-white rounded-lg border border-[#3E2BB8]/20 hover:border-[#5739FB]/40 hover:shadow-md transition-all text-sm text-[#3E2BB8] hover:text-[#5739FB] flex items-center gap-2 group"
            >
              View Content Lab
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => handleNavigation("docs-weekly-era-sprints")}
              className="p-3 bg-white rounded-lg border border-gray-200 hover:border-[#5739FB]/30 hover:shadow-sm transition-all text-left group"
            >
              <span className="text-xs text-[#3E2BB8] font-medium">ST42</span>
              <p className="text-sm text-gray-700 mt-1 group-hover:text-[#3E2BB8] transition-colors">Weekly ERA Sprints</p>
            </button>
            <button
              onClick={() => handleNavigation("docs-micro-block-library")}
              className="p-3 bg-white rounded-lg border border-gray-200 hover:border-[#5739FB]/30 hover:shadow-sm transition-all text-left group"
            >
              <span className="text-xs text-[#3E2BB8] font-medium">ST43</span>
              <p className="text-sm text-gray-700 mt-1 group-hover:text-[#3E2BB8] transition-colors">Micro-Block Library</p>
            </button>
            <button
              onClick={() => handleNavigation("docs-content-mapping")}
              className="p-3 bg-white rounded-lg border border-gray-200 hover:border-[#5739FB]/30 hover:shadow-sm transition-all text-left group"
            >
              <span className="text-xs text-[#3E2BB8] font-medium">ST45</span>
              <p className="text-sm text-gray-700 mt-1 group-hover:text-[#3E2BB8] transition-colors">Content Mapping</p>
            </button>
            <button
              onClick={() => handleNavigation("docs-video-library-audit")}
              className="p-3 bg-white rounded-lg border border-gray-200 hover:border-[#5739FB]/30 hover:shadow-sm transition-all text-left group"
            >
              <span className="text-xs text-[#3E2BB8] font-medium">ST46</span>
              <p className="text-sm text-gray-700 mt-1 group-hover:text-[#3E2BB8] transition-colors">Video Library Audit</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
