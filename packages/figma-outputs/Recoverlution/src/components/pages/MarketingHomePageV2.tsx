/**
 * MARKETING HOMEPAGE V2
 * 
 * HERO: Universal HeroClass component
 * TYPOGRAPHY: Locked system (see /HERO-TYPOGRAPHY-SYSTEM-LOCKED.md)
 * OPTIMIZATION: Production-ready (lazy loading, SEO, clean code)
 * 
 * Updated: November 5, 2025 - Phase 5: V2 Naming Standardization
 */

import React from 'react';
import { Sparkles } from 'lucide-react';
import { MarketingHeader } from '../MarketingHeader';
import { MarketingFooter } from '../MarketingFooter';
import { SEOHead } from '../SEOHead';
import { getPageSEO } from '../../utils/seo';
import { STRUCTURED_DATA } from '../../utils/structuredData';
import { HeroClass } from '../marketing/universal/HeroClass';
import Section2ArchitectingDNAV2 from '../Section2ArchitectingDNAV2Mobile';
import Section3EconomicsThatCompound from '../Section4BEconomicsThatCompound';
import Section4TransformTreatmentV2 from '../Section4TransformTreatmentV2';
import Section5UnbreakableFoundationsV2 from '../Section5UnbreakableFoundationsV2';
import Section6AlwaysOnLifetimeCareV2 from '../Section6AlwaysOnLifetimeCareV2';
import Section7ValidatedByScienceV2 from '../Section7ValidatedByScienceV2';
import Section8MeasurableImpactV2 from '../Section8MeasurableImpactV2';
import FinalCTAClean from '../FinalCTAClean';

// ASSETS
// Hero - Nov 6, 2025 Optimized
import { heroHomeOptimized } from '../../utils/heroAssets';
// Final CTA
import homeAsset from 'figma:asset/d50b0d6be0241b0a7a9bd35c1faf822b67aeef05.png'; // home-finalcta-spotlight-blue

interface MarketingHomePageProps {
  onEnterPlatform?: () => void;
  onNavigate?: (page: string) => void;
  onScheduleDemo?: () => void;
}

// Brand colors now managed in /utils/sectionStyles.tsx (BRAND_COLORS)

// Unused data structures removed during production cleanup (Nov 4, 2025)
// These were legacy carousel/features data not rendered in current implementation

export default function MarketingHomePage({ onEnterPlatform, onNavigate, onScheduleDemo }: MarketingHomePageProps) {
  const seo = getPageSEO('home');

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        {...seo} 
        structuredData={[
          STRUCTURED_DATA.organization,
          STRUCTURED_DATA.softwareApplication,
          STRUCTURED_DATA.service
        ]}
      />

      {/* Master Marketing Header */}
      <MarketingHeader 
        onNavigate={onNavigate}
        onEnterPlatform={onEnterPlatform}
        currentPage="home"
      />

      {/* 🎨 HERO - Universal Component */}
      <HeroClass
        eyebrow="THE PLATFORM RECOVERING WITH YOU"
        eyebrowIcon={
          <Sparkles 
            size={14}
            style={{ strokeWidth: 2.5 }} 
          />
        }
        headline={
          <>
            Recovery.<br />
            <span style={{ color: '#40E0D0' }}>
              Reimagined.
            </span>
          </>
        }
        subheadline="Extend your inpatient therapeutic standard into seamless patient-driven lifelong care. Neuroscience-backed, clinically validated, infinitely scalable."
        ctaText="SCHEDULE DEMO"
        ctaOnClick={() => onScheduleDemo?.()}
        backgroundAsset={heroHomeOptimized}
        backgroundAssetAlt="Abstract wavy brain visualization representing neuroadaptive recovery platform and cognitive transformation through neuroscience-backed therapeutic content"
        backgroundFilter="brightness(0.85) saturate(1.1)"
        overlayGradient="linear-gradient(180deg, rgba(10, 25, 47, 0.3) 0%, rgba(10, 25, 47, 0.1) 50%, rgba(10, 25, 47, 0.3) 100%)"
      />

      {/* 🧬 SECTION 2: ARCHITECTING THE DNA OF CARE */}
      <Section2ArchitectingDNAV2 />

      {/* 💫 SECTION 3: ECONOMICS THAT COMPOUND */}
      <Section3EconomicsThatCompound />

      {/* 💫 SECTION 4: TRANSFORM YOUR TREATMENT */}
      <Section4TransformTreatmentV2 />

      {/* 🛡️ SECTION 5: UNBREAKABLE FOUNDATIONS */}
      <Section5UnbreakableFoundationsV2 />

      {/* 💫 SECTION 6: ALWAYS-ON LIFETIME CARE */}
      <Section6AlwaysOnLifetimeCareV2 />

      {/* 🧪 SECTION 7: VALIDATED BY SCIENCE */}
      <Section7ValidatedByScienceV2 />

      {/* 🎯 SECTION 8: MEASURABLE IMPACT */}
      <Section8MeasurableImpactV2 />

      {/* 💎 FINAL CTA */}
      <FinalCTAClean 
        backgroundAsset={homeAsset}
        eyebrow="DELIVER EXCEPTIONAL OUTCOMES"
        headline="Ready to Transform Your Treatment?"
        accentWord="Transform"
        subtext="Join leading rehab facilities delivering exceptional recovery outcomes with Recoverlution."
        buttonText="SCHEDULE DEMO"
        onButtonClick={onScheduleDemo}
      />

      {/* Master Marketing Footer */}
      <MarketingFooter onNavigate={onNavigate} />

    </div>
  );
}
