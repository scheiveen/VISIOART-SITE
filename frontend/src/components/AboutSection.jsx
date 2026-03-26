import React from 'react';

const AboutSection = () => {
  return (
    <section id="sobre" className="relative py-24 bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-[400px] lg:h-[600px] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1614760522172-2c2d660427b4"
              alt="Produção VISIOART"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              PRODUÇÃO AUDIOVISUAL COM VISÃO DE MARCA
            </h2>
            
            <div className="h-1 w-24 bg-white"></div>
            
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              A VISIOART é uma produtora audiovisual criada para entregar mais do que imagens bonitas.
            </p>
            
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              Unimos direção criativa, narrativa e execução para produzir filmes que fortalecem marcas e registram projetos com presença.
            </p>
            
            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light italic">
              Não somos freelancers. Somos uma empresa de produção audiovisual com visão, direção e execução profissional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
