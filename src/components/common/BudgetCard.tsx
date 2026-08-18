import React from 'react';
import { IndianRupee, Layers, Hammer, Sparkles, Scale, Maximize2 } from 'lucide-react';
import { formatINR } from '../../data/mockData';
import { DemoTag } from './Badges';

interface BudgetCardProps {
  costMin: number;
  costMax: number;
  materialCost: number;
  labourCost: number;
  materialKg: number;
  damagedAreaSqM: number;
  className?: string;
}

export const BudgetCard: React.FC<BudgetCardProps> = ({
  costMin,
  costMax,
  materialCost,
  labourCost,
  materialKg,
  damagedAreaSqM,
  className = '',
}) => {
  return (
    <div
      className={`rounded-2xl p-5 bg-white border border-asphalt-200/90 shadow-sm flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-concrete-500 flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-caution-600" />
            Estimated Repair Budget
          </span>
          <DemoTag />
        </div>

        {/* Big Range */}
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold font-display text-concrete-900 tracking-tight">
            {formatINR(costMin)} – {formatINR(costMax)}
          </span>
        </div>
        <p className="text-xs text-concrete-500 mt-1">
          Standard cold-mix mastic asphalt + sub-grade compaction estimate.
        </p>

        {/* Cost Breakdown */}
        <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-asphalt-200">
          <div className="p-2.5 rounded-xl bg-asphalt-50 border border-asphalt-200/70">
            <div className="flex items-center gap-1.5 text-xs text-concrete-500 font-medium">
              <Layers className="w-3.5 h-3.5 text-safety-600" />
              <span>Material Bitumen</span>
            </div>
            <p className="text-sm font-bold text-concrete-800 mt-1 font-mono">
              {formatINR(materialCost)}
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-asphalt-50 border border-asphalt-200/70">
            <div className="flex items-center gap-1.5 text-xs text-concrete-500 font-medium">
              <Hammer className="w-3.5 h-3.5 text-caution-600" />
              <span>Civic Labour & Paving</span>
            </div>
            <p className="text-sm font-bold text-concrete-800 mt-1 font-mono">
              {formatINR(labourCost)}
            </p>
          </div>
        </div>

        {/* Footprint metrics */}
        <div className="flex items-center justify-between mt-3 text-xs font-mono text-concrete-600 px-1">
          <span className="flex items-center gap-1">
            <Scale className="w-3.5 h-3.5 text-concrete-400" />
            Est. Material: <strong className="text-concrete-800 font-semibold">{materialKg} kg</strong>
          </span>
          <span className="flex items-center gap-1">
            <Maximize2 className="w-3.5 h-3.5 text-concrete-400" />
            Damaged Footprint: <strong className="text-concrete-800 font-semibold">{damagedAreaSqM} m²</strong>
          </span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-asphalt-100 flex items-center gap-1.5 text-[11px] text-concrete-500">
        <Sparkles className="w-3 h-3 text-safety-500 shrink-0" />
        <span>Calculated via municipal smart rates & depth photogrammetry</span>
      </div>
    </div>
  );
};
