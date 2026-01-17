/**
 * DEMO PAGE - OUR PROMISE TO YOU SECTION
 * 
 * Universal tile system using TileGridSectionClass + TileClass
 * Converted from inline implementation (MarketingDemoPageV2.tsx lines 486-724)
 * 
 * ASSETS OPTIMIZED: November 6, 2025
 * - All 3 tile backgrounds replaced with premium blue 3D assets
 * - TinyPNG compressed for performance
 * - Consistent blue gradient aesthetic matching "What You'll Experience" section
 * 
 * Created: November 5, 2025 - Phase 6: Universal Tile Consolidation Complete
 */

import { Users, Sparkles, Target, Star } from 'lucide-react';
import { TileGridSectionClass } from './marketing/universal/TileGridSectionClass';

// Promise Assets - Optimized Nov 6
import partnershipTile from 'figma:asset/ddc39c0c9db2e5b12eaab3388621641fcaecd6ca.png'; // Optimized Nov 6
import blueSkyTile from 'figma:asset/3207c174b8dab3ca98c7ccd669d2f5f0b8e93be3.png'; // Optimized Nov 6
import flourishTile from 'figma:asset/bf583364a94d38355864d3994c8f67f682ec3b8e.png'; // Optimized Nov 6

const BRAND = {
  mid: '#5739FB',
  cyan: '#40E0D0',
};

export function DemoPagePromise() {
  return (
    <TileGridSectionClass
      background="#FFFFFF"
      eyebrow="OUR COMMITMENT"
      eyebrowIcon={<Star size={18} style={{ strokeWidth: 2 }} />}
      eyebrowColor={BRAND.mid}
      headline={
        <>
          Our promise{' '}
          <span style={{ color: BRAND.mid }}>
            to you
          </span>
        </>
      }
      subheadline="We are the sum of our parts. Together, we spark the next generation of recovery."
      tiles={[
        {
          backgroundAsset: partnershipTile,
          backgroundAssetAlt: 'Premium blue 3D geometric frames on gradient background',
          icon: Users,
          iconColor: '#FFFFFF',
          title: 'Partnership, Not Vendor',
          description: 'Your success defines ours. We build together, learn together, and grow together as recovery evolves.',
          sectionColor: BRAND.mid,
          variant: 'iconInline'
        },
        {
          backgroundAsset: blueSkyTile,
          backgroundAssetAlt: 'Premium blue 3D tunnel corridor with vertical panels on gradient background',
          icon: Sparkles,
          iconColor: '#FFFFFF',
          title: 'Blue Sky Thinking',
          description: 'No ceiling on innovation. Where you see opportunity, we see possibility. Your vision shapes our roadmap.',
          sectionColor: BRAND.mid,
          variant: 'iconInline'
        },
        {
          backgroundAsset: flourishTile,
          backgroundAssetAlt: 'Premium blue 3D flowing wave curves on gradient background',
          icon: Target,
          iconColor: '#FFFFFF',
          title: 'You Flourish, We Flourish',
          description: 'Every patient breakthrough, every clinical insight, every moment of progress becomes part of our shared mission.',
          sectionColor: BRAND.cyan,
          variant: 'iconInline'
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
