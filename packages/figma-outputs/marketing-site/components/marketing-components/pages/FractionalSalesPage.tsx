import { useState } from "react";
import { ArrowRight, Check, Target, TrendingUp, Users, Zap, Calendar, Globe, DollarSign, Briefcase } from "lucide-react";
import { Button } from "../ui/button";
import { SEOHead } from "../SEOHead";
import { RecoverlutionFooter } from "../RecoverlutionFooter";

interface FractionalSalesPageProps {
  onNavigate?: (page: string) => void;
  onScheduleDemo?: () => void;
}

export function FractionalSalesPage({ onNavigate, onScheduleDemo }: FractionalSalesPageProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const pricingTiers = [
    {
      name: "Core",
      price: 39,
      description: "Full platform with adaptive journeys & dashboards",
      patients: [
        { count: 20, arr: "9.4k", commission: "2.8k" },
        { count: 50, arr: "23.4k", commission: "7.0k" },
        { count: 100, arr: "46.8k", commission: "14.0k" },
        { count: 200, arr: "93.6k", commission: "28.1k" },
      ]
    },
    {
      name: "Custom",
      price: 99,
      description: "White-label + bespoke pathways & success management",
      patients: [
        { count: 20, arr: "23.8k", commission: "7.1k" },
        { count: 50, arr: "59.4k", commission: "17.8k" },
        { count: 100, arr: "118.8k", commission: "35.6k" },
        { count: 200, arr: "237.6k", commission: "71.3k" },
      ]
    }
  ];

  const buyerProfiles = [
    {
      role: "COO / CFO / CEO",
      icon: <Briefcase className="w-6 h-6" />,
      pain: "Unit economics leak; capacity capped; need scalable continuity without headcount",
      signal: "Outcome-linked performance metrics"
    },
    {
      role: "Clinical Director",
      icon: <Users className="w-6 h-6" />,
      pain: "Discharge cliff erodes gains; no live risk signals between sessions",
      signal: "Aftercare thin; staff capacity strained"
    },
    {
      role: "Network Operator",
      icon: <Globe className="w-6 h-6" />,
      pain: "Paying for bed-days; utilization rising; require contractable outcomes",
      signal: "Tried digital solutions; data weak"
    }
  ];

  const valueProps = [
    {
      title: "Amplify Care",
      description: "365-day continuity turns clinical wins into data-backed outcomes",
      icon: <Target className="w-8 h-8" />
    },
    {
      title: "Embed Recovery",
      description: "Automation carries repetition; clinicians deliver breakthroughs",
      icon: <Zap className="w-8 h-8" />
    },
    {
      title: "Grow Revenue",
      description: "Predictable revenue streams and network-level scalability",
      icon: <TrendingUp className="w-8 h-8" />
    }
  ];

  const toolkit = [
    { category: "Marketing Air-Cover", items: ["Webinars", "Email drip campaigns", "Paid campaigns", "Co-marketing support"] },
    { category: "RevOps Stack", items: ["CRM access", "LinkedIn Sales Navigator", "Dripify automation", "Performance dashboard"] },
    { category: "Sales Collateral", items: ["ROI calculator", "Custom pitch deck", "Demo environment", "Case studies"] }
  ];

  const qualifications = [
    { label: "Experience", requirement: "5+ years selling healthtech/SaaS to providers or payers" },
    { label: "Track Record", requirement: "$10k+ ACV wins; multi-stakeholder cycles; outcome-driven narratives" },
    { label: "Network", requirement: "Warm contacts across rehabs, networks, or commissioners in your territory" },
    { label: "Mindset", requirement: "Hunter mentality; comfortable with land-and-expand strategies" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Fractional Sales Role - Recoverlution"
        description="Join Recoverlution's founding sales team. Ground-floor opportunity with equity path."
        noIndex={true}
      />

      {/* Simple Header with Login Only */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-end">
          <Button
            onClick={() => onNavigate?.('login')}
            variant="ghost"
            className="text-[#3E2BB8] hover:text-[#5739FB] hover:bg-[#5739FB]/10"
          >
            Log In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5739FB]/5 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Overline */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5739FB]/10 text-[#3E2BB8] mb-8">
              <span className="w-2 h-2 rounded-full bg-[#5739FB] animate-pulse" />
              <span className="text-sm font-medium">Founding Sales Team</span>
            </div>

            {/* Headline */}
            <h1 className="text-7xl font-bold text-[#1A1A1A] mb-6 tracking-tight leading-[1.1]">
              Turn discharge into
              <br />
              <span className="text-[#5739FB]">365 days of practice</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Recoverlution's clinician-led, neuroadaptive platform carries the repetition between sessions while humans deliver the breakthroughs. Join early, earn big commissions, help define how modern recovery is delivered.
            </p>

            {/* CTAs */}
            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={onScheduleDemo}
                className="bg-[#5739FB] text-white hover:bg-[#3E2BB8] px-8 py-6 text-lg h-auto rounded-xl shadow-lg shadow-[#5739FB]/20 transition-all hover:shadow-xl hover:shadow-[#5739FB]/30 hover:-translate-y-0.5"
              >
                Schedule Discovery Call
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20 pt-12 border-t border-gray-200">
              <div>
                <div className="text-4xl font-bold text-[#5739FB] mb-2">30%</div>
                <div className="text-sm text-gray-600">Commission Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#5739FB] mb-2">No Cap</div>
                <div className="text-sm text-gray-600">Unlimited Upside</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#5739FB] mb-2">Fast-Track</div>
                <div className="text-sm text-gray-600">To FT + Equity</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Opportunity Section */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold text-[#1A1A1A] mb-6">The Opportunity</h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              With momentum building and a multi-billion category opening up, we're assembling a fractional sales team to land the first meaningful ARR and set the pace for expansion.
            </p>

            <div className="grid gap-6">
              {/* Ground-Floor Position */}
              <div 
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#5739FB]/30 transition-all hover:shadow-xl"
                onMouseEnter={() => setHoveredCard('ground-floor')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#5739FB]/10 flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-[#5739FB]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">Ground-Floor Opening</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Own a protected territory (United States) and sell Recoverlution's Continuous-Care OS into residential providers, multi-site networks, and healthcare systems.
                    </p>
                    <div className="inline-flex items-center gap-2 text-[#5739FB] font-medium">
                      Fast-track to full-time + equity after $50k ARR
                      <ArrowRight className={`w-4 h-4 transition-transform ${hoveredCard === 'ground-floor' ? 'translate-x-1' : ''}`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Autonomy & Upside */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-6">Autonomy + Upside</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#5739FB] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-[#1A1A1A] mb-1">Work Remote</div>
                      <div className="text-sm text-gray-600">5+ hours per week, flexible schedule</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#5739FB] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-[#1A1A1A] mb-1">30% Commission</div>
                      <div className="text-sm text-gray-600">Per deal, no cap on earnings</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#5739FB] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-[#1A1A1A] mb-1">$3k - $25k Range</div>
                      <div className="text-sm text-gray-600">Commission per deal based on size</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#5739FB] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-[#1A1A1A] mb-1">Equity Path</div>
                      <div className="text-sm text-gray-600">Hit $50k ARR → FT seat + equity</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Commission Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-[#1A1A1A] mb-6">Simple Pricing, Clear Upside</h2>
              <p className="text-xl text-gray-600">
                Two tiers. Transparent economics. Your commission scales with impact.
              </p>
            </div>

            {/* Pricing Tiers */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {pricingTiers.map((tier) => (
                <div key={tier.name} className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-[#5739FB]/50 transition-all hover:shadow-2xl">
                  <div className="bg-gradient-to-br from-[#5739FB]/5 to-[#3E2BB8]/5 p-8 border-b border-gray-200">
                    <div className="text-sm font-medium text-[#5739FB] mb-2">{tier.name}</div>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-5xl font-bold text-[#1A1A1A]">${tier.price}</span>
                      <span className="text-gray-600">/month per seat</span>
                    </div>
                    <p className="text-gray-600">{tier.description}</p>
                  </div>
                  
                  <div className="p-8">
                    <div className="space-y-4">
                      {tier.patients.map((row) => (
                        <div key={row.count} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                          <div className="text-gray-600">{row.count} patients</div>
                          <div className="text-right">
                            <div className="font-bold text-[#1A1A1A]">${row.arr} ARR</div>
                            <div className="text-sm text-[#5739FB] font-medium">${row.commission} commission</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Commission Note */}
            <div className="bg-[#5739FB]/5 rounded-2xl p-8 border border-[#5739FB]/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#5739FB] flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1A1A] mb-2">30% Commission Structure</h3>
                  <p className="text-gray-700 leading-relaxed">
                    You earn 30% of the first year's Annual Recurring Revenue (ARR) on every deal you close. No commission caps. Mix Core and Custom deals to optimize your pipeline. 100-patient Custom deal = $35.6k commission.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal Buyer Profiles Section */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-[#1A1A1A] mb-6">Who You're Selling To</h2>
              <p className="text-xl text-gray-600">
                Three core buyer profiles. Different pains. Same solution.
              </p>
            </div>

            <div className="grid gap-6">
              {buyerProfiles.map((buyer) => (
                <div key={buyer.role} className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#5739FB]/30 transition-all hover:shadow-lg">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-xl bg-[#5739FB]/10 flex items-center justify-center flex-shrink-0 text-[#5739FB]">
                      {buyer.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">{buyer.role}</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <div className="text-sm font-medium text-gray-500 mb-2">Pain Point</div>
                          <p className="text-gray-700">{buyer.pain}</p>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500 mb-2">Buying Signal</div>
                          <p className="text-[#5739FB] font-medium">{buyer.signal}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Winning Position Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-[#1A1A1A] mb-6">Your Winning Position</h2>
              <p className="text-xl text-gray-600">
                Three pillars that make Recoverlution impossible to ignore
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {valueProps.map((prop) => (
                <div key={prop.title} className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#5739FB]/30 transition-all hover:shadow-lg group">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5739FB]/10 to-[#3E2BB8]/10 flex items-center justify-center text-[#5739FB] mb-6 group-hover:scale-110 transition-transform">
                    {prop.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">{prop.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{prop.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Toolkit Section */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-[#1A1A1A] mb-6">Your Sales Toolkit</h2>
              <p className="text-xl text-gray-600">
                Everything you need to close deals, built in
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {toolkit.map((category) => (
                <div key={category.category} className="bg-white rounded-2xl p-8 border border-gray-200">
                  <h3 className="font-bold text-[#1A1A1A] mb-6 text-lg">{category.category}</h3>
                  <ul className="space-y-3">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#5739FB] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ideal Candidate Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-[#1A1A1A] mb-6">Ideal Fit</h2>
              <p className="text-xl text-gray-600">
                You're ready if you bring these to the table
              </p>
            </div>

            <div className="grid gap-6">
              {qualifications.map((qual) => (
                <div key={qual.label} className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#5739FB]/30 transition-all">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-xl bg-[#5739FB]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-6 h-6 text-[#5739FB]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-[#1A1A1A] mb-2 text-xl">{qual.label}</h3>
                      <p className="text-gray-600 leading-relaxed">{qual.requirement}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-gradient-to-br from-[#5739FB] to-[#3E2BB8] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Ready to build something<br />that matters?
            </h2>
            <p className="text-xl mb-12 text-white/90 leading-relaxed">
              This is your chance to join early, shape the sales motion, and earn meaningful equity while building a category-defining company.
            </p>
            
            <Button
              onClick={onScheduleDemo}
              className="bg-white text-[#5739FB] hover:bg-gray-100 px-10 py-7 text-lg h-auto rounded-xl shadow-2xl transition-all hover:shadow-[0_20px_50px_rgba(255,255,255,0.3)] hover:-translate-y-1 font-semibold"
            >
              <Calendar className="mr-3 w-6 h-6" />
              Schedule Your 30-Minute Discovery Call
              <ArrowRight className="ml-3 w-5 h-5" />
            </Button>

            <p className="text-white/70 mt-8">
              No obligation. Just an honest conversation about fit and opportunity.
            </p>
          </div>
        </div>
      </section>

      <RecoverlutionFooter onNavigate={onNavigate} />
    </div>
  );
}
