import React, { useEffect, useRef, useState } from 'react';
import { mockPortfolio } from '../data/mock';
import './PortfolioSection.css';

const PortfolioSection = () => {
  const sectionRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);

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
    <section id="portfolio" className="portfolio-section" ref={sectionRef}>
      <div className="portfolio-header">
        <span className="section-label">Cada projeto é uma vida transformada em cinema</span>
        <h2 className="section-title">Histórias Que Já Eternizamos</h2>
      </div>

      <div className="portfolio-grid">
        {mockPortfolio.map((item, index) => (
          <div
            key={item.id}
            className={`portfolio-item reveal ${item.featured ? 'featured' : ''}`}
            onClick={() => setSelectedItem(item)}
          >
            <video 
              className="portfolio-video"
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src={item.video} type="video/mp4" />
            </video>
            <div className="portfolio-overlay">
              <div className="portfolio-info">
                <span className="portfolio-tag">{item.tag}</span>
                <h3 className="portfolio-title">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
