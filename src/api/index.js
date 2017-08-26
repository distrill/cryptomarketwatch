const Promise = require('bluebird');
const { intersection } = require('lodash');

const Bittrex = require('./bittrex');
const Poloniex = require('./poloniex');
const Liqui = require('./liqui');

const bittrex = new Bittrex();
const poloniex = new Poloniex();
const liqui = new Liqui();

function getCoins() {
  return Promise.all([
    bittrex.getCoins(),
    poloniex.getCoins(),
    liqui.getCoins(),
  ]).then(exchangeCoins => {
    // we want coins that are in each exchange
    return intersection(...exchangeCoins);
  });
}

async function getTicker() {
  const coins = await getCoins();
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
