import React from 'react';
import { contactInfo } from '../data/mock';
import { Mail, Instagram, MapPin } from 'lucide-react';
import WhatsAppForm from './WhatsAppForm';
import './ContactSection.css';

const ContactSection = () => {
  return (
    <section id="contato" className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <span className="section-label">Entre em Contato</span>
          <h2 className="section-title-contact">Vamos criar algo extraordinário juntos</h2>
        </div>

        <div className="contact-content">
          <div className="contact-info-wrapper">
            <div className="contact-info-box">
              <h3>Peça seu orçamento</h3>
              <p className="contact-form-intro">
                Responda rapidinho e continue a conversa com a gente no WhatsApp.
              </p>
              <WhatsAppForm />
            </div>

            <div className="contact-methods-grid">
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
    </section>
  );
};

export default ContactSection;
