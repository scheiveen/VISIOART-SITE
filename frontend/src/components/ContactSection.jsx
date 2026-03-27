import React, { useState } from 'react';
import { contactInfo } from '../data/mock';
import './ContactSection.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        });
      } else {
        throw new Error(data.detail || 'Erro ao enviar mensagem');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Erro ao enviar mensagem. Tente novamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          {/* Formulário */}
          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nome Completo *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder="Seu nome"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-mail *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Telefone *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Empresa</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="Nome da empresa"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="service">Serviço de Interesse *</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Selecione um serviço</option>
                  <option value="casamento">Vídeos de Casamento</option>
                  <option value="eventos">Eventos Corporativos</option>
                  <option value="institucional">Filmes Institucionais</option>
                  <option value="digital">Conteúdo Digital</option>
                  <option value="publicidade">Publicidade</option>
                  <option value="construcao">Construção Civil</option>
                  <option value="outros">Outros</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensagem *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  disabled={isSubmitting}
                  placeholder="Conte-nos sobre seu projeto..."
                />
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </button>

              {submitStatus && (
                <div className={`status-message ${submitStatus.type}`}>
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>

          {/* Informações de Contato */}
          <div className="contact-info-wrapper">
            <div className="contact-info-box">
              <h3>Outras Formas de Contato</h3>
              
              <button onClick={handleWhatsApp} className="contact-method whatsapp">
                <span className="contact-icon">📱</span>
                <div>
                  <strong>WhatsApp</strong>
                  <p>{contactInfo.whatsappDisplay || contactInfo.whatsapp}</p>
                </div>
              </button>

              <a href={`mailto:${contactInfo.email}`} className="contact-method">
                <span className="contact-icon">✉️</span>
                <div>
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
                <span className="contact-icon">📸</span>
                <div>
                  <strong>Instagram</strong>
                  <p>{contactInfo.instagram}</p>
                </div>
              </a>

              <div className="contact-method">
                <span className="contact-icon">📍</span>
                <div>
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
