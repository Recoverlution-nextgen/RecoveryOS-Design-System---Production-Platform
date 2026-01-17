import { motion } from 'motion/react';
import { SectionWrapper } from '../shared/SectionWrapper';
import { Headline } from '../shared/Headline';
import { Subhead } from '../shared/Subhead';
import { Users, TrendingUp, Target } from 'lucide-react';

export function InstallationAtScale() {
  const metrics = [
    {
      icon: Users,
      label: 'Population Health',
      description: 'Track installation depth across your entire cohort'
    },
    {
      icon: TrendingUp,
      label: 'MTTR Trends',
      description: 'Mean Time To Return - see baseline restoration speed'
    },
    {
      icon: Target,
      label: 'Proof Ledger',
      description: 'Nervous system receipts, not engagement theater'
    }
  ];

  return (
    <SectionWrapper background="gradient" className="py-32">
      <div className="text-center mb-16">
        <Headline level={2} className="mb-6">
          How Installation Works at Scale
        </Headline>
        <Subhead className="max-w-2xl mx-auto">
          100 users → MTTR trends → Proof ledger
        </Subhead>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-white/5 border border-white/10 p-8 text-center space-y-4"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-[#5739FB]/20 flex items-center justify-center">
                <Icon className="w-8 h-8 text-[#5739FB]" />
              </div>
              <h3 className="text-xl font-semibold text-white">{metric.label}</h3>
              <p className="text-white/70">{metric.description}</p>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
