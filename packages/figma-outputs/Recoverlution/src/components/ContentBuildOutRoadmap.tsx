import { ArrowLeft, Circle, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";

export function ContentBuildOutRoadmap() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="border-b border-[rgba(62,43,184,0.1)] bg-white">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Product DNA
          </Button>
          <div className="space-y-2">
            <div className="text-sm text-[#6B7280]">Visual Roadmap</div>
            <h1 className="text-4xl font-bold text-[#1A1A1A]">Content Build-Out Roadmap</h1>
            <p className="text-lg text-[#6B7280]">
              ST43-ST46: The systematic plan to build the content library
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-8 py-12 space-y-16">
        
        {/* Overview */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">The Big Picture</h2>
          
          <div className="bg-gradient-to-br from-[#5739FB]/5 to-[#3E2BB8]/5 rounded-2xl border border-[#5739FB]/20 p-8 space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-[#3E2BB8]">84</div>
                <div className="text-sm text-[#6B7280]">Daily Exercises<br />(12 weeks)</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-[#5739FB]">440</div>
                <div className="text-sm text-[#6B7280]">Micro-Blocks<br />(Documented)</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-[#7C67FF]">585</div>
                <div className="text-sm text-[#6B7280]">Content Pieces<br />(Articles/Exercises)</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-[#9D8FFF]">264</div>
                <div className="text-sm text-[#6B7280]">Videos<br />(Target)</div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-[#5739FB]/20 text-center">
              <p className="text-[#1A1A1A]">
                <strong>Total Timeline:</strong> 2 years to 100% coverage (phased approach)
              </p>
            </div>
          </div>
        </section>

        {/* The 4 Stories */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">The 4 Stories</h2>
          
          <div className="space-y-4">
            {/* ST43 */}
            <button 
              onClick={() => window.location.href = '/docs/weekly-era-sprints'}
              className="w-full bg-white rounded-xl border-2 border-[#DC2626]/20 p-6 space-y-4 hover:shadow-lg hover:border-[#DC2626]/40 transition-all text-left"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-[#DC2626]">ST43</div>
                  <h3 className="text-xl font-semibold text-[#1A1A1A]">Weekly ERA Sprints Design ➜</h3>
                </div>
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              
              <p className="text-[#6B7280]">
                Design 84 daily exercises (12 weeks × 7 days) that follow ERA flow (Experience → Recognize → Align)
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <div className="text-sm font-medium text-[#1A1A1A] mb-2">Key Deliverable:</div>
                  <div className="text-sm text-[#6B7280]">Week = 1 Theme (completable scope)</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#1A1A1A] mb-2">Timeline:</div>
                  <div className="text-sm text-[#6B7280]">3 months (write all 84 exercises)</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <div className="text-xs bg-green-600/10 text-green-700 px-2 py-1 rounded font-medium">✓ Week 1 Complete</div>
                <div className="text-xs bg-[#F59E0B]/10 text-[#F59E0B] px-2 py-1 rounded">Size: XL</div>
                <div className="text-xs bg-[#6B7280]/10 text-[#6B7280] px-2 py-1 rounded">Phase: Content</div>
              </div>
            </button>

            {/* ST44 */}
            <div className="bg-white rounded-xl border-2 border-[#F59E0B]/20 p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-[#F59E0B]">ST44</div>
                  <h3 className="text-xl font-semibold text-[#1A1A1A]">Micro-Block Library Build-Out</h3>
                </div>
                <Circle className="h-5 w-5 text-[#6B7280]" />
              </div>
              
              <p className="text-[#6B7280]">
                Document all 440 micro-blocks with headline, science, practice, related blocks. Build Apple-clean UI.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <div className="text-sm font-medium text-[#1A1A1A] mb-2">Key Deliverable:</div>
                  <div className="text-sm text-[#6B7280]">Searchable library with export (PDF/CSV)</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#1A1A1A] mb-2">Timeline:</div>
                  <div className="text-sm text-[#6B7280]">8 weeks (2 clinical writers full-time)</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <div className="text-xs bg-[#DC2626]/10 text-[#DC2626] px-2 py-1 rounded">Priority: HIGH</div>
                <div className="text-xs bg-[#DC2626]/10 text-[#DC2626] px-2 py-1 rounded">Size: XXL</div>
                <div className="text-xs bg-[#6B7280]/10 text-[#6B7280] px-2 py-1 rounded">Phase: Content</div>
              </div>
            </div>

            {/* ST45 */}
            <div className="bg-white rounded-xl border-2 border-[#10B981]/20 p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-[#10B981]">ST45</div>
                  <h3 className="text-xl font-semibold text-[#1A1A1A]">Content Mapping & Tagging System</h3>
                </div>
                <Circle className="h-5 w-5 text-[#6B7280]" />
              </div>
              
              <p className="text-[#6B7280]">
                Audit 75 existing pieces, tag everything, map to micro-blocks, identify gaps, create content queue.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <div className="text-sm font-medium text-[#1A1A1A] mb-2">Key Deliverable:</div>
                  <div className="text-sm text-[#6B7280]">Coverage matrix + 585-piece creation queue</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#1A1A1A] mb-2">Timeline:</div>
                  <div className="text-sm text-[#6B7280]">4 weeks audit + 2 years content creation</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <div className="text-xs bg-[#DC2626]/10 text-[#DC2626] px-2 py-1 rounded">Priority: HIGH</div>
                <div className="text-xs bg-[#F59E0B]/10 text-[#F59E0B] px-2 py-1 rounded">Size: L</div>
                <div className="text-xs bg-[#6B7280]/10 text-[#6B7280] px-2 py-1 rounded">Phase: Content</div>
              </div>
            </div>

            {/* ST46 */}
            <div className="bg-white rounded-xl border-2 border-[#3E2BB8]/20 p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-[#3E2BB8]">ST46</div>
                  <h3 className="text-xl font-semibold text-[#1A1A1A]">Wellbeing Video Library Audit</h3>
                </div>
                <Circle className="h-5 w-5 text-[#6B7280]" />
              </div>
              
              <p className="text-[#6B7280]">
                Audit 25 videos, integrate Daniel's 50-100 videos, tag to micro-blocks, create 4 videos/week.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <div className="text-sm font-medium text-[#1A1A1A] mb-2">Key Deliverable:</div>
                  <div className="text-sm text-[#6B7280]">60% block coverage, 100% RED coverage</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#1A1A1A] mb-2">Timeline:</div>
                  <div className="text-sm text-[#6B7280]">5 weeks integration + 1 year production</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <div className="text-xs bg-[#DC2626]/10 text-[#DC2626] px-2 py-1 rounded">Priority: HIGH</div>
                <div className="text-xs bg-[#F59E0B]/10 text-[#F59E0B] px-2 py-1 rounded">Size: L</div>
                <div className="text-xs bg-[#6B7280]/10 text-[#6B7280] px-2 py-1 rounded">Phase: Content</div>
              </div>
            </div>
          </div>
        </section>

        {/* Dependency Flow */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">Dependency Flow</h2>
          
          <div className="bg-white rounded-xl border border-[rgba(62,43,184,0.1)] p-8">
            <div className="flex flex-col items-center space-y-6">
              {/* ST43 */}
              <div className="w-full max-w-md">
                <div className="bg-[#DC2626]/10 border-2 border-[#DC2626] rounded-lg p-4 text-center">
                  <div className="font-bold text-[#DC2626]">ST43</div>
                  <div className="text-sm text-[#1A1A1A]">Weekly ERA Sprints</div>
                  <div className="text-xs text-[#6B7280] mt-1">(Finalize hierarchy naming)</div>
                </div>
              </div>
              
              <div className="text-2xl text-[#5739FB]">↓</div>
              
              {/* ST44 */}
              <div className="w-full max-w-md">
                <div className="bg-[#F59E0B]/10 border-2 border-[#F59E0B] rounded-lg p-4 text-center">
                  <div className="font-bold text-[#F59E0B]">ST44</div>
                  <div className="text-sm text-[#1A1A1A]">Micro-Block Library</div>
                  <div className="text-xs text-[#6B7280] mt-1">(Blocks must exist first)</div>
                </div>
              </div>
              
              <div className="text-2xl text-[#5739FB]">↓</div>
              
              {/* ST45 & ST46 in parallel */}
              <div className="w-full max-w-2xl grid md:grid-cols-2 gap-4">
                <div className="bg-[#10B981]/10 border-2 border-[#10B981] rounded-lg p-4 text-center">
                  <div className="font-bold text-[#10B981]">ST45</div>
                  <div className="text-sm text-[#1A1A1A]">Content Mapping</div>
                  <div className="text-xs text-[#6B7280] mt-1">(Tag to blocks)</div>
                </div>
                
                <div className="bg-[#3E2BB8]/10 border-2 border-[#3E2BB8] rounded-lg p-4 text-center">
                  <div className="font-bold text-[#3E2BB8]">ST46</div>
                  <div className="text-sm text-[#1A1A1A]">Video Library</div>
                  <div className="text-xs text-[#6B7280] mt-1">(Tag videos to blocks)</div>
                </div>
              </div>
              
              <div className="text-sm text-[#6B7280] bg-[#F5F3FF] rounded-lg px-4 py-2 max-w-md text-center">
                ST45 & ST46 can run in parallel after ST44 is complete
              </div>
            </div>
          </div>
        </section>

        {/* The Hierarchy */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">The Hierarchy (Final)</h2>
          
          <div className="bg-white rounded-xl border border-[rgba(62,43,184,0.1)] p-8 space-y-8">
            <div className="flex flex-col items-center space-y-6">
              {/* Level 1: Pillar */}
              <div className="w-full max-w-lg">
                <div className="bg-[#3E2BB8] text-white rounded-lg p-4 text-center">
                  <div className="text-sm opacity-80">Level 1</div>
                  <div className="text-xl font-bold">PILLAR</div>
                  <div className="text-sm opacity-80 mt-1">6 total (e.g., Emotional Regulation)</div>
                </div>
              </div>
              
              <div className="text-2xl text-[#5739FB]">↓</div>
              
              {/* Level 2: Concept */}
              <div className="w-full max-w-lg">
                <div className="bg-[#5739FB] text-white rounded-lg p-4 text-center">
                  <div className="text-sm opacity-80">Level 2</div>
                  <div className="text-xl font-bold">CONCEPT</div>
                  <div className="text-sm opacity-80 mt-1">10-15 per pillar, ~70-100 total (e.g., Window of Tolerance)</div>
                </div>
              </div>
              
              <div className="text-2xl text-[#7C67FF]">↓</div>
              
              {/* Level 3: Theme */}
              <div className="w-full max-w-lg">
                <div className="bg-[#7C67FF] text-white rounded-lg p-4 text-center">
                  <div className="text-sm opacity-80">Level 3</div>
                  <div className="text-xl font-bold">THEME</div>
                  <div className="text-sm opacity-80 mt-1">3-7 per concept, ~200-300 total (e.g., Down-Regulation Techniques)</div>
                  <div className="text-xs bg-white/20 rounded px-2 py-1 mt-2 inline-block">
                    ✅ Weekly Sprint Scope = 1 Theme
                  </div>
                </div>
              </div>
              
              <div className="text-2xl text-[#9D8FFF]">↓</div>
              
              {/* Level 4: Micro-Block */}
              <div className="w-full max-w-lg">
                <div className="bg-[#9D8FFF] text-white rounded-lg p-4 text-center">
                  <div className="text-sm opacity-80">Level 4</div>
                  <div className="text-xl font-bold">MICRO-BLOCK</div>
                  <div className="text-sm opacity-80 mt-1">3-8 per theme, ~400-500 total (e.g., Box Breathing)</div>
                  <div className="text-xs bg-white/20 rounded px-2 py-1 mt-2 inline-block">
                    🎯 Atomic unit - what patients DO
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t text-center text-sm text-[#6B7280] space-y-2">
              <div><strong>Concept</strong> = What clinicians understand</div>
              <div><strong>Theme</strong> = What patients practice (1 week)</div>
              <div><strong>Micro-Block</strong> = What patients do (atomic skill)</div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">Build Timeline</h2>
          
          <div className="space-y-4">
            {/* Phase 1 */}
            <div className="bg-white rounded-xl border border-[rgba(62,43,184,0.1)] p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-bold shrink-0">1</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-[#1A1A1A]">Phase 1: Foundation</h3>
                    <div className="text-sm text-[#6B7280]">Weeks 1-4</div>
                  </div>
                  <ul className="text-sm text-[#6B7280] space-y-1">
                    <li>• ST43: Finalize hierarchy + write Week 1-2 exercises</li>
                    <li>• ST44: Document first 100 blocks (Emotional Regulation + Stress Resilience)</li>
                  </ul>
                  <div className="text-xs bg-[#10B981]/10 text-[#10B981] px-2 py-1 rounded inline-block">
                    Milestone: Hierarchy locked, first 100 blocks live, Week 1-2 testable
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-white rounded-xl border border-[rgba(62,43,184,0.1)] p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-[#F59E0B] text-white flex items-center justify-center font-bold shrink-0">2</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-[#1A1A1A]">Phase 2: Core Content</h3>
                    <div className="text-sm text-[#6B7280]">Weeks 5-12</div>
                  </div>
                  <ul className="text-sm text-[#6B7280] space-y-1">
                    <li>• ST44: Document remaining 340 blocks</li>
                    <li>• ST45: Audit + tag all existing content</li>
                    <li>• ST46: Integrate Daniel's video library</li>
                  </ul>
                  <div className="text-xs bg-[#10B981]/10 text-[#10B981] px-2 py-1 rounded inline-block">
                    Milestone: All 440 blocks documented, all content tagged, Daniel's videos live
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="bg-white rounded-xl border border-[rgba(62,43,184,0.1)] p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold shrink-0">3</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-[#1A1A1A]">Phase 3: Gap Filling</h3>
                    <div className="text-sm text-[#6B7280]">Weeks 13-52</div>
                  </div>
                  <ul className="text-sm text-[#6B7280] space-y-1">
                    <li>• ST43: Write remaining 72 exercises (Weeks 3-12)</li>
                    <li>• ST45: Create 6 content pieces/week (articles, exercises)</li>
                    <li>• ST46: Create 4 videos/week</li>
                  </ul>
                  <div className="text-xs bg-[#10B981]/10 text-[#10B981] px-2 py-1 rounded inline-block">
                    Milestone: Weeks 1-12 complete, 80% content coverage, 60% video coverage
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="bg-white rounded-xl border border-[rgba(62,43,184,0.1)] p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-[#3E2BB8] text-white flex items-center justify-center font-bold shrink-0">4</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-[#1A1A1A]">Phase 4: Full Coverage</h3>
                    <div className="text-sm text-[#6B7280]">Year 2</div>
                  </div>
                  <ul className="text-sm text-[#6B7280] space-y-1">
                    <li>• ST45: Continue content creation (remaining 60%)</li>
                    <li>• ST46: Continue video creation (remaining 40%)</li>
                  </ul>
                  <div className="text-xs bg-[#10B981]/10 text-[#10B981] px-2 py-1 rounded inline-block">
                    Milestone: 100% coverage, library fully mature
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resource Requirements */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">Resource Requirements</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-[rgba(62,43,184,0.1)] p-6 space-y-4">
              <h3 className="font-semibold text-[#3E2BB8]">Team Needed</h3>
              <ul className="space-y-2 text-sm text-[#1A1A1A]">
                <li className="flex items-start space-x-2">
                  <span className="text-[#5739FB] mt-0.5">•</span>
                  <span><strong>2 Clinical Writers</strong> (ST43, ST44, ST45)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#5739FB] mt-0.5">•</span>
                  <span><strong>1 Instructional Designer</strong> (ST43)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#5739FB] mt-0.5">•</span>
                  <span><strong>1 Content Strategist</strong> (ST45)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#5739FB] mt-0.5">•</span>
                  <span><strong>1 Video Producer</strong> (ST46)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#5739FB] mt-0.5">•</span>
                  <span><strong>1 Videographer</strong> (ST46, part-time)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#5739FB] mt-0.5">•</span>
                  <span><strong>1 Animator</strong> (ST46, part-time)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#5739FB] mt-0.5">•</span>
                  <span><strong>1 Frontend Developer</strong> (ST44 library UI)</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl border border-[rgba(62,43,184,0.1)] p-6 space-y-4">
              <h3 className="font-semibold text-[#3E2BB8]">Production Velocity</h3>
              <ul className="space-y-2 text-sm text-[#1A1A1A]">
                <li className="flex items-center justify-between">
                  <span>Daily Exercises</span>
                  <span className="font-medium text-[#5739FB]">~7 per week</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Micro-Blocks</span>
                  <span className="font-medium text-[#5739FB]">~55 per week</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Articles/Exercises</span>
                  <span className="font-medium text-[#5739FB]">6 per week</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Videos</span>
                  <span className="font-medium text-[#5739FB]">4 per week</span>
                </li>
              </ul>
              
              <div className="pt-4 border-t text-xs text-[#6B7280]">
                These velocities assume full-time dedicated resources + sustainable pace
              </div>
            </div>
          </div>
        </section>

        {/* Key Decisions */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">Key Decisions Needed</h2>
          
          <div className="bg-[#FEF3C7] rounded-xl border-2 border-[#F59E0B] p-6 space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-[#F59E0B] text-white flex items-center justify-center text-sm font-bold shrink-0">!</div>
              <div className="space-y-3 flex-1">
                <p className="font-medium text-[#92400E]">Before we start building:</p>
                
                <ul className="space-y-2 text-sm text-[#92400E]">
                  <li className="flex items-start space-x-2">
                    <span className="font-bold">1.</span>
                    <span><strong>Approve hierarchy:</strong> Pillar → Concept → Theme → Micro-Block (4 levels)?</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-bold">2.</span>
                    <span><strong>Confirm scope:</strong> Week = 1 Theme (right size for completion)?</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-bold">3.</span>
                    <span><strong>Video library access:</strong> When can we audit Daniel's full library?</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-bold">4.</span>
                    <span><strong>Resource budget:</strong> Approve team hiring for content creation?</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-bold">5.</span>
                    <span><strong>Build order:</strong> Which story starts first?</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-8">
          <div className="bg-gradient-to-r from-[#5739FB] to-[#3E2BB8] rounded-2xl p-12 text-center space-y-4">
            <h3 className="text-2xl font-bold text-white">Ready to Build the Content Library</h3>
            <p className="text-white/90 max-w-2xl mx-auto">
              Everything is mapped, visualized, and ready. Sign off on these decisions and we start filling the sphere with blocks.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
