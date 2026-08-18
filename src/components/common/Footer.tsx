import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MapPin, CheckCircle } from 'lucide-react';
import { DemoTag } from './Badges';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#EAE7DC]/80 border-t border-[#D1CFB9] mt-16 pt-12 pb-8 text-[#55524B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#4F46E5] text-white flex items-center justify-center shadow-[0_4px_0_0_#3730A3]">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-['Space_Grotesk'] text-xl font-bold tracking-tight text-[#262624]">
                ROADGUARD AI
              </span>
            </div>
            <p className="text-sm text-[#55524B] max-w-md leading-relaxed">
              Autonomous smart-city road infrastructure intelligence platform. Connecting active citizen reporting with prioritized municipal repair operations, predictive asphalt budgeting, and verified quality audits.
            </p>
            <div className="mt-1">
              <DemoTag />
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#262624] font-['IBM_Plex_Mono'] mb-3">
              Citizen Modules
            </h4>
            <ul className="space-y-2 text-sm text-[#55524B]">
              <li>
                <Link to="/report" className="hover:text-[#4F46E5] transition-colors">
                  Report a Road Pothole
                </Link>
              </li>
              <li>
                <Link to="/reports" className="hover:text-[#4F46E5] transition-colors">
                  Track My Reports
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-[#4F46E5] transition-colors">
                  Live City Defect Heatmap
                </Link>
              </li>
              <li>
                <Link to="/rewards" className="hover:text-[#4F46E5] transition-colors">
                  Citizen Rewards & Badges
                </Link>
              </li>
            </ul>
          </div>

          {/* Municipal Authority */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#262624] font-['IBM_Plex_Mono'] mb-3">
              Authority Operations
            </h4>
            <ul className="space-y-2 text-sm text-[#55524B]">
              <li>
                <Link to="/admin" className="hover:text-[#4F46E5] transition-colors">
                  Government Command Center
                </Link>
              </li>
              <li>
                <span className="text-[#706D64] flex items-center gap-1.5 text-xs">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  IRC:SP-100 Compliant AI
                </span>
              </li>
              <li>
                <span className="text-[#706D64] flex items-center gap-1.5 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-sky-600" />
                  Smart City Mesh v4.2
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="pt-6 border-t border-[#D1CFB9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#706D64]">
          <p>
            © {new Date().getFullYear()} RoadGuard AI · Municipal Smart City Initiative. Demonstration Prototype.
          </p>
          <p className="font-['IBM_Plex_Mono'] text-center sm:text-right">
            All AI hazard evaluations, budgets, and road metrics are demo/simulated figures.
          </p>
        </div>
      </div>
    </footer>
  );
};

