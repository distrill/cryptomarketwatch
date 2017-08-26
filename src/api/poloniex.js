const Base = require('./base');
const rp = require('request-promise');

class Poloniex extends Base {
  constructor() {
    super('https://poloniex.com');
    this.btcPrefix = 'BTC_';
  }

  getCoins() {
    const options = {
      uri: `${this.baseUrl}/public?command=returnTicker`,
      json: true,
    };
    return rp(options).then(response => {
      return Object.keys(response)
        .filter(elem => elem.includes(this.btcPrefix))
        .map(elem => elem.replace(this.btcPrefix, '').toUpperCase());
    });
  }

  ticker(coins) {
    const options = {
      uri: `${this.baseUrl}/public?command=returnTicker`,
      json: true,
    };
    return rp(options).then(res => {
      return coins.reduce((accum, coin) => {
        const currencyPair = `${this.btcPrefix}${coin.toUpperCase()}`;
        const price = res[currencyPair] ? res[currencyPair].last : '--';
        return Object.assign({}, accum, { [coin]: price });
      }, {});
    });
  }
}

module.exports = Poloniex;
