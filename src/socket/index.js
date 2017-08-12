const socketIo = require('socket.io');
const { getTicker } = require('./../api');

module.exports = http => {
  const io = socketIo(http);

  io.on('connection', socket => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  setInterval(() => {
    getTicker('eth').then(res => {
      io.emit('ticker_update', res);
    });
  }, 2000);
};
