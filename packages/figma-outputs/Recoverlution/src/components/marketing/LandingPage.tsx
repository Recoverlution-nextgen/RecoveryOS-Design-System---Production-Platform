/**
 * RECOVERLUTION LANDING PAGE
 * Marketing site for the platform
 * Sections: Hero, Features, For Who, Testimonials, Pricing, CTA
 */

import { ArrowRight, Check, Users, Building, Heart, Sparkles, Shield, Zap } from 'lucide-react';

export default function LandingPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="min-h-screen bg-[#0A0118]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0A0118]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-[#5739FB]" />
              <span className="text-2xl">Recoverlution</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#features" className="text-white/60 hover:text-white transition-colors">Features</a>
              <a href="#for-who" className="text-white/60 hover:text-white transition-colors">For Who</a>
              <a href="#pricing" className="text-white/60 hover:text-white transition-colors">Pricing</a>
              <button
                onClick={() => onNavigate('Login')}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => onNavigate('Signup')}
                className="px-6 py-2 bg-[#5739FB] text-white rounded hover:bg-[#3E2BB8] transition-all"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5739FB]/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-8 py-24 text-center">
          <h1 className="text-6xl mb-6 leading-tight">
            The Apple OS<br />for Recovery
          </h1>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            We're not the source. We're the delivery system. Taking validated therapeutic knowledge 
            from leaders, gurus, and research—and turning it into lived, measurable change.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('Signup')}
              className="px-8 py-4 bg-gradient-to-r from-[#5739FB] to-[#3E2BB8] text-white rounded text-lg hover:opacity-90 transition-all flex items-center gap-2"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-lg transition-all">
              Watch Demo
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-16 flex items-center justify-center gap-8 text-sm text-white/40">
            <div>
              <p className="text-2xl text-white mb-1">1,200+</p>
              <p>Active Users</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <p className="text-2xl text-white mb-1">89%</p>
              <p>Completion Rate</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <p className="text-2xl text-white mb-1">50+</p>
              <p>Treatment Centers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Built on Five Vows</h2>
            <p className="text-xl text-white/60">Our non-negotiable design principles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🧭',
                title: 'Regulate Before Reason',
                desc: 'Meet users where they are. State-aware content that respects nervous system capacity.',
              },
              {
                icon: '💡',
                title: 'Explain Everything',
                desc: 'Every piece of content comes with WhyNow. Authority anchors show the source.',
              },
              {
                icon: '⚡',
                title: 'Practice Liquidity',
                desc: 'Micro-interventions under 90 seconds. No time debt. Bite-sized behavior change.',
              },
              {
                icon: '📊',
                title: 'Evidence Lives Here',
                desc: 'Every practice declares proof hooks. Your progress is measured, not assumed.',
              },
              {
                icon: '👑',
                title: 'Dignity By Design',
                desc: 'Person-first language. No pathologizing. Consent declared upfront.',
              },
              {
                icon: '🔮',
                title: 'LUMA Orchestration',
                desc: 'AI that decides what to surface, when. Mandatory WhyNow explanations for every decision.',
              },
            ].map((feature, idx) => (
              <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-[#5739FB]/50 transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl mb-3">{feature.title}</h3>
                <p className="text-white/60">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Who */}
      <section id="for-who" className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Who Is This For?</h2>
            <p className="text-xl text-white/60">A platform for everyone in the recovery ecosystem</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 bg-gradient-to-br from-[#5739FB]/10 to-[#3E2BB8]/10 border border-[#5739FB]/30 rounded-xl text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-[#5739FB]" />
              <h3 className="text-xl mb-3">Individuals</h3>
              <p className="text-white/60 mb-6">Your personal recovery OS. Daily practices, state tracking, peer support.</p>
              <button
                onClick={() => onNavigate('Signup')}
                className="w-full px-4 py-2 bg-[#5739FB]/20 text-[#5739FB] rounded hover:bg-[#5739FB]/30 transition-all"
              >
                Start Free
              </button>
            </div>

            <div className="p-8 bg-gradient-to-br from-[#5739FB]/10 to-[#3E2BB8]/10 border border-[#5739FB]/30 rounded-xl text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-[#5739FB]" />
              <h3 className="text-xl mb-3">Professionals</h3>
              <p className="text-white/60 mb-6">Therapist portal. Session management, billing, video conferencing.</p>
              <button className="w-full px-4 py-2 bg-[#5739FB]/20 text-[#5739FB] rounded hover:bg-[#5739FB]/30 transition-all">
                Learn More
              </button>
            </div>

            <div className="p-8 bg-gradient-to-br from-[#5739FB]/10 to-[#3E2BB8]/10 border border-[#5739FB]/30 rounded-xl text-center">
              <Building className="w-12 h-12 mx-auto mb-4 text-[#5739FB]" />
              <h3 className="text-xl mb-3">Organizations</h3>
              <p className="text-white/60 mb-6">Treatment centers. Alumni networks, cohort analytics, branded microsites.</p>
              <button className="w-full px-4 py-2 bg-[#5739FB]/20 text-[#5739FB] rounded hover:bg-[#5739FB]/30 transition-all">
                Contact Sales
              </button>
            </div>

            <div className="p-8 bg-gradient-to-br from-[#5739FB]/10 to-[#3E2BB8]/10 border border-[#5739FB]/30 rounded-xl text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 text-[#5739FB]" />
              <h3 className="text-xl mb-3">Families</h3>
              <p className="text-white/60 mb-6">Support for loved ones. Resources, support groups, connection tools.</p>
              <button className="w-full px-4 py-2 bg-[#5739FB]/20 text-[#5739FB] rounded hover:bg-[#5739FB]/30 transition-all">
                Family Hub
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">What People Are Saying</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "This platform met me where I was. No judgment, just tools that actually worked.",
                author: "Sarah M.",
                role: "Individual",
              },
              {
                quote: "Finally, a way to keep our alumni connected and track outcomes at scale.",
                author: "Dr. James Rodriguez",
                role: "Treatment Center Director",
              },
              {
                quote: "As a family member, I finally feel equipped to support my loved one without losing myself.",
                author: "Maria K.",
                role: "Family Member",
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-white/80 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#5739FB]/40 to-[#3E2BB8]/40 rounded-full" />
                  <div>
                    <p className="text-white">{testimonial.author}</p>
                    <p className="text-white/40 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-white/60">Choose the plan that fits your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Individual',
                price: '$29',
                period: 'month',
                features: [
                  'Unlimited practices & content',
                  'State tracking & analytics',
                  'Peer connections',
                  'Mobile app access',
                  'Email support',
                ],
              },
              {
                name: 'Family',
                price: '$49',
                period: 'month',
                features: [
                  'Everything in Individual',
                  'Family member access (up to 4)',
                  'Family resources library',
                  'Support group access',
                  'Priority support',
                ],
                highlight: true,
              },
              {
                name: 'Professional',
                price: '$99',
                period: 'month',
                features: [
                  'Client management',
                  'Session scheduling',
                  'Video conferencing',
                  'Billing & payments',
                  'Analytics dashboard',
                ],
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-xl ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-[#5739FB]/20 to-[#3E2BB8]/20 border-2 border-[#5739FB] scale-105'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                {plan.highlight && (
                  <div className="text-center mb-4">
                    <span className="px-3 py-1 bg-[#5739FB] text-white rounded-full text-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl">{plan.price}</span>
                    <span className="text-white/40">/{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onNavigate('Signup')}
                  className={`w-full px-6 py-3 rounded transition-all ${
                    plan.highlight
                      ? 'bg-[#5739FB] text-white hover:bg-[#3E2BB8]'
                      : 'bg-white/10 hover:bg-white/20 border border-white/10'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-white/40 mt-8">
            Organizations: <button className="text-[#5739FB] hover:underline">Contact us for custom pricing</button>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-[#5739FB]/10 to-transparent">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-5xl mb-6">Ready to Transform Recovery?</h2>
          <p className="text-xl text-white/60 mb-12">
            Join 1,200+ individuals, professionals, and organizations already using Recoverlution.
          </p>
          <button
            onClick={() => onNavigate('Signup')}
            className="px-12 py-5 bg-gradient-to-r from-[#5739FB] to-[#3E2BB8] text-white rounded text-xl hover:opacity-90 transition-all flex items-center gap-3 mx-auto"
          >
            Start Your Free Trial
            <ArrowRight className="w-6 h-6" />
          </button>
          <p className="text-white/40 mt-6">No credit card required · 14-day free trial</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-[#5739FB]" />
                <span className="text-lg">Recoverlution</span>
              </div>
              <p className="text-white/40 text-sm">
                The Apple OS for Recovery
              </p>
            </div>
            <div>
              <h4 className="mb-4">Product</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Company</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Legal</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/40 text-sm">
            © 2026 Recoverlution. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
