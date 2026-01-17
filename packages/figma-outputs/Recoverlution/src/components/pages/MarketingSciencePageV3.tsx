import { V3Layout } from '../v3/layout/V3Layout';
import { ScienceHeroSection } from '../v3/science/ScienceHeroSection';
import { EightPrimitivesSection } from '../v3/science/EightPrimitivesSection';
import { TwoTaxonomiesSection } from '../v3/science/TwoTaxonomiesSection';
import { ClinicalStackSection } from '../v3/science/ClinicalStackSection';
import { SixPillarsSection } from '../v3/science/SixPillarsSection';
import { HeatAndKBESection } from '../v3/science/HeatAndKBESection';
import { VoicesAndApproachesSection } from '../v3/science/VoicesAndApproachesSection';
import { AuditableChangeSection } from '../v3/science/AuditableChangeSection';

export default function MarketingSciencePageV3() {
  return (
    <V3Layout>
      <ScienceHeroSection />
      <EightPrimitivesSection />
      <TwoTaxonomiesSection />
      <ClinicalStackSection />
      <SixPillarsSection />
      <HeatAndKBESection />
      <VoicesAndApproachesSection />
      <AuditableChangeSection />
    </V3Layout>
  );
}
