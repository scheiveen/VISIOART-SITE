// Mock data with VIDEO URLs for VISIOART

export const mockServices = [
  {
    id: 1,
    num: "01",
    category: "Filmes de Casamento",
    name: "Histórias de Amor Transformadas em Cinema",
    desc: "Eternizamos o dia mais importante da sua vida em um filme que você vai assistir com seus filhos e netos",
    image:
      "https://images.unsplash.com/photo-1680624528924-7ee5542e4f4d?w=800&q=80",
    emotion: "Memória Emocional",
  },
  {
    id: 2,
    num: "02",
    category: "Vídeo Institucional",
    name: "Narrativas Visuais para Marcas que Desejam Autoridade",
    desc: "Posicione sua marca como líder através de filmes que transmitem confiança, credibilidade e presença",
    image:
      "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?w=800&q=80",
    emotion: "Autoridade e Percepção",
  },
  {
    id: 3,
    num: "03",
    category: "Documentário de Marca",
    name: "Filmes que Fortalecem Identidade e Propósito",
    desc: "Mostre ao mundo não apenas o que você faz, mas por que você existe e o impacto que você gera",
    image:
      "https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20%281%20of%201%29-5.jpg?w=800&q=80",
    emotion: "Legado Corporativo",
  },
  {
    id: 4,
    num: "04",
    category: "Conteúdo para Redes Sociais",
    name: "Presença Visual para Marcas que Desejam Ser Lembradas",
    desc: "Destaque-se nas redes sociais com conteúdo que gera conexão emocional e engajamento verdadeiro",
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    emotion: "Conexão Digital",
  },
  {
    id: 5,
    num: "05",
    category: "Publicidade e Campanhas",
    name: "Campanhas que Transformam Percepção em Desejo",
    desc: "Crie uma conexão emocional tão forte que seu público não apenas veja, mas sinta e queira fazer parte",
    image:
      "https://images.unsplash.com/photo-1630948688037-aa88dc433a57?w=800&q=80",
    emotion: "Impacto Comercial",
  },
  {
    id: 6,
    num: "06",
    category: "Vídeo Imobiliário",
    name: "Projetos que Vendem Sonhos, Não Apenas Imóveis",
    desc: "Transforme empreendimentos em histórias de realização, mostrando não só o espaço, mas a vida que acontecerá ali",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    emotion: "Aspiração e Conquista",
  },
];

// Reserva do portfólio: a lista oficial é gerenciada em /admin/portfolio e
// vem da API. Vídeos servidos como MP4 (H.264) via Cloudinary: os originais .mov tinham
// 35–85 MB cada e não tocam em todos os navegadores. A miniatura é um frame
// extraído do próprio vídeo (segundo `offset`).
const CLOUDINARY_VIDEO = "https://res.cloudinary.com/dzv2rrgj0/video/upload";
const portfolioVideo = (id) => `${CLOUDINARY_VIDEO}/q_auto,w_1280/${id}.mp4`;
const portfolioThumb = (id, offset = 2) =>
  `${CLOUDINARY_VIDEO}/so_${offset},w_1200,h_675,c_fill,q_auto,f_auto/${id}.jpg`;

export const mockPortfolio = [
  {
    id: 1,
    tag: "Pedido de Casamento",
    title: "João & Julia",
    video: portfolioVideo("v1778846014/PEDIDO_JOA%CC%83O_HORIZONTAL_SITE_ihq4yw"),
    thumbnail: portfolioThumb("v1778846014/PEDIDO_JOA%CC%83O_HORIZONTAL_SITE_ihq4yw"),
    uploadDate: "2026-05-15",
    featured: true,
  },
  {
    id: 6,
    tag: "Casamento",
    title: "Leticia & Wagner",
    video: portfolioVideo("v1792534708/LETICIA_WAGNER_SITE"),
    thumbnail: portfolioThumb("v1792534708/LETICIA_WAGNER_SITE", 45),
    uploadDate: "2026-10-20",
    duration: 146,
  },
  {
    id: 2,
    tag: "Institucional",
    title: "Secretaria de Saúde de Alfredo Wagner",
    video: portfolioVideo("v1778846438/SAUDE_SITE_jxin5y"),
    thumbnail: portfolioThumb("v1778846438/SAUDE_SITE_jxin5y"),
    uploadDate: "2026-05-15",
  },
  {
    id: 3,
    tag: "Aniversário de 15 anos",
    title: "Isabela",
    video: portfolioVideo("v1778846015/ENSAIO_ISA_SITE_lbtnq2"),
    thumbnail: portfolioThumb("v1778846015/ENSAIO_ISA_SITE_lbtnq2"),
    uploadDate: "2026-05-15",
  },
  {
    id: 4,
    tag: "Cerimônia de Casamento",
    title: "Marina & Andrigo",
    video: portfolioVideo("v1780511947/MARINA_SITE_f3txsw"),
    thumbnail: portfolioThumb("v1780511947/MARINA_SITE_f3txsw"),
    uploadDate: "2026-06-03",
  },
  {
    id: 5,
    tag: "Construção",
    title: "Recanto das Américas Wellness Resort & Spa",
    video: portfolioVideo("v1778846002/RESORT_SITE_1_sohhwy"),
    thumbnail: portfolioThumb("v1778846002/RESORT_SITE_1_sohhwy"),
    uploadDate: "2026-05-15",
  },
];

export const heroVideo = {
  desktop:
    "https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4",
  mobile:
    "https://videos.pexels.com/video-files/3209828/3209828-hd_1280_720_25fps.mp4",
};

export const aboutVideo =
  "https://videos.pexels.com/video-files/4625771/4625771-hd_1920_1080_30fps.mp4";

export const mockProcess = [
  {
    id: 1,
    num: "01",
    name: "Briefing e Conceito",
    desc: "Entendemos seu projeto, público-alvo e objetivos para criar uma narrativa única",
  },
  {
    id: 2,
    num: "02",
    name: "Planejamento",
    desc: "Desenvolvemos roteiro, storyboard e logística completa da produção",
  },
  {
    id: 3,
    num: "03",
    name: "Produção",
    desc: "Captação com equipamento profissional e equipe técnica especializada",
  },
  {
    id: 4,
    num: "04",
    name: "Pós-produção",
    desc: "Edição cinematográfica, color grading e finalização de alto padrão",
  },
  {
    id: 5,
    num: "05",
    name: "Entrega",
    desc: "Filmes finalizados nos formatos adequados com suporte pós-entrega",
  },
];

export const statsData = [
  { number: "50+", label: "PROJETOS REALIZADOS" },
  { number: "3", label: "ANOS DE EXPERIÊNCIA" },
  { number: "100%", label: "CLIENTES SATISFEITOS" },
];

export const contactInfo = {
  whatsapp: "+5548999478281",
  whatsappDisplay: "+55 (48) 99947-8281",
  email: "visioartprod@gmail.com",
  instagram: "@visioart.prod",
  location: "SANTA CATARINA - BRASIL",
};

export const marqueeText = [
  "STORYTELLING",
  "CINEMA",
  "EMOÇÃO",
  "CRIATIVIDADE",
  "PRODUÇÃO",
];

export const ambientMusicList = [
  "/audio/Interstellar Official Soundtrack _ Cornfield Chase – Hans Zimmer _ WaterTower.mp3",
  "/audio/We Dream of Eden - Ascension.mp3",
  "/audio/We Dream of Eden - Bloom Again.mp3",
  "/audio/We Dream of Eden - Discovery.mp3",
  "/audio/We Dream of Eden - Outside In.mp3",
];
