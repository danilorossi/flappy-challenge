import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['stats']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default function configureStore(initialState = {}) {

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  let store = createStore(
      persistedReducer,
      initialState,
      composeEnhancers(
        applyMiddleware(
          thunk, // Manage async actions
          reduxImmutableStateInvariant() // Dev env warning when mutating state
        )
      )

  );
  let persistor = persistStore(store)
  return { store, persistor }
  
}
