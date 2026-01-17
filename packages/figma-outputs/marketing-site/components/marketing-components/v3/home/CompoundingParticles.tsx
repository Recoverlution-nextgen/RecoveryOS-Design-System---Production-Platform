import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { SectionWrapper } from '../shared/SectionWrapper';
import { Headline } from '../shared/Headline';
import { Subhead } from '../shared/Subhead';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

export function CompoundingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize with one particle
    particlesRef.current = [{
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: 0,
      vy: 0,
      life: 1
    }];

    let frame = 0;

    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear with fade effect
      ctx.fillStyle = 'rgba(10, 11, 15, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Multiply particles organically
      frame++;
      if (frame % 3 === 0 && particlesRef.current.length < 2000) {
        const parent = particlesRef.current[Math.floor(Math.random() * particlesRef.current.length)];
        if (parent && Math.random() > 0.3) {
          particlesRef.current.push({
            x: parent.x + (Math.random() - 0.5) * 40,
            y: parent.y + (Math.random() - 0.5) * 40,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            life: 1
          });
        }
      }

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width || 
            particle.y < 0 || particle.y > canvas.height) {
          particlesRef.current.splice(index, 1);
          return;
        }

        // Draw particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, 4
        );
        gradient.addColorStop(0, `rgba(87, 57, 251, ${particle.life})`);
        gradient.addColorStop(0.5, `rgba(62, 43, 184, ${particle.life * 0.5})`);
        gradient.addColorStop(1, 'rgba(87, 57, 251, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Glow
        ctx.fillStyle = `rgba(87, 57, 251, ${particle.life * 0.1})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 8, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible]);

  return (
    <SectionWrapper background="dark" className="py-40">
      <div className="text-center mb-20">
        <Headline level={2} className="mb-6">
          What if change could compound?
        </Headline>
        <Subhead className="max-w-3xl mx-auto">
          One move. One receipt. One transfer. Then another. Then another.
        </Subhead>
      </div>

      {/* Particle Canvas */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-200px" }}
        onViewportEnter={() => setIsVisible(true)}
        transition={{ duration: 1 }}
        className="relative w-full h-[500px] max-w-5xl mx-auto rounded-lg overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ background: '#0A0B0F' }}
        />
      </motion.div>

      {/* Bottom Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-center mt-20 space-y-6 max-w-3xl mx-auto"
      >
        <p className="text-2xl md:text-3xl text-white font-semibold">
          This is not willpower.
        </p>
        <p className="text-2xl md:text-3xl text-white/70">
          This is architecture.
        </p>
        
        <div className="h-8" />
        
        <p className="text-2xl md:text-3xl text-white font-semibold">
          This is not motivation.
        </p>
        <p className="text-2xl md:text-3xl text-white/70">
          This is continuity.
        </p>
        
        <div className="h-8" />
        
        <p className="text-2xl md:text-3xl text-white font-semibold">
          This is not therapy software.
        </p>
        <p className="text-2xl md:text-3xl text-white/70">
          This is the operating system for becoming.
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
