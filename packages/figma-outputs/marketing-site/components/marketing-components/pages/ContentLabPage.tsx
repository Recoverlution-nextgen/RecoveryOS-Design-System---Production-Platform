import { Calendar, Grid3x3, Tags, Video, ArrowRight, Sparkles, CheckCircle2, Brain } from "lucide-react";
import recoverlutionLogo from "figma:asset/d3c889f1d4c13c03718e4dd433a2fd6fe4a8d55c.png";

interface ContentLabPageProps {
  onNavigate: (page: string) => void;
}

interface LabItem {
  id: string;
  title: string;
  description: string;
  icon: any;
  route: string;
  story: string;
  status: "complete" | "in-progress" | "planned";
  stats?: {
    label: string;
    value: string;
  }[];
}

const contentTools: LabItem[] = [
  {
    id: "weekly-era",
    title: "Weekly ERA Sprints",
    description: "12-week structured journeys mapping therapeutic content to the ERA flow",
    icon: Calendar,
    route: "docs-weekly-era-sprints",
    story: "ST42",
    status: "complete",
    stats: [
      { label: "Weeks", value: "12" },
      { label: "Sprints", value: "36" },
      { label: "Pillars", value: "6" },
    ],
  },
  {
    id: "micro-blocks",
    title: "Micro-Block Library",
    description: "48 fundamental brain states and therapeutic practices across all pillars",
    icon: Grid3x3,
    route: "docs-micro-block-library",
    story: "ST43",
    status: "complete",
    stats: [
      { label: "Micro-Blocks", value: "48" },
      { label: "Pillars", value: "6" },
      { label: "Coverage", value: "100%" },
    ],
  },
  {
    id: "journey-now",
    title: "Journey Infrastructure - NOW Principle",
    description: "Patient-facing journey with no timelines, no completion tracking - always in the now",
    icon: Sparkles,
    route: "docs-journey-infrastructure",
    story: "ST49",
    status: "complete",
    stats: [
      { label: "Favorites", value: "∞" },
      { label: "Timelines", value: "0" },
      { label: "Pressure", value: "0" },
    ],
  },
  {
    id: "journey-flow-demo",
    title: "Journey Flow Demo - E-R-A + SEED",
    description: "Complete journey flow: E-R-A Context Screens → SEED Scene → Return to practice",
    icon: Brain,
    route: "demo-journey-flow",
    story: "NEW",
    status: "complete",
    stats: [
      { label: "Screens", value: "3" },
      { label: "SEED", value: "1" },
      { label: "Experience", value: "∞" },
    ],
  },
  {
    id: "content-mapping",
    title: "Content Mapping System",
    description: "Tag and track which resources target which micro-blocks for strategic gap analysis",
    icon: Tags,
    route: "docs-content-mapping",
    story: "ST45",
    status: "complete",
    stats: [
      { label: "Resources", value: "200+" },
      { label: "Tags", value: "48" },
      { label: "Mapped", value: "85%" },
    ],
  },
  {
    id: "video-audit",
    title: "Video Library Audit",
    description: "Comprehensive audit of video content with coverage matrix and gap prioritization",
    icon: Video,
    route: "docs-video-library-audit",
    story: "ST46",
    status: "complete",
    stats: [
      { label: "Videos", value: "8" },
      { label: "Gaps", value: "15" },
      { label: "High Priority", value: "6" },
    ],
  },
];

