import React, { Component } from 'react';

const styles = {
  container: {
    margin: '0 auto',
    marginTop: '20%',
    height: '400px',
    width: '400px',
    background: 'rgba(255, 255, 255, 0.6)',
    color: 'black',
    textAlign: 'center'
  },
  text: {
    color: 'black'
  }
};

class EndOfGamePanel extends Component {
  render() {

    const { gameData, onDismissEOGPanel } = this.props;
     
    return (
      <div style={styles.container}>
        <h2>Thanks for playing,</h2>
        <h1>{gameData.twitterUsername}!</h1>
        <h2>You scored: {gameData.score}!</h2>
        <button onClick={() => onDismissEOGPanel()}>Got it</button>
        <p>TODO:</p>
        <p>- show final position?</p>
        <p>- success msg if top ten?</p>
        <p>- hashtag to tweet?</p>
      </div>
    );
  }
};

export default EndOfGamePanel;
