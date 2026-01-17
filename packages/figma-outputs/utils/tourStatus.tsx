/**
 * Platform Tour Status Manager
 * 
 * Manages tour completion status with localStorage persistence
 * Following best practices for first-time user experiences
 */

type TourStatus = 'never-seen' | 'completed' | 'skipped';

const TOUR_STATUS_KEY = 'recoverlution_tour_status';

/**
 * Get the current tour status from localStorage
 */
export function getTourStatus(): TourStatus {
  try {
    const status = localStorage.getItem(TOUR_STATUS_KEY);
    
    if (status === 'completed' || status === 'skipped') {
      return status as TourStatus;
    }
    
    return 'never-seen';
  } catch (error) {
    console.error('Error reading tour status:', error);
    return 'never-seen';
  }
}

/**
 * Check if user should see the tour
 * Returns true only if they've never seen it
 */
export function shouldShowTour(): boolean {
  return getTourStatus() === 'never-seen';
}

/**
 * Mark tour as completed (user finished all steps)
 */
export function markTourCompleted(): void {
  try {
    localStorage.setItem(TOUR_STATUS_KEY, 'completed');
    console.log('✅ Tour marked as completed');
  } catch (error) {
    console.error('Error saving tour completion:', error);
  }
}

/**
 * Mark tour as skipped (user said "I've got it")
 */
export function markTourSkipped(): void {
  try {
    localStorage.setItem(TOUR_STATUS_KEY, 'skipped');
    console.log('👍 Tour skipped - user said "I\'ve got it"');
  } catch (error) {
    console.error('Error saving tour skip:', error);
  }
}

/**
 * Reset tour status (for "Take tour again" feature)
 */
export function resetTourStatus(): void {
  try {
    localStorage.removeItem(TOUR_STATUS_KEY);
    console.log('🔄 Tour status reset - will show on next dashboard visit');
  } catch (error) {
    console.error('Error resetting tour status:', error);
  }
}

/**
 * Check if user has completed the tour
 */
export function hasTourBeenCompleted(): boolean {
  return getTourStatus() === 'completed';
}

/**
 * Check if user has skipped the tour
 */
export function hasTourBeenSkipped(): boolean {
  return getTourStatus() === 'skipped';
}
