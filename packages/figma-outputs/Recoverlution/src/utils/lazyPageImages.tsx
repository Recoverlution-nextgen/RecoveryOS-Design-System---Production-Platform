/**
 * LAZY IMAGE LOADING SYSTEM - MATCHES DashboardPage.tsx EXACTLY
 * Images are loaded ONLY when the specific page is accessed
 * Journey is 2x optimized, others need optimization still
 */

// Create lazy loaders for each image (matching DashboardPage.tsx asset hashes)
export const lazyPageImages = {
  Journey: () => import("figma:asset/11a66e41d6391b537e8b720094f821ad9ddbe9c2.png"), // ✅ 2x optimized - water bokeh/bubbles
  Navicues: () => import("figma:asset/6721eda0bf0e39d02787e6630908503b1f71ca9f.png"), // ✅ 3D purple geometric cubes (FINAL - cubes above copy)
  State: () => import("figma:asset/b3bc2fe491436ac917575e98b1555f1e311b1a2d.png"), // ⚠️ NEEDS 2x - ethereal blue smoke/ink
  "Inner Compass": () => import("figma:asset/b3bc2fe491436ac917575e98b1555f1e311b1a2d.png"), // ⚠️ NEEDS 2x - ethereal blue smoke/ink
  Wellbeing: () => import("figma:asset/5362e588ab542f7db419b88dd4b51b3f266eab87.png"), // ⚠️ NEEDS 2x - purple clover flowers
  Toolkit: () => import("figma:asset/1e55f75b85ae1ef93e50cbae3d9d67bca09f559d.png"), // ⚠️ NEEDS 2x - purple/teal geometry blocks
  Navigate: () => import("figma:asset/1b88686bb696b14866c2e0d855096cc8aa116062.png"), // ✅ 3D holographic purple blocks (connected care network metaphor)
  Momentum: () => import("figma:asset/6d094057641e7e57a97cf68531bdf2f2f06a22bf.png"), // ��️ NEEDS 2x - blue/purple dominoes
  Dashboard: () => import("figma:asset/dd0660ce813313577b682402fc2c0e173dc834e1.png"), // Dashboard beige
  Profile: () => import("figma:asset/0fc239ab2fa5ed397ed2c2fac1b99a9f4fa12a08.png"), // Settings blue crystal
} as const;

export type PageImageKey = keyof typeof lazyPageImages;
