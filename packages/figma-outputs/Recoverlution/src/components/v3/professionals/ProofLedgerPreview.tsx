import { motion } from 'motion/react';
import { SectionWrapper } from '../shared/SectionWrapper';
import { Headline } from '../shared/Headline';
import { TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

export function ProofLedgerPreview() {
  return (
    <SectionWrapper id="proof-ledger" background="gradient" className="py-32">
      <Headline level={2} className="mb-6 text-center">
        Your Patients' Installation Timeline
      </Headline>
      <p className="text-center text-xl text-white/70 mb-16 max-w-3xl mx-auto">
        Not just "how are you?" — "what installed and what needs repair?"
      </p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto bg-white/5 border border-white/10 p-8"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Patient: J.M.</h3>
            <span className="text-sm text-white/50">Week 4 of 12</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-sm text-white/70">MTTR Trend</span>
              </div>
              <p className="text-2xl font-bold text-white">4.2 min</p>
              <p className="text-xs text-green-500">↓ from 12 min</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-white/70">Receipts This Week</span>
              </div>
              <p className="text-2xl font-bold text-white">12</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-white/70">Repair Opportunities</span>
              </div>
              <p className="text-2xl font-bold text-white">2</p>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
