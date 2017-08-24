const Base = require('./base');
const rp = require('request-promise');
const Promise = require('bluebird');

class Liqui extends Base {
  constructor() {
    super('https://api.liqui.io/api/3');
  }

  getCoins() {
    console.log(this.baseUrl);
  }

  ticker(coins) {
    const uri = `${this.baseUrl}/ticker`;
    function getCurrencyPair(rawCoin) {
      const coin = rawCoin === 'bch' ? 'bcc' : rawCoin;
      return `${coin.toLowerCase()}_btc`;
    }
    function doTheThing(accum, coin) {
      const currencyPair = getCurrencyPair(coin);
      const options = {
        uri: `${uri}/${currencyPair}`,
        json: true,
      };
      return rp(options).then(res => {
        return Object.assign({}, accum, { [coin]: res[currencyPair].last });
      });
    }
    return Promise.reduce(coins, doTheThing, {});
  }
}

module.exports = Liqui;
