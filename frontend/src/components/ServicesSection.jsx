import React from 'react';
import { mockServices } from '../data/mock';
import { 
  Building2, 
  Sparkles, 
  Smartphone, 
  Calendar, 
  Film, 
  Hammer, 
  BookOpen, 
  Clapperboard 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

const iconMap = {
  Building2,
  Sparkles,
  Smartphone,
  Calendar,
  Film,
  Hammer,
  BookOpen,
  Clapperboard
};

const ServicesSection = () => {
  return (
    <section id="servicos" className="relative py-24 bg-neutral-950">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            SERVIÇOS
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Produções audiovisuais estratégicas com linguagem cinematográfica e impacto visual
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockServices.map((service) => {
            const IconComponent = iconMap[service.icon];
            return (
              <Card 
                key={service.id} 
                className="bg-neutral-900 border-neutral-800 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="mb-4">
                    <IconComponent className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-white text-xl mb-2">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/60 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
