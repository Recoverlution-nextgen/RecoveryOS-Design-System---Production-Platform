import { motion } from 'motion/react';
import { SectionWrapper } from '../shared/SectionWrapper';
import { Headline } from '../shared/Headline';
import { X, ArrowRight, Check } from 'lucide-react';

export function DischargeCliffVisualization() {
  return (
    <SectionWrapper id="discharge-cliff" background="dark" className="py-32">
      <Headline level={2} className="mb-20">
        The Discharge Cliff
      </Headline>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        {/* Problem */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <X className="w-8 h-8 text-red-500" />
            <h3 className="text-2xl font-semibold text-white">Current Reality</h3>
          </div>

          <div className="space-y-6">
            {['Patient completes program', 'Discharge', 'The Cliff', 'Relapse'].map((step, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${index === 2 ? 'bg-red-500' : 'bg-white/30'}`} />
                <p className={`text-lg ${index === 2 ? 'text-red-400 font-semibold' : 'text-white/70'}`}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Solution */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Check className="w-8 h-8 text-green-500" />
            <h3 className="text-2xl font-semibold text-white">With Recoverlution</h3>
          </div>

          <div className="space-y-6">
            {['Patient completes program', 'ATLAS activates', 'Continuity node', 'Sustained baseline'].map((step, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <p className="text-lg text-white/90">{step}</p>
                {index < 3 && (
                  <ArrowRight className="w-4 h-4 text-green-500/50" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-center text-2xl text-white/70 mt-16 max-w-3xl mx-auto"
      >
        You're not scaling content. You're scaling installations.
      </motion.p>
    </SectionWrapper>
  );
}
