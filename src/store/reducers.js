import { combineReducers } from 'redux';
import locationReducer from './location';
import { reducer as formReducer } from 'redux-form';
import authReducer from '../redux/modules/auth';
import { routerReducer } from 'react-router-redux';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    auth: authReducer,
    location: locationReducer,
    form: formReducer,
    routing: routerReducer,
    ...asyncReducers
  })
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers))
};

export default makeRootReducer
