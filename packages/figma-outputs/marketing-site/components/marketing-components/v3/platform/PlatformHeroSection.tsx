import { V3Section } from '../layout/V3Section';
import { V3Container } from '../layout/V3Container';

export function PlatformHeroSection() {
  return (
    <V3Section className="pt-32 pb-24 bg-black">
      <V3Container>
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="mb-6">
            <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: '#5739FB' }}>
              ATLAS Clinical Operating System
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            The First Clinical<br />Operating System
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/70 mb-8 leading-relaxed">
            We're not building a mental health app.<br />
            We're installing an operating system for your nervous system.
          </p>

          {/* Key Differentiator */}
          <div className="inline-block px-6 py-3 border border-white/20 bg-white/5 mb-12">
            <p className="text-white/90 text-lg">
              Installation vs Information
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => {
                const layersSection = document.getElementById('four-layers');
                layersSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-[#5739FB] text-white font-semibold hover:bg-[#3E2BB8] transition-colors"
            >
              See How It Works
            </button>
            <button
              onClick={() => window.location.hash = '#/v3-science'}
              className="px-8 py-4 border border-white/30 text-white font-semibold hover:bg-white/5 transition-colors"
            >
              Explore The Science
            </button>
          </div>
        </div>
      </V3Container>
    </V3Section>
  );
}
