/**
 * SCHEMA INSPECTION ROUTE
 * Helps us understand what's in the database
 */

import { Hono } from 'npm:hono';
import { createClient } from 'npm:@supabase/supabase-js@2';

const app = new Hono();

app.get('/', async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const results: any = {};

    // Check common tables
    const tablesToCheck = [
      'navicue_library',
      'pillars',
      'concepts',
      'themes',
      'mindblocks',
      'soundbites',
      'toolkit_content',
      'schemas', // Clinical schemas table
      'building_blocks',
    ];

    for (const table of tablesToCheck) {
      try {
        const { count, error } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true });
        
        if (!error) {
          results[table] = { exists: true, count };
          
          // Get a sample row
          const { data: sample } = await supabase
            .from(table)
            .select('*')
            .limit(1)
            .single();
          
          if (sample) {
            results[table].sampleStructure = Object.keys(sample);
            results[table].sample = sample;
          }
        } else {
          results[table] = { exists: false, error: error.message };
        }
      } catch (e) {
        results[table] = { exists: false, error: e.message };
      }
    }

    // Check if it's a browser request (wants HTML)
    const acceptHeader = c.req.header('Accept') || '';
    if (acceptHeader.includes('text/html')) {
      // Return HTML for browser
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Supabase Schema Inspector</title>
          <style>
            body { 
              background: #0A0B0F; 
              color: #FFF; 
              font-family: system-ui; 
              padding: 40px; 
            }
            h1 { color: #5739FB; }
            .table { 
              background: rgba(87, 57, 251, 0.1); 
              border: 2px solid rgba(87, 57, 251, 0.3); 
              padding: 20px; 
              margin: 20px 0;
              border-radius: 8px;
            }
            .exists { color: #10B981; }
            .not-exists { color: #EF4444; }
            pre { 
              background: rgba(0, 0, 0, 0.3); 
              padding: 15px; 
              overflow-x: auto;
              border-radius: 4px;
            }
            .count { color: #5739FB; font-size: 24px; }
          </style>
        </head>
        <body>
          <h1>🎄 Supabase Schema Inspector - Christmas Present Review!</h1>
          <p>Database: wzeqlkbmqxlsjryidagf</p>
          
          ${Object.entries(results).map(([tableName, tableData]: [string, any]) => `
            <div class="table">
              <h2>${tableName}</h2>
              ${tableData.exists ? `
                <div class="exists">✅ EXISTS</div>
                <div class="count">${tableData.count?.toLocaleString() || 0} rows</div>
                ${tableData.sampleStructure ? `
                  <h3>Columns:</h3>
                  <p>${tableData.sampleStructure.join(', ')}</p>
                ` : ''}
                ${tableData.sample ? `
                  <h3>Sample Row:</h3>
                  <pre>${JSON.stringify(tableData.sample, null, 2)}</pre>
                ` : ''}
              ` : `
                <div class="not-exists">❌ NOT FOUND</div>
                ${tableData.error ? `<p>Error: ${tableData.error}</p>` : ''}
              `}
            </div>
          `).join('')}
        </body>
        </html>
      `;
      return c.html(html);
    }

    return c.json({
      success: true,
      database: 'wzeqlkbmqxlsjryidagf',
      tables: results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Schema inspection error:', error);
    return c.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

export default app;