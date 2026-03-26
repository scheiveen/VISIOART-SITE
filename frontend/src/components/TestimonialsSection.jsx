import React from 'react';
import { mockTestimonials } from '../data/mock';
import { Quote } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';

const TestimonialsSection = () => {
  return (
    <section className="relative py-24 bg-neutral-950">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            DEPOIMENTOS
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            O que nossos clientes dizem sobre trabalhar com a VISIOART
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {mockTestimonials.map((testimonial) => (
            <Card 
              key={testimonial.id}
              className="bg-neutral-900 border-neutral-800 hover:border-white/20 transition-all duration-300"
            >
              <CardContent className="p-8">
                <Quote className="w-10 h-10 text-white/20 mb-6" />
                
                <p className="text-white/80 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 bg-white/10">
                    <AvatarFallback className="bg-white/10 text-white font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <p className="text-white font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="text-white/50 text-sm">
                      {testimonial.role}
                    </p>
                    <p className="text-white/50 text-sm">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
