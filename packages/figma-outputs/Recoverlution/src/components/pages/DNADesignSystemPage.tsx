import { ArrowLeft, FileText, Book, Layers, CheckCircle2, ExternalLink } from "lucide-react";
import recoverlutionLogo from "figma:asset/d3c889f1d4c13c03718e4dd433a2fd6fe4a8d55c.png";

interface DNADesignSystemPageProps {
  onNavigate: (page: string) => void;
}

interface DocLink {
  title: string;
  description: string;
  path: string;
  icon: any;
  status: "locked" | "reference";
}

const designDocs: DocLink[] = [
  {
    title: "README - Master Index",
    description: "Complete overview and quick-start guide to the design system",
    path: "/docs/design-system/README.md",
    icon: Book,
    status: "locked",
  },
  {
    title: "RECOVERLUTION-DESIGN-SYSTEM.md",
    description: "The complete bible: all principles, specs, typography, colors, and rules",
    path: "/docs/design-system/RECOVERLUTION-DESIGN-SYSTEM.md",
    icon: FileText,
    status: "locked",
  },
  {
    title: "COMPONENT-LIBRARY.md",
    description: "Every component with copy-paste examples and usage patterns",
    path: "/docs/design-system/COMPONENT-LIBRARY.md",
    icon: Layers,
    status: "locked",
  },
  {
    title: "NEW-PAGE-TEMPLATE.md",
    description: "Quick-start template for creating new pages with common patterns",
    path: "/docs/design-system/NEW-PAGE-TEMPLATE.md",
    icon: FileText,
    status: "reference",
  },
  {
    title: "PAGE-INVENTORY.md",
    description: "Complete catalog of all 39 pages with design pattern status",
    path: "/docs/design-system/PAGE-INVENTORY.md",
    icon: CheckCircle2,
    status: "reference",
  },
];

export function DNADesignSystemPage({ onNavigate }: DNADesignSystemPageProps) {
  const openInNewTab = (path: string) => {
    // In a real environment, this would open the markdown file
    // For now, we'll just show an alert
    window.open(`https://github.com/yourusername/recoverlution/blob/main${path}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200/60 px-6 md:px-12 flex items-center justify-between" style={{ height: '72px', minHeight: '72px' }}>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate("dna-hub")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <img src={recoverlutionLogo} alt="Recoverlution" className="h-8" />
          <span className="text-xs text-gray-400 font-mono">Design System v1.0</span>
        </div>
        
        <div className="flex items-center gap-8">
          <button
            onClick={() => onNavigate("dna-hub")}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            DNA HUB
          </button>
          <button
            onClick={() => onNavigate("dna-design-system")}
            className="text-sm text-[#3E2BB8] hover:text-[#5739FB] transition-colors relative"
          >
            Design System
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5739FB]"></span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold mb-6">
            🔒 LOCKED
          </div>
          <h1 className="text-4xl md:text-5xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Design System Documentation
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Complete design system for Recoverlution. These patterns are locked to ensure consistency and velocity. 
            Every page, component, color, and interaction is documented here.
          </p>
          
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <p className="text-sm text-gray-700 mb-3">
              <span className="font-semibold text-[#3E2BB8]">Status:</span> Locked for consistency
            </p>
            <p className="text-sm text-gray-700 mb-3">
              <span className="font-semibold text-[#3E2BB8]">Pages Compliant:</span> 37 of 39 (95%)
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-[#3E2BB8]">Last Updated:</span> October 18, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Documentation Links */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 gap-4">
          {designDocs.map((doc) => (
            <div
              key={doc.path}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#5739FB]/30 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] flex items-center justify-center">
                      <doc.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 group-hover:text-[#3E2BB8] transition-colors">
                        {doc.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          doc.status === "locked" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {doc.status === "locked" ? "🔒 Locked" : "📖 Reference"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {doc.description}
                  </p>
                </div>
                
                <button
                  onClick={() => openInNewTab(doc.path)}
                  className="ml-4 p-2 rounded-lg border border-gray-200 hover:border-[#5739FB]/30 hover:bg-[#F5F3FF] transition-all group/btn"
                  title="View documentation"
                >
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover/btn:text-[#5739FB] transition-colors" />
                </button>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <code className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded">
                  {doc.path}
                </code>
              </div>
            </div>
          ))}
        </div>

        {/* Key Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100">
            <h4 className="text-[#3E2BB8] font-semibold mb-2">
              UniversalPageHeader
            </h4>
            <p className="text-sm text-gray-600">
              The crown jewel. Full-bleed hero images with glass overlay bars on all main pages.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100">
            <h4 className="text-[#3E2BB8] font-semibold mb-2">
              Brand Colors
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              Consistent purple palette across platform
            </p>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#3E2BB8]" title="#3E2BB8"></div>
              <div className="w-8 h-8 rounded-lg bg-[#5739FB]" title="#5739FB"></div>
              <div className="w-8 h-8 rounded-lg bg-[#7C67FF]" title="#7C67FF"></div>
              <div className="w-8 h-8 rounded-lg bg-[#9D8FFF]" title="#9D8FFF"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100">
            <h4 className="text-[#3E2BB8] font-semibold mb-2">
              Typography System
            </h4>
            <p className="text-sm text-gray-600">
              Plus Jakarta Sans for display, Inter for body. Default sizes locked.
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h3 className="text-xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            How to Use This System
          </h3>
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex gap-3">
              <span className="text-[#3E2BB8] font-bold">1.</span>
              <p>
                <strong>For new pages:</strong> Start with NEW-PAGE-TEMPLATE.md, copy the base structure, then fill in your content using components from COMPONENT-LIBRARY.md
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-[#3E2BB8] font-bold">2.</span>
              <p>
                <strong>For design questions:</strong> Check RECOVERLUTION-DESIGN-SYSTEM.md first. It has the complete spec for colors, typography, spacing, and patterns
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-[#3E2BB8] font-bold">3.</span>
              <p>
                <strong>For consistency checks:</strong> Reference PAGE-INVENTORY.md to see what exists and which design pattern each page follows
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-[#3E2BB8] font-bold">4.</span>
              <p>
                <strong>Remember:</strong> This system is locked. Make changes system-wide or not at all. Consistency = velocity
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
