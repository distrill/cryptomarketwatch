import { UPDATE_COIN_DATA } from './../actions';

function coins(state = {}, action) {
  switch (action.type) {
    case UPDATE_COIN_DATA:
      return action.coins;
    default:
      return state;
  }
}

export default coins;
