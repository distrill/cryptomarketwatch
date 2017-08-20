const Promise = require('bluebird');
const rp = require('request-promise');

function bitterex(coins) {
  function getCurrencyPair(rawCoin) {
    const coin = rawCoin === 'bch' ? 'bcc' : rawCoin;
    return `BTC-${coin.toUpperCase()}`;
  }
  function doTheThing(accum, coin) {
    const currencyPair = getCurrencyPair(coin);
    const options = {
      uri: 'https://bittrex.com/api/v1.1/public/getticker',
      qs: {
        market: currencyPair,
      },
      json: true,
    };
    return rp(options).then(res => Object.assign({}, accum, { [coin]: res.result.Last }));
  }
  return Promise.reduce(coins, doTheThing, {});
}

function poloniex(coins) {
  const options = {
    uri: 'https://poloniex.com/public?command=returnTicker',
    json: true,
  };
  return rp(options).then(res => {
    return coins.reduce((accum, coin) => {
      const currencyPair = `BTC_${coin.toUpperCase()}`;
      const price = parseFloat(res[currencyPair].last);
      return Object.assign({}, accum, { [coin]: price });
    }, {});
  });
}

function liqui(coins) {
  function getCurrencyPair(rawCoin) {
    const coin = rawCoin === 'bch' ? 'bcc' : rawCoin;
    return `${coin.toLowerCase()}_btc`;
  }
  function doTheThing(accum, coin) {
    const currencyPair = getCurrencyPair(coin);
    const options = {
      uri: `https://api.liqui.io/api/3/ticker/${currencyPair}`,
      json: true,
    };
    return rp(options).then(res => {
      return Object.assign({}, accum, { [coin]: res[currencyPair].last });
    });
  }
  return Promise.reduce(coins, doTheThing, {});
}

function getTicker(coins) {
  return Promise.all([
    bitterex(coins),
    poloniex(coins),
    liqui(coins),
  ]).spread((bittrexLast, poloniexLast, liquiLast) => {
    return coins.reduce((accum, coin) => {
      return Object.assign({}, accum, {
        [coin]: {
          poloniex: poloniexLast[coin],
          bitterex: bittrexLast[coin],
          liqui: liquiLast[coin],
        },
      });
    }, {});
  });
}

module.exports = { getTicker };
