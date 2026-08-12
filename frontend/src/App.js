import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Marquee from './components/Marquee';
import AboutSection from './components/AboutSection';
import WhySection from './components/WhySection';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import ProcessSection from './components/ProcessSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AudioPlayer from './components/AudioPlayer';
import './App.css';

const ClientApp = lazy(() => import('./portal/ClientApp'));
const AdminApp = lazy(() => import('./admin/AdminApp'));

function HomePage() {
  return (
    <div className="App">
      <CustomCursor />
      <AudioPlayer />
      <Navbar />
      <main>
        <HeroSection />
        <Marquee />
        <AboutSection />
        <WhySection />
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/cliente/*"
        element={
          <Suspense fallback={null}>
            <ClientApp />
          </Suspense>
        }
      />
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={null}>
            <AdminApp />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
