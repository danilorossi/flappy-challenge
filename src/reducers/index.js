import { combineReducers } from 'redux';
import gameReducers from './gameReducers';
import statsReducers from './statsReducers';

// Combine reducers into the root one
const rootReducer = combineReducers({
  currentGame: gameReducers,
  stats: statsReducers
});

export default rootReducer;
