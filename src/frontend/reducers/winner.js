import { UPDATE_WINNER } from './../actions';

function winner(state = 'HODL!!1!', action) {
  switch (action.type) {
    case UPDATE_WINNER:
      return action.winner;
    default:
      return state;
  }
}

export default winner;
