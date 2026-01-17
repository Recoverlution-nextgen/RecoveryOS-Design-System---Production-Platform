/**
 * Building Blocks - Interactive Learning Experience
 * 
 * Philosophy:
 * - Intense, purpose-driven, acute knowledge infusion
 * - Uses Journey/NaviCue design principles but for focused learning
 * - Component blocks that are reusable (Concept Summary, Knowledge Check, etc.)
 * - Interactive feedback that gives value - what they answer matters
 * - No completion tracking, only mastery and understanding
 */

import { useState } from "react";
import { ArrowLeft, Brain, CheckCircle, XCircle, Lightbulb, BookOpen, Target, Sparkles, ChevronRight, Lock, Star } from "lucide-react";

interface BuildingBlocksPageProps {
  onBack?: () => void;
  onNavigateToArticle?: (blockId: string) => void;
}

// Building Block = A complete learning unit
interface BuildingBlock {
  id: string;
  title: string;
  subtitle: string;
  pillar: string;
  estimatedTime: string;
  components: ComponentBlock[];
}

// Component Block = Reusable learning components
type ComponentBlock =
  | ConceptSummaryBlock
  | KnowledgeCheckBlock
  | ReflectionBlock
  | ApplicationBlock
  | InsightBlock;

interface ConceptSummaryBlock {
  type: "concept-summary";
  title: string;
  content: string;
  keyPoints: string[];
  visualMetaphor?: string;
}

interface KnowledgeCheckBlock {
  type: "knowledge-check";
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string; // Valuable feedback regardless of answer
  }[];
}

interface ReflectionBlock {
  type: "reflection";
  prompt: string;
  guidingQuestions: string[];
  placeholder: string;
}

interface ApplicationBlock {
  type: "application";
  scenario: string;
  question: string;
  insights: string[]; // Multiple valid perspectives
}

interface InsightBlock {
  type: "insight";
  title: string;
  content: string;
  source?: string;
}

// Sample Building Block: Window of Tolerance
const sampleBuildingBlock: BuildingBlock = {
  id: "window-of-tolerance",
  title: "Window of Tolerance",
  subtitle: "Understanding your nervous system's optimal zone",
  pillar: "Emotional Regulation",
  estimatedTime: "12 min",
  components: [
    {
      type: "concept-summary",
      title: "What is the Window of Tolerance?",
      content: "Your nervous system has an optimal zone where you can process information, make decisions, and respond to stress effectively. When you're within this window, your prefrontal cortex (thinking brain) and limbic system (emotional brain) work together in balance.",
      keyPoints: [
        "Everyone has a unique window - yours is shaped by your experiences",
        "You can expand your window through practice and safety",
        "Moving outside the window isn't failure - it's information"
      ],
      visualMetaphor: "Think of it like a river: too fast (hyperarousal) and you crash into rocks, too slow (hypoarousal) and you get stuck in mud. The window is the flow where you can navigate."
    },
    {
      type: "insight",
      title: "The Neuroscience",
      content: "Dr. Dan Siegel's Window of Tolerance describes the zone where the ventral vagal nerve (social engagement system) is active. Outside this window, your sympathetic (fight/flight) or dorsal vagal (freeze/shutdown) systems take over. These aren't conscious choices - they're automatic survival responses.",
      source: "Dr. Dan Siegel, Clinical Professor of Psychiatry, UCLA"
    },
    {
      type: "knowledge-check",
      question: "When you're ABOVE your window (hyperarousal), you might experience:",
      options: [
        {
          text: "Racing thoughts, anxiety, feeling 'wired'",
          isCorrect: true,
          feedback: "Exactly. Hyperarousal feels like your accelerator is stuck. Your sympathetic nervous system is flooding you with cortisol and adrenaline. This evolved to help you escape danger - your body is trying to protect you, even if the 'danger' is just a difficult conversation."
        },
        {
          text: "Numbness, disconnection, shutting down",
          isCorrect: false,
          feedback: "That's actually hypoarousal (BELOW the window). But recognizing the difference is powerful - it tells you what you need. Hyperarousal needs grounding and discharge (movement, breath). Hypoarousal needs gentle activation and safety signals. Different states need different tools."
        },
        {
          text: "Calm focus and present-moment awareness",
          isCorrect: false,
          feedback: "That's actually WITHIN your window - your optimal zone. The fact you're learning to recognize these states means you're building interoception (awareness of internal states). This awareness itself expands your window over time."
        }
      ]
    },
    {
      type: "reflection",
      prompt: "Think about a recent time you went above or below your window",
      guidingQuestions: [
        "What triggered it? (No judgment - just notice)",
        "What did it feel like in your body?",
        "How did you know you were outside your window?",
        "What helped (or might have helped) bring you back?"
      ],
      placeholder: "I noticed I went outside my window when..."
    },
    {
      type: "application",
      scenario: "You're in a meeting and start feeling your heart race, thoughts spiral, and a strong urge to leave. You recognize you're moving above your window.",
      question: "What would actually help in this moment?",
      insights: [
        "🌬️ Exhale longer than you inhale (activates vagal brake to slow things down)",
        "👣 Excuse yourself briefly - movement helps discharge the activation",
        "🧊 Cold water on wrists/face - sends immediate safety signal to nervous system",
        "🔢 Ground in the room: 5 things you see, 4 you hear, 3 you can touch",
        "💭 Name it: 'I'm in hyperarousal. This will pass. My body is trying to protect me.'"
      ]
    },
    {
      type: "insight",
      title: "Why This Matters for Recovery",
      content: "Addiction often narrows your window over time. Substances become the only tool that works when you're dysregulated. Recovery is about expanding your window and building new tools. Every time you notice you're outside your window and respond skillfully, you're literally rewiring your nervous system.",
      source: "Polyvagal Theory, Dr. Stephen Porges"
    }
  ]
};

