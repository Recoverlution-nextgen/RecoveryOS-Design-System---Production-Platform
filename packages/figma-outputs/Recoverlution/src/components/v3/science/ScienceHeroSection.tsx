import { V3Section } from '../layout/V3Section';
import { V3Container } from '../layout/V3Container';

export function ScienceHeroSection() {
  return (
    <V3Section className="pt-32 pb-24 bg-black">
      <V3Container>
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="mb-6">
            <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: '#5739FB' }}>
              Clinical Architecture
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            The Science<br />Behind ATLAS
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/70 mb-8 leading-relaxed">
            Conference-legible. Neuroscience-backed. Auditable at every layer.
          </p>

          {/* Key Differentiator */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="px-6 py-3 border border-white/20 bg-white/5">
              <p className="text-white/90">Eight Primitives</p>
            </div>
            <div className="px-6 py-3 border border-white/20 bg-white/5">
              <p className="text-white/90">20 Schemas · 160 Families</p>
            </div>
            <div className="px-6 py-3 border border-white/20 bg-white/5">
              <p className="text-white/90">760 Cue Types</p>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-white/60 text-lg max-w-3xl mx-auto">
            This isn't a wellness app. This is a clinical protocol designed to program nervous systems through structured, auditable change pathways.
          </p>
        </div>
      </V3Container>
    </V3Section>
  );
}
