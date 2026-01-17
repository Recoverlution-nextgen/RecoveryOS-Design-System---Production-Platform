import { useState } from "react";
import { Sparkles, Download, Copy, Check } from "lucide-react";
import type { PageType } from "../../utils/router";

// Import the Canva-customized images
import cubesAbstract from "figma:asset/53e93ebebfd8065813cce5aac52fdaaa6ff878c4.png";
import waterTunnel from "figma:asset/8071038d713df76ffa17cbf31a35fc139a92c0b1.png";
import inkWaterNavicue from "figma:asset/269141c301c724d7e4b03fd82154b9d0d3bddc2a.png";
import floralAbstract from "figma:asset/f642e002515d1cc2899f1ef223e62135f17cd536.png";
import cloverField from "figma:asset/1d0df6a2f4b27857d2fba6be8fbd793c5c33dee3.png";
import planetJourneyPurple from "figma:asset/6efbfa427e9e7faea96f452962c01524c01d0e90.png";
import planetJourneyBlue from "figma:asset/51b9e0df4719f87ab46d774699084f66a4996963.png";
import crystalCubeNavicue from "figma:asset/eba24ecb150c0e443aadc19b7bdd789382ffe21f.png";
import crystalGradientNavicue from "figma:asset/e4d9ba66fe673acc6fe33c845ff8688e73770221.png";
import dominoesGold from "figma:asset/292959c54cfe9403284b368abf086bc8e7f74ff8.png";
import dominoesBlue from "figma:asset/19ee6d5823db21ac87fecbf47a61a4c9717da6a2.png";
import dominoesCyan from "figma:asset/4824d1b97769138cf0c747f3d02e752f94de2d77.png";
import underwaterPurple from "figma:asset/9304cbdcfaad20e0a751c59bb47f322f2a2889e4.png";
import underwaterBlue from "figma:asset/597f5eb9529ad87a02244a105713757d0e9a3861.png";
import wellbeingFlowersPurple from "figma:asset/352a6bab8c0e2321e045b4fc84e1560c220179d0.png";
import bubblesBlue from "figma:asset/e35825535df676300ec48c2a794f41119b0b14b4.png";
import bubblesCyan from "figma:asset/cf838a17538216d79f77d5c967aad8169200a460.png";
import bubblesDeepBlue from "figma:asset/635242ce818202be7a124c3b32cf28ee90f4ed48.png";
import navigateHoneycombPurple from "figma:asset/0814310f3cc9a6d8da2600f3a73664e2976aeab4.png";
import dashboardBeige from "figma:asset/dd0660ce813313577b682402fc2c0e173dc834e1.png";
import dashboardPink from "figma:asset/af97146a680a4cb43f8a3b65867b99df1caa2c3c.png";
import dashboardPurple from "figma:asset/08f01d84ed545fe50713079fdc8a34623c78e0fb.png";
import toolkitCubesTeal from "figma:asset/7ca3efcc7732796ee1d8b0a0cd9f46b3900697ab.png";
import toolkitCubesPink from "figma:asset/c16787a3e53645a5cddadb7133a0060b6a38fe98.png";
import toolkitGeometryBlocks from "figma:asset/4fb58595e77f09ec0bc698c12f8469da71365367.png";
import stateBloomPink from "figma:asset/be0a2f1101a18045c89bec3a9cc96935750556c3.png";
import stateBloomCyan from "figma:asset/8a54772f339453d048c287c9596c56fca892f140.png";
import stateBloomWhite from "figma:asset/4a77df440a857cb480e4b9679354ab2e789ea8af.png";
import stateGlowBlue from "figma:asset/5a4780147825c7f080c577250bc449da13c3cfbd.png";
import journeyOrbsBlue from "figma:asset/cd767230fc55ac6104c29f2bd7f783f743d4c4d9.png";
import journeyOrbsPurple from "figma:asset/17078befc5d3c7ffe8a58e61e38ffb8f3e2d04e6.png";
import journeyOrbsCyan from "figma:asset/2c94ee772d8a3c35be2b27e3bf7753bf4a34978d.png";
// journeyBokehPurple removed (broken figma:asset)

interface BackgroundOption {
  id: string;
  name: string;
  description: string;
  image: string;
  pixabayUrl?: string;
  canGetSVG: boolean;
  recommendedFor: string[];
  colorPalette: string[];
  aesthetic: string;
}

