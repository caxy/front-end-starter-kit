import _ from 'lodash';
import { fork } from 'redux-saga/effects';
import { loginFlow } from '../redux/modules/auth';

export const makeRootSaga = (asyncSagas = {}) => {
  const sagas = {
    // Sync sagas can be added here.
    loginFlow,
    ...asyncSagas
  };

  return function* rootSaga () {
    yield _.values(sagas).map(saga => fork(saga));
  }
};

const rerunSagas = (store) => {
  store.sagaTask.cancel();
  store.sagaTask.done.then(() => {
    store.sagaTask = store.runSaga(makeRootSaga(store.asyncSagas));
  });
};

export const injectSaga = (store, { key, saga }, reload = true) => {
  if (Object.hasOwnProperty.call(store.asyncSagas, key)) {
      return;
  }

  store.asyncSagas[key] = saga;

  if (reload) {
    rerunSagas(store);
  }
};

export const injectMultipleSagas = (store, sagas) => {
  _.forEach(sagas, (saga, key) => {
    injectSaga(store, { key, saga }, false);
  });

  rerunSagas(store);
};

export default makeRootSaga;
