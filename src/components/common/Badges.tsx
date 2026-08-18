import React from 'react';
import { SeverityLevel, PriorityLevel, RepairStatus } from '../../types';

interface TagProps {
  label: string;
  variant?: 'safety' | 'caution' | 'signal' | 'hazard' | 'route' | 'orange' | 'concrete' | 'asphalt';
  size?: 'sm' | 'md';
  showDot?: boolean;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  label,
  variant = 'concrete',
  size = 'md',
  showDot = true,
  className = '',
}) => {
  const variantStyles = {
    safety: 'bg-safety-100 text-safety-800 border-safety-300',
    caution: 'bg-caution-100 text-caution-900 border-caution-300',
    signal: 'bg-signal-100 text-signal-900 border-signal-300',
    hazard: 'bg-hazard-100 text-hazard-900 border-hazard-300',
    route: 'bg-route-100 text-route-900 border-route-300',
    orange: 'bg-orange-100 text-orange-900 border-orange-300',
    concrete: 'bg-concrete-100 text-concrete-800 border-concrete-300',
    asphalt: 'bg-asphalt-200 text-asphalt-800 border-asphalt-300',
  };

  const dotColors = {
    safety: 'bg-safety-600',
    caution: 'bg-caution-600',
    signal: 'bg-signal-600',
    hazard: 'bg-hazard-600',
    route: 'bg-route-600',
    orange: 'bg-orange-600',
    concrete: 'bg-concrete-600',
    asphalt: 'bg-asphalt-600',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs font-medium',
    md: 'px-2.5 py-1 text-xs font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border whitespace-nowrap shrink-0 transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`} />
      )}
      <span>{label}</span>
    </span>
  );
};

export const SeverityBadge: React.FC<{ severity: SeverityLevel; size?: 'sm' | 'md' }> = ({
  severity,
  size = 'md',
}) => {
  switch (severity) {
    case 'Critical':
      return <Tag label="Critical Severity" variant="hazard" size={size} />;
    case 'High':
      return <Tag label="High Severity" variant="orange" size={size} />;
    case 'Moderate':
      return <Tag label="Moderate Severity" variant="caution" size={size} />;
    case 'Low':
      return <Tag label="Low Severity" variant="signal" size={size} />;
  }
};

export const PriorityBadge: React.FC<{ priority: PriorityLevel; size?: 'sm' | 'md' }> = ({
  priority,
  size = 'md',
}) => {
  switch (priority) {
    case 'Urgent':
      return <Tag label="Urgent Priority" variant="hazard" size={size} />;
    case 'High':
      return <Tag label="High Priority" variant="orange" size={size} />;
    case 'Medium':
      return <Tag label="Medium Priority" variant="caution" size={size} />;
    case 'Low':
      return <Tag label="Low Priority" variant="route" size={size} />;
  }
};

export const StatusBadge: React.FC<{ status: RepairStatus; size?: 'sm' | 'md' }> = ({
  status,
  size = 'md',
}) => {
  switch (status) {
    case 'Reported':
      return <Tag label="Reported" variant="concrete" size={size} />;
    case 'Verified':
      return <Tag label="Verified" variant="route" size={size} />;
    case 'Assigned':
      return <Tag label="Crew Assigned" variant="safety" size={size} />;
    case 'In Progress':
      return <Tag label="In Progress" variant="caution" size={size} />;
    case 'Completed':
      return <Tag label="Completed" variant="signal" size={size} />;
    case 'AI Verified':
      return <Tag label="AI Verified ✓" variant="signal" size={size} />;
  }
};

export const DemoTag: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-asphalt-200 text-concrete-700 border border-asphalt-300 shadow-2xs ${className}`}
      title="This output was generated from sample demonstration data"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-safety-600 animate-pulse" />
      <span>Demo mode — sample output</span>
    </span>
  );
};

export const LaneDivider: React.FC<{ className?: string; dashed?: boolean }> = ({
  className = '',
  dashed = false,
}) => {
  return (
    <div
      className={`w-full my-4 ${
        dashed
          ? 'border-b-2 border-dashed border-asphalt-300'
          : 'h-[1px] bg-asphalt-200'
      } ${className}`}
    />
  );
};
