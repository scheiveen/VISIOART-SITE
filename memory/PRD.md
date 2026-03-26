# VISIOART - Site Institucional Premium
## Product Requirements Document

**Data de Criação:** 26/03/2026  
**Última Atualização:** 26/03/2026  
**Status:** MVP Frontend Concluído com Mock Data

---

## 1. VISÃO GERAL DO PROJETO

### Objetivo
Criar um site institucional premium, cinematográfico e altamente profissional para a produtora audiovisual VISIOART, posicionando-a como uma empresa de produção audiovisual de alto nível.

### Slogan Oficial
**"FROM VISION TO CINEMA"**
- Sempre em caixa alta
- Usado como assinatura da marca
- Aparece no hero e footer

### Posicionamento
- Produtora audiovisual premium
- Especialista em transformar ideias em produções cinematográficas
- Focada em storytelling, direção criativa e impacto visual
- Parceira de marcas que querem elevar sua imagem

---

## 2. STACK TECNOLÓGICO

### Frontend
- **Framework:** React 19.0.0
- **Styling:** TailwindCSS + Custom CSS
- **Componentes:** Shadcn UI
- **Ícones:** Lucide React
- **Tipografia:** Google Fonts (Inter + Playfair Display)
- **Roteamento:** React Router DOM
- **Formulários:** React Hook Form + Zod
- **HTTP Client:** Axios

### Backend (Planejado)
- **Framework:** FastAPI
- **Database:** MongoDB (Motor)
- **Email Service:** SendGrid
- **Validação:** Pydantic

---

## 3. ARQUITETURA E ESTRUTURA

### Páginas/Seções Implementadas
1. ✅ **Header** - Navegação fixa com logo VISIOART
2. ✅ **Hero Section** - Tela cheia com headline impactante
3. ✅ **Manifesto** - Declaração de propósito da marca
4. ✅ **Sobre** - Apresentação da produtora
5. ✅ **Serviços** - 8 serviços em grid (cards)
6. ✅ **Diferenciais** - 6 diferenciais da VISIOART
7. ✅ **Cases** - Portfolio com 6 projetos (lightbox)
8. ✅ **Processo** - 6 etapas de trabalho
9. ✅ **Depoimentos** - 3 testemunhos de clientes
10. ✅ **Clientes** - Logos de 6 clientes
11. ✅ **Contato** - Formulário + WhatsApp direto
12. ✅ **Footer** - Links, contato e slogan

### Componentes Criados
```
/app/frontend/src/
├── components/
│   ├── Header.jsx
│   ├── HeroSection.jsx
│   ├── ManifestoSection.jsx
│   ├── AboutSection.jsx
│   ├── ServicesSection.jsx
│   ├── DifferentialsSection.jsx
│   ├── CasesSection.jsx (com Dialog/Lightbox)
│   ├── ProcessSection.jsx
│   ├── TestimonialsSection.jsx
│   ├── ClientsSection.jsx
│   ├── ContactSection.jsx (com WhatsApp integration)
│   └── Footer.jsx
├── data/
│   └── mock.js (todos os dados mockados)
└── App.js (integração de todas as seções)
```

---

## 4. DADOS MOCKADOS (mock.js)

### Serviços (8)
- Vídeos Institucionais
- Conteúdo para Marcas
- Reels e Vídeos Verticais
- Cobertura de Eventos
- Filmes de Campanha
- Construção Civil e Empreendimentos
- Storytelling de Marca
- Pós-produção Cinematográfica

### Cases (6)
- Vídeo Institucional Tech
- Cobertura Evento Corporativo
- Campanha Lançamento Imobiliário
- Conteúdo Digital para Marca
- Filme de Marca
- Pós-produção Cinematográfica

### Depoimentos (3)
- Carlos Mendes (Tech Solutions Brasil)
- Marina Costa (Construtora Premium)
- Ricardo Almeida (Agência Criativa)

### Clientes (6)
- Tech Solutions
- Construtora Premium
- Agência Criativa
- Eventos Excellence
- Marca Fashion
- Corporativo Group

---

## 5. DESIGN SYSTEM

