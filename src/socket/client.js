const openSocket = require('socket.io-client');

const socket = openSocket();

function update(event, cb) {
  socket.on(event, cb);
}

module.exports = { update };
