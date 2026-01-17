/**
 * SOCIAL CONNECTIVITY PILLAR - COMPLETE 100 ITEMS
 * 
 * Authority Stack:
 * - John Bowlby & Mary Ainsworth (Attachment Theory)
 * - Sue Johnson (Emotionally Focused Therapy)
 * - John Gottman (Relationship Research, Four Horsemen)
 * - Brené Brown (Vulnerability, Shame Resilience)
 * - Matthew Lieberman (Social Brain, Social Pain)
 * - Shelley Taylor (Tend-and-Befriend, Social Support)
 * - Harry Harlow (Contact Comfort Research)
 * - Ed Tronick (Still Face Experiment, Rupture & Repair)
 * - Allan Schore (Attachment Neuroscience)
 * - Daniel Siegel (Interpersonal Neurobiology, Mindsight)
 * - Stephen Porges (Social Engagement System)
 * - Julianne Holt-Lunstad (Loneliness & Health Research)
 * - Esther Perel (Relational Intelligence)
 * - Dan McAdams (Narrative Identity, Life Stories)
 * - Kristin Neff (Self-Compassion & Self-Relating)
 */

export interface SCPractice {
  code: string; kind: 'pillar_practice'; pillar_id: 'social_connectivity';
  title: string; subheadline: string; duration: string;
  context?: { when?: string; who_its_for?: string; promise?: string; };
  steps?: Array<{ instruction: string; prompt: string; }>;
  therapeutic_mechanism?: string; injectable?: boolean;
  people_referenced?: string[]; theories_referenced?: string[];
}

export interface SCBlock {
  code: string; kind: 'block'; pillar_id: 'social_connectivity';
  title: string; subheadline: string; word_count?: number;
  context?: { who_its_for?: string; promise?: string; };
  schema_targets?: string[]; practices_injected?: string[];
  people_referenced?: string[]; theories_referenced?: string[];
}

export interface SCLesson {
  code: string; kind: 'micro_lesson'; pillar_id: 'social_connectivity';
  title: string; subheadline: string;
  context?: { who_its_for?: string; promise?: string; };
  people_referenced?: string[]; theories_referenced?: string[];
}

