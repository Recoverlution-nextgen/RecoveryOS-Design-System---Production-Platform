/**
 * Dummy Patient Data Generator
 * Generates 100 patients with varied recovery states
 * 
 * Distribution:
 * - 65% "on track" (green/stable)
 * - 35% "need guidance" (yellow/shifting)
 * - 10% "need help" (red/struggling)
 */

export interface DummyPatient {
  id: string;
  name: string;
  cohort: string;
  enrollmentDate: Date;
  currentWeek: number;
  
  // Recovery State
  status: 'on-track' | 'need-guidance' | 'need-help';
  
  // Momentum Metrics (ST50)
  tempo: {
    daysActive: number;
    totalDays: number;
    averageReturnsPerDay: number;
    longestStreak: number;
    consistency: number;
  };
  
  flow: {
    breadthPercentage: number;
    typesEngaged: number;
    totalSaved: number;
    revisitRate: number;
  };
  
  sync: {
    syncScore: number | null;
    energy: number;
    clarity: number;
    connection: number;
  };
  
  // Brain State (6 Pillars)
  brainState: {
    emotionalRegulation: 'green' | 'orange' | 'red';
    stressResilience: 'green' | 'orange' | 'red';
    socialConnectivity: 'green' | 'orange' | 'red';
    cognitiveReframing: 'green' | 'orange' | 'red';
    identityIntegration: 'green' | 'orange' | 'red';
    decisionMastery: 'green' | 'orange' | 'red';
  };
  
  // Engagement
  lastActive: Date;
  journeyProgress: number; // 0-100%
  navicuesExplored: number;
  favoriteCount: number;
}

// First names pool
const FIRST_NAMES = [
  "Alex", "Jordan", "Casey", "Taylor", "Morgan", "Riley", "Avery", "Quinn", "Reese", "Cameron",
  "Dakota", "Sage", "River", "Rowan", "Skylar", "Phoenix", "Jamie", "Harper", "Emerson", "Blake",
  "Kendall", "Hayden", "Payton", "Parker", "Drew", "Finley", "Charlie", "Peyton", "Rory", "Logan",
  "Sam", "Jesse", "Kai", "Aspen", "Eden", "Ari", "Ellis", "Lennon", "Oakley", "Tatum",
  "Marley", "Elliot", "Sawyer", "Reed", "Harley", "August", "Jules", "Nico", "Shiloh", "River",
  "Winter", "Ocean", "Storm", "Rain", "Sky", "Star", "Luna", "Sol", "Sage", "Bay",
  "Lane", "Gray", "Blue", "Jade", "Ruby", "Ash", "Blair", "Drew", "Flynn", "Kit",
  "Max", "Ray", "Lou", "Jo", "Lee", "Jay", "Cole", "Dean", "Kyle", "Ryan",
  "Sean", "Brett", "Chad", "Dane", "Erik", "Glen", "Heath", "Ivan", "Joel", "Kent",
  "Lance", "Marc", "Neal", "Owen", "Paul", "Ross", "Seth", "Troy", "Wade", "Zane"
];

// Last names pool
const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
  "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
  "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts",
  "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker", "Cruz", "Edwards", "Collins", "Reyes",
  "Stewart", "Morris", "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper",
  "Peterson", "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson",
  "Watson", "Brooks", "Chavez", "Wood", "James", "Bennett", "Gray", "Mendoza", "Ruiz", "Hughes",
  "Price", "Alvarez", "Castillo", "Sanders", "Patel", "Myers", "Long", "Ross", "Foster", "Jimenez"
];

// Cohort names
const COHORTS = [
  "Winter 2025",
  "Spring 2025",
  "Summer 2024",
  "Fall 2024",
  "Winter 2024",
  "Spring 2024"
];

