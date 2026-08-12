import React, { useState } from "react";
import { contactInfo } from "../../data/mock";

export default function ForgotPasswordNote() {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-center mt-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="bg-transparent border-0 p-0 cursor-pointer text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
      >
        Recuperar senha
      </button>
      {open && (
        <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
          Para redefinir sua senha, entre em contato com a equipe VISIOART pelo{" "}
          <a
            href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            WhatsApp
          </a>{" "}
          ou pelo e-mail{" "}
          <a href={`mailto:${contactInfo.email}`} className="text-primary hover:underline">
            {contactInfo.email}
          </a>
          .
        </p>
      )}
    </div>
  );
}
