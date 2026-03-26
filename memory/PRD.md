# VISIOART - Site Institucional Premium (VERSÃO 2.0)
## Product Requirements Document

**Data de Criação:** 26/03/2026  
**Última Atualização:** 26/03/2026 - 18:20  
**Status:** MVP Frontend Completo - Design Base Implementado

---

## 1. VISÃO GERAL DO PROJETO

### Objetivo
Site institucional premium baseado no design HTML fornecido pelo cliente, com estética cinematográfica sofisticada e interatividade avançada.

### Slogan Oficial
**"FROM VISION TO CINEMA"** / **"DA VISÃO AO CINEMA"**

---

## 2. DESIGN SYSTEM (BASEADO NO HTML FORNECIDO)

### Paleta de Cores
- **Backgrounds:** `#080808` (black), `#1a1a1a` (gray-dark)
- **Text:** `#f5f2ee` (white), `#888` (gray-light)
- **Accent:** `#c8b89a` (dourado/bronze suave)

### Tipografia
- **Display:** Bebas Neue - Headings principais, logo, títulos
- **Serif:** Cormorant Garamond - Subtítulos, ênfases, textos elegantes
- **Body:** DM Sans - Corpo de texto, descrições

### Efeitos Especiais
- Custom cursor com anel (mix-blend-mode: difference)
- Scroll reveal animations
- Marquee infinito
- Grain/noise texture no hero
- mix-blend-mode no navbar

---

## 3. COMPONENTES IMPLEMENTADOS

### Core Components
- ✅ `CustomCursor.jsx` - Cursor personalizado com anel
- ✅ `Navbar.jsx` - Navegação fixa com mix-blend-mode
- ✅ `HeroSection.jsx` - Hero full-screen com efeitos
- ✅ `Marquee.jsx` - Texto scrolling infinito
- ✅ `AboutSection.jsx` - Grid 2 colunas + stats
- ✅ `ServicesSection.jsx` - Grid 3 colunas de serviços
- ✅ `PortfolioSection.jsx` - Grid assimétrico (primeiro item grande)
- ✅ `ProcessSection.jsx` - Lista de passos em grid
- ✅ `ContactSection.jsx` - Contato centralizado
- ✅ `Footer.jsx` - Footer minimalista

---

## 4. FUNCIONALIDADES IMPLEMENTADAS

### Interatividade
- [x] Custom cursor com expansão em elementos interativos
- [x] Scroll reveal animations em todas as seções
- [x] Smooth scroll navigation
- [x] Navbar background change on scroll
- [x] Marquee animation contínuo
- [x] Hover effects em cards, portfolio items, process steps
- [x] WhatsApp direct link
- [x] Email link (mailto)
- [x] Instagram link

### Visual Effects
- [x] Grain/noise texture no hero
- [x] Radial gradients como light sources
- [x] Animated line no hero
- [x] Portfolio images com grayscale que remove no hover
- [x] Service cards com underline animation
- [x] Process steps com número que anima no hover

---

## 5. ESTRUTURA DE ARQUIVOS

```
/app/frontend/src/
├── components/
│   ├── CustomCursor.jsx + (sem CSS - inline styles)
│   ├── Navbar.jsx + Navbar.css
│   ├── HeroSection.jsx + HeroSection.css
│   ├── Marquee.jsx + Marquee.css
│   ├── AboutSection.jsx + AboutSection.css
│   ├── ServicesSection.jsx + ServicesSection.css
│   ├── PortfolioSection.jsx + PortfolioSection.css
│   ├── ProcessSection.jsx + ProcessSection.css
│   ├── ContactSection.jsx + ContactSection.css
│   └── Footer.jsx + Footer.css
├── data/
│   └── mock.js (dados mockados)
├── App.js
├── App.css
└── index.css (CSS global + variables)
```

---

## 6. DADOS MOCKADOS

