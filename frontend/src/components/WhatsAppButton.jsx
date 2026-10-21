import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import WhatsAppForm from "./WhatsAppForm";
import "./WhatsAppButton.css";

// Fica empilhado acima do botão de som (AudioPlayer), com o mesmo visual.
// Em vez de abrir o WhatsApp direto, abre o formulário rápido.
const WhatsAppButton = () => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const trigger = buttonRef.current;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="whatsapp-float"
        aria-label="Falar com a VISIOART no WhatsApp"
        aria-haspopup="dialog"
        aria-expanded={open}
        title="Falar no WhatsApp"
        onClick={() => setOpen(true)}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </button>

      {open && (
        <div className="wa-modal-overlay" onClick={() => setOpen(false)}>
          <div
            className="wa-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wa-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="wa-modal-close"
              aria-label="Fechar"
              onClick={() => setOpen(false)}
            >
              <X size={18} strokeWidth={1.5} />
            </button>
            <span className="wa-modal-label">Fale com a VISIOART</span>
            <h2 id="wa-modal-title" className="wa-modal-title">
              Vamos contar a sua história?
            </h2>
            {/* No celular o foco automático abriria o teclado por cima do formulário. */}
            <WhatsAppForm
              autoFocus={window.matchMedia("(pointer: fine)").matches}
              onSent={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppButton;
