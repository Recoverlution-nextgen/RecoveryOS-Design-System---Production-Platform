/**
 * COMPLIANCE CHECKER ENDPOINT
 * Five Vows compliance dashboard
 */

import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const app = new Hono();

// Pathologizing language to flag
const PATHOLOGIZING_TERMS = [
  'addict', 'alcoholic', 'junkie', 'user', 'abuser',
  'disorder', 'diseased', 'broken', 'damaged', 'sick',
  'relapse', 'clean', 'dirty', 'sober date'
];

// Dignity-aligned alternatives
const ALTERNATIVES: Record<string, string> = {
  'addict': 'person in recovery',
  'alcoholic': 'individual with alcohol use challenges',
  'disorder': 'condition',
  'relapse': 'return to use',
  'clean': 'not currently using',
  'dirty': 'using',
};

// GET /compliance/check/:content_id - Check single content item
app.get('/check/:content_id', async (c) => {
  try {
    const contentId = c.req.param('content_id');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: content, error } = await supabase
      .from('content_items')
      .select('*')
      .eq('id', contentId)
      .single();

    if (error || !content) {
      return c.json({ error: 'Content not found' }, 404);
    }

    const violations = [];

    // VOW 1: Regulate Before Reason
    if (!content.arousal_band) {
      violations.push({
        vow: 1,
        message: 'Missing arousal band tag',
        severity: 'high',
        fix: 'Add arousal_band tag (cool/warm/hot)',
      });
    }

    // VOW 2: Explain Everything
    if (!content.why_now || content.why_now === '') {
      violations.push({
        vow: 2,
        message: 'Missing WhyNow explanation',
        severity: 'high',
        fix: 'Add WhyNow template',
      });
    }

    if (!content.authority || content.authority.length === 0) {
      violations.push({
        vow: 2,
        message: 'No authority anchors',
        severity: 'medium',
        fix: 'Link to authority (people/research)',
      });
    }

    // VOW 3: Practice Liquidity
    if (content.kind === 'navicue' && content.estimated_duration_seconds > 90) {
      violations.push({
        vow: 3,
        message: 'NaviCue exceeds 90-second limit',
        severity: 'high',
        fix: 'Shorten content or split into multiple NaviCues',
      });
    }

    // VOW 4: Evidence Lives Here
    if (content.kind === 'practice' && (!content.proof_hooks || content.proof_hooks.length === 0)) {
      violations.push({
        vow: 4,
        message: 'Practice missing proof hooks',
        severity: 'medium',
        fix: 'Add measurement/proof hooks',
      });
    }

    // VOW 5: Dignity By Design
    const contentText = `${content.title || ''} ${content.body || ''}`.toLowerCase();
    const flaggedTerms: string[] = [];

    PATHOLOGIZING_TERMS.forEach(term => {
      if (contentText.includes(term.toLowerCase())) {
        flaggedTerms.push(term);
      }
    });

    if (flaggedTerms.length > 0) {
      violations.push({
        vow: 5,
        message: `Potentially pathologizing language detected: ${flaggedTerms.join(', ')}`,
        severity: 'high',
        fix: 'Replace with dignity-aligned alternatives',
        flagged_terms: flaggedTerms,
        alternatives: flaggedTerms.map(t => ALTERNATIVES[t] || 'person-first language'),
      });
    }

    const score = Math.max(0, 100 - (violations.length * 20));

    return c.json({
      content_id: contentId,
      compliance_score: score,
      violations,
      passed: violations.length === 0,
    });
  } catch (error) {
    console.error('Error in compliance check:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /compliance/check-all - Check all content
app.get('/check-all', async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: allContent } = await supabase
      .from('content_items')
      .select('id, title')
      .eq('status', 'published')
      .limit(100);

    const results = [];

    for (const content of allContent || []) {
      // Recursive call to check each item
      const checkResponse = await fetch(`${c.req.url.split('/check-all')[0]}/check/${content.id}`);
      const checkResult = await checkResponse.json();
      results.push({
        id: content.id,
        title: content.title,
        score: checkResult.compliance_score,
        violations_count: checkResult.violations?.length || 0,
      });
    }

    const avgScore = results.reduce((sum, r) => sum + r.score, 0) / (results.length || 1);

    return c.json({
      total_items: results.length,
      average_compliance_score: Math.round(avgScore),
      items: results,
    });
  } catch (error) {
    console.error('Error in check-all:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /compliance/violations - Get violations list
app.get('/violations', async (c) => {
  try {
    // TODO: Query pre-computed violations from database
    return c.json([]);
  } catch (error) {
    console.error('Error fetching violations:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /compliance/fix/:content_id - Auto-fix violations
app.post('/fix/:content_id', async (c) => {
  try {
    const contentId = c.req.param('content_id');
    const { violation_type } = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Auto-fix based on violation type
    if (violation_type === 'missing_arousal_band') {
      await supabase
        .from('content_items')
        .update({ arousal_band: 'warm' })
        .eq('id', contentId);
    }

    return c.json({ success: true });
  } catch (error) {
    console.error('Error auto-fixing:', error);
    return c.json({ error: 'Failed to auto-fix' }, 500);
  }
});

// GET /compliance/language-scan/:content_id - Scan for pathologizing language
app.get('/language-scan/:content_id', async (c) => {
  try {
    const contentId = c.req.param('content_id');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: content } = await supabase
      .from('content_items')
      .select('title, body')
      .eq('id', contentId)
      .single();

    if (!content) {
      return c.json({ error: 'Content not found' }, 404);
    }

    const contentText = `${content.title || ''} ${content.body || ''}`;
    const flagged: Array<{ term: string; alternative: string; occurrences: number }> = [];

    PATHOLOGIZING_TERMS.forEach(term => {
      const regex = new RegExp(term, 'gi');
      const matches = contentText.match(regex);
      if (matches) {
        flagged.push({
          term,
          alternative: ALTERNATIVES[term] || 'person-first language',
          occurrences: matches.length,
        });
      }
    });

    return c.json({
      content_id: contentId,
      flagged,
      passed: flagged.length === 0,
    });
  } catch (error) {
    console.error('Error in language scan:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
