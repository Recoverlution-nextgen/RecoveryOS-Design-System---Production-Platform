/**
 * STORY PAGE - OUR MISSION SECTION
 * REFACTORED TO USE CLEAN HEADLINE ARCHITECTURE (Nov 5, 2025)
 * ASSETS OPTIMIZED - All 4 Tiles (Nov 6, 2025)
 * HOUSEKEEPING - White icons, copy update (Nov 6, 2025)
 * 
 * Now using:
 * - TwoColumnHeadlineClass (direct, not via TileGridSectionClass)
 * - TileClass for tiles
 * - Clean separation of concerns
 * - Premium optimized 3D assets (TinyPNG compressed)
 * - White icons for elegant contrast
 */

import { Heart, Brain, Target, Users } from 'lucide-react';
import { TwoColumnHeadlineClass, TileClass } from './marketing/universal';
import patientFirstTile from 'figma:asset/cc7840cbbd8d1a8f88d60e394cef871d68071a74.png'; // Optimized Nov 6
import scienceBackedTile from 'figma:asset/4512bacd3177d84aa1fb432217f220da76b115bd.png'; // Optimized Nov 6
import outcomeFocusedTile from 'figma:asset/41edc4acf1d683045c0034203132dd6797faebea.png'; // Optimized Nov 6
import radicallyInclusiveTile from 'figma:asset/ef396855705befebaa18a502ee5d867ac13b614d.png'; // Optimized Nov 6

const BRAND = {
  dark: '#3E2BB8',
  mid: '#5739FB',
  lightPurple: '#F5F3FF'
};

interface MissionSectionProps {}

export function StoryPageGlassMission({}: MissionSectionProps) {
  const values = [
    {
      icon: Heart,
      title: 'Patient First',
      description: 'Technology serves people, never the reverse',
      asset: patientFirstTile,
      color: '#FFFFFF', // White icons for elegant contrast
      gradientOverlay: `linear-gradient(135deg, ${BRAND.mid}06 0%, ${BRAND.mid}04 100%)`
    },
    {
      icon: Brain,
      title: 'Science Backed',
      description: 'Every feature maps to validated research',
      asset: scienceBackedTile,
      color: '#FFFFFF', // White icons for elegant contrast
      gradientOverlay: `linear-gradient(135deg, ${BRAND.dark}06 0%, ${BRAND.dark}04 100%)`
    },
    {
      icon: Target,
      title: 'Outcome Focused',
      description: 'Measure what matters, improve what we measure',
      asset: outcomeFocusedTile,
      color: '#FFFFFF', // White icons for elegant contrast
      gradientOverlay: 'linear-gradient(135deg, rgba(44, 153, 175, 0.06) 0%, rgba(44, 153, 175, 0.04) 100%)'
    },
    {
      icon: Users,
      title: 'Radically Inclusive',
      description: 'Recovery works when everyone has access',
      asset: radicallyInclusiveTile,
      color: '#FFFFFF', // White icons for elegant contrast
      gradientOverlay: 'linear-gradient(135deg, rgba(6, 182, 212, 0.06) 0%, rgba(6, 182, 212, 0.04) 100%)'
    }
  ];

  return (
    <section className="py-32 md:py-40 bg-[#F5F3FF]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-12">
        
        {/* Two-Column Headline - LEFT layout */}
        <TwoColumnHeadlineClass
          headline="Our Mission"
          headlineAccent="Mission"
          accentColor={BRAND.mid}
          tagline="Making patient-driven recovery accessible at scale"
          layout="left"
          marginBottom="mb-16"
        />
        
        {/* Tiles Grid - 1 row, 4 columns, matches Evidence Based sizing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mx-auto max-w-[1600px]">
          {values.map((value, idx) => (
            <TileClass
              key={idx}
              icon={value.icon}
              iconColor={value.color}
              title={value.title}
              description={value.description}
              backgroundAsset={value.asset}
              gradientOverlay={value.gradientOverlay}
              animationDelay={idx * 0.1}
              minHeight="280px"
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}
