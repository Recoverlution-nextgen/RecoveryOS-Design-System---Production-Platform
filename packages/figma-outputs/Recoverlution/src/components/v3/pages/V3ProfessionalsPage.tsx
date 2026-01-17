/**
 * V3 PROFESSIONALS PAGE
 * The work holds between sessions
 */

import { V3Layout } from '../layout/V3Layout';
import { ProHero } from '../professionals/ProHero';
import { The167Hours } from '../professionals/The167Hours';
import { ProofLedgerPreview } from '../professionals/ProofLedgerPreview';
import { ClinicalResilience } from '../professionals/ClinicalResilience';

export function V3ProfessionalsPage() {
  return (
    <V3Layout>
      <ProHero />
      <The167Hours />
      <ProofLedgerPreview />
      <ClinicalResilience />
    </V3Layout>
  );
}
