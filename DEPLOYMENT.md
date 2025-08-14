# BreezaAI - Deployment Guide

## 🚀 Vercel Deployment

### Prerequisites
- GitHub repository with your code
- Vercel account (free tier works)
- All code committed and pushed to GitHub

### Step-by-Step Deployment

#### 1. Prepare for Deployment
```bash
# Make sure everything is built and working locally
npm run verify
npm run build

# Commit all changes
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

#### 2. Deploy to Vercel

**Option A: Vercel CLI (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: breeza-ai
# - Directory: ./
# - Override settings? No
```

**Option B: Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Other
   - **Root Directory:** `./`
   - **Build Command:** `npm run build:frontend`
   - **Output Directory:** `breeza-ai/build`

#### 3. Environment Variables
In Vercel dashboard, add these environment variables:
- `NODE_ENV` = `production`
- `REACT_APP_API_URL` = `https://your-app-name.vercel.app`

#### 4. Update API URL
After deployment, update the API URL in:
- `breeza-ai/.env.production`
- Vercel environment variables

Replace `your-vercel-app.vercel.app` with your actual Vercel URL.

### 🔧 Configuration Files

#### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "breeza-ai/package.json",
      "use": "@vercel/static-build"
    },
    {
      "src": "backend/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/breeza-ai/$1"
    }
  ]
}
```

### 📁 Project Structure for Vercel
```
breeza-ai-complete/
├── breeza-ai/          # Frontend (React)
├── backend/            # Backend (Node.js)
├── .kiro/             # Kiro prompts & config
├── vercel.json        # Vercel configuration
└── package.json       # Root package.json
```

### 🌐 URLs After Deployment
- **Frontend:** `https://your-app.vercel.app`
- **Backend API:** `https://your-app.vercel.app/api`
- **Health Check:** `https://your-app.vercel.app/api/ping`

### 🔍 Testing Deployment
```bash
# Test API endpoint
curl https://your-app.vercel.app/api/ping

# Test chat endpoint
curl -X POST https://your-app.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "history": []}'

# Test weekly plan
curl -X POST https://your-app.vercel.app/api/weekly-plan \
  -H "Content-Type: application/json" \
  -d '{"mood": "happy", "goals": [], "preferences": []}'
```

### 🐛 Troubleshooting

**Build Errors:**
- Check Vercel build logs
- Ensure all dependencies are in package.json
- Verify TypeScript compilation locally

**API Not Working:**
- Check environment variables in Vercel
- Verify API routes in vercel.json
- Check function logs in Vercel dashboard

**Frontend Not Loading:**
- Verify build output directory
- Check static file serving
- Ensure React app builds successfully

**CORS Issues:**
- Backend already has CORS enabled
- Check API URL in frontend environment variables

### 📊 Performance Optimization

**Frontend:**
- Static files cached by Vercel CDN
- Gzip compression enabled
- Image optimization available

**Backend:**
- Serverless functions auto-scale
- Cold start optimization
- Function timeout: 10s (free tier)

### 🔒 Security

**Environment Variables:**
- Never commit .env files
- Use Vercel environment variables
- Separate dev/prod configurations

**API Security:**
- CORS properly configured
- Input validation in place
- No sensitive data in responses

### 📈 Monitoring

**Vercel Analytics:**
- Enable in project settings
- Monitor performance metrics
- Track user interactions

**Function Logs:**
- Available in Vercel dashboard
- Real-time error monitoring
- Performance insights

---

## 🎉 Success!

Once deployed, your BreezaAI app will be available at:
`https://your-app-name.vercel.app`

Features available:
- ✅ AI Chat with Kiro prompts
- ✅ Weekly wellness plans
- ✅ Gratitude journal
- ✅ Breathing exercises
- ✅ Mood tracking
- ✅ Performance analytics
- ✅ Responsive design

**Share your mental wellness companion with the world! 🌸✨**