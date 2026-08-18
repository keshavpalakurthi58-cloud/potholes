import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

interface DangerMeterProps {
  percentage: number;
  label?: string;
  showDetails?: boolean;
  className?: string;
}

export const DangerMeter: React.FC<DangerMeterProps> = ({
  percentage,
  label = 'Accident Risk Level',
  showDetails = true,
  className = '',
}) => {
  const clamped = Math.max(0, Math.min(100, percentage));

  let colorClass = 'bg-signal-500';
  let badgeClass = 'text-signal-700 bg-signal-100 border-signal-300';
  let statusText = 'Low Risk';

  if (clamped > 80) {
    colorClass = 'bg-hazard-500';
    badgeClass = 'text-hazard-700 bg-hazard-100 border-hazard-300';
    statusText = 'Severe Hazard';
  } else if (clamped > 60) {
    colorClass = 'bg-orange-500';
    badgeClass = 'text-orange-700 bg-orange-100 border-orange-300';
    statusText = 'Elevated Danger';
  } else if (clamped > 30) {
    colorClass = 'bg-caution-500';
    badgeClass = 'text-caution-800 bg-caution-100 border-caution-300';
    statusText = 'Moderate Concern';
  }

  return (
    <div className={`w-full flex flex-col gap-2 ${className}`}>
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="font-semibold text-concrete-700 flex items-center gap-1.5">
          {clamped > 60 ? (
            <AlertTriangle className="w-3.5 h-3.5 text-hazard-600 shrink-0" />
          ) : (
            <ShieldCheck className="w-3.5 h-3.5 text-signal-600 shrink-0" />
          )}
          {label}
        </span>
        {showDetails && (
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${badgeClass}`}>
            {clamped}% · {statusText}
          </span>
        )}
      </div>

      <div className="w-full h-3 rounded-full bg-asphalt-200 overflow-hidden border border-asphalt-300 relative shadow-inner">
        <div
          className={`h-full transition-all duration-700 ease-out striped-bar rounded-full ${colorClass}`}
          style={{ width: `${clamped}%` }}
        />
      </div>

      <div className="flex justify-between text-[11px] font-mono text-concrete-600 font-medium px-0.5">
        <span>0% Safe</span>
        <span>50% Caution</span>
        <span>100% Critical</span>
      </div>
    </div>
  );
};
