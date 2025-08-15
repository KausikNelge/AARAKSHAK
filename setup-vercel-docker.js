const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Vercel + Docker Backend Setup');
console.log('================================\n');

// Function to update frontend API configuration with ngrok URL
function updateFrontendConfig(ngrokUrl) {
  const apiConfigPath = path.join(__dirname, 'frontend', 'src', 'config', 'api.js');
  
  if (!fs.existsSync(apiConfigPath)) {
    console.error('❌ API config file not found. Please run the setup in the correct directory.');
    return false;
  }

  let content = fs.readFileSync(apiConfigPath, 'utf8');
  
  // Update the development baseURL with ngrok URL
  const updatedContent = content.replace(
    /development: \{[^}]*baseURL: '[^']*'/,
    `development: {
    baseURL: '${ngrokUrl}'`
  );

  fs.writeFileSync(apiConfigPath, updatedContent);
  console.log(`✅ Updated frontend API config with ngrok URL: ${ngrokUrl}`);
  return true;
}

// Function to update backend CORS with ngrok URL
function updateBackendCors(ngrokUrl) {
  const backendIndexPath = path.join(__dirname, 'Backend', 'index.js');
  
  if (!fs.existsSync(backendIndexPath)) {
    console.error('❌ Backend index.js not found.');
    return false;
  }

  let content = fs.readFileSync(backendIndexPath, 'utf8');
  
  // Add ngrok URL to CORS origins
  const corsOriginsPattern = /const defaultOrigins = \[([^\]]*)\];/;
  const match = content.match(corsOriginsPattern);
  
  if (match) {
    const existingOrigins = match[1];
    const updatedOrigins = existingOrigins + `\n    '${ngrokUrl}',`;
    
    const updatedContent = content.replace(
      corsOriginsPattern,
      `const defaultOrigins = [${updatedOrigins}];`
    );
    
    fs.writeFileSync(backendIndexPath, updatedContent);
    console.log(`✅ Updated backend CORS with ngrok URL: ${ngrokUrl}`);
    return true;
  }
  
  return false;
}

// Function to create environment file
function createEnvFile() {
  const envExamplePath = path.join(__dirname, 'Backend', 'env.example');
  const envPath = path.join(__dirname, 'Backend', '.env');
  
  if (!fs.existsSync(envExamplePath)) {
    console.error('❌ env.example not found.');
    return false;
  }
  
  if (!fs.existsSync(envPath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created Backend/.env from template');
    console.log('⚠️  Please update Backend/.env with your MongoDB Atlas URI');
  } else {
    console.log('ℹ️  Backend/.env already exists');
  }
  
  return true;
}

// Main setup function
async function setup() {
  console.log('📋 This setup will help you connect your Vercel frontend to your local Docker backend.\n');
  
  // Step 1: Create environment file
  console.log('1️⃣ Creating environment file...');
  createEnvFile();
  
  // Step 2: Get ngrok URL
  console.log('\n2️⃣ Ngrok Configuration');
  console.log('   After starting Docker with ngrok, you\'ll get a public URL like:');
  console.log('   https://abc123.ngrok.io');
  console.log('   This URL will be used to connect your Vercel frontend to your local backend.\n');
  
  rl.question('Enter your ngrok URL (or press Enter to skip for now): ', (ngrokUrl) => {
    if (ngrokUrl.trim()) {
      // Step 3: Update frontend config
      console.log('\n3️⃣ Updating frontend configuration...');
      updateFrontendConfig(ngrokUrl.trim());
      
      // Step 4: Update backend CORS
      console.log('\n4️⃣ Updating backend CORS...');
      updateBackendCors(ngrokUrl.trim());
    }
    
    console.log('\n🎉 Setup complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Update Backend/.env with your MongoDB Atlas URI');
    console.log('2. Start Docker: docker-compose up --build');
    console.log('3. Get ngrok URL from: http://localhost:4040');
    console.log('4. Update frontend config with ngrok URL if not done already');
    console.log('5. Deploy frontend to Vercel');
    console.log('\n🔗 Your Vercel frontend will now connect to your local Docker backend!');
    
    rl.close();
  });
}

// Run setup
setup().catch(console.error); 