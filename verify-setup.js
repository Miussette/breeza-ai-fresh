#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 BreezaAI Setup Verification');
console.log('==============================\n');

let allGood = true;

// Check function
function check(description, condition, fix = null) {
  if (condition) {
    console.log(`✅ ${description}`);
  } else {
    console.log(`❌ ${description}`);
    if (fix) console.log(`   💡 Fix: ${fix}`);
    allGood = false;
  }
}

// 1. Check project structure
console.log('📁 Project Structure:');
check('Frontend directory exists', fs.existsSync('breeza-ai'));
check('Backend directory exists', fs.existsSync('backend'));
check('Kiro directory exists', fs.existsSync('.kiro'));
check('Main package.json exists', fs.existsSync('package.json'));
check('Configuration file exists', fs.existsSync('breeza-config.json'));

// 2. Check Kiro integration
console.log('\n🤖 Kiro Integration:');
check('Prompts directory exists', fs.existsSync('.kiro/prompts'));
check('Hooks configuration exists', fs.existsSync('.kiro/hooks.json'));
check('Specs configuration exists', fs.existsSync('.kiro/specs.json'));
check('Steering configuration exists', fs.existsSync('.kiro/steering.json'));
check('MCP settings exist', fs.existsSync('.kiro/settings/mcp.json'));

// 3. Check prompt files
console.log('\n📝 Kiro Prompts:');
const requiredPrompts = [
  'breathing_relaxation.txt',
  'emotional_checkin.txt', 
  'emotional_support.txt',
  'positive_redirect.txt',
  'wellbeing_lessons.txt'
];

requiredPrompts.forEach(prompt => {
  check(`${prompt} exists`, fs.existsSync(`.kiro/prompts/${prompt}`));
});

// 4. Check backend setup
console.log('\n🔧 Backend Setup:');
check('Backend package.json exists', fs.existsSync('backend/package.json'));
check('Backend TypeScript config exists', fs.existsSync('backend/tsconfig.json'));
check('Backend environment file exists', fs.existsSync('backend/.env'));
check('Kiro prompts utility exists', fs.existsSync('backend/utils/kiroPrompts.js'));
check('Weekly plan generator exists', fs.existsSync('backend/utils/weeklyPlanGenerator.js'));
check('Chat routes exist', fs.existsSync('backend/routes/chat.ts'));

// 5. Check frontend setup
console.log('\n🌐 Frontend Setup:');
check('Frontend package.json exists', fs.existsSync('breeza-ai/package.json'));
check('Frontend environment file exists', fs.existsSync('breeza-ai/.env'));
check('Main App component exists', fs.existsSync('breeza-ai/src/App.tsx'));
check('Chat component exists', fs.existsSync('breeza-ai/src/components/ChatBox.tsx'));
check('Weekly plan modal exists', fs.existsSync('breeza-ai/src/components/WeeklyPlanModal.tsx'));

// 6. Check configuration files
console.log('\n⚙️  Configuration:');

try {
  const backendEnv = fs.readFileSync('backend/.env', 'utf8');
  check('Backend port configured', /PORT\s*=\s*3001/.test(backendEnv));
} catch (e) {
  check('Backend .env readable', false, 'Create backend/.env with PORT=3001');
}

try {
  const frontendEnv = fs.readFileSync('breeza-ai/.env', 'utf8');
  check('Frontend API URL configured', frontendEnv.includes('REACT_APP_API_URL=http://localhost:3001'));
} catch (e) {
  check('Frontend .env readable', false, 'Create breeza-ai/.env with REACT_APP_API_URL=http://localhost:3001');
}

// 7. Check dependencies
console.log('\n📦 Dependencies:');
check('Backend node_modules exist', fs.existsSync('backend/node_modules'));
check('Frontend node_modules exist', fs.existsSync('breeza-ai/node_modules'));

// Final result
console.log('\n' + '='.repeat(40));
if (allGood) {
  console.log('🎉 All checks passed! BreezaAI is ready to run.');
  console.log('💡 Run "npm start" to launch the application.');
} else {
  console.log('⚠️  Some issues found. Please fix them before running.');
  console.log('💡 Run "npm run install:all" to install dependencies.');
}
console.log('='.repeat(40));