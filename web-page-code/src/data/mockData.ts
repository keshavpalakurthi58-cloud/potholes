import { PotholeReport, CitizenProfile, CitizenBadge, LeaderboardEntry, AppNotification, AiAnalysisResult, RoadType, TrafficLevel } from '../types';

export const REPAIR_CREWS = [
  { teamId: 'crew-alpha', name: 'Rapid Response Unit #4 (Asphalt Patch)', leadContact: 'Supervisor R. Sharma (+91 98450 11204)' },
  { teamId: 'crew-beta', name: 'Metro Heavy Paving Crew #2', leadContact: 'Eng. K. Deshmukh (+91 97312 88410)' },
  { teamId: 'crew-gamma', name: 'Smart Highway Resurfacing Div', leadContact: 'Foreman A. Nair (+91 99014 55219)' },
  { teamId: 'crew-delta', name: 'Civic Quick-Patch Squad #7', leadContact: 'Officer M. Patil (+91 94480 33190)' },
];

export const INITIAL_REPORTS: PotholeReport[] = [
  {
    id: 'RG-2026-8812',
    roadName: 'Outer Ring Road (Near Bellandur Flyover)',
    area: 'Bellandur / EcoWorld',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560103',
    lat: 12.9279,
    lng: 77.6834,
    severity: 'Critical',
    priority: 'Urgent',
    status: 'In Progress',
    reportedBy: { name: 'Keshav Palakurthi', id: 'user-01' },
    reportedDate: '2026-08-16T08:30:00Z',
    updatedDate: '2026-08-17T14:15:00Z',
    roadType: 'Highway',
    trafficLevel: 'High',
    potholesCount: 3,
    damagedAreaSqM: 4.8,
    healthScore: 24,
    dangerPercentage: 88,
    estimatedCostMin: 18500,
    estimatedCostMax: 24000,
    materialCost: 12800,
    labourCost: 8200,
    materialKg: 320,
    assignedCrew: REPAIR_CREWS[0],
    comments: 'Deep rim-bending pothole right on the bus lane merge. Two two-wheelers skidded during morning rain.',
    photoUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'RG-2026-8790',
    roadName: '100 Feet Road, 12th Main Junction',
    area: 'Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560038',
    lat: 12.9719,
    lng: 77.6412,
    severity: 'High',
    priority: 'High',
    status: 'Verified',
    reportedBy: { name: 'Ananya Sen', id: 'user-02' },
    reportedDate: '2026-08-15T11:20:00Z',
    updatedDate: '2026-08-15T16:00:00Z',
    roadType: 'Main Road',
    trafficLevel: 'High',
    potholesCount: 2,
    damagedAreaSqM: 2.9,
    healthScore: 42,
    dangerPercentage: 74,
    estimatedCostMin: 11200,
    estimatedCostMax: 14500,
    materialCost: 7600,
    labourCost: 5200,
    materialKg: 190,
    comments: 'Sub-base erosion expanding rapidly after monsoon showers. High commercial pedestrian traffic.',
    photoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'RG-2026-8754',
    roadName: '80 Feet Road (Opposite Sony World Signal)',
    area: 'Koramangala 4th Block',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560034',
    lat: 12.9345,
    lng: 77.6266,
    severity: 'Critical',
    priority: 'Urgent',
    status: 'AI Verified',
    reportedBy: { name: 'Keshav Palakurthi', id: 'user-01' },
    reportedDate: '2026-08-10T09:15:00Z',
    updatedDate: '2026-08-14T11:45:00Z',
    roadType: 'Main Road',
    trafficLevel: 'High',
    potholesCount: 4,
    damagedAreaSqM: 5.4,
    healthScore: 92,
    dangerPercentage: 12,
    estimatedCostMin: 22000,
    estimatedCostMax: 27500,
    materialCost: 15400,
    labourCost: 9600,
    materialKg: 360,
    assignedCrew: REPAIR_CREWS[1],
    comments: 'Major crater near signal island. Full cold mix & mastic asphalt resurfacing completed.',
    photoUrl: 'https://images.unsplash.com/photo-1578874691223-64558a3ca096?auto=format&fit=crop&w=800&q=80',
    afterPhotoUrl: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80',
    aiVerificationScore: 97.4,
    aiVerificationNotes: 'AI Surface Planar Scan confirms seamless seal, zero edge depressions, IRC-SP:100 compliance standard met.',
  },
  {
    id: 'RG-2026-8740',
    roadName: 'ITPL Main Road (Near Prestige Shantiniketan)',
    area: 'Whitefield',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560066',
    lat: 12.9863,
    lng: 77.7289,
    severity: 'High',
    priority: 'High',
    status: 'Assigned',
    reportedBy: { name: 'Rohit Kulkarni', id: 'user-03' },
    reportedDate: '2026-08-14T15:10:00Z',
    updatedDate: '2026-08-15T09:00:00Z',
    roadType: 'Main Road',
    trafficLevel: 'High',
    potholesCount: 2,
    damagedAreaSqM: 3.2,
    healthScore: 48,
    dangerPercentage: 68,
    estimatedCostMin: 12800,
    estimatedCostMax: 16000,
    materialCost: 8900,
    labourCost: 5500,
    materialKg: 210,
    assignedCrew: REPAIR_CREWS[2],
    comments: 'Large alligator cracking with 8cm depression right in front of tech park exit gate.',
    photoUrl: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'RG-2026-8711',
    roadName: 'Hosur Road Expressway Service Lane',
    area: 'Electronic City Phase 1',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560100',
    lat: 12.8452,
    lng: 77.6602,
    severity: 'Moderate',
    priority: 'Medium',
    status: 'Reported',
    reportedBy: { name: 'Pooja Hegde', id: 'user-04' },
    reportedDate: '2026-08-17T07:45:00Z',
    updatedDate: '2026-08-17T07:45:00Z',
    roadType: 'Highway',
    trafficLevel: 'Medium',
    potholesCount: 1,
    damagedAreaSqM: 1.5,
    healthScore: 65,
    dangerPercentage: 45,
    estimatedCostMin: 6500,
    estimatedCostMax: 8500,
    materialCost: 4200,
    labourCost: 3100,
    materialKg: 95,
    comments: 'Service road opening patch loosening. Can become hazardous if water accumulates.',
    photoUrl: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'RG-2026-8692',
    roadName: 'MG Road Metro Pillar 142',
    area: 'Central Business District',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560001',
    lat: 12.9756,
    lng: 77.6067,
    severity: 'Low',
    priority: 'Low',
    status: 'Completed',
    reportedBy: { name: 'Keshav Palakurthi', id: 'user-01' },
    reportedDate: '2026-08-11T14:20:00Z',
    updatedDate: '2026-08-16T18:00:00Z',
    roadType: 'Main Road',
    trafficLevel: 'High',
    potholesCount: 1,
    damagedAreaSqM: 0.9,
    healthScore: 84,
    dangerPercentage: 18,
    estimatedCostMin: 4200,
    estimatedCostMax: 5500,
    materialCost: 2800,
    labourCost: 2000,
    materialKg: 60,
    assignedCrew: REPAIR_CREWS[3],
    comments: 'Minor trench depression post cable laying. Repaired by civic quick-patch squad.',
    photoUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    afterPhotoUrl: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'RG-2026-8677',
    roadName: 'National Public School Approach Road',
    area: 'HSR Layout Sector 2',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560102',
    lat: 12.9116,
    lng: 77.6473,
    severity: 'High',
    priority: 'Urgent',
    status: 'Verified',
    reportedBy: { name: 'Vikram Mehta', id: 'user-05' },
    reportedDate: '2026-08-17T09:00:00Z',
    updatedDate: '2026-08-17T11:30:00Z',
    roadType: 'School Zone',
    trafficLevel: 'High',
    potholesCount: 3,
    damagedAreaSqM: 3.8,
    healthScore: 38,
    dangerPercentage: 82,
    estimatedCostMin: 14500,
    estimatedCostMax: 19000,
    materialCost: 9800,
    labourCost: 6500,
    materialKg: 250,
    comments: 'School bus route. Deep waterlogged crater poses danger to school vans and cycling students.',
    photoUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'RG-2026-8650',
    roadName: 'Manipal Hospital Access Way',
    area: 'Old Airport Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560017',
    lat: 12.9592,
    lng: 77.6528,
    severity: 'Critical',
    priority: 'Urgent',
    status: 'Assigned',
    reportedBy: { name: 'Dr. S. Bannerjee', id: 'user-06' },
    reportedDate: '2026-08-16T17:15:00Z',
    updatedDate: '2026-08-17T08:00:00Z',
    roadType: 'Hospital Zone',
    trafficLevel: 'High',
    potholesCount: 2,
    damagedAreaSqM: 3.6,
    healthScore: 31,
    dangerPercentage: 91,
    estimatedCostMin: 16000,
    estimatedCostMax: 21000,
    materialCost: 11000,
    labourCost: 7500,
    materialKg: 240,
    assignedCrew: REPAIR_CREWS[0],
    comments: 'Ambulance transit path compromised. Sudden bumps causing distress to critical care patients.',
    photoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'RG-2026-8622',
    roadName: '17th Cross, 5th Main',
    area: 'Malleshwaram',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560003',
    lat: 13.0031,
    lng: 77.5685,
    severity: 'Moderate',
    priority: 'Medium',
    status: 'In Progress',
    reportedBy: { name: 'Keshav Palakurthi', id: 'user-01' },
    reportedDate: '2026-08-13T10:30:00Z',
    updatedDate: '2026-08-17T13:00:00Z',
    roadType: 'Residential',
    trafficLevel: 'Low',
    potholesCount: 2,
    damagedAreaSqM: 2.1,
    healthScore: 58,
    dangerPercentage: 52,
    estimatedCostMin: 8500,
    estimatedCostMax: 11500,
    materialCost: 5800,
    labourCost: 3900,
    materialKg: 135,
    assignedCrew: REPAIR_CREWS[3],
    comments: 'Senior citizen residential sector. Potholes near pedestrian zebra crossing.',
    photoUrl: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'RG-2026-8601',
    roadName: 'Sarjapur-Attibele Highway Road',
    area: 'Sarjapur',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '562125',
    lat: 12.8601,
    lng: 77.7850,
    severity: 'High',
    priority: 'High',
    status: 'Reported',
    reportedBy: { name: 'Arjun Nair', id: 'user-07' },
    reportedDate: '2026-08-17T12:10:00Z',
    updatedDate: '2026-08-17T12:10:00Z',
    roadType: 'Highway',
    trafficLevel: 'High',
    potholesCount: 3,
    damagedAreaSqM: 4.1,
    healthScore: 40,
    dangerPercentage: 76,
    estimatedCostMin: 16500,
    estimatedCostMax: 21500,
    materialCost: 11200,
    labourCost: 7400,
    materialKg: 270,
    comments: 'Heavy aggregate transport corridor. Multiple interconnected surface craters.',
    photoUrl: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'RG-2026-8588',
    roadName: 'Brigade Road Junction',
    area: 'Ashok Nagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560025',
    lat: 12.9733,
    lng: 77.6074,
    severity: 'Low',
    priority: 'Low',
    status: 'AI Verified',
    reportedBy: { name: 'Priya Sharma', id: 'user-08' },
    reportedDate: '2026-08-08T16:40:00Z',
    updatedDate: '2026-08-13T15:20:00Z',
    roadType: 'Main Road',
    trafficLevel: 'High',
    potholesCount: 1,
    damagedAreaSqM: 1.1,
    healthScore: 94,
    dangerPercentage: 8,
    estimatedCostMin: 5000,
    estimatedCostMax: 6500,
    materialCost: 3200,
    labourCost: 2400,
    materialKg: 70,
    assignedCrew: REPAIR_CREWS[3],
    comments: 'Clean edge restoration executed with bitumen emulsion bonding.',
    photoUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    afterPhotoUrl: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80',
    aiVerificationScore: 98.9,
    aiVerificationNotes: 'AI Laser profilometry validated: smoothness index 1.1 IRI (Excellent).',
  },
  {
    id: 'RG-2026-8562',
    roadName: 'Bannerghatta National Park Main Road',
    area: 'Gottigere / Bannerghatta',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560083',
    lat: 12.8633,
    lng: 77.5847,
    severity: 'Moderate',
    priority: 'Medium',
    status: 'Verified',
    reportedBy: { name: 'Karthik Raja', id: 'user-09' },
    reportedDate: '2026-08-15T18:00:00Z',
    updatedDate: '2026-08-16T10:00:00Z',
    roadType: 'Main Road',
    trafficLevel: 'Medium',
    potholesCount: 2,
    damagedAreaSqM: 2.4,
    healthScore: 61,
    dangerPercentage: 48,
    estimatedCostMin: 9800,
    estimatedCostMax: 13000,
    materialCost: 6500,
    labourCost: 4500,
    materialKg: 160,
    comments: 'Surface unraveling along curb edge after seasonal showers.',
    photoUrl: 'https://images.unsplash.com/photo-1578874691223-64558a3ca096?auto=format&fit=crop&w=800&q=80',
  }
];

