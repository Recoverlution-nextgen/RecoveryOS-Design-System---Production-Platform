/**
 * CONTENT MIGRATION EDGE FUNCTION
 * Migrates Toolkit content from frontend TypeScript files to content_registry
 * 
 * POST /make-server-49b28b8a/migrate-content
 * Body: { articles: [...], practices: [...], insights: [...] }
 */

import { createClient } from 'jsr:@supabase/supabase-js@2';

// Pillar mapping
const PILLAR_MAPPING: Record<string, string> = {
  'ER': 'P-01',
  'SR': 'P-02',
  'SC': 'P-03',
  'CR': 'P-04',
  'II': 'P-05',
  'DM': 'P-06',
  'emotional-regulation': 'P-01',
  'stress-resilience': 'P-02',
  'social-connectivity': 'P-03',
  'cognitive-reframing': 'P-04',
  'identity-integration': 'P-05',
  'decision-mastery': 'P-06'
};

const PILLAR_TAG_MAPPING: Record<string, string> = {
  'P-01': 'pillar-emotional-regulation',
  'P-02': 'pillar-stress-resilience',
  'P-03': 'pillar-social-connectivity',
  'P-04': 'pillar-cognitive-reframing',
  'P-05': 'pillar-identity-integration',
  'P-06': 'pillar-decision-mastery'
};

function getPillarId(content: any): string | null {
  if (content.pillarId && PILLAR_MAPPING[content.pillarId]) {
    return PILLAR_MAPPING[content.pillarId];
  }
  if (content.pillar && PILLAR_MAPPING[content.pillar]) {
    return PILLAR_MAPPING[content.pillar];
  }
  if (content.pillarName && PILLAR_MAPPING[content.pillarName.toLowerCase().replace(/ /g, '-')]) {
    return PILLAR_MAPPING[content.pillarName.toLowerCase().replace(/ /g, '-')];
  }
  return null;
}

async function migrateArticle(article: any, supabase: any) {
  const pillarId = getPillarId(article);
  if (!pillarId) {
    throw new Error(`Cannot map pillar for article: ${article.id}`);
  }

  // Insert into content_registry
  const { data: contentData, error: contentError } = await supabase
    .from('content_registry')
    .insert({
      title: article.title,
      type: 'article',
      clinical_type: 'article',
      pillar_id: pillarId,
      reading_time_minutes: article.readTime || 10,
      difficulty_level: article.difficulty || 'Beginner',
      clinical_metadata: {
        originalId: article.id,
        subtitle: article.subtitle,
        summary: article.summary,
        pillarName: article.pillarName,
        pillarId: article.pillarId,
        conceptName: article.conceptName,
        themeName: article.themeName,
        thoughtLeader: article.thoughtLeader,
        heroImage: article.heroImage,
        sections: article.sections || [],
        relatedContent: article.relatedContent || [],
        keywords: article.keywords || {}
      },
      status: 'published'
    })
    .select()
    .single();

  if (contentError) throw contentError;

  // Tag with pillar
  const pillarTagSlug = PILLAR_TAG_MAPPING[pillarId];
  const { data: pillarTag } = await supabase
    .from('tags')
    .select('id')
    .eq('slug', pillarTagSlug)
    .single();

  if (pillarTag) {
    await supabase
      .from('content_tags')
      .insert({ content_id: contentData.id, tag_id: pillarTag.id })
      .then(() => {}, () => {}); // Ignore duplicates
  }

  // Tag with article type
  const { data: articleTag } = await supabase
    .from('tags')
    .select('id')
    .eq('slug', 'clinical-article')
    .single();

  if (articleTag) {
    await supabase
      .from('content_tags')
      .insert({ content_id: contentData.id, tag_id: articleTag.id })
      .then(() => {}, () => {});
  }

  // Link to mindblocks
  if (article.blocks && Array.isArray(article.blocks)) {
    for (const blockId of article.blocks) {
      await supabase
        .from('relationships')
        .insert({
          source_type: 'content',
          source_id: contentData.id,
          target_type: 'mindblock',
          target_id: blockId,
          relation_type: 'addresses',
          metadata: { relevance_strength: 8 }
        })
        .then(() => {}, () => {}); // Ignore duplicates
    }
  }

  // Link related content
  if (article.relatedContent && Array.isArray(article.relatedContent)) {
    for (const related of article.relatedContent) {
      const relationType = related.type === 'practice' ? 'suggests_practice' : 'references';
      await supabase
        .from('relationships')
        .insert({
          source_type: 'content',
          source_id: contentData.id,
          target_type: 'content',
          target_id: related.id,
          relation_type: relationType
        })
        .then(() => {}, () => {});
    }
  }

  return { success: true, id: contentData.id, originalId: article.id };
}

