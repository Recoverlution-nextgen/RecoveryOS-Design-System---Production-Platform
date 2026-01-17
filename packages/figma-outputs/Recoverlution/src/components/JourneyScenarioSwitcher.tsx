/**
 * Journey Scenario Switcher
 * Quick toggle between Day 1 and Months In patient experiences
 */

import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Sparkles, Target } from 'lucide-react';

interface JourneyScenarioSwitcherProps {
  currentScenario: 'day-1' | 'months-in';
  onSwitch: (scenario: 'day-1' | 'months-in') => void;
}

export function JourneyScenarioSwitcher({ currentScenario, onSwitch }: JourneyScenarioSwitcherProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-6 right-6 z-50 bg-[#3E2BB8] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#2E1B98] transition-all text-sm flex items-center gap-2"
      >
        <Target className="w-4 h-4" />
        {currentScenario === 'day-1' ? 'Day 1 Patient' : 'Months In Patient'}
      </button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 z-50 p-4 shadow-2xl border-2 border-[#3E2BB8]/20 w-80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
          Demo Scenarios
        </h3>
        <button
          onClick={() => setIsExpanded(false)}
          className="text-gray-400 hover:text-gray-600 text-sm"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3">
        {/* Day 1 Patient */}
        <button
          onClick={() => {
            onSwitch('day-1');
            setIsExpanded(false);
          }}
          className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
            currentScenario === 'day-1'
              ? 'border-[#3E2BB8] bg-[#F5F3FF]'
              : 'border-gray-200 hover:border-[#3E2BB8]/30'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
              currentScenario === 'day-1' ? 'bg-[#3E2BB8]' : 'bg-gray-200'
            }`}>
              <Sparkles className={`w-4 h-4 ${currentScenario === 'day-1' ? 'text-white' : 'text-gray-500'}`} />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                Day 1 Patient
              </div>
              <div className="text-xs text-gray-600">
                First journey practice ever. Understanding Triggers. Nothing explored yet.
              </div>
            </div>
          </div>
        </button>

        {/* Months In Patient */}
        <button
          onClick={() => {
            onSwitch('months-in');
            setIsExpanded(false);
          }}
          className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
            currentScenario === 'months-in'
              ? 'border-[#3E2BB8] bg-[#F5F3FF]'
              : 'border-gray-200 hover:border-[#3E2BB8]/30'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
              currentScenario === 'months-in' ? 'bg-[#3E2BB8]' : 'bg-gray-200'
            }`}>
              <Target className={`w-4 h-4 ${currentScenario === 'months-in' ? 'text-white' : 'text-gray-500'}`} />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                Months In Patient
              </div>
              <div className="text-xs text-gray-600">
                Week 8+. Values Clarification sprint. Has explored 2 practices. Shows "Explored" sheet.
              </div>
            </div>
          </div>
        </button>
      </div>
    </Card>
  );
}
