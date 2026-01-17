/**
 * V3 HOMEPAGE
 * Category-defining reveal with ATLAS constellation
 */

import { V3Layout } from '../layout/V3Layout';
import { V3Hero } from '../home/V3Hero';
import { AtlasConstellation } from '../home/AtlasConstellation';
import { ProofWaterfall } from '../home/ProofWaterfall';
import { PathInvitation } from '../home/PathInvitation';
import { FinalMoment } from '../home/FinalMoment';

export function V3HomePage() {
  return (
    <V3Layout>
      <V3Hero />
      <AtlasConstellation />
      <ProofWaterfall />
      <PathInvitation />
      <FinalMoment />
    </V3Layout>
  );
}
