import React from 'react';

const ManifestoSection = () => {
  return (
    <section id="manifesto" className="relative py-32 bg-neutral-950">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <p className="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed">
              Na VISIOART, imagem não é apenas registro.
            </p>
            <p className="text-2xl md:text-3xl lg:text-4xl text-white font-semibold leading-relaxed">
              É posicionamento.
            </p>
            
            <div className="h-px w-32 bg-white/20 mx-auto my-12"></div>
            
            <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">
              Cada projeto nasce com direção, intenção e linguagem.
              <br />
              Transformamos visão em narrativa, e narrativa em impacto.
            </p>
            
            <div className="h-px w-32 bg-white/20 mx-auto my-12"></div>
            
            <p className="text-2xl md:text-3xl text-white font-light leading-relaxed">
              Porque não basta mostrar.
            </p>
            <p className="text-2xl md:text-3xl lg:text-4xl text-white font-semibold leading-relaxed">
              É preciso marcar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
