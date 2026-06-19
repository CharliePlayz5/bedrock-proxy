const bedrock = require('bedrock-protocol');
const express = require('express');
const app = express();

// --- KEEP-ALIVE WEB SERVER ---
app.get('/', (req, res) => {
  res.send('Proxy Bot is Awake!');
});

const HTTP_PORT = process.env.PORT || 3000;
app.listen(HTTP_PORT, () => {
  console.log(`Keep-alive web server running on port ${HTTP_PORT}`);
});

// --- BEDROCK PROXY BOT ---
const TARGET_IP = '147.185.221.21'; 
const TARGET_PORT = 33501;          

console.log("Initializing Bedrock Redirect Bot...");

const server = bedrock.createServer({
  host: '0.0.0.0',
  port: 19132,        
  version: '1.21.0',  // Make sure this matches your server version!
  offline: false      
});

server.on('connect', client => {
  client.on('join', () => {
    console.log(`Player ${client.getUserData().displayName} connected. Redirecting...`);
    client.write('transfer', {
      server_address: TARGET_IP,
      port: TARGET_PORT
    });
  });
});