export const CURRENT_CITIZEN: CitizenProfile = {
  id: 'user-01',
  name: 'Keshav Palakurthi',
  handle: '@keshav_roadguard',
  email: 'keshavpalakurthi58@gmail.com',
  avatarInitial: 'KP',
  levelTitle: 'Civic Gold Guardian',
  levelNumber: 4,
  points: 1840,
  nextLevelPoints: 2500,
  totalReports: 14,
  verifiedReports: 12,
  fixedCount: 9,
  impactScoreKg: 1420,
  joinedDate: 'March 2025',
};

export const CITIZEN_BADGES: CitizenBadge[] = [
  {
    id: 'b-first-fix',
    title: 'First Responder',
    description: 'Submitted first AI-validated pothole report.',
    icon: 'ShieldCheck',
    category: 'reports',
    earned: true,
    earnedDate: 'Mar 18, 2025',
  },
  {
    id: 'b-sharp-eye',
    title: 'Precision Scanner',
    description: 'Achieved 95%+ AI geo-accuracy on 10 reports.',
    icon: 'Crosshair',
    category: 'verification',
    earned: true,
    earnedDate: 'May 04, 2025',
  },
  {
    id: 'b-danger-defuser',
    title: 'Hazard Neutralizer',
    description: 'Reported 5 Critical Severity potholes that were repaired within 48 hours.',
    icon: 'AlertTriangle',
    category: 'impact',
    earned: true,
    earnedDate: 'Jul 22, 2025',
  },
  {
    id: 'b-tonnage-hero',
    title: '1-Ton Pavement Hero',
    description: 'Facilitated over 1,000 kg of municipal asphalt resurfacing.',
    icon: 'Truck',
    category: 'impact',
    earned: true,
    earnedDate: 'Aug 02, 2026',
  },
  {
    id: 'b-school-safe',
    title: 'School Zone Sentinel',
    description: 'Reported 3 potholes within designated school safety corridors.',
    icon: 'GraduationCap',
    category: 'speed',
    earned: false,
    progress: { current: 2, target: 3 },
  },
  {
    id: 'b-master-auditor',
    title: 'Master Road Auditor',
    description: 'Complete 25 verified municipal reports across 5 different city zones.',
    icon: 'Award',
    category: 'verification',
    earned: false,
    progress: { current: 14, target: 25 },
  }
];

