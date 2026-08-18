# 📜 Complete Project Codebase — RoadGuard AI

This document contains the complete codebase for **RoadGuard AI (Smart City Pothole & Civic Infrastructure Management Platform)**.

---

## 📑 Table of Contents
1. [Project Configuration](#1-project-configuration)
   - [`package.json`](#packagejson)
   - [`vite.config.ts`](#viteconfigts)
   - [`tsconfig.json`](#tsconfigjson)
   - [`index.html`](#indexhtml)
2. [Application Core](#2-application-core)
   - [`src/main.tsx`](#srcmaintsx)
   - [`src/App.tsx`](#srcapptsx)
   - [`src/index.css`](#srcindexcss)
3. [Types & Context & Mock Data](#3-types--context--mock-data)
   - [`src/types/index.ts`](#srctypesindexts)
   - [`src/context/ReportContext.tsx`](#srccontextreportcontexttsx)
4. [Components & UI Modules](#4-components--ui-modules)
   - [`src/components/common/Navbar.tsx`](#srccomponentscommonnavbartsx)
   - [`src/components/common/Footer.tsx`](#srccomponentscommonfootertsx)
   - [`src/components/common/StatCard.tsx`](#srccomponentscommonstatcardtsx)
   - [`src/components/common/BudgetCard.tsx`](#srccomponentscommonbudgetcardtsx)
   - [`src/components/common/DangerMeter.tsx`](#srccomponentscommondangermetertsx)
   - [`src/components/common/RoadHealthGauge.tsx`](#srccomponentscommonroadhealthgaugetsx)
   - [`src/components/common/ReportTimeline.tsx`](#srccomponentscommonreporttimelinetsx)
   - [`src/components/common/TiltCard.tsx`](#srccomponentscommontiltcardtsx)
   - [`src/components/common/Badges.tsx`](#srccomponentscommonbadgestsx)
   - [`src/components/common/HeroRoadScene.tsx`](#srccomponentscommonheroroadscenetsx)

---

## 1. Project Configuration

### `package.json`
```json
{
  "name": "react-example",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port=3000 --host=0.0.0.0",
    "build": "vite build",
    "preview": "vite preview",
    "clean": "rm -rf dist server.js",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "@google/genai": "^2.4.0",
    "@tailwindcss/vite": "^4.1.14",
    "@types/canvas-confetti": "^1.9.0",
    "@vitejs/plugin-react": "^5.0.4",
    "canvas-confetti": "^1.9.4",
    "dotenv": "^17.2.3",
    "express": "^4.21.2",
    "lucide-react": "^0.546.0",
    "motion": "^12.23.24",
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "react-router-dom": "^7.18.2",
    "recharts": "^3.10.1",
    "vite": "^6.2.3"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "autoprefixer": "^10.4.21",
    "esbuild": "^0.25.0",
    "tailwindcss": "^4.1.14",
    "tsx": "^4.21.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.3",
    "@types/express": "^4.17.21"
  }
}
```

### `vite.config.ts`
```typescript
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
```

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "lib": [
      "ES2022",
      "DOM",
      "DOM.Iterable"
    ],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": [
        "./*"
      ]
    },
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}
```

### `index.html`
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RoadGuard AI — Smart City Pothole Management</title>
    <meta name="description" content="AI-powered pothole detection and municipal repair-management platform for smart cities." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  </head>
  <body class="bg-asphalt-100 text-concrete-900 font-sans antialiased selection:bg-safety-200 selection:text-safety-900 min-h-screen">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 2. Application Core

### `src/main.tsx`
```tsx
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

### `src/App.tsx`
```tsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ReportProvider } from './context/ReportContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LandingPage } from './pages/LandingPage';
import { ReportPage } from './pages/ReportPage';
import { MyReportsPage } from './pages/MyReportsPage';
import { LiveMapPage } from './pages/LiveMapPage';
import { RewardsPage } from './pages/RewardsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminReportDetailPage } from './pages/AdminReportDetailPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <ReportProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-asphalt-100 text-concrete-900 selection:bg-safety-200 selection:text-safety-900">
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/reports" element={<MyReportsPage />} />
              <Route path="/map" element={<LiveMapPage />} />
              <Route path="/rewards" element={<RewardsPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/report/:id" element={<AdminReportDetailPage />} />
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ReportProvider>
  );
}
```

---

## 3. Types & Context & Data

### `src/types/index.ts`
```typescript
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
  aiVerificationScore?: number;
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
  impactScoreKg: number;
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
```

### `src/context/ReportContext.tsx`
```tsx
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { PotholeReport, CitizenProfile, CitizenBadge, LeaderboardEntry, AppNotification, DashboardStats, RepairStatus } from '../types';
import { INITIAL_REPORTS, CURRENT_CITIZEN, CITIZEN_BADGES, LEADERBOARD_DATA, INITIAL_NOTIFICATIONS, REPAIR_CREWS } from '../data/mockData';

interface ReportContextType {
  reports: PotholeReport[];
  citizen: CitizenProfile;
  badges: CitizenBadge[];
  leaderboard: LeaderboardEntry[];
  notifications: AppNotification[];
  stats: DashboardStats;
  addReport: (newReport: Omit<PotholeReport, 'id' | 'reportedDate' | 'updatedDate' | 'reportedBy'>) => PotholeReport;
  updateReportStatus: (id: string, newStatus: RepairStatus, details?: { crewId?: string; afterPhotoUrl?: string; verificationScore?: number; notes?: string }) => void;
  assignCrewToReport: (reportId: string, crewId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  getReportById: (id: string) => PotholeReport | undefined;
  crews: typeof REPAIR_CREWS;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export const ReportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reports, setReports] = useState<PotholeReport[]>(() => {
    const saved = localStorage.getItem('roadguard_reports');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved reports', e);
      }
    }
    return INITIAL_REPORTS;
  });

  const [citizen, setCitizen] = useState<CitizenProfile>(() => {
    const saved = localStorage.getItem('roadguard_citizen');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse citizen profile', e);
      }
    }
    return CURRENT_CITIZEN;
  });

  const [badges] = useState<CitizenBadge[]>(CITIZEN_BADGES);
  const [leaderboard] = useState<LeaderboardEntry[]>(LEADERBOARD_DATA);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  useEffect(() => {
    localStorage.setItem('roadguard_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('roadguard_citizen', JSON.stringify(citizen));
  }, [citizen]);

  const stats: DashboardStats = useMemo(() => {
    const totalReports = reports.length;
    const criticalCount = reports.filter(r => r.severity === 'Critical').length;
    const underRepairCount = reports.filter(r => r.status === 'Assigned' || r.status === 'In Progress').length;
    const repairedCount = reports.filter(r => r.status === 'Completed' || r.status === 'AI Verified').length;
    
    const avgRoadHealth = totalReports > 0 
      ? Math.round(reports.reduce((acc, curr) => acc + curr.healthScore, 0) / totalReports)
      : 70;

    const potholesDetected = reports.reduce((acc, curr) => acc + curr.potholesCount, 0);
    const totalCostSum = reports.reduce((acc, curr) => acc + (curr.estimatedCostMax + curr.estimatedCostMin) / 2, 0);
    const estimatedTotalBudgetLakhs = +(totalCostSum / 100000).toFixed(2);
    const repairRatePercentage = totalReports > 0 ? Math.round((repairedCount / totalReports) * 100) : 0;

    return {
      totalReports,
      criticalCount,
      underRepairCount,
      repairedCount,
      avgRoadHealth,
      potholesDetected,
      estimatedTotalBudgetLakhs,
      repairRatePercentage,
    };
  }, [reports]);

  const addReport = (newReportData: Omit<PotholeReport, 'id' | 'reportedDate' | 'updatedDate' | 'reportedBy'>): PotholeReport => {
    const reportId = `RG-${new Date().getFullYear()}-${Math.floor(8000 + Math.random() * 1999)}`;
    const newReport: PotholeReport = {
      ...newReportData,
      id: reportId,
      reportedBy: {
        id: citizen.id,
        name: citizen.name,
      },
      reportedDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };

    setReports(prev => [newReport, ...prev]);

    const earnedPoints = 120;
    setCitizen(prev => ({
      ...prev,
      points: prev.points + earnedPoints,
      totalReports: prev.totalReports + 1,
      impactScoreKg: prev.impactScoreKg + (newReport.materialKg || 120),
    }));

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Report Submitted +120 Pts',
      message: `Your report ${reportId} on ${newReport.roadName} has been logged and queued for municipal verification.`,
      timestamp: 'Just now',
      read: false,
      type: 'reward',
      reportId,
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newReport;
  };

  const updateReportStatus = (
    id: string,
    newStatus: RepairStatus,
    details?: { crewId?: string; afterPhotoUrl?: string; verificationScore?: number; notes?: string }
  ) => {
    setReports(prev =>
      prev.map(report => {
        if (report.id !== id) return report;

        let assignedCrew = report.assignedCrew;
        if (details?.crewId) {
          assignedCrew = REPAIR_CREWS.find(c => c.teamId === details.crewId) || assignedCrew;
        }

        let newHealth = report.healthScore;
        let newDanger = report.dangerPercentage;

        if (newStatus === 'Completed' || newStatus === 'AI Verified') {
          newHealth = Math.min(98, report.healthScore + 50);
          newDanger = Math.max(5, Math.floor(report.dangerPercentage * 0.15));
        }

        return {
          ...report,
          status: newStatus,
          updatedDate: new Date().toISOString(),
          assignedCrew,
          afterPhotoUrl: details?.afterPhotoUrl || report.afterPhotoUrl,
          aiVerificationScore: details?.verificationScore || report.aiVerificationScore,
          aiVerificationNotes: details?.notes || report.aiVerificationNotes,
          healthScore: newHealth,
          dangerPercentage: newDanger,
        };
      })
    );

    const notifTitle = newStatus === 'AI Verified' ? 'AI Quality Audit Passed +150 Pts' : `Status Updated: ${newStatus}`;
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: notifTitle,
      message: `Report ${id} is now marked as "${newStatus}".`,
      timestamp: 'Just now',
      read: false,
      type: newStatus === 'AI Verified' ? 'reward' : 'status_update',
      reportId: id,
    };
    setNotifications(prev => [newNotif, ...prev]);

    if (newStatus === 'AI Verified') {
      setCitizen(prev => ({
        ...prev,
        points: prev.points + 150,
        fixedCount: prev.fixedCount + 1,
        verifiedReports: prev.verifiedReports + 1,
      }));
    }
  };

  const assignCrewToReport = (reportId: string, crewId: string) => {
    const crew = REPAIR_CREWS.find(c => c.teamId === crewId);
    if (!crew) return;

    setReports(prev =>
      prev.map(r => (r.id === reportId ? { ...r, assignedCrew: crew, status: 'Assigned', updatedDate: new Date().toISOString() } : r))
    );

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `Crew Assigned: ${crew.name}`,
      message: `Assigned to report ${reportId}. Scheduled for swift road rehabilitation.`,
      timestamp: 'Just now',
      read: false,
      type: 'status_update',
      reportId,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getReportById = (id: string) => {
    return reports.find(r => r.id === id);
  };

  return (
    <ReportContext.Provider
      value={{
        reports,
        citizen,
        badges,
        leaderboard,
        notifications,
        stats,
        addReport,
        updateReportStatus,
        assignCrewToReport,
        markNotificationRead,
        markAllNotificationsRead,
        getReportById,
        crews: REPAIR_CREWS,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReports = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error('useReports must be used within a ReportProvider');
  }
  return context;
};
```
