import React, { useRef, useState, useCallback } from 'react';
import { ShieldCheck, AlertCircle, Scan, Activity, Eye } from 'lucide-react';
import { Tag } from './Badges';

export const HeroRoadScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 24, ry: -4 });
  const [isScanning, setIsScanning] = useState(true);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Subtle cursor tracking
    setTilt({
      rx: 24 - y * 12,
      ry: -4 + x * 14,
    });
  }, []);

  const handleMouseLeave = () => {
    setTilt({ rx: 24, ry: -4 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[560px] h-[400px] sm:h-[450px] mx-auto flex items-center justify-center select-none road-perspective-wrapper"
    >
      {/* HUD AI Analysis Overlays (floating in 3D space) */}
      <div className="absolute top-4 left-4 z-30 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-asphalt-300 shadow-md flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-hazard-500 animate-ping" />
        <div>
          <p className="text-[11px] font-mono font-bold text-concrete-900 leading-none">
            DEFECT DETECTED #RG-CRATER
          </p>
          <p className="text-[10px] font-mono text-concrete-500 mt-0.5">
            Depth: 74mm · Severity: Critical
          </p>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-30 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-asphalt-300 shadow-md flex items-center gap-2">
        <Scan className="w-4 h-4 text-safety-600 animate-spin" style={{ animationDuration: '6s' }} />
        <div className="text-right">
          <p className="text-[11px] font-mono font-bold text-safety-700 leading-none">
            AI MESH SCAN
          </p>
          <p className="text-[10px] font-mono text-concrete-500 mt-0.5">
            Confidence: 98.6%
          </p>
        </div>
      </div>

      {/* Floating telemetry chip on bottom left */}
      <div className="absolute bottom-4 left-4 z-30 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-asphalt-200 shadow-sm flex items-center gap-2 text-xs font-mono text-concrete-700">
        <Activity className="w-3.5 h-3.5 text-signal-600" />
        <span>Subsurface Erosion: <strong>4.8 m²</strong></span>
      </div>

      {/* The 3D Road Slab */}
      <div
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) rotateZ(-3deg)`,
          transformStyle: 'preserve-3d',
        }}
        className="w-[90%] sm:w-[94%] h-[290px] sm:h-[320px] rounded-3xl relative road-slab p-6 flex flex-col justify-between overflow-hidden shadow-2xl transition-transform duration-200 ease-out"
      >
        {/* Asphalt Texture and Grain Overlay */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '12px 12px',
          }}
        />

        {/* Painted Lane Markings */}
        {/* White Solid Edge Line (Left) */}
        <div className="absolute top-0 bottom-0 left-6 w-2 bg-white/90 shadow-sm rounded-full" />

        {/* White Solid Edge Line (Right) */}
        <div className="absolute top-0 bottom-0 right-6 w-2 bg-white/90 shadow-sm rounded-full" />

        {/* Yellow Dashed Center Lane Line */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-3 flex flex-col justify-between py-2 pointer-events-none opacity-90">
          <div className="h-14 w-full bg-amber-400 rounded-sm shadow-xs" />
          <div className="h-14 w-full bg-amber-400 rounded-sm shadow-xs" />
          <div className="h-14 w-full bg-amber-400 rounded-sm shadow-xs" />
        </div>

        {/* Road Surface Curvature Shading */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />

        {/* Realistic Pothole Crater Element */}
        <div className="absolute top-[38%] left-[54%] -translate-x-1/2 -translate-y-1/2 w-44 sm:w-52 h-28 sm:h-32 rounded-[45%_55%_60%_40%/50%_45%_55%_50%] pothole-crater animate-crater-glow cursor-pointer group">
          {/* Inner jagged crack layers */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-stone-800" viewBox="0 0 100 60">
            {/* Fine fracture lines */}
            <path
              d="M 20,30 Q 35,22 45,35 T 70,25 T 85,38"
              fill="none"
              stroke="#050608"
              strokeWidth="1.2"
              strokeDasharray="2,1"
            />
            <path
              d="M 45,35 L 50,52 M 65,28 L 75,45 M 30,28 L 15,42"
              fill="none"
              stroke="#0f141c"
              strokeWidth="1"
            />
            <path
              d="M 50,10 Q 52,25 45,35"
              fill="none"
              stroke="#0f141c"
              strokeWidth="0.8"
            />
          </svg>

          {/* AI Bounding Box overlay */}
          <div className="absolute -inset-2 border-2 border-dashed border-hazard-400/90 rounded-2xl pointer-events-none flex items-start justify-between p-1">
            <span className="bg-hazard-600 text-white font-mono text-[9px] px-1 py-0.2 rounded font-bold">
              AI: 0.98 RISK
            </span>
            <span className="w-2 h-2 border-t-2 border-r-2 border-hazard-400" />
          </div>

          {/* Pulse sonar rings */}
          <div className="absolute inset-0 rounded-full border border-hazard-500 animate-sonar pointer-events-none" />
        </div>

        {/* Fine Road Cracks branching outward */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 400 240"
        >
          <path
            d="M 280,110 L 320,130 L 350,125 M 320,130 L 335,160"
            fill="none"
            stroke="rgba(0,0,0,0.7)"
            strokeWidth="1.2"
          />
          <path
            d="M 160,115 L 120,95 L 90,105"
            fill="none"
            stroke="rgba(0,0,0,0.6)"
            strokeWidth="1"
          />
        </svg>

        {/* Laser Radar Scan Bar moving vertically */}
        <div
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-route-400 to-transparent shadow-[0_0_12px_#38bdf8] opacity-75 pointer-events-none animate-bounce"
          style={{ animationDuration: '4s' }}
        />

        {/* Pavement Slab Cross-Section Thickness 3D layer (bottom edge) */}
        <div className="absolute -bottom-3 left-0 right-0 h-3 bg-stone-900 rounded-b-2xl border-t border-stone-700/50 flex justify-between px-6 items-center text-[8px] font-mono text-stone-400">
          <span>BASE COURSE: 150mm</span>
          <span>WEARING COURSE: 50mm BITUMEN</span>
        </div>
      </div>
    </div>
  );
};
