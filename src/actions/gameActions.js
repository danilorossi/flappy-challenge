import * as Action from './types';
import * as GameStates from '../globals/gameStates';

import { onGameFinished } from './statsActions';

// import DummyApi from '../api/dummyApi';

/**
* @description Notify Redux that a new game has started
*/
export function startGame() {
  return {
    type: Action.START_GAME
  };
}


function endCurrentGame(finalScore) {
  return {
    type: Action.END_CURRENT_GAME,
    finalScore
  };
}

export function setMainScreenStatus() {
  return {
    type: Action.UPDATE_GAME_STATUS,
    status: GameStates.MAIN_SCREEN
  };
}

export function setSplashScreenStatus(twitterUsername, profile) {
  return {
    type: Action.UPDATE_GAME_STATUS,
    status: GameStates.SPLASH_SCREEN,
    twitterUsername,
    profile
  };
}

export function updateScore(score) {
  return {
    type: Action.UPDATE_CURRENT_GAME_SCORE,
    score
  };
}

// Thunk
export function endGame(twitterUsername, finalScore) {
    return function(dispatch, getState) {
        dispatch(endCurrentGame(finalScore));
        dispatch(onGameFinished(twitterUsername, finalScore));
    };
}
