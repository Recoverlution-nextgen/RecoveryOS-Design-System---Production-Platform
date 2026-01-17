/**
 * SCIENCE PAGE - THE ARCHITECTURE SECTION (OS/ORBIT/PROOF)
 * REFACTORED TO USE CLEAN HEADLINE ARCHITECTURE (Nov 5, 2025)
 * 
 * Now using:
 * - TwoColumnHeadlineClass (direct, not via TileGridSectionClass)
 * - TileClass with Architecture variant props
 * - Clean separation of concerns
 */

import { Cpu, Layers, Shield } from 'lucide-react';
import { TwoColumnHeadlineClass, TileClass } from './marketing/universal';

// Architecture Assets - Nov 6, 2025 Optimized (TinyPNG, on-brand, consistent)
import { 
  archOSOptimized, 
  archORBITOptimized, 
  archPROOFOptimized 
} from '../utils/scienceAssets';

const BRAND = {
  dark: '#3E2BB8',
  mid: '#5739FB',
  cyan: '#40E0D0'
};

export function SciencePageArchitecture() {
  const products = [
    {
      eyebrowBadge: 'NEUROADAPTIVE ENGINE',
      icon: Cpu,
      title: 'Recoverlution OS',
      tagline: 'The Sentient Baseline',
      description: 'Change sticks when cognition, behavior, and identity move together in real time. OS ensures recovery momentum persists even when motivation collapses.',
      buzzTags: ['Regulate First', 'Memory Update', 'Coherence'],
      asset: archOSOptimized,
      color: BRAND.dark,
      gradientOverlay: 'linear-gradient(135deg, rgba(62, 43, 184, 0.08) 0%, rgba(87, 57, 251, 0.06) 100%)'
    },
    {
      eyebrowBadge: 'COMPOSABLE ECOSYSTEM',
      icon: Layers,
      title: 'Recoverlution ORBIT',
      tagline: 'The Exponential Catalyst',
      description: 'Therapeutic modules click together, transforming homework into instinct. Load aligned to biology, breakthroughs in motion.',
      buzzTags: ['Modular Pathways', 'Built-In Rhythm', 'Compound Effect'],
      asset: archORBITOptimized,
      color: BRAND.mid,
      gradientOverlay: 'linear-gradient(135deg, rgba(87, 57, 251, 0.08) 0%, rgba(124, 103, 255, 0.06) 100%)'
    },
    {
      eyebrowBadge: 'SCALABLE TRUST STANDARD',
      icon: Shield,
      title: 'Recoverlution PROOF',
      tagline: 'The Ethical Currency',
      description: 'Auditable integrity that travels with the patient. One operating truth, so recovery transfers and results compound.',
      buzzTags: ['Data Integrity', 'Transfer Ready', 'Lifetime Continuity'],
      asset: archPROOFOptimized,
      color: BRAND.cyan,
      gradientOverlay: 'linear-gradient(135deg, rgba(64, 224, 208, 0.08) 0%, rgba(44, 153, 175, 0.06) 100%)'
    }
  ];

  return (
    <section className="py-32 md:py-40 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-12">
        
        {/* Two-Column Headline - LEFT layout */}
        <TwoColumnHeadlineClass
          headline="The Architecture"
          headlineAccent="Architecture"
          accentColor={BRAND.cyan}
          tagline="The infrastructure for recovery that scales"
          layout="left"
          marginBottom="mb-16"
        />
        
        {/* Tiles Grid - Harmonized with Six Pillars max-width */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto max-w-[1600px]">
          {products.map((product, idx) => (
            <TileClass
              key={idx}
              icon={product.icon}
              iconColor={product.color}
              title={product.title}
              description={product.description}
              backgroundAsset={product.asset}
              gradientOverlay={product.gradientOverlay}
              animationDelay={idx * 0.1}
              minHeight="420px"
              // Architecture variant props - NOW USING EYEBROW BADGE
              eyebrowBadge={product.eyebrowBadge}
              tagline={product.tagline}
              buzzTags={product.buzzTags}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}
