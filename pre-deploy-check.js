#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Pre-Deployment Check for BreezaAI');
console.log('=====================================\n');

let allGood = true;

function check(description, condition, fix = null) {
    if (condition) {
        console.log(`✅ ${description}`);
    } else {
        console.log(`❌ ${description}`);
        if (fix) console.log(`   💡 Fix: ${fix}`);
        allGood = false;
    }
}

// 1. Check deployment files
console.log('📦 Deployment Configuration:');
check('vercel.json exists', fs.existsSync('vercel.json'));
check('DEPLOYMENT.md exists', fs.existsSync('DEPLOYMENT.md'));
check('Frontend .env.production exists', fs.existsSync('breeza-ai/.env.production'));

// 2. Check build readiness
console.log('\n🔨 Build Readiness:');
check('Backend dist directory exists', fs.existsSync('backend/dist'));
check('Frontend build directory exists', fs.existsSync('breeza-ai/build'));

// 3. Check essential files
console.log('\n📁 Essential Files:');
check('Backend index.ts exists', fs.existsSync('backend/index.ts'));
check('Frontend App.tsx exists', fs.existsSync('breeza-ai/src/App.tsx'));
check('Kiro prompts exist', fs.existsSync('.kiro/prompts') && fs.readdirSync('.kiro/prompts').length > 0);

// 4. Check package.json files
console.log('\n📋 Package Configuration:');
check('Root package.json has vercel-build script',
    fs.existsSync('package.json') &&
    JSON.parse(fs.readFileSync('package.json', 'utf8')).scripts['vercel-build']
);

check('Frontend package.json has vercel-build script',
    fs.existsSync('breeza-ai/package.json') &&
    JSON.parse(fs.readFileSync('breeza-ai/package.json', 'utf8')).scripts['vercel-build']
);

// 5. Check environment variables
console.log('\n⚙️  Environment Variables:');
try {
    const frontendEnv = fs.readFileSync('breeza-ai/.env', 'utf8');
    check('Frontend has API_URL configured', /REACT_APP_API_URL/.test(frontendEnv));
} catch (e) {
    check('Frontend .env readable', false, 'Create breeza-ai/.env');
}

try {
    const backendEnv = fs.readFileSync('backend/.env', 'utf8');
    check('Backend has PORT configured', /PORT/.test(backendEnv));
} catch (e) {
    check('Backend .env readable', false, 'Create backend/.env');
}

// 6. Check Git status
console.log('\n📝 Git Status:');
try {
    const { execSync } = require('child_process');
    const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
    check('All changes committed', gitStatus.trim() === '', 'Commit all changes with: git add . && git commit -m "Ready for deployment"');
} catch (e) {
    console.log('⚠️  Could not check Git status (not a Git repository or Git not installed)');
}

// Final recommendations
console.log('\n' + '='.repeat(50));
if (allGood) {
    console.log('🎉 Ready for Vercel deployment!');
    console.log('\n📋 Next Steps:');
    console.log('1. Push to GitHub: git push origin main');
    console.log('2. Deploy to Vercel: vercel');
    console.log('3. Update API URL in production environment');
    console.log('4. Test all features after deployment');
} else {
    console.log('⚠️  Please fix the issues above before deploying.');
    console.log('\n🔧 Quick fixes:');
    console.log('- Run: npm run build');
    console.log('- Run: git add . && git commit -m "Ready for deployment"');
    console.log('- Check all configuration files');
}
console.log('='.repeat(50));

console.log('\n📚 For detailed deployment instructions, see: DEPLOYMENT.md');