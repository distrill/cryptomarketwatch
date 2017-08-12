const Promise = require('bluebird');
const rp = require('request-promise');

function bitterex(coin) {
  const currencyPair = `BTC-${coin.toUpperCase()}`;
  const options = {
    uri: 'https://bittrex.com/api/v1.1/public/getticker',
    qs: {
      market: currencyPair,
    },
    json: true,
  };
  return rp(options).then(res => res.result.Last);
}

function poloniex(coins) {
  // const currencyPair = `BTC_${coin.toUpperCase()}`;
  const options = {
    uri: 'https://poloniex.com/public?command=returnTicker',
    json: true,
  };
  return rp(options).then(res => {
    return coins.map(coin => {
      const currencyPair = `BTC_${coin.toUpperCase()}`;
      return parseFloat(res[currencyPair].last);
    });
  });
}

function liqui(coin) {
  const currencyPair = `${coin.toLowerCase()}_btc`;
  const options = {
    uri: `https://api.liqui.io/api/3/ticker/${currencyPair}`,
    json: true,
  };
  return rp(options).then(res => res[currencyPair].last);
}

function getTicker(coin) {
  return Promise.all([
    // bitterex(coin),
    poloniex(coin),
    // liqui(coin),
  ]).spread((bitterexLast, poloniexLast, liquiLast) => {
    return {
      // bittrex: bitterexLast,
      poloniex: poloniexLast,
      // liqui: liquiLast,
    };
  });
}

module.exports = { getTicker };
