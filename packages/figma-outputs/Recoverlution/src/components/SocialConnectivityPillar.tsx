import { Users, Heart, Shield, MessageCircle, Sparkles, Target, Check, ChevronRight, Activity, Eye, Zap, BookOpen } from "lucide-react";
import { StoryLink } from "./StoryLink";

/**
 * CHAPTER THREE: BUILD THE BRIDGE
 * The Social Connectivity Pillar - Deep Dive
 * 
 * Science · Stories · Soul
 * Recovery is a team sport played in a nervous system.
 * We restore safety, practice repair, and turn belonging into a daily behavior.
 * 
 * Content: Daniel's raw truth + neuroscience validation
 * Design: Apple-grade precision + emotional resonance
 */

interface SocialConnectivityPillarProps {
  onNavigate?: (page: string) => void;
}

export function SocialConnectivityPillar({ onNavigate }: SocialConnectivityPillarProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-rose-50/30 to-pink-50/30">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-white/80 text-sm uppercase tracking-wide mb-1">Chapter Three · Pillar 3</div>
              <h1 className="text-white text-5xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                Build the Bridge
              </h1>
              <p className="text-white/90 text-xl mt-2">The Social Connectivity Thesis</p>
            </div>
          </div>
          
          <div className="max-w-3xl">
            <p className="text-white/95 text-lg leading-relaxed mb-6 italic">
              Science · Stories · Soul. Recovery is a team sport played in a nervous system. We restore safety, practice repair, and turn belonging into a daily behavior.
            </p>
            
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <h3 className="text-white font-semibold mb-3">Dedication</h3>
              <p className="text-white/90 leading-relaxed">
                For the ones who learned to go it alone. For families who want to help but don't know how. For clinicians stitching trust back together. For communities brave enough to become better mirrors.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
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
              8 micro-blocks and therapeutic practices for Social Connectivity
            </p>
            <div className="flex flex-wrap gap-2">
              <StoryLink storyId="ST43" onNavigate={onNavigate} variant="pill" showTitle />
              <StoryLink storyId="ST42" onNavigate={onNavigate} variant="pill" showTitle />
              <StoryLink storyId="ST45" onNavigate={onNavigate} variant="pill" showTitle />
            </div>
          </div>
        )}
        
        {/* The Thesis */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-900 text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              The Thesis
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Problem */}
            <div className="p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border-2 border-red-200/50">
              <h3 className="text-red-900 font-semibold mb-3">Problem, simply</h3>
              <p className="text-gray-800 leading-relaxed mb-4">
                Loneliness and unsafe bonds amplify craving and blunt regulation. When connection feels risky or far away, stress climbs, attention tunnels, and the old routes call louder.
              </p>
              <div className="p-3 bg-white/70 rounded-lg text-xs text-gray-700 space-y-1">
                <p><strong>Physiologically:</strong> Social isolation → ↑HPA activation, ↓HRV, ↑inflammation (Cacioppo & Hawkley, 2009)</p>
                <p><strong>Psychologically:</strong> Loneliness predicts relapse; unsafe attachment → hypervigilance, emotion dysregulation</p>
                <p><strong>Cognitively:</strong> Social pain activates same networks as physical pain (Eisenberger et al., 2003)</p>
              </div>
            </div>

            {/* Answer */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200/50">
              <h3 className="text-green-900 font-semibold mb-3">Answer, human</h3>
              <p className="text-gray-800 leading-relaxed mb-4">
                Rebuild felt safety, practice micro-repair, and cultivate purposeful ties that co-regulate in real time. We make connection a skill with reps, not a wish with words.
              </p>
              <div className="p-3 bg-white/70 rounded-lg text-xs text-gray-700 space-y-1">
                <p><strong>Felt safety:</strong> Polyvagal cues (prosody, gaze, posture) activate social engagement system (Porges, 2011)</p>
                <p><strong>Repair:</strong> Predictable repair rewires attachment expectations (Johnson, 2004 - EFT; Tronick, 2007)</p>
                <p><strong>Co-regulation:</strong> Synchronized physiology (breath, HRV) → mutual calming (Feldman, 2012)</p>
              </div>
            </div>

            {/* How */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200/50">
              <h3 className="text-blue-900 font-semibold mb-3">How we do it</h3>
              <p className="text-gray-800 leading-relaxed">
                Weekly ERA journeys (Experience → Recognise → Align) focused on belonging, boundaries, and repair + on-demand ResCues that translate social science into 60-180-second moves + Inner Compass check-ins (Energy · Clarity · Connection). LUMA suggests the right move for the moment; we act inside our values.
              </p>
            </div>

            {/* Why */}
            <div className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border-2 border-purple-200/50">
              <h3 className="text-purple-900 font-semibold mb-3">Why it endures</h3>
              <p className="text-gray-800 leading-relaxed">
                The brain updates its model of people through consistent, safe signals. Small good moments, repeated, out-vote old maps.
              </p>
            </div>
          </div>
        </section>

        {/* The Vows */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-900 text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              The Vows (We Hold These Lines)
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {vows.map((vow, idx) => (
              <div key={idx} className="p-5 bg-white rounded-2xl border-2 border-gray-200 hover:border-rose-300 transition-all">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-gray-900 font-semibold mb-1">{vow.principle}</h4>
                    <p className="text-sm text-gray-600">{vow.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dream Team */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-900 text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              Dream Team (Anchors Who Inform This Chapter)
            </h2>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Their work shapes our patterns; our patterns carry their work into daily life.
          </p>

          <div className="space-y-4">
            {dreamTeam.map((category, idx) => (
              <div key={idx} className="p-6 bg-white rounded-2xl border-2 border-gray-200">
                <h3 className="text-gray-900 font-semibold mb-3">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.researchers.map((researcher, rIdx) => (
                    <span key={rIdx} className="px-3 py-1 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-900 rounded-lg text-sm font-medium border border-rose-200/50">
                      {researcher}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Model */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-900 text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              Core Model: Signals → Stories → Stitches
            </h2>
          </div>

          <div className="p-8 bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 rounded-3xl border-2 border-rose-200/50 mb-6">
            <p className="text-gray-700 leading-relaxed mb-6">
              The nervous system learns safety from other nervous systems. Safe cues widen the window. Stories explain people to ourselves. Stitches keep bonds alive through rupture and repair.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-xl">
                <div className="text-rose-600 font-bold mb-2">1. Signals</div>
                <p className="text-xs text-gray-700">The body reads cues (eyes, voice, pace). Safe cues widen the window.</p>
                <div className="mt-2 text-xs text-gray-600">
                  <strong>Example:</strong> Soft gaze, warm prosody, open posture → parasympathetic activation
                </div>
              </div>
              <div className="p-4 bg-white rounded-xl">
                <div className="text-pink-600 font-bold mb-2">2. Stories</div>
                <p className="text-xs text-gray-700">We explain people to ourselves; shame and mind-reading go loud under stress.</p>
                <div className="mt-2 text-xs text-gray-600">
                  <strong>Example:</strong> "They're mad at me" vs "They might be stressed about something else"
                </div>
              </div>
              <div className="p-4 bg-white rounded-xl">
                <div className="text-fuchsia-600 font-bold mb-2">3. Stitches</div>
                <p className="text-xs text-gray-700">Ruptures are inevitable; repair is the skill that keeps bonds alive.</p>
                <div className="mt-2 text-xs text-gray-600">
                  <strong>Example:</strong> Apology + impact acknowledgment + ask for repair
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border-2 border-gray-200">
            <h3 className="text-gray-900 font-semibold mb-4">Under the Hood (Fast Sketch)</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
                <Heart className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Polyvagal Cues</p>
                  <p className="text-xs text-gray-600">Prosody, gaze, posture can nudge parasympathetic tone. Social engagement system (Porges, 2011).</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Attachment Learning</p>
                  <p className="text-xs text-gray-600">Predictable repair rewires expectations. Secure base develops through consistent responsiveness (Johnson, 2004 - EFT).</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <Zap className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Social Pain Overlap</p>
                  <p className="text-xs text-gray-600">Rejection lights networks that mirror physical pain; kind contact soothes both (Eisenberger et al., 2003).</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
                <Eye className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Mentalization</p>
                  <p className="text-xs text-gray-600">Remembering the other mind changes the move you make. Theory of mind, perspective-taking (Fonagy et al., 2002).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Stack */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-900 text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              Skills Stack (What We Train)
            </h2>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Connection isn't a personality trait; it's a set of small moves anyone can learn. We build safety signals, practice bids and boundaries, master repair, develop mentalization, and embed prosocial purpose.
          </p>

          <div className="space-y-6">
            {skillsStack.map((category, idx) => (
              <div key={idx} className="p-6 bg-white rounded-2xl border-2 border-gray-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-xl font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.duration}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {category.practices.map((practice, pIdx) => (
                    <div key={pIdx} className="p-4 bg-gradient-to-r from-gray-50 to-rose-50/30 rounded-xl">
                      <div className="flex items-start gap-2 mb-2">
                        <ChevronRight className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">{practice.name}</p>
                          <p className="text-xs text-gray-600 mt-1">{practice.description}</p>
                          {practice.mechanism && (
                            <div className="mt-2 p-2 bg-white/70 rounded text-xs text-gray-600">
                              <strong>Mechanism:</strong> {practice.mechanism}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Social Pain is Real Pain */}
        <section>
          <div className="p-8 bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 rounded-3xl border-2 border-red-200/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-gray-900 text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                Social Pain is Real Pain
              </h2>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Rejection hurts. Literally.</strong> The same neural networks that process physical pain (anterior cingulate cortex, anterior insula) light up during social rejection. This is not metaphor. This is neuroscience.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-5 bg-white rounded-2xl">
                <h4 className="text-gray-900 font-semibold mb-3">The Research</h4>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-red-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Eisenberger et al. (2003):</strong> Social exclusion activates dorsal ACC and anterior insula (same as physical pain)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-red-600 flex-shrink-0 mt-0.5" />
                    <span><strong>DeWall et al. (2010):</strong> Acetaminophen (Tylenol) reduces social pain ratings</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-red-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Lieberman & Eisenberger (2009):</strong> Social pain and physical pain share neural circuitry</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-red-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Cacioppo & Hawkley (2009):</strong> Loneliness predicts mortality as strongly as smoking</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl">
                <h4 className="text-gray-900 font-semibold mb-3">Why This Matters for Recovery</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong className="text-red-900">Social pain → craving:</strong> Rejection/loneliness amplifies substance craving (same pain networks)
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong className="text-orange-900">Connection soothes:</strong> Safe social contact down-regulates pain circuitry
                    </p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong className="text-amber-900">Recovery is social:</strong> AA/NA work because connection is analgesic
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/70 rounded-xl">
              <p className="text-xs text-gray-700">
                <strong>Clinical implication:</strong> Treating addiction without addressing social pain is like treating a broken bone without addressing the fracture.
              </p>
            </div>
          </div>
        </section>

        {/* Repair is the Skill */}
        <section>
          <div className="p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-3xl border-2 border-green-200/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-gray-900 text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                Repair Over Perfection
              </h2>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Ruptures are inevitable. Repair is the skill that keeps bonds alive.</strong> Ed Tronick's still-face experiments show that what matters is not avoiding disruption - it's the return to connection. Sue Johnson's EFT work shows that secure attachment develops through consistent repair, not flawless connection.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-5 bg-white rounded-2xl">
                <h4 className="text-gray-900 font-semibold mb-3">The Repair Sequence</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Acknowledge</p>
                      <p className="text-xs text-gray-600">"I see I hurt you. That wasn't okay."</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Impact</p>
                      <p className="text-xs text-gray-600">"I imagine that made you feel [alone/dismissed/unsafe]."</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Ask</p>
                      <p className="text-xs text-gray-600">"What do you need from me right now?"</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl">
                <h4 className="text-gray-900 font-semibold mb-3">Research Backing</h4>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Tronick (2007):</strong> Still-face experiments show repair is more important than avoiding rupture</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Johnson (2004):</strong> EFT - secure attachment through accessible, responsive, engaged repair</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Gottman (1999):</strong> Repair attempts predict relationship success; 65% success rate = stable bond</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Siegel & Hartzell (2003):</strong> Earned secure attachment - repair rewires internal working models</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/70 rounded-xl">
              <p className="text-xs text-gray-700">
                <strong>Key insight:</strong> You don't need perfect parents, perfect friends, or perfect relationships. You need repair. Repair is learnable. Repair is what makes bonds brave.
              </p>
            </div>
          </div>
        </section>

        {/* Safety First */}
        <section>
          <div className="p-8 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 rounded-3xl border-2 border-yellow-200/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-gray-900 text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                Safety First. Always.
              </h2>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>No skill is worth a risk in an unsafe relationship.</strong> If there's IPV, coercive control, or active harm, connection work pauses. Safety planning and professional care come first.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-white rounded-2xl">
                <h4 className="text-gray-900 font-semibold mb-3">When Connection Work Pauses</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <strong className="text-red-900">Intimate partner violence (IPV)</strong>
                    <p className="text-xs text-gray-600 mt-1">Physical, emotional, sexual, financial abuse</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <strong className="text-orange-900">Coercive control</strong>
                    <p className="text-xs text-gray-600 mt-1">Isolation, surveillance, threats, intimidation</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <strong className="text-yellow-900">Active stalking or harassment</strong>
                    <p className="text-xs text-gray-600 mt-1">Unwanted contact, monitoring, following</p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl">
                <h4 className="text-gray-900 font-semibold mb-3">Safety-First Protocol</h4>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Screen for safety:</strong> Brief safety assessment before connection work</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Pause features:</strong> Connection ResCues pause if risk detected</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Resource immediately:</strong> Safety planning resources + professional referrals</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Clinician alert:</strong> Care team notified (with consent) if safety concerns arise</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Covenant */}
        <section>
          <div className="p-8 bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 rounded-3xl text-white">
            <h2 className="text-3xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              Covenant
            </h2>
            <p className="text-white/95 leading-relaxed mb-4">
              We promise to make connection learnable, repair normal, and boundaries kind. We promise to honor consent, protect safety, and measure what warms the nervous system.
            </p>
            <p className="text-white/95 leading-relaxed mb-4">
              If we keep these promises, loneliness loosens, bonds get braver, and the old routes go quiet - not by force, but by finding better company.
            </p>
            <p className="text-white font-semibold">
              Chapter Three stands. Signed in good faith, by everyone who builds and everyone who breathes this work.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

// Data

const vows = [
  {
    principle: "Safety first.",
    explanation: "No skill is worth a risk in an unsafe relationship. IPV, coercive control → connection work pauses, safety planning begins."
  },
  {
    principle: "Repair over perfection.",
    explanation: "We normalize rupture and practice the stitches. Repair is more important than avoiding conflict (Tronick, 2007)."
  },
  {
    principle: "Consent is sacred.",
    explanation: "Co-regulation and sharing are always opt-in. Invitations are private, reversible, transparent."
  },
  {
    principle: "Boundaries are bridges.",
    explanation: "Clear edges make warm centers possible. 'No' with warmth protects connection, doesn't break it."
  },
  {
    principle: "Dignity in every script.",
    explanation: "Language that lifts, never shames. No pathologizing, no minimizing, no toxic positivity."
  }
];

const dreamTeam = [
  {
    category: "Social Connection & Health",
    researchers: ["Julianne Holt-Lunstad", "John & Stephanie Cacioppo", "Nicholas Christakis"]
  },
  {
    category: "Attachment & Repair",
    researchers: ["Sue Johnson (EFT)", "Peter Fonagy (Mentalization)", "Ed Tronick (Still-face/Repair)"]
  },
  {
    category: "Social Brain/Pain",
    researchers: ["Naomi Eisenberger", "Matthew Lieberman"]
  },
  {
    category: "Shame & Vulnerability",
    researchers: ["Brené Brown"]
  },
  {
    category: "Recovery Science & Communities",
    researchers: ["John F. Kelly", "William L. White"]
  },
  {
    category: "Polyvagal & Co-Regulation",
    researchers: ["Stephen Porges"]
  },
  {
    category: "Prosocial Meaning & Flourishing",
    researchers: ["Corey Keyes", "Robert Waldinger"]
  }
];

const skillsStack = [
  {
    name: "Co-Regulation Basics",
    duration: "60-180s",
    practices: [
      {
        name: "Buddy Breath",
        description: "Matching pace with a trusted person. Breathe together, slow and even.",
        mechanism: "Synchronized breathing → mutual HRV entrainment → co-regulation (Feldman, 2012)."
      },
      {
        name: "Resonance Ask",
        description: "'Slow with me?' - explicit ask for shared calming.",
        mechanism: "Social engagement system activation → parasympathetic tone (Porges, 2011)."
      },
      {
        name: "Safe Face Gallery",
        description: "A few voices/faces that your body trusts - ready on tap.",
        mechanism: "Polyvagal cues (prosody, gaze) → safety signal → vagal brake (Porges, 2011)."
      }
    ]
  },
  {
    name: "Bids & Boundaries",
    duration: "60-180s",
    practices: [
      {
        name: "Clear Ask Scripts",
        description: "One-sentence requests. 'I need X. Can you do Y?'",
        mechanism: "Clear communication → predictable response → felt safety (Gottman, 1999)."
      },
      {
        name: "No with Warmth",
        description: "'I can't do that right now, but I care about you.'",
        mechanism: "Boundaries without rejection → secure base maintained (Johnson, 2004)."
      },
      {
        name: "Context-Safe Exits",
        description: "When a space turns hot, graceful exit script.",
        mechanism: "Self-protection without shame → autonomy preserved."
      }
    ]
  },
  {
    name: "Repair Moves",
    duration: "90-180s",
    practices: [
      {
        name: "Repair Credit",
        description: "Short apology + impact acknowledgment + ask. 'I hurt you. I imagine that felt [X]. What do you need?'",
        mechanism: "Predictable repair → rewired attachment expectations (Johnson, 2004; Tronick, 2007)."
      },
      {
        name: "Micro-Gratitude",
        description: "After repair, tiny appreciation. 'Thank you for staying with me through that.'",
        mechanism: "Positive reinforcement of repair → bond strengthening."
      },
      {
        name: "Do-Over",
        description: "Rehearse the better move once, then try it live.",
        mechanism: "Corrective emotional experience → new neural pathway (Alexander & French, 1946)."
      }
    ]
  },
  {
    name: "Mentalization",
    duration: "90-180s",
    practices: [
      {
        name: "Pause & Imagine",
        description: "'What might they be feeling? What do I want us to feel?'",
        mechanism: "Theory of mind, perspective-taking → empathy activation (Fonagy et al., 2002)."
      },
      {
        name: "Name Your Need",
        description: "State your need in one line, then one inch of action.",
        mechanism: "Self-awareness + clear communication → relational clarity."
      }
    ]
  },
  {
    name: "Prosocial Purpose",
    duration: "2-5 min",
    practices: [
      {
        name: "Tiny Service Acts",
        description: "Small helping behaviors. Hold a door, share a resource, offer a kind word.",
        mechanism: "Prosocial behavior → dopamine/oxytocin release → meaning + connection (Brown & Brown, 2015)."
      },
      {
        name: "Care Pings",
        description: "Check-in messages. 'Thinking of you. How are you holding up?'",
        mechanism: "Weak ties maintenance → social network resilience (Granovetter, 1973)."
      },
      {
        name: "Gratitude Snapshots",
        description: "Notice + name one thing someone did that mattered.",
        mechanism: "Gratitude expression → relationship satisfaction (Algoe et al., 2010)."
      }
    ]
  }
];