export const LEADERBOARD_DATA: LeaderboardEntry[] = [
  {
    rank: 1,
    id: 'user-01',
    name: 'Keshav Palakurthi',
    avatarInitial: 'KP',
    city: 'Bengaluru (East)',
    points: 1840,
    reportsCount: 14,
    badgeCount: 4,
    topBadge: '1-Ton Pavement Hero',
  },
  {
    rank: 2,
    id: 'user-02',
    name: 'Meera Nambiar',
    avatarInitial: 'MN',
    city: 'Bengaluru (South)',
    points: 1690,
    reportsCount: 13,
    badgeCount: 4,
    topBadge: 'Hazard Neutralizer',
  },
  {
    rank: 3,
    id: 'user-03',
    name: 'Aditya S. Varma',
    avatarInitial: 'AV',
    city: 'Bengaluru (Central)',
    points: 1420,
    reportsCount: 11,
    badgeCount: 3,
    topBadge: 'Precision Scanner',
  },
  {
    rank: 4,
    id: 'user-04',
    name: 'Tanvi Agarwal',
    avatarInitial: 'TA',
    city: 'Bengaluru (North)',
    points: 1180,
    reportsCount: 9,
    badgeCount: 3,
    topBadge: 'First Responder',
  },
  {
    rank: 5,
    id: 'user-05',
    name: 'Gaurav Sen',
    avatarInitial: 'GS',
    city: 'Bengaluru (West)',
    points: 980,
    reportsCount: 7,
    badgeCount: 2,
    topBadge: 'First Responder',
  },
  {
    rank: 6,
    id: 'user-06',
    name: 'Rhea Chakraborty',
    avatarInitial: 'RC',
    city: 'Bengaluru (East)',
    points: 840,
    reportsCount: 6,
    badgeCount: 2,
    topBadge: 'Precision Scanner',
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Repair In Progress',
    message: 'Rapid Response Unit #4 was dispatched to Outer Ring Road (Bellandur).',
    timestamp: '2 hours ago',
    read: false,
    type: 'status_update',
    reportId: 'RG-2026-8812',
  },
  {
    id: 'notif-2',
    title: 'AI Verification Succeeded +150 Pts',
    message: 'Report RG-2026-8754 (Koramangala 4th Block) verified repaired with 97.4% smooth score!',
    timestamp: '1 day ago',
    read: false,
    type: 'reward',
    reportId: 'RG-2026-8754',
  },
  {
    id: 'notif-3',
    title: 'New High Priority Zone',
    message: 'Heavy rain alert issued for Indiranagar sector. Accelerated inspection active.',
    timestamp: '2 days ago',
    read: true,
    type: 'urgent_alert',
  },
  {
    id: 'notif-4',
    title: 'Badge Unlocked: 1-Ton Hero',
    message: 'Your reports crossed 1,000 kg of municipal asphalt resurfacing.',
    timestamp: '3 days ago',
    read: true,
    type: 'reward',
  }
];

