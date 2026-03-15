import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy loading pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Updates = lazy(() => import('./pages/Updates'));
const Customers = lazy(() => import('./pages/Customers'));
const Admin = lazy(() => import('./pages/Admin'));

// New Service Pages
const AirFreight = lazy(() => import('./pages/services/AirFreight'));
const OceanFreight = lazy(() => import('./pages/services/OceanFreight'));
const RoadFreight = lazy(() => import('./pages/services/RoadFreight'));
const Warehousing = lazy(() => import('./pages/services/Warehousing'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));

function App() {
  return (
    <Router>
      <div className="relative w-full">
        <Navbar />
        <main className="relative z-10 w-full">
          <Suspense fallback={
            <div className="flex-1 flex items-center justify-center bg-background min-h-screen">
              <div className="animate-spin text-brand-primary h-12 w-12 border-[3px] border-muted border-t-brand-primary rounded-full"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/air" element={<AirFreight />} />
              <Route path="/services/ocean" element={<OceanFreight />} />
              <Route path="/services/road" element={<RoadFreight />} />
              <Route path="/services/warehousing" element={<Warehousing />} />
              <Route path="/updates" element={<Updates />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/terms" element={<TermsAndConditions />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
