import recoverlutionLogo from "figma:asset/d3c889f1d4c13c03718e4dd433a2fd6fe4a8d55c.png";

export function LinkedInCarouselPage() {
  const slides = [
    {
      number: "01",
      title: "The Continuous-Care OS",
      subtitle: "Extending inpatient standards into patient-driven 365-day care",
      description: "Recoverlution turns discharge into continuity. Data-driven outcomes that optimize treatment and embed lifelong recovery.",
      color: "#3E2BB8"
    },
    {
      number: "02",
      title: "Know your patients in 60 seconds.",
      subtitle: "Clinical Intelligence Dashboard",
      bullets: [
        "Risk Signal Detection",
        "Engagement Analytics", 
        "Six Pillar Progress Maps",
        "Clinical Context Integration"
      ],
      color: "#5739FB"
    },
    {
      number: "03",
      title: "Structured therapeutic journeys.",
      subtitle: "Progressive Pathways",
      bullets: [
        "Spaced Repetition Architecture",
        "Weekly Experience Drops",
        "Multi-Modal Content Delivery",
        "Micro-Interventions (ResCues)"
      ],
      color: "#3E2BB8"
    },
    {
      number: "04",
      title: "The right wisdom at the right moment.",
      subtitle: "Navicues - Adaptive Interventions",
      bullets: [
        "Just-In-Time Adaptive Interventions",
        "Neuroscience-Backed Micro-Blocks",
        "State-Responsive Prompts",
        "Frictionless Delivery"
      ],
      color: "#5739FB"
    },
    {
      number: "05",
      title: "LUMA. Your emotional co-pilot.",
      subtitle: "Listening, Understanding, Monitoring Assistant",
      bullets: [
        "Multi-Modal Emotional Sensing",
        "Affect Labeling for Regulation",
        "Contextual Steering",
        "Safe Processing Space"
      ],
      color: "#3E2BB8"
    },
    {
      number: "06",
      title: "Your essential wellness toolkit.",
      subtitle: "200+ Evidence-Based Resources",
      bullets: [
        "Body Wisdom & Nervous System",
        "Fluid Practice Philosophy",
        "Personalized Modalities",
        "Continuing Care Architecture"
      ],
      color: "#5739FB"
    },
    {
      number: "07",
      title: "Map your state. Honor your pace.",
      subtitle: "Inner Compass State Tracking",
      bullets: [
        "Real-Time Nervous System States",
        "Neuroadaptive Pattern Recognition",
        "Visual Recovery Trajectories",
        "Micro-Block Brain Mapping"
      ],
      color: "#3E2BB8"
    },
    {
      number: "08",
      title: "Your care team, always connected.",
      subtitle: "Navigate Care Coordination",
      bullets: [
        "Multi-Stakeholder Communication",
        "Transparent Progress Sharing",
        "Coordinated Intervention Plans",
        "Family & Provider Dashboards"
      ],
      color: "#5739FB"
    },
    {
      number: "09",
      title: "Ready to transform your care delivery?",
      subtitle: "Schedule a Demo",
      description: "See how Recoverlution extends your inpatient therapeutic standards into patient-driven 365-day care with data-driven outcomes.",
      cta: "recoverlution.com",
      color: "#3E2BB8"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">LinkedIn Carousel Template</h1>
          <p className="text-xl text-gray-600">
            1200 × 1500px per slide • Screenshot each slide and upload to Canva
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Tip: Use Canva's LinkedIn Carousel template and paste these designs
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg shadow-2xl overflow-hidden"
              style={{
                width: '1200px',
                height: '1500px',
                margin: '0 auto'
              }}
            >
              {/* Slide Content */}
              <div
                className="absolute inset-0 flex flex-col justify-between p-16"
                style={{ backgroundColor: slide.color }}
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <img 
                    src={recoverlutionLogo} 
                    alt="Recoverlution" 
                    className="h-16 brightness-0 invert"
                  />
                  <div 
                    className="text-white/40 font-bold"
                    style={{ fontSize: '80px', fontFamily: 'var(--font-display)' }}
                  >
                    {slide.number}
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col justify-center">
                  {slide.title && (
                    <h2 
                      className="text-white mb-6"
                      style={{ 
                        fontSize: '72px', 
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {slide.title}
                    </h2>
                  )}

                  {slide.subtitle && (
                    <p 
                      className="text-white/80 mb-12"
                      style={{ 
                        fontSize: '32px',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 500,
                        lineHeight: 1.4
                      }}
                    >
                      {slide.subtitle}
                    </p>
                  )}

                  {slide.description && (
                    <p 
                      className="text-white/90 leading-relaxed"
                      style={{ 
                        fontSize: '28px',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 400,
                        lineHeight: 1.6
                      }}
                    >
                      {slide.description}
                    </p>
                  )}

                  {slide.bullets && (
                    <div className="space-y-6">
                      {slide.bullets.map((bullet, i) => (
                        <div key={i} className="flex items-start gap-6">
                          <div 
                            className="flex-shrink-0 w-3 h-3 rounded-full bg-white mt-4"
                          />
                          <p 
                            className="text-white flex-1"
                            style={{ 
                              fontSize: '28px',
                              fontFamily: 'var(--font-sans)',
                              fontWeight: 400,
                              lineHeight: 1.5
                            }}
                          >
                            {bullet}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {slide.cta && (
                    <div className="mt-12">
                      <div 
                        className="inline-block px-12 py-6 bg-white rounded-2xl"
                      >
                        <p 
                          className="font-bold"
                          style={{ 
                            fontSize: '36px',
                            fontFamily: 'var(--font-display)',
                            color: slide.color
                          }}
                        >
                          {slide.cta}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer - Slide number indicator */}
                <div className="flex justify-center gap-3 pt-12">
                  {slides.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all ${
                        i === index 
                          ? 'w-12 bg-white' 
                          : 'w-2 bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-12 p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Use This Template</h3>
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="font-bold text-[#3E2BB8]">1.</span>
              <span>Screenshot each slide individually (1200×1500px)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#3E2BB8]">2.</span>
              <span>Open Canva and select "LinkedIn Carousel" template</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#3E2BB8]">3.</span>
              <span>Upload your screenshots and place them in order</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#3E2BB8]">4.</span>
              <span>Download as PDF from Canva</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#3E2BB8]">5.</span>
              <span>Upload PDF to LinkedIn as a Document post</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#3E2BB8]">6.</span>
              <span>LinkedIn will automatically convert it to a swipeable carousel!</span>
            </li>
          </ol>
          
          <div className="mt-6 p-4 bg-[#5739FB]/10 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-[#3E2BB8]">Pro Tip:</span> Add a compelling caption like: 
              "Extending inpatient standards into patient-driven 365-day care. Here's how Recoverlution's Continuous-Care OS transforms recovery 👇"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
