import { motion } from 'motion/react';
import { SupabaseAsset } from '../shared/SupabaseAsset';
import { Headline } from '../shared/Headline';
import { Subhead } from '../shared/Subhead';
import { CTAButton } from '../shared/CTAButton';

export function ProHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <SupabaseAsset tag="pro-page-hero" alt="Professional tools" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <Headline level={1} className="mb-6">
          The Work Holds Between Sessions
        </Headline>
        
        <Subhead className="max-w-3xl mx-auto mb-12">
          Session prep powered by installation tracking. See what held, what didn't, what to repair.
        </Subhead>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <CTAButton href="/v3/demo?audience=pro" variant="primary" size="lg">
            Schedule Demo
          </CTAButton>
          <CTAButton href="#proof-ledger" variant="outline" size="lg">
            Learn More
          </CTAButton>
        </div>
      </motion.div>
    </section>
  );
}
