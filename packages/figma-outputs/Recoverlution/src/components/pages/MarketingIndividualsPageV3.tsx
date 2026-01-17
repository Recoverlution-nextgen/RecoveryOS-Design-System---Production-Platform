import { V3Layout } from '../v3/layout/V3Layout';
import { motion } from 'motion/react';
import { SupabaseAsset } from '../v3/shared/SupabaseAsset';
import { Headline } from '../v3/shared/Headline';
import { Subhead } from '../v3/shared/Subhead';
import { CTAButton } from '../v3/shared/CTAButton';
import { SectionWrapper } from '../v3/shared/SectionWrapper';

export default function MarketingIndividualsPageV3() {
  return (
    <V3Layout>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SupabaseAsset tag="ind-page-hero" alt="Individual journey" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <Headline level={1} className="mb-6">
            Transform How You Relate to Yourself
          </Headline>
          
          <Subhead className="max-w-3xl mx-auto mb-12">
            Journeys that install, not inform. Proof that change is real.
          </Subhead>

          <CTAButton href="/signup" variant="primary" size="lg">
            Start Your First Journey
          </CTAButton>
        </motion.div>
      </section>

      {/* The Problem */}
      <SectionWrapper background="dark" className="py-32">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <Headline level={2}>
            You know what to do. Why doesn't it stick?
          </Headline>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-6 text-xl text-white/70"
          >
            <p>The relapse. The willpower gap. The knowing without doing.</p>
            <p>You've read the books. Listened to the podcasts. Understood the patterns.</p>
            <p className="text-2xl text-white font-semibold pt-8">
              And yet, when the moment arrives, the old pattern wins.
            </p>
            <p className="text-lg text-white/50 italic pt-4">
              It's not a failure of will. It's a failure of installation.
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* The Solution */}
      <SectionWrapper background="gradient" className="py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Headline level={2}>
            What if change could install, not just inform?
          </Headline>
          
          <Subhead className="max-w-3xl mx-auto">
            ATLAS doesn't give you more information. It installs new responses at the nervous system level.
          </Subhead>

          <p className="text-xl text-white/70">
            Not through willpower. Through the Eight Primitives.
          </p>
        </div>
      </SectionWrapper>

      {/* How It Works */}
      <SectionWrapper background="darker" className="py-32">
        <Headline level={2} className="mb-16 text-center">
          Your Daily Installation Protocol
        </Headline>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { title: 'Daily NaviCues', desc: 'Context-adaptive micro-interventions. 90 seconds each.' },
            { title: 'Proof Capture', desc: 'Receipt after each move. Your installation timeline.' },
            { title: 'Transfer Tests', desc: 'Does it hold in real life? Proof under load.' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/5 border border-white/10 p-8 text-center space-y-4"
            >
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="text-white/70">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Final CTA */}
      <section className="bg-black py-32">
        <div className="text-center space-y-8 max-w-3xl mx-auto px-6">
          <Headline level={2}>
            Your First Installation Starts Now
          </Headline>
          <p className="text-xl text-white/70">
            The 167 hours are waiting.
          </p>
          <CTAButton href="/signup" variant="primary" size="lg">
            Start Your First Journey
          </CTAButton>
        </div>
      </section>
    </V3Layout>
  );
}
