export const UPDATE_COIN_DATA = 'UPDATE_COIN_DATA';
export const UPDATE_WINNER = 'UPDATE_WINNER';

export const updateCoinData = coins => {
  return {
    type: UPDATE_COIN_DATA,
    coins,
  };
};

export const updateWinner = winner => {
  return {
    type: UPDATE_WINNER,
    winner,
  }
}
