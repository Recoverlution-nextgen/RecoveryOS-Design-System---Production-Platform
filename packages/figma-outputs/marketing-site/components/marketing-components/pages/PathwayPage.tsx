import { useState } from "react";
import { CheckCircle2, Circle, Play, BookOpen, FileText, Lock, ArrowRight, Bookmark } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { CueFlowPage } from "./CueFlowPage";
import { DASHBOARD_ASSETS } from "../../utils/dashboardAssetManifest"; // WebP CDN-Ready

type JourneyTab = "Guide" | "Cue" | "Navicue" | "Journal" | "Library";

// Guide Content Component
function GuideContent({ onStartCue }: { onStartCue: (cueName: string, cueId: number) => void }) {
  const modules = [
    {
      id: 1,
      title: "Understanding Growth Mindset",
      description: "Learn the foundational principles of growth vs. fixed mindset and how it impacts recovery.",
      duration: "12 min",
      completed: true,
      locked: false,
      type: "video"
    },
    {
      id: 2,
      title: "Identifying Fixed Mindset Patterns",
      description: "Recognize and understand your current mindset patterns and their origins.",
      duration: "15 min",
      completed: true,
      locked: false,
      type: "interactive"
    },
    {
      id: 3,
      title: "Building a Growth Mindset",
      description: "Practical exercises and strategies to cultivate a growth-oriented perspective.",
      duration: "18 min",
      completed: false,
      locked: false,
      type: "video"
    },
    {
      id: 4,
      title: "Overcoming Setbacks",
      description: "Transform challenges into opportunities for growth and learning.",
      duration: "20 min",
      completed: false,
      locked: false,
      type: "reading"
    },
    {
      id: 5,
      title: "Sustaining Your Growth",
      description: "Long-term strategies for maintaining a growth mindset in your recovery journey.",
      duration: "16 min",
      completed: false,
      locked: true,
      type: "video"
    }
  ];

  const completedCount = modules.filter(m => m.completed).length;
  const progressPercent = (completedCount / modules.length) * 100;

  return (
    <div className="space-y-8">
      {/* Progress Overview */}
      <div className="bg-gradient-to-br from-[#F5F3FF] to-white rounded-2xl p-8 border border-[#3E2BB8]/10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 
              className="text-[#3E2BB8] mb-2"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem' }}
            >
              Your Progress
            </h2>
            <p className="text-gray-600">
              {completedCount} of {modules.length} modules completed
            </p>
          </div>
          <div className="text-right">
            <div 
              className="text-[#3E2BB8] mb-1"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2.5rem' }}
            >
              {Math.round(progressPercent)}%
            </div>
            <p className="text-gray-500 text-sm">Complete</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-3 bg-white rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        <h3 
          className="text-gray-900 mb-4"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.25rem' }}
        >
          Journey Modules
        </h3>
        
        {modules.map((module, index) => (
          <div
            key={module.id}
            className={`group relative bg-white rounded-xl p-6 border transition-all duration-200 ${
              module.locked
                ? 'border-gray-200 opacity-60'
                : module.completed
                ? 'border-[#3E2BB8]/20 hover:border-[#3E2BB8]/40 hover:shadow-lg hover:shadow-[#5739FB]/10 cursor-pointer'
                : 'border-gray-200 hover:border-[#5739FB]/30 hover:shadow-lg hover:shadow-[#5739FB]/10 cursor-pointer'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Status Icon */}
              <div className="flex-shrink-0 mt-1">
                {module.locked ? (
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                    <Lock className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                ) : module.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-[#3E2BB8]" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300 group-hover:text-[#5739FB]" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h4 
                    className={`${module.locked ? 'text-gray-400' : 'text-gray-900 group-hover:text-[#3E2BB8]'} transition-colors`}
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}
                  >
                    Module {index + 1}: {module.title}
                  </h4>
                  {!module.locked && !module.completed && (
                    <button 
                      onClick={() => onStartCue(module.title, module.id)}
                      className="flex-shrink-0 px-4 py-2 bg-[#3E2BB8] text-white rounded-lg hover:bg-[#5739FB] transition-all shadow-sm hover:shadow-md text-sm font-semibold"
                    >
                      Start
                    </button>
                  )}
                  {module.completed && (
                    <button className="flex-shrink-0 px-4 py-2 border border-[#3E2BB8] text-[#3E2BB8] rounded-lg hover:bg-[#F5F3FF] transition-all text-sm font-semibold">
                      Review
                    </button>
                  )}
                </div>
                
                <p className={`${module.locked ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                  {module.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    {module.type === 'video' && <Play className="w-4 h-4" />}
                    {module.type === 'reading' && <BookOpen className="w-4 h-4" />}
                    {module.type === 'interactive' && <FileText className="w-4 h-4" />}
                    {module.type === 'video' ? 'Video' : module.type === 'reading' ? 'Reading' : 'Interactive'}
                  </span>
                  <span>•</span>
                  <span>{module.duration}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Cue Content Component
function CueContent() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 
          className="text-[#3E2BB8] mb-4"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem' }}
        >
          Trigger Awareness
        </h2>
        <p className="text-gray-600">
          Identify and understand the cues that trigger fixed mindset patterns in your journey.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#5739FB]/30 hover:shadow-lg transition-all">
          <h3 
            className="text-gray-900 mb-3"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}
          >
            Common Cues
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-[#3E2BB8] mt-1">•</span>
              <span>Feeling overwhelmed by challenges</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#3E2BB8] mt-1">•</span>
              <span>Negative self-talk patterns</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#3E2BB8] mt-1">•</span>
              <span>Comparison to others' progress</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#3E2BB8] mt-1">•</span>
              <span>Fear of failure or setbacks</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-[#F5F3FF] to-white rounded-xl p-6 border border-[#3E2BB8]/10">
          <h3 
            className="text-gray-900 mb-3"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}
          >
            Motion · Integration
          </h3>
          <p className="text-gray-600 mb-4">Continue your integrating flow with the next cue in your journey.</p>
          <button className="w-full px-4 py-3 bg-[#3E2BB8] text-white rounded-lg hover:bg-[#5739FB] transition-all shadow-sm hover:shadow-md font-semibold">
            Next Cue
          </button>
        </div>
      </div>
    </div>
  );
}

// Navicue Content Component - Redirects to full Navicues page
function NavicueContent({ onNavigateToNavicues }: { onNavigateToNavicues: () => void }) {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 
          className="text-[#3E2BB8] mb-4"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem' }}
        >
          Explore Navicues
        </h2>
        <p className="text-gray-600 mb-6">
          Navigate the cues that shape your journey. Discover patterns, understand triggers, and build awareness.
        </p>
        <button 
          onClick={onNavigateToNavicues}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white rounded-xl hover:shadow-lg hover:shadow-[#5739FB]/25 transition-all font-semibold"
        >
          Open Navicues
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#5739FB]/30 hover:shadow-lg transition-all group cursor-pointer" onClick={onNavigateToNavicues}>
          <div className="h-40 overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1573285702030-f7952e595655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwbWluZGZ1bG5lc3MlMjBjYWxtfGVufDF8fHx8MTc2MDI1NjAwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Awareness"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6">
            <h3 
              className="text-gray-900 mb-2 group-hover:text-[#3E2BB8] transition-colors"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}
            >
              Build Awareness
            </h3>
            <p className="text-gray-600 text-sm">
              Understand the cues and triggers that influence your patterns.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#5739FB]/30 hover:shadow-lg transition-all group cursor-pointer" onClick={onNavigateToNavicues}>
          <div className="h-40 overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1699192417069-97fdf51f30bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm93dGglMjBwZXJzb25hbCUyMGRldmVsb3BtZW50fGVufDF8fHx8MTc2MDI2NDc4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Reframe"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6">
            <h3 
              className="text-gray-900 mb-2 group-hover:text-[#3E2BB8] transition-colors"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}
            >
              Reframe Patterns
            </h3>
            <p className="text-gray-600 text-sm">
              Transform limiting beliefs into growth-oriented perspectives.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#5739FB]/30 hover:shadow-lg transition-all group cursor-pointer" onClick={onNavigateToNavicues}>
          <div className="h-40 overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1758657307358-4dd99c0c484a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpbGllbmNlJTIwc3RyZW5ndGglMjBuYXR1cmV8ZW58MXx8fHwxNzYwMjY0Nzg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Navigate"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6">
            <h3 
              className="text-gray-900 mb-2 group-hover:text-[#3E2BB8] transition-colors"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}
            >
              Navigate Forward
            </h3>
            <p className="text-gray-600 text-sm">
              Use cues as compass points to guide your recovery journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Journal Content Component
function JournalContent() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 
          className="text-[#3E2BB8] mb-4"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem' }}
        >
          Reflection Journal
        </h2>
        <p className="text-gray-600">
          Document your journey, insights, and growth as you develop a growth mindset.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-white to-[#F5F3FF] rounded-2xl p-8 border border-[#3E2BB8]/10">
          <h3 
            className="text-gray-900 mb-4"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.25rem' }}
          >
            Today's Reflection
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                What challenged my growth mindset today?
              </label>
              <textarea 
                className="w-full h-24 px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5739FB]/30 focus:border-[#5739FB] transition-all resize-none"
                placeholder="Describe the situation..."
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                How did I respond?
              </label>
              <textarea 
                className="w-full h-24 px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5739FB]/30 focus:border-[#5739FB] transition-all resize-none"
                placeholder="Your response..."
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                What did I learn?
              </label>
              <textarea 
                className="w-full h-24 px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5739FB]/30 focus:border-[#5739FB] transition-all resize-none"
                placeholder="Your insights..."
              />
            </div>

            <button className="w-full px-6 py-3 bg-[#3E2BB8] text-white rounded-lg hover:bg-[#5739FB] transition-all shadow-md hover:shadow-lg font-semibold">
              Save Entry
            </button>
          </div>
        </div>

        <div className="mt-6">
          <h4 
            className="text-gray-900 mb-4"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}
          >
            Recent Entries
          </h4>
          <div className="space-y-3">
            {[1, 2, 3].map((entry) => (
              <div 
                key={entry}
                className="bg-white rounded-lg p-4 border border-gray-200 hover:border-[#5739FB]/30 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#3E2BB8] font-semibold">
                    {new Date(Date.now() - entry * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="text-sm text-gray-500">3 min read</span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">
                  Reflected on my response to a challenging situation and how I reframed my thinking...
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Library Content Component - Shows relevant articles for this Journey topic
function LibraryContent({ onNavigateToArticle, onNavigateToLibrary }: { onNavigateToArticle: (id: number) => void; onNavigateToLibrary: () => void }) {
  // Articles relevant to Growth Mindset Journey
  const relevantArticles = [
    {
      id: 5,
      title: "The Power of Yet",
      subtitle: "Shift from fixed to growth mindset in recovery",
      pillar: "cognitiveReframing",
      pillarColor: "#F39C12",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1700507163265-62a7e5178a8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXJwbGUlMjBza3klMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NjAyODQ2NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 3,
      title: "Reframing Stress as Fuel",
      subtitle: "Transform stress from threat to resource",
      pillar: "stressResilience",
      pillarColor: "#9B59B6",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1598129202606-e3894fa71cfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHBhc3RlbCUyMGdyb3d0aHxlbnwxfHx8fDE3NjAyODQ2NTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 7,
      title: "Who Am I Becoming?",
      subtitle: "Integrate past experiences into your evolving identity",
      pillar: "identityIntegration",
      pillarColor: "#2ECC71",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1646444570390-55a6131b8edb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwbmF0dXJlJTIwcmVmbGVjdGlvbnxlbnwxfHx8fDE3NjAyODQ2NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 
          className="text-[#3E2BB8] mb-4"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem' }}
        >
          Resources for This Journey
        </h2>
        <p className="text-gray-600 mb-6">
          Articles and tools specifically chosen to support your growth mindset development.
        </p>
        <button 
          onClick={onNavigateToLibrary}
          className="text-[#3E2BB8] hover:text-[#5739FB] font-semibold text-sm inline-flex items-center gap-2"
        >
          Browse Full Library
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Relevant Articles */}
      <div className="grid md:grid-cols-3 gap-6">
        {relevantArticles.map((article) => (
          <div 
            key={article.id}
            onClick={() => onNavigateToArticle(article.id)}
            className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#5739FB]/30 hover:shadow-lg transition-all group cursor-pointer"
          >
            <div className="h-48 overflow-hidden relative">
              <ImageWithFallback
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div 
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-white/95 shadow-sm"
              >
                <Bookmark className="w-4 h-4 text-gray-400 group-hover:text-[#3E2BB8] transition-colors" />
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span 
                  className="text-xs px-2 py-1 rounded-md"
                  style={{ 
                    backgroundColor: `${article.pillarColor}20`,
                    color: article.pillarColor,
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600
                  }}
                >
                  {article.readTime} read
                </span>
              </div>
              <h3 
                className="text-gray-900 mb-2 group-hover:text-[#3E2BB8] transition-colors"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}
              >
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {article.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA to Full Library */}
      <div className="bg-gradient-to-br from-[#F5F3FF] to-white rounded-2xl p-8 border border-[#3E2BB8]/10 text-center">
        <p className="text-gray-700 mb-4">
          Explore the complete library for more articles, exercises, and resources across all Six Pillars of Recovery.
        </p>
        <button 
          onClick={onNavigateToLibrary}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#3E2BB8] text-[#3E2BB8] rounded-lg hover:bg-[#F5F3FF] transition-all font-semibold"
        >
          View Full Library
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

interface PathwayPageProps {
  onNavigate?: (page: string) => void;
  onNavigateToArticle?: (id: number) => void;
  onNavigateToWebsite?: () => void;
}

export function PathwayPage({ onNavigate, onNavigateToArticle, onNavigateToWebsite }: PathwayPageProps = {}) {
  const [activeTab, setActiveTab] = useState<JourneyTab>("Guide");
  const [activeCue, setActiveCue] = useState<{ name: string; id: number } | null>(null);

  // If viewing a specific cue, show the CueFlowPage
  if (activeCue) {
    return <CueFlowPage cueName={activeCue.name} onBack={() => setActiveCue(null)} />;
  }

  const journeyTabs: JourneyTab[] = ["Guide", "Cue", "Navicue", "Journal", "Library"];

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Journey Hero Header with Background Image */}
      <div className="relative w-full h-[280px]">
        {/* Background Image - Same as dashboard */}
        <div className="absolute inset-0">
          <img
            src={DASHBOARD_ASSETS.journey}
            alt="Journey"
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent" />
        </div>

        {/* Purple Overlay Bar with Title and Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#3E2BB8] h-[60px] flex items-center justify-between px-6 md:px-12">
          {/* Left: Title and Subtitle */}
          <div className="flex flex-col">
            <h1 
              className="text-white text-xl md:text-2xl tracking-tight leading-tight"
              style={{ 
                fontFamily: 'var(--font-display)',
                fontWeight: 700
              }}
            >
              Seeds of Change
            </h1>
            <p 
              className="text-white/90 text-xs hidden md:block"
              style={{ 
                fontFamily: 'var(--font-sans)',
                fontWeight: 400
              }}
            >
              Guided steps · Clear direction · Personal recovery
            </p>
          </div>

          {/* Right: Secondary Navigation Tabs */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {journeyTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs lg:text-sm transition-all pb-0.5 whitespace-nowrap ${
                  activeTab === tab
                    ? "text-white border-b-2 border-white"
                    : "text-white/70 hover:text-white/90 border-b-2 border-transparent"
                }`}
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  fontWeight: activeTab === tab ? 600 : 400
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Tab Navigation (shown on small screens) */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 overflow-x-auto">
        <div className="flex gap-2">
          {journeyTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={{ 
                fontFamily: 'var(--font-sans)',
                fontWeight: activeTab === tab ? 600 : 500
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          {activeTab === "Guide" && <GuideContent onStartCue={(name, id) => setActiveCue({ name, id })} />}
          {activeTab === "Cue" && <CueContent />}
          {activeTab === "Navicue" && <NavicueContent onNavigateToNavicues={() => onNavigate?.("Navicues")} />}
          {activeTab === "Journal" && <JournalContent />}
          {activeTab === "Library" && (
            <LibraryContent 
              onNavigateToArticle={(id) => onNavigateToArticle?.(id)}
              onNavigateToLibrary={() => onNavigate?.("Toolkit")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
