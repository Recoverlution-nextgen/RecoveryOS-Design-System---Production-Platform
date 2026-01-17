import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

export function SpherePrinciple() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="border-b border-[rgba(62,43,184,0.1)] bg-white">
        <div className="max-w-5xl mx-auto px-8 py-6">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Product DNA
          </Button>
          <div className="space-y-2">
            <div className="text-sm text-[#6B7280]">Core Principle</div>
            <h1 className="text-4xl font-bold text-[#1A1A1A]">The Sphere Principle</h1>
            <p className="text-lg text-[#6B7280]">
              Why recovery is about building a sphere that rolls, not checking boxes
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-8 py-12 space-y-16">
        
        {/* The Metaphor */}
        <section className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1A1A1A]">The Metaphor</h2>
            <div className="bg-gradient-to-br from-[#5739FB]/5 to-[#3E2BB8]/5 border border-[#5739FB]/20 rounded-2xl p-8">
              <p className="text-xl text-[#1A1A1A] leading-relaxed italic">
                "Everyone is a sphere filled with blocks. When that sphere rolls through life, 
                whatever block is touching the floor is what you're working with."
              </p>
            </div>
          </div>
        </section>

        {/* Visual Representation */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">The Sphere Visualization</h2>
          
          <div className="bg-white rounded-2xl border border-[rgba(62,43,184,0.1)] p-12">
            <div className="flex flex-col items-center space-y-8">
              {/* Sphere illustration - simple circles representing blocks */}
              <div className="relative w-64 h-64">
                {/* Main sphere outline */}
                <div className="absolute inset-0 rounded-full border-4 border-[#5739FB] opacity-20"></div>
                
                {/* Blocks inside sphere - scattered circles */}
                <div className="absolute top-8 left-12 w-12 h-12 rounded-lg bg-[#5739FB] opacity-60 flex items-center justify-center text-white text-xs">
                  Box Breathing
                </div>
                <div className="absolute top-20 right-16 w-10 h-10 rounded-lg bg-[#7C67FF] opacity-60 flex items-center justify-center text-white text-xs">
                  Values
                </div>
                <div className="absolute bottom-24 left-16 w-14 h-14 rounded-lg bg-[#9D8FFF] opacity-60 flex items-center justify-center text-white text-xs">
                  Grounding
                </div>
                <div className="absolute bottom-16 right-12 w-12 h-12 rounded-lg bg-[#3E2BB8] opacity-60 flex items-center justify-center text-white text-xs">
                  RAIN
                </div>
                <div className="absolute top-32 left-24 w-10 h-10 rounded-lg bg-[#C4B5FD] opacity-60 flex items-center justify-center text-white text-xs">
                  Shame
                </div>
                <div className="absolute bottom-32 right-24 w-11 h-11 rounded-lg bg-[#5739FB] opacity-60 flex items-center justify-center text-white text-xs">
                  Window
                </div>
                
                {/* Block touching ground (highlighted) */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-16 h-16 rounded-lg bg-[#3E2BB8] shadow-lg flex items-center justify-center text-white font-medium">
                  Urge Surfing
                </div>
              </div>
              
              {/* Ground line */}
              <div className="w-full h-1 bg-[#E5E5E5] rounded-full"></div>
              
              <p className="text-center text-[#6B7280] max-w-md">
                Whatever block touches the ground is what you're working with in this moment
              </p>
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">What This Means</h2>
          
          <div className="grid gap-6">
            {/* Blocks are Universal */}
            <div className="bg-white rounded-xl border border-[rgba(62,43,184,0.1)] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-[#3E2BB8]">🌐 Blocks are Universal</h3>
              <p className="text-[#1A1A1A] leading-relaxed">
                The same block (e.g., "Box Breathing") can be used in multiple contexts - 
                anxiety, cravings, anger, panic. It's not locked to one pillar or one scenario.
              </p>
            </div>

            {/* Blocks are Portable */}
            <div className="bg-white rounded-xl border border-[rgba(62,43,184,0.1)] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-[#3E2BB8]">🎒 Blocks are Portable</h3>
              <p className="text-[#1A1A1A] leading-relaxed">
                Patients collect blocks into their personal sphere. Favoriting a block means 
                "I want this in my sphere." The sphere is yours - you choose what goes in.
              </p>
            </div>

            {/* Blocks are Contextual */}
            <div className="bg-white rounded-xl border border-[rgba(62,43,184,0.1)] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-[#3E2BB8]">🎯 Blocks are Contextual</h3>
              <p className="text-[#1A1A1A] leading-relaxed">
                Which block you need depends on what surface you're rolling on. Stressful day at work? 
                One block touches. Difficult conversation? Different block. Life picks the context, 
                your sphere has the tools.
              </p>
            </div>

            {/* Blocks are Forever */}
            <div className="bg-white rounded-xl border border-[rgba(62,43,184,0.1)] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-[#3E2BB8]">♾️ Blocks are Forever</h3>
              <p className="text-[#1A1A1A] leading-relaxed">
                You never "complete" a block. You practice it ongoing. There are no checkboxes, 
                no 100% completion. It's fluid and forever - you're always practicing, always growing.
              </p>
            </div>
          </div>
        </section>

        {/* The Journey */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">The Recovery Journey</h2>
          
          <div className="space-y-6">
            {/* Phase 1: Getting It to Roll */}
            <div className="bg-gradient-to-r from-[#DC2626]/5 to-[#F59E0B]/5 rounded-xl border border-[#DC2626]/20 p-6 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-bold">1</div>
                <h3 className="text-lg font-semibold text-[#1A1A1A]">First: Get It to Roll</h3>
              </div>
              <p className="text-[#1A1A1A] leading-relaxed">
                The sphere will never be perfect (neither are humans - that's why we're here). 
                First goal: Build a sphere that rolls. Even if it's wobbly, even if it's incomplete. 
                <strong> Just get it rolling.</strong> That's when recovery starts.
              </p>
            </div>

            {/* Phase 2: Refining */}
            <div className="bg-gradient-to-r from-[#F59E0B]/5 to-[#10B981]/5 rounded-xl border border-[#F59E0B]/20 p-6 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#F59E0B] text-white flex items-center justify-center font-bold">2</div>
                <h3 className="text-lg font-semibold text-[#1A1A1A]">Then: Keep Filling & Refining</h3>
              </div>
              <p className="text-[#1A1A1A] leading-relaxed">
                As the sphere rolls through life, we keep filling it with more blocks. 
                We polish the rough edges. We upgrade blocks that aren't working. 
                We refine until <strong>it rolls fluidly</strong> - that's recovery in motion.
              </p>
            </div>

            {/* Phase 3: Maintenance */}
            <div className="bg-gradient-to-r from-[#10B981]/5 to-[#3E2BB8]/5 rounded-xl border border-[#10B981]/20 p-6 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold">3</div>
                <h3 className="text-lg font-semibold text-[#1A1A1A]">Always: Repair & Maintain</h3>
              </div>
              <p className="text-[#1A1A1A] leading-relaxed">
                Blocks get chipped as the sphere rolls through life. That's normal. We constantly repair, 
                upgrade, and polish. <strong>Taking care of the sphere is the work.</strong> It's not 
                one-and-done. It's ongoing care.
              </p>
            </div>

            {/* Phase 4: Connection */}
            <div className="bg-gradient-to-r from-[#3E2BB8]/5 to-[#5739FB]/5 rounded-xl border border-[#3E2BB8]/20 p-6 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#3E2BB8] text-white flex items-center justify-center font-bold">4</div>
                <h3 className="text-lg font-semibold text-[#1A1A1A]">Beyond: Connect with Other Spheres</h3>
              </div>
              <p className="text-[#1A1A1A] leading-relaxed">
                Once your sphere rolls well, you connect with other spheres. You play different games 
                together - not just rolling alone anymore. <strong>Community. Connection. Co-regulation.</strong> 
                This is where recovery becomes life.
              </p>
            </div>
          </div>
        </section>

        {/* Design Implications */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">Design Implications</h2>
          
          <div className="bg-white rounded-xl border border-[rgba(62,43,184,0.1)] p-8 space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-[#3E2BB8]">What This Means for the Platform:</h3>
              
              <ul className="space-y-3 text-[#1A1A1A]">
                <li className="flex items-start space-x-3">
                  <span className="text-[#5739FB] mt-1">•</span>
                  <span><strong>No checkboxes</strong> - Blocks are never "completed," only practiced</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#5739FB] mt-1">•</span>
                  <span><strong>No progress bars</strong> - The sphere is never "100% complete"</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#5739FB] mt-1">•</span>
                  <span><strong>Favorite system</strong> - "Add to sphere" not "Mark complete"</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#5739FB] mt-1">•</span>
                  <span><strong>Resurface reminders</strong> - "Practice Box Breathing again" not "You finished this"</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#5739FB] mt-1">•</span>
                  <span><strong>Universal blocks</strong> - Same block can appear in multiple contexts</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#5739FB] mt-1">•</span>
                  <span><strong>Contextual serving</strong> - LUMA picks the block based on what surface you're rolling on</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#5739FB] mt-1">•</span>
                  <span><strong>Fluid and forever</strong> - Language emphasizes ongoing practice, not endpoints</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">Why This Matters</h2>
          
          <div className="bg-gradient-to-br from-[#5739FB]/5 to-[#3E2BB8]/5 rounded-2xl border border-[#5739FB]/20 p-8 space-y-4">
            <p className="text-lg text-[#1A1A1A] leading-relaxed">
              Traditional recovery programs use <strong>linear, completion-based models</strong>: 
              "Complete Step 1, then Step 2, then you're done." But addiction isn't linear. 
              Life isn't linear. Recovery isn't linear.
            </p>
            
            <p className="text-lg text-[#1A1A1A] leading-relaxed">
              The sphere is <strong>fluid, contextual, and forever</strong>. Just like real humans. 
              Just like real recovery.
            </p>
            
            <p className="text-lg text-[#1A1A1A] leading-relaxed">
              <strong>A human being who thinks they are perfect doesn't understand the fundamentals of life.</strong> 
              We're not building perfect spheres. We're building spheres that roll. And that's enough.
            </p>
          </div>
        </section>

        {/* Connection to Stories */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">How This Connects to Our Stories</h2>
          
          <div className="grid gap-4">
            <div className="bg-white rounded-lg border border-[rgba(62,43,184,0.1)] p-4 space-y-2">
              <div className="font-medium text-[#3E2BB8]">ST36-ST42: NaviCues & Building Blocks</div>
              <p className="text-sm text-[#6B7280]">
                NaviCues are the blocks. Building Blocks are deep dives into blocks. 
                The entire system is designed around filling patients' spheres with the right tools.
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-[rgba(62,43,184,0.1)] p-4 space-y-2">
              <div className="font-medium text-[#3E2BB8]">ST43: Weekly ERA Sprints</div>
              <p className="text-sm text-[#6B7280]">
                Each week adds blocks to the sphere. By Week 12, the sphere has enough blocks to roll. 
                Then we keep adding, refining, repairing.
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-[rgba(62,43,184,0.1)] p-4 space-y-2">
              <div className="font-medium text-[#3E2BB8]">ST44: Micro-Block Library</div>
              <p className="text-sm text-[#6B7280]">
                The library is every possible block that could go in a sphere. 440 blocks. 
                Patients browse, explore, and favorite the ones they want.
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-[rgba(62,43,184,0.1)] p-4 space-y-2">
              <div className="font-medium text-[#3E2BB8]">ST45-ST46: Content & Video Mapping</div>
              <p className="text-sm text-[#6B7280]">
                Every block needs supporting content (articles, videos, exercises) so patients 
                can fully understand and practice each block in their sphere.
              </p>
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="py-8">
          <div className="bg-[#3E2BB8] rounded-2xl p-12 text-center">
            <p className="text-2xl text-white font-medium leading-relaxed">
              "The sphere will never be perfect.<br />
              But it will roll.<br />
              And that's recovery."
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
