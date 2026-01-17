/**
 * MARKETING SCIENCE PAGE V2 - EXHIBITION-LEVEL NEUROSCIENCE
 * 
 * Mission: Showcase the neuroscience-backed foundation of Recoverlution
 * Design DNA: Layered Floating Glass, massive 3D assets, asymmetric breakthrough layouts
 * Philosophy: Scientific credibility meets premium design sophistication
 * 
 * GLASS UPGRADE (Nov 1, 2025):
 * - ERA Framework (3 tiles): Applied Economics compound glass treatment
 * - Evidence Based (4 tiles): Applied Economics compound glass treatment
 * - Bottom boxes REFINED: Reduced from oversized/clumpy to subtle, refined accents
 *   - "Repetition wires recovery" - reduced font sizes, removed description
 *   - "Six decades" - HALF SIZE, single row buzz tag layout with 6 therapy tags
 * 
 * BUZZ TAG TRANSFORMATION (Nov 1, 2025):
 * - Six decades box: Reduced to 50% height, single-row horizontal layout
 * - Therapy tags: Icon + abbreviated label (CBT, DBT, ACT, MI) in buzz tag style
 * - Visual weight: Tiles = HERO, bottom box = subtle supporting accent
 * 
 * Created: October 27, 2025
 * Transformed: November 1, 2025 - Economics Glass Formula + Buzz Tag Horizontal Layout
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, Activity, Zap, Network, Target, TrendingUp, TrendingDown, Shield, Sparkles, Heart, Users, MessageCircle, Lightbulb, Cpu, Layers } from 'lucide-react';
import { MarketingHeader } from '../MarketingHeader';
import { MarketingFooter } from '../MarketingFooter';
import { SEOHead } from '../SEOHead';
import { getPageSEO } from '../../utils/seo';
import FinalCTAClean from '../FinalCTAClean';
import { HeroClass } from '../marketing/universal/HeroClass';
import { BookendSectionClass } from '../marketing/universal/BookendSectionClass';
import { SciencePageERAFramework } from '../SciencePageERAFramework';
import { SciencePageArchitecture } from '../SciencePageArchitecture';
import { SciencePageEvidence } from '../SciencePageEvidence';
import { SciencePageSixPillars } from '../SciencePageSixPillars';

// Hero Asset - Nov 6, 2025 Optimized
import { heroScienceOptimized } from '../../utils/heroAssets';
import microBlockCube from 'figma:asset/0b27fe7ff6c5489c65da288e25ee445da02d4a00.png';
import glassBackgroundExperience from 'figma:asset/c52f0af47a270ddd07ae589f89aebc8ed66515a2.png'; // ✅ ERA - Experience (UPDATED: flowing purple/lavender curves - better sized)
import glassBackgroundRecognize from 'figma:asset/8a1337d912699ea55e506c7f5c51781e8e518435.png'; // ✅ ERA - Recognize (UPDATED: blue geometric cubes/blocks - better sized)
import glassBackgroundAlign from 'figma:asset/b461ff0158af077e4d56ec710643e97ea294fe1d.png'; // ERA - Align (NEW: flowing purple 3D shapes)
import eraFrameworkAsset from 'figma:asset/4176e5f48bd4cf0f05c455139153effc94425892.png'; // ERA Framework summary background
import glassBackgroundNeuroscience from 'figma:asset/80f9ba68c70b1c562fef2327323d0fd45c94debb.png'; // Evidence - Memory Consolidation (blue geometric pattern - NEW)
import glassBackgroundLongitudinal from 'figma:asset/8c43e2d143674146aa7576dbb975937283f334df.png'; // Evidence - Behaviour Change (purple flowing waves - NEW)
import glassBackgroundCoherence from 'figma:asset/088da8401197092236feacc6686c45fb5b087671.png'; // Evidence - Sustained Coherence (blue flowing waves - NEW)
import glassBackgroundRelapse from 'figma:asset/a1a502214098d28a7fb50bb17027992604cc8386.png'; // Evidence - Relapse Reduction (purple geometric pattern - NEW)
import glassBackgroundSixDecades from 'figma:asset/3b704d32c8404f9035061ba6d279a36305538d2a.png'; // Research Foundation - Six decades background (darker purple)
import osArchitectureAsset from 'figma:asset/0c7d3e1ac057e973cbd51ff2396ce2afc9777324.png'; // Architecture - OS (blue impossible cube)
import orbitArchitectureAsset from 'figma:asset/eba0352749276264175e2f5f72b31c230f421b3c.png'; // Architecture - ORBIT (purple glowing orbs)
import proofArchitectureAsset from 'figma:asset/ab8f8fdfdb07679a425dcb62472795e36341ea6b.png'; // Architecture - PROOF (blue geometric cube)
import finalCTAAsset from 'figma:asset/00b5115869d70a25b08b65e7bd7ab3451fc1e54d.png'; // Final CTA - Vase with flower under dome light

interface MarketingSciencePageV2Props {
  onBack: () => void;
  onScheduleDemo: () => void;
  onNavigate: (page: string) => void;
  onLogin?: () => void;
}

// Brand colors now managed in /utils/sectionStyles.tsx (BRAND_COLORS)
const BRAND = {
  dark: '#3E2BB8',
  mid: '#5739FB',
  cyan: '#40E0D0',
  green: '#2C99AF',
};

export function MarketingSciencePage({ onBack, onScheduleDemo, onNavigate, onLogin }: MarketingSciencePageV2Props) {
  const seo = getPageSEO('science');

  return (
    <div className="min-h-screen bg-white">
      <SEOHead {...seo} />
      
      {/* Master Marketing Header */}
      <MarketingHeader 
        onNavigate={onNavigate}
        onEnterPlatform={onLogin}
        currentPage="science"
      />

      {/* 🎨 HERO - Universal Component */}
      <HeroClass
        eyebrow="NEUROSCIENCE FOUNDATION"
        eyebrowIcon={
          <Brain 
            size={14}
            style={{ strokeWidth: 2.5 }} 
          />
        }
        headline={
          <>
            Recovery built on<br />
            <span style={{ color: '#40E0D0' }}>
              brain science
            </span>
          </>
        }
        subheadline="Neural pathways you can measure. Brain systems you can target. Recovery outcomes you can prove."
        ctaText="EXPLORE THE SCIENCE"
        ctaOnClick={onScheduleDemo}
        backgroundAsset={heroScienceOptimized}
        backgroundAssetAlt="3D organic neural pathways representing brain connectivity and neuroscience-backed recovery architecture"
        backgroundFilter="brightness(0.85) saturate(1.1)"
        overlayGradient="linear-gradient(180deg, rgba(10, 25, 47, 0.3) 0%, rgba(10, 25, 47, 0.1) 50%, rgba(10, 25, 47, 0.3) 100%)"
      />

      {/* 🎨 MICRO-BLOCKS SECTION - BOOKEND FOUNDATION PATTERN (SECTION 2) */}
      <BookendSectionClass
        eyebrow="NEURAL ARCHITECTURE"
        eyebrowIcon={<Network size={16} style={{ strokeWidth: 2.5 }} />}
        headline="Every behavior is a neural pattern"
        bodyCopy="Micro-blocks are the smallest units of behavioral change. Each one maps to a specific neural circuit that can be strengthened through targeted practice. Track them as red, orange, or green to visualize recovery progress in real time."
        tiles={[
          {
            id: 'vulnerable',
            icon: TrendingDown,
            label: 'Vulnerable',
            tagline: 'Pattern needs support',
            color: '#EF4444'
          },
          {
            id: 'developing',
            icon: Activity,
            label: 'Developing',
            tagline: 'Pattern is emerging',
            color: '#F97316'
          },
          {
            id: 'integrated',
            icon: TrendingUp,
            label: 'Integrated',
            tagline: 'Pattern is automatic',
            color: '#10B981'
          }
        ]}
        backgroundAsset={microBlockCube}
        backgroundAssetAlt="3D micro-block cube representing neural pathway architecture"
      />

      {/* SIX PILLARS - REFACTORED TO COMPONENT (Nov 5, 2025) */}
      <SciencePageSixPillars />

      {/* ERA FRAMEWORK - REFACTORED TO COMPONENT (Nov 5, 2025) */}
      <SciencePageERAFramework />

      {/* THE ARCHITECTURE - REFACTORED TO COMPONENT (Nov 5, 2025) */}
      <SciencePageArchitecture />

      {/* PROOF OF LIFE - REFACTORED TO COMPONENT (Nov 5, 2025) */}
      <SciencePageEvidence />

      {/* FINAL CTA - CLEAN */}
      <FinalCTAClean 
        backgroundAsset={finalCTAAsset}
        eyebrow="READY TO EXPLORE"
        headline="See the science in action"
        accentWord="science"
        subtext="Request a demo to explore how neuroscience-backed interventions drive measurable outcomes for your patients."
        buttonText="SCHEDULE DEMO"
        onButtonClick={onScheduleDemo}
      />

      {/* Master Marketing Footer */}
      <MarketingFooter onNavigate={onNavigate} />

      {/* Shimmer Animation Keyframes */}
      <style>{`
        @keyframes shimmer-glass {
          0%, 100% {
            transform: translateX(-100%);
            opacity: 0.3;
          }
          50% {
            transform: translateX(100%);
            opacity: 0.8;
          }
        }
      `}</style>

    </div>
  );
}
