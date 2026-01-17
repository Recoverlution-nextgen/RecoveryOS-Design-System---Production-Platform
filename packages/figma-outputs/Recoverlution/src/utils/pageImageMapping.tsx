/**
 * CENTRALIZED PAGE IMAGE MAPPING - SINGLE SOURCE OF TRUTH
 * THE RULE: Dashboard card background and page header background are ALWAYS THE SAME
 * 
 * V12.3 DASHBOARD ASSETS - Finalized October 28, 2025
 * 
 * Color Journey:
 * - Blues (Foundation): Journey → Navicues → State
 * - Purples (Brand): Wellbeing → Toolkit → Momentum
 * - Cyan (Accent): Navigate → Settings
 */

// Import v12.3 Dashboard Header Assets (Dashboard Glass Magic)
import journeyHeroAsset from "figma:asset/abbdcde6011c1b4fea13c52874ecbe79bf638b4a.png"; // Blue fabric/ribbon (brand aligned warmth)
import navicuesHeroAsset from "figma:asset/6d10e5fdaf0c14e3124f0278e0ee4cab6c27c11d.png"; // Cooler blue geometric cubes
import wellbeingHeroAsset from "figma:asset/a3e60413e37cf570a5c93b24174be4dfe1b1461a.png"; // Purple fluid swirls (gentle movement)
import stateHeroAsset from "figma:asset/20c2aa2a809398c70628df25868ff42d3b7c6dfd.png"; // Blue clover pattern (soft organic blue)
import toolkitHeroAsset from "figma:asset/d3b08d5e57ff6104e428dae18b236d12cf53297e.png"; // Soft purple geometry (elegant brand purple)
import navigateHeroAsset from "figma:asset/3ec6ce502171668b7dfada21b1a8ae7dd4d82bb1.png"; // Cyan 3D stairs (turquoise depth)
import momentumHeroAsset from "figma:asset/4c5dd03002ca21bee685976d68edf96f531f83fd.png"; // Purple/blue dominoes (gradient energy)
import settingsHeroAsset from "figma:asset/b8c0c664db13180aae6ef8c21894fe5895c3cf45.png"; // Cyan 3D stacked blocks (organized, technical)
import dashboardBeige from "figma:asset/dd0660ce813313577b682402fc2c0e173dc834e1.png"; // Dashboard landing page

/**
 * PAGE IMAGES - v12.3 Dashboard Assets
 * Used by both dashboard tiles AND page headers (universal consistency)
 */
export const PAGE_IMAGES = {
  // Blues (Foundation) - Warm to Cool
  Journey: journeyHeroAsset,             // Blue fabric/ribbon (brand aligned warmth)
  Navicues: navicuesHeroAsset,           // Cooler blue geometric cubes (distinct from Journey)
  State: stateHeroAsset,                 // Blue clover pattern (soft organic blue)
  "Inner Compass": stateHeroAsset,       // Legacy alias - State is the canonical name
  
  // Purples (Brand) - Our signature color family
  Wellbeing: wellbeingHeroAsset,         // Purple fluid swirls (gentle movement)
  Toolkit: toolkitHeroAsset,             // Soft purple geometry (elegant brand purple)
  Momentum: momentumHeroAsset,           // Purple/blue dominoes (gradient energy)
  
  // Cyan (Accent) - Technical precision
  Navigate: navigateHeroAsset,           // Cyan 3D stairs (turquoise depth)
  Settings: settingsHeroAsset,           // Cyan 3D stacked blocks (organized, technical)
  Profile: settingsHeroAsset,            // Profile and Settings are the same
  
  // Dashboard Landing
  Dashboard: dashboardBeige,             // Neutral beige for main dashboard
  
  // Fallback
  default: dashboardBeige
} as const;

/**
 * Get page background image
 * Used by BOTH dashboard cards AND page headers
 */
export function getPageImage(pageName: keyof typeof PAGE_IMAGES | string): string {
  if (pageName in PAGE_IMAGES) {
    return PAGE_IMAGES[pageName as keyof typeof PAGE_IMAGES];
  }
  return PAGE_IMAGES.default;
}