### Paleta de Cores
- **Background:** Black (#000) / Neutral-950
- **Text:** White (#FFF) / White variants
- **Accent:** White para CTAs

### Tipografia
- **Headings:** Playfair Display (700-900)
- **Body:** Inter (300-700)
- **Tracking:** Wide spacing para textos premium

### Efeitos Visuais
- Gradientes escuros sobre imagens
- Hover transitions suaves (200-300ms)
- Animações de scroll
- Glass-morphism em alguns cards

---

## 6. INTEGRAÇÕES

### Implementadas (Frontend Only)
- ✅ WhatsApp Link Direto: +5548999478281
- ✅ Smooth Scroll Navigation
- ✅ Lightbox para Cases (Dialog)
- ✅ Formulário de Contato (sem backend ainda)

### Planejadas (Backend)
- ⏳ SendGrid para envio de emails
- ⏳ MongoDB para armazenar contatos
- ⏳ API de formulário de orçamento

---

## 7. IMAGENS UTILIZADAS

### Hero
- https://images.unsplash.com/photo-1597465103212-7cd0b847a246

### About
- https://images.unsplash.com/photo-1614760522172-2c2d660427b4

### Services Background
- https://images.unsplash.com/photo-1611540881474-bf7c8731bfd2

### Cases (6 imagens)
- https://images.unsplash.com/photo-1597465103212-7cd0b847a246
- https://images.pexels.com/photos/6621438/pexels-photo-6621438.jpeg
- https://images.unsplash.com/photo-1612544409025-e1f6a56c1152
- https://images.unsplash.com/photo-1570834322056-ba3e2994ab85
- https://images.unsplash.com/photo-1614760522172-2c2d660427b4
- https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7

---

## 8. FUNCIONALIDADES IMPLEMENTADAS

### Navegação
- [x] Menu fixo responsivo
- [x] Scroll suave para seções
- [x] Mobile menu hamburguer

### Interatividade
- [x] Hover effects em todos os cards
- [x] Lightbox para visualizar cases
- [x] WhatsApp button com mensagem pré-formatada
- [x] Formulário com validação (frontend)

### Responsividade
- [x] Mobile-first design
- [x] Breakpoints: sm, md, lg, xl
- [x] Grid adaptativo

---

## 9. O QUE FALTA IMPLEMENTAR

### Fase 2: Backend Development
- [ ] Criar API endpoints no FastAPI
  - POST `/api/contact` - Receber formulário de contato
  - POST `/api/budget` - Receber solicitação de orçamento
  - GET `/api/cases` - Listar cases (se dinâmico)
- [ ] Integrar SendGrid
  - Configurar SENDGRID_API_KEY
  - Criar templates de email
  - Implementar envio de confirmação
- [ ] MongoDB Schema
  - Collection: contacts
  - Collection: budget_requests
  - Collection: newsletter (futuro)
- [ ] Validação e sanitização de dados
- [ ] Rate limiting
- [ ] CORS configuration

### Fase 3: Melhorias
- [ ] Animações de scroll (AOS ou Framer Motion)
- [ ] Lazy loading de imagens
- [ ] SEO optimization
  - Meta tags
  - Open Graph
  - Structured data
- [ ] Performance optimization
  - Image optimization
  - Code splitting
  - Caching
- [ ] Analytics integration (opcional)
- [ ] Cookie consent (LGPD)

### Fase 4: Conteúdo Real
- [ ] Substituir cases mockados por projetos reais
- [ ] Adicionar vídeos reais (showreel)
- [ ] Fotos profissionais da equipe
- [ ] Depoimentos com fotos reais
- [ ] Logos de clientes reais

---

## 10. PRIORIDADES (P0/P1/P2)

### P0 - Crítico (MVP)
- ✅ Frontend completo com todas as seções
- ✅ Design premium e responsivo
- ✅ Navegação funcional
- ⏳ Backend API para formulários
- ⏳ Integração SendGrid

### P1 - Importante (Pós-MVP)
- [ ] Conteúdo real (cases, depoimentos, logos)
- [ ] SEO básico
- [ ] Performance optimization
- [ ] Testing (Cypress/Playwright)

### P2 - Desejável (Futuro)
- [ ] CMS para gerenciar cases
- [ ] Blog/Notícias
- [ ] Multi-idioma (PT/EN)
- [ ] Dark/Light mode toggle
- [ ] Newsletter signup

---

## 11. CONTATO E CONFIGURAÇÕES

### Informações de Contato
- **WhatsApp:** +5548999478281
- **Email:** contato@visioart.com.br
- **Instagram:** @visioart
- **Localização:** Florianópolis, SC

### URLs
- **Frontend:** Port 3000
- **Backend:** Port 8001
- **Preview:** https://7906-03e448db-e7d2-4d77-a0a4-1a3c79d64d00.preview.emergentagent.com

---

## 12. PRÓXIMOS PASSOS

1. **Desenvolvimento Backend**
   - Criar endpoints FastAPI
   - Configurar SendGrid
   - Setup MongoDB collections
   - Testes de integração

2. **Integração Frontend-Backend**
   - Conectar formulário de contato
   - Conectar formulário de orçamento
   - Tratamento de erros e loading states
   - Success/error messages

3. **Testes**
   - Testing agent para validar fluxos
   - Testes de formulários
   - Testes de responsividade
   - Cross-browser testing

4. **Deploy e Otimização**
   - Build de produção
   - Performance audit
   - SEO audit
   - Acessibilidade audit

---

**Documento mantido por:** E1 Agent  
**Última revisão:** 26/03/2026
