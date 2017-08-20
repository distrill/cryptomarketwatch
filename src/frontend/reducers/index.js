import { combineReducers } from 'redux';
import coins from './coins';

const todoApp = combineReducers({
  coins,
});

export default todoApp;
