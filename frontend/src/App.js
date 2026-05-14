import React from 'react';
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

function App() {
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

export default App;
