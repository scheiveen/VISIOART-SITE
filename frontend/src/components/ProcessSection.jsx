import React, { useEffect, useRef } from 'react';
import { mockProcess } from '../data/mock';
import './ProcessSection.css';

const ProcessSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('revealed');
              }, index * 150);
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
    <section id="processo" className="process-section" ref={sectionRef}>
      <div className="process-header">
        <span className="section-label">Como Trabalhamos</span>
        <h2 className="section-title">Processo</h2>
      </div>

      <div className="process-steps">
        {mockProcess.map((step) => (
          <div key={step.id} className="process-step reveal">
            <div className="step-num">{step.num}</div>
            <div className="step-name">{step.name}</div>
            <div className="step-desc">{step.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProcessSection;
