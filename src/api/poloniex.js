const Base = require('./base');
const rp = require('request-promise');

class Poloniex extends Base {
  constructor() {
    super('https://poloniex.com');
  }

  getCoins() {
    console.log(this.baseUrl);
  }

  ticker(coins) {
    const options = {
      uri: `${this.baseUrl}/public?command=returnTicker`,
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
}

module.exports = Poloniex;
