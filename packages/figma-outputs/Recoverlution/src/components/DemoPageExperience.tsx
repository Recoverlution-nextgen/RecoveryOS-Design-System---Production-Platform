/**
 * DEMO PAGE - WHAT YOU'LL EXPERIENCE SECTION
 * 
 * Universal tile system using TileGridSectionClass + TileClass
 * Converted from inline implementation (MarketingDemoPageV2.tsx lines 201+)
 * 
 * ASSETS OPTIMIZED: November 6, 2025
 * - All 3 tile backgrounds replaced with premium blue 3D platform assets
 * - TinyPNG compressed for performance
 * - Consistent blue gradient aesthetic across all tiles
 * 
 * Created: November 5, 2025 - Phase 6: Universal Tile Consolidation
 */

import { Brain, Target, Award, Video } from 'lucide-react';
import { TileGridSectionClass } from './marketing/universal/TileGridSectionClass';

// Experience Assets - Optimized Nov 6
import platformOverviewTile from 'figma:asset/0a100b02f8ad475d89a631d91ed646d0e477c956.png'; // Optimized Nov 6
import useCaseTile from 'figma:asset/26b29da0e999b24303fba3719cc962eb21544dee.png'; // Optimized Nov 6
import outcomesRoiTile from 'figma:asset/1c8b0a30ed326b0f559a11bb4767e9bbfe228fa2.png'; // Optimized Nov 6

const BRAND = {
  mid: '#5739FB',
};

export function DemoPageExperience() {
  return (
    <TileGridSectionClass
      background="#FAFAFA"
      eyebrow="THE DEMO"
      eyebrowIcon={<Video size={18} style={{ strokeWidth: 2 }} />}
      eyebrowColor={BRAND.mid}
      headline={
        <>
          What you'll{' '}
          <span style={{ 
            color: BRAND.mid,
            textShadow: `0 0 40px ${BRAND.mid}40`
          }}>
            experience
          </span>
        </>
      }
      subheadline="A personalized walkthrough tailored to your facility's needs"
      tiles={[
        {
          backgroundAsset: platformOverviewTile,
          backgroundAssetAlt: 'Premium blue 3D stepped podium platform on gradient background',
          icon: Brain,
          iconColor: '#FFFFFF',
          title: 'Platform Overview',
          description: 'Tour the full Recoverlution ecosystem from patient perspective and clinical dashboard',
          upperBadge: '10 min',
          buzzTags: ['Six Pillars architecture', 'ERA framework in action', 'LUMA companion'],
          sectionColor: BRAND.mid
        },
        {
          backgroundAsset: useCaseTile,
          backgroundAssetAlt: 'Premium blue 3D circular platforms with sphere on gradient background',
          icon: Target,
          iconColor: '#FFFFFF',
          title: 'Your Use Case',
          description: 'Deep dive into features most relevant to your facility\'s approach and patient population',
          upperBadge: '10 min',
          buzzTags: ['Custom content integration', 'Analytics & reporting', 'Workflow optimization'],
          sectionColor: BRAND.mid
        },
        {
          backgroundAsset: outcomesRoiTile,
          backgroundAssetAlt: 'Premium blue 3D geometric platforms with sphere on gradient background',
          icon: Award,
          iconColor: '#FFFFFF',
          title: 'Outcomes & ROI',
          description: 'Align our platform with your strategic goals and success metrics',
          upperBadge: '10 min',
          buzzTags: ['Map to your KPIs', 'Strategic outcome alignment', 'Implementation timeline'],
          sectionColor: BRAND.mid
        }
      ]}
      columns={{
        mobile: 1,
        desktop: 3
      }}
      containerMaxWidth="max-w-[1600px]"
    />
  );
}
