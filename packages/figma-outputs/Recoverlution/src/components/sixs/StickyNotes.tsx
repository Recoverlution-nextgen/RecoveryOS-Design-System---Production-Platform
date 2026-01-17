// STICKYNOTES - Quick captures + reminders system
// Capture moments, insights, and set reminders

import { useState, useEffect } from 'react';
import { StickyNote, Plus, Star, Clock, Check, Trash2, Edit } from 'lucide-react';
import { Button } from '../ui/button';

interface StickyNote {
  id: string;
  content: string;
  category: 'insight' | 'reminder' | 'goal' | 'gratitude' | 'thought';
  color: string;
  isPinned: boolean;
  createdAt: string;
  dueDate?: string;
  completed: boolean;
}

const CATEGORIES = [
  { id: 'insight', label: 'Insight', color: '#5739FB', icon: '💡' },
  { id: 'reminder', label: 'Reminder', color: '#F39C12', icon: '⏰' },
  { id: 'goal', label: 'Goal', color: '#2ECC71', icon: '🎯' },
  { id: 'gratitude', label: 'Gratitude', color: '#E91E63', icon: '🙏' },
  { id: 'thought', label: 'Thought', color: '#9B59B6', icon: '💭' },
];

export function StickyNotes() {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [showNewNote, setShowNewNote] = useState(false);
  const [newNote, setNewNote] = useState({
    content: '',
    category: 'thought' as const,
    dueDate: '',
  });
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    // Load from backend
    // const response = await fetch('/api/stickynotes');
    // const data = await response.json();
    // setNotes(data.notes);

    // Mock data
    setNotes([
      {
        id: '1',
        content: 'Remember to breathe during stressful moments',
        category: 'reminder',
        color: '#F39C12',
        isPinned: true,
        createdAt: new Date().toISOString(),
        completed: false,
      },
      {
        id: '2',
        content: 'I noticed I feel calmer after morning meditation',
        category: 'insight',
        color: '#5739FB',
        isPinned: false,
        createdAt: new Date().toISOString(),
        completed: false,
      },
    ]);
  };

  const handleAddNote = async () => {
    const category = CATEGORIES.find(c => c.id === newNote.category);
    
    const note: StickyNote = {
      id: Date.now().toString(),
      content: newNote.content,
      category: newNote.category,
      color: category?.color || '#9B59B6',
      isPinned: false,
      createdAt: new Date().toISOString(),
      dueDate: newNote.dueDate || undefined,
      completed: false,
    };

    // Save to backend
    // await fetch('/api/stickynotes', {
    //   method: 'POST',
    //   body: JSON.stringify(note)
    // });

    setNotes([note, ...notes]);
    setShowNewNote(false);
    setNewNote({ content: '', category: 'thought', dueDate: '' });
  };

  const handleTogglePin = (id: string) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    ));
  };

  const handleToggleComplete = (id: string) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, completed: !note.completed } : note
    ));
  };

  const handleDelete = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const filteredNotes = filter
    ? notes.filter(note => note.category === filter)
    : notes;

  const pinnedNotes = filteredNotes.filter(note => note.isPinned);
  const unpinnedNotes = filteredNotes.filter(note => !note.isPinned);

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <StickyNote className="w-8 h-8" style={{ color: '#5739FB' }} />
              <h1 className="headline-section text-primary">STICKYNOTES</h1>
            </div>
            <p className="copy-secondary">Quick captures and reminders</p>
          </div>

          <Button
            onClick={() => setShowNewNote(true)}
            style={{ backgroundColor: '#5739FB' }}
            className="text-white"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Note
          </Button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilter(null)}
            className={`
              px-4 py-2 border transition-all
              ${!filter 
                ? 'border-primary bg-primary/10' 
                : 'border-[--border] hover:border-primary/30'
              }
            `}
          >
            All Notes
          </button>
          
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`
                px-4 py-2 border transition-all flex items-center gap-2
                ${filter === category.id 
                  ? 'border-2' 
                  : 'border-[--border] hover:border-primary/30'
                }
              `}
              style={{
                borderColor: filter === category.id ? category.color : undefined,
                backgroundColor: filter === category.id ? `${category.color}15` : undefined,
              }}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      <div className="max-w-6xl mx-auto">
        {/* Pinned Notes */}
        {pinnedNotes.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5" style={{ color: '#F39C12' }} />
              <h2 className="headline-card">Pinned</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pinnedNotes.map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onTogglePin={handleTogglePin}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular Notes */}
        {unpinnedNotes.length > 0 && (
          <div>
            {pinnedNotes.length > 0 && (
              <h2 className="headline-card mb-4">All Notes</h2>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unpinnedNotes.map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onTogglePin={handleTogglePin}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredNotes.length === 0 && (
          <div className="text-center py-12 border border-dashed border-[--border]">
            <StickyNote className="w-12 h-12 mx-auto mb-4" style={{ color: '#5739FB', opacity: 0.5 }} />
            <h3 className="headline-card mb-2">No notes yet</h3>
            <p className="copy-secondary mb-4">Capture your thoughts and insights</p>
            <Button
              onClick={() => setShowNewNote(true)}
              style={{ backgroundColor: '#5739FB' }}
              className="text-white"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Note
            </Button>
          </div>
        )}
      </div>

      {/* New Note Modal */}
      {showNewNote && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
          onClick={() => setShowNewNote(false)}
        >
          <div 
            className="bg-white max-w-lg w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="headline-section mb-6">New Sticky Note</h2>

            {/* Category Selector */}
            <div className="mb-6">
              <label className="block mb-2">Category</label>
              <div className="grid grid-cols-3 gap-3">
                {CATEGORIES.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setNewNote({ ...newNote, category: category.id as any })}
                    className={`
                      p-3 border-2 transition-all text-center
                      ${newNote.category === category.id 
                        ? 'border-primary scale-105' 
                        : 'border-[--border] hover:border-primary/30'
                      }
                    `}
                  >
                    <div className="text-2xl mb-1">{category.icon}</div>
                    <p className="text-xs">{category.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="mb-6">
              <label className="block mb-2">Content</label>
              <textarea
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                className="w-full p-3 border border-[--border] focus:border-primary outline-none min-h-[120px]"
                placeholder="Write your note here..."
              />
            </div>

            {/* Due Date (for reminders) */}
            {newNote.category === 'reminder' && (
              <div className="mb-6">
                <label className="block mb-2">Due Date (optional)</label>
                <input
                  type="date"
                  value={newNote.dueDate}
                  onChange={(e) => setNewNote({ ...newNote, dueDate: e.target.value })}
                  className="w-full p-3 border border-[--border] focus:border-primary outline-none"
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddNote}
                disabled={!newNote.content}
                style={{ backgroundColor: '#5739FB' }}
                className="flex-1 text-white"
              >
                Add Note
              </Button>
              <Button
                onClick={() => setShowNewNote(false)}
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

function NoteCard({ 
  note, 
  onTogglePin, 
  onToggleComplete, 
  onDelete 
}: { 
  note: StickyNote;
  onTogglePin: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const category = CATEGORIES.find(c => c.id === note.category);
  const isOverdue = note.dueDate && new Date(note.dueDate) < new Date() && !note.completed;

  return (
    <div
      className={`
        p-4 border transition-all relative
        ${note.completed ? 'opacity-60' : 'hover:shadow-md'}
      `}
      style={{
        borderLeft: `4px solid ${note.color}`,
        backgroundColor: note.isPinned ? `${note.color}05` : 'white',
      }}
    >
      {/* Header Actions */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{category?.icon}</span>
          <span className="text-xs px-2 py-1" style={{ backgroundColor: `${note.color}20`, color: note.color }}>
            {category?.label}
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => onTogglePin(note.id)}
            className="p-1 hover:bg-black/5 transition-all"
          >
            <Star 
              className="w-4 h-4" 
              style={{ 
                color: note.isPinned ? '#F39C12' : '#CBD5E0',
                fill: note.isPinned ? '#F39C12' : 'none',
              }} 
            />
          </button>
          
          {note.category === 'reminder' && (
            <button
              onClick={() => onToggleComplete(note.id)}
              className="p-1 hover:bg-black/5 transition-all"
            >
              <Check 
                className="w-4 h-4" 
                style={{ 
                  color: note.completed ? '#2ECC71' : '#CBD5E0',
                }} 
              />
            </button>
          )}
          
          <button
            onClick={() => onDelete(note.id)}
            className="p-1 hover:bg-red-50 transition-all"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>

      {/* Content */}
      <p className={`copy-secondary text-sm mb-3 ${note.completed ? 'line-through' : ''}`}>
        {note.content}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
        
        {note.dueDate && (
          <div 
            className="flex items-center gap-1"
            style={{ color: isOverdue ? '#E74C3C' : undefined }}
          >
            <Clock className="w-3 h-3" />
            <span>{new Date(note.dueDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}
