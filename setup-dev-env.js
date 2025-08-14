#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up BreezaAI development environment...\n');

// Backend .env setup
const backendEnvPath = path.join(__dirname, 'backend', '.env');
const backendEnvExamplePath = path.join(__dirname, 'backend', '.env.example');

if (!fs.existsSync(backendEnvPath)) {
  if (fs.existsSync(backendEnvExamplePath)) {
    fs.copyFileSync(backendEnvExamplePath, backendEnvPath);
    console.log('✅ Created backend/.env from .env.example');
  } else {
    fs.writeFileSync(backendEnvPath, 'PORT=3001\n');
    console.log('✅ Created backend/.env with default configuration');
  }
} else {
  console.log('ℹ️  backend/.env already exists');
}

// Frontend .env setup
const frontendEnvPath = path.join(__dirname, 'breeza-ai', '.env');
const frontendEnvExamplePath = path.join(__dirname, 'breeza-ai', '.env.example');

if (!fs.existsSync(frontendEnvPath)) {
  if (fs.existsSync(frontendEnvExamplePath)) {
    fs.copyFileSync(frontendEnvExamplePath, frontendEnvPath);
    console.log('✅ Created breeza-ai/.env from .env.example');
  } else {
    fs.writeFileSync(frontendEnvPath, 'REACT_APP_API_URL=http://localhost:3001\n');
    console.log('✅ Created breeza-ai/.env with default configuration');
  }
} else {
  console.log('ℹ️  breeza-ai/.env already exists');
}

console.log('\n🎉 Development environment setup complete!');
console.log('💡 You can now run: npm start');