import React, { useEffect } from 'react';
import { heroVideo } from '../data/mock';
import './HeroSection.css';

const HeroSection = () => {
  useEffect(() => {
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.animation = 'fadeUp 1s ease-out forwards';
      }, index * 100);
    });
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero-bg">
        <video 
          className="hero-video"
          autoPlay 
          loop 
          muted 
          playsInline
          poster=""
        >
          <source src={heroVideo.desktop} type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-grain"></div>
        <div className="hero-lines"></div>
      </div>

      <div className="hero-content">
        <span className="hero-eyebrow">PRODUÇÃO AUDIOVISUAL</span>
        <h1 className="hero-title">
          Transformamos histórias reais em <em>filmes que permanecem por gerações</em>
        </h1>
        <p className="hero-subtitle">
          Porque algumas histórias merecem ser lembradas para sempre
        </p>
        <a href="#contato" className="hero-cta">Eternizar Minha História</a>
      </div>

      <div className="hero-scroll">
        <div className="scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default HeroSection;
