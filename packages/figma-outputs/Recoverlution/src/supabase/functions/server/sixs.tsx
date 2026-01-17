/**
 * 6 S's SYSTEM API
 * Backend for STATION, SOUNDTRACKS, STORY, STICKYNOTES, SHELF, SEARCH
 */

import { Hono } from 'npm:hono';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

const getClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
};

// ============================================================================
// STATION - Daily practice dashboard
// ============================================================================

// Get today's progress for a patient
app.get('/station/today', async (c) => {
  const patientId = c.req.query('patientId');
  
  if (!patientId) {
    return c.json({ error: 'Patient ID required' }, 400);
  }

  try {
    const today = new Date().toISOString().split('T')[0];
    const key = `station:${patientId}:${today}`;
    
    const progress = await kv.get(key) || {
      mood: null,
      practices: {
        morning: false,
        afternoon: false,
        evening: false,
      },
      timestamp: new Date().toISOString(),
    };

    // Calculate streak
    const streak = await calculateStreak(patientId);

    return c.json({
      success: true,
      progress,
      streak,
    });
  } catch (error: any) {
    console.error('[Station Today] Error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Save mood check-in
app.post('/station/mood', async (c) => {
  try {
    const { patientId, mood, timestamp } = await c.req.json();
    
    if (!patientId || !mood) {
      return c.json({ error: 'Patient ID and mood required' }, 400);
    }

    const today = new Date().toISOString().split('T')[0];
    const key = `station:${patientId}:${today}`;
    
    const existing = await kv.get(key) || { practices: { morning: false, afternoon: false, evening: false } };
    
    await kv.set(key, {
      ...existing,
      mood,
      moodTimestamp: timestamp,
    });

    return c.json({ success: true });
  } catch (error: any) {
    console.error('[Station Mood] Error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Mark practice complete
app.post('/station/practice', async (c) => {
  try {
    const { patientId, practiceType } = await c.req.json();
    
    if (!patientId || !practiceType) {
      return c.json({ error: 'Patient ID and practice type required' }, 400);
    }

    const today = new Date().toISOString().split('T')[0];
    const key = `station:${patientId}:${today}`;
    
    const existing = await kv.get(key) || { mood: null, practices: { morning: false, afternoon: false, evening: false } };
    
    existing.practices[practiceType] = true;
    
    await kv.set(key, existing);

    return c.json({ success: true });
  } catch (error: any) {
    console.error('[Station Practice] Error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Helper function to calculate streak
async function calculateStreak(patientId: string): Promise<number> {
  let streak = 0;
  const today = new Date();
  
  // Check backwards from today
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const key = `station:${patientId}:${dateStr}`;
    
    const progress = await kv.get(key);
    
    if (!progress || !progress.mood) {
      break;
    }
    
    streak++;
  }
  
  return streak;
}

// ============================================================================
// SOUNDTRACKS - Curated playlists
// ============================================================================

// Get all playlists
app.get('/soundtracks/playlists', async (c) => {
  try {
    const playlists = await kv.get('soundtracks:playlists') || [];
    return c.json({ success: true, playlists });
  } catch (error: any) {
    console.error('[Soundtracks Playlists] Error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Get playlist by ID
app.get('/soundtracks/playlists/:id', async (c) => {
  const playlistId = c.req.param('id');
  
  try {
    const playlists = await kv.get('soundtracks:playlists') || [];
    const playlist = playlists.find((p: any) => p.id === playlistId);
    
    if (!playlist) {
      return c.json({ error: 'Playlist not found' }, 404);
    }

    return c.json({ success: true, playlist });
  } catch (error: any) {
    console.error('[Soundtracks Playlist] Error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// STORY - Personal journal
// ============================================================================

// Get journal entries for a patient
app.get('/story/entries', async (c) => {
  const patientId = c.req.query('patientId');
  
  if (!patientId) {
    return c.json({ error: 'Patient ID required' }, 400);
  }

  try {
    const key = `story:${patientId}:entries`;
    const entries = await kv.get(key) || [];
    
    // Sort by date descending
    entries.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return c.json({ success: true, entries });
  } catch (error: any) {
    console.error('[Story Entries] Error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Save journal entry
app.post('/story/entries', async (c) => {
  try {
    const entry = await c.req.json();
    
    if (!entry.patientId) {
      return c.json({ error: 'Patient ID required' }, 400);
    }

    const key = `story:${entry.patientId}:entries`;
    const entries = await kv.get(key) || [];
    
    entries.push(entry);
    
    await kv.set(key, entries);

    return c.json({ success: true, entry });
  } catch (error: any) {
    console.error('[Story Entry Save] Error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Get milestones
app.get('/story/milestones', async (c) => {
  const patientId = c.req.query('patientId');
  
  if (!patientId) {
    return c.json({ error: 'Patient ID required' }, 400);
  }

  try {
    const key = `story:${patientId}:milestones`;
    const milestones = await kv.get(key) || [];

    return c.json({ success: true, milestones });
  } catch (error: any) {
    console.error('[Story Milestones] Error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// STICKYNOTES - Quick captures
// ============================================================================

// Get all sticky notes for a patient
app.get('/stickynotes', async (c) => {
  const patientId = c.req.query('patientId');
  
  if (!patientId) {
    return c.json({ error: 'Patient ID required' }, 400);
  }

  try {
    const key = `stickynotes:${patientId}`;
    const notes = await kv.get(key) || [];

    return c.json({ success: true, notes });
  } catch (error: any) {
    console.error('[StickyNotes] Error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Save sticky note
app.post('/stickynotes', async (c) => {
  try {
    const note = await c.req.json();
    
    if (!note.patientId) {
      return c.json({ error: 'Patient ID required' }, 400);
    }

    const key = `stickynotes:${note.patientId}`;
    const notes = await kv.get(key) || [];
    
    notes.unshift(note); // Add to beginning
    
    await kv.set(key, notes);

    return c.json({ success: true, note });
  } catch (error: any) {
    console.error('[StickyNote Save] Error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Update sticky note
app.put('/stickynotes/:id', async (c) => {
  const noteId = c.req.param('id');
  
  try {
    const updates = await c.req.json();
    
    if (!updates.patientId) {
      return c.json({ error: 'Patient ID required' }, 400);
    }

    const key = `stickynotes:${updates.patientId}`;
    const notes = await kv.get(key) || [];
    
    const index = notes.findIndex((n: any) => n.id === noteId);
    if (index === -1) {
      return c.json({ error: 'Note not found' }, 404);
    }
    
    notes[index] = { ...notes[index], ...updates };
    
    await kv.set(key, notes);

    return c.json({ success: true, note: notes[index] });
  } catch (error: any) {
    console.error('[StickyNote Update] Error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Delete sticky note
app.delete('/stickynotes/:id', async (c) => {
  const noteId = c.req.param('id');
  const patientId = c.req.query('patientId');
  
  if (!patientId) {
    return c.json({ error: 'Patient ID required' }, 400);
  }

  try {
    const key = `stickynotes:${patientId}`;
    const notes = await kv.get(key) || [];
    
    const filtered = notes.filter((n: any) => n.id !== noteId);
    
    await kv.set(key, filtered);

    return c.json({ success: true });
  } catch (error: any) {
    console.error('[StickyNote Delete] Error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// SHELF - Saved favorites + collections
// ============================================================================

// Get saved items
app.get('/shelf/items', async (c) => {
  const patientId = c.req.query('patientId');
  
  if (!patientId) {
    return c.json({ error: 'Patient ID required' }, 400);
  }

  try {
    const key = `shelf:${patientId}:items`;
    const items = await kv.get(key) || [];

    return c.json({ success: true, items });
  } catch (error: any) {
    console.error('[Shelf Items] Error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Save item to shelf
app.post('/shelf/items', async (c) => {
  try {
    const item = await c.req.json();
    
    if (!item.patientId) {
      return c.json({ error: 'Patient ID required' }, 400);
    }

    const key = `shelf:${item.patientId}:items`;
    const items = await kv.get(key) || [];
    
    // Check if already saved
    const exists = items.find((i: any) => i.id === item.id && i.type === item.type);
    if (exists) {
      return c.json({ error: 'Item already saved' }, 400);
    }
    
    items.unshift(item);
    
    await kv.set(key, items);

    return c.json({ success: true, item });
  } catch (error: any) {
    console.error('[Shelf Save Item] Error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Get collections
app.get('/shelf/collections', async (c) => {
  const patientId = c.req.query('patientId');
  
  if (!patientId) {
    return c.json({ error: 'Patient ID required' }, 400);
  }

  try {
    const key = `shelf:${patientId}:collections`;
    const collections = await kv.get(key) || [];

    return c.json({ success: true, collections });
  } catch (error: any) {
    console.error('[Shelf Collections] Error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Create collection
app.post('/shelf/collections', async (c) => {
  try {
    const collection = await c.req.json();
    
    if (!collection.patientId) {
      return c.json({ error: 'Patient ID required' }, 400);
    }

    const key = `shelf:${collection.patientId}:collections`;
    const collections = await kv.get(key) || [];
    
    collections.push(collection);
    
    await kv.set(key, collections);

    return c.json({ success: true, collection });
  } catch (error: any) {
    console.error('[Shelf Create Collection] Error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// SEARCH - Intelligent search
// ============================================================================

// Search across all content
app.get('/search', async (c) => {
  const query = c.req.query('q');
  const pillars = c.req.query('pillars')?.split(',').filter(Boolean) || [];
  const types = c.req.query('types')?.split(',').filter(Boolean) || [];

  if (!query || query.length < 2) {
    return c.json({ error: 'Query must be at least 2 characters' }, 400);
  }

  try {
    const results: any[] = [];

    // Search soundbites
    if (types.length === 0 || types.includes('soundbite')) {
      const soundbites = await kv.get('soundbites:library') || [];
      const matchingSoundbites = soundbites.filter((sb: any) => {
        const matchesQuery = sb.title?.toLowerCase().includes(query.toLowerCase()) ||
                            sb.description?.toLowerCase().includes(query.toLowerCase()) ||
                            sb.transcript?.toLowerCase().includes(query.toLowerCase());
        const matchesPillar = pillars.length === 0 || pillars.includes(sb.pillar);
        return matchesQuery && matchesPillar;
      });

      results.push(...matchingSoundbites.map((sb: any) => ({
        ...sb,
        type: 'soundbite',
        relevanceScore: calculateRelevance(sb, query),
      })));
    }

    // Sort by relevance
    results.sort((a, b) => b.relevanceScore - a.relevanceScore);

    return c.json({ success: true, results: results.slice(0, 50) });
  } catch (error: any) {
    console.error('[Search] Error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Helper function to calculate relevance score
function calculateRelevance(item: any, query: string): number {
  const lowerQuery = query.toLowerCase();
  let score = 0;

  if (item.title?.toLowerCase().includes(lowerQuery)) score += 0.5;
  if (item.description?.toLowerCase().includes(lowerQuery)) score += 0.3;
  if (item.tags?.some((tag: string) => tag.toLowerCase().includes(lowerQuery))) score += 0.2;

  return Math.min(score, 1);
}

export default app;