async function migratePractice(practice: any, supabase: any) {
  const pillarId = getPillarId(practice);
  if (!pillarId) {
    throw new Error(`Cannot map pillar for practice: ${practice.id}`);
  }

  const { data: contentData, error: contentError } = await supabase
    .from('content_registry')
    .insert({
      title: practice.title,
      type: 'practice',
      clinical_type: 'practice',
      pillar_id: pillarId,
      reading_time_minutes: practice.duration || 5,
      difficulty_level: practice.difficulty || 'Beginner',
      clinical_metadata: {
        originalId: practice.id,
        practiceType: practice.type,
        duration: practice.duration,
        summary: practice.summary,
        pillarName: practice.pillarName,
        themeName: practice.themeName,
        steps: practice.steps || [],
        instructions: practice.instructions,
        keywords: practice.keywords || {}
      },
      status: 'published'
    })
    .select()
    .single();

  if (contentError) throw contentError;

  // Tag with pillar
  const pillarTagSlug = PILLAR_TAG_MAPPING[pillarId];
  const { data: pillarTag } = await supabase
    .from('tags')
    .select('id')
    .eq('slug', pillarTagSlug)
    .single();

  if (pillarTag) {
    await supabase
      .from('content_tags')
      .insert({ content_id: contentData.id, tag_id: pillarTag.id })
      .then(() => {}, () => {});
  }

  // Tag with practice type
  const { data: practiceTag } = await supabase
    .from('tags')
    .select('id')
    .eq('slug', 'clinical-practice')
    .single();

  if (practiceTag) {
    await supabase
      .from('content_tags')
      .insert({ content_id: contentData.id, tag_id: practiceTag.id })
      .then(() => {}, () => {});
  }

  return { success: true, id: contentData.id, originalId: practice.id };
}

async function migrateInsight(insight: any, supabase: any) {
  const pillarId = getPillarId(insight);
  if (!pillarId) {
    throw new Error(`Cannot map pillar for insight: ${insight.id}`);
  }

  const { data: contentData, error: contentError } = await supabase
    .from('content_registry')
    .insert({
      title: insight.title,
      type: 'insight',
      clinical_type: 'insight',
      pillar_id: pillarId,
      reading_time_minutes: insight.readTime || 3,
      difficulty_level: insight.difficulty || 'Beginner',
      clinical_metadata: {
        originalId: insight.id,
        summary: insight.summary,
        pillar: insight.pillar,
        concept: insight.concept,
        theme: insight.theme,
        mechanism: insight.mechanism,
        application: insight.application,
        keywords: insight.keywords || {}
      },
      status: 'published'
    })
    .select()
    .single();

  if (contentError) throw contentError;

  // Tag with pillar
  const pillarTagSlug = PILLAR_TAG_MAPPING[pillarId];
  const { data: pillarTag } = await supabase
    .from('tags')
    .select('id')
    .eq('slug', pillarTagSlug)
    .single();

  if (pillarTag) {
    await supabase
      .from('content_tags')
      .insert({ content_id: contentData.id, tag_id: pillarTag.id })
      .then(() => {}, () => {});
  }

  // Tag with insight type
  const { data: insightTag } = await supabase
    .from('tags')
    .select('id')
    .eq('slug', 'clinical-insight')
    .single();

  if (insightTag) {
    await supabase
      .from('content_tags')
      .insert({ content_id: contentData.id, tag_id: insightTag.id })
      .then(() => {}, () => {});
  }

  return { success: true, id: contentData.id, originalId: insight.id };
}

export async function handleMigrateContent(c: any) {
  const body = await c.req.json();
  const { articles, practices, insights, dryRun } = body;

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  const results = {
    articles: { migrated: [] as any[], failed: [] as any[] },
    practices: { migrated: [] as any[], failed: [] as any[] },
    insights: { migrated: [] as any[], failed: [] as any[] }
  };

  // Migrate articles
  if (articles && Array.isArray(articles)) {
    console.log(`Migrating ${articles.length} articles...`);
    for (const article of articles) {
      try {
        if (!dryRun) {
          const result = await migrateArticle(article, supabase);
          results.articles.migrated.push(result);
          console.log(`✓ Migrated article: ${article.id}`);
        } else {
          console.log(`[DRY RUN] Would migrate article: ${article.id}`);
          results.articles.migrated.push({ originalId: article.id, dryRun: true });
        }
      } catch (error: any) {
        console.error(`✗ Failed to migrate article ${article.id}:`, error.message);
        results.articles.failed.push({ originalId: article.id, error: error.message });
      }
    }
  }

  // Migrate practices
  if (practices && Array.isArray(practices)) {
    console.log(`Migrating ${practices.length} practices...`);
    for (const practice of practices) {
      try {
        if (!dryRun) {
          const result = await migratePractice(practice, supabase);
          results.practices.migrated.push(result);
          console.log(`✓ Migrated practice: ${practice.id}`);
        } else {
          console.log(`[DRY RUN] Would migrate practice: ${practice.id}`);
          results.practices.migrated.push({ originalId: practice.id, dryRun: true });
        }
      } catch (error: any) {
        console.error(`✗ Failed to migrate practice ${practice.id}:`, error.message);
        results.practices.failed.push({ originalId: practice.id, error: error.message });
      }
    }
  }

  // Migrate insights
  if (insights && Array.isArray(insights)) {
    console.log(`Migrating ${insights.length} insights...`);
    for (const insight of insights) {
      try {
        if (!dryRun) {
          const result = await migrateInsight(insight, supabase);
          results.insights.migrated.push(result);
          console.log(`✓ Migrated insight: ${insight.id}`);
        } else {
          console.log(`[DRY RUN] Would migrate insight: ${insight.id}`);
          results.insights.migrated.push({ originalId: insight.id, dryRun: true });
        }
      } catch (error: any) {
        console.error(`✗ Failed to migrate insight ${insight.id}:`, error.message);
        results.insights.failed.push({ originalId: insight.id, error: error.message });
      }
    }
  }

  return c.json({
    success: true,
    summary: {
      articles: {
        total: articles?.length || 0,
        migrated: results.articles.migrated.length,
        failed: results.articles.failed.length
      },
      practices: {
        total: practices?.length || 0,
        migrated: results.practices.migrated.length,
        failed: results.practices.failed.length
      },
      insights: {
        total: insights?.length || 0,
        migrated: results.insights.migrated.length,
        failed: results.insights.failed.length
      }
    },
    results
  });
}
