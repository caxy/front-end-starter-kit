import { put, call, takeEvery } from 'redux-saga/effects';
import Api from 'utils/api';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_USER = 'user/FETCH_USER';
export const REQUEST_USER = 'user/REQUEST_USER';
export const RECEIVE_USER_SUCCESS = 'user/RECEIVE_USER_SUCCESS';
export const RECEIVE_USER_FAILURE = 'user/RECEIVE_USER_FAILURE';

// ------------------------------------
// Actions
// ------------------------------------
export function fetchUser (id) {
  return { type: FETCH_USER, payload: id };
}

export function requestUser () {
  return { type: REQUEST_USER };
}

export function receiveUserSuccess (user) {
  return { type: RECEIVE_USER_SUCCESS, payload: user };
}

export function receiveUserFailure (error) {
  return { type: RECEIVE_USER_SUCCESS, payload: error };
}

export const actions = {
  fetchUser,
  requestUser,
  receiveUserSuccess,
  receiveUserFailure
};

// ------------------------------------
// Sagas
// ------------------------------------
// Our worker Saga: will perform the async increment task
export function* doFetchUser ({ payload }) {
  try {
    const data = yield call(Api.getUser, payload);
    yield put(receiveUserSuccess(data));
  } catch (error) {
    yield put(receiveUserFailure(error));
  }
}

// Our watcher Saga: spawn a new doubleAsync task on each INCREMENT_ASYNC
export function* watchFetchUser () {
  yield takeEvery(FETCH_USER, doFetchUser);
}

// Export the sagas, which is used in ./../index.js to add them to the store.
export const sagas = {
  watchFetchUser
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_USER]: (state, action) => Object.assign({}, state, {

  }),
  [REQUEST_USER]: (state, action) => Object.assign({}, state, {
    isFetching: true,
    error: null,
    status: null
  }),
  [RECEIVE_USER_SUCCESS]: (state, {payload}) => Object.assign({}, state, {
    isFetching: false,
    user: payload,
    lastUpdated: Date.now(),
    didInvalidate: false,
    error: null,
    status: 'success'
  }),
  [RECEIVE_USER_FAILURE]: (state, {payload}) => Object.assign({}, state, {
    isFetching: false,
    user: null,
    lastUpdated: Date.now(),
    didInvalidate: false,
    error: payload,
    status: 'error'
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  user: null,
  isFetching: false,
  status: null,
  error: null,
  lastUpdated: null,
  didInvalidate: false
};
export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
