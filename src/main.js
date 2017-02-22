import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import AppContainer from './containers/AppContainer';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Api from 'utils/api';
import jwtDecode from 'jwt-decode';

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__ || {};

if (!initialState.hasOwnProperty('auth') && Api.getItemFromStorage('token')) {
  const token = Api.getItemFromStorage('token');
  const user = jwtDecode(token);
  initialState.auth = {
    isAuthenticating: false,
    isAuthenticated: true,
    token: token,
    username: user.username,
    user,
    statusText: 'You have been successfully logged in.'
  }
}

const store = createStore(initialState);

const history = syncHistoryWithStore(browserHistory, store);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  const routes = require('./routes/index').default(store);

  ReactDOM.render(
  <AppContainer store={store} routes={routes} history={history} />,
    MOUNT_NODE
  )
};

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        console.error(error);
        renderError(error)
      }
    };

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render()
      })
    )
  }
}

// ========================================================
// Go!
// ========================================================
render();
