import React from 'react';
import { mockDifferentials } from '../data/mock';
import { Check } from 'lucide-react';

const DifferentialsSection = () => {
  return (
    <section className="relative py-24 bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            DIFERENCIAIS
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            O que torna cada projeto VISIOART único
          </p>
        </div>

        {/* Differentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {mockDifferentials.map((differential) => (
            <div 
              key={differential.id}
              className="group relative p-8 bg-neutral-900/50 border border-neutral-800 hover:border-white/20 transition-all duration-300"
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Check className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3">
                {differential.title}
              </h3>
              
              <p className="text-white/60 leading-relaxed">
                {differential.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
