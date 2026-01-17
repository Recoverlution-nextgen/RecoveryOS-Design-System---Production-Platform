import { motion } from 'motion/react';
import { SectionWrapper } from '../shared/SectionWrapper';
import { Headline } from '../shared/Headline';
import { Subhead } from '../shared/Subhead';

export function ContinuityTimeline() {
  const initiationSteps = [
    "Session begins",
    "Insight lands",
    "Hope rises",
    "Session ends"
  ];

  const installationSteps = [
    "Moment of choice arrives",
    "Pattern activates",
    "New move executes",
    "Receipt captured",
    "Baseline shifts"
  ];

  return (
    <SectionWrapper background="dark" className="py-40">
      <div className="text-center mb-20">
        <Headline level={2} className="mb-6">
          Therapy initiates. Continuity installs.
        </Headline>
        <Subhead className="max-w-3xl mx-auto">
          The 167 hours between sessions is where change either takes root or dies.
        </Subhead>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Timeline 1: Initiation */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3E2BB8] to-[#5739FB]" />
          
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-white mb-8 pl-20">
              The Initiation
            </h3>
            
            {initiationSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="relative flex items-center"
              >
                <div className="absolute left-6 w-5 h-5 rounded-full bg-[#5739FB] border-2 border-white/50" />
                <div className="pl-20">
                  <p className="text-white/80 text-lg">{step}</p>
                </div>
              </motion.div>
            ))}

            {/* Gap Visualization */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.8 }}
              className="relative pl-20 py-8"
            >
              <div className="border-2 border-dashed border-white/20 rounded p-6 text-center">
                <p className="text-white/40 text-sm uppercase tracking-wider mb-2">
                  The Gap
                </p>
                <p className="text-white/60 text-2xl font-semibold">
                  167 hours
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Timeline 2: Installation */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#10B981] to-[#34D399]" />
          
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-white mb-8 pl-20">
              The Installation
            </h3>
            
            {installationSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (index + 2) * 0.2, duration: 0.5 }}
                className="relative flex items-center"
              >
                <div className="absolute left-6 w-5 h-5 rounded-full bg-[#10B981] border-2 border-white/50" />
                <div className="pl-20">
                  <p className="text-white/80 text-lg">{step}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 2, duration: 0.8 }}
        className="text-center mt-20 space-y-4 max-w-3xl mx-auto"
      >
        <p className="text-xl md:text-2xl text-white/80">
          Initiation is not installation.
        </p>
        <p className="text-xl md:text-2xl text-white/80">
          Installation is not integration.
        </p>
        <p className="text-xl md:text-2xl text-white/80">
          Integration is transfer under load.
        </p>
        <p className="text-2xl md:text-3xl text-white font-semibold mt-8">
          If it does not transfer under load, it is not installed.
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