export function BuildingBlocksPage({ onBack, onNavigateToArticle }: BuildingBlocksPageProps) {
  const [currentBlock] = useState<BuildingBlock>(sampleBuildingBlock);
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [reflectionText, setReflectionText] = useState<Record<number, string>>({});
  const [showFeedback, setShowFeedback] = useState<Record<number, boolean>>({});

  const currentComponent = currentBlock.components[currentComponentIndex];
  const progress = ((currentComponentIndex + 1) / currentBlock.components.length) * 100;

  const handleNext = () => {
    if (currentComponentIndex < currentBlock.components.length - 1) {
      setCurrentComponentIndex(currentComponentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentComponentIndex > 0) {
      setCurrentComponentIndex(currentComponentIndex - 1);
    }
  };

  const handleAnswerSelect = (componentIndex: number, optionIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [componentIndex]: optionIndex });
    setShowFeedback({ ...showFeedback, [componentIndex]: true });
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-[#FAFAFA] via-white to-[#F9F7FF] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200/60 px-6 md:px-12 py-6">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Back to NaviCues</span>
          </button>

          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-[#3E2BB8] bg-[#F5F3FF] px-2 py-1 rounded" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                  {currentBlock.pillar}
                </span>
                <span className="text-xs text-gray-500" style={{ fontFamily: 'var(--font-sans)' }}>
                  {currentBlock.estimatedTime}
                </span>
              </div>
              <h1 className="text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem' }}>
                {currentBlock.title}
              </h1>
              <p className="text-gray-600 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                {currentBlock.subtitle}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2" style={{ fontFamily: 'var(--font-sans)' }}>
              Part {currentComponentIndex + 1} of {currentBlock.components.length}
            </p>
          </div>
        </div>
      </div>

      {/* Component Content */}
      <div className="flex-1 overflow-auto px-6 md:px-12 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Concept Summary */}
          {currentComponent.type === "concept-summary" && (
            <ConceptSummaryComponent 
              component={currentComponent} 
              onNext={handleNext}
            />
          )}

          {/* Knowledge Check */}
          {currentComponent.type === "knowledge-check" && (
            <KnowledgeCheckComponent
              component={currentComponent}
              componentIndex={currentComponentIndex}
              selectedAnswer={selectedAnswers[currentComponentIndex]}
              showFeedback={showFeedback[currentComponentIndex]}
              onAnswerSelect={handleAnswerSelect}
              onNext={handleNext}
            />
          )}

          {/* Reflection */}
          {currentComponent.type === "reflection" && (
            <ReflectionComponent
              component={currentComponent}
              componentIndex={currentComponentIndex}
              reflectionText={reflectionText[currentComponentIndex] || ""}
              onTextChange={(text) => setReflectionText({ ...reflectionText, [currentComponentIndex]: text })}
              onNext={handleNext}
            />
          )}

          {/* Application */}
          {currentComponent.type === "application" && (
            <ApplicationComponent
              component={currentComponent}
              onNext={handleNext}
            />
          )}

          {/* Insight */}
          {currentComponent.type === "insight" && (
            <InsightComponent
              component={currentComponent}
              onNext={handleNext}
            />
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentComponentIndex === 0}
              className="text-sm text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              ← Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentComponentIndex === currentBlock.components.length - 1}
              className="text-sm text-[#3E2BB8] hover:text-[#5739FB] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component Renderers
function ConceptSummaryComponent({ component, onNext }: { component: ConceptSummaryBlock; onNext: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem' }}>
          {component.title}
        </h2>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <p className="text-gray-700 leading-relaxed mb-6" style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem' }}>
          {component.content}
        </p>

        <div className="space-y-3 mb-6">
          {component.keyPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#3E2BB8] flex-shrink-0 mt-0.5" />
              <p className="text-gray-700" style={{ fontFamily: 'var(--font-sans)' }}>
                {point}
              </p>
            </div>
          ))}
        </div>

        {component.visualMetaphor && (
          <div className="bg-gradient-to-br from-[#F5F3FF] to-white rounded-xl p-6 border border-[#3E2BB8]/10">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-[#5739FB] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-[#3E2BB8] mb-2" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                  VISUAL METAPHOR
                </p>
                <p className="text-gray-700 italic" style={{ fontFamily: 'var(--font-sans)' }}>
                  {component.visualMetaphor}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onNext}
        className="w-full py-3 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
      >
        Continue
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

function KnowledgeCheckComponent({ 
  component, 
  componentIndex,
  selectedAnswer,
  showFeedback,
  onAnswerSelect,
  onNext
}: { 
  component: KnowledgeCheckBlock;
  componentIndex: number;
  selectedAnswer?: number;
  showFeedback?: boolean;
  onAnswerSelect: (componentIndex: number, optionIndex: number) => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5739FB] to-[#7C67FF] flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem' }}>
          Knowledge Check
        </h2>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <p className="text-gray-900 mb-6" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}>
          {component.question}
        </p>

        <div className="space-y-3">
          {component.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const showThisFeedback = showFeedback && isSelected;
            
            return (
              <div key={index}>
                <button
                  onClick={() => onAnswerSelect(componentIndex, index)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? option.isCorrect
                        ? "border-green-500 bg-green-50"
                        : "border-amber-500 bg-amber-50"
                      : "border-gray-200 hover:border-[#3E2BB8] hover:bg-gray-50"
                  } ${showFeedback ? "cursor-default" : "cursor-pointer"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
                      {option.text}
                    </span>
                    {isSelected && (
                      option.isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-amber-600" />
                      )
                    )}
                  </div>
                </button>

                {showThisFeedback && (
                  <div className={`mt-2 p-4 rounded-lg ${
                    option.isCorrect ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"
                  }`}>
                    <p className="text-gray-700 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                      {option.feedback}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showFeedback && (
        <button
          onClick={onNext}
          className="w-full py-3 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

function ReflectionComponent({ 
  component, 
  componentIndex,
  reflectionText,
  onTextChange,
  onNext
}: { 
  component: ReflectionBlock;
  componentIndex: number;
  reflectionText: string;
  onTextChange: (text: string) => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7C67FF] to-[#9D8FFF] flex items-center justify-center">
          <Target className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem' }}>
          Personal Reflection
        </h2>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <p className="text-gray-900 mb-6" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}>
          {component.prompt}
        </p>

        <div className="bg-[#F5F3FF] rounded-xl p-6 mb-6">
          <p className="text-xs text-[#3E2BB8] mb-3" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
            GUIDING QUESTIONS
          </p>
          <ul className="space-y-2">
            {component.guidingQuestions.map((question, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-[#5739FB] mt-1">•</span>
                <span className="text-gray-700 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                  {question}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <textarea
          value={reflectionText}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder={component.placeholder}
          className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5739FB] resize-none"
          style={{ fontFamily: 'var(--font-sans)' }}
        />
      </div>

      <button
        onClick={onNext}
        className="w-full py-3 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
      >
        Continue
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

function ApplicationComponent({ component, onNext }: { component: ApplicationBlock; onNext: () => void }) {
  const [selectedInsights, setSelectedInsights] = useState<number[]>([]);

  const toggleInsight = (index: number) => {
    if (selectedInsights.includes(index)) {
      setSelectedInsights(selectedInsights.filter(i => i !== index));
    } else {
      setSelectedInsights([...selectedInsights, index]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5739FB] to-[#9D8FFF] flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem' }}>
          Real-World Application
        </h2>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="bg-gradient-to-br from-[#F5F3FF] to-white rounded-xl p-6 mb-6 border border-[#3E2BB8]/10">
          <p className="text-xs text-[#3E2BB8] mb-2" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
            SCENARIO
          </p>
          <p className="text-gray-700" style={{ fontFamily: 'var(--font-sans)' }}>
            {component.scenario}
          </p>
        </div>

        <p className="text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}>
          {component.question}
        </p>

        <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'var(--font-sans)' }}>
          Mark the strategies that resonate with you:
        </p>

        <div className="space-y-3">
          {component.insights.map((insight, index) => (
            <button
              key={index}
              onClick={() => toggleInsight(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedInsights.includes(index)
                  ? "border-[#3E2BB8] bg-[#F5F3FF]"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-700" style={{ fontFamily: 'var(--font-sans)' }}>
                  {insight}
                </span>
                {selectedInsights.includes(index) && (
                  <Star className="w-5 h-5 text-[#3E2BB8] fill-current" />
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-sans)' }}>
            💡 <strong>Remember:</strong> There's no single "right" answer. Different tools work for different people and different moments. Building your personal toolkit is part of the journey.
          </p>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-3 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
      >
        Continue
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

function InsightComponent({ component, onNext }: { component: InsightBlock; onNext: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9D8FFF] to-[#C4B5FD] flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem' }}>
          {component.title}
        </h2>
      </div>

      <div className="bg-gradient-to-br from-white to-[#F5F3FF] rounded-2xl p-8 shadow-sm border border-[#3E2BB8]/20">
        <p className="text-gray-700 leading-relaxed mb-6" style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem' }}>
          {component.content}
        </p>

        {component.source && (
          <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
            <div className="w-8 h-8 rounded-full bg-[#3E2BB8] flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm text-gray-600 italic" style={{ fontFamily: 'var(--font-sans)' }}>
              {component.source}
            </p>
          </div>
        )}
      </div>

      <button
        onClick={onNext}
        className="w-full py-3 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
      >
        Continue
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
