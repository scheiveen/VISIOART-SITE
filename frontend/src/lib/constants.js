// Espelha os enums de backend/models.py — mantenha os dois em sincronia.

export const STATUS_OPTIONS = [
  { value: "em_producao", label: "Em produção" },
  { value: "em_edicao", label: "Em edição" },
  { value: "em_aprovacao", label: "Em aprovação" },
  { value: "entregue", label: "Entregue" },
  { value: "arquivado", label: "Arquivado" },
];

export const STATUS_LABELS = Object.fromEntries(
  STATUS_OPTIONS.map((s) => [s.value, s.label]),
);

export const CATEGORY_OPTIONS = [
  { value: "video_principal", label: "Vídeo principal", group: "videos" },
  { value: "teaser", label: "Teaser", group: "videos" },
  { value: "reels", label: "Reels", group: "videos" },
  { value: "stories", label: "Stories", group: "videos" },
  { value: "outros_videos", label: "Outros vídeos", group: "videos" },
  { value: "galeria", label: "Galeria", group: "fotos" },
  { value: "selecionadas", label: "Fotos selecionadas", group: "fotos" },
  { value: "redes_sociais", label: "Fotos para redes sociais", group: "fotos" },
  { value: "pdf", label: "PDF", group: "arquivos" },
  { value: "documento", label: "Documento", group: "arquivos" },
  { value: "extra", label: "Arquivo extra", group: "arquivos" },
];

export const CATEGORY_LABELS = Object.fromEntries(
  CATEGORY_OPTIONS.map((c) => [c.value, c.label]),
);

export const CATEGORY_GROUP = Object.fromEntries(
  CATEGORY_OPTIONS.map((c) => [c.value, c.group]),
);

export const CATEGORY_GROUPS = [
  { key: "videos", label: "Vídeos", emoji: "🎬" },
  { key: "fotos", label: "Fotos", emoji: "📸" },
  { key: "arquivos", label: "Arquivos", emoji: "📁" },
];
