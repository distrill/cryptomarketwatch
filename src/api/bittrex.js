const Promise = require('bluebird');
const rp = require('request-promise');
const BaseApi = require('./base');

class Bittrex extends BaseApi {
  constructor() {
    super('https://bittrex.com/api/v1.1');
  }

  getCoins() {
    console.log(this.baseUrl);
  }

  ticker(coins) {
    const uri = `${this.baseUrl}/public/getticker`;
    function getCurrencyPair(rawCoin) {
      const coin = rawCoin === 'bch' ? 'bcc' : rawCoin;
      return `BTC-${coin.toUpperCase()}`;
    }
    function doTheThing(accum, coin) {
      const currencyPair = getCurrencyPair(coin);
      const options = {
        uri,
        qs: {
          market: currencyPair,
        },
        json: true,
      };
      return rp(options).then(res => Object.assign({}, accum, { [coin]: res.result.Last }));
    }
    return Promise.reduce(coins, doTheThing, {});
  }
}

module.exports = Bittrex;
