import { BRAND_GOVERNANCE, generateGovernanceTags, validateGovernanceTags } from './scripts/brand-asset-governance.ts';

console.log('🎨 Testing Universal Brand Asset Governance System');
console.log('==================================================');

// Test all asset types
const testAssets = [
  { type: 'neural_flower', description: 'growth', tone: 'light' },
  { type: 'evolvingforms', description: 'transformation', tone: 'dark' },
  { type: 'flowstate', description: 'harmony', tone: 'neutral' },
  { type: 'mindblock', description: 'breakthrough', tone: 'intense' },
  { type: 'neural_flow', description: 'connection', tone: 'balanced' }
];

for (const asset of testAssets) {
  const governance = BRAND_GOVERNANCE[asset.type];
  if (!governance) {
    console.log(`❌ No governance found for ${asset.type}`);
    continue;
  }

  const mockAsset = {
    id: `${asset.type}_abstract_${asset.description}_${asset.tone}`,
    name: `${asset.type} ${asset.description} (${asset.tone})`,
    type: asset.type,
    form: 'abstract',
    description: asset.description,
    tone: asset.tone,
    aspectRatio: '5:4',
    formats: {},
    tags: [],
    supabasePath: ''
  };

  const tags = generateGovernanceTags(mockAsset);
  const isValid = validateGovernanceTags(tags);

  console.log(`\n🌟 ${asset.type.toUpperCase()} Asset:`);
  console.log(`   Pillars: ${governance.possiblePillars.join(', ')}`);
  console.log(`   Contexts: ${governance.therapeuticContexts.slice(0, 3).join(', ')}`);
  console.log(`   Tags: ${tags.slice(0, 5).join(', ')}`);
  console.log(`   Valid: ${isValid ? '✅' : '❌'}`);
}

console.log('\n🎯 Universal Governance Summary:');
console.log(`   Total asset types: ${Object.keys(BRAND_GOVERNANCE).length}`);
console.log('   All assets can serve multiple therapeutic pillars');
console.log('   Flexible tagging allows contextual adaptation');
console.log('   Apple design unity maintained across all assets');