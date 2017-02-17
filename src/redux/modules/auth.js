import { delay } from 'redux-saga';
import { put, call, takeEvery } from 'redux-saga/effects';
import Api from '../../utils/api';

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_USER_REQUEST = 'auth/LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'auth/LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'auth/LOGIN_USER_FAILURE';
export const LOGOUT_USER = 'auth/LOGOUT_USER';

// ------------------------------------
// Actions
// ------------------------------------
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
  loginUserRequest,
  loginUserFailure,
  loginUserSuccess,
  logoutUser
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_USER_REQUEST]    : (state, action) => Object.assign({}, state, {
    isAuthenticating: true,
    statusText: null
  }),
  [LOGIN_USER_SUCCESS]    : (state, action) => Object.assign({}, state, {
    isAuthenticating: false,
    isAuthenticated: true,
    token: payload.token,
    userName: jwtDecode(payload.token).userName,
    statusText: 'You have been successfully logged in.'
  }),
  [LOGIN_USER_FAILURE]    : (state, action) => Object.assign({}, state, {
    isAuthenticating: false,
    isAuthenticated: false,
    token: null,
    userName: null,
    statusText: `Authentication Error: ${payload.status} ${payload.statusText}`
  }),
  [LOGOUT_USER]           : Object.assign({}, state, {
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
export function* loginUser (email, password, redirect='/') {
  yield put(loginUserRequest());
  yield call(Api.authenticate);
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
  watchIncrementAsync
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
