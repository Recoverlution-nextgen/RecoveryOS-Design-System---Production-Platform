/**
 * PRICING PAGE - ECONOMICS THAT COMPOUND SECTION
 * 
 * Universal tile system using TileGridSectionClass + TileClass
 * Converted from inline implementation (MarketingPricingPageV8Strategic.tsx lines 282-510)
 * 
 * Created: November 5, 2025 - Phase 6: Universal Tile Consolidation
 * Optimized: November 6, 2025 - All 3 tiles assets updated
 */

import { Repeat, Zap, TrendingUp, Sparkles } from 'lucide-react';
import { TileGridSectionClass } from './marketing/universal/TileGridSectionClass';

// Economics Assets - All Optimized Nov 6
import constraintAsset from 'figma:asset/9dc2ecce2f5fd5036962eb55c0c40a0ba6b63865.png'; // Optimized Nov 6
import extensionAsset from 'figma:asset/46ab9d9f40ab3d5fb9133636e8fce5fa5e046d9a.png'; // Optimized Nov 6
import transformationAsset from 'figma:asset/8f1e40defef80f48d2494e4b60c6e097186d72ad.png'; // Optimized Nov 6

const BRAND = {
  dark: '#3E2BB8',
  mid: '#5739FB',
  cyan: '#40E0D0',
  green: '#2C99AF',
};

export function PricingPageEconomics() {
  return (
    <TileGridSectionClass
      background="#FFFFFF"
      eyebrow="THE EVIDENCE ERA"
      eyebrowColor={BRAND.mid}
      EyebrowIcon={Sparkles}
      headline={
        <>
          Economics that<br /><span style={{ color: BRAND.mid }}>compound</span>
        </>
      }
      subheadline="The future of treatment economics is not episodic. It's relational, scalable, and proven."
      tiles={[
        {
          backgroundAsset: constraintAsset,
          backgroundAssetAlt: "Strategic transformation visual representing continuous care economics",
          eyebrowBadge: 'LIFETIME VALUE',
          icon: Repeat,
          iconColor: BRAND.mid,
          title: 'Recurring Revenue Architecture',
          description: 'Extended engagement delivers therapeutic depth when the brain can encode patterns. Monthly recurring revenue replaces episodic transactions.',
          buzzTags: ['Relational Economics', 'Continuous Revenue', 'Alumni Infrastructure'],
          watermarkNumber: '01',
          sectionColor: BRAND.mid
        },
        {
          backgroundAsset: extensionAsset,
          backgroundAssetAlt: "Blue and purple geometric blocks representing expertise scaling",
          eyebrowBadge: 'INFINITE SCALE',
          icon: Zap,
          iconColor: BRAND.green,
          title: 'Capacity Without Headcount',
          description: 'Clinical insight encoded into adaptive infrastructure. Quality maintained across infinite scale. Waitlists eliminated through intelligent automation.',
          buzzTags: ['Scalable Intelligence', 'Infinite Reach', 'Zero Constraints'],
          watermarkNumber: '02',
          sectionColor: BRAND.green
        },
        {
          backgroundAsset: transformationAsset,
          backgroundAssetAlt: "Strategic transformation visual representing measurable outcomes",
          eyebrowBadge: 'STRATEGIC PROOF',
          icon: TrendingUp,
          iconColor: BRAND.dark,
          title: 'Outcomes That Close Contracts',
          description: 'Continuous measurement transforms clinical quality into auditable data streams. Cohort outcomes command pricing power. Evidence drives contracts.',
          buzzTags: ['Longitudinal Evidence', 'Auditable Data', 'Competitive Moat'],
          watermarkNumber: '03',
          sectionColor: BRAND.dark
        }
      ]}
      columns={{
        mobile: 1,
        desktop: 3
      }}
      containerMaxWidth="max-w-[1200px]"
      tileMinHeight="360px"
    />
  );
}
