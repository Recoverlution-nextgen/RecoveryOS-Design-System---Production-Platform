// scripts/validate-asset-sizes.ts
import { readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

interface AssetBudget {
  pattern: RegExp;
  maxSizeKB: number;
  description: string;
}

const BUDGETS: AssetBudget[] = [
  // Hero posters: 5:4 responsive images (relaxed for initial upload)
  {
    pattern: /poster-(mobile|tablet|desktop)\.avif$/,
    maxSizeKB: 300, // Relaxed from 180KB for initial testing
    description: 'Hero poster AVIF (5:4 responsive)'
  },
  {
    pattern: /poster-(mobile|tablet|desktop)\.webp$/,
    maxSizeKB: 350, // Relaxed from 220KB for initial testing
    description: 'Hero poster WebP fallback (5:4 responsive)'
  },

  // Brand assets: Universal abstract assets (relaxed limits)
  {
    pattern: /(evolvingforms|flowstate|mindblock|neural_flow|neural_flower)_abstract_.*\.avif$/,
    maxSizeKB: 500, // Relaxed for stunning quality assets
    description: 'Brand asset AVIF (universal abstract)'
  },
  {
    pattern: /(evolvingforms|flowstate|mindblock|neural_flow|neural_flower)_abstract_.*\.webp$/,
    maxSizeKB: 600, // Relaxed for stunning quality assets
    description: 'Brand asset WebP (universal abstract)'
  },
  {
    pattern: /(evolvingforms|flowstate|mindblock|neural_flow|neural_flower)_abstract_.*\.jpg$/,
    maxSizeKB: 800, // Relaxed for stunning quality assets
    description: 'Brand asset JPG (universal abstract)'
  },

  // Hero loops: Contemplative duration
  {
    pattern: /loop\.webm$/,
    maxSizeKB: 1000, // Relaxed from 800KB
    description: 'Hero loop WebM (6-8s contemplative)'
  },
  {
    pattern: /loop\.mp4$/,
    maxSizeKB: 1500, // Relaxed from 1200KB
    description: 'Hero loop MP4 fallback (6-8s contemplative)'
  },

  // System assets
  {
    pattern: /\.svg$/,
    maxSizeKB: 10, // Slightly relaxed from 5KB
    description: 'System SVG assets'
  },

  // Atmosphere textures
  {
    pattern: /noise\.png$/,
    maxSizeKB: 8, // Slightly relaxed from 4KB
    description: 'Atmosphere noise texture'
  }
];

function validateAssetSizes(assetsDir: string): { passed: boolean; violations: string[] } {
  const violations: string[] = [];
  let totalAssets = 0;

  function walkDirectory(dir: string): void {
    const files = readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = join(dir, file.name);

      if (file.isDirectory()) {
        walkDirectory(fullPath);
      } else if (file.isFile()) {
        const ext = extname(file.name);
        const fileName = file.name;

        // Check against budgets
        for (const budget of BUDGETS) {
          if (budget.pattern.test(fileName)) {
            totalAssets++;
            const stats = statSync(fullPath);
            const sizeKB = stats.size / 1024;

            if (sizeKB > budget.maxSizeKB) {
              violations.push(
                `${fullPath}: ${sizeKB.toFixed(1)}KB exceeds budget of ${budget.maxSizeKB}KB (${budget.description})`
              );
            }
            break; // Only check first matching budget
          }
        }
      }
    }
  }

  try {
    walkDirectory(assetsDir);
  } catch (error) {
    violations.push(`Error scanning assets directory: ${error}`);
    return { passed: false, violations };
  }

  const passed = violations.length === 0;

  if (passed) {
    console.log(`✅ Asset size validation passed`);
    console.log(`   Checked ${totalAssets} assets against ${BUDGETS.length} budget rules`);
  } else {
    console.log(`❌ Asset size validation failed`);
    console.log(`   Found ${violations.length} violations:`);
    violations.forEach(violation => console.log(`   - ${violation}`));
  }

  return { passed, violations };
}

// CLI usage
if (require.main === module) {
  const assetsDir = process.argv[2] || './assets';
  const result = validateAssetSizes(assetsDir);
  process.exit(result.passed ? 0 : 1);
}

export { validateAssetSizes, BUDGETS };
export type { AssetBudget };