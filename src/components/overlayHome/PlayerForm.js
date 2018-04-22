import React, { Component } from 'react';

const styles = {
  text: {
    color: 'black'
  }
};

class PlayerForm extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.props.onStartPlaying(this.state.value)
  }

  render() {

    return (
      <div>
        <h3 style={styles.text}>bird type choice here</h3>
        <label>
        Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <button onClick={this.handleSubmit}>START</button>
      </div>
    );
  }
};

export default PlayerForm;
