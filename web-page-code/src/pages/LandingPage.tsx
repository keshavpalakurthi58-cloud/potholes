import React from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  MapPin,
  Cpu,
  IndianRupee,
  Wrench,
  CheckCheck,
  ArrowRight,
  Building2,
  Users,
  Activity,
  Sparkles,
} from 'lucide-react';
import { HeroRoadScene } from '../components/common/HeroRoadScene';
import { Tag, SeverityBadge, StatusBadge, DemoTag } from '../components/common/Badges';
import { useReports } from '../context/ReportContext';
import { formatINR } from '../data/mockData';

export const LandingPage: React.FC = () => {
  const { stats, reports } = useReports();

  const workflowSteps = [
    {
      step: '01',
      title: 'Capture',
      desc: 'Snap a damage photo with any mobile phone.',
      icon: Camera,
    },
    {
      step: '02',
      title: 'Locate',
      desc: 'High-precision browser GPS pinpoints lane coords.',
      icon: MapPin,
    },
    {
      step: '03',
      title: 'Analyze',
      desc: 'AI neural models calculate depth and hazard risk.',
      icon: Cpu,
    },
    {
      step: '04',
      title: 'Budget',
      desc: 'Auto-estimate mastic asphalt kg and crew cost.',
      icon: IndianRupee,
    },
    {
      step: '05',
      title: 'Repair',
      desc: 'Auto-dispatched civic road crew fills asphalt.',
      icon: Wrench,
    },
    {
      step: '06',
      title: 'Verify',
      desc: 'Post-repair computer vision audits smoothness.',
      icon: CheckCheck,
    },
  ];

  const recentReports = reports.slice(0, 3);

  return (
    <div className="flex flex-col gap-14 sm:gap-18">
      {/* 1. Hero Section */}
      <section className="relative pt-4 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start gap-4">
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-widest rounded-full border border-amber-200">
                Municipal Response System Active
              </span>
              <DemoTag />
            </div>

            <h1 className="font-['Space_Grotesk'] text-4xl sm:text-6xl font-bold leading-[0.98] tracking-tighter text-[#262624]">
              Fixing our <span className="text-[#4F46E5]">streets</span>,<br />
              block by block.
            </h1>

            <p className="text-base sm:text-lg text-[#55524B] max-w-lg leading-relaxed font-['Inter']">
              Empowering citizens to report road hazards in 15 seconds with automated AI depth photogrammetry, risk scoring, and transparent municipal workflow tracking.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <Link
                to="/report"
                className="bg-[#4F46E5] text-white px-6 py-3 rounded font-bold shadow-[0_4px_0_0_#3730A3] active:translate-y-[2px] active:shadow-[0_2px_0_0_#3730A3] hover:bg-[#4338CA] transition-all flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base"
              >
                <span>Report a Pothole</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/admin"
                className="bg-white text-[#262624] border border-[#D1CFB9] px-6 py-3 rounded font-bold shadow-[0_4px_0_0_#D1CFB9] active:translate-y-[2px] active:shadow-[0_2px_0_0_#D1CFB9] hover:bg-[#FAF8F3] transition-all flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base"
              >
                <Building2 className="w-4 h-4 text-[#55524B]" />
                <span>Authority Dashboard</span>
              </Link>
            </div>

            {/* 4-Stat Strip */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-6 border-t border-[#D1CFB9]">
              <div className="p-3.5 bg-white border border-[#D1CFB9] rounded-xl shadow-[0_4px_0_0_#D1CFB9]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#55524B] font-['IBM_Plex_Mono'] block">
                  Total Reports
                </span>
                <span className="text-2xl font-bold font-['IBM_Plex_Mono'] text-[#262624] block mt-1">
                  {stats.totalReports}
                </span>
              </div>

              <div className="p-3.5 bg-white border border-[#D1CFB9] rounded-xl shadow-[0_4px_0_0_#D1CFB9]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#55524B] font-['IBM_Plex_Mono'] block">
                  Potholes Logged
                </span>
                <span className="text-2xl font-bold font-['IBM_Plex_Mono'] text-red-600 block mt-1">
                  {stats.potholesDetected}
                </span>
              </div>

              <div className="p-3.5 bg-white border border-[#D1CFB9] rounded-xl shadow-[0_4px_0_0_#D1CFB9]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#55524B] font-['IBM_Plex_Mono'] block">
                  Roads Repaired
                </span>
                <span className="text-2xl font-bold font-['IBM_Plex_Mono'] text-emerald-600 block mt-1">
                  {stats.repairedCount}
                </span>
              </div>

              <div className="p-3.5 bg-white border border-[#D1CFB9] rounded-xl shadow-[0_4px_0_0_#D1CFB9]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#55524B] font-['IBM_Plex_Mono'] block">
                  Avg. Road Health
                </span>
                <span className="text-2xl font-bold font-['IBM_Plex_Mono'] text-[#4F46E5] block mt-1">
                  {stats.avgRoadHealth}/100
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Signature 3D Road Scene */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <HeroRoadScene />
          </div>
        </div>
      </section>

      {/* 2. Six-Step Workflow Section */}
      <section className="flex flex-col gap-6">
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#55524B] font-['IBM_Plex_Mono']">
            End-to-End Lifecycle
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#262624]">
            How RoadGuard AI Solves Municipal Road Hazards
          </h2>
          <p className="text-xs sm:text-sm text-[#55524B]">
            A continuous loop connecting civic action to computer vision analysis, budget provisioning, and verified repairs.
          </p>
        </div>

        {/* 6-step lifecycle bar */}
        <div className="bg-[#EAE7DC] border border-[#D1CFB9] rounded-2xl overflow-hidden grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y sm:divide-y-0 divide-[#D1CFB9] shadow-[0_4px_0_0_#D1CFB9]">
          {workflowSteps.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-5 flex flex-col items-center text-center gap-3 bg-[#EAE7DC] hover:bg-[#F2F0E9] transition-colors"
              >
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-[#D1CFB9] shadow-[0_2px_0_0_#D1CFB9] text-[#4F46E5]">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-500 font-['IBM_Plex_Mono'] block">
                    STEP {item.step}
                  </span>
                  <h3 className="font-bold text-sm text-[#262624] mt-0.5">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#55524B] mt-1 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Two Audiences Section */}
      <section className="flex flex-col gap-6">
        <div className="text-center max-w-xl mx-auto flex flex-col items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#4F46E5] font-['IBM_Plex_Mono']">
            Dual Workspaces
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#262624]">
            Tailored For Citizens & Municipal Authorities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pitch Citizens */}
          <div className="p-7 bg-white border border-[#D1CFB9] rounded-2xl shadow-[0_4px_0_0_#D1CFB9] flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#4F46E5] text-white flex items-center justify-center shadow-[0_4px_0_0_#3730A3]">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#262624]">
                For Citizens: Report it. Track it. Get credit.
              </h3>
              <p className="text-sm text-[#55524B] leading-relaxed">
                Take a quick snap while commuting. Our AI identifies hazard dimensions, estimates the repair urgency, and sends you live notifications as road crews advance. Earn points and civic achievement badges for making your city safer.
              </p>

              <ul className="space-y-2 text-xs sm:text-sm text-[#262624] mt-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  Instant GPS auto-lock with high accuracy
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  Real-time status progression from Report to Repair
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  Civic rewards, badges, and leaderboard recognition
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-[#D1CFB9]">
              <Link
                to="/report"
                className="bg-[#4F46E5] text-white px-5 py-2.5 rounded font-bold shadow-[0_4px_0_0_#3730A3] active:translate-y-[2px] active:shadow-[0_2px_0_0_#3730A3] hover:bg-[#4338CA] transition-all text-sm inline-flex items-center gap-2"
              >
                <span>Submit Citizen Report</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Pitch Authority */}
          <div className="p-7 bg-white border border-[#D1CFB9] rounded-2xl shadow-[0_4px_0_0_#D1CFB9] flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#262624] text-white flex items-center justify-center shadow-[0_4px_0_0_#191814]">
                <Building2 className="w-6 h-6 text-[#A5B4FC]" />
              </div>
              <h3 className="text-2xl font-bold text-[#262624]">
                For Authorities: Prioritize by risk, not by queue.
              </h3>
              <p className="text-sm text-[#55524B] leading-relaxed">
                Traditional queues treat school zone craters the same as minor sidewalk cracks. RoadGuard AI calculates danger probability, traffic volume, and asphalt tonnage so your road crews deploy where lives and vehicles are at highest risk.
              </p>

              <ul className="space-y-2 text-xs sm:text-sm text-[#262624] mt-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4F46E5]" />
                  Live GIS heatmaps & corridor wear indices
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4F46E5]" />
                  1-Click crew dispatch and automated budget forecasting
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4F46E5]" />
                  Before/After computer vision quality audits
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-[#D1CFB9]">
              <Link
                to="/admin"
                className="bg-[#262624] text-white px-5 py-2.5 rounded font-bold shadow-[0_4px_0_0_#191814] active:translate-y-[2px] active:shadow-[0_2px_0_0_#191814] hover:bg-[#33322E] transition-all text-sm inline-flex items-center gap-2"
              >
                <span>Open Authority Center</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Live Potholes Feed Preview */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-[#262624]">
              Recent Smart City Incident Reports
            </h3>
            <p className="text-xs text-[#55524B]">
              Real-time feed of detected road hazards across city zones.
            </p>
          </div>
          <Link
            to="/reports"
            className="text-xs font-bold text-[#4F46E5] hover:underline flex items-center gap-1"
          >
            View all reports
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentReports.map(report => (
            <div
              key={report.id}
              className="p-4 bg-white border border-[#D1CFB9] rounded-xl shadow-[0_4px_0_0_#D1CFB9] flex flex-col justify-between"
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-mono font-bold text-[#55524B]">
                    {report.id}
                  </span>
                  <StatusBadge status={report.status} size="sm" />
                </div>

                <h4 className="text-sm font-bold text-[#262624] line-clamp-1">
                  {report.roadName}
                </h4>
                <p className="text-xs text-[#55524B] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-sky-600 shrink-0" />
                  {report.area}, {report.city}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <SeverityBadge severity={report.severity} size="sm" />
                  <span className="text-xs font-mono font-bold text-[#262624]">
                    Est. {formatINR(report.estimatedCostMin)}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EAE7DC] flex items-center justify-between text-xs text-[#55524B]">
                <span className="font-['IBM_Plex_Mono']">Danger: {report.dangerPercentage}%</span>
                <Link
                  to={`/admin/report/${report.id}`}
                  className="font-bold text-[#4F46E5] hover:underline"
                >
                  Inspect details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