const BACKGROUND_OPTIONS: BackgroundOption[] = [
  {
    id: "toolkit-geometry-blocks",
    name: "Organized Geometry (Purple/Teal/Mint) ⭐ ACTIVE",
    description: "Clean 3D blocks in purple, teal, and mint green - architectural precision",
    image: toolkitGeometryBlocks,
    pixabayUrl: "Custom upload",
    canGetSVG: false, // Photo/render stays PNG/JPG
    recommendedFor: ["Toolkit (ACTIVE)", "Navigate (Alternate)"],
    colorPalette: ["#5739FB", "#06B6D4", "#10B981", "#E5E7EB"],
    aesthetic: "Organized knowledge, architectural precision, clean structure, premium toolkit",
  },
  {
    id: "toolkit-cubes-pink",
    name: "Premium Cubes (Pink/Purple) - BACKUP",
    description: "Soft pink cubes with purple edges, premium brand alignment",
    image: toolkitCubesPink,
    pixabayUrl: "Custom 3D render",
    canGetSVG: false, // 3D render stays PNG/JPG
    recommendedFor: ["Toolkit (Backup)", "Dashboard (Alternate)"],
    colorPalette: ["#F5C9D8", "#8B5CF6", "#E8B4CC", "#5739FB"],
    aesthetic: "Premium elegance, structured knowledge, brand-aligned sophistication",
  },
  {
    id: "toolkit-cubes-teal",
    name: "Architectural Cubes (Teal/Beige)",
    description: "Muted teal cubes with warm beige tones, earthy structure",
    image: toolkitCubesTeal,
    pixabayUrl: "Custom 3D render",
    canGetSVG: false, // 3D render stays PNG/JPG
    recommendedFor: ["Toolkit (Alternate)", "Navigate (Alternate)"],
    colorPalette: ["#3B82F6", "#D4C4B0", "#60A5FA", "#A89884"],
    aesthetic: "Architectural precision, earthy calm, structured foundation",
  },
  {
    id: "cubes-abstract",
    name: "3D Cubes Abstract (Original)",
    description: "Geometric depth with brand purple accents (BACKUP)",
    image: cubesAbstract,
    pixabayUrl: "https://pixabay.com/illustrations/cubes-cube-geometry-abstract-3381438/",
    canGetSVG: true, // Illustration can be SVG
    recommendedFor: ["Toolkit (Original - Backup)"],
    colorPalette: ["#5739FB", "#7C67FF", "#4A5568", "#E5E7EB"],
    aesthetic: "Structured, layered, organized knowledge",
  },
  {
    id: "water-tunnel",
    name: "Liquid Vortex",
    description: "Flowing purple/pink abstract tunnel",
    image: waterTunnel,
    pixabayUrl: "https://pixabay.com/photos/water-aqua-tunnel-liquid-366586/",
    canGetSVG: false, // Photo stays PNG/JPG
    recommendedFor: ["State", "Wellbeing", "Inner Compass"],
    colorPalette: ["#EC4899", "#A855F7", "#3B82F6", "#06B6D4"],
    aesthetic: "Fluid, emotional, ever-changing state",
  },
  {
    id: "ink-water-navicue",
    name: "Ink Flow Wisdom",
    description: "Cyan + purple watercolor ink flowing wisdom",
    image: inkWaterNavicue,
    pixabayUrl: "https://pixabay.com/illustrations/ink-water-color-artwork-background-7294678/",
    canGetSVG: true, // Illustration can be SVG
    recommendedFor: ["Navicues (Organic)"],
    colorPalette: ["#2C99AF", "#3E2BB8", "#5739FB", "#06B6D4"],
    aesthetic: "Flowing wisdom, organic guidance, the right moment",
  },
  {
    id: "crystal-gradient-navicue",
    name: "Crystalline Gradient (Purple→Cyan→Green) ⭐ ACTIVE",
    description: "Dynamic crystalline fragments, purple→cyan→green gradient, infinite wisdom facets",
    image: crystalGradientNavicue,
    pixabayUrl: "Custom upload",
    canGetSVG: false, // Photo stays PNG/JPG
    recommendedFor: ["Navicues (ACTIVE)", "Toolkit (Alternate)", "Journey (Alternate)"],
    colorPalette: ["#5739FB", "#06B6D4", "#10B981", "#3E2BB8"],
    aesthetic: "Infinite wisdom facets, timely insights catching light, dynamic multifaceted knowledge",
  },
  {
    id: "crystal-cube-navicue",
    name: "Crystalline Prism (Static Cube) - BACKUP",
    description: "Iridescent cyan crystal cube on purple, refracted precision",
    image: crystalCubeNavicue,
    pixabayUrl: "https://pixabay.com/illustrations/blue-crystal-cube-deep-futuristic-5457731/",
    canGetSVG: true, // Illustration can be SVG
    recommendedFor: ["Navicues (Backup - Structured)", "Toolkit (Alt)"],
    colorPalette: ["#06B6D4", "#3B82F6", "#5739FB", "#3E2BB8"],
    aesthetic: "Distilled wisdom, precise delivery, intelligent refraction",
  },
  {
    id: "state-glow-blue",
    name: "Ethereal Glow (Blue/Purple) ⭐ ACTIVE",
    description: "Blue/purple glowing orchid on dark background, inner vulnerability",
    image: stateGlowBlue,
    pixabayUrl: "Custom upload",
    canGetSVG: false, // Photo stays PNG/JPG
    recommendedFor: ["State (ACTIVE)", "Inner Compass (ACTIVE)"],
    colorPalette: ["#3B82F6", "#8B5CF6", "#06B6D4", "#1E1B4B"],
    aesthetic: "Inner glow, emotional depth, vulnerable beauty, ethereal state",
  },
  {
    id: "state-bloom-pink",
    name: "Emotional Bloom (Pink) - BACKUP",
    description: "Soft pink smoke-flower emerging from darkness, emotional vulnerability",
    image: stateBloomPink,
    pixabayUrl: "Custom 3D render",
    canGetSVG: false, // 3D render stays PNG/JPG
    recommendedFor: ["State (Backup)", "Inner Compass (Backup)"],
    colorPalette: ["#F5C9D8", "#EC4899", "#F472B6", "#1F1F1F"],
    aesthetic: "Emotional bloom, vulnerable emergence, honoring your inner state",
  },
  {
    id: "state-bloom-cyan",
    name: "Emotional Bloom (Cyan)",
    description: "Cyan-teal smoke-flower with pink hints, analytical calm",
    image: stateBloomCyan,
    pixabayUrl: "Custom 3D render",
    canGetSVG: false, // 3D render stays PNG/JPG
    recommendedFor: ["State (Alternate)", "Wellbeing"],
    colorPalette: ["#06B6D4", "#22D3EE", "#F5C9D8", "#1F1F1F"],
    aesthetic: "Calm awareness, analytical state tracking, clear perception",
  },
  {
    id: "state-bloom-white",
    name: "Emotional Bloom (White)",
    description: "Ethereal white smoke-flower, pure neutral observation",
    image: stateBloomWhite,
    pixabayUrl: "Custom 3D render",
    canGetSVG: false, // 3D render stays PNG/JPG
    recommendedFor: ["State (Alternate)", "Dashboard (Alternate)"],
    colorPalette: ["#FFFFFF", "#F5F5F5", "#E5E5E5", "#1F1F1F"],
    aesthetic: "Pure observation, neutral awareness, non-judgmental presence",
  },
  {
    id: "floral-abstract",
    name: "Ethereal Bloom (Original)",
    description: "Magenta + pink floral abstraction (BACKUP)",
    image: floralAbstract,
    pixabayUrl: "https://pixabay.com/photos/floral-abstract-flower-colorful-5096532/",
    canGetSVG: false, // Photo stays PNG/JPG
    recommendedFor: ["Inner Compass (Backup)", "State (Original)"],
    colorPalette: ["#EC4899", "#F472B6", "#A855F7", "#581C87"],
    aesthetic: "Fluid state, organic emotion, honoring your pace",
  },
  {
    id: "wellbeing-flowers-purple",
    name: "Purple Abundance (Organic Flowers) ⭐ ACTIVE",
    description: "Purple/lavender clover flowers on dark background, organic holistic growth",
    image: wellbeingFlowersPurple,
    pixabayUrl: "Custom upload",
    canGetSVG: false, // Photo stays PNG/JPG
    recommendedFor: ["Wellbeing (ACTIVE)", "State (Alternate)"],
    colorPalette: ["#8B5CF6", "#A855F7", "#C084FC", "#1E1B4B"],
    aesthetic: "Organic abundance, holistic growth, natural wellbeing, living support",
  },
  {
    id: "clover-field",
    name: "Living Abundance (Green Clover) - BACKUP",
    description: "Cyan-tinted clover field, organic growth",
    image: cloverField,
    pixabayUrl: "https://pixabay.com/photos/leaf-clover-green-shamrock-spring-1482948/",
    canGetSVG: false, // Photo stays PNG/JPG
    recommendedFor: ["Wellbeing (Backup - Green)"],
    colorPalette: ["#2C99AF", "#10B981", "#059669", "#065F46"],
    aesthetic: "Holistic growth, natural abundance, thriving wellbeing",
  },
  {
    id: "underwater-purple",
    name: "Immersive Depths (Purple) - BACKUP",
    description: "Underwater light refraction, purple/magenta immersion",
    image: underwaterPurple,
    pixabayUrl: "https://pixabay.com/illustrations/abstract-blue-nature-ocean-coast-8341174/",
    canGetSVG: false, // Photo stays PNG/JPG
    recommendedFor: ["Wellbeing (Backup - Abstract)", "State (Alternate)"],
    colorPalette: ["#A855F7", "#EC4899", "#C084FC", "##581C87"],
    aesthetic: "Immersive support, holistic environment, breathing space",
  },
  {
    id: "underwater-blue",
    name: "Immersive Depths (Blue) - BACKUP",
    description: "Underwater light refraction, cyan/blue calm immersion",
    image: underwaterBlue,
    pixabayUrl: "https://pixabay.com/illustrations/abstract-blue-nature-ocean-coast-8341174/",
    canGetSVG: false, // Photo stays PNG/JPG
    recommendedFor: ["Wellbeing (Backup - Abstract)", "Navigate (Alternate)"],
    colorPalette: ["#06B6D4", "#3B82F6", "#22D3EE", "#0E7490"],
    aesthetic: "Calm immersion, fluid support, holistic care",
  },
  {
    id: "planet-journey-purple",
    name: "Celestial Arc (Purple)",
    description: "Planetary crescent with purple/magenta glow",
    image: planetJourneyPurple,
    pixabayUrl: "https://pixabay.com/photos/planet-space-abstract-649863/",
    canGetSVG: false, // Photo stays PNG/JPG
    recommendedFor: ["Journey", "Momentum"],
    colorPalette: ["#A855F7", "#EC4899", "#5739FB", "#1E1B4B"],
    aesthetic: "Forward motion, new horizons, orbital progress",
  },
  {
    id: "planet-journey-blue",
    name: "Celestial Arc (Blue)",
    description: "Planetary crescent with blue/cyan glow",
    image: planetJourneyBlue,
    pixabayUrl: "https://pixabay.com/photos/planet-space-abstract-649863/",
    canGetSVG: false, // Photo stays PNG/JPG
    recommendedFor: ["Journey", "Navigate"],
    colorPalette: ["#3B82F6", "#06B6D4", "#5739FB", "#1E1B4B"],
    aesthetic: "Guided path, structured journey, cosmic navigation",
  },
  {
    id: "journey-bokeh-purple",
    name: "Purple Bokeh Bubbles (Ethereal Dreamy) ⭐ ACTIVE",
    description: "Soft focus purple/blue water droplets, dreamy bokeh effect, infinite possibility",
    image: journeyBokehPurple,
    pixabayUrl: "Custom upload",
    canGetSVG: false, // Photo stays PNG/JPG
    recommendedFor: ["Journey (ACTIVE)", "State (Alternate)", "Wellbeing (Alternate)"],
    colorPalette: ["#5739FB", "#8B5CF6", "#A855F7", "#E0E7FF"],
    aesthetic: "Ethereal possibility, dreamy journey, soft infinite potential, fluid discovery",
  },
  {
    id: "journey-orbs-purple",
    name: "Colorful Orbs (Purple/Pastel) - BACKUP",
    description: "Organized spheres with purple/pink/pastel gradient, light & aspirational",
    image: journeyOrbsPurple,
    pixabayUrl: "https://pixabay.com/photos/orbs-orbeez-glow-colorful-spheres-4967554/",
    canGetSVG: false, // Photo stays PNG/JPG
    recommendedFor: ["Journey (Backup - Organized)", "Dashboard (Alternate)"],
    colorPalette: ["#A855F7", "#EC4899", "#F5C9D8", "#E5E7EB"],
    aesthetic: "Organized abundance, light possibility, aspirational journey with color variety",
  },
  {
    id: "journey-orbs-blue",
    name: "Colorful Orbs (Blue)",
    description: "Organized spheres with pure blue/cyan gradient, calm clarity",
    image: journeyOrbsBlue,
    pixabayUrl: "https://pixabay.com/photos/orbs-orbeez-glow-colorful-spheres-4967554/",
    canGetSVG: false, // Photo stays PNG/JPG
    recommendedFor: ["Journey (Alternate)", "Navigate", "Wellbeing"],
    colorPalette: ["#3B82F6", "#06B6D4", "#60A5FA", "#E0F2FE"],
    aesthetic: "Organized calm, structured clarity, refreshing simplicity",
  },
  {
    id: "journey-orbs-cyan",
    name: "Colorful Orbs (Cyan/Pink)",
    description: "Organized spheres with cyan/blue base + warm pink hints",
    image: journeyOrbsCyan,
    pixabayUrl: "https://pixabay.com/photos/orbs-orbeez-glow-colorful-spheres-4967554/",
    canGetSVG: false, // Photo stays PNG/JPG
    recommendedFor: ["Journey (Alternate)", "Navigate", "State"],
    colorPalette: ["#06B6D4", "#3B82F6", "#F5C9D8", "#E0F2FE"],
    aesthetic: "Balanced journey, cool clarity with emotional warmth, organized variety",
  },
  {
    id: "dominoes-gold",
    name: "Chain Reaction (Gold)",
    description: "Falling dominoes on golden yellow, momentum cascade",
    image: dominoesGold,
    pixabayUrl: "https://pixabay.com/illustrations/domino-circuit-element-concept-163522/",
    canGetSVG: true, // Illustration can be SVG
    recommendedFor: ["Momentum", "Journey"],
    colorPalette: ["#F59E0B", "#FBBF24", "#FCD34D", "#92400E"],
    aesthetic: "Chain reaction, tipping point, unstoppable progress",
  },
  {
    id: "dominoes-blue",
    name: "Chain Reaction (Blue)",
    description: "Falling dominoes on electric blue, sequential momentum",
    image: dominoesBlue,
    pixabayUrl: "https://pixabay.com/illustrations/domino-circuit-element-concept-163522/",
    canGetSVG: true, // Illustration can be SVG
    recommendedFor: ["Momentum", "Navigate"],
    colorPalette: ["#3B82F6", "#60A5FA", "#93C5FD", "#1E3A8A"],
    aesthetic: "Sequential progress, data flow, connected metrics",
  },
  {
    id: "dominoes-cyan",
    name: "Chain Reaction (Cyan)",
    description: "Falling dominoes on teal cyan, flowing momentum",
    image: dominoesCyan,
    pixabayUrl: "https://pixabay.com/illustrations/domino-circuit-element-concept-163522/",
    canGetSVG: true, // Illustration can be SVG
    recommendedFor: ["Momentum", "Wellbeing"],
    colorPalette: ["#06B6D4", "#22D3EE", "#67E8F9", "#164E63"],
    aesthetic: "Flowing progress, calm acceleration, sustainable momentum",
  },
  {
    id: "navigate-honeycomb-purple",
    name: "Interconnected Network (Purple Honeycomb) ⭐ ACTIVE",
    description: "Purple honeycomb cells, literal network structure, brand-aligned connection",
    image: navigateHoneycombPurple,
    pixabayUrl: "Custom upload",
    canGetSVG: false, // Photo stays PNG/JPG
    recommendedFor: ["Navigate (ACTIVE)", "Toolkit (Alternate)"],
    colorPalette: ["#5739FB", "#8B5CF6", "#A855F7", "#1E1B4B"],
    aesthetic: "Interconnected support network, cellular care structure, brand-aligned collaboration",
  },
  {
    id: "bubbles-blue",
    name: "Connected Network (Blue Bubbles) - BACKUP",
    description: "Interconnected bubble foam, blue/purple team network",
    image: bubblesBlue,
    pixabayUrl: "https://pixabay.com/photos/background-colour-template-contrast-5074889/",
    canGetSVG: false, // Photo stays PNG/JPG
    recommendedFor: ["Navigate (Backup - Blue)", "Dashboard (Alternate)"],
    colorPalette: ["#3B82F6", "#8B5CF6", "#60A5FA", "#1E3A8A"],
    aesthetic: "Network connectivity, transparent communication, coordinated care",
  },
  {
    id: "bubbles-cyan",
    name: "Connected Network (Cyan Bubbles) - BACKUP",
    description: "Interconnected bubble foam, cyan/teal support network",
    image: bubblesCyan,
    pixabayUrl: "https://pixabay.com/photos/background-colour-template-contrast-5074889/",
    canGetSVG: false, // Photo stays PNG/JPG
    recommendedFor: ["Navigate (Backup - Cyan)", "Wellbeing (Alternate)"],
    colorPalette: ["#06B6D4", "#22D3EE", "#EC4899", "#164E63"],
    aesthetic: "Fluid collaboration, organic team structure, adaptive support",
  },
  {
    id: "bubbles-deep-blue",
    name: "Connected Network (Deep Blue Bubbles) - BACKUP",
    description: "Interconnected bubble foam, deep blue professional network",
    image: bubblesDeepBlue,
    pixabayUrl: "https://pixabay.com/photos/background-colour-template-contrast-5074889/",
    canGetSVG: false, // Photo stays PNG/JPG
    recommendedFor: ["Navigate (Backup - Professional)", "Momentum (Alternate)"],
    colorPalette: ["#1E40AF", "#3B82F6", "#EC4899", "#1E3A8A"],
    aesthetic: "Professional coordination, data-driven collaboration, clinical network",
  },
  {
    id: "dashboard-beige",
    name: "Peaceful Waves (Beige)",
    description: "Flowing organic waves with iridescent bubbles, warm beige",
    image: dashboardBeige,
    pixabayUrl: "Custom 3D render",
    canGetSVG: false, // 3D render stays PNG/JPG
    recommendedFor: ["Dashboard", "Wellbeing"],
    colorPalette: ["#D4C4B0", "#E8DDD0", "#F5F0EA", "#A89884"],
    aesthetic: "Peaceful welcome, organic flow, premium calm, home overview",
  },
  {
    id: "dashboard-pink",
    name: "Peaceful Waves (Pink)",
    description: "Flowing organic waves with iridescent bubbles, soft pink",
    image: dashboardPink,
    pixabayUrl: "Custom 3D render",
    canGetSVG: false, // 3D render stays PNG/JPG
    recommendedFor: ["Dashboard", "State"],
    colorPalette: ["#F5C9D8", "#E8B4CC", "#D4A5BA", "#C89DB0"],
    aesthetic: "Warm welcome, emotional softness, caring overview",
  },
  {
    id: "dashboard-purple",
    name: "Peaceful Waves (Purple)",
    description: "Flowing organic waves with iridescent bubbles, lavender purple",
    image: dashboardPurple,
    pixabayUrl: "Custom 3D render",
    canGetSVG: false, // 3D render stays PNG/JPG
    recommendedFor: ["Dashboard", "Journey"],
    colorPalette: ["#C4B5FD", "#A78BFA", "#8B5CF6", "#7C3AED"],
    aesthetic: "Brand-aligned welcome, premium overview, transformative home",
  },
];

