import React, { useId, useState } from "react";
import { PROJECT_OPTIONS, openWhatsApp } from "../lib/whatsapp";
import "./WhatsAppForm.css";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="wa-form-icon">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

/**
 * Formulário curto (nome + tipo de projeto + detalhes opcionais) que abre o
 * WhatsApp com a mensagem pronta. Usado no modal do botão flutuante e na
 * seção de Contato.
 */
const WhatsAppForm = ({ onSent, autoFocus = false }) => {
  const id = useId();
  const [name, setName] = useState("");
  const [project, setProject] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Conte pra gente o seu nome.");
      return;
    }
    if (!project) {
      setError("Escolha o tipo de projeto.");
      return;
    }
    setError("");
    openWhatsApp({ name: name.trim(), project, details: details.trim() });
    onSent?.();
  };

  return (
    <form className="wa-form" onSubmit={handleSubmit} noValidate>
      <div className="wa-field">
        <label htmlFor={`${id}-name`}>Seu nome</label>
        <input
          id={`${id}-name`}
          type="text"
          autoComplete="name"
          placeholder="Como podemos te chamar?"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus={autoFocus}
          maxLength={80}
        />
      </div>

      <fieldset className="wa-field">
        <legend>Qual projeto você está buscando?</legend>
        <div className="wa-options">
          {PROJECT_OPTIONS.map((option) => (
            <label
              key={option}
              className={`wa-option ${project === option ? "is-selected" : ""}`}
            >
              <input
                type="radio"
                name={`${id}-project`}
                value={option}
                checked={project === option}
                onChange={() => setProject(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="wa-field">
        <label htmlFor={`${id}-details`}>
          Quer contar mais? <span className="wa-optional">(opcional)</span>
        </label>
        <textarea
          id={`${id}-details`}
          rows={2}
          placeholder="Data, local, ideia do vídeo..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          maxLength={500}
        />
      </div>

      {error && (
        <p className="wa-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="wa-submit">
        <WhatsAppIcon />
        Enviar pelo WhatsApp
      </button>
      <p className="wa-hint">Abre o WhatsApp com a mensagem pronta — é só tocar em enviar.</p>
    </form>
  );
};

export default WhatsAppForm;
