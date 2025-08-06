const http = require('http');
const port = process.env.PORT || 3000;

console.log('Starting Railway Final Server...');
console.log('Port:', port);

const server = http.createServer((req, res) => {
  console.log('Request:', req.method, req.url);
  
  res.writeHead(200, { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  
  if (req.url === '/health') {
    res.end(JSON.stringify({
      status: 'OK',
      timestamp: new Date().toISOString(),
      service: 'Railway Final Server'
    }));
  } else {
    res.end(JSON.stringify({
      message: 'Railway Final Server Working',
      timestamp: new Date().toISOString(),
      port: port,
      url: req.url,
      method: req.method
    }));
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log('Railway deployment successful!');
});

server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
}); 