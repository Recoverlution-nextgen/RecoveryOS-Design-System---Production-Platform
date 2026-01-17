import { motion } from 'motion/react';
import { SectionWrapper } from '../shared/SectionWrapper';
import { Headline } from '../shared/Headline';
import { CTAButton } from '../shared/CTAButton';

interface PathCard {
  icon: string;
  label: string;
  description: string;
  href: string;
  ctaText: string;
  color: string;
}

const paths: PathCard[] = [
  {
    icon: '🏔️',
    label: 'Organisations',
    description: 'Extend your standard of care into lifelong continuity.',
    href: '/v3/organisations',
    ctaText: 'Explore',
    color: '#3E2BB8'
  },
  {
    icon: '🪶',
    label: 'Professionals',
    description: 'The work you do in session, held between sessions.',
    href: '/v3/professionals',
    ctaText: 'Explore',
    color: '#F59E0B'
  },
  {
    icon: '🌅',
    label: 'Individuals',
    description: 'The return to baseline. Proven, not promised.',
    href: '/v3/individuals',
    ctaText: 'Begin',
    color: '#5739FB'
  },
  {
    icon: '🌿',
    label: 'Companions',
    description: 'Navigate your own transformation while supporting theirs.',
    href: '/v3/companions',
    ctaText: 'Begin',
    color: '#10B981'
  }
];

export function PathInvitation() {
  return (
    <SectionWrapper background="gradient" className="py-40">
      <div className="text-center mb-20">
        <Headline level={2}>
          The scaffold is ready.
        </Headline>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {paths.map((path, index) => (
          <motion.div
            key={path.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative"
          >
            {/* Glow effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10"
              style={{ background: `${path.color}33` }}
            />

            {/* Card */}
            <div className="h-full bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-8 flex flex-col items-center text-center space-y-6">
              {/* Icon */}
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                style={{ 
                  background: `linear-gradient(135deg, ${path.color}33, ${path.color}11)`,
                  border: `2px solid ${path.color}55`
                }}
              >
                {path.icon}
              </div>

              {/* Label */}
              <h3 className="text-2xl font-semibold text-white">
                {path.label}
              </h3>

              {/* Description */}
              <p className="text-white/70 leading-relaxed flex-1">
                {path.description}
              </p>

              {/* CTA */}
              <div className="w-full pt-4">
                <CTAButton
                  href={path.href}
                  variant="outline"
                  className="w-full group-hover:bg-white group-hover:text-[#3E2BB8] transition-all duration-300"
                >
                  {path.ctaText} →
                </CTAButton>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