export function ContentLabPage({ onNavigate }: ContentLabPageProps) {
  const handleNavigation = (route: string) => {
    onNavigate(route);
  };

  const renderLabItem = (item: LabItem) => (
    <button
      key={item.id}
      onClick={() => handleNavigation(item.route)}
      className="group relative bg-white rounded-xl p-6 border border-gray-200/60 hover:border-[#5739FB]/35 transition-all duration-300 hover:shadow-[0_10px_24px_rgba(59,130,246,0.25),0_5px_12px_rgba(87,57,251,0.2),0_0_0_1px_rgba(87,57,251,0.4)_inset] text-left"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] flex items-center justify-center group-hover:scale-110 transition-transform">
          <item.icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
            {item.story}
          </span>
          {item.status === "complete" && (
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          )}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-gray-900 mb-2 group-hover:text-[#3E2BB8] transition-colors">
        {item.title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">
        {item.description}
      </p>

      {/* Stats */}
      {item.stats && (
        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
          {item.stats.map((stat, index) => (
            <div key={index} className="flex-1">
              <div className="text-xs text-gray-500 mb-0.5">{stat.label}</div>
              <div className="text-sm text-[#3E2BB8]" style={{ fontFamily: 'var(--font-display)' }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      )}

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
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors relative group"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            DNA HUB
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5739FB] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </button>
          <button
            onClick={() => onNavigate("content-lab")}
            className="text-sm text-[#3E2BB8] hover:text-[#5739FB] transition-colors relative group"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Content Lab
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5739FB] scale-x-100"></span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Content Lab
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Operational infrastructure for content planning, tracking, and gap analysis. Build therapeutic content systematically.
          </p>
        </div>
      </div>

      {/* Tools Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-12">
        <div className="mb-8">
          <h2 className="text-2xl text-gray-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Content Infrastructure Tools
          </h2>
          <p className="text-gray-600">
            Strategic systems for planning, cataloging, and analyzing therapeutic content
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contentTools.map(renderLabItem)}
        </div>
      </div>

      {/* Content Suite Section - NEW! */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="mb-8">
          <h2 className="text-2xl text-gray-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Content Output
          </h2>
          <p className="text-gray-600">
            Therapeutic content built using the Content Lab infrastructure
          </p>
        </div>
        
        <button
          onClick={() => onNavigate("docs-navicue-suite")}
          className="w-full group relative overflow-hidden bg-gradient-to-br from-white to-[#F5F3FF] border-2 border-[#3E2BB8]/20 hover:border-[#3E2BB8]/40 rounded-2xl p-8 transition-all hover:shadow-xl text-left"
        >
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] rounded-2xl flex items-center justify-center flex-shrink-0 text-white">
              <Sparkles className="w-8 h-8" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-[#5739FB] font-semibold bg-[#5739FB]/10 px-3 py-1 rounded-full">
                  ST48
                </span>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-100 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-xs text-emerald-900">Phase 1 Complete</span>
                </div>
              </div>
              
              <h3 className="text-xl text-gray-900 mb-2 group-hover:text-[#3E2BB8] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                NaviCue Content Suite
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                Instagram-speed provocations that spark curiosity. 4 critical NaviCues built using Content Lab tools (ST42-ST46).
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>4 NaviCues Live</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Brain className="w-4 h-4" />
                  <span>16 Micro-Blocks Targeted</span>
                </div>
              </div>
            </div>
            
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#5739FB] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
          </div>
        </button>
      </div>

      {/* Info Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        <div className="bg-gradient-to-br from-[#3E2BB8]/5 to-[#5739FB]/5 rounded-2xl p-8 border border-[#5739FB]/10">
          <h3 className="text-xl text-gray-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            How Content Lab Works
          </h3>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              <strong>Weekly ERA Sprints</strong> provide the journey structure, 12 weeks of therapeutic progression mapped to the ERA flow.
            </p>
            <p>
              <strong>Micro-Block Library</strong> defines the building blocks, 48 fundamental brain states that content should target.
            </p>
            <p>
              <strong>Content Mapping</strong> tracks which resources hit which micro-blocks, revealing gaps and coverage patterns.
            </p>
            <p>
              <strong>Video Library Audit</strong> analyzes video content specifically, identifying high-priority gaps for video creation.
            </p>
          </div>
        </div>
      </div>

      {/* Related DNA Foundation */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="bg-gradient-to-br from-[#3E2BB8]/5 to-[#5739FB]/5 rounded-2xl p-8 border border-[#5739FB]/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl text-gray-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Built on DNA HUB Foundation
              </h3>
              <p className="text-gray-600">
                Strategic principles that guide content creation
              </p>
            </div>
            <button
              onClick={() => onNavigate("dna-hub")}
              className="px-4 py-2 bg-white rounded-lg border border-[#3E2BB8]/20 hover:border-[#5739FB]/40 hover:shadow-md transition-all text-sm text-[#3E2BB8] hover:text-[#5739FB] flex items-center gap-2 group"
            >
              View DNA HUB
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => onNavigate("docs-era-flow")}
              className="p-3 bg-white rounded-lg border border-gray-200 hover:border-[#5739FB]/30 hover:shadow-sm transition-all text-left group"
            >
              <span className="text-xs text-[#3E2BB8] font-medium">ST3</span>
              <p className="text-sm text-gray-700 mt-1 group-hover:text-[#3E2BB8] transition-colors">ERA Flow</p>
            </button>
            <button
              onClick={() => onNavigate("docs-infinite-canvas")}
              className="p-3 bg-white rounded-lg border border-gray-200 hover:border-[#5739FB]/30 hover:shadow-sm transition-all text-left group"
            >
              <span className="text-xs text-[#3E2BB8] font-medium">ST4</span>
              <p className="text-sm text-gray-700 mt-1 group-hover:text-[#3E2BB8] transition-colors">Infinite Canvas</p>
            </button>
            <button
              onClick={() => onNavigate("docs-hcp")}
              className="p-3 bg-white rounded-lg border border-gray-200 hover:border-[#5739FB]/30 hover:shadow-sm transition-all text-left group"
            >
              <span className="text-xs text-[#3E2BB8] font-medium">ST2</span>
              <p className="text-sm text-gray-700 mt-1 group-hover:text-[#3E2BB8] transition-colors">HCP Architecture</p>
            </button>
            <button
              onClick={() => onNavigate("docs-brand-anchor")}
              className="p-3 bg-white rounded-lg border border-gray-200 hover:border-[#5739FB]/30 hover:shadow-sm transition-all text-left group"
            >
              <span className="text-xs text-[#3E2BB8] font-medium">ST1</span>
              <p className="text-sm text-gray-700 mt-1 group-hover:text-[#3E2BB8] transition-colors">Our Anchor</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
