import React, { Component } from 'react';
import * as GameStates from '../globals/gameStates';

const styles = {
  gamingPage: {
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }
};

class GamingPage extends Component {
  render() {
    return (
        <div style={styles.gamingPage}>{this.props.children}</div>
    );
  }
};

export default GamingPage;
