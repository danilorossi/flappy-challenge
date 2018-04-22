import initialState from './initialState';
import * as Action from '../actions/types';

// Reducer for currentGame store section
export default function gameReducers(state = initialState.currentGame, action) {

    switch(action.type) {

      // The user starts a new game
      case Action.START_GAME:
        return {
          ...state,
          status: 1,
          playing: true,
          score: 0
        }

      // Round state changes
      case Action.UPDATE_CURRENT_GAME_SCORE:
        return {
          ...state,
          score: action.score
        };

      case Action.UPDATE_GAME_STATUS:
        return {
          ...state,
          status: action.status,
          twitterUsername: action.twitterUsername,
          profile: action.profile || 'DEFAULT',
        };

      case Action.END_CURRENT_GAME:
        return {
          ...state,
          playing: false,
          score: action.finalScore,
          status: 2,
        };

      default:
          return state;

    }

}
