const socketIo = require('socket.io');
const { getTicker, pickWinner } = require('./../api');
const { UPDATE_COIN_DATA_EVENT, UPDATE_WINNER_EVENT } = require('./../../config/socket');

module.exports = http => {
  const io = socketIo(http);

  io.on('connection', socket => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  setInterval(() => {
    getTicker().then(res => {
      io.emit(UPDATE_COIN_DATA_EVENT, res);
    });
    pickWinner().then(res => {
      io.emit(UPDATE_WINNER_EVENT, res);
    });
  }, 2000);
};
