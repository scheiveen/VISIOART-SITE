import React, { useEffect, useRef } from "react";
import { statsData } from "../data/mock";
import "./AboutSection.css";

const AboutSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el) => {
              el.classList.add("revealed");
            });
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="sobre" className="about-section" ref={sectionRef}>
      <div className="about-bg-video">
        <video 
          className="about-video"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="https://videos.pexels.com/video-files/4625771/4625771-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        <div className="about-video-overlay"></div>
      </div>
      
      <div className="about-grid">
        <div className="about-left reveal">
          <span className="section-label">Quem Somos</span>
          <h2 className="section-title">Sobre a VISIOART</h2>
        </div>

        <div className="about-right reveal reveal-delay-1">
          <div className="about-text">
            <p>
              Na <strong>VISIOART</strong>, cada frame conta uma história. Somos
              uma produtora audiovisual que une <em>arte, técnica e emoção </em>
              para criar filmes que transcendem o comum.
            </p>
            <p>
              Especializamo-nos em capturar momentos únicos e transformá-los em{" "}
              <strong>narrativas cinematográficas</strong>
              que permanecem na memória.
            </p>
          </div>

          <div className="about-stats">
            {statsData.map((stat, index) => (
              <div key={index} className="stat">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
