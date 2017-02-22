import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import makeRootReducer from './reducers';
import makeRootSaga from './sagas';
import { updateLocation } from './location';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [thunk, routerMiddleware(browserHistory), sagaMiddleware];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];

  let composeEnhancers = compose;

  if (__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  store.asyncReducers = {};
  store.asyncSagas = {};

  store.runSaga = sagaMiddleware.run;
  store.sagaTask = store.runSaga(makeRootSaga());

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers(store.asyncReducers));
    });

    module.hot.accept('./sagas', () => {
      const sagas = require('./sagas').default;
      store.sagaTask.cancel();
      store.sagaTask.done.then(() => {
        store.sagaTask = store.runSaga(sagas(store.asyncSagas));
      });
    });
  }

  return store;
}
