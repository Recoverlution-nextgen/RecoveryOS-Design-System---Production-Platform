import { ArrowLeft, Brain, Users, Layers, TrendingUp, Eye, Target, Lightbulb, MessageSquare, Map, Zap, Shield, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { StoryLink } from "./StoryLink";

interface CognitiveReframingPillarProps {
  onNavigate?: (page: string) => void;
}

export function CognitiveReframingPillar({ onNavigate }: CognitiveReframingPillarProps) {
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
              <Eye className="w-4 h-4 text-white" />
              <span className="text-sm text-white/90">Chapter Four · Pillar 4 of 6</span>
            </div>
            
            <h1 className="text-6xl font-display font-semibold text-white mb-6 leading-tight">
              Change the Lens
            </h1>
            
            <p className="text-2xl text-white/90 mb-8 leading-relaxed">
              The Cognitive Reframing Thesis
            </p>
            
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Lightbulb className="w-6 h-6 text-white flex-shrink-0 mt-1" />
              <p className="text-lg text-white/90 leading-relaxed">
                <strong className="text-white">Science · stories · soul.</strong> Thoughts aren't facts; they're drafts. We learn to notice, edit, and embody better ones - gently, repeatedly - until clearer seeing becomes second nature.
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
              See wider. Choose better.
            </h2>
            <p className="text-xl text-[#6B7280] leading-relaxed">
              When a thought says "This is ruined" or "I can't," the body believes it. A tiny tweak - naming the feeling, stepping a half-step outside the story, choosing the next right inch - can change the day without pretending it's easy.
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
                8 micro-blocks and therapeutic practices for Cognitive Reframing
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
                    <span><strong>Flexibility:</strong> more than one way to read a moment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5739FB] mt-1">•</span>
                    <span><strong>Accuracy:</strong> less mind-reading, less doom math</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5739FB] mt-1">•</span>
                    <span><strong>Agency:</strong> a practiced bridge from insight to action</span>
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
                  Under stress, appraisal narrows - catastrophes inflate, certainties harden, and shame writes the ending. The body's surge steals time; the mind fills it with old stories.
                </p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Answer, human</h3>
                <p className="text-[#1A1A1A] leading-relaxed">
                  Build appraisal flexibility. Name what's happening, widen the frame, and pick a kinder, truer move. We don't argue with reality; we rename it so choice reappears.
                </p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">How we do it</h3>
                <p className="text-[#1A1A1A] leading-relaxed">
                  Weekly ERA journeys (Experience → Recognise → Align) that pair light psycho-education with micro-reframes + on-demand ResCues (60-180s) that fit the heat of a moment + Inner Compass to match dose to Energy · Clarity · Connection. LUMA times the nudge and explains the why.
                </p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Why it endures</h3>
                <p className="text-[#1A1A1A] leading-relaxed">
                  Repetition under real conditions re-weights predictions; new stories get first pick.
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
              { icon: Shield, title: "Regulate first, then reframe", desc: "If arousal is ≥7/10, body before belief." },
              { icon: MessageSquare, title: "Kind over clever", desc: "A short, compassionate line beats a perfect argument." },
              { icon: Target, title: "One inch, not one overhaul", desc: "We change the next beat, not the whole book." },
              { icon: Eye, title: "Reality is the floor", desc: "No toxic positivity. We face facts; we edit meaning." },
              { icon: Brain, title: "Explain the move", desc: "Mechanism builds mastery; mastery builds trust." }
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
                  <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">CBT & Cognitive Science</h3>
                  <ul className="space-y-2 text-[#1A1A1A]">
                    <li>• Aaron T. Beck †</li>
                    <li>• Judith S. Beck</li>
                    <li>• Emily A. Holmes (imagery)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-[#3E2BB8]/10">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Acceptance & Defusion</h3>
                  <ul className="space-y-2 text-[#1A1A1A]">
                    <li>• Steven C. Hayes (ACT)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-[#3E2BB8]/10">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Self-Distancing & Emotion</h3>
                  <ul className="space-y-2 text-[#1A1A1A]">
                    <li>• Ethan Kross</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-[#3E2BB8]/10">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Expectancy & Placebo</h3>
                  <ul className="space-y-2 text-[#1A1A1A]">
                    <li>• Tor D. Wager</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-[#3E2BB8]/10">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Belief & Mindset Effects</h3>
                  <ul className="space-y-2 text-[#1A1A1A]">
                    <li>• Tali Sharot</li>
                    <li>• Alia Crum</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-[#3E2BB8]/10">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-[#3E2BB8] mb-3">Affect Labeling & Regulation</h3>
                  <ul className="space-y-2 text-[#1A1A1A]">
                    <li>• Matthew D. Lieberman</li>
                    <li>• Kevin Ochsner</li>
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
                  <strong>Trigger → Attention → Appraisal → Action</strong>
                </p>
              </div>
              <p className="text-[#6B7280] leading-relaxed">
                We intercept the attention and appraisal steps. First, label to lower heat. Then, widen the lens (distance, data, values). Finally, pick one Right-Next-Inch that proves the new read in the body.
              </p>
            </CardContent>
          </Card>

          <h3 className="text-xl font-display font-semibold text-[#1A1A1A] mb-4">Under the hood (fast sketch)</h3>
          <ul className="space-y-2 text-[#1A1A1A]">
            <li className="flex items-start gap-3">
              <span className="text-[#5739FB] mt-1">•</span>
              <span>Affect labeling calms limbic load</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#5739FB] mt-1">•</span>
              <span>Reappraisal recruits prefrontal networks; works best when arousal is moderate</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#5739FB] mt-1">•</span>
              <span>Self-distancing reduces rumination and threat appraisal</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#5739FB] mt-1">•</span>
              <span>Imagery edits felt meaning faster than words alone</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#5739FB] mt-1">•</span>
              <span>Expectancy can nudge physiology when grounded in plausibility and values</span>
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
                title: "Label & locate",
                duration: "30-90s",
                description: "Name the emotion; point to where it lives in the body; take six slow breaths. Heat drops; room to think returns.",
                icon: Target
              },
              {
                letter: "B",
                title: "Distance talk",
                duration: "60-120s",
                description: "Second-person self-coaching (\"You've got this; breathe; choose one inch\") or third-person (\"[Name] is handling a lot; here's the next move\").",
                icon: Eye
              },
              {
                letter: "C",
                title: "Catastrophe shrink",
                duration: "90-180s",
                description: "Name the worst-case → write a 1-line plan → identify one stabilizer. Small plan, big relief.",
                icon: Shield
              },
              {
                letter: "D",
                title: "Values cue",
                duration: "60-120s",
                description: "One sentence that reconnects the moment to who you're becoming. Then do one congruent act.",
                icon: Target
              },
              {
                letter: "E",
                title: "Imagery rescript",
                duration: "120-180s",
                description: "Close the eyes on a hot scene; swap one move: a boundary, a breath, a walk-out. Replay once.",
                icon: Lightbulb
              },
              {
                letter: "F",
                title: "If-then anchors",
                duration: "60-120s",
                description: "\"If X shows up, I will do Y.\" Two cards beat ten ideals.",
                icon: Zap
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
            We teach lenses, not lectures. Order bends to the person; physics stays the same.
          </p>
        </div>

        <div className="space-y-6">
          {[
            {
              number: "T1",
              title: "Lower the Heat",
              tagline: "Label & locate; space before sense",
              weekA: "Label/Locate",
              weekB: "Breath + Anchor",
              color: "bg-[#3E2BB8]"
            },
            {
              number: "T2",
              title: "Step Outside",
              tagline: "Distance talk; third-person view",
              weekA: "Distance Talk",
              weekB: "Observer Postcard",
              color: "bg-[#5739FB]"
            },
            {
              number: "T3",
              title: "Shrink the Storm",
              tagline: "Catastrophe to plan; one stabilizer",
              weekA: "Worst→Plan",
              weekB: "Stabilizer First",
              color: "bg-[#7C67FF]"
            },
            {
              number: "T4",
              title: "Aim by Values",
              tagline: "Who you're becoming; one congruent act",
              weekA: "I-am/I-choose",
              weekB: "One Congruent Act",
              color: "bg-[#9D8FFF]"
            },
            {
              number: "T5",
              title: "Rewrite the Scene",
              tagline: "Imagery rescripting; do-over once",
              weekA: "Imagery Do-over",
              weekB: "Live Rehearsal",
              color: "bg-[#5739FB]"
            },
            {
              number: "T6",
              title: "If-Then Your Day",
              tagline: "Two anchors that catch the usual suspects",
              weekA: "Two Cards",
              weekB: "Refresh + Lock-screen",
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
              ResCue Types (reframe-tuned)
            </h2>
            <p className="text-xl text-[#6B7280] leading-relaxed max-w-3xl">
              Small scripts that make better meaning possible in the heat.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                code: "RT-L",
                title: "Labeling & Attention",
                items: [
                  "Label & Locate (90s)",
                  "3×3 Sensory (120s)",
                  "Spot→Swap (60-90s)"
                ]
              },
              {
                code: "RT-D",
                title: "Distancing",
                items: [
                  "Second-Person Coach (120s)",
                  "Third-Person Snapshot (90s)"
                ]
              },
              {
                code: "RT-C",
                title: "Catastrophe → Plan",
                items: [
                  "Shrink the Worst (180s)",
                  "One Stabilizer (90s)"
                ]
              },
              {
                code: "RT-V",
                title: "Values & Identity",
                items: [
                  "Values Cue (90s)",
                  "I-Am/I-Choose (60s)",
                  "Micro-Proof (120s)"
                ]
              },
              {
                code: "RT-I",
                title: "Imagery & Story",
                items: [
                  "Do-over Scene (180s)",
                  "Boundary Insert (120s)"
                ]
              },
              {
                code: "RT-F",
                title: "If-Then Anchors",
                items: [
                  "Two Cards (120s)",
                  "Lock-screen Refresh (60s)"
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
                <strong className="text-[#1A1A1A]">Integration note:</strong> Physiology and social ResCues from prior chapters are available by design; reframing cooperates with regulation and connection.
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
            A week is a new way to look at an old street.
          </p>

          <div className="space-y-4">
            {[
              { day: "Sun", phase: "Lens", content: "\"Thoughts are drafts\" - plain-speak science + promise" },
              { day: "Mon", phase: "Experience", content: "A felt downshift + a simple reframe in the body" },
              { day: "Tue", phase: "Journal", content: "Name the hot thoughts that show up most" },
              { day: "Wed", phase: "Recognise", content: "Teach one lens (distance, plan, values)" },
              { day: "Thu", phase: "Journal", content: "Rescript one scene; write the line you'll use" },
              { day: "Fri", phase: "Align", content: "Do one congruent act or set two if-then anchors" },
              { day: "Sat", phase: "Journal", content: "Proof log; did the new read stick?" },
              { day: "Sun", phase: "Replay", content: "Notice: fewer catastrophes, kinder math, more room to move" }
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
                <strong className="text-[#3E2BB8]">ResCues timing:</strong> Labels early, distance in the climb, plan at the peak, values as you descend. LUMA's explainable cards keep it clean and kind.
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
                { title: "Trauma-aware", desc: "Never force imagery; always offer text-first and eyes-open versions" },
                { title: "ND-friendly", desc: "Shorter scripts, visual anchors, and predictable rhythm" },
                { title: "Language that travels", desc: "Metaphors swap per culture; avoid idioms that blame" },
                { title: "Harm-reduction aware", desc: "Reframe choices for stability, not just abstinence" },
                { title: "Consent everywhere", desc: "Share only what you choose; privacy is posture, not a preference" }
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
                Typography that steadies; motion that never startles; space that breathes. Copy that uses short, concrete lines. A visible <strong>"Why this reframe now?"</strong> drawer and a gentle <strong>Not now</strong> that teaches the system your texture.
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
                We promise to help people see more of what is true and less of what is cruel. We promise to make kinder thinking usable under heat and to anchor insight in action.
              </p>
              <p>
                If we keep these promises, catastrophes shrink, choices widen, and the day becomes livable - one line at a time.
              </p>
              <p className="text-white font-display font-semibold pt-4">
                Chapter Four stands. Signed in good faith, by everyone who builds and everyone who breathes this work.
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
            For the minds that move fast and the hearts that pay the bill. For the clinicians who taught the world to talk back to thoughts. For anyone who needs a small, honest script at the exact right moment.
          </p>
        </div>
      </div>
    </div>
  );
}
