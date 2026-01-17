export default function V3IndexPage() {
  const pages = [
    { 
      route: '/v3-home', 
      title: 'Homepage', 
      emoji: '🏠',
      description: 'Category-defining reveal with ATLAS constellation'
    },
    { 
      route: '/v3-platform', 
      title: 'Platform', 
      emoji: '⚡',
      description: 'Four-layer architecture. Clinical operating system.'
    },
    { 
      route: '/v3-science', 
      title: 'Science', 
      emoji: '🧬',
      description: 'Eight Primitives. 20 Schemas. Auditable change.'
    },
    { 
      route: '/v3-organisations', 
      title: 'Organisations', 
      emoji: '🏔️',
      description: 'Scale therapeutic standard without losing depth'
    },
    { 
      route: '/v3-professionals', 
      title: 'Professionals', 
      emoji: '🪶',
      description: 'The work holds between sessions'
    },
    { 
      route: '/v3-individuals', 
      title: 'Individuals', 
      emoji: '🌅',
      description: 'Transform how you relate to yourself'
    },
    { 
      route: '/v3-companions', 
      title: 'Companions', 
      emoji: '🌿',
      description: 'Support without suffocating'
    }
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">
            V3 Marketing Site
          </h1>
          <p className="text-xl text-white/70 mb-2">
            ATLAS Ecosystem Launch
          </p>
          <p className="text-sm text-white/50">
            January 2026 • infiniteK Design System
          </p>
        </div>

        {/* Quick Access Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {pages.map((page) => (
            <button
              key={page.route}
              onClick={() => {
                // Navigate using hash router
                window.location.hash = `#${page.route}`;
              }}
              className="group relative bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-8 text-left hover:border-[#5739FB]/50 transition-all duration-300"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#3E2BB8]/0 via-[#5739FB]/10 to-[#3E2BB8]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />

              {/* Content */}
              <div className="flex items-start space-x-4">
                <span className="text-5xl">{page.emoji}</span>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-white mb-2">
                    {page.title}
                  </h2>
                  <p className="text-white/60 text-sm">
                    {page.description}
                  </p>
                </div>
              </div>

              {/* Arrow indicator */}
              <div className="mt-4 flex items-center text-[#5739FB] opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-semibold">View Page</span>
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Back to V2 */}
        <div className="text-center">
          <button
            onClick={() => {
              window.location.hash = '#/';
            }}
            className="px-8 py-3 bg-white/5 border border-white/20 text-white hover:bg-white/10 transition-all"
          >
            ← Back to V2 Site
          </button>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center space-y-4">
          <p className="text-white/40 text-sm">
            Phase 1 Complete. Platform + Science now live.
          </p>
          <div className="flex items-center justify-center gap-8 text-xs text-white/30">
            <span>✓ 8 pages total</span>
            <span>✓ ATLAS Constellation</span>
            <span>✓ Eight Primitives</span>
            <span>✓ infiniteK compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
}