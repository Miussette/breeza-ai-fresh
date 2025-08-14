#!/bin/bash
echo "🔨 Building BreezaAI Backend..."

# Install dependencies
npm install

# Build TypeScript
npx tsc

echo "✅ Build complete!"
