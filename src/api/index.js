const Promise = require('bluebird');
const Bittrex = require('./bittrex');
const Poloniex = require('./poloniex');
const Liqui = require('./liqui');

const bittrex = new Bittrex();
const poloniex = new Poloniex();
const liqui = new Liqui();

function getCoins() {}

async function getTicker() {
  const coins = ['eth', 'bch', 'ltc'];
  return Promise.all([
    bittrex.ticker(coins),
    poloniex.ticker(coins),
    liqui.ticker(coins),
  ]).spread((bittrexLast, poloniexLast, liquiLast) => {
    return coins.reduce((accum, coin) => {
      return Object.assign({}, accum, {
        [coin]: [
          { exchange: 'bittrex', price: bittrexLast[coin] },
          { exchange: 'poloniex', price: poloniexLast[coin] },
          { exchange: 'liqui', price: liquiLast[coin] },
        ],
      });
    }, {});
  });
}

module.exports = { getTicker, getCoins };
