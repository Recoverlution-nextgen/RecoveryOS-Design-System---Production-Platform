/**
 * ANALYZE NAVICUE SCHEMAS
 * 
 * Extract all unique schema values from 3000 NaviCues
 * Generate schema_aliases seed data for clean DB ingestion
 */

import { NAVICUE_1000_COMPLETE } from '../lib/navicues/NAVICUE_1000_COMPLETE';
import { NAVICUE_MASTER_2000 } from '../lib/navicues/NAVICUE_MASTER_2000';
import { NAVICUE_3000_COUNCIL } from '../lib/navicues/NAVICUE_3000_COUNCIL';

const allNaviCues = [
  ...NAVICUE_1000_COMPLETE,
  ...NAVICUE_MASTER_2000.slice(1000), // Avoid duplicates
  ...NAVICUE_3000_COUNCIL,
];

// Extract unique schema values
const schemaSet = new Set<string>();
const schemaStats: Record<string, { count: number; examples: string[] }> = {};

for (const nc of allNaviCues) {
  if (nc.schema) {
    schemaSet.add(nc.schema);
    
    if (!schemaStats[nc.schema]) {
      schemaStats[nc.schema] = { count: 0, examples: [] };
    }
    schemaStats[nc.schema].count++;
    
    if (schemaStats[nc.schema].examples.length < 3) {
      schemaStats[nc.schema].examples.push(nc.id);
    }
  }
}

// Sort by frequency
const sortedSchemas = Array.from(schemaSet).sort((a, b) => {
  return (schemaStats[b]?.count || 0) - (schemaStats[a]?.count || 0);
});

console.log('='.repeat(80));
console.log('NAVICUE SCHEMA ANALYSIS');
console.log('='.repeat(80));
console.log();
console.log(`Total NaviCues: ${allNaviCues.length}`);
console.log(`Unique Schemas: ${schemaSet.size}`);
console.log();

console.log('SCHEMA FREQUENCY:');
console.log('-'.repeat(80));
for (const schema of sortedSchemas) {
  const stats = schemaStats[schema];
  console.log(`${schema.padEnd(40)} ${stats.count.toString().padStart(5)} cues  (${stats.examples.join(', ')})`);
}

console.log();
console.log('='.repeat(80));
console.log('SCHEMA_ALIASES SEED DATA (SQL)');
console.log('='.repeat(80));
console.log();

// Generate canonical schema IDs (uppercase with underscores)
const generateSchemaId = (schema: string): string => {
  return 'SCHEMA_' + schema.toUpperCase().replace(/[^a-z0-9]/gi, '_');
};

// Generate SQL for schema_aliases
console.log('-- Schema Aliases: Map raw NaviCue schema strings to canonical IDs');
console.log('INSERT INTO schema_aliases (alias, schema_id, confidence, notes_md) VALUES');

const sqlRows: string[] = [];
for (const schema of sortedSchemas) {
  const canonicalId = generateSchemaId(schema);
  const count = schemaStats[schema].count;
  sqlRows.push(
    `  ('${schema}', '${canonicalId}', 1.0, '${count} NaviCues use this schema')`
  );
}

console.log(sqlRows.join(',\n'));
console.log('ON CONFLICT (alias) DO UPDATE SET');
console.log('  schema_id = EXCLUDED.schema_id,');
console.log('  confidence = EXCLUDED.confidence,');
console.log('  notes_md = EXCLUDED.notes_md;');

console.log();
console.log('='.repeat(80));
console.log('NEXT STEPS');
console.log('='.repeat(80));
console.log();
console.log('1. Review the schema list above');
console.log('2. Map each SCHEMA_* ID to your actual schema_catalog.id');
console.log('3. Run the migration to create tables + seed aliases');
console.log('4. Ingest NaviCues JSON with schema resolution');
console.log();
