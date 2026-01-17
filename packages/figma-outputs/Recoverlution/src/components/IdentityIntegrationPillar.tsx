import { ArrowLeft, Brain, Users, Layers, TrendingUp, Target, Lightbulb, MessageSquare, Map, Zap, Shield, Check, Heart, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { StoryLink } from "./StoryLink";

interface IdentityIntegrationPillarProps {
  onNavigate?: (page: string) => void;
}

export function IdentityIntegrationPillar({ onNavigate }: IdentityIntegrationPillarProps) {
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
              <Target className="w-4 h-4 text-white" />
              <span className="text-sm text-white/90">Chapter Five · Pillar 5 of 6</span>
            </div>
            
            <h1 className="text-6xl font-display font-semibold text-white mb-6 leading-tight">
              Become Who You Practice
            </h1>
            
            <p className="text-2xl text-white/90 mb-8 leading-relaxed">
              The Identity Integration Thesis
            </p>
            
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Lightbulb className="w-6 h-6 text-white flex-shrink-0 mt-1" />
              <p className="text-lg text-white/90 leading-relaxed">
                <strong className="text-white">Science · stories · soul.</strong> Recovery isn't just stopping something; it's becoming someone. Identity is practice over time—proofs that add up to "I am."
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
              Live the line you can love.
            </h2>
            <p className="text-xl text-[#6B7280] leading-relaxed">
              If the story says you're the kind of person who always breaks, your nervous system acts like it. When the story says you come back to yourself—even after a wobble—you do. Identity is the thermostat for choices.
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
                8 micro-blocks and therapeutic practices for Identity Integration
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
                    <span><strong>Clarity:</strong> a small, living set of "I am" lines that fit reality</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5739FB] mt-1">•</span>
                    <span><strong>Congruence:</strong> daily acts that prove the lines true</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5739FB] mt-1">•</span>
                    <span><strong>Continuity:</strong> a future self that feels reachable and familiar</span>
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
                  Addiction colonizes identity. Shame writes global labels ("I am broken"); small wins don't register; old names stick. Without a self to grow into, behavior change stalls.
                </p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Answer, human</h3>
                <p className="text-[#1A1A1A] leading-relaxed">
                  Craft a values-congruent narrative and stack micro-proofs until a new identity becomes the easiest true thing to say. We don't fake it; we practice it—in small, embodied ways that survive the day.
                </p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">How we do it</h3>
                <p className="text-[#1A1A1A] leading-relaxed">
                  Weekly ERA journeys (Experience → Recognise → Align) that link values to action + on-demand ResCues that capture and reinforce proofs (60-180s) + Inner Compass to keep identity honest (Energy · Clarity · Connection). LUMA mirrors progress back with receipts.
                </p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Why it endures</h3>
                <p className="text-[#1A1A1A] leading-relaxed">
                  Consistent, congruent acts drive self-verification; memory reconsolidation updates the personal story; the future self stops feeling like a stranger.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Vows */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-display font-semibold text-[#1A1A1A] mb-8">The Vows (what we won't break)</h2>
          
          <div className="grid gap-4">
            {[
              { icon: Check, title: "Identity is earned, not asserted", desc: "We collect proof; we don't chant slogans." },
              { icon: Heart, title: "Dignity first", desc: "Language never shames; metaphors never belittle." },
              { icon: Target, title: "Small before grand", desc: "The next right inch has more power than the perfect plan." },
              { icon: Zap, title: "Embodiment required", desc: "Every identity claim meets a behavior." },
              { icon: Brain, title: "Plural selves, one center", desc: "We honor roles and seasons without losing the core." }
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
              The researchers whose work shapes our pattern library. Our patterns carry their work into life.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-[#3E2BB8]/10">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Narrative Identity</h3>
                  <ul className="space-y-2 text-[#1A1A1A]">
                    <li>• Dan P. McAdams</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-[#3E2BB8]/10">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Mindset & Belief Effects</h3>
                  <ul className="space-y-2 text-[#1A1A1A]">
                    <li>• Carol Dweck</li>
                    <li>• Alia Crum</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-[#3E2BB8]/10">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Meaning & Purpose</h3>
                  <ul className="space-y-2 text-[#1A1A1A]">
                    <li>• Michael F. Steger</li>
                    <li>• Roy Baumeister</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-[#3E2BB8]/10">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Motivation (SDT)</h3>
                  <ul className="space-y-2 text-[#1A1A1A]">
                    <li>• Edward Deci</li>
                    <li>• Richard Ryan</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-[#3E2BB8]/10">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Habit & Behavior Change</h3>
                  <ul className="space-y-2 text-[#1A1A1A]">
                    <li>• BJ Fogg</li>
                    <li>• Katy Milkman</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-[#3E2BB8]/10">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Compassion & Self-Talk</h3>
                  <ul className="space-y-2 text-[#1A1A1A]">
                    <li>• Kristin Neff</li>
                    <li>• Ethan Kross</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-[#3E2BB8]/10">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Memory Reconsolidation & Imagery</h3>
                  <ul className="space-y-2 text-[#1A1A1A]">
                    <li>• Bruce Ecker</li>
                    <li>• Emily A. Holmes</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-[#3E2BB8]/10">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Recovery Science</h3>
                  <ul className="space-y-2 text-[#1A1A1A]">
                    <li>• John F. Kelly</li>
                    <li>• William L. White</li>
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
                <div className="text-2xl">🎯</div>
                <p className="text-lg text-[#1A1A1A]">
                  <strong>Values → Lines → Proofs → Memory</strong>
                </p>
              </div>
              <p className="text-[#6B7280] leading-relaxed">
                We anchor in values, draft short identity lines, collect daily micro-proofs, and let memory update. Each loop tightens belief and makes the next action easier.
              </p>
            </CardContent>
          </Card>

          <h3 className="text-xl font-display font-semibold text-[#1A1A1A] mb-4">Under the hood (fast sketch)</h3>
          <ul className="space-y-2 text-[#1A1A1A]">
            <li className="flex items-start gap-3">
              <span className="text-[#5739FB] mt-1">•</span>
              <span><strong>Self-verification:</strong> people seek feedback consistent with their self-views; change sticks when evidence accumulates</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#5739FB] mt-1">•</span>
              <span><strong>Growth mindset & expectancy:</strong> believable "yet" statements widen possibility without denial</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#5739FB] mt-1">•</span>
              <span><strong>Reconsolidation:</strong> re-calling a story while adding a new emotional outcome can revise its grip</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#5739FB] mt-1">•</span>
              <span><strong>SDT:</strong> identities that respect autonomy, competence, and relatedness sustain</span>
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
                title: "Values compass",
                duration: "3-5 min, weekly",
                description: "Name 2-3 values in plain words; link each to one micro-behavior that feels real this week.",
                icon: Target
              },
              {
                letter: "B",
                title: "I-lines",
                duration: "45-60s, daily",
                description: "Short identity statements that predict behavior you can actually do: \"I am someone who returns to baseline.\" \"I keep tiny promises to myself.\"",
                icon: MessageSquare
              },
              {
                letter: "C",
                title: "Micro-proof log",
                duration: "90-120s, daily",
                description: "Capture one congruent act (text/voice/photo). LUMA mirrors the pattern back on Sundays.",
                icon: Check
              },
              {
                letter: "D",
                title: "Future-self postcard",
                duration: "120-180s, weekly",
                description: "A brief note from +3 hours, +3 days, or +3 months: what you did, how it felt, what it bought you.",
                icon: Map
              },
              {
                letter: "E",
                title: "Do-over & reconsolidate",
                duration: "120-180s, as needed",
                description: "Revisit a sticky scene; regulate first; replay with one different move; close with a proof you can do today.",
                icon: Lightbulb
              },
              {
                letter: "F",
                title: "Identity boundaries",
                duration: "60-120s",
                description: "Two lines you don't cross this week; one repair you know how to make if you do.",
                icon: Shield
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
            We don't crown a new self; we grow one by repetition.
          </p>
        </div>

        <div className="space-y-6">
          {[
            {
              number: "T1",
              title: "Name the North",
              tagline: "Values made small and livable",
              weekA: "Values → Micro-acts",
              weekB: "Congruence check",
              color: "bg-[#3E2BB8]"
            },
            {
              number: "T2",
              title: "Write the Line",
              tagline: "Short I-statements that predict action",
              weekA: "I-lines",
              weekB: "I-lines in context (work/home/social)",
              color: "bg-[#5739FB]"
            },
            {
              number: "T3",
              title: "Collect the Proof",
              tagline: "Daily micro-wins logged and mirrored",
              weekA: "Proof log basics",
              weekB: "Photo/voice proofs",
              color: "bg-[#7C67FF]"
            },
            {
              number: "T4",
              title: "Meet the Future You",
              tagline: "Postcards and prospection that feel true",
              weekA: "+3 hours/+3 days",
              weekB: "+3 months",
              color: "bg-[#9D8FFF]"
            },
            {
              number: "T5",
              title: "Rewrite the Sticky Story",
              tagline: "Reconsolidation through do-overs",
              weekA: "Do-over scenes",
              weekB: "Live micro-repairs",
              color: "bg-[#5739FB]"
            },
            {
              number: "T6",
              title: "Guard the Edges",
              tagline: "Boundaries and repairs that keep the center intact",
              weekA: "Two non-negotiables",
              weekB: "Repair blueprint",
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
              ResCue Types (identity-tuned)
            </h2>
            <p className="text-xl text-[#6B7280] leading-relaxed max-w-3xl">
              Small moves that let a true line take root.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                code: "RT-V",
                title: "Values & Congruence",
                items: [
                  "Values to Act (120s)",
                  "One Inch Now (60s)",
                  "Congruence Check (90s)"
                ]
              },
              {
                code: "RT-I",
                title: "Identity Lines & Proofs",
                items: [
                  "I-Line (60s)",
                  "Micro-Proof Log (120s)",
                  "Proof Mirror (90s)"
                ]
              },
              {
                code: "RT-F",
                title: "Future Self & Prospection",
                items: [
                  "Postcard +3h/3d/3m (120-180s)",
                  "Future-You Nudge (60s)"
                ]
              },
              {
                code: "RT-R",
                title: "Reconsolidation & Repair",
                items: [
                  "Do-over Scene (180s)",
                  "Repair Credit (180s)"
                ]
              },
              {
                code: "RT-B",
                title: "Boundaries & Edges",
                items: [
                  "Two Lines (90s)",
                  "If-Then Repair (120s)"
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
                <strong className="text-[#1A1A1A]">Integration note:</strong> Physiology, attention, and reframe ResCues from prior chapters are available by design; identity integrates, it doesn't isolate.
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
            A week is a small promise kept in public and in private.
          </p>

          <div className="space-y-4">
            {[
              { day: "Sun", phase: "Lens", content: "\"Become who you practice\"—plain-speak science + a one-week promise" },
              { day: "Mon", phase: "Experience", content: "A value-linked act (tiny, embodied)" },
              { day: "Tue", phase: "Journal", content: "Name the line; capture a first proof" },
              { day: "Wed", phase: "Recognise", content: "A micro-lesson on self-verification or mindset" },
              { day: "Thu", phase: "Journal", content: "Do-over or future-self postcard" },
              { day: "Fri", phase: "Align", content: "Set two non-negotiables or make a live repair" },
              { day: "Sat", phase: "Journal", content: "Proof log; congruence score (felt, not forced)" },
              { day: "Sun", phase: "Replay", content: "LUMA mirrors the week's identity pattern in kind words and numbers" }
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
                <strong className="text-[#3E2BB8]">ResCues timing:</strong> Before risky contexts (Two Lines), after wins (Proof Log), during doubts (Future-You Nudge). The tone stays humble and warm.
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
                { title: "No identity policing", desc: "We don't rename people; we invite them" },
                { title: "Culturally fluent", desc: "Swap metaphors and exemplars; avoid moralizing scripts" },
                { title: "Trauma-aware", desc: "Do-overs never re-expose; always offer eyes-open, text-first versions" },
                { title: "ND-friendly", desc: "Short scripts, routine-friendly proof capture, optional visuals" },
                { title: "Harm-reduction congruent", desc: "Identity can be \"steady\" or \"safer\" on the way to \"sober\"" }
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
                Design that keeps promises small and visible: lightweight check-ins, warm receipts ("this counted"), progress dots that never compare, language that treats repairs as growth, not guilt.
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
                We promise to help people carry names that fit their truth, to make proof easier than shame, and to keep the future close enough to touch.
              </p>
              <p>
                If we keep these promises, identity stops being an argument and becomes a home.
              </p>
              <p className="text-white font-display font-semibold pt-4">
                Chapter Five stands. Signed in good faith, by everyone who builds and everyone who breathes this work.
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
            For the ones who are tired of being defined by the worst day. For the families who hold a picture when someone forgets their own. For the clinicians and builders who believe that dignity is not a perk, it's a prerequisite.
          </p>
        </div>
      </div>
    </div>
  );
}
