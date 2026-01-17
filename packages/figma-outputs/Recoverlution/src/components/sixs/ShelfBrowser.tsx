// SHELF - Saved favorites + collections
// Organize your favorite soundbites, practices, and content

import { useState, useEffect } from 'react';
import { Heart, Folder, Plus, Play, Trash2, Move } from 'lucide-react';
import { Button } from '../ui/button';

interface SavedItem {
  id: string;
  type: 'soundbite' | 'practice' | 'article' | 'journey';
  title: string;
  description: string;
  pillar: string;
  savedAt: string;
  collectionId?: string;
  thumbnailColor: string;
}

interface Collection {
  id: string;
  name: string;
  description: string;
  color: string;
  itemCount: number;
  createdAt: string;
}

export function ShelfBrowser() {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [showNewCollection, setShowNewCollection] = useState(false);
  const [newCollection, setNewCollection] = useState({ name: '', description: '', color: '#5739FB' });

  useEffect(() => {
    loadSavedItems();
    loadCollections();
  }, []);

  const loadSavedItems = async () => {
    // Load from backend
    // const response = await fetch('/api/shelf/items');
    // const data = await response.json();
    // setSavedItems(data.items);

    // Mock data
    setSavedItems([
      {
        id: '1',
        type: 'soundbite',
        title: 'The Power of Pause',
        description: 'Learn to create space between stimulus and response',
        pillar: 'ER',
        savedAt: new Date().toISOString(),
        thumbnailColor: '#7C67FF',
      },
      {
        id: '2',
        type: 'practice',
        title: 'Morning Grounding Meditation',
        description: '10 minute practice to start your day centered',
        pillar: 'ER',
        savedAt: new Date().toISOString(),
        collectionId: 'morning-routine',
        thumbnailColor: '#5739FB',
      },
    ]);
  };

  const loadCollections = async () => {
    // Mock collections
    setCollections([
      {
        id: 'morning-routine',
        name: 'Morning Routine',
        description: 'My daily morning practices',
        color: '#F39C12',
        itemCount: 5,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'crisis-toolkit',
        name: 'Crisis Toolkit',
        description: 'Quick access when I need support',
        color: '#E74C3C',
        itemCount: 3,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const handleCreateCollection = async () => {
    const collection: Collection = {
      id: Date.now().toString(),
      name: newCollection.name,
      description: newCollection.description,
      color: newCollection.color,
      itemCount: 0,
      createdAt: new Date().toISOString(),
    };

    // Save to backend
    // await fetch('/api/shelf/collections', {
    //   method: 'POST',
    //   body: JSON.stringify(collection)
    // });

    setCollections([collection, ...collections]);
    setShowNewCollection(false);
    setNewCollection({ name: '', description: '', color: '#5739FB' });
  };

  const handleRemoveItem = (id: string) => {
    setSavedItems(savedItems.filter(item => item.id !== id));
  };

  const filteredItems = selectedCollection
    ? savedItems.filter(item => item.collectionId === selectedCollection)
    : savedItems;

  const uncollectedItems = savedItems.filter(item => !item.collectionId);

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-8 h-8" style={{ color: '#5739FB' }} />
              <h1 className="headline-section text-primary">SHELF</h1>
            </div>
            <p className="copy-secondary">Your saved favorites and collections</p>
          </div>

          <Button
            onClick={() => setShowNewCollection(true)}
            style={{ backgroundColor: '#5739FB' }}
            className="text-white"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Collection
          </Button>
        </div>
      </div>

      {/* Collections */}
      {collections.length > 0 && (
        <div className="max-w-6xl mx-auto mb-8">
          <h2 className="headline-card mb-4">Collections</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <button
              onClick={() => setSelectedCollection(null)}
              className={`
                p-6 border transition-all text-left
                ${!selectedCollection 
                  ? 'border-primary bg-primary/10' 
                  : 'border-[--border] hover:border-primary/30'
                }
              `}
            >
              <div className="flex items-center gap-3 mb-2">
                <Heart className="w-6 h-6" style={{ color: '#5739FB' }} />
                <h3 className="headline-card">All Saved</h3>
              </div>
              <p className="copy-secondary text-sm">{savedItems.length} items</p>
            </button>

            {collections.map(collection => (
              <button
                key={collection.id}
                onClick={() => setSelectedCollection(collection.id)}
                className={`
                  p-6 border transition-all text-left
                  ${selectedCollection === collection.id 
                    ? 'border-2' 
                    : 'border-[--border] hover:border-primary/30'
                  }
                `}
                style={{
                  borderColor: selectedCollection === collection.id ? collection.color : undefined,
                  backgroundColor: selectedCollection === collection.id ? `${collection.color}10` : undefined,
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Folder className="w-6 h-6" style={{ color: collection.color }} />
                  <h3 className="headline-card">{collection.name}</h3>
                </div>
                <p className="copy-secondary text-sm mb-2">{collection.description}</p>
                <p className="text-xs text-muted-foreground">{collection.itemCount} items</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Saved Items */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="headline-card">
            {selectedCollection 
              ? collections.find(c => c.id === selectedCollection)?.name 
              : 'All Saved Items'
            }
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredItems.length} items
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-[--border]">
            <Heart className="w-12 h-12 mx-auto mb-4" style={{ color: '#5739FB', opacity: 0.5 }} />
            <h3 className="headline-card mb-2">
              {selectedCollection ? 'No items in this collection' : 'No saved items yet'}
            </h3>
            <p className="copy-secondary">
              {selectedCollection 
                ? 'Add items to this collection from the main library' 
                : 'Heart items you love to save them here'
              }
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="p-6 border border-[--border] bg-white hover:border-primary/30 transition-all"
                style={{ borderLeft: `4px solid ${item.thumbnailColor}` }}
              >
                {/* Item Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary">
                        {item.type}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.pillar}
                      </span>
                    </div>
                    <h3 className="headline-card mb-2">{item.title}</h3>
                    <p className="copy-secondary text-sm">{item.description}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-4">
                  <Button
                    size="sm"
                    style={{ backgroundColor: item.thumbnailColor }}
                    className="text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Open
                  </Button>

                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 hover:bg-black/5 transition-all"
                      title="Move to collection"
                    >
                      <Move className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-2 hover:bg-red-50 transition-all"
                      title="Remove from shelf"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                {/* Saved timestamp */}
                <div className="text-xs text-muted-foreground mt-3">
                  Saved {new Date(item.savedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Collection Modal */}
      {showNewCollection && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
          onClick={() => setShowNewCollection(false)}
        >
          <div 
            className="bg-white max-w-lg w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="headline-section mb-6">New Collection</h2>

            {/* Name */}
            <div className="mb-6">
              <label className="block mb-2">Collection Name</label>
              <input
                type="text"
                value={newCollection.name}
                onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value })}
                className="w-full p-3 border border-[--border] focus:border-primary outline-none"
                placeholder="e.g., Morning Routine, Crisis Toolkit..."
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block mb-2">Description (optional)</label>
              <textarea
                value={newCollection.description}
                onChange={(e) => setNewCollection({ ...newCollection, description: e.target.value })}
                className="w-full p-3 border border-[--border] focus:border-primary outline-none min-h-[80px]"
                placeholder="What's this collection for?"
              />
            </div>

            {/* Color */}
            <div className="mb-6">
              <label className="block mb-2">Color</label>
              <div className="grid grid-cols-6 gap-2">
                {['#5739FB', '#7C67FF', '#9D8FFF', '#F39C12', '#E74C3C', '#2ECC71'].map(color => (
                  <button
                    key={color}
                    onClick={() => setNewCollection({ ...newCollection, color })}
                    className={`
                      w-full aspect-square border-2 transition-all
                      ${newCollection.color === color ? 'border-black scale-110' : 'border-transparent'}
                    `}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                onClick={handleCreateCollection}
                disabled={!newCollection.name}
                style={{ backgroundColor: '#5739FB' }}
                className="flex-1 text-white"
              >
                Create Collection
              </Button>
              <Button
                onClick={() => setShowNewCollection(false)}
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