// 20 PRACTICES
export const socialConnectivityPractices: SCPractice[] = [
  { code: 'SC_PP_01', kind: 'pillar_practice', pillar_id: 'social_connectivity', title: 'Attachment Style Check-In', subheadline: 'Identify your relational patterns', duration: '180 seconds', people_referenced: ['John Bowlby', 'Mary Ainsworth'], theories_referenced: ['Attachment Theory'], injectable: true },
  { code: 'SC_PP_02', kind: 'pillar_practice', pillar_id: 'social_connectivity', title: 'Bid for Connection Practice', subheadline: 'Notice and respond to relationship bids', duration: '120 seconds', people_referenced: ['John Gottman'], theories_referenced: ['Relationship Science'], injectable: true },
  { code: 'SC_PP_03', kind: 'pillar_practice', pillar_id: 'social_connectivity', title: 'Vulnerability Exposure', subheadline: 'Share something real with someone safe', duration: '240 seconds', people_referenced: ['Brené Brown'], theories_referenced: ['Shame Resilience'], injectable: true },
  { code: 'SC_PP_04', kind: 'pillar_practice', pillar_id: 'social_connectivity', title: 'Active Listening Practice', subheadline: 'Listen to understand, not respond', duration: '180 seconds', people_referenced: ['Carl Rogers'], theories_referenced: ['Person-Centered Therapy'], injectable: true },
  { code: 'SC_PP_05', kind: 'pillar_practice', pillar_id: 'social_connectivity', title: 'Repair Conversation Script', subheadline: 'Reconnect after conflict', duration: '240 seconds', people_referenced: ['John Gottman', 'Sue Johnson'], theories_referenced: ['Repair Sequences'], injectable: true },
  { code: 'SC_PP_06', kind: 'pillar_practice', pillar_id: 'social_connectivity', title: 'Boundary Setting Practice', subheadline: 'Communicate limits without guilt', duration: '150 seconds', people_referenced: ['Brené Brown'], theories_referenced: ['Boundary Work'], injectable: true },
  { code: 'SC_PP_07', kind: 'pillar_practice', pillar_id: 'social_connectivity', title: 'Social Baseline Check', subheadline: 'Assess your connection level', duration: '120 seconds', people_referenced: ['Julianne Holt-Lunstad'], theories_referenced: ['Loneliness Research'], injectable: true },
  { code: 'SC_PP_08', kind: 'pillar_practice', pillar_id: 'social_connectivity', title: 'Empathic Attunement', subheadline: 'Feel with someone without losing yourself', duration: '180 seconds', people_referenced: ['Daniel Stern'], theories_referenced: ['Attunement'], injectable: true },
  { code: 'SC_PP_09', kind: 'pillar_practice', pillar_id: 'social_connectivity', title: 'Reach Out When Isolating', subheadline: 'Counter withdrawal with connection', duration: '90 seconds', people_referenced: ['Shelley Taylor'], theories_referenced: ['Tend-and-Befriend'], injectable: true },
  { code: 'SC_PP_10', kind: 'pillar_practice', pillar_id: 'social_connectivity', title: 'Gratitude Expression', subheadline: 'Tell someone why they matter', duration: '120 seconds', people_referenced: ['Sara Algoe'], theories_referenced: ['Gratitude Research'], injectable: true },
  { code: 'SC_PP_11', kind: 'pillar_practice', pillar_id: 'social_connectivity', title: 'Assertive Communication', subheadline: 'Express needs clearly without aggression', duration: '180 seconds', people_referenced: ['Marshall Rosenberg'], theories_referenced: ['Nonviolent Communication'], injectable: true },
  { code: 'SC_PP_12', kind: 'pillar_practice', pillar_id: 'social_connectivity', title: 'Loneliness Check-In', subheadline: 'Name and address social pain', duration: '150 seconds', people_referenced: ['John Cacioppo'], theories_referenced: ['Loneliness Research'], injectable: true },
  { code: 'SC_PP_13', kind: 'pillar_practice', pillar_id: 'social_connectivity', title: 'Secure Attachment Priming', subheadline: 'Access earned security', duration: '180 seconds', people_referenced: ['Mary Main'], theories_referenced: ['Adult Attachment'], injectable: true },
  { code: 'SC_PP_14', kind: 'pillar_practice', pillar_id: 'social_connectivity', title: 'Rupture Recognition', subheadline: 'Notice when disconnection happens', duration: '120 seconds', people_referenced: ['Ed Tronick'], theories_referenced: ['Rupture & Repair'], injectable: true },
  { code: 'SC_PP_15', kind: 'pillar_practice', pillar_id: 'social_connectivity', title: 'Safe Haven Visualization', subheadline: 'Internalize secure attachment', duration: '240 seconds', people_referenced: ['Sue Johnson'], theories_referenced: ['EFT'], injectable: true },
  { code: 'SC_PP_16', kind: 'pillar_practice', pillar_id: 'social_connectivity', title: 'Social Courage Practice', subheadline: 'Take relational risks', duration: '180 seconds', people_referenced: ['Brené Brown'], theories_referenced: ['Vulnerability'], injectable: true },
  { code: 'SC_PP_17', kind: 'pillar_practice', pillar_id: 'social_connectivity', title: 'Forgiveness Process', subheadline: 'Release resentment, reclaim peace', duration: '300 seconds', people_referenced: ['Everett Worthington'], theories_referenced: ['Forgiveness Science'], injectable: true },
  { code: 'SC_PP_18', kind: 'pillar_practice', pillar_id: 'social_connectivity', title: 'Mirror Exercise', subheadline: 'Build self-compassion through relating', duration: '180 seconds', people_referenced: ['Kristin Neff'], theories_referenced: ['Self-Compassion'], injectable: true },
  { code: 'SC_PP_19', kind: 'pillar_practice', pillar_id: 'social_connectivity', title: 'Connection Inventory', subheadline: 'Map your relational ecosystem', duration: '240 seconds', people_referenced: ['Robert Putnam'], theories_referenced: ['Social Capital'], injectable: true },
  { code: 'SC_PP_20', kind: 'pillar_practice', pillar_id: 'social_connectivity', title: 'Integration: Relational Health Check', subheadline: 'Assess and adjust your connections', duration: '240 seconds', people_referenced: ['John Gottman'], theories_referenced: ['Relationship Assessment'], injectable: true },
];

