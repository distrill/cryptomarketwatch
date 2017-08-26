const Base = require('./base');
const rp = require('request-promise');
const Promise = require('bluebird');

class Liqui extends Base {
  constructor() {
    super('https://api.liqui.io/api/3');
    this.btcPrefix = '_btc';
  }

  getCoins() {
    const options = {
      uri: `${this.baseUrl}/info`,
      json: true,
    };
    return rp(options).then(response => {
      return Object.keys(response.pairs)
        .filter(elem => elem.includes(this.btcPrefix))
        .map(elem => elem.replace(this.btcPrefix, '').toUpperCase());
    });
  }

  ticker(coins) {
    const uri = `${this.baseUrl}/ticker`;
    function getCurrencyPair(rawCoin) {
      const coin = rawCoin === 'bch' ? 'bcc' : rawCoin;
      return `${coin.toLowerCase()}_btc`;
    }
    function processTickerInfo(accum, coin) {
      const currencyPair = getCurrencyPair(coin);
      const options = {
        uri: `${uri}/${currencyPair}`,
        json: true,
      };
      return rp(options)
        .then(res => {
          return Object.assign({}, accum, { [coin]: res[currencyPair].last });
        })
        .catch(() => Object.assign({}, accum, { [coin]: '--' }));
    }
    return Promise.reduce(coins, processTickerInfo, {});
  }
}

module.exports = Liqui;
