import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  IndianRupee,
  Search,
  Filter,
  PlusCircle,
  Clock,
  Sparkles,
  ExternalLink,
  Layers,
  Wrench,
  AlertTriangle,
} from 'lucide-react';
import { useReports } from '../context/ReportContext';
import { SeverityBadge, PriorityBadge, StatusBadge, Tag, DemoTag } from '../components/common/Badges';
import { ReportTimeline } from '../components/common/ReportTimeline';
import { TiltCard } from '../components/common/TiltCard';
import { formatINR } from '../data/mockData';

export const MyReportsPage: React.FC = () => {
  const { reports, citizen } = useReports();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Filter reports
  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchesSearch =
        report.roadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.id.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (statusFilter === 'All') return true;
      if (statusFilter === 'Under Repair') return report.status === 'Assigned' || report.status === 'In Progress';
      if (statusFilter === 'Repaired') return report.status === 'Completed' || report.status === 'AI Verified';
      if (statusFilter === 'Critical') return report.severity === 'Critical';
      if (statusFilter === 'Reported') return report.status === 'Reported' || report.status === 'Verified';

      return true;
    });
  }, [reports, searchTerm, statusFilter]);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-12">
      {/* Top Header & Citizen Status Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Tag label="Citizen Audit Portal" variant="safety" size="sm" />
            <DemoTag />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-concrete-900 mt-1">
            My Submitted Road Reports
          </h1>
          <p className="text-xs sm:text-sm text-concrete-600">
            Real-time tracking of civic reports submitted by {citizen.name} ({citizen.handle}).
          </p>
        </div>

        <Link
          to="/report"
          className="btn-3d btn-3d-safety py-2.5 px-5 text-xs sm:text-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Report</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-asphalt-200 shadow-2xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-concrete-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by road, area, or report ID..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-asphalt-300 bg-asphalt-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-safety-500"
          />
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {['All', 'Reported', 'Under Repair', 'Repaired', 'Critical'].map(filter => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === filter
                  ? 'bg-concrete-900 text-white shadow-2xs'
                  : 'bg-asphalt-100 hover:bg-asphalt-200 text-concrete-700 border border-asphalt-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      <div className="flex flex-col gap-3">
        {filteredReports.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-asphalt-200 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-asphalt-100 text-concrete-400 flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-concrete-800">
              No matching reports found
            </p>
            <p className="text-xs text-concrete-500 max-w-sm">
              Try adjusting your search criteria or submit a new pothole report.
            </p>
            <Link
              to="/report"
              className="btn-3d btn-3d-safety py-2 px-4 text-xs mt-2"
            >
              Submit Pothole Report
            </Link>
          </div>
        ) : (
          filteredReports.map(report => {
            const isExpanded = expandedId === report.id;

            return (
              <div
                key={report.id}
                className={`rounded-2xl border transition-all ${
                  isExpanded
                    ? 'bg-white border-safety-400 shadow-md ring-1 ring-safety-200'
                    : 'bg-white hover:bg-asphalt-50/50 border-asphalt-200 shadow-2xs'
                }`}
              >
                {/* Summary Row */}
                <div
                  onClick={() => toggleExpand(report.id)}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  {/* Left: Thumbnail + Identification */}
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={report.photoUrl}
                      alt={report.roadName}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-asphalt-300 shrink-0 shadow-xs"
                    />

                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-concrete-500">
                          {report.id}
                        </span>
                        <StatusBadge status={report.status} size="sm" />
                        <SeverityBadge severity={report.severity} size="sm" />
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-concrete-900 truncate">
                        {report.roadName}
                      </h3>

                      <p className="text-xs text-concrete-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-route-600 shrink-0" />
                        {report.area}, {report.city}
                      </p>
                    </div>
                  </div>

                  {/* Right: Cost, Date & Chevron */}
                  <div className="flex items-center justify-between md:justify-end gap-6 pt-2 md:pt-0 border-t md:border-t-0 border-asphalt-100 shrink-0">
                    <div className="flex flex-col text-left md:text-right">
                      <span className="text-[11px] font-mono text-concrete-500">
                        Est. Budget
                      </span>
                      <span className="text-sm font-bold font-mono text-concrete-900">
                        {formatINR(report.estimatedCostMin)} - {formatINR(report.estimatedCostMax)}
                      </span>
                      <span className="text-[10px] text-concrete-400">
                        {new Date(report.reportedDate).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-asphalt-100 flex items-center justify-center text-concrete-600 group-hover:bg-asphalt-200">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-asphalt-200 flex flex-col gap-6 animate-in fade-in">
                    {/* 1. Horizontal Status Progression Timeline */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-concrete-600 font-mono">
                          Municipal Repair Lifecycle Timeline
                        </span>
                        <span className="text-xs text-concrete-500">
                          Last Updated: {new Date(report.updatedDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <ReportTimeline currentStatus={report.status} />
                    </div>

                    {/* 2. Mini-Stat Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      <div className="p-3 rounded-xl bg-asphalt-50 border border-asphalt-200">
                        <span className="text-[11px] font-medium text-concrete-500 block">
                          Pothole Count
                        </span>
                        <span className="text-base font-bold font-display text-concrete-900">
                          {report.potholesCount} Units
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-asphalt-50 border border-asphalt-200">
                        <span className="text-[11px] font-medium text-concrete-500 block">
                          Damaged Area
                        </span>
                        <span className="text-base font-bold font-display text-concrete-900">
                          {report.damagedAreaSqM} m²
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-asphalt-50 border border-asphalt-200">
                        <span className="text-[11px] font-medium text-concrete-500 block">
                          Road Health Score
                        </span>
                        <span className="text-base font-bold font-display text-safety-600">
                          {report.healthScore}/100
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-asphalt-50 border border-asphalt-200">
                        <span className="text-[11px] font-medium text-concrete-500 block">
                          Danger Probability
                        </span>
                        <span className="text-base font-bold font-display text-hazard-600">
                          {report.dangerPercentage}% Risk
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-asphalt-50 border border-asphalt-200 col-span-2 sm:col-span-1">
                        <span className="text-[11px] font-medium text-concrete-500 block">
                          Traffic Volume
                        </span>
                        <span className="text-base font-bold font-display text-concrete-900">
                          {report.trafficLevel}
                        </span>
                      </div>
                    </div>

                    {/* 3. Assigned Crew & Notes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-asphalt-50 border border-asphalt-200 flex flex-col gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-concrete-600 font-mono flex items-center gap-1.5">
                          <Wrench className="w-3.5 h-3.5 text-safety-600" />
                          Municipal Crew Deployment
                        </span>
                        {report.assignedCrew ? (
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-concrete-900">
                              {report.assignedCrew.name}
                            </p>
                            <p className="text-xs text-concrete-600 mt-0.5">
                              {report.assignedCrew.leadContact}
                            </p>
                          </div>
                        ) : (
                          <p className="text-xs text-concrete-500 italic">
                            Awaiting priority assignment in municipal queue.
                          </p>
                        )}
                      </div>

                      <div className="p-4 rounded-xl bg-asphalt-50 border border-asphalt-200 flex flex-col gap-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-concrete-600 font-mono">
                          Reporter Observations
                        </span>
                        <p className="text-xs text-concrete-700 leading-relaxed">
                          {report.comments || 'No additional observer notes logged.'}
                        </p>
                      </div>
                    </div>

                    {/* AI Verification Callout if available */}
                    {report.aiVerificationScore && (
                      <div className="p-3.5 rounded-xl bg-signal-50 border border-signal-300 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-signal-600" />
                          <span className="text-xs font-bold text-signal-900">
                            AI Surface Quality Audit: {report.aiVerificationScore}% Improvement Verified
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-signal-700">
                          +150 PTS EARNED
                        </span>
                      </div>
                    )}

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-asphalt-200">
                      <span className="text-xs font-mono text-concrete-500">
                        GPS: {report.lat}, {report.lng} · {report.roadType}
                      </span>
                      <Link
                        to={`/admin/report/${report.id}`}
                        className="text-xs font-bold text-safety-700 hover:text-safety-900 flex items-center gap-1"
                      >
                        <span>Open Authority Inspection View</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