// Random helper
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals: number = 2): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Generate brain state based on status
function generateBrainState(status: DummyPatient['status']): DummyPatient['brainState'] {
  const pillars: Array<keyof DummyPatient['brainState']> = [
    'emotionalRegulation',
    'stressResilience',
    'socialConnectivity',
    'cognitiveReframing',
    'identityIntegration',
    'decisionMastery'
  ];
  
  const state = {} as DummyPatient['brainState'];
  
  if (status === 'on-track') {
    // Mostly green, some orange
    pillars.forEach(pillar => {
      const rand = Math.random();
      state[pillar] = rand < 0.8 ? 'green' : 'orange';
    });
  } else if (status === 'need-guidance') {
    // Mix of green, orange, maybe one red
    pillars.forEach(pillar => {
      const rand = Math.random();
      if (rand < 0.3) state[pillar] = 'green';
      else if (rand < 0.85) state[pillar] = 'orange';
      else state[pillar] = 'red';
    });
  } else {
    // 'need-help' - More orange/red
    pillars.forEach(pillar => {
      const rand = Math.random();
      if (rand < 0.2) state[pillar] = 'green';
      else if (rand < 0.5) state[pillar] = 'orange';
      else state[pillar] = 'red';
    });
  }
  
  return state;
}

// Generate a single patient
function generatePatient(index: number): DummyPatient {
  // Determine status based on distribution
  let status: DummyPatient['status'];
  const rand = Math.random();
  if (rand < 0.65) {
    status = 'on-track';
  } else if (rand < 0.9) {
    status = 'need-guidance';
  } else {
    status = 'need-help';
  }
  
  const name = `${randomChoice(FIRST_NAMES)} ${randomChoice(LAST_NAMES)}`;
  const cohort = randomChoice(COHORTS);
  
  // Enrollment date (within last 6 months)
  const enrollmentDate = randomDate(
    new Date(2024, 6, 1),
    new Date(2025, 0, 15)
  );
  
  // Current week based on enrollment date
  const daysSinceEnrollment = Math.floor((Date.now() - enrollmentDate.getTime()) / (1000 * 60 * 60 * 24));
  const currentWeek = Math.min(Math.floor(daysSinceEnrollment / 7) + 1, 12);
  
  // Last active (within last 7 days for on-track, longer for others)
  const lastActiveDaysAgo = status === 'on-track' 
    ? randomInt(0, 3)
    : status === 'need-guidance'
    ? randomInt(1, 7)
    : randomInt(5, 14);
  const lastActive = new Date(Date.now() - lastActiveDaysAgo * 24 * 60 * 60 * 1000);
  
  // Tempo metrics
  const totalDays = Math.min(daysSinceEnrollment, 30);
  const daysActive = status === 'on-track'
    ? randomInt(Math.floor(totalDays * 0.7), totalDays)
    : status === 'need-guidance'
    ? randomInt(Math.floor(totalDays * 0.4), Math.floor(totalDays * 0.7))
    : randomInt(Math.floor(totalDays * 0.1), Math.floor(totalDays * 0.4));
  
  const averageReturnsPerDay = status === 'on-track'
    ? randomFloat(2, 5, 1)
    : status === 'need-guidance'
    ? randomFloat(1, 3, 1)
    : randomFloat(0.3, 1.5, 1);
  
  const longestStreak = status === 'on-track'
    ? randomInt(7, 21)
    : status === 'need-guidance'
    ? randomInt(3, 10)
    : randomInt(1, 5);
  
  const consistency = Math.round((daysActive / totalDays) * 100);
  
  // Flow metrics
  const typesEngaged = status === 'on-track'
    ? randomInt(4, 6)
    : status === 'need-guidance'
    ? randomInt(2, 4)
    : randomInt(1, 3);
  
  const totalSaved = status === 'on-track'
    ? randomInt(15, 40)
    : status === 'need-guidance'
    ? randomInt(5, 20)
    : randomInt(1, 10);
  
  const revisitRate = status === 'on-track'
    ? randomFloat(0.4, 0.7)
    : status === 'need-guidance'
    ? randomFloat(0.2, 0.5)
    : randomFloat(0.05, 0.3);
  
  const breadthPercentage = (typesEngaged / 6) * 100;
  
  // Sync metrics
  const energy = status === 'on-track'
    ? randomInt(60, 90)
    : status === 'need-guidance'
    ? randomInt(40, 70)
    : randomInt(20, 50);
  
  const clarity = status === 'on-track'
    ? randomInt(60, 90)
    : status === 'need-guidance'
    ? randomInt(40, 70)
    : randomInt(20, 50);
  
  const connection = status === 'on-track'
    ? randomInt(60, 90)
    : status === 'need-guidance'
    ? randomInt(40, 70)
    : randomInt(20, 50);
  
  const syncScore = Math.round((energy + clarity + connection) / 3);
  
  // Journey progress
  const journeyProgress = Math.min(Math.round((currentWeek / 12) * 100), 100);
  
  // Engagement metrics
  const navicuesExplored = status === 'on-track'
    ? randomInt(8, 25)
    : status === 'need-guidance'
    ? randomInt(3, 12)
    : randomInt(0, 5);
  
  const favoriteCount = status === 'on-track'
    ? randomInt(5, 15)
    : status === 'need-guidance'
    ? randomInt(1, 8)
    : randomInt(0, 3);
  
  return {
    id: `patient-${index + 1}`,
    name,
    cohort,
    enrollmentDate,
    currentWeek,
    status,
    tempo: {
      daysActive,
      totalDays,
      averageReturnsPerDay,
      longestStreak,
      consistency
    },
    flow: {
      breadthPercentage,
      typesEngaged,
      totalSaved,
      revisitRate
    },
    sync: {
      syncScore,
      energy,
      clarity,
      connection
    },
    brainState: generateBrainState(status),
    lastActive,
    journeyProgress,
    navicuesExplored,
    favoriteCount
  };
}

