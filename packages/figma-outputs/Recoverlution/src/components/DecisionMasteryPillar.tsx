import { ArrowLeft, Brain, Users, Layers, TrendingUp, Target, Lightbulb, MessageSquare, Map, Zap, Shield, Clock, Activity, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { StoryLink } from "./StoryLink";

interface DecisionMasteryPillarProps {
  onNavigate?: (page: string) => void;
}

export function DecisionMasteryPillar({ onNavigate }: DecisionMasteryPillarProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#3E2BB8]/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="gap-2 text-[#3E2BB8] hover:text-[#5739FB] hover:bg-[#F5F3FF]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Brand Anchor
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#3E2BB8] via-[#5739FB] to-[#7C67FF]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Zap className="w-4 h-4 text-white" />
              <span className="text-sm text-white/90">Chapter Six · Pillar 6 of 6</span>
            </div>
            
            <h1 className="text-6xl font-display font-semibold text-white mb-6 leading-tight">
              Make Space to Choose
            </h1>
            
            <p className="text-2xl text-white/90 mb-8 leading-relaxed">
              The Decision Mastery Thesis
            </p>
            
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Lightbulb className="w-6 h-6 text-white flex-shrink-0 mt-1" />
              <p className="text-lg text-white/90 leading-relaxed">
                <strong className="text-white">Science · stories · soul.</strong> Decisions are moments where futures fork. We lengthen the gap, lighten the load, and shape the field so the wiser move becomes the easy move.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tagline & Core Promise */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="max-w-3xl">
          <div className="mb-12">
            <h2 className="text-4xl font-display font-semibold text-[#1A1A1A] mb-4">
              Make room. Make the move.
            </h2>
            <p className="text-xl text-[#6B7280] leading-relaxed">
              In hot moments, your brain saves you with speed—and sometimes that speed saves the wrong thing. Decision Mastery is about making room to choose, then making the right move cheaper than the wrong one. Not heroic; just honest and well-designed.
            </p>
          </div>

          {/* Related Content Tools */}
          {onNavigate && (
            <div className="bg-gradient-to-br from-[#3E2BB8]/5 to-[#5739FB]/5 rounded-xl p-6 border border-[#5739FB]/10">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-[#3E2BB8]" />
                <h3 className="text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
                  Micro-Blocks & Resources
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                8 micro-blocks and therapeutic practices for Decision Mastery
              </p>
              <div className="flex flex-wrap gap-2">
                <StoryLink storyId="ST43" onNavigate={onNavigate} variant="pill" showTitle />
                <StoryLink storyId="ST42" onNavigate={onNavigate} variant="pill" showTitle />
                <StoryLink storyId="ST45" onNavigate={onNavigate} variant="pill" showTitle />
              </div>
            </div>
          )}

          <div className="space-y-6">
            <Card className="border-[#3E2BB8]/10 bg-[#F5F3FF]/30">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">What We're Building</h3>
                <ul className="space-y-2 text-[#1A1A1A]">
                  <li className="flex items-start gap-3">
                    <span className="text-[#5739FB] mt-1">•</span>
                    <span><strong>Gap:</strong> a trained 2-second pause under load</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5739FB] mt-1">•</span>
                    <span><strong>Grip:</strong> one better option at hand, every time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5739FB] mt-1">•</span>
                    <span><strong>Field:</strong> environments and defaults that carry when you're tired</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* The Thesis */}
      <div className="bg-[#FAFAFA] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-display font-semibold text-[#1A1A1A] mb-8">The Thesis</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Problem, simply</h3>
                <p className="text-[#1A1A1A] leading-relaxed">
                  Under heat, the brain shifts from model-based control (planful, values-aligned) to model-free habits (fast, cue-bound). Discounting spikes, attention narrows, and the cost of "right later" feels infinite now.
                </p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Answer, human</h3>
                <p className="text-[#1A1A1A] leading-relaxed">
                  Create time and traction: buy two seconds, show one better option, and arrange the world so it costs less to do what you meant. We don't preach willpower; we design for it.
                </p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">How we do it</h3>
                <p className="text-[#1A1A1A] leading-relaxed">
                  Weekly ERA journeys (Experience → Recognise → Align) that train pause, plan, and field design + on-demand ResCues (30-180s) that stretch the gap and tilt the board + a gentle Inner Compass (Energy · Clarity · Connection) to match effort to state. LUMA explains every nudge—why now, why this, what it should buy you.
                </p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Why it endures</h3>
                <p className="text-[#1A1A1A] leading-relaxed">
                  Small, repeated wins up-weight model-based control; environments stay edited; identity gets practiced in the exact places it used to leak.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Vows */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-display font-semibold text-[#1A1A1A] mb-8">The Vows (lines we hold)</h2>
          
          <div className="grid gap-4">
            {[
              { icon: Clock, title: "Space first, then choice", desc: "We buy seconds before we sell advice." },
              { icon: Shield, title: "Friction is a feature", desc: "Make good easy and risky hard." },
              { icon: Target, title: "Defaults decide", desc: "We design lanes, not lectures." },
              { icon: Brain, title: "Explain the economics", desc: "Time, energy, and attention are currencies; we budget them out loud." },
              { icon: Activity, title: "Kind math", desc: "We count progress by better, sooner, more often, not by perfect." }
            ].map((vow, index) => (
              <Card key={index} className="border-[#3E2BB8]/10 hover:border-[#5739FB]/30 transition-colors">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] flex items-center justify-center flex-shrink-0">
                    <vow.icon className="w-5 h-5 text-[#5739FB]" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-[#1A1A1A] mb-1">{vow.title}</h3>
                    <p className="text-[#6B7280]">{vow.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Dream Team */}
      <div className="bg-[#FAFAFA] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <Users className="w-8 h-8 text-[#5739FB]" />
              <h2 className="text-3xl font-display font-semibold text-[#1A1A1A]">Dream Team</h2>
            </div>
            
            <p className="text-[#6B7280] mb-8 leading-relaxed">
              The researchers whose work underwrites our patterns. Our patterns put their work in your pocket.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-[#3E2BB8]/10">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Neuroeconomics & Control</h3>
                  <ul className="space-y-2 text-[#1A1A1A]">
                    <li>• Paul Glimcher</li>
                    <li>• Antonio Rangel</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-[#3E2BB8]/10">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Behavioral Economics</h3>
                  <ul className="space-y-2 text-[#1A1A1A]">
                    <li>• Richard H. Thaler</li>
                    <li>• Cass R. Sunstein</li>
                    <li>• Katy Milkman</li>
                    <li>• George Loewenstein</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-[#3E2BB8]/10">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Effort & Grit</h3>
                  <ul className="space-y-2 text-[#1A1A1A]">
                    <li>• Angela Duckworth</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-[#3E2BB8]/10">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Judgment & Heuristics</h3>
                  <ul className="space-y-2 text-[#1A1A1A]">
                    <li>• Daniel Kahneman †</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-[#3E2BB8]/10">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Habit & Context</h3>
                  <ul className="space-y-2 text-[#1A1A1A]">
                    <li>• Wendy Wood</li>
                    <li>• BJ Fogg</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Core Model */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-display font-semibold text-[#1A1A1A] mb-8">Core Model (jargon-light)</h2>
          
          <Card className="border-[#3E2BB8]/10 bg-[#F5F3FF]/30 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">⚡</div>
                <p className="text-lg text-[#1A1A1A]">
                  <strong>Cue → Gap → Choose → Carry</strong>
                </p>
              </div>
              <div className="space-y-2 text-[#6B7280] leading-relaxed">
                <p><strong className="text-[#1A1A1A]">Cue:</strong> something grabs you (place, feeling, face, phone)</p>
                <p><strong className="text-[#1A1A1A]">Gap:</strong> we create two deliberate seconds (breath, gaze, phrase)</p>
                <p><strong className="text-[#1A1A1A]">Choose:</strong> a small, values-true option appears; we pick it</p>
                <p><strong className="text-[#1A1A1A]">Carry:</strong> we adjust the field so the next time costs less</p>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-xl font-display font-semibold text-[#1A1A1A] mb-4">Under the hood (fast sketch)</h3>
          <ul className="space-y-2 text-[#1A1A1A]">
            <li className="flex items-start gap-3">
              <span className="text-[#5739FB] mt-1">•</span>
              <span>Model-free dominance under stress; we restore model-based planning with pause and prompts</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#5739FB] mt-1">•</span>
              <span>Temporal discounting tilts to now; we add near rewards to long-term goods</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#5739FB] mt-1">•</span>
              <span>Loss aversion makes letting go feel costly; we reframe losses as trade-ups</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#5739FB] mt-1">•</span>
              <span>Choice architecture shifts behavior by defaults, friction, salience</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Skills Stack */}
      <div className="bg-[#FAFAFA] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <Layers className="w-8 h-8 text-[#5739FB]" />
            <h2 className="text-3xl font-display font-semibold text-[#1A1A1A]">Skills Stack (what we train)</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                letter: "A",
                title: "Make the Gap",
                duration: "20-90s",
                description: "Temporal Dilation: gaze to horizon → one slow exhale → one cue phrase. If I feel X, I buy 2 seconds: a lock-screen line and a haptic.",
                icon: Clock
              },
              {
                letter: "B",
                title: "Surface the Option",
                duration: "60-120s",
                description: "One Bright Option: the smallest values-true move in reach (call, text, step, sip, swap). Pros/Next: write 10 words—what this buys me now and later.",
                icon: Target
              },
              {
                letter: "C",
                title: "Edit the Field",
                duration: "90-180s",
                description: "Choice Architecture: friction down on good (pre-positioned water, autosaved routes); friction up on risky (timeouts, distance, uninstall, time-windowing). Temptation Bundling: pair a chore with a clean reward.",
                icon: Map
              },
              {
                letter: "D",
                title: "Pre-commit & Protect",
                duration: "60-180s",
                description: "If-Then Cards tailored to contexts; Hardware Rules (no cards at night, cash split). Buddy Defaults: a person auto-pings if a red zone is entered.",
                icon: Shield
              },
              {
                letter: "E",
                title: "After-Action Learning",
                duration: "90-180s",
                description: "Lapse to Learning: regulate → one environmental, one social, one identity edit. Receipt Keeping: short notes of wins; LUMA mirrors patterns Sunday.",
                icon: Activity
              }
            ].map((skill, index) => (
              <Card key={index} className="border-[#3E2BB8]/10 hover:border-[#5739FB]/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#3E2BB8] text-white flex items-center justify-center font-display font-semibold flex-shrink-0">
                      {skill.letter}
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] flex items-center justify-center flex-shrink-0">
                      <skill.icon className="w-5 h-5 text-[#5739FB]" />
                    </div>
                  </div>
                  <h3 className="font-display font-semibold text-[#1A1A1A] mb-1">{skill.title}</h3>
                  <p className="text-sm text-[#5739FB] mb-3">{skill.duration}</p>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Six Themes */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-display font-semibold text-[#1A1A1A] mb-4">
            Six Themes (12-week arc, non-linear)
          </h2>
          <p className="text-xl text-[#6B7280] leading-relaxed max-w-3xl">
            We train the gap, the option, and the field—over and over until it sticks.
          </p>
        </div>

        <div className="space-y-6">
          {[
            {
              number: "T1",
              title: "Buy Two Seconds",
              tagline: "Temporal dilation; cue phrase; haptic",
              weekA: "Dilation basics",
              weekB: "Cue phrase + haptic",
              color: "bg-[#3E2BB8]"
            },
            {
              number: "T2",
              title: "Keep One Bright Option",
              tagline: "Make the good move easy",
              weekA: "Option map (home/work/social)",
              weekB: "Option kits",
              color: "bg-[#5739FB]"
            },
            {
              number: "T3",
              title: "Design the Defaults",
              tagline: "Friction edits; salience; layout",
              weekA: "Good friction down",
              weekB: "Risk friction up",
              color: "bg-[#7C67FF]"
            },
            {
              number: "T4",
              title: "Pre-commit on Purpose",
              tagline: "If-then, locks, buddy rules",
              weekA: "If-Then cards",
              weekB: "Hardware rules + buddy defaults",
              color: "bg-[#9D8FFF]"
            },
            {
              number: "T5",
              title: "Sweeten the Long Game",
              tagline: "Bundling; near-term rewards for far aims",
              weekA: "Bundles you want",
              weekB: "Near rewards calendar",
              color: "bg-[#5739FB]"
            },
            {
              number: "T6",
              title: "Learn the Loop",
              tagline: "Lapse→learning; receipts that teach",
              weekA: "Lapse→Learning flow",
              weekB: "Receipts & review",
              color: "bg-[#3E2BB8]"
            }
          ].map((theme, index) => (
            <Card key={index} className="border-[#3E2BB8]/10 hover:border-[#5739FB]/30 transition-colors overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-stretch">
                  <div className={`${theme.color} w-2 flex-shrink-0`}></div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-display font-semibold text-[#5739FB]">{theme.number}</span>
                          <h3 className="font-display font-semibold text-[#1A1A1A] text-xl">{theme.title}</h3>
                        </div>
                        <p className="text-[#6B7280] italic">{theme.tagline}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <div className="flex-1 p-3 rounded-lg bg-[#F5F3FF]">
                        <p className="text-xs text-[#5739FB] mb-1">Week A</p>
                        <p className="text-sm text-[#1A1A1A] font-medium">{theme.weekA}</p>
                      </div>
                      <div className="flex-1 p-3 rounded-lg bg-[#F5F3FF]">
                        <p className="text-xs text-[#5739FB] mb-1">Week B</p>
                        <p className="text-sm text-[#1A1A1A] font-medium">{theme.weekB}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-[#3E2BB8]/10 bg-[#F5F3FF]/30 mt-8">
          <CardContent className="p-6">
            <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">ERA Skeleton (any week)</h3>
            <p className="text-[#1A1A1A] leading-relaxed">
              Sun Lens → Mon Experience → Tue Journal → Wed Recognise → Thu Journal → Fri Align → Sat Journal → Sun Replay
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ResCue Types */}
      <div className="bg-[#FAFAFA] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-display font-semibold text-[#1A1A1A] mb-4">
              ResCue Types (decision-tuned)
            </h2>
            <p className="text-xl text-[#6B7280] leading-relaxed max-w-3xl">
              Tiny plays that make room to move and lower the price of the right move.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                code: "RT-G",
                title: "Gap Makers",
                items: [
                  "Temporal Dilation (60-90s)",
                  "Cue Phrase + Haptic (30s)",
                  "Gaze Horizon (30s)"
                ]
              },
              {
                code: "RT-O",
                title: "Options at Hand",
                items: [
                  "One Bright Option (90s)",
                  "Pros/Next (60s)",
                  "Sip/Step/Swap (60s)"
                ]
              },
              {
                code: "RT-F",
                title: "Field Editors",
                items: [
                  "Friction Down (120s)",
                  "Friction Up (120s)",
                  "Salience Swap (90s)"
                ]
              },
              {
                code: "RT-P",
                title: "Pre-commit & Protect",
                items: [
                  "If-Then Cards (120s)",
                  "Hardware Rules (120s)",
                  "Buddy Default (90s)"
                ]
              },
              {
                code: "RT-B",
                title: "Bundles & Rewards",
                items: [
                  "Temptation Bundle (120s)",
                  "Near Reward (60s)"
                ]
              },
              {
                code: "RT-L",
                title: "Learn the Loop",
                items: [
                  "Lapse→Learning (180s)",
                  "Receipt Keeper (90s)"
                ]
              }
            ].map((rescue, index) => (
              <Card key={index} className="border-[#3E2BB8]/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="px-3 py-1 rounded-lg bg-[#3E2BB8] text-white text-sm font-display font-semibold">
                      {rescue.code}
                    </div>
                    <h3 className="font-display font-semibold text-[#1A1A1A]">{rescue.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {rescue.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[#1A1A1A]">
                        <span className="text-[#5739FB] mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-[#3E2BB8]/10 bg-white mt-6">
            <CardContent className="p-6">
              <p className="text-[#6B7280] leading-relaxed">
                <strong className="text-[#1A1A1A]">Integration note:</strong> Physiology, attention, reframe, and identity ResCues stay in the wings—decision work borrows from every chapter by design.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ERA Integration */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-8 h-8 text-[#5739FB]" />
            <h2 className="text-3xl font-display font-semibold text-[#1A1A1A]">ERA Integration (how a week feels)</h2>
          </div>

          <p className="text-xl text-[#6B7280] mb-8 leading-relaxed italic">
            A week is a field you can walk without tripping.
          </p>

          <div className="space-y-4">
            {[
              { day: "Sun", phase: "Lens", content: "\"Make space to choose\"—plain-speak science + a one-week promise" },
              { day: "Mon", phase: "Experience", content: "Buy two seconds and feel the difference" },
              { day: "Tue", phase: "Journal", content: "Map the three places choices usually bend" },
              { day: "Wed", phase: "Recognise", content: "A micro-lesson on defaults, friction, or discounting" },
              { day: "Thu", phase: "Journal", content: "Design one edit you'll actually live with" },
              { day: "Fri", phase: "Align", content: "Set an if-then or bundle; put the hardware rule in place" },
              { day: "Sat", phase: "Journal", content: "Receipts; what did the edit buy you?" },
              { day: "Sun", phase: "Replay", content: "The living ball shows shorter time-to-decision, fewer slips, easier wins" }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-xl border border-[#3E2BB8]/10 hover:border-[#5739FB]/30 hover:bg-[#F5F3FF]/30 transition-colors">
                <div className="w-16 flex-shrink-0">
                  <div className="text-sm font-display font-semibold text-[#5739FB]">{item.day}</div>
                  <div className="text-xs text-[#6B7280]">{item.phase}</div>
                </div>
                <p className="text-[#1A1A1A]">{item.content}</p>
              </div>
            ))}
          </div>

          <Card className="border-[#3E2BB8]/10 bg-[#F5F3FF]/30 mt-8">
            <CardContent className="p-6">
              <p className="text-[#1A1A1A] leading-relaxed">
                <strong className="text-[#3E2BB8]">ResCues timing:</strong> Around red-zones (commute, phone, pub, late-night). LUMA times them with explainability and a gentle "Not now" that still teaches.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Widening the Doorway */}
      <div className="bg-[#FAFAFA] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-display font-semibold text-[#1A1A1A] mb-8">
              Widening the Doorway (inclusion & safety)
            </h2>

            <div className="space-y-4">
              {[
                { title: "Safety before strategy", desc: "In coercive or violent contexts, decision training pauses; safety planning and professional care first" },
                { title: "ND-aware", desc: "Quick-cut scripts; visual defaults; externalize memory (cards, lock-screens)" },
                { title: "Cultural and economic fit", desc: "Design edits that respect constraints (no \"just pay for it\" fixes); celebrate frugal brilliance" },
                { title: "Harm-reduction congruent", desc: "Better/sooner/less is honored alongside abstinence" },
                { title: "Consent obvious", desc: "Buddy features are opt-in, revocable, transparent" }
              ].map((item, index) => (
                <Card key={index} className="border-[#3E2BB8]/10">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#5739FB] mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-display font-semibold text-[#1A1A1A] mb-1">{item.title}</h3>
                      <p className="text-[#6B7280]">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Affective Styleguide */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-display font-semibold text-[#1A1A1A] mb-8">
            Affective Styleguide (how the UI helps)
          </h2>

          <Card className="border-[#3E2BB8]/10 bg-[#F5F3FF]/30">
            <CardContent className="p-6">
              <p className="text-[#1A1A1A] leading-relaxed">
                Interfaces that lower cognitive tax: large tap targets in hot flows, fewer choices in hot moments, calming motion when arousal rises, clear affordances for "Not now," and receipts that feel like kindness, not surveillance.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Covenant */}
      <div className="bg-gradient-to-br from-[#3E2BB8] via-[#5739FB] to-[#7C67FF] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-display font-semibold text-white mb-6">Covenant</h2>
            <div className="space-y-4 text-white/90 text-lg leading-relaxed">
              <p>
                We promise to make good choices cheaper and bad ones slower. We promise to buy back time, to design fields that carry you when you're tired, and to teach a kind math for better days.
              </p>
              <p>
                If we keep these promises, futures fork toward freedom more often—and effort starts to feel like grace.
              </p>
              <p className="text-white font-display font-semibold pt-4">
                Chapter Six stands. Signed in good faith, by everyone who builds and everyone who breathes this work.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dedication */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#6B7280] italic leading-relaxed">
            <strong className="text-[#3E2BB8]">Dedication:</strong><br />
            For anyone who has ever said "I knew better" and hurt anyway. For the clinicians who design better choices under pressure. For the engineers and architects of friction. For the loved ones who hold the light while we find the handle.
          </p>
        </div>
      </div>
    </div>
  );
}
