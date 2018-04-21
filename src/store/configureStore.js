import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialState = {}) {

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // Return createStore utility
  return createStore(
      rootReducer,
      initialState,
      composeEnhancers(
        applyMiddleware(
          thunk, // Manage async actions
          reduxImmutableStateInvariant() // Dev env warning when mutating state
        )
      )

  );
}