// Generate all 100 patients
export function generateDummyPatients(count: number = 100): DummyPatient[] {
  const patients: DummyPatient[] = [];
  
  for (let i = 0; i < count; i++) {
    patients.push(generatePatient(i));
  }
  
  return patients;
}

// Get patient statistics
export function getPatientStatistics(patients: DummyPatient[]) {
  const onTrack = patients.filter(p => p.status === 'on-track').length;
  const needGuidance = patients.filter(p => p.status === 'need-guidance').length;
  const needHelp = patients.filter(p => p.status === 'need-help').length;
  
  return {
    total: patients.length,
    onTrack,
    needGuidance,
    needHelp,
    onTrackPercentage: ((onTrack / patients.length) * 100).toFixed(1),
    needGuidancePercentage: ((needGuidance / patients.length) * 100).toFixed(1),
    needHelpPercentage: ((needHelp / patients.length) * 100).toFixed(1),
    averageTempo: (patients.reduce((sum, p) => sum + p.tempo.averageReturnsPerDay, 0) / patients.length).toFixed(1),
    averageSync: (patients.reduce((sum, p) => sum + (p.sync.syncScore || 0), 0) / patients.length).toFixed(1),
    averageJourneyProgress: (patients.reduce((sum, p) => sum + p.journeyProgress, 0) / patients.length).toFixed(1)
  };
}

// Export a pre-generated set for immediate use
export const DUMMY_PATIENTS = generateDummyPatients(100);
export const PATIENT_STATS = getPatientStatistics(DUMMY_PATIENTS);

console.log('📊 Dummy Patient Data Generated:');
console.log(`Total Patients: ${PATIENT_STATS.total}`);
console.log(`On Track: ${PATIENT_STATS.onTrack} (${PATIENT_STATS.onTrackPercentage}%)`);
console.log(`Need Guidance: ${PATIENT_STATS.needGuidance} (${PATIENT_STATS.needGuidancePercentage}%)`);
console.log(`Need Help: ${PATIENT_STATS.needHelp} (${PATIENT_STATS.needHelpPercentage}%)`);
console.log(`Average Tempo: ${PATIENT_STATS.averageTempo} returns/day`);
console.log(`Average Sync: ${PATIENT_STATS.averageSync}/100`);
console.log(`Average Journey Progress: ${PATIENT_STATS.averageJourneyProgress}%`);
