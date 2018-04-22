import React, { Component } from 'react';

const styles = {
  header: {
    position: 'relative',
    width: '100%',
  },
  text: {
    color: 'black'
  }
};

class Header extends Component {
  render() {
    const { style } = this.props;
    return (
      <header style={{...styles.header, ...style}}>
        <h1 style={styles.text}>#FlappyChallenge</h1>
      </header>
    );
  }
};

export default Header;
