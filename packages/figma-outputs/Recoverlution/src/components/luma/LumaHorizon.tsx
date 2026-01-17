/**
 * LUMA HORIZON - The Canvas Experience
 * 
 * Asset as canvas, cue as hero.
 * Horizontal swipe to change paths → background changes with it.
 * Simple, visual, powerful.
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ContentPath {
  id: string;
  contentType: 'navicue' | 'practice' | 'state' | 'journey' | 'reflection';
  contentId: string;
  content: {
    title: string;
    description: string;
    backgroundImage: string;
    pillarName: string;
    pillarColor: string;
    duration?: string;
    instructor?: string;
    concept?: string;
  };
  reason: string;
  priority: 1 | 2 | 3;
}

interface LumaHorizonProps {
  paths: ContentPath[];
  selectedPath: ContentPath | null;
  onSelectPath: (path: ContentPath) => void;
  onLoadNextLevel: () => void;
  mode: 'navicue' | 'rescue';
}

export function LumaHorizon({
  paths,
  selectedPath,
  onSelectPath,
  onLoadNextLevel,
  mode
}: LumaHorizonProps) {
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const currentIndex = selectedPath ? paths.indexOf(selectedPath) : 0;

  const goToNext = () => {
    if (currentIndex < paths.length - 1) {
      setDirection(1);
      onSelectPath(paths[currentIndex + 1]);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      onSelectPath(paths[currentIndex - 1]);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (diff > threshold) {
      goToNext();
    } else if (diff < -threshold) {
      goToPrevious();
    }
  };

  if (!selectedPath) return null;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Horizon is now just for swipe gestures - background handled by parent */}
      {/* Empty space for swiping, dots, or subtle navigation hints can go here */}
    </div>
  );
}