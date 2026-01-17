/**
 * V3 HERO - UPDATED WITH RECOVERYOS MESSAGING
 * infiniteK design system: NO ROUNDED CORNERS, NO CARD ON CARD
 */

import { ArrowRight } from 'lucide-react';

export function V3HeroUpdated() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-20 bg-gradient-to-br from-[#0A0B0F] via-[#1a0f2e] to-[#0A0B0F]">
      <div className="max-w-5xl mx-auto text-center">
        {/* Overline */}
        <div className="mb-8 text-sm tracking-widest text-zinc-500 uppercase">
          Recovery OS
        </div>
        
        {/* Main Hero */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
          Recovery now runs<br />in real life.
        </h1>
        
        {/* Subheading */}
        <p className="text-2xl md:text-3xl text-zinc-400 mb-4">
          As a living operating system for <span className="text-[#5739FB]">momentum</span>.
        </p>
        
        {/* Supporting text */}
        <p className="text-lg text-zinc-500 mb-12 max-w-2xl mx-auto">
          Because recovery isn't a label. It's motion.<br />
          A path of becoming.
        </p>
        
        {/* Category Sentence - infiniteK design: spacing-based separation */}
        <div className="p-8 bg-zinc-900/50 border border-zinc-800 max-w-4xl mx-auto mb-12">
          <p className="text-sm text-zinc-400 mb-4 uppercase tracking-wide">The Core Shift</p>
          <p className="text-xl md:text-2xl text-zinc-200 leading-relaxed">
            RecoveryOS is a <span className="text-[#3E2BB8] font-bold">neuroadaptive operating system</span> that turns recovery into momentum — by routing lived experience, in real time, until new pathways become default.
          </p>
        </div>

        {/* CTA */}
        <a 
          href="#how-it-works"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors text-lg font-medium"
        >
          See how it works
          <ArrowRight className="w-5 h-5" />
        </a>

        {/* Biology note */}
        <div className="mt-16 p-6 bg-zinc-900/30 border-l-2 border-[#5739FB] max-w-3xl mx-auto">
          <p className="text-sm text-zinc-400 mb-2 uppercase tracking-wide">The Biology</p>
          <p className="text-lg text-zinc-300">
            Under heat, the brain defaults to the fastest learned pathway.
          </p>
          <p className="text-zinc-500 mt-2">
            So we don't build for the perfect scenario. We build for real life.
          </p>
        </div>
      </div>
    </section>
  );
}

export default V3HeroUpdated;
