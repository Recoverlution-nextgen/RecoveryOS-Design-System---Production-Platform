/**
 * ST49: Journey Infrastructure - "THE NOW PRINCIPLE"
 * Documentation page for the NOW-focused journey architecture
 */

import { ArrowLeft, Sparkles, Star, Clock, Heart, CheckCircle2 } from "lucide-react";

interface JourneyInfrastructurePageProps {
  onNavigate: (page: string) => void;
}

export function JourneyInfrastructurePage({ onNavigate }: JourneyInfrastructurePageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Back Button */}
        <button
          onClick={() => onNavigate("content-lab")}
          className="flex items-center gap-2 text-gray-600 hover:text-[#3E2BB8] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to Content Lab</span>
        </button>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-[#3E2BB8]/10 text-[#3E2BB8] rounded-full text-sm">
              ST49
            </span>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-100 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-xs text-emerald-900">Complete</span>
            </div>
          </div>
          
          <h1 className="text-4xl mb-4 text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            Journey Infrastructure - "THE NOW PRINCIPLE"
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Patient-facing journey with no timelines, no completion tracking, no pressure. 
            The patient is always in the now.
          </p>
        </div>

        {/* Philosophy */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4 text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            Philosophy Shift
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 bg-red-50 border-2 border-red-200 rounded-xl">
              <h3 className="text-lg mb-3 text-red-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                ❌ Before
              </h3>
              <ul className="space-y-2 text-sm text-red-800">
                <li>• Progress tracking (57% completion)</li>
                <li>• Red/Orange/Green state labels</li>
                <li>• "To Explore" counters</li>
                <li>• Pillar percentages</li>
                <li>• Future-goal oriented</li>
                <li>• Pressure to complete</li>
              </ul>
            </div>
            
            <div className="p-6 bg-emerald-50 border-2 border-emerald-200 rounded-xl">
              <h3 className="text-lg mb-3 text-emerald-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                ✅ Now
              </h3>
              <ul className="space-y-2 text-sm text-emerald-800">
                <li>• No progress tracking visible</li>
                <li>• No state labels (red/orange/green)</li>
                <li>• No percentages or completion metrics</li>
                <li>• No future goals or timelines</li>
                <li>• Only: What's here now + What you've loved</li>
                <li>• Zero pressure</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Core Principle */}
        <section className="mb-12">
          <div className="p-8 bg-gradient-to-br from-[#3E2BB8]/5 to-[#5739FB]/5 rounded-2xl border border-[#5739FB]/20">
            <h2 className="text-2xl mb-4 text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              THE NOW PRINCIPLE
            </h2>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Patients never see timelines, weeks, or deadlines. No completion tracking. No future goals.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Only two things exist:
            </p>
            
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-[#5739FB] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                    What's here for you now
                  </p>
                  <p className="text-sm text-gray-600">Available practices to explore</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Star className="w-6 h-6 text-[#5739FB] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                    What you've explored
                  </p>
                  <p className="text-sm text-gray-600">Favorites to revisit, always</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Structure v3 */}
        <section className="mb-12">
          <h2 className="text-2xl mb-6 text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            Journey Structure v3 (Current)
          </h2>
          
          <div className="space-y-6">
            {/* Section 1 - Header */}
            <div className="p-6 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-lg mb-2 text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                1. Hero Header (280px)
              </h3>
              <div className="bg-gray-50 rounded-lg mb-3 overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <span className="text-sm text-gray-500">[Journey Header Image]</span>
                </div>
                <div className="bg-[#3E2BB8] px-6 py-3">
                  <p className="text-white text-lg" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                    Your Journey
                  </p>
                  <p className="text-white/90 text-xs italic">
                    Recovery is a journey, a timeless path to where you belong, as yourself
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Matches Inner Compass/Library format. Image gives warmth, blue bar enables sectioning.
              </p>
            </div>

            {/* Section 2 - Nav Bar */}
            <div className="p-6 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-lg mb-2 text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                2. Navigation Bar (Conditional)
              </h3>
              <div className="p-4 bg-gray-50 rounded-lg mb-3 border border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">2 practices to revisit</span>
                  <button className="px-3 py-1.5 border border-[#5739FB]/30 text-[#5739FB] rounded text-sm hover:bg-[#F5F3FF]">
                    Explored →
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Only shows when patient has explored practices. "Explored" opens sheet with revisit options.
              </p>
            </div>

            {/* Section 3 - Navigate Your Path */}
            <div className="p-6 bg-white border border-gray-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-[#5739FB]" />
                <h3 className="text-lg text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  3. Navigate Your Path (Dynamic 1-3 practices)
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Only shows <strong>unexplored</strong> practices. Count varies by week:
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm"><strong>Week 1-2:</strong> Shows 1 practice (focused guidance)</p>
                  <p className="text-xs text-gray-600">"Your focused practice for this phase of recovery"</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm"><strong>Week 3-4:</strong> Shows 2 practices (building autonomy)</p>
                  <p className="text-xs text-gray-600">"Choose the practice that resonates with you now"</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm"><strong>Week 5+:</strong> Shows 3 practices (full autonomy)</p>
                  <p className="text-xs text-gray-600">"Explore practices that resonate with where you are"</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                      <span className="text-white text-xs">🧠</span>
                    </div>
                    <div>
                      <p className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                        Cognitive Defusion
                      </p>
                      <p className="text-xs text-gray-600">Cognitive Reframing • 3 min read</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white rounded text-xs">
                      Explore
                    </button>
                    <Star className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Progression logic hidden in backend. Patient only sees what's available now.
              </p>
            </div>

            {/* Section 4 - Explored Sheet */}
            <div className="p-6 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-lg mb-2 text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                4. "Explored" Sheet (Slide-in Panel)
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Accessed via nav bar button. Shows all previously explored practices.
              </p>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
                <div className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Explored</div>
                <p className="text-xs text-gray-600">Practices you've explored before. Return to what resonates.</p>
                
                <div className="p-3 bg-white rounded border border-gray-200">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2">
                      <Heart className="w-8 h-8 text-rose-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>Urge Surfing</p>
                        <p className="text-xs text-gray-600">Ride the wave of cravings...</p>
                        <p className="text-xs text-gray-500 mt-1">Emotional Regulation • 8 min</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button className="px-2 py-1 bg-[#5739FB] text-white rounded text-xs">▶</button>
                      <Star className="w-4 h-4 text-[#5739FB] fill-[#5739FB]" />
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Dedicated reflection space. Separated from exploration. Not cluttering main view.
              </p>
            </div>

            {/* Section 5 */}
            <div className="p-6 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-lg mb-2 text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                5. Gentle Closing
              </h3>
              <div className="p-6 bg-gray-50 rounded-lg mb-3">
                <p className="text-sm text-gray-500 italic">
                  Your path unfolds at your pace. These practices are here whenever you're ready to explore.
                </p>
              </div>
              <p className="text-sm text-gray-600">Left-aligned, flows naturally in one line.</p>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-12">
          <h2 className="text-2xl mb-6 text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            Key Features
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <p className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  Favorites System
                </p>
              </div>
              <p className="text-xs text-gray-600">Star to favorite/unfavorite practices</p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <p className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  "Explored" Badge
                </p>
              </div>
              <p className="text-xs text-gray-600">Neutral acknowledgment (not "completed")</p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <p className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  Timeless Language
                </p>
              </div>
              <p className="text-xs text-gray-600">"Whenever you're ready," "Always here," "No rush"</p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <p className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  Pillar-Colored Icons
                </p>
              </div>
              <p className="text-xs text-gray-600">Beautiful gradients for each pillar</p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <p className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  No Progress Tracking
                </p>
              </div>
              <p className="text-xs text-gray-600">Zero percentages, zero completion metrics</p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <p className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  Clean Design
                </p>
              </div>
              <p className="text-xs text-gray-600">White background, subtle hover states, Apple-simple</p>
            </div>
          </div>
        </section>

        {/* v3 Updates (October 2025) */}
        <section className="mb-12">
          <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
            <h2 className="text-2xl mb-4 text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              v3 Updates (October 2025)
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                    Header format matches Inner Compass/Library
                  </p>
                  <p className="text-xs text-gray-600">Image (280px) + blue bar (60px) with title and subheadline</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                    Navigation bar with "Explored" button
                  </p>
                  <p className="text-xs text-gray-600">Shows count of revisitable practices, opens sheet when clicked</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                    Dynamic practice count (1-3 based on patient week)
                  </p>
                  <p className="text-xs text-gray-600">Week 1-2 = 1 practice, Week 3-4 = 2, Week 5+ = 3</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                    Separated exploration and reflection
                  </p>
                  <p className="text-xs text-gray-600">Main view = only unexplored, "Explored" sheet = only revisits</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                    Refined bottom copy alignment
                  </p>
                  <p className="text-xs text-gray-600">Left-aligned, flows naturally in one line</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Backend Logic */}
        <section className="mb-12">
          <h2 className="text-2xl mb-6 text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            Backend Logic (Invisible)
          </h2>
          
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl">
            <p className="text-gray-700 mb-4 leading-relaxed">
              All progression, sequencing, and tracking happens in the backend:
            </p>
            
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#5739FB] mt-1">•</span>
                <span>Dynamic practice count logic (Week 1-2: 1, Week 3-4: 2, Week 5+: 3)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#5739FB] mt-1">•</span>
                <span>LUMA determines which practices to surface</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#5739FB] mt-1">•</span>
                <span>Backend tracks micro-block states (red/orange/green)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#5739FB] mt-1">•</span>
                <span>Clinicians see progress dashboards</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#5739FB] mt-1">•</span>
                <span><strong>Patients see none of this</strong></span>
              </li>
            </ul>
          </div>
        </section>

        {/* Test It */}
        <section className="mb-12">
          <div className="p-8 bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] rounded-2xl text-white">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              Experience It Live
            </h2>
            
            <p className="mb-6 leading-relaxed opacity-90">
              The NOW Principle is live in the patient journey. Create a patient account and see the timeless, 
              pressure-free experience.
            </p>
            
            <button
              onClick={() => onNavigate("Journey")}
              className="px-6 py-3 bg-white text-[#3E2BB8] rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 group"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              View Live Journey
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </section>

        {/* Apple for Addiction */}
        <section className="mb-12">
          <div className="p-6 bg-gray-50 border-2 border-gray-200 rounded-xl text-center">
            <h3 className="text-xl mb-3 text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              This is Apple for Addiction
            </h3>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Simple. Clean. Dignified. Timeless. No pressure. Just presence.
            </p>
            <p className="text-gray-700 mt-4 italic">
              The patient is always in the now. The journey is always here. Start when ready.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
