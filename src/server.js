const app = require('express')();
const http = require('http').Server(app);

const port = process.env.PORT || 3000;

require('./socket')(http);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
  // getTicker(['eth', 'bch', 'ltc']).then(shit => res.json(shit));
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
