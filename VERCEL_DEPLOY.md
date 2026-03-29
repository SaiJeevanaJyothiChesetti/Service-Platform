# Vercel Deployment Guide - Step by Step

## 📋 Deployment Strategy

**Frontend:** Vercel (Perfect for React apps) ✅
**Backend:** Railway.app (Free tier, easy setup) ✅
**Database:** MongoDB Atlas (Already set up) ✅

---

## 🚀 Step 1: Deploy Backend to Railway (5 mins)

### 1.1 Install Railway CLI
```bash
npm install -g @railway/cli
```

### 1.2 Login to Railway
```bash
railway login
```
This opens your browser to sign in with GitHub.

### 1.3 Create Railway Project
```bash
cd backend
railway init
```

Choose:
- Project name: `service-platform-api`
- Select Node.js

### 1.4 Add MongoDB Variable
```bash
railway variable add MONGO_URI "your-mongodb-atlas-uri"
railway variable add JWT_SECRET "your-jwt-secret-key"
```

### 1.5 Deploy
```bash
railway up
```

Your backend is now deployed! 🎉

**Get your backend URL:**
```bash
railway service
```

Copy the public URL (looks like: `https://service-platform-api.up.railway.app`)

**Store this URL - you'll need it next.**

---

## 🎨 Step 2: Prepare Frontend for Vercel

### 2.1 Update Environment Variable

Create `frontend/.env.production` with your Railway backend URL:

```
REACT_APP_API_URL=https://service-platform-api.up.railway.app/api
```

Replace with your actual Railway URL!

### 2.2 Build Frontend
```bash
cd frontend
npm run build
```

Verify build completes without errors.

---

## ☁️ Step 3: Deploy Frontend to Vercel

### Option A: Using Vercel CLI (Recommended)

#### 3A.1 Install Vercel CLI
```bash
npm install -g vercel
```

#### 3A.2 Login to Vercel
```bash
vercel login
```

#### 3A.3 Deploy
```bash
cd frontend
vercel
```

**Follow prompts:**
- Project name: `service-platform-frontend`
- Framework: React
- Build command: `npm run build`
- Output directory: `build`
- Environment variables: Set `REACT_APP_API_URL`

Your frontend is now live! 🎉

**Your frontend URL:** `https://service-platform-frontend.vercel.app`

---

### Option B: Using GitHub (Recommended for Updates)

#### 3B.1 Push to GitHub
```bash
git init
git add .
git commit -m "Service Platform - Ready for Vercel"
git remote add origin https://github.com/YOUR_USERNAME/service-platform.git
git branch -M main
git push -u origin main
```

#### 3B.2 Connect to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Select `frontend` folder as root directory
5. Add environment variable:
   - Name: `REACT_APP_API_URL`
   - Value: `https://your-railway-backend-url/api`
6. Click "Deploy"

Vercel auto-deploys on every GitHub push! 🚀

---

## ✅ Verify Deployment

### Test Frontend
1. Open your Vercel URL: `https://service-platform-frontend.vercel.app`
2. Try registering a new user
3. Login with credentials
4. Browse services
5. Book a service

### Test Backend Connection
1. Open browser DevTools → Network tab
2. Register/Login
3. See API calls to your Railway URL
4. Check responses are working

---

## 🔧 Environment Variables

### Frontend (Vercel Dashboard)
1. Go to your Vercel project
2. Settings → Environment Variables
3. Add:
   ```
   Name: REACT_APP_API_URL
   Value: https://your-railway-backend-url/api
   ```

### Backend (Railway Dashboard)
1. Go to your Railway project
2. Variables tab
3. Set:
   ```
   MONGO_URI: your-mongodb-uri
   JWT_SECRET: your-secret-key
   PORT: (Railway sets automatically)
   ```

---

## 🌐 Your Live URLs

After deployment:

- **Frontend:** `https://service-platform-frontend.vercel.app`
- **Backend:** `https://service-platform-api.up.railway.app/api`
- **Database:** MongoDB Atlas (no public URL needed)

---

## 🔄 Deploy Updates

### If using GitHub:
```bash
# Make changes locally
git add .
git commit -m "Your changes"
git push origin main
# Vercel auto-deploys!
```

### If using Vercel CLI:
```bash
cd frontend
vercel --prod
```

---

## 🚨 Troubleshooting

### "API is unreachable"
- Verify `REACT_APP_API_URL` in Vercel environment variables
- Check Railway backend is running: `railway logs`
- Ensure MongoDB URI is correct in Railway

### "CORS error"
- Backend CORS already configured
- If error persists, check backend logs: `railway logs`

### "Build failed on Vercel"
- Check build command: `npm run build`
- Verify build works locally: `npm run build`
- Check Node version (should be 16+ in Vercel settings)

### "Login not working"
- Check JWT_SECRET is set in Railway
- Verify MongoDB is accessible
- Check API calls in browser Network tab

---

## ✨ All Done!

Your app is now live with:
- ✅ Frontend on Vercel (fast, scalable)
- ✅ Backend on Railway (reliable, free)
- ✅ Database on MongoDB Atlas (cloud, backed up)
- ✅ Auto-deployment on GitHub push (if using Option B)

**Share your live URL:** `https://service-platform-frontend.vercel.app`

---

## 📞 One More Thing

### Add Custom Domain (Optional)
1. Go to Vercel project settings
2. Domains tab
3. Add your custom domain
4. Follow DNS instructions
5. Your app is at `https://yourdomain.com`

### Enable Analytics (Optional)
1. Vercel dashboard
2. Analytics tab
3. See real-time traffic, performance

### Setup GitHub Auto-Deploys (If new)
1. Vercel project → Git Repository
2. Check "Connected to GitHub"
3. Select your repo
4. Auto-deploys on every push!

---

**You're all set! Your Service Platform is LIVE! 🎉**
