import { motion } from 'motion/react';
import { SectionWrapper } from '../shared/SectionWrapper';
import { Headline } from '../shared/Headline';

export function ClinicalResilience() {
  return (
    <SectionWrapper background="darker" className="py-32">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <Headline level={2}>
          Your Own Journey
        </Headline>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xl text-white/70 leading-relaxed"
        >
          Professionals have journeys too. Installation for yourself. Clinical resilience without burnout. ATLAS for the clinician.
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
