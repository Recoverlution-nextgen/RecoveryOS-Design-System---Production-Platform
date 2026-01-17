/**
 * V3 PLATFORM PAGE
 * Four-layer architecture. Clinical operating system.
 */

import { V3Layout } from '../layout/V3Layout';
import { PlatformHeroSection } from '../platform/PlatformHeroSection';
import { FourLayerArchitecture } from '../platform/FourLayerArchitecture';
import { JourneySpineSection } from '../platform/JourneySpineSection';
import { ProofAndTransferSection } from '../platform/ProofAndTransferSection';
import { RealTimeDecisionEngine } from '../platform/RealTimeDecisionEngine';
import { InstallationVsInformation } from '../platform/InstallationVsInformation';

export function V3PlatformPage() {
  return (
    <V3Layout>
      <PlatformHeroSection />
      <FourLayerArchitecture />
      <JourneySpineSection />
      <ProofAndTransferSection />
      <RealTimeDecisionEngine />
      <InstallationVsInformation />
    </V3Layout>
  );
}