### Serviços (6)
1. Vídeos de Casamento 💍
2. Eventos Corporativos 🎉
3. Filmes Institucionais 🎬
4. Conteúdo Digital 📱
5. Publicidade 🎭
6. Construção Civil 🏗️

### Portfolio (5 projetos)
- Ana & Carlos (Casamento) - Featured
- Tech Corp (Institucional)
- Summit 2025 (Evento)
- Marca Premium (Comercial)
- Residencial Alto Padrão (Construção)

### Processo (5 etapas)
1. Briefing e Conceito
2. Planejamento
3. Produção
4. Pós-produção
5. Entrega

### Estatísticas
- 150+ Projetos Realizados
- 8 Anos de Experiência
- 100% Clientes Satisfeitos

---

## 7. DIFERENÇAS DO DESIGN ORIGINAL

### Implementado Exatamente Como HTML Base:
- ✅ Custom cursor
- ✅ Tipografia (Bebas Neue + Cormorant Garamond + DM Sans)
- ✅ Cor de accent (#c8b89a)
- ✅ Marquee scrolling
- ✅ Grid de portfolio assimétrico
- ✅ Processo em formato de lista/grid
- ✅ Scroll reveal animations
- ✅ Navbar mix-blend-mode
- ✅ Grain texture no hero
- ✅ Estrutura de seções

### Não Implementado (Próximas Fases):
- ⏳ Menu mobile hamburguer
- ⏳ Formulário de contato completo
- ⏳ Backend para envio de emails

---

## 8. TECNOLOGIAS UTILIZADAS

### Frontend
- React 19.0.0
- CSS Modules + Vanilla CSS
- Google Fonts (Bebas Neue, Cormorant Garamond, DM Sans)
- Intersection Observer API (scroll reveal)
- Custom animations (keyframes CSS)

### Não Utilizado (Removido para simplicidade)
- ❌ Shadcn UI components
- ❌ TailwindCSS classes
- ❌ React Hook Form
- ✅ CSS puro para fidelidade ao design base

---

## 9. CONTATO E LINKS

### Informações
- **WhatsApp:** +5548999478281
- **Email:** contato@visioart.com.br
- **Instagram:** @visioart
- **Localização:** Florianópolis, SC

### URLs
- **Local:** http://localhost:3000
- **Preview:** https://7906-03e448db-e7d2-4d77-a0a4-1a3c79d64d00.preview.emergentagent.com

---

## 10. PRÓXIMOS PASSOS

### Fase Imediata
- [ ] Validar design com cliente
- [ ] Substituir imagens por conteúdo real
- [ ] Ajustar textos e copy

### Fase 2 - Melhorias Frontend
- [ ] Menu mobile hamburguer
- [ ] Formulário de contato com validação
- [ ] Loading states
- [ ] Error handling

### Fase 3 - Backend
- [ ] API FastAPI para formulários
- [ ] SendGrid integration
- [ ] MongoDB para armazenar contatos
- [ ] Admin panel (opcional)

### Fase 4 - Otimizações
- [ ] Lazy loading de imagens
- [ ] Code splitting
- [ ] SEO optimization
- [ ] Performance audit
- [ ] Accessibility audit

---

## 11. CHANGELOG

### v2.0 - 26/03/2026 18:20
- ✅ COMPLETA RECRIAÇÃO baseada no HTML fornecido
- ✅ Implementado custom cursor
- ✅ Todas as seções seguindo design base
- ✅ Animações e efeitos visuais
- ✅ Tipografia exata (Bebas Neue + Cormorant Garamond + DM Sans)
- ✅ Cores exatas do design base
- ✅ Scroll reveal animations
- ✅ Marquee infinito

### v1.0 - 26/03/2026 (Anterior)
- Site inicial com shadcn UI e design diferente
- Substituído pela versão 2.0 baseada no HTML cliente

---

**Documento mantido por:** E1 Agent  
**Baseado em:** visioart.html (design fornecido pelo cliente)
