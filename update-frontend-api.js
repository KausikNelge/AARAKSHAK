const fs = require('fs');
const path = require('path');

// Function to recursively find all JS/JSX files
function findJsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.includes('node_modules') && !file.includes('.git')) {
      findJsFiles(filePath, fileList);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to update file content
function updateFileContent(content) {
  // Replace hardcoded Railway URLs with relative paths
  let updatedContent = content;
  
  // Replace axios imports with createApiInstance
  updatedContent = updatedContent.replace(
    /import axios from 'axios';/g,
    "import createApiInstance from '../config/api';"
  );
  
  // Replace hardcoded URLs with relative paths
  updatedContent = updatedContent.replace(
    /axios\.get\('https:\/\/optimistic-smile-production\.up\.railway\.app\/api\//g,
    "api.get('/api/"
  );
  
  updatedContent = updatedContent.replace(
    /axios\.post\('https:\/\/optimistic-smile-production\.up\.railway\.app\/api\//g,
    "api.post('/api/"
  );
  
  updatedContent = updatedContent.replace(
    /axios\.put\('https:\/\/optimistic-smile-production\.up\.railway\.app\/api\//g,
    "api.put('/api/"
  );
  
  updatedContent = updatedContent.replace(
    /axios\.delete\('https:\/\/optimistic-smile-production\.up\.railway\.app\/api\//g,
    "api.delete('/api/"
  );
  
  // Add api instance creation where axios is used
  if (updatedContent.includes('api.get') || updatedContent.includes('api.post') || 
      updatedContent.includes('api.put') || updatedContent.includes('api.delete')) {
    
    // Check if api instance is already created
    if (!updatedContent.includes('const api = createApiInstance();')) {
      // Find the component function and add api instance
      updatedContent = updatedContent.replace(
        /const [^=]+ = \(\) => {/g,
        (match) => {
          return match + '\n  const api = createApiInstance();';
        }
      );
    }
  }
  
  return updatedContent;
}

// Main execution
console.log('🔄 Updating frontend API configuration...');

const frontendDir = path.join(__dirname, 'frontend', 'src');
const jsFiles = findJsFiles(frontendDir);

let updatedFiles = 0;

jsFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check if file contains hardcoded Railway URLs
    if (content.includes('optimistic-smile-production.up.railway.app')) {
      const updatedContent = updateFileContent(content);
      
      if (content !== updatedContent) {
        fs.writeFileSync(file, updatedContent, 'utf8');
        console.log(`✅ Updated: ${path.relative(__dirname, file)}`);
        updatedFiles++;
      }
    }
  } catch (error) {
    console.error(`❌ Error updating ${file}:`, error.message);
  }
});

console.log(`\n🎉 Updated ${updatedFiles} files successfully!`);
console.log('\n📋 Next steps:');
console.log('1. Copy Backend/env.example to Backend/.env');
console.log('2. Update Backend/.env with your MongoDB Atlas URI');
console.log('3. Run: docker-compose up --build');
console.log('4. Your backend will be available at http://localhost:3001'); 