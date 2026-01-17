/**
 * JOURNEY WALKTHROUGH MODULE
 * 
 * Step through a client's weekly journey.
 * Shows the lived experience of recovery with system support.
 * 
 * Created: December 10, 2025
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Circle, CheckCircle2 } from 'lucide-react';

interface JourneyWalkthroughModuleProps {
  moduleId: string;
}

// Module-specific journey configurations
const JOURNEY_CONTENT: Record<string, {
  categoryName: string;
  categoryColor: string;
  title: string;
  subtitle: string;
  steps: Array<{
    day: string;
    time: string;
    moment: string;
    clientExperience: string;
    systemSupport: string;
    clinicalValue: string;
  }>;
}> = {
  'continuity-rhythm': {
    categoryName: 'CONTINUITY',
    categoryColor: '#E85D75',
    title: 'The rhythm of recovery',
    subtitle: 'Daily check-ins. Contextual support. Continuous presence.',
    steps: [
      {
        day: 'Monday',
        time: '8:30 AM',
        moment: 'Morning STATE check-in',
        clientExperience: 'Sarah opens her app. "How are you feeling today?" Simple sliders for physical, emotional, cognitive, relational state. Takes 90 seconds. Feels like journaling, not homework.',
        systemSupport: 'STATE captures baseline. Compares to last week. Flags 15% dip in emotional state. Adds context: first Monday back after visiting family.',
        clinicalValue: 'You see the signal before session. No time wasted catching up. You know where to focus.'
      },
      {
        day: 'Monday',
        time: '3:00 PM',
        moment: 'Afternoon session with you',
        clientExperience: 'Sarah walks in. You already know she\'s struggling. The conversation goes deeper, faster. She feels seen before she says a word.',
        systemSupport: 'STATE data informs your approach. You reference patterns from last week. Connection feels continuous, not starting over.',
        clinicalValue: 'Session depth increases. Rapport deepens. Outcomes improve because you\'re building on signal, not guessing.'
      },
      {
        day: 'Tuesday',
        time: '7:30 PM',
        moment: 'Evening LUMA check-in',
        clientExperience: 'LUMA asks about her day. "How did today go?" She shares a trigger moment at work. LUMA reflects, validates, offers a grounding technique from yesterday\'s session.',
        systemSupport: 'LUMA conversation draws from your clinical framework. CBT-informed reflection. DBT skill suggestion. All contextualized to her patterns.',
        clinicalValue: 'Your therapeutic approach extends into her evening. Insight reinforced 24 hours after session, not 6 days later.'
      },
      {
        day: 'Thursday',
        time: '2:15 PM',
        moment: 'Moment of dysregulation',
        clientExperience: 'Argument with partner. Heart racing. Old urges surfacing. Phone buzzes: "You seem stressed. Want to try the 5-4-3-2-1 technique we practiced?"',
        systemSupport: 'NaviCue triggered by STATE decline + time pattern. Delivers precisely-timed intervention based on her nervous system signals.',
        clinicalValue: 'Crisis de-escalated before it becomes crisis. She uses the tool you taught. Pattern interrupted in real-time.'
      },
      {
        day: 'Friday',
        time: '8:45 PM',
        moment: 'Weekend preparation',
        clientExperience: 'LUMA: "Weekends can be hard. What\'s your plan for staying connected to your recovery?" She shares her plan. Feels accountable, not alone.',
        systemSupport: 'LUMA proactively addresses high-risk window. Reminds her of coping strategies. Creates accountability without judgment.',
        clinicalValue: 'Weekend relapse risk reduced. She enters high-risk period with structure, not hope alone.'
      },
      {
        day: 'Sunday',
        time: '6:00 PM',
        moment: 'Week reflection',
        clientExperience: 'LUMA asks her to reflect on the week. What went well. What was hard. What she learned. She sees her own growth captured.',
        systemSupport: 'Week summary generated. Patterns visualized. Progress made tangible. Momentum analytics begin revealing trajectory.',
        clinicalValue: 'She arrives Monday with integrated learning. You see weekly patterns. Next session builds on progress, not recovering ground.'
      },
      {
        day: 'Next Monday',
        time: '3:00 PM',
        moment: 'Following session',
        clientExperience: 'Sarah walks in different. Confident. Connected to her progress. Ready to go deeper. The gap didn\'t erase the work.',
        systemSupport: 'You see the full week. STATE trends. LUMA conversations. NaviCue moments. Pattern recognition across time.',
        clinicalValue: 'This is continuity. Not episodic care. Continuous therapeutic presence. The 167 hours between sessions become part of treatment, not a gap to bridge.'
      }
    ]
  },
  'continuity-weekly-flow': {
    categoryName: 'CONTINUITY',
    categoryColor: '#E85D75',
    title: 'What a week looks like',
    subtitle: 'Morning STATE. Evening LUMA. Weekly insights. Continuous thread.',
    steps: [
      {
        day: 'Monday',
        time: '7:00 AM',
        moment: 'Week begins',
        clientExperience: 'Morning STATE check-in. Quick baseline. How did they sleep? Physical state? Emotional readiness? 2 minutes. Sets daily intention.',
        systemSupport: 'Baseline captured. Compared to previous Mondays. Pattern recognition begins. Week starts with signal.',
        clinicalValue: 'You see Monday baseline before week unfolds. Can anticipate needs, adjust approach.'
      },
      {
        day: 'Tuesday',
        time: '9:00 PM',
        moment: 'First LUMA conversation',
        clientExperience: 'LUMA asks about their day. They share a win. LUMA celebrates. They share a struggle. LUMA validates, offers perspective.',
        systemSupport: 'Conversation logged. Themes tracked. Emotional tone analyzed. Risk signals monitored.',
        clinicalValue: 'Themes emerge. You see what they talk about when you\'re not there.'
      },
      {
        day: 'Wednesday',
        time: '2:30 PM',
        moment: 'Midweek check',
        clientExperience: 'STATE check-in flags increased stress. NaviCue suggests breathwork. They take 3 minutes. Regulation restored.',
        systemSupport: 'Early warning system activates. Intervention delivered before spiral begins. Pattern interrupted.',
        clinicalValue: 'Crisis prevented, not managed. They practice skills in real context.'
      },
      {
        day: 'Thursday',
        time: '3:00 PM',
        moment: 'Your session',
        clientExperience: 'They arrive grounded. You review the week together. Data shows the story. They feel understood.',
        systemSupport: 'Full week context available. STATE trends. LUMA themes. NaviCue moments. Clinical picture complete.',
        clinicalValue: 'Session time maximized. You work with data, not guesses. Depth increases.'
      },
      {
        day: 'Friday',
        time: '8:00 PM',
        moment: 'Weekend prep',
        clientExperience: 'LUMA: "Weekends are different. What support do you need?" They plan. They feel prepared.',
        systemSupport: 'High-risk window identified. Proactive support offered. Accountability created.',
        clinicalValue: 'Weekend relapse risk mitigated. Structure extends through unstructured time.'
      },
      {
        day: 'Sunday',
        time: '5:00 PM',
        moment: 'Week closes',
        clientExperience: 'Week reflection. They see their progress visualized. Momentum builds. Confidence grows.',
        systemSupport: 'Week summary generated. Analytics updated. Trajectory tracked. Evidence accumulates.',
        clinicalValue: 'Progress quantified. Client sees growth. You see patterns. Next week informed by this week.'
      },
      {
        day: 'Monday',
        time: '7:00 AM',
        moment: 'Rhythm continues',
        clientExperience: 'New week begins. Same structure. Increased confidence. Recovery becomes rhythm, not event.',
        systemSupport: 'Pattern recognition deepens. System learns. Support becomes more precise.',
        clinicalValue: 'Continuity compounds. Each week builds. Outcomes improve over time, not session by session.'
      }
    ]
  },
  'practice-outpatient': {
    categoryName: 'PRACTICE',
    categoryColor: '#4ECDC4',
    title: 'Outpatient continuity',
    subtitle: 'The bridge between weekly sessions.',
    steps: [
      {
        day: 'Monday',
        time: '4:00 PM',
        moment: 'Your weekly session',
        clientExperience: 'Sarah arrives. You have context. You saw her STATE scores dipped Thursday and Friday. LUMA conversations showed work stress escalating. No time wasted catching up.',
        systemSupport: 'Console shows full week data. STATE trend chart. LUMA theme summary. Risk signals (none this week). Everything needed for informed session.',
        clinicalValue: 'Session goes deeper faster. 15 minutes of catch-up becomes 5. Extra 10 minutes used for actual therapeutic work. ROI immediate.'
      },
      {
        day: 'Tuesday',
        time: '7:30 AM',
        moment: 'Morning after session',
        clientExperience: 'STATE check-in feels different post-session. Clarity from yesterday still fresh. She rates herself honestly. Emotional state: 7/10. Physical: 6/10. Cognitive: 8/10.',
        systemSupport: 'Baseline captured. Compared to pre-session scores. Improvement documented. Progress visible. Momentum analytics begin tracking post-session trajectories.',
        clinicalValue: 'You see whether sessions create lasting impact or temporary relief. Data informs treatment planning. No guessing.'
      },
      {
        day: 'Wednesday',
        time: '8:00 PM',
        moment: 'Midweek check-in',
        clientExperience: 'LUMA: "How has this week been going?" She shares a difficult moment at work. LUMA reflects back Monday session insights: "Remember what you and your therapist discussed about boundaries?"',
        systemSupport: 'LUMA conversation draws from session notes you provided. Reinforces work done Monday. Bridges session insights to Wednesday application.',
        clinicalValue: 'Your therapeutic work extends beyond Monday. Insights reinforced exactly when needed. Continuity maintained.'
      },
      {
        day: 'Friday',
        time: '6:30 PM',
        moment: 'End of work week',
        clientExperience: 'Stressful day. OLD urges surface. STATE check-in shows declining emotional score. NaviCue triggers: "Noticed stress today. Want to try that grounding technique from Monday session?"',
        systemSupport: 'Pattern recognition: Friday evening historically vulnerable. STATE decline noted. Intervention delivered proactively. Crisis prevented.',
        clinicalValue: 'Gap between sessions becomes supported space, not dangerous void. Skills practiced when needed, not just discussed in abstract.'
      },
      {
        day: 'Saturday',
        time: '10:00 AM',
        moment: 'Weekend morning',
        clientExperience: 'Less structured day. LUMA checks in: "Weekends can be different. What\'s your plan for staying connected to your recovery work?" Accountability without surveillance.',
        systemSupport: 'Proactive weekend support. High-risk unstructured time addressed. Client creates own plan. Autonomous engagement scaffolded.',
        clinicalValue: 'Weekend relapse risk mitigated. Structure extends through unstructured time. Recovery becomes 7-day commitment, not 5-day effort.'
      },
      {
        day: 'Sunday',
        time: '7:00 PM',
        moment: 'Week reflection',
        clientExperience: 'LUMA asks about the week. What went well. What was hard. She sees her own growth. Friday crisis navigated successfully. Skills working.',
        systemSupport: 'Week summary generated. STATE trends visualized. Progress documented. Evidence accumulates. Client sees own trajectory.',
        clinicalValue: 'She arrives Monday with integrated learning, not crisis to unpack. Therapy builds progressively rather than repairing repeatedly.'
      },
      {
        day: 'Monday',
        time: '4:00 PM',
        moment: 'Next session',
        clientExperience: 'Different from last week. Confident. Connected to progress. Ready to go deeper. Last week\'s work integrated. New material possible.',
        systemSupport: 'Full week context prepared. You see wins and struggles. Friday crisis and successful navigation both visible. Complete picture.',
        clinicalValue: 'This is outpatient continuity. Weekly sessions become checkpoints in continuous journey, not isolated events. Outcomes improve because gaps filled.'
      }
    ]
  },
  'practice-iop': {
    categoryName: 'PRACTICE',
    categoryColor: '#4ECDC4',
    title: 'IOP support',
    subtitle: 'Daily structure meets clinical oversight.',
    steps: [
      {
        day: 'Monday',
        time: '9:00 AM',
        moment: 'IOP group session',
        clientExperience: 'Marcus attends morning group. Shares weekend struggles. Group processes together. Skills taught. Community reinforced.',
        systemSupport: 'You (as IOP clinician) see his weekend data. STATE scores declined Saturday. Recovered Sunday. Context informs how you facilitate his sharing.',
        clinicalValue: 'Group facilitation informed by individual data. You know who struggled before they share. Gentle prompting becomes possible.'
      },
      {
        day: 'Monday',
        time: '2:00 PM',
        moment: 'Afternoon individual session',
        clientExperience: 'One-on-one with therapist. Morning group work extended. Individual struggles addressed. Treatment plan reviewed.',
        systemSupport: 'Therapist sees full picture: group participation, weekend data, LUMA conversations, STATE trends. Comprehensive context enables deeper work.',
        clinicalValue: 'IOP intensity supported by data intensity. Multiple daily touchpoints create rich clinical picture. Treatment highly responsive.'
      },
      {
        day: 'Tuesday',
        time: '9:00 AM',
        moment: 'Process group',
        clientExperience: 'Different group focus. Process work. Interpersonal patterns. Relationship dynamics. Marcus participates actively.',
        systemSupport: 'Clinician sees: Monday individual work carried forward. Emotional state stable. Engagement high. Progress visible day-to-day.',
        clinicalValue: 'IOP clinicians manage 30+ clients simultaneously. Intelligent triage makes it manageable. Green-yellow-red dashboard shows who needs attention.'
      },
      {
        day: 'Wednesday',
        time: '6:00 PM',
        moment: 'Evening after IOP',
        clientExperience: 'Home now. LUMA checks in: "How are you integrating today\'s group work?" He reflects. Processes. Makes connections.',
        systemSupport: 'LUMA reinforces IOP content. Extends learning beyond program hours. Integration supported.',
        clinicalValue: 'IOP learning doesn\'t end at 5pm. Evening reflection extends therapeutic work. Skills solidify through supported practice.'
      },
      {
        day: 'Thursday',
        time: '9:00 AM',
        moment: 'Skills group',
        clientExperience: 'DBT skills training. Distress tolerance module. TIPP skills practiced. Group role-plays scenarios.',
        systemSupport: 'You teach skills knowing system will reinforce them. NaviCues deliver TIPP reminder when Marcus shows dysregulation later.',
        clinicalValue: 'Skills taught in group become actually accessible in moments of need. Transfer from training to application happens.'
      },
      {
        day: 'Friday',
        time: '1:00 PM',
        moment: 'Week closing group',
        clientExperience: 'Week review group. Everyone shares highs and lows. Marcus shares successful skill use Wednesday evening. Group celebrates.',
        systemSupport: 'His Wednesday skill use was captured in data. You reference it. Validation with evidence. Progress made tangible.',
        clinicalValue: 'IOP outcomes improve because gaps between sessions filled. Daily structure maintained even when not physically in program.'
      },
      {
        day: 'Weekend',
        time: 'Variable',
        moment: 'No IOP sessions',
        clientExperience: 'Program closed weekends. But LUMA available. STATE check-ins continue. NaviCues deliver if needed. Structure persists.',
        systemSupport: 'Weekend continuity maintained. Highest risk time has support. Monday return prepared by weekend data.',
        clinicalValue: 'Weekend relapse rates plummet. Sunday panic calls decrease. Monday groups start productive, not crisis-focused. IOP effectiveness multiplies.'
      }
    ]
  },
  'practice-aftercare': {
    categoryName: 'PRACTICE',
    categoryColor: '#4ECDC4',
    title: 'Aftercare that works',
    subtitle: 'Transition without falling through cracks.',
    steps: [
      {
        day: 'Day 1',
        time: '10:00 AM',
        moment: 'Discharge from treatment',
        clientExperience: 'Jasmine leaves residential. Nervous but hopeful. Recoverlution account already set up. Continuity plan in place. Same tools she used in treatment come home.',
        systemSupport: 'STATE baseline from treatment available. LUMA knows her triggers, coping strategies, support system. Context travels from treatment to aftercare.',
        clinicalValue: 'Discharge isn\'t cliff edge. Tool continuity reduces transition trauma. Client experiences consistency despite setting change.'
      },
      {
        day: 'Day 3',
        time: '7:00 PM',
        moment: 'First tough evening home',
        clientExperience: 'Loneliness hits. No peers around. No evening group. But LUMA checks in. Familiar support. She shares struggles. Feels heard.',
        systemSupport: 'LUMA conversation more important now than in treatment. Isolation addressed. Evening vulnerability supported. Crisis prevented.',
        clinicalValue: 'First week home is highest risk. Daily support during this window demonstrably reduces relapse. Aftercare becomes active, not passive.'
      },
      {
        day: 'Week 2',
        time: '3:00 PM',
        moment: 'First outpatient session',
        clientExperience: 'Meets new outpatient therapist. But therapist already knows her. Has treatment discharge summary. Plus two weeks of STATE and LUMA data.',
        systemSupport: 'New therapist sees: treatment goals, coping strategies learned, home transition challenges, current state. Full context enables immediate rapport.',
        clinicalValue: 'Therapeutic alliance builds faster when continuity exists. First session productive, not administrative. Treatment momentum maintained.'
      },
      {
        day: 'Week 4',
        time: '8:00 PM',
        moment: 'First major craving',
        clientExperience: 'Triggered by old associate. Craving intense. STATE shows emotional crash. NaviCue delivers: "This is the moment skills matter. Remember your relapse prevention plan?"',
        systemSupport: 'High-risk moment detected. Intervention immediate. Relapse prevention protocol activated. Crisis support available if needed.',
        clinicalValue: 'The moment that determines long-term outcome gets immediate support. This is why aftercare with Recoverlution outperforms traditional weekly check-ins.'
      },
      {
        day: 'Month 2',
        time: 'Variable',
        moment: 'Finding new rhythm',
        clientExperience: 'Life building. Job started. Relationships healing. Recovery becoming identity. Daily STATE shows upward trend. LUMA conversations show growth.',
        systemSupport: 'Trajectory analytics show clear progress. Risk events decreasing. Coping strategy use increasing. Engagement remaining high.',
        clinicalValue: 'Evidence of sustained change visible. Not therapist hope or client report. Behavioral data showing integration. This proves aftercare working.'
      },
      {
        day: 'Month 3',
        time: '10:00 AM',
        moment: 'Discharge from intensive aftercare',
        clientExperience: 'Transitions to maintenance care. But Recoverlution continues. She wants it. Tool that helped her doesn\'t disappear. Support scales down but persists.',
        systemSupport: 'STATE frequency decreases to weekly. LUMA available but optional. Monitoring continues at appropriate level. Safety net persists.',
        clinicalValue: 'Aftercare doesn\'t abruptly end. It gradually fades as independence grows. Client never feels abandoned. Outcomes improve when scaffolding gradually removed.'
      },
      {
        day: 'Month 6',
        time: '2:00 PM',
        moment: 'Six-month milestone',
        clientExperience: 'Looks back at Trajectory. Day 1 to Day 180. Growth undeniable. Hard days visible. But trend unmistakable. She cries seeing her own progress.',
        systemSupport: 'Complete data story. Every STATE entry. Every LUMA conversation. Every NaviCue. Evidence of journey traveled. Motivation to continue.',
        clinicalValue: 'This is why aftercare with Recoverlution works. Client sees evidence of change. Evidence builds confidence. Confidence sustains recovery. Data becomes story becomes meaning.'
      }
    ]
  },
  'transformation-30-days': {
    categoryName: 'TRANSFORMATION',
    categoryColor: '#6BCF7F',
    title: 'First 30 days',
    subtitle: 'Onboarding. Baseline. First patterns emerging.',
    steps: [
      {
        day: 'Day 1',
        time: '10:00 AM',
        moment: 'Onboarding session',
        clientExperience: 'Alex meets therapist. Intake completed. Recoverlution explained. "You\'ll do quick check-ins daily. Evening conversations with LUMA. I\'ll see patterns I couldn\'t see before."',
        systemSupport: 'Account created. Preferences set. Modalities selected by therapist. System configured to therapeutic approach. Foundation laid.',
        clinicalValue: 'Onboarding takes 10 minutes. Client understands purpose. Therapist sets framework. Simple start enables strong foundation.'
      },
      {
        day: 'Day 2',
        time: '8:00 AM',
        moment: 'First STATE check-in',
        clientExperience: 'Phone reminder. Opens app. Simple questions. How do you feel physically? Emotionally? Cognitively? Relationally? Takes 90 seconds. Done.',
        systemSupport: 'First baseline captured. No context yet. Single data point. But journey begins. Every journey starts with first step.',
        clinicalValue: 'Day 1 baseline established. Future trends will compare to this. Measurement begins immediately, not after lengthy assessment.'
      },
      {
        day: 'Day 5',
        time: '7:00 PM',
        moment: 'First LUMA conversation',
        clientExperience: 'Evening notification. "How was your day?" Hesitantly shares. LUMA responds warmly. Validates. Asks follow-up. Feels surprisingly helpful.',
        systemSupport: 'First conversation logged. Tone analyzed. Themes identified. Pattern recognition begins. One conversation not enough for patterns, but data accumulating.',
        clinicalValue: 'Engagement established. Client experiences LUMA as helpful, not burden. Foundation for ongoing use created.'
      },
      {
        day: 'Day 7',
        time: '3:00 PM',
        moment: 'First therapy session with data',
        clientExperience: 'Returns for second session. Therapist: "I see you had tough mornings Wednesday and Thursday. Want to explore that?" Feels understood before speaking.',
        systemSupport: 'Week 1 STATE data visible. Pattern emerging: weekday mornings harder than evenings. Therapist works with data, not just recall.',
        clinicalValue: 'Clinical decision-making enhanced by data. Session depth increases. This is what continuous data enables.'
      },
      {
        day: 'Day 14',
        time: 'Variable',
        moment: 'Two-week reflection',
        clientExperience: 'Alex notices something: daily check-ins make him more aware. He catches declining mood earlier now. Mindfulness increasing.',
        systemSupport: 'Two weeks of data revealing patterns. Morning dip pattern consistent. Weekend vulnerability clear. Therapist sees what weekly sessions couldn\'t reveal.',
        clinicalValue: 'Self-awareness improves through daily tracking. Clinical insight deepens through pattern data. Therapeutic value accumulating rapidly.'
      },
      {
        day: 'Day 21',
        time: '4:30 PM',
        moment: 'First crisis prevented',
        clientExperience: 'Bad day cascading. STATE shows crash. NaviCue delivers: "Noticed you\'re struggling. Want to try the 5-4-3-2-1 grounding we practiced?" Uses it. Works.',
        systemSupport: 'Risk signal detected. Intervention delivered. Crisis prevented. This is system working as designed. Skills accessible when needed.',
        clinicalValue: 'ROI moment. Client didn\'t spiral. Didn\'t need emergency session. Skill practice happened in real context. This is clinical value made visible.'
      },
      {
        day: 'Day 30',
        time: '2:00 PM',
        moment: 'One-month milestone',
        clientExperience: 'Looks at Trajectory. Day 1 emotional state: 4/10. Today: 6.5/10. Upward trend undeniable despite fluctuations. Progress visible.',
        systemSupport: 'Month 1 complete. Baseline established. Patterns identified. Momentum analytics generating insights. Foundation solid for ongoing work.',
        clinicalValue: 'First 30 days: baseline established, engagement solidified, patterns emerging, first interventions delivered, progress visible. System proving value. Client and therapist both convinced. Foundation for long-term work laid.'
      }
    ]
  },

  // ========================================
  // START: THERAPIST JOURNEYS
  // ========================================
  'start-therapist-day-one': {
    categoryName: 'START',
    categoryColor: '#6BCF7F',
    title: 'Your first client on Recoverlution',
    subtitle: 'Setup to invitation in under 10 minutes.',
    steps: [
      {
        day: 'Minute 0',
        time: '2:00 PM',
        moment: 'Create your account',
        clientExperience: 'Not applicable yet',
        systemSupport: 'Therapist account created. Profile configured. Practice type selected. Solo practitioner onboarding flow initiated.',
        clinicalValue: 'Setup takes 2 minutes. No complex configuration. Simple questions: practice type, therapeutic approach, client focus. System adapts to you.'
      },
      {
        day: 'Minute 3',
        time: '2:03 PM',
        moment: 'Add your first client',
        clientExperience: 'Not yet involved',
        systemSupport: 'Client profile created. Name, contact email. Optional: diagnosis, treatment goals. Minimal data to start. Everything else emerges from use.',
        clinicalValue: 'No lengthy intake forms. No duplicate data entry. Just enough to begin. Client onboarding can happen in-session or async.'
      },
      {
        day: 'Minute 5',
        time: '2:05 PM',
        moment: 'Send invitation',
        clientExperience: 'Client receives email: "Your therapist has invited you to Recoverlution." Simple explanation. Download link. Personal message from you included.',
        systemSupport: 'Invitation email sent. Contains your personal note. Clear onboarding instructions. No jargon. Accessible language.',
        clinicalValue: 'You control how it\'s introduced. Your words. Your timing. Client sees you sent it, not some platform they don\'t know.'
      },
      {
        day: 'Minute 7',
        time: '2:07 PM',
        moment: 'Configure preferences',
        clientExperience: 'Not applicable',
        systemSupport: 'Notification preferences set. Decide when you want alerts: high-risk signals only, or daily summaries. You control cadence.',
        clinicalValue: 'You decide how Recoverlution fits your workflow. Not the other way around. Alerts when useful, silent otherwise.'
      },
      {
        day: 'Minute 10',
        time: '2:10 PM',
        moment: 'Review quick-start guide',
        clientExperience: 'Not applicable',
        systemSupport: 'Interactive walkthrough available. Shows Compass dashboard, how to read STATE summaries, when NaviCues trigger. Optional, skippable.',
        clinicalValue: 'Training available immediately. But not required. Interface intuitive enough to learn by doing. Support when you want it, not mandatory hurdles.'
      },
      {
        day: 'Day 2',
        time: '9:00 AM',
        moment: 'Client activates account',
        clientExperience: 'Sarah downloads app. Creates account. First STATE check-in prompted. Takes 90 seconds. Feels manageable.',
        systemSupport: 'Client onboarding complete. First baseline captured. Therapist receives notification: "Sarah completed first STATE check-in."',
        clinicalValue: 'You see engagement immediately. No wondering if they set it up. No tech support calls. It just works.'
      },
      {
        day: 'Day 3',
        time: '3:00 PM',
        moment: 'Your next session together',
        clientExperience: 'Sarah arrives. You pull up Compass on your tablet. "I saw you had two good mornings and one tough one. Let\'s talk about Wednesday." She feels seen.',
        systemSupport: 'Three days of STATE data visible. Trends emerging. You reference real signals, not memory or guesswork.',
        clinicalValue: 'This is why you started. Session depth increased immediately. Connection strengthened. Clinical value undeniable. You\'re ready for client number two.'
      }
    ]
  },

  'start-therapist-first-session': {
    categoryName: 'START',
    categoryColor: '#6BCF7F',
    title: 'The first session after they start',
    subtitle: 'What you will see. How to use it together.',
    steps: [
      {
        day: 'Monday',
        time: '2:45 PM',
        moment: '15 minutes before session',
        clientExperience: 'Client is driving to your office. Unaware you\'re already prepared.',
        systemSupport: 'You open Compass. One week of STATE data visible. Morning scores. Evening LUMA conversation themes. Risk signals: none this week. Green status.',
        clinicalValue: 'Session prep takes 3 minutes instead of starting cold. You arrive prepared. They feel that immediately.'
      },
      {
        day: 'Monday',
        time: '3:00 PM',
        moment: 'Session opens',
        clientExperience: 'Client sits down. You say: "I saw you had a tough Thursday morning. Want to start there?" Immediate relief. They don\'t have to recap the whole week.',
        systemSupport: 'Thursday STATE showed emotional 4/10, physical 5/10. Rest of week 7/10 average. You have context without interrogation.',
        clinicalValue: 'First 10 minutes of catching up compressed to 2 minutes. Extra 8 minutes used for actual therapeutic work. ROI immediate.'
      },
      {
        day: 'Monday',
        time: '3:15 PM',
        moment: 'Reviewing data together',
        clientExperience: 'You turn your tablet toward them. "See this? Your emotional scores have been climbing all month. That\'s real progress." They see their own trajectory. Data becomes proof.',
        systemSupport: 'Trajectory view shows 4 weeks. Upward trend clear despite daily fluctuations. Visual evidence of progress.',
        clinicalValue: 'Clients often can\'t see their own growth. Data makes it undeniable. Motivation increases. Therapy buy-in strengthens.'
      },
      {
        day: 'Monday',
        time: '3:30 PM',
        moment: 'Working with LUMA insights',
        clientExperience: 'You reference a LUMA conversation from Friday evening. "You told LUMA you felt lonely after work. That\'s been a pattern. Let\'s build a plan for Friday evenings." They feel understood across time.',
        systemSupport: 'LUMA thematic analysis flagged "loneliness" and "Friday evenings" as recurring. You have the pattern they might not consciously notice.',
        clinicalValue: 'Patterns emerge that weekly sessions miss. You work with evidence, not hunches. Treatment becomes precisely targeted.'
      },
      {
        day: 'Monday',
        time: '3:45 PM',
        moment: 'Session closing',
        clientExperience: 'You say: "This week, I want you to try that grounding technique we practiced. When you feel overwhelmed, STATE will show it, and you might get a NaviCue reminder to use it." They leave with clear homework and system support.',
        systemSupport: 'You configure NaviCue trigger: if emotional state drops below 5/10, suggest grounding technique. Intervention automated.',
        clinicalValue: 'Homework no longer hope-based. System reminds them exactly when the skill is needed. Skill transfer actually happens.'
      },
      {
        day: 'Monday',
        time: '4:00 PM',
        moment: 'Post-session notes',
        clientExperience: 'Client leaves. Processing the session. Feels connected, understood, hopeful.',
        systemSupport: 'Compass offers to auto-generate progress note from session themes and STATE trends. You edit, approve, done. 5 minutes instead of 15.',
        clinicalValue: 'Documentation burden reduced. More time for clients. Less time on administrative work. This is clinical efficiency.'
      },
      {
        day: 'Week later',
        time: 'Next Monday',
        moment: 'Following session',
        clientExperience: 'Client arrives confident. "I used that grounding technique twice this week. It really helped." Progress visible to both of you.',
        systemSupport: 'You see: NaviCue delivered Wednesday afternoon. Client engaged with it. STATE improved within 30 minutes. Skill use documented.',
        clinicalValue: 'This is therapeutic continuity. You taught the skill Monday. System reinforced it Wednesday. Client used it successfully. Progress compounds. This is why Recoverlution works.'
      }
    ]
  },

  // ========================================
  // START: PATIENT JOURNEYS
  // ========================================
  'start-patient-welcome': {
    categoryName: 'START',
    categoryColor: '#6BCF7F',
    title: 'Your first 10 minutes',
    subtitle: 'Open app. Check STATE. Start your first Journey.',
    steps: [
      {
        day: 'Minute 0',
        time: '7:00 PM',
        moment: 'Open the app',
        clientExperience: 'You open Recoverlution for the first time. Clean interface. No overwhelming options. Just: "Welcome. Let\'s start with a quick check-in."',
        systemSupport: 'Onboarding flow initiated. No lengthy tutorials. Learn by doing. First action is meaningful engagement, not setup screens.',
        clinicalValue: 'Immediate engagement. No drop-off during setup. Client starts using it within 30 seconds.'
      },
      {
        day: 'Minute 1',
        time: '7:01 PM',
        moment: 'First STATE check-in',
        clientExperience: 'Four simple sliders: "How are you feeling right now? Physically. Emotionally. Mentally. Socially." You move the sliders honestly. Takes 90 seconds. Feels like journaling, not medical intake.',
        systemSupport: 'First baseline captured. Day 1 data point established. No context yet, but journey begins.',
        clinicalValue: 'Barrier to entry extremely low. No complex forms. Just honest self-assessment. Engagement established immediately.'
      },
      {
        day: 'Minute 3',
        time: '7:03 PM',
        moment: 'Explore first Journey',
        clientExperience: 'App suggests: "Want to explore a Journey? Short practices designed for where you are right now." You tap "Show me." See options: grounding, regulation, connection. You choose grounding.',
        systemSupport: 'Recommendation based on STATE scores. Emotional state showed some stress. Grounding Journey suggested. Personalized from day one.',
        clinicalValue: 'Content immediately relevant. Not random. Based on actual need. Algorithmic personalization working from first interaction.'
      },
      {
        day: 'Minute 5',
        time: '7:05 PM',
        moment: 'Complete first Journey',
        clientExperience: '5-minute grounding practice. Video guide. Calm voice. Breathwork. Body scan. You finish feeling noticeably calmer. App asks: "How was that?" You rate it. Leave a note.',
        systemSupport: 'Journey completion logged. Rating captured: 4/5 stars. Note: "Actually helped." Engagement quality high.',
        clinicalValue: 'First experience positive. App delivered value immediately. Client wants to return. Retention begins at moment one.'
      },
      {
        day: 'Minute 8',
        time: '7:08 PM',
        moment: 'Meet LUMA',
        clientExperience: 'Notification: "I\'m LUMA. Think of me as a companion who\'s always here. No judgment. Just support. Want to chat about your day?" You tap yes.',
        systemSupport: 'First LUMA conversation initiated. Context from STATE and Journey completion available. LUMA can reference: "I noticed you chose grounding. How are you feeling now?"',
        clinicalValue: 'LUMA introduction feels natural, not forced. Contextually aware from first message. Client experiences intelligence immediately.'
      },
      {
        day: 'Minute 10',
        time: '7:10 PM',
        moment: 'First LUMA exchange',
        clientExperience: 'LUMA: "How was your day?" You type a quick response. LUMA reflects back. Asks a gentle follow-up. You feel heard. Conversation feels surprisingly real.',
        systemSupport: 'First conversation logged. Themes: stress, work, grounding helped. Emotional tone: mixed but hopeful. Pattern recognition begins.',
        clinicalValue: 'Client engaged with AI companion willingly. Quality of interaction high. Foundation for ongoing LUMA use established. First 10 minutes: complete success.'
      },
      {
        day: 'Next morning',
        time: '8:30 AM',
        moment: 'Morning after',
        clientExperience: 'Gentle notification: "Morning STATE check-in." You remember last night. It helped. You open the app. Another quick check-in. Takes 90 seconds. Feels like a healthy habit forming.',
        systemSupport: 'Day 2 baseline captured. Compared to Day 1 evening. Slight improvement noted. Positive momentum detected early.',
        clinicalValue: 'Client returned. Engagement sustained. Habit formation beginning. This is the start of therapeutic continuity.'
      }
    ]
  },

  'start-patient-week-one': {
    categoryName: 'START',
    categoryColor: '#6BCF7F',
    title: 'Your first week',
    subtitle: 'Day by day. Building momentum from the start.',
    steps: [
      {
        day: 'Day 1',
        time: 'Evening',
        moment: 'Onboarding complete',
        clientExperience: 'You completed setup. Did first STATE check-in. Explored a Journey. Talked to LUMA. Felt good. Closed app feeling hopeful.',
        systemSupport: 'Day 1 baseline established. Engagement quality: high. First Journey completed. LUMA conversation positive. Strong start.',
        clinicalValue: 'Day 1 completion rate extremely high. Friction removed. Value delivered immediately. Client retention begins well.'
      },
      {
        day: 'Day 2',
        time: 'Morning',
        moment: 'Building routine',
        clientExperience: 'Morning reminder. "Quick STATE check-in." You do it while drinking coffee. 90 seconds. Becoming part of morning ritual.',
        systemSupport: 'Day 2 morning baseline captured. Consistency established. Habit formation beginning. Morning routine integration successful.',
        clinicalValue: 'Routine forming immediately. Not burdensome. Integrated into existing habits. This is behavioral design working.'
      },
      {
        day: 'Day 3',
        time: 'Afternoon',
        moment: 'First real challenge',
        clientExperience: 'Stressful day at work. You remember Recoverlution. Open app. STATE check-in shows red zones. App suggests: "Try a Rescue. 3-minute breathwork." You do it. Actually helps.',
        systemSupport: 'STATE crash detected. Rescue recommended algorithmically. Client engaged. STATE improved within 30 minutes. Crisis averted.',
        clinicalValue: 'App proved useful in real stress moment. Not just calm moments. Client experienced actual utility. Trust deepens.'
      },
      {
        day: 'Day 4',
        time: 'Evening',
        moment: 'Deepening connection',
        clientExperience: 'LUMA checks in. "How was today?" You share about the work stress. LUMA asks good questions. Validates feelings. You feel less alone.',
        systemSupport: 'Fourth LUMA conversation. Themes emerging: work stress, afternoon vulnerability. Pattern recognition starting to work.',
        clinicalValue: 'Client using LUMA voluntarily. Not just checking boxes. Real emotional engagement. This is companion working as designed.'
      },
      {
        day: 'Day 5',
        time: 'Morning',
        moment: 'Mid-week reflection',
        clientExperience: 'Five days in. You look at your STATE history. See the progression. Tuesday rough. Wednesday better. Pattern visible. You feel aware.',
        systemSupport: 'Five days of data. Enough for patterns to emerge. Weekly low point: Tuesday. Recovery trajectory: visible. Insight generated.',
        clinicalValue: 'Self-awareness increasing through data reflection. Client seeing own patterns. Therapeutic value accumulating rapidly.'
      },
      {
        day: 'Day 6',
        time: 'Weekend',
        moment: 'Structure on unstructured days',
        clientExperience: 'Saturday. No work routine. LUMA checks in: "Weekends can be different. What\'s your plan for staying connected to your wellbeing?" You hadn\'t thought about it. You make a plan.',
        systemSupport: 'Weekend support initiated. High-risk unstructured time addressed proactively. Client creates accountability plan.',
        clinicalValue: 'Weekend relapse risk mitigated. Client doesn\'t fall through the cracks. Continuity maintained across all seven days.'
      },
      {
        day: 'Day 7',
        time: 'Evening',
        moment: 'Week one complete',
        clientExperience: 'LUMA: "One week complete. You did STATE check-ins 6 out of 7 days. Completed 4 Journeys. Had 5 conversations with me. Look at your progress." You see the data. You feel proud.',
        systemSupport: 'Week one summary generated. Engagement: 85%. STATE completion: 86%. Journey engagement: high. LUMA quality: excellent. Retention probability: very high.',
        clinicalValue: 'Week one success predicts long-term retention. Client sees own engagement. Motivation builds. Foundation solid. They are going to keep using this. First week: complete success.'
      }
    ]
  },

  // ========================================
  // START: FACILITY JOURNEYS
  // ========================================
  'start-facility-pilot': {
    categoryName: 'START',
    categoryColor: '#6BCF7F',
    title: 'Your first 30 days',
    subtitle: 'Pilot cohort approach. Staff trained. Rollout ready.',
    steps: [
      {
        day: 'Day 0',
        time: 'Pre-launch',
        moment: 'Pilot cohort selected',
        clientExperience: 'Patients not yet aware. Selection happening in background.',
        systemSupport: 'Facility admin selects 10 patients for pilot. Criteria: stable enough to engage, representative of population, willing to try new tools.',
        clinicalValue: 'Small cohort reduces risk. 10 patients manageable for learning. Success here scales later. Smart pilot design matters.'
      },
      {
        day: 'Day 1',
        time: 'Morning',
        moment: 'Staff training session',
        clientExperience: 'Patients unaware. Training happening.',
        systemSupport: 'Two-hour training for 5 clinical staff. Covers: platform overview, patient onboarding, Compass dashboard, crisis protocols, integration with existing program.',
        clinicalValue: 'Staff prepared before patient launch. Questions answered. Confidence built. No learning on the fly with real patients.'
      },
      {
        day: 'Day 3',
        time: 'Group session',
        moment: 'Patient introduction',
        clientExperience: 'Morning group. Clinician introduces Recoverlution. "We\'re trying something new. Daily check-ins on your phone. Support between groups. 10 of you are pilot cohort." Mixed reactions: curiosity, hesitation.',
        systemSupport: 'Group introduction complete. Handouts provided. Download instructions clear. Staff available for questions.',
        clinicalValue: 'Introduction in group setting normalizes it. Peer support for adoption. Staff demonstrates comfort with tool. Patients see it\'s endorsed, not experimental.'
      },
      {
        day: 'Day 4',
        time: 'Variable',
        moment: 'Patient onboarding',
        clientExperience: '8 out of 10 patients download app. Staff helps 2 who need tech support. First STATE check-ins completed. Feels simple.',
        systemSupport: '80% activation rate in first 24 hours. Excellent. Two patients need tech help. Staff trained to provide it. Problem solved quickly.',
        clinicalValue: 'High activation rate validates approach. Tech support plan worked. Patients engaging. Pilot off to strong start.'
      },
      {
        day: 'Day 7',
        time: 'End of week',
        moment: 'First week data review',
        clientExperience: 'Patients don\'t see this. Staff meeting happening.',
        systemSupport: 'Clinical team reviews dashboard. 8 patients active. 75% average STATE completion. 4 patients highly engaged with LUMA. 2 NaviCues delivered successfully. Zero negative incidents.',
        clinicalValue: 'Early data positive. Engagement high. No problems. Staff confidence increases. Ready to continue.'
      },
      {
        day: 'Day 14',
        time: 'Mid-pilot',
        moment: 'Staff using data in treatment',
        clientExperience: 'Patients notice: "My counselor referenced something I shared in the app. She really knew what was going on with me this week." Connection deepens.',
        systemSupport: 'Staff successfully integrating Compass data into sessions. Using STATE trends to inform treatment. LUMA themes guiding conversations. Clinical workflow adapting.',
        clinicalValue: 'This is the ROI moment. Staff see value. Patients feel more understood. Treatment quality improving. Pilot validating itself.'
      },
      {
        day: 'Day 21',
        time: 'Three weeks',
        moment: 'First retention proof',
        clientExperience: 'Pilot patients share in group: "I like having this between sessions. Makes me feel connected even when I\'m not here." Peer influence beginning.',
        systemSupport: '7 out of 8 active patients still engaged. 87.5% retention. Above industry benchmarks. Engagement quality remaining high.',
        clinicalValue: 'Three-week retention validates long-term potential. Patients advocating for it. Other patients asking: "When can I get it?" Demand building organically.'
      },
      {
        day: 'Day 30',
        time: 'Pilot review',
        moment: 'Decision point',
        clientExperience: 'Patients unaware this is evaluation moment. They\'re just using it.',
        systemSupport: 'Month one data: 75% sustained engagement. STATE completion steady. LUMA conversations quality high. Zero drop-outs due to dissatisfaction. Staff NPS: 9/10. Patient NPS: 8.5/10.',
        clinicalValue: 'Pilot successful by every metric. Staff want to expand. Patients want to continue. Leadership has data to justify full rollout. Month one: complete success. Ready to scale.'
      }
    ]
  }
};

export function JourneyWalkthroughModule({ moduleId }: JourneyWalkthroughModuleProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const content = JOURNEY_CONTENT[moduleId];

  if (!content) {
    return <div style={{ color: '#FFFFFF' }}>Journey content not found for {moduleId}</div>;
  }

  const step = content.steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === content.steps.length - 1;

  const handlePrev = () => {
    if (!isFirst) setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    if (!isLast) setCurrentStep(currentStep + 1);
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

      {/* Progress Indicator */}
      <div className="flex items-center gap-2 mb-8">
        {content.steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className="transition-all"
            style={{
              flex: 1,
              height: '4px',
              background: index <= currentStep 
                ? `linear-gradient(90deg, ${content.categoryColor}, ${content.categoryColor}AA)`
                : 'rgba(255, 255, 255, 0.15)',
              borderRadius: '2px',
              border: 'none',
              cursor: 'pointer'
            }}
          />
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          {/* Step Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${content.categoryColor}, ${content.categoryColor}DD)`,
                  borderRadius: '0px'
                }}
              >
                <span
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: '#FFFFFF'
                  }}
                >
                  {currentStep + 1}
                </span>
              </div>
              <div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: content.categoryColor,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.25rem'
                  }}
                >
                  {step.day} · {step.time}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.375rem',
                    color: 'rgba(255, 255, 255, 0.95)',
                    letterSpacing: '-0.01em'
                  }}
                >
                  {step.moment}
                </h3>
              </div>
            </div>
          </div>

          {/* Three Perspectives */}
          <div className="space-y-4">
            {/* Client Experience */}
            <div
              className="p-5"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.10)',
                borderLeft: `3px solid ${content.categoryColor}`,
                borderRadius: '0px'
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'rgba(255, 255, 255, 0.60)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.75rem'
                }}
              >
                Client Experience
              </div>
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: 'rgba(255, 255, 255, 0.85)',
                  lineHeight: 1.7,
                  fontWeight: 500
                }}
              >
                {step.clientExperience}
              </p>
            </div>

            {/* System Support */}
            <div
              className="p-5"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.10)',
                borderLeft: `3px solid ${content.categoryColor}80`,
                borderRadius: '0px'
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'rgba(255, 255, 255, 0.60)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.75rem'
                }}
              >
                System Support
              </div>
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: 'rgba(255, 255, 255, 0.75)',
                  lineHeight: 1.7,
                  fontWeight: 500
                }}
              >
                {step.systemSupport}
              </p>
            </div>

            {/* Clinical Value */}
            <div
              className="p-5"
              style={{
                background: `linear-gradient(135deg, ${content.categoryColor}15, ${content.categoryColor}08)`,
                border: `1px solid ${content.categoryColor}30`,
                borderRadius: '0px'
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: content.categoryColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.75rem'
                }}
              >
                Clinical Value
              </div>
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: 'rgba(255, 255, 255, 0.90)',
                  lineHeight: 1.7,
                  fontWeight: 600,
                  fontStyle: 'italic'
                }}
              >
                {step.clinicalValue}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
        <button
          onClick={handlePrev}
          disabled={isFirst}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background: isFirst ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.10)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: 'rgba(255, 255, 255, 0.90)',
            fontWeight: 600,
            fontSize: '0.875rem'
          }}
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        <div
          style={{
            fontSize: '0.875rem',
            color: 'rgba(255, 255, 255, 0.60)',
            fontWeight: 600
          }}
        >
          {currentStep + 1} of {content.steps.length}
        </div>

        <button
          onClick={handleNext}
          disabled={isLast}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background: isLast 
              ? 'rgba(255, 255, 255, 0.05)' 
              : `linear-gradient(135deg, ${content.categoryColor}, ${content.categoryColor}DD)`,
            border: isLast ? '1px solid rgba(255, 255, 255, 0.15)' : 'none',
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '0.875rem'
          }}
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
