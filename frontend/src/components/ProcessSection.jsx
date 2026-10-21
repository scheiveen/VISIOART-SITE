import React, { useEffect, useRef, useState } from "react";
import { Camera, ClipboardList, Film, MessagesSquare, Send } from "lucide-react";
import { mockProcess } from "../data/mock";
import "./ProcessSection.css";

const STEP_ICONS = [MessagesSquare, ClipboardList, Camera, Film, Send];

const ProcessSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  // "revealed" fica no estado (e não via classList) porque a classe da etapa
  // muda conforme a rolagem e o React sobrescreveria a classe adicionada à mão.
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setRevealed(true);
      },
      { threshold: 0.1 },
    );
    revealObserver.observe(section);

    // A linha dourada avança conforme a trilha de etapas atravessa a tela.
    let frame = null;
    const update = () => {
      frame = null;
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const start = window.innerHeight * 0.85;
      const end = window.innerHeight * 0.35;
      const value = (start - rect.top) / (rect.height + start - end);
      setProgress(Math.min(1, Math.max(0, value)));
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  const total = mockProcess.length;
  const activeIndex = Math.min(total - 1, Math.floor(progress * total));

  return (
    <section id="processo" className="process-section" ref={sectionRef}>
      <div className={`process-header reveal ${revealed ? "revealed" : ""}`}>
        <span className="section-label">Como Trabalhamos</span>
        <h2 className="section-title">Processo de Produção</h2>
        <p className="process-intro">
          Do primeiro café ao filme entregue: cinco etapas pensadas para que você só se preocupe
          em viver o momento.
        </p>
      </div>

      <ol
        className="process-track"
        ref={trackRef}
        style={{ "--progress": progress }}
      >
        <span className="process-line" aria-hidden="true">
          <span className="process-line-fill" />
        </span>

        {mockProcess.map((step, index) => {
          const Icon = STEP_ICONS[index] || Film;
          const state =
            progress > 0 && index < activeIndex
              ? "is-done"
              : progress > 0 && index === activeIndex
                ? "is-active"
                : "";
          return (
            <li
              key={step.id}
              className={`process-step reveal ${revealed ? "revealed" : ""} ${state}`}
              style={{ "--i": index }}
            >
              <span className="step-marker" aria-hidden="true">
                <Icon size={20} strokeWidth={1.5} />
              </span>
              <span className="step-num" aria-hidden="true">
                {step.num}
              </span>
              <h3 className="step-name">{step.name}</h3>
              <p className="step-desc">{step.desc}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default ProcessSection;
