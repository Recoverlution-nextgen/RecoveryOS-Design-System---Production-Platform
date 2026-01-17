/**
 * RECOVERY OS V3 - HOME PAGE
 * Complete rebuild with RecoveryOS messaging from Notion
 * infiniteK design system: NO CARD ON CARD, NO ROUNDED CORNERS
 */

import React from 'react';
import { ArrowRight, Brain, Target, Zap, Shield } from 'lucide-react';

export function V3Home() {
  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-8 py-20 bg-gradient-to-br from-[#0A0B0F] via-[#1a0f2e] to-[#0A0B0F]">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8 text-sm tracking-widest text-zinc-500 uppercase">
            Recovery OS
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Recovery now runs<br />in real life.
          </h1>
          
          <p className="text-2xl md:text-3xl text-zinc-400 mb-4">
            As a living operating system for <span className="text-[#5739FB]">momentum</span>.
          </p>
          
          <p className="text-lg text-zinc-500 mb-12 max-w-2xl mx-auto">
            Because recovery isn't a label. It's motion.<br />
            A path of becoming.
          </p>
          
          <div className="p-8 bg-zinc-900/50 border border-zinc-800 max-w-4xl mx-auto mb-12">
            <p className="text-sm text-zinc-400 mb-4 uppercase tracking-wide">The Core Shift</p>
            <p className="text-xl md:text-2xl text-zinc-200 leading-relaxed">
              RecoveryOS is a <span className="text-[#3E2BB8] font-bold">neuroadaptive operating system</span> that turns recovery into momentum — by routing lived experience, in real time, until new pathways become default.
            </p>
          </div>

          <a 
            href="#how-it-works"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors text-lg font-medium"
          >
            See how it works
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* The Problem */}
      <section id="problem" className="px-8 py-24 bg-[#0A0B0F]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center">
            Recovery slips in the moments that matter.
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 bg-zinc-900/30">
              <h3 className="text-2xl font-bold mb-4 text-[#5739FB]">The Biology</h3>
              <p className="text-lg text-zinc-300 leading-relaxed">
                Under heat, the brain defaults to the fastest learned pathway.
              </p>
              <p className="text-zinc-400 mt-4">
                So we don't build for the perfect scenario. We build for real life.
              </p>
            </div>
            
            <div className="p-8 bg-zinc-900/30">
              <h3 className="text-2xl font-bold mb-4 text-[#5739FB]">The Gap</h3>
              <p className="text-lg text-zinc-300 leading-relaxed">
                Current systems can't reliably deliver the right support at the right time, keep it small enough to repeat, or measure it in a way that matters.
              </p>
              <p className="text-zinc-400 mt-4">
                So recovery breaks in the gap.
              </p>
            </div>
          </div>

          <div className="p-12 bg-zinc-900 border-l-4 border-[#3E2BB8]">
            <p className="text-3xl font-bold mb-6">The problem isn't care. It's time.</p>
            <p className="text-xl text-zinc-400 leading-relaxed">
              Rewiring takes time. And the gap between intention and pressure is where recovery collapses.
            </p>
          </div>
        </div>
      </section>

      {/* Four Jobs */}
      <section id="how-it-works" className="px-8 py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">One flow. Four moves.</h2>
            <p className="text-2xl text-zinc-400">
              Sense → Route → Deliver → Seal
            </p>
            <p className="text-zinc-500 mt-4">
              Not steps. An operating loop.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1 mb-16">
            <div className="p-8 bg-zinc-900">
              <div className="w-12 h-12 bg-green-900/30 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">SENSE</h3>
              <p className="text-sm text-zinc-500 uppercase mb-4">Read the moment, not the story</p>
              <p className="text-zinc-400">
                Understanding the moment you're in — without judgement. State-first. Heat-aware. Consent-bound.
              </p>
            </div>

            <div className="p-8 bg-zinc-900">
              <div className="w-12 h-12 bg-blue-900/30 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">ROUTE</h3>
              <p className="text-sm text-zinc-500 uppercase mb-4">Choose the next right move</p>
              <p className="text-zinc-400">
                Calibrating what's next in real time. Right dose. Right primitive. Right timing.
              </p>
            </div>

            <div className="p-8 bg-zinc-900">
              <div className="w-12 h-12 bg-purple-900/30 flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">DELIVER</h3>
              <p className="text-sm text-zinc-500 uppercase mb-4">Place the move inside real life</p>
              <p className="text-zinc-400">
                Aligning the right move to the moment. This is where the window opens.
              </p>
            </div>

            <div className="p-8 bg-zinc-900">
              <div className="w-12 h-12 bg-orange-900/30 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">SEAL</h3>
              <p className="text-sm text-zinc-500 uppercase mb-4">Turn the moment into proof</p>
              <p className="text-zinc-400">
                Capturing a receipt the brain trusts. Receipts stack. Identity follows.
              </p>
            </div>
          </div>

          <div className="p-12 bg-[#1a0f2e] border border-[#3E2BB8]/30">
            <h3 className="text-3xl font-bold mb-6 text-center">The magic is biological</h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-[#5739FB] font-bold mb-2">Experience</div>
                <div className="text-sm text-zinc-400">opens the window</div>
              </div>
              <div>
                <div className="text-[#5739FB] font-bold mb-2">Recognition</div>
                <div className="text-sm text-zinc-400">creates choice</div>
              </div>
              <div>
                <div className="text-[#5739FB] font-bold mb-2">Alignment</div>
                <div className="text-sm text-zinc-400">becomes reflex</div>
              </div>
              <div>
                <div className="text-[#5739FB] font-bold mb-2">Proof</div>
                <div className="text-sm text-zinc-400">consolidates pathway</div>
              </div>
            </div>
            <p className="text-center text-2xl font-bold mt-8 text-zinc-200">
              That's not change. That's transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Framework */}
      <section id="framework" className="px-8 py-24 bg-[#0A0B0F]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 text-center">The Foundation</h2>
          <p className="text-xl text-zinc-400 text-center mb-16">
            Target → Build → Seal
          </p>

          <div className="mb-16 p-8 bg-zinc-900/50 border border-zinc-800">
            <h3 className="text-3xl font-bold mb-8 text-center">The Clinical Spine</h3>
            <div className="flex flex-wrap items-center justify-center gap-4 text-lg">
              <span className="px-4 py-2 bg-zinc-800 text-zinc-300">Pillars</span>
              <span className="text-[#5739FB]">→</span>
              <span className="px-4 py-2 bg-zinc-800 text-zinc-300">Concepts</span>
              <span className="text-[#5739FB]">→</span>
              <span className="px-4 py-2 bg-zinc-800 text-zinc-300">Themes</span>
              <span className="text-[#5739FB]">→</span>
              <span className="px-4 py-2 bg-zinc-800 text-zinc-300">Schemas</span>
              <span className="text-[#5739FB]">→</span>
              <span className="px-4 py-2 bg-zinc-800 text-zinc-300">Families</span>
              <span className="text-[#5739FB]">→</span>
              <span className="px-4 py-2 bg-[#3E2BB8] font-bold">Mindblocks</span>
            </div>
          </div>

          <div className="p-12 bg-gradient-to-br from-[#3E2BB8]/10 to-[#5739FB]/10 border border-[#3E2BB8]/30">
            <h3 className="text-3xl font-bold mb-6">Mindblocks: The Atomic Unit</h3>
            <p className="text-xl text-zinc-300 leading-relaxed mb-6">
              A mindblock is the <span className="text-[#5739FB] font-bold">smallest shift</span> that can be:
            </p>
            <ul className="space-y-3 text-lg text-zinc-400">
              <li>• Practiced as lived experience</li>
              <li>• Recognised in real time</li>
              <li>• Aligned through micro-loops</li>
              <li>• Sealed with proof</li>
              <li>• Transferred into real life</li>
              <li>• Measured as momentum</li>
            </ul>
            <p className="text-xl text-zinc-300 mt-8">
              Not an affirmation. Not a tag. A movable, measurable unit of transformation.
            </p>
          </div>
        </div>
      </section>

      {/* LUMA */}
      <section id="luma" className="px-8 py-24 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 text-center">LUMA is the orchestrator</h2>
          <p className="text-2xl text-zinc-400 text-center mb-16">
            A feed with a spine
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-3xl font-bold mb-6">You don't navigate the system.<br/>The system meets you.</h3>
              <p className="text-lg text-zinc-400 leading-relaxed">
                LUMA is the trusted orchestration layer — the governed conductor — routing interventions inside a coherent clinical spine.
              </p>
              <p className="text-lg text-zinc-400 leading-relaxed mt-4">
                So it always feels: <span className="text-[#5739FB]">relevant, personal, and clinically coherent</span>.
              </p>
            </div>

            <div className="p-8 bg-zinc-900 border border-zinc-800">
              <h4 className="text-xl font-bold mb-6">The 5 Rooms</h4>
              <div className="space-y-4">
                <div className="p-4 bg-zinc-800/50">
                  <div className="font-bold mb-1">Journeys</div>
                  <div className="text-sm text-zinc-400">Weekly installation cycles</div>
                </div>
                <div className="p-4 bg-zinc-800/50">
                  <div className="font-bold mb-1">NaviCues</div>
                  <div className="text-sm text-zinc-400">Moment-level steering (JITAI)</div>
                </div>
                <div className="p-4 bg-zinc-800/50">
                  <div className="font-bold mb-1">Toolkit</div>
                  <div className="text-sm text-zinc-400">Knowledge + Practices + Bag</div>
                </div>
                <div className="p-4 bg-zinc-800/50">
                  <div className="font-bold mb-1">Wellbeing</div>
                  <div className="text-sm text-zinc-400">Breath, meditation, fitness</div>
                </div>
                <div className="p-4 bg-zinc-800/50">
                  <div className="font-bold mb-1">State</div>
                  <div className="text-sm text-zinc-400">Energy, Clarity, Anchorage</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-12 bg-[#1a0f2e] border border-[#3E2BB8]/30 text-center">
            <p className="text-3xl font-bold mb-4">One universal player</p>
            <p className="text-xl text-zinc-400">
              LUMA brings the right room to you — at the right time — at the right dose.
            </p>
          </div>
        </div>
      </section>

      {/* Three Worlds */}
      <section id="worlds" className="px-8 py-24 bg-[#0A0B0F]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 text-center">One OS. Three worlds.</h2>
          <p className="text-xl text-zinc-400 text-center mb-16">
            Individual. Professional. Organisation.
          </p>

          <div className="grid md:grid-cols-3 gap-1">
            <div className="p-8 bg-zinc-900">
              <h3 className="text-2xl font-bold mb-4 text-[#5739FB]">Companion</h3>
              <p className="text-sm text-zinc-500 uppercase mb-4">Individual</p>
              <p className="text-zinc-300 mb-6">
                Stay oriented. Quiet orientation. Right-sized moves. Proof you can feel — and keep.
              </p>
              <p className="text-zinc-400 text-sm">
                Where recovery becomes usable in the seconds that decide the day.
              </p>
            </div>

            <div className="p-8 bg-zinc-900">
              <h3 className="text-2xl font-bold mb-4 text-[#5739FB]">Console</h3>
              <p className="text-sm text-zinc-500 uppercase mb-4">Professional</p>
              <p className="text-zinc-300 mb-6">
                Your work, extended. Clean signal. Closed-loop support between sessions.
              </p>
              <p className="text-zinc-400 text-sm">
                Where care becomes continuous without becoming noise.
              </p>
            </div>

            <div className="p-8 bg-zinc-900">
              <h3 className="text-2xl font-bold mb-4 text-[#5739FB]">Command Center</h3>
              <p className="text-sm text-zinc-500 uppercase mb-4">Organisation</p>
              <p className="text-zinc-300 mb-6">
                Continuity, built in. Governed delivery. Auditable integrity.
              </p>
              <p className="text-zinc-400 text-sm">
                Where recovery becomes infrastructure you can defend.
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-zinc-900 border-l-4 border-[#3E2BB8]">
            <p className="text-2xl font-bold mb-4">Symbiotic travel</p>
            <p className="text-lg text-zinc-400">
              One lived moment becomes a receipt — and that receipt travels up the spine.
              Same receipt. Three meanings. One spine.
            </p>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section id="trust" className="px-8 py-24 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 text-center">Quiet Trust Architecture</h2>
          <p className="text-xl text-zinc-400 text-center mb-16">
            Most systems treat trust like a promise. We treat trust like design.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-zinc-900/50">
              <h4 className="text-xl font-bold mb-3">Quiet by default</h4>
              <p className="text-zinc-400">Support should feel like relief — not pressure.</p>
            </div>
            <div className="p-6 bg-zinc-900/50">
              <h4 className="text-xl font-bold mb-3">Consent by design</h4>
              <p className="text-zinc-400">You choose how the system shows up.</p>
            </div>
            <div className="p-6 bg-zinc-900/50">
              <h4 className="text-xl font-bold mb-3">Dignity by definition</h4>
              <p className="text-zinc-400">Without dignity, there is no signal.</p>
            </div>
            <div className="p-6 bg-zinc-900/50">
              <h4 className="text-xl font-bold mb-3">Appropriateness is safety</h4>
              <p className="text-zinc-400">Right dose. Right tone. Right time.</p>
            </div>
            <div className="p-6 bg-zinc-900/50">
              <h4 className="text-xl font-bold mb-3">Human boundary</h4>
              <p className="text-zinc-400">Infrastructure carries, doesn't replace.</p>
            </div>
            <div className="p-6 bg-zinc-900/50">
              <h4 className="text-xl font-bold mb-3">Trust is verifiable</h4>
              <p className="text-zinc-400">Not vibes. Receipts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 bg-gradient-to-br from-[#3E2BB8] to-[#5739FB]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Recovery becomes infrastructure</h2>
          <p className="text-xl mb-12 opacity-90">
            Quietly. Safely. Provably. In the moments that matter.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-[#3E2BB8] font-bold hover:bg-zinc-100 transition-colors">
              Get Started
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white/10 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-12 bg-[#0A0B0F] border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-bold mb-4">Recovery OS</div>
              <p className="text-sm text-zinc-500">
                A neuroadaptive operating system for momentum.
              </p>
            </div>
            <div>
              <div className="font-bold mb-4 text-sm">Product</div>
              <div className="space-y-2 text-sm text-zinc-400">
                <div>Companion</div>
                <div>Console</div>
                <div>Command Center</div>
              </div>
            </div>
            <div>
              <div className="font-bold mb-4 text-sm">Company</div>
              <div className="space-y-2 text-sm text-zinc-400">
                <div>About</div>
                <div>Science</div>
                <div>Contact</div>
              </div>
            </div>
            <div>
              <div className="font-bold mb-4 text-sm">Legal</div>
              <div className="space-y-2 text-sm text-zinc-400">
                <div>Privacy</div>
                <div>Terms</div>
                <div>Security</div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-900 text-sm text-zinc-600 text-center">
            © 2026 Recovery OS. MTTR-first. Proof without punishment. Humans when humans matter.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default V3Home;
