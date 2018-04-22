import React, { Component } from 'react';
import * as GameStates from '../globals/gameStates';

const styles = {
  overlay: {
    zIndex: 1000,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)'
  }
};

class Overlay extends Component {
  render() {

    const { status } = this.props;

    return (
      <div>
        { status !== GameStates.PLAYING && status !== GameStates.SPLASH_SCREEN &&
          <div style={styles.overlay}>{this.props.children}</div>
        }
      </div>
    );
  }
};

export default Overlay;
