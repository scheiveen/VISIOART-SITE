# VISIOART - Guia de Deploy Completo

## 📦 PARTE 1: Deploy do Backend (Render.com)

### Passo 1: Preparar MongoDB Atlas (Database)

1. Acesse: https://www.mongodb.com/cloud/atlas/register
2. Crie uma conta gratuita
3. Crie um Cluster (M0 Sandbox - FREE)
4. Em "Database Access": crie um usuário e senha
5. Em "Network Access": adicione `0.0.0.0/0` (permitir de qualquer lugar)
6. Em "Database" → "Connect" → "Connect your application"
7. Copie a connection string:
   ```
   mongodb+srv://usuario:senha@cluster.xxxxx.mongodb.net/visioart?retryWrites=true&w=majority
   ```
   **Salve essa URL!**

---

### Passo 2: Deploy Backend no Render

1. Acesse: https://render.com
2. Conecte com GitHub
3. Clique em "New +" → "Web Service"
4. Selecione o repositório: `scheiveen/VISIOART-SITE`

**Configurações:**
- **Name:** `visioart-backend`
- **Root Directory:** `backend`
- **Environment:** `Python 3`
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `uvicorn server:app --host 0.0.0.0 --port $PORT`

**Environment Variables (clique em "Advanced"):**
```
MONGO_URL=mongodb+srv://usuario:senha@cluster.xxxxx.mongodb.net/visioart?retryWrites=true&w=majority
DB_NAME=visioart
CORS_ORIGINS=https://visioart-site.vercel.app
JWT_SECRET=GERE_UM_VALOR_ALEATORIO_FORTE
JWT_EXPIRE_HOURS=168
SENDGRID_API_KEY=SUA_CHAVE_SENDGRID
SENDER_EMAIL=noreply@visioart.com
```

- `CORS_ORIGINS` deve ser o domínio real do frontend (Vercel), separado por vírgula se houver mais de um (ex.: domínio próprio + preview do Vercel). Evite deixar `*` agora que o site tem login/autenticação real.
- `JWT_SECRET` protege as sessões de login do Portal do Cliente e do Admin. Gere um valor forte com `python -c "import secrets; print(secrets.token_hex(32))"` e nunca reaproveite o valor usado em desenvolvimento local.

5. Clique em "Create Web Service"
6. Aguarde o deploy (5-10 minutos)
7. Copie a URL do backend: `https://visioart-backend.onrender.com`

---

### Passo 3: Criar o primeiro usuário admin

O `/admin` não tem cadastro público — o primeiro administrador é criado por script, direto contra o banco de produção:

1. No seu computador, configure `backend/.env` temporariamente com o `MONGO_URL` de produção (o mesmo do Atlas usado no Render)
2. Rode, de dentro da pasta `backend/`:
   ```
   python create_admin.py
   ```
3. Informe nome, e-mail e senha do primeiro admin
4. Depois de criar, é só usar o `/admin/clientes` para cadastrar os demais usuários (clientes) — não precisa mais rodar script

---

## 🎨 PARTE 2: Deploy do Frontend (Vercel)

### Passo 1: Configurar variáveis de ambiente

1. Acesse: https://vercel.com
2. Conecte com GitHub
3. Clique em "Add New Project"
4. Importe: `scheiveen/VISIOART-SITE`

**Configurações:**
- **Framework Preset:** Create React App
- **Root Directory:** `frontend`
- **Build Command:** `yarn build`
- **Output Directory:** `build`

**Environment Variables:**
```
REACT_APP_BACKEND_URL=https://visioart-backend.onrender.com
```

5. Clique em "Deploy"
6. Aguarde (2-3 minutos)
7. Seu site estará no ar! 🎉

---

## 🔑 PARTE 3: SendGrid (Email)

1. Acesse: https://signup.sendgrid.com/
2. Crie conta gratuita (100 emails/dia)
3. Settings → API Keys → Create API Key
4. Escolha "Full Access"
5. Copie a chave
6. Volte no Render → Environment Variables
7. Atualize `SENDGRID_API_KEY` com a chave copiada

---

## ✅ CHECKLIST FINAL

- [ ] MongoDB Atlas configurado
- [ ] Backend deployado no Render (com `JWT_SECRET` forte e `CORS_ORIGINS` apontando pro domínio real)
- [ ] Primeiro usuário admin criado com `create_admin.py`
- [ ] SendGrid API Key configurada
- [ ] Frontend deployado no Vercel
- [ ] Testar login em `/admin/login` e `/cliente/login` em produção
- [ ] Testar formulário de contato
- [ ] Testar todas as seções do site
- [ ] Testar o menu hamburguer no mobile

---

## 🚨 TROUBLESHOOTING

**Formulário não envia email:**
- Verifique se SENDGRID_API_KEY está correta
- Verifique se REACT_APP_BACKEND_URL aponta para o Render

**Erro de CORS:**
- Verifique se CORS_ORIGINS=* está configurado no backend

**Backend não inicia:**
- Verifique se MONGO_URL está correto
- Verifique logs no Render

**`/admin` ou `/cliente` dá 404 ao recarregar a página (F5):**
- O projeto tem dois arquivos `vercel.json` (um na raiz do repo, outro em `frontend/`). Apenas o que corresponde ao "Root Directory" configurado no projeto Vercel é usado.
- Se o "Root Directory" do projeto Vercel for `frontend`, o rewrite de SPA já está em `frontend/vercel.json`.
- Se o "Root Directory" for a raiz do repo, adicione o rewrite equivalente no `vercel.json` da raiz.

---

## 📱 URLs Finais

- **Frontend:** https://visioart-site.vercel.app (ou domínio personalizado)
- **Backend:** https://visioart-backend.onrender.com

---

**Suporte:** Se tiver dúvidas, me pergunte!
