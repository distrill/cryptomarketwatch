import { combineReducers } from 'redux';
import winner from './winner';
import coins from './coins';

const todoApp = combineReducers({
  winner,
  coins,
});

export default todoApp;
