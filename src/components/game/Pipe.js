import React, { Component } from 'react';

class Pipe extends Component {

  constructor(props) {
      super(props);
      this.pipeRef = React.createRef();
      this.pipeUpperRef = React.createRef();
  }

  getLeftPosition = () => {
    return this.pipeRef.position().left;
  }

  getPipeUpperMeta = () => {
    return {
      top: this.pipeUpperRef.offset().top,
      left: this.pipeUpperRef.offset().left,
      height: this.pipeUpperRef.height()
    }
  }

  render() {

    const {
      topHeight,
      bottomHeight
    } = this.props;

    const styles = {
      top: {
        height: topHeight + 'px'
      },
      bottom: {
        height: bottomHeight + 'px'
      }
    }

    return (

      <div ref={this.pipeRef} className="pipe animated">
        <div ref={this.pipeUpperRef} className="pipe_upper" style={styles.top}></div>
        <div className="pipe_lower" style={styles.bottom}></div>
      </div>

    );
  }
}

export default Pipe;
