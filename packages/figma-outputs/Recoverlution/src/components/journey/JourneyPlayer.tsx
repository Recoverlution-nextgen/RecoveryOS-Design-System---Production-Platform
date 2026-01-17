/**
 * JOURNEY PLAYER - Polymorphic player for journey scenes
 * Uses ContentRenderer for proper journey_scene rendering
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { ContentRenderer } from '../universal-player/ContentRenderer';

interface JourneyPlayerProps {
  content: any;
  contentType: 'journey_scene';
  onClose: () => void;
  onResponse?: (response: any) => void;
}

export function JourneyPlayer({ content, contentType, onClose, onResponse }: JourneyPlayerProps) {
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);

  function handleClose() {
    if (content?.current_scene < content?.total_scenes) {
      setShowCloseConfirm(true);
    } else {
      onClose();
    }
  }

  function confirmClose() {
    setShowCloseConfirm(false);
    onClose();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black"
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="fixed top-6 right-6 z-50 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close player"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Content */}
      <div className="h-full overflow-y-auto">
        <div className="min-h-full flex items-center justify-center py-12">
          <ContentRenderer
            content={content}
            contentType={contentType}
            onResponse={(response) => {
              console.log('[JourneyPlayer] Response:', response);
              onResponse?.(response);
            }}
            onClose={onClose}
            onNext={() => {
              console.log('[JourneyPlayer] Next triggered');
              onResponse?.({ type: 'continue' });
            }}
          />
        </div>
      </div>

      {/* Close Confirmation */}
      <AnimatePresence>
        {showCloseConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center"
            onClick={() => setShowCloseConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0A0B0F] border border-white/10 p-8 max-w-md"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Exit Journey?
              </h2>
              <p className="text-zinc-400 mb-8">
                Your progress will be saved, but you will need to resume from where you left off.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowCloseConfirm(false)}
                  className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-white transition-colors"
                >
                  Keep Going
                </button>
                <button
                  onClick={confirmClose}
                  className="flex-1 px-6 py-3 bg-[#3E2BB8] hover:bg-[#5739FB] text-white transition-colors"
                >
                  Exit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
