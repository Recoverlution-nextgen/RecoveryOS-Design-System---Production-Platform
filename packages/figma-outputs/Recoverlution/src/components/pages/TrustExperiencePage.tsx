import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * TRUST EXPERIENCE PAGE
 * 
 * NOT a demo of the system.
 * An actual experience that helps someone understand their trust patterns.
 * 
 * Arc:
 * 1. Opening - Meet them where they are
 * 2. Exploration - Show them their pattern (through experience, not explanation)
 * 3. Reflection - Mirror back what they revealed
 * 4. Recognition - "Does this land?"
 * 5. Invitation - "Want to go deeper?" → NaviCue if yes
 * 
 * This is VALUE FIRST. Understanding before intervention.
 */

interface TrustExperiencePageProps {
  onNavigate?: (page: string) => void;
}

type Step = 'opening' | 'scenario1' | 'scenario2' | 'scenario3' | 'reflection' | 'recognition' | 'invitation' | 'deeper';

interface Response {
  scenario: string;
  choice: string;
  reveals: string;
}

export function TrustExperiencePage({ onNavigate }: TrustExperiencePageProps) {
  const [currentStep, setCurrentStep] = useState<Step>('opening');
  const [responses, setResponses] = useState<Response[]>([]);
  const [recognitionAnswer, setRecognitionAnswer] = useState<boolean | null>(null);

  const handleResponse = (scenario: string, choice: string, reveals: string) => {
    setResponses([...responses, { scenario, choice, reveals }]);
  };

  // Analyze pattern from responses
  const getPattern = () => {
    const reveals = responses.map(r => r.reveals);
    
    if (reveals.filter(r => r.includes('guarded')).length >= 2) {
      return {
        name: 'Guarded Trust',
        description: 'You keep people at a distance to protect yourself. Getting close feels dangerous.',
        insight: 'This makes sense if trust has been broken before. Your system learned to protect you.',
        cost: 'But it also means missing real connection, even with people who are safe.',
      };
    }
    
    if (reveals.filter(r => r.includes('avoidant')).length >= 2) {
      return {
        name: 'Avoidant Pattern',
        description: 'You say yes but pull away. Intimacy triggers an urge to escape.',
        insight: 'This pattern keeps you safe from vulnerability, but at a cost.',
        cost: 'It prevents the very connection you might actually want.',
      };
    }
    
    if (reveals.filter(r => r.includes('anxious')).length >= 2) {
      return {
        name: 'Anxious Attachment',
        description: 'You scan for signs of rejection. Every small cue feels loaded.',
        insight: 'Your nervous system is trying to predict abandonment before it happens.',
        cost: 'But this hypervigilance exhausts you and pushes people away.',
      };
    }
    
    return {
      name: 'Cautious Trust',
      description: 'You are open but careful. You want connection but stay alert.',
      insight: 'You are working to find the balance between openness and protection.',
      cost: 'Sometimes the guard stays up even when it is safe to lower it.',
    };
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0B0F' }}>
      <AnimatePresence mode="wait">
        {/* STEP 1: OPENING */}
        {currentStep === 'opening' && (
          <motion.div
            key="opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <div className="max-w-2xl w-full space-y-10">
              <div className="text-center space-y-6">
                <h1 className="text-4xl" style={{ color: '#FFFFFF' }}>
                  Trust is complicated
                </h1>
                <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  We all want connection. But letting people in feels risky.
                </p>
                <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  Let's explore how trust shows up for you.
                </p>
              </div>

              <div className="p-6 border-l-4 space-y-3" style={{
                backgroundColor: 'rgba(87, 57, 251, 0.1)',
                borderColor: '#5739FB',
              }}>
                <p className="text-base" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  This is not a test. There are no right answers.
                </p>
                <p className="text-base" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  We will show you three moments. You pick what feels most true for you.
                </p>
                <p className="text-base" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  Then we will reflect back what we noticed.
                </p>
              </div>

              <button
                onClick={() => setCurrentStep('scenario1')}
                className="w-full p-5 text-lg transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: '#5739FB',
                  color: '#FFFFFF',
                }}
              >
                Begin
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: SCENARIO 1 */}
        {currentStep === 'scenario1' && (
          <motion.div
            key="scenario1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <div className="max-w-2xl w-full space-y-10">
              <div className="text-center space-y-3">
                <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
                  Moment 1 of 3
                </div>
                <h2 className="text-2xl" style={{ color: '#FFFFFF' }}>
                  A friend cancels plans last minute
                </h2>
                <p className="text-base" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  What is your first instinct?
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { text: 'They probably found something better to do', reveals: 'anxious-rejection' },
                  { text: 'Something must have come up. I will check if they are okay.', reveals: 'secure-trust' },
                  { text: 'Typical. People always do this.', reveals: 'guarded-mistrust' },
                  { text: 'Actually relieved. Now I do not have to go.', reveals: 'avoidant-pattern' },
                ].map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleResponse('friend-cancels', option.text, option.reveals);
                      setCurrentStep('scenario2');
                    }}
                    className="w-full p-5 text-left transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: 'rgba(87, 57, 251, 0.08)',
                      border: '2px solid rgba(87, 57, 251, 0.2)',
                      color: '#FFFFFF',
                    }}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: SCENARIO 2 */}
        {currentStep === 'scenario2' && (
          <motion.div
            key="scenario2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <div className="max-w-2xl w-full space-y-10">
              <div className="text-center space-y-3">
                <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
                  Moment 2 of 3
                </div>
                <h2 className="text-2xl" style={{ color: '#FFFFFF' }}>
                  Someone at work invites you for coffee to connect
                </h2>
                <p className="text-base" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  What runs through your mind?
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { text: 'They want something from me. What is the angle?', reveals: 'guarded-mistrust' },
                  { text: 'That could be nice. I will go but keep it light.', reveals: 'guarded-cautious' },
                  { text: 'Great, I would love to get to know them better.', reveals: 'secure-openness' },
                  { text: 'I will say yes but probably cancel closer to the time.', reveals: 'avoidant-pattern' },
                ].map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleResponse('work-coffee', option.text, option.reveals);
                      setCurrentStep('scenario3');
                    }}
                    className="w-full p-5 text-left transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: 'rgba(87, 57, 251, 0.08)',
                      border: '2px solid rgba(87, 57, 251, 0.2)',
                      color: '#FFFFFF',
                    }}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 4: SCENARIO 3 */}
        {currentStep === 'scenario3' && (
          <motion.div
            key="scenario3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <div className="max-w-2xl w-full space-y-10">
              <div className="text-center space-y-3">
                <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
                  Moment 3 of 3
                </div>
                <h2 className="text-2xl" style={{ color: '#FFFFFF' }}>
                  A close friend asks how you are really doing
                </h2>
                <p className="text-base" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  What happens inside you?
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { text: 'I deflect. They do not actually want to hear it.', reveals: 'guarded-deflection' },
                  { text: 'I share a bit but keep the heavy stuff to myself.', reveals: 'guarded-selective' },
                  { text: 'I tell them. It feels good to be seen.', reveals: 'secure-vulnerability' },
                  { text: 'I freeze. I do not even know how I am doing.', reveals: 'avoidant-disconnect' },
                ].map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleResponse('friend-asks', option.text, option.reveals);
                      setCurrentStep('reflection');
                    }}
                    className="w-full p-5 text-left transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: 'rgba(87, 57, 251, 0.08)',
                      border: '2px solid rgba(87, 57, 251, 0.2)',
                      color: '#FFFFFF',
                    }}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 5: REFLECTION */}
        {currentStep === 'reflection' && (
          <motion.div
            key="reflection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <div className="max-w-2xl w-full space-y-10">
              {(() => {
                const pattern = getPattern();
                return (
                  <>
                    <div className="text-center space-y-4">
                      <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
                        Here is what we noticed
                      </div>
                      <h2 className="text-3xl" style={{ color: '#FFFFFF' }}>
                        {pattern.name}
                      </h2>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 space-y-4" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
                        <div>
                          <div className="text-sm mb-2" style={{ color: '#5739FB' }}>Your pattern</div>
                          <p className="text-base" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            {pattern.description}
                          </p>
                        </div>
                        
                        <div>
                          <div className="text-sm mb-2" style={{ color: '#5739FB' }}>Why this makes sense</div>
                          <p className="text-base" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            {pattern.insight}
                          </p>
                        </div>

                        <div>
                          <div className="text-sm mb-2" style={{ color: '#5739FB' }}>The cost</div>
                          <p className="text-base" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            {pattern.cost}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 text-center text-sm" style={{ 
                        backgroundColor: 'rgba(87, 57, 251, 0.05)',
                        color: 'rgba(255, 255, 255, 0.6)',
                      }}>
                        This is not about being broken. This is about seeing the pattern clearly.
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentStep('recognition')}
                      className="w-full p-5 text-lg transition-all duration-200 hover:scale-105"
                      style={{
                        backgroundColor: '#5739FB',
                        color: '#FFFFFF',
                      }}
                    >
                      Continue
                    </button>
                  </>
                );
              })()}
            </div>
          </motion.div>
        )}

        {/* STEP 6: RECOGNITION */}
        {currentStep === 'recognition' && (
          <motion.div
            key="recognition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <div className="max-w-2xl w-full space-y-10">
              <div className="text-center space-y-6">
                <h2 className="text-3xl" style={{ color: '#FFFFFF' }}>
                  Does this land for you?
                </h2>
                <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Does this reflection feel true to your experience?
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => {
                    setRecognitionAnswer(true);
                    setCurrentStep('invitation');
                  }}
                  className="p-8 text-center transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: 'rgba(87, 57, 251, 0.15)',
                    border: '2px solid #5739FB',
                    color: '#FFFFFF',
                  }}
                >
                  <div className="text-2xl mb-2">Yes</div>
                  <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    This resonates
                  </div>
                </button>

                <button
                  onClick={() => {
                    setRecognitionAnswer(false);
                    setCurrentStep('invitation');
                  }}
                  className="p-8 text-center transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: 'rgba(87, 57, 251, 0.05)',
                    border: '2px solid rgba(87, 57, 251, 0.2)',
                    color: '#FFFFFF',
                  }}
                >
                  <div className="text-2xl mb-2">Not quite</div>
                  <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Does not fit
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 7: INVITATION */}
        {currentStep === 'invitation' && (
          <motion.div
            key="invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <div className="max-w-2xl w-full space-y-10">
              <div className="text-center space-y-6">
                {recognitionAnswer ? (
                  <>
                    <h2 className="text-3xl" style={{ color: '#FFFFFF' }}>
                      Want to work with this pattern?
                    </h2>
                    <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Seeing the pattern is the first step. The next step is updating it.
                    </p>
                    <p className="text-base" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      We can guide you through a process that helps beliefs shift through evidence, not just insight.
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl" style={{ color: '#FFFFFF' }}>
                      Want to explore this differently?
                    </h2>
                    <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      The pattern we saw might not fit. Trust is complex and shows up differently for everyone.
                    </p>
                    <p className="text-base" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      We can explore other angles that might resonate more.
                    </p>
                  </>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => setCurrentStep('deeper')}
                  className="p-8 text-center transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: '#5739FB',
                    color: '#FFFFFF',
                  }}
                >
                  <div className="text-2xl mb-2">Yes</div>
                  <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Go deeper
                  </div>
                </button>

                <button
                  onClick={() => onNavigate?.('Home')}
                  className="p-8 text-center transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: 'rgba(87, 57, 251, 0.1)',
                    border: '2px solid rgba(87, 57, 251, 0.3)',
                    color: '#FFFFFF',
                  }}
                >
                  <div className="text-2xl mb-2">Not now</div>
                  <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Back to home
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 8: GO DEEPER (NaviCue Launch Point) */}
        {currentStep === 'deeper' && (
          <motion.div
            key="deeper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <div className="max-w-2xl w-full space-y-10">
              <div className="text-center space-y-6">
                <h2 className="text-3xl" style={{ color: '#FFFFFF' }}>
                  This is where the work begins
                </h2>
                <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  You have seen your pattern. Now we help you update it.
                </p>
              </div>

              <div className="p-6 border-l-4 space-y-4" style={{
                backgroundColor: 'rgba(87, 57, 251, 0.1)',
                borderColor: '#5739FB',
              }}>
                <p className="text-base" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  We will guide you through:
                </p>
                <ul className="space-y-2 text-base" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  <li>→ Testing your predictions in safe ways</li>
                  <li>→ Collecting evidence that challenges the old pattern</li>
                  <li>→ Building proof of a new way of being</li>
                  <li>→ Making the new pattern automatic</li>
                </ul>
              </div>

              <div className="p-4 text-center text-sm" style={{
                backgroundColor: 'rgba(87, 57, 251, 0.05)',
                color: 'rgba(255, 255, 255, 0.6)',
              }}>
                This is not therapy. This is not advice. This is a structured way to update beliefs through experience.
              </div>

              <button
                onClick={() => onNavigate?.('belief-sequence-demo')}
                className="w-full p-5 text-lg transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: '#5739FB',
                  color: '#FFFFFF',
                }}
              >
                Begin guided process
              </button>

              <button
                onClick={() => onNavigate?.('Home')}
                className="w-full p-3 text-sm transition-opacity hover:opacity-70"
                style={{
                  backgroundColor: 'transparent',
                  color: 'rgba(255, 255, 255, 0.5)',
                }}
              >
                Back to home
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
