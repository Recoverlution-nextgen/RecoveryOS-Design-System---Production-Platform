import { V3Layout } from '../v3/layout/V3Layout';
import { OrgHero } from '../v3/organisations/OrgHero';
import { DischargeCliffVisualization } from '../v3/organisations/DischargeCliffVisualization';
import { InstallationAtScale } from '../v3/organisations/InstallationAtScale';
import { AlumniMicrosites } from '../v3/organisations/AlumniMicrosites';
import { CTAButton } from '../v3/shared/CTAButton';

export default function MarketingOrganisationsPageV3() {
  return (
    <V3Layout>
      <OrgHero />
      <DischargeCliffVisualization />
      <InstallationAtScale />
      <AlumniMicrosites />
      
      {/* Final CTA */}
      <section className="bg-gradient-to-b from-[#0A0B0F] to-black py-32">
        <div className="text-center space-y-8 max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Scale Your Standard of Care
          </h2>
          <p className="text-xl text-white/70">
            Not through content. Through installation.
          </p>
          <CTAButton href="/v3/demo?audience=org" variant="primary" size="lg">
            Schedule Demo
          </CTAButton>
        </div>
      </section>
    </V3Layout>
  );
}
