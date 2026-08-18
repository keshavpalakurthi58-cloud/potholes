export type SeverityLevel = 'Critical' | 'High' | 'Moderate' | 'Low';
export type PriorityLevel = 'Urgent' | 'High' | 'Medium' | 'Low';
export type RepairStatus = 'Reported' | 'Verified' | 'Assigned' | 'In Progress' | 'Completed' | 'AI Verified';
export type RoadType = 'Highway' | 'Main Road' | 'Residential' | 'Street' | 'School Zone' | 'Hospital Zone' | 'Other';
export type TrafficLevel = 'Low' | 'Medium' | 'High';

export interface PotholeReport {
  id: string;
  roadName: string;
  area: string;
  city: string;
  state: string;
  pinCode: string;
  lat: number;
  lng: number;
  severity: SeverityLevel;
  priority: PriorityLevel;
  status: RepairStatus;
  reportedBy: {
    name: string;
    avatar?: string;
    id: string;
  };
  reportedDate: string;
  updatedDate: string;
  roadType: RoadType;
  trafficLevel: TrafficLevel;
  potholesCount: number;
  damagedAreaSqM: number;
  healthScore: number; // 0 to 100
  dangerPercentage: number; // 0 to 100
  estimatedCostMin: number; // in INR
  estimatedCostMax: number; // in INR
  materialCost: number;
  labourCost: number;
  materialKg: number;
  assignedCrew?: {
    teamId: string;
    name: string;
    leadContact: string;
  };
  comments?: string;
  photoUrl: string;
  afterPhotoUrl?: string;
  aiVerificationScore?: number; // percentage improvement e.g. 98%
  aiVerificationNotes?: string;
}

export interface AiAnalysisResult {
  severity: SeverityLevel;
  priority: PriorityLevel;
  healthScore: number;
  dangerPercentage: number;
  potholesCount: number;
  damagedAreaSqM: number;
  estimatedCostMin: number;
  estimatedCostMax: number;
  materialCost: number;
  labourCost: number;
  materialKg: number;
  confidenceScore: number;
  detectedFeatures: string[];
}

export interface CitizenProfile {
  id: string;
  name: string;
  handle: string;
  email: string;
  avatarInitial: string;
  levelTitle: string;
  levelNumber: number;
  points: number;
  nextLevelPoints: number;
  totalReports: number;
  verifiedReports: number;
  fixedCount: number;
  impactScoreKg: number; // e.g. estimated asphalt paved
  joinedDate: string;
}

export interface CitizenBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'reports' | 'verification' | 'impact' | 'speed';
  earned: boolean;
  earnedDate?: string;
  progress?: {
    current: number;
    target: number;
  };
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  avatarInitial: string;
  city: string;
  points: number;
  reportsCount: number;
  badgeCount: number;
  topBadge: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'status_update' | 'reward' | 'urgent_alert' | 'system';
  reportId?: string;
}

export interface DashboardStats {
  totalReports: number;
  criticalCount: number;
  underRepairCount: number;
  repairedCount: number;
  avgRoadHealth: number;
  potholesDetected: number;
  estimatedTotalBudgetLakhs: number;
  repairRatePercentage: number;
}
