const https = require('https');
const zlib = require('zlib');
https.get('https://krishna-interiors.netlify.app/', (resp) => {
  let chunks = [];
  resp.on('data', (chunk) => chunks.push(chunk));
  resp.on('end', () => {
    const text = Buffer.concat(chunks).toString();
    console.log(text);
  });
});
