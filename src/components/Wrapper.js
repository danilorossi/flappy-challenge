
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as GameStates from '../globals/gameStates';

import {
  setMainScreenStatus,
  setSplashScreenStatus,
  updateScore,
  endGame,
  startGame
} from '../actions/gameActions';

import Game from './game';
import Leaderboard from './leaderboard'

const styles = {
  overlay: {
    zIndex: 1000,
    position: 'absolute',
    color: 'red',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  leaderboard: {
    position: 'absolute',
    right: '10%',
    top: '25%',
    zIndex: 11,
  },
  gameContainer: {
    zIndex: 0,
  },
  header: {
    position: 'relative',
    height: '150px',
    width: '100%',
    background: 'white'
  },
  agLogo: {
    width: '30%',
    margin: '0 auto'
  }

};



// 100 MAIN_SCREEN (leaderboard and form)
// 0 SPLASH_SCREEN (tap to start)
// 1 PLAYING (tap to start)
// 2 END_OF_GAME (show the result and position)

class Wrapper extends Component {

  updateScore = (nextScore) => {
    this.props.dispatchUpdateScore(nextScore);
  }

  onGameStarted = () => {
    const {
      dispatchStartGame
    } = this.props;

    const randomTwitterUsr = `@account_${(Math.floor(Math.random() * Math.floor(5)))}`;

    dispatchStartGame(randomTwitterUsr);
  }

  onGameFinished = () => {
    const {
      dispatchEndGame,
      currentGame
    } = this.props;
    dispatchEndGame(currentGame.twitterUsername, currentGame.score);
  }

  render() {

    const {
      score,
      status
    } = this.props.currentGame;

    return (

      <div className="App">

        {status !== GameStates.PLAYING && status !== GameStates.SPLASH_SCREEN &&
        <div className="overlay" style={styles.overlay}>

          <div className="left-panel">

          </div>


          {status === GameStates.END_OF_GAME &&
            <div style={styles.leaderboard}>
              <h3 style={{color:'black'}}>Show score and position here</h3>
              <button onClick={() => this.props.dispatchDismissEndGameScreen()}>SCORE & POSITION</button>
            </div>
          }

          {status === GameStates.MAIN_SCREEN &&
            <div style={styles.leaderboard}>
              <Leaderboard />
                <h3 style={{color:'black'}}>Show twitter usrname and bird type choice here!</h3>
              <button onClick={() => this.props.dispatchReadyToPlay()}>START</button>
            </div>
          }

        </div>
        }

        <header style={styles.header}>
          {/*<img style={styles.agLogo} src="ag_logo.png"/>*/}
          <h1 style={{color:'black'}}>#FlappyAddison</h1>
          {status == GameStates.PLAYING && <h4 style={{color:'black'}}>Score: {score}</h4>}
        </header>

        <Game
          style={styles.gameContainer}
          onScoreUpdate={this.updateScore}
          onEndGame={this.onGameFinished}
          onStartGame={this.onGameStarted}
        />

      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchReadyToPlay: () => dispatch(setSplashScreenStatus()),
    dispatchDismissEndGameScreen: () => dispatch(setMainScreenStatus()),

    dispatchStartGame: (twitterUsername, profile) => dispatch(startGame(twitterUsername, profile)),
    dispatchEndGame: (twitterUsername, finalScore) => dispatch(endGame(twitterUsername, finalScore)),
    dispatchUpdateScore: (score) => dispatch(updateScore(score))
  }
}

function mapStateToProps(state, ownProps) {
  return {
      currentGame: state.currentGame
  };
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Wrapper);
