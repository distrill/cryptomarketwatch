const { getCoins } = require('./../src/api');

getCoins().then(console.log).catch(console.log);