export const REPORTS_OVER_TIME = [
  { day: 'Aug 01', reports: 12, repaired: 8 },
  { day: 'Aug 04', reports: 19, repaired: 14 },
  { day: 'Aug 07', reports: 28, repaired: 20 },
  { day: 'Aug 10', reports: 22, repaired: 19 },
  { day: 'Aug 13', reports: 35, repaired: 27 },
  { day: 'Aug 16', reports: 41, repaired: 32 },
  { day: 'Aug 18', reports: 16, repaired: 12 },
];

export const SEVERITY_DISTRIBUTION = [
  { name: 'Critical', value: 28, color: 'var(--color-hazard-500)' },
  { name: 'High', value: 34, color: 'var(--color-orange-500)' },
  { name: 'Moderate', value: 26, color: 'var(--color-caution-500)' },
  { name: 'Low', value: 12, color: 'var(--color-signal-500)' },
];

export const STATUS_DISTRIBUTION = [
  { name: 'Reported', count: 18, color: '#94A3B8' },
  { name: 'Verified', count: 24, color: '#38BDF8' },
  { name: 'Assigned', count: 16, color: '#818CF8' },
  { name: 'In Progress', count: 22, color: '#FBBF24' },
  { name: 'Completed', count: 35, color: '#34D399' },
  { name: 'AI Verified', count: 42, color: '#059669' },
];

