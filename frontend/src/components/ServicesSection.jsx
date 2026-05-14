import React, { useEffect, useRef } from 'react';
import { mockServices } from '../data/mock';
import './ServicesSection.css';

const ServicesSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('revealed');
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="servicos" className="services-section" ref={sectionRef}>
      <div className="services-header">
        <h2 className="section-title">Como Transformamos Memórias</h2>
        <span className="section-label">Não são serviços. São legados eternizados em cinema.</span>
      </div>

      <div className="services-grid">
        {mockServices.map((service, index) => (
          <div key={service.id} className="service-card reveal">
            <div className="service-video-wrapper">
              <video 
                className="service-video"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src={service.video} type="video/mp4" />
              </video>
              <div className="service-overlay">
                <div className="service-num">{service.num}</div>
              </div>
            </div>
            <div className="service-content">
              <h3 className="service-name">{service.name}</h3>
              <p className="service-desc">{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
