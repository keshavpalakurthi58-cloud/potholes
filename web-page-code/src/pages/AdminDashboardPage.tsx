import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  AlertTriangle,
  Wrench,
  CheckCircle2,
  Activity,
  Layers,
  IndianRupee,
  Percent,
  Search,
  ExternalLink,
  Shield,
  TrendingUp,
  Download,
  Calendar,
  Radio,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { useReports } from '../context/ReportContext';
import { StatCard } from '../components/common/StatCard';
import { SeverityBadge, StatusBadge, Tag, DemoTag } from '../components/common/Badges';
import {
  REPORTS_OVER_TIME,
  SEVERITY_DISTRIBUTION,
  STATUS_DISTRIBUTION,
  MOST_DAMAGED_CORRIDORS,
  formatINR,
} from '../data/mockData';
import { TiltCard } from '../components/common/TiltCard';

export const AdminDashboardPage: React.FC = () => {
  const { stats, reports } = useReports();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredReports = reports.filter(r => {
    const matchesSearch =
      r.roadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter === 'All') return true;
    if (statusFilter === 'Critical') return r.severity === 'Critical';
    if (statusFilter === 'In Progress') return r.status === 'In Progress' || r.status === 'Assigned';
    if (statusFilter === 'Completed') return r.status === 'Completed' || r.status === 'AI Verified';
    return true;
  });

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-16">
      {/* Top Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-signal-100 text-signal-800 border border-signal-300">
              <span className="w-2 h-2 rounded-full bg-signal-500 animate-ping" />
              System Operational · Live
            </span>
            <Tag label="Bengaluru Municipal Corp (BBMP)" variant="concrete" size="sm" />
            <DemoTag />
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-concrete-900 mt-2">
            Government Command Center
          </h1>
          <p className="text-xs sm:text-sm text-concrete-600">
            Automated road infrastructure health telemetry, crew dispatch, and machine-audited road repairs.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <Link
            to="/map"
            className="btn-3d btn-3d-asphalt py-2 px-4 text-xs font-semibold flex items-center gap-1.5"
          >
            <Radio className="w-3.5 h-3.5 text-route-600" />
            <span>Open GIS Heatmap</span>
          </Link>

          <Link
            to="/report"
            className="btn-3d btn-3d-safety py-2 px-4 text-xs font-semibold flex items-center gap-1.5"
          >
            <span>Log Municipal Defect</span>
          </Link>
        </div>
      </div>

      {/* 8 Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          icon={Layers}
          label="Total Reports"
          value={stats.totalReports}
          subtext="Logged in smart city registry"
          accent="safety"
        />

        <StatCard
          icon={AlertTriangle}
          label="Critical Severity"
          value={stats.criticalCount}
          subtext="Requiring immediate dispatch"
          accent="hazard"
        />

        <StatCard
          icon={Wrench}
          label="Under Active Repair"
          value={stats.underRepairCount}
          subtext="Crews currently on-site"
          accent="caution"
        />

        <StatCard
          icon={CheckCircle2}
          label="Roads Restored"
          value={stats.repairedCount}
          subtext="Potholes filled & compacted"
          accent="signal"
        />

        <StatCard
          icon={Activity}
          label="Avg Road Health"
          value={stats.avgRoadHealth}
          suffix="/100"
          subtext="Corridor planar score"
          accent="route"
        />

        <StatCard
          icon={Shield}
          label="Potholes Detected"
          value={stats.potholesDetected}
          subtext="Total individual cavities"
          accent="orange"
        />

        <StatCard
          icon={IndianRupee}
          label="Total Est. Budget"
          value={`₹${stats.estimatedTotalBudgetLakhs}L`}
          subtext="Material + labour forecast"
          accent="concrete"
        />

        <StatCard
          icon={Percent}
          label="Resolution Rate"
          value={`${stats.repairRatePercentage}%`}
          subtext="Completed / total ratio"
          accent="signal"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Reports Over Time Area Chart (7 cols on lg) */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-asphalt-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-concrete-900">
                Reports Influx vs. Municipal Repairs
              </h3>
              <p className="text-xs text-concrete-500">
                Daily velocity over the last 30-day municipal cycle.
              </p>
            </div>
            <DemoTag />
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REPORTS_OVER_TIME} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="reportsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="repairsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAE2D8" vertical={false} />
                <XAxis dataKey="day" stroke="#6B7280" fontSize={11} tickLine={false} />
                <YAxis stroke="#6B7280" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1D2430',
                    color: '#fff',
                    borderRadius: '12px',
                    fontSize: '12px',
                    border: 'none',
                  }}
                />
                <Area type="monotone" dataKey="reports" stroke="#4F46E5" strokeWidth={2.5} fillOpacity={1} fill="url(#reportsGrad)" name="New Reports" />
                <Area type="monotone" dataKey="repaired" stroke="#059669" strokeWidth={2.5} fillOpacity={1} fill="url(#repairsGrad)" name="Repairs Executed" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Severity Distribution Pie Chart (5 cols on lg) */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-asphalt-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-concrete-900">
                Severity Triage Distribution
              </h3>
              <p className="text-xs text-concrete-500">
                Categorized by AI neural risk model.
              </p>
            </div>
            <DemoTag />
          </div>

          <div className="h-64 sm:h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SEVERITY_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {SEVERITY_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1D2430',
                    color: '#fff',
                    borderRadius: '12px',
                    fontSize: '12px',
                    border: 'none',
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={value => <span className="text-xs text-concrete-700 font-medium">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Analytics: Damaged Corridors & Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Most Damaged Corridors Bar Chart */}
        <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-2xl border border-asphalt-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-concrete-900">
                High-Density Damage Corridors
              </h3>
              <p className="text-xs text-concrete-500">
                Urban sectors prioritized for full structural resurfacing.
              </p>
            </div>
            <DemoTag />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOST_DAMAGED_CORRIDORS} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAE2D8" horizontal={false} />
                <XAxis type="number" stroke="#6B7280" fontSize={11} />
                <YAxis dataKey="area" type="category" stroke="#6B7280" fontSize={11} width={140} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1D2430',
                    color: '#fff',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="damageIndex" fill="#EA580C" radius={[0, 8, 8, 0]} name="Damage Index / 100" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Breakdown Mini Panel */}
        <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-2xl border border-asphalt-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-concrete-900">
                Repair Pipeline Status
              </h3>
              <DemoTag />
            </div>

            <div className="space-y-3 mt-4">
              {STATUS_DISTRIBUTION.map(st => (
                <div key={st.name} className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-concrete-800">{st.name}</span>
                    <span className="font-mono text-concrete-600 font-bold">{st.count} Reports</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-asphalt-200 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(st.count / 50) * 100}%`,
                        backgroundColor: st.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-asphalt-100 flex items-center justify-between text-xs text-concrete-500">
            <span>BBMP Road Works Division</span>
            <span className="font-mono font-bold text-signal-600">84% SLA Met</span>
          </div>
        </div>
      </div>

      {/* Recent Incident Queue & Authority Action Table */}
      <div className="bg-white rounded-2xl border border-asphalt-200 shadow-sm overflow-hidden flex flex-col">
        {/* Table Header Controls */}
        <div className="p-4 sm:p-5 border-b border-asphalt-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-concrete-900">
              Active Municipal Incident Triage Queue
            </h3>
            <p className="text-xs text-concrete-500">
              Inspect citizen reports, assign repair squads, and trigger before/after AI audits.
            </p>
          </div>

          {/* Search + Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-concrete-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search road or ID..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-asphalt-300 bg-asphalt-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-safety-500"
              />
            </div>

            <div className="flex items-center gap-1">
              {['All', 'Critical', 'In Progress', 'Completed'].map(f => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    statusFilter === f
                      ? 'bg-concrete-900 text-white'
                      : 'bg-asphalt-100 hover:bg-asphalt-200 text-concrete-700'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-asphalt-100/70 border-b border-asphalt-200 text-concrete-600 font-mono uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Report ID</th>
                <th className="py-3 px-4">Location / Corridor</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Risk %</th>
                <th className="py-3 px-4">Est. Budget</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-asphalt-100">
              {filteredReports.map(report => (
                <tr key={report.id} className="hover:bg-asphalt-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-concrete-700 whitespace-nowrap">
                    {report.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-concrete-900">{report.roadName}</div>
                    <div className="text-[11px] text-concrete-500">{report.area}</div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <SeverityBadge severity={report.severity} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={report.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-concrete-800 whitespace-nowrap">
                    <span className={report.dangerPercentage > 70 ? 'text-hazard-600' : 'text-concrete-700'}>
                      {report.dangerPercentage}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-concrete-800 whitespace-nowrap font-semibold">
                    {formatINR(report.estimatedCostMin)}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <Link
                      to={`/admin/report/${report.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-safety-50 hover:bg-safety-100 text-safety-700 border border-safety-200 font-semibold transition-colors"
                    >
                      <span>Manage</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
