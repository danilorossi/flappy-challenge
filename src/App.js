import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import initialState from './reducers/initialState';

import PageWrapper from './components/PageWrapper';

import './App.css';


// Init redux store with initial state
const store = configureStore(initialState);



class App extends Component {

  render() {

    return (
      <Provider store={store}>
        <PageWrapper />
      </Provider>
    );
  }

}

export default App;
