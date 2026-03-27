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
CORS_ORIGINS=*
SENDGRID_API_KEY=SUA_CHAVE_SENDGRID
SENDER_EMAIL=noreply@visioart.com
```

5. Clique em "Create Web Service"
6. Aguarde o deploy (5-10 minutos)
7. Copie a URL do backend: `https://visioart-backend.onrender.com`

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
- [ ] Backend deployado no Render
- [ ] SendGrid API Key configurada
- [ ] Frontend deployado no Vercel
- [ ] Testar formulário de contato
- [ ] Testar todas as seções do site

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

---

## 📱 URLs Finais

- **Frontend:** https://visioart-site.vercel.app (ou domínio personalizado)
- **Backend:** https://visioart-backend.onrender.com

---

**Suporte:** Se tiver dúvidas, me pergunte!
