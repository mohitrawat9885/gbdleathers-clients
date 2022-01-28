const fs = require('fs');
const express = require('express');
const http = require('http');
const https = require('https');
const path = require('path');
const app = express();

const env = 'delelopment';
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = 80;

if (env === 'production') {
  const privateKey = fs.readFileSync(
    '/etc/letsencrypt/live/gbdhandwork.com/privkey.pem',
    'utf8'
  );
  const certificate = fs.readFileSync(
    '/etc/letsencrypt/live/gbdhandwork.com/cert.pem',
    'utf8'
  );
  const ca = fs.readFileSync(
    '/etc/letsencrypt/live/gbdhandwork.com/chain.pem',
    'utf8'
  );
  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };

  https.createServer(credentials, app).listen(443, () => {
    console.log('HTTPS Server running on port 443');
  });
  http
    .createServer(function (req, res) {
      res.writeHead(301, {
        Location: 'https://' + req.headers['host'] + req.url,
      });
      res.end();
    })
    .listen(80);
} else if (env === 'development') {
  app.listen(PORT, () => console.log(`Listening at Port ${PORT}`));
} else {
  app.listen(PORT, () => console.log(`Listening at Port ${PORT}`));
}
