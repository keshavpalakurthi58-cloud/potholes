import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  Sparkles,
  MapPin,
  Calendar,
  User,
  ExternalLink,
  ChevronRight,
  Shield,
  Layers,
  IndianRupee,
  Cpu,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useReports } from '../context/ReportContext';
import { SeverityBadge, PriorityBadge, StatusBadge, Tag, DemoTag } from '../components/common/Badges';
import { ReportTimeline } from '../components/common/ReportTimeline';
import { DangerMeter } from '../components/common/DangerMeter';
import { RoadHealthGauge } from '../components/common/RoadHealthGauge';
import { BudgetCard } from '../components/common/BudgetCard';
import { TiltCard } from '../components/common/TiltCard';
import { STATUS_STEPS, formatINR } from '../data/mockData';
import { RepairStatus } from '../types';

const SAMPLE_AFTER_PHOTOS = [
  'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
];

export const AdminReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getReportById, updateReportStatus, assignCrewToReport, crews } = useReports();

  const report = id ? getReportById(id) : undefined;

  const [selectedCrewId, setSelectedCrewId] = useState<string>(
    report?.assignedCrew?.teamId || crews[0].teamId
  );
  const [afterPhotoUrl, setAfterPhotoUrl] = useState<string>(
    report?.afterPhotoUrl || SAMPLE_AFTER_PHOTOS[0]
  );
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationFeedback, setVerificationFeedback] = useState<{
    score: number;
    notes: string;
  } | null>(
    report?.aiVerificationScore
      ? { score: report.aiVerificationScore, notes: report.aiVerificationNotes || '' }
      : null
  );

  if (!report) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold text-concrete-900">
          Report Not Found
        </h2>
        <p className="text-sm text-concrete-500">
          The requested municipal incident ID does not exist in the active database.
        </p>
        <Link
          to="/admin"
          className="btn-3d btn-3d-safety py-2 px-5 text-sm mt-2"
        >
          Return to Command Center
        </Link>
      </div>
    );
  }

  const currentStepIndex = STATUS_STEPS.indexOf(report.status as any);
  const nextStatus =
    currentStepIndex < STATUS_STEPS.length - 1
      ? (STATUS_STEPS[currentStepIndex + 1] as RepairStatus)
      : null;

  // Advance report status button handler
  const handleAdvanceStatus = () => {
    if (!nextStatus) return;
    updateReportStatus(report.id, nextStatus, {
      crewId: selectedCrewId,
    });
  };

  // Assign Crew Handler
  const handleAssignCrew = () => {
    assignCrewToReport(report.id, selectedCrewId);
  };

  // Run Before/After AI Quality Verification
  const handleRunAiAudit = async () => {
    setIsVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 1600));

    const score = +(96.0 + Math.random() * 3.8).toFixed(1);
    const notes =
      'Computer vision laser-mesh scan confirms defect perimeter sealed, planar asphalt deviation < 1.8mm. Meets IRC-SP:100 standard.';

    setVerificationFeedback({ score, notes });
    setIsVerifying(false);

    updateReportStatus(report.id, 'AI Verified', {
      afterPhotoUrl,
      verificationScore: score,
      notes,
    });

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 },
      });
    } catch (e) {
      // test fallback
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto pb-16">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-concrete-600 hover:text-concrete-900 bg-asphalt-200 px-3 py-1.5 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Command Center</span>
        </Link>

        <div className="flex items-center gap-2">
          <DemoTag />
          <Tag label="Authority Dispatch Node" variant="concrete" size="sm" />
        </div>
      </div>

      {/* Main Report Header Card */}
      <TiltCard maxTilt={3} className="p-6 sm:p-8 bg-white border border-asphalt-200 shadow-sm flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-mono font-bold text-concrete-600 bg-asphalt-100 px-2.5 py-0.5 rounded border">
                {report.id}
              </span>
              <SeverityBadge severity={report.severity} />
              <PriorityBadge priority={report.priority} />
              <StatusBadge status={report.status} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-concrete-900 mt-1">
              {report.roadName}
            </h1>

            <p className="text-xs sm:text-sm text-concrete-600 flex items-center gap-1.5 flex-wrap">
              <MapPin className="w-3.5 h-3.5 text-route-600 shrink-0" />
              <span>{report.area}, {report.city} ({report.pinCode})</span>
              <span className="text-concrete-300">·</span>
              <User className="w-3.5 h-3.5 text-concrete-400 shrink-0" />
              <span>Reported by {report.reportedBy.name}</span>
              <span className="text-concrete-300">·</span>
              <Calendar className="w-3.5 h-3.5 text-concrete-400 shrink-0" />
              <span>{new Date(report.reportedDate).toLocaleString()}</span>
            </p>
          </div>

          {/* Quick Status Advancement Action */}
          {nextStatus && (
            <div className="flex flex-col gap-1.5 self-start md:self-auto min-w-[200px]">
              <span className="text-[11px] font-mono text-concrete-500">
                Next Lifecycle Stage
              </span>
              <button
                onClick={handleAdvanceStatus}
                className="btn-3d btn-3d-safety py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>Advance to: {nextStatus}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Repair Progression Timeline */}
        <div className="pt-4 border-t border-asphalt-200">
          <span className="text-xs font-bold uppercase tracking-wider text-concrete-600 font-mono block mb-3">
            Municipal Repair Lifecycle Timeline
          </span>
          <ReportTimeline currentStatus={report.status} />
        </div>
      </TiltCard>

      {/* Metrics & Budget Breakdown (Shared components) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Road Health Gauge */}
        <TiltCard maxTilt={5} className="p-6 bg-white border border-asphalt-200 shadow-sm flex flex-col justify-between items-center text-center">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-concrete-500 font-mono">
              Surface Health Score
            </span>
            <DemoTag />
          </div>
          <RoadHealthGauge score={report.healthScore} size={190} />
          <p className="text-xs text-concrete-500 mt-2">
            Surface planar stability index.
          </p>
        </TiltCard>

        {/* Danger Meter Card */}
        <TiltCard maxTilt={5} className="p-6 bg-white border border-asphalt-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-concrete-500 font-mono">
                Hazard Danger Probability
              </span>
              <DemoTag />
            </div>
            <DangerMeter percentage={report.dangerPercentage} />

            <div className="mt-6 pt-4 border-t border-asphalt-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-concrete-500">Cavities:</span>
                <span className="font-bold text-concrete-800 font-mono">{report.potholesCount} Units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-concrete-500">Road Type:</span>
                <span className="font-bold text-concrete-800">{report.roadType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-concrete-500">Traffic Level:</span>
                <span className="font-bold text-concrete-800">{report.trafficLevel} Traffic</span>
              </div>
            </div>
          </div>
        </TiltCard>

        {/* Budget Card Component */}
        <BudgetCard
          costMin={report.estimatedCostMin}
          costMax={report.estimatedCostMax}
          materialCost={report.materialCost}
          labourCost={report.labourCost}
          materialKg={report.materialKg}
          damagedAreaSqM={report.damagedAreaSqM}
        />
      </div>

      {/* Authority Operations Grid: Crew Dispatch & Before/After Verification */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Crew Dispatch & Logistics */}
        <TiltCard maxTilt={4} className="p-6 bg-white border border-asphalt-200 shadow-sm flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-concrete-900 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-safety-600" />
                Dispatch & Crew Assignment
              </h3>
              <Tag label="Operations" variant="safety" size="sm" />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-concrete-700 block mb-1.5 font-mono">
                Assign Municipal Road Squad
              </label>
              <select
                value={selectedCrewId}
                onChange={e => setSelectedCrewId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-asphalt-300 bg-asphalt-50 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-safety-500"
              >
                {crews.map(crew => (
                  <option key={crew.teamId} value={crew.teamId}>
                    {crew.name} · {crew.leadContact}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAssignCrew}
              className="btn-3d btn-3d-concrete py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2"
            >
              <span>Confirm & Dispatch Crew</span>
            </button>

            {report.assignedCrew && (
              <div className="p-3.5 rounded-xl bg-asphalt-50 border border-asphalt-200 text-xs">
                <span className="text-[10px] font-mono uppercase text-concrete-500 font-bold block">
                  Currently Assigned
                </span>
                <p className="font-bold text-concrete-900 mt-0.5">
                  {report.assignedCrew.name}
                </p>
                <p className="text-concrete-600">{report.assignedCrew.leadContact}</p>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-asphalt-100 text-xs text-concrete-500">
            Observer comments: {report.comments || 'Standard municipal report.'}
          </div>
        </TiltCard>

        {/* Right: Before / After AI Surface Verification Tool */}
        <TiltCard maxTilt={4} className="p-6 bg-white border border-asphalt-200 shadow-sm flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-concrete-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-signal-600" />
                Post-Repair Quality Audit (AI)
              </h3>
              <DemoTag />
            </div>

            <p className="text-xs text-concrete-600">
              Upload an "after" photo of the completed patch. The neural laser model verifies asphalt leveling and marks the ticket AI Verified.
            </p>

            {/* Before vs After Photo Comparison Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-concrete-500 block mb-1">
                  Before Repair (Reported)
                </span>
                <div className="rounded-xl overflow-hidden border border-asphalt-300 aspect-video relative">
                  <img
                    src={report.photoUrl}
                    alt="Before damage"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 left-1 bg-hazard-600 text-white text-[9px] font-mono px-1 rounded">
                    DEFECT
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-concrete-500 block mb-1">
                  After Repair (Restored)
                </span>
                <div className="rounded-xl overflow-hidden border border-asphalt-300 aspect-video relative bg-asphalt-100">
                  <img
                    src={afterPhotoUrl}
                    alt="After repair"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 left-1 bg-signal-600 text-white text-[9px] font-mono px-1 rounded">
                    PATCHED
                  </span>
                </div>
              </div>
            </div>

            {/* Run AI Verification Button */}
            <button
              onClick={handleRunAiAudit}
              disabled={isVerifying}
              className="btn-3d btn-3d-signal py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <>
                  <Cpu className="w-4 h-4 animate-spin" />
                  <span>Scanning Planar Smoothness...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run AI Verification Audit</span>
                </>
              )}
            </button>

            {/* Verification Result Callout */}
            {verificationFeedback && (
              <div className="p-3.5 rounded-xl bg-signal-50 border border-signal-300 flex flex-col gap-1 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-signal-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-signal-600" />
                    AI Quality Audit Approved
                  </span>
                  <span className="text-xs font-mono font-extrabold text-signal-800">
                    {verificationFeedback.score}% Score
                  </span>
                </div>
                <p className="text-[11px] text-signal-800 leading-relaxed mt-0.5">
                  {verificationFeedback.notes}
                </p>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-asphalt-100 text-[11px] font-mono text-concrete-500">
            Standard: IRC:SP-100 Guidelines for Pothole Repairs
          </div>
        </TiltCard>
      </div>
    </div>
  );
};
