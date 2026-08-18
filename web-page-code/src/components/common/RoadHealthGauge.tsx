import React, { useMemo } from 'react';
import { Activity } from 'lucide-react';

interface RoadHealthGaugeProps {
  score: number; // 0 - 100
  size?: number; // width/height in px
  showLabel?: boolean;
  className?: string;
}

export const RoadHealthGauge: React.FC<RoadHealthGaugeProps> = ({
  score,
  size = 180,
  showLabel = true,
  className = '',
}) => {
  const clampedScore = Math.max(0, Math.min(100, score));

  // Map 0 - 100 to angle range -120deg to +120deg (total 240deg span)
  const angle = -120 + (clampedScore / 100) * 240;

  // Determine band color & description
  const { strokeColor, fillColor, statusLabel, textClass } = useMemo(() => {
    if (clampedScore >= 80) {
      return {
        strokeColor: '#059669', // signal-500
        fillColor: 'rgba(16, 185, 129, 0.12)',
        statusLabel: 'Optimal / Stable',
        textClass: 'text-signal-600',
      };
    } else if (clampedScore >= 60) {
      return {
        strokeColor: '#D97706', // caution-500
        fillColor: 'rgba(245, 158, 11, 0.12)',
        statusLabel: 'Moderate Wear',
        textClass: 'text-caution-700',
      };
    } else if (clampedScore >= 40) {
      return {
        strokeColor: '#EA580C', // orange-500
        fillColor: 'rgba(249, 115, 22, 0.12)',
        statusLabel: 'Degraded Subsurface',
        textClass: 'text-orange-600',
      };
    } else {
      return {
        strokeColor: '#DC2626', // hazard-500
        fillColor: 'rgba(239, 68, 68, 0.12)',
        statusLabel: 'Critical Failure',
        textClass: 'text-hazard-600',
      };
    }
  }, [clampedScore]);

  // Radius and geometry
  const cx = size / 2;
  const cy = size / 2 + 10;
  const r = size * 0.38;

  // SVG Arc generator
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');
  };

  const backgroundArc = describeArc(cx, cy, r, -120, 120);
  const activeArc = describeArc(cx, cy, r, -120, angle);

  return (
    <div className={`flex flex-col items-center justify-center relative ${className}`}>
      <svg width={size} height={size * 0.85} viewBox={`0 0 ${size} ${size * 0.85}`} className="overflow-visible">
        <defs>
          {/* Subtle gradient for gauge arc */}
          <linearGradient id="gaugeTrackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="35%" stopColor="#EA580C" />
            <stop offset="65%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Outer subtle guide arc */}
        <path
          d={backgroundArc}
          fill="none"
          stroke="#DDD2C4"
          strokeWidth={size * 0.08}
          strokeLinecap="round"
        />

        {/* Active Arc with color-band feedback */}
        <path
          d={activeArc}
          fill="none"
          stroke={strokeColor}
          strokeWidth={size * 0.08}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />

        {/* Tick marks */}
        {[-120, -60, 0, 60, 120].map((tickAngle, i) => {
          const outer = polarToCartesian(cx, cy, r + size * 0.06, tickAngle);
          const inner = polarToCartesian(cx, cy, r + size * 0.02, tickAngle);
          return (
            <line
              key={i}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="#A8957F"
              strokeWidth="2"
              strokeLinecap="round"
            />
          );
        })}

        {/* Needle */}
        <g
          transform={`rotate(${angle}, ${cx}, ${cy})`}
          className="transition-transform duration-700 ease-out"
        >
          <line
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - r + 4}
            stroke="#1D2430"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <polygon
            points={`${cx - 3},${cy} ${cx + 3},${cy} ${cx},${cy - r - 2}`}
            fill="#1D2430"
          />
        </g>

        {/* Center Hub */}
        <circle cx={cx} cy={cy} r={size * 0.07} fill="#1D2430" />
        <circle cx={cx} cy={cy} r={size * 0.035} fill="#FAF8F5" />
      </svg>

      {/* Score readout */}
      <div className="flex flex-col items-center -mt-4">
        <div className="flex items-baseline gap-0.5">
          <span className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-concrete-900">
            {clampedScore}
          </span>
          <span className="text-xs font-mono font-medium text-concrete-500">/100</span>
        </div>
        {showLabel && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <Activity className={`w-3.5 h-3.5 ${textClass}`} />
            <span className={`text-xs font-semibold ${textClass}`}>
              {statusLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
