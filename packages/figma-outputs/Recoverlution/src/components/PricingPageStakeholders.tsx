/**
 * PRICING PAGE - VALUE ACROSS STAKEHOLDERS SECTION
 * 
 * Universal tile system using TileGridSectionClass + TileClass
 * UNIVERSAL ASSET SYNC: Uses centralized stakeholder assets from /utils/section8Assets.tsx
 * 
 * ASSET SHARING: Homepage Section 8 "Measurable Impact" ↔ Pricing "Value across stakeholders"
 * Update stakeholder assets in ONE place → Automatic sync across BOTH pages!
 * 
 * Created: November 5, 2025 - Phase 6: Universal Tile Consolidation
 * Updated: November 6, 2025 - Batch 8: Universal stakeholder asset sync
 */

import { Shield, Target, Building2, Stethoscope, Award } from 'lucide-react';
import { TileGridSectionClass } from './marketing/universal/TileGridSectionClass';

// Stakeholder Assets - Centralized Repository (Shared with Homepage Section 8)
// Update assets in /utils/section8Assets.tsx for instant propagation to BOTH pages
import { 
  impactClinicalOptimized as clinicalOperationsAsset,      // Clinical Operations
  impactAccreditationOptimized as accreditationBodiesAsset, // Accreditation Bodies
  impactLeadershipOptimized as executiveLeadershipAsset,    // Executive Leadership
  impactRevenueOptimized as patientOutcomesAsset            // Patient Outcomes
} from '../utils/section8Assets';

const BRAND = {
  dark: '#3E2BB8',
  mid: '#5739FB',
  green: '#2C99AF',
};

export function PricingPageStakeholders() {
  return (
    <TileGridSectionClass
      background="#FAFAFA"
      eyebrow="STAKEHOLDER OUTCOMES"
      eyebrowIcon={<Award size={18} style={{ strokeWidth: 2 }} />}
      eyebrowColor={BRAND.mid}
      headline={
        <>
          Value across<br /><span style={{ color: BRAND.mid }}>stakeholders</span>
        </>
      }
      subheadline="Strategic differentiation recognized across the entire ecosystem."
      cleanVariant={true}
      tiles={[
        {
          // MAPS TO: Homepage Section 8 - Clinical Directors ("PROPRIETARY PRACTICE")
          backgroundAsset: clinicalOperationsAsset,
          backgroundAssetAlt: "Dark blue geometric shapes - Systematic architecture and operational excellence",
          icon: Target,
          iconColor: BRAND.green,
          title: 'Clinical Operations',
          description: 'Operational leverage through scalable therapeutic infrastructure',
          sectionColor: BRAND.green
        },
        {
          // MAPS TO: Homepage Section 8 - Accreditation Teams ("AUDIT-READY EVIDENCE")
          backgroundAsset: accreditationBodiesAsset,
          backgroundAssetAlt: "Pixelated sphere dispersing - Data verification and audit-ready evidence",
          icon: Shield,
          iconColor: BRAND.mid,
          title: 'Accreditation Bodies',
          description: 'Audit-ready proof of therapeutic fidelity and measured outcomes',
          sectionColor: BRAND.mid
        },
        {
          // MAPS TO: Homepage Section 8 - Executive Leadership ("SCALABLE OPERATIONS")
          backgroundAsset: executiveLeadershipAsset,
          backgroundAssetAlt: "Blue translucent sphere - Operational visibility and strategic clarity",
          icon: Building2,
          iconColor: BRAND.dark,
          title: 'Executive Leadership',
          description: 'Strategic positioning through verifiable competitive differentiation',
          sectionColor: BRAND.dark
        },
        {
          // MAPS TO: Homepage Section 8 - Revenue Leaders ("RECURRING GROWTH")
          backgroundAsset: patientOutcomesAsset,
          backgroundAssetAlt: "Purple/blue stacked shapes - Continuous engagement and sustained outcomes",
          icon: Stethoscope,
          iconColor: '#06B6D4',
          title: 'Patient Outcomes',
          description: 'Sustained recovery through continuous neuroadaptive engagement',
          sectionColor: '#06B6D4'
        }
      ]}
      columns={{
        mobile: 1,
        desktop: 2
      }}
      containerMaxWidth="max-w-[1200px]"
      tileMinHeight="340px"
    />
  );
}
