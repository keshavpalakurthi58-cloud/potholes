/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ReportProvider } from './context/ReportContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LandingPage } from './pages/LandingPage';
import { ReportPage } from './pages/ReportPage';
import { MyReportsPage } from './pages/MyReportsPage';
import { LiveMapPage } from './pages/LiveMapPage';
import { RewardsPage } from './pages/RewardsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminReportDetailPage } from './pages/AdminReportDetailPage';

// Scroll to top on route change helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <ReportProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-asphalt-100 text-concrete-900 selection:bg-safety-200 selection:text-safety-900">
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/reports" element={<MyReportsPage />} />
              <Route path="/map" element={<LiveMapPage />} />
              <Route path="/rewards" element={<RewardsPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/report/:id" element={<AdminReportDetailPage />} />
              {/* Fallback route */}
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ReportProvider>
  );
}
