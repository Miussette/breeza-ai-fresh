#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Starting BreezaAI - Mental Wellness Companion');
console.log('================================================');

// Load configuration
const configPath = path.join(__dirname, 'breeza-config.json');
let config;

try {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  console.log(`✅ Loaded configuration: ${config.name} v${config.version}`);
} catch (error) {
  console.error('❌ Error loading configuration:', error.message);
  process.exit(1);
}

// Check if .kiro directory exists
const kiroPath = path.join(__dirname, '.kiro');
if (fs.existsSync(kiroPath)) {
  console.log('✅ Kiro integration detected');
  console.log('   - Prompts:', fs.readdirSync(path.join(kiroPath, 'prompts')).length);
  console.log('   - Hooks:', fs.existsSync(path.join(kiroPath, 'hooks.json')) ? '✓' : '✗');
  console.log('   - Specs:', fs.existsSync(path.join(kiroPath, 'specs.json')) ? '✓' : '✗');
} else {
  console.log('⚠️  Kiro directory not found - using fallback responses');
}

// Function to start a service
function startService(name, command, args, cwd, color = '\x1b[36m') {
  console.log(`${color}🔄 Starting ${name}...\x1b[0m`);
  
  const process = spawn(command, args, {
    cwd: path.join(__dirname, cwd),
    stdio: 'pipe',
    shell: true
  });

  process.stdout.on('data', (data) => {
    const lines = data.toString().split('\n').filter(line => line.trim());
    lines.forEach(line => {
      console.log(`${color}[${name}]\x1b[0m ${line}`);
    });
  });

  process.stderr.on('data', (data) => {
    const lines = data.toString().split('\n').filter(line => line.trim());
    lines.forEach(line => {
      console.log(`${color}[${name}]\x1b[31m ${line}\x1b[0m`);
    });
  });

  process.on('close', (code) => {
    console.log(`${color}[${name}]\x1b[0m Process exited with code ${code}`);
  });

  return process;
}

// Start backend
console.log('\n📡 Starting Backend Services...');
const backend = startService(
  'Backend', 
  'npm', 
  ['run', 'dev'], 
  config.architecture.backend.path,
  '\x1b[32m' // Green
);

// Wait a bit for backend to start
setTimeout(() => {
  console.log('\n🌐 Starting Frontend...');
  const frontend = startService(
    'Frontend', 
    'npm', 
    ['start'], 
    config.architecture.frontend.path,
    '\x1b[34m' // Blue
  );

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down BreezaAI...');
    backend.kill();
    frontend.kill();
    process.exit(0);
  });

  console.log('\n✨ BreezaAI is starting up!');
  console.log('📱 Frontend: http://localhost:3000');
  console.log('🔧 Backend:  http://localhost:3001');
  console.log('💡 Press Ctrl+C to stop all services');

}, 3000);

// Keep the process alive
process.stdin.resume();