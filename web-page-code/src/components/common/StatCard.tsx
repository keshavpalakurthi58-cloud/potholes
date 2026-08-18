import React from 'react';
import { LucideIcon } from 'lucide-react';
import { TiltCard } from './TiltCard';

export type StatAccentColor = 'route' | 'hazard' | 'safety' | 'orange' | 'signal' | 'caution' | 'concrete';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtext?: string;
  accent?: StatAccentColor;
  suffix?: string;
  prefix?: string;
  onClick?: () => void;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  subtext,
  accent = 'safety',
  suffix,
  prefix,
  onClick,
  className = '',
}) => {
  const accentIconStyles: Record<StatAccentColor, string> = {
    route: 'bg-route-100 text-route-600 border-route-200',
    hazard: 'bg-hazard-100 text-hazard-600 border-hazard-200',
    safety: 'bg-safety-100 text-safety-600 border-safety-200',
    orange: 'bg-orange-100 text-orange-600 border-orange-200',
    signal: 'bg-signal-100 text-signal-600 border-signal-200',
    caution: 'bg-caution-100 text-caution-700 border-caution-200',
    concrete: 'bg-asphalt-200 text-concrete-700 border-asphalt-300',
  };

  const accentBadgeStyles: Record<StatAccentColor, string> = {
    route: 'text-route-600',
    hazard: 'text-hazard-600',
    safety: 'text-safety-600',
    orange: 'text-orange-600',
    signal: 'text-signal-600',
    caution: 'text-caution-700',
    concrete: 'text-concrete-700',
  };

  return (
    <TiltCard
      maxTilt={6}
      perspective={800}
      onClick={onClick}
      className={`p-4 sm:p-5 flex flex-col justify-between cursor-default border-asphalt-200/90 ${className}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-concrete-500 line-clamp-1">
          {label}
        </span>
        <div
          className={`p-2.5 rounded-xl border shrink-0 transition-transform ${accentIconStyles[accent]}`}
        >
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          {prefix && (
            <span className="text-base font-semibold text-concrete-500 font-mono">
              {prefix}
            </span>
          )}
          <span className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-concrete-900">
            {value}
          </span>
          {suffix && (
            <span className="text-xs sm:text-sm font-medium text-concrete-500 ml-0.5">
              {suffix}
            </span>
          )}
        </div>

        {subtext && (
          <p className="mt-1.5 text-xs text-concrete-500 line-clamp-1">
            {subtext}
          </p>
        )}
      </div>
    </TiltCard>
  );
};
