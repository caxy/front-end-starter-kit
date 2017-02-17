import { delay } from 'redux-saga';
import { put, call, takeEvery } from 'redux-saga/effects';

// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
export const COUNTER_DOUBLE = 'COUNTER_DOUBLE';
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC';

// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = 1) {
  return {
    type    : COUNTER_INCREMENT,
    payload : value
  }
}

export function double () {
  return {
    type    : COUNTER_DOUBLE
  }
}

export function doubleAsync () {
  return { type: COUNTER_DOUBLE_ASYNC };
}

export const actions = {
  increment,
  double,
  doubleAsync
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]    : (state, action) => state + action.payload,
  [COUNTER_DOUBLE] : (state, action) => state * 2
};

// ------------------------------------
// Sagas
// ------------------------------------
// Our worker Saga: will perform the async increment task
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
const initialState = 0;
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
