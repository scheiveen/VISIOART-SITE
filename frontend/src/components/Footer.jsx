import React from 'react';
import { contactInfo } from '../data/mock';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-neutral-900">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo and Slogan */}
          <div className="col-span-1 md:col-span-2">
            <img 
              src="https://customer-assets.emergentagent.com/job_03e448db-e7d2-4d77-a0a4-1a3c79d64d00/artifacts/pb16y9ug_png%20impressao%5D.png" 
              alt="VISIOART" 
              className="h-12 w-auto mb-6"
            />
            <p className="text-xl text-white/80 font-light tracking-[0.2em] mb-4">
              FROM VISION TO CINEMA
            </p>
            <p className="text-white/60 leading-relaxed max-w-md">
              Produtora audiovisual especializada em transformar visão em narrativa cinematográfica.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide">
              NAVEGAÇÃO
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#sobre" className="text-white/60 hover:text-white transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#servicos" className="text-white/60 hover:text-white transition-colors">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#cases" className="text-white/60 hover:text-white transition-colors">
                  Cases
                </a>
              </li>
              <li>
                <a href="#processo" className="text-white/60 hover:text-white transition-colors">
                  Processo
                </a>
              </li>
              <li>
                <a href="#contato" className="text-white/60 hover:text-white transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide">
              CONTATO
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-white/60 mt-1 flex-shrink-0" />
                <span className="text-white/60 text-sm">
                  {contactInfo.whatsapp}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-white/60 mt-1 flex-shrink-0" />
                <span className="text-white/60 text-sm">
                  {contactInfo.email}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-white/60 mt-1 flex-shrink-0" />
                <span className="text-white/60 text-sm">
                  {contactInfo.location}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Instagram className="w-4 h-4 text-white/60 mt-1 flex-shrink-0" />
                <a 
                  href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors text-sm"
                >
                  {contactInfo.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} VISIOART. Todos os direitos reservados.
            </p>
            <p className="text-white/40 text-sm">
              Produção Audiovisual Premium
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
