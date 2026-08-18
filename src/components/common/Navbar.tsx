import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Bell, PlusCircle, CheckCircle2, AlertTriangle, Sparkles, MapPin } from 'lucide-react';
import { useReports } from '../../context/ReportContext';

export const Navbar: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useReports();
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Live Map', path: '/map' },
    { name: 'Reports', path: '/reports' },
    { name: 'Rewards', path: '/rewards' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#F5F2EA]/85 border-b border-[#D1CFB9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Zone (Single clean line) */}
        <Link
          to="/"
          className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded p-1"
        >
          <div className="w-8 h-8 bg-[#4F46E5] rounded flex items-center justify-center shadow-[0_4px_0_0_#3730A3] text-white">
            <Shield className="w-4.5 h-4.5" />
          </div>
          <span className="font-['Space_Grotesk'] text-xl font-bold tracking-tight text-[#262624]">
            ROADGUARD AI
          </span>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium">
          {navLinks.map(link => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive: active }) =>
                  `transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] ${
                    active || isActive
                      ? 'text-[#4F46E5] border-b-2 border-[#4F46E5] pb-0.5 font-bold'
                      : 'text-[#262624] opacity-65 hover:opacity-100 pb-0.5'
                  }`
                }
              >
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Action Zone: Notifications + 3D CTA */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Notification Bell */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              aria-label="Notifications"
              className="relative p-2 rounded-lg text-[#262624] opacity-75 hover:opacity-100 hover:bg-[#EAE7DC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-[#F5F2EA] animate-pulse" />
              )}
            </button>

            {/* Notification Dropdown Menu */}
            {showNotifDropdown && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white border border-[#D1CFB9] shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2 border-b border-[#D1CFB9] flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#55524B] font-['IBM_Plex_Mono']">
                    Notifications ({unreadCount} new)
                  </span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs text-[#4F46E5] hover:underline font-semibold cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-[#EAE7DC]">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-center text-xs text-[#55524B]">
                      No notifications yet
                    </p>
                  ) : (
                    notifications.map(notif => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          markNotificationRead(notif.id);
                          if (notif.reportId) {
                            navigate(`/reports`);
                            setShowNotifDropdown(false);
                          }
                        }}
                        className={`p-3.5 hover:bg-[#FAF8F3] cursor-pointer transition-colors flex gap-3 ${
                          !notif.read ? 'bg-[#EEF2FF]/60' : ''
                        }`}
                      >
                        <div className="shrink-0 mt-0.5">
                          {notif.type === 'reward' && (
                            <Sparkles className="w-4 h-4 text-amber-600" />
                          )}
                          {notif.type === 'status_update' && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          )}
                          {notif.type === 'urgent_alert' && (
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                          )}
                          {notif.type === 'system' && (
                            <MapPin className="w-4 h-4 text-sky-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-[#262624] leading-snug">
                            {notif.title}
                          </p>
                          <p className="text-xs text-[#55524B] mt-0.5 line-clamp-2">
                            {notif.message}
                          </p>
                          <span className="text-[10px] text-gray-500 font-['IBM_Plex_Mono'] mt-1 block">
                            {notif.timestamp}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 3D Primary Button */}
          <Link
            to="/report"
            className="bg-[#4F46E5] text-white px-4 sm:px-5 py-2 rounded text-xs sm:text-sm font-bold shadow-[0_4px_0_0_#3730A3] active:translate-y-[2px] active:shadow-[0_2px_0_0_#3730A3] hover:bg-[#4338CA] transition-all flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Report Pothole</span>
          </Link>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center gap-1.5 overflow-x-auto px-4 py-2 border-t border-[#D1CFB9] bg-[#EAE7DC]/90 no-scrollbar">
        {navLinks.map(link => {
          const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={`px-3 py-1 rounded text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                isActive
                  ? 'bg-[#262624] text-white'
                  : 'bg-white text-[#262624] border border-[#D1CFB9]'
              }`}
            >
              {link.name}
            </NavLink>
          );
        })}
      </div>
    </header>
  );
};

