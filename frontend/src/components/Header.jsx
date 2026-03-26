import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_03e448db-e7d2-4d77-a0a4-1a3c79d64d00/artifacts/pb16y9ug_png%20impressao%5D.png" 
              alt="VISIOART" 
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('sobre')}
              className="text-white/90 hover:text-white transition-colors text-sm font-medium tracking-wide"
            >
              SOBRE
            </button>
            <button 
              onClick={() => scrollToSection('servicos')}
              className="text-white/90 hover:text-white transition-colors text-sm font-medium tracking-wide"
            >
              SERVIÇOS
            </button>
            <button 
              onClick={() => scrollToSection('cases')}
              className="text-white/90 hover:text-white transition-colors text-sm font-medium tracking-wide"
            >
              CASES
            </button>
            <button 
              onClick={() => scrollToSection('processo')}
              className="text-white/90 hover:text-white transition-colors text-sm font-medium tracking-wide"
            >
              PROCESSO
            </button>
            <Button 
              onClick={() => scrollToSection('contato')}
              className="bg-white text-black hover:bg-white/90 font-medium tracking-wide"
            >
              SOLICITAR ORÇAMENTO
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md py-4 space-y-4">
            <button 
              onClick={() => scrollToSection('sobre')}
              className="block w-full text-left px-4 py-2 text-white/90 hover:text-white transition-colors text-sm font-medium tracking-wide"
            >
              SOBRE
            </button>
            <button 
              onClick={() => scrollToSection('servicos')}
              className="block w-full text-left px-4 py-2 text-white/90 hover:text-white transition-colors text-sm font-medium tracking-wide"
            >
              SERVIÇOS
            </button>
            <button 
              onClick={() => scrollToSection('cases')}
              className="block w-full text-left px-4 py-2 text-white/90 hover:text-white transition-colors text-sm font-medium tracking-wide"
            >
              CASES
            </button>
            <button 
              onClick={() => scrollToSection('processo')}
              className="block w-full text-left px-4 py-2 text-white/90 hover:text-white transition-colors text-sm font-medium tracking-wide"
            >
              PROCESSO
            </button>
            <div className="px-4">
              <Button 
                onClick={() => scrollToSection('contato')}
                className="w-full bg-white text-black hover:bg-white/90 font-medium tracking-wide"
              >
                SOLICITAR ORÇAMENTO
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
