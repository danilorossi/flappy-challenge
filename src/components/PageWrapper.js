
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
import Leaderboard from './overlayHome/Leaderboard'
import PlayerForm  from './overlayHome/PlayerForm'
import EndOfGamePanel from './overlayEndOfGame/EndOfGamePanel'
import Overlay from './Overlay'
import GamingPage from './GamingPage'
import Header from './Header'
import Footer from './Footer'

const styles = {
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
    height: '25%'
  },
  footer: {
    height: '100%'
  }
};

class PageWrapper extends Component {

  updateScore = (nextScore) => {
    this.props.dispatchUpdateScore(nextScore);
  }

  onGameStarted = () => {
    this.props.dispatchStartGame();
  }

  onGameFinished = () => {
    const {
      dispatchEndGame,
      currentGame
    } = this.props;
    dispatchEndGame(currentGame.twitterUsername, currentGame.score);
  }

  render() {

    const { currentGame } = this.props;
    const { status } = currentGame;

    return (

      <div>

        <Overlay status={status}>

        { status === GameStates.END_OF_GAME &&
          <div>
            <EndOfGamePanel
              gameData={currentGame}
              onDismissEOGPanel={() => this.props.dispatchDismissEndGameScreen()}
            />
          </div>
        }

        { status === GameStates.MAIN_SCREEN &&
          <div style={styles.leaderboard}>
            <Leaderboard />
            <PlayerForm onStartPlaying={this.props.dispatchReadyToPlay} />
          </div>
        }

        </Overlay>

        <GamingPage>

          <Header style={styles.header} />

          <Game
            style={styles.gameContainer}
            onScoreUpdate={this.updateScore}
            onEndGame={this.onGameFinished}
            onStartGame={this.onGameStarted}
          />

          <Footer
            gameData={currentGame}
            style={styles.footer}
          />

        </GamingPage>

      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchReadyToPlay: (twitterUsername) => dispatch(setSplashScreenStatus(twitterUsername)),
    dispatchDismissEndGameScreen: () => dispatch(setMainScreenStatus()),

    dispatchStartGame: () => dispatch(startGame()),
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
)(PageWrapper);
