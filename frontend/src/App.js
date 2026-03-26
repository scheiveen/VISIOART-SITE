import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ManifestoSection from './components/ManifestoSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import DifferentialsSection from './components/DifferentialsSection';
import CasesSection from './components/CasesSection';
import ProcessSection from './components/ProcessSection';
import TestimonialsSection from './components/TestimonialsSection';
import ClientsSection from './components/ClientsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App bg-black min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ManifestoSection />
        <AboutSection />
        <ServicesSection />
        <DifferentialsSection />
        <CasesSection />
        <ProcessSection />
        <TestimonialsSection />
        <ClientsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
