/**
 * STORY PAGE - THE INSIGHT SECTION
 * REFACTORED TO USE CLEAN HEADLINE ARCHITECTURE (Nov 5, 2025)
 * ASSETS OPTIMIZED (Nov 6, 2025)
 * HOUSEKEEPING - White icons (Nov 6, 2025)
 * 
 * Now using:
 * - TwoColumnHeadlineClass (direct, not via TileGridSectionClass)
 * - TileClass for tiles
 * - Clean separation of concerns
 * - Premium optimized 3D assets (TinyPNG compressed)
 * - White icons for elegant contrast
 */

import { Brain, Lightbulb, Sparkles } from 'lucide-react';
import { TwoColumnHeadlineClass, TileClass } from './marketing/universal';
import insightArchitecture from 'figma:asset/0223df67ba9b9669f8fe98713b24865b455a2c3f.png'; // Optimized Nov 6
import insightMicroBlocks from 'figma:asset/d57dbb2b5702ed791d1403498ef66d037ab1a5a1.png'; // Optimized Nov 6
import insightTechnology from 'figma:asset/8111d8a2ea9f96f47a30b0d7ede798202d2946b3.png'; // Optimized Nov 6

const BRAND = {
  dark: '#3E2BB8',
  mid: '#5739FB'
};

interface InsightSectionProps {}

export function StoryPageGlassInsight({}: InsightSectionProps) {
  const insights = [
    {
      icon: Brain,
      title: 'Recovery is Architecture',
      description: 'Systematic neural rewiring through repetition, context, and lived experience',
      asset: insightArchitecture,
      color: '#FFFFFF', // White icons for elegant contrast
      gradientOverlay: `linear-gradient(135deg, ${BRAND.mid}06 0%, ${BRAND.mid}04 100%)`
    },
    {
      icon: Lightbulb,
      title: 'Micro-Blocks are Universal',
      description: 'Decomposed therapeutic methods targeting specific neural circuits',
      asset: insightMicroBlocks,
      color: '#FFFFFF', // White icons for elegant contrast
      gradientOverlay: `linear-gradient(135deg, ${BRAND.dark}06 0%, ${BRAND.dark}04 100%)`
    },
    {
      icon: Sparkles,
      title: 'Technology Can Scale Trust',
      description: 'Privacy-first architecture enabling cohort-level outcomes without individual exposure',
      asset: insightTechnology,
      color: '#FFFFFF', // White icons for elegant contrast
      gradientOverlay: 'linear-gradient(135deg, rgba(6, 182, 212, 0.06) 0%, rgba(6, 182, 212, 0.04) 100%)'
    }
  ];

  return (
    <section className="py-32 md:py-40 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-12">
        
        {/* Two-Column Headline - RIGHT layout */}
        <TwoColumnHeadlineClass
          headline="The Insight"
          headlineAccent="Insight"
          accentColor={BRAND.mid}
          tagline="The moment everything clicked"
          layout="right"
          marginBottom="mb-16"
        />
        
        {/* Tiles Grid - Harmonized with Science page sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto max-w-[1600px]">
          {insights.map((insight, idx) => (
            <TileClass
              key={idx}
              icon={insight.icon}
              iconColor={insight.color}
              title={insight.title}
              description={insight.description}
              backgroundAsset={insight.asset}
              gradientOverlay={insight.gradientOverlay}
              animationDelay={idx * 0.1}
              minHeight="420px"
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}
