/**
 * CONTENT MIGRATION PAGE
 * Admin tool to migrate Toolkit content to Supabase
 */

import { useState } from 'react';
import { PlatformPageHeader } from '../PlatformPageHeader';
import { Database, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { 
  migrateAllContent, 
  migrateArticlesOnly, 
  migratePracticesOnly, 
  migrateInsightsOnly,
  migrateTest 
} from '../../utils/migrate-toolkit-helper';
import { allArticles, allPractices, allInsights } from '../../utils/contentLibraryMaster';

// Debug logging to find the source of the error
console.log('Content Migration Page Loading...');
console.log('Articles loaded:', allArticles ? `${allArticles.length} items` : 'UNDEFINED');
console.log('Practices loaded:', allPractices ? `${allPractices.length} items` : 'UNDEFINED');
console.log('Insights loaded:', allInsights ? `${allInsights.length} items` : 'UNDEFINED');

// Check for any undefined items
if (allArticles) {
  const undefinedArticles = allArticles.filter((a: any) => !a);
  if (undefinedArticles.length > 0) {
    console.error('Found undefined articles:', undefinedArticles.length);
  }
}

export function ContentMigrationPage() {
  const [migrating, setMigrating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Safety check - ensure data is loaded
  let articlesCount = 0;
  let practicesCount = 0;
  let insightsCount = 0;
  let dataError = null;

  try {
    articlesCount = allArticles?.length || 0;
    practicesCount = allPractices?.length || 0;
    insightsCount = allInsights?.length || 0;
  } catch (err: any) {
    dataError = `Failed to load content data: ${err.message}`;
    console.error('Content data load error:', err);
  }

  const totalCount = articlesCount + practicesCount + insightsCount;

  const handleMigrate = async (
    type: 'all' | 'articles' | 'practices' | 'insights' | 'test',
    dryRun = false
  ) => {
    setMigrating(true);
    setError(null);
    setResult(null);

    try {
      let migrationResult;

      switch (type) {
        case 'all':
          migrationResult = await migrateAllContent(dryRun);
          break;
        case 'articles':
          migrationResult = await migrateArticlesOnly(dryRun);
          break;
        case 'practices':
          migrationResult = await migratePracticesOnly(dryRun);
          break;
        case 'insights':
          migrationResult = await migrateInsightsOnly(dryRun);
          break;
        case 'test':
          migrationResult = await migrateTest();
          break;
      }

      setResult(migrationResult);
    } catch (err: any) {
      setError(err.message);
      console.error('Migration error:', err);
    } finally {
      setMigrating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0F]">
      <PlatformPageHeader
        title="Content Migration"
        subtitle="Migrate Toolkit content from TypeScript to Supabase"
        showBackButton={false}
      />

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Content Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="text-white/60 text-sm mb-1">Articles</div>
            <div className="text-3xl text-white">{articlesCount}</div>
            <div className="text-white/40 text-xs mt-1">Ready to migrate</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="text-white/60 text-sm mb-1">Practices</div>
            <div className="text-3xl text-white">{practicesCount}</div>
            <div className="text-white/40 text-xs mt-1">Ready to migrate</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="text-white/60 text-sm mb-1">Insights</div>
            <div className="text-3xl text-white">{insightsCount}</div>
            <div className="text-white/40 text-xs mt-1">Ready to migrate</div>
          </div>
        </div>

        {/* Migration Buttons */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-8 mb-8">
          <h2 className="text-xl text-white mb-6">Migration Actions</h2>

          <div className="space-y-4">
            {/* Test Migration */}
            <div>
              <button
                onClick={() => handleMigrate('test')}
                disabled={migrating}
                className="w-full bg-[#5739FB] text-white px-6 py-3 rounded-lg hover:bg-[#3E2BB8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {migrating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Migrating...
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    Test Migration (5 Articles)
                  </>
                )}
              </button>
              <p className="text-white/40 text-sm mt-2">
                Safe test with first 5 articles to verify everything works
              </p>
            </div>

            {/* Dry Run */}
            <div>
              <button
                onClick={() => handleMigrate('all', true)}
                disabled={migrating}
                className="w-full bg-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {migrating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    Dry Run (All Content)
                  </>
                )}
              </button>
              <p className="text-white/40 text-sm mt-2">
                Validate migration without writing to database
              </p>
            </div>

            {/* Articles Only */}
            <div>
              <button
                onClick={() => handleMigrate('articles')}
                disabled={migrating}
                className="w-full bg-[#3E2BB8] text-white px-6 py-3 rounded-lg hover:bg-[#2A1D7F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {migrating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Migrating...
                  </>
                ) : (
                  <>
                    <Database className="w-5 h-5" />
                    Migrate Articles Only ({articlesCount})
                  </>
                )}
              </button>
            </div>

            {/* Practices Only */}
            <div>
              <button
                onClick={() => handleMigrate('practices')}
                disabled={migrating}
                className="w-full bg-[#3E2BB8] text-white px-6 py-3 rounded-lg hover:bg-[#2A1D7F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {migrating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Migrating...
                  </>
                ) : (
                  <>
                    <Database className="w-5 h-5" />
                    Migrate Practices Only ({practicesCount})
                  </>
                )}
              </button>
            </div>

            {/* Insights Only */}
            <div>
              <button
                onClick={() => handleMigrate('insights')}
                disabled={migrating}
                className="w-full bg-[#3E2BB8] text-white px-6 py-3 rounded-lg hover:bg-[#2A1D7F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {migrating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Migrating...
                  </>
                ) : (
                  <>
                    <Database className="w-5 h-5" />
                    Migrate Insights Only ({insightsCount})
                  </>
                )}
              </button>
            </div>

            {/* Migrate All */}
            <div className="border-t border-white/10 pt-4">
              <button
                onClick={() => handleMigrate('all')}
                disabled={migrating}
                className="w-full bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
              >
                {migrating ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Migrating All Content...
                  </>
                ) : (
                  <>
                    <Database className="w-6 h-6" />
                    Migrate All Content ({totalCount} pieces)
                  </>
                )}
              </button>
              <p className="text-white/40 text-sm mt-2 text-center">
                This will migrate all articles, practices, and insights to Supabase
              </p>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-red-500 font-medium mb-2">Migration Error</h3>
                <pre className="text-red-400 text-sm font-mono overflow-x-auto">
                  {error}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Results Display */}
        {result && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-green-500 font-medium">Migration Complete!</h3>
              </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {result.summary.articles && (
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-white/60 text-sm mb-2">Articles</div>
                  <div className="text-2xl text-white mb-1">
                    {result.summary.articles.migrated}/{result.summary.articles.total}
                  </div>
                  {result.summary.articles.failed > 0 && (
                    <div className="text-red-400 text-sm">
                      {result.summary.articles.failed} failed
                    </div>
                  )}
                </div>
              )}

              {result.summary.practices && (
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-white/60 text-sm mb-2">Practices</div>
                  <div className="text-2xl text-white mb-1">
                    {result.summary.practices.migrated}/{result.summary.practices.total}
                  </div>
                  {result.summary.practices.failed > 0 && (
                    <div className="text-red-400 text-sm">
                      {result.summary.practices.failed} failed
                    </div>
                  )}
                </div>
              )}

              {result.summary.insights && (
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-white/60 text-sm mb-2">Insights</div>
                  <div className="text-2xl text-white mb-1">
                    {result.summary.insights.migrated}/{result.summary.insights.total}
                  </div>
                  {result.summary.insights.failed > 0 && (
                    <div className="text-red-400 text-sm">
                      {result.summary.insights.failed} failed
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Full Results */}
            <details className="bg-white/5 rounded-lg p-4">
              <summary className="text-white cursor-pointer">View Detailed Results</summary>
              <pre className="text-white/60 text-xs font-mono mt-4 overflow-x-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}