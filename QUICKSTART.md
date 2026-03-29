# Service Platform - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 16+ installed
- MongoDB Atlas account (free: https://www.mongodb.com/cloud/atlas)

### Step 1: Create MongoDB Database

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free account)
3. Create a cluster
4. Get connection string (looks like: `mongodb+srv://user:pass@cluster.net/database`)

### Step 2: Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file with your MongoDB URI
echo 'MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/servicePlatform' > .env
echo 'PORT=5000' >> .env
echo 'JWT_SECRET=your-secret-key-12345' >> .env

# Start backend server
npm run dev
```

✅ Backend ready at http://localhost:5000/api

### Step 3: Setup Frontend

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Create .env.local file
echo 'REACT_APP_API_URL=http://localhost:5000/api' > .env.local

# Start frontend
npm start
```

✅ Frontend ready at http://localhost:3001

## 📝 Test the App

### Create Account
1. Go to http://localhost:3001
2. Click "Register"
3. Fill form with:
   - Name: Your Name
   - Email: your.email@test.com
   - Phone: 9876543210
   - Password: TestPass123 (min 8 chars)
   - Role: Customer (or Provider)
4. Click Register

### Login
1. Use your registered email and password
2. You're now logged in!

### Book a Service
1. Go to Dashboard
2. Choose a service (e.g., "Dance Teacher")
3. Find a provider and click "Book This Provider"
4. Check "My Bookings" to see your booking

### Become a Provider
1. Go to Dashboard
2. Click "Add Provider"
3. Fill in service details:
   - Select a service
   - Enter experience, price, location
   - Add description
4. Click "Save Provider"
5. Customers can now book you!

## 🛑 Stop Servers

```bash
# Press Ctrl+C in each terminal window
```

## 🐛 Troubleshooting

### Backend won't start
- Check `.env` file exists with `MONGO_URI`
- Verify MongoDB Atlas connection string is correct
- Check if port 5000 is available

### Frontend won't connect to backend
- Check `REACT_APP_API_URL` in `.env.local` is correct
- Verify backend is running on port 5000
- Check browser console for errors

### MongoDB connection error
- Add your IP to MongoDB Atlas IP whitelist
- Check username/password are correct in connection string
- Ensure special characters in password are URL-encoded

## 📚 Architecture

```
React Frontend (3001)
      ↓
   API Client (fetch)
      ↓
Node.js Backend (5000)
      ↓
MongoDB Database
```

## 🚀 Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- Heroku deployment
- Vercel/Netlify deployment
- Docker deployment
- AWS deployment

## 📖 Full Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [backend/README.md](./backend/README.md) - Backend API docs
- [frontend/README.md](./frontend/README.md) - Frontend docs

## 💡 Key Features

✅ User authentication (signup/login)
✅ Role-based access (customer/provider)
✅ Service booking system
✅ Provider profiles
✅ Real-time data with MongoDB
✅ Secure password storage (bcrypt)
✅ JWT token authentication
✅ Responsive design
✅ Modern UI with animations

## 🔐 Security

- Passwords hashed with bcrypt
- API protected with JWT
- MongoDB Atlas network security
- CORS enabled for frontend domain
- Environment variables for secrets

Happy coding! 🎉
