/**
 * FrostedGlassDemo - Proof of Concept
 * 
 * Demonstrates real frosted glass that works on:
 * 1. White backgrounds (visible with borders)
 * 2. Images (white text readable)
 * 3. Both use same glass system
 * 
 * THE DIFFERENTIATOR: Glass everywhere.
 */

import { Heart, TrendingUp, Calendar, Activity } from 'lucide-react';

export function FrostedGlassDemo() {
  return (
    <div className="min-h-screen bg-white p-8 space-y-16">
      
      {/* Section 1: Glass on White Background */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3">
            Glass on white backgrounds.
          </h2>
          <p className="text-[#1A1A1A]/60">
            Real frosted glass with borders, not gradients.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {/* Card 1: Standard Glass */}
          <div className="glass-card rounded-3xl p-8 
                          hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_0_0_1px_rgba(62,43,184,0.2)_inset]
                          hover:border-[#3E2BB8]/25
                          transition-all duration-300">
            
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#5739FB]" />
              <span className="text-xs text-[#5739FB]/70 uppercase tracking-wider font-semibold">
                Return
              </span>
            </div>
            
            <div className="mb-8">
              <div className="text-6xl text-[#5739FB] font-bold mb-2">
                23
              </div>
              <div className="text-[#1A1A1A]/50 text-sm font-medium">
                times per day
              </div>
            </div>
            
            <div className="pt-4 border-t border-[#5739FB]/10">
              <p className="text-sm text-[#1A1A1A]/60 leading-relaxed">
                Showing up again. That's courage.
              </p>
            </div>
          </div>
          
          {/* Card 2: Colored Glass (Pillar) */}
          <div className="bg-[#E85D75]/10 glass-pillar
                          border-2 border-[#E85D75]/25 rounded-3xl p-8
                          hover:bg-[#E85D75]/15 hover:border-[#E85D75]/35
                          transition-all duration-300">
            
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-[#E85D75]" />
              <h3 className="text-[#1A1A1A] font-semibold">Emotional Regulation</h3>
            </div>
            
            <p className="text-[#1A1A1A]/70 text-sm mb-6">
              Understanding and managing emotional responses with grace.
            </p>
            
            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#1A1A1A]/50">
                <span>Progress</span>
                <span>60%</span>
              </div>
              <div className="h-2 bg-[#E85D75]/20 rounded-full overflow-hidden">
                <div className="h-full bg-[#E85D75] rounded-full transition-all duration-1000" 
                     style={{ width: '60%' }} />
              </div>
            </div>
          </div>
          
          {/* Card 3: Interactive Glass Button */}
          <div className="glass-card rounded-3xl p-8 flex flex-col items-center justify-center
                          hover:shadow-[0_4px_12px_rgba(62,43,184,0.15),0_0_0_1px_rgba(62,43,184,0.3)_inset]
                          hover:border-[#3E2BB8]/30
                          transition-all duration-300">
            
            <Activity className="w-12 h-12 text-[#3E2BB8] mb-4" />
            
            <h3 className="text-[#1A1A1A] font-semibold mb-2 text-center">
              Interactive glass
            </h3>
            
            <p className="text-[#1A1A1A]/60 text-sm text-center mb-6">
              Hover to see the premium effect
            </p>
            
            <button className="bg-[#3E2BB8]/10 backdrop-blur-[24px] backdrop-saturate-[180%]
                               border border-[#3E2BB8]/25 rounded-2xl px-6 py-3
                               text-[#3E2BB8] font-semibold text-sm
                               hover:bg-[#3E2BB8]/15 hover:border-[#3E2BB8]/35
                               hover:shadow-[0_4px_12px_rgba(62,43,184,0.15)]
                               active:scale-[0.98]
                               transition-all duration-200">
              Explore
            </button>
          </div>
        </div>
      </section>
      
      {/* Section 2: Glass on Image */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3">
            Glass on images.
          </h2>
          <p className="text-[#1A1A1A]/60">
            White text on frosted glass. Readable and premium.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          
          {/* Image with Glass Overlay */}
          <div className="relative h-96 rounded-3xl overflow-hidden
                          border-2 border-[#3E2BB8]/20
                          shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
            
            {/* Background Image */}
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=90&fit=crop&auto=format" 
              alt="Mountain landscape"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Dark gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />
            
            {/* Glass card floating on image */}
            <div className="relative z-10 h-full flex flex-col justify-end p-12">
              <div className="glass-overlay glass-hero rounded-3xl p-8 max-w-2xl">
                
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-white" />
                  <span className="text-xs text-white/70 uppercase tracking-wider font-semibold">
                    Your Momentum
                  </span>
                </div>
                
                <h2 className="text-white text-3xl font-bold mb-3">
                  Real frosted glass on images.
                </h2>
                
                <p className="text-white/90 text-lg leading-relaxed mb-6">
                  White text is perfectly readable on the glass overlay. The image blurs through beautifully. Premium feel. Apple-level execution.
                </p>
                
                <div className="flex gap-3">
                  <button className="bg-white/20 backdrop-blur-[24px] backdrop-saturate-[180%]
                                     border border-white/30 rounded-2xl px-6 py-3
                                     text-white font-semibold text-sm
                                     hover:bg-white/30 hover:border-white/40
                                     active:scale-[0.98]
                                     transition-all duration-200">
                    Explore momentum
                  </button>
                  
                  <button className="bg-white backdrop-blur-[24px] backdrop-saturate-[180%]
                                     border border-white/30 rounded-2xl px-6 py-3
                                     text-[#3E2BB8] font-semibold text-sm
                                     hover:bg-white/90
                                     active:scale-[0.98]
                                     transition-all duration-200">
                    View dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Grid of Images with Glass Captions */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            
            {/* Image 1 */}
            <div className="relative rounded-3xl overflow-hidden
                            border-2 border-[#3E2BB8]/15
                            shadow-[0_4px_12px_rgba(0,0,0,0.08)]
                            group">
              
              <img 
                src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=90&fit=crop&auto=format" 
                alt="Meditation"
                className="w-full h-64 object-cover"
              />
              
              {/* Glass caption overlay (bottom) */}
              <div className="absolute bottom-0 left-0 right-0
                              bg-white/85 backdrop-blur-[24px] backdrop-saturate-[180%]
                              border-t border-[#3E2BB8]/15 p-4
                              transform translate-y-full group-hover:translate-y-0
                              transition-transform duration-300">
                <h4 className="text-[#1A1A1A] font-semibold mb-1">Inner Compass</h4>
                <p className="text-[#1A1A1A]/60 text-sm">
                  Track your emotional state with precision.
                </p>
              </div>
            </div>
            
            {/* Image 2 */}
            <div className="relative rounded-3xl overflow-hidden
                            border-2 border-[#3E2BB8]/15
                            shadow-[0_4px_12px_rgba(0,0,0,0.08)]
                            group">
              
              <img 
                src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=90&fit=crop&auto=format" 
                alt="Journal"
                className="w-full h-64 object-cover"
              />
              
              {/* Glass caption overlay (bottom) */}
              <div className="absolute bottom-0 left-0 right-0
                              bg-white/85 backdrop-blur-[24px] backdrop-saturate-[180%]
                              border-t border-[#3E2BB8]/15 p-4
                              transform translate-y-full group-hover:translate-y-0
                              transition-transform duration-300">
                <h4 className="text-[#1A1A1A] font-semibold mb-1">Daily Practices</h4>
                <p className="text-[#1A1A1A]/60 text-sm">
                  Structured content delivered at the right moment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section 3: Technical Specs */}
      <section className="max-w-4xl mx-auto">
        <div className="glass-card rounded-3xl p-12">
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3">
              The technical specifications.
            </h2>
            <p className="text-[#1A1A1A]/60">
              What makes this glass system work.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            
            <div>
              <h3 className="text-[#1A1A1A] font-semibold mb-4">On white backgrounds</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#3E2BB8] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[#1A1A1A] font-medium mb-1">
                      Background: <code className="text-xs bg-[#3E2BB8]/10 px-2 py-0.5 rounded">rgba(255,255,255,0.85)</code>
                    </div>
                    <div className="text-[#1A1A1A]/60">
                      Slightly transparent to show blur effect
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#3E2BB8] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[#1A1A1A] font-medium mb-1">
                      Blur: <code className="text-xs bg-[#3E2BB8]/10 px-2 py-0.5 rounded">blur(32px) saturate(180%)</code>
                    </div>
                    <div className="text-[#1A1A1A]/60">
                      Heavy blur + saturation for vivid colors
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#3E2BB8] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[#1A1A1A] font-medium mb-1">
                      Border: <code className="text-xs bg-[#3E2BB8]/10 px-2 py-0.5 rounded">1px solid rgba(62,43,184,0.15)</code>
                    </div>
                    <div className="text-[#1A1A1A]/60">
                      Defines edges on white (not gradient!)
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#3E2BB8] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[#1A1A1A] font-medium mb-1">
                      Shadow: Double (outer + inner glow)
                    </div>
                    <div className="text-[#1A1A1A]/60">
                      Lifts card + creates depth
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-[#1A1A1A] font-semibold mb-4">On images</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#3E2BB8] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[#1A1A1A] font-medium mb-1">
                      Background: <code className="text-xs bg-[#3E2BB8]/10 px-2 py-0.5 rounded">rgba(255,255,255,0.1)</code>
                    </div>
                    <div className="text-[#1A1A1A]/60">
                      Very transparent for image to show
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#3E2BB8] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[#1A1A1A] font-medium mb-1">
                      Blur: <code className="text-xs bg-[#3E2BB8]/10 px-2 py-0.5 rounded">blur(48px) saturate(180%)</code>
                    </div>
                    <div className="text-[#1A1A1A]/60">
                      Heavier blur for hero sections
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#3E2BB8] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[#1A1A1A] font-medium mb-1">
                      Border: <code className="text-xs bg-[#3E2BB8]/10 px-2 py-0.5 rounded">1px solid rgba(255,255,255,0.2)</code>
                    </div>
                    <div className="text-[#1A1A1A]/60">
                      White border on dark images
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#3E2BB8] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[#1A1A1A] font-medium mb-1">
                      Text: <code className="text-xs bg-[#3E2BB8]/10 px-2 py-0.5 rounded">white</code>
                    </div>
                    <div className="text-[#1A1A1A]/60">
                      White text with dark overlay gradient
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-[#3E2BB8]/10 text-center">
            <p className="text-[#1A1A1A]/60 text-sm">
              <strong className="text-[#1A1A1A]">The rule</strong>: Borders not gradients. 
              Glass on everything. Same system, different contexts.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
