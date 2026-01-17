import { V3Layout } from '../v3/layout/V3Layout';
import { PlatformHeroSection } from '../v3/platform/PlatformHeroSection';
import { FourLayerArchitecture } from '../v3/platform/FourLayerArchitecture';
import { JourneySpineSection } from '../v3/platform/JourneySpineSection';
import { InstallationVsInformation } from '../v3/platform/InstallationVsInformation';
import { RealTimeDecisionEngine } from '../v3/platform/RealTimeDecisionEngine';
import { ProofAndTransferSection } from '../v3/platform/ProofAndTransferSection';

export default function MarketingPlatformPageV3() {
  return (
    <V3Layout>
      <PlatformHeroSection />
      <FourLayerArchitecture />
      <JourneySpineSection />
      <InstallationVsInformation />
      <RealTimeDecisionEngine />
      <ProofAndTransferSection />
    </V3Layout>
  );
}
