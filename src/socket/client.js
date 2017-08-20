const openSocket = require('socket.io-client');

const socket = openSocket();

function tickerUpdate(cb) {
  socket.on('ticker_update', cb);
}

module.exports = { tickerUpdate };
