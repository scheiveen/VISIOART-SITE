import React, { useEffect, useRef } from 'react';
import './WhySection.css';

const WhySection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => {
              el.classList.add('revealed');
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="why-section" ref={sectionRef}>
      <div className="why-container">
        <div className="why-pain reveal">
          <span className="why-label">A Realidade</span>
          <h2 className="why-title">
            Momentos passam rápido demais
          </h2>
          <p className="why-text">
            Um piscar de olhos. Um sorriso fugaz. Uma lágrima de emoção. 
            A vida acontece em instantes únicos que jamais se repetem. 
            E quando tentamos segurar essas memórias, elas escapam como areia entre os dedos.
          </p>
        </div>

        <div className="why-belief reveal reveal-delay-1">
          <span className="why-label">Nossa Crença</span>
          <h2 className="why-title">
            Algumas histórias merecem <em>permanecer</em>
          </h2>
          <p className="why-text">
            Não é sobre gravar. É sobre <strong>eternizar</strong>. 
            É sobre transformar segundos em legado. 
            É sobre criar um filme que seus filhos vão mostrar para seus netos, 
            dizendo: <em>"Foi assim que tudo começou."</em>
          </p>
        </div>

        <div className="why-promise reveal reveal-delay-2">
          <span className="why-label">O Que Entregamos</span>
          <h2 className="why-title">
            Mais do que vídeos. <br/>Criamos <em>memórias afetivas</em>
          </h2>
          <div className="why-promises">
            <div className="promise-item">
              <h3>Emoção Real</h3>
              <p>Não criamos roteiros artificiais. Capturamos a verdade de cada momento.</p>
            </div>
            <div className="promise-item">
              <h3>Cinema de Verdade</h3>
              <p>Cada frame tratado com a mesma dedicação de uma produção hollywoodiana.</p>
            </div>
            <div className="promise-item">
              <h3>Legado Eterno</h3>
              <p>Um filme que vai emocionar hoje, amanhã e para sempre.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
