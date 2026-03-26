import React from 'react';
import { mockProcess } from '../data/mock';
import { ArrowRight } from 'lucide-react';

const ProcessSection = () => {
  return (
    <section id="processo" className="relative py-24 bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            PROCESSO
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Do conceito à entrega, cada etapa é planejada para garantir excelência
          </p>
        </div>

        {/* Process Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockProcess.map((step, index) => (
              <div 
                key={step.id}
                className="relative group"
              >
                {/* Connection Line (hidden on mobile, shown on larger screens) */}
                {index < mockProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-white/10 -translate-x-1/2 z-0">
                    <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  </div>
                )}
                
                <div className="relative z-10">
                  {/* Number */}
                  <div className="mb-4">
                    <span className="text-6xl font-bold text-white/10 group-hover:text-white/20 transition-colors">
                      {step.number}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
