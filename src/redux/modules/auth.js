import { delay } from 'redux-saga';
import { fork, put, call, takeEvery, cancel, cancelled, take } from 'redux-saga/effects';
import Api from '../../utils/api';
import jwtDecode from 'jwt-decode';

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_USER = 'auth/LOGIN_USER';
export const LOGIN_USER_REQUEST = 'auth/LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'auth/LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'auth/LOGIN_USER_FAILURE';
export const LOGOUT_USER = 'auth/LOGOUT_USER';

// ------------------------------------
// Actions
// ------------------------------------
export function loginUser (data, redirect='/') {
  console.log('DISPATCHING LOGIN_USER');
  return { type: LOGIN_USER, payload: { username: data.username, password: data.password, redirect } };
}

export function loginUserRequest () {
  return { type: LOGIN_USER_REQUEST };
}

export function loginUserSuccess (token) {
  return { type: LOGIN_USER_SUCCESS, payload: { token } };
}

export function loginUserFailure (error) {
  return { type: LOGIN_USER_FAILURE, payload: error };
}

export function logoutUser () {
  return { type: LOGOUT_USER };
}

export const actions = {
  loginUser,
  loginUserRequest,
  loginUserFailure,
  loginUserSuccess,
  logoutUser
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_USER_REQUEST]: (state, action) => Object.assign({}, state, {
    isAuthenticating: true,
    statusText: null
  }),
  [LOGIN_USER_SUCCESS]: (state, {payload}) => Object.assign({}, state, {
    isAuthenticating: false,
    isAuthenticated: true,
    token: payload.token,
    userName: jwtDecode(payload.token).userName,
    statusText: 'You have been successfully logged in.'
  }),
  [LOGIN_USER_FAILURE]: (state, {payload}) => Object.assign({}, state, {
    isAuthenticating: false,
    isAuthenticated: false,
    token: null,
    userName: null,
    statusText: `Authentication Error: ${payload.message}`
  }),
  [LOGOUT_USER]: (state, action) => Object.assign({}, state, {
    isAuthenticated: false,
    token: null,
    userName: null,
    statusText: 'You have been successfully logged out.'
  })
};

// ------------------------------------
// Sagas
// ------------------------------------
// Our worker Saga: will perform the async increment task
export function* loginFlow () {
  while (true) {
    const {payload: {username, password, redirect}} = yield take(LOGIN_USER);
    console.log('forking auth');
    // fork return a Task object.
    const task = yield fork(authorize, username, password);
    const action = yield take([LOGOUT_USER, LOGIN_USER_FAILURE]);
    if (action.type === LOGOUT_USER) {
      yield cancel(task);
    }

    yield call([Api, Api.clearItem], 'token');
  }
}

export function* authorize(user, password) {
  try {
    const token = yield call([Api, Api.authenticate], user, password);
    console.log(token);
    yield put(loginUserSuccess(token));
    yield call([Api, Api.storeItem], 'token', token);

    return token;
  } catch (error) {
    yield put(loginUserFailure(error));
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* doDoubleAsync() {
  yield call(delay, 1000);
  yield put(double());
}

// Our watcher Saga: spawn a new doubleAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  yield takeEvery(COUNTER_DOUBLE_ASYNC, doDoubleAsync);
}

// Export the sagas, which is used in ./../index.js to add them to the store.
export const sagas = {
  watchIncrementAsync,
  loginFlow
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  token: null,
  userName: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
};
export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