export const MOST_DAMAGED_CORRIDORS = [
  { area: 'Outer Ring Road (Bellandur-Marathahalli)', damageIndex: 92, count: 18, avgCost: '₹3.4L' },
  { area: 'Indiranagar 100ft & CMH Road', damageIndex: 78, count: 14, avgCost: '₹2.1L' },
  { area: 'Whitefield ITPL Main Rd', damageIndex: 71, count: 12, avgCost: '₹1.9L' },
  { area: 'Sarjapur-Attibele Corridor', damageIndex: 65, count: 11, avgCost: '₹1.8L' },
  { area: 'Koramangala 80ft & Intermediate Ring', damageIndex: 54, count: 9, avgCost: '₹1.4L' },
];

export const STATUS_STEPS = [
  'Reported',
  'Verified',
  'Assigned',
  'In Progress',
  'Completed',
  'AI Verified',
] as const;

/**
 * Realistic AI analyzer simulation that evaluates photos and contextual data
 */
export async function runDemoAiAnalysis(
  imageNameOrUrl: string,
  roadType: RoadType = 'Main Road',
  traffic: TrafficLevel = 'Medium'
): Promise<AiAnalysisResult> {
  // simulate realistic AI neural inference delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  // Determine severity weighted by road type + traffic
  const isHighRiskZone = roadType === 'Highway' || roadType === 'Hospital Zone' || roadType === 'School Zone';
  const isHighTraffic = traffic === 'High';

  let severity: 'Critical' | 'High' | 'Moderate' | 'Low' = 'Moderate';
  let priority: 'Urgent' | 'High' | 'Medium' | 'Low' = 'Medium';
  let healthScore = 52;
  let dangerPercentage = 58;
  let potholesCount = 2;
  let damagedAreaSqM = 2.8;

  if (isHighRiskZone && isHighTraffic) {
    severity = 'Critical';
    priority = 'Urgent';
    healthScore = Math.floor(20 + Math.random() * 15); // 20-35
    dangerPercentage = Math.floor(82 + Math.random() * 14); // 82-96
    potholesCount = Math.floor(2 + Math.random() * 3);
    damagedAreaSqM = +(3.5 + Math.random() * 2.2).toFixed(1);
  } else if (isHighRiskZone || isHighTraffic) {
    severity = 'High';
    priority = 'High';
    healthScore = Math.floor(38 + Math.random() * 20); // 38-58
    dangerPercentage = Math.floor(65 + Math.random() * 18); // 65-83
    potholesCount = Math.floor(1 + Math.random() * 3);
    damagedAreaSqM = +(2.2 + Math.random() * 1.8).toFixed(1);
  } else {
    const roll = Math.random();
    if (roll > 0.6) {
      severity = 'Moderate';
      priority = 'Medium';
      healthScore = Math.floor(55 + Math.random() * 18);
      dangerPercentage = Math.floor(40 + Math.random() * 20);
      potholesCount = 1;
      damagedAreaSqM = +(1.2 + Math.random() * 1.2).toFixed(1);
    } else {
      severity = 'Low';
      priority = 'Low';
      healthScore = Math.floor(75 + Math.random() * 15);
      dangerPercentage = Math.floor(15 + Math.random() * 20);
      potholesCount = 1;
      damagedAreaSqM = +(0.6 + Math.random() * 0.8).toFixed(1);
    }
  }

  const materialKg = Math.round(damagedAreaSqM * 65);
  const materialCost = Math.round(materialKg * 42); // ~₹42/kg asphalt mastic compound
  const labourCost = Math.round(damagedAreaSqM * 1650);
  const totalBase = materialCost + labourCost;
  const estimatedCostMin = Math.round(totalBase * 0.9);
  const estimatedCostMax = Math.round(totalBase * 1.2);

  const detectedFeatures = [
    'Deep Asphalt Rim Cavity (> 65mm)',
    'Sub-base Moisture Intrusion',
    'Alligator Crack Propagation',
    'High Speed Transit Corridor Risk',
  ];

  return {
    severity,
    priority,
    healthScore,
    dangerPercentage,
    potholesCount,
    damagedAreaSqM,
    estimatedCostMin,
    estimatedCostMax,
    materialCost,
    labourCost,
    materialKg,
    confidenceScore: +(94.5 + Math.random() * 4.8).toFixed(1),
    detectedFeatures,
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
