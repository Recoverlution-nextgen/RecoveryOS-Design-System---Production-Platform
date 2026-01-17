import { motion } from 'motion/react';
import { SectionWrapper } from '../shared/SectionWrapper';

export function EndOfInformation() {
  const lines = [
    { text: "The world is dying of answers.", delay: 0 },
    { text: "Books. Podcasts. More insight than we know what to do with.", delay: 0.3 },
    { text: "", delay: 0.6, isPause: true },
    { text: "And yet.", delay: 0.9, isEmphasis: true },
    { text: "", delay: 1.2, isPause: true },
    { text: "Information does not rewire a nervous system.", delay: 1.5, isHighlight: true },
    { text: "", delay: 1.8, isPause: true },
    { text: "A brain hardwired by pattern does not fail because it lacks insight.", delay: 2.1 },
    { text: "It fails because the moment of decision is a neurobiological hijack.", delay: 2.4 },
    { text: "Body first. Story second. Behavior third.", delay: 2.7 },
    { text: "", delay: 3, isPause: true },
    { text: "To change the outcome, we must change the installation.", delay: 3.3, isHighlight: true }
  ];

  return (
    <SectionWrapper background="gradient" className="py-40">
      <div className="max-w-4xl mx-auto space-y-8">
        {lines.map((line, index) => {
          if (line.isPause) {
            return <div key={index} className="h-12" />;
          }

          return (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: line.delay * 0.3,
                ease: "easeOut" 
              }}
              className={`
                text-center leading-relaxed
                ${line.isHighlight 
                  ? 'text-3xl md:text-4xl font-semibold text-white' 
                  : line.isEmphasis
                  ? 'text-2xl md:text-3xl font-medium text-white/90 italic'
                  : 'text-xl md:text-2xl text-white/70'
                }
              `}
            >
              {line.text}
            </motion.p>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
