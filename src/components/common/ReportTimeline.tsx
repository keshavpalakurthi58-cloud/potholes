import React from 'react';
import { Check, Clock, Sparkles } from 'lucide-react';
import { RepairStatus } from '../../types';
import { STATUS_STEPS } from '../../data/mockData';

interface ReportTimelineProps {
  currentStatus: RepairStatus;
  updatedDate?: string;
  className?: string;
}

export const ReportTimeline: React.FC<ReportTimelineProps> = ({
  currentStatus,
  updatedDate,
  className = '',
}) => {
  const currentIndex = STATUS_STEPS.indexOf(currentStatus as any);
  const effectiveIndex = currentIndex === -1 ? 0 : currentIndex;

  return (
    <div className={`w-full overflow-x-auto pb-2 pt-1 ${className}`}>
      <div className="min-w-[580px] flex items-center justify-between relative px-2">
        {/* Background track line */}
        <div className="absolute top-4 left-6 right-6 h-1 bg-asphalt-200 -z-0 rounded-full" />

        {/* Active filled line */}
        <div
          className="absolute top-4 left-6 h-1 bg-safety-600 -z-0 rounded-full transition-all duration-500"
          style={{
            width: `${(effectiveIndex / (STATUS_STEPS.length - 1)) * 90}%`,
          }}
        />

        {STATUS_STEPS.map((step, index) => {
          const isDone = index < effectiveIndex;
          const isCurrent = index === effectiveIndex;
          const isPending = index > effectiveIndex;

          let dotClass = 'bg-white border-2 border-asphalt-300 text-concrete-400';
          if (isDone) {
            dotClass = 'bg-signal-600 border-2 border-signal-700 text-white shadow-xs';
          } else if (isCurrent) {
            dotClass = step === 'AI Verified'
              ? 'bg-safety-600 border-2 border-safety-700 text-white ring-4 ring-safety-200 animate-pulse'
              : 'bg-safety-600 border-2 border-safety-700 text-white ring-4 ring-safety-200';
          }

          return (
            <div key={step} className="flex flex-col items-center relative z-10 group">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${dotClass}`}
              >
                {isDone ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : isCurrent ? (
                  step === 'AI Verified' ? <Sparkles className="w-4 h-4" /> : <Clock className="w-4 h-4" />
                ) : (
                  <span className="font-mono text-[11px]">{index + 1}</span>
                )}
              </div>

              <span
                className={`mt-2 text-xs font-semibold text-center whitespace-nowrap transition-colors ${
                  isCurrent
                    ? 'text-safety-700 font-bold'
                    : isDone
                    ? 'text-concrete-800'
                    : 'text-concrete-400 font-normal'
                }`}
              >
                {step}
              </span>

              {isCurrent && (
                <span className="mt-0.5 text-[10px] font-mono text-safety-600 font-medium whitespace-nowrap bg-safety-50 px-1.5 py-0.5 rounded border border-safety-200">
                  Active Stage
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
