# VISIOART Deploy - Resumo Rápido

## 🚀 Deploy em 3 Passos

### 1️⃣ MongoDB Atlas (5 min)
```
1. https://www.mongodb.com/cloud/atlas/register
2. Criar cluster FREE (M0)
3. Criar usuário + senha
4. Network Access → 0.0.0.0/0
5. Copiar connection string
```

### 2️⃣ Backend - Render.com (10 min)
```
1. https://render.com
2. New Web Service
3. Root Directory: backend
4. Build: pip install -r requirements.txt
5. Start: uvicorn server:app --host 0.0.0.0 --port $PORT

ENV VARS:
- MONGO_URL=mongodb+srv://...
- DB_NAME=visioart
- SENDGRID_API_KEY=SG.xxx
- SENDER_EMAIL=noreply@visioart.com
- CORS_ORIGINS=*
```

### 3️⃣ Frontend - Vercel (5 min)
```
1. https://vercel.com
2. Import GitHub repo
3. Root Directory: frontend
4. Framework: Create React App

ENV VARS:
- REACT_APP_BACKEND_URL=https://visioart-backend.onrender.com
```

---

## 📧 SendGrid (Opcional - para formulário funcionar)
```
1. https://signup.sendgrid.com
2. Settings → API Keys → Create
3. Full Access
4. Copiar chave e adicionar no Render
```

---

## ✅ Pronto!
- Frontend: https://visioart-site.vercel.app
- Backend: https://visioart-backend.onrender.com

**Ver guia completo:** DEPLOY_GUIDE.md
