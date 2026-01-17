import { motion } from 'motion/react';
import { SectionWrapper } from '../shared/SectionWrapper';
import { Headline } from '../shared/Headline';

export function The167Hours() {
  return (
    <SectionWrapper background="dark" className="py-32">
      <Headline level={2} className="mb-16">
        The 167 Hours
      </Headline>

      <div className="max-w-4xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="border-l-4 border-[#F59E0B] pl-8 py-4"
        >
          <h3 className="text-2xl font-semibold text-white mb-2">Session: 1 hour</h3>
          <p className="text-white/70">Initiation</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded p-8 text-center"
        >
          <p className="text-6xl font-bold text-white/30 mb-4">167</p>
          <p className="text-xl text-white/70">Hours where installation happens or dies</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="border-l-4 border-[#10B981] pl-8 py-4"
        >
          <h3 className="text-2xl font-semibold text-white mb-2">Next Session</h3>
          <p className="text-white/70">See what installed</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-2xl text-white font-semibold mt-16"
        >
          You initiate change. Recoverlution installs it.
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
