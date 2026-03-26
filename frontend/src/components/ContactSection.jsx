import React, { useEffect, useRef } from 'react';
import { contactInfo } from '../data/mock';
import './ContactSection.css';

const ContactSection = () => {
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

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços da VISIOART.');
    window.open(`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  return (
    <section id="contato" className="contact-section" ref={sectionRef}>
      <p className="contact-tagline reveal">
        Pronto para transformar sua visão em cinema?
      </p>

      <h2 className="contact-big reveal reveal-delay-1">
        Vamos criar algo <em>extraordinário</em> juntos
      </h2>

      <a 
        href={`mailto:${contactInfo.email}`} 
        className="contact-email reveal reveal-delay-2"
      >
        {contactInfo.email}
      </a>

      <div className="contact-divider reveal reveal-delay-3"></div>

      <div className="contact-info reveal reveal-delay-3">
        <button onClick={handleWhatsApp} className="contact-link">
          WhatsApp
        </button>
        <a 
          href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
        >
          Instagram
        </a>
        <span className="contact-link">{contactInfo.location}</span>
      </div>
    </section>
  );
};

export default ContactSection;
