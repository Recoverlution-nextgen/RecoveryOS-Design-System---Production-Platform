import { V3Layout } from '../v3/layout/V3Layout';
import { V3Hero } from '../v3/home/V3Hero';
import { EndOfInformation } from '../v3/home/EndOfInformation';
import { AtlasConstellation } from '../v3/home/AtlasConstellation';
import { ContinuityTimeline } from '../v3/home/ContinuityTimeline';
import { JourneyConstellation } from '../v3/home/JourneyConstellation';
import { ProofWaterfall } from '../v3/home/ProofWaterfall';
import { CompoundingParticles } from '../v3/home/CompoundingParticles';
import { PathInvitation } from '../v3/home/PathInvitation';
import { FinalMoment } from '../v3/home/FinalMoment';

export default function MarketingHomePageV3() {
  return (
    <V3Layout>
      <V3Hero />
      <EndOfInformation />
      <AtlasConstellation />
      <ContinuityTimeline />
      <JourneyConstellation />
      <ProofWaterfall />
      <CompoundingParticles />
      <PathInvitation />
      <FinalMoment />
    </V3Layout>
  );
}
