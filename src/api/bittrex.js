const Promise = require('bluebird');
const rp = require('request-promise');
const BaseApi = require('./base');

class Bittrex extends BaseApi {
  constructor() {
    super('https://bittrex.com/api/v1.1');
  }

  getCoins() {
    const options = {
      uri: `${this.baseUrl}/public/getmarkets`,
      json: true,
    };
    return rp(options).then(response => {
      return response.result
        .filter(elem => elem.BaseCurrency === 'BTC')
        .map(elem => elem.MarketCurrency.toUpperCase());
    });
  }

  ticker(coins) {
    const uri = `${this.baseUrl}/public/getticker`;
    function getCurrencyPair(rawCoin) {
      const coin = rawCoin === 'bch' ? 'bcc' : rawCoin;
      return `BTC-${coin.toUpperCase()}`;
    }

    function processTickerInfo(accum, coin) {
      const currencyPair = getCurrencyPair(coin);
      const options = {
        uri,
        qs: {
          market: currencyPair,
        },
        json: true,
      };
      return rp(options)
        .then(res => Object.assign({}, accum, { [coin]: res.result.Last }))
        .catch(() => '--');
    }

    return Promise.reduce(coins, processTickerInfo, {});
  }
}

module.exports = Bittrex;
