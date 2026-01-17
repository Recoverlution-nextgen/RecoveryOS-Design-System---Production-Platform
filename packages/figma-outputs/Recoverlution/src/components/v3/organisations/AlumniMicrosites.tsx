import { motion } from 'motion/react';
import { SectionWrapper } from '../shared/SectionWrapper';
import { Headline } from '../shared/Headline';
import { Subhead } from '../shared/Subhead';
import { Globe, Shield, Users, BarChart } from 'lucide-react';

export function AlumniMicrosites() {
  const features = [
    { icon: Globe, label: 'Branded Hub', description: 'Your organization, your alumni, your ecosystem' },
    { icon: Shield, label: 'Private & Secure', description: 'Consent-based sharing, full privacy controls' },
    { icon: Users, label: 'Peer Support', description: 'Alumni connect through shared language and proof' },
    { icon: BarChart, label: 'Population Insights', description: 'Cohort-level installation tracking' }
  ];

  return (
    <SectionWrapper background="darker" className="py-32">
      <div className="text-center mb-16">
        <Headline level={2} className="mb-6">
          Alumni Microsites
        </Headline>
        <Subhead className="max-w-3xl mx-auto">
          Your continuity node. Eliminate the discharge cliff.
        </Subhead>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#3E2BB8]/30 to-[#5739FB]/30 border border-[#5739FB]/50 flex items-center justify-center">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">{feature.label}</h3>
              <p className="text-sm text-white/60">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
