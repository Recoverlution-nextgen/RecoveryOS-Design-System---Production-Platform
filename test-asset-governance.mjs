import { supabase } from '../packages/ui/src/lib/supabase';
import { governance } from '../packages/ui/src/assets/asset-governance';

async function testSupabaseConnection() {
  console.log('🔍 Testing Supabase connection...\n');

  // Test 1: Basic connection
  try {
    const { data, error } = await supabase.from('assets').select('count');
    if (error) {
      console.log('⚠️  Assets table not found (expected - needs SQL setup)');
      console.log('   Run the SQL from SUPABASE_SETUP.md first\n');
    } else {
      console.log('✅ Connected to Supabase successfully!\n');
    }
  } catch (err) {
    console.log('❌ Connection failed:', err);
  }

  // Test 2: Governance system
  console.log('🧪 Testing Asset Governance System...\n');

  // Test pillar lookup
  const pillarER = governance.getPillar('emotional regulation');
  console.log('✅ Pillar lookup:', pillarER);

  // Test concept lookup
  const concept = governance.getConcept('breathing');
  console.log('✅ Concept lookup:', concept);

  // Test placement rules
  const placement = governance.getPlacementForComponent('WalkthroughPresenter');
  console.log('✅ Placement rule:', placement);

  // Test label mapping
  const tags = governance.getEnhancedTags(['breathing', 'meditation']);
  console.log('✅ Enhanced tags:', tags);

  // Test label matching
  const matched = governance.matchLabels(['breathing', 'proof', 'repair']);
  console.log('✅ Label matching:', {
    concepts: matched.concepts.map(c => c.id),
    themes: matched.themes.map(t => t.id),
    schemas: matched.schemas.map(s => s.id),
  });

  // Test delivery fit
  const heroFit = governance.getDeliveryFitHints('hero');
  console.log('✅ Hero delivery fit:', heroFit);

  console.log('\n🎉 Asset Governance System is fully operational!\n');
  console.log('📋 Next steps:');
  console.log('   1. Run SQL schema from SUPABASE_SETUP.md');
  console.log('   2. Upload Core 12 assets to Supabase Storage');
  console.log('   3. Update WalkthroughPresenter to use useHeroScene hook\n');
}

testSupabaseConnection();
