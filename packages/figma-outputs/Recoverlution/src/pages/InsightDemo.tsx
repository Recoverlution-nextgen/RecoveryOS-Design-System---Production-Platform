import React, { useState } from 'react';
import { InsightPage } from '../components/insights/InsightPage';
import { exampleInsights } from '../data/example-insights';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function InsightDemo() {
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const [showList, setShowList] = useState(true);

  const currentInsight = exampleInsights[currentInsightIndex];

  const handleStartPractice = (practiceId: string) => {
    console.log('Starting practice:', practiceId);
    alert(`Starting practice: ${practiceId}\n\n(Practice player would open here)`);
  };

  const handleLearnMore = (practiceId: string) => {
    console.log('Learn more about practice:', practiceId);
    alert(`Learn more: ${practiceId}\n\n(Practice detail page would open here)`);
  };

  const handleNavigate = (contentId: string, type: string) => {
    console.log('Navigating to:', type, contentId);
    alert(`Navigating to ${type}: ${contentId}\n\n(Content would load here)`);
  };

  const handleComplete = (insightId: string, data: any) => {
    console.log('Insight completed:', insightId, data);
    alert(`✅ Insight completed!\n\nID: ${insightId}\n\nResponses: ${data.responses.length}\nRating: ${data.rating}/5\n\n(This data would be saved to block assessment)`);
  };

  const handleSelectInsight = (index: number) => {
    setCurrentInsightIndex(index);
    setShowList(false);
  };

  if (showList) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-2">Insight System Demo</h1>
            <p className="text-muted-foreground">
              Modular, checkpoint-driven micro-learning experiences. Select an Insight to explore the full flow.
            </p>
          </div>

          <div className="grid gap-4">
            {exampleInsights.map((insight, index) => (
              <button
                key={insight.id}
                onClick={() => handleSelectInsight(index)}
                className="glass-panel p-6 text-left hover:border-primary/50 transition-all group"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {insight.pillarName} → {insight.conceptName} → {insight.themeName}
                    </div>
                    <h3 className="group-hover:text-primary transition-colors">
                      {insight.title}
                    </h3>
                  </div>
                  <div className="text-sm text-muted-foreground shrink-0">
                    {insight.estimatedMinutes} min
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {insight.whyItMatters}
                </p>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>• {insight.checkpoints.length} checkpoints</span>
                  {insight.practiceConnection && <span>• Includes practice</span>}
                  <span>• {insight.relatedContent.length} related items</span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 glass-panel p-6">
            <h3 className="mb-3">System Features</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-muted/30 rounded">
                <div className="font-medium mb-1">✅ Modular Sections</div>
                <div className="text-muted-foreground">9 reusable components that assemble any Insight</div>
              </div>
              <div className="p-3 bg-muted/30 rounded">
                <div className="font-medium mb-1">🎯 Smart Checkpoints</div>
                <div className="text-muted-foreground">Before/comprehension/intent tracking at key moments</div>
              </div>
              <div className="p-3 bg-muted/30 rounded">
                <div className="font-medium mb-1">🔗 Practice Integration</div>
                <div className="text-muted-foreground">Direct connection to relevant practices inline</div>
              </div>
              <div className="p-3 bg-muted/30 rounded">
                <div className="font-medium mb-1">📊 Block Assessment</div>
                <div className="text-muted-foreground">Completion + responses feed red/orange/green logic</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="fixed top-4 left-4 z-50">
        <Button
          onClick={() => setShowList(true)}
          variant="outline"
          className="glass-panel"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back to List
        </Button>
      </div>

      <InsightPage
        insight={currentInsight}
        onStartPractice={handleStartPractice}
        onLearnMore={handleLearnMore}
        onNavigate={handleNavigate}
        onComplete={handleComplete}
      />
    </div>
  );
}
