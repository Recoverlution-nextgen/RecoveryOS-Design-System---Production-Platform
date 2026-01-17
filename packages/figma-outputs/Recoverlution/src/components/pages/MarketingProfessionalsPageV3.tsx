import { V3Layout } from '../v3/layout/V3Layout';
import { ProHero } from '../v3/professionals/ProHero';
import { The167Hours } from '../v3/professionals/The167Hours';
import { ProofLedgerPreview } from '../v3/professionals/ProofLedgerPreview';
import { ClinicalResilience } from '../v3/professionals/ClinicalResilience';
import { CTAButton } from '../v3/shared/CTAButton';

export default function MarketingProfessionalsPageV3() {
  return (
    <V3Layout>
      <ProHero />
      <The167Hours />
      <ProofLedgerPreview />
      <ClinicalResilience />
      
      <section className="bg-black py-32">
        <div className="text-center space-y-8 max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Extend Your Clinical Work
          </h2>
          <p className="text-xl text-white/70">
            Between sessions. Where installation happens.
          </p>
          <CTAButton href="/v3/demo?audience=pro" variant="primary" size="lg">
            Schedule Demo
          </CTAButton>
        </div>
      </section>
    </V3Layout>
  );
}
