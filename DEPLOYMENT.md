# Service Platform - Deployment Guide

## Project Structure

```
service-platform/
├── frontend/        # React app (port 3001)
├── backend/         # Node.js + Express API (port 5000)
└── README.md
```

## Prerequisites

- Node 16+ 
- MongoDB Atlas account (free tier available)
- Git
- Heroku account (for deployment) or other hosting

## Local Development Setup

### 1. Backend Setup

```bash
cd backend
npm install
```

Create or update `.env`:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/servicePlatform
PORT=5000
JWT_SECRET=your-secret-key-here
```

Start backend:
```bash
npm run dev    # Development with nodemon
npm start      # Production
```

Backend will run at `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm start
```

Frontend will run at `http://localhost:3001`

## API Endpoints

All endpoints require `Authorization: Bearer <token>` header except auth endpoints.

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user (returns JWT token)
- `GET /api/auth/me` - Get current user (protected)

### Providers
- `GET /api/providers` - Get all providers (with filters)
- `POST /api/providers` - Create provider (requires auth)
- `GET /api/providers/:id` - Get provider by ID

### Bookings
- `POST /api/bookings` - Create booking (protected)
- `GET /api/bookings` - Get user's bookings (protected)
- `PUT /api/bookings/:id/cancel` - Cancel booking (protected)

## Deployment to Heroku

### 1. Prepare for Deployment

Update `frontend/.env.production`:
```
REACT_APP_API_URL=https://your-app.herokuapp.com/api
```

### 2. Create Heroku App

```bash
heroku login
heroku create your-app-name
```

### 3. Set Environment Variables

```bash
heroku config:set MONGO_URI="your-mongodb-atlas-uri"
heroku config:set JWT_SECRET="your-jwt-secret"
heroku config:set NODE_ENV="production"
```

### 4. Deploy Full Stack

Option A: Deploy from git (if you have both frontend and backend in one repo):

```bash
git push heroku main
```

Option B: Deploy separately

**For Backend:**
```bash
cd backend
heroku create service-platform-api
git push heroku main
```

**For Frontend:**
Build the React app and deploy to Vercel/Netlify:

```bash
cd frontend
npm run build
# Deploy build/ folder to Vercel or Netlify
```

Then update `REACT_APP_API_URL` to point to your Heroku backend URL.

### 5. Verify Deployment

```bash
heroku logs --tail
```

## Deployment to Other Platforms

### Vercel (Frontend)
1. Connect your GitHub repo to Vercel
2. Set environment variable: `REACT_APP_API_URL=<your-api-url>`
3. Deploy

### Netlify (Frontend)
1. Connect your GitHub repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `build`
4. Set environment variable: `REACT_APP_API_URL=<your-api-url>`

### DigitalOcean / AWS (Full Stack)
1. Create VM/EC2 instance
2. SSH into instance
3. Install Node.js: `curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs`
4. Clone repository
5. Install dependencies for both frontend and backend
6. Build frontend: `cd frontend && npm run build`
7. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start backend/server.js --name "api"
   pm2 save
   ```
8. Use Nginx as reverse proxy to serve both frontend and backend

## Database Migration (MongoDB)

### Initial Seed Data

The backend includes `seed.js` to populate initial data:

```bash
cd backend
node seed.js
```

This creates test users, providers, and bookings for development.

### Backup & Restore

```bash
# Backup MongoDB
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/servicePlatform" --out ./backup

# Restore MongoDB
mongorestore --uri "mongodb+srv://user:pass@cluster.mongodb.net/servicePlatform" ./backup/servicePlatform
```

## Production Checklist

- [ ] Update `REACT_APP_API_URL` in frontend .env files
- [ ] Set strong `JWT_SECRET` in backend
- [ ] Enable MongoDB IP whitelist
- [ ] Set `NODE_ENV=production`
- [ ] Configure MongoDB backups
- [ ] Set up error logging (e.g., Sentry)
- [ ] Enable HTTPS/SSL
- [ ] Test all user flows (register, login, book, profile)
- [ ] Set up monitoring & alerts
- [ ] Configure CI/CD pipeline

## Troubleshooting

### CORS Errors
- Add frontend URL to `CORS_ORIGIN` in backend
- Check `.env` variables are set correctly

### MongoDB Connection Errors
- Verify MONGO_URI is correct
- Add your IP to MongoDB IP whitelist
- Check credentials are URL-encoded if they contain special characters

### API Not Found
- Verify backend is running and accessible
- Check `REACT_APP_API_URL` is correct in frontend
- Check network tab in browser DevTools

### Build Errors
- Delete `node_modules` and run `npm install` again
- Clear cache: `npm cache clean --force`
- Check Node version: `node --version` (should be 16+)

## Support

For issues, check:
1. Backend logs: `npm run dev` (look for errors)
2. Frontend console: Browser DevTools Console tab
3. MongoDB logs: MongoDB Atlas dashboard
4. Network requests: Browser DevTools Network tab

