import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Filter,
  Layers,
  Sparkles,
  Maximize2,
  ExternalLink,
  ShieldAlert,
  Flame,
  Wrench,
  Navigation,
  Eye,
  CheckCircle2,
  ScanLine,
  Zap,
} from 'lucide-react';
import { useReports } from '../context/ReportContext';
import { PotholeReport, SeverityLevel } from '../types';
import { SeverityBadge, PriorityBadge, StatusBadge, Tag, DemoTag } from '../components/common/Badges';
import { DangerMeter } from '../components/common/DangerMeter';
import { formatINR } from '../data/mockData';
import { TiltCard } from '../components/common/TiltCard';
import { PotholeDetector } from '../components/common/PotholeDetector';

export const LiveMapPage: React.FC = () => {
  const { reports } = useReports();
  const [selectedReport, setSelectedReport] = useState<PotholeReport | null>(reports[0] || null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [mapMode, setMapMode] = useState<'pins' | 'heatmap'>('pins');
  const [showDetector, setShowDetector] = useState(false);
  const [liveReports, setLiveReports] = useState<PotholeReport[]>([]);

  // All reports = mock + live detected
  const allReports = useMemo(() => [...reports, ...liveReports], [reports, liveReports]);

  // Bounding box for Bengaluru region coordinates to project onto 0-100% canvas
  // Lat: ~12.82 to 13.06, Lng: ~77.52 to 77.80
  const MIN_LAT = 12.82;
  const MAX_LAT = 13.06;
  const MIN_LNG = 77.52;
  const MAX_LNG = 77.80;

  const MAP_CENTER_LAT = (MIN_LAT + MAX_LAT) / 2;
  const MAP_CENTER_LNG = (MIN_LNG + MAX_LNG) / 2;

  const projectCoord = (lat: number, lng: number) => {
    const yPercent = 100 - ((lat - MIN_LAT) / (MAX_LAT - MIN_LAT)) * 100;
    const xPercent = ((lng - MIN_LNG) / (MAX_LNG - MIN_LNG)) * 100;
    return {
      top: `${Math.max(8, Math.min(92, yPercent))}%`,
      left: `${Math.max(6, Math.min(94, xPercent))}%`,
    };
  };

  const filteredReports = useMemo(() => {
    return allReports.filter(report => {
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Critical') return report.severity === 'Critical';
      if (activeFilter === 'High') return report.severity === 'High';
      if (activeFilter === 'Moderate') return report.severity === 'Moderate';
      if (activeFilter === 'Low') return report.severity === 'Low';
      if (activeFilter === 'Repaired') return report.status === 'Completed' || report.status === 'AI Verified';
      if (activeFilter === 'Unrepaired') return report.status !== 'Completed' && report.status !== 'AI Verified';
      if (activeFilter === 'Live') return report.id.startsWith('LIVE-');
      return true;
    });
  }, [allReports, activeFilter]);

  // Generate stacked radial gradient glow wash when filter is active
  const heatmapBackground = useMemo(() => {
    if (activeFilter === 'All' && mapMode !== 'heatmap') return 'none';

    const glowStops = filteredReports.slice(0, 12).map(r => {
      const pos = projectCoord(r.lat, r.lng);
      let color = 'rgba(239, 68, 68, 0.22)';
      if (r.severity === 'High') color = 'rgba(249, 115, 22, 0.20)';
      if (r.severity === 'Moderate') color = 'rgba(245, 158, 11, 0.18)';
      if (r.severity === 'Low') color = 'rgba(16, 185, 129, 0.15)';
      if (r.status === 'Completed' || r.status === 'AI Verified') color = 'rgba(5, 150, 105, 0.18)';
      return `radial-gradient(circle 80px at ${pos.left} ${pos.top}, ${color} 0%, transparent 70%)`;
    });

    return glowStops.join(', ');
  }, [filteredReports, activeFilter, mapMode]);

  const handleDetected = (report: PotholeReport) => {
    setLiveReports(prev => [report, ...prev]);
    setSelectedReport(report);
    setActiveFilter('All');
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Tag label="Citywide GIS Telemetry" variant="route" size="sm" />
            <DemoTag />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-concrete-900 mt-1">
            Live Defect &amp; Heatmap Radar
          </h1>
          <p className="text-xs sm:text-sm text-concrete-600">
            Real-time visual map projection of active road cavities and repair progression across metropolitan corridors.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-asphalt-200 rounded-xl self-start sm:self-auto border border-asphalt-300">
          <button
            onClick={() => setMapMode('pins')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mapMode === 'pins'
                ? 'bg-white text-concrete-900 shadow-2xs'
                : 'text-concrete-600 hover:text-concrete-900'
            }`}
          >
            Incident Markers
          </button>
          <button
            onClick={() => setMapMode('heatmap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              mapMode === 'heatmap'
                ? 'bg-white text-concrete-900 shadow-2xs'
                : 'text-concrete-600 hover:text-concrete-900'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-orange-600" />
            Heatmap Glow
          </button>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-xs font-mono font-bold text-concrete-500 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
          <Filter className="w-3.5 h-3.5" />
          Filter:
        </span>
        {['All', 'Critical', 'High', 'Moderate', 'Low', 'Repaired', 'Unrepaired', 'Live'].map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === filter
                ? filter === 'Live'
                  ? 'bg-red-500 text-white shadow-2xs'
                  : 'bg-concrete-900 text-white shadow-2xs'
                : filter === 'Live' && liveReports.length > 0
                ? 'bg-red-50 border border-red-300 text-red-700 hover:bg-red-100'
                : 'bg-white hover:bg-asphalt-100 text-concrete-700 border border-asphalt-300'
            }`}
          >
            {filter === 'Live' && <Zap className="w-3 h-3 inline mr-0.5 -mt-0.5" />}
            {filter}
            {filter !== 'All' && (
              <span className="ml-1.5 opacity-70 font-mono text-[10px]">
                (
                {filter === 'Live'
                  ? liveReports.length
                  : allReports.filter(r => {
                      if (filter === 'Critical') return r.severity === 'Critical';
                      if (filter === 'High') return r.severity === 'High';
                      if (filter === 'Moderate') return r.severity === 'Moderate';
                      if (filter === 'Low') return r.severity === 'Low';
                      if (filter === 'Repaired') return r.status === 'Completed' || r.status === 'AI Verified';
                      if (filter === 'Unrepaired') return r.status !== 'Completed' && r.status !== 'AI Verified';
                      return true;
                    }).length}
                )
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main Map Container + Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Map Canvas (8 cols on lg) */}
        <div className="lg:col-span-8 rounded-3xl bg-white border border-asphalt-300 shadow-md overflow-hidden relative min-h-[480px] sm:min-h-[560px] flex flex-col">
          {/* Top GIS Status Bar */}
          <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-asphalt-300 shadow-sm flex items-center gap-3 text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-signal-500 animate-ping" />
            <span className="font-bold text-concrete-900">
              METRO SECTOR: BENGALURU SMART GRID
            </span>
            <span className="hidden sm:inline text-concrete-500">
              ({filteredReports.length} incidents plotted)
            </span>
          </div>

          {/* Live Detection Badge (top-right) */}
          {liveReports.length > 0 && (
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-red-500 text-white px-2.5 py-1.5 rounded-xl text-[11px] font-bold shadow-lg animate-pulse">
              <Zap className="w-3 h-3" />
              {liveReports.length} LIVE
            </div>
          )}

          {/* Map Surface Representation */}
          <div className="relative w-full flex-1 bg-asphalt-100 overflow-hidden select-none">
            {/* Soft pulsing heatmap wash layer */}
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-700"
              style={{
                backgroundImage: heatmapBackground !== 'none' ? heatmapBackground : undefined,
              }}
            />

            {/* Smart City Grid Background Texture */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 15px 15px, #A8957F 1.5px, transparent 0), linear-gradient(to right, #DDD2C4 1px, transparent 1px), linear-gradient(to bottom, #DDD2C4 1px, transparent 1px)',
                backgroundSize: '30px 30px, 60px 60px, 60px 60px',
              }}
            />

            {/* Major Arterial Roads Vectors */}
            <svg className="absolute inset-0 w-full h-full stroke-asphalt-300 fill-none" preserveAspectRatio="none">
              {/* Outer Ring Road Ring */}
              <ellipse cx="50%" cy="50%" rx="38%" ry="36%" strokeWidth="12" stroke="#EAE2D8" />
              <ellipse cx="50%" cy="50%" rx="38%" ry="36%" strokeWidth="6" stroke="#FAF8F5" strokeDasharray="6,4" />

              {/* Hosur Road Express Highway */}
              <path d="M 50% 50% Q 65% 75% 85% 95%" strokeWidth="8" stroke="#FAF8F5" />
              {/* Old Airport Rd & Whitefield */}
              <path d="M 50% 50% Q 70% 40% 95% 35%" strokeWidth="8" stroke="#FAF8F5" />
              {/* Bellary Road (North Airport) */}
              <path d="M 50% 50% L 48% 5%" strokeWidth="8" stroke="#FAF8F5" />
              {/* Mysore Road */}
              <path d="M 50% 50% L 10% 80%" strokeWidth="8" stroke="#FAF8F5" />
              {/* Bannerghatta Road */}
              <path d="M 50% 50% L 40% 95%" strokeWidth="6" stroke="#FAF8F5" />
            </svg>

            {/* Metro Stations / Landmarks Labels */}
            <div className="absolute top-[22%] left-[46%] text-[10px] font-mono font-bold text-concrete-500 bg-white/70 px-1.5 py-0.5 rounded pointer-events-none">
              CBD / MG ROAD
            </div>
            <div className="absolute top-[35%] right-[10%] text-[10px] font-mono font-bold text-concrete-500 bg-white/70 px-1.5 py-0.5 rounded pointer-events-none">
              WHITEFIELD IT TECH PARK
            </div>
            <div className="absolute bottom-[20%] right-[18%] text-[10px] font-mono font-bold text-concrete-500 bg-white/70 px-1.5 py-0.5 rounded pointer-events-none">
              ELECTRONIC CITY
            </div>
            <div className="absolute top-[60%] left-[30%] text-[10px] font-mono font-bold text-concrete-500 bg-white/70 px-1.5 py-0.5 rounded pointer-events-none">
              KORAMANGALA 4TH BLK
            </div>

            {/* Pothole Incident Markers Plotted via Projection */}
            {filteredReports.map(report => {
              const pos = projectCoord(report.lat, report.lng);
              const isSelected = selectedReport?.id === report.id;
              const isRepaired = report.status === 'Completed' || report.status === 'AI Verified';
              const isLive = report.id.startsWith('LIVE-');

              let pinColor = 'bg-caution-500';
              let ringColor = 'border-caution-500';
              if (report.severity === 'Critical') {
                pinColor = 'bg-hazard-600';
                ringColor = 'border-hazard-500';
              } else if (report.severity === 'High') {
                pinColor = 'bg-orange-500';
                ringColor = 'border-orange-500';
              } else if (report.severity === 'Low') {
                pinColor = 'bg-signal-500';
                ringColor = 'border-signal-500';
              }
              if (isRepaired) {
                pinColor = 'bg-signal-600';
                ringColor = 'border-signal-600';
              }

              return (
                <div
                  key={report.id}
                  style={{ top: pos.top, left: pos.left }}
                  onClick={() => setSelectedReport(report)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
                >
                  {/* Expanding Heat-Wave sonar ring when active filter is selected or hovered */}
                  {(activeFilter !== 'All' || isSelected || isLive) && (
                    <div
                      className={`absolute inset-0 -m-3 rounded-full border-2 ${ringColor} animate-sonar pointer-events-none`}
                    />
                  )}

                  {/* Live AI badge */}
                  {isLive && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full whitespace-nowrap flex items-center gap-0.5 shadow">
                      <Zap className="w-2.5 h-2.5" /> LIVE
                    </div>
                  )}

                  {/* Pin Dot Icon */}
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-mono text-xs font-bold shadow-md border-2 border-white transition-transform ${
                      isSelected
                        ? `${pinColor} scale-125 ring-4 ring-safety-300 z-30`
                        : `${pinColor} hover:scale-110`
                    } ${isLive ? 'ring-2 ring-red-300' : ''}`}
                  >
                    {isRepaired ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span>{report.severity[0]}</span>
                    )}
                  </div>

                  {/* Marker Road Hover Tooltip */}
                  <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 bg-concrete-900/95 text-white p-2 rounded-xl text-[11px] shadow-lg pointer-events-none z-40">
                    <p className="font-bold truncate">{report.roadName}</p>
                    <p className="text-concrete-300 text-[10px]">{report.severity} · {report.status}</p>
                    {isLive && <p className="text-red-300 text-[10px] font-bold">⚡ AI Detected</p>}
                  </div>
                </div>
              );
            })}

            {/* 🔴 Floating "Detect Live" Button */}
            <button
              id="live-detect-btn"
              onClick={() => setShowDetector(true)}
              className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-xl hover:scale-105 active:scale-95 transition-transform cursor-pointer border border-red-400/30"
            >
              <ScanLine className="w-4 h-4" />
              <span>Detect Live</span>
              <Sparkles className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>

          {/* Map Footer Legend */}
          <div className="p-3 bg-white border-t border-asphalt-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-hazard-600" />
                Critical
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                High
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-caution-500" />
                Moderate
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-signal-600" />
                Repaired
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 ring-1 ring-red-300" />
                Live AI
              </span>
            </div>
            <span className="font-mono text-concrete-500 text-[11px]">
              Click any pin to inspect · Use "Detect Live" for AI detection
            </span>
          </div>
        </div>

        {/* Selected Report Inspector Drawer (4 cols on lg) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {selectedReport ? (
            <TiltCard maxTilt={4} className="p-5 bg-white border border-asphalt-300 shadow-md flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-concrete-500">
                  {selectedReport.id}
                </span>
                <div className="flex items-center gap-2">
                  {selectedReport.id.startsWith('LIVE-') && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                      <Zap className="w-3 h-3" /> AI LIVE
                    </span>
                  )}
                  <StatusBadge status={selectedReport.status} size="sm" />
                </div>
              </div>

              {/* Photo */}
              <div className="relative rounded-xl overflow-hidden border border-asphalt-200 aspect-video shadow-inner">
                <img
                  src={selectedReport.photoUrl}
                  alt={selectedReport.roadName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <SeverityBadge severity={selectedReport.severity} size="sm" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-mono">
                  {selectedReport.potholesCount} Cavity Units
                </div>
              </div>

              {/* Details */}
              <div>
                <h3 className="text-base font-bold text-concrete-900">
                  {selectedReport.roadName}
                </h3>
                <p className="text-xs text-concrete-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-route-600 shrink-0" />
                  {selectedReport.area}, {selectedReport.city} ({selectedReport.pinCode})
                </p>
                {selectedReport.aiVerificationNotes && (
                  <p className="text-[11px] text-concrete-500 mt-1.5 italic leading-relaxed">
                    "{selectedReport.aiVerificationNotes}"
                  </p>
                )}
              </div>

              {/* Risk Danger Progress */}
              <DangerMeter percentage={selectedReport.dangerPercentage} />

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-asphalt-200 text-xs">
                <div className="p-2 rounded-lg bg-asphalt-50 border border-asphalt-200">
                  <span className="text-concrete-500 text-[10px] block">Est. Budget</span>
                  <span className="font-bold font-mono text-concrete-900">
                    {formatINR(selectedReport.estimatedCostMin)}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-asphalt-50 border border-asphalt-200">
                  <span className="text-concrete-500 text-[10px] block">Damaged Footprint</span>
                  <span className="font-bold font-mono text-concrete-900">
                    {selectedReport.damagedAreaSqM} m²
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-asphalt-200 flex flex-col gap-2">
                {!selectedReport.id.startsWith('LIVE-') && (
                  <Link
                    to={`/admin/report/${selectedReport.id}`}
                    className="btn-3d btn-3d-safety py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Authority Command View</span>
                  </Link>
                )}

                <Link
                  to="/report"
                  className="btn-3d btn-3d-asphalt py-2 px-4 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-route-600" />
                  <span>Report Hazard in this Sector</span>
                </Link>
              </div>
            </TiltCard>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-asphalt-200 text-concrete-500 text-xs">
              Select a marker on the map to inspect incident details.
            </div>
          )}

          {/* AI Detection CTA Card */}
          <div
            onClick={() => setShowDetector(true)}
            className="p-4 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-2xl cursor-pointer hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ScanLine className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Live AI Detection</p>
                <p className="text-[10px] text-gray-500">Roboflow + Gemini</p>
              </div>
            </div>
            <p className="text-[11px] text-gray-600">
              Upload a road photo to instantly detect potholes and add them to this map in real time.
            </p>
          </div>
        </div>
      </div>

      {/* PotholeDetector Modal */}
      {showDetector && (
        <PotholeDetector
          onClose={() => setShowDetector(false)}
          onDetected={handleDetected}
          mapCenterLat={MAP_CENTER_LAT}
          mapCenterLng={MAP_CENTER_LNG}
        />
      )}
    </div>
  );
};
