import React from 'react';
import { contactInfo } from '../data/mock';
import { MessageCircle, Mail, Instagram, MapPin } from 'lucide-react';
import './ContactSection.css';

const ContactSection = () => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços da VISIOART.');
    window.open(`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  return (
    <section id="contato" className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <span className="section-label">Entre em Contato</span>
          <h2 className="section-title-contact">Vamos criar algo extraordinário juntos</h2>
        </div>

        <div className="contact-content">
          {/* Informações de Contato */}
          <div className="contact-info-wrapper">
            <div className="contact-info-box">
              <h3>Fale Conosco</h3>
              
              <div className="contact-methods-grid">
                <button onClick={handleWhatsApp} className="contact-method whatsapp">
                  <MessageCircle className="contact-icon" size={24} strokeWidth={1.5} />
                  <div className="contact-details">
                    <strong>WhatsApp</strong>
                    <p>{contactInfo.whatsappDisplay || contactInfo.whatsapp}</p>
                  </div>
                </button>

                <a href={`mailto:${contactInfo.email}`} className="contact-method">
                  <Mail className="contact-icon" size={24} strokeWidth={1.5} />
                  <div className="contact-details">
                    <strong>E-mail</strong>
                    <p>{contactInfo.email}</p>
                  </div>
                </a>

                <a 
                  href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-method"
                >
                  <Instagram className="contact-icon" size={24} strokeWidth={1.5} />
                  <div className="contact-details">
                    <strong>Instagram</strong>
                    <p>{contactInfo.instagram}</p>
                  </div>
                </a>

                <div className="contact-method">
                  <MapPin className="contact-icon" size={24} strokeWidth={1.5} />
                  <div className="contact-details">
                    <strong>Localização</strong>
                    <p>{contactInfo.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
