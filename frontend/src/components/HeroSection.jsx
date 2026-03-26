import React from 'react';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1597465103212-7cd0b847a246"
          alt="Cinematic Production"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full flex flex-col justify-center">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
            FILMES QUE ELEVAM<br />
            MARCAS, NEGÓCIOS<br />
            E MOMENTOS
          </h1>
          
          <div className="mb-8">
            <p className="text-xl md:text-2xl text-white/80 font-light tracking-[0.2em]">
              FROM VISION TO CINEMA
            </p>
          </div>

          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl leading-relaxed">
            Transformamos ideias em produções audiovisuais com direção, estética e propósito.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => scrollToSection('contato')}
              size="lg"
              className="bg-white text-black hover:bg-white/90 font-semibold tracking-wide text-base px-8 py-6"
            >
              SOLICITAR ORÇAMENTO
            </Button>
            <Button 
              onClick={() => scrollToSection('cases')}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black font-semibold tracking-wide text-base px-8 py-6"
            >
              VER CASES
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={() => scrollToSection('manifesto')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-all animate-bounce cursor-pointer"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default HeroSection;
