# 🚀 GET YOUR LIVE URL IN 10 MINUTES

## Your Final URL Format
```
https://service-platform-XXXXX.vercel.app
```

**👇 Follow These 4 Simple Steps Below 👇**

---

## STEP 1️⃣: Push Code to GitHub (2 mins)

### 1.1 Create Empty Repository
Go to: https://github.com/new
- Name: `service-platform`
- Make it PUBLIC
- Click **Create repository**

### 1.2 Run This Command
Open **PowerShell** and paste:

```powershell
cd "C:\Users\WIN 11\Desktop\service-platform"
git remote add origin https://github.com/SaiJeevanaJyothiChesetti/service-platform.git
git branch -M main
git push -u origin main
```

✅ **Done!** Your code is on GitHub

---

## STEP 2️⃣: Deploy Backend to Railway (5 mins)

### 2.1 Install & Login
```powershell
npm install -g @railway/cli
railway login
```
✅ Browser opens, login with GitHub

### 2.2 Initialize Project
```powershell
cd "C:\Users\WIN 11\Desktop\service-platform\backend"
railway init
```

When asked:
- Name: `service-platform-api`
- Runtime: Click **Node.js**

### 2.3 Deploy
```powershell
railway up
```

⏳ **Wait 2-3 minutes for deployment...**

### 2.4 Get Your Railway URL
```powershell
railway service
```

📝 **COPY THIS URL** - It looks like:
```
https://service-platform-api.up.railway.app
```

✅ **SAVE THIS - You need it next!**

---

## STEP 3️⃣: Update Frontend & Push (2 mins)

### 3.1 Edit Environment File
Open: `frontend/.env.production`

Replace with your Railway URL from Step 2:
```
REACT_APP_API_URL=https://YOUR-RAILWAY-URL-HERE/api
```

**Example:**
```
REACT_APP_API_URL=https://service-platform-api.up.railway.app/api
```

### 3.2 Push Changes
```powershell
cd "C:\Users\WIN 11\Desktop\service-platform"
git add .
git commit -m "Update Railway URL for deployment"
git push origin main
```

✅ **Done!**

---

## STEP 4️⃣: Deploy Frontend to Vercel (3 mins)

### 4.1 Go to Vercel Dashboard
Open: https://vercel.com

### 4.2 Create New Project
1. Click **"New Project"**
2. Click **"Import Git Repository"**
3. Select **service-platform** repo
4. Click **"Select"**

### 4.3 Configure
- **Framework:** React
- **Root Directory:** Type `frontend` (IMPORTANT!)
- Build Command: `npm run build`
- Output Directory: `build`

### 4.4 Add Environment Variables
1. Click **"Add New"**
2. **Name:** `REACT_APP_API_URL`
3. **Value:** `https://YOUR-RAILWAY-URL/api`
4. Click **"Save"**

### 4.5 Deploy
Click **"Deploy"**

⏳ **Wait 2-3 minutes...**

---

## 🎉 YOUR FINAL LIVE URLs

After deployment completes, Vercel will show:

📱 **Frontend (Share this!)**
```
https://service-platform-XXXXX.vercel.app
```

🔌 **Backend API** (Backend only, not for sharing)
```
https://service-platform-api.up.railway.app/api
```

📊 **Database** (MongoDB - automatic)

---

## ✅ TEST YOUR LIVE APP

1. **Open your Vercel URL** in browser
2. Click **"Register"**
3. Create account:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `TestPass123`
4. Click **"Register"**
5. **Book a Service!**

✅ If it works, you're done!

---

## 📱 SHARE YOUR APP

Send this link:
```
https://service-platform-XXXXX.vercel.app
```

**Anyone can use it!** No installation needed.

---

## ❓ TROUBLESHOOTING

### "API not connecting"
- Check Vercel environment variable is correct
- Verify Railway backend URL is right
- Check browser console (DevTools → Console tab)

### "Build failed"
- Go to Vercel dashboard
- Click "Deployments"
- Read error message
- Fix locally and push again

### "Page not loading"
- Wait 5 minutes (first deploy takes time)
- Hard refresh: **Ctrl + Shift + R**
- Check browser console for errors

---

## 📞 Need Help?

- Backend issues? Check: `railway logs`
- Frontend issues? Check: Browser DevTools (F12)
- Deployment issues? Check: Vercel dashboard "Deployments" tab

---

**You're all set! Follow the 4 steps above and you'll have a live, sharable link!** 🚀

**Ready to start? Run STEP 1 first! ⬆️**