// 40 BLOCKS
export const socialConnectivityBlocks: SCBlock[] = [
  { code: 'SC_BL_01', kind: 'block', pillar_id: 'social_connectivity', title: 'Attachment Theory Explained', subheadline: 'Why early bonds shape adult relationships', word_count: 1200, practices_injected: ['SC_PP_01'], people_referenced: ['John Bowlby', 'Mary Ainsworth'], theories_referenced: ['Attachment Theory'] },
  { code: 'SC_BL_02', kind: 'block', pillar_id: 'social_connectivity', title: 'The Science of Connection', subheadline: 'Why we are wired to need each other', word_count: 1150, practices_injected: ['SC_PP_02'], people_referenced: ['Matthew Lieberman'], theories_referenced: ['Social Brain'] },
  { code: 'SC_BL_03', kind: 'block', pillar_id: 'social_connectivity', title: 'Vulnerability as Strength', subheadline: 'Brené Brown\'s research on connection', word_count: 1200, practices_injected: ['SC_PP_03'], people_referenced: ['Brené Brown'], theories_referenced: ['Vulnerability Research'] },
  { code: 'SC_BL_04', kind: 'block', pillar_id: 'social_connectivity', title: 'The Art of Listening', subheadline: 'Why presence matters more than advice', word_count: 1100, practices_injected: ['SC_PP_04'], people_referenced: ['Carl Rogers'], theories_referenced: ['Active Listening'] },
  { code: 'SC_BL_05', kind: 'block', pillar_id: 'social_connectivity', title: 'Rupture and Repair', subheadline: 'Why disconnection is inevitable and healing is possible', word_count: 1200, practices_injected: ['SC_PP_05'], people_referenced: ['Ed Tronick', 'John Gottman'], theories_referenced: ['Repair Research'] },
  { code: 'SC_BL_06', kind: 'block', pillar_id: 'social_connectivity', title: 'Boundaries Are Connection', subheadline: 'Why limits create safety', word_count: 1150, practices_injected: ['SC_PP_06'], people_referenced: ['Brené Brown'], theories_referenced: ['Boundary Work'] },
  { code: 'SC_BL_07', kind: 'block', pillar_id: 'social_connectivity', title: 'The Loneliness Epidemic', subheadline: 'Understanding social pain', word_count: 1200, practices_injected: ['SC_PP_07'], people_referenced: ['John Cacioppo', 'Julianne Holt-Lunstad'], theories_referenced: ['Loneliness Science'] },
  { code: 'SC_BL_08', kind: 'block', pillar_id: 'social_connectivity', title: 'Empathy Without Burnout', subheadline: 'Feel with, not for', word_count: 1100, practices_injected: ['SC_PP_08'], people_referenced: ['Daniel Stern'], theories_referenced: ['Attunement'] },
  { code: 'SC_BL_09', kind: 'block', pillar_id: 'social_connectivity', title: 'Tend-and-Befriend Response', subheadline: 'Connection as stress buffer', word_count: 1150, practices_injected: ['SC_PP_09'], people_referenced: ['Shelley Taylor'], theories_referenced: ['Social Stress Response'] },
  { code: 'SC_BL_10', kind: 'block', pillar_id: 'social_connectivity', title: 'Gratitude in Relationships', subheadline: 'Why appreciation strengthens bonds', word_count: 1100, practices_injected: ['SC_PP_10'], people_referenced: ['Sara Algoe'], theories_referenced: ['Gratitude Research'] },
  { code: 'SC_BL_11', kind: 'block', pillar_id: 'social_connectivity', title: 'Nonviolent Communication', subheadline: 'Marshall Rosenberg\'s framework', word_count: 1200, people_referenced: ['Marshall Rosenberg'], theories_referenced: ['NVC'] },
  { code: 'SC_BL_12', kind: 'block', pillar_id: 'social_connectivity', title: 'Social Pain Is Real Pain', subheadline: 'Rejection activates the same brain regions as physical pain', word_count: 1150, people_referenced: ['Matthew Lieberman'], theories_referenced: ['Social Neuroscience'] },
  { code: 'SC_BL_13', kind: 'block', pillar_id: 'social_connectivity', title: 'Secure Attachment in Adulthood', subheadline: 'Earned security is possible', word_count: 1200, people_referenced: ['Mary Main'], theories_referenced: ['Adult Attachment Interview'] },
  { code: 'SC_BL_14', kind: 'block', pillar_id: 'social_connectivity', title: 'The Still Face Experiment', subheadline: 'What happens when connection breaks', word_count: 1100, people_referenced: ['Ed Tronick'], theories_referenced: ['Rupture Research'] },
  { code: 'SC_BL_15', kind: 'block', pillar_id: 'social_connectivity', title: 'EFT: Hold Me Tight', subheadline: 'Sue Johnson\'s attachment-focused therapy', word_count: 1200, people_referenced: ['Sue Johnson'], theories_referenced: ['Emotionally Focused Therapy'] },
  { code: 'SC_BL_16', kind: 'block', pillar_id: 'social_connectivity', title: 'The Four Horsemen of Relationships', subheadline: 'Gottman\'s predictors of disconnection', word_count: 1150, people_referenced: ['John Gottman'], theories_referenced: ['Relationship Research'] },
  { code: 'SC_BL_17', kind: 'block', pillar_id: 'social_connectivity', title: 'Shame and Connection', subheadline: 'Why hiding maintains isolation', word_count: 1200, people_referenced: ['Brené Brown'], theories_referenced: ['Shame Resilience'] },
  { code: 'SC_BL_18', kind: 'block', pillar_id: 'social_connectivity', title: 'Forgiveness as Freedom', subheadline: 'The science of letting go', word_count: 1100, people_referenced: ['Everett Worthington'], theories_referenced: ['Forgiveness Research'] },
  { code: 'SC_BL_19', kind: 'block', pillar_id: 'social_connectivity', title: 'Self-Compassion as Self-Relating', subheadline: 'The relationship with yourself', word_count: 1150, people_referenced: ['Kristin Neff'], theories_referenced: ['Self-Compassion'] },
  { code: 'SC_BL_20', kind: 'block', pillar_id: 'social_connectivity', title: 'Social Capital and Wellbeing', subheadline: 'Why community matters', word_count: 1200, people_referenced: ['Robert Putnam'], theories_referenced: ['Social Capital'] },
  { code: 'SC_BL_21', kind: 'block', pillar_id: 'social_connectivity', title: 'Mirror Neurons and Empathy', subheadline: 'The neuroscience of connection', word_count: 1150, people_referenced: ['Giacomo Rizzolatti'], theories_referenced: ['Mirror Neuron System'] },
  { code: 'SC_BL_22', kind: 'block', pillar_id: 'social_connectivity', title: 'Attachment Injuries', subheadline: 'When trust breaks', word_count: 1200, people_referenced: ['Sue Johnson'], theories_referenced: ['EFT'] },
  { code: 'SC_BL_23', kind: 'block', pillar_id: 'social_connectivity', title: 'Contact Comfort', subheadline: 'Harry Harlow\'s research on touch', word_count: 1100, people_referenced: ['Harry Harlow'], theories_referenced: ['Attachment Research'] },
  { code: 'SC_BL_24', kind: 'block', pillar_id: 'social_connectivity', title: 'The Social Engagement System', subheadline: 'Porges\' third pathway', word_count: 1200, people_referenced: ['Stephen Porges'], theories_referenced: ['Polyvagal Theory'] },
  { code: 'SC_BL_25', kind: 'block', pillar_id: 'social_connectivity', title: 'Relational Neuroscience', subheadline: 'How connection shapes the brain', word_count: 1150, people_referenced: ['Allan Schore'], theories_referenced: ['Affect Regulation'] },
  { code: 'SC_BL_26', kind: 'block', pillar_id: 'social_connectivity', title: 'Bids for Connection', subheadline: 'Gottman\'s micro-moments of connection', word_count: 1100, people_referenced: ['John Gottman'], theories_referenced: ['Sound Relationship House'] },
  { code: 'SC_BL_27', kind: 'block', pillar_id: 'social_connectivity', title: 'Attunement in Relationships', subheadline: 'Feeling felt', word_count: 1200, people_referenced: ['Daniel Siegel'], theories_referenced: ['Interpersonal Neurobiology'] },
  { code: 'SC_BL_28', kind: 'block', pillar_id: 'social_connectivity', title: 'Co-Regulation Explained', subheadline: 'We regulate through each other', word_count: 1150, people_referenced: ['Stephen Porges', 'Sue Johnson'], theories_referenced: ['Polyvagal', 'EFT'] },
  { code: 'SC_BL_29', kind: 'block', pillar_id: 'social_connectivity', title: 'Healthy Dependence', subheadline: 'Why needing others isn\'t weakness', word_count: 1100, people_referenced: ['Sue Johnson'], theories_referenced: ['Attachment Science'] },
  { code: 'SC_BL_30', kind: 'block', pillar_id: 'social_connectivity', title: 'Repair After Betrayal', subheadline: 'Can trust be rebuilt?', word_count: 1200, people_referenced: ['Esther Perel', 'John Gottman'], theories_referenced: ['Infidelity Research'] },
  { code: 'SC_BL_31', kind: 'block', pillar_id: 'social_connectivity', title: 'Loneliness and Health', subheadline: 'Why isolation is as dangerous as smoking', word_count: 1150, people_referenced: ['Julianne Holt-Lunstad'], theories_referenced: ['Loneliness Mortality'] },
  { code: 'SC_BL_32', kind: 'block', pillar_id: 'social_connectivity', title: 'Assertiveness Without Aggression', subheadline: 'The middle path', word_count: 1100, people_referenced: ['Marshall Rosenberg'], theories_referenced: ['NVC'] },
  { code: 'SC_BL_33', kind: 'block', pillar_id: 'social_connectivity', title: 'Narrative Identity', subheadline: 'The stories we tell shape connection', word_count: 1200, people_referenced: ['Dan McAdams'], theories_referenced: ['Life Story'] },
  { code: 'SC_BL_34', kind: 'block', pillar_id: 'social_connectivity', title: 'Compassionate Confrontation', subheadline: 'Address harm without attacking', word_count: 1150, people_referenced: ['Harriet Lerner'], theories_referenced: ['Healthy Conflict'] },
  { code: 'SC_BL_35', kind: 'block', pillar_id: 'social_connectivity', title: 'The Pursuer-Withdrawer Dynamic', subheadline: 'Breaking the cycle', word_count: 1100, people_referenced: ['Sue Johnson'], theories_referenced: ['EFT Cycles'] },
  { code: 'SC_BL_36', kind: 'block', pillar_id: 'social_connectivity', title: 'Emotional Contagion in Relationships', subheadline: 'How emotions spread', word_count: 1200, people_referenced: ['Elaine Hatfield'], theories_referenced: ['Emotional Contagion'] },
  { code: 'SC_BL_37', kind: 'block', pillar_id: 'social_connectivity', title: 'Friendship in Adulthood', subheadline: 'Why it gets harder (and how to fix it)', word_count: 1150, people_referenced: ['Robin Dunbar'], theories_referenced: ['Social Brain Hypothesis'] },
  { code: 'SC_BL_38', kind: 'block', pillar_id: 'social_connectivity', title: 'Authentic Relating', subheadline: 'Show up as you are', word_count: 1100, people_referenced: ['Brené Brown'], theories_referenced: ['Authenticity Research'] },
  { code: 'SC_BL_39', kind: 'block', pillar_id: 'social_connectivity', title: 'From Isolation to Connection', subheadline: 'The path back', word_count: 1200, people_referenced: ['John Cacioppo'], theories_referenced: ['Loneliness Intervention'] },
  { code: 'SC_BL_40', kind: 'block', pillar_id: 'social_connectivity', title: 'Building Your Relational System', subheadline: 'Integration and growth', word_count: 1150, people_referenced: ['Sue Johnson'], theories_referenced: ['Secure Attachment'] },
];

