const rp = require('request-promise');

function pickWinner() {
  const options = {
    uri: 'http://api.hhindustries.ca/pick_winner',
    method: 'GET',
    json: true,
  };

  return rp(options).then(res => res.winner.replace('BTC_', ''));
}

module.exports = { pickWinner };