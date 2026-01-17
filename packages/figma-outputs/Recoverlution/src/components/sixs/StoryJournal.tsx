// STORY - Personal journal + timeline visualization
// Track your recovery journey over time

import { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Heart, Brain, Sparkles, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface JournalEntry {
  id: string;
  date: string;
  mood: number; // 1-5
  title: string;
  content: string;
  practices: string[];
  milestones: string[];
  reflections: string;
}

interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'practice' | 'insight' | 'breakthrough' | 'connection';
  color: string;
}

export function StoryJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'journal' | 'timeline'>('journal');
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({
    mood: 3,
    title: '',
    content: '',
    reflections: '',
  });

  useEffect(() => {
    loadEntries();
    loadMilestones();
  }, []);

  const loadEntries = async () => {
    // Load from backend
    // const response = await fetch('/api/story/entries');
    // const data = await response.json();
    // setEntries(data.entries);

    // Mock data for demo
    setEntries([
      {
        id: '1',
        date: '2025-01-01',
        mood: 4,
        title: 'New Year, New Beginning',
        content: 'Started my recovery journey today. Feeling hopeful.',
        practices: ['Morning Reset', 'Evening Reflection'],
        milestones: [],
        reflections: 'I notice I feel most centered in the morning.',
      },
    ]);
  };

  const loadMilestones = async () => {
    // Mock milestones
    setMilestones([
      {
        id: '1',
        date: '2025-01-01',
        title: 'Journey Begins',
        description: 'Started using Recoverlution',
        category: 'breakthrough',
        color: '#5739FB',
      },
      {
        id: '2',
        date: '2025-01-07',
        title: '7 Day Streak',
        description: 'Completed practices every day for a week',
        category: 'practice',
        color: '#2ECC71',
      },
    ]);
  };

  const handleSaveEntry = async () => {
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: selectedDate.toISOString().split('T')[0],
      mood: newEntry.mood,
      title: newEntry.title,
      content: newEntry.content,
      practices: [],
      milestones: [],
      reflections: newEntry.reflections,
    };

    // Save to backend
    // await fetch('/api/story/entries', {
    //   method: 'POST',
    //   body: JSON.stringify(entry)
    // });

    setEntries([entry, ...entries]);
    setShowNewEntry(false);
    setNewEntry({ mood: 3, title: '', content: '', reflections: '' });
  };

  const getMoodColor = (mood: number) => {
    const colors = {
      1: '#E74C3C',
      2: '#F39C12',
      3: '#3498DB',
      4: '#9B59B6',
      5: '#2ECC71',
    };
    return colors[mood as keyof typeof colors] || '#3498DB';
  };

  const getMoodLabel = (mood: number) => {
    const labels = {
      1: 'Struggling',
      2: 'Managing',
      3: 'Stable',
      4: 'Growing',
      5: 'Thriving',
    };
    return labels[mood as keyof typeof labels] || 'Stable';
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-8 h-8" style={{ color: '#5739FB' }} />
              <h1 className="headline-section text-primary">STORY</h1>
            </div>
            <p className="copy-secondary">Your personal recovery journey</p>
          </div>

          <Button
            onClick={() => setShowNewEntry(true)}
            style={{ backgroundColor: '#5739FB' }}
            className="text-white"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Entry
          </Button>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setView('journal')}
            className={`
              px-4 py-2 border transition-all
              ${view === 'journal' 
                ? 'border-primary bg-primary/10' 
                : 'border-[--border] hover:border-primary/30'
              }
            `}
          >
            Journal View
          </button>
          <button
            onClick={() => setView('timeline')}
            className={`
              px-4 py-2 border transition-all
              ${view === 'timeline' 
                ? 'border-primary bg-primary/10' 
                : 'border-[--border] hover:border-primary/30'
              }
            `}
          >
            Timeline View
          </button>
        </div>
      </div>

      {/* Journal View */}
      {view === 'journal' && (
        <div className="max-w-4xl mx-auto space-y-6">
          {entries.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-[--border]">
              <Sparkles className="w-12 h-12 mx-auto mb-4" style={{ color: '#5739FB', opacity: 0.5 }} />
              <h3 className="headline-card mb-2">Your story starts here</h3>
              <p className="copy-secondary mb-4">Create your first journal entry</p>
              <Button
                onClick={() => setShowNewEntry(true)}
                style={{ backgroundColor: '#5739FB' }}
                className="text-white"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Entry
              </Button>
            </div>
          ) : (
            entries.map(entry => (
              <div
                key={entry.id}
                className="p-6 border border-[--border] bg-white hover:border-primary/30 transition-all"
                style={{ borderLeft: `4px solid ${getMoodColor(entry.mood)}` }}
              >
                {/* Entry Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="headline-card mb-2">{entry.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(entry.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4" style={{ color: getMoodColor(entry.mood) }} />
                        <span>{getMoodLabel(entry.mood)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Entry Content */}
                <p className="copy-secondary mb-4">{entry.content}</p>

                {/* Reflections */}
                {entry.reflections && (
                  <div className="p-4 bg-primary/5 border-l-2 border-primary">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-4 h-4" style={{ color: '#5739FB' }} />
                      <span className="text-sm">Reflection</span>
                    </div>
                    <p className="text-sm copy-secondary">{entry.reflections}</p>
                  </div>
                )}

                {/* Practices */}
                {entry.practices.length > 0 && (
                  <div className="mt-4 flex gap-2">
                    {entry.practices.map((practice, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary"
                      >
                        {practice}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Timeline View */}
      {view === 'timeline' && (
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div 
              className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20"
              style={{ marginLeft: '1px' }}
            />

            {/* Milestones */}
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="relative pl-20">
                  {/* Dot */}
                  <div
                    className="absolute left-6 w-5 h-5"
                    style={{
                      backgroundColor: milestone.color,
                      borderRadius: '50%',
                      border: '3px solid white',
                      boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
                    }}
                  />

                  {/* Content */}
                  <div className="p-6 border border-[--border] bg-white">
                    <div className="text-sm text-muted-foreground mb-2">
                      {new Date(milestone.date).toLocaleDateString()}
                    </div>
                    <h3 className="headline-card mb-2">{milestone.title}</h3>
                    <p className="copy-secondary">{milestone.description}</p>
                    
                    <div className="mt-3">
                      <span
                        className="text-xs px-2 py-1"
                        style={{
                          backgroundColor: `${milestone.color}20`,
                          color: milestone.color,
                        }}
                      >
                        {milestone.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* New Entry Modal */}
      {showNewEntry && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
          onClick={() => setShowNewEntry(false)}
        >
          <div 
            className="bg-white max-w-2xl w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="headline-section mb-6">New Journal Entry</h2>

            {/* Mood Selector */}
            <div className="mb-6">
              <label className="block mb-2">How are you feeling?</label>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map(mood => (
                  <button
                    key={mood}
                    onClick={() => setNewEntry({ ...newEntry, mood })}
                    className={`
                      flex-1 p-3 border-2 transition-all
                      ${newEntry.mood === mood 
                        ? 'border-primary scale-105' 
                        : 'border-[--border] hover:border-primary/30'
                      }
                    `}
                  >
                    <div 
                      className="w-6 h-6 mx-auto mb-1"
                      style={{ 
                        backgroundColor: getMoodColor(mood),
                        opacity: newEntry.mood === mood ? 1 : 0.3,
                      }}
                    />
                    <p className="text-xs">{getMoodLabel(mood)}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="mb-6">
              <label className="block mb-2">Title</label>
              <input
                type="text"
                value={newEntry.title}
                onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                className="w-full p-3 border border-[--border] focus:border-primary outline-none"
                placeholder="Give this entry a title..."
              />
            </div>

            {/* Content */}
            <div className="mb-6">
              <label className="block mb-2">What's on your mind?</label>
              <textarea
                value={newEntry.content}
                onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                className="w-full p-3 border border-[--border] focus:border-primary outline-none min-h-[120px]"
                placeholder="Write about your day, your thoughts, your progress..."
              />
            </div>

            {/* Reflections */}
            <div className="mb-6">
              <label className="block mb-2">Reflection (optional)</label>
              <textarea
                value={newEntry.reflections}
                onChange={(e) => setNewEntry({ ...newEntry, reflections: e.target.value })}
                className="w-full p-3 border border-[--border] focus:border-primary outline-none min-h-[80px]"
                placeholder="What did you learn? What patterns did you notice?"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                onClick={handleSaveEntry}
                disabled={!newEntry.title || !newEntry.content}
                style={{ backgroundColor: '#5739FB' }}
                className="flex-1 text-white"
              >
                Save Entry
              </Button>
              <Button
                onClick={() => setShowNewEntry(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
