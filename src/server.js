const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.Server(app);
const port = process.env.PORT || 3000;

require('./socket/server')(server);

const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  const appRoot = path.join(publicPath, 'index.html');
  res.sendFile(appRoot);
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});
