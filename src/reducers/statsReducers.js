import initialState from './initialState';
import * as Action from '../actions/types';

// Reducer for the home page stats
export default function statsReducers(state = initialState.stats, action) {

    switch(action.type) {

      case Action.GAME_FINISHED:

        const nextGame = {
          twitterUsername: action.twitterUsername,
          ts: Date.now(),
          score: action.finalScore
        };

        const prevUserGame = state.scores.find(gameScore => gameScore.twitterUsername === action.twitterUsername);

        const nextScores = prevUserGame ?
          state.scores.map(gameScore => gameScore.twitterUsername === action.twitterUsername ?
            {
              ...gameScore,
              topScore: action.finalScore > gameScore.topScore ? action.finalScore : gameScore.topScore,
              gamesCounter: gameScore.gamesCounter + 1,
              ts: Date.now(),
            } : gameScore) :
          state.scores.concat({
            twitterUsername: action.twitterUsername,
            topScore: action.finalScore,
            gamesCounter: 1,
            ts: Date.now()
          })
          const sortedNextScores = nextScores.slice().sort((a, b) => b.topScore - a.topScore);
          // .slice(9);

          //const finalPosition = sortedNextScores.findIndex(score => score.twitterUsername === action.twitterUsername)


        return {
          ...state,
          games: state.games.concat(nextGame),
          scores: sortedNextScores
        };

      default:
          return state;

    }

}
