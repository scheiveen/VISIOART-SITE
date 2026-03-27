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
        <h2 className="section-title">Serviços</h2>
        <span className="section-label">O que fazemos</span>
      </div>

      <div className="services-grid">
        {mockServices.map((service, index) => (
          <div key={service.id} className="service-card reveal">
            <div className="service-image">
              <img src={service.image} alt={service.name} />
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
