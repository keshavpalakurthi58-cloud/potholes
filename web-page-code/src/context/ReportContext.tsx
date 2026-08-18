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

  const [badges, setBadges] = useState<CitizenBadge[]>(CITIZEN_BADGES);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(LEADERBOARD_DATA);
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

    // Update Citizen points & profile
    const earnedPoints = 120;
    setCitizen(prev => ({
      ...prev,
      points: prev.points + earnedPoints,
      totalReports: prev.totalReports + 1,
      impactScoreKg: prev.impactScoreKg + (newReport.materialKg || 120),
    }));

    // Add notification
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

    // Notification for update
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
