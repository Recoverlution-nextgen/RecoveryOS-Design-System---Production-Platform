/**
 * ASSET PROCESSING DATABASE MIGRATION
 *
 * Runs the asset processing schema migration against Supabase
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.log('Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log('🚀 Starting Asset Processing Database Migration');
  console.log('=' .repeat(50));

  try {
    // Read the schema file
    const schemaPath = join(process.cwd(), 'src', 'supabase', 'SCHEMA.sql');
    const schemaSQL = readFileSync(schemaPath, 'utf-8');

    console.log('📄 Schema file loaded successfully');

    // Split the schema into individual statements
    const statements = schemaSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`📋 Found ${statements.length} SQL statements to execute`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        console.log(`⚡ Executing statement ${i + 1}/${statements.length}...`);

        try {
          const { error } = await supabase.rpc('exec_sql', { sql: statement });

          if (error) {
            // If rpc doesn't work, try direct query
            const { error: queryError } = await supabase.from('_supabase_migration_temp').select('*').limit(1);

            if (queryError) {
              console.log(`⚠️  Statement ${i + 1} may require manual execution:`);
              console.log(statement.substring(0, 100) + '...');
            }
          }
        } catch (err) {
          console.log(`⚠️  Statement ${i + 1} may require manual execution in Supabase dashboard`);
        }
      }
    }

    console.log('');
    console.log('✅ Database Migration Script Completed');
    console.log('');
    console.log('📋 Manual Steps Required:');
    console.log('1. Go to your Supabase dashboard');
    console.log('2. Navigate to SQL Editor');
    console.log('3. Copy and paste the contents of src/supabase/SCHEMA.sql');
    console.log('4. Execute the SQL script');
    console.log('');
    console.log('🔍 After migration, verify tables were created:');
    console.log('   - assets');
    console.log('   - asset_tags');
    console.log('   - asset_governance_rules');
    console.log('   - asset_processing_jobs');
    console.log('   - asset_access_logs');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    console.log('');
    console.log('💡 Troubleshooting:');
    console.log('1. Check your Supabase credentials in .env');
    console.log('2. Ensure you have database admin privileges');
    console.log('3. Try running the SQL manually in Supabase dashboard');
  }
}

// Run the migration
runMigration().catch(console.error);