interface CardBackgroundGalleryProps {
  onNavigate?: (page: PageType) => void;
}

export function CardBackgroundGallery({ onNavigate }: CardBackgroundGalleryProps) {
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Record<string, string>>({
    // Default assignments
    State: "state-bloom-pink", // SWITCHED: Pink Bloom > Floral (HIGHER QUALITY + CONSISTENCY)
    Toolkit: "toolkit-cubes-pink", // SWITCHED: Pink/Purple > Original (PERFECT brand alignment)
    Navicues: "crystal-cube-navicue", // SWITCHED: Crystal > Ink Flow
    Wellbeing: "underwater-blue", // SWITCHED: Underwater > Clover (better symbolism + smaller file)
    Journey: "planet-journey-purple",
    Momentum: "dominoes-blue", // ELECTRIC BLUE = data/metrics feel
    Navigate: "bubbles-cyan", // CYAN = calm support + color thread coherence
    Dashboard: "dashboard-beige", // BEIGE = peaceful, neutral, welcoming home
  });

  const cards = ["Dashboard", "Journey", "Navicues", "State", "Toolkit", "Navigate", "Momentum"];

  const handleAssign = (backgroundId: string, cardName: string) => {
    setAssignments(prev => ({ ...prev, [cardName]: backgroundId }));
  };

  const handleCopyCode = (backgroundId: string) => {
    const bg = BACKGROUND_OPTIONS.find(b => b.id === backgroundId);
    if (!bg) return;

    const code = `// In DashboardCard or component
import ${bg.id.replace(/-/g, '')} from "figma:asset/...";

<div 
  className="relative overflow-hidden rounded-xl"
  style={{
    backgroundImage: \`url(\${${bg.id.replace(/-/g, '')}})\`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="glass-overlay p-8">
    {/* Your content */}
  </div>
</div>`;

    navigator.clipboard.writeText(code);
    setCopiedCode(backgroundId);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#3E2BB8] via-[#5739FB] to-[#7C67FF] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-white" />
            <span className="text-white/80 text-sm tracking-wider uppercase">
              DNA Hub
            </span>
          </div>
          <h1 className="text-white mb-4">
            Card Background Gallery
          </h1>
          <p className="text-white/90 max-w-2xl mb-8">
            Map custom Pixabay abstracts to your 7 dashboard cards. Test backgrounds, assign to cards, and copy implementation code.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <div className="glass-overlay px-4 py-2 rounded-lg">
              <span className="text-white text-sm">
                🎉 24 BACKGROUNDS - QUALITY UPGRADE!
              </span>
            </div>
            <div className="glass-overlay px-4 py-2 rounded-lg">
              <span className="text-white text-sm">
                ✅ ALL 7 CARDS FULLY COVERED!
              </span>
            </div>
            <div className="glass-overlay px-4 py-2 rounded-lg">
              <span className="text-white/80 text-xs">
                🌸 State Pink Bloom = EMOTIONAL PERFECTION
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Options Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="mb-8">
          <h2 className="text-gray-900 mb-2">Available Backgrounds</h2>
          <p className="text-gray-600">
            Click to preview, assign to cards, or copy code
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {BACKGROUND_OPTIONS.map((bg) => (
            <div
              key={bg.id}
              className={`glass-card rounded-xl overflow-hidden transition-all cursor-pointer ${
                selectedBackground === bg.id ? 'ring-2 ring-[#5739FB]' : ''
              }`}
              onClick={() => setSelectedBackground(bg.id)}
            >
              {/* Image Preview */}
              {bg.image ? (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={bg.image}
                    alt={bg.name}
                    className="w-full h-full object-cover"
                  />
                  {bg.canGetSVG && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      SVG Available
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Search Pixabay</p>
                  </div>
                </div>
              )}

              {/* Info */}
              <div className="p-6">
                <h3 className="text-gray-900 mb-2">{bg.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{bg.description}</p>
                
                {/* Aesthetic Tag */}
                <div className="mb-4">
                  <span className="text-xs text-gray-500 block mb-1">Aesthetic</span>
                  <span className="text-xs text-[#5739FB] bg-[#F5F3FF] px-2 py-1 rounded">
                    {bg.aesthetic}
                  </span>
                </div>

                {/* Color Palette */}
                <div className="mb-4">
                  <span className="text-xs text-gray-500 block mb-2">Color Palette</span>
                  <div className="flex gap-2">
                    {bg.colorPalette.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-8 h-8 rounded border border-gray-200"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Recommended For */}
                <div className="mb-4">
                  <span className="text-xs text-gray-500 block mb-2">Recommended For</span>
                  <div className="flex flex-wrap gap-1">
                    {bg.recommendedFor.map((card) => (
                      <span
                        key={card}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                      >
                        {card}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyCode(bg.id);
                    }}
                    className="flex-1 px-3 py-2 bg-[#5739FB] text-white rounded-lg hover:bg-[#3E2BB8] transition-all flex items-center justify-center gap-2 text-sm"
                    disabled={!bg.image}
                  >
                    {copiedCode === bg.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Code
                      </>
                    )}
                  </button>
                  
                  {bg.pixabayUrl && (
                    <a
                      href={bg.pixabayUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Assignment Matrix */}
        <div className="glass-card rounded-xl p-8">
          <h2 className="text-gray-900 mb-6">Card Background Assignments</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card) => {
              const assignedBg = BACKGROUND_OPTIONS.find(
                bg => bg.id === assignments[card]
              );
              
              return (
                <div
                  key={card}
                  className="border border-gray-200 rounded-lg p-4 hover:border-[#5739FB]/30 transition-all"
                >
                  <h4 className="text-gray-900 mb-3">{card}</h4>
                  
                  {assignedBg ? (
                    <div className="mb-3">
                      {assignedBg.image && (
                        <img
                          src={assignedBg.image}
                          alt={assignedBg.name}
                          className="w-full h-24 object-cover rounded mb-2"
                        />
                      )}
                      <p className="text-xs text-gray-600">{assignedBg.name}</p>
                    </div>
                  ) : (
                    <div className="h-24 bg-gray-100 rounded mb-3 flex items-center justify-center">
                      <span className="text-xs text-gray-400">No background</span>
                    </div>
                  )}
                  
                  <select
                    value={assignments[card] || ""}
                    onChange={(e) => handleAssign(e.target.value, card)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#5739FB] focus:border-transparent"
                  >
                    <option value="">None</option>
                    {BACKGROUND_OPTIONS.filter(bg => bg.image).map((bg) => (
                      <option key={bg.id} value={bg.id}>
                        {bg.name}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
          
          {/* Export Assignments */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-gray-900 mb-4">Export Configuration</h3>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-xs overflow-x-auto">
              <pre>{JSON.stringify(assignments, null, 2)}</pre>
            </div>
          </div>
        </div>

        {/* Implementation Guide */}
        <div className="mt-12 glass-card rounded-xl p-8">
          <h2 className="text-gray-900 mb-6">Implementation Guide</h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-gray-900 mb-2">1. Import Your Background</h4>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <code>import cubesAbstract from "figma:asset/53e93ebebfd8065813cce5aac52fdaaa6ff878c4.png";</code>
              </div>
            </div>
            
            <div>
              <h4 className="text-gray-900 mb-2">2. Apply to Dashboard Card</h4>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`<DashboardCard
  title="Toolkit"
  subtitle="your knowledge base"
  backgroundImage={cubesAbstract}
  to="/toolkit"
/>`}</pre>
              </div>
            </div>
            
            <div>
              <h4 className="text-gray-900 mb-2">3. SVG Support (Illustrations Only)</h4>
              <p className="text-sm text-gray-600 mb-3">
                For Pixabay illustrations like the cubes, you can download SVG from Pixabay and import directly:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <code>import CubesSVG from "./imports/cubes-abstract.svg";</code>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                ⚠️ Photos like water tunnel cannot be SVG (they're raster images)
              </p>
            </div>
            
            <div>
              <h4 className="text-gray-900 mb-2">4. Frosted Glass Overlay</h4>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`<div 
  className="relative h-64 rounded-xl overflow-hidden"
  style={{
    backgroundImage: \`url(\${cubesAbstract})\`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="glass-overlay p-8 h-full">
    <h3 className="text-white">Your Content</h3>
  </div>
</div>`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Search Tips */}
        <div className="mt-12 glass-card rounded-xl p-8">
          <h2 className="text-gray-900 mb-6">Finding the Other 5 Backgrounds</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-gray-900 mb-3">Recommended Searches</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#5739FB]">•</span>
                  <span><strong>Momentum:</strong> "growth abstract purple", "progress lines", "forward motion"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5739FB]">•</span>
                  <span><strong>Navigate:</strong> "connection network", "team abstract", "community"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5739FB]">•</span>
                  <span><strong>Navicues:</strong> "wisdom light", "insight abstract", "guidance path"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5739FB]">•</span>
                  <span><strong>Journey:</strong> "pathway abstract", "journey landscape", "steps forward"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5739FB]">•</span>
                  <span><strong>Dashboard:</strong> "minimal abstract", "peaceful gradient", "clean purple"</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-gray-900 mb-3">Pixabay Workflow</h4>
              <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
                <li>Search Pixabay with terms above</li>
                <li>Filter by "Illustrations" for SVG option</li>
                <li>Download highest resolution (or SVG)</li>
                <li>Open in Canva to adjust colors to brand palette</li>
                <li>Export as PNG (large) or keep as SVG</li>
                <li>Import here and assign to card</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
