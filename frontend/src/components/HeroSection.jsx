import React, { useEffect } from "react";
import "./HeroSection.css";

const HeroSection = () => {
  useEffect(() => {
    const heroElements = document.querySelectorAll(".hero-content > *");
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.animation = "fadeUp 1s ease-out forwards";
      }, index * 100);
    });
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero-bg">
        <div className="hero-grain"></div>
        <div className="hero-lines"></div>
      </div>

      <div className="hero-content">
        <span className="hero-eyebrow">PRODUÇÃO AUDIOVISUAL</span>
        <h1 className="hero-title">
          DA VISÃO AO <em>Cinema</em>
        </h1>
        <p className="hero-subtitle">
          Transformamos momentos em narrativas cinematográficas
          <br />
          que emocionam, inspiram e permanecem
        </p>
        <a href="#contato" className="hero-cta">
          Iniciar Projeto
        </a>
      </div>

      <div className="hero-scroll">
        <div className="scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default HeroSection;
