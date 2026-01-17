import { motion } from 'motion/react';
import { SupabaseAsset } from '../shared/SupabaseAsset';
import { Headline } from '../shared/Headline';
import { Subhead } from '../shared/Subhead';
import { CTAButton } from '../shared/CTAButton';

export function OrgHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <SupabaseAsset 
          tag="org-page-hero"
          alt="Organisation continuity infrastructure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <Headline level={1} className="mb-6">
          Scale Therapeutic Standard Without Losing Depth
        </Headline>
        
        <Subhead className="max-w-3xl mx-auto mb-12">
          Extend your inpatient protocols into lifelong installations. Prove outcomes with nervous system receipts.
        </Subhead>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <CTAButton href="/v3/demo?audience=org" variant="primary" size="lg">
            Schedule Demo
          </CTAButton>
          <CTAButton href="#discharge-cliff" variant="outline" size="lg">
            Learn More
          </CTAButton>
        </div>
      </motion.div>
    </section>
  );
}
