import { delay } from 'redux-saga';
import { put, call, takeEvery } from 'redux-saga/effects';
import { increment } from '../routes/Counter/modules/counter';

export function* helloSaga () {
    console.log('Hello Sagas!');
}

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
    yield call(delay, 1000);
    yield put(increment());
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

export default function* rootSaga () {
    yield [
        helloSaga(),
        watchIncrementAsync()
    ];
}
