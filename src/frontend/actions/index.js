export const UPDATE_COIN_DATA = 'UPDATE_COIN_DATA';

export const updateCoinData = coinData => {
  return {
    type: UPDATE_COIN_DATA,
    coins: coinData,
  };
};
