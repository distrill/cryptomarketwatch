const app = require('express')();
const http = require('http').Server(app);
const { getTicker } = require('./api');

// require('./socket')(http);

app.get('/', (req, res) => {
  // res.sendFile(`${__dirname}/views/index.html`);
  getTicker(['eth', 'bch', 'ltc']).then(shit => res.json(shit));
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
