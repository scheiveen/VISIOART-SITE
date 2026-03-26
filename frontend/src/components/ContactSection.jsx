import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MessageCircle, Mail, MapPin } from 'lucide-react';
import { contactInfo } from '../data/mock';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (value) => {
    setFormData(prev => ({
      ...prev,
      service: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with backend SendGrid API
    console.log('Form submitted:', formData);
    alert('Formulário enviado! Entraremos em contato em breve.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: ''
    });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Olá! Gostaria de solicitar um orçamento para produção audiovisual.');
    window.open(`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  return (
    <section id="contato" className="relative py-24 bg-neutral-950">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-5">
        <img 
          src="https://images.unsplash.com/photo-1611540881474-bf7c8731bfd2"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            SE SUA MARCA PRECISA SER VISTA<br />COM MAIS FORÇA,
          </h2>
          <p className="text-2xl md:text-3xl text-white/80">
            O PRÓXIMO PROJETO COMEÇA AQUI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-neutral-900/80 backdrop-blur-sm p-8 border border-neutral-800">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Solicitar Orçamento
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white mb-2 block">
                  Nome Completo *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-neutral-800 border-neutral-700 text-white"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white mb-2 block">
                  E-mail *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-neutral-800 border-neutral-700 text-white"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-white mb-2 block">
                  Telefone *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-neutral-800 border-neutral-700 text-white"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <Label htmlFor="company" className="text-white mb-2 block">
                  Empresa
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-neutral-800 border-neutral-700 text-white"
                  placeholder="Nome da empresa"
                />
              </div>

              <div>
                <Label htmlFor="service" className="text-white mb-2 block">
                  Serviço de Interesse *
                </Label>
                <Select value={formData.service} onValueChange={handleServiceChange} required>
                  <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                    <SelectValue placeholder="Selecione um serviço" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
                    <SelectItem value="institucional">Vídeo Institucional</SelectItem>
                    <SelectItem value="marcas">Conteúdo para Marcas</SelectItem>
                    <SelectItem value="reels">Reels e Vídeos Verticais</SelectItem>
                    <SelectItem value="eventos">Cobertura de Eventos</SelectItem>
                    <SelectItem value="campanha">Filmes de Campanha</SelectItem>
                    <SelectItem value="construcao">Construção Civil</SelectItem>
                    <SelectItem value="storytelling">Storytelling de Marca</SelectItem>
                    <SelectItem value="pos">Pós-produção</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message" className="text-white mb-2 block">
                  Mensagem *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="bg-neutral-800 border-neutral-700 text-white"
                  placeholder="Conte-nos sobre seu projeto..."
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-white text-black hover:bg-white/90 font-semibold tracking-wide py-6"
              >
                ENVIAR SOLICITAÇÃO
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-neutral-900/80 backdrop-blur-sm p-8 border border-neutral-800">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Outras Formas de Contato
              </h3>
              
              <div className="space-y-6">
                <button 
                  onClick={handleWhatsApp}
                  className="flex items-center gap-4 w-full text-left group"
                >
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-colors">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold group-hover:underline">
                      WhatsApp
                    </p>
                    <p className="text-white/60 text-sm">
                      {contactInfo.whatsapp}
                    </p>
                  </div>
                </button>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">
                      E-mail
                    </p>
                    <p className="text-white/60 text-sm">
                      {contactInfo.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">
                      Localização
                    </p>
                    <p className="text-white/60 text-sm">
                      {contactInfo.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900/80 backdrop-blur-sm p-8 border border-neutral-800">
              <h3 className="text-xl font-semibold text-white mb-4">
                Horário de Atendimento
              </h3>
              <p className="text-white/60">
                Segunda a Sexta: 9h às 18h
              </p>
              <p className="text-white/60">
                Sábado: 9h às 13h
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
