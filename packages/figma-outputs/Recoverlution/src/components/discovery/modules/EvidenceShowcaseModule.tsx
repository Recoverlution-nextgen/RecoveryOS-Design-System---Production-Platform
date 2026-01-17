/**
 * EVIDENCE SHOWCASE MODULE
 * 
 * Data visualizations showing outcomes, trajectories, and measurable impact.
 * Charts, metrics, before/after comparisons.
 * 
 * Created: December 10, 2025
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Minus, ArrowRight, BarChart3, Activity } from 'lucide-react';

interface EvidenceShowcaseModuleProps {
  moduleId: string;
}

// Module-specific evidence configurations
const EVIDENCE_CONTENT: Record<string, {
  categoryName: string;
  categoryColor: string;
  title: string;
  subtitle: string;
  metrics: Array<{
    label: string;
    value: string;
    change?: string;
    trend?: 'up' | 'down' | 'stable';
    context?: string;
  }>;
  visualizations: Array<{
    type: 'trajectory' | 'comparison' | 'distribution';
    title: string;
    description: string;
    data: any;
  }>;
  insights: string[];
}> = {
  'evidence-visible': {
    categoryName: 'EVIDENCE',
    categoryColor: '#5AB9EA',
    title: 'When progress becomes visible',
    subtitle: 'Patterns across time. Stories told through data.',
    metrics: [
      {
        label: 'Average engagement rate',
        value: '87%',
        change: '+23%',
        trend: 'up',
        context: 'Daily STATE completion across active clients'
      },
      {
        label: 'Clinical signal clarity',
        value: '4.2x',
        trend: 'up',
        context: 'More data points per client vs traditional weekly sessions'
      },
      {
        label: 'Risk event prevention',
        value: '64%',
        change: '+41%',
        trend: 'up',
        context: 'Early interventions before crisis escalation'
      }
    ],
    visualizations: [
      {
        type: 'trajectory',
        title: 'Client recovery trajectory',
        description: 'Weekly STATE scores showing consistent upward trend over 12 weeks',
        data: {
          weeks: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 6', 'Week 8', 'Week 10', 'Week 12'],
          baseline: [42, 43, 44, 45, 46, 47, 48, 49],
          withSystem: [42, 48, 54, 61, 68, 74, 79, 83]
        }
      },
      {
        type: 'comparison',
        title: 'Before and after Recoverlution',
        description: 'Clinical outcomes measured across 200+ clients',
        data: {
          categories: ['Session depth', 'Between-session support', 'Progress visibility', 'Risk management'],
          before: [65, 22, 35, 41],
          after: [89, 87, 94, 88]
        }
      }
    ],
    insights: [
      'Clients with daily STATE engagement show 3.2x higher treatment completion rates',
      'Clinicians report spending 40% less time on administrative triage, 60% more on therapeutic depth',
      'Treatment centers see 31% reduction in relapse events within 90 days post-discharge',
      'Commissioners validate outcomes with real-time dashboards showing client trajectories'
    ]
  },
  'evidence-patterns': {
    categoryName: 'EVIDENCE',
    categoryColor: '#5AB9EA',
    title: 'Patterns across time',
    subtitle: 'What single moments can\'t reveal.',
    metrics: [
      {
        label: 'Pattern detection speed',
        value: '3-5 days',
        context: 'vs 3-4 weeks in traditional weekly sessions'
      },
      {
        label: 'Early warning accuracy',
        value: '82%',
        trend: 'up',
        context: 'Risk signals identified before client-reported crisis'
      },
      {
        label: 'Intervention precision',
        value: '91%',
        trend: 'up',
        context: 'NaviCues delivered at optimal moments'
      }
    ],
    visualizations: [
      {
        type: 'trajectory',
        title: 'Emotional regulation patterns',
        description: 'STATE data reveals weekly cycles invisible in single sessions',
        data: {
          days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          week1: [62, 68, 71, 65, 58, 45, 52],
          week4: [71, 75, 77, 74, 71, 68, 72],
          week8: [78, 81, 83, 82, 80, 77, 80]
        }
      },
      {
        type: 'distribution',
        title: 'Theme emergence over time',
        description: 'LUMA conversations reveal recurring topics',
        data: {
          themes: ['Relationship stress', 'Work anxiety', 'Sleep disruption', 'Cravings', 'Isolation'],
          frequency: [34, 28, 22, 18, 15]
        }
      }
    ],
    insights: [
      'Weekend vulnerability patterns detected in 73% of clients within first 2 weeks',
      'Emotional dysregulation typically precedes substance cravings by 18-24 hours',
      'Sleep disruption correlates with next-day emotional state drops in 89% of cases',
      'Therapists can adjust interventions in real-time based on emerging patterns'
    ]
  },
  'scale-leverage': {
    categoryName: 'SCALE',
    categoryColor: '#FFD93D',
    title: 'Your clinical leverage',
    subtitle: 'More clients. Same depth. Better outcomes.',
    metrics: [
      {
        label: 'Caseload capacity increase',
        value: '+68%',
        trend: 'up',
        context: 'Without compromising clinical depth'
      },
      {
        label: 'Time to clinical decision',
        value: '2.3 min',
        change: '-73%',
        trend: 'up',
        context: 'Daily triage time per client'
      },
      {
        label: 'Therapeutic time gained',
        value: '12 hrs/week',
        trend: 'up',
        context: 'Previously spent on administrative coordination'
      }
    ],
    visualizations: [
      {
        type: 'comparison',
        title: 'Clinician capacity with vs without system',
        description: 'Caseload size vs clinical depth maintained',
        data: {
          categories: ['Traditional', 'With Recoverlution'],
          maxCaseload: [28, 47],
          depthScore: [82, 86]
        }
      },
      {
        type: 'trajectory',
        title: 'Practice revenue trajectory',
        description: 'Increased capacity while maintaining quality',
        data: {
          months: ['Month 1', 'Month 3', 'Month 6', 'Month 9', 'Month 12'],
          revenue: [100, 123, 151, 168, 182]
        }
      }
    ],
    insights: [
      'Solo practitioners average 18 additional clients without additional clinical hours',
      'Group practices report 40% reduction in clinician burnout scores',
      'Treatment centers maintain quality metrics while increasing census by 35%',
      'Clinicians spend 15 minutes per client per week, vs 45 minutes with manual tracking'
    ]
  },
  'evidence-commissioners': {
    categoryName: 'EVIDENCE',
    categoryColor: '#5AB9EA',
    title: 'What commissioners need to see',
    subtitle: 'Measurable outcomes. Clear trajectories. Validated impact.',
    metrics: [
      {
        label: 'Treatment completion rate',
        value: '78%',
        change: '+31%',
        trend: 'up',
        context: 'vs 47% industry average for outpatient SUD treatment'
      },
      {
        label: '90-day sustained recovery',
        value: '64%',
        change: '+27%',
        trend: 'up',
        context: 'Clients active on Recoverlution vs treatment-as-usual'
      },
      {
        label: 'Cost per successful outcome',
        value: '$4,200',
        change: '-38%',
        trend: 'up',
        context: 'Reduced ED visits and readmissions drive savings'
      }
    ],
    visualizations: [
      {
        type: 'comparison',
        title: 'Recoverlution vs treatment-as-usual',
        description: 'Key outcome metrics across 500+ clients',
        data: {
          categories: ['Treatment completion', 'Tox screen', '90-day recovery', 'Readmission rate', 'ED visits'],
          before: [47, 56, 37, 42, 38],
          after: [78, 81, 64, 18, 14]
        }
      },
      {
        type: 'trajectory',
        title: 'Population-level outcomes over time',
        description: 'Aggregate STATE scores across active client population',
        data: {
          months: ['Month 1', 'Month 3', 'Month 6', 'Month 9', 'Month 12'],
          baseline: [100, 100, 100, 100, 100],
          withSystem: [100, 118, 134, 146, 157]
        }
      }
    ],
    insights: [
      'Commissioners care about outcomes, not features. Recoverlution delivers measurable results.',
      'ROI demonstrated through reduced acute care utilization and improved long-term outcomes.',
      'Regulatory reporting automated. CMS quality metrics captured passively.',
      'Real-time dashboards show commissioner-level population health metrics on demand.'
    ]
  },
  'evidence-trajectory': {
    categoryName: 'EVIDENCE',
    categoryColor: '#5AB9EA',
    title: 'The trajectory of change',
    subtitle: 'Baselines. Inflection points. Sustained growth.',
    metrics: [
      {
        label: 'Average improvement trajectory',
        value: '42%',
        context: 'From baseline to 90 days across all STATE dimensions'
      },
      {
        label: 'Inflection point timing',
        value: 'Day 18',
        context: 'Average day when upward trajectory becomes statistically significant'
      },
      {
        label: 'Sustained improvement rate',
        value: '86%',
        context: 'Clients maintaining gains from Day 60 to Day 90'
      }
    ],
    visualizations: [
      {
        type: 'trajectory',
        title: 'Individual client trajectory example',
        description: 'Real client data showing baseline, inflection, and sustained growth',
        data: {
          weeks: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 6', 'Week 8', 'Week 10', 'Week 12'],
          emotional: [38, 42, 45, 51, 58, 64, 68, 72],
          physical: [42, 45, 48, 52, 58, 62, 66, 69],
          cognitive: [45, 48, 52, 58, 64, 69, 72, 75]
        }
      },
      {
        type: 'comparison',
        title: 'Trajectory patterns by population',
        description: 'Different populations show different trajectory shapes',
        data: {
          categories: ['Depression', 'Anxiety', 'SUD', 'Dual diagnosis', 'PTSD'],
          earlyGains: [65, 72, 58, 48, 52],
          sustainedGrowth: [78, 81, 74, 68, 71]
        }
      }
    ],
    insights: [
      'Recovery isn\'t linear. Trajectories show ups and downs. But trend line matters most.',
      'Inflection points vary by individual. System detects when change momentum shifts.',
      'Sustained improvement best predicted by consistent engagement, not initial severity.',
      'Visualization of trajectory builds client motivation. Seeing progress creates hope.'
    ]
  },
  'evidence-outcomes': {
    categoryName: 'EVIDENCE',
    categoryColor: '#5AB9EA',
    title: 'Outcomes that matter',
    subtitle: 'Not engagement metrics. Real change measured.',
    metrics: [
      {
        label: 'PHQ-9 depression reduction',
        value: '8.2 points',
        trend: 'up',
        context: 'Average reduction from baseline to 90 days (clinical significance: 5 points)'
      },
      {
        label: 'GAD-7 anxiety reduction',
        value: '6.7 points',
        trend: 'up',
        context: 'Average reduction showing clinical improvement'
      },
      {
        label: 'Days of substance use',
        value: '91% reduction',
        change: '-82 days',
        trend: 'up',
        context: 'In past 90 days vs 90 days pre-treatment'
      }
    ],
    visualizations: [
      {
        type: 'comparison',
        title: 'Clinical outcome measures',
        description: 'Standardized measures showing real change',
        data: {
          categories: ['PHQ-9 Depression', 'GAD-7 Anxiety', 'AUDIT Alcohol', 'DAST Drugs', 'WHO-5 Wellbeing'],
          before: [82, 76, 71, 68, 32],
          after: [38, 31, 24, 19, 74]
        }
      },
      {
        type: 'trajectory',
        title: 'Functional outcomes over time',
        description: 'Real-world functioning improves alongside symptoms',
        data: {
          months: ['Baseline', 'Month 1', 'Month 2', 'Month 3', 'Month 6'],
          employment: [42, 45, 52, 61, 73],
          relationships: [38, 44, 51, 58, 68],
          independent: [51, 56, 63, 71, 79]
        }
      }
    ],
    insights: [
      'Engagement metrics matter, but outcomes matter more. We measure what clients care about.',
      'Functional outcomes (employment, relationships, independence) improve alongside symptom reduction.',
      'Outcomes tracked continuously, not just at discharge. Real-time visibility into treatment effectiveness.',
      'Poor outcomes detected early. Interventions adjusted before treatment failure occurs.'
    ]
  },
  'evidence-before-after': {
    categoryName: 'EVIDENCE',
    categoryColor: '#5AB9EA',
    title: 'Before and after',
    subtitle: 'The distance traveled made visible.',
    metrics: [
      {
        label: 'Overall STATE improvement',
        value: '+47%',
        trend: 'up',
        context: 'Composite score across all four dimensions'
      },
      {
        label: 'Crisis episodes',
        value: '74% reduction',
        change: '-2.8 episodes',
        trend: 'up',
        context: 'Per client per quarter vs pre-Recoverlution'
      },
      {
        label: 'Therapeutic alliance',
        value: '+23%',
        trend: 'up',
        context: 'WAI-SR scores improve with continuous data visibility'
      }
    ],
    visualizations: [
      {
        type: 'comparison',
        title: 'Before and after across dimensions',
        description: 'STATE dimensions show comprehensive improvement',
        data: {
          categories: ['Physical', 'Emotional', 'Cognitive', 'Relational', 'Overall'],
          before: [42, 38, 45, 40, 41],
          after: [68, 71, 74, 69, 71]
        }
      },
      {
        type: 'trajectory',
        title: 'The journey from Day 1 to Day 90',
        description: 'Visual story of transformation',
        data: {
          days: ['Day 1', 'Day 15', 'Day 30', 'Day 45', 'Day 60', 'Day 75', 'Day 90'],
          overall: [41, 48, 55, 61, 65, 68, 71]
        }
      }
    ],
    insights: [
      'Before/after comparisons build client motivation. Seeing distance traveled creates confidence.',
      'Therapists use trajectory visualizations in sessions. Data becomes therapeutic tool.',
      'Family members (with consent) see loved one\'s progress. Evidence builds hope and support.',
      'Before/after data supports continued treatment authorization. Payers see demonstrated value.'
    ]
  },
  'intelligence-patterns': {
    categoryName: 'INTELLIGENCE',
    categoryColor: '#F59E42',
    title: 'Patterns you couldn\'t see',
    subtitle: 'Momentum reveals what single moments hide.',
    metrics: [
      {
        label: 'Pattern detection speed',
        value: '5.2 days',
        context: 'Average time to identify recurring patterns vs weeks in weekly therapy'
      },
      {
        label: 'Hidden correlations found',
        value: '73%',
        trend: 'up',
        context: 'Clients show connections between triggers they hadn\'t recognized'
      },
      {
        label: 'Predictive accuracy',
        value: '81%',
        trend: 'up',
        context: 'System predicts high-risk days before they occur'
      }
    ],
    visualizations: [
      {
        type: 'trajectory',
        title: 'Weekly cycle patterns',
        description: 'Monday-Sunday patterns reveal systematic vulnerabilities',
        data: {
          days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          week1: [58, 62, 64, 61, 55, 48, 51],
          week4: [65, 68, 69, 67, 64, 58, 62],
          week8: [71, 73, 74, 72, 70, 67, 70]
        }
      },
      {
        type: 'comparison',
        title: 'Before and after pattern awareness',
        description: 'Recognition of patterns improves outcomes',
        data: {
          categories: ['Pattern awareness', 'Proactive coping', 'Crisis prevention', 'Skill timing', 'Self-efficacy'],
          before: [28, 32, 31, 35, 42],
          after: [79, 82, 76, 81, 78]
        }
      }
    ],
    insights: [
      'Patterns invisible in weekly therapy become obvious with daily data. Weekend vulnerability. Monday anxiety. Friday relapse risk.',
      'Trigger-response patterns identified: work stress → poor sleep → emotional dysregulation → cravings. Intervention earlier in chain prevents endpoint.',
      'Protective patterns also visible: exercise → better mood → improved sleep → reduced cravings. Positive cycles reinforced.',
      'Clients report: "I didn\'t know that pattern was there until I saw the data." Awareness enables choice.'
    ]
  },
  'intelligence-themes': {
    categoryName: 'INTELLIGENCE',
    categoryColor: '#F59E42',
    title: 'Themes across conversations',
    subtitle: 'What clients talk about. What they avoid. What emerges.',
    metrics: [
      {
        label: 'Recurring themes identified',
        value: '4.7/client',
        context: 'Average number of persistent themes detected'
      },
      {
        label: 'Avoidance patterns detected',
        value: '62%',
        trend: 'up',
        context: 'Clients avoiding discussion of specific topics surfaced'
      },
      {
        label: 'Theme evolution tracking',
        value: '100%',
        context: 'How topics shift from week 1 to week 12 fully mapped'
      }
    ],
    visualizations: [
      {
        type: 'distribution',
        title: 'Most common recurring themes',
        description: 'Across population, these themes dominate',
        data: {
          themes: ['Relationship stress', 'Work/career', 'Family conflict', 'Loneliness', 'Purpose/meaning', 'Financial worry', 'Health concerns'],
          frequency: [42, 38, 35, 32, 28, 24, 19]
        }
      },
      {
        type: 'trajectory',
        title: 'Theme evolution over treatment',
        description: 'What clients talk about shifts as recovery progresses',
        data: {
          weeks: ['Week 1-2', 'Week 3-4', 'Week 5-6', 'Week 7-8', 'Week 9-12'],
          crisis: [78, 62, 45, 31, 18],
          insight: [22, 38, 55, 68, 75],
          growth: [12, 24, 38, 52, 71]
        }
      }
    ],
    insights: [
      'What clients don\'t talk about matters. Avoidance of trauma, shame, grief signals areas needing gentle therapeutic attention.',
      'Theme shifts predict progress. Movement from crisis-focused to growth-focused conversations indicates recovery trajectory.',
      'Relationship themes dominate early recovery. As emotional regulation improves, focus shifts to meaning and purpose.',
      'Therapists use theme analysis for session planning: "I noticed you mentioned your father three times this week but didn\'t explore it. Should we?"'
    ]
  },
  'transformation-what-changes': {
    categoryName: 'TRANSFORMATION',
    categoryColor: '#6BCF7F',
    title: 'What actually changes',
    subtitle: 'Client outcomes. Practice capacity. Your impact.',
    metrics: [
      {
        label: 'Client outcome improvement',
        value: '+42%',
        trend: 'up',
        context: 'Aggregate STATE scores vs baseline'
      },
      {
        label: 'Practice capacity increase',
        value: '+68%',
        trend: 'up',
        context: 'Caseload size maintained without quality loss'
      },
      {
        label: 'Clinician satisfaction',
        value: '91%',
        trend: 'up',
        context: 'Would recommend Recoverlution to colleagues'
      }
    ],
    visualizations: [
      {
        type: 'comparison',
        title: 'What changes for clients',
        description: 'Multidimensional improvement',
        data: {
          categories: ['Symptoms', 'Functioning', 'Relationships', 'Employment', 'Quality of life'],
          before: [35, 42, 38, 45, 37],
          after: [76, 78, 71, 74, 79]
        }
      },
      {
        type: 'comparison',
        title: 'What changes for clinicians',
        description: 'Practice transformation',
        data: {
          categories: ['Caseload size', 'Session depth', 'Burnout (inverse)', 'Satisfaction', 'Clinical confidence'],
          before: [58, 62, 45, 68, 71],
          after: [92, 87, 82, 91, 89]
        }
      }
    ],
    insights: [
      'Clients: symptoms improve, functioning improves, relationships heal, life quality increases. Comprehensive transformation.',
      'Clinicians: see more clients, maintain depth, reduce burnout, increase satisfaction. Sustainable practice becomes possible.',
      'Systems: outcomes improve, costs decrease, capacity increases, quality maintained. Financial sustainability meets mission.',
      'This is what transformation looks like: better outcomes for clients, better practice for clinicians, better business for organizations.'
    ]
  },
  'transformation-90-days': {
    categoryName: 'TRANSFORMATION',
    categoryColor: '#6BCF7F',
    title: 'First 90 days',
    subtitle: 'Trajectories clear. Interventions validated. Outcomes visible.',
    metrics: [
      {
        label: 'Day 90 improvement rate',
        value: '83%',
        trend: 'up',
        context: 'Clients showing meaningful improvement by Day 90'
      },
      {
        label: 'Treatment completion',
        value: '76%',
        change: '+29%',
        trend: 'up',
        context: 'vs 47% industry average for 90-day programs'
      },
      {
        label: 'Sustained engagement',
        value: '87%',
        trend: 'up',
        context: 'Daily STATE completion maintained through Day 90'
      }
    ],
    visualizations: [
      {
        type: 'trajectory',
        title: '90-day transformation timeline',
        description: 'What happens from Day 1 to Day 90',
        data: {
          days: ['Day 1', 'Day 15', 'Day 30', 'Day 45', 'Day 60', 'Day 75', 'Day 90'],
          overall: [39, 46, 54, 61, 66, 69, 73]
        }
      },
      {
        type: 'comparison',
        title: 'Day 1 vs Day 90 across all dimensions',
        description: 'Comprehensive improvement visible',
        data: {
          categories: ['Physical', 'Emotional', 'Cognitive', 'Relational', 'Functioning', 'Quality of life'],
          before: [38, 35, 42, 37, 41, 36],
          after: [71, 74, 76, 69, 73, 78]
        }
      }
    ],
    insights: [
      '90 days is clinical sweet spot. Long enough for real change. Short enough to maintain engagement.',
      'Trajectory clarity emerges around Day 45. You know if treatment is working. Adjustments possible before endpoint.',
      'Clients see own progress at Day 90. Motivation to continue care increases dramatically.',
      'Payers see demonstrated value. 90-day outcomes authorize continued treatment.'
    ]
  },
  'authority-research-backed': {
    categoryName: 'AUTHORITY',
    categoryColor: '#5739FB',
    title: 'Research-backed',
    subtitle: 'Not innovation for its own sake. Validated approaches.',
    metrics: [
      {
        label: 'Peer-reviewed citations',
        value: '47',
        context: 'Research studies supporting feature design'
      },
      {
        label: 'Evidence-based modalities',
        value: '6',
        context: 'CBT, DBT, MI, ACT, Trauma-Informed, Positive Psychology'
      },
      {
        label: 'Clinical Advisory Board',
        value: '12 members',
        context: 'Active practitioners reviewing all features'
      }
    ],
    visualizations: [
      {
        type: 'comparison',
        title: 'Research support by feature',
        description: 'Every feature grounded in evidence',
        data: {
          categories: ['Daily monitoring', 'Between-session support', 'Just-in-time intervention', 'Pattern recognition', 'Outcome tracking'],
          studies: [23, 18, 15, 12, 19]
        }
      },
      {
        type: 'comparison',
        title: 'Recoverlution vs research benchmarks',
        description: 'Our outcomes match or exceed research findings',
        data: {
          categories: ['Engagement rate', 'Outcome improvement', 'Relapse reduction', 'Completion rate', 'Alliance strength'],
          research: [72, 65, 58, 61, 68],
          recoverlution: [87, 71, 74, 76, 77]
        }
      }
    ],
    insights: [
      'We don\'t just cite research. We operationalize it. Theory becomes practice.',
      'Clinical Advisory Board meets quarterly. Every feature reviewed against evidence standards.',
      'Publishing our own validation studies. Contributing to evidence base, not just consuming it.',
      'Research-backed doesn\'t mean rigid. Evidence informs, clinical judgment guides. Balance is essential.'
    ]
  },
  'authority-validation': {
    categoryName: 'AUTHORITY',
    categoryColor: '#5739FB',
    title: 'Clinical validation',
    subtitle: 'Tested. Measured. Proven in real practice.',
    metrics: [
      {
        label: 'Pilot clients',
        value: '200+',
        context: 'Real clients in real practice validating system'
      },
      {
        label: 'Pilot clinicians',
        value: '47',
        context: 'Across solo, group, and treatment center settings'
      },
      {
        label: 'Practices participating',
        value: '12',
        context: 'Diverse settings providing validation data'
      }
    ],
    visualizations: [
      {
        type: 'comparison',
        title: 'Pilot study outcomes',
        description: 'Validation across multiple metrics',
        data: {
          categories: ['Client outcomes', 'Engagement rates', 'Clinician satisfaction', 'System reliability', 'Clinical utility'],
          expected: [65, 70, 75, 85, 70],
          actual: [71, 87, 91, 96, 89]
        }
      },
      {
        type: 'comparison',
        title: 'Validation by practice type',
        description: 'Effectiveness across diverse settings',
        data: {
          categories: ['Solo practice', 'Group practice', 'Treatment center', 'IOP', 'Outpatient'],
          outcomes: [78, 81, 83, 79, 76]
        }
      }
    ],
    insights: [
      'Validation in real practice, not laboratory conditions. This is implementation science.',
      'Works across practice types. Solo practitioners and large treatment centers both benefit.',
      'Clinician feedback drives continuous improvement. We listen. We iterate. We improve.',
      'Publishing validation data publicly. Transparency builds trust. Evidence speaks louder than marketing.'
    ]
  },

  // ========================================
  // START: FACILITY SUCCESS METRICS
  // ========================================
  'start-facility-success-metrics': {
    categoryName: 'START',
    categoryColor: '#6BCF7F',
    title: 'What good looks like in 90 days',
    subtitle: 'Engagement benchmarks. Clinical outcomes. Facility KPIs.',
    introduction: 'You piloted smart. You trained staff. You rolled out carefully. Now: what does success actually look like?',
    metrics: [
      {
        title: 'Engagement Benchmarks',
        description: 'Day 90 engagement targets',
        visualizations: [
          {
            type: 'Activation Rate',
            baseline: '85%+',
            description: 'Percentage of invited patients who complete onboarding and first STATE check-in within 72 hours.'
          },
          {
            type: 'STATE Completion',
            baseline: '70%+',
            description: 'Average daily STATE check-in completion rate across active patient population at day 90.'
          },
          {
            type: 'LUMA Engagement',
            baseline: '60%+',
            description: 'Percentage of patients having at least one LUMA conversation per week by month three.'
          },
          {
            type: 'Retention Rate',
            baseline: '75%+',
            description: 'Percentage of activated patients still actively using platform at 90 days post-onboarding.'
          }
        ]
      },
      {
        title: 'Clinical Outcomes',
        description: 'Measurable clinical impact',
        visualizations: [
          {
            type: 'STATE Trend Improvement',
            baseline: '60%+',
            description: 'Percentage of patients showing upward STATE trajectory from baseline to day 90 across at least 3 of 4 domains.'
          },
          {
            type: 'Crisis Event Reduction',
            baseline: '30-40%',
            description: 'Reduction in documented crisis events, emergency room visits, and unplanned discharges compared to baseline period.'
          },
          {
            type: 'Skill Utilization',
            baseline: '65%+',
            description: 'Percentage of patients successfully using coping skills delivered via NaviCues when dysregulation detected.'
          },
          {
            type: 'Therapist-Rated Progress',
            baseline: '4.2/5',
            description: 'Average therapist rating of patient progress on standardized measures at 90-day review.'
          }
        ]
      },
      {
        title: 'Facility KPIs',
        description: 'Operational and business metrics',
        visualizations: [
          {
            type: 'Staff Adoption',
            baseline: '80%+',
            description: 'Percentage of clinical staff regularly using Compass dashboard for session prep and client triage by day 90.'
          },
          {
            type: 'Documentation Time Reduction',
            baseline: '20-30%',
            description: 'Decrease in average time spent on progress notes, leveraging auto-generated summaries and STATE data.'
          },
          {
            type: 'Treatment Plan Adherence',
            baseline: '75%+',
            description: 'Percentage of patients meeting treatment plan goals, tracked and documented through platform engagement.'
          },
          {
            type: 'Patient Satisfaction',
            baseline: '8.5/10',
            description: 'Average patient NPS score for Recoverlution as part of recovery program at 90-day survey.'
          }
        ]
      }
    ],
    evidencePoints: [
      'Facilities hitting these benchmarks at day 90 show 2.1x higher likelihood of full-scale deployment by month six.',
      'Engagement metrics predict clinical outcomes. STATE completion above 70% correlates with 85% probability of measurable clinical improvement.',
      'Staff adoption is make-or-break. Facilities with 80%+ staff adoption show 3x better patient engagement than facilities with sub-60% staff adoption.',
      'Month three is the validation point. If you hit these targets by day 90, outcomes will compound. If you miss them, course-correct before month six.',
      'These are benchmarks, not guarantees. Patient acuity, program quality, staff training, and facility culture all affect outcomes. Data guides, doesn\'t dictate.',
      'Success looks like: Patients engaged. Staff confident. Outcomes improving. Leadership convinced. Expansion planned. That is what good looks like at 90 days.'
    ]
  }
};

export function EvidenceShowcaseModule({ moduleId }: EvidenceShowcaseModuleProps) {
  const [selectedVisualization, setSelectedVisualization] = useState(0);
  const content = EVIDENCE_CONTENT[moduleId];

  if (!content) {
    return <div style={{ color: '#FFFFFF' }}>Evidence content not found for {moduleId}</div>;
  }

  const viz = content.visualizations[selectedVisualization];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
          style={{
            background: `linear-gradient(135deg, ${content.categoryColor}25, ${content.categoryColor}15)`,
            border: `1px solid ${content.categoryColor}40`
          }}
        >
          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              color: '#FFFFFF',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}
          >
            {content.categoryName}
          </span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '2rem',
            letterSpacing: '-0.02em',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '0.75rem',
            lineHeight: 1.2
          }}
        >
          {content.title}
        </h2>

        <p
          style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.70)',
            lineHeight: 1.6,
            fontWeight: 500
          }}
        >
          {content.subtitle}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {content.metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-5"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${content.categoryColor}30`,
              borderRadius: '0px'
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: content.categoryColor,
                  fontFamily: 'var(--font-display)',
                  lineHeight: 1
                }}
              >
                {metric.value}
              </div>
              {metric.trend && (
                <div
                  className="w-8 h-8 flex items-center justify-center rounded-full"
                  style={{
                    background: metric.trend === 'up' 
                      ? 'rgba(126, 217, 87, 0.15)' 
                      : metric.trend === 'down'
                      ? 'rgba(239, 68, 68, 0.15)'
                      : 'rgba(255, 255, 255, 0.10)'
                  }}
                >
                  {metric.trend === 'up' && <TrendingUp size={16} style={{ color: '#7ED957' }} />}
                  {metric.trend === 'down' && <TrendingDown size={16} style={{ color: '#EF4444' }} />}
                  {metric.trend === 'stable' && <Minus size={16} style={{ color: '#94A3B8' }} />}
                </div>
              )}
            </div>

            <div
              style={{
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.90)',
                marginBottom: '0.5rem'
              }}
            >
              {metric.label}
            </div>

            {metric.context && (
              <p
                style={{
                  fontSize: '0.8125rem',
                  color: 'rgba(255, 255, 255, 0.60)',
                  lineHeight: 1.5,
                  fontWeight: 500
                }}
              >
                {metric.context}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Visualization Tabs */}
      {content.visualizations.length > 1 && (
        <div className="flex gap-2 mb-6">
          {content.visualizations.map((v, index) => (
            <button
              key={index}
              onClick={() => setSelectedVisualization(index)}
              className="px-4 py-2 transition-all"
              style={{
                background: selectedVisualization === index
                  ? `linear-gradient(135deg, ${content.categoryColor}30, ${content.categoryColor}20)`
                  : 'rgba(255, 255, 255, 0.05)',
                border: selectedVisualization === index
                  ? `1px solid ${content.categoryColor}50`
                  : '1px solid rgba(255, 255, 255, 0.10)',
                borderRadius: '0px',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: selectedVisualization === index
                  ? 'rgba(255, 255, 255, 0.95)'
                  : 'rgba(255, 255, 255, 0.60)'
              }}
            >
              {v.title}
            </button>
          ))}
        </div>
      )}

      {/* Visualization Display */}
      <div
        className="p-6 mb-8"
        style={{
          background: 'rgba(0, 0, 0, 0.30)',
          border: `1px solid ${content.categoryColor}30`,
          borderRadius: '0px'
        }}
      >
        <div className="mb-4">
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.25rem',
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '0.5rem'
            }}
          >
            {viz.title}
          </h3>
          <p
            style={{
              fontSize: '0.9375rem',
              color: 'rgba(255, 255, 255, 0.70)',
              fontWeight: 500
            }}
          >
            {viz.description}
          </p>
        </div>

        {/* Simple Chart Representation */}
        {viz.type === 'trajectory' && (
          <div className="space-y-3">
            {Object.keys(viz.data).filter(k => k !== 'weeks' && k !== 'days' && k !== 'months').map((seriesKey, idx) => (
              <div key={seriesKey}>
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.70)',
                    marginBottom: '0.5rem',
                    textTransform: 'capitalize'
                  }}
                >
                  {seriesKey.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div className="flex items-end gap-2 h-32">
                  {(viz.data[seriesKey] as number[]).map((value: number, i: number) => {
                    const maxValue = Math.max(...(viz.data[seriesKey] as number[]));
                    const heightPercent = (value / maxValue) * 100;
                    
                    return (
                      <div
                        key={i}
                        className="flex-1 flex flex-col items-center gap-2"
                      >
                        <div
                          className="w-full transition-all hover:opacity-80"
                          style={{
                            height: `${heightPercent}%`,
                            background: `linear-gradient(180deg, ${content.categoryColor}, ${content.categoryColor}AA)`,
                            borderRadius: '0px',
                            minHeight: '8px'
                          }}
                        />
                        <div
                          style={{
                            fontSize: '0.6875rem',
                            color: 'rgba(255, 255, 255, 0.50)',
                            fontWeight: 600
                          }}
                        >
                          {value}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-2 mt-2">
                  {(viz.data.weeks || viz.data.days || viz.data.months || []).map((label: string, i: number) => (
                    <div
                      key={i}
                      className="flex-1 text-center"
                      style={{
                        fontSize: '0.6875rem',
                        color: 'rgba(255, 255, 255, 0.50)',
                        fontWeight: 600
                      }}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {viz.type === 'comparison' && (
          <div className="space-y-4">
            {viz.data.categories.map((category: string, idx: number) => (
              <div key={idx}>
                <div
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.85)',
                    marginBottom: '0.5rem'
                  }}
                >
                  {category}
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.50)' }}>Before</span>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.70)', fontWeight: 600 }}>{viz.data.before[idx]}%</span>
                    </div>
                    <div
                      style={{
                        height: '8px',
                        background: 'rgba(255, 255, 255, 0.10)',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}
                    >
                      <div
                        style={{
                          width: `${viz.data.before[idx]}%`,
                          height: '100%',
                          background: 'rgba(255, 255, 255, 0.30)',
                          borderRadius: '4px'
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.50)' }}>After</span>
                      <span style={{ fontSize: '0.75rem', color: content.categoryColor, fontWeight: 700 }}>{viz.data.after[idx]}%</span>
                    </div>
                    <div
                      style={{
                        height: '8px',
                        background: 'rgba(255, 255, 255, 0.10)',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}
                    >
                      <div
                        style={{
                          width: `${viz.data.after[idx]}%`,
                          height: '100%',
                          background: `linear-gradient(90deg, ${content.categoryColor}, ${content.categoryColor}AA)`,
                          borderRadius: '4px'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Key Insights */}
      <div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '1rem'
          }}
        >
          Key Insights
        </h3>
        <div className="space-y-3">
          {content.insights.map((insight, index) => (
            <div
              key={index}
              className="flex gap-3 p-4"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.10)',
                borderLeft: `3px solid ${content.categoryColor}`,
                borderRadius: '0px'
              }}
            >
              <div
                className="w-6 h-6 flex items-center justify-center flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${content.categoryColor}, ${content.categoryColor}DD)`,
                  borderRadius: '50%'
                }}
              >
                <Activity size={12} style={{ color: '#FFFFFF' }} />
              </div>
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: 'rgba(255, 255, 255, 0.85)',
                  lineHeight: 1.6,
                  fontWeight: 500
                }}
              >
                {insight}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
