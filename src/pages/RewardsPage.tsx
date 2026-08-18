import React, { useState } from 'react';
import {
  Award,
  Trophy,
  Medal,
  ShieldCheck,
  Crosshair,
  AlertTriangle,
  Truck,
  GraduationCap,
  Sparkles,
  Zap,
  CheckCircle2,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useReports } from '../context/ReportContext';
import { Tag, DemoTag } from '../components/common/Badges';
import { TiltCard } from '../components/common/TiltCard';

const BADGE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  ShieldCheck: ({ className }) => <ShieldCheck className={className} />,
  Crosshair: ({ className }) => <Crosshair className={className} />,
  AlertTriangle: ({ className }) => <AlertTriangle className={className} />,
  Truck: ({ className }) => <Truck className={className} />,
  GraduationCap: ({ className }) => <GraduationCap className={className} />,
  Award: ({ className }) => <Award className={className} />,
};

export const RewardsPage: React.FC = () => {
  const { citizen, badges, leaderboard } = useReports();
  const [activeTab, setActiveTab] = useState<'profile' | 'badges' | 'leaderboard'>('profile');

  const progressPercent = Math.min(100, Math.round((citizen.points / citizen.nextLevelPoints) * 100));

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Tag label="Civic Credit & Incentives" variant="caution" size="sm" />
            <DemoTag />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-concrete-900 mt-1">
            Citizen Recognition & Rewards
          </h1>
          <p className="text-xs sm:text-sm text-concrete-600">
            Earn civic credentials, level up your reporting tier, and track municipal road improvement credits.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-asphalt-200 rounded-2xl self-start sm:self-auto border border-asphalt-300">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-white text-concrete-900 shadow-2xs'
                : 'text-concrete-600 hover:text-concrete-900'
            }`}
          >
            My Profile
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'badges'
                ? 'bg-white text-concrete-900 shadow-2xs'
                : 'text-concrete-600 hover:text-concrete-900'
            }`}
          >
            Badges ({badges.filter(b => b.earned).length}/{badges.length})
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'leaderboard'
                ? 'bg-white text-concrete-900 shadow-2xs'
                : 'text-concrete-600 hover:text-concrete-900'
            }`}
          >
            Leaderboard
          </button>
        </div>
      </div>

      {/* 1. PROFILE TAB */}
      {activeTab === 'profile' && (
        <div className="flex flex-col gap-6">
          {/* Main Citizen Card */}
          <TiltCard maxTilt={4} className="p-6 sm:p-8 bg-white border border-asphalt-200 shadow-sm flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-concrete-900 to-safety-800 text-white flex items-center justify-center font-display font-extrabold text-2xl shadow-md border-2 border-concrete-700">
                  {citizen.avatarInitial}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-concrete-900">
                      {citizen.name}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-caution-100 text-caution-800 border border-caution-300">
                      Level {citizen.levelNumber}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-concrete-500 mt-0.5">
                    {citizen.handle} · Member since {citizen.joinedDate}
                  </p>
                  <p className="text-xs font-semibold text-safety-700 mt-1 flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5" />
                    {citizen.levelTitle}
                  </p>
                </div>
              </div>

              {/* Total Points Badge */}
              <div className="p-3.5 rounded-2xl bg-asphalt-50 border border-asphalt-200 text-right self-start sm:self-auto min-w-[140px]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-concrete-500 block">
                  Citizen Credit
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold font-display text-concrete-900">
                  {citizen.points.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] font-mono text-safety-600 block mt-0.5">
                  Points Balance
                </span>
              </div>
            </div>

            {/* Level Progression Progress Bar */}
            <div className="p-4 rounded-xl bg-asphalt-50 border border-asphalt-200 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-concrete-700">
                  Progress to Level {citizen.levelNumber + 1} (Diamond Auditor)
                </span>
                <span className="font-mono font-bold text-concrete-800">
                  {citizen.points} / {citizen.nextLevelPoints} PTS ({progressPercent}%)
                </span>
              </div>

              <div className="w-full h-3 rounded-full bg-asphalt-200 overflow-hidden border border-asphalt-300">
                <div
                  className="h-full bg-safety-600 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <p className="text-[11px] text-concrete-500">
                Submit {Math.ceil((citizen.nextLevelPoints - citizen.points) / 120)} more verified reports to unlock priority municipal response routing.
              </p>
            </div>

            {/* 4-Metric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white border border-asphalt-200">
                <span className="text-[11px] font-medium text-concrete-500 block">
                  Total Submissions
                </span>
                <span className="text-xl font-bold font-display text-concrete-900">
                  {citizen.totalReports}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-asphalt-200">
                <span className="text-[11px] font-medium text-concrete-500 block">
                  AI-Verified Reports
                </span>
                <span className="text-xl font-bold font-display text-signal-600">
                  {citizen.verifiedReports}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-asphalt-200">
                <span className="text-[11px] font-medium text-concrete-500 block">
                  Potholes Repaired
                </span>
                <span className="text-xl font-bold font-display text-safety-600">
                  {citizen.fixedCount}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-asphalt-200">
                <span className="text-[11px] font-medium text-concrete-500 block">
                  Asphalt Impact
                </span>
                <span className="text-xl font-bold font-display text-concrete-900">
                  {citizen.impactScoreKg} kg
                </span>
              </div>
            </div>
          </TiltCard>
        </div>
      )}

      {/* 2. BADGES TAB */}
      {activeTab === 'badges' && (
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-2xl bg-white border border-asphalt-200 shadow-2xs flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-concrete-600 font-mono">
              Municipal Verification Badges
            </span>
            <span className="text-xs text-concrete-500">
              Only awarded for AI-authenticated real-world repairs
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {badges.map(badge => {
              const IconComp = BADGE_ICONS[badge.icon] || Award;

              return (
                <TiltCard
                  key={badge.id}
                  maxTilt={6}
                  className={`p-5 flex flex-col justify-between border transition-all ${
                    badge.earned
                      ? 'bg-white border-caution-300 shadow-sm ring-1 ring-caution-200/50'
                      : 'bg-asphalt-50/60 border-asphalt-200 opacity-75'
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs border ${
                          badge.earned
                            ? 'bg-caution-100 text-caution-800 border-caution-300'
                            : 'bg-asphalt-200 text-concrete-400 border-asphalt-300'
                        }`}
                      >
                        <IconComp className="w-6 h-6" />
                      </div>

                      {badge.earned ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-signal-100 text-signal-800 border border-signal-300">
                          Unlocked ✓
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-asphalt-200 text-concrete-500">
                          Locked
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-concrete-900">
                        {badge.title}
                      </h3>
                      <p className="text-xs text-concrete-600 mt-1 leading-relaxed">
                        {badge.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-asphalt-200/80 text-xs">
                    {badge.earned ? (
                      <span className="text-concrete-500 font-mono text-[11px]">
                        Awarded on {badge.earnedDate}
                      </span>
                    ) : badge.progress ? (
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-[11px] font-mono text-concrete-600">
                          <span>Progress</span>
                          <span>
                            {badge.progress.current}/{badge.progress.target}
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-asphalt-200 overflow-hidden">
                          <div
                            className="h-full bg-safety-600 rounded-full"
                            style={{
                              width: `${(badge.progress.current / badge.progress.target) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <span className="text-concrete-400 text-[11px]">Requirement in progress</span>
                    )}
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. LEADERBOARD TAB */}
      {activeTab === 'leaderboard' && (
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-2xl bg-white border border-asphalt-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-concrete-600 font-mono">
                Bengaluru Civic Sentinel Leaderboard
              </span>
              <p className="text-xs text-concrete-500">
                Ranked by verified road defects resolved & verified impact tonnage.
              </p>
            </div>
            <Tag label="August 2026 Season" variant="safety" size="sm" />
          </div>

          <div className="bg-white rounded-2xl border border-asphalt-200 shadow-sm overflow-hidden divide-y divide-asphalt-100">
            {leaderboard.map(entry => {
              const isTop1 = entry.rank === 1;
              const isTop2 = entry.rank === 2;
              const isTop3 = entry.rank === 3;
              const isCurrent = entry.id === citizen.id;

              return (
                <div
                  key={entry.id}
                  className={`p-4 sm:p-5 flex items-center justify-between gap-4 transition-colors ${
                    isCurrent ? 'bg-safety-50/50 font-semibold' : 'hover:bg-asphalt-50/60'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    {/* Rank Medal */}
                    <div className="w-8 flex items-center justify-center shrink-0">
                      {isTop1 ? (
                        <div className="w-8 h-8 rounded-full bg-caution-100 text-caution-800 border border-caution-300 flex items-center justify-center font-bold text-xs shadow-xs">
                          🥇
                        </div>
                      ) : isTop2 ? (
                        <div className="w-8 h-8 rounded-full bg-concrete-100 text-concrete-800 border border-concrete-300 flex items-center justify-center font-bold text-xs shadow-xs">
                          🥈
                        </div>
                      ) : isTop3 ? (
                        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-800 border border-orange-300 flex items-center justify-center font-bold text-xs shadow-xs">
                          🥉
                        </div>
                      ) : (
                        <span className="text-xs font-mono font-bold text-concrete-500">
                          #{entry.rank}
                        </span>
                      )}
                    </div>

                    {/* Avatar Initial */}
                    <div className="w-10 h-10 rounded-xl bg-concrete-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {entry.avatarInitial}
                    </div>

                    {/* Name + City */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-concrete-900 truncate">
                          {entry.name}
                        </p>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-safety-600 text-white">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-concrete-500 truncate">
                        {entry.city} · Top Badge: {entry.topBadge}
                      </p>
                    </div>
                  </div>

                  {/* Points & Stats */}
                  <div className="flex items-center gap-6 shrink-0 text-right">
                    <div className="hidden sm:block">
                      <span className="text-xs font-bold text-concrete-800 block font-mono">
                        {entry.reportsCount} Reports
                      </span>
                      <span className="text-[10px] text-concrete-400">
                        {entry.badgeCount} Badges
                      </span>
                    </div>

                    <div>
                      <span className="text-base sm:text-lg font-extrabold font-display text-concrete-900">
                        {entry.points.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] font-mono text-safety-600 block">
                        PTS
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
