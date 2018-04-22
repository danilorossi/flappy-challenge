import React, { Component } from 'react';
import * as GameStates from '../globals/gameStates';

const styles = {

};

class Footer extends Component {
  render() {

    const { gameData } = this.props;
    const {
      score,
      status,
      twitterUsername
    } = gameData;

    return (
      <div>
        FOOTER
      { status === GameStates.PLAYING &&
        <h3 style={{color:'black'}}>{twitterUsername}: {score}</h3>
      }
      </div>
    );
  }
};

export default Footer;
