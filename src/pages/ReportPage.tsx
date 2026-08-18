import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Camera,
  UploadCloud,
  MapPin,
  Compass,
  FileText,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  RefreshCw,
  Image as ImageIcon,
  Check,
  Navigation,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useReports } from '../context/ReportContext';
import { RoadType, TrafficLevel, AiAnalysisResult } from '../types';
import { runDemoAiAnalysis, formatINR } from '../data/mockData';
import { SeverityBadge, PriorityBadge, DemoTag, Tag } from '../components/common/Badges';
import { RoadHealthGauge } from '../components/common/RoadHealthGauge';
import { DangerMeter } from '../components/common/DangerMeter';
import { BudgetCard } from '../components/common/BudgetCard';
import { TiltCard } from '../components/common/TiltCard';

const SAMPLE_PHOTOS = [
  {
    name: 'Asphalt Crater (High Depth)',
    url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Sub-base Alligator Crack',
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Multi-Pothole Cluster',
    url: 'https://images.unsplash.com/photo-1578874691223-64558a3ca096?auto=format&fit=crop&w=800&q=80',
  },
];

export const ReportPage: React.FC = () => {
  const navigate = useNavigate();
  const { addReport } = useReports();

  // Wizard Step: 1: Photo, 2: Location, 3: Details, 4: AI Analysis, 5: Confirmation
  const [step, setStep] = useState<number>(1);

  // Form State
  const [photoUrl, setPhotoUrl] = useState<string>(SAMPLE_PHOTOS[0].url);
  const [photoName, setPhotoName] = useState<string>('Pothole_Damage_Capture.jpg');

  // Location State
  const [lat, setLat] = useState<number>(12.9279);
  const [lng, setLng] = useState<number>(77.6834);
  const [roadName, setRoadName] = useState<string>('Outer Ring Road (Bellandur)');
  const [area, setArea] = useState<string>('Bellandur EcoWorld');
  const [city, setCity] = useState<string>('Bengaluru');
  const [state, setState] = useState<string>('Karnataka');
  const [pinCode, setPinCode] = useState<string>('560103');
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [gpsAccuracy, setGpsAccuracy] = useState<number | null>(null);
  const [gpsStatusMessage, setGpsStatusMessage] = useState<string>('');

  // Details State
  const [roadType, setRoadType] = useState<RoadType>('Main Road');
  const [trafficLevel, setTrafficLevel] = useState<TrafficLevel>('High');
  const [comments, setComments] = useState<string>('Severe depression on outer lane. Dangerous for two-wheelers.');

  // AI Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<AiAnalysisResult | null>(null);

  // Final Created Report
  const [createdReportId, setCreatedReportId] = useState<string>('');

  // Geolocation handler
  const handleGetGpsLocation = () => {
    if (!navigator.geolocation) {
      setGpsStatusMessage('Geolocation not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setGpsStatusMessage('Acquiring high-precision GPS satellite fix...');

    const timeoutId = setTimeout(() => {
      // Fallback if timeout expires
      setIsLocating(false);
      if (!gpsAccuracy) {
        setGpsStatusMessage('GPS lock finalized (Standard urban cellular accuracy).');
      }
    }, 15000);

    const watchId = navigator.geolocation.watchPosition(
      position => {
        const accuracy = Math.round(position.coords.accuracy);
        setGpsAccuracy(accuracy);
        setLat(+position.coords.latitude.toFixed(5));
        setLng(+position.coords.longitude.toFixed(5));

        if (accuracy <= 25) {
          navigator.geolocation.clearWatch(watchId);
          clearTimeout(timeoutId);
          setIsLocating(false);
          setGpsStatusMessage(`Precise GPS Lock achieved: ±${accuracy}m accuracy.`);
        } else {
          setGpsStatusMessage(`Refining GPS fix: ±${accuracy}m accuracy...`);
        }
      },
      error => {
        clearTimeout(timeoutId);
        setIsLocating(false);
        setGpsStatusMessage('Using default smart city reference coordinates (Bangalore Central).');
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  // Run AI Analysis when arriving at Step 4
  const triggerAiScan = async () => {
    setIsAnalyzing(true);
    try {
      const result = await runDemoAiAnalysis(photoUrl, roadType, trafficLevel);
      setAiResult(result);
    } catch (err) {
      console.error('AI Analysis failed', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Submit Final Report
  const handleFinalSubmit = () => {
    if (!aiResult) return;

    const newReport = addReport({
      roadName,
      area,
      city,
      state,
      pinCode,
      lat,
      lng,
      severity: aiResult.severity,
      priority: aiResult.priority,
      status: 'Reported',
      roadType,
      trafficLevel,
      potholesCount: aiResult.potholesCount,
      damagedAreaSqM: aiResult.damagedAreaSqM,
      healthScore: aiResult.healthScore,
      dangerPercentage: aiResult.dangerPercentage,
      estimatedCostMin: aiResult.estimatedCostMin,
      estimatedCostMax: aiResult.estimatedCostMax,
      materialCost: aiResult.materialCost,
      labourCost: aiResult.labourCost,
      materialKg: aiResult.materialKg,
      comments,
      photoUrl,
    });

    setCreatedReportId(newReport.id);
    setStep(5);

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4F46E5', '#34D399', '#FBBF24', '#DC2626'],
      });
    } catch (e) {
      // ignore in test
    }
  };

  const stepsList = [
    { num: 1, label: 'Photo' },
    { num: 2, label: 'Location' },
    { num: 3, label: 'Details' },
    { num: 4, label: 'AI Analysis' },
    { num: 5, label: 'Submitted' },
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
      {/* Top Header & Step Progress Bar */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Tag label="Citizen Reporting Portal" variant="safety" size="sm" />
              <DemoTag />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-concrete-900 mt-1">
              Report Road Pothole
            </h1>
          </div>
          <span className="text-xs font-mono font-semibold text-concrete-500 bg-asphalt-200 px-3 py-1.5 rounded-lg">
            Step {step} of 5
          </span>
        </div>

        {/* Step Indicator */}
        <div className="w-full bg-white rounded-2xl p-4 border border-asphalt-200 shadow-2xs">
          <div className="flex items-center justify-between relative">
            {/* Background bar */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 h-1 bg-asphalt-200 -z-0 rounded-full" />
            <div
              className="absolute top-1/2 -translate-y-1/2 left-4 h-1 bg-safety-600 -z-0 rounded-full transition-all duration-300"
              style={{ width: `${((step - 1) / (stepsList.length - 1)) * 95}%` }}
            />

            {stepsList.map(s => {
              const isPast = s.num < step;
              const isCurrent = s.num === step;

              let circleClass = 'bg-white border-2 border-asphalt-300 text-concrete-400';
              if (isPast) circleClass = 'bg-signal-600 border-2 border-signal-700 text-white';
              if (isCurrent) circleClass = 'bg-safety-600 border-2 border-safety-700 text-white ring-4 ring-safety-200';

              return (
                <div key={s.num} className="flex flex-col items-center relative z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${circleClass}`}>
                    {isPast ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                  </div>
                  <span className={`mt-1.5 text-xs font-medium ${isCurrent ? 'text-safety-700 font-bold' : isPast ? 'text-concrete-800' : 'text-concrete-400'}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* STEP 1: PHOTO UPLOAD */}
      {step === 1 && (
        <TiltCard maxTilt={3} className="p-6 sm:p-8 bg-white border border-asphalt-200 shadow-sm flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-bold text-concrete-900">
              1. Upload Damage Photo
            </h2>
            <p className="text-xs sm:text-sm text-concrete-600 mt-1">
              Take a clear picture showing the pothole perimeter and surrounding pavement context.
            </p>
          </div>

          {/* Photo Dropzone & Preview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7">
              <label className="border-2 border-dashed border-asphalt-300 hover:border-safety-500 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-asphalt-50 hover:bg-safety-50/30 text-center min-h-[220px]">
                <UploadCloud className="w-10 h-10 text-concrete-400 mb-2" />
                <span className="text-sm font-bold text-concrete-800">
                  Click to browse or drop road photo here
                </span>
                <span className="text-xs text-concrete-500 mt-1">
                  Supports JPG, PNG, WEBP (Max 10MB)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setPhotoName(file.name);
                      const reader = new FileReader();
                      reader.onload = ev => {
                        if (ev.target?.result) setPhotoUrl(ev.target.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>

            {/* Current Selected Preview */}
            <div className="md:col-span-5 flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-concrete-500 font-mono">
                Active Capture Preview
              </span>
              <div className="relative rounded-2xl overflow-hidden border border-asphalt-300 aspect-video shadow-inner bg-black/10">
                <img
                  src={photoUrl}
                  alt="Pothole capture preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[11px] font-mono">
                  {photoName}
                </div>
              </div>
            </div>
          </div>

          {/* Sample Photos Preset Picker */}
          <div>
            <span className="text-xs font-semibold text-concrete-700 block mb-2">
              Or pick from sample road defect captures:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SAMPLE_PHOTOS.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPhotoUrl(sample.url);
                    setPhotoName(`Sample_${idx + 1}_${sample.name.replace(/\s+/g, '_')}.jpg`);
                  }}
                  className={`p-2 rounded-xl border flex items-center gap-2.5 text-left transition-all cursor-pointer ${
                    photoUrl === sample.url
                      ? 'border-safety-600 bg-safety-50/70 ring-2 ring-safety-200'
                      : 'border-asphalt-200 hover:bg-asphalt-50'
                  }`}
                >
                  <img
                    src={sample.url}
                    alt={sample.name}
                    className="w-12 h-10 object-cover rounded-lg shrink-0 border"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-concrete-800 truncate">
                      {sample.name}
                    </p>
                    <span className="text-[10px] text-concrete-500">Sample #{idx + 1}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step Actions */}
          <div className="flex justify-end pt-4 border-t border-asphalt-200">
            <button
              onClick={() => setStep(2)}
              className="btn-3d btn-3d-safety py-2.5 px-6 text-sm flex items-center gap-2"
            >
              <span>Next: Location GPS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </TiltCard>
      )}

      {/* STEP 2: LOCATION & GPS */}
      {step === 2 && (
        <TiltCard maxTilt={3} className="p-6 sm:p-8 bg-white border border-asphalt-200 shadow-sm flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-bold text-concrete-900">
              2. Precise Road Location
            </h2>
            <p className="text-xs sm:text-sm text-concrete-600 mt-1">
              Confirm GPS coordinates and corridor details for municipal crew navigation.
            </p>
          </div>

          {/* GPS Auto-Locate Button & Status */}
          <div className="p-4 rounded-2xl bg-asphalt-50 border border-asphalt-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-route-100 text-route-700 border border-route-200 shrink-0">
                <Navigation className={`w-5 h-5 ${isLocating ? 'animate-spin' : ''}`} />
              </div>
              <div>
                <p className="text-sm font-bold text-concrete-900">
                  Browser Geolocation Auto-Detection
                </p>
                <p className="text-xs text-concrete-600">
                  {gpsStatusMessage || 'Click button to fetch real device coordinates.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGetGpsLocation}
              disabled={isLocating}
              className="btn-3d btn-3d-asphalt py-2 px-4 text-xs font-semibold shrink-0"
            >
              {isLocating ? 'Acquiring GPS...' : 'Use My GPS'}
            </button>
          </div>

          {/* Coordinates & Manual Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-concrete-700 block mb-1.5">
                Road / Landmark Name
              </label>
              <input
                type="text"
                value={roadName}
                onChange={e => setRoadName(e.target.value)}
                placeholder="e.g. Outer Ring Road, 100ft Junction"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-asphalt-300 bg-white focus:outline-none focus:ring-2 focus:ring-safety-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-concrete-700 block mb-1.5">
                Area / Ward / Suburb
              </label>
              <input
                type="text"
                value={area}
                onChange={e => setArea(e.target.value)}
                placeholder="e.g. Bellandur, Indiranagar"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-asphalt-300 bg-white focus:outline-none focus:ring-2 focus:ring-safety-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-concrete-700 block mb-1.5">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-asphalt-300 bg-white focus:outline-none focus:ring-2 focus:ring-safety-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-concrete-700 block mb-1.5">
                  State
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-asphalt-300 bg-white focus:outline-none focus:ring-2 focus:ring-safety-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-concrete-700 block mb-1.5">
                  PIN Code
                </label>
                <input
                  type="text"
                  value={pinCode}
                  onChange={e => setPinCode(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-asphalt-300 bg-white focus:outline-none focus:ring-2 focus:ring-safety-500"
                />
              </div>
            </div>
          </div>

          {/* Embedded Map Simulation with Coordinates Pin */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-concrete-600 font-mono">
                GIS Coordinate Lock Preview
              </span>
              <span className="text-xs font-mono text-concrete-500">
                Lat: {lat} · Lng: {lng}
              </span>
            </div>

            <div className="w-full h-48 rounded-2xl overflow-hidden border border-asphalt-300 relative bg-asphalt-200 flex items-center justify-center">
              {/* Map Canvas Background Grid */}
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 10px 10px, #A8957F 1.5px, transparent 0), linear-gradient(to right, #DDD2C4 1px, transparent 1px), linear-gradient(to bottom, #DDD2C4 1px, transparent 1px)',
                  backgroundSize: '20px 20px, 40px 40px, 40px 40px',
                }}
              />

              {/* Simulated Map Road Networks */}
              <svg className="absolute inset-0 w-full h-full stroke-asphalt-400" fill="none">
                <path d="M 0,80 Q 200,90 400,60 T 800,100" strokeWidth="8" />
                <path d="M 0,80 Q 200,90 400,60 T 800,100" strokeWidth="6" stroke="#FAF8F5" />
                <path d="M 220,0 L 250,200" strokeWidth="6" stroke="#FAF8F5" />
                <path d="M 520,0 L 480,200" strokeWidth="6" stroke="#FAF8F5" />
              </svg>

              {/* Center Pin Marker */}
              <div className="relative z-10 flex flex-col items-center animate-bounce">
                <div className="bg-hazard-600 text-white p-2 rounded-full shadow-lg border-2 border-white">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="mt-1 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full border text-[11px] font-bold text-concrete-800 shadow-xs">
                  {roadName}
                </div>
              </div>
            </div>
          </div>

          {/* Step Actions */}
          <div className="flex justify-between pt-4 border-t border-asphalt-200">
            <button
              onClick={() => setStep(1)}
              className="btn-3d btn-3d-asphalt py-2.5 px-5 text-sm flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(3)}
              className="btn-3d btn-3d-safety py-2.5 px-6 text-sm flex items-center gap-2"
            >
              <span>Next: Road Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </TiltCard>
      )}

      {/* STEP 3: DETAILS & TRAFFIC */}
      {step === 3 && (
        <TiltCard maxTilt={3} className="p-6 sm:p-8 bg-white border border-asphalt-200 shadow-sm flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-bold text-concrete-900">
              3. Road Classification & Traffic
            </h2>
            <p className="text-xs sm:text-sm text-concrete-600 mt-1">
              Select environmental conditions to calibrate risk weighting models.
            </p>
          </div>

          {/* Road Type Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-concrete-700 block mb-2">
              Road Type Classification
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(
                ['Highway', 'Main Road', 'Residential', 'Street', 'School Zone', 'Hospital Zone', 'Other'] as RoadType[]
              ).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setRoadType(type)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-left ${
                    roadType === type
                      ? 'bg-safety-600 text-white border-safety-700 shadow-xs'
                      : 'bg-asphalt-50 hover:bg-asphalt-100 border-asphalt-300 text-concrete-800'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Traffic Density Level */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-concrete-700 block mb-2">
              Average Traffic Volume
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['Low', 'Medium', 'High'] as TrafficLevel[]).map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTrafficLevel(t)}
                  className={`py-3 px-4 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                    trafficLevel === t
                      ? 'bg-concrete-900 text-white border-concrete-950 shadow-xs'
                      : 'bg-asphalt-50 hover:bg-asphalt-100 border-asphalt-300 text-concrete-700'
                  }`}
                >
                  {t} Traffic
                </button>
              ))}
            </div>
          </div>

          {/* Additional Comments */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-concrete-700 block mb-1.5">
              Observer Notes & Hazards (Optional)
            </label>
            <textarea
              rows={3}
              value={comments}
              onChange={e => setComments(e.target.value)}
              placeholder="e.g. Waterlogging nearby, sudden drop, vehicles swerving into oncoming lane..."
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-asphalt-300 bg-white focus:outline-none focus:ring-2 focus:ring-safety-500"
            />
          </div>

          {/* Step Actions */}
          <div className="flex justify-between pt-4 border-t border-asphalt-200">
            <button
              onClick={() => setStep(2)}
              className="btn-3d btn-3d-asphalt py-2.5 px-5 text-sm flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => {
                setStep(4);
                triggerAiScan();
              }}
              className="btn-3d btn-3d-safety py-2.5 px-6 text-sm flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Run AI Neural Scan</span>
            </button>
          </div>
        </TiltCard>
      )}

      {/* STEP 4: AI ANALYSIS RESULTS */}
      {step === 4 && (
        <div className="flex flex-col gap-6">
          {isAnalyzing ? (
            <TiltCard maxTilt={2} className="p-12 bg-white border border-asphalt-200 shadow-sm flex flex-col items-center justify-center text-center gap-4 min-h-[350px]">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-safety-50 border-2 border-safety-600 flex items-center justify-center animate-spin" style={{ animationDuration: '4s' }}>
                  <Cpu className="w-8 h-8 text-safety-600" />
                </div>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-hazard-500 rounded-full animate-ping" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-concrete-900">
                  Running Neural Photogrammetry Scan...
                </h3>
                <p className="text-xs text-concrete-600 mt-1 max-w-sm">
                  Analyzing surface curvature, asphalt degradation depth, risk radius, and municipal material estimation.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-concrete-500 bg-asphalt-100 px-3 py-1.5 rounded-full border">
                <span className="w-2 h-2 rounded-full bg-safety-600 animate-pulse" />
                Processing model: RG-Vision-v4-Pavement
              </div>
            </TiltCard>
          ) : aiResult ? (
            <div className="flex flex-col gap-6">
              {/* Header Bar */}
              <div className="p-4 rounded-2xl bg-white border border-asphalt-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-signal-100 text-signal-700 border border-signal-200">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-concrete-900">
                      AI Analysis Complete · Confidence {aiResult.confidenceScore}%
                    </h3>
                    <p className="text-xs text-concrete-500">
                      {roadName} · {roadType} ({trafficLevel} Traffic)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <SeverityBadge severity={aiResult.severity} />
                  <PriorityBadge priority={aiResult.priority} />
                </div>
              </div>

              {/* Gauges & Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Road Health Speedometer Gauge */}
                <TiltCard maxTilt={5} className="p-6 bg-white border border-asphalt-200 shadow-sm flex flex-col justify-between items-center text-center">
                  <div className="w-full flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-concrete-500 font-mono">
                      Surface Health Score
                    </span>
                    <DemoTag />
                  </div>

                  <RoadHealthGauge score={aiResult.healthScore} size={200} />

                  <p className="text-xs text-concrete-500 mt-3 text-center">
                    Computed via surface planar stability & structural base index.
                  </p>
                </TiltCard>

                {/* Right: Danger Meter & Detected Features */}
                <TiltCard maxTilt={5} className="p-6 bg-white border border-asphalt-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-concrete-500 font-mono">
                        Accident Risk Probability
                      </span>
                      <DemoTag />
                    </div>

                    <DangerMeter percentage={aiResult.dangerPercentage} />

                    {/* Detected Features list */}
                    <div className="mt-6 pt-4 border-t border-asphalt-200">
                      <span className="text-xs font-bold text-concrete-700 block mb-2 font-mono">
                        AI Neural Detections:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {aiResult.detectedFeatures.map((feat, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-asphalt-100 border border-asphalt-200 text-xs font-medium text-concrete-700 flex items-center gap-1"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-safety-600" />
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-asphalt-100 flex items-center justify-between text-xs font-mono text-concrete-600">
                    <span>Cavity Count: <strong>{aiResult.potholesCount}</strong></span>
                    <span>Footprint: <strong>{aiResult.damagedAreaSqM} m²</strong></span>
                  </div>
                </TiltCard>
              </div>

              {/* Budget Card Component */}
              <BudgetCard
                costMin={aiResult.estimatedCostMin}
                costMax={aiResult.estimatedCostMax}
                materialCost={aiResult.materialCost}
                labourCost={aiResult.labourCost}
                materialKg={aiResult.materialKg}
                damagedAreaSqM={aiResult.damagedAreaSqM}
              />

              {/* Step Navigation */}
              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setStep(3)}
                  className="btn-3d btn-3d-asphalt py-2.5 px-5 text-sm flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Adjust Details</span>
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className="btn-3d btn-3d-signal py-3 px-8 text-sm sm:text-base flex items-center gap-2 shadow-lg"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Submit Municipal Report</span>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* STEP 5: CONFIRMATION & CITIZEN REWARD */}
      {step === 5 && (
        <TiltCard maxTilt={3} className="p-8 sm:p-10 bg-white border border-asphalt-200 shadow-md flex flex-col items-center text-center gap-6">
          <div className="w-16 h-16 rounded-full bg-signal-100 border-2 border-signal-600 text-signal-700 flex items-center justify-center shadow-md animate-bounce">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>

          <div className="max-w-md">
            <Tag label="Report Queued Successfully" variant="signal" size="md" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-concrete-900 mt-2">
              Report {createdReportId} Logged!
            </h2>
            <p className="text-sm text-concrete-600 mt-2">
              Your road defect report on <strong>{roadName}</strong> has been prioritized by the municipal smart routing engine.
            </p>
          </div>

          {/* Reward Alert Box */}
          <div className="w-full max-w-md p-4 rounded-2xl bg-gradient-to-r from-safety-50 to-caution-50 border border-safety-200 flex items-center justify-between text-left">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-caution-100 text-caution-800 border border-caution-200">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-concrete-900 font-mono">
                  Civic Guardian Reward
                </p>
                <p className="text-xs text-concrete-600">
                  +120 Points awarded to your citizen profile!
                </p>
              </div>
            </div>
            <span className="text-lg font-extrabold font-mono text-safety-700">
              +120 PTS
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 w-full">
            <button
              onClick={() => navigate('/reports')}
              className="btn-3d btn-3d-safety py-3 px-6 text-sm flex items-center gap-2"
            >
              <span>View My Reports</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setStep(1);
                setAiResult(null);
              }}
              className="btn-3d btn-3d-asphalt py-3 px-5 text-sm flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Report Another Pothole</span>
            </button>
          </div>
        </TiltCard>
      )}
    </div>
  );
};
