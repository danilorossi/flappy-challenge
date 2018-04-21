/**
* The initial state for the Redux store.
*/
export default {

  // This section if for the home page stats
  stats: {
    games: [{
      twitterUsername: "@danilorossi_me",
      ts: 1524330857884,
      score: 20
    }],
    scores: [{
      twitterUsername: "@danilorossi_me",
      ts: 1524330857884,
      gamesCounter: 1,
      topScore: 20
    }]
  },
  // This section is for managing a game
  currentGame: {
    status: 100,
    playing: false,
    twitterUsername: null, // current player
    profile: null, // user profile: QA | BE | FE etc.. or JS, Scala... React...?
    score: 0, // current score,
  }

};
