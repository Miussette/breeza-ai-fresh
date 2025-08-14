# BreezaAI Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/Miussette/Breeza-AI.git
cd Breeza-AI
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create environment file from example
cp .env.example .env

# The default configuration should work for development
```

### 3. Frontend Setup
```bash
cd ../breeza-ai
npm install

# Create environment file from example
cp .env.example .env

# The default API URL should work for local development
```

### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd breeza-ai
npm start
```

### 5. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
PORT=3001
```

**Frontend (.env):**
```env
REACT_APP_API_URL=http://localhost:3001
```

### AI Integration
- The app uses Kiro AI prompts for intelligent responses
- All AI functionality is built-in and requires no external API keys
- Responses are contextual and empathetic using local prompt system

## 📱 Features

### Core Functionality
- ✅ Mood tracking and selection
- ✅ Contextual chat conversations
- ✅ Weekly wellness plan generation
- ✅ Gratitude journal
- ✅ Breathing exercises
- ✅ Performance analytics
- ✅ User testimonials
- ✅ Mindfulness resources

### Responsive Design
- ✅ Mobile-first approach (320px to 1920px+)
- ✅ Touch-friendly interface
- ✅ Optimized for all devices
- ✅ Fast loading and smooth animations

## 🛠️ Development

### Build for Production
```bash
# Backend
cd backend
npm run build

# Frontend
cd breeza-ai
npm run build
```

### Testing
```bash
# Frontend
cd breeza-ai
npm test
```

## 🚀 Deployment

### Frontend (Static Hosting)
The `breeza-ai/build` folder can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

### Backend (Node.js Hosting)
The backend can be deployed to:
- Heroku
- Railway
- DigitalOcean
- AWS/Azure/GCP

## 📋 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 3001
npx kill-port 3001

# Or change port in backend/.env
PORT=3002
```

**API connection issues:**
- Ensure backend is running on port 3001
- Check `REACT_APP_API_URL` in frontend/.env
- Verify no firewall blocking localhost connections

**Build errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🎯 Next Steps

1. **Customize branding** - Update colors, fonts, and logos
2. **Add features** - Extend with additional wellness tools
3. **Deploy** - Host on your preferred platform
4. **Monitor** - Add analytics and error tracking

## 📞 Support

For issues or questions:
1. Check this setup guide
2. Review the documentation files
3. Check the GitHub issues
4. Create a new issue with details

Happy coding! ✨