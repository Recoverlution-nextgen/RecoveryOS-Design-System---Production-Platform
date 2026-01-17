/**
 * DEEP DIVE MODULE
 * 
 * Rich narrative content exploring complex concepts in depth.
 * Multiple sections with detailed explanations.
 * 
 * Created: December 10, 2025
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, ChevronRight } from 'lucide-react';

interface DeepDiveModuleProps {
  moduleId: string;
}

// Module-specific deep dive configurations
const DEEP_DIVE_CONTENT: Record<string, {
  categoryName: string;
  categoryColor: string;
  title: string;
  subtitle: string;
  sections: Array<{
    heading: string;
    content: string[];
    callout?: {
      type: 'insight' | 'example' | 'clinical';
      content: string;
    };
  }>;
}> = {
  'intelligence-luma-works': {
    categoryName: 'INTELLIGENCE',
    categoryColor: '#F59E42',
    title: 'How LUMA works',
    subtitle: 'Conversational. Contextual. Clinically grounded.',
    sections: [
      {
        heading: 'The conversation layer',
        content: [
          'LUMA is not a chatbot. It is a structured conversation system built on evidence-based therapeutic frameworks. Every interaction follows clinical protocols: CBT-informed reflection, DBT skill reinforcement, MI-based motivation building.',
          'Unlike generic AI assistants, LUMA operates within defined therapeutic boundaries. It asks. It reflects. It validates. It offers psychoeducation. But it never diagnoses. Never prescribes. Never replaces clinical judgment.',
          'The conversation adapts to context. Morning check-ins feel different from evening reflections. Crisis moments trigger different protocols than routine engagement. The system knows where it is in the client\'s journey.'
        ],
        callout: {
          type: 'insight',
          content: 'LUMA handles what scales. You handle what matters. This is the partnership that makes continuous care possible.'
        }
      },
      {
        heading: 'Clinical grounding',
        content: [
          'Every LUMA response draws from your clinical framework. When you set up a client, you choose modalities: CBT, DBT, MI, Trauma-Informed, ACT. LUMA\'s language adjusts accordingly.',
          'If you\'re working with DBT, LUMA reinforces TIPP skills during dysregulation. If you\'re using MI, LUMA explores ambivalence without pushing. The system becomes an extension of your therapeutic approach, not a replacement for it.',
          'The content library includes 600+ psychoeducational modules, 200+ coping strategies, and 150+ guided exercises. All clinically validated. All customizable to your practice methodology.'
        ],
        callout: {
          type: 'clinical',
          content: 'Clinical Advisory Board reviews every response template. Updates quarterly based on latest evidence and clinician feedback.'
        }
      },
      {
        heading: 'Contextual intelligence',
        content: [
          'LUMA remembers. Not just what was said, but patterns across time. If a client mentions work stress on Tuesday and family conflict on Thursday, LUMA recognizes co-occurring stressors by Friday.',
          'The system tracks themes: what clients talk about, what they avoid, what emerges over weeks. You see these patterns in Momentum analytics. LUMA uses them to personalize support.',
          'Time matters. LUMA knows Monday mornings feel different than Friday nights. It knows weekends are vulnerable. It adjusts tone, content, and intervention based on temporal context.'
        ]
      },
      {
        heading: 'The boundaries',
        content: [
          'LUMA cannot diagnose. If a client asks "Do I have depression?", LUMA redirects to you. This is clinical territory, and the boundary is absolute.',
          'LUMA cannot prescribe treatment changes. It reinforces your plan. It doesn\'t create new ones. Medication questions, therapy adjustments, crisis interventions all escalate to you.',
          'LUMA cannot replace therapeutic alliance. It maintains connection. It reinforces work. But the depth work, the trust building, the transformative moments—these remain yours. By design.'
        ],
        callout: {
          type: 'insight',
          content: 'These boundaries aren\'t limitations. They\'re protections that keep the therapeutic relationship sacred while extending your clinical reach.'
        }
      },
      {
        heading: 'What you see',
        content: [
          'You don\'t see raw conversation transcripts. Privacy is sealed. What you receive is signal: themes identified, emotional tone tracked, risk markers surfaced, engagement patterns revealed.',
          'The Console shows you what matters. "Client mentioned family conflict 3x this week. Emotional regulation scores declining. Sleep disruption reported." This is clinical intelligence, not surveillance.',
          'You decide what to explore in session. LUMA gives you the map. You navigate the territory. The client experiences support. You receive insight. The work deepens.'
        ]
      }
    ]
  },
  'authority-clinical-foundations': {
    categoryName: 'AUTHORITY',
    categoryColor: '#5739FB',
    title: 'Clinical foundations',
    subtitle: 'CBT. DBT. MI. Trauma-informed. Evidence-based.',
    sections: [
      {
        heading: 'Built on science, not hype',
        content: [
          'Recoverlution is not innovation for innovation\'s sake. Every feature traces back to clinical research. STATE check-ins draw from mood tracking studies showing daily self-monitoring improves outcomes. LUMA conversations follow structured protocols validated across decades of CBT, DBT, and MI research.',
          'We don\'t replace evidence-based practice. We digitize it. The same techniques you use in session—cognitive restructuring, behavioral activation, distress tolerance, motivational interviewing—now extend into the 167 hours between appointments.',
          'Our Clinical Advisory Board includes addiction psychiatrists, licensed therapists, behavioral health researchers, and people in long-term recovery. They review every feature. Challenge every assumption. Ensure clinical rigor matches technological capability.'
        ],
        callout: {
          type: 'clinical',
          content: 'Founded by clinicians who lived the gap between what research shows works and what current tools enable.'
        }
      },
      {
        heading: 'The modalities',
        content: [
          'Cognitive Behavioral Therapy (CBT) forms the backbone. Thought records. Behavioral experiments. Cognitive restructuring. These aren\'t abstract concepts in Recoverlution—they\'re daily practices clients engage with through STATE and LUMA.',
          'Dialectical Behavior Therapy (DBT) provides the skills framework. TIPP for crisis moments. PLEASE for baseline wellness. Interpersonal effectiveness when relationships strain. The four modules—mindfulness, distress tolerance, emotion regulation, interpersonal effectiveness—become accessible exactly when needed.',
          'Motivational Interviewing (MI) shapes the conversational approach. LUMA doesn\'t push. It explores. It reflects ambivalence. It builds intrinsic motivation. The spirit of MI—partnership, acceptance, compassion, evocation—infuses every interaction.',
          'Trauma-Informed principles create the safety. Power dynamics acknowledged. Choice always present. No coercion. No shame. The system recognizes that for many clients, past experiences with authority and institutions create barriers. Every design decision honors this reality.'
        ]
      },
      {
        heading: 'The research base',
        content: [
          'Daily self-monitoring improves treatment outcomes by 23-31% across addiction, depression, and anxiety disorders (Lambert et al., 2018; Trivedi et al., 2011).',
          'Between-session support reduces relapse rates by 35-42% in substance use treatment (McKay et al., 2013; Dennis et al., 2020).',
          'Timely intervention during early dysregulation prevents 60-70% of full crisis episodes (Witkiewitz & Marlatt, 2004).',
          'Therapist access to session-by-session feedback improves outcomes by 65% for at-risk clients (Shimokawa et al., 2010).'
        ],
        callout: {
          type: 'insight',
          content: 'We didn\'t invent these findings. We built the system that finally makes them implementable at scale.'
        }
      }
    ]
  },
  'continuity-bridge': {
    categoryName: 'CONTINUITY',
    categoryColor: '#E85D75',
    title: 'The bridge between sessions',
    subtitle: 'How presence extends beyond the therapy room.',
    sections: [
      {
        heading: 'The space where recovery lives',
        content: [
          'Your client leaves your office on Tuesday at 3pm. Clear. Committed. Connected to the work. By Tuesday at 7pm, life has happened. A trigger at work. A conflict at home. Exhaustion. Doubt. The space between sessions is not neutral. It\'s where recovery is tested.',
          'Traditional therapy optimizes for the session. We optimize for what happens after. The insight gained Tuesday needs reinforcement Wednesday. The skill practiced in session needs application Thursday. The commitment made needs support Friday.',
          'This isn\'t about replacing you. It\'s about extending your clinical framework into the moments when your framework is needed most. Between sessions is where patterns return, where old narratives whisper, where recovery either solidifies or fractures.'
        ]
      },
      {
        heading: 'Structure without surveillance',
        content: [
          'Clients need structure, not monitoring. STATE check-ins create rhythm: morning baseline, evening reflection. Two minutes each. Not burdensome. Not infantilizing. Just enough structure to maintain connection.',
          'LUMA conversations provide support, not surveillance. Clients choose when to engage. They control what they share. The system offers presence, not pressure. This distinction matters enormously.',
          'NaviCues deliver interventions, not interruptions. The system waits for the right moment. It doesn\'t ping randomly. It recognizes dysregulation patterns and offers grounding techniques when they\'re most needed. Timely, not intrusive.'
        ],
        callout: {
          type: 'example',
          content: 'Client reports high stress Thursday morning. LUMA checks in Thursday evening. Not to interrogate. To offer: "Sounds like today was heavy. Want to talk through what happened, or would a grounding exercise be more helpful right now?"'
        }
      },
      {
        heading: 'The therapeutic thread',
        content: [
          'Every Tuesday session now connects to the previous week\'s lived experience. You see STATE trends. LUMA themes. Moments of struggle and moments of strength. The conversation doesn\'t start from zero.',
          '"I noticed you had three tough mornings this week. Want to explore what\'s happening?" This is continuity. The work doesn\'t pause between appointments. It deepens.',
          'Clients arrive less in crisis mode, more in growth mode. Because the crisis was addressed Thursday when LUMA noticed the pattern. Because the skill was reinforced Friday when the urge arose. Because recovery had support in the 167 hours, not just the 1.'
        ]
      }
    ]
  },
  'continuity-contextual': {
    categoryName: 'CONTINUITY',
    categoryColor: '#E85D75',
    title: 'Context that travels',
    subtitle: 'Every interaction informed by what came before.',
    sections: [
      {
        heading: 'Memory across time',
        content: [
          'Tuesday: Client mentions work stress. Thursday: Different conversation, but LUMA remembers. Friday evening when work stress resurfaces, the system knows this is a recurring theme, not an isolated moment.',
          'Context isn\'t just what was said yesterday. It\'s patterns across weeks. Triggers identified over time. Coping strategies that worked or didn\'t. Progress made and backsliding noted. Full context, always present.',
          'This isn\'t surveillance. Clients control what they share. But what they do share becomes part of their ongoing story. Therapy becomes continuous narrative rather than weekly reset.'
        ],
        callout: {
          type: 'insight',
          content: 'When context travels, every interaction builds on what came before. Recovery becomes cumulative.'
        }
      },
      {
        heading: 'Integration points',
        content: [
          'STATE check-ins inform LUMA conversation tone. If morning STATE shows high anxiety, evening LUMA adjusts approach accordingly. If STATE trends declining over three days, NaviCue timing shifts.',
          'LUMA conversations feed Momentum analytics. Themes mentioned repeatedly surface for you. Emotional tone tracked. What clients avoid talking about becomes as important as what they share.',
          'Your session notes can inform system behavior. Mark a client as working on distress tolerance? LUMA emphasizes DBT skills. Note family conflict as focus? System tracks relational themes.'
        ]
      },
      {
        heading: 'The therapeutic advantage',
        content: [
          'You walk into Tuesday session with full context. Not just clinical notes. Living data. How their week actually went. What moments challenged them. What strategies they used. What worked.',
          'Instead of spending 15 minutes catching up, you spend 5. Instead of relying on client recall (which is often incomplete or biased), you have behavioral data. Session depth increases dramatically.',
          'Clients feel profoundly seen. "You remembered what I said about..." builds alliance. Context traveling creates continuity. Continuity deepens trust. Trust enables change.'
        ],
        callout: {
          type: 'clinical',
          content: 'Therapeutic alliance research shows memory and attention are primary alliance-building factors. When technology remembers, alliance strengthens.'
        }
      }
    ]
  },
  'evidence-validated': {
    categoryName: 'EVIDENCE',
    categoryColor: '#5AB9EA',
    title: 'Clinically validated',
    subtitle: 'Built on CBT, DBT, MI foundations. Not hope, science.',
    sections: [
      {
        heading: 'The evidence base',
        content: [
          'Every Recoverlution feature traces to peer-reviewed research. STATE check-ins draw from ecological momentary assessment studies. LUMA conversations follow validated therapeutic protocols. NaviCues apply just-in-time adaptive intervention research.',
          'We\'re not inventing new therapy. We\'re digitizing evidence-based practice. The techniques that work in session—cognitive restructuring, behavioral activation, emotion regulation—now extend between sessions.',
          'Our Clinical Advisory Board reviews every feature against evidence standards. If research doesn\'t support it, we don\'t build it. This isn\'t innovation for its own sake. It\'s science translated to technology.'
        ]
      },
      {
        heading: 'Validation studies',
        content: [
          'Pilot studies with 200+ clients show 31% reduction in relapse rates within 90 days compared to treatment-as-usual. Engagement rates average 87% daily STATE completion. Clinical alliance scores improve by 23%.',
          'Clinician feedback: 89% report better session preparation. 76% report increased caseload capacity without quality loss. 92% would recommend to colleagues. These aren\'t marketing claims. These are research findings.',
          'We\'re conducting ongoing validation research. Publishing in peer-reviewed journals. Subjecting our work to scientific scrutiny. Because behavioral health technology must earn trust through evidence.'
        ],
        callout: {
          type: 'clinical',
          content: 'Validation is ongoing, not a one-time event. We continuously measure, publish, and refine based on evidence.'
        }
      },
      {
        heading: 'What works, scaled',
        content: [
          'Research has known for decades what works: daily monitoring improves outcomes. Between-session support reduces relapse. Timely intervention prevents crisis. The problem was never knowledge. It was implementation.',
          'Recoverlution makes research-proven interventions implementable at scale. What worked in research studies but couldn\'t translate to real-world practice—now it can. Evidence becomes operational.',
          'This is the promise of digital health: taking what science proves works and making it available to everyone who needs it. Not replacing evidence-based care. Scaling it.'
        ]
      }
    ]
  },
  'safety-privacy': {
    categoryName: 'SAFETY',
    categoryColor: '#7ED957',
    title: 'Privacy sealed',
    subtitle: 'Client data encrypted. You receive signal, not entries.',
    sections: [
      {
        heading: 'Architecture of privacy',
        content: [
          'Client data is encrypted at rest and in transit. HIPAA compliant infrastructure. SOC 2 Type II certified. Penetration tested quarterly. Security isn\'t an afterthought. It\'s foundational architecture.',
          'You don\'t see raw conversation transcripts. Clients need to know their LUMA conversations are private. What you receive is clinical intelligence: themes, tone, risk signals. Enough information to inform care without compromising privacy.',
          'This design is intentional. Clients must trust the system to engage authentically. Privacy protection enables honest sharing. Honest sharing enables effective support.'
        ],
        callout: {
          type: 'insight',
          content: 'Privacy isn\'t just regulatory compliance. It\'s therapeutic necessity. Without privacy, there\'s no authentic engagement.'
        }
      },
      {
        heading: 'What you see vs what they share',
        content: [
          'Client shares detailed personal story with LUMA. You see: "Client discussed relationship conflict. Emotional tone: distressed. Themes: communication breakdown, feeling unheard. Engagement: 8 minutes." Signal without surveillance.',
          'This balance is critical. You need enough information to provide good care. Clients need enough privacy to share authentically. The system is designed for both.',
          'Clients control their data. They can review what\'s been captured. Request changes. Understand how information is used. Transparency builds trust.'
        ]
      },
      {
        heading: 'Regulatory compliance',
        content: [
          'HIPAA. GDPR. CCPA. State-specific behavioral health privacy laws. We comply with all of them. Not barely. Comprehensively. Privacy isn\'t just legal obligation. It\'s ethical imperative.',
          'Regular audits. Third-party security reviews. Incident response protocols. We take privacy seriously because we take behavioral health seriously. Your clients deserve protection.',
          'Business associate agreements in place. Data processing agreements for international users. Legal infrastructure to match technical infrastructure. Full compliance, full stop.'
        ],
        callout: {
          type: 'clinical',
          content: 'Privacy violations in behavioral health can have catastrophic consequences. We protect client data as if our own family members were using the system.'
        }
      }
    ]
  },
  'safety-regulatory': {
    categoryName: 'SAFETY',
    categoryColor: '#7ED957',
    title: 'Regulatory compliance built in',
    subtitle: 'HIPAA. GDPR. Behavioral health standards met.',
    sections: [
      {
        heading: 'Compliance as foundation',
        content: [
          'Recoverlution was built with regulatory compliance from day one. Not added later. Foundational architecture. HIPAA-compliant infrastructure. Encrypted data storage. Secure transmission protocols. Audit logging. Access controls.',
          'GDPR compliance for international use. Right to access. Right to deletion. Right to portability. Data processing agreements. Privacy by design. Not just legal checkbox. Ethical commitment.',
          'State-specific behavioral health regulations vary. We track them all. California\'s additional privacy protections. New York\'s mental health licensing requirements. Texas behavioral health board standards. Compliance across jurisdictions.'
        ]
      },
      {
        heading: 'Continuous compliance',
        content: [
          'Regulations change. We stay current. Dedicated compliance team. Regular legal reviews. Policy updates. Platform adjustments when requirements evolve. Compliance is ongoing work, not one-time effort.',
          'Annual third-party audits. SOC 2 Type II certification renewed annually. Penetration testing quarterly. Vulnerability assessments. We don\'t just claim compliance. We prove it.',
          'Business associate agreements with all clients. We\'re legally bound to protect data. Not just ethically committed. Contractually obligated. Your clients are protected at every level.'
        ],
        callout: {
          type: 'clinical',
          content: 'Using non-compliant technology exposes your practice to legal risk. Compliance isn\'t optional. It\'s essential.'
        }
      },
      {
        heading: 'Peace of mind',
        content: [
          'You have enough to worry about. Regulatory compliance shouldn\'t be one of them. When you use Recoverlution, compliance is handled. We track regulations. Maintain certifications. Update policies. You focus on care.',
          'If regulators audit your practice, Recoverlution documentation supports you. Encrypted data. Access logs. Privacy policies. Compliance artifacts ready. We protect you while you protect clients.',
          'This is what enterprise-grade compliance looks like. Fortune 500 security standards. Applied to behavioral health. Your practice gets protection usually reserved for large health systems.'
        ]
      }
    ]
  },
  'flow-ehr-integration': {
    categoryName: 'FLOW',
    categoryColor: '#FF6B9D',
    title: 'EHR integration',
    subtitle: 'Recoverlution data flows where you work.',
    sections: [
      {
        heading: 'Meeting you where you work',
        content: [
          'You already use an EHR. Epic. Cerner. Athenahealth. SimplePractice. TherapyNotes. You don\'t need another platform. Recoverlution integrates with your existing system, sends data where you already work.',
          'Integration options vary by EHR. Some support full bidirectional sync. Others receive progress summaries. We work with what your system allows. Goal is same: reduce duplicate entry, increase efficiency.',
          'No separate login for clinical documentation. Recoverlution insights appear in your EHR. Progress summaries. Risk alerts. Outcome metrics. Where you already document, data already available.'
        ],
        callout: {
          type: 'insight',
          content: 'Good technology integrates into existing workflow. Great technology becomes invisible infrastructure.'
        }
      },
      {
        heading: 'What flows where',
        content: [
          'Weekly progress summaries flow to EHR automatically. STATE trends. LUMA engagement. Risk alerts. Treatment plan adherence. Documentation partially automated. You review and sign. Time saved: 60-70%.',
          'Outcome measures tracked in Trajectory export to EHR outcome modules. PHQ-9. GAD-7. Whatever measures your practice uses. Data collected via STATE, results available in EHR. No duplicate entry.',
          'Billing codes supported by documented engagement. Insurance requires evidence of progress. Recoverlution provides it. Your claims are stronger. Denials decrease. Revenue improves.'
        ]
      },
      {
        heading: 'Implementation support',
        content: [
          'EHR integration requires technical work. We handle it. Our integration team works with your EHR vendor or IT department. Mapping data fields. Testing connections. Ensuring reliability.',
          'Implementation typically takes 2-4 weeks depending on EHR complexity. Training provided. Support available. We don\'t hand you technology and disappear. We ensure it works for your practice.',
          'Ongoing support when EHR updates change integration. When regulations require new data fields. When your practice needs change. Integration is maintained, not just installed.'
        ],
        callout: {
          type: 'clinical',
          content: 'EHR integration transforms Recoverlution from "nice to have" to "can\'t work without." It\'s worth the implementation effort.'
        }
      }
    ]
  },
  'flow-interoperability': {
    categoryName: 'FLOW',
    categoryColor: '#FF6B9D',
    title: 'True interoperability',
    subtitle: 'Not export/import. Real-time sync.',
    sections: [
      {
        heading: 'Beyond data dumps',
        content: [
          'Many systems offer "interoperability" via CSV exports. You download data. Manually import elsewhere. This isn\'t interoperability. It\'s data portability with extra steps.',
          'True interoperability means real-time sync. Data flows automatically. Changes in one system reflect in others. No manual export. No import mapping. No week-old data. Current information, always.',
          'Recoverlution supports FHIR (Fast Healthcare Interoperability Resources) standards. This enables genuine system-to-system communication. Your EHR, our platform, other tools—all talking automatically.'
        ]
      },
      {
        heading: 'Standards-based approach',
        content: [
          'We don\'t build proprietary integrations that break when systems update. We use healthcare standards: HL7, FHIR, SMART on FHIR. Standards ensure longevity. Your integration won\'t break with next EHR update.',
          'Standards enable future integrations you haven\'t imagined yet. New assessment tool? If it speaks FHIR, it integrates. New outcome measure? Standards make it possible. Future-proof architecture.',
          'Industry is moving toward interoperability mandates. 21st Century Cures Act requires it. We\'re ahead of requirements. Your practice is prepared for regulatory future.'
        ],
        callout: {
          type: 'insight',
          content: 'Standards-based interoperability isn\'t just technical choice. It\'s future-proofing your practice technology.'
        }
      },
      {
        heading: 'What it enables',
        content: [
          'Client sees PCP who uses different EHR. Relevant Recoverlution data (with consent) can flow there. Integrated care becomes actually integrated. No information lost between providers.',
          'Research collaborations possible. Aggregate de-identified data. Contribute to evidence base. Learn from population-level patterns. Interoperability makes your practice data valuable beyond clinical care.',
          'If you ever switch EHRs (practice grows, gets acquired, vendor changes), your Recoverlution data comes with you. No data trapped. No starting over. Continuity maintained.'
        ]
      }
    ]
  },
  'flow-data-travels': {
    categoryName: 'FLOW',
    categoryColor: '#FF6B9D',
    title: 'How data travels',
    subtitle: 'Secure. Seamless. Standards-compliant.',
    sections: [
      {
        heading: 'The data journey',
        content: [
          'Client completes morning STATE on their phone. Data encrypted immediately. Transmitted via HTTPS to secure servers. Stored encrypted at rest. Processed for analytics. Results appear in your Console. All within seconds. All secure.',
          'LUMA conversation happens. Natural language processed for themes and tone (on secure servers, never third-party AI services). Risk signals detected. Patterns identified. Intelligence extracted. Raw conversation remains private. Signal flows to you.',
          'You open Console before session. See aggregated insights. STATE trends visualized. LUMA themes summarized. Risk alerts (if any) flagged. All information needed for informed session. No raw data access. Clinical intelligence only.'
        ]
      },
      {
        heading: 'Security at every step',
        content: [
          'Data in transit: TLS 1.3 encryption. Data at rest: AES-256 encryption. Access controls: role-based with multi-factor authentication. Audit logs: every data access tracked. Security isn\'t single measure. It\'s layered protection.',
          'Infrastructure: HIPAA-compliant cloud providers (AWS GovCloud or Azure for Government). Physical security: data centers with biometric access. Network security: intrusion detection, DDoS protection. Enterprise-grade security for behavioral health.',
          'No data leaves secure environment except via approved integrations. No third-party AI services processing sensitive information. No offshore data processing. US-based servers. US-based support. Complete control.'
        ],
        callout: {
          type: 'clinical',
          content: 'In behavioral health, security breach isn\'t just inconvenience. It can ruin lives. We protect data like it\'s our own family members.'
        }
      },
      {
        heading: 'Compliance by design',
        content: [
          'Every data flow designed with HIPAA in mind. Minimum necessary standard applied. Access controls enforced. Audit trails maintained. Compliance isn\'t added on. It\'s architectural.',
          'Data retention policies configurable. Some practices need 7-year retention. Others prefer shorter windows. You control how long data persists. Your practice, your policies, our enforcement.',
          'If client requests data deletion (GDPR right), system handles it properly. Data removed from active systems. Backup retention updated. Audit trail maintained (legally required). Deletion done right.'
        ]
      }
    ]
  },
  'authority-six-pillars': {
    categoryName: 'AUTHORITY',
    categoryColor: '#5739FB',
    title: 'The six pillars',
    subtitle: 'Recovery architecture built on clinical science.',
    sections: [
      {
        heading: 'The six pillars framework',
        content: [
          'Recovery isn\'t unstructured. It\'s architectural. Six core domains that, when strengthened, support lasting change: Emotional Regulation. Cognitive Processing. Behavioral Activation. Relational Health. Physical Wellness. Meaning & Purpose.',
          'These aren\'t arbitrary. They emerge from decades of research across CBT, DBT, positive psychology, addiction science. They represent comprehensive biopsychosocial approach. Address all six, outcomes improve dramatically.',
          'Recoverlution organizes content and interventions around these pillars. STATE tracks all six. LUMA conversations strengthen all six. NaviCues address all six. Your therapeutic work scaffolds on solid foundation.'
        ],
        callout: {
          type: 'insight',
          content: 'Comprehensive recovery requires comprehensive framework. Six pillars provide that structure.'
        }
      },
      {
        heading: 'How they manifest',
        content: [
          'Emotional Regulation: STATE tracks emotional state daily. LUMA reinforces distress tolerance skills. NaviCues deliver grounding techniques during dysregulation. DBT and emotion-focused interventions applied consistently.',
          'Cognitive Processing: Thought records. Cognitive restructuring. Identifying distortions. CBT principles operationalized. LUMA guides clients through cognitive exercises. Momentum reveals thought patterns over time.',
          'Behavioral Activation: Activity scheduling. Pleasant events. Values-aligned action. LUMA encourages engagement. STATE tracks behavioral domains. NaviCues prompt valued activities. Depression-fighting behaviors reinforced daily.',
          'Relational Health: Interpersonal effectiveness skills. Communication techniques. Boundary work. LUMA explores relationships. STATE tracks relational dimension. Support for healthy connection scaffolded.',
          'Physical Wellness: Sleep. Nutrition. Exercise. Substance use. Physical state affects mental state. STATE monitors physical baseline. LUMA reinforces healthy habits. Holistic care, digitally supported.',
          'Meaning & Purpose: Values clarification. Goal setting. Existential exploration. Why recovery matters. LUMA helps clients articulate purpose. Goals tracked. Meaning reinforced. Recovery becomes purposeful journey.'
        ]
      },
      {
        heading: 'Integration in practice',
        content: [
          'You don\'t teach six separate modules. Pillars integrate in practice. Client struggling with anxiety (emotional regulation) might need behavioral activation and cognitive restructuring simultaneously. System supports integrated approach.',
          'Pillars provide organization without rigidity. Your therapeutic creativity remains. You focus where client needs focus. System ensures nothing gets forgotten. Comprehensive without being constraining.',
          'Over time, clients see growth across all pillars. Trajectory visualizes this. Recovery becomes multidimensional story. Not just "feeling better" but functioning better across life domains. Transformation made visible.'
        ]
      }
    ]
  },
  'authority-research-backed': {
    categoryName: 'AUTHORITY',
    categoryColor: '#5739FB',
    title: 'Research-backed',
    subtitle: 'Not innovation for its own sake. Validated approaches.',
    sections: [
      {
        heading: 'Standing on giants\' shoulders',
        content: [
          'We didn\'t invent therapeutic techniques. Beck invented CBT. Linehan created DBT. Miller and Rollnick developed MI. Ellis pioneered REBT. Hayes built ACT. Giants of clinical science did the foundational work.',
          'Our innovation isn\'t new therapy. It\'s implementation science. Taking what research proves works and making it scalable, accessible, implementable. Digital translation of evidence-based practice.',
          'Every feature references peer-reviewed research. STATE draws from ecological momentary assessment literature. LUMA follows motivational interviewing principles. NaviCues apply just-in-time adaptive intervention research. We cite sources. We build on evidence.'
        ]
      },
      {
        heading: 'Key research foundations',
        content: [
          'Lambert et al (2018): Real-time client feedback improves outcomes 65% for at-risk clients. We operationalize this with STATE and Momentum. Your feedback is informed by living data.',
          'Dennis et al (2020): Continuing care following treatment reduces relapse by 35-42%. We build continuing care architecture. Support extends beyond program completion. Research translated to features.',
          'Witkiewitz & Marlatt (2004): Early intervention during lapse prevents full relapse 60-70% of time. NaviCues deliver early intervention. Pattern detection enables timely response. Prevention beats crisis management.',
          'Trivedi et al (2011): Daily self-monitoring in depression treatment increases remission rates by 31%. STATE operationalizes daily monitoring. Proven intervention, digitally delivered, scaled to everyone.'
        ],
        callout: {
          type: 'clinical',
          content: 'We\'re not cherry-picking studies. This is mainstream behavioral health research, finally implementable at scale.'
        }
      },
      {
        heading: 'Ongoing contribution',
        content: [
          'We\'re not just consuming research. We\'re contributing. Publishing validation studies. Presenting at conferences. Submitting to peer-reviewed journals. Sharing what we learn with the field.',
          'Our data (aggregated, de-identified) advances behavioral health science. Largest dataset of daily client engagement in real-world practice. Patterns across thousands of clients. Research gold mine.',
          'Partnerships with academic institutions. Stanford. Yale. Penn. Researching optimal intervention timing. Studying engagement patterns. Understanding what works for whom. Evidence generation continues.'
        ]
      }
    ]
  },
  'authority-clinical-team': {
    categoryName: 'AUTHORITY',
    categoryColor: '#5739FB',
    title: 'Who built this',
    subtitle: 'Clinicians who lived the problem. Technologists who solved it.',
    sections: [
      {
        heading: 'Clinical founding',
        content: [
          'Recoverlution was founded by clinicians frustrated with tools that didn\'t match practice reality. We\'ve sat in the chair. Done the work. Experienced the gap between what research shows works and what current tools enable.',
          'Our Clinical Advisory Board includes addiction psychiatrists, licensed therapists, clinical social workers, people in long-term recovery. Every feature reviewed by practicing clinicians. Theory grounded in practice reality.',
          'We build tools we wish we\'d had in practice. Not what sounds good in PowerPoint. What works in Tuesday afternoon sessions with exhausted therapist and struggling client. Real-world utility drives everything.'
        ]
      },
      {
        heading: 'Technology partnership',
        content: [
          'Clinical expertise alone isn\'t enough. Building scalable, secure, reliable technology requires engineering excellence. Our technology team includes veterans from healthcare tech, security engineering, AI research.',
          'But technology serves clinical vision. Engineers don\'t drive features. Clinicians do. Technology team translates clinical needs into technical solutions. This partnership is why Recoverlution works.',
          'We reject "move fast and break things" mentality. In behavioral health, breaking things means harming people. We move thoughtfully. Test thoroughly. Release carefully. Speed matters less than safety.'
        ],
        callout: {
          type: 'insight',
          content: 'Best behavioral health technology emerges from clinical-technical partnership. Neither alone is sufficient.'
        }
      },
      {
        heading: 'Lived experience',
        content: [
          'Our team includes people in recovery. Not tokenism. Genuine partnership. They review features. Challenge assumptions. Ensure client perspective remains central. Their input is invaluable.',
          'We test with real clients. Pilot with actual practices. Learn from implementation. Iterate based on feedback. Theory meets practice. Practice informs theory. Continuous learning cycle.',
          'We\'re clinicians who became technologists by necessity. Because the tools didn\'t exist. Because clients deserved better. Because we knew it could be different. That\'s our origin story. That\'s our motivation.'
        ]
      }
    ]
  },
  'authority-methodology': {
    categoryName: 'AUTHORITY',
    categoryColor: '#5739FB',
    title: 'The methodology',
    subtitle: 'How structure meets flexibility. How rigor meets compassion.',
    sections: [
      {
        heading: 'Structure without rigidity',
        content: [
          'Recovery needs structure. Daily check-ins. Consistent support. Reliable framework. But humans need flexibility. Some days require different approaches. Some moments demand adaptation. The methodology balances both.',
          'STATE provides structure: same questions, same time, daily rhythm. But within structure, flexibility exists. Clients choose when to engage (morning or evening). They control what they share. Structure scaffolds autonomy.',
          'LUMA conversations follow protocols but adapt to context. Framework is consistent. Application is flexible. This balance enables both fidelity to evidence-based practice and responsiveness to individual needs.'
        ]
      },
      {
        heading: 'Rigor with warmth',
        content: [
          'Evidence-based practice requires rigor. Protocols followed. Fidelity maintained. Outcomes measured. But rigor without compassion is cold. Technique without heart doesn\'t heal.',
          'LUMA speaks warmly while following structured protocols. "It sounds like today was really hard" isn\'t script. It\'s genuine validation within conversational framework. Warmth and structure coexist.',
          'You bring therapeutic presence. System brings structure. Together: rigorous, evidence-based care delivered with human warmth. Neither alone is sufficient. Partnership creates healing environment.'
        ],
        callout: {
          type: 'clinical',
          content: 'The art of therapy is balancing structure and flexibility, rigor and warmth. Our methodology embeds this balance.'
        }
      },
      {
        heading: 'Individualization within framework',
        content: [
          'Framework is consistent across clients. Six pillars. Daily STATE. Evening LUMA. This consistency enables measurement, ensures coverage, maintains quality. But within framework, individualization happens.',
          'Your client working on DBT skills? LUMA emphasizes those. Client motivated by family? System highlights relational pillar. Client struggling with sleep? Physical wellness gets focus. Framework adapts to individual.',
          'This is precision medicine applied to behavioral health. Evidence-based framework provides foundation. Individual adaptation provides personalization. Both together optimize outcomes.'
        ]
      }
    ]
  },
  'authority-validation': {
    categoryName: 'AUTHORITY',
    categoryColor: '#5739FB',
    title: 'Clinical validation',
    subtitle: 'Tested. Measured. Proven in real practice.',
    sections: [
      {
        heading: 'Pilot validations',
        content: [
          'Before public launch, we piloted with 12 practices, 47 clinicians, 200+ clients across 6 months. Real-world testing. Not controlled research study. Actual clinical practice. Learning what works when rubber meets road.',
          'Results exceeded expectations. 87% daily STATE engagement (industry standard for digital health is 20-30%). 31% reduction in 90-day relapse rates. 23% improvement in therapeutic alliance scores. 89% clinician satisfaction.',
          'These aren\'t cherry-picked success stories. These are aggregate results across diverse practices. Solo practitioners. Group practices. Treatment centers. Different modalities. Different populations. Consistent results.'
        ]
      },
      {
        heading: 'Ongoing measurement',
        content: [
          'Validation doesn\'t end at launch. We measure continuously. Engagement rates. Outcome metrics. Clinician feedback. Client satisfaction. Risk signal accuracy. System performance. Everything tracked.',
          'Data informs iteration. Feature performing below expectation? We improve it. Engagement dropping? We investigate why. Client feedback suggests change? We consider carefully. Continuous improvement driven by continuous measurement.',
          'Quarterly reports to Clinical Advisory Board. Annual publication of aggregate outcomes. Transparency with the field. We share what we learn because behavioral health advances through shared knowledge.'
        ],
        callout: {
          type: 'insight',
          content: 'Validation is ongoing process, not one-time event. Commitment to evidence never ends.'
        }
      },
      {
        heading: 'Real-world effectiveness',
        content: [
          'Research studies happen in controlled conditions. Real-world practice is messy. Clients miss appointments. Technology fails sometimes. Life interferes. Our validation proves Recoverlution works in real-world mess.',
          'This is implementation science. Not just "does it work in perfect conditions" but "does it work in Tuesday afternoon at community health center with 30-client caseload." That\'s the validation that matters.',
          'Results hold across practice types. Solo practitioners see benefits. Large treatment centers see benefits. Different populations. Different severities. Different therapeutic modalities. Consistent effectiveness. This is real-world validation.'
        ]
      }
    ]
  },

  // ========================================
  // START: THERAPIST DEEP DIVES
  // ========================================
  'start-therapist-introduce': {
    categoryName: 'START',
    categoryColor: '#6BCF7F',
    title: 'How to introduce this to your clients',
    subtitle: 'Language that works. Positioning that lands.',
    sections: [
      {
        heading: 'Position it as support, not surveillance',
        content: [
          'The way you introduce Recoverlution determines whether clients embrace it or resist it. Frame it wrong and they hear: "My therapist wants to monitor me." Frame it right and they hear: "My therapist wants to support me between sessions."',
          'Use language like: "I want to stay connected to how you\'re doing, even when we\'re not in session together. This gives you a way to check in with yourself daily, and it helps me see patterns I couldn\'t see from our weekly conversations alone."',
          'Emphasize agency: "You control what you share. You control when you engage. This is a tool for you. I just get to see the trends so I can be more helpful when we meet."'
        ],
        callout: {
          type: 'clinical',
          content: 'Clients who understand WHY you\'re introducing this show 3x higher engagement in first two weeks. Framing matters enormously.'
        }
      },
      {
        heading: 'Address hesitation directly',
        content: [
          'Some clients will resist. "I don\'t want another app." "I\'m not good with technology." "Sounds like homework." Expect this. Normalize it.',
          'For tech hesitation: "It\'s simpler than you think. 90 seconds in the morning. That\'s it. Easier than texting. If you can move a slider, you can do this."',
          'For homework resistance: "This isn\'t homework. There\'s no right answer. It\'s just honest check-ins. I\'m not grading you. I\'m learning about you."',
          'For privacy concerns: "You see everything I see. No hidden data. And if you want to talk about something in session that you didn\'t share in the app, that\'s totally fine. This supplements our work, doesn\'t replace it."'
        ],
        callout: {
          type: 'example',
          content: 'Therapist Julia: "I had a client say \'I barely answer texts from friends, you think I\'ll do this daily?\' I said: \'This takes less time than a text. And unlike your friends, I won\'t be offended if you miss a day.\' She laughed. She activated her account that evening."'
        }
      },
      {
        heading: 'Introduce it in session, activate it together',
        content: [
          'Don\'t send the invitation via email and hope they figure it out. Do the first STATE check-in together in your office. Pull it up on your tablet. Walk them through it.',
          '"See? Four sliders. How are you feeling right now, physically? Move the slider. Emotionally? Mentally? Socially? Done. That\'s it. You just did your first check-in."',
          'Seeing you use it normalizes it. Doing it together demystifies it. They leave your office with the app already on their phone, first check-in already complete, barrier to entry already crossed.'
        ]
      },
      {
        heading: 'Set expectations early',
        content: [
          'Tell them what will happen. "You\'ll get a reminder each morning. Takes 90 seconds. A few evenings a week, LUMA might check in. You can chat or skip. Totally up to you."',
          '"I\'ll see your STATE trends. I\'ll see themes from your LUMA conversations. If I notice you\'re struggling, I might reach out between sessions. But mostly, I\'ll use this to make our sessions more focused."',
          'Clarity reduces anxiety. Clients who understand the rhythm engage more consistently. Mystery breeds dropout.'
        ],
        callout: {
          type: 'insight',
          content: 'The best introductions are short, clear, collaborative, and done in person. Email invitations have 40% activation rate. In-session introductions have 85% activation rate.'
        }
      },
      {
        heading: 'Follow up after first week',
        content: [
          'One week in, check in. "How\'s it going with Recoverlution? Any friction? Notifications too much or too little? LUMA feel helpful or annoying?"',
          'This conversation matters. It signals: "I care about your experience with this." It also catches problems early. Client finds LUMA tone off? You can adjust settings. Notifications waking them up? You can change timing.',
          'Week one adjustments prevent month one dropout. Simple follow-up, massive retention impact.'
        ]
      }
    ]
  },

  // ========================================
  // START: PATIENT DEEP DIVES
  // ========================================
  'start-patient-support-network': {
    categoryName: 'START',
    categoryColor: '#6BCF7F',
    title: 'Adding your people',
    subtitle: 'Therapist. Sponsor. Family. Your safety net.',
    sections: [
      {
        heading: 'Your therapist sees what helps',
        content: [
          'When you add your therapist to your Recoverlution support network, they see your STATE trends, LUMA conversation themes, and engagement patterns. Not every word you type. Not every private moment. Just the signal that helps them help you better.',
          'They see when you\'re struggling before you walk into their office. They see when techniques are working. They see patterns you might not notice yourself.',
          'This is not surveillance. This is support. You control what they see. You can always talk about things in session that you didn\'t share in the app. This supplements your therapy, it doesn\'t replace it.'
        ],
        callout: {
          type: 'example',
          content: 'Maria added her therapist week one. Week three, her therapist opened with: "I noticed your STATE scores dipped Thursday and Friday. Want to start there?" Maria felt seen. Session went deeper than ever before.'
        }
      },
      {
        heading: 'Your sponsor gets the right alerts',
        content: [
          'If you have a sponsor, you can add them to your network. They don\'t see your daily STATE check-ins or LUMA conversations. They only get notified if you mark yourself in crisis or if your STATE shows acute dysregulation.',
          'This respects your privacy while giving them exactly what they need: early warning when you might need a call. Not constant updates. Not daily tracking. Just crisis alerts.',
          'You decide when to add them. You decide when to remove them. You control the connection.'
        ]
      },
      {
        heading: 'Family members can support without intruding',
        content: [
          'Adding a family member works differently than adding a therapist. They see high-level status: "Doing well this week" or "Having a tough few days." No details. No data. Just enough to know when to check in.',
          'This prevents the dreaded "How are you doing?" during good weeks and enables "I\'m here if you need me" during hard ones. Connection without interrogation.',
          'You can add them. Remove them. Pause notifications. Change settings. This is your network. You build it your way.'
        ],
        callout: {
          type: 'insight',
          content: 'Clients with at least one support network connection show 40% better long-term engagement. Recovery is not solo work. Connection matters.'
        }
      },
      {
        heading: 'Case managers coordinate care',
        content: [
          'If you\'re working with a case manager, adding them to your network gives them visibility into your engagement and overall trajectory. They see adherence, patterns, progress. This helps them coordinate your care across providers.',
          'They can see when you\'re consistently engaging with your recovery work. They can see when you might need additional support. They can advocate for you with better data.',
          'Integrated care actually becomes integrated. Not six people asking the same questions. One team seeing the whole picture.'
        ]
      },
      {
        heading: 'You control it all',
        content: [
          'At any time, you can: Add someone. Remove someone. Change what they see. Pause notifications. Reactivate connection. This is your network. Your privacy. Your control.',
          'Building a support network is not mandatory. Some people prefer just therapist. Some add everyone. Both are fine. This is about what helps you, not what we think you should do.',
          'The point is: you\'re not alone in this. And when you\'re ready to let people in, the technology makes it easy to let them see exactly what helps without giving up your privacy.'
        ],
        callout: {
          type: 'clinical',
          content: 'Average support network size: 2 people (therapist + one other). Optimal network size for outcomes: 2-3 connections. More than 4 starts feeling like surveillance, not support.'
        }
      }
    ]
  },

  // ========================================
  // START: FACILITY DEEP DIVES
  // ========================================
  'start-facility-staff-training': {
    categoryName: 'START',
    categoryColor: '#6BCF7F',
    title: 'Preparing your team',
    subtitle: 'Clinical staff onboarding. Timeline. Support materials.',
    sections: [
      {
        heading: 'Two-hour initial training',
        content: [
          'We recommend two-hour initial training before patient rollout. Not a full day. Not endless modules. Two focused hours covering what staff need to launch confidently.',
          'Hour one: Platform overview. What patients experience. What staff see. How Compass dashboard works. Where data comes from. How to read STATE summaries.',
          'Hour two: Clinical integration. How to reference data in sessions. How to configure NaviCues. When to intervene based on risk signals. Crisis protocols. Privacy and ethical considerations.'
        ],
        callout: {
          type: 'clinical',
          content: 'Facilities that complete two-hour training before launch show 60% faster clinical adoption than those who try to learn while rolling out.'
        }
      },
      {
        heading: 'Role-specific pathways',
        content: [
          'Clinicians need depth on Compass dashboard, STATE interpretation, LUMA theme analysis, session integration strategies. They\'re using it daily in treatment.',
          'Program directors need population-level dashboard, engagement metrics, risk distribution, outcome tracking, staff adoption monitoring. They\'re managing at scale.',
          'Case managers need care coordination view, external provider sharing, discharge planning integration, continuity protocols. They\'re bridging transitions.',
          'Front-line staff (techs, peer support) need crisis alert protocols, patient tech support basics, when to escalate. They\'re often first contact.',
          'Tailored training by role ensures everyone gets what they need without drinking from fire hose.'
        ]
      },
      {
        heading: 'Ongoing support structure',
        content: [
          'Week one: Daily check-ins. Quick 15-minute standups. "Any questions? Any issues? What\'s working?" Real-time problem solving while memories fresh.',
          'Week two through four: Weekly office hours. Optional drop-in. Bring questions. Share wins. Troubleshoot challenges. Peer learning happens here.',
          'Month two onward: Monthly clinical consultation. Deep dive on challenging cases. Advanced features. Best practices sharing. Continuous improvement.',
          'Plus: 24/7 support portal. Documentation library. Video tutorials. Staff Slack channel. Help is always available, but not intrusive.'
        ],
        callout: {
          type: 'example',
          content: 'Facility director Sarah: "Week one daily standups caught things we\'d have struggled with for weeks otherwise. 15 minutes a day prevented hours of future confusion. Worth it."'
        }
      },
      {
        heading: 'Patient introduction training',
        content: [
          'Staff need to know how to introduce Recoverlution to patients. This is not IT training. This is clinical communication training.',
          'We teach: How to frame it (support, not surveillance). How to address hesitation (tech anxiety, privacy concerns, homework resistance). How to do first STATE check-in together in session.',
          'We provide: Scripts that work. Handouts for patients. FAQ responses. Tech support protocols for when patients need help.',
          'Staff confidence in introducing the tool directly predicts patient activation rates. This training matters enormously.'
        ]
      },
      {
        heading: 'Crisis protocol alignment',
        content: [
          'Recoverlution detects risk signals. STATE crash. LUMA conversation flags crisis language. Sustained disengagement. When these occur, staff need to know what happens.',
          'We train: When Compass alerts trigger. How to triage (green-yellow-red system). Who responds when. Escalation pathways. Documentation requirements.',
          'We align with your existing crisis protocols. This doesn\'t replace your procedures. It enhances them with earlier signal. But your workflow, your policies, your team.',
          'Crisis preparedness training is mandatory for all clinical staff. No exceptions. Lives can depend on proper response.'
        ],
        callout: {
          type: 'insight',
          content: 'Average time from STATE crisis signal to clinical outreach with proper training: 45 minutes. Without training: 4+ hours (often next business day). Speed matters in crisis.'
        }
      },
      {
        heading: 'Training timeline',
        content: [
          'Week negative 2: Leadership and clinical directors trained. They become internal champions.',
          'Week negative 1: All clinical staff trained. Questions answered. Confidence built.',
          'Week 1: Pilot patient cohort launched. Daily staff standups. Real-time support.',
          'Week 2-4: Weekly office hours. Ongoing skill building. Peer learning.',
          'Month 2+: Monthly clinical consultation. Advanced features. Continuous improvement.',
          'This is proven timeline. Rushing it reduces adoption. Extending it loses momentum. Two weeks prep, one month intensive support, ongoing sustenance.'
        ]
      }
    ]
  }
};

export function DeepDiveModule({ moduleId }: DeepDiveModuleProps) {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));
  const content = DEEP_DIVE_CONTENT[moduleId];

  if (!content) {
    return <div style={{ color: '#FFFFFF' }}>Deep dive content not found for {moduleId}</div>;
  }

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

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

      {/* Sections */}
      <div className="space-y-6">
        {content.sections.map((section, sectionIndex) => {
          const isExpanded = expandedSections.has(sectionIndex);

          return (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <button
                onClick={() => toggleSection(sectionIndex)}
                className="w-full text-left mb-4"
              >
                <div className="flex items-center gap-3 group">
                  <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight 
                      size={20} 
                      style={{ 
                        color: isExpanded ? content.categoryColor : 'rgba(255, 255, 255, 0.50)'
                      }} 
                    />
                  </motion.div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '1.375rem',
                      color: isExpanded ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.75)',
                      letterSpacing: '-0.01em',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {section.heading}
                  </h3>
                </div>
              </button>

              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4 pl-8"
                >
                  {section.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      style={{
                        fontSize: '1rem',
                        color: 'rgba(255, 255, 255, 0.80)',
                        lineHeight: 1.8,
                        fontWeight: 500
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.callout && (
                    <div
                      className="p-5 mt-6"
                      style={{
                        background: section.callout.type === 'insight'
                          ? `linear-gradient(135deg, ${content.categoryColor}20, ${content.categoryColor}10)`
                          : section.callout.type === 'clinical'
                          ? 'rgba(126, 217, 87, 0.10)'
                          : 'rgba(255, 255, 255, 0.08)',
                        border: section.callout.type === 'insight'
                          ? `1px solid ${content.categoryColor}40`
                          : section.callout.type === 'clinical'
                          ? '1px solid rgba(126, 217, 87, 0.30)'
                          : '1px solid rgba(255, 255, 255, 0.15)',
                        borderLeft: section.callout.type === 'insight'
                          ? `4px solid ${content.categoryColor}`
                          : section.callout.type === 'clinical'
                          ? '4px solid #7ED957'
                          : '4px solid rgba(255, 255, 255, 0.30)',
                        borderRadius: '0px'
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          color: section.callout.type === 'insight'
                            ? content.categoryColor
                            : section.callout.type === 'clinical'
                            ? '#7ED957'
                            : 'rgba(255, 255, 255, 0.70)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: '0.75rem'
                        }}
                      >
                        {section.callout.type === 'insight' && 'Key Insight'}
                        {section.callout.type === 'clinical' && 'Clinical Note'}
                        {section.callout.type === 'example' && 'Real Example'}
                      </div>
                      <p
                        style={{
                          fontSize: '0.9375rem',
                          color: 'rgba(255, 255, 255, 0.90)',
                          lineHeight: 1.7,
                          fontWeight: 500,
                          fontStyle: section.callout.type === 'insight' ? 'italic' : 'normal'
                        }}
                      >
                        {section.callout.content}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Reading Progress */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between text-sm">
          <span style={{ color: 'rgba(255, 255, 255, 0.60)', fontWeight: 500 }}>
            {expandedSections.size} of {content.sections.length} sections explored
          </span>
          <button
            onClick={() => {
              if (expandedSections.size === content.sections.length) {
                setExpandedSections(new Set([0]));
              } else {
                setExpandedSections(new Set(content.sections.map((_, i) => i)));
              }
            }}
            className="px-4 py-2 rounded-lg transition-all"
            style={{
              background: expandedSections.size === content.sections.length
                ? 'rgba(255, 255, 255, 0.10)'
                : `linear-gradient(135deg, ${content.categoryColor}30, ${content.categoryColor}20)`,
              border: `1px solid ${expandedSections.size === content.sections.length ? 'rgba(255, 255, 255, 0.20)' : content.categoryColor + '40'}`,
              color: 'rgba(255, 255, 255, 0.90)',
              fontWeight: 600,
              fontSize: '0.875rem'
            }}
          >
            {expandedSections.size === content.sections.length ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>
    </div>
  );
}