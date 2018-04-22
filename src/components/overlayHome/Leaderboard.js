import React, { Component } from 'react';
import { connect } from 'react-redux';


const styles = {

  leaderboard: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    width: '250px',
    height: '200px',
    color: 'black'
  },

};

const SCORES_LIMIT = 10;

class Leaderboard extends Component {

  render() {
    const { scores } = this.props;
    return (
      <div>
        <div className="leaderboard" style={styles.leaderboard}>
          <h2>Top {SCORES_LIMIT}</h2>
          <ul>
          {scores && scores.map((score, i) => <li key={i}>{i+1}. {score.twitterUsername} # {score.topScore} points</li>)}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
      scores: state.stats.scores.filter((score, i) => i < SCORES_LIMIT)
  };
}

export default connect (
  mapStateToProps,
  // mapDispatchToProps
)(Leaderboard);
//export default Leaderboard;
