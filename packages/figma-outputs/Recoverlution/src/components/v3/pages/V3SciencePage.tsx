/**
 * V3 SCIENCE PAGE
 * Eight Primitives. 20 Schemas. Auditable change.
 */

import { V3Layout } from '../layout/V3Layout';
import { ScienceHeroSection } from '../science/ScienceHeroSection';
import { EightPrimitivesSection } from '../science/EightPrimitivesSection';
import { SixPillarsSection } from '../science/SixPillarsSection';
import { TwoTaxonomiesSection } from '../science/TwoTaxonomiesSection';
import { HeatAndKBESection } from '../science/HeatAndKBESection';
import { VoicesAndApproachesSection } from '../science/VoicesAndApproachesSection';
import { ClinicalStackSection } from '../science/ClinicalStackSection';
import { AuditableChangeSection } from '../science/AuditableChangeSection';

export function V3SciencePage() {
  return (
    <V3Layout>
      <ScienceHeroSection />
      <EightPrimitivesSection />
      <SixPillarsSection />
      <TwoTaxonomiesSection />
      <HeatAndKBESection />
      <VoicesAndApproachesSection />
      <ClinicalStackSection />
      <AuditableChangeSection />
    </V3Layout>
  );
}
