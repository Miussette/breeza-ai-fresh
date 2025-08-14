# BreezaAI - GitHub Repository Setup

## 🚀 Quick Start for Contributors

### 1. Clone and Setup
```bash
git clone https://github.com/Miussette/Breeza-AI.git
cd Breeza-AI

# Setup development environment
npm run setup-dev

# Install all dependencies
npm run install:all
```

### 2. Verify Setup
```bash
# Check that everything is configured correctly
npm run verify

# Build the project
npm run build
```

### 3. Run Development Server
```bash
# Start both frontend and backend
npm start
```

## 📁 Environment Files

This project uses environment files for configuration:

- `backend/.env.example` → Copy to `backend/.env`
- `breeza-ai/.env.example` → Copy to `breeza-ai/.env`

**Note:** Actual `.env` files are not included in the repository for security reasons.

## 🔧 Development Configuration

### Backend (.env)
```env
PORT=3001
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:3001
```

## 🚀 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 📚 Documentation

- [Setup Guide](SETUP_GUIDE.md) - Complete setup instructions
- [Kiro Integration](KIRO_INTEGRATION.md) - AI system documentation
- [Deployment Guide](DEPLOYMENT.md) - Production deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.