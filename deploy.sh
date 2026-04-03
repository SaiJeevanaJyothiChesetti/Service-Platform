#!/bin/bash
# Service Platform - Automated Deployment Script
# This script will deploy your app to Railway and Vercel

echo "🚀 Service Platform Deployment"
echo "================================"
echo ""

# Step 1: Verify git repository
echo "✅ Step 1: Checking Git Repository..."
if [ -d ".git" ]; then
    echo "   Git repository found"
else
    echo "   Initializing git..."
    git init
    git config user.name "SaiJeevanaJyothiChesetti"
    git config user.email "saijeevana.jyothi.chesetti@gmail.com"
    git add .
    git commit -m "Service Platform - Ready for Deployment"
fi

echo ""
echo "✅ Git repository ready!"
echo ""
echo "📝 NEXT STEPS - Copy & Paste These Commands:"
echo ""
echo "1️⃣  CREATE REPOSITORY ON GITHUB"
echo "   - Go to: https://github.com/new"
echo "   - Repository name: service-platform"
echo "   - Description: Full-stack service booking platform"
echo "   - Make it PUBLIC"
echo "   - Click 'Create repository'"
echo ""
echo "2️⃣  PUSH CODE TO GITHUB"
echo "   Copy and paste this command:"
echo ""
echo "   git remote add origin https://github.com/SaiJeevanaJyothiChesetti/service-platform.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3️⃣  DEPLOY BACKEND TO RAILWAY"
echo "   npm install -g @railway/cli"
echo "   railway login"
echo "   cd backend"
echo "   railway init"
echo "   railway up"
echo "   Then get your Railway URL and save it"
echo ""
echo "4️⃣  DEPLOY FRONTEND TO VERCEL"
echo "   npm install -g vercel"
echo "   vercel login"
echo "   cd frontend"
echo "   vercel --prod"
echo ""
echo "✅ All commands are ready!"
