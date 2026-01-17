/**
 * SORT Response Component
 * 
 * Drag to reorder items by priority
 * Psychology: Reveals true values through forced trade-offs
 */

import { useState } from 'react';
import { motion, Reorder } from 'motion/react';
import { GripVertical } from 'lucide-react';

interface SortResponseProps {
  items: string[];
  instruction?: string;
  orientation?: 'vertical' | 'horizontal';
  onRespond: (sortedItems: string[]) => void;
}

export function SortResponse({
  items,
  instruction = 'Drag to reorder by importance',
  orientation = 'vertical',
  onRespond
}: SortResponseProps) {
  const [sortedItems, setSortedItems] = useState(items || []);

  const handleContinue = () => {
    onRespond(sortedItems);
  };

  // Safety check
  if (!items || items.length === 0) {
    return (
      <div className="text-center text-white/60 text-sm">
        No items to sort
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Instruction */}
      <div className="text-center text-white/60 text-sm uppercase tracking-wider">
        {instruction}
      </div>

      {/* Sortable list */}
      <Reorder.Group
        axis={orientation === 'vertical' ? 'y' : 'x'}
        values={sortedItems}
        onReorder={setSortedItems}
        className="space-y-3"
      >
        {sortedItems.map((item, index) => (
          <Reorder.Item
            key={item}
            value={item}
            className="relative"
          >
            <motion.div
              className="flex items-center gap-4 p-4 bg-white/10 border border-white/20 cursor-move hover:bg-white/15 transition-colors"
              style={{ borderRadius: '0px' }}
              whileHover={{ scale: 1.02 }}
              whileDrag={{ scale: 1.05, zIndex: 10 }}
            >
              {/* Order number */}
              <div 
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-white/20 text-white"
                style={{ 
                  borderRadius: '0px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700
                }}
              >
                {index + 1}
              </div>

              {/* Item text */}
              <div 
                className="flex-1 text-white"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600
                }}
              >
                {item}
              </div>

              {/* Drag handle */}
              <div className="flex-shrink-0 text-white/40">
                <GripVertical className="w-5 h-5" />
              </div>
            </motion.div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Continue button */}
      <button
        onClick={handleContinue}
        className="w-full py-4 bg-white/20 hover:bg-white/30 text-white transition-colors"
        style={{
          borderRadius: '0px',
          fontFamily: 'var(--font-display)',
          fontWeight: 600
        }}
      >
        Continue
      </button>
    </div>
  );
}