/**
 * REVEAL TILE MODULE
 * 
 * Click to reveal expanding layers of information.
 * Perfect for concepts that build progressively.
 * 
 * Created: December 10, 2025
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

interface RevealTileModuleProps {
  moduleId: string;
}

// Module-specific content configurations
const MODULE_CONTENT: Record<string, {
  categoryName: string;
  categoryColor: string;
  title: string;
  subtitle: string;
  layers: Array<{
    title: string;
    content: string;
    insight?: string;
  }>;
}> = {
  'continuity-not-there': {
    categoryName: 'CONTINUITY',
    categoryColor: '#E85D75',
    title: 'What happens when you\'re not there?',
    subtitle: 'The space between sessions. Where insight fades and patterns return.',
    layers: [
      {
        title: 'The 168-hour reality',
        content: 'You see your client for one hour. They live with recovery for 167 hours alone. This is where recovery happens or unravels. Not in your office. In Tuesday evenings. Thursday mornings. Weekend triggers.',
        insight: 'Traditional therapy optimizes for the 1. Recoverlution extends your presence across the 167.'
      },
      {
        title: 'The insight fade',
        content: 'Tuesday, they leave your session clear. Wednesday, clarity holds. Thursday, doubt creeps. Friday, old patterns whisper. By Sunday, the insights feel distant. Not because the work wasn\'t good. Because insight without reinforcement fades.',
        insight: 'LUMA provides contextual support precisely when insight starts to fade.'
      },
      {
        title: 'The pattern return',
        content: 'Between sessions, the nervous system defaults to what it knows. Dysregulation triggers old coping. Isolation breeds rumination. The gap between sessions becomes the gap where recovery stalls.',
        insight: 'Daily STATE check-ins and NaviCues interrupt patterns before they solidify.'
      },
      {
        title: 'The continuity solution',
        content: 'Not more sessions. Not replacing you. Structured support that travels with them. Morning check-ins. Evening reflections. Moment-of-need guidance. Your clinical framework, continuously present.',
        insight: 'They experience support. You receive signal. The space between becomes a bridge, not a gap.'
      }
    ]
  },
  'continuity-insight-fades': {
    categoryName: 'CONTINUITY',
    categoryColor: '#E85D75',
    title: 'When insight fades',
    subtitle: 'Tuesday clarity becomes Thursday confusion.',
    layers: [
      {
        title: 'The clarity window',
        content: 'Right after session, everything is clear. The connections made. The patterns seen. The commitments felt. This is the high-resolution moment. But clarity is perishable.',
        insight: 'Research shows therapeutic insights fade within 48-72 hours without reinforcement.'
      },
      {
        title: 'The fade begins',
        content: 'By Wednesday, the edges blur. Not forgotten, but less crisp. By Thursday, competing narratives emerge. The old stories start whispering again. The insight competes with years of conditioning.',
        insight: 'LUMA delivers reinforcement exactly when the fade begins, before doubt takes root.'
      },
      {
        title: 'The gap widens',
        content: 'Friday, they question if the insight was real. Saturday, old coping mechanisms feel safer than new ones. Sunday, they prepare to come back and start over. Not because therapy failed. Because insight alone isn\'t sticky.',
        insight: 'Daily touchpoints maintain connection to the work between sessions.'
      },
      {
        title: 'Continuity maintains clarity',
        content: 'With structured daily support, Tuesday\'s insight becomes Wednesday\'s practice, Thursday\'s pattern recognition, Friday\'s choice point, Sunday\'s integration. Clarity doesn\'t fade. It deepens.',
        insight: 'They arrive at your next session building on progress, not recovering ground.'
      }
    ]
  },
  'safety-ai-stops': {
    categoryName: 'SAFETY',
    categoryColor: '#7ED957',
    title: 'Where AI stops',
    subtitle: 'Clinical judgment remains yours. Always.',
    layers: [
      {
        title: 'The hard boundaries',
        content: 'LUMA can deliver daily check-ins. LUMA cannot diagnose. LUMA can surface risk signals. LUMA cannot make clinical decisions. LUMA can provide psychoeducation. LUMA cannot provide therapy.',
        insight: 'These boundaries are not limitations. They are protections for both client and clinician.'
      },
      {
        title: 'Clinical judgment preserved',
        content: 'You decide treatment plans. You interpret clinical significance. You adjust interventions. You manage risk. LUMA handles volume, structure, and continuity. You handle complexity, nuance, and humanity.',
        insight: 'The system augments your capacity. It never replaces your expertise.'
      },
      {
        title: 'The human elements',
        content: 'Reading a room. Sensing what isn\'t said. Knowing when to push and when to hold. Building trust over months and years. Navigating crisis. Holding hope. These remain human. These remain yours.',
        insight: 'AI handles the repeatable. You handle the irreplaceable.'
      },
      {
        title: 'You remain essential',
        content: 'Not despite AI. Because of it. LUMA frees you from administrative burden and repetitive check-ins so you can focus on what only you can do: deep therapeutic alliance, complex case conceptualization, clinical creativity.',
        insight: 'Technology elevates your role. It doesn\'t diminish it.'
      }
    ]
  },
  'safety-essential': {
    categoryName: 'SAFETY',
    categoryColor: '#7ED957',
    title: 'You remain essential',
    subtitle: 'LUMA augments. You guide the work.',
    layers: [
      {
        title: 'The irreplaceable human',
        content: 'No algorithm can build therapeutic alliance. No AI can hold space for grief. No system can navigate the complexity of human change. Technology handles structure. You handle depth.',
        insight: 'LUMA extends your reach. You remain the North Star.'
      },
      {
        title: 'Clinical authority maintained',
        content: 'Every recommendation LUMA makes reflects your clinical framework. Every intervention draws from modalities you\'ve chosen. Every response honors boundaries you\'ve set. The system amplifies your methodology.',
        insight: 'It\'s not AI doing therapy. It\'s your therapeutic approach, continuously present.'
      },
      {
        title: 'The leverage point',
        content: 'Imagine: LUMA handles 30 daily check-ins. Surfaces 3 clients needing attention. You spend your clinical time where complexity lives. Not triaging stable clients. Focusing on the work only you can do.',
        insight: 'More clients. Same depth. Better outcomes. This is clinical leverage.'
      },
      {
        title: 'The essential partnership',
        content: 'You set the clinical vision. LUMA maintains the daily structure. You interpret the complex signals. LUMA tracks the patterns. You make the decisions. LUMA executes the plan. Partnership, not replacement.',
        insight: 'The future of therapy is not AI or human. It\'s AI empowering humans to do their best work.'
      }
    ]
  },
  'safety-boundaries': {
    categoryName: 'SAFETY',
    categoryColor: '#7ED957',
    title: 'Boundaries by design',
    subtitle: 'What LUMA can do. What only you can do.',
    layers: [
      {
        title: 'The clear lines',
        content: 'LUMA can deliver daily check-ins and psychoeducation. LUMA cannot diagnose or change treatment plans. LUMA can surface risk signals. LUMA cannot make crisis decisions. These boundaries are architectural, not aspirational.',
        insight: 'Safety comes from clarity. Both client and clinician know exactly what the system can and cannot do.'
      },
      {
        title: 'Support, not therapy',
        content: 'LUMA provides between-session support. It reinforces skills taught in therapy. It maintains connection to the work. But it is not therapy. The depth work, the meaning-making, the transformative insights—these happen with you.',
        insight: 'Think of LUMA as therapeutic homework that engages back. Structure that responds. But never the therapist.'
      },
      {
        title: 'Escalation protocols',
        content: 'When LUMA detects language suggesting harm, crisis, or clinical deterioration, it escalates immediately. Not with alarm bells. With gentle redirection: "This sounds important for your therapist to know. Can we reach out to them together?"',
        insight: 'The system knows its limits and honors them. This protects both client and clinician.'
      },
      {
        title: 'Your governance',
        content: 'You set the therapeutic framework. You define intervention boundaries. You control what modalities LUMA draws from. The system operates within parameters you establish. Your clinical judgment governs every interaction.',
        insight: 'LUMA is a tool in your clinical toolkit. Powerful, but always under your governance.'
      }
    ]
  },
  'continuity-not-endpoints': {
    categoryName: 'CONTINUITY',
    categoryColor: '#E85D75',
    title: 'Sessions as moments, not endpoints',
    subtitle: 'Recovery doesn\'t pause between appointments.',
    layers: [
      {
        title: 'The session as milestone',
        content: 'Your Tuesday session isn\'t the finish line. It\'s a checkpoint. A moment to assess, adjust, deepen. But the real work happens in the 167 hours between appointments. That\'s where recovery lives or stalls.',
        insight: 'Sessions are essential. But they\'re moments in a continuous journey, not isolated events.'
      },
      {
        title: 'Recovery between sessions',
        content: 'Wednesday morning stress. Thursday evening trigger. Friday relationship conflict. Saturday loneliness. Sunday anticipatory anxiety about the week ahead. This is where patterns solidify or break. This is where recovery happens.',
        insight: 'The space between sessions isn\'t downtime. It\'s active recovery time that needs structure.'
      },
      {
        title: 'Continuous therapeutic presence',
        content: 'With Recoverlution, your therapeutic framework extends beyond the room. Daily STATE check-ins maintain connection. LUMA conversations reinforce insights. NaviCues deliver interventions at critical moments. Presence becomes continuous.',
        insight: 'You\'re not there 24/7. But your clinical approach is. This is the difference.'
      },
      {
        title: 'Integration, not isolation',
        content: 'Each session now builds on rich between-session data. You see the week\'s patterns. The struggles and wins. The moments of dysregulation and successful coping. Sessions become deeper because continuity provides context.',
        insight: 'When sessions connect to continuous data, therapy becomes exponentially more effective.'
      }
    ]
  },
  'continuity-always-on': {
    categoryName: 'CONTINUITY',
    categoryColor: '#E85D75',
    title: 'The always-on clinician',
    subtitle: 'Not you. The system. Supporting when you cannot.',
    layers: [
      {
        title: 'The impossible standard',
        content: 'Clients need support at 2am when anxiety spirals. At 3pm when a work trigger hits. At 9pm when loneliness peaks. You cannot be available 24/7. The expectation is impossible. The need is real.',
        insight: 'The problem isn\'t your availability. It\'s that recovery doesn\'t follow office hours.'
      },
      {
        title: 'Structured availability',
        content: 'LUMA provides 24/7 availability within clinical boundaries. Not crisis intervention—that\'s for you or emergency services. But support. Skill reminders. Grounding techniques. Validation. The structure clients need when you\'re not there.',
        insight: 'Always-on doesn\'t mean always you. It means always your clinical framework, available.'
      },
      {
        title: 'You remain the clinician',
        content: 'LUMA doesn\'t make you obsolete. It makes you more effective. You focus on complexity. LUMA handles structure. You provide depth. LUMA provides continuity. You make clinical decisions. LUMA executes the plan.',
        insight: 'Technology doesn\'t replace the clinician. It amplifies their impact across time.'
      },
      {
        title: 'Sustainable practice',
        content: 'Without this system, being always-on means burnout. With it, you maintain boundaries while clients experience continuous support. Your work-life balance improves. Client outcomes improve. Everyone wins.',
        insight: 'Sustainable continuous care isn\'t about working more hours. It\'s about working smarter with better tools.'
      }
    ]
  },
  'intelligence-augmented': {
    categoryName: 'INTELLIGENCE',
    categoryColor: '#F59E42',
    title: 'Augmented, not replaced',
    subtitle: 'AI extends your reach. Never replaces your role.',
    layers: [
      {
        title: 'The augmentation thesis',
        content: 'AI in behavioral health should augment clinicians, not replace them. Handle repetitive tasks so you focus on complex cases. Surface patterns you couldn\'t see alone. Extend your clinical reach across time and caseload.',
        insight: 'The goal isn\'t AI therapists. It\'s AI-empowered human therapists doing their best work.'
      },
      {
        title: 'What AI handles',
        content: 'Daily check-ins. Pattern recognition across 30 clients. Risk signal monitoring. Psychoeducation delivery. Skill reinforcement. Routine triage. These tasks are important but don\'t require your expertise every time.',
        insight: 'AI handles what scales. You handle what requires clinical nuance and human connection.'
      },
      {
        title: 'What remains yours',
        content: 'Diagnosis. Treatment planning. Crisis management. Complex case conceptualization. Therapeutic alliance building. Navigating ambiguity. Holding space for grief. These require human wisdom, empathy, clinical judgment.',
        insight: 'The irreplaceable elements of therapy remain human. Technology makes you better at them.'
      },
      {
        title: 'The multiplier effect',
        content: 'With AI handling structure, you have more time for depth. More cognitive space for complexity. More energy for therapeutic presence. You see more clients without sacrificing quality. This is the multiplier effect.',
        insight: 'Augmentation means: more capacity, same depth, better outcomes, less burnout.'
      }
    ]
  },
  'intelligence-risk-signals': {
    categoryName: 'INTELLIGENCE',
    categoryColor: '#F59E42',
    title: 'Risk signals surfaced',
    subtitle: 'Not alarms. Gentle escalation when it matters.',
    layers: [
      {
        title: 'Early warning, not crisis response',
        content: 'The system detects declining STATE scores, concerning LUMA conversation themes, or behavioral pattern shifts. Not to sound alarms, but to surface gentle signals: "This client may need attention soon."',
        insight: 'Prevention beats crisis response. Early signals allow proactive intervention.'
      },
      {
        title: 'Signal, not surveillance',
        content: 'Clients control what they share. Privacy is protected. You don\'t see conversation transcripts. What you receive is clinical intelligence: themes, tone, engagement patterns, risk markers. Enough signal to inform, not invade.',
        insight: 'The system respects privacy while providing clinical utility. This balance is essential.'
      },
      {
        title: 'Contextualized risk',
        content: 'A bad STATE score on Monday after a stressful weekend is different from declining scores across seven days. The system understands context. Risk signals are weighted by patterns, not single data points.',
        insight: 'Contextual intelligence prevents false alarms and surfaces what genuinely matters.'
      },
      {
        title: 'Your clinical judgment',
        content: 'Risk signals are information, not instructions. You decide how to respond. Call the client? Adjust next session? Send a supportive message? The system surfaces. You decide. Your judgment remains central.',
        insight: 'Technology provides signal. You provide wisdom. This partnership keeps clients safe.'
      }
    ]
  },
  'safety-escalation': {
    categoryName: 'SAFETY',
    categoryColor: '#7ED957',
    title: 'When to escalate',
    subtitle: 'Risk protocols built in. Clinical oversight maintained.',
    layers: [
      {
        title: 'Defined escalation triggers',
        content: 'Language suggesting self-harm. Expressions of crisis. Acute suicidal ideation. Mention of harm to others. Severe clinical deterioration. These trigger immediate escalation protocols built into the system.',
        insight: 'The system knows when it\'s out of its depth. Safety protocols are non-negotiable.'
      },
      {
        title: 'Gentle redirection',
        content: 'When escalation triggers activate, LUMA doesn\'t panic the client. It gently redirects: "What you\'re sharing is important and needs your therapist\'s attention. Can we reach out to them together? Or would you like the crisis helpline number?"',
        insight: 'Crisis response can be firm and gentle simultaneously. Urgency without panic.'
      },
      {
        title: 'Clinician notification',
        content: 'You receive immediate notification when escalation protocols activate. SMS or email alert. Context provided. Client\'s recent data available. You can respond quickly with full information.',
        insight: 'You stay informed about critical moments, even between sessions.'
      },
      {
        title: 'Never replacing emergency services',
        content: 'The system makes clear: acute crisis requires emergency services or crisis lines. LUMA is support, not crisis intervention. This boundary protects everyone and ensures clients get appropriate care.',
        insight: 'Knowing what you\'re not is as important as knowing what you are.'
      }
    ]
  },
  'flow-no-silos': {
    categoryName: 'FLOW',
    categoryColor: '#FF6B9D',
    title: 'No silos',
    subtitle: 'Clinical context travels across every touchpoint.',
    layers: [
      {
        title: 'The silo problem',
        content: 'Client data trapped in EHR. Progress notes in one system. Check-ins in another. Outcome measures in spreadsheets. Each silo holds pieces of the story. No one sees the whole picture.',
        insight: 'Data silos fracture clinical understanding. Integration creates clarity.'
      },
      {
        title: 'Unified clinical context',
        content: 'With Recoverlution, context flows. STATE trends inform LUMA conversations. LUMA themes surface in Momentum analytics. Momentum insights appear in your Console. Evidence builds in Trajectory. One story, fully connected.',
        insight: 'When data flows freely, clinical picture becomes complete.'
      },
      {
        title: 'EHR integration',
        content: 'Recoverlution data can flow into your EHR. Progress summaries. Risk alerts. Outcome metrics. All available where you already work. No separate logins. No manual data transfer. Seamless.',
        insight: 'Good technology meets you where you are, doesn\'t demand you come to it.'
      },
      {
        title: 'Care coordination',
        content: 'When multiple providers work with one client, Ripple enables coordinated care. Shared visibility (with consent). Unified context. Everyone informed. No one duplicating effort. True collaboration.',
        insight: 'Integrated care requires integrated data. Silos make coordination impossible.'
      }
    ]
  },
  'flow-existing-workflow': {
    categoryName: 'FLOW',
    categoryColor: '#FF6B9D',
    title: 'Built for existing workflow',
    subtitle: 'Enhances what you use. Doesn\'t replace it.',
    layers: [
      {
        title: 'Not another platform',
        content: 'You already have an EHR. A scheduling system. A billing workflow. You don\'t need another platform disrupting everything. Recoverlution integrates with what you use, enhances what you do.',
        insight: 'Good technology integrates. Great technology becomes invisible infrastructure.'
      },
      {
        title: 'Workflow enhancement',
        content: 'Your session prep time decreases because client context arrives automatically. Your documentation improves with data-informed progress notes. Your clinical decisions sharpen with pattern insights. Your workflow gets better, not different.',
        insight: 'Technology should make your existing process better, not force a new one.'
      },
      {
        title: 'Minimal learning curve',
        content: 'Clinicians are busy. Training time is scarce. Recoverlution is designed for intuitive use. If you can use email and a web browser, you can use this. Simple interface. Clear data. Actionable insights.',
        insight: 'Adoption requires ease. Complexity kills good tools.'
      },
      {
        title: 'Your practice, enhanced',
        content: 'You don\'t change your therapeutic approach. You don\'t abandon your modalities. You don\'t restructure your practice. You simply gain tools that make your approach more effective. Enhancement, not replacement.',
        insight: 'The best technology amplifies existing strengths rather than demanding transformation.'
      }
    ]
  },
  'practice-solo': {
    categoryName: 'PRACTICE',
    categoryColor: '#4ECDC4',
    title: 'For solo practitioners',
    subtitle: 'Depth without overwhelming administrative load.',
    layers: [
      {
        title: 'The solo challenge',
        content: 'You\'re clinician, administrator, marketer, biller. Every hour doing admin is an hour not doing therapy. But tracking client progress, monitoring between sessions, documenting outcomes—all essential. The load is real.',
        insight: 'Solo practitioners need leverage. One person can\'t do everything without burning out.'
      },
      {
        title: 'Administrative automation',
        content: 'Recoverlution handles daily check-ins automatically. Generates progress summaries. Tracks outcomes. Surfaces risk signals. You receive curated intelligence, not raw data. Your administrative burden drops 60-70%.',
        insight: 'Time saved on admin becomes time available for therapy. This is the value.'
      },
      {
        title: 'Maintained clinical depth',
        content: 'Solo doesn\'t mean shallow. With better tools, you maintain depth with larger caseload. You see 20-30% more clients without compromising quality. Each client still receives personalized, evidence-based care.',
        insight: 'Technology allows solo practitioners to practice at small-group scale without losing intimacy.'
      },
      {
        title: 'Sustainable practice',
        content: 'You can take a day off without clients losing support. You can scale to sustainable income without unsustainable hours. You can maintain work-life balance while building successful practice. This is sustainable solo practice.',
        insight: 'Solo success requires leverage. Recoverlution provides it.'
      }
    ]
  },
  'practice-group': {
    categoryName: 'PRACTICE',
    categoryColor: '#4ECDC4',
    title: 'For group practices',
    subtitle: 'Consistent methodology across clinicians.',
    layers: [
      {
        title: 'The consistency challenge',
        content: 'Five clinicians. Five slightly different approaches. Client transferred between providers experiences discontinuity. Outcomes vary by clinician. Practice-wide quality is hard to maintain when methodology varies.',
        insight: 'Group practices need consistent methodology without constraining clinical creativity.'
      },
      {
        title: 'Unified clinical framework',
        content: 'Recoverlution allows practice-wide frameworks. You set the modalities, protocols, escalation procedures. Every clinician operates within consistent structure while maintaining therapeutic autonomy. Quality becomes predictable.',
        insight: 'Consistency in structure allows flexibility in application. Best of both worlds.'
      },
      {
        title: 'Cross-clinician visibility',
        content: 'When clients see multiple providers, Ripple enables coordinated care. Therapist and psychiatrist share context. Group and individual therapists stay aligned. No information lost in handoffs. True integration.',
        insight: 'Group practices win when information flows smoothly between providers.'
      },
      {
        title: 'Practice-wide outcomes',
        content: 'Aggregate data across clinicians. See practice-wide trends. Identify what works. Support clinicians with lower outcomes. Demonstrate value to payers. Resonance turns individual data into organizational intelligence.',
        insight: 'Group practices become learning organizations when data flows freely.'
      }
    ]
  },
  'practice-treatment-centers': {
    categoryName: 'PRACTICE',
    categoryColor: '#4ECDC4',
    title: 'For treatment centers',
    subtitle: 'Scale without losing personalization.',
    layers: [
      {
        title: 'The scale challenge',
        content: 'Treating 100+ clients simultaneously. Multiple levels of care. Care transitions from residential to IOP to outpatient. Maintaining personalized care at scale feels impossible. But clients deserve it regardless of setting.',
        insight: 'Treatment centers must scale clinical excellence, not just capacity.'
      },
      {
        title: 'Personalization at scale',
        content: 'Every client receives daily STATE check-ins personalized to their patterns. LUMA conversations adapt to individual progress. NaviCues deliver interventions based on personal triggers. Technology makes personalization scalable.',
        insight: 'What was impossible manually becomes possible with intelligent systems.'
      },
      {
        title: 'Levels of care integration',
        content: 'Client in residential sees STATE baseline. Transitions to IOP, continuity maintained. Steps down to outpatient, data travels. Moves to aftercare, no context lost. The therapeutic thread never breaks across levels.',
        insight: 'Care transitions are high-risk moments. Continuity reduces relapse during transitions.'
      },
      {
        title: 'Outcomes that secure funding',
        content: 'Commissioners demand evidence. Resonance provides it. Population-level outcomes. Treatment effectiveness metrics. Readmission rates. Length of stay trends. The data that keeps centers funded and growing.',
        insight: 'In value-based care, outcomes equal revenue. Recoverlution makes outcomes visible.'
      }
    ]
  },
  'practice-how-you-work': {
    categoryName: 'PRACTICE',
    categoryColor: '#4ECDC4',
    title: 'Built for how you work',
    subtitle: 'Not another login. Extension of your practice.',
    layers: [
      {
        title: 'Meeting you where you are',
        content: 'You have workflows. Preferences. Systems that work. Recoverlution doesn\'t demand you abandon them. It integrates. Enhances. Becomes part of your existing practice, not a replacement for it.',
        insight: 'Adoption happens when technology fits practice, not when practice contorts for technology.'
      },
      {
        title: 'Flexible implementation',
        content: 'Use all nine features or start with three. Deploy practice-wide or pilot with select clients. Integrate with EHR or use standalone. Customize to your modalities. Your practice, your choices.',
        insight: 'One-size-fits-all fails in behavioral health. Flexibility enables adoption.'
      },
      {
        title: 'Growing with you',
        content: 'Start as solo practitioner. Scale to group practice. Add features as needs evolve. The system grows with you. No need to switch platforms as you grow. Investment compounds over time.',
        insight: 'The right platform scales with your practice evolution.'
      },
      {
        title: 'Your practice, amplified',
        content: 'What makes your practice unique doesn\'t disappear. Your therapeutic style. Your modalities. Your client relationships. These remain. Recoverlution simply amplifies their effectiveness across time and scale.',
        insight: 'Technology should magnify your strengths, not homogenize your practice.'
      }
    ]
  },
  'scale-without-compromise': {
    categoryName: 'SCALE',
    categoryColor: '#FFD93D',
    title: 'Scale without compromise',
    subtitle: 'Depth maintained as caseload grows.',
    layers: [
      {
        title: 'The traditional tradeoff',
        content: 'More clients means less time per client. Scale means shallower work. Growth means burnout. This tradeoff has defined behavioral health forever. Until now.',
        insight: 'Technology that handles structure allows clinicians to maintain depth at scale.'
      },
      {
        title: 'How depth persists',
        content: 'LUMA handles routine check-ins. Momentum surfaces patterns automatically. Compass prioritizes who needs attention. You spend clinical time on complexity, not triage. Depth remains because structure is automated.',
        insight: '50 clients with intelligent systems feels like 25 clients manually. Same depth. Double capacity.'
      },
      {
        title: 'Quality at quantity',
        content: 'Clients with daily STATE engagement show better outcomes than weekly-session-only clients. More touchpoints, more data, more support. Quantity of structured engagement actually improves quality of outcomes.',
        insight: 'When technology enables quantity without sacrificing quality, everyone wins.'
      },
      {
        title: 'Sustainable growth',
        content: 'You grow caseload without growing hours. Increase revenue without burnout. Scale impact without compromising care. This is sustainable growth. What was impossible manually becomes possible with Recoverlution.',
        insight: 'Scaling clinical practice sustainably requires intelligent tools, not longer hours.'
      }
    ]
  },
  'scale-triage': {
    categoryName: 'SCALE',
    categoryColor: '#FFD93D',
    title: 'Intelligent triage',
    subtitle: 'Who needs attention. Who is stable. Clear at a glance.',
    layers: [
      {
        title: 'The triage burden',
        content: 'With 30 clients, you spend 15-20 minutes each morning triaging. Reading messages. Checking progress notes. Deciding who needs outreach. By the time you start clinical work, you\'re already exhausted.',
        insight: 'Manual triage doesn\'t scale. It consumes cognitive resources before therapy begins.'
      },
      {
        title: 'Automated prioritization',
        content: 'Compass Dashboard shows three colors: green (stable), yellow (watch), red (needs attention). Algorithm considers STATE trends, LUMA engagement, risk signals, time since last contact. Triage takes 2 minutes, not 20.',
        insight: 'Intelligent triage returns 15+ hours per week for actual clinical work.'
      },
      {
        title: 'Signal, not noise',
        content: 'You see what matters, not everything. Client struggling this week surfaces. Client doing well stays green. System filters noise, amplifies signal. Your attention goes where it\'s needed most.',
        insight: 'Attention is your most precious clinical resource. Triage should protect it.'
      },
      {
        title: 'Proactive, not reactive',
        content: 'Traditional triage is reactive: client reaches out, you respond. Intelligent triage is proactive: system detects early decline, you intervene before crisis. Prevention beats crisis management.',
        insight: 'Proactive triage prevents problems. Reactive triage manages them. Prevention is better.'
      }
    ]
  },

  // ========================================
  // START: THERAPIST REVEAL
  // ========================================
  'start-therapist-support': {
    categoryName: 'START',
    categoryColor: '#6BCF7F',
    title: 'We train you, we support you',
    subtitle: 'Onboarding, clinical training, community access.',
    layers: [
      {
        title: 'Onboarding for solo practitioners',
        description: 'You are not alone in this.',
        reveals: [
          {
            label: 'Quick start call',
            content: '30 minutes. One on one. We walk you through setup, answer questions, configure for your practice. Scheduled within 48 hours of signup.'
          },
          {
            label: 'Practice setup',
            content: 'We help you add your first client. Configure notification preferences. Set up billing integration if needed. You leave ready to use it.'
          },
          {
            label: 'First week check-in',
            content: 'Day 7: "How\'s it going?" Quick call. Any friction? Any questions? Any wins? We troubleshoot early before problems compound.'
          }
        ]
      },
      {
        title: 'Clinical training',
        description: 'We teach you to use the intelligence.',
        reveals: [
          {
            label: 'Compass dashboard training',
            content: 'How to read STATE summaries. Interpret LUMA themes. Identify risk signals. Triage clients. Integrate data into sessions. 1-hour live training.'
          },
          {
            label: 'Advanced features',
            content: 'NaviCue configuration. Momentum analytics interpretation. Treatment planning integration. Outcome tracking. Monthly workshops available.'
          },
          {
            label: 'Clinical consultation',
            content: 'Challenging case? Not sure how to respond to a pattern? Monthly clinical office hours. Bring questions. Learn from peers. Expert guidance available.'
          }
        ]
      },
      {
        title: 'Community access',
        description: 'You join a network of peers.',
        reveals: [
          {
            label: 'Peer community forum',
            content: 'Private forum for Recoverlution therapists. Share strategies. Ask questions. Celebrate wins. Learn from each other. Moderated by clinical team.'
          },
          {
            label: 'Monthly case rounds',
            content: 'Virtual case presentation. Peer discussion. Expert commentary. Learn how others use the platform. Contribute your own insights. CE credits available.'
          },
          {
            label: 'Resource library',
            content: 'Video tutorials. Clinical guides. Client handouts. Billing documentation. Research updates. Always growing. Always accessible.'
          }
        ]
      },
      {
        title: 'Ongoing support',
        description: 'We do not onboard and disappear.',
        reveals: [
          {
            label: '24/7 support portal',
            content: 'Tech issue? Clinical question? Billing problem? Submit ticket. Response within 4 hours (1 hour for urgent clinical matters).'
          },
          {
            label: 'Quarterly platform updates',
            content: 'New features. Improved analytics. Enhanced integrations. You always get notified. Training provided. Adoption supported.'
          },
          {
            label: 'Annual outcomes review',
            content: 'Year one: we review your client outcomes together. What worked. What didn\'t. How to optimize. Your success is our success.'
          }
        ]
      }
    ]
  }
};

export function RevealTileModule({ moduleId }: RevealTileModuleProps) {
  const [expandedLayers, setExpandedLayers] = useState<Set<number>>(new Set([0])); // First layer expanded by default
  const content = MODULE_CONTENT[moduleId];

  if (!content) {
    return <div style={{ color: '#FFFFFF' }}>Module content not found for {moduleId}</div>;
  }

  const toggleLayer = (index: number) => {
    const newExpanded = new Set(expandedLayers);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedLayers(newExpanded);
  };

  const allExpanded = expandedLayers.size === content.layers.length;

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
            fontWeight: 500,
            marginBottom: '1.5rem'
          }}
        >
          {content.subtitle}
        </p>

        {/* Expand All Button */}
        <button
          onClick={() => {
            if (allExpanded) {
              setExpandedLayers(new Set([0]));
            } else {
              setExpandedLayers(new Set(content.layers.map((_, i) => i)));
            }
          }}
          className="text-sm px-4 py-2 rounded-lg transition-all"
          style={{
            background: allExpanded 
              ? 'rgba(255, 255, 255, 0.10)' 
              : `linear-gradient(135deg, ${content.categoryColor}30, ${content.categoryColor}20)`,
            border: `1px solid ${allExpanded ? 'rgba(255, 255, 255, 0.20)' : content.categoryColor + '40'}`,
            color: 'rgba(255, 255, 255, 0.90)',
            fontWeight: 600
          }}
        >
          {allExpanded ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      {/* Reveal Layers */}
      <div className="space-y-3">
        {content.layers.map((layer, index) => {
          const isExpanded = expandedLayers.has(index);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleLayer(index)}
                className="w-full text-left"
                style={{
                  background: isExpanded 
                    ? `linear-gradient(135deg, ${content.categoryColor}20, ${content.categoryColor}10)`
                    : 'rgba(255, 255, 255, 0.05)',
                  border: isExpanded 
                    ? `1px solid ${content.categoryColor}40`
                    : '1px solid rgba(255, 255, 255, 0.10)',
                  borderRadius: '0px',
                  padding: '1.25rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-6 h-6 flex items-center justify-center flex-shrink-0"
                        style={{
                          background: isExpanded 
                            ? `linear-gradient(135deg, ${content.categoryColor}, ${content.categoryColor}DD)`
                            : 'rgba(255, 255, 255, 0.10)',
                          borderRadius: '50%',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: '#FFFFFF'
                        }}
                      >
                        {isExpanded ? <CheckCircle2 size={14} /> : index + 1}
                      </div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 600,
                          fontSize: '1.0625rem',
                          color: 'rgba(255, 255, 255, 0.95)'
                        }}
                      >
                        {layer.title}
                      </h3>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p
                            style={{
                              fontSize: '0.9375rem',
                              color: 'rgba(255, 255, 255, 0.75)',
                              lineHeight: 1.7,
                              fontWeight: 500,
                              marginTop: '0.75rem',
                              marginLeft: '2.25rem'
                            }}
                          >
                            {layer.content}
                          </p>

                          {layer.insight && (
                            <div
                              className="mt-4 ml-9 p-4"
                              style={{
                                background: 'rgba(0, 0, 0, 0.30)',
                                border: `1px solid ${content.categoryColor}30`,
                                borderLeft: `3px solid ${content.categoryColor}`,
                                borderRadius: '0px'
                              }}
                            >
                              <div
                                style={{
                                  fontSize: '0.6875rem',
                                  fontWeight: 700,
                                  color: content.categoryColor,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.05em',
                                  marginBottom: '0.5rem'
                                }}
                              >
                                The Key
                              </div>
                              <p
                                style={{
                                  fontSize: '0.875rem',
                                  color: 'rgba(255, 255, 255, 0.85)',
                                  lineHeight: 1.6,
                                  fontWeight: 500,
                                  fontStyle: 'italic'
                                }}
                              >
                                {layer.insight}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ flexShrink: 0 }}
                  >
                    <ChevronDown 
                      size={20} 
                      style={{ 
                        color: isExpanded ? content.categoryColor : 'rgba(255, 255, 255, 0.50)'
                      }} 
                    />
                  </motion.div>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
