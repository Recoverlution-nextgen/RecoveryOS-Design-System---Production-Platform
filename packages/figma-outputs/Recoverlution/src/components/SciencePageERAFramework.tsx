/**
 * SCIENCE PAGE - ERA FRAMEWORK SECTION
 * REFACTORED TO USE TILECLASS + TWOCOLUMNHEADLINECLASS (Nov 5, 2025)
 * 
 * Now using enhanced TileClass with ERA variant props:
 * - letterBadge: "E", "R", "A"
 * - tagline: "Body-first awareness", etc.
 * - neuralTag: "Sensory Integration", etc.
 * - buzzTags: Auto-split from examples
 * 
 * Updated: November 5, 2025 - Now uses TwoColumnHeadlineClass to match Six Pillars section
 */

import { useState } from 'react';
import { Activity } from 'lucide-react';
import { TileClass, TwoColumnHeadlineClass } from './marketing/universal';

// ERA Framework Assets - Nov 6, 2025 Optimized (TinyPNG, on-brand, consistent)
import eraExperienceOptimized from 'figma:asset/85000f0e0c7612b2a403c53777fa8f4d257eb097.png';
import eraRecognizeOptimized from 'figma:asset/d253f1ace34345d34cb31397a3287edcfea3ced0.png';
import eraAlignOptimized from 'figma:asset/c564d08d070a8d1c9dab6e935ff3c41aac718197.png';

const BRAND = {
  dark: '#3E2BB8',
  mid: '#5739FB'
};

interface ERAPhase {
  letter: string;
  title: string;
  color: string;
  neural: string;
  tagline: string;
  description: string;
  examples: string;
  glassBackground: string;
  gradientOverlay: string;
}

export function SciencePageERAFramework() {
  const [selectedERA, setSelectedERA] = useState<number | null>(null);

  const phases: ERAPhase[] = [
    {
      letter: 'E',
      title: 'Experience',
      color: BRAND.dark,
      neural: 'Sensory Integration',
      tagline: 'Body-first awareness',
      description: 'New patterns enter through lived experience, not intellectual understanding. Somatic practice activates sensory cortex and builds embodied memory that bypasses cognitive resistance.',
      examples: 'Breathwork · Body scan · Grounding techniques',
      glassBackground: eraExperienceOptimized,
      gradientOverlay: 'linear-gradient(135deg, rgba(62, 43, 184, 0.08) 0%, rgba(87, 57, 251, 0.06) 100%)'
    },
    {
      letter: 'R',
      title: 'Recognize',
      color: BRAND.mid,
      neural: 'Pattern Detection',
      tagline: 'Real-time insight',
      description: 'Awareness strengthens through repetition. Recognition activates the insula and anterior cingulate, building meta-cognitive capacity to observe patterns as they emerge in daily life.',
      examples: 'Trigger awareness · Emotional labeling · Pattern mapping',
      glassBackground: eraRecognizeOptimized,
      gradientOverlay: 'linear-gradient(135deg, rgba(87, 57, 251, 0.08) 0%, rgba(124, 103, 255, 0.06) 100%)'
    },
    {
      letter: 'A',
      title: 'Align',
      color: '#7C67FF',
      neural: 'Behavioral Integration',
      tagline: 'Embodied change',
      description: 'Micro-loops build automaticity. Repeated alignment strengthens prefrontal pathways and consolidates new responses into procedural memory, where they become reflexive.',
      examples: 'Response rehearsal · Values alignment · Identity anchoring',
      glassBackground: eraAlignOptimized,
      gradientOverlay: 'linear-gradient(135deg, rgba(124, 103, 255, 0.08) 0%, rgba(87, 57, 251, 0.06) 100%)'
    }
  ];

  return (
    <section className="py-32 md:py-40 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-12">
        
        {/* Two-Column Headline - Alternates from Six Pillars (left) */}
        <TwoColumnHeadlineClass
          headline="The ERA Framework"
          headlineAccent="ERA"
          accentColor={BRAND.mid}
          tagline="How recovery happens at the neural level"
          layout="right"
          marginBottom="mb-16"
        />
        
        {/* Tiles Grid - Harmonized with Six Pillars max-width */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-[1600px]">
          {phases.map((phase, i) => (
            <TileClass
              key={i}
              iconColor={phase.color}
              icon={Activity}
              title={phase.title}
              description={phase.description}
              backgroundAsset={phase.glassBackground}
              gradientOverlay={phase.gradientOverlay}
              animationDelay={i * 0.1}
              minHeight="420px"
              onClick={() => setSelectedERA(i)}
              // ERA Framework variant props
              letterBadge={phase.letter}
              tagline={phase.tagline}
              neuralTag={phase.neural}
              buzzTags={phase.examples.split(' · ')}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}
