import { contactInfo } from "../data/mock";

export const PROJECT_OPTIONS = [
  "Casamento",
  "Pedido de casamento",
  "Aniversário de 15 anos",
  "Vídeo institucional",
  "Publicidade / campanha",
  "Conteúdo para redes sociais",
  "Vídeo imobiliário",
  "Outro",
];

/**
 * Monta o link do WhatsApp com a mensagem pronta. A primeira linha deixa
 * claro que o contato veio do site.
 */
export function buildWhatsAppUrl({ name, project, details } = {}) {
  const lines = ["Olá, VISIOART! Vim pelo site e gostaria de um orçamento."];
  if (name || project || details) lines.push("");
  if (name) lines.push(`*Nome:* ${name}`);
  if (project) lines.push(`*Projeto:* ${project}`);
  if (details) lines.push(`*Detalhes:* ${details}`);

  const phone = contactInfo.whatsapp.replace(/[^0-9]/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function openWhatsApp(fields) {
  const url = buildWhatsAppUrl(fields);
  // Sem "noopener" nas features: com ele o window.open sempre retorna null e
  // não daria para detectar bloqueio de pop-up.
  const win = window.open(url, "_blank");
  if (win) win.opener = null;
  else window.location.href = url; // pop-up bloqueado: abre na mesma aba
}
