import { V3Layout } from '../v3/layout/V3Layout';
import { motion } from 'motion/react';
import { SupabaseAsset } from '../v3/shared/SupabaseAsset';
import { Headline } from '../v3/shared/Headline';
import { Subhead } from '../v3/shared/Subhead';
import { CTAButton } from '../v3/shared/CTAButton';
import { SectionWrapper } from '../v3/shared/SectionWrapper';

export default function MarketingCompanionsPageV3() {
  return (
    <V3Layout>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SupabaseAsset tag="comp-page-hero" alt="Companion support" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <Headline level={1} className="mb-6">
            Support Without Suffocating
          </Headline>
          
          <Subhead className="max-w-3xl mx-auto mb-12">
            Navigate your own transformation while they navigate theirs. Consent-based. Boundary-respecting. Installation-powered.
          </Subhead>

          <CTAButton href="/v3/individuals" variant="primary" size="lg">
            Learn More
          </CTAButton>
        </motion.div>
      </section>

      {/* The Dilemma */}
      <SectionWrapper background="dark" className="py-32">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <Headline level={2}>
            You want to help. You don't know how.
          </Headline>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-6 text-xl text-white/70"
          >
            <p>The fear of enabling. The fear of making it worse. The fear of your own patterns interfering.</p>
            <p>You love them. You want to support them.</p>
            <p className="text-2xl text-white font-semibold pt-8">
              But where's the line between support and surveillance?
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Consent-Based Witnessing */}
      <SectionWrapper background="gradient" className="py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Headline level={2}>
            Consent-Based Witnessing
          </Headline>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-6 text-xl text-white/70"
          >
            <p>In Recoverlution, witnessing is one of the Eight Primitives. Not surveillance. Witnessing.</p>
            <p>They choose what you see. You celebrate proof (not perfection). Boundaries are infrastructure (not afterthoughts).</p>
            <p className="text-2xl text-white font-semibold pt-8">
              This is the Witness role. Primitive #8.
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Your Own Journey */}
      <SectionWrapper background="darker" className="py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Headline level={2}>
            But This Isn't Just About Them
          </Headline>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-6 text-xl text-white/70"
          >
            <p>You're carrying patterns too. Codependency. Enabling. Your own trauma responses.</p>
            <p>Companion journeys in Recoverlution are designed for YOU.</p>
            <p className="text-lg text-white/50">
              Relational repair sequences · Boundary sovereignty training · Your own installations · Your own proof
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Final CTA */}
      <section className="bg-black py-32">
        <div className="text-center space-y-8 max-w-3xl mx-auto px-6">
          <Headline level={2}>
            Support Starts With Your Own Installation
          </Headline>
          <CTAButton href="/v3/individuals" variant="primary" size="lg">
            Learn More
          </CTAButton>
        </div>
      </section>
    </V3Layout>
  );
}
