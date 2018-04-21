import * as Action from './types';

export function onGameFinished(twitterUsername, finalScore) {
  return {
    type: Action.GAME_FINISHED,
    twitterUsername,
    finalScore
  };
}
