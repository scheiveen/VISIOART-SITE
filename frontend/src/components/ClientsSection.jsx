import React from 'react';
import { mockClients } from '../data/mock';

const ClientsSection = () => {
  return (
    <section className="relative py-24 bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            MARCAS E PROJETOS QUE CONFIAM NA VISIOART
          </h2>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-5xl mx-auto">
          {mockClients.map((client, index) => (
            <div 
              key={index}
              className="flex items-center justify-center p-6 bg-neutral-900/30 border border-neutral-800 hover:border-white/20 transition-all duration-300"
            >
              <p className="text-white/60 font-semibold text-center text-sm">
                {client}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
