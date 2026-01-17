// STATION - Daily Practice Dashboard
// The daily check-in and practice hub

import { useState, useEffect } from 'react';
import { Calendar, Heart, Brain, Zap, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface MoodOption {
  id: string;
  label: string;
  value: number;
  color: string;
}

const MOOD_OPTIONS: MoodOption[] = [
  { id: 'struggling', label: 'Struggling', value: 1, color: '#E74C3C' },
  { id: 'managing', label: 'Managing', value: 2, color: '#F39C12' },
  { id: 'stable', label: 'Stable', value: 3, color: '#3498DB' },
  { id: 'growing', label: 'Growing', value: 4, color: '#9B59B6' },
  { id: 'thriving', label: 'Thriving', value: 5, color: '#2ECC71' },
];

interface StationProps {
  patientId: string;
  onStartPractice: (type: string) => void;
  onOpenSoundbite: () => void;
}

export function StationDashboard({ patientId, onStartPractice, onOpenSoundbite }: StationProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [streak, setStreak] = useState(7);
  const [todayComplete, setTodayComplete] = useState(false);
  const [practices, setPractices] = useState({
    morning: false,
    afternoon: false,
    evening: false,
  });

  useEffect(() => {
    // Load today's progress from backend
    loadTodayProgress();
  }, [patientId]);

  const loadTodayProgress = async () => {
    // TODO: Connect to backend
    // const response = await fetch(`/api/station/today?patientId=${patientId}`);
    // const data = await response.json();
    // setSelectedMood(data.mood);
    // setPractices(data.practices);
    // setStreak(data.streak);
  };

  const handleMoodSelect = async (moodId: string) => {
    setSelectedMood(moodId);
    
    // Save to backend
    // await fetch('/api/station/mood', {
    //   method: 'POST',
    //   body: JSON.stringify({ patientId, mood: moodId, timestamp: new Date() })
    // });
  };

  const handlePracticeComplete = (practiceType: string) => {
    setPractices(prev => ({ ...prev, [practiceType]: true }));
    
    // Check if all practices complete
    const allComplete = Object.values({ ...practices, [practiceType]: true }).every(v => v);
    if (allComplete && selectedMood) {
      setTodayComplete(true);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="headline-section text-primary">STATION</h1>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" style={{ color: '#F39C12' }} />
            <span className="text-lg">{streak} day streak</span>
          </div>
        </div>
        <p className="copy-secondary">Your daily practice hub</p>
      </div>

      {/* Daily Check In */}
      <div className="max-w-4xl mx-auto mb-8">
        <div 
          className="p-8 border border-[--border] bg-white"
          style={{ borderLeft: '4px solid #5739FB' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-6 h-6" style={{ color: '#5739FB' }} />
            <h2 className="headline-card">How are you today?</h2>
          </div>

          <div className="grid grid-cols-5 gap-3 mb-6">
            {MOOD_OPTIONS.map((mood) => (
              <button
                key={mood.id}
                onClick={() => handleMoodSelect(mood.id)}
                className={`
                  p-4 border-2 transition-all
                  ${selectedMood === mood.id 
                    ? 'border-primary bg-primary/5 scale-105' 
                    : 'border-[--border] hover:border-primary/30'
                  }
                `}
                style={{
                  borderColor: selectedMood === mood.id ? mood.color : undefined,
                }}
              >
                <div 
                  className="w-8 h-8 mx-auto mb-2"
                  style={{ backgroundColor: mood.color, opacity: selectedMood === mood.id ? 1 : 0.3 }}
                />
                <p className="text-sm">{mood.label}</p>
              </button>
            ))}
          </div>

          {selectedMood && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4" style={{ color: '#2ECC71' }} />
              <span>Check-in saved</span>
            </div>
          )}
        </div>
      </div>

      {/* Today's Practices */}
      <div className="max-w-4xl mx-auto mb-8">
        <h2 className="headline-card mb-4">Today's Practices</h2>
        
        <div className="grid gap-4">
          {/* Morning Practice */}
          <div 
            className={`
              p-6 border border-[--border] bg-white transition-all
              ${practices.morning ? 'opacity-60' : 'hover:border-primary/30'}
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5" style={{ color: '#5739FB' }} />
                  <h3 className="headline-card">Morning Reset</h3>
                  {practices.morning && (
                    <CheckCircle className="w-5 h-5" style={{ color: '#2ECC71' }} />
                  )}
                </div>
                <p className="copy-secondary">Start your day with intention</p>
              </div>
              {!practices.morning && (
                <Button
                  onClick={() => {
                    handlePracticeComplete('morning');
                    onStartPractice('morning');
                  }}
                  style={{ backgroundColor: '#5739FB' }}
                  className="text-white"
                >
                  Start Practice
                </Button>
              )}
            </div>
          </div>

          {/* Afternoon Check In */}
          <div 
            className={`
              p-6 border border-[--border] bg-white transition-all
              ${practices.afternoon ? 'opacity-60' : 'hover:border-primary/30'}
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Brain className="w-5 h-5" style={{ color: '#7C67FF' }} />
                  <h3 className="headline-card">Afternoon Anchor</h3>
                  {practices.afternoon && (
                    <CheckCircle className="w-5 h-5" style={{ color: '#2ECC71' }} />
                  )}
                </div>
                <p className="copy-secondary">Reconnect with your center</p>
              </div>
              {!practices.afternoon && (
                <Button
                  onClick={() => {
                    handlePracticeComplete('afternoon');
                    onStartPractice('afternoon');
                  }}
                  style={{ backgroundColor: '#7C67FF' }}
                  className="text-white"
                >
                  Start Practice
                </Button>
              )}
            </div>
          </div>

          {/* Evening Reflection */}
          <div 
            className={`
              p-6 border border-[--border] bg-white transition-all
              ${practices.evening ? 'opacity-60' : 'hover:border-primary/30'}
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5" style={{ color: '#3E2BB8' }} />
                  <h3 className="headline-card">Evening Review</h3>
                  {practices.evening && (
                    <CheckCircle className="w-5 h-5" style={{ color: '#2ECC71' }} />
                  )}
                </div>
                <p className="copy-secondary">Reflect on your progress</p>
              </div>
              {!practices.evening && (
                <Button
                  onClick={() => {
                    handlePracticeComplete('evening');
                    onStartPractice('evening');
                  }}
                  style={{ backgroundColor: '#3E2BB8' }}
                  className="text-white"
                >
                  Start Practice
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="max-w-4xl mx-auto">
        <h2 className="headline-card mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onOpenSoundbite}
            className="p-6 border border-[--border] bg-white hover:border-primary/30 transition-all text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-5 h-5" style={{ color: '#5739FB' }} />
              <h3 className="headline-card">Browse Soundbites</h3>
            </div>
            <p className="copy-secondary text-sm">Explore the library</p>
          </button>

          <button
            className="p-6 border border-[--border] bg-white hover:border-primary/30 transition-all text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-5 h-5" style={{ color: '#7C67FF' }} />
              <h3 className="headline-card">My Progress</h3>
            </div>
            <p className="copy-secondary text-sm">Track your journey</p>
          </button>
        </div>
      </div>

      {/* Completion Celebration */}
      {todayComplete && (
        <div className="fixed bottom-8 right-8 p-6 bg-white border-2 border-primary shadow-lg max-w-sm">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-8 h-8" style={{ color: '#2ECC71' }} />
            <h3 className="headline-card">Day Complete!</h3>
          </div>
          <p className="copy-secondary">You completed all practices today. Keep up the momentum!</p>
        </div>
      )}
    </div>
  );
}
