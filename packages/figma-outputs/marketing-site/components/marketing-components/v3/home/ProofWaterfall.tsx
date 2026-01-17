import { motion } from 'motion/react';
import { SectionWrapper } from '../shared/SectionWrapper';
import { Headline } from '../shared/Headline';
import { Subhead } from '../shared/Subhead';

interface FlowStep {
  label: string;
  overlay: string;
}

const flowSteps: FlowStep[] = [
  { label: "Moment arrives", overlay: "Regulate before reason. The body leads." },
  { label: "Pattern recognized", overlay: "Name it. Make it workable." },
  { label: "Move executed", overlay: "The right next inch. Small enough to repeat." },
  { label: "Receipt captured", overlay: "Proof the nervous system believes." },
  { label: "Transfer tested", overlay: "Does it hold when life gets loud?" },
  { label: "Baseline shifts", overlay: "Return speed, not perfection. Repair beats streaks." }
];

export function ProofWaterfall() {
  return (
    <SectionWrapper background="darker" className="py-40">
      <div className="text-center mb-20">
        <Headline level={2} className="mb-6">
          The installation becomes measurable.
        </Headline>
        <Subhead className="max-w-3xl mx-auto">
          Not through surveillance. Through sovereignty.
        </Subhead>
      </div>

      {/* Waterfall Flow */}
      <div className="max-w-3xl mx-auto space-y-12">
        {flowSteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              delay: index * 0.2, 
              duration: 0.8,
              ease: 'easeOut'
            }}
            className="relative"
          >
            {/* Connection Line */}
            {index < flowSteps.length - 1 && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-[#5739FB] to-transparent" />
            )}

            {/* Step Container */}
            <div className="relative group">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#3E2BB8]/0 via-[#5739FB]/10 to-[#3E2BB8]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

              {/* Content */}
              <div className="relative bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-8 text-center space-y-4">
                {/* Step Label */}
                <h3 className="text-2xl md:text-3xl font-semibold text-white">
                  {step.label}
                </h3>

                {/* Step Number */}
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#5739FB]/20 border-2 border-[#5739FB] flex items-center justify-center text-white font-semibold">
                    {index + 1}
                  </div>
                </div>

                {/* Overlay Text */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index * 0.2) + 0.3, duration: 0.6 }}
                  className="text-lg text-white/60 italic max-w-xl mx-auto"
                >
                  "{step.overlay}"
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
