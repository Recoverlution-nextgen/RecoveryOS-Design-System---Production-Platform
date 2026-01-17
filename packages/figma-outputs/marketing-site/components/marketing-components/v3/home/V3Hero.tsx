import { motion } from 'motion/react';
import { SupabaseAsset } from '../shared/SupabaseAsset';
import { Headline } from '../shared/Headline';
import { Subhead } from '../shared/Subhead';
import { ChevronDown } from 'lucide-react';

export function V3Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <SupabaseAsset 
          tag="homepage-hero"
          alt="Abstract continuity network"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <Headline level={1} className="mb-6">
          The Continuity Infrastructure
        </Headline>
        
        <Subhead className="max-w-2xl mx-auto">
          The 167 hours where life actually happens.
        </Subhead>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-8 h-8 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