// 30 LESSONS
export const socialConnectivityLessons: SCLesson[] = [
  { code: 'SC_ML_01', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Discover Your Attachment Style', subheadline: 'Learn your relational patterns', people_referenced: ['Mary Ainsworth'], theories_referenced: ['Attachment'] },
  { code: 'SC_ML_02', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Practice Bids for Connection', subheadline: 'Notice and respond', people_referenced: ['John Gottman'], theories_referenced: ['Relationship Bids'] },
  { code: 'SC_ML_03', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Vulnerability Practice', subheadline: 'Share something real', people_referenced: ['Brené Brown'], theories_referenced: ['Vulnerability'] },
  { code: 'SC_ML_04', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Active Listening Training', subheadline: 'Be fully present', people_referenced: ['Carl Rogers'], theories_referenced: ['Person-Centered'] },
  { code: 'SC_ML_05', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Repair Conversations', subheadline: 'Reconnect after rupture', people_referenced: ['John Gottman'], theories_referenced: ['Repair'] },
  { code: 'SC_ML_06', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Setting Boundaries', subheadline: 'Limits create safety', people_referenced: ['Brené Brown'], theories_referenced: ['Boundaries'] },
  { code: 'SC_ML_07', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Check Your Social Baseline', subheadline: 'Assess connection level', people_referenced: ['Julianne Holt-Lunstad'], theories_referenced: ['Loneliness'] },
  { code: 'SC_ML_08', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Empathic Attunement', subheadline: 'Feel with someone', people_referenced: ['Daniel Stern'], theories_referenced: ['Attunement'] },
  { code: 'SC_ML_09', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Reach Out When Isolated', subheadline: 'Counter withdrawal', people_referenced: ['Shelley Taylor'], theories_referenced: ['Tend-and-Befriend'] },
  { code: 'SC_ML_10', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Express Gratitude', subheadline: 'Tell someone they matter', people_referenced: ['Sara Algoe'], theories_referenced: ['Gratitude'] },
  { code: 'SC_ML_11', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Assertive Communication', subheadline: 'Express needs clearly', people_referenced: ['Marshall Rosenberg'], theories_referenced: ['NVC'] },
  { code: 'SC_ML_12', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Name Loneliness', subheadline: 'Address social pain', people_referenced: ['John Cacioppo'], theories_referenced: ['Loneliness'] },
  { code: 'SC_ML_13', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Prime Secure Attachment', subheadline: 'Access earned security', people_referenced: ['Mary Main'], theories_referenced: ['Adult Attachment'] },
  { code: 'SC_ML_14', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Recognize Rupture', subheadline: 'Notice disconnection', people_referenced: ['Ed Tronick'], theories_referenced: ['Rupture & Repair'] },
  { code: 'SC_ML_15', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Safe Haven Visualization', subheadline: 'Internalize security', people_referenced: ['Sue Johnson'], theories_referenced: ['EFT'] },
  { code: 'SC_ML_16', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Social Courage', subheadline: 'Take relational risks', people_referenced: ['Brené Brown'], theories_referenced: ['Vulnerability'] },
  { code: 'SC_ML_17', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Forgiveness Process', subheadline: 'Release resentment', people_referenced: ['Everett Worthington'], theories_referenced: ['Forgiveness'] },
  { code: 'SC_ML_18', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Mirror Self-Compassion', subheadline: 'Relate kindly to yourself', people_referenced: ['Kristin Neff'], theories_referenced: ['Self-Compassion'] },
  { code: 'SC_ML_19', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Connection Inventory', subheadline: 'Map your relationships', people_referenced: ['Robert Putnam'], theories_referenced: ['Social Capital'] },
  { code: 'SC_ML_20', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Relational Health Check', subheadline: 'Assess your connections', people_referenced: ['John Gottman'], theories_referenced: ['Relationship Assessment'] },
  { code: 'SC_ML_21', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Understanding Attachment', subheadline: 'Early bonds shape adult relating', people_referenced: ['John Bowlby'], theories_referenced: ['Attachment Theory'] },
  { code: 'SC_ML_22', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'The Social Brain', subheadline: 'Why connection is biological', people_referenced: ['Matthew Lieberman'], theories_referenced: ['Social Neuroscience'] },
  { code: 'SC_ML_23', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Vulnerability as Strength', subheadline: 'Brené Brown\'s research', people_referenced: ['Brené Brown'], theories_referenced: ['Vulnerability Research'] },
  { code: 'SC_ML_24', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'The Art of Listening', subheadline: 'Presence over advice', people_referenced: ['Carl Rogers'], theories_referenced: ['Active Listening'] },
  { code: 'SC_ML_25', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Rupture and Repair', subheadline: 'Disconnection and healing', people_referenced: ['Ed Tronick'], theories_referenced: ['Repair Research'] },
  { code: 'SC_ML_26', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Boundaries Create Safety', subheadline: 'Limits strengthen connection', people_referenced: ['Brené Brown'], theories_referenced: ['Boundary Work'] },
  { code: 'SC_ML_27', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'The Loneliness Epidemic', subheadline: 'Understanding social pain', people_referenced: ['John Cacioppo'], theories_referenced: ['Loneliness Science'] },
  { code: 'SC_ML_28', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Empathy Without Burnout', subheadline: 'Feel with, not for', people_referenced: ['Daniel Stern'], theories_referenced: ['Attunement'] },
  { code: 'SC_ML_29', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Connection as Stress Buffer', subheadline: 'Tend-and-befriend', people_referenced: ['Shelley Taylor'], theories_referenced: ['Social Stress Response'] },
  { code: 'SC_ML_30', kind: 'micro_lesson', pillar_id: 'social_connectivity', title: 'Building Your Relational System', subheadline: 'Integration and next steps', people_referenced: ['Sue Johnson'], theories_referenced: ['Secure Attachment'] },
];

export const socialConnectivityComplete = {
  practices: socialConnectivityPractices,
  blocks: socialConnectivityBlocks,
  lessons: socialConnectivityLessons,
  stats: { total: 90, practices: 20, blocks: 40, lessons: 30 }
};