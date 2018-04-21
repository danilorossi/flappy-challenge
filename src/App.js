import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';

import configureStore from './store/configureStore';

import initialState from './reducers/initialState';

import Wrapper from './components/Wrapper';

import './App.css';


// Init redux store with initial state
const store = configureStore(initialState);



class App extends Component {

  render() {

    return (
      <Provider store={store}>
        <Wrapper />
      </Provider>
    );
  }

}

export default App;
