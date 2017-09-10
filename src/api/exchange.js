/* eslint-disable class-methods-use-this */

class BaseApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  ticker() {
    throw new Error('Implement me pls');
  }
  getCoins() {
    throw new Error('Implement me pls');
  }
}

module.exports = BaseApi;